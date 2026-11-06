import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach,describe,expect,it } from 'vitest';
import { createBetaApp } from '../src/beta/app';
import { BetaStore } from '../src/beta/store';

const cleanups:(()=>Promise<void>)[]=[];
afterEach(async()=>{for(const cleanup of cleanups.splice(0))await cleanup();});
const password='Correct-Test-Password-123!';
async function setup(){
 const store=new BetaStore({filename:':memory:'});const emails:{email:string;url:string}[]=[];
 const bundle=createBetaApp({store,autoReview:false,resetBaseUrl:'https://beta.example/reset',sendResetEmail:async(email,url)=>{emails.push({email,url});}});
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
describe('Reliable import and findings workflow',()=>{
 it('corrects ambiguous dates, confirms, answers findings, retains decisions after refresh and rejects stale responses',async()=>{
 const {request,register}=await setup();const a=await register();const initial=(await request('/state','GET',undefined,a.token)).body;
 const state=withAccount(initial.state,a.user.id);
 await request('/state','PUT',{expectedVersion:0,state,aiConsent:false},a.token);
 const contentBase64=Buffer.from('Date,Description,Amount,Currency\n01/08/2026,PayPal,-10,EUR\n01/09/2026,PayPal,-10,EUR\n01/10/2026,PayPal,-10,EUR').toString('base64');
 const upload=await request('/imports','POST',{accountId:'test-main',fileName:'statement.csv',contentBase64},a.token);
 let job:any;await expect.poll(async()=>{job=(await request(`/jobs/${upload.body.id}`,'GET',undefined,a.token)).body;return job.status;}).toBe('completed');
 const id=job.result.id;expect(job.result.fileName).toBe('statement.csv');expect(job.result.parsing.requiresDateConvention).toBe(true);
 expect((await request(`/imports/${id}/confirm`,'POST',{expectedVersion:1},a.token)).status).toBe(400);
 const revised=await request(`/imports/${id}/review`,'PUT',{expectedVersion:1,options:{dateConvention:'DMY'}},a.token);expect(revised.status).toBe(200);expect(revised.body.transactions).toHaveLength(3);
 const confirmed=await request(`/imports/${id}/confirm`,'POST',{expectedVersion:1},a.token);expect(confirmed.status).toBe(200);expect(confirmed.body.state.statements[0].fileName).toBe('statement.csv');
 const today=(await request('/state','GET',undefined,a.token)).body;const finding=today.findings.findings.find((f:any)=>f.kind==='classification');expect(finding).toBeTruthy();expect(today.findings.findings.length).toBeLessThanOrEqual(5);
 const body={expectedVersion:today.version,evidenceVersion:finding.evidenceVersion,response:'confirm_classification',category:'shopping',economicType:'expense'};
 expect((await request(`/findings/${finding.id}/respond`,'POST',body,a.token)).status).toBe(200);
 const refreshed=(await request('/state','GET',undefined,a.token)).body;expect(refreshed.findings.findings.some((f:any)=>f.id===finding.id)).toBe(false);
 expect((await request(`/findings/${finding.id}/respond`,'POST',{...body,response:'dismiss'},a.token)).status).toBe(409);
 expect((await request('/findings/suggestions','POST',{},a.token)).body.status).toBe('consent_required');
 });
});
