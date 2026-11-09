import { createHash, randomUUID } from 'node:crypto';
import type { AddressInfo } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { createBetaApp } from '../beta/app';
import type { BetaState } from '../beta/financial';
import { LLMClient, type LLMCallResult } from '../ai/llmClient';
import { bankOperationHint } from '../analyzer/statementEnrichment';
import { readFile } from 'node:fs/promises';
import { z } from 'zod';
import { BetaStore } from '../beta/store';
import { BetaFinancial } from '../beta/financial';
import { BetaImports } from '../beta/imports';
import { BetaUploads } from '../beta/uploads';

const referenceSchema = z.object({
  fileSha256: z.string().regex(/^[a-f0-9]{64}$/),
  labels: z.array(z.object({
    csvRow: z.number().int().positive(),
    category: z.string(),
    acceptedCategories: z.array(z.string()).optional(),
    economicType: z.string().nullable(),
    certainty: z.enum(['grounded', 'category_ambiguous', 'transfer_candidate', 'insufficient_detail']),
  })),
});

type Reference = z.infer<typeof referenceSchema>;
type ModelUse = Pick<LLMCallResult<unknown>, 'provider' | 'modelUsed' | 'liveCallUsed' | 'fallbackReason'>;

async function runLive(store: BetaStore, source: Buffer, currency: string, reference: Reference) {
  const provider = new LLMClient({mockMode: false});
  const offline = new LLMClient({mockMode: true});
  const models: ModelUse[] = [];
  const incomplete = new Set(reference.labels.filter(row => row.certainty === 'insufficient_detail').map(row => row.csvRow));
  let profileId = '';
  const providerForProbe = new Proxy(provider, {get(target, key) {
    if (key === 'generateStructured') {
      return async (params: Parameters<LLMClient['generateStructured']>[0]) => {
        if (!params.orderedGeminiModels) return offline.generateStructured(params);
        const state = (store.get(profileId, 'state') as BetaState).state;
        const transactions = new Map(state.transactions.map(row => [row.id, row]));
        const input = JSON.parse(params.userPrompt);
        input.transactions = input.transactions.map((item: {transactionId: string; amount: number}) => {
          const row = transactions.get(item.transactionId);
          if (!row) throw new Error('Unexpected transaction in the live benchmark.');
          const hint = bankOperationHint(row, state.profile.nickname);
          const bankType = row.rawRow.__bank_type?.toUpperCase();
          const hide = !!hint || bankType === 'DEPOSIT' || bankType === 'TRANSFER' || incomplete.has(Number(row.rawRow.__source_row));
          return {
            ...item,
            amount: Math.sign(item.amount),
            ...(hide ? {counterparty: '', description: hint || (bankType === 'DEPOSIT' ? 'Bank deposit' : 'Merchant details unavailable')} : {}),
          };
        });
        const result = await target.generateStructured({...params, userPrompt: JSON.stringify(input)});
        const {provider, modelUsed, liveCallUsed, fallbackReason} = result;
        models.push({provider, modelUsed, liveCallUsed, fallbackReason});
        return result;
      };
    }
    if (key === 'generateText') return offline.generateText.bind(offline);
    const member = Reflect.get(target, key);
    return typeof member === 'function' ? member.bind(target) : member;
  }});
  const app = createBetaApp({store, llmClient: providerForProbe, analysisOptions: {
    onStage: artifact => {
      if (artifact.stage === 'pattern-recognition') throw new Error('Benchmark stops after statement classification.');
    },
  }});
  const server = app.app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  const base = 'http://127.0.0.1:' + (server.address() as AddressInfo).port + '/api/beta';
  try {
    const password = randomUUID();
    const registration = await fetch(base + '/auth/register', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: 'Benchmark Owner', email: 'benchmark@example.test', password}),
    });
    if (!registration.ok) throw new Error('Isolated registration failed.');
    const {token, user} = await registration.json() as {token: string; user: {id: string; name: string; email: string}};
    profileId = user.id;
    const current = app.financial.get(user);
    current.state.preferences.statementReviewMode = 'automatic';
    current.state.onboarding.status = 'completed';
    current.state.accounts.push(benchmarkAccount(user.id, currency));
    const headers = {'Content-Type': 'application/json', Authorization: 'Bearer ' + token};
    const settings = await fetch(base + '/state', {
      method: 'PUT', headers, body: JSON.stringify({expectedVersion: current.version, state: current.state, aiConsent: true}),
    });
    if (!settings.ok) throw new Error('Could not enable AI for the isolated benchmark profile.');
    const upload = await fetch(base + '/uploads', {
      method: 'POST', headers, body: JSON.stringify({accountId: 'benchmark', fileName: 'benchmark.csv', contentBase64: source.toString('base64')}),
    });
    if (!upload.ok) throw new Error('The isolated upload failed.');
    for (let tries = 0; tries < 125; tries += 1) {
      const response = await fetch(base + '/state', {headers});
      if (!response.ok) throw new Error('Could not read the isolated profile.');
      const output = await response.json() as BetaState & {reviewJob?: {status: string}; uploads?: {status: string}[]};
      if (output.uploads?.[0]?.status === 'needs_attention') throw new Error('The benchmark file could not be imported.');
      if (output.uploads?.[0]?.status === 'complete' && output.reviewJob?.status === 'failed' && models.length) {
        return {state: output.state, models, reviewStatus: output.reviewJob.status};
      }
      await delay(1000);
    }
    throw new Error('Timed out waiting for the isolated AI result.');
  } finally {
    app.dispose();
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
}

function benchmarkAccount(userId: string, currency: string): BetaState['state']['accounts'][number] {
  const now = new Date().toISOString();
  return {id: 'benchmark', userId, currency, name: 'Benchmark', institution: '',
    purposes: ['daily_spending'], fundsOwnership: 'personal', personalAvailableAmount: null,
    isPrimary: true, notes: '', createdAt: now, updatedAt: now};
}

async function run() {
  const [filePath, referencePath, currency, mode] = process.argv.slice(2);
  if (!filePath || !referencePath || !/^[A-Z]{3}$/.test(currency || '')) {
    throw new Error('Usage: tsx src/scripts/score-statement-reference.ts <statement.csv> <reference.json> <currency> [--live]');
  }
  const reference = referenceSchema.parse(JSON.parse(await readFile(referencePath, 'utf8')));
  const source = await readFile(filePath);
  if (createHash('sha256').update(source).digest('hex') !== reference.fileSha256) {
    throw new Error('The reference does not match the statement.');
  }

  const store = new BetaStore({filename: ':memory:'});
  try {
    const financial = new BetaFinancial(store);
    const imports = new BetaImports(store, financial);
    const uploads = new BetaUploads(store, financial, imports);
    const user = {id: 'benchmark', name: process.env.VELA_BENCHMARK_OWNER || 'Fixture Owner', email: 'benchmark@example.test'};
    const current = financial.get(user);
    current.state.preferences.statementReviewMode = 'automatic';
    current.state.accounts.push(benchmarkAccount(user.id, currency));
    const live = mode === '--live' ? await runLive(store, source, currency, reference) : undefined;
    if (!live) {
      financial.persist(user.id, current);
      uploads.stage(user, {accountId: 'benchmark', fileName: 'benchmark.csv', contentBase64: source.toString('base64')});
      await uploads.process(user);
    }
    const state = live?.state ?? financial.get(user).state;
    const classifications = new Map(state.classifications.map(row => [row.transactionId, row]));
    const byRow = new Map(state.transactions.map(row => [Number(row.rawRow.__source_row), classifications.get(row.id)]));
    if (byRow.size !== reference.labels.length || reference.labels.some(label => !byRow.has(label.csvRow))) {
      throw new Error('The imported rows do not match the reference rows.');
    }
    const matches = (label: typeof reference.labels[number]) =>
      (label.acceptedCategories ?? [label.category]).some(category => category === byRow.get(label.csvRow)?.category);
    const strict = reference.labels.filter(row => row.certainty === 'grounded' || row.certainty === 'category_ambiguous');
    const typed = reference.labels.filter(row => row.economicType !== null);
    console.log(JSON.stringify({
      ...(live && {models: live.models, reviewStatus: live.reviewStatus}),
      mappedRows: byRow.size,
      other: [...byRow.values()].filter(row => row?.category === 'other').length,
      categoryStrict: {matched: strict.filter(matches).length, total: strict.length},
      categoryAll: {matched: reference.labels.filter(matches).length, total: reference.labels.length},
      economicType: {matched: typed.filter(row => byRow.get(row.csvRow)?.economicType === row.economicType).length, total: typed.length},
      categoryMismatches: reference.labels.filter(row => !matches(row)).map(row => ({
        csvRow: row.csvRow, expected: row.category, actual: byRow.get(row.csvRow)?.category ?? 'missing', certainty: row.certainty,
      })),
    }, null, 2));
    if (live?.models.some(model => !model.liveCallUsed)) process.exitCode = 1;
  } finally {
    store.close();
  }
}

void run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Statement benchmark failed.');
  process.exitCode = 1;
});
