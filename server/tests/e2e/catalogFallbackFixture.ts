import { vi } from 'vitest';
import { LLMClient } from '../../src/ai/llmClient';
import { prompts } from '../../src/ai/prompts';

/** Make feedback tests enter the catalog branch through three real Checker rejections. */
export function mockCatalogFallbackClient(): LLMClient {
  const client = new LLMClient({ mockMode: true });
  const generate = client.generateStructured.bind(client);
  vi.spyOn(client, 'generateStructured').mockImplementation(async params => {
    const isPrimary = params.systemPrompt === prompts.primary.text;
    const isChecker = params.systemPrompt === prompts.checker.text;
    if (!isPrimary && !isChecker) return generate(params);
    const data = isPrimary ? {
      proposals: ['JPY', 'CAD', 'AUD'].map(currency => ({
        title: 'Review the ' + currency + ' base currency',
        description: 'Review the profile using ' + currency + ' as its recorded base currency.',
        rationale: 'The draft assumes that ' + currency + ' is the recorded base currency.',
        intent: 'REVIEW', targetFactId: 'profile', factIds: ['profile'], claimIds: [], prerequisites: [], missingInfo: [],
      })),
      shortfallReason: '',
    } : {
      verdicts: [1, 2, 3].map(slot => ({
        id: 'primary-' + slot, status: 'CONTRADICTS',
        reason: 'The draft base currency conflicts with the EUR profile.',
        contradictionRefs: ['profile'], supportingClaimIds: [], safeWithoutFinancialExecution: false,
      })),
    };
    return { data: params.schema!.parse(data), provider: 'gemini', modelUsed: 'test-fixture', liveCallUsed: true };
  });
  return client;
}
