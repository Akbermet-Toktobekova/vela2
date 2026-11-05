import { randomUUID, createHash } from 'node:crypto';
import { extname } from 'node:path';
import { z } from 'zod';
import * as XLSX from 'xlsx';
import { parseStatementCSVContent, ParsedStatementOutcome } from '../../../react-app/src/services/statementParser';
import { reconcileTransfersAndConfirmations } from '../../../react-app/src/services/reconciliationService';
import type { BetaStore } from './store';
import { BetaFinancial, BetaError, BetaState } from './financial';
type User={id:string;name:string;email:string};
const inputSchema=z.object({accountId:z.string().min(1),fileName:z.string().min(1).max(255),contentBase64:z.string().min(1).max(28_000_000),sheetName:z.string().optional(),correctedCsv:z.string().max(5_000_000).optional()});
export interface BetaImportPreview {
 id:string;accountId:string;fileName:string;status:string;statement?:ParsedStatementOutcome['statement'];transactions:ParsedStatementOutcome['transactions'];rejectedRows:ParsedStatementOutcome['rejectedRows'];
 sheetNames?:string[];sheetName?:string;sourceLines?:{page:number;line:number;text:string}[];message?:string;classifications?:ParsedStatementOutcome['classifications'];confirmed?:boolean;
}
interface StoredImport {preview:BetaImportPreview;original:string;csv:string|null;originalHash:string;confirmedStatementId?:string;}
const quote=(value:unknown)=>`"${String(value??'').replace(/"/g,'""')}"`;
export class BetaImports {
 constructor(private store:BetaStore,private financial:BetaFinancial){}
 async preview(user:User,raw:unknown):Promise<BetaImportPreview>{
  const input=inputSchema.parse(raw);const envelope=this.financial.get(user);const state=envelope.state;
  const account=state.accounts.find(a=>a.id===input.accountId);if(!account)throw new BetaError('INVALID_ACCOUNT','Choose one of your accounts.',404);
  if(!/^[A-Za-z0-9+/]*={0,2}$/.test(input.contentBase64)||input.contentBase64.length%4===1)throw new BetaError('INVALID_FILE','Invalid base64 content.');
  const bytes=Buffer.from(input.contentBase64,'base64');if(!bytes.length||bytes.length>20*1024*1024)throw new BetaError('FILE_TOO_LARGE','Use a nonempty file no larger than 20 MB.');
  const id=randomUUID();const preview:BetaImportPreview={id,accountId:account.id,fileName:input.fileName,status:'needs_mapping',transactions:[],rejectedRows:[]};
  let csv:string|null=null;const extension=extname(input.fileName).toLowerCase();
  try {
   if(extension==='.csv')csv=bytes.toString('utf8').replace(/^\uFEFF/,'');
   else if(['.xls','.xlsx'].includes(extension)){
    const workbook=XLSX.read(bytes,{type:'buffer',cellFormula:false,cellHTML:false,cellDates:true,sheetRows:10001});
    preview.sheetNames=workbook.SheetNames;
    if(input.sheetName&&!workbook.SheetNames.includes(input.sheetName))throw new BetaError('INVALID_SHEET','Selected worksheet does not exist.');
    if(workbook.SheetNames.length!==1&&!input.sheetName){preview.status='needs_sheet_selection';preview.message='Select the worksheet containing account transactions.';}
    else {const sheetName=input.sheetName||workbook.SheetNames[0];if(!sheetName)throw new BetaError('EMPTY_FILE','Workbook has no worksheets.');preview.sheetName=sheetName;const sheet=workbook.Sheets[sheetName];const fullRange=sheet['!fullref']||sheet['!ref'];if(fullRange&&XLSX.utils.decode_range(fullRange).e.r>=10000)throw new BetaError('FILE_TOO_LARGE','Worksheet exceeds 10000 rows. Split it before uploading.');csv=XLSX.utils.sheet_to_csv(sheet,{dateNF:'yyyy-mm-dd'});}
   } else if(extension==='.pdf'){
    if(!bytes.subarray(0,5).equals(Buffer.from('%PDF-')))throw new BetaError('INVALID_FILE','File is not a PDF document.');
    const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
    const task=getDocument({data:new Uint8Array(bytes),useSystemFonts:true});
    try {const pdf=await task.promise;if(pdf.numPages>200)throw new BetaError('FILE_TOO_LARGE','PDF exceeds the 200 page limit.');preview.sourceLines=[];
     for(let page=1;page<=pdf.numPages;page++){
      const content=await (await pdf.getPage(page)).getTextContent();const rows=new Map<number,{x:number;text:string}[]>();
      for(const item of content.items){if(!('str' in item))continue;const y=Math.round(item.transform[5]);const row=rows.get(y)||[];row.push({x:item.transform[4],text:item.str});rows.set(y,row);}
      let line=0;for(const [,items] of [...rows].sort((a,b)=>b[0]-a[0]))preview.sourceLines.push({page,line:++line,text:items.sort((a,b)=>a.x-b.x).map(i=>i.text).join(' ').trim()});
     }
     const lines=preview.sourceLines.map(l=>l.text).filter(Boolean);if(!lines.length){preview.status='unsupported_scan';preview.message='This PDF has no extractable text. Scanned statements require OCR and are not supported.';}
     else {preview.message='Review extracted page/line text and map or correct transaction columns before import.';const header=lines.findIndex(l=>/^date[,;\t]/i.test(l)&&/amount/i.test(l));if(header>=0)csv=lines.slice(header).join('\n');}
    } finally {await task.destroy();}
   } else {preview.status='unsupported_format';preview.message='Supported: CSV, XLS, XLSX and text-layer PDF.';}
  } catch(error){if(error instanceof BetaError)throw error;preview.status='failed';preview.message='Document could not be read. Check that it is not encrypted, corrupted or in an unsupported layout.';}
  if(input.correctedCsv&& !['unsupported_format','unsupported_scan','failed'].includes(preview.status))csv=input.correctedCsv;
  const originalHash=createHash('sha256').update(bytes).digest('hex');
  if(csv){const parsed=this.parse(user,account.id,input.fileName,csv);Object.assign(preview,parsed,{status:parsed.statement.status});preview.statement!.fileFormat=extension==='.pdf'?'pdf':['.xls','.xlsx'].includes(extension)?'xlsx':'csv';
   preview.transactions=preview.transactions.map((transaction,index)=>({...transaction,rawRow:{...transaction.rawRow,__source_file:input.fileName,__source_sheet:preview.sheetName||'',__source_row:String(Number(transaction.id.split('_').at(-1))+1)}}));
  }
  const latest=this.store.get(user.id,'state') as BetaState|null;if(!latest||latest.version!==envelope.version)throw new BetaError('SUPERSEDED','Profile changed while parsing the file. Retry.',409);
  this.store.put(user.id,`import:${id}`,{preview,original:input.contentBase64,csv,originalHash} satisfies StoredImport);return preview;
 }
 get(userId:string,id:string):BetaImportPreview|null{return (this.store.get(userId,`import:${id}`) as StoredImport|null)?.preview||null;}
 private parse(user:User,accountId:string,fileName:string,csv:string){const envelope=this.store.get(user.id,'state') as BetaState|null;if(!envelope)throw new BetaError('SUPERSEDED','Profile no longer exists.',409);const state=envelope.state;const account=state.accounts.find(a=>a.id===accountId);if(!account)throw new BetaError('INVALID_ACCOUNT','The target account no longer exists.',404);return parseStatementCSVContent({userId:user.id,account,allAccounts:state.accounts,fileName:fileName+'.csv',content:csv,existingStatements:state.statements,existingTransactions:state.transactions});}
 confirm(user:User,id:string,expectedVersion:number):BetaState {
  this.store.database.exec('BEGIN IMMEDIATE');try {
   const record=this.store.get(user.id,`import:${id}`) as StoredImport|null;if(!record)throw new BetaError('NOT_FOUND','Import does not exist.',404);
   const current=this.financial.get(user);if(record.preview.confirmed){this.store.database.exec('COMMIT');return current;}
   if(current.version!==expectedVersion)throw new BetaError('VERSION_CONFLICT','Profile changed. Reload before confirming.',409);
   if(!record.csv||!['parsed_successfully','needs_review'].includes(record.preview.status))throw new BetaError('IMPORT_NOT_READY','Resolve file mapping and errors before confirming.');
   const parsed=this.parse(user,record.preview.accountId,record.preview.fileName,record.csv);
   if(parsed.statement.status==='failed'&&parsed.statement.duplicateCountSkipped===0)throw new BetaError('IMPORT_FAILED','No transactions can be imported.');
   parsed.transactions=parsed.transactions.map(transaction=>({...transaction,rawRow:{...transaction.rawRow,__source_file:record.preview.fileName,__source_sheet:record.preview.sheetName||'',__source_row:String(Number(transaction.id.split('_').at(-1))+1)}}));
   const state=structuredClone(current.state);parsed.statement.fileName=record.preview.fileName;parsed.statement.fileFormat=record.preview.statement?.fileFormat||'csv';
   state.statements.push(parsed.statement);state.transactions.push(...parsed.transactions);state.classifications.push(...parsed.classifications);
   const reconciled=reconcileTransfersAndConfirmations({userId:user.id,accounts:state.accounts,transactions:state.transactions,classifications:state.classifications,existingMatches:state.transferMatches,existingConfirmations:state.confirmations});
   state.transferMatches=reconciled.transferMatches;state.confirmations=reconciled.confirmations;state.classifications=reconciled.updatedClassifications;
   // Historical imports add dated observations only; the latest observation remains authoritative.
   if(parsed.statement.closingBalance!==null&&parsed.statement.periodEnd)state.balances.push({id:randomUUID(),accountId:record.preview.accountId,amount:parsed.statement.closingBalance,currency:parsed.statement.currency||state.accounts.find(a=>a.id===record.preview.accountId)!.currency,asOf:parsed.statement.periodEnd,sourceType:'statement_closing',sourceId:parsed.statement.id,createdAt:new Date().toISOString()});
   const result={...current,version:current.version+1,state};this.store.put(user.id,'state',result);this.store.remove(user.id,'analysis');this.store.remove(user.id,'analysis-private');
   record.confirmedStatementId=parsed.statement.id;record.preview.statement=parsed.statement;record.preview.confirmed=true;record.preview.status='confirmed';this.store.put(user.id,`import:${id}`,record);this.store.database.exec('COMMIT');return result;
  }catch(error){this.store.database.exec('ROLLBACK');throw error;}
 }
 deleteImport(user:User,id:string,expectedVersion:number):BetaState {
  this.store.database.exec('BEGIN IMMEDIATE');try {
   const record=this.store.get(user.id,`import:${id}`) as StoredImport|null;if(!record)throw new BetaError('NOT_FOUND','Import does not exist.',404);
   const current=this.financial.get(user);if(current.version!==expectedVersion)throw new BetaError('VERSION_CONFLICT','Profile changed. Reload before deleting.',409);
   const state=structuredClone(current.state);const statementId=record.confirmedStatementId;
   if(statementId){
    const transactionIds=new Set(state.transactions.filter(t=>t.statementId===statementId).map(t=>t.id));
    const matchIds=new Set(state.transferMatches.filter(m=>transactionIds.has(m.outgoingTransactionId)||!!m.incomingTransactionId&&transactionIds.has(m.incomingTransactionId)).map(m=>m.id));
    state.statements=state.statements.filter(s=>s.id!==statementId);state.transactions=state.transactions.filter(t=>!transactionIds.has(t.id));
    state.classifications=state.classifications.filter(c=>!transactionIds.has(c.transactionId));state.transferMatches=state.transferMatches.filter(m=>!matchIds.has(m.id));
    state.confirmations=state.confirmations.filter(c=>!transactionIds.has(c.subjectId)&&!matchIds.has(c.subjectId));state.balances=state.balances.filter(b=>b.sourceId!==statementId);
   }
   state.recommendations=[];const result={...current,version:current.version+1,state};this.store.put(user.id,'state',result);this.store.remove(user.id,`import:${id}`);this.store.remove(user.id,'analysis');this.store.remove(user.id,'analysis-private');this.store.database.exec('COMMIT');return result;
  }catch(error){this.store.database.exec('ROLLBACK');throw error;}
 }}





