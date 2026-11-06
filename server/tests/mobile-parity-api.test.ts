import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach,describe,expect,it,vi } from 'vitest';
import { LLMClient } from '../src/ai/llmClient';
import { createBetaApp } from '../src/beta/app';
import { BetaStore } from '../src/beta/store';
const cleanups: (() => Promise<void>)[]=[];
afterEach(async()=>{for(const c of cleanups.splice(0))await c();});
async function setup(llmClient = new LLMClient({mockMode:true})){
 const store=new BetaStore({filename:':memory:'});const bundle=createBetaApp({store,autoReview:false,llmClient});
 const server:Server=await new Promise(resolve=>{const s=bundle.app.listen(0,'127.0.0.1',()=>resolve(s));});
 cleanups.push(async()=>{await new Promise<void>(resolve=>server.close(()=>resolve()));bundle.dispose();store.close();});
 const base=`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/beta`;
 async function request(path:string,method='GET',data?:unknown,token?:string){const r=await fetch(base+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:data===undefined?undefined:JSON.stringify(data)});return{status:r.status,body:await r.json() as any};}
 async function register(email:string){const r=await request('/auth/register','POST',{name:'Synthetic',email,password:'Synthetic-Password-123!'});expect(r.status).toBe(201);return r.body;}
 return{...bundle,request,register};
}
function fixture(current:any,userId:string){const state=current.state,now='2026-11-05T12:00:00Z';
 state.transactions=[{id:'tx',userId,accountId:'account',statementId:'statement',date:'2026-11-05',amount:300,currency:'EUR',description:'Synthetic transfer',counterparty:'',reference:'',rawRow:{},createdAt:now}];
 state.classifications=[{id:'cls',transactionId:'tx',economicType:'income',category:'income',confidence:'low',status:'needs_review',classifierVersion:'test',isRecurringCandidate:false,provenanceNote:'test',updatedAt:now}];
 state.confirmations=[{id:'confirmation',userId,subjectType:'transfer',subjectId:'tx',questionText:'Internal transfer?',impactReason:'Avoid double count',amountLabel:'EUR 300',field:'economicType',userResponse:null,confirmedValue:null,confirmedAt:null}];
 state.transferMatches=[{id:'match',outgoingTransactionId:'other',incomingTransactionId:'tx',status:'unresolved'}];return current;
}
describe('Mobile parity owner-isolated operations',()=>{
 it('persists authenticated name changes without changing another account or invalidating sessions',async()=>{
  const{request,register}=await setup();const a=await register('a@example.invalid'),b=await register('b@example.invalid');
  expect((await request('/profile','PUT',{name:'  New Name  '},a.token)).status).toBe(200);
  expect((await request('/auth/me','GET',undefined,a.token)).body.user.name).toBe('New Name');
  expect((await request('/state','GET',undefined,a.token)).body.state.profile.nickname).toBe('New Name');
  expect((await request('/auth/me','GET',undefined,b.token)).body.user.name).toBe('Synthetic');
  expect((await request('/profile','PUT',{name:''},a.token)).status).toBe(400);
  expect((await request('/profile','PUT',{name:'No token'})).status).toBe(401);
 });
 it('checks confirmation ownership/version and records transfer intent without duplicate mutation',async()=>{
  const{request,register,store,financial}=await setup();const a=await register('a@example.invalid'),b=await register('b@example.invalid');store.put(a.user.id,'state',fixture(financial.get(a.user),a.user.id));
  expect((await request('/confirmations/confirmation/respond','POST',{expectedVersion:0,response:'yes'},b.token)).status).toBe(404);
  expect((await request('/confirmations/confirmation/respond','POST',{expectedVersion:99,response:'yes'},a.token)).status).toBe(409);
  const r=await request('/confirmations/confirmation/respond','POST',{expectedVersion:0,response:'yes'},a.token);expect(r.status).toBe(200);expect(r.body.version).toBe(1);
  expect(r.body.state.classifications[0]).toMatchObject({economicType:'internal_transfer',category:'transfer',status:'user_confirmed'});expect(r.body.state.transferMatches[0].status).toBe('user_confirmed');expect(r.body.state.confirmations[0]).toMatchObject({userResponse:'yes',confirmedValue:'internal_transfer'});
  expect((await request('/confirmations/confirmation/respond','POST',{expectedVersion:0,response:'yes'},a.token)).status).toBe(409);expect(financial.get(a.user).version).toBe(1);
 });
 it('records subscription intent and dismisses only the question',async()=>{
  const{request,register,store,financial}=await setup();const a=await register('a@example.invalid');const current=fixture(financial.get(a.user),a.user.id);current.state.confirmations[0].subjectType='subscription';current.state.classifications[0].economicType='expense';current.state.classifications[0].category='subscriptions';store.put(a.user.id,'state',current);
  const r=await request('/confirmations/confirmation/respond','POST',{expectedVersion:0,response:'no'},a.token);expect(r.status).toBe(200);expect(r.body.state.confirmations[0].confirmedValue).toBe('cancel_candidate');expect(r.body.state.classifications[0].economicType).toBe('expense');expect(r.body.state.classifications[0].provenanceNote).toContain('unused cancellation');
  const dismissed=await request('/confirmations/confirmation/respond','POST',{expectedVersion:1,response:'dismiss'},a.token);expect(dismissed.status).toBe(200);expect(dismissed.body.state.confirmations).toEqual([]);expect(dismissed.body.state.transactions).toHaveLength(1);
 });
 it('makes clear-chat retries safe and owner-isolated',async()=>{
  const{request,register,store}=await setup();const a=await register('a@example.invalid'),b=await register('b@example.invalid');store.put(a.user.id,'chat',[{id:'old',content:'Old'}]);store.put(b.user.id,'chat',[{id:'b',content:'Other user'}]);
  const first=await request('/chat','DELETE',{requestId:'same-operation'},a.token);expect(first.status).toBe(200);expect(first.body.messages).toEqual([]);store.put(a.user.id,'chat',[{id:'new',content:'New message after clear'}]);
  expect((await request('/chat','DELETE',{requestId:'same-operation'},a.token)).body.messages[0].id).toBe('new');expect((await request('/chat','GET',undefined,b.token)).body.messages[0].id).toBe('b');
 });
 it('does not replay pre-clear cached history when an old chat request is retried',async()=>{
  const provider=new LLMClient({mockMode:true});
  const generate=vi.spyOn(provider,'generateStructured').mockResolvedValue({data:{factIds:['accounts'],intent:'records'},provider:'deterministic_fallback',modelUsed:'synthetic',liveCallUsed:false} as any);
  const {request,register,store,financial}=await setup(provider);const a=await register('a@example.invalid');const current=financial.get(a.user);current.aiConsent=true;store.put(a.user.id,'state',current);
  expect((await request('/chat','POST',{message:'Show saved accounts',requestId:'old'},a.token)).status).toBe(200);
  expect((await request('/chat','DELETE',{requestId:'clear'},a.token)).status).toBe(200);
  expect((await request('/chat','POST',{message:'Show saved accounts',requestId:'new'},a.token)).status).toBe(200);
  const retry=await request('/chat','POST',{message:'Show saved accounts',requestId:'old'},a.token);
  expect(retry.status).toBe(200);expect(generate).toHaveBeenCalledTimes(3);
  expect(retry.body.messages.filter((m:any)=>m.id==='old')).toHaveLength(1);
  expect(retry.body.messages.find((m:any)=>m.id==='new')).toBeTruthy();
 });
 it('does not resurrect a reply that completes after chat is cleared',async()=>{
  const provider=new LLMClient({mockMode:true});let release!:()=>void,entered!:()=>void;
  const started=new Promise<void>(resolve=>{entered=resolve;});const blocked=new Promise<void>(resolve=>{release=resolve;});
  vi.spyOn(provider,'generateStructured').mockImplementation(async()=>{entered();await blocked;return {data:{factIds:['accounts'],intent:'records'},provider:'deterministic_fallback',modelUsed:'synthetic',liveCallUsed:false} as any;});
  const {request,register,store,financial}=await setup(provider);const a=await register('a@example.invalid');const current=financial.get(a.user);current.aiConsent=true;store.put(a.user.id,'state',current);
  const pending=request('/chat','POST',{message:'Show saved accounts',requestId:'pending'},a.token);
  await started;expect((await request('/chat','DELETE',{requestId:'clear'},a.token)).status).toBe(200);release();
  const late=await pending;expect(late.status).toBe(409);expect(late.body.error.code).toBe('CHAT_CLEARED');
  expect((await request('/chat','GET',undefined,a.token)).body.messages).toEqual([]);
 });

});
