import { afterEach, describe, expect, it, vi } from 'vitest';
import { LLMClient } from '../src/ai/llmClient';
import { BetaAnalysis } from '../src/beta/analysis';
import { BetaFinancial } from '../src/beta/financial';
import { BetaEngineRepository } from '../src/beta/engineRepository';
import { FrankfurterFXService } from '../src/fx/frankfurterService';
import { BetaStore } from '../src/beta/store';
import { primaryOutputSchema, primaryResponseJsonSchema } from '../src/suggestion/primaryProposalContract';

const user = { id: 'as-first-test', name: 'Fixture', email: 'fixture@example.test' };
const reference = '2026-11-05T12:00:00Z';
const proposal = {
  title: 'Review whether card interest is accruing',
  description: 'Check the latest statement for interest charges before comparing repayment options.',
  rationale: 'You have a credit card and a learning step can help you prepare questions.',
  intent: 'REVIEW',
  targetFactId: 'debt-1',
  factIds: ['debt-1'],
  claimIds: ['C022'],
  prerequisites: [],
  missingInfo: [],
  nextStep: 'Interest accrual status for debt-1',
};
const clarification = {
  ...proposal, title: 'Confirm interest accrual',
  description: 'Does the latest statement confirm that interest is currently accruing?',
  intent: 'CLARIFY', claimIds: [], missingInfo: ['Interest accrual status for debt-1'],
};
const supported = {
  id: 'primary-1', status: 'CONSISTENT', reason: 'The evidence supports the learning step.',
  safeWithoutFinancialExecution: true, contradictionRefs: [], supportingClaimIds: ['C022'],
};

const stores: BetaStore[] = [];
afterEach(() => {
  for (const store of stores.splice(0)) store.close();
});

function setup(options: {
  proposals?: unknown[];
  verdicts?: unknown[];
  unavailable?: 'generation' | 'checker';
  critical?: boolean;
  country?: string;
  raw?: boolean;
  goalContribution?: boolean;
  staleBalances?: boolean;
  fxUnavailable?: boolean;
} = {}) {
  const store = new BetaStore({ filename: ':memory:' });
  stores.push(store);
  const financial = new BetaFinancial(store);
  const initial = financial.get(user);
  const state = initial.state;
  if (options.country) state.profile.country = options.country;
  state.accounts.push({
    id: 'main', userId: user.id, name: 'Checking', institution: 'Fixture bank', currency: 'EUR',
    purposes: ['daily_spending'], fundsOwnership: 'personal', personalAvailableAmount: null,
    isPrimary: true, notes: '', createdAt: reference, updatedAt: reference,
  });
  state.balances.push({
    id: 'balance', accountId: 'main', amount: options.critical ? 20 : 3000, currency: 'EUR',
    sourceType: 'user_reported', asOf: options.staleBalances ? '2026-10-01' : reference, createdAt: reference,
  });
  state.expenseCommitment = {
    id: 'essentials', userId: user.id, estimatedMonthlyAmount: 1000,
    currency: 'EUR', notes: '', updatedAt: reference,
  };
  state.debts.push({
    id: 'card', userId: user.id, name: 'Card', debtType: 'credit_card', currency: 'EUR',
    remainingBalance: 800, apr: 18, minimumPayment: 40, nextDueDate: '2026-11-27',
    paymentFrequency: 'monthly', createdAt: reference,
  });
  if (options.critical) state.obligations.push({
    id: 'rent', userId: user.id, name: 'Rent', amount: 800, currency: 'EUR',
    dueDate: '2026-11-06', recurrence: 'one_time', category: 'rent',
    status: 'unpaid', accountId: 'main', notes: '', createdAt: reference,
  });
  if (options.goalContribution) {
    state.balances[0].amount = 6000;
    state.obligations.push({
      id: 'dated-essentials', userId: user.id, name: 'Essentials', amount: 1000, currency: 'EUR',
      dueDate: '2026-11-20', recurrence: 'monthly', category: 'other', status: 'unpaid', accountId: 'main', notes: '', createdAt: reference,
    });
    state.accounts.push({ ...state.accounts[0], id: 'foreign', name: 'Foreign', currency: 'HUF', isPrimary: false });
    state.balances.push({ ...state.balances[0], id: 'foreign-balance', accountId: 'foreign', currency: 'HUF', amount: 35000 });
    state.goals.push({ id: 'education', userId: user.id, name: 'Education', goalType: 'general_savings',
      targetAmount: 1200, currency: 'EUR', priority: 'high', targetDate: '2027-06-30', createdAt: reference });
  }
  financial.save(user, { expectedVersion: 0, aiConsent: true, experimentalRecommendations: true, state });
  if (options.goalContribution) {
    new BetaEngineRepository(store, user, financial, { referenceNowIso: reference }).savePIState(user.id, user.id, {
      calculatorExtras: { confirmedGoalContributions: { education: { sourceAccountId: 'main', currency: 'EUR', amount: 500 } } },
    });
  }
  const saved = financial.get(user);
  const llm = new LLMClient({ mockMode: true });
  const generate = vi.spyOn(llm, 'generateStructured').mockImplementation(async params => {
    const generation = params.systemPrompt.startsWith('Return exactly three distinct entries');
    const verification = params.systemPrompt.startsWith('Independently verify');
    if ((generation && options.unavailable === 'generation') || (verification && options.unavailable === 'checker')) {
      throw new Error('Provider unavailable');
    }
    const drafts = [...(options.proposals ?? [proposal])];
    if (!options.raw) {
      for (const fill of [clarification, { ...proposal, title: 'Unverified review', claimIds: [] }, { ...proposal, title: 'Another unverified review', claimIds: [] }]) {
        if (drafts.length < 3) drafts.push(fill);
      }
    }
    const data = generation ? { proposals: drafts, shortfallReason: '' }
      : verification ? { verdicts: options.verdicts ?? [supported] } : params.fallback();
    return { data: params.schema ? params.schema.parse(data) : data,
      provider: 'gemini', modelUsed: 'controlled-test', liveCallUsed: true };
  });
  const fxService = new FrankfurterFXService({
    fetchFn: async () => options.fxUnavailable ? new Response('{}', { status: 503 })
      : new Response(JSON.stringify({ base: 'EUR', date: '2026-11-05', rates: { HUF: 350 } }), { status: 200 }),
  });
  const analysis = new BetaAnalysis(store, financial, llm, { now: () => new Date(reference), fxService });
  const fallbackCalls = () => generate.mock.calls.filter(([params]) => params.systemPrompt.startsWith('Choose up to three distinct supplied catalog candidates'));
  return { analysis, financial, saved, generate, fallbackCalls, review: () => analysis.review(user, saved.version) };
}

describe('AS-first suggestion cycle', () => {
  it('publishes one validated source-backed advice and skips the fallback, then records feedback without money movement', async () => {
    const { review, fallbackCalls, analysis, financial, saved, generate } = setup({
      proposals: [proposal, { ...proposal, title: 'Other', claimIds: ['C999'] }],
    });
    const result = await review();
    expect(result.recommendation.actionType).toBe('source_backed_advice');
    expect(result.recommendation.sourceAdvice.sources[0]).toMatchObject({ claimId: 'C022', sourceId: 'S012' });
    expect(result.decision).toMatchObject({ selectedActionId: null, rawImpacts: null, score: null });
    expect(result.trace.primarySuggestions.proposals.map((row: { status: string }) => row.status)).toEqual(['VALID', 'REJECTED', 'NEEDS_DATA']);
    expect(result.trace.primarySuggestions.fallbackReason).toBeNull();
    expect(fallbackCalls()).toHaveLength(0);
    const request = generate.mock.calls.find(([params]) => params.systemPrompt.startsWith('Return exactly three distinct entries'))![0].userPrompt;
    expect(request).toContain('debt-1');
    expect(request).toContain('C022');
    expect(request).not.toContain('availableCandidates');
    expect(request).not.toContain('actionReference');
    expect(request).not.toMatch(/\bA0\d\d\b/);
    const semanticRequest = generate.mock.calls.find(([params]) => params.systemPrompt.startsWith('Independently verify'))![0];
    expect(semanticRequest.responseJsonSchema).toMatchObject({ properties: { verdicts: {
      minItems: 1, maxItems: 1, items: { properties: { id: { enum: ['primary-1'] } } },
    } } });
    await analysis.feedback(user, { recommendationId: result.recommendation.id, action: 'accept', expectedVersion: saved.version });
    const completed = await analysis.feedback(user, { recommendationId: result.recommendation.id, action: 'complete', expectedVersion: saved.version });
    expect(completed.recommendation.status).toBe('completed');
    expect(financial.get(user).version).toBe(saved.version);
    expect(financial.get(user).state.balances[0].amount).toBe(3000);
  });

  it('runs catalog once when all three drafts are rejected and records the contradiction', async () => {
    const { review, fallbackCalls } = setup({
      proposals: [
        { ...proposal, title: 'Invented', claimIds: ['C999'] },
        { ...proposal, title: 'Foreign', claimIds: ['C014'] },
        { ...proposal, title: 'Review the closed card', description: 'Review why the card has already been paid off.', claimIds: [] },
      ],
      verdicts: [{ ...supported, id: 'primary-3', status: 'CONTRADICTS', contradictionRefs: ['debt-1'],
        supportingClaimIds: [], reason: 'The debt record shows an outstanding balance.' }],
    });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals.map((row: { status: string }) => row.status))
      .toEqual(['REJECTED', 'REJECTED', 'REJECTED']);
    expect(result.trace.primarySuggestions.proposals[2]).toMatchObject({ contradictionRefs: ['debt-1'] });
    expect(result.trace.primarySuggestions.fallbackReason).toBe('ALL_PRIMARY_REJECTED');
    expect(fallbackCalls()).toHaveLength(1);
  });

  it('publishes a safe PI review when AS is silent and sends no catalog options to the checker', async () => {
    const { review, fallbackCalls, generate } = setup({
      proposals: [{ ...proposal, title: 'Review whether card interest is accruing', description: 'The recorded APR is {{debt-1.apr}}%. Check the latest statement for actual interest before comparing repayment options.', claimIds: [] }],
      verdicts: [{ ...supported, reason: 'The review matches the recorded card.', supportingClaimIds: [] }],
    });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals[0]).toMatchObject({ status: 'VALID', evidence: [] });
    expect(result.recommendation.sourceAdvice.sources).toEqual([]);
    expect(result.recommendation.description).toContain('18%');
    expect(result.decision.rawImpacts).toBeNull();
    expect(fallbackCalls()).toHaveLength(0);
    const request = generate.mock.calls.find(([params]) => params.systemPrompt.startsWith('Independently verify'))![0].userPrompt;
    expect(request).toContain('excerpts');
    expect(request).not.toContain('executionOptions');
    expect(request).not.toMatch(/\bA0\d\d\b/);
  });

  it('returns NEEDS_DATA for advice requiring an unverified financial instruction', async () => {
    const { review, fallbackCalls } = setup({
      proposals: [{ ...proposal, title: 'Send €500 to the card' }],
    });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals[0].status).toBe('NEEDS_DATA');
    expect(fallbackCalls()).toHaveLength(1);
  });

  it.each(['generation', 'checker'] as const)('runs the checked catalog on %s outage without approving primary drafts', async unavailable => {
    const { review, fallbackCalls } = setup({ unavailable });
    const result = await review();
    expect(result.trace.primarySuggestions.fallbackReason).toBe('NO_USEFUL_PRIMARY');
    expect(result.trace.primarySuggestions.proposals.every((row: { status: string }) => row.status === 'NEEDS_DATA')).toBe(true);
    expect(fallbackCalls()).toHaveLength(1);
  });

  it.each([0, 1, 2, 3])('accepts %i consistent drafts in a complete three-slot response', async count => {
    const proposals = Array.from({ length: count }, (_, index) => ({ ...proposal, title: 'Review repayment lesson ' + ['first', 'second', 'third'][index] }));
    const verdicts = proposals.map((_, index) => ({ ...supported, id: 'primary-' + (index + 1) }));
    const { review, fallbackCalls } = setup({ proposals, verdicts });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals.filter((row: { status: string }) => row.status === 'VALID')).toHaveLength(count);
    expect(result.trace.primarySuggestions.proposals).toHaveLength(3);
    expect(fallbackCalls()).toHaveLength(count ? 0 : 1);
  });

  it('requires exact arrays and three slots in the provider and runtime schemas', () => {
    expect(primaryResponseJsonSchema.properties.proposals).toMatchObject({ minItems: 3, maxItems: 3 });
    expect(primaryOutputSchema.safeParse({ proposals: [proposal, clarification, proposal], shortfallReason: '' }).success).toBe(true);
    for (const invalid of [{ ...clarification, missingInfo: 'interest' }, { ...proposal, prerequisites: null }, { ...proposal, actionId: 'A004' }]) {
      expect(primaryOutputSchema.safeParse({ proposals: [proposal, invalid, proposal], shortfallReason: '' }).success).toBe(false);
    }
    expect(primaryOutputSchema.safeParse({ proposals: [proposal], shortfallReason: '' }).success).toBe(false);
  });

  it('traces an invalid model response without presenting invented clarification slots as drafts', async () => {
    const { review, fallbackCalls } = setup({ proposals: [proposal, { ...clarification, missingInfo: 'interest' }, proposal], raw: true });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals.map((row: { origin: string }) => row.origin))
      .toEqual(['SYSTEM_CLARIFICATION', 'SYSTEM_UNAVAILABLE', 'SYSTEM_UNAVAILABLE']);
    expect(result.trace.primarySuggestions.fallbackReason).toBe('NO_USEFUL_PRIMARY');
    expect(fallbackCalls()).toHaveLength(1);
  });

  it('checks clarification PI, target membership and empty AS claims before returning NEEDS_DATA', async () => {
    const { review, fallbackCalls } = setup({ proposals: [
      clarification,
      { ...clarification, title: 'Invalid PI', targetFactId: 'account-1' },
      { ...clarification, title: 'Unexpected citation', claimIds: ['C022'] },
    ] });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals.map((row: { status: string }) => row.status))
      .toEqual(['NEEDS_DATA', 'REJECTED', 'REJECTED']);
    expect(fallbackCalls()).toHaveLength(1);
  });

  it('rejects invented clarification gaps, invalid fact references and an executable step without a verified contract', async () => {
    const { review } = setup({ proposals: [
      { ...clarification, missingInfo: ['Unrecorded fictional feature'] },
      { ...proposal, title: 'Pay off the card', intent: 'EXECUTE' },
      { ...proposal, title: 'Unknown PI', factIds: ['debt-1', 'account-404'] },
    ], verdicts: [{ ...supported, id: 'primary-2' }] });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals.map((row: { status: string }) => row.status))
      .toEqual(['REJECTED', 'NEEDS_DATA', 'REJECTED']);
  });

  it('rejects duplicate clarification gaps even when the titles differ', async () => {
    const { review } = setup({ proposals: [clarification, { ...clarification, title: 'Confirm the interest terms' }, proposal] });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals[1]).toMatchObject({ status: 'REJECTED', reason: 'Duplicate clarification gap.' });
  });

  it('keeps review safety checks when the verifier labels an instruction consistent', async () => {
    const { review } = setup({
      country: 'US',
      proposals: [{ ...proposal, title: 'Pay €500 and check your statement', claimIds: ['C015'] }],
      verdicts: [{ ...supported, supportingClaimIds: [] }],
    });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals[0]).toMatchObject({ actionId: null, status: 'NEEDS_DATA' });
  });

  it('treats a contradiction with an unknown reference as an incomplete check', async () => {
    const { review, fallbackCalls } = setup({
      verdicts: [{ ...supported, status: 'CONTRADICTS', contradictionRefs: ['C999'], supportingClaimIds: [] }],
    });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals[0]).toMatchObject({ status: 'NEEDS_DATA' });
    expect(fallbackCalls()).toHaveLength(1);
  });

  it('rejects a different year in a date before a consistent model verdict could approve it', async () => {
    const { review, fallbackCalls } = setup({
      proposals: [{ ...proposal, title: 'Review the card due date',
        description: 'Review the minimum payment due on 2025-11-27.', claimIds: [] }],
    });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals[0]).toMatchObject({
      status: 'REJECTED', reason: 'Date 2025-11-27 does not appear in the cited PI facts.',
    });
    expect(fallbackCalls()).toHaveLength(1);
  });

  it('runs catalog when all three valid reviews simply repeat known records', async () => {
    const proposals = [1, 2, 3].map(index => ({ ...proposal, title: 'Review recorded terms ' + ['first', 'second', 'third'][index - 1], nextStep: undefined }));
    const verdicts = proposals.map((_, index) => ({ ...supported, id: 'primary-' + (index + 1) }));
    const { review, fallbackCalls } = setup({ proposals, verdicts });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals.map((row: { usefulness: string }) => row.usefulness)).toEqual(['WEAK', 'WEAK', 'WEAK']);
    expect(result.trace.primarySuggestions.fallbackReason).toBe('NO_USEFUL_PRIMARY');
    expect(fallbackCalls()).toHaveLength(1);
  });

  it('surfaces a dated balance clarification when no useful action passes', async () => {
    const { review } = setup({ staleBalances: true, unavailable: 'generation' });
    const result = await review();
    expect(result.decision).toMatchObject({ decisionStatus: 'NEEDS_DATA', clarificationRoute: 'accounts' });
    expect(result.recommendation.clarification.question).toContain('current available balance');
  });

  it.each([false, true])('checks a confirmed primary education contribution with FX unavailable = %s', async fxUnavailable => {
    const { review, fallbackCalls, analysis, saved } = setup({ goalContribution: true, fxUnavailable,
      proposals: [{ ...proposal, title: 'Allocate the confirmed education contribution',
        description: 'Set aside the confirmed contribution toward the education goal.',
        rationale: 'The goal records a confirmed contribution and funding account.',
        intent: 'EXECUTE', operation: 'ALLOCATE_TO_GOAL', targetFactId: 'goal-1', factIds: ['goal-1', 'account-1'],
        claimIds: [], nextStep: undefined }],
      verdicts: [{ ...supported, supportingClaimIds: [], safeWithoutFinancialExecution: false }],
    });
    const result = await review();
    const first = result.trace.primarySuggestions.proposals[0];
    if (fxUnavailable) {
      expect(first.status).toBe('NEEDS_DATA');
      expect(result.decision.selectedActionId).not.toBe('A012');
      return;
    }
    expect(first, JSON.stringify(first)).toMatchObject({ status: 'VALID', usefulness: 'USEFUL', actionId: 'A012' });
    expect(result.decision.candidate).toMatchObject({ actionId: 'A012', amount: 500, sourceAccountId: 'main' });
    expect(fallbackCalls()).toHaveLength(0);
    const accepted = await analysis.feedback(user, { recommendationId: result.recommendation.id, action: 'accept', expectedVersion: saved.version });
    expect(accepted.accepted).toBe(true);
    const adjusted = await analysis.feedback(user, { recommendationId: result.recommendation.id, action: 'adjust', adjustedAmount: 400, expectedVersion: saved.version });
    expect(adjusted.accepted).toBe(true);
    expect(adjusted.recommendation.adjustedAmount).toBe(400);
  });

  it('keeps critical coverage ahead of validated advice without calling catalog fallback', async () => {
    const { review, fallbackCalls } = setup({ critical: true });
    const result = await review();
    expect(result.trace.primarySuggestions.proposals[0].status).toBe('VALID');
    expect(result.decision.priorityClass).toBe('CRITICAL');
    expect(result.decision.selectedActionId).toBe('A020');
    expect(result.trace.primarySuggestions.criticalCoverageAddedIds).toContain('A020');
    expect(fallbackCalls()).toHaveLength(0);
  });
});
