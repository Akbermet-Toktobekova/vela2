import { afterEach,describe,expect,it,vi } from 'vitest';
import { buildFinancialSnapshot } from '../../shared/processing/snapshotBuilder';
import { LLMClient } from '../src/ai/llmClient';
import { loadPrototypePolicy } from '../src/config/policyLoader';
import { ReviewOrchestrator } from '../src/orchestrator/reviewWorkflow';
import { createDemoSeedData } from './fixtures/profile';
import { SQLiteStore } from './helpers/engineStore';
import { createBaselineSolventFixture } from './helpers/testFixtures';

afterEach(() => vi.useRealTimers());

describe('Core clock and freshness regression', () => {
  function seedAt(asOf: string) {
    const state = createDemoSeedData();
    const account = state.accounts.find((a) => a.currency === 'EUR')!;
    state.accounts = [account];
    state.balances = [{ ...state.balances.find((b) => b.accountId === account.id)!, asOf, sourceType: 'manual_update', amount: 2000 }];
    state.confirmations = [];
    state.statements = [];
    state.debts = [];
    return state;
  }

  it('uses an injected reference date for snapshot timestamp and overdue obligations', () => {
    const state = seedAt('2030-01-01T12:00:00Z');
    const snapshot = buildFinancialSnapshot(state, { referenceNowIso: '2030-01-02T12:00:00Z' });
    expect(snapshot.createdAt).toBe('2030-01-02T12:00:00.000Z');
    expect(snapshot.overdueObligations.length).toBe(state.obligations.filter((o) => o.status === 'unpaid').length);
  });
  it('does not call stale funds action-ready merely because cash is positive', () => {
    const policy = loadPrototypePolicy();
    const now = new Date('2030-02-01T12:00:00Z');
    const age = policy.horizonAndFreshness.staleBalanceThresholdDays + 1;
    const state = seedAt(new Date(now.getTime() - age * 86400000).toISOString());
    const snapshot = buildFinancialSnapshot(state, { referenceNowIso: now.toISOString() });
    expect(snapshot.accountSummaries[0].isStale).toBe(true);
    expect(snapshot.dataQuality.staleBalanceAccountIds).toContain(state.accounts[0].id);
    expect(snapshot.readinessState).toBe('state_b_clarification_needed');
  });
  it('reads the current clock by default instead of the old November demo date', () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date('2031-05-10T12:00:00Z'));
    const snapshot = buildFinancialSnapshot(seedAt('2031-05-10T11:00:00Z'));
    expect(snapshot.createdAt).toBe('2031-05-10T12:00:00.000Z');
    expect(snapshot.accountSummaries[0].isStale).toBe(false);
  });
  it('rejects invalid reference time and treats future-dated balances as unconfirmed', () => {
    expect(() => buildFinancialSnapshot(seedAt('2030-01-01'), { referenceNowIso: 'invalid' })).toThrow(/reference time/);
    const snapshot = buildFinancialSnapshot(seedAt('2030-01-03T12:00:00Z'), { referenceNowIso: '2030-01-02T12:00:00Z' });
    expect(snapshot.accountSummaries[0].isStale).toBe(true);
    expect(snapshot.readinessState).toBe('state_b_clarification_needed');
  });
  it('uses the centralized closing-statement freshness limit', () => {
    const policy = loadPrototypePolicy();
    const now = new Date('2030-02-01T12:00:00Z');
    const state = seedAt(new Date(now.getTime() - (policy.horizonAndFreshness.statementClosingStaleThresholdDays + 1) * 86400000).toISOString());
    state.balances[0].sourceType = 'statement_closing';
    expect(buildFinancialSnapshot(state, { referenceNowIso: now.toISOString() }).accountSummaries[0].isStale).toBe(true);
  });
  it('does not suppress a same-PI review on a different evaluation day', async () => {
    const store = new SQLiteStore(':memory:');
    const orchestrator = new ReviewOrchestrator({ store, llmClient: new LLMClient({ mockMode: true }) });
    const { snapshot, extras } = createBaselineSolventFixture();
    store.savePIState(snapshot.userId, snapshot.userId, { snapshot, calculatorExtras: extras });
    try {
      const first = await orchestrator.runReviewCycle({ authenticatedUserId: snapshot.userId, targetUserId: snapshot.userId, forceRefresh: true });
      const nextDay = new Date(Date.now() + 86400000).toISOString();
      const next = await orchestrator.runReviewCycle({ authenticatedUserId: snapshot.userId, targetUserId: snapshot.userId, referenceNowIso: nextDay });
      expect(first.status).toBe('COMPLETED');
      expect(next.status).toBe('COMPLETED');
      expect(next.duplicateSuppressed).toBe(false);
    } finally { store.close(); }
  });
});
