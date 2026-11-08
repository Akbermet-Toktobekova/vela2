import type { FrankfurterFXService } from '../fx/frankfurterService';
import { ChatMemorySchema, type AnalysisArtifact } from '@shared/contracts/pipeline';
import { prompts, promptFingerprint } from '../ai/prompts';
import { memoryFingerprint, summarizeConversation, type ConversationMessage } from '../ai/conversationMemory';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { LLMClient,wrapUntrustedData } from '../ai/llmClient';
import { loadPrototypePolicy } from '../config/policyLoader';
import { ReviewOrchestrator } from '../orchestrator/reviewWorkflow';
import { BetaEngineRepository } from './engineRepository';
import { BetaError,BetaFinancial } from './financial';
import type { BetaStore } from './store';
type User={id:string;name:string;email:string};
type Provider=Pick<LLMClient,'generateStructured'|'generateText'>;
type Provenance={provider:string;modelUsed:string;liveCallUsed:boolean};
export interface BetaAnalysisOptions {fxService?:FrankfurterFXService;onSyntheticError?:(message:string)=>void;onStage?:(artifact:AnalysisArtifact,input:unknown)=>void;onSyntheticCall?:(call:{systemPrompt:string;userPrompt:string;response:unknown})=>void;timeoutMs?:number;now?:()=>Date;runReview?:(user:User,state:unknown,provider:Provider)=>Promise<any>;}
const gate='Financial action policies are not approved for real-data recommendations. This assistant provides read-only record summaries only.';
const answerSchema=z.object({factIds:z.array(z.string()).max(12),intent:z.enum(['records','missing_data','financial_action','general','unknown'])}).strict();
export class BetaAnalysis {
 private inflight=new Map<string,Promise<any>>();
 constructor(private store:BetaStore,private financial:BetaFinancial,private llm:Provider=new LLMClient({mockMode:false}),private options:BetaAnalysisOptions={}){}
 private current(user:User,version?:number){const state=this.financial.get(user);if(!state.aiConsent)throw new BetaError('AI_CONSENT_REQUIRED','Enable AI processing before using AI features.',403);if(version!==undefined&&state.version!==version)throw new BetaError('SUPERSEDED','Profile changed; retry with the current data.',409);return state;}
 private assertCurrent(user:User,version:number){const latest=this.store.get(user.id,'state') as any;if(!latest||!latest.aiConsent||latest.version!==version)throw new BetaError('SUPERSEDED','Profile or privacy settings changed; retry.',409);}
 private sanitize(user:User,text:string):string {
  const envelope=this.store.get(user.id,'state') as any;if(!envelope)throw new BetaError('SUPERSEDED','Profile no longer exists.',409);const state=envelope.state as import('../../../shared/profile/seed').PIDatabaseSeed;
  const forbidden=[user.email,user.name,...state.statements.map(s=>s.fileName),...state.accounts.flatMap(a=>[a.name,a.institution,a.notes]),...state.incomes.map(i=>i.notes),...state.statements.flatMap(s=>[s.errorMessage||'',s.overlapWarning||'']),...state.confirmations.flatMap(c=>[c.questionText,c.impactReason]),state.preferences.concernNotes].filter(s=>s&&s.length>2);
  let clean=text;for(const value of forbidden)clean=clean.split(value).join('[REDACTED]');
  return clean.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,'[EMAIL]').replace(/\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b/g,'[ACCOUNT]').replace(/\b(?:\d[ -]*?){9,19}\b/g,'[NUMBER]');
 }
 private sanitizePrompt(user: User, prompt: string): string {
  const tagged = /^(<untrusted_data[^>]*>)([\s\S]*)(<\/untrusted_data>)$/.exec(prompt);
  const body = tagged?.[2] ?? prompt;
  let parsed: unknown;
  try {
   parsed = JSON.parse(body);
  } catch {
   return this.sanitize(user, prompt);
  }
  const visit = (value: unknown, field: string): unknown => {
   if (typeof value === 'string') {
    // Stable evidence identifiers are validated against the request and must round-trip.
    return /(?:id|ids|currency|date|asof|version)$/i.test(field) ? value : this.sanitize(user, value);
   }
   if (Array.isArray(value)) return value.map(item => visit(item, field));
   if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, visit(item, key)]));
   }
   return value;
  };
  return (tagged?.[1] ?? '') + JSON.stringify(visit(parsed, '')) + (tagged?.[3] ?? '');
 }
 private async bounded<T>(operation:()=>Promise<T>):Promise<T>{let timer:ReturnType<typeof setTimeout>|undefined;try{return await Promise.race([operation(),new Promise<T>((_,reject)=>{timer=setTimeout(()=>reject(new BetaError('AI_TIMEOUT','AI processing timed out. Please retry.',504)),this.options.timeoutMs??120000);})]);}finally{if(timer)clearTimeout(timer);}}
 private tracked(user:User,provenance:Provenance[]):Provider{
  return new Proxy(this.llm,{get:(target,key)=>{
   if(key==='generateStructured'||key==='generateText')return async(params:any)=>{const userPrompt=this.sanitizePrompt(user,params.userPrompt);const result=await (target[key] as any).call(target,{...params,userPrompt});this.options.onSyntheticCall?.({systemPrompt:params.systemPrompt,userPrompt,response:result});provenance.push({provider:result.provider,modelUsed:result.modelUsed,liveCallUsed:!!result.liveCallUsed});return result;};
   const value=(target as any)[key];return typeof value==='function'?value.bind(target):value;
  }});
 }
 private chatMessages(user: User): ConversationMessage[] {
  return (this.store.get(user.id, 'chat') as ConversationMessage[] | null) ?? [];
 }
 private chatEpoch(user: User): number {
  return (this.store.get(user.id, 'chat-epoch') as number | null) ?? 0;
 }
 deleteChat(user: User): void {
  const epoch = this.chatEpoch(user);
  this.store.database.exec('SAVEPOINT delete_chat');
  try {
   this.store.put(user.id, 'chat-epoch', epoch + 1);
   this.store.remove(user.id, 'chat');
   this.store.remove(user.id, 'chat-memory');
   this.store.database.prepare("DELETE FROM beta_documents WHERE user_id=? AND doc_key LIKE 'chat-request:%'").run(user.id);
   this.store.database.exec('RELEASE SAVEPOINT delete_chat');
  } catch (error) {
   this.store.database.exec('ROLLBACK TO SAVEPOINT delete_chat');
   this.store.database.exec('RELEASE SAVEPOINT delete_chat');
   throw error;
  }
 }
 private async refreshMemory(user: User, version: number, provider: Provider) {
  const messages = this.chatMessages(user);
  if (!messages.length) return;
  const epoch = this.chatEpoch(user);
  const previous = ChatMemorySchema.safeParse(this.store.get(user.id, 'chat-memory'));
  const modelStatus = (this.llm as Partial<LLMClient>).getQuotaAndModelStatus?.();
  const expectedModel = modelStatus?.provider === 'gemini' && modelStatus.candidateModels.length === 1
    ? modelStatus.configuredPrimaryModel : undefined;
  const priorMemory = previous.success ? previous.data : null;
  const memoryInput = priorMemory && expectedModel && priorMemory.model?.modelUsed !== expectedModel
    ? { ...priorMemory, status: 'STALE' as const } : priorMemory;
  const next = await summarizeConversation(messages, memoryInput, provider, text => this.sanitize(user, text));
  this.assertCurrent(user, version);
  if (next && epoch === this.chatEpoch(user) && next.inputHash === memoryFingerprint(this.chatMessages(user))) {
   this.store.put(user.id, 'chat-memory', next);
  }
 }
 private modelFingerprint(): string {
  const status = (this.llm as Partial<LLMClient>).getQuotaAndModelStatus?.();
  return JSON.stringify(status ? [status.provider, status.configuredPrimaryModel, status.candidateModels] : []);
 }
 private now():Date { return this.options.now?.() || new Date(); }
 getCurrent(user:User):any|null {
  const state=this.store.get(user.id,'state') as any;
  const analysis=this.store.get(user.id,'analysis') as any;
  if(!state?.aiConsent||!analysis||analysis.version!==state.version)return null;
  const enabled=state.experimentalRecommendations===true;
  return {...analysis,experimentalRecommendations:enabled,recommendation:enabled?analysis.recommendation:null,decision:enabled?analysis.decision:null,trace:enabled?analysis.trace:null,traceId:enabled?analysis.traceId:null,releaseGate:enabled?null:gate};
 }
 getTrace(user:User,traceId?:string){const current=this.current(user);if(!current.experimentalRecommendations)throw new BetaError('EXPERIMENTAL_CONSENT_REQUIRED','Enable experimental recommendations to inspect decisions.',403);const repository=new BetaEngineRepository(this.store,user,this.financial,{referenceNowIso:this.now().toISOString()});const id=traceId||this.getCurrent(user)?.traceId;if(!id)return null;return repository.getDecisionTrace(user.id,user.id,id);}
 checkFreshness(user:User):{needed:boolean;nextCheckAt?:string;freshnessKey?:string} {
  const current=this.store.get(user.id,'state') as any;
  if(!current?.aiConsent)return {needed:false};
  const analysis=this.getCurrent(user);
  const policy=loadPrototypePolicy();
  const now=this.now();
  const memoryHash = memoryFingerprint(this.chatMessages(user));
  const key = [current.version, policy.policyMeta.policyBundleVersion, now.toISOString().slice(0, 10), promptFingerprint, this.modelFingerprint(), memoryHash].join(':');
  if (analysis && (analysis.promptFingerprint !== promptFingerprint || analysis.modelFingerprint !== this.modelFingerprint() || analysis.memoryHash !== memoryHash)) return {needed:true,freshnessKey:key};
  if(!analysis||analysis.policyVersion!==policy.policyMeta.policyBundleVersion||!analysis.createdAt)return {needed:true,freshnessKey:key};
  const created=new Date(analysis.createdAt);
  const deadlines=[Date.UTC(created.getUTCFullYear(),created.getUTCMonth(),created.getUTCDate()+1)];
  const repository=new BetaEngineRepository(this.store,user,this.financial,{referenceNowIso:this.now().toISOString()});
  for(const agent of ['BehaviorAgent','DebtAgent'] as const){
   const cached=repository.getAgentResult(user.id,user.id,agent);
   if(!cached)return {needed:true,freshnessKey:key};
   deadlines.push(Date.parse(cached.createdAt)+policy.horizonAndFreshness.staleBalanceThresholdDays*86400000);
  }
  const nextCheckAt=new Date(Math.min(...deadlines)).toISOString();
  return {needed:now.getTime()>=Date.parse(nextCheckAt),nextCheckAt,freshnessKey:key};
 }
 private publish(user:User,version:number,result:any,provenance:Provenance[]):any {
  this.assertCurrent(user,version);
  const current=this.financial.get(user);
  const enabled=current.experimentalRecommendations===true;
  const previous=this.getCurrent(user);
  const status=provenance.length===0?(previous?.status||'NO_AI_CALLS'):provenance.every(p=>p.liveCallUsed)?'COMPLETED':'PROVIDER_UNAVAILABLE';
  const analysis={version,status,promptFingerprint,modelFingerprint:this.modelFingerprint(),memoryHash:memoryFingerprint(this.chatMessages(user)),createdAt:this.now().toISOString(),snapshot:result.snapshot||this.financial.snapshot(user),readinessState:result.recommendation?.readinessState||'state_c_limited_data',decisionStatus:result.decision?.decisionStatus||'NEEDS_DATA',decision:enabled?result.decision:null,recommendation:enabled?result.recommendation:null,trace:enabled?result.trace:null,traceId:enabled?(result.trace?.evaluationId||result.evaluationId||null):null,policyVersion:result.decision?.policyVersion||loadPrototypePolicy().policyMeta.policyBundleVersion,releaseGate:enabled?null:gate,experimentalRecommendations:enabled,agentFreshness:result.agentFreshness||null,provenance:provenance.length?provenance:(previous?.provenance||[])};
  this.store.put(user.id,'analysis',analysis);
  return analysis;
 }
 async review(user:User,version:number,forceRefresh=false){
  const current=this.current(user,version);
  const provenance:Provenance[]=[];
  const provider=this.tracked(user,provenance);
  const repository=new BetaEngineRepository(this.store,user,this.financial,{referenceNowIso:this.now().toISOString()});
  try {
   const result=await this.bounded(async()=>{
    if(this.options.runReview)return this.options.runReview(user,current.state,provider);
    await this.refreshMemory(user, version, provider);
    return new ReviewOrchestrator({store:repository,fxService:this.options.fxService,llmClient:provider as LLMClient}).runReviewCycle({authenticatedUserId:user.id,targetUserId:user.id,forceRefresh,referenceNowIso:this.now().toISOString(),onStage:this.options.onStage});
   });
   this.assertCurrent(user,version);
   if(result.snapshot)repository.syncFromSnapshot(result.snapshot,version);
   return this.publish(user,version,result,provenance);
  } catch(error) { repository.abort();this.options.onSyntheticError?.(error instanceof Error ? error.message : String(error));throw error; }
 }
 async feedback(user:User,input:{recommendationId:string;action:'accept'|'adjust'|'decline'|'complete';adjustedAmount?:number|null;note?:string;requestId?:string;expectedVersion?:number}) {
  const current=this.current(user);
  if(!current.experimentalRecommendations)throw new BetaError('EXPERIMENTAL_CONSENT_REQUIRED','Enable experimental recommendations before responding to an action.',403);
  const fingerprint=createHash('sha256').update(JSON.stringify({recommendationId:input.recommendationId,action:input.action,amount:input.adjustedAmount??null,note:input.note||''})).digest('hex');
  const key='feedback-request:'+(input.requestId||fingerprint);
  const old=this.store.get(user.id,key) as any;
  if(old){if(old.requestHash!==fingerprint)throw new BetaError('REQUEST_ID_REUSED','Request identifier was used for a different action.',409);return {...old,...this.financial.get(user)};}
  const inflightKey=user.id+':'+key;
  const active=this.inflight.get(inflightKey);
  if(active){const response=await active;if(response.requestHash!==fingerprint)throw new BetaError('REQUEST_ID_REUSED','Request identifier was used for a different action.',409);return response;}
  if(input.expectedVersion!==undefined&&input.expectedVersion!==current.version)throw new BetaError('VERSION_CONFLICT','Profile changed. Reload Today.',409);
  const operation=async()=>{
  const repository=new BetaEngineRepository(this.store,user,this.financial,{referenceNowIso:this.now().toISOString()});
  const provenance:Provenance[]=[];
  const engine=new ReviewOrchestrator({store:repository,fxService:this.options.fxService,llmClient:this.tracked(user,provenance) as LLMClient});
  const result=await engine.submitFeedback({authenticatedUserId:user.id,targetUserId:user.id,...input});
  const latest=this.financial.get(user);
  const bundle=repository.getLatestRecommendationBundle(user.id,user.id);
  if(result.nextCycleResult)this.publish(user,latest.version,result.nextCycleResult,provenance);
  else if(bundle){const previous=this.getCurrent(user);this.publish(user,latest.version,{...previous,snapshot:this.financial.snapshot(user),recommendation:bundle.recommendation,decision:bundle.decision,trace:bundle.trace},provenance);}
  const response={...result,...latest,requestHash:fingerprint};
  this.store.put(user.id,key,response);
  return response;
  };
  const pending=operation();this.inflight.set(inflightKey,pending);
  try{return await pending;}finally{this.inflight.delete(inflightKey);}
 }
 async chat(user:User,message:string,requestId:string){const current=this.current(user);if(!message.trim()||message.length>12000||!requestId||requestId.length>200)throw new BetaError('INVALID_INPUT','Provide a message and a valid request identifier.');
  const generation=Number(this.store.get(user.id,'chat-generation')||0);const key='chat-request:'+(generation?generation+':':'')+requestId;const digest=createHash('sha256').update(message).digest('hex');const previous=this.store.get(user.id,key) as any;
  if(previous){if(previous.requestHash!==digest)throw new BetaError('REQUEST_ID_REUSED','Request identifier was already used for different content.',409);return previous;}
  const inflightKey=user.id+':'+generation+':'+requestId;const active=this.inflight.get(inflightKey);if(active){const result=await active;if(result.requestHash!==digest)throw new BetaError('REQUEST_ID_REUSED','Request identifier was already used for different content.',409);return result;}
  const run=this.chatOnce(user,message,requestId,current.version,digest,generation,key,this.chatEpoch(user));this.inflight.set(inflightKey,run);try{return await run;}finally{this.inflight.delete(inflightKey);}
 }
 private async chatOnce(user:User,message:string,requestId:string,version:number,requestHash:string,generation:number,cacheKey:string,epoch:number){
  const snapshot=this.financial.snapshot(user);const facts:Record<string,string>={accounts:`You have ${snapshot.accountSummaries.length} saved accounts.`,transactions:`There are ${snapshot.transactions.length} imported transactions.`,documents:`There are ${snapshot.statements.length} imported statements.`,goals:`You have ${snapshot.goals.length} saved financial goals.`,debts:`You have ${snapshot.debts.length} saved debt records.`};
  snapshot.accountSummaries.forEach((a,index)=>{facts['balance_'+index]=a.latestBalance?`Account ${index+1}: reported balance ${a.latestBalance.amount} ${a.latestBalance.currency}, as of ${a.latestBalance.asOf}.`:`Account ${index+1}: balance is unknown.`;});
  for(const [currency,amount] of Object.entries(snapshot.declaredMonthlyIncomeByCurrency))facts['declared_income_'+currency]=`Declared estimated monthly income: ${amount} ${currency}. This is a user estimate, not an observed statement total.`;
  if(snapshot.essentialCommitment?.estimatedMonthlyAmount!==null&&snapshot.essentialCommitment)facts.essentials=`Declared essential monthly expenses: ${snapshot.essentialCommitment.estimatedMonthlyAmount} ${snapshot.essentialCommitment.currency}.`;
  for(const [category,amount] of Object.entries(snapshot.spendingByCategory))if(amount!==0&&!snapshot.dataQuality.multiCurrencyDetected)facts['category_'+category]=`Observed statement category ${category}: ${amount} ${snapshot.baseCurrency}. This covers imported history, not a prediction or a confirmed monthly average.`;
  snapshot.debts.forEach((debt,index)=>{facts['debt_'+index]=`Debt record ${index+1}: balance ${debt.remainingBalance===null?'unknown':debt.remainingBalance+' '+debt.currency}; APR ${debt.apr===null?'unknown':debt.apr+'%'}; minimum ${debt.minimumPayment===null?'unknown':debt.minimumPayment+' '+debt.currency}; due ${debt.nextDueDate||'unknown'}.`;});
  snapshot.statements.forEach((statement,index)=>{facts['statement_'+index]=`Statement ${index+1}: ${statement.transactionCount} accepted operations; period ${statement.periodStart||'unknown'} to ${statement.periodEnd||'unknown'}; ${statement.duplicateCountSkipped} duplicates skipped.`;});
  facts.missing=snapshot.dataQuality.missingFields.length?`Missing fields: ${snapshot.dataQuality.missingFields.join(', ')}.`:'No missing fields are flagged in the current snapshot.';
  const analysis=this.getCurrent(user);
  if(analysis?.experimentalRecommendations&&analysis.decision){
   const decision=analysis.decision;
   facts.recommendation=`Current recommendation: ${decision.title}. ${decision.description}`;
   facts.reason=`Reason for the current decision: ${decision.reasoning}. ${decision.expectedEffectSummary}`;
   facts.trace=`Decision trace ${analysis.traceId||'available'} uses policy ${analysis.policyVersion}. Sources: ${(decision.sourceIds||[]).join(', ')}. Rules: ${(decision.ruleIds||[]).join(', ')}.`;
   facts.action_status=`Current action status: ${analysis.recommendation?.status||'none'}. Accept records an intention. Completion requires separate confirmation.`;
   if(decision.rawImpacts)facts.impacts=`Deterministic action effects: ${JSON.stringify(decision.rawImpacts)}. These estimates use the experimental policy.`;
   for(const [index,candidate] of (analysis.trace?.validatedCandidates||[]).entries())facts['candidate_'+index]=`Candidate evaluation: ${JSON.stringify(candidate)}.`;
   const feedback= new BetaEngineRepository(this.store,user,this.financial,{referenceNowIso:this.now().toISOString()}).listActionFeedbackForUser(user.id,user.id);
   if(feedback.length)facts.feedback=`Recorded feedback history: ${JSON.stringify(feedback.slice(-10).map(f=>({action:f.action,recommendationId:f.recommendationId,timestamp:f.timestamp})))}.`;
  }
  const history=(this.store.get(user.id,'chat') as any[]||[]).slice(-10).map(m=>({role:m.role,content:this.sanitize(user,String(m.content).slice(0,1000))}));
  const result=await this.bounded(()=>this.llm.generateStructured({systemPrompt:prompts.assistant.text,userPrompt:wrapUntrustedData(JSON.stringify({question:this.sanitize(user,message),history,facts,conversationMemory:new BetaEngineRepository(this.store,user,this.financial).getConversationMemory(user.id,user.id)}),'read_only_context'),schema:answerSchema,fallback:()=>({factIds:[],intent:'unknown' as const})}));
  this.assertCurrent(user,version);const parsed=answerSchema.safeParse(result.data);let reply:string;let status:string;
  if(!result.liveCallUsed||!parsed.success){reply='The AI provider is unavailable or returned an invalid response. Please retry. Your data has not changed.';status='PROVIDER_UNAVAILABLE';}
  else if(parsed.data.intent==='general'){
   const answer=await this.bounded(()=>this.llm.generateText({
    systemPrompt:prompts.assistantGeneral.text,
    userPrompt:wrapUntrustedData(this.sanitize(user,message),'general_question'),
    fallback:()=> 'Assistant is temporarily unavailable. Please try again.',
   }));
   this.assertCurrent(user,version);
   reply=answer.text;status=answer.liveCallUsed?'COMPLETED':'PROVIDER_UNAVAILABLE';
  }
  else if(parsed.data.intent==='financial_action'){reply=analysis?.experimentalRecommendations?(facts.recommendation?facts.recommendation+'\n'+facts.reason:'There is no current checked recommendation. Refresh Today to evaluate available actions.'):gate;status=analysis?.experimentalRecommendations?'COMPLETED':'POLICY_GATED';}
  else {const selected=[...new Set(parsed.data.factIds)].filter(id=>Object.hasOwn(facts,id));reply=selected.length?selected.map(id=>facts[id]).join('\n'):'I can summarize saved accounts, statement transactions and missing data. Please ask about those records.';status='COMPLETED';}
  if(Number(this.store.get(user.id,'chat-generation')||0)!==generation)throw new BetaError('CHAT_CLEARED','Chat was cleared while this reply was processing. Send a new message.',409);
  // No model-generated text or amounts can bypass the real-data release gate.
  if (this.chatEpoch(user) !== epoch) throw new BetaError('SUPERSEDED','Conversation was cleared.',409);
  const now=new Date().toISOString();const messages=(this.store.get(user.id,'chat') as any[]||[]);messages.push({id:requestId,role:'user',content:message,createdAt:now},{id:requestId+'-reply',role:'assistant',content:reply,createdAt:now});
  const response={messages,reply,status,requestHash,releaseGate:analysis?.experimentalRecommendations?null:gate,traceId:analysis?.traceId||null,provenance:{provider:result.provider,modelUsed:result.modelUsed,liveCallUsed:result.liveCallUsed}};
  this.store.put(user.id,'chat',messages);this.store.put(user.id,cacheKey,response);return response;
 }
}


