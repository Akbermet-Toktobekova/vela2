import { afterEach, describe, expect, it, vi } from 'vitest';
import { FinAgentApiClient, financialStateKey, mergeFeedbackResult } from '../../react-app/src/api/client';
import { createDemoSeedData } from '../../react-app/src/database/seed';
import { buildFinancialSnapshot } from '../../react-app/src/services/snapshotBuilder';
import { RecommendationService } from '../../react-app/src/services/recommendationService';
import { LocalAssistantService } from '../../react-app/src/services/assistantService';

afterEach(() => vi.unstubAllGlobals());

describe('Web feedback and source regressions (real pure web services, mocked HTTP transport)', () => {
  it('does not resync financial state for recommendation, chat, or feedback-only changes', () => {
    const state = createDemoSeedData();
    const original = financialStateKey(state);
    expect(financialStateKey({ ...state, recommendations: [], assistantMessages: [], actionFeedback: [] })).toBe(original);
    expect(financialStateKey({ ...state, debts: [] })).not.toBe(original);
    expect(financialStateKey({ ...state, balances: state.balances.map((b) => ({ ...b, amount: b.amount + 1 })) })).not.toBe(original);
  });

  it('merges server debt/balance changes, preserves browser chat/user metadata and puts next Today first', () => {
    const state = createDemoSeedData();
    const snapshot = buildFinancialSnapshot(state);
    const account = snapshot.accountSummaries.find((a) => a.latestBalance)!;
    account.latestBalance = { ...account.latestBalance!, amount: 321 };
    account.balanceHistory = account.balanceHistory.map((b) => b.id === account.latestBalance!.id ? account.latestBalance! : b);
    snapshot.debts = snapshot.debts.map((debt) => ({ ...debt, remainingBalance: 12 }));
    snapshot.goalAllocations = [...snapshot.goalAllocations, { ...snapshot.goalAllocations[0], id: 'server_allocation' }];
    const completed = { ...state.recommendations[0], status: 'completed' as const };
    const nextRecommendation = { ...state.recommendations[0], id: 'next_server_recommendation' };
    const merged = mergeFeedbackResult(state, {
      status: 'COMPLETED', snapshot, recommendation: completed,
      nextCycleResult: { recommendation: nextRecommendation },
    });
    expect(merged.balances.find((b) => b.id === account.latestBalance!.id)?.amount).toBe(321);
    expect(merged.debts[0].remainingBalance).toBe(12);
    expect(merged.goalAllocations.filter((a) => a.id === 'server_allocation')).toHaveLength(1);
    expect(mergeFeedbackResult(merged, { status: 'COMPLETED', snapshot }).goalAllocations).toEqual(snapshot.goalAllocations);
    expect(merged.recommendations.map((r) => r.id)).toEqual([nextRecommendation.id, completed.id]);
    expect(merged.assistantMessages).toBe(state.assistantMessages);
    expect(merged.user).toBe(state.user);
  });

  it('rejects cross-user snapshots instead of overwriting the active browser profile', () => {
    const state = createDemoSeedData();
    const snapshot = { ...buildFinancialSnapshot(state), userId: 'someone_else' };
    expect(() => mergeFeedbackResult(state, { status: 'COMPLETED', snapshot })).toThrow('another user');
  });

  it.each([400, 409, 500])('rejects HTTP %i feedback without changing local state', async (status) => {
    const state = createDemoSeedData();
    const original = JSON.stringify(state);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: 'ADJUSTMENT_REJECTED', message: 'Rejected by backend',
    }), { status })));
    await expect(FinAgentApiClient.submitFeedback({
      userId: state.user.id, recommendationId: state.recommendations[0].id,
      action: 'adjust', adjustedAmount: 999,
    })).rejects.toThrow('Rejected by backend');
    expect(JSON.stringify(state)).toBe(original);
  });

  it('rejects unavailable transport and malformed success, rather than reporting feedback saved', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network unavailable')));
    const args = { userId: 'u', recommendationId: 'r', action: 'accept' as const };
    await expect(FinAgentApiClient.submitFeedback(args)).rejects.toThrow('Network unavailable');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })));
    await expect(FinAgentApiClient.submitFeedback(args)).rejects.toThrow('did not confirm');
  });

  it('retains authoritative snapshot and next-cycle data after successful feedback', async () => {
    const state = createDemoSeedData();
    const result = { status: 'COMPLETED', recommendation: state.recommendations[0], snapshot: buildFinancialSnapshot(state),
      nextCycleResult: { recommendation: { ...state.recommendations[0], id: 'next' } } };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(result), { status: 200 })));
    expect(await FinAgentApiClient.submitFeedback({ userId: state.user.id, recommendationId: 'r', action: 'complete' })).toEqual(result);
  });

  it('never synthesizes scores/provenance or a monetary amount in fresh local fallback', () => {
    const state = createDemoSeedData();
    const snapshot = buildFinancialSnapshot(state);
    const local = RecommendationService.evaluateCurrentRecommendation(snapshot, state.recommendations)!;
    expect(local.suggestedAmount).toBe(40); // Explicit demo seed, not a new policy.
    expect(local.finAgentMeta).toBeUndefined();
    const fresh = RecommendationService.evaluateCurrentRecommendation({ ...snapshot, isDemoMode: false }, [])!;
    expect(fresh.suggestedAmount).toBeNull();
    expect(fresh.finAgentMeta).toBeUndefined();
  });

  it('requires acceptance before local completion and refuses cross-currency/account overspending', () => {
    const state = createDemoSeedData();
    const snapshot = buildFinancialSnapshot(state);
    const recommendation = state.recommendations[0];
    expect(() => RecommendationService.executeReserveAllocation({ recommendation, snapshot, amount: 40, accountId: 'acc_revolut' })).toThrow('Accept or adjust');
    const accepted = { ...recommendation, status: 'accepted' as const };
    expect(() => RecommendationService.executeReserveAllocation({ recommendation: accepted, snapshot, amount: 40, accountId: 'acc_otp' })).toThrow('currency');
    expect(() => RecommendationService.executeReserveAllocation({ recommendation: accepted, snapshot, amount: 10000, accountId: 'acc_revolut' })).toThrow('exceeds');
    expect(RecommendationService.executeReserveAllocation({ recommendation: accepted, snapshot, amount: 40, accountId: 'acc_revolut' }).newAllocation.amount).toBe(40);
  });

  it('answers safe-to-spend intent before general spending/cushion keyword branches', () => {
    const snapshot = buildFinancialSnapshot(createDemoSeedData());
    const answer = LocalAssistantService.generateReply('How much can I spend safely from my savings?', snapshot, null);
    expect(answer.toolUsed).toBe('query_safe_to_spend');
    expect(answer.reply).toContain(snapshot.primaryCurrencySummary.uncommittedSafeToSpend.toFixed(2));
    expect(RecommendationService.validateAdjustedAmount(snapshot, Infinity).valid).toBe(false);
  });

  it('presents only the adjusted amount without old monetary effects or ranking prose', () => {
    const original = { ...createDemoSeedData().recommendations[0],
      title: 'Add EUR 200 to cushion', description: 'Earmark EUR 200 for original effects',
      reasoning: 'Original F017 score 0.50 and F018 stability 1.0',
    };
    const presentation = RecommendationService.presentation({ ...original, status: 'adjusted', adjustedAmount: 40 });
    expect(presentation.title).toContain('EUR 40.00');
    expect(JSON.stringify(presentation)).not.toContain('200');
    expect(JSON.stringify(presentation)).not.toContain('0.50');
    expect(presentation.reasoning).toBeNull();
    expect(presentation.showEvaluatedEffects).toBe(false);
    expect(presentation.description).toContain('have not been recalculated');
    expect(RecommendationService.presentation(original).title).toBe(original.title);
  });

  it('surfaces the actual Checker rejection reason to the UI', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: 'ADJUSTMENT_REJECTED', rejectionReason: 'Requested amount exceeds available funds.',
    }), { status: 400 })));
    await expect(FinAgentApiClient.submitFeedback({ userId: 'u', recommendationId: 'r', action: 'adjust', adjustedAmount: 5000 }))
      .rejects.toThrow('Requested amount exceeds available funds.');
  });
});
