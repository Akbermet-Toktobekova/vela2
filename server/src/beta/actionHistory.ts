import { createHash,randomUUID } from 'node:crypto';
import { ActionHistoryPacketSchema,ActionOutcomeSchema } from '../../../shared/contracts/actionHistory';
import type { ActionHistoryItem } from '../../../shared/contracts/actionHistoryTypes';
import { BetaError,BetaFinancial } from './financial';
import type { BetaStore } from './store';
type User={id:string;name:string;email:string};
const hash=(v:unknown)=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
interface History {items:ActionHistoryItem[];requests:Record<string,string|null>;outcomes:Record<string,{hash:string;item:ActionHistoryItem}>;legacyMigrated:boolean;}
export class BetaActionHistory {
 constructor(private store:BetaStore,private financial:BetaFinancial){}
 private read(user:User):History {return structuredClone((this.store.get(user.id,'action-history-v1')||{items:[],requests:{},outcomes:{},legacyMigrated:false}) as History);}
 private save(user:User,data:History){this.store.put(user.id,'action-history-v1',data);}
 private snapshot(rec:any,decision?:any){return {actionId:decision?.selectedActionId||rec.finAgentMeta?.catalogActionId||'',title:rec.title,description:rec.description||'',amount:rec.adjustedAmount??rec.suggestedAmount??null,currency:rec.currency||'',targetId:decision?.candidate?.targetId||rec.targetGoalId||rec.sourceAccountId||null};}
 list(user:User){
  const data=this.read(user);
  if(!data.legacyMigrated){
   const engine=this.store.get(user.id,'engine') as any;
   const feedback=engine?.feedback||[];
   for(const bundle of engine?.recommendations||[]){const rec=bundle.recommendation;const entries=feedback.filter((f:any)=>f.recommendationId===rec.id);if(!entries.length||!bundle.decision?.candidate||!bundle.decision?.selectedActionId)continue;
    const suggestion=this.snapshot(rec,bundle.decision);const stamp=rec.createdAt||entries[0].timestamp;data.items.push({id:'legacy-'+rec.id,revision:1,origin:'legacy_user_feedback',requestId:'legacy-'+rec.id,recommendationId:rec.id,fingerprint:hash(suggestion),suggestion,proposedAt:stamp,lastReviewedAt:stamp,outcome:'awaiting_update',note:'',updatedAt:stamp});
   }
   data.legacyMigrated=true;this.save(user,data);
  }
  return ActionHistoryPacketSchema.parse({items:data.items.sort((a,b)=>b.proposedAt.localeCompare(a.proposedAt)||a.id.localeCompare(b.id))});
 }
 recordManual(user:User,result:any,requestId:string,version:number):string|null {
  const current=this.financial.get(user);if(current.version!==version)throw new BetaError('SUPERSEDED','Profile changed during review.',409);
  this.list(user);const data=this.read(user);
  if(Object.hasOwn(data.requests,requestId))return data.requests[requestId];
  const rec=result?.recommendation,decision=result?.decision;
  const valid=['COMPLETED','NO_AI_CALLS'].includes(result?.status)&&decision?.decisionStatus==='RECOMMENDATION_READY'&&decision?.candidate&&/^A\d{3}$/.test(decision?.selectedActionId||'')&&rec?.id&&rec?.title;
  if(!valid){data.requests[requestId]=null;this.save(user,data);return null;}
  const suggestion=this.snapshot(rec,decision),fingerprint=hash([suggestion.actionId,suggestion.targetId,suggestion.amount,suggestion.currency]),now=new Date().toISOString();
  let item=data.items.find(i=>i.fingerprint===fingerprint&&['awaiting_update','not_now'].includes(i.outcome));
  if(item){item.lastReviewedAt=now;item.updatedAt=now;item.revision++;}
  else {item={id:randomUUID(),revision:1,origin:'manual_review',requestId,recommendationId:rec.id,fingerprint,suggestion,proposedAt:now,lastReviewedAt:now,outcome:'awaiting_update',note:'',updatedAt:now};data.items.push(item);}
  data.requests[requestId]=item.id;this.save(user,data);return item.id;
 }
 respond(user:User,id:string,raw:unknown){
  const input=ActionOutcomeSchema.parse(raw);this.store.database.exec('BEGIN IMMEDIATE');
  try {this.list(user);const data=this.read(user),digest=hash({id,...input}),previous=data.outcomes[input.requestId];
   if(previous){if(previous.hash!==digest)throw new BetaError('REQUEST_ID_REUSED','Request ID was used for another update.',409);this.store.database.exec('COMMIT');return previous.item;}
   const item=data.items.find(i=>i.id===id);if(!item)throw new BetaError('NOT_FOUND','History item not found.',404);
   if(item.revision!==input.expectedRevision)throw new BetaError('VERSION_CONFLICT','This action was updated. Refresh history before saving again.',409);
   item.outcome=input.outcome;item.note=input.note;item.revision++;item.updatedAt=new Date().toISOString();data.outcomes[input.requestId]={hash:digest,item:structuredClone(item)};this.save(user,data);this.store.database.exec('COMMIT');return item;
  }catch(e){this.store.database.exec('ROLLBACK');throw e;}
 }
}
