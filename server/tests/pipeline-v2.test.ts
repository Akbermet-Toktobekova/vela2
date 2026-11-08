import { afterEach, describe, expect, it, vi } from 'vitest';
import { SharedFinancialCalculator } from '@shared/calculator';
import type { TransactionRecord } from '@shared/pi/types';
import { computeObservedAnalytics } from '../../shared/processing/snapshotBuilder';
import { LLMClient } from '../src/ai/llmClient';
import { prompts } from '../src/ai/prompts';
import { TransactionClassifier } from '../src/analyzer/transactionClassifier';
import { observePatterns } from '../src/analyzer/patternObservations';
import { analyzePatterns } from '../src/analyzer/patternAgent';
import { calculateDebtReport } from '../src/analyzer/debtAgent';
import { calculateFinancialMetrics } from '../src/analyzer/financialMetrics';
import { FrankfurterFXService } from '../src/fx/frankfurterService';
import { BetaStore } from '../src/beta/store';
import { BetaFinancial } from '../src/beta/financial';
import { BetaAnalysis } from '../src/beta/analysis';
import { BetaEngineRepository } from '../src/beta/engineRepository';
import { BetaImports } from '../src/beta/imports';
import { createBaselineSolventFixture as fixture } from './helpers/testFixtures';

const date = '2026-11-05T12:00:00.000Z';
const user = { id: 'pipeline-v2', name: 'Fixture', email: 'fixture@example.test' };
const stores: BetaStore[] = [];
afterEach(() => stores.splice(0).forEach(store => store.close()));

function transaction(id: string, changes: Partial<TransactionRecord> = {}): TransactionRecord {
  return {
    id, userId: user.id, accountId: 'main', statementId: 'statement', date: '2026-11-01',
    amount: -20, currency: 'EUR', description: 'Home internet', counterparty: 'Home internet',
    reference: '', rawRow: {}, createdAt: date, ...changes,
  };
}

describe('Vela seven-stage regressions', () => {
  it('processes all classification batches, rejects foreign or duplicated IDs and preserves user labels', async () => {
    const { snapshot } = fixture();
    snapshot.transactions = Array.from({ length: 81 }, (_, index) => transaction('row-' + index));
    snapshot.classifications = { 'row-0': {
      id: 'confirmed', transactionId: 'row-0', category: 'education', economicType: 'expense',
      confidence: 'high', status: 'user_confirmed', classifierVersion: 'user', isRecurringCandidate: false,
      provenanceNote: 'Confirmed', updatedAt: date,
    } };
    snapshot.transferMatches = [];
    const llm = new LLMClient({ mockMode: true });
    const call = vi.spyOn(llm, 'generateStructured').mockImplementation(async request => {
      const data = request.fallback() as { classifications: Array<{ transactionId: string }> };
      data.classifications = data.classifications.filter(row => row.transactionId !== 'row-80');
      if (data.classifications[0]?.transactionId === 'row-1') {
        data.classifications.push({ ...data.classifications[0] }, { ...data.classifications[0], transactionId: 'foreign-id' });
      }
      return { data: request.schema!.parse(data), modelUsed: 'test', provider: 'gemini', liveCallUsed: true };
    });
    const result = await TransactionClassifier.classify({ snapshot, llmClient: llm });
    expect(call).toHaveBeenCalledTimes(2);
    expect(result.processedIds).toHaveLength(80);
    expect(result.updatedClassifications['foreign-id']).toBeUndefined();
    expect(result.updatedClassifications['row-0'].category).toBe('education');
    expect(result.updatedClassifications['row-80'].status).toBe('needs_review');
    expect(result.updatedClassifications['row-1'].status).toBe('needs_review');
    expect(result.updatedClassifications['row-79'].category).toBe('internet_telecom');
  });

  it('recomputes category totals without adding HUF and EUR', () => {
    const { snapshot } = fixture();
    const rows = [transaction('first'), transaction('foreign', { currency: 'HUF', amount: -1000 })];
    const source = snapshot.classifications[Object.keys(snapshot.classifications)[0]];
    const cls = { ...source, economicType: 'expense' as const, category: 'internet_telecom' as const };
    const summary = computeObservedAnalytics(rows, { first: cls, foreign: cls }, 'EUR');
    expect(summary.spendingByCategory.internet_telecom).toBe(20);
    expect(summary.observedSubscriptionsTotal).toBe(0);
  });

  it('separates repeating transactions by currency and does not compare incomplete months', () => {
    const { snapshot } = fixture();
    snapshot.transactions = [transaction('one'), transaction('two', { date: '2026-11-02' }),
      transaction('foreign', { date: '2026-11-02', currency: 'HUF' })];
    snapshot.transferMatches = [];
    snapshot.statements = [];
    const result = observePatterns(snapshot, date.slice(0, 10));
    expect(result.repeated).toHaveLength(1);
    expect(result.repeated[0].group[1]).toBe('EUR');
    expect(result.repeated[0].confirmation).toBe('observed_repeat_only');
    expect(result.comparisons).toHaveLength(0);
  });

  it('drops AI findings and questions referring to evidence outside the snapshot', async () => {
    const { snapshot } = fixture();
    snapshot.transactions = [transaction('one')];
    const llm = new LLMClient({ mockMode: true });
    vi.spyOn(llm, 'generateStructured').mockImplementation(async request => ({
      data: request.schema!.parse({
        findings: [{ evidenceIds: ['missing'], certainty: 'HYPOTHESIS', text: 'Unsupported finding' }],
        questions: [{ evidenceIds: ['missing'], text: 'Unsupported question' }],
        limitations: [], summaryText: 'Unsupported finding',
      }),
      modelUsed: 'test', provider: 'gemini', liveCallUsed: true,
    }));
    const result = await analyzePatterns(snapshot, date.slice(0, 10), llm);
    expect(result.findings).toEqual([]);
    expect(result.questions).toEqual([]);
    expect(result.summaryText).not.toContain('Unsupported finding');
  });

  it('rejects historical FX dated after valuation and records actual retrieval time', async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValueOnce(Response.json({ base: 'EUR', date: '2026-11-06', rates: { HUF: 364 } }))
      .mockResolvedValueOnce(Response.json({ base: 'EUR', date: '2026-11-05', rates: { HUF: 363 } }));
    const service = new FrankfurterFXService({ fetchFn });
    const first = await service.getHistoricalRates(date, 'EUR', ['HUF']);
    expect(first.HUF.status).toBe('UNAVAILABLE');
    const second = await service.getHistoricalRates(date, 'EUR', ['HUF']);
    expect(second.HUF).toMatchObject({ rate: 363, rateDate: '2026-11-05', status: 'OK' });
    expect(Math.abs(Date.now() - Date.parse(second.HUF.fetchedAt))).toBeLessThan(10000);
    expect(fetchFn.mock.calls[0][0]).toContain('/2026-11-05?');
  });

  it('distinguishes unknown APR and unknown accrual from a confirmed zero rate', () => {
    const { snapshot, extras } = fixture();
    const debt = snapshot.debts[0];
    const result = SharedFinancialCalculator.computeDebtInterestAvoided({
      debt: { ...debt, apr: null }, extraPaymentDay0: 0, horizonDays: 90, interestAccruing: true,
    });
    expect(result).toMatchObject({ status: 'NEEDS_DATA', baselineInterest: null, missingInputs: ['apr'] });
    expect(calculateDebtReport(snapshot, { ...extras, debtTerms: {} })[0]).toMatchObject({
      status: 'NEEDS_DATA', interest90dBaseline: null, missingInputs: ['interestAccruing'],
    });
    const zero = SharedFinancialCalculator.computeDebtInterestAvoided({
      debt: { ...debt, apr: 0 }, extraPaymentDay0: 0, horizonDays: 90, interestAccruing: false,
    });
    expect(zero).toMatchObject({ status: 'OK', baselineInterest: 0 });
  });

  it('separates liquid coverage and dedicated reserve coverage', () => {
    const { snapshot, extras } = fixture();
    snapshot.goals = snapshot.goals.filter(goal => goal.goalType !== 'emergency_cushion');
    const output = calculateFinancialMetrics(snapshot, extras);
    expect(output.liquidExpenseCoverageMonths).toBeGreaterThan(0);
    expect(output.emergencyReserveCoverageMonths).toBe(0);
  });

  it('preserves equal posted rows, de-duplicates overlap by occurrence, and clears confirmed originals', async () => {
    const store = new BetaStore({ filename: ':memory:' });
    stores.push(store);
    const financial = new BetaFinancial(store);
    const start = financial.get(user);
    start.state.accounts.push({ ...fixture().snapshot.accountSummaries[0].account, id: 'main', userId: user.id });
    financial.persist(user.id, start);
    const imports = new BetaImports(store, financial);
    const input = (fileName: string, lines: string) => ({
      accountId: 'main', fileName, contentBase64: Buffer.from('Date,Amount,Currency,Description\n' + lines).toString('base64'),
    });
    const repeated = '2026-11-01,-20,EUR,Shop\n2026-11-01,-20,EUR,Shop';
    const first = await imports.preview(user, input('first.csv', repeated));
    const confirmed = imports.confirm(user, first.id, start.version);
    expect(confirmed.state.transactions).toHaveLength(2);
    expect(confirmed.state.transactions.map(row => row.rawRow.__source_row)).toEqual(['2', '3']);
    expect(store.get(user.id, 'import:' + first.id)).toMatchObject({ original: '', csv: null });
    const overlap = await imports.preview(user, input('overlap.csv', repeated + '\n2026-11-02,-20,EUR,Shop'));
    const next = imports.confirm(user, overlap.id, confirmed.version);
    expect(next.state.transactions).toHaveLength(3);
  });

  it('preserves JSON numbers and evidence identifiers while removing private text from model inputs', async () => {
    const store = new BetaStore({ filename: ':memory:' });
    stores.push(store);
    const financial = new BetaFinancial(store);
    const initial = financial.get(user);
    financial.persist(user.id, { ...initial, aiConsent: true });
    const llm = new LLMClient({ mockMode: true });
    const call = vi.spyOn(llm, 'generateStructured');
    const analysis = new BetaAnalysis(store, financial, llm, {
      runReview: async (_user, _state, provider) => {
        await provider.generateStructured({
          systemPrompt: 'Test transport',
          userPrompt: '<untrusted_data source="test">' + JSON.stringify({
            amount: 814.2900000000001, transactionId: 'tx_1794153600000',
            note: user.email + ' ' + user.name,
          }) + '</untrusted_data>',
          fallback: () => ({}),
        });
        return {};
      },
    });
    await analysis.review(user, initial.version);
    const prompt = call.mock.calls[0][0].userPrompt;
    const data = JSON.parse(prompt.slice(prompt.indexOf('>') + 1, prompt.lastIndexOf('<')));
    expect(data).toMatchObject({ amount: 814.2900000000001, transactionId: 'tx_1794153600000' });
    expect(prompt).not.toContain(user.email);
    expect(prompt).not.toContain(user.name);
  });

  it('stores cited chat memory as context, keeps PI unchanged, and deletes dependent memory', async () => {
    const store = new BetaStore({ filename: ':memory:' });
    stores.push(store);
    const financial = new BetaFinancial(store);
    const initial = financial.get(user);
    financial.persist(user.id, { ...initial, aiConsent: true, experimentalRecommendations: true });
    const llm = new LLMClient({ mockMode: true });
    vi.spyOn(llm, 'generateStructured').mockImplementation(async request => ({
      data: request.schema!.parse(request.systemPrompt === prompts.memory.text
        ? { entries: [{ messageIds: ['salary'], kind: 'TENTATIVE_PLAN', text: 'Salary may change.' }], summaryText: 'Salary may change.' }
        : request.systemPrompt === prompts.assistant.text ? { factIds: ['accounts'], intent: 'records' } : request.fallback()),
      modelUsed: 'test', provider: 'gemini', liveCallUsed: true,
    }));
    const analysis = new BetaAnalysis(store, financial, llm, { now: () => new Date(date) });
    await analysis.chat(user, 'My salary may change.', 'salary');
    const review = await analysis.review(user, initial.version);
    const repo = new BetaEngineRepository(store, user, financial);
    expect(repo.getConversationMemory(user.id, user.id)).toMatchObject({
      status: 'CURRENT', entries: [{ kind: 'TENTATIVE_PLAN', messageIds: ['salary'] }],
    });
    expect(financial.get(user).state.incomes).toEqual(initial.state.incomes);
    const artifact = repo.getStageArtifact(user.id, user.id, review.trace.stageArtifactIds[0]);
    expect(artifact).toMatchObject({ userId: user.id, referenceDate: '2026-11-05' });
    expect(() => repo.getStageArtifact(user.id, 'another-user', artifact!.id)).toThrow();
    analysis.deleteChat(user);
    expect(repo.getConversationMemory(user.id, user.id)).toBeNull();
    expect(store.get(user.id, 'chat')).toBeNull();
    expect(store.get(user.id, 'chat-request:salary')).toBeNull();
    expect(analysis.checkFreshness(user).needed).toBe(true);
  });
});
