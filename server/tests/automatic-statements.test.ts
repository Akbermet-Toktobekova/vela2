import * as XLSX from 'xlsx';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {BetaStore} from '../src/beta/store';
import {BetaFinancial} from '../src/beta/financial';
import {BetaImports} from '../src/beta/imports';
import {BetaUploads} from '../src/beta/uploads';
import {BetaPlanning} from '../src/beta/planning';
import {BetaFindings} from '../src/beta/findings';
import {bankOperationHint} from '../src/analyzer/statementEnrichment';
import {SecurityService} from '../src/security/securityService';
import {TransactionClassifier} from '../src/analyzer/transactionClassifier';
import {LLMClient} from '../src/ai/llmClient';
import {ActionChecker} from '../src/checker/actionChecker';
import {loadPrototypePolicy} from '../src/config/policyLoader';
import {createBetaApp} from '../src/beta/app';
import {SharedFinancialCalculator} from '../../shared/calculator';
import type {AddressInfo} from 'node:net';

const user={id:'automatic-user',name:'Automatic',email:'automatic@example.test'};
const stamp='2026-11-05T12:00:00Z';
const stores:BetaStore[]=[];
afterEach(()=>{for(const store of stores.splice(0))store.close();});
function setup(){
 const store=new BetaStore({filename:':memory:'});stores.push(store);const financial=new BetaFinancial(store);
 const initial=financial.get(user);initial.state.preferences.statementReviewMode='automatic';
 initial.state.accounts=[{id:'main',userId:user.id,name:'Main',institution:'Synthetic',currency:'EUR',purposes:['daily_spending'],fundsOwnership:'personal',personalAvailableAmount:null,isPrimary:true,notes:'',createdAt:stamp,updatedAt:stamp}];
 initial.state.balances=[{id:'balance',accountId:'main',amount:10000,currency:'EUR',sourceType:'user_reported',asOf:stamp,createdAt:stamp}];
 initial.state.expenseCommitment={id:'expenses',userId:user.id,estimatedMonthlyAmount:1000,currency:'EUR',notes:'',updatedAt:stamp,details:[{id:'rent',name:'Rent',monthlyAmount:650,dueDate:'2026-11-10'}]};
 financial.persist(user.id,initial);
 const imports=new BetaImports(store,financial);const uploads=new BetaUploads(store,financial,imports);const planning=new BetaPlanning(store,financial);const findings=new BetaFindings(store,financial);
 return{store,financial,imports,uploads,planning,findings};
}
const file=(name:string,rows='2026-11-01,CloudBox Pro,-20,EUR')=>({accountId:'main',fileName:name,contentBase64:Buffer.from('Date,Description,Amount,Currency\n'+rows).toString('base64')});
async function imported(){const f=setup();const p=await f.imports.preview(user,file('one.csv'));f.imports.confirm(user,p.id,f.financial.get(user).version);return{...f,preview:p};}

describe('D-026 automatic statements and protected essential plan',()=>{
 it('stages multiple originals without parsing and processes them together only when requested',async()=>{
  const f=setup();f.uploads.stage(user,file('one.csv'));f.uploads.stage(user,file('two.csv','2026-11-02,Food,-30,EUR'));
  expect(f.financial.get(user).state.transactions).toHaveLength(0);expect(f.uploads.pending(user)).toHaveLength(2);
  await f.uploads.process(user);expect(f.uploads.list(user).map(u=>u.status)).toEqual(['complete','complete']);
  expect(f.financial.get(user).state.transactions).toHaveLength(2);
  const id=f.uploads.list(user)[0].importId!;expect((f.store.get(user.id,'import:'+id) as any).original).toBeTruthy();
 });
 it('keeps malformed files visibly incomplete without importing partial records',async()=>{
  const f=setup();f.uploads.stage(user,file('bad.csv','not-a-date,Unknown,-10,EUR'));await f.uploads.process(user);
  expect(f.uploads.list(user)[0].status).toBe('needs_attention');expect(f.financial.get(user).state.transactions).toHaveLength(0);
 });
 it('retains overlap provenance and deletes only records with no remaining statement source',async()=>{
  const f=await imported();const p=await f.imports.preview(user,file('overlap.csv','2026-11-01,CloudBox Pro,-20,EUR\n2026-11-02,Food,-30,EUR'));
  f.imports.confirm(user,p.id,f.financial.get(user).version);expect(f.financial.get(user).state.transactions).toHaveLength(2);
  f.imports.deleteImport(user,f.preview.id,f.financial.get(user).version);
  expect(f.financial.get(user).state.transactions).toHaveLength(2);
  f.imports.deleteImport(user,p.id,f.financial.get(user).version);expect(f.financial.get(user).state.transactions).toHaveLength(0);
 });
 it('allows editing, exclusion and restoration without mutating bank balances or original evidence',async()=>{
  const f=await imported();const before=structuredClone(f.financial.get(user));const id=before.state.transactions[0].id;
  f.planning.transaction(user,id,{expectedVersion:before.version,amount:-50,description:'Corrected'});
  expect(f.financial.snapshot(user).observedSpendingTotal).toBe(50);
  expect(f.financial.get(user).state.transactions[0].originalValues?.amount).toBe(-20);
  expect(f.financial.get(user).state.balances).toEqual(before.state.balances);
  f.planning.transaction(user,id,{expectedVersion:f.financial.get(user).version,excluded:true});expect(f.financial.snapshot(user).transactions).toHaveLength(0);
  f.planning.transaction(user,id,{expectedVersion:f.financial.get(user).version,restoreOriginal:true});expect(f.financial.snapshot(user).transactions[0].amount).toBe(-20);
  expect(()=>f.planning.transaction(user,id,{expectedVersion:before.version,amount:1})).toThrow('Refresh');
  expect(()=>f.planning.transaction(user,id,{expectedVersion:f.financial.get(user).version,category:'not-a-category'})).toThrow();
 });
 it('calculates target from essentials and dated details without duplicating the monthly total',()=>{
  const f=setup();const state=f.financial.get(user).state;expect(state.goals.find(g=>g.goalType==='emergency_cushion')?.targetAmount).toBe(3000);
  expect(state.obligations).toHaveLength(1);expect(state.obligations[0]).toMatchObject({amount:650,accountId:null,dueDate:'2026-11-10'});
  const current=f.financial.get(user);current.state.expenseCommitment!.estimatedMonthlyAmount=1200;f.financial.persist(user.id,current);
  expect(f.financial.get(user).state.goals.find(g=>g.goalType==='emergency_cushion')?.targetAmount).toBe(3000);
 });
 it('blocks optional other-goal actions until the reserve is funded and preserves critical coverage',()=>{
  const f=setup();const current=f.financial.get(user);current.state.goals.push({id:'education',userId:user.id,name:'Education',goalType:'general_savings',targetAmount:6000,currency:'EUR',targetDate:null,priority:'high',createdAt:stamp});f.financial.persist(user.id,current);
  const candidate:any={candidateId:'optional',actionId:'A012',actionType:'FINANCIAL_ACTION',title:'Contribution',description:'Contribute',rationale:'Test',targetId:'education',sourceAccountId:'main',destinationAccountId:null,amount:100,currency:'EUR',proposedTiming:'2026-11-05',supportingRuleIds:[],supportingClaimIds:[],supportingSourceIds:[],requiredPiInputs:[],origin:'AI_SUGGESTION'};
  const result=ActionChecker.validateCandidate(candidate,{snapshot:f.financial.snapshot(user),policy:loadPrototypePolicy(),calculatorExtras:{referenceDateIso:'2026-11-05'}});
  expect(result.failedChecks.some(c=>c.code==='PROTECTED_RESERVE_NOT_FUNDED')).toBe(true);
 });
 it('detects subscriptions without prompting or changing essentials, and saves explicit schedules',async()=>{
  const f=setup();
  f.uploads.stage(user,file('merchant.csv','2026-11-01,POS 8392 NETFLIX.COM AMSTERDAM,-15,EUR'));
  await f.uploads.process(user);
  const current=f.financial.get(user);
  expect(current.state.subscriptions).toEqual([expect.objectContaining({name:'Netflix',amount:15,detected:true})]);
  expect(current.state.subscriptions?.[0].nextDueDate).toBeUndefined();
  expect(f.findings.list(user).findings).toEqual([]);
  expect(current.state.expenseCommitment?.estimatedMonthlyAmount).toBe(1000);
  const sub=current.state.subscriptions![0];
  const update={name:sub.name,amount:15,currency:'EUR',frequency:'monthly',nextDueDate:'2026-12-01',includedInEssentials:false};
  const saved=f.planning.saveSubscription(user,sub.id,{...update,expectedVersion:current.version});
  expect(saved.state.obligations.filter(row=>row.name==='Netflix')).toHaveLength(1);
  expect(saved.state.expenseCommitment?.estimatedMonthlyAmount).toBe(1000);
  const ended=f.planning.saveSubscription(user,sub.id,{...update,expectedVersion:saved.version,status:'ended'});
  expect(ended.state.obligations.filter(row=>row.name==='Netflix')).toEqual([]);
  expect(ended.state.subscriptions).toHaveLength(1);
 });
 it('asks only about a plausible own-account transfer and excludes it until answered',async()=>{
  const f=setup();
  f.uploads.stage(user,file('transfers.csv','2026-11-01,Transfer to Automatic,-100,EUR\n2026-11-02,Transfer to Another Person,-50,EUR'));
  await f.uploads.process(user);
  const current=f.financial.get(user);
  expect(current.state.classifications.map(c=>c.economicType)).toEqual(['unknown','external_transfer']);
  expect(f.financial.snapshot(user).observedSpendingTotal).toBe(0);
  const [finding]=f.findings.list(user).findings;
  expect(finding.evidenceIds).toHaveLength(1);
  f.findings.respond(user,finding.id,{expectedVersion:current.version,evidenceVersion:finding.evidenceVersion,response:'internal_transfer'});
  expect(f.findings.list(user).findings).toEqual([]);
  expect(f.financial.snapshot(user).observedInternalTransfersTotal).toBe(100);
 });
 it('imports valid rows next to an ambiguous row and links a later correction to the same file',async()=>{
  const f=setup();
  const upload=f.uploads.stage(user,file('mixed.csv','2026-11-01,SPAR BUDAPEST,-15,EUR\n03/04/2026,Amazon,-40,EUR'));
  const [result]=await f.uploads.process(user);
  expect(result).toMatchObject({id:upload.id,status:'complete'});
  const preview=f.imports.get(user.id,result.importId!)!;
  expect(preview.unresolvedRows).toHaveLength(1);
  const state=f.financial.get(user);
  expect(state.state.transactions).toHaveLength(1);
  expect(state.state.classifications[0]).toMatchObject({displayName:'SPAR',category:'groceries_food'});
  const corrected=f.imports.correctRow(user,preview.id,preview.unresolvedRows![0].id,{
    expectedVersion:state.version,description:'Amazon',date:'2026-04-03',amount:-40,accountId:'main',
  });
  expect(corrected.state.transactions).toHaveLength(2);
  expect(corrected.state.transactions.map(row=>row.statementId)).toEqual([preview.statement!.id,preview.statement!.id]);
  expect(corrected.state.classifications[1]).toMatchObject({displayName:'Amazon',category:'other'});
  expect(f.imports.get(user.id,preview.id)?.unresolvedRows).toEqual([]);
 });
 it('imports independently mapped worksheets and keeps unrecognized rows visible',async()=>{
  const f=setup();
  const book=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book,XLSX.utils.aoa_to_sheet([['Date','Description','Amount','Currency'],
    ['2026-11-01','SPAR',-10,'EUR']]),'First');
  XLSX.utils.book_append_sheet(book,XLSX.utils.aoa_to_sheet([['Reference','Currency','Amount','Description','Date'],
    ['unique-ref','EUR',-15,'Netflix','2026-11-02']]),'Second');
  XLSX.utils.book_append_sheet(book,XLSX.utils.aoa_to_sheet([['An unknown layout']]),'Notes');
  f.uploads.stage(user,{accountId:'main',fileName:'worksheets.xlsx',contentBase64:XLSX.write(book,{type:'base64',bookType:'xlsx'})});
  const [upload]=await f.uploads.process(user);
  expect(upload.status).toBe('complete');
  expect(f.financial.get(user).state.transactions.map(row=>row.rawRow.__source_sheet)).toEqual(['First','Second']);
  expect(f.imports.get(user.id,upload.importId!)?.unresolvedRows).toMatchObject([{sheet:'Notes',row:1}]);
 });
 it('applies an explicit merchant edit to subsequent imports and protects the saved cushion target',async()=>{
  const f=setup();
  f.uploads.stage(user,file('first.csv','2026-11-01,SPAR BUDAPEST,-15,EUR'));
  await f.uploads.process(user);
  const current=f.financial.get(user);
  const changed=f.planning.transaction(user,current.state.transactions[0].id,{
    expectedVersion:current.version,displayName:'My SPAR',category:'shopping',applyToMerchant:true,
  });
  const targeted=f.planning.reserveTarget(user,{expectedVersion:changed.version,amount:2000});
  targeted.state.expenseCommitment!.estimatedMonthlyAmount=1200;
  f.financial.persist(user.id,targeted);
  f.uploads.stage(user,file('second.csv','2026-11-02,SPAR BUDAPEST,-19,EUR'));
  await f.uploads.process(user);
  const latest=f.financial.get(user);
  expect(latest.state.classifications.map(row=>row.displayName)).toEqual(['My SPAR','My SPAR']);
  expect(latest.state.classifications.every(row=>row.category==='shopping'&&row.status==='user_confirmed')).toBe(true);
  expect(latest.state.goals.find(row=>row.goalType==='emergency_cushion')?.targetAmount).toBe(2000);
 });
 it('isolates uploads and operation mutations between users',async()=>{
  const f=await imported();const stranger={...user,id:'other'};f.financial.get(stranger);
  expect(f.uploads.list(stranger)).toEqual([]);expect(()=>f.planning.transaction(stranger,f.financial.get(user).state.transactions[0].id,{expectedVersion:0,excluded:true})).toThrow('not found');
 });
 it('updates the reported reserve earmark without changing bank balances and rejects unsupported funds',()=>{
  const f=setup();const current=f.financial.get(user);current.state.balances[0].asOf=new Date().toISOString();f.financial.persist(user.id,current);
  const result=f.planning.reserveBalance(user,{expectedVersion:current.version,accountId:'main',amount:3000});
  expect(result.state.goalAllocations[0].amount).toBe(3000);expect(result.state.balances[0].amount).toBe(10000);
  expect(()=>f.planning.reserveBalance(user,{expectedVersion:result.version,accountId:'main',amount:10001})).toThrow('exceed');
  result.state.expenseCommitment!.estimatedMonthlyAmount=1200;f.financial.persist(user.id,result);
  expect(f.financial.get(user).state.goalAllocations[0].amount).toBe(3000);
  expect(f.financial.get(user).state.goals.find(g=>g.goalType==='emergency_cushion')?.targetAmount).toBe(3000);
 });
 it('preserves a confirmed transfer label across operation edits and reversible exclusions',async()=>{
  const f=await imported();const current=f.financial.get(user);const id=current.state.transactions[0].id;
  f.planning.transaction(user,id,{expectedVersion:current.version,isInternalTransfer:true,isSubscription:false});
  f.planning.transaction(user,id,{expectedVersion:f.financial.get(user).version,description:'Better description'});
  f.planning.transaction(user,id,{expectedVersion:f.financial.get(user).version,excluded:true});
  f.planning.transaction(user,id,{expectedVersion:f.financial.get(user).version,excluded:false});
  expect(f.financial.snapshot(user).classifications[id].economicType).toBe('internal_transfer');
 });
 it('preserves bank-declared fees and currency conversions through minimized model classification',async()=>{
  const f=setup();
  const csv=['Date,Description,Amount,Currency,Type,Payer Name',
    '2026-11-01,Account charge,-3,EUR,ACCRUAL_CHARGE,',
    '2026-11-02,Converted balance,35,EUR,CURRENCY EXCHANGE,',
    '2026-11-03,Incoming funds,50,EUR,DEPOSIT,Automatic',
    '2026-11-04,Card purchase,-12,EUR,CARD,'].join('\n');
  f.uploads.stage(user,{...file('types.csv'),contentBase64:Buffer.from(csv).toString('base64')});
  await f.uploads.process(user);
  const full=f.financial.snapshot(user);
  const local=full.transactions.map(tx=>full.classifications[tx.id]);
  expect(local.map(row=>row.category)).toEqual(['fees','transfer','transfer','other']);
  expect(local.map(row=>row.economicType)).toEqual(['interest_fee','internal_transfer','unknown','expense']);
  expect(local.map(row=>row.isInternalTransferCandidate)).toEqual([false,false,true,false]);
  const bankOperationHints=Object.fromEntries(full.transactions.map(tx=>[tx.id,bankOperationHint(tx,user.name)] as const));
  const snapshot=SecurityService.minimizePIForLLM(full);
  const llm=new LLMClient({mockMode:true});
  const generate=vi.spyOn(llm,'generateStructured').mockResolvedValue({
    data:{classifications:snapshot.transactions.map(tx=>({transactionId:tx.id,displayName:'Model label',
      category:'shopping',economicType:'expense',confidence:'high',isRecurringCandidate:false,rationale:'Test override'}))},
    liveCallUsed:true,provider:'gemini',modelUsed:'gemini-3.5-flash-lite',
  });
  const result=await TransactionClassifier.classify({snapshot,llmClient:llm,bankOperationHints});
  expect(full.transactions.map(tx=>result.updatedClassifications[tx.id].category)).toEqual(['fees','transfer','transfer','shopping']);
  const prompt=JSON.parse(generate.mock.calls[0][0].userPrompt);
  expect(prompt.transactions.map((tx: {bankOperationType?: string})=>tx.bankOperationType)).toEqual([
    'bank_fee','currency_conversion','possible_own_transfer',undefined,
  ]);
 });
 it('uses Other and keeps observed spending when Gemini is unavailable',async()=>{
  const f=await imported();const llm=new LLMClient({mockMode:true});
  const result=await TransactionClassifier.classify({snapshot:f.financial.snapshot(user),llmClient:llm});
  const cls=Object.values(result.updatedClassifications)[0];expect(cls.category).toBe('other');expect(cls.economicType).toBe('expense');
 });
 it('publishes uploaded statement AI labels even when a later review stage fails',async()=>{
  const store=new BetaStore({filename:':memory:'});
  const llm=new LLMClient({mockMode:true});
  const generate=vi.spyOn(llm,'generateStructured').mockImplementation(async params=>{
   const input=JSON.parse(params.userPrompt);
   return {provider:'gemini',modelUsed:'gemini-3.5-flash-lite',liveCallUsed:true,data:{
    classifications:input.transactions.map((tx: {transactionId:string})=>({transactionId:tx.transactionId,
     displayName:'Neighborhood Cafe',category:'dining_coffee',economicType:'expense',confidence:'high',isRecurringCandidate:false,rationale:'Card merchant is a cafe.'})),
   }};
  });
  const app=createBetaApp({store,llmClient:llm,analysisOptions:{onStage:artifact=>{
   if(artifact.stage==='pattern-recognition')throw new Error('Simulated downstream review failure');
  }}});
  const server=app.app.listen(0,'127.0.0.1');
  await new Promise<void>(resolve=>server.once('listening',resolve));
  const base='http://127.0.0.1:'+(server.address() as AddressInfo).port+'/api/beta';
  const register=await fetch(base+'/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({name:'AI Test',email:'automatic-ai@example.test',password:'Synthetic-Password-123!'})});
  const auth=await register.json() as any;
  const headers={'Content-Type':'application/json',Authorization:'Bearer '+auth.token};
  try {
   const initial=app.financial.get(auth.user);
   const fixture=setup().financial.get(user).state;
   initial.state.accounts=fixture.accounts.map(account=>({...account,userId:auth.user.id}));
   initial.state.preferences.statementReviewMode='automatic';
   initial.state.onboarding.status='completed';
   app.financial.persist(auth.user.id,{...initial,aiConsent:true});
   const staged=await fetch(base+'/uploads',{method:'POST',headers,body:JSON.stringify(file('cafe.csv','2026-11-01,Neighborhood Cafe,-15,EUR'))});
   expect(staged.status).toBe(202);
   await expect.poll(async()=>{
    const response=await fetch(base+'/state',{headers});
    return (await response.json() as any).reviewJob?.status;
   }).toBe('failed');
   expect(generate.mock.calls[0][0].orderedGeminiModels).toContain('gemini-3.5-flash-lite');
   const state=await (await fetch(base+'/state',{headers})).json() as any;
   expect(state.state.classifications).toMatchObject([{category:'dining_coffee',classifierVersion:expect.stringContaining('gemini-3.5-flash-lite')}]);
   expect(state.analysis).toBeNull();
   const snapshot=app.financial.snapshot(auth.user);
   const offline=await TransactionClassifier.classify({snapshot,llmClient:new LLMClient({mockMode:true})});
   expect(offline.updatedClassifications).toEqual(snapshot.classifications);
  } finally {
   app.dispose();
   await new Promise<void>(resolve=>server.close(()=>resolve()));
   store.close();
  }
 });
 it('recovers an interrupted upload without rerunning an already confirmed import',async()=>{
  const f=setup();const row=f.uploads.stage(user,file('resume.csv'));await f.uploads.process(user);
  const saved=f.store.get(user.id,'uploads-v1') as any[];saved[0].status='processing';f.store.put(user.id,'uploads-v1',saved);
  const restarted=new BetaUploads(f.store,f.financial,f.imports);expect(restarted.pending(user)).toEqual([row.id]);await restarted.process(user);
  expect(f.financial.get(user).state.transactions).toHaveLength(1);expect(f.financial.get(user).state.statements).toHaveLength(1);
 });
 it('checks dated obligations against aggregate personal cash rather than requiring one payment account',()=>{
  const f=setup();const current=f.financial.get(user);current.state.balances[0].amount=0;
  current.state.accounts.push({...current.state.accounts[0],id:'second',name:'Second',isPrimary:false});
  current.state.balances.push({...current.state.balances[0],id:'second-balance',accountId:'second',amount:3000});f.financial.persist(user.id,current);
  const coverage=SharedFinancialCalculator.projectNetCashTrajectory90d(f.financial.snapshot(user),{referenceDateIso:'2026-11-09'}).paymentCoverage.find(p=>p.targetId==='essential-detail:rent')!;
  expect(coverage.shortfallAmountF019).toBe(0);expect(coverage.liquidAvailableByDue).toBe(3000);
 });
 it('does not duplicate a known bill and stops that linked schedule when a subscription ends',()=>{
  const f=setup();let current=f.financial.get(user);current.state.obligations.push({id:'known',userId:user.id,name:'Known service',amount:20,currency:'EUR',dueDate:'2026-12-01',recurrence:'monthly',category:'other',accountId:null,status:'unpaid',notes:'',createdAt:stamp});
  const sub=f.planning.subscription(current.state,'known-sub',{name:'Known service',amount:20,currency:'EUR',frequency:'monthly',nextDueDate:'2026-12-01',includedInEssentials:true},[]);current.state.subscriptions=[sub];f.financial.persist(user.id,current);
  expect(f.financial.get(user).state.obligations.filter(b=>b.name==='Known service')).toHaveLength(1);
  current=f.financial.get(user);f.planning.saveSubscription(user,'known-sub',{expectedVersion:current.version,name:sub.name,amount:sub.amount,currency:sub.currency,frequency:sub.frequency,nextDueDate:sub.nextDueDate,includedInEssentials:true,status:'ended'});
  expect(f.financial.get(user).state.obligations.some(b=>b.id==='known')).toBe(false);
 });
 it('enters Today before automatically processing the staged queue, without model consent',async()=>{
  const store=new BetaStore({filename:':memory:'});const app=createBetaApp({store,llmClient:new LLMClient({mockMode:true})});
  const server=app.app.listen(0,'127.0.0.1');await new Promise<void>(resolve=>server.once('listening',resolve));
  const base=`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/beta`;
  const register=await fetch(base+'/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Synthetic',email:'queue@example.test',password:'Synthetic-Password-123!'})});const auth=await register.json() as any;
  const headers={'Content-Type':'application/json',Authorization:'Bearer '+auth.token};
  try {
   const initial=app.financial.get(auth.user);const fixture=setup().financial.get(user).state;
   initial.state.accounts=fixture.accounts.map(a=>({...a,userId:auth.user.id}));initial.state.preferences.statementReviewMode='automatic';app.financial.persist(auth.user.id,initial);
   const staged=await fetch(base+'/uploads',{method:'POST',headers,body:JSON.stringify(file('queue.csv'))});expect(staged.status).toBe(202);
   expect(app.financial.get(auth.user).state.transactions).toHaveLength(0);
   const next=app.financial.get(auth.user);next.state.onboarding.status='completed';
   const saved=await fetch(base+'/state',{method:'PUT',headers,body:JSON.stringify({expectedVersion:next.version,state:next.state,aiConsent:false})});expect(saved.status).toBe(200);
   for(let i=0;i<60&&app.financial.get(auth.user).state.transactions.length===0;i++)await new Promise(r=>setTimeout(r,10));
   expect(app.financial.get(auth.user).state.transactions).toHaveLength(1);
  } finally {app.dispose();await new Promise<void>(resolve=>server.close(()=>resolve()));store.close();}
 });
});
