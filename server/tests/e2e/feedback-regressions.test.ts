import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { createAppBundle } from '../../src/routes/api';
import { SQLiteStore } from '../../src/db/sqliteStore';
import { LLMClient } from '../../src/ai/llmClient';
import { createBaselineSolventFixture } from '../helpers/testFixtures';

describe('Feedback lifecycle and snapshot consistency through HTTP', () => {
  let store: SQLiteStore;
  let bundle: ReturnType<typeof createAppBundle>;
  let server: Server;
  let base: string;
  let user: string;
  let recId: string;
  const feedback = async (action: string, extras: Record<string, unknown> = {}) => {
    const response = await fetch(`${base}/feedback/${user}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-user-id': user },
      body: JSON.stringify({ recommendationId: recId, action, ...extras }),
    });
    return { response, data: await response.json() as any };
  };
  beforeEach(async () => {
    const fixture = createBaselineSolventFixture();
    user = fixture.snapshot.userId;
    store = new SQLiteStore(':memory:');
    bundle = createAppBundle({ store, llmClient: new LLMClient({ mockMode: true }) });
    store.savePIState(user, user, { snapshot: fixture.snapshot, calculatorExtras: fixture.extras });
    const initial = await bundle.orchestrator.runReviewCycle({ authenticatedUserId: user, targetUserId: user });
    recId = initial.recommendation.id;
    server = bundle.app.listen(0, '127.0.0.1');
    await new Promise<void>((resolve) => server.once('listening', resolve));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api`;
  });
  afterEach(async () => {
    vi.restoreAllMocks();
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    store.close();
  });
  it('rejects an unknown explicit ID without modifying latest recommendation', async () => {
    const result = await feedback('accept', { recommendationId: 'does-not-exist' });
    expect(result.response.status).toBe(404);
    expect(result.data.code).toBe('RECOMMENDATION_NOT_FOUND');
    expect(store.getRecommendationById(user, user, recId)!.recommendation.status).toBe('proposed');
    expect(store.listActionFeedbackForUser(user, user)).toHaveLength(0);
  });
  it('requires acceptance or validated Adjust before completing', async () => {
    const result = await feedback('complete');
    expect(result.response.status).toBe(409);
    expect(result.data.code).toBe('INVALID_FEEDBACK_TRANSITION');
    expect(store.listActionFeedbackForUser(user, user)).toHaveLength(0);
  });
  it('rejects stale feedback and refreshes Today to one consistent version', async () => {
    const state = store.getPIState(user, user, false)!;
    store.savePIState(user, user, { snapshot: state.snapshot });
    const result = await feedback('accept');
    expect(result.response.status).toBe(409);
    expect(result.data.code).toBe('STALE_RECOMMENDATION');
    const today = await fetch(`${base}/today/${user}`, { headers: { 'x-user-id': user } });
    expect(today.status).toBe(200);
    const data = await today.json() as any;
    expect(data.trace.snapshotVersion).toBe(data.snapshotVersion);
    expect(data.trace.snapshotId).toBe(data.snapshot.id);
    expect(data.recommendation.snapshotId).toBe(data.snapshot.id);
  });
  it('rejects a superseded recommendation when the PI version is unchanged', async () => {
    await bundle.orchestrator.runReviewCycle({ authenticatedUserId: user, targetUserId: user, forceRefresh: true });
    const result = await feedback('accept');
    expect(result.response.status).toBe(409);
    expect(result.data.code).toBe('STALE_RECOMMENDATION');
  });
  it('rejects unvalidated completion amount without recording or changing PI', async () => {
    expect((await feedback('accept')).response.status).toBe(200);
    const before = store.getPIState(user, user, false)!;
    const result = await feedback('complete', { adjustedAmount: 1000000 });
    expect(result.response.status).toBe(409);
    expect(result.data.code).toBe('COMPLETION_AMOUNT_MISMATCH');
    expect(store.getPIState(user, user, false)!.version).toBe(before.version);
    expect(store.getRecommendationById(user, user, recId)!.recommendation.status).toBe('accepted');
  });
  it('applies completion once, rebuilds allocations and produces fresh Today', async () => {
    expect((await feedback('accept')).response.status).toBe(200);
    const before = store.getPIState(user, user, false)!;
    const completed = await feedback('complete');
    expect(completed.response.status).toBe(200);
    expect(completed.data.status).toBe('COMPLETED');
    const after = store.getPIState(user, user, false)!;
    expect(after.versionNumber).toBe(before.versionNumber + 1);
    const allocations = after.snapshot.goalAllocations;
    for (const summary of after.snapshot.accountSummaries) {
      expect(summary.allocatedToGoals).toBe(allocations.filter((item) => item.accountId === summary.account.id).reduce((sum, item) => sum + item.amount, 0));
    }
    expect(completed.data.nextCycleResult.trace.snapshotVersion).toBe(after.version);
    const replay = await feedback('complete');
    expect(replay.response.status).toBe(409);
    expect(replay.data.code).toBe('INVALID_FEEDBACK_TRANSITION');
    expect(store.getPIState(user, user, false)!.version).toBe(after.version);
    expect(store.getPIState(user, user, false)!.snapshot.goalAllocations).toEqual(allocations);
    expect(store.listActionFeedbackForUser(user, user).filter((item) => item.action === 'complete')).toHaveLength(1);
  });
  it('completes the stored adjusted amount rather than the original amount', async () => {
    const initial = store.getPIState(user, user, false)!.snapshot;
    expect((await feedback('adjust', { adjustedAmount: 60 })).response.status).toBe(200);
    const result = await feedback('complete');
    expect(result.response.status).toBe(200);
    const current = store.getPIState(user, user, false)!.snapshot;
    const additions = current.goalAllocations.filter((item) => !initial.goalAllocations.some((old) => old.id === item.id));
    expect(additions).toHaveLength(1);
    expect(additions[0].amount).toBe(60);
    expect(current.primaryCurrencySummary.allocatedToGoals).toBe(initial.primaryCurrencySummary.allocatedToGoals + 60);
  });
  it('rolls back completion and feedback if the PI write fails', async () => {
    expect((await feedback('accept')).response.status).toBe(200);
    const before = store.getPIState(user, user, false)!;
    vi.spyOn(store, 'savePIState').mockImplementationOnce(() => { throw new Error('Injected disk write failure'); });
    const result = await feedback('complete');
    expect(result.response.status).toBe(500);
    expect(store.getRecommendationById(user, user, recId)!.recommendation.status).toBe('accepted');
    expect(store.listActionFeedbackForUser(user, user).map((item) => item.action)).toEqual(['accept']);
    expect(store.getPIState(user, user, false)!.version).toBe(before.version);
  });
  it('reports committed completion as success when the next review fails and retries safely', async () => {
    expect((await feedback('accept')).response.status).toBe(200);
    const before = store.getPIState(user, user, false)!;
    const nextReview = vi.spyOn(bundle.orchestrator, 'runReviewCycle').mockRejectedValueOnce(new Error('secret upstream credentials'));
    const completed = await feedback('complete');
    expect(completed.response.status).toBe(200);
    expect(completed.data.status).toBe('COMPLETED');
    expect(completed.data.reviewPending).toBe(true);
    expect(completed.data.nextCycleResult).toBeUndefined();
    expect(JSON.stringify(completed.data)).not.toContain('secret upstream credentials');
    const after = store.getPIState(user, user, false)!;
    expect(after.versionNumber).toBe(before.versionNumber + 1);
    expect(completed.data.snapshot.version).toBe(after.version);
    expect((await feedback('complete')).response.status).toBe(409);
    expect(store.getPIState(user, user, false)!.version).toBe(after.version);
    nextReview.mockRestore();
    const today = await fetch(`${base}/today/${user}`, { headers: { 'x-user-id': user } });
    expect(today.status).toBe(200);
    const current = await today.json() as any;
    expect(current.trace.snapshotVersion).toBe(after.version);
  });
  it.each(['goal', 'source', 'currency'])('does not create a dangling saving allocation when %s facts are missing or inconsistent', async (missing) => {
    const saved = store.getRecommendationById(user, user, recId)!;
    expect(saved.decision.selectedActionId).toBe('A007');
    if (missing === 'goal') saved.decision.candidate!.targetId = 'missing-goal';
    if (missing === 'source') saved.decision.candidate!.sourceAccountId = 'missing-source';
    if (missing === 'currency') saved.recommendation.currency = 'USD';
    store.saveRecommendation(user, user, saved.recommendation, saved.decision);
    const acceptance = await feedback('accept');
    if (missing === 'source') {
      // The strengthened Checker now rejects this invalid source before acceptance.
      expect(acceptance.response.status).toBe(409);
      expect(acceptance.data.code).toBe('ACCEPTANCE_REVALIDATION_FAILED');
      expect(store.listActionFeedbackForUser(user, user)).toEqual([]);
      return;
    }
    expect(acceptance.response.status).toBe(200);
    const before = store.getPIState(user, user, false)!;
    const rejected = await feedback('complete');
    expect(rejected.response.status).toBe(409);
    expect(rejected.data.code).toBe('COMPLETION_NEEDS_DATA');
    expect(store.getPIState(user, user, false)!.version).toBe(before.version);
    expect(store.getPIState(user, user, false)!.snapshot.goalAllocations).toEqual(before.snapshot.goalAllocations);
    expect(store.listActionFeedbackForUser(user, user).some((item) => item.action === 'complete')).toBe(false);
  });
});
