import { afterEach,describe,expect,it } from 'vitest';
import * as XLSX from 'xlsx';
import { BetaFinancial } from '../src/beta/financial';
import { BetaImports } from '../src/beta/imports';
import { BetaStore } from '../src/beta/store';
const stores:BetaStore[]=[];const user={id:'imports_user',name:'Mira',email:'mira@example.com'};
function setup(){const store=new BetaStore({filename:':memory:'});stores.push(store);const financial=new BetaFinancial(store);const state=financial.get(user);state.state.accounts.push({id:'main',userId:user.id,name:'Main',institution:'Test',currency:'EUR',purposes:['daily_spending'],fundsOwnership:'personal',personalAvailableAmount:null,isPrimary:true,notes:'',createdAt:'',updatedAt:''});state.state.balances.push({id:'newer',accountId:'main',amount:500,asOf:'2026-11-05',currency:'EUR',sourceType:'user_reported',createdAt:''});store.put(user.id,'state',state);return {store,financial,imports:new BetaImports(store,financial)};}
afterEach(()=>{for(const s of stores.splice(0))s.close();});
const csv='Date,Description,Amount,Currency,Balance\n2026-10-05,Test salary,100,EUR,100\n2026-10-06,Test groceries,-20,EUR,80';
function input(fileName:string,content:string|Buffer){return {accountId:'main',fileName,contentBase64:Buffer.from(content).toString('base64')};}
function pdf(text:string){const stream=`BT /F1 10 Tf 40 700 Td (${text.replace(/[\\()]/g,'\\$&')}) Tj ET`;const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`];let doc='%PDF-1.4\n';const offsets=[0];objects.forEach((obj,i)=>{offsets.push(Buffer.byteLength(doc));doc+=`${i+1} 0 obj\n${obj}\nendobj\n`;});const xref=Buffer.byteLength(doc);doc+=`xref\n0 6\n0000000000 65535 f \n`+offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;return Buffer.from(doc);}
describe('Beta real-file imports',()=>{
 it('previews then atomically confirms and retains newer manual balance',async()=>{const {imports,financial}=setup();const p=await imports.preview(user,input('test.csv',csv));expect(p.transactions).toHaveLength(2);expect(financial.get(user).state.transactions).toHaveLength(0);const saved=imports.confirm(user,p.id,0);expect(saved.version).toBe(1);expect(saved.state.transactions).toHaveLength(2);expect(saved.state.balances.find(x=>x.id==='newer')!.amount).toBe(500);expect(saved.state.balances.find(x=>x.sourceType==='statement_closing')!.asOf).toBe('2026-10-06');expect(imports.confirm(user,p.id,0).version).toBe(1);});
 it('rejects foreign lookup, stale confirmation and wrong account',async()=>{const {imports,financial}=setup();const p=await imports.preview(user,input('test.csv',csv));expect(imports.get('other',p.id)).toBeNull();expect(()=>imports.confirm(user,p.id,99)).toThrow();expect(financial.get(user).state.transactions).toHaveLength(0);await expect(imports.preview(user,{...input('test.csv',csv),accountId:'foreign'})).rejects.toThrow();});
 it('deduplicates reuploaded operations',async()=>{const {imports}=setup();const first=await imports.preview(user,input('first.csv',csv));imports.confirm(user,first.id,0);const second=await imports.preview(user,input('second.csv',csv+'\n'));expect(second.transactions).toHaveLength(0);expect(second.statement!.duplicateCountSkipped).toBe(2);});
 it.each(['xlsx','xls'])('reads actual Excel %s worksheets without running formulas',async ext=>{const {imports}=setup();const workbook=XLSX.utils.book_new();XLSX.utils.book_append_sheet(workbook,XLSX.utils.aoa_to_sheet([['Date','Description','Amount','Currency'],['2026-11-01','Test salary',125,'EUR']]),'Transactions');const buffer=XLSX.write(workbook,{type:'buffer',bookType:ext==='xls'?'biff8':'xlsx'});const p=await imports.preview(user,input('sheet.'+ext,buffer));expect(p.transactions.map(t=>t.amount)).toEqual([125]);expect(p.sheetName).toBe('Transactions');});
 it('requires explicit worksheet selection for multiple sheets',async()=>{const {imports}=setup();const book=XLSX.utils.book_new();for(const name of ['One','Two'])XLSX.utils.book_append_sheet(book,XLSX.utils.aoa_to_sheet([['Date','Amount'],['2026-11-01',25]]),name);const payload=input('many.xlsx',XLSX.write(book,{type:'buffer',bookType:'xlsx'}));const p=await imports.preview(user,payload);expect(p.status).toBe('needs_sheet_selection');expect((await imports.preview(user,{...payload,sheetName:'Two'})).status).toBe('needs_mapping');});
 it('extracts text PDF with page provenance and requires mapping rather than inventing records',async()=>{const {imports}=setup();const p=await imports.preview(user,input('text.pdf',pdf('Account statement for November')));expect(p.status).toBe('needs_mapping');expect(p.transactions).toHaveLength(0);expect(p.sourceLines?.[0]).toMatchObject({page:1,line:1,text:'Account statement for November'});});
 it('rejects unsupported, corrupt PDF and invalid base64',async()=>{const {imports}=setup();expect((await imports.preview(user,input('script.exe','malicious'))).status).toBe('unsupported_format');await expect(imports.preview(user,input('wrong.pdf','not pdf'))).rejects.toThrow();await expect(imports.preview(user,{...input('x.csv',csv),contentBase64:'not@base64'})).rejects.toThrow();});
 it('deletes original, preview and confirmed imported records while preserving manual balances',async()=>{const {imports,financial,store}=setup();const p=await imports.preview(user,input('delete.csv',csv));const confirmed=imports.confirm(user,p.id,0);store.put(user.id,'analysis',{old:true});expect(()=>imports.deleteImport(user,p.id,0)).toThrow();const deleted=imports.deleteImport(user,p.id,confirmed.version);expect(deleted.state.transactions).toHaveLength(0);expect(deleted.state.classifications).toHaveLength(0);expect(deleted.state.statements).toHaveLength(0);expect(deleted.state.balances.map(b=>b.id)).toEqual(['newer']);expect(imports.get(user.id,p.id)).toBeNull();expect(store.get(user.id,'analysis')).toBeNull();expect(financial.get(user).version).toBe(2);}); it('does not recreate a deleted account state when PDF parsing completes late',async()=>{const {imports,store}=setup();const pending=imports.preview(user,input('late.pdf',pdf('Private statement')));store.deleteUser(user.id);await expect(pending).rejects.toMatchObject({code:'SUPERSEDED'});expect(store.get(user.id,'state')).toBeNull();expect(store.database.prepare('SELECT * FROM beta_documents WHERE user_id=?').all(user.id)).toHaveLength(0);});});



function revolutFixture() {
  const cells = (y: number, ...items: [number, string][]) => items.map(([x, value]) =>
    `BT /F1 9 Tf ${x} ${y} Td (${value.replace(/[\\()]/g, '\\$&')}) Tj ET`).join('\n');
  const headers = (y: number) => cells(y,[40,'Date'],[125,'Description'],[335,'Money out'],[417,'Money in'],[526,'Balance']);
  const pages = [
    [cells(750,[40,'Revolut Bank UAB']),cells(732,[40,'HUF Statement']),
      cells(712,[40,'Product'],[253,'Opening balance'],[335,'Money out'],[417,'Money in']),
      cells(696,[40,'Current account'],[253,'900.00 HUF'],[335,'50.00 HUF'],[417,'0.00 HUF']),
      headers(668),cells(648,[40,'Nov 1, 2026'],[125,'Test Shop'],[335,'50.00 HUF'],[520,'850.00 HUF']),
      cells(636,[125,'Continuation']),headers(610),
      cells(590,[40,'Nov 2, 2026'],[125,'Repeated'],[335,'50.00 HUF'],[520,'800.00 HUF']),
      cells(570,[40,'Nov 2, 2026'],[125,'Repeated'],[335,'50.00 HUF'],[520,'750.00 HUF']),
      cells(550,[40,'Nov 3, 2026'],[125,'Ambiguous'],[335,'20.00 HUF'],[417,'10.00 HUF']),
      cells(510,[40,'Pending from November']),headers(490),
      cells(470,[40,'Nov 4, 2026'],[125,'Pending card'],[335,'99.00 HUF'])].join('\n'),
    [cells(732,[40,'USD Statement']),headers(668),
      cells(648,[40,'Nov 2, 2026'],[125,'Test income'],[417,'1,250.00 USD'],[520,'1,250.00 USD'])].join('\n'),
  ];
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [4 0 R 6 0 R] /Count 2 >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
  for(const stream of pages) {
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${objects.length+2} 0 R >>`,
      `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
  }
  let doc='%PDF-1.4\n';
  const offsets=objects.map((obj,index)=>{
    const offset=Buffer.byteLength(doc);
    doc+=`${index+1} 0 obj\n${obj}\nendobj\n`;
    return offset;
  });
  const xref=Buffer.byteLength(doc);
  doc+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`+offsets.map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+
    `trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(doc);
}

describe('Revolut PDF grouped imports',()=>{
 it('maps currencies, resolves flagged rows, preserves repeated operations and confirms atomically',async()=>{
  const {imports,financial,store}=setup();
  const initial=financial.get(user);
  for (const currency of ['HUF','USD']) initial.state.accounts.push({...initial.state.accounts[0],id:currency,name:currency,currency});
  store.put(user.id,'state',initial);
  const payload=input('synthetic-revolut.pdf',revolutFixture());
  const p=await imports.preview(user,payload);
  expect(p.status).toBe('needs_accounts');
  expect(p.pdf?.groups.map(g=>[g.currency,g.operations.length])).toEqual([['HUF',3],['USD',1]]);
  expect(p.pdf?.groups[0].operations[0].description).toBe('Test Shop Continuation');
  expect(p.pdf?.excluded.HUF).toEqual({pending:1,summary:1});
  const issue=p.pdf!.issues[0];
  expect(issue.reason).toContain('exactly one');
  const options={expectedVersion:0,accounts:{HUF:'HUF',USD:'USD'},excludedRows:[],corrections:{}};
  expect(()=>imports.mapPdf(user,p.id,options)).toThrow(/explicitly exclude/);
  const mapped=imports.mapPdf(user,p.id,{...options,corrections:{[issue.id]:{date:'2026-11-03',description:'Reviewed',amount:-10}}});
  expect(mapped.transactions).toHaveLength(5);
  const changed=structuredClone(initial);
  changed.version=1;
  changed.state.accounts=changed.state.accounts.filter(a=>a.id!=='USD');
  store.put(user.id,'state',changed);
  expect(()=>imports.confirm(user,p.id,1)).toThrow(/Check accounts/);
  expect(()=>imports.mapPdf(user,p.id,{...options,expectedVersion:1,excludedRows:[issue.id]})).toThrow(/USD accounts/);
  expect(financial.get(user).state.transactions).toHaveLength(0);
  store.put(user.id,'state',{...initial,version:2});
  imports.mapPdf(user,p.id,{...options,expectedVersion:2,excludedRows:[issue.id]});
  const saved=imports.confirm(user,p.id,2);
  expect(saved.state.transactions.map(row=>row.amount)).toEqual([-50,-50,-50,1250]);
  expect(saved.state.transactions.at(-1)?.rawRow.__source_page).toBe('2');
  expect(saved.state.statements).toHaveLength(2);
  expect(imports.confirm(user,p.id,2).version).toBe(3);
  const again=await imports.preview(user,payload);
  const duplicates=imports.mapPdf(user,again.id,{...options,expectedVersion:3,excludedRows:[again.pdf!.issues[0].id]});
  expect(duplicates.pdf?.groups.map(g=>g.duplicates)).toEqual([3,1]);
  expect(imports.confirm(user,again.id,3).version).toBe(3);
  const deleted=imports.deleteImport(user,p.id,3);
  expect(deleted.state.transactions).toHaveLength(0);
  expect(deleted.state.statements).toHaveLength(0);
 });
});
