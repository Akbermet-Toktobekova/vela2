import { mockCatalogFallbackClient } from './catalogFallbackFixture';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SQLiteStore } from '../helpers/engineStore';
import { ReviewOrchestrator } from '../../src/orchestrator/reviewWorkflow';
import { LLMClient } from '../../src/ai/llmClient';
import { SuggestionGenerator } from '../../src/suggestion/suggestionGenerator';
import { SharedFinancialCalculator } from '@shared/calculator';
import { createBaselineSolventFixture, createRiskyAutoTransferFixture } from '../helpers/testFixtures';

describe('Core feedback commitments and manual execution', () => {
  let store:SQLiteStore, workflow:ReviewOrchestrator, user:string, recommendationId:string;
  beforeEach(async()=>{
    const f=createBaselineSolventFixture(); user=f.snapshot.userId;
    // Keep this lifecycle scenario focused on a reserve allocation with no accruing debt.
    for (const debt of f.snapshot.debts) {
      f.extras.debtTerms![debt.id] = { ...f.extras.debtTerms![debt.id], interestAccruing: false };
    }
    store=new SQLiteStore(':memory:'); workflow=new ReviewOrchestrator({store,llmClient:mockCatalogFallbackClient()});
    store.savePIState(user,user,{snapshot:f.snapshot,calculatorExtras:f.extras});
    recommendationId=(await workflow.runReviewCycle({authenticatedUserId:user,targetUserId:user})).recommendation.id;
  });
  afterEach(()=>{vi.restoreAllMocks();store.close();});
  const send=(action:'accept'|'adjust'|'complete'|'decline',adjustedAmount?:number)=>workflow.submitFeedback({authenticatedUserId:user,targetUserId:user,recommendationId,action,adjustedAmount});
  it('reserves accepted cash once without changing actual balances or goal allocations',async()=>{
    const before=store.getPIState(user,user,false)!;
    const result=await send('accept');
    const commitments=store.listPendingFinancialCommitments(user,user);
    expect(commitments).toHaveLength(1); expect(commitments[0].amount).toBe(result.recommendation.suggestedAmount);
    expect(store.getPIState(user,user,false)!.snapshot).toEqual(before.snapshot);
    const normal=SharedFinancialCalculator.projectNetCashTrajectory90d(before.snapshot,before.calculatorExtras);
    const pending=SharedFinancialCalculator.projectNetCashTrajectory90d(before.snapshot,{...before.calculatorExtras,pendingFinancialCommitments:commitments});
    expect(pending.availableCashBeforeActionF003).toBeLessThan(normal.availableCashBeforeActionF003);
    expect(store.listPendingFinancialCommitments(user,user,recommendationId)).toEqual([]);
    await expect(send('accept')).rejects.toMatchObject({code:'INVALID_FEEDBACK_TRANSITION'});
    expect(store.listPendingFinancialCommitments(user,user)).toHaveLength(1);
  });
  it('changes pending amount on adjust and releases after completion',async()=>{
    const adjusted=await send('adjust',60); expect(store.listPendingFinancialCommitments(user,user)[0].amount).toBe(60);
    expect(adjusted.decision.candidate!.amount).toBe(60);
    expect(adjusted.decision.score).toBeNull(); expect(adjusted.decision.stability).toBeNull();
    expect(adjusted.decision.rawImpacts!.financialBenefitCurrency).toBe(0);
    expect((await send('complete')).status).toBe('COMPLETED');
    expect(store.listPendingFinancialCommitments(user,user)).toEqual([]);
    expect(store.getPIState(user,user,false)!.snapshot.goalAllocations.some(a=>a.recommendationId===recommendationId && a.amount===60)).toBe(true);
  });
  it('cancels a superseded pending commitment without stale PI mutation and replays safely',async()=>{
    await send('accept');
    const before=store.getPIState(user,user,false)!;
    await workflow.runReviewCycle({authenticatedUserId:user,targetUserId:user,forceRefresh:true});
    await expect(send('complete')).rejects.toMatchObject({code:'STALE_RECOMMENDATION'});
    expect(store.listPendingFinancialCommitments(user,user)).toHaveLength(1);
    const declined=await send('decline'); expect(declined.accepted).toBe(true);
    expect(store.listPendingFinancialCommitments(user,user)).toEqual([]);
    const after=store.getPIState(user,user,false)!; expect(after.version).toBe(before.version); expect(after.snapshot).toEqual(before.snapshot);
    const replay=await send('decline'); expect(replay.accepted).toBe(true);
    expect(store.listActionFeedbackForUser(user,user).filter(f=>f.recommendationId===recommendationId && f.action==='decline')).toHaveLength(1);
    expect(store.getPIState(user,user,false)!.version).toBe(before.version);
  });
  it('rolls back acceptance when feedback write fails',async()=>{
    vi.spyOn(store,'recordActionFeedback').mockImplementationOnce(()=>{throw new Error('write failed');});
    await expect(send('accept')).rejects.toThrow('write failed');
    expect(store.getRecommendationById(user,user,recommendationId)!.recommendation.status).toBe('proposed');
    expect(store.listPendingFinancialCommitments(user,user)).toEqual([]);
  });
  it('requires verification rather than falsely completing real-world cancellation',async()=>{
    const b=store.getRecommendationById(user,user,recommendationId)!;
    b.recommendation.status='accepted'; b.decision.selectedActionId='A015'; b.decision.selectedActionType='FINANCIAL_ACTION';
    b.decision.candidate={...b.decision.candidate!,actionId:'A015'};
    store.saveRecommendation(user,user,b.recommendation,b.decision);
    const version=store.getPIState(user,user,false)!.version;
    const result=await send('complete'); expect(result.status).toBe('VERIFICATION_REQUIRED'); expect(result.accepted).toBe(false);
    expect(store.getPIState(user,user,false)!.version).toBe(version);
    expect(store.getRecommendationById(user,user,recommendationId)!.recommendation.status).toBe('accepted');
    expect(store.listActionFeedbackForUser(user,user)).toEqual([]);
  });
  it('records confirmed A011 pause without creating cash or changing balances',async()=>{
    const fixture=createRiskyAutoTransferFixture();
    store.savePIState(user,user,{snapshot:{...fixture.snapshot,userId:user},calculatorExtras:fixture.extras});
    const cycle=await workflow.runReviewCycle({authenticatedUserId:user,targetUserId:user,forceRefresh:true});
    expect(cycle.decision.selectedActionId).toBe('A011');
    recommendationId=cycle.recommendation.id;
    await send('accept');
    const before=store.getPIState(user,user,false)!;
    const completed=await send('complete');
    expect(completed.status).toBe('COMPLETED');
    const after=store.getPIState(user,user,false)!;
    expect(after.calculatorExtras!.scheduledTransfers!.find(t=>t.id===cycle.decision.candidate!.targetId)!.isActive).toBe(false);
    expect(after.snapshot.accountSummaries.map(a=>a.latestBalance)).toEqual(before.snapshot.accountSummaries.map(a=>a.latestBalance));
  });
  it('keeps declined actions excluded across snapshots until configured cooldown expires',async()=>{
    const f=createBaselineSolventFixture(),b=store.getRecommendationById(user,user,recommendationId)!;
    b.recommendation.status='declined'; b.recommendation.snapshotId='old'; b.recommendation.updatedAt='2026-11-02T09:00:00Z';
    const generate=()=>SuggestionGenerator.generateCandidates({snapshot:f.snapshot,policy:workflow.getPolicy(),calculatorExtras:f.extras,existingRecommendations:[b.recommendation],llmClient:new LLMClient({mockMode:true})});
    expect((await generate()).some(c=>c.actionId===b.decision.selectedActionId)).toBe(false);
    b.recommendation.updatedAt='2026-09-01T09:00:00Z';
    expect((await generate()).some(c=>c.actionId===b.decision.selectedActionId)).toBe(true);
  });
});
