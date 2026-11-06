import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach,describe,expect,it,vi } from 'vitest';
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

describe('Action history HTTP lifecycle',()=>{
 it('keeps background reviews out of history and records manual review/outcomes/export with owner isolation',async()=>{
 const {request,register,analysis,jobs,store}=await setup();const a=await register(),b=await register('Bob','bob-history@example.com');const initial=(await request('/state','GET',undefined,a.token)).body;
 await request('/state','PUT',{expectedVersion:0,state:initial.state,aiConsent:true,experimentalRecommendations:true},a.token);
 const result={status:'COMPLETED',recommendation:{id:'suggestion',title:'A real action',description:'A useful step',suggestedAmount:20,currency:'EUR'},decision:{decisionStatus:'RECOMMENDATION_READY',selectedActionId:'A007',candidate:{targetId:'goal'}}};
 vi.spyOn(analysis,'review').mockResolvedValue(result);
 const background=jobs.enqueue(a.user.id,'review',{user:a.user},1);await expect.poll(()=>jobs.get(a.user.id,background.id)?.status).toBe('completed');expect((await request('/action-history','GET',undefined,a.token)).body.items).toEqual([]);
 const response=await request('/review','POST',{forceRefresh:true,requestId:'manual1'},a.token);expect(response.status).toBe(202);await expect.poll(()=>jobs.get(a.user.id,response.body.id)?.status).toBe('completed');
 const item=(await request('/action-history','GET',undefined,a.token)).body.items[0];expect(item.suggestion.title).toBe('A real action');const before=store.get(a.user.id,'state');
 expect((await request(`/action-history/${item.id}/outcome`,'PUT',{requestId:'answer',expectedRevision:1,outcome:'done',note:'Finished'},b.token)).status).toBe(404);
 const saved=await request(`/action-history/${item.id}/outcome`,'PUT',{requestId:'answer',expectedRevision:1,outcome:'done',note:'Finished'},a.token);expect(saved.body.outcome).toBe('done');expect(store.get(a.user.id,'state')).toEqual(before);
 expect((await request(`/action-history/${item.id}/outcome`,'PUT',{requestId:'stale',expectedRevision:1,outcome:'not_done',note:''},a.token)).status).toBe(409);
 expect((await request('/export','GET',undefined,a.token)).body.records.some((r:any)=>r.key==='action-history-v1')).toBe(true);
 await request('/account','DELETE',undefined,a.token);expect(store.get(a.user.id,'action-history-v1')).toBeNull();
 });
});
