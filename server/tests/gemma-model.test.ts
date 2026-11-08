import { afterEach, expect, it, vi } from 'vitest';
import { BetaStore } from '../src/beta/store';
import { BetaFinancial } from '../src/beta/financial';
import { BetaAnalysis } from '../src/beta/analysis';
import { LLMClient } from '../src/ai/llmClient';

afterEach(() => vi.unstubAllEnvs());

it('pins an explicitly selected Gemma model without rotating to Gemini', () => {
  const client = new LLMClient({ geminiPrimaryModel: 'gemma-4-31b-it', mockMode: true });
  expect(client.getQuotaAndModelStatus().candidateModels).toEqual(['gemma-4-31b-it']);
});

it('retains the explicit legacy Gemini model override', () => {
  const client = new LLMClient({ geminiPrimaryModel: 'gemini-3.1-flash-lite', mockMode: true });
  expect(client.getQuotaAndModelStatus().configuredPrimaryModel).toBe('gemini-3.1-flash-lite');
});

it('can pin the legacy Gemini model for a single-model comparison', () => {
  const client = new LLMClient({ geminiPrimaryModel: 'gemini-3.1-flash-lite', pinGeminiModel: true, mockMode: true });
  expect(client.getQuotaAndModelStatus().candidateModels).toEqual(['gemini-3.1-flash-lite']);
});

it('invalidates a published analysis after the configured model changes', async () => {
  const store = new BetaStore({ filename: ':memory:' });
  try {
    const user = { id: 'model-change', name: 'Fixture', email: 'fixture@example.test' };
    const financial = new BetaFinancial(store);
    const state = financial.get(user);
    financial.persist(user.id, { ...state, aiConsent: true, experimentalRecommendations: true });
    const old = new BetaAnalysis(store, financial, new LLMClient({ geminiPrimaryModel: 'gemini-3.1-flash-lite', mockMode: true }));
    await old.review(user, state.version);
    expect(old.checkFreshness(user).needed).toBe(false);
    const changed = new BetaAnalysis(store, financial, new LLMClient({ geminiPrimaryModel: 'gemma-4-31b-it', mockMode: true }));
    expect(changed.checkFreshness(user).needed).toBe(true);
    expect(changed.checkFreshness(user).freshnessKey).not.toBe(old.checkFreshness(user).freshnessKey);
  } finally {
    store.close();
  }
});
