import { createHash,randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import type { BetaPdfMapping,BetaPdfOperation,BetaPdfReview } from '../../../shared/contracts/betaPdf';
import { reconcileTransfersAndConfirmations } from '../../../shared/processing/reconciliationService';
import { ParsedStatementOutcome,parseStatementCSVContent } from '../../../shared/processing/statementParser';
import { aliases,normalizeRecords,readCSV } from '../../../shared/statement/normalize';
import type { NormalizedResult,ParsingOptions,ParsingReview,SourceRecord,StatementField } from '../../../shared/statement/types';
import { BetaError,BetaFinancial,BetaState } from './financial';
import { BetaFindings } from './findings';
import { parseRevolutLines,type PdfLine } from './revolutPdf';
import type { BetaStore } from './store';
type User={id:string;name:string;email:string};
const fieldSchema=z.enum(['date','description','amount','debit','credit','currency','balance','reference']);
const optionsSchema=z.object({dateConvention:z.enum(['DMY','MDY','YMD']).optional(),numberConvention:z.enum(['decimal-point','decimal-comma']).optional(),headerRow:z.number().int().min(1).max(10000).optional(),delimiter:z.enum([',',';','\t']).optional(),mapping:z.record(fieldSchema,z.number().int().min(0).max(1000)).optional(),pdfColumns:z.array(z.object({field:fieldSchema,xMin:z.number().finite(),xMax:z.number().finite()})).max(8).optional(),acknowledgeReconciliation:z.boolean().optional()}).strict();
const inputSchema=z.object({accountId:z.string().min(1),fileName:z.string().min(1).max(255),contentBase64:z.string().min(1).max(28_000_000),sheetName:z.string().optional(),correctedCsv:z.string().max(5_000_000).optional(),options:optionsSchema.optional(),excludedRows:z.array(z.string()).max(10000).optional()});
export interface BetaImportPreview {
 id:string;accountId:string;fileName:string;status:string;statement?:ParsedStatementOutcome['statement'];transactions:ParsedStatementOutcome['transactions'];rejectedRows:ParsedStatementOutcome['rejectedRows'];
 sheetNames?:string[];sheetName?:string;sourceLines?:{page:number;line:number;text:string;items?:{x:number;text:string}[]}[];message?:string;classifications?:ParsedStatementOutcome['classifications'];confirmed?:boolean;
 parsing?:ParsingReview;
 pdf?: BetaPdfReview;
 statements?: ParsedStatementOutcome['statement'][];
}
interface StoredImport {
 preview:BetaImportPreview; original:string; csv:string|null; originalHash:string;
 confirmedStatementId?:string; confirmedStatementIds?:string[];
 pdf?: NonNullable<ReturnType<typeof parseRevolutLines>>;
 mapping?:BetaPdfMapping;
 normalized?:NormalizedResult; options?:ParsingOptions; excludedRows?:string[];
}
const quote=(value:unknown)=>`"${String(value??'').replace(/"/g,'""')}"`;
export class BetaImports {
 constructor(private store:BetaStore,private financial:BetaFinancial){}
 async preview(user:User,raw:unknown):Promise<BetaImportPreview>{
  const input=inputSchema.parse(raw);const envelope=this.financial.get(user);const state=envelope.state;
  const account=state.accounts.find(a=>a.id===input.accountId);if(!account)throw new BetaError('INVALID_ACCOUNT','Choose one of your accounts.',404);
  if(!/^[A-Za-z0-9+/]*={0,2}$/.test(input.contentBase64)||input.contentBase64.length%4===1)throw new BetaError('INVALID_FILE','Invalid base64 content.');
  const bytes=Buffer.from(input.contentBase64,'base64');if(!bytes.length||bytes.length>20*1024*1024)throw new BetaError('FILE_TOO_LARGE','Use a nonempty file no larger than 20 MB.');
  const id=randomUUID();const preview:BetaImportPreview={id,accountId:account.id,fileName:input.fileName,status:'needs_mapping',transactions:[],rejectedRows:[]};
  let csv:string|null=null;let records:SourceRecord[]|undefined;let excel1904=false;const options=input.options||{};const extension=extname(input.fileName).toLowerCase();
  let revolut: StoredImport['pdf'];
  try {
   if(extension==='.csv'){let encoding='utf-8';try{csv=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{encoding='windows-1252';csv=new TextDecoder(encoding).decode(bytes);}records=readCSV(csv,options);preview.parsing={format:'csv',options,headers:[],issues:[],mappingRequired:false,requiresDateConvention:false,requiresNumberConvention:false,reconciliation:[],encoding};}
   else if(['.xls','.xlsx'].includes(extension)){
    const workbook=XLSX.read(bytes,{type:'buffer',cellFormula:true,cellHTML:false,cellDates:false,cellNF:true,sheetRows:10001});
    preview.sheetNames=workbook.SheetNames;
    if(input.sheetName&&!workbook.SheetNames.includes(input.sheetName))throw new BetaError('INVALID_SHEET','Selected worksheet does not exist.');
    if(workbook.SheetNames.length!==1&&!input.sheetName){preview.status='needs_sheet_selection';preview.message='Select the worksheet containing account transactions.';}
    else {const sheetName=input.sheetName||workbook.SheetNames[0];if(!sheetName)throw new BetaError('EMPTY_FILE','Workbook has no worksheets.');preview.sheetName=sheetName;const sheet=workbook.Sheets[sheetName];const fullRange=sheet['!fullref']||sheet['!ref'];if(fullRange&&XLSX.utils.decode_range(fullRange).e.r>=10000)throw new BetaError('FILE_TOO_LARGE','Worksheet exceeds 10000 rows. Split it before uploading.');excel1904=!!workbook.Workbook?.WBProps?.date1904;records=[];if(fullRange){const range=XLSX.utils.decode_range(fullRange);for(let r=range.s.r;r<=range.e.r;r++){const cells=[];for(let c=range.s.c;c<=range.e.c;c++){const cell=sheet[XLSX.utils.encode_cell({r,c})];cells.push({value:cell?.v??'',display:cell?XLSX.utils.format_cell(cell):'',dateSerial:cell?.t==='n'&&XLSX.SSF.is_date(cell.z||''),formula:!!cell?.f});}if(cells.some(c=>String(c.value).trim()))records.push({cells,source:{row:r+1,sheet:sheetName}});}}}
   } else if(extension==='.pdf'){
    if(!bytes.subarray(0,5).equals(Buffer.from('%PDF-')))throw new BetaError('INVALID_FILE','File is not a PDF document.');
    const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
    const task=getDocument({data:new Uint8Array(bytes),useSystemFonts:true});
    try {const pdf=await task.promise;if(pdf.numPages>200)throw new BetaError('FILE_TOO_LARGE','PDF exceeds the 200 page limit.');preview.sourceLines=[];
     const positioned: PdfLine[] = [];
     for(let page=1;page<=pdf.numPages;page++){
      const content=await (await pdf.getPage(page)).getTextContent();const rows=new Map<number,{x:number;text:string}[]>();
      for(const item of content.items){if(!('str' in item))continue;const y=Math.round(item.transform[5]);const row=rows.get(y)||[];row.push({x:item.transform[4],text:item.str});rows.set(y,row);}
      let line=0;for(const [,items] of [...rows].sort((a,b)=>b[0]-a[0])){
       items.sort((a,b)=>a.x-b.x);
       preview.sourceLines.push({page,line:++line,text:items.map(i=>i.text).join(' ').trim(),items});
       positioned.push({page,line,items:items.map(i=>({...i,text:i.text.trim()})).filter(i=>i.text)});
      }
     }
     const lines=preview.sourceLines.map(l=>l.text).filter(Boolean);if(!lines.length){preview.status='unsupported_scan';preview.message='This PDF has no extractable text. Scanned statements require OCR and are not supported.';}
     else if (!input.correctedCsv && (revolut = parseRevolutLines(positioned) ?? undefined)) {
      preview.status = 'needs_accounts';
      preview.pdf = { groups:this.pdfGroups(revolut.operations), issues:revolut.issues, excluded:revolut.excluded };
      delete preview.sourceLines;
     }
     else {preview.message='Review extracted page/row text and map transaction columns before import.';records=this.pdfRecords(positioned,options);const header=lines.findIndex(l=>/^date[,;\t]/i.test(l)&&/amount/i.test(l));if(!records&&header>=0)csv=lines.slice(header).join('\n');}
    } finally {await task.destroy();}
   } else {preview.status='unsupported_format';preview.message='Supported: CSV, XLS, XLSX and text-layer PDF.';}
  } catch(error){if(error instanceof BetaError)throw error;preview.status=(error as Error)?.name==='PasswordException'?'encrypted_pdf':'failed';preview.message=preview.status==='encrypted_pdf'?'This PDF is encrypted. Export an unencrypted statement.':'Document could not be read: corrupted file or unreadable layout. Original retained for review.';}
  if(input.correctedCsv&& !['unsupported_format','unsupported_scan','failed','encrypted_pdf'].includes(preview.status)){csv=input.correctedCsv;records=readCSV(csv,options);}
  const originalHash=createHash('sha256').update(bytes).digest('hex');
  let normalized:NormalizedResult|undefined;
  if(records||csv){
   normalized=normalizeRecords(records||readCSV(csv!,options),extension.slice(1),account.currency,options,input.excludedRows||[],excel1904);
   normalized.review.encoding=preview.parsing?.encoding;
   if(['.xls','.xlsx'].includes(extension))normalized.review.excelDateSystem=excel1904?'1904':'1900';
   preview.parsing=normalized.review;
   const parsed=this.parseNormalized(user,account.id,input.fileName,normalized,originalHash);
   Object.assign(preview,parsed);
   preview.status=normalized.review.mappingRequired?'needs_mapping':normalized.review.issues.some(i=>!i.excluded)||normalized.review.reconciliation.length&&!options.acknowledgeReconciliation?'needs_review':(parsed.transactions.length||parsed.statement.duplicateCountSkipped?'parsed_successfully':parsed.statement.status);
   if(normalized.review.mappingRequired)preview.message='Choose the header row and map Date, Description and Amount (or Debit/Credit) columns.';
   csv=this.canonical(normalized);
  }
  const latest=this.store.get(user.id,'state') as BetaState|null;if(!latest||latest.version!==envelope.version)throw new BetaError('SUPERSEDED','Profile changed while parsing the file. Retry.',409);
  this.store.put(user.id,`import:${id}`,{preview,original:input.contentBase64,csv,originalHash,pdf:revolut,normalized,options,excludedRows:input.excludedRows} satisfies StoredImport);return preview;
 }
 async revise(user:User,id:string,raw:unknown):Promise<BetaImportPreview>{
  const input=z.object({expectedVersion:z.number().int().nonnegative(),acknowledgeReconciliation:z.boolean().optional(),options:optionsSchema.optional(),excludedRows:z.array(z.string()).max(10000).optional(),sheetName:z.string().optional(),correctedCsv:z.string().max(5_000_000).optional()}).strict().parse(raw);
  const record=this.store.get(user.id,`import:${id}`) as StoredImport|null;
  if(!record)throw new BetaError('NOT_FOUND','Import does not exist.',404);
  if(this.financial.get(user).version!==input.expectedVersion)throw new BetaError('VERSION_CONFLICT','Profile changed. Reload before correcting.',409);
  if(record.preview.confirmed)throw new BetaError('IMPORT_CONFIRMED','Confirmed imports cannot be reprocessed.',409);
  const preview=await this.preview(user,{accountId:record.preview.accountId,fileName:record.preview.fileName,contentBase64:record.original,sheetName:input.sheetName??record.preview.sheetName,options:{...(input.options??record.options),...(input.acknowledgeReconciliation!==undefined?{acknowledgeReconciliation:input.acknowledgeReconciliation}:{})},excludedRows:input.excludedRows??record.excludedRows,correctedCsv:input.correctedCsv});
  const created=this.store.get(user.id,`import:${preview.id}`) as StoredImport;
  this.store.remove(user.id,`import:${preview.id}`);created.preview.id=id;
  this.store.put(user.id,`import:${id}`,created);return created.preview;
 }
 private canonical(result:NormalizedResult):string {
  return ['Date,Description,Amount,Currency,Balance,Reference',...result.rows.map(row=>[row.date,row.description.replace(/[\r\n]+/g,' '),row.amount,row.currency,row.balance??'',row.reference||''].map(quote).join(','))].join('\n');
 }
 private parseNormalized(user:User,accountId:string,fileName:string,result:NormalizedResult,hash:string):ParsedStatementOutcome {
  const parsed=this.parse(user,accountId,fileName,this.canonical(result),true);
  const state=this.financial.get(user).state;
  const prior=state.statements.find(s=>s.accountId===accountId&&s.fileHash===hash);
  if(prior){parsed.transactions=[];parsed.classifications=[];parsed.statement.duplicateCountSkipped=result.rows.length;parsed.statement.transactionCount=0;parsed.statement.closingBalance=null;}
  parsed.statement.fileHash=hash;
  parsed.statement.fileFormat=fileName.toLowerCase().endsWith('.pdf')?'pdf':/\.xlsx?$/i.test(fileName)?'xlsx':'csv';
  parsed.transactions=parsed.transactions.map(transaction=>{const row=result.rows[Number(transaction.id.split('_').at(-1))-1];return {...transaction,description:row.description,rawRow:{...transaction.rawRow,__original_values:JSON.stringify(row.original),__source_file:fileName,__source_row:String(row.source.row),__source_sheet:row.source.sheet||'',...(row.source.page?{__source_page:String(row.source.page)}:{})}};});
  parsed.rejectedRows=result.review.issues.filter(i=>!i.excluded).map(i=>({rowNumber:i.source.row,rawLine:i.original.join(' | '),rawRow:i.original,reason:i.message}));
  if(result.review.reconciliation.length)parsed.statement.closingBalance=null;
  return parsed;
 }
 private pdfRecords(lines:PdfLine[],options:ParsingOptions):SourceRecord[]|undefined {
  let columns=options.pdfColumns;
  let start=-1;
  if(!columns){
   start=lines.findIndex(line=>line.items.some(i=>aliases.date.includes(i.text.trim().toLowerCase()))&&line.items.some(i=>[...aliases.amount,...aliases.debit,...aliases.credit].includes(i.text.trim().toLowerCase())));
   if(start<0)return undefined;
   const items=lines[start].items;
   columns=items.flatMap((item,index)=>{const field=(Object.keys(aliases) as StatementField[]).find(f=>aliases[f].includes(item.text.trim().toLowerCase()));return field?[{field,xMin:item.x-3,xMax:items[index+1]?.x-3||10000}]:[];});
  }
  if(!columns.length||columns.some(c=>c.xMax<=c.xMin)||columns.some((c,i)=>columns!.some((d,j)=>j!==i&&c.xMin<d.xMax&&d.xMin<c.xMax)))throw new BetaError('INVALID_MAPPING','PDF column ranges must be nonempty and not overlap.');
  const sorted=[...columns].sort((a,b)=>a.xMin-b.xMin);
  const records:SourceRecord[]=[{cells:sorted.map(c=>({value:c.field,display:c.field})),source:{row:0}}];
  const data=lines.slice(start+1);
  for(const line of data){
   const cells=sorted.map(c=>line.items.filter(i=>i.x>=c.xMin&&i.x<c.xMax).map(i=>i.text).join(' ').trim());
   if(!cells.some(Boolean))continue;
   if(cells.every((value,i)=>!value||aliases[sorted[i].field].includes(value.toLowerCase())))continue;
   records.push({cells:cells.map(value=>({value,display:value})),source:{row:line.line,page:line.page}});
  }
  // A generated header represents explicitly selected coordinate columns.
  return records;
 }
 get(userId:string,id:string):BetaImportPreview|null{return (this.store.get(userId,`import:${id}`) as StoredImport|null)?.preview||null;}
 private pdfGroups(operations: BetaPdfOperation[]) {
  const byCurrency = new Map<string, BetaPdfOperation[]>();
  for (const operation of operations) {
   const group = byCurrency.get(operation.currency) ?? [];
   group.push(operation);
   byCurrency.set(operation.currency, group);
  }
  return Array.from(byCurrency, ([currency, rows]) => ({currency, operations:rows, duplicates:0}));
 }
 private pdfPreview(user: User, record: StoredImport, mapping: BetaPdfMapping, current: BetaState) {
  const pdf = record.pdf!;
  const ids = [...mapping.excludedRows, ...Object.keys(mapping.corrections)];
  if (new Set(ids).size !== ids.length || ids.some(id => !pdf.issues.some(issue => issue.id === id)))
   throw new BetaError('INVALID_PDF_ROWS','Resolve each reported row once.');
  if (pdf.issues.some(issue => !ids.includes(issue.id)))
   throw new BetaError('IMPORT_NOT_READY','Correct or explicitly exclude each reported row.');
  const corrected = pdf.issues.flatMap(issue => {
   const correction = mapping.corrections[issue.id];
   return correction ? [{...issue,...correction,balance:null}] : [];
  });
  const groups = this.pdfGroups([...pdf.operations,...corrected].sort((a,b)=>a.page-b.page||a.line-b.line));
  if (!groups.length) throw new BetaError('IMPORT_NOT_READY','This PDF has no completed operations to import.');
  const parsed = groups.map(group => {
   const accountId = mapping.accounts[group.currency];
   const account = current.state.accounts.find(item => item.id === accountId && item.currency === group.currency);
   if (!account) throw new BetaError('INVALID_ACCOUNT',`Choose one of your ${group.currency} accounts.`);
   const previous = current.state.statements.find(item => item.fileHash === record.originalHash && item.currency === group.currency);
   const csv = ['Date,Description,Amount,Currency,PDF Page,PDF Line',...group.operations.map(row =>
    [row.date,row.description,row.amount,row.currency,row.page,row.line].map(quote).join(','))].join('\n');
   const result = this.parse(user,accountId,record.preview.fileName,csv,true);
   if (result.rejectedRows?.length) throw new BetaError('IMPORT_FAILED','A corrected PDF row could not be validated.');
   const latest = group.operations.at(-1)!;
   const balance = latest.date === result.statement.periodEnd ? latest.balance : null;
   Object.assign(result.statement,{fileName:record.preview.fileName,fileFormat:'pdf',fileHash:record.originalHash,closingBalance:balance});
   if (previous) {
    result.transactions = [];
    result.classifications = [];
    result.statement.duplicateCountSkipped = group.operations.length;
    result.statement.transactionCount = 0;
   }
   return {result, group:{...group,accountId,duplicates:result.statement.duplicateCountSkipped}};
  });
  return { parsed: parsed.map(item => item.result), preview:{
   ...record.preview, status:'parsed_successfully',
   transactions:parsed.flatMap(item => item.result.transactions),
   pdf:{groups:parsed.map(item => item.group), issues:pdf.issues, excluded:pdf.excluded, excludedRows:mapping.excludedRows, corrections:mapping.corrections},
  }};
 }
 mapPdf(user: User, id: string, mapping: BetaPdfMapping): BetaImportPreview {
  const record = this.store.get(user.id,`import:${id}`) as StoredImport|null;
  if (!record?.pdf) throw new BetaError('NOT_FOUND','PDF import does not exist.',404);
  const current = this.financial.get(user);
  if (record.preview.confirmed) return record.preview;
  if (current.version !== mapping.expectedVersion) throw new BetaError('VERSION_CONFLICT','Profile changed. Reload before mapping.',409);
  const {preview} = this.pdfPreview(user,record,mapping,current);
  this.store.put(user.id,`import:${id}`,{...record,mapping,preview});
  return preview;
 }
 private parse(user:User,accountId:string,fileName:string,csv:string,preserveRepeatedRows=false){const envelope=this.store.get(user.id,'state') as BetaState|null;if(!envelope)throw new BetaError('SUPERSEDED','Profile no longer exists.',409);const state=envelope.state;const account=state.accounts.find(a=>a.id===accountId);if(!account)throw new BetaError('INVALID_ACCOUNT','The target account no longer exists.',404);const result=parseStatementCSVContent({userId:user.id,account,allAccounts:state.accounts,fileName:'internal.csv',content:csv,existingStatements:state.statements,existingTransactions:state.transactions,preserveRepeatedRows});result.statement.fileName=fileName;return result;}
 confirm(user:User,id:string,expectedVersion:number):BetaState {
  this.store.database.exec('BEGIN IMMEDIATE');try {
   const record=this.store.get(user.id,`import:${id}`) as StoredImport|null;if(!record)throw new BetaError('NOT_FOUND','Import does not exist.',404);
   const current=this.financial.get(user);if(record.preview.confirmed){this.store.database.exec('COMMIT');return current;}
   if(current.version!==expectedVersion)throw new BetaError('VERSION_CONFLICT','Profile changed. Reload before confirming.',409);
   if(record.mapping && record.mapping.expectedVersion!==current.version)throw new BetaError('VERSION_CONFLICT','Check accounts and duplicates again before confirming.',409);
   const pdf = record.pdf && record.mapping ? this.pdfPreview(user,record,record.mapping,current) : null;
   if(!pdf&&(!record.csv||!['parsed_successfully','needs_review'].includes(record.preview.status)&&!(record.normalized&&record.preview.statement?.duplicateCountSkipped)))throw new BetaError('IMPORT_NOT_READY','Resolve file mapping and errors before confirming.');
   if(record.normalized&&(record.normalized.review.mappingRequired||record.normalized.review.issues.some(i=>!i.excluded)||record.normalized.review.reconciliation.length&&!record.options?.acknowledgeReconciliation))throw new BetaError('IMPORT_NOT_READY','Correct or explicitly exclude blocking rows and acknowledge balance discrepancies.');
   const outcomes = pdf ? pdf.parsed : [record.normalized?this.parseNormalized(user,record.preview.accountId,record.preview.fileName,record.normalized,record.originalHash):this.parse(user,record.preview.accountId,record.preview.fileName,record.csv!)];
   const state = structuredClone(current.state);
   const saved: ParsedStatementOutcome['statement'][] = [];
   for (const parsed of outcomes) {
    if(parsed.statement.status==='failed'&&parsed.statement.duplicateCountSkipped===0)throw new BetaError('IMPORT_FAILED','No transactions can be imported.');
    if (pdf && !parsed.transactions.length) continue;
    parsed.transactions=parsed.transactions.map(transaction=>({...transaction,rawRow:{...transaction.rawRow,__source_file:record.preview.fileName,__source_hash:record.originalHash,__source_sheet:transaction.rawRow.__source_sheet||record.preview.sheetName||'',__source_row:transaction.rawRow['pdf line']||transaction.rawRow.__source_row||String(Number(transaction.id.split('_').at(-1))+1),...(pdf?{__source_page:transaction.rawRow['pdf page']}: {})}}));
    parsed.statement.fileName=record.preview.fileName;
    if (!pdf) parsed.statement.fileFormat=record.preview.statement?.fileFormat||'csv';
    parsed.classifications=new BetaFindings(this.store,this.financial).applyMerchantPreferences(user.id,parsed.transactions,parsed.classifications);
    state.statements.push(parsed.statement);state.transactions.push(...parsed.transactions);state.classifications.push(...parsed.classifications);
    saved.push(parsed.statement);
    if(parsed.statement.closingBalance!==null&&parsed.statement.periodEnd)state.balances.push({id:randomUUID(),accountId:parsed.statement.accountId,amount:parsed.statement.closingBalance,currency:parsed.statement.currency,asOf:parsed.statement.periodEnd,sourceType:'statement_closing',sourceId:parsed.statement.id,createdAt:new Date().toISOString()});
   }
   const result = saved.length ? {...current,version:current.version+1,state} : current;
   if (saved.length) {
    const reconciled=reconcileTransfersAndConfirmations({userId:user.id,accounts:state.accounts,transactions:state.transactions,classifications:state.classifications,existingMatches:state.transferMatches,existingConfirmations:state.confirmations});
    state.transferMatches=reconciled.transferMatches;state.confirmations=reconciled.confirmations;state.classifications=reconciled.updatedClassifications;
    this.financial.persist(user.id,result);this.store.remove(user.id,'analysis');this.store.remove(user.id,'analysis-private');
   }
   if (pdf) {
    record.preview=pdf.preview;
    record.confirmedStatementIds=saved.map(statement=>statement.id);
    record.preview.statements=saved;
   } else {
    record.confirmedStatementId=saved[0].id;
    record.preview.statement=saved[0];
   }
   record.preview.confirmed=true;record.preview.status='confirmed';
   record.original = '';
   record.csv = null;
   record.pdf = undefined;this.store.put(user.id,`import:${id}`,record);this.store.database.exec('COMMIT');return result;
  }catch(error){this.store.database.exec('ROLLBACK');throw error;}
 }
 deleteImport(user:User,id:string,expectedVersion:number):BetaState {
  this.store.database.exec('BEGIN IMMEDIATE');try {
   const record=this.store.get(user.id,`import:${id}`) as StoredImport|null;if(!record)throw new BetaError('NOT_FOUND','Import does not exist.',404);
   const current=this.financial.get(user);if(current.version!==expectedVersion)throw new BetaError('VERSION_CONFLICT','Profile changed. Reload before deleting.',409);
   const state=structuredClone(current.state);const statementIds=new Set(record.confirmedStatementIds??(record.confirmedStatementId?[record.confirmedStatementId]:[]));
   if(statementIds.size){
    const transactionIds=new Set(state.transactions.filter(t=>statementIds.has(t.statementId)).map(t=>t.id));
    const matchIds=new Set(state.transferMatches.filter(m=>transactionIds.has(m.outgoingTransactionId)||!!m.incomingTransactionId&&transactionIds.has(m.incomingTransactionId)).map(m=>m.id));
    state.statements=state.statements.filter(s=>!statementIds.has(s.id));state.transactions=state.transactions.filter(t=>!transactionIds.has(t.id));
    state.classifications=state.classifications.filter(c=>!transactionIds.has(c.transactionId));state.transferMatches=state.transferMatches.filter(m=>!matchIds.has(m.id));
    state.confirmations=state.confirmations.filter(c=>!transactionIds.has(c.subjectId)&&!matchIds.has(c.subjectId));state.balances=state.balances.filter(b=>!statementIds.has(b.sourceId??''));
   }
   state.recommendations=[];const result={...current,version:current.version+1,state};this.financial.persist(user.id,result);this.store.remove(user.id,`import:${id}`);this.store.remove(user.id,'analysis');this.store.remove(user.id,'analysis-private');this.store.database.exec('COMMIT');return result;
  }catch(error){this.store.database.exec('ROLLBACK');throw error;}
 }}





