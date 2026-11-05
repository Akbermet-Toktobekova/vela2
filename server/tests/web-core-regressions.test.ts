import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FinAgentApiClient, attachDecisionMeta, mergeFeedbackResult } from '../../react-app/src/api/client';
import { createDemoSeedData } from '../../react-app/src/database/seed';
import { buildFinancialSnapshot } from '../../react-app/src/services/snapshotBuilder';
import { RecommendationService } from '../../react-app/src/services/recommendationService';

const { viewState } = vi.hoisted(() => ({ viewState: { current: {} as Record<string, unknown> } }));
vi.mock('../../react-app/src/context/PIContext', () => ({ usePI: () => viewState.current }));
const webRequire = createRequire(new URL('../../react-app/package.json', import.meta.url));
const React = webRequire('react');
const { renderToStaticMarkup } = webRequire('react-dom/server');
const { MemoryRouter } = webRequire('react-router-dom');
// Resolve the separately typechecked web component at runtime: server tsconfig has no JSX.
const todayModulePath = '../../react-app/src/components/dashboard/TodayView';
const { TodayView } = await import(todayModulePath);

afterEach(() => vi.unstubAllGlobals());
function serverRecommendation(id: string, currency = 'EUR') {
  const base = createDemoSeedData().recommendations[0];
  return attachDecisionMeta({ ...base, currency, status: 'accepted' }, {
    selectedActionId: id, selectedActionType: 'FINANCIAL_ACTION', priorityClass: 'NORMAL',
    weightProfileId: null, weights: null, values: null, complexity: null, score: null, stability: null,
    policyVersion: 'test-policy', dataQualityStatus: 'PROTOTYPE_POLICY', sourceIds: [], ruleIds: [], claimIds: [],
  });
}
function renderToday(id: string, currency = 'USD', pending: string | null = null) {
  const snapshot = buildFinancialSnapshot(createDemoSeedData());
  snapshot.observedSpendingTotal = 123.45;
  snapshot.baseCurrency = currency;
  snapshot.primaryCurrencySummary.currency = currency;
  viewState.current = { snapshot, currentRecommendation: serverRecommendation(id, currency),
    recommendationSource: 'backend', backendStatus: 'online', feedbackPending: pending };
  return renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(TodayView)));
}

describe('Core web authoritative Today and action controls', () => {
  it('withholds cached server actions until the current PI has a successful fresh review', () => {
    const records = [serverRecommendation('A002')];
    expect(RecommendationService.currentServerRecommendation(records, false)).toBeNull();
    expect(RecommendationService.currentServerRecommendation(records, true)).toBe(records[0]);
    const snapshot = buildFinancialSnapshot(createDemoSeedData());
    const fallback = RecommendationService.evaluateCurrentRecommendation(snapshot, records)!;
    expect(fallback.id).not.toBe(records[0].id);
    expect(fallback.finAgentMeta).toBeUndefined();
  });

  it('syncs authoritative server values rather than recomputing the server result in the browser', async () => {
    const state = createDemoSeedData();
    const snapshot = buildFinancialSnapshot(state);
    snapshot.observedSpendingTotal = 123.45;
    snapshot.debts[0].remainingBalance = 12;
    const result = { status: 'ok', snapshot, recommendation: serverRecommendation('A002') };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(result))));
    const synced = await FinAgentApiClient.syncPIAndReviewState(state.user.id, snapshot);
    expect(synced!.snapshot!.observedSpendingTotal).toBe(123.45);
    const merged = mergeFeedbackResult(state, synced!);
    expect(merged.debts[0].remainingBalance).toBe(12);
    expect(merged.recommendations[0].finAgentMeta?.score).toBeNull();
    expect(merged.recommendations[0].finAgentMeta?.stability).toBeNull();
  });

  it('rejects unverifiable completion even when HTTP succeeds and preserves the supplied reason', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: 'VERIFICATION_REQUIRED', accepted: false, recommendation: serverRecommendation('A015'),
      rejectionReason: 'Cancellation must be verified before completion.',
    }))));
    await expect(FinAgentApiClient.submitFeedback({ userId: 'u', recommendationId: 'r', action: 'complete' }))
      .rejects.toThrow('Cancellation must be verified');
  });

  it.each([
    ['A001', 'Confirm payment made', false], ['A002', 'Confirm payment made', true],
    ['A007', 'Complete earmark', true], ['A008', 'Complete earmark', true], ['A012', 'Complete earmark', true],
    ['A011', 'Confirm transfer paused', false], ['A015', 'Verify cancellation', false],
  ])('renders action-specific completion for %s without a fictional cushion impact', (id, label, adjustable) => {
    const markup = renderToday(id as string);
    expect(markup).toContain(label);
    expect(markup.includes('>Adjust</button>')).toBe(adjustable);
    expect(markup).not.toContain('Safety Cushion impact');
    expect(markup).not.toContain('Stability F018'); // Null remains unevaluated.
  });


  it('does not reuse selected-action metadata when the server withholds a recommendation', () => {
    const original = serverRecommendation('A002');
    const cleared = attachDecisionMeta(original, {
      selectedActionId: null, selectedActionType: null, priorityClass: 'NONE', weightProfileId: null,
      weights: null, values: null, complexity: null, score: null, stability: null,
      policyVersion: 'test-policy', dataQualityStatus: 'NEEDS_DATA', sourceIds: [], ruleIds: [], claimIds: [],
    });
    expect(cleared.finAgentMeta).toBeUndefined();
  });

  it('requires the updated server snapshot to acknowledge Complete successfully', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: 'COMPLETED', recommendation: serverRecommendation('A002'),
    }))));
    await expect(FinAgentApiClient.submitFeedback({ userId: 'u', recommendationId: 'r', action: 'complete' }))
      .rejects.toThrow('missing the updated financial snapshot');
  });

  it('explains that stale Today is withheld without pretending the user dismissed the action', () => {
    renderToday('A002');
    viewState.current.currentRecommendation = null;
    const markup = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(TodayView)));
    expect(markup).toContain('needs a fresh server review');
    expect(markup).not.toContain('You dismissed');
  });

  it('renders currency-aware observed amounts and disables controls while feedback is saving', () => {
    const markup = renderToday('A002', 'USD', 'complete');
    expect(markup).toContain('$');
    expect(markup).toContain('$123.45');
    expect(markup).toContain('<fieldset disabled=""');
    expect(markup).toContain('Saving complete');
  });
});
