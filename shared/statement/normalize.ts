import type { NormalizedResult,ParsingOptions,SourceCell,SourceRecord,StatementField } from './types';
export const aliases:Record<StatementField,string[]>={date:['date','transaction date','booking date','completed date','started date','time','дата операции','дата'],description:['description','details','narrative','name','merchant','title','memo','counterparty','payee','описание операции','назначение платежа'],amount:['amount','value','total','signed amount','net amount','сумма операции','сумма'],debit:['debit','outflow','paid out','withdrawal','money out'],credit:['credit','inflow','paid in','deposit','money in'],currency:['currency','ccy','curr'],balance:['balance','closing balance','running balance','остаток','баланс'],reference:['reference','ref','id','transaction id','transferwise id','payment reference']};
function fail(code:string,message:string):never {throw Object.assign(new Error(message),{code});}
function calendar(y:number,m:number,d:number):string {
 const leap=y%4===0&&(y%100!==0||y%400===0),days=[31,leap?29:28,31,30,31,30,31,31,30,31,30,31];
 if(y<1||y>9999||m<1||m>12||d<1||d>days[m-1])return fail('INVALID_DATE','Impossible calendar date.');
 return `${String(y).padStart(4,'0')}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}
export function normalizeDate(raw:string|number,convention?:ParsingOptions['dateConvention'],excel1904=false):string {
 if(typeof raw==='number'){
  if(!Number.isFinite(raw)||raw<0||(!excel1904&&Math.floor(raw)===60))return fail('INVALID_DATE','Invalid Excel date, including fictitious 1900-02-29.');
  const serial=Math.floor(raw);const date=new Date(Date.UTC(excel1904?1904:1899,excel1904?0:11,excel1904?1:31)+(serial-(!excel1904&&serial>60?1:0))*86400000);
  return calendar(date.getUTCFullYear(),date.getUTCMonth()+1,date.getUTCDate());
 }
 const value=raw.trim().replace(/^(\d{1,2}[/.-]\d{1,2}[/.-]\d{4})\s+\d{2}:\d{2}(?::\d{2})?$/, '$1');
 const iso=value.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z|[+-](?:[01]\d|2[0-3]):?[0-5]\d)?)?$/);
 if(iso)return calendar(+iso[1],+iso[2],+iso[3]);
 const ymd=value.match(/^(\d{4})([/.\-])(\d{1,2})\2(\d{1,2})$/);
 if(ymd)return calendar(+ymd[1],+ymd[3],+ymd[4]);
 const numeric=value.match(/^(\d{1,2})([/.\-])(\d{1,2})\2(\d{4})$/);
 if(numeric){const a=+numeric[1],b=+numeric[3];if(!convention&&a<=12&&b<=12&&a!==b)return fail('AMBIGUOUS_DATE','Choose a file-level DMY or MDY date convention.');if(convention==='YMD')return fail('INVALID_DATE','Date does not match YMD convention.');const mdy=convention==='MDY'||(!convention&&b>12);return calendar(+numeric[4],mdy?a:b,mdy?b:a);}
 const months=['january','february','march','april','may','june','july','august','september','october','november','december'];
 const named=value.replace(/,/g,'').match(/^(?:(\d{1,2})[ \-]([A-Za-z]+)|([A-Za-z]+)[ \-](\d{1,2}))[ \-](\d{4})$/);
 if(named){const month=(named[2]||named[3]).toLowerCase();const index=months.findIndex(x=>x===month||x.slice(0,3)===month);if(index>=0)return calendar(+named[5],index+1,+(named[1]||named[4]));}
 return fail('INVALID_DATE','Use a valid ISO date, four-digit DMY/MDY year, or English month name.');
}
export function normalizeAmount(raw:string|number,convention?:ParsingOptions['numberConvention']):number {
 if(typeof raw==='number'){if(!Number.isFinite(raw)||Math.abs(raw)>Number.MAX_SAFE_INTEGER/100)return fail('INVALID_AMOUNT','Amount outside supported precision.');return raw;}
 let value=raw.trim().replace(/\u2212/g,'-').replace(/^[€$£¥]|[€$£¥]$/g,'').trim(),negative=false;
 if(/^\(.*\)$/.test(value)){negative=true;value=value.slice(1,-1).trim();}
 if(value.endsWith('-')){if(negative||/^[+-]/.test(value))return fail('INVALID_AMOUNT','Conflicting amount signs.');negative=true;value=value.slice(0,-1).trim();}
 if(/^[+-]/.test(value)){if(negative)return fail('INVALID_AMOUNT','Conflicting amount signs.');negative=value[0]==='-';value=value.slice(1).trim();}
 if(!/^\d[\d., '\u00a0\u202f]*$/.test(value))return fail('INVALID_AMOUNT','Invalid amount.');
 const dot=value.lastIndexOf('.'),comma=value.lastIndexOf(',');let decimal:string|undefined=convention==='decimal-point'?'.':convention==='decimal-comma'?',':undefined;
 if(!decimal&&dot>=0&&comma>=0)decimal=dot>comma?'.':',';
 if(!decimal&&(dot>=0||comma>=0)) {const sep=dot>=0?'.':',';const parts=value.split(sep);if(parts.length===2&&/^\d{1,3}$/.test(parts[0])&&/^\d{3}$/.test(parts[1]))return fail('AMBIGUOUS_NUMBER','Choose decimal-point or decimal-comma number convention.');decimal=parts.length===2?sep:undefined;}
 const pieces=decimal?value.split(decimal):[value];if(pieces.length>2||pieces.length===2&&!/^\d+$/.test(pieces[1]))return fail('INVALID_AMOUNT','Invalid decimal grouping.');
 let whole=pieces[0];if(/\D/.test(whole)){const separators=whole.match(/\D/g)!;if(new Set(separators.map(x=>/[ \u00a0\u202f]/.test(x)?' ':x)).size!==1||!/^\d{1,3}(?:[., '\u00a0\u202f]\d{3})+$/.test(whole))return fail('INVALID_AMOUNT','Invalid thousands grouping.');whole=whole.replace(/\D/g,'');}
 const result=Number(whole+(pieces.length===2?'.'+pieces[1]:''))*(negative?-1:1);
 if(!Number.isFinite(result)||Math.abs(result)>Number.MAX_SAFE_INTEGER/100)return fail('INVALID_AMOUNT','Amount outside supported precision.');return result;
}
export function csvRecords(content:string,delimiter:string):SourceRecord[]{
 const records:SourceRecord[]=[];let cells:string[]=[],value='',quoted=false,closed=false,bad=false,row=1,start=1;
 const emit=()=>{cells.push(value);if(cells.some(x=>x.trim()))records.push({cells:cells.map(x=>({value:x,display:x})),source:{row:start},malformed:bad||quoted});cells=[];value='';bad=false;closed=false;};
 const text=content.replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n');
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){value+='"';i++;}else if(quoted){quoted=false;closed=true;}else if(!value&&!closed)quoted=true;else bad=true;}
 else if(c===delimiter&&!quoted){cells.push(value);value='';closed=false;}
 else if(c==='\n'){if(quoted)value+='\n';else {emit();start=row+1;}row++;}
 else {if(closed&&!/\s/.test(c))bad=true;value+=c;}}
 if(value||cells.length||quoted)emit();return records;
}
function mappingFor(record:SourceRecord):Partial<Record<StatementField,number>> {const headers=record.cells.map(c=>String(c.value).trim().toLowerCase());return Object.fromEntries(Object.entries(aliases).flatMap(([field,names])=>{const i=headers.findIndex(h=>names.includes(h));return i<0?[]:[[field,i]];}));}
export function readCSV(content:string,options:ParsingOptions):SourceRecord[]{
 if(options.delimiter)return csvRecords(content,options.delimiter);
 return [',',';','\t'].map(d=>csvRecords(content,d)).sort((a,b)=>score(b)-score(a))[0];
 function score(records:SourceRecord[]){return Math.max(0,...records.slice(0,100).map(r=>Object.keys(mappingFor(r)).length));}
}
export function normalizeRecords(records:SourceRecord[],format:string,accountCurrency:string,options:ParsingOptions={},excludedRows:string[]=[],excel1904=false,inferDateConvention=false):NormalizedResult {
 if(records.length>10000)throw new Error('Statement exceeds 10000 rows. Split it before uploading.');
 const result:NormalizedResult={rows:[],review:{format,options,headers:[],issues:[],mappingRequired:false,requiresDateConvention:false,requiresNumberConvention:false,reconciliation:[]}};
 const headerIndex=options.headerRow!==undefined?records.findIndex(r=>r.source.row===options.headerRow):records.findIndex(r=>{const m=mappingFor(r);return m.date!==undefined&&(m.amount!==undefined||m.debit!==undefined||m.credit!==undefined);});
 if(headerIndex<0){result.review.mappingRequired=true;result.review.headers=records[0]?.cells.map(c=>c.display)||[];return result;}
 const header=records[headerIndex];result.review.headers=header.cells.map(c=>c.display);const mapping={...mappingFor(header),...options.mapping};
 if(mapping.date===undefined||mapping.description===undefined||(mapping.amount===undefined&&mapping.debit===undefined&&mapping.credit===undefined)){result.review.mappingRequired=true;return result;}
 if (inferDateConvention && !options.dateConvention) {
  const conventions = new Set<NonNullable<ParsingOptions['dateConvention']>>();
  for (const row of records.slice(headerIndex + 1)) {
   const value = String(row.cells[mapping.date]?.value ?? '').trim();
   const parts = /^(\d{1,2})[/.-](\d{1,2})[/.-]\d{4}(?:\s|$)/.exec(value);
   if (parts && +parts[1] > 12 && +parts[2] <= 12) conventions.add('DMY');
   if (parts && +parts[2] > 12 && +parts[1] <= 12) conventions.add('MDY');
  }
  if (conventions.size === 1) {
   options = {...options, dateConvention: [...conventions][0]};
   result.review.options = options;
  }
 }
 let detectedConventions=new Set<string>();
 // A mixture of unambiguous comma and point decimals requires an explicit choice.
 for(const record of records.slice(headerIndex+1))for(const field of ['amount','debit','credit','balance'] as StatementField[]){const c=record.cells[mapping[field]??-1];if(c&&typeof c.value==='string'){if(/\d,\d{1,2}(?:\)|-)?$/.test(c.value.trim()))detectedConventions.add('decimal-comma');if(/\d\.\d{1,2}(?:\)|-)?$/.test(c.value.trim()))detectedConventions.add('decimal-point');}}
 const conflict=!options.numberConvention&&detectedConventions.size>1;
 for(const record of records.slice(headerIndex+1)){
  const id=`${record.source.sheet||''}:${record.source.page||''}:${record.source.row}`;const original=record.cells.map(c=>c.display);const excluded=excludedRows.includes(id);
  const issue=(code:string,message:string)=>result.review.issues.push({id,source:record.source,code,message,original,excluded});
  if(excluded){issue('EXCLUDED','Explicitly excluded from import.');continue;}
  try{
   if(record.malformed)fail('MALFORMED_CSV','Malformed or unclosed quoted CSV field.');
   if(record.cells.length!==header.cells.length)fail('COLUMN_COUNT','Column count differs from selected header.');
   const cell=(field:StatementField):SourceCell|undefined=>record.cells[mapping[field]??-1];
   const val=(field:StatementField):string|number=>{const c=cell(field);if(c?.formula)fail('FORMULA_CELL','Formula cells must be replaced with reviewed values; formulas are never executed.');return c?.value??'';};
   const dateValue=val('date');if(typeof dateValue==='number'&&!cell('date')?.dateSerial)fail('INVALID_DATE','Numeric date cell has no Excel date format.');
   const date=normalizeDate(dateValue,options.dateConvention,excel1904);
   const description=String(val('description')).trim();if(!description)fail('MISSING_DESCRIPTION','Description is missing; map or correct it.');
   if(conflict)fail('NUMBER_CONFLICT','Conflicting number conventions: choose a file-level convention.');
   let amount:number;
   if(mapping.amount!==undefined)amount=normalizeAmount(val('amount'),options.numberConvention);
   else {const d=val('debit'),c=val('credit'),debit=String(d).trim()?normalizeAmount(d,options.numberConvention):0,credit=String(c).trim()?normalizeAmount(c,options.numberConvention):0;if(debit&&credit||debit<0||credit<0)fail('DEBIT_CREDIT_CONFLICT','Use exactly one nonnegative debit or credit amount.');if(!String(d).trim()&&!String(c).trim())fail('INVALID_AMOUNT','Both debit and credit are blank.');amount=credit-debit;}
   const currency=String(val('currency')||accountCurrency).trim().toUpperCase();if(!/^[A-Z]{3}$/.test(currency))fail('INVALID_CURRENCY','Use a three-letter currency code.');
   if(currency!==accountCurrency)fail('CURRENCY_MAPPING','This currency does not match the selected account. Select its account or explicitly exclude this row.');
   const balanceRaw=val('balance');const balance=String(balanceRaw).trim()?normalizeAmount(balanceRaw,options.numberConvention):undefined;
   const bankField = (...names: string[]) => {
    const column = result.review.headers.findIndex(name => names.includes(name.trim().toLowerCase()));
    return column < 0 ? undefined : record.cells[column]?.display.trim();
   };
   const feeText = inferDateConvention ? bankField('fee','total fees','transaction fee') : undefined;
   let fee: number | undefined;
   if (feeText) {
    try { fee = Math.abs(normalizeAmount(feeText, options.numberConvention)); }
    catch { /* The transaction remains readable when the fee format is unclear. */ }
   }
   result.rows.push({date,description,amount,currency,balance,fee,reference:cell('reference')?.display||'',
    counterparty:bankField('merchant') || bankField('counterparty','payee','beneficiary') || bankField(amount < 0 ? 'payee name' : 'payer name'),
    bankType:bankField('transaction details type') || bankField('type','transaction type'),original,source:record.source});
  }catch(error){const e=error as Error&{code?:string};issue(e.code||'INVALID_ROW',e.message);}
 }
 result.review.requiresDateConvention=result.review.issues.some(i=>!i.excluded&&i.code==='AMBIGUOUS_DATE');
 result.review.requiresNumberConvention=result.review.issues.some(i=>!i.excluded&&['AMBIGUOUS_NUMBER','NUMBER_CONFLICT'].includes(i.code));
 const dated=[...result.rows];const descending=dated.length>1&&dated[0].date>dated.at(-1)!.date;if(descending)dated.reverse();
 for(let i=1;i<dated.length;i++){const previous=dated[i-1],current=dated[i];if(previous.balance!==undefined&&current.balance!==undefined&&previous.currency===current.currency){const expected=previous.balance+current.amount,difference=Math.round((current.balance-expected)*1e8)/1e8;if(Math.abs(difference)>1e-8 && (current.fee === undefined || Math.abs(difference + current.fee) > 1e-8))result.review.reconciliation.push({currency:current.currency,sourceRow:current.source.row,expected,actual:current.balance,difference});}}
 return result;
}
