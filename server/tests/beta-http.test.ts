import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach,describe,expect,it,vi } from 'vitest';
import { createBetaApp } from '../src/beta/app';
import type { FrankfurterFXService } from '../src/fx/frankfurterService';
import { BetaStore } from '../src/beta/store';

const cleanups:(()=>Promise<void>)[]=[];
afterEach(async()=>{for(const cleanup of cleanups.splice(0))await cleanup();});
const password='Correct-Test-Password-123!';
async function setup(spendingFx?: Pick<FrankfurterFXService, 'getSpendingRates'>){
 const store=new BetaStore({filename:':memory:'});const emails:{email:string;url:string}[]=[];
 const bundle=createBetaApp({store,spendingFxService:spendingFx,autoReview:false,resetBaseUrl:'https://beta.example/reset',sendResetEmail:async(email,url)=>{emails.push({email,url});}});
 const server:Server=await new Promise(resolve=>{const s=bundle.app.listen(0,'127.0.0.1',()=>resolve(s));});
 cleanups.push(async()=>{await new Promise<void>((resolve,reject)=>server.close(e=>e?reject(e):resolve()));bundle.dispose();store.close();});
 const base=`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/beta`;
 async function request(route:string,method='GET',body?:unknown,token?:string,extraHeaders:Record<string,string>={}){
  const response=await fetch(base+route,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{ }),...extraHeaders},body:body===undefined?undefined:JSON.stringify(body)});
  return {status:response.status,body:await response.json() as any};
 }
 async function register(name='Alice',email='alice@example.com'){const r=await request('/auth/register','POST',{name,email,password});expect(r.status).toBe(201);return r.body;}
 return {...bundle,request,register,emails};
}
function withAccount(state:any,userId:string){const now=new Date().toISOString();state.accounts.push({id:'test-main',userId,name:'Main',institution:'Test Bank',currency:'EUR',purposes:['daily_spending'],fundsOwnership:'personal',personalAvailableAmount:null,isPrimary:true,notes:'',createdAt:now,updatedAt:now});return state;}
describe('Authenticated beta HTTP integration',()=>{
 it('requests spending quotes for only the authenticated profile currencies',async()=>{
  const getSpendingRates=vi.fn().mockResolvedValue({});
  const {request,register}=await setup({getSpendingRates});
  const a=await register(), b=await register('Bob','bob@example.com');
  const initial=(await request('/state','GET',undefined,a.token)).body;
  const state=withAccount(initial.state,a.user.id);
  state.accounts.push({...state.accounts[0],id:'second',currency:'HUF',isPrimary:false});
  expect((await request('/state','PUT',{expectedVersion:initial.version,state,aiConsent:false},a.token)).status).toBe(200);
  expect((await request('/analytics/spending-rates','GET')).status).toBe(401);
  expect((await request('/analytics/spending-rates?base=USD&currencies=KGS','GET',undefined,a.token)).body).toEqual({base:'EUR',rates:{}});
  expect(getSpendingRates).toHaveBeenLastCalledWith('EUR',expect.arrayContaining(['EUR','HUF']));
  expect(getSpendingRates.mock.lastCall?.[1]).not.toContain('KGS');
  expect((await request('/analytics/spending-rates','GET',undefined,b.token)).status).toBe(200);
  expect(getSpendingRates.mock.lastCall?.[1]).not.toContain('HUF');
 });
 it('returns safe field errors for invalid authentication inputs and preserves auth outcomes',async()=>{
  const {request,register}=await setup();
  for(const [field,value] of [['name',''],['email','invalid'],['password','short']]) {
   const body={name:'Synthetic',email:'synthetic@example.invalid',password,[field]:value};
   const r=await request('/auth/register','POST',body);
   expect(r.status).toBe(400);expect(r.body.error.code).toBe('VALIDATION_ERROR');
   expect(r.body.error.fields[field]).toBeTruthy();
   expect(JSON.stringify(r.body)).not.toContain(password);
  }
  const a=await register();
  expect((await request('/auth/register','POST',{name:'Alice',email:a.user.email,password})).status).toBe(409);
  expect((await request('/auth/login','POST',{email:a.user.email,password:'Wrong-Test-Password!'})).status).toBe(401);
  expect((await request('/auth/login','POST',{email:a.user.email,password})).status).toBe(200);
 });
 it('recognizes foreign validation constructors and hides unexpected server details',async()=>{
  const {request,auth}=await setup();
  vi.spyOn(auth,'register').mockRejectedValueOnce(Object.assign(new Error('private validation value'),{name:'ZodError',issues:[{path:['password']}]}));
  const r=await request('/auth/register','POST',{name:'Synthetic',email:'synthetic@example.invalid',password});
  expect(r.status).toBe(400);expect(r.body.error.fields.password).toBe('Password must be between 8 and 128 characters.');
  vi.spyOn(auth,'login').mockRejectedValueOnce(new Error('internal secret diagnostic'));
  const failed=await request('/auth/login','POST',{email:'synthetic@example.invalid',password});
  expect(failed.status).toBe(500);expect(JSON.stringify(failed.body)).not.toContain('internal secret');
 });
 it('confirms imported transaction classification with version checks and owner isolation',async()=>{
  const {request,register,store}=await setup();const a=await register(),b=await register('Bob','bob@example.com');
  const initial=(await request('/state','GET',undefined,a.token)).body;
  await request('/state','PUT',{expectedVersion:0,state:withAccount(initial.state,a.user.id),aiConsent:false},a.token);
  const queued=await request('/imports','POST',{accountId:'test-main',fileName:'classify.csv',contentBase64:Buffer.from('Date,Amount,Description,Currency\n2026-11-04,100,Unclear Transfer,EUR').toString('base64')},a.token);
  await expect.poll(async()=>(await request(`/jobs/${queued.body.id}`,'GET',undefined,a.token)).body.status).toBe('completed');
  const preview=(await request(`/jobs/${queued.body.id}`,'GET',undefined,a.token)).body.result;
  const imported=await request(`/imports/${preview.id}/confirm`,'POST',{expectedVersion:1},a.token);const transaction=imported.body.state.transactions[0];
  const path=`/transactions/${transaction.id}/classify`;const fields={economicType:'internal_transfer',category:'transfer'};
  expect((await request(path,'POST',{expectedVersion:0,...fields},b.token)).status).toBe(404);
  expect((await request(path,'POST',{expectedVersion:1,...fields},a.token)).status).toBe(409);
  store.put(a.user.id,'analysis',{version:2});
  const classified=await request(path,'POST',{expectedVersion:2,...fields},a.token);expect(classified.status).toBe(200);expect(classified.body.version).toBe(3);
  const matches=classified.body.state.classifications.filter((c:any)=>c.transactionId===transaction.id);expect(matches).toHaveLength(1);
  expect(matches[0]).toMatchObject({...fields,status:'user_confirmed',classifierVersion:'user'});
  expect(classified.body.state.transactions[0]).toEqual(transaction);expect(store.get(a.user.id,'analysis')).toBeNull();
  expect((await request(path,'POST',{expectedVersion:2,...fields},a.token)).status).toBe(409);
  expect((await request('/state','GET',undefined,b.token)).body.state.transactions).toEqual([]);
 });
 it('deduplicates persisted upload jobs and deletes retained source bytes with the confirmed import',async()=>{
  const {request,register,store}=await setup();const a=await register();const initial=(await request('/state','GET',undefined,a.token)).body;
  await request('/state','PUT',{expectedVersion:0,state:withAccount(initial.state,a.user.id),aiConsent:false},a.token);
  const contentBase64=Buffer.from('Date,Amount,Description,Currency\n2026-11-04,-7.25,Private Grocery,EUR').toString('base64');
  const payload={accountId:'test-main',fileName:'private.csv',contentBase64};
  const first=await request('/imports','POST',payload,a.token);const second=await request('/imports','POST',payload,a.token);
  expect(first.status).toBe(202);expect(second.status).toBe(202);expect(second.body.id).toBe(first.body.id);
  await expect.poll(async()=>(await request(`/jobs/${first.body.id}`,'GET',undefined,a.token)).body.status).toBe('completed');
  const completed=(await request(`/jobs/${first.body.id}`,'GET',undefined,a.token)).body;const id=completed.result.id;
  const confirmed=await request(`/imports/${id}/confirm`,'POST',{expectedVersion:1},a.token);expect(confirmed.body.state.transactions).toHaveLength(1);
  expect((await request(`/imports/${id}`,'DELETE',{expectedVersion:1},a.token)).status).toBe(409);
  store.put(a.user.id,'engine',{snapshots:{old:{original:contentBase64,description:'Private Grocery'}},recommendations:[]});
  const deleted=await request(`/imports/${id}`,'DELETE',{expectedVersion:2},a.token);expect(deleted.status).toBe(200);expect(deleted.body.state.transactions).toEqual([]);
  expect((await request(`/imports/${id}`,'GET',undefined,a.token)).status).toBe(404);
  const keys=store.database.prepare('SELECT doc_key FROM beta_documents WHERE user_id=?').all(a.user.id) as {doc_key:string}[];
  const retained=keys.map(row=>store.get(a.user.id,row.doc_key));expect(JSON.stringify(retained)).not.toContain(contentBase64);
  const exported=await request('/export','GET',undefined,a.token);expect(exported.status).toBe(200);expect(JSON.stringify(exported.body)).not.toContain(contentBase64);expect(JSON.stringify(exported.body)).not.toContain('Private Grocery');
 });
 it('registers without a code, logs in, rejects user-id spoofing and revokes logout sessions',async()=>{const {request,register}=await setup();const a=await register();expect(a.token.length).toBeGreaterThan(30);expect((await request('/auth/me','GET',undefined,a.token)).body.user.id).toBe(a.user.id);expect((await request('/state','GET',undefined,undefined,{'X-User-Id':a.user.id})).status).toBe(401);expect((await request('/state','GET',undefined,a.user.id)).status).toBe(401);const login=await request('/auth/login','POST',{email:a.user.email,password});expect(login.status).toBe(200);expect((await request('/auth/login','POST',{email:a.user.email,password:'wrong-password-long'})).status).toBe(401);expect((await request('/auth/logout','POST',{},a.token)).status).toBe(200);expect((await request('/auth/me','GET',undefined,a.token)).status).toBe(401);});
 it('saves a blank-owned profile with CAS and does not expose another account through spoof headers',async()=>{const {request,register}=await setup();const a=await register(),b=await register('Bob','bob@example.com');const initial=await request('/state','GET',undefined,a.token);expect(initial.body.state.accounts).toEqual([]);const state=withAccount(initial.body.state,a.user.id);const saved=await request('/state','PUT',{expectedVersion:0,state,aiConsent:false},a.token);expect(saved.status).toBe(200);expect(saved.body.version).toBe(1);expect((await request('/state','PUT',{expectedVersion:0,state,aiConsent:false},a.token)).status).toBe(409);const isolated=await request('/state','GET',undefined,b.token,{'X-User-Id':a.user.id});expect(isolated.body.state.user.id).toBe(b.user.id);expect(isolated.body.state.accounts).toEqual([]);state.user.id=b.user.id;expect((await request('/state','PUT',{expectedVersion:1,state,aiConsent:false},a.token)).status).toBe(403);});
 it('isolates import previews, confirmations and jobs, and does not make AI calls without consent',async()=>{const {request,register,jobs}=await setup();const a=await register(),b=await register('Bob','bob@example.com');const initial=(await request('/state','GET',undefined,a.token)).body;await request('/state','PUT',{expectedVersion:0,state:withAccount(initial.state,a.user.id),aiConsent:false},a.token);const preview=await request('/imports','POST',{accountId:'test-main',fileName:'test.csv',contentBase64:Buffer.from('Date,Amount,Description,Currency\n2026-11-04,-12.50,Test Grocery,EUR').toString('base64')},a.token);expect(preview.status).toBe(202);const importJobId=preview.body.id;expect((await request(`/jobs/${importJobId}`,'GET',undefined,b.token)).status).toBe(404);await expect.poll(async()=> (await request(`/jobs/${importJobId}`,'GET',undefined,a.token)).body.status).toBe('completed');const completed=await request(`/jobs/${importJobId}`,'GET',undefined,a.token);preview.body=completed.body.result;expect(preview.body.transactions).toHaveLength(1);const id=preview.body.id;expect((await request(`/imports/${id}`,'GET',undefined,b.token)).status).toBe(404);expect((await request(`/imports/${id}/confirm`,'POST',{expectedVersion:0},b.token)).status).toBe(404);expect((await request(`/imports/${id}/confirm`,'POST',{expectedVersion:1},a.token)).status).toBe(200);expect((await request(`/imports/${id}/confirm`,'POST',{expectedVersion:1},a.token)).status).toBe(200);expect((await request('/state','GET',undefined,a.token)).body.state.transactions).toHaveLength(1);const job=jobs.enqueue(a.user.id,'test-no-provider',{},2);expect((await request(`/jobs/${job.id}`,'GET',undefined,b.token)).status).toBe(404);expect((await request(`/jobs/${job.id}`,'GET',undefined,a.token)).status).toBe(200);expect((await request('/review','POST',{},a.token)).status).toBe(403);expect((await request('/chat','POST',{message:'Explain my money',requestId:'request-1'},a.token)).status).toBe(403);expect((await request('/chat','GET',undefined,b.token)).body.messages).toEqual([]);});
 it('delivers only an injected reset link and rejects token reuse and old sessions',async()=>{const {request,register,emails}=await setup();const a=await register();const result=await request('/auth/forgot-password','POST',{email:a.user.email});expect(result.status).toBe(200);expect(result.body.token).toBeUndefined();expect(emails).toHaveLength(1);expect(emails[0].email).toBe(a.user.email);const token=new URL(emails[0].url).searchParams.get('token');const nextPassword='New-Test-Password-456!';expect((await request('/auth/reset-password','POST',{token,password:nextPassword})).status).toBe(200);expect((await request('/auth/me','GET',undefined,a.token)).status).toBe(401);expect((await request('/auth/reset-password','POST',{token,password:nextPassword})).status).toBe(400);expect((await request('/auth/login','POST',{email:a.user.email,password:nextPassword})).status).toBe(200);});
 it('exports only the current profile and deletion revokes every session without affecting other accounts',async()=>{const {request,register,store}=await setup();const a=await register(),b=await register('Bob','bob@example.com');await request('/state','GET',undefined,a.token);store.put(a.user.id,'chat',[{role:'user',content:'Alice private text'}]);const exported=await request('/export','GET',undefined,a.token);expect(exported.status).toBe(200);expect(exported.body.chat[0].content).toBe('Alice private text');expect(JSON.stringify((await request('/export','GET',undefined,b.token)).body)).not.toContain('Alice private text');const extra=await request('/auth/login','POST',{email:a.user.email,password});expect((await request('/account','DELETE',undefined,a.token)).status).toBe(200);expect((await request('/state','GET',undefined,extra.body.token)).status).toBe(401);expect(store.get(a.user.id,'state')).toBeNull();expect((await request('/auth/me','GET',undefined,b.token)).status).toBe(200);});
});
