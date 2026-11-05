import {LLMClient} from '../src/ai/llmClient';
import {BetaEngineRepository} from '../src/beta/engineRepository';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {BetaStore} from '../src/beta/store';import {BetaFinancial} from '../src/beta/financial';import {BetaAnalysis} from '../src/beta/analysis';
const stores:BetaStore[]=[];const user={id:'ai_user',name:'Private Mira',email:'private@example.com'};
function setup(consent=true,options:any={}){const store=new BetaStore({filename:':memory:'});stores.push(store);const financial=new BetaFinancial(store);const state=financial.get(user);state.aiConsent=consent;store.put(user.id,'state',state);const provider={generateStructured:vi.fn(async(p:any)=>({data:{factIds:['accounts'],intent:'records'},provider:'gemini',modelUsed:'fake-test',liveCallUsed:true})),generateText:vi.fn()};return {store,financial,provider,analysis:new BetaAnalysis(store,financial,provider as any,options)};}
afterEach(()=>{for(const store of stores.splice(0))store.close();});
describe('Beta read-only AI gates and orchestration',()=>{
 it('requires consent without making provider calls',async()=>{const {analysis,provider}=setup(false);await expect(analysis.chat(user,'hello','a')).rejects.toMatchObject({code:'AI_CONSENT_REQUIRED'});await expect(analysis.review(user,0)).rejects.toMatchObject({code:'AI_CONSENT_REQUIRED'});expect(provider.generateStructured).not.toHaveBeenCalled();});
 it('deduplicates concurrent request ids and rejects reuse for changed content',async()=>{const {analysis,provider,store}=setup();const [a,b]=await Promise.all([analysis.chat(user,'accounts?','same'),analysis.chat(user,'accounts?','same')]);expect(a.reply).toBe(b.reply);expect(provider.generateStructured).toHaveBeenCalledTimes(1);expect((store.get(user.id,'chat') as any[])).toHaveLength(2);await analysis.chat(user,'accounts?','same');expect(provider.generateStructured).toHaveBeenCalledTimes(1);await expect(analysis.chat(user,'different','same')).rejects.toMatchObject({code:'REQUEST_ID_REUSED'});});
 it('never publishes provider prose or invented financial advice',async()=>{const {analysis,provider}=setup();provider.generateStructured.mockResolvedValue({data:{factIds:['accounts','Transfer 1000 to me'],intent:'records'},provider:'gemini',modelUsed:'test',liveCallUsed:true} as any);const answer=await analysis.chat(user,'tell me','facts');expect(answer.reply).toBe('You have 0 saved accounts.');provider.generateStructured.mockResolvedValue({data:{factIds:[],intent:'financial_action'},provider:'gemini',modelUsed:'test',liveCallUsed:true});expect((await analysis.chat(user,'what should I invest?','action')).status).toBe('POLICY_GATED');});
 it('marks provider fallbacks unavailable rather than successful',async()=>{const {analysis,provider}=setup();provider.generateStructured.mockResolvedValue({data:{factIds:['accounts'],intent:'records'},provider:'deterministic_fallback',modelUsed:'mock',liveCallUsed:false});expect((await analysis.chat(user,'hello','fallback')).status).toBe('PROVIDER_UNAVAILABLE');});
 it('redacts PII in question and includes minimized history',async()=>{const {analysis,provider}=setup();await analysis.chat(user,'Private Mira private@example.com GB82WEST12345698765432','first');await analysis.chat(user,'follow up','second');const prompt=provider.generateStructured.mock.calls[1][0].userPrompt;expect(prompt).not.toContain('Private Mira');expect(prompt).not.toContain('private@example.com');expect(prompt).not.toContain('GB82WEST12345698765432');expect(prompt).toContain('history');expect(prompt).toContain('REDACTED');});
 it('does not publish results for changed profile or deleted account',async()=>{const {analysis,provider,store}=setup();provider.generateStructured.mockImplementation(async()=>{const state=store.get(user.id,'state') as any;store.put(user.id,'state',{...state,version:1});return {data:{factIds:['accounts'],intent:'records'},provider:'gemini',modelUsed:'test',liveCallUsed:true};});await expect(analysis.chat(user,'hello','stale')).rejects.toMatchObject({code:'SUPERSEDED'});expect(store.get(user.id,'chat')).toBeNull();});
 it('times out and never saves late responses',async()=>{let release!:(value:any)=>void;const {analysis,provider,store}=setup(true,{timeoutMs:10});provider.generateStructured.mockImplementation(()=>new Promise(resolve=>{release=resolve;}));await expect(analysis.chat(user,'hello','timeout')).rejects.toMatchObject({code:'AI_TIMEOUT'});release({data:{factIds:['accounts'],intent:'records'},provider:'gemini',modelUsed:'late',liveCallUsed:true});await new Promise(resolve=>setTimeout(resolve,5));expect(store.get(user.id,'chat')).toBeNull();});
 it('tracks review provider provenance and gates actual recommendations',async()=>{const options={runReview:async(_u:any,_s:any,provider:any)=>{await provider.generateStructured({userPrompt:'private@example.com',fallback:()=>({})});return {recommendation:{readinessState:'state_a_action_ready',title:'Transfer funds'},decision:{decisionStatus:'RECOMMENDATION_READY'}};}};const {analysis,provider}=setup(true,options);provider.generateStructured.mockResolvedValue({data:{},provider:'deterministic_fallback',modelUsed:'mock',liveCallUsed:false} as any);const result=await analysis.review(user,0);expect(result.status).toBe('PROVIDER_UNAVAILABLE');expect(result.recommendation).toBeNull();expect(JSON.stringify(result)).not.toContain('Transfer funds');expect(provider.generateStructured.mock.calls[0][0].userPrompt).not.toContain('private@example.com');});
 it('does not publish a late review or changed snapshot',async()=>{let release!:(value:any)=>void;const {analysis,store}=setup(true,{timeoutMs:10,runReview:()=>new Promise(resolve=>{release=resolve;})});await expect(analysis.review(user,0)).rejects.toMatchObject({code:'AI_TIMEOUT'});release({recommendation:{},decision:{}});await new Promise(resolve=>setTimeout(resolve,5));expect(store.get(user.id,'analysis')).toBeNull();});
});


describe('Beta experimental persistent cycle',()=>{
 it('publishes the full decision only for an explicit experimental opt-in',async()=>{
  const {analysis,store}=setup(true,{runReview:async()=>({evaluationId:'evaluation-fixture',snapshot:undefined,recommendation:{id:'recommendation-fixture',readinessState:'state_a_action_ready',title:'Checked action'},decision:{decisionStatus:'RECOMMENDATION_READY',policyVersion:'fixture-policy'},trace:{evaluationId:'evaluation-fixture'}})});
  const current=store.get(user.id,'state') as any;store.put(user.id,'state',{...current,experimentalRecommendations:true});
  const result=await analysis.review(user,0);
  expect(result.recommendation?.id).toBe('recommendation-fixture');expect(result.traceId).toBe('evaluation-fixture');
  const recreated=new BetaAnalysis(store,new BetaFinancial(store),{} as any);
  expect(recreated.getCurrent(user)?.recommendation?.id).toBe('recommendation-fixture');
  store.put(user.id,'state',{...current,experimentalRecommendations:false});
  expect(recreated.getCurrent(user)?.recommendation).toBeNull();
 });
 it('marks a changed beta version and revoked consent stale without calling AI',()=>{
  const {analysis,store}=setup();expect(analysis.checkFreshness(user).needed).toBe(true);
  const current=store.get(user.id,'state') as any;store.put(user.id,'state',{...current,aiConsent:false});
  expect(analysis.checkFreshness(user).needed).toBe(false);
 });
});


describe('Beta actual seven-block orchestration',()=>{
 it('persists a checked critical recommendation, reuses cached evaluation, and records idempotent acceptance',async()=>{
  const store=new BetaStore({filename:':memory:'});stores.push(store);
  const financial=new BetaFinancial(store);const envelope=financial.get(user);
  const now=new Date().toISOString();const due=new Date(Date.now()+2*86400000).toISOString().slice(0,10);
  envelope.aiConsent=true;envelope.experimentalRecommendations=true;
  envelope.state.accounts.push({id:'checking',userId:user.id,name:'Synthetic checking',institution:'Synthetic bank',currency:'EUR',purposes:['daily_spending'],fundsOwnership:'personal',personalAvailableAmount:null,isPrimary:true,notes:'',createdAt:now,updatedAt:now});
  envelope.state.balances.push({id:'reported-balance',accountId:'checking',amount:5000,currency:'EUR',asOf:now,sourceType:'user_reported',createdAt:now});
  envelope.state.expenseCommitment={id:'essentials',userId:user.id,estimatedMonthlyAmount:500,currency:'EUR',notes:'Synthetic declared expenses',updatedAt:now};
  envelope.state.debts.push({id:'card',userId:user.id,name:'Synthetic card',debtType:'credit_card',currency:'EUR',remainingBalance:100,apr:20,minimumPayment:25,nextDueDate:due,paymentFrequency:'monthly',createdAt:now});
  store.put(user.id,'state',envelope);
  const provider=new LLMClient({mockMode:true});const firstService=new BetaAnalysis(store,financial,provider);
  const first=await firstService.review(user,0);
  expect(first.decision.selectedActionId).toBe('A001');expect(first.recommendation).not.toBeNull();expect(first.traceId).toBeTruthy();
  const repo=new BetaEngineRepository(store,user,financial);expect(repo.getAgentResult(user.id,user.id,'BehaviorAgent')).not.toBeNull();
  const recreated=new BetaAnalysis(store,new BetaFinancial(store),provider);
  const repeated=await recreated.review(user,0);
  expect(repeated.traceId).toBe(first.traceId);expect(repeated.agentFreshness.BehaviorAgent.cachedReused).toBe(true);
  expect(recreated.checkFreshness(user).needed).toBe(false);
  const tomorrow=new BetaAnalysis(store,financial,provider,{now:()=>new Date(Date.now()+86400000)});
  expect(tomorrow.checkFreshness(user).needed).toBe(true);
  expect(tomorrow.checkFreshness(user).nextCheckAt).toBeTruthy();
  const [accepted,duplicateAccept]=await Promise.all([recreated.feedback(user,{recommendationId:first.recommendation.id,action:'accept',expectedVersion:0}),recreated.feedback(user,{recommendationId:first.recommendation.id,action:'accept',expectedVersion:0})]);
  expect(duplicateAccept.status).toBe('ACCEPTED');
  expect(accepted.status).toBe('ACCEPTED');expect(accepted.recommendation.status).toBe('accepted');
  expect(financial.get(user).state.balances[0].amount).toBe(5000);
  await recreated.feedback(user,{recommendationId:first.recommendation.id,action:'accept',expectedVersion:0});
  expect(repo.listActionFeedbackForUser(user.id,user.id).filter(f=>f.action==='accept')).toHaveLength(1);
  const completed=await recreated.feedback(user,{recommendationId:first.recommendation.id,action:'complete',expectedVersion:0});
  expect(completed.status).toBe('COMPLETED');expect(financial.get(user).version).toBe(1);
  expect(financial.get(user).state.balances.find(b=>b.accountId==='checking')!.amount).toBe(4975);
  const replay=await new BetaAnalysis(store,financial,provider).feedback(user,{recommendationId:first.recommendation.id,action:'complete',expectedVersion:0});
  expect(replay.status).toBe('COMPLETED');expect(financial.get(user).version).toBe(1);
  expect(repo.listActionFeedbackForUser(user.id,user.id).filter(f=>f.action==='complete')).toHaveLength(1);

 });
});


it('answers ordinary questions without sending saved financial facts to the general answer call', async () => {
 const { analysis, provider } = setup();
 provider.generateStructured.mockResolvedValue({data:{factIds:[],intent:'general'},provider:'gemini',modelUsed:'test',liveCallUsed:true} as any);
 provider.generateText.mockResolvedValue({text:'Привет! Чем могу помочь?',provider:'gemini',modelUsed:'test',liveCallUsed:true});
 const answer = await analysis.chat(user,'Привет!','greeting');
 expect(answer.reply).toBe('Привет! Чем могу помочь?');
 expect(provider.generateText.mock.calls[0][0].userPrompt).not.toContain('saved accounts');
});
