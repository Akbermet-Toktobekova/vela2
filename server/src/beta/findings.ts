/** Evidence descriptions only: financial totals and action eligibility remain with existing owners. */
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { FindingCategorySchema,FindingResponseSchema,FindingSchema,FindingsPacketSchema,type Finding,type FindingResponse } from '../../../shared/contracts/findings';
import type { SpendingCategory,TransactionClassification,TransactionEconomicType,TransactionRecord } from '../../../shared/pi/types';
import policyBundle from '../../config/prototype-policy.json';
import directory from '../../data/merchants-v1.json';
import { BetaError,BetaFinancial,type BetaState } from './financial';
import type { BetaStore } from './store';

type User={id:string;name:string;email:string};
const policy=policyBundle.findingDetectionPolicy;
const normalize=(value:string)=>value.toLowerCase().trim().replace(/\s+/g,' ');
const hash=(value:unknown)=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function identifyMerchant(description:string) {
 const normalized=normalize(description);
 return directory.entries.find(entry=>entry.aliases.includes(normalized));
}
const merchantKey=(row:TransactionRecord)=>identifyMerchant(row.description)?.id || normalize(row.counterparty||row.description);
const evidenceKey=(row:TransactionRecord)=>[row.accountId,row.currency,row.date,row.amount,normalize(row.description),row.reference];
interface Decision {evidenceVersion:string;response:FindingResponse;answeredAt:string;}
interface ReviewItem {finding:Finding;status:'pending'|'Approved'|'Corrected'|'Dismissed'|'Deferred';}
interface ReviewBatch {id:string;items:ReviewItem[];}
interface Preference {category:SpendingCategory;economicType:TransactionEconomicType;}
const preferenceKey=(accountId:string,merchant:string)=>JSON.stringify([accountId,merchant]);
type Decisions=Record<string,Decision>;
const outflow=(row:TransactionRecord)=>row.amount<0;
const explicitFee=(text:string)=>/\b(?:service (?:fee|charge)|(?:atm|fx|foreign exchange|overdraft|maintenance|bank|transaction) fee|interest (?:fee|charge)|debit interest)\b/i.test(text);

function cadenceFor(rows:TransactionRecord[]):Finding['cadence'] {
 const dates=[...new Set(rows.map(row=>row.date))].sort();
 if(dates.length<policy.minimumDistinctChargeDates)return;
 const gaps=dates.slice(1).map((value,index)=>(Date.parse(value)-Date.parse(dates[index]))/86400000);
 for(const [cadence,[min,max]] of Object.entries(policy.cadenceDays))if(gaps.every(gap=>gap>=min&&gap<=max))return cadence as Finding['cadence'];
}
function groups<T>(rows:T[],key:(row:T)=>string):T[][] {
 const result=new Map<string,T[]>();
 for(const row of rows){const id=key(row);result.set(id,[...(result.get(id)||[]),row]);}
 return [...result.values()];
}

export class BetaFindings {
 constructor(private store:BetaStore,private financial:BetaFinancial){}
 private generate(user:User,current:BetaState):Finding[] {
  const state=current.state;
  const rows=state.transactions.filter(row=>row.userId===user.id&&state.accounts.some(account=>account.id===row.accountId&&account.userId===user.id));
  const classes=new Map(state.classifications.map(item=>[item.transactionId,item]));
  const decisions=(this.store.get(user.id,'finding-decisions-v1')||{}) as Decisions;
  const findings:Finding[]=[];
  const add=(kind:Finding['kind'],key:string,evidence:TransactionRecord[],details:Partial<Finding>)=>{
   if(!evidence.length)return;
   const sorted=[...evidence].sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
   const evidenceVersion=hash(sorted.map(evidenceKey).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))));
   const id=hash([kind,key]);
   const decision=decisions[id];
   const answered=decision?.evidenceVersion===evidenceVersion;
   const legacy=state.confirmations.filter(item=>item.userId===user.id&&item.userResponse&&sorted.some(row=>row.id===item.subjectId)&&((kind==='recurrence'&&item.subjectType==='subscription')||(kind==='transfer'&&item.subjectType==='transfer')));
   // A previous explicit answer covers its existing evidence, not future charges.
   const latestLegacyDate=legacy.length?Math.max(...legacy.map(item=>Date.parse(state.transactions.find(row=>row.id===item.subjectId)!.date))):0;
   const legacyAnswered=legacy.length>0&&Date.parse(sorted.at(-1)!.date)<=latestLegacyDate;
   findings.push(FindingSchema.parse({id,kind,title:'Review transactions',observation:'',whyItMatters:'',question:'',currency:sorted[0].currency,accountId:sorted[0].accountId,evidenceIds:sorted.map(row=>row.id),dateRange:{start:sorted[0].date,end:sorted.at(-1)!.date},totalAmount:Math.round(sorted.reduce((sum,row)=>sum+Math.abs(row.amount),0)*100)/100,confidence:'medium',state:answered?(decision.response.response==='unsure'?'deferred':decision.response.response==='dismiss'?'dismissed':'answered'):legacyAnswered?'answered':'unresolved',evidenceVersion,reopened:!!decision&&decision.evidenceVersion!==evidenceVersion,responses:['dismiss'],...details}));
  };
  const byMerchant=groups(rows,row=>JSON.stringify([row.accountId,row.currency,merchantKey(row)]));
  for(const group of byMerchant){
   const first=group[0],merchant=identifyMerchant(first.description),name=merchant?.canonicalName||first.counterparty||first.description;
   const key=JSON.stringify([first.accountId,first.currency,merchantKey(first)]);
   const uncertainRow=(row:TransactionRecord)=>{const c=classes.get(row.id);return c?.status!=='user_confirmed'&&(!c||c.economicType==='unknown'||c.confidence==='low'||(c.status==='needs_review'&&c.confidence!=='high')||['processor','marketplace'].includes(identifyMerchant(row.description)?.kind||''));};
   const unconfirmed=group.filter(uncertainRow);
   const fees=group.filter(row=>outflow(row)&&explicitFee(row.description));
   if(fees.length)add('fee',key,fees,{title:`Recorded fees: ${name}`,observation:`${fees.length} outflow(s) explicitly describe a fee or interest charge.`,whyItMatters:'These recorded charges contribute to spending. This is not evidence of fraud, hidden fees, or recoverable savings.',question:'Are these charges classified correctly?',confidence:'high',merchant:name,responses:[]});
   const repeated=group.filter(row=>outflow(row)&&!explicitFee(row.description)&&!['refund','internal_transfer','external_transfer','income'].includes(classes.get(row.id)?.economicType||''));
   const cadence=cadenceFor(repeated);
   const eligible=merchant&&!['ordinary_purchase','processor','marketplace'].includes(merchant.kind);
   if(cadence&&eligible){
    const amounts=repeated.map(row=>Math.abs(row.amount));
    const variation=(Math.max(...amounts)-Math.min(...amounts))/Math.max(...amounts);
    const variable=variation>policy.maximumRelativeAmountVariation;
    const subscription=merchant.kind==='subscription_service'&&!variable;
    add('recurrence',key,repeated,{title:`${name}: ${cadence} charges`,merchant:name,cadence,recurrenceState:decisions[hash(['recurrence',key])]?.response.response==='still_used'?'user_confirmed':subscription?'candidate':'observed',observation:`${new Set(repeated.map(row=>row.date)).size} distinct charge dates show ${cadence} spacing${variable?' with varying amounts':''}. ${subscription?'This is a subscription candidate, not a confirmed contract.':'This is observed recurrence, not a confirmed subscription.'}`,whyItMatters:'Confirm the service and classification before interpreting recurring spending. Usage does not establish cancellation eligibility.',question:subscription?'Do you still use this service?':'Does this recurring bill have the correct classification?',responses:[]});
   }
   const transfers=group.filter(row=>classes.get(row.id)?.status!=='user_confirmed'&&(uncertainRow(row)||classes.get(row.id)?.status==='needs_review')).filter(row=>classes.get(row.id)?.economicType==='internal_transfer'||classes.get(row.id)?.economicType==='external_transfer'||/\btransfer\b/i.test(row.description));
   if(transfers.length)add('transfer',key,transfers,{title:`Review transfers: ${name}`,merchant:name,observation:`We couldn’t tell whether ${transfers.length} transaction(s) are transfers or spending.`,whyItMatters:'Internal transfers must not be counted again as income or personal spending.',question:'Are these between your own accounts or external transfers?',responses:['internal_transfer','external_transfer','unsure','dismiss']});
   const uncertain=unconfirmed.filter(row=>!transfers.includes(row));
   const compatible=groups(uncertain,row=>JSON.stringify([row.amount<0?'outflow':'inflow',classes.get(row.id)?.economicType||'unknown',classes.get(row.id)?.category||'unknown']));
   for(const subset of compatible){const c=classes.get(subset[0].id);const subgroup=JSON.stringify([key,subset[0].amount<0?'outflow':'inflow',c?.economicType||'unknown',c?.category||'unknown']);add('classification',subgroup,subset,{title:`Classify ${name}`,merchant:name,confidence:'low',observation:`We couldn’t confidently classify ${subset.length} transaction(s)${merchant?.kind==='processor'||merchant?.kind==='marketplace'?'; this descriptor does not identify the purchase':''}.`,whyItMatters:'This uncertainty affects spending, income or recurring commitment totals.',question:'Which category and transaction type fit these records?',responses:['confirm_classification','unsure','dismiss']});}

  }
  for(const group of groups(rows.filter(outflow),row=>JSON.stringify([row.accountId,row.currency,row.date,row.amount,normalize(row.description)])))if(group.length>1)add('duplicate',JSON.stringify([group[0].accountId,group[0].currency,group[0].date,group[0].amount,normalize(group[0].description)]),group,{title:'Potential duplicate charges',observation:`${group.length} same-day outflows have the same description and amount.`,whyItMatters:'These may be separate purchases or duplicate charges. No record is deleted automatically.',question:'Check the supporting transactions; dismiss if these are separate purchases.',confidence:'low',responses:['dismiss']});
  // Existing ownership blockers are grouped by account, preserving the old confirmations.
  for(const account of state.accounts.filter(item=>item.userId===user.id&&item.fundsOwnership==='unknown')){
   const evidence=rows.filter(row=>row.accountId===account.id);
   for(const group of groups(evidence,row=>row.currency))add('data_blocker',JSON.stringify([account.id,group[0].currency]),group,{title:`Account ownership: ${account.name}`,observation:'The ownership of this account is unknown.',whyItMatters:'Funds held for others or business use must not be treated as personal funds.',question:'Review this account’s ownership in account settings.',confidence:'high',responses:['dismiss']});
  }
  return findings.sort((a,b)=>policy.priorityOrder.indexOf(a.kind)-policy.priorityOrder.indexOf(b.kind)||a.currency.localeCompare(b.currency)||b.totalAmount-a.totalAmount||a.id.localeCompare(b.id));
 }
 private reviewBatches(user:User,generated:Finding[]):ReviewBatch[]{
  const batches=structuredClone((this.store.get(user.id,'finding-review-batches-v1')||[]) as ReviewBatch[]);
  const actionable=generated.filter(f=>f.responses.length>0);
  for(const batch of batches)for(const item of batch.items){
   const match=actionable.find(f=>f.id===item.finding.id&&f.evidenceVersion===item.finding.evidenceVersion);
   if(match){item.finding={...match};if(match.state==='deferred')item.status='Deferred';else if(match.state==='dismissed')item.status='Dismissed';else if(match.state==='answered'&&['pending','Deferred'].includes(item.status))item.status='Approved';}
   else if(['pending','Deferred'].includes(item.status))item.status='Corrected';
  }
  const fresh=actionable.filter(f=>(f.state==='unresolved'||f.state==='deferred')&&!batches.some(b=>b.items.some(i=>i.finding.id===f.id&&i.finding.evidenceVersion===f.evidenceVersion)));
  if(fresh.length)batches.push({id:hash(fresh.map(f=>[f.id,f.evidenceVersion])),items:fresh.map(f=>({finding:f,status:f.state==='deferred'?'Deferred':'pending'}))});
  this.store.put(user.id,'finding-review-batches-v1',batches);return batches;
 }
 list(user:User){
  const current=this.financial.get(user),generated=this.generate(user,current),batches=this.reviewBatches(user,generated);
  const active=batches.find(b=>b.items.some(i=>['pending','Deferred'].includes(i.status)))||batches.at(-1);
  const pending=batches.flatMap(b=>b.items.filter(i=>['pending','Deferred'].includes(i.status))).sort((a,b)=>Number(a.status==='Deferred')-Number(b.status==='Deferred'));
  const resolved=active?.items.filter(i=>!['pending','Deferred'].includes(i.status)).length||0;
  return FindingsPacketSchema.parse({version:current.version,policyVersion:policy.version,findings:pending.slice(0,policy.maximumVisibleFindings).map(i=>({...i.finding,...(i.status==='Deferred'?{reviewStatus:'Deferred',state:'deferred'}:{})})),unresolvedCount:pending.length,informational:generated.filter(f=>!f.responses.length),reviewed:batches.flatMap(b=>b.items.filter(i=>i.status!=='pending').map(i=>({...i.finding,reviewStatus:i.status}))),progress:active?{batchId:active.id,total:active.items.length,resolved,deferred:active.items.filter(i=>i.status==='Deferred').length,remaining:active.items.length-resolved}:null});
 }

 respond(user:User,id:string,raw:unknown):BetaState {
  const body=FindingResponseSchema.parse(raw);
  this.store.database.exec('BEGIN IMMEDIATE');
  try {
   const current=this.financial.get(user);const decisions=(this.store.get(user.id,'finding-decisions-v1')||{}) as Decisions;
   const previous=decisions[id];
   if(previous&&previous.evidenceVersion===body.evidenceVersion&&hash(previous.response)===hash(body)){this.store.database.exec('COMMIT');return current;}
   if(current.version!==body.expectedVersion)throw new BetaError('VERSION_CONFLICT','Your profile changed. Refresh before answering.',409);
   const finding=this.generate(user,current).find(item=>item.id===id);
   if(!finding)throw new BetaError('NOT_FOUND','Finding not found.',404);
   if(finding.evidenceVersion!==body.evidenceVersion)throw new BetaError('EVIDENCE_CHANGED','New evidence is available. Review before answering.',409);
   if(!finding.responses.includes(body.response))throw new BetaError('INVALID_RESPONSE','That answer does not apply to this finding.');
   if(body.response==='confirm_classification'&&(!body.category||!body.economicType))throw new BetaError('NEEDS_CLASSIFICATION','Choose both category and transaction type.');
   const batches=this.reviewBatches(user,this.generate(user,current));
   const state=structuredClone(current.state),now=new Date().toISOString();
   let corrected=false;
   if(['confirm_classification','internal_transfer','external_transfer'].includes(body.response)){
    for(const transactionId of finding.evidenceIds){
     const previousClass=state.classifications.find(item=>item.transactionId===transactionId);
     if(previousClass?.status==='user_confirmed')continue;
     const economicType=body.response==='confirm_classification'?body.economicType!:body.response as TransactionEconomicType;
     const category=body.response==='confirm_classification'?body.category!:'transfer';
     if(previousClass&&(previousClass.category!==category||previousClass.economicType!==economicType))corrected=true;
     state.classifications=state.classifications.filter(item=>item.transactionId!==transactionId);
     state.classifications.push({id:previousClass?.id||`finding-classification-${transactionId}`,transactionId,economicType,category,confidence:'high',status:'user_confirmed',classifierVersion:'user',isRecurringCandidate:previousClass?.isRecurringCandidate||false,provenanceNote:'Explicit grouped finding review',updatedAt:now});
    }
    state.transferMatches=state.transferMatches.map(match=>finding.evidenceIds.includes(match.outgoingTransactionId)||!!match.incomingTransactionId&&finding.evidenceIds.includes(match.incomingTransactionId)?{...match,status:body.response==='internal_transfer'?'user_confirmed':body.response==='external_transfer'?'user_rejected':match.status}:match);
   }
   // Usage answers intentionally do not create a cancellation candidate or change money.
   if(body.applyMerchantPreference&&body.response==='confirm_classification'){
    const preferences=(this.store.get(user.id,'merchant-preferences-v1')||{}) as Record<string,Preference>;
    const evidence=state.transactions.filter(row=>finding.evidenceIds.includes(row.id));
    for(const row of evidence.filter(row=>!['processor','marketplace'].includes(identifyMerchant(row.description)?.kind||'')))preferences[preferenceKey(row.accountId,merchantKey(row))]={category:body.category!,economicType:body.economicType!};
    this.store.put(user.id,'merchant-preferences-v1',preferences);
   }
   decisions[id]={evidenceVersion:finding.evidenceVersion,response:body,answeredAt:now};
   for(const batch of batches)for(const item of batch.items)if(item.finding.id===id&&item.finding.evidenceVersion===body.evidenceVersion)item.status=body.response==='unsure'?'Deferred':body.response==='dismiss'?'Dismissed':corrected?'Corrected':'Approved';
   this.store.put(user.id,'finding-review-batches-v1',batches);
   const result={...current,state,version:current.version+1};
   this.store.put(user.id,'state',result);this.store.put(user.id,'finding-decisions-v1',decisions);
   this.store.remove(user.id,'analysis');this.store.remove(user.id,'analysis-private');
   this.store.database.exec('COMMIT');return result;
  }catch(error){this.store.database.exec('ROLLBACK');throw error;}
 }
 applyMerchantPreferences(userId:string,transactions:TransactionRecord[],classifications:TransactionClassification[]):TransactionClassification[]{
  const preferences=(this.store.get(userId,'merchant-preferences-v1')||{}) as Record<string,Preference>;
  return classifications.map(item=>{const row=transactions.find(row=>row.id===item.transactionId&&row.userId===userId);if(!row||item.status==='user_confirmed')return item;const preference=['processor','marketplace'].includes(identifyMerchant(row.description)?.kind||'')?undefined:preferences[preferenceKey(row.accountId,merchantKey(row))];return preference?{...item,...preference,status:'user_confirmed',confidence:'high',classifierVersion:'user-merchant-preference-v1',provenanceNote:'Account-scoped merchant preference explicitly selected by user'}:item;});
 }
 async suggestCategories(user:User,provider?:CategorySuggestionProvider):Promise<CategorySuggestionResult>{
  const current=this.financial.get(user);if(!current.aiConsent)return {status:'consent_required',suggestions:[]};
  if(!provider)return {status:'provider_unavailable',suggestions:[]};
  const classes=new Map(current.state.classifications.map(item=>[item.transactionId,item]));
  const rows=current.state.transactions.filter(row=>row.userId===user.id&&classes.get(row.id)?.status!=='user_confirmed'&&(!classes.has(row.id)||classes.get(row.id)?.status==='needs_review'||classes.get(row.id)?.confidence==='low')).slice(0,policy.aiMaximumRecords);
  const records=rows.map(row=>({transactionId:row.id,merchant:(identifyMerchant(row.description)?.canonicalName||normalize(row.counterparty||row.description).replace(/\S+@\S+|\b[A-Z]{2}\d[\w ]+|\d+/gi,'[redacted]')).slice(0,policy.aiMerchantTokenLength)}));
  if(!records.length)return {status:'ready',suggestions:[]};
  try {
   let timer:ReturnType<typeof setTimeout>|undefined;
   let result:unknown;
   try {result=await Promise.race([provider({records,allowedCategories:FindingCategorySchema.options}),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Provider timeout')),policy.aiTimeoutMs);})]);}finally{if(timer)clearTimeout(timer);}
   const latest=this.store.get(user.id,'state') as BetaState|null;
   if(!latest||!latest.aiConsent||latest.version!==current.version)return {status:'superseded',suggestions:[]};
   const parsed=CategorySuggestionsSchema.safeParse(result);
   if(!parsed.success||new Set(parsed.data.suggestions.map(item=>item.transactionId)).size!==parsed.data.suggestions.length||parsed.data.suggestions.some(item=>!records.some(row=>row.transactionId===item.transactionId)))return {status:'invalid_output',suggestions:[]};
   return {status:'ready',suggestions:parsed.data.suggestions};
  }catch{return {status:'provider_unavailable',suggestions:[]};}
 }
}
export const CategorySuggestionsSchema=z.object({suggestions:z.array(z.object({transactionId:z.string().min(1),category:FindingCategorySchema}).strict()).max(policy.aiMaximumRecords)}).strict();
export type CategorySuggestionProvider=(input:{records:{transactionId:string;merchant:string}[];allowedCategories:string[]})=>Promise<unknown>;
export interface CategorySuggestionResult {status:'consent_required'|'provider_unavailable'|'invalid_output'|'ready'|'superseded';suggestions:{transactionId:string;category:SpendingCategory}[];}
