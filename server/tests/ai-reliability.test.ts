import { afterEach, describe, expect, it, vi } from 'vitest';
import { AIEvaluationService, normalizeComplexityFactor } from '../src/ai/evaluationCall';
import { LLMClient } from '../src/ai/llmClient';
import { ComplexityEvaluator } from '../src/decision/complexityEvaluator';
import { SuggestionGenerator } from '../src/suggestion/suggestionGenerator';
import { loadPrototypePolicy } from '../src/config/policyLoader';
import { createBaselineSolventFixture, createCandidateActionFixture } from './helpers/testFixtures';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

const evaluated = (score = 0.2) => ({
  status: 'EVALUATED', score, rationale: 'Evidence-based execution time assessment.',
  supportingFacts: ['action_id:A007'], missingInfo: [],
});

function fakeOpenAI(body: unknown) {
  const transport = vi.fn().mockResolvedValue(new Response(JSON.stringify({
    choices: [{ message: { content: typeof body === 'string' ? body : JSON.stringify(body) } }],
  }), { status: 200 }));
  vi.stubGlobal('fetch', transport);
  return { transport, client: new LLMClient({ provider: 'openai', openaiApiKey: 'test-key', mockMode: false }) };
}

describe('Core AI complexity evidence (real parser/evaluator, explicitly fake HTTP)', () => {
  it.each([
    undefined, null, 0.4, -2, '0.4', {},
    evaluated(-0.1), evaluated(1.1), evaluated(NaN), evaluated(Infinity),
    { ...evaluated(), rationale: '' }, { ...evaluated(), rationale: '   ' },
    { ...evaluated(), rationale: undefined }, { ...evaluated(), score: null },
    { ...evaluated(), supportingFacts: undefined }, { ...evaluated(), status: 'guessed' },
  ])('keeps invalid factor %j UNKNOWN rather than manufacturing an evaluated score', (value) => {
    const normalized = normalizeComplexityFactor(value);
    expect(normalized.status).toBe('UNKNOWN');
    expect(normalized.score).toBeNull();
    expect(normalized.rationale).toContain('AI factor unavailable');
    expect(normalized.supportingFacts).toEqual([]);
    expect(normalized.missingInfo.length).toBeGreaterThan(0);
  });

  it('preserves valid scores and the actual provided rationale, and retains UNKNOWN without numeric score', () => {
    expect(normalizeComplexityFactor(evaluated(0))).toEqual(evaluated(0));
    expect(normalizeComplexityFactor(evaluated(1))).toEqual(evaluated(1));
    expect(normalizeComplexityFactor({ ...evaluated(), status: 'UNKNOWN' }).score).toBeNull();
  });

  it('makes one batch request for all candidate IDs and preserves missing/invalid-factor uncertainty through F016', async () => {
    const fixture = createBaselineSolventFixture();
    const policy = loadPrototypePolicy();
    const first = createCandidateActionFixture({ actionId: 'A007', candidateId: 'first' });
    const second = createCandidateActionFixture({ actionId: 'A002', candidateId: 'second' });
    const { transport, client } = fakeOpenAI({ evaluations: {
      first: { T: evaluated(2), S: evaluated(), D: { ...evaluated(), rationale: '' } },
      // second omitted: it must receive all UNKNOWN, never a fabricated model assessment.
    } });
    const output = await AIEvaluationService.evaluateCandidateComplexities({
      snapshot: fixture.snapshot, validCandidates: [first, second], policy, llmClient: client,
    });
    expect(transport).toHaveBeenCalledTimes(1);
    const requestBody = JSON.parse(transport.mock.calls[0][1].body);
    expect(requestBody.messages[0].content).toContain('Never compute or score financial benefits R, F, or G');
    const requestedCandidates = JSON.parse(requestBody.messages[1].content).candidates;
    expect(requestedCandidates.map((candidate: { candidateId: string }) => candidate.candidateId)).toEqual(['first', 'second']);
    expect(output.first.T?.status).toBe('UNKNOWN');
    expect(output.first.S?.status).toBe('EVALUATED');
    expect(output.first.D?.status).toBe('UNKNOWN');
    expect(output.first.O?.status).toBe('UNKNOWN');
    expect(Object.values(output.second).every((factor) => factor?.status === 'UNKNOWN')).toBe(true);
    const complexity = ComplexityEvaluator.computeComplexityFromFactors({ candidate: first, aiFactors: output.first, policy });
    expect(complexity.usedCatalogFallback).toBe(true);
    expect(complexity.hasUnknownComponents).toBe(true);
    expect(AIEvaluationService.lastCallTelemetry?.candidateCount).toBe(2);
    // The fake transport is deliberately NOT evidence of actual OpenAI integration.
  });

  it.each(['mock', 'network', 'schema'] as const)('labels %s fallback UNKNOWN/catalog with uncertainty', async (mode) => {
    const fixture = createBaselineSolventFixture();
    const policy = loadPrototypePolicy();
    const candidate = createCandidateActionFixture({ actionId: 'A007' });
    let client = new LLMClient({ mockMode: true });
    if (mode === 'network') {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Forced unavailable transport')));
      client = new LLMClient({ provider: 'openai', openaiApiKey: 'test-key', mockMode: false });
    } else if (mode === 'schema') {
      client = fakeOpenAI({ notEvaluations: [] }).client;
    }
    const output = await AIEvaluationService.evaluateCandidateComplexities({ snapshot: fixture.snapshot, validCandidates: [candidate], policy, llmClient: client });
    for (const factor of Object.values(output[candidate.candidateId])) {
      expect(factor?.status).toBe('UNKNOWN');
      expect(factor?.score).toBeNull();
    }
    const complexity = ComplexityEvaluator.computeComplexityFromFactors({ candidate, aiFactors: output[candidate.candidateId], policy });
    expect(complexity.hasUnknownComponents).toBe(true);
    expect(complexity.usedCatalogFallback).toBe(true);
    expect(AIEvaluationService.lastCallTelemetry?.liveCallUsed).toBe(false);
    expect(AIEvaluationService.lastCallTelemetry?.provider).toBe('deterministic_fallback');
  });

  it('does not make an evaluation call when Checker supplies no valid candidates', async () => {
    const client = new LLMClient({ mockMode: true });
    const call = vi.spyOn(client, 'generateStructured');
    const output = await AIEvaluationService.evaluateCandidateComplexities({
      snapshot: createBaselineSolventFixture().snapshot, validCandidates: [], policy: loadPrototypePolicy(), llmClient: client,
    });
    expect(output).toEqual({});
    expect(call).not.toHaveBeenCalled();
    expect(AIEvaluationService.lastCallTelemetry).toBeNull();
  });
});

describe('Core suggestion amount/evidence boundaries', () => {
  it('does not invent reserve amount when essential monthly expense is unknown', async () => {
    const fixture = createBaselineSolventFixture();
    fixture.snapshot.essentialCommitment = null;
    fixture.snapshot.debts = [];
    fixture.snapshot.transactions = [];
    fixture.snapshot.goals = fixture.snapshot.safetyCushionGoal ? [fixture.snapshot.safetyCushionGoal] : [];
    const output = await SuggestionGenerator.generateCandidates({ ...fixture, policy: loadPrototypePolicy(), llmClient: new LLMClient({ mockMode: true }) });
    expect(output.some((candidate) => candidate.actionId === 'A007')).toBe(false);
  });

  it('consumes central amount policy and never exceeds a small remaining goal/debt balance', async () => {
    const fixture = createBaselineSolventFixture();
    fixture.snapshot.goals = [];
    fixture.snapshot.safetyCushionGoal = null;
    fixture.snapshot.transactions = [];
    fixture.snapshot.debts = fixture.snapshot.debts.map((debt) => ({ ...debt, remainingBalance: 3 }));
    const policy = loadPrototypePolicy();
    policy.suggestionPolicy.optionalOutflowFraction = 0.1;
    const output = await SuggestionGenerator.generateCandidates({ ...fixture, calculatorExtras: fixture.extras, policy, llmClient: new LLMClient({ mockMode: true }) });
    const debt = output.find((candidate) => candidate.actionId === 'A002');
    expect(debt?.amount).toBe(3);
    expect(debt?.rationale).toContain('no interest-accrual assumption');
    expect(debt?.rationale).not.toContain('avoiding EUR');
  });

  it('does not reuse base-currency capacity as a foreign-currency debt/goal amount', async () => {
    const fixture = createBaselineSolventFixture();
    fixture.snapshot.goals = fixture.snapshot.goals.map((goal) => ({ ...goal, currency: 'HUF' }));
    fixture.snapshot.safetyCushionGoal = null;
    fixture.snapshot.debts = fixture.snapshot.debts.map((debt) => ({ ...debt, currency: 'HUF' }));
    fixture.snapshot.transactions = [];
    const output = await SuggestionGenerator.generateCandidates({ ...fixture, calculatorExtras: fixture.extras, policy: loadPrototypePolicy(), llmClient: new LLMClient({ mockMode: true }) });
    expect(output.filter((candidate) => ['A002', 'A012'].includes(candidate.actionId))).toEqual([]);
  });

  it('retains deterministic explanation rather than accepting model-invented financial claims', async () => {
    const fixture = createBaselineSolventFixture();
    const { client } = fakeOpenAI({ selectedActionIds: ['A007'], customRationales: { A007: 'Guaranteed EUR 99999 saving and 100% return.' } });
    const output = await SuggestionGenerator.generateCandidates({ ...fixture, calculatorExtras: fixture.extras, policy: loadPrototypePolicy(), llmClient: client });
    expect(output.length).toBeGreaterThan(0);
    expect(output.some((candidate) => candidate.rationale.includes('99999'))).toBe(false);
    expect(output.find((candidate) => candidate.actionId === 'A007')?.rationale).toContain('does not itself increase liquidity');
  });
});
