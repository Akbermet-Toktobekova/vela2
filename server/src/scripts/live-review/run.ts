import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import { isDeepStrictEqual, parseArgs } from 'node:util';
import { ThinkingLevel } from '@google/genai';
import type { AnalysisArtifact } from '@shared/contracts/pipeline';
import { LLMClient, parseEnvFile } from '../../ai/llmClient';
import { prompts } from '../../ai/prompts';
import { createBetaApp } from '../../beta/app';
import { BetaEngineRepository } from '../../beta/engineRepository';
import { BetaStore } from '../../beta/store';
import { loadPrototypePolicy } from '../../config/policyLoader';
import { ASCatalogRepository } from '../../catalog/asCatalogRepository';
import { evaluatePrimarySuggestions } from '../../suggestion/primarySuggestions';
import { SuggestionGenerator } from '../../suggestion/suggestionGenerator';
import { ActionChecker } from '../../checker/actionChecker';
import { DecisionEngine } from '../../decision/decisionEngine';
import { applySourceAdvice } from '../../orchestrator/reviewWorkflow';
import { runCapturedStage, type StageCapture, type CapturedCall } from './stageReplay';
import { asOf, names, prepare, profiles, variants, type Profile, type ProfileVariant } from './profiles';
import { FrankfurterFXService } from '../../fx/frankfurterService';

const root = fileURLToPath(new URL('../../../../', import.meta.url));
const evidence = resolve(root, 'docs/testing/live-review');
const runId = new Date().toISOString().replace(/[:.]/g, '-');
const out = resolve(evidence, 'runs', runId);
const policy = loadPrototypePolicy();
const as = ASCatalogRepository.load();
const fileEnv = parseEnvFile();
const secrets = [...new Set([process.env.GEMINI_API_KEY, fileEnv.GEMINI_API_KEY, process.env.OPENAI_API_KEY, fileEnv.OPENAI_API_KEY])]
  .filter((secret): secret is string => Boolean(secret?.trim()));
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    profile: { type: 'string', multiple: true }, stage: { type: 'string' },
    'input-run': { type: 'string' }, 'gemma-comparison': { type: 'boolean' },
    'compare-primary': { type: 'boolean' }, 'run-recap': { type: 'boolean' }, model: { type: 'string' }, stream: { type: 'boolean' },
    'minimal-thinking': { type: 'boolean' }, mode: { type: 'string', default: 'live' },
    variant: { type: 'string' },
  },
});
const requested = [...positionals, ...(values.profile ?? [])];
const mode = values.mode;
if (requested.some(value => !profiles.includes(value as Profile)) || (mode !== 'live' && mode !== 'replay')) {
  throw new Error('Use --profile debt|strong|nora and --mode live|replay.');
}
const stage = values.stage;
const gemmaComparison = values['gemma-comparison'] ?? false;
const comparePrimary = values['compare-primary'] ?? false;
const variant = values.variant as ProfileVariant | undefined;
if (variant) {
  if (!Object.hasOwn(variants, variant) || requested.length || comparePrimary || stage || !values['run-recap']) {
    throw new Error('Use --variant with --run-recap and a single named synthetic variant.');
  }
  requested.push(variants[variant]);
}
const gemmaModels = ['gemma-4-31b-it', 'gemma-4-26b-a4b-it'];
const primaryModels = ['gemini-3.5-flash-lite', 'gemma-4-31b-it'];
if (values.model && ((!comparePrimary && (!values['run-recap'] || gemmaComparison || stage || mode !== 'live')) ||
    !primaryModels.includes(values.model))) {
  throw new Error('Use --model with a live --run-recap or --compare-primary and a supported model.');
}
if (values.stream && !comparePrimary) throw new Error('Use --stream with --compare-primary.');
if (values['minimal-thinking'] && (!comparePrimary || !values.model || !gemmaModels.includes(values.model))) {
  throw new Error('Use --minimal-thinking with --compare-primary and one Gemma model.');
}
const comparisonModels = comparePrimary ? [values.model ?? 'gemini-3.5-flash-lite'] : values.model ? [values.model] : gemmaModels;
if (gemmaComparison && mode !== 'live') throw new Error('Gemma comparison requires live mode.');
const sourceRun = values['input-run'];
if (comparePrimary && (gemmaComparison || stage || mode !== 'live' || !sourceRun || !/^[0-9TZ-]+$/.test(sourceRun))) {
  throw new Error('Primary comparison requires --input-run in live mode and runs each model independently.');
}
if (stage && (!/^[a-z0-9_-]+$/i.test(stage) || !sourceRun || !/^[0-9TZ-]+$/.test(sourceRun) || requested.length !== 1)) {
  throw new Error('An isolated stage requires --stage, --input-run and exactly one --profile.');
}
if (!stage && !comparePrimary && (sourceRun || mode === 'replay')) throw new Error('Replay requires --stage and --input-run.');
if (mode === 'live' && !(process.env.GEMINI_API_KEY?.trim() || fileEnv.GEMINI_API_KEY?.trim())) {
  throw new Error('GEMINI_API_KEY is required for a live run.');
}

const stages = new Map<Profile, string[]>();
const failed: string[] = [];
const counts = new Map<Profile, { live: number; fallback: number }>();
let calls: CapturedCall[] = [];
const comparisonClients = gemmaComparison || comparePrimary || values.model ? comparisonModels.map(model => new LLMClient({
  provider: 'gemini', mockMode: false, geminiPrimaryModel: model, pinGeminiModel: true,
  geminiStreaming: values.stream,
  geminiThinkingLevel: values['minimal-thinking'] ? ThinkingLevel.MINIMAL : undefined,
  geminiHttpOptions: { timeout: 35_000, retryOptions: { attempts: 1 } },
})) : [];
const provider = comparisonClients[0] ?? new LLMClient({ provider: 'gemini', mockMode: false });
const runRecap = values['run-recap'] && !gemmaComparison;
const recapPath = gemmaComparison ? resolve(evidence, 'gemma-4-31b', 'RECAP.md') : resolve(runRecap ? out : evidence, 'RECAP.md');
const reviewTimeoutMs = gemmaComparison ? 900_000 : 360_000;
function captureClient(client: LLMClient, model?: string, fallback?: { client: LLMClient; model: string }, spacingMs = 1500) {
  return new Proxy(client, {
    get(target, key, receiver) {
      if (key === 'generateStructured' || key === 'generateText') {
        return async (request: { systemPrompt: string; userPrompt: string }) => {
          const attempt = async (client: LLMClient, attemptedModel?: string) => {
            const invoke = client[key].bind(client) as (params: unknown) => Promise<CapturedCall['response']>;
            const response = await invoke(request);
            const call: CapturedCall = { method: key, attemptedModel, usedByRuntime: true, systemPrompt: request.systemPrompt, userPrompt: request.userPrompt, response };
            calls.push(call);
            if (attemptedModel) {
              console.log('Model attempt ' + attemptedModel + ': ' + (response.liveCallUsed ? 'live response' : 'failed or invalid response'));
            }
            return call;
          };
          if (!model) return (await attempt(target)).response;
          await sleep(spacingMs);
          let call = await attempt(target, model);
          if (call.response.liveCallUsed) return call.response;
          const failure = call.response.fallbackReason ?? '';
          const rateLimited = /\b429\b|resource.exhausted|too many requests/i.test(failure);
          if (rateLimited || /\b(?:500|502|503|504)\b|timeout|abort|fetch failed|unavailable|internal server error|bad gateway/i.test(failure)) {
            await sleep(rateLimited ? 61_000 : 5000);
            call.usedByRuntime = false;
            call = await attempt(target, model);
          }
          if (call.response.liveCallUsed || !fallback) return call.response;
          await sleep(2500);
          call.usedByRuntime = false;
          return (await attempt(fallback.client, fallback.model)).response;
        };
      }
      const value = Reflect.get(target, key, receiver);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
}
const llm = gemmaComparison
  ? captureClient(provider, comparisonModels[0], { client: comparisonClients[1], model: comparisonModels[1] })
  : captureClient(provider, !comparePrimary ? values.model : undefined, undefined, 4500);

function redact(value: string): string {
  return secrets.reduce((clean, secret) => clean.split(secret).join('[REDACTED]'), value);
}
function json(data: unknown): string {
  return `~~~~json\n${redact(JSON.stringify(data ?? null, null, 2))}\n~~~~`;
}
function cell(data: unknown): string {
  return redact(String(data ?? '—')).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('|', '\\|').replace(/\r?\n/g, ' ');
}
async function record(profile: Profile, slug: string, input: unknown, output: unknown, savedIn: string, summary?: string, extra = '', status = 'COMPLETED') {
  const list = stages.get(profile) ?? [];
  list.push(slug);
  stages.set(profile, list);
  const count = counts.get(profile) ?? { live: 0, fallback: 0 };
  for (const call of calls) call.response.liveCallUsed ? count.live++ : count.fallback++;
  counts.set(profile, count);
  const models = calls.map(call => call.response.liveCallUsed ? `Live Google API (${call.response.modelUsed})` : `Fallback (${call.response.fallbackReason ?? 'reason unavailable'})`);
  const content = `# ${names[profile]} · ${slug.replaceAll('-', ' ')}\n\nSnapshot date ${asOf}. Policy \`${policy.policyMeta.policyBundleVersion}\`.\n\n${models.length ? models.map(model => `- ${cell(model)}`).join('\n') : 'This stage made no Gemini calls.'}\n\n| Input | Output | Summary | Saved in | Details |\n| --- | --- | --- | --- | --- | --- |\n| [Exact input](#input) | [Actual output](#output) | ${summary ? '[Exact text](#summary)' : '—'} | ${cell(savedIn)} | ${calls.length ? '[AI request and response](#ai-request-and-response)' : '—'} |\n\n${extra ? `${extra}\n\n` : ''}## Input\n\n${json(input)}\n\n## Output\n\n${json(output)}\n${summary ? `\n## Summary\n\n~~~~text\n${redact(summary)}\n~~~~\n` : ''}${calls.length ? `\n## AI request and response\n\nThe response is the exact text or parsed structured response returned by the Vela provider client.\n\n${json(calls)}\n` : ''}`;
  const capture: StageCapture = { stage: slug, status, input, output, summary, calls };
  await writeFile(resolve(out, profile, slug + '.json'), redact(JSON.stringify(capture, null, 2)));
  calls = [];
  await writeFile(resolve(out, profile, `${slug}.md`), content);
  console.log(`${profile}/${slug}`);
}

async function runProfile(profile: Profile) {
  await mkdir(resolve(out, profile), { recursive: true });
  const store = new BetaStore({ filename: ':memory:' });
  const captures: { artifact: AnalysisArtifact; input: unknown }[] = [];
  const fxService = variant === 'strong-missing-fx' ? new FrankfurterFXService({
    fetchFn: async () => new Response('{}', { status: 503 }),
  }) : undefined;
  const beta = createBetaApp({
    store, llmClient: llm, autoReview: false,
    analysisOptions: {
      fxService,
      now: () => new Date(asOf),
      timeoutMs: reviewTimeoutMs,
      onSyntheticError: message => console.error(profile + " review: " + redact(message)),
      onStage: (artifact, input) => {
        captures.push({ artifact, input });
        console.log(profile + ' evaluated ' + artifact.stage);
      },
    },
  });
  const server = createServer(beta.app);
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/beta`;
  let token: string | undefined;
  async function request(method: string, path: string, body?: unknown, acceptError = false) {
    const response = await fetch(`${base}${path}`, { method,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body) });
    const data = await response.json();
    if (!response.ok && !acceptError) throw new Error(`${method} ${path} (${response.status}): ${JSON.stringify(data)}`);
    return data;
  }
  async function wait(id: string) {
    const start = performance.now();
    while (performance.now() - start < reviewTimeoutMs + 30_000) {
      const job = await request('GET', `/jobs/${id}`);
      if (job.status === 'completed') return job.result;
      if (job.status === 'failed' || job.status === 'cancelled') throw new Error(`Job ${job.status}: ${job.error ?? ''}`);
      await sleep(200);
    }
    throw new Error('Timed out waiting for the beta job.');
  }
  try {
    const registration = await request('POST', '/auth/register', {
      name: names[profile], email: `${profile}@example.test`, password: 'Vela-Synthetic-Lab-Only-123!',
    });
    token = registration.token;
    const user = registration.user;
    const initial = await request('GET', '/state');
    const fixture = prepare(profile, initial.state, variant);
    const stateInput = { expectedVersion: initial.version, state: fixture.state, aiConsent: true, experimentalRecommendations: true };
    let latest = await request('PUT', '/state', stateInput);
    const imports = [];
    for (const statement of fixture.statements) {
      const data = await readFile(resolve(root, 'user-inputs/synthetic/backend-review', statement.fileName));
      const job = await request('POST', '/imports', { ...statement, contentBase64: data.toString('base64') });
      const preview = await wait(job.id);
      latest = await request('POST', `/imports/${preview.id}/confirm`, { expectedVersion: latest.version });
      imports.push({ fileName: statement.fileName, preview });
    }
    await record(profile, 'import', fixture.statements, imports,
      'SQLite beta_documents.payload → import:<id> and state → state.statements/transactions. Draft PostgreSQL pi.statement_imports, pi.statements, pi.transactions.');
    const repo = new BetaEngineRepository(store, user, beta.financial, { referenceNowIso: asOf });
    if (fixture.state.goalAllocations.length || fixture.extras.debtTerms || fixture.extras.confirmedGoalContributions || variant === 'nora-fresh') {
      const currentSeed = beta.financial.get(user).state;
      const freshBalances = variant === 'nora-fresh' ? beta.financial.snapshot(user).accountSummaries.flatMap(({ account, latestBalance }) =>
        latestBalance ? [{ ...latestBalance, id: 'fresh-' + account.id, asOf, createdAt: asOf, sourceType: 'user_reported' as const }] : []) : [];
      repo.savePIState(user.id, user.id, {
        seed: { ...currentSeed, goalAllocations: structuredClone(fixture.state.goalAllocations), balances: [...currentSeed.balances, ...freshBalances] },
        calculatorExtras: fixture.extras,
      });
    }
    const pi = repo.getPIState(user.id, user.id);
    if (!pi) throw new Error('The PI envelope is missing.');
    const snapshot = pi.snapshot;
    await record(profile, 'pi', { ...stateInput, variant }, { version: pi.version, snapshot, calculatorExtras: pi.calculatorExtras },
      'SQLite beta_documents.payload → state → state; engine → snapshots and derivedSnapshots. Draft PostgreSQL pi.* and analysis.financial_snapshots.');
    await record(profile, 'as', { package: 'server/data/as/FinAgent_Normalized_Database.json' }, {
      metadata: as.metadata, verifiedClaimIds: as.verifiedClaims.map(row => row.claim_id), actionIds: as.catalogActions.map(row => row.action_id),
    }, 'Canonical AS package. Draft PostgreSQL as.* references by original ID and version.');

    const initialChat = { message: 'I would like to understand my saved financial information. I may review my budget later.', requestId: profile + '-context' };
    const initialAnswer = await request('POST', '/chat', initialChat, true);
    await record(profile, 'assistant-context', initialChat, initialAnswer,
      'SQLite beta_documents.payload / chat and chat-request:<id>. Context for conversation memory.', initialAnswer.reply);
    const memoryInput = { messages: store.get(user.id, 'chat'), previous: null };
    const reviewInput = { forceRefresh: true };
    const reviewJob = await request('POST', '/review', reviewInput);
    const review = await wait(reviewJob.id);
    const today = await request('GET', '/state');
    const trace = review.traceId ? await request('GET', `/traces/${review.traceId}`) : null;
    const engine = new BetaEngineRepository(store, user, beta.financial, { referenceNowIso: asOf });
    const reviewCalls = calls;
    calls = [];
    const roles: Record<string, string> = {
      classification: prompts.classification.text, 'pattern-recognition': prompts.pattern.text,
      'behavior-agent': prompts.behavior.text, 'debt-agent': prompts.debt.text,
      'suggestion-generator': prompts.primary.text, checker: prompts.checker.text,
      'catalog-selector': prompts.catalog.text, 'ai-evaluation': prompts.complexity.text,
    };
    const memory = engine.getConversationMemory(user.id, user.id);
    calls = reviewCalls.filter(call => call.systemPrompt === prompts.memory.text);
    await record(profile, 'conversation-memory', memoryInput, memory,
      'SQLite beta_documents.payload / chat-memory. Proposed analysis.conversation_memory.',
      memory?.summaryText, 'Consumers: Suggestion Generator and Assistant.');
    const downstream: Record<string, string> = {
      fx: 'Shared Financial Calculator and Checker', classification: 'Aggregates and Pattern Recognition',
      'pattern-recognition': 'Behavior and Suggestion Generator', 'behavior-agent': 'Suggestion Generator and Assistant',
      'financial-calculator': 'Suggestion Generator, Checker and Decision Engine', 'debt-calculator': 'Debt Agent',
      'debt-agent': 'Suggestion Generator and Assistant', 'suggestion-generator': 'Checker',
      checker: 'Final Recommendation Engine', 'catalog-selector': 'Checker', 'critical-coverage': 'Final Recommendation Engine',
      'ai-evaluation': 'Scoring', weights: 'Scoring and Robustness', scoring: 'Robustness and Decision Engine',
      robustness: 'Decision Engine', 'decision-engine': 'Explanation and Today', explanation: 'Today and Assistant',
    };
    const artifacts: Record<string, AnalysisArtifact> = {};
    for (const { artifact, input } of captures) {
      const slug = artifact.stage.replace(/[^a-z0-9_-]/gi, '_');
      if (slug === 'pi') continue;
      const stored = engine.getStageArtifact(user.id, user.id, artifact.id);
      if (!stored) throw new Error('Missing stage readback: ' + artifact.id);
      artifacts[slug] = stored;
      const role = roles[slug];
      calls = role ? reviewCalls.filter(call => call.systemPrompt.startsWith(role)) : [];
      const details = [
        'Status: ' + stored.status, 'Prompt: ' + (stored.promptVersion ?? 'None'), 'Executed at: ' + stored.executedAt,
        'Consumers: ' + (downstream[slug] ?? 'Scoring and Decision Engine'),
        'Upstream artifact IDs: ' + stored.upstreamIds.join(', '),
        'Missing inputs: ' + (stored.missingInputs.join(', ') || 'None flagged'),
      ].join('\n\n');
      await record(profile, slug, input, artifact.output, 'SQLite beta_documents.payload / stage:' + artifact.id + ' / output. Read back from encrypted storage.',
        stored.summaryText, details, stored.status);
    }
    const card = today.recommendation;
    for (const missing of ['scoring', 'robustness', 'impact']) {
      const present = Object.keys(artifacts).some(key => key === missing || key.startsWith(missing + '-'));
      if (!present) await record(profile, missing, null, null, 'No result in the runtime trace.', undefined,
        'Skipped because the decision branch did not rank financial actions.', 'SKIPPED');
    }
    const selection = (review.trace?.primarySuggestions?.proposals ?? []).map((proposal: {
      id: string; title: string; status: string; reason: string; mappedCandidateId?: string; actionId: string | null;
    }) => {
      const scored = review.trace.scoredCandidates.find((row: { candidate: { candidateId: string }; finalScore: number }) => row.candidate.candidateId === proposal.mappedCandidateId);
      return { ...proposal, score: scored?.finalScore ?? null, selected: review.decision?.sourceAdvice?.id === proposal.id ||
        Boolean(proposal.mappedCandidateId && review.decision?.candidate?.candidateId === proposal.mappedCandidateId) };
    });
    const storageRows = store.database.prepare('SELECT doc_key, length(payload) AS stored_bytes FROM beta_documents WHERE user_id = ? ORDER BY doc_key').all(user.id);
    await record(profile, 'beta-review', { request: 'POST /api/beta/review', body: reviewInput, version: today.version },
      { jobId: reviewJob.id, decision: review.decision, todayCard: card, trace, primaryProposals: selection, storageRows },
      'SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations.', card?.reasoning,
      'Actual Today output: **' + cell(card?.title ?? review.decisionStatus) + '**.');
    const chatInput = { message: 'Summarize my recorded debts, account balances, and any missing information.', requestId: `${profile}-records` };
    const chat = await request('POST', '/chat', chatInput, true);
    await record(profile, 'assistant', chatInput, chat, 'SQLite beta_documents.payload → chat and chat-request:<id>. Draft PostgreSQL analysis.assistant_messages.', chat.reply ?? chat.message);
    const feedbackInput = card ? { recommendationId: card.id, action: 'accept', expectedVersion: today.version, requestId: `${profile}-accept` } : null;
    const feedback = feedbackInput ? await request('POST', '/feedback', feedbackInput, true) : { skipped: 'No Today card was available.' };
    await record(profile, 'feedback', feedbackInput, feedback, 'SQLite beta_documents.payload → engine.feedback and feedback-request:<id>; state.actionFeedback is an API projection when accepted. Draft PostgreSQL pi.action_feedback.');
    if (variant === 'strong-confirmed' && feedbackInput && feedback.accepted && review.decision?.selectedActionId === 'A012') {
      const adjustmentInput = { ...feedbackInput, action: 'adjust', adjustedAmount: 400, requestId: `${profile}-adjust` };
      const adjustment = await request('POST', '/feedback', adjustmentInput, true);
      await record(profile, 'feedback-adjust', adjustmentInput, adjustment, 'SQLite engine.feedback and feedback-request documents.');
    }
    await record(profile, 'postgres-mock', { betaEvaluationId: review.traceId, draft: 'See ../../../PI-STORAGE.md.' }, {
      simulated: true,
      'pi.debts': snapshot.debts,
      'analysis.stage_artifacts': Object.values(artifacts).map(({ id, stage, snapshotId, summaryText }) =>
        ({ id, stage, input_snapshot_id: snapshotId, summary_text: summaryText })),
      'analysis.conversation_memory': memory,
      'analysis.decisions': { id: review.traceId, status: review.decisionStatus, selected_action_id: review.decision?.selectedActionId ?? null },
    }, 'In-memory projection exported to this report.');
    return {
      profile, title: card?.title ?? null, decisionStatus: review.decisionStatus, score: review.decision?.score ?? null,
      liveDrafts: selection, debt: artifacts['debt-agent']?.summaryText, behavior: artifacts['behavior-agent']?.summaryText,
      pattern: artifacts['pattern-recognition']?.summaryText, transactionCount: snapshot.transactions.length,
    };
  } finally {
    beta.dispose();
    await new Promise<void>(resolve => server.close(() => resolve()));
    // A failed HTTP request can finish before its queued handler records failure.
    // Keep the temporary database open until those handlers finish their writes.
    while ((store.database.prepare("SELECT COUNT(*) AS count FROM beta_jobs WHERE status='running'")
      .get() as { count: number }).count > 0) await sleep(25);
    store.close();
  }
}

await mkdir(out, { recursive: true });
if (comparePrimary) {
  type PrimaryInput = Omit<Parameters<typeof evaluatePrimarySuggestions>[0], 'llm'>;
  type CatalogInput = Omit<Parameters<typeof SuggestionGenerator.generateCandidates>[0], 'llmClient'>;
  const providers = comparisonClients.map((client, index) => captureClient(client, comparisonModels[index]));
  console.log('Primary comparison run ' + runId + ' using inputs from ' + sourceRun);
  for (const profile of profiles.filter(item => requested.length === 0 || requested.includes(item))) {
    const inputDirectory = resolve(evidence, 'runs', sourceRun!, profile);
    const [generation, checker, decision] = await Promise.all([
      readFile(resolve(inputDirectory, 'suggestion-generator.json'), 'utf8').then(value => JSON.parse(value) as StageCapture),
      readFile(resolve(inputDirectory, 'checker.json'), 'utf8').then(value => JSON.parse(value) as StageCapture),
      readFile(resolve(inputDirectory, 'decision-engine.json'), 'utf8').then(value => JSON.parse(value) as StageCapture),
    ]);
    const { catalogInput } = checker.input as { catalogInput: CatalogInput };
    await mkdir(resolve(out, profile), { recursive: true });
    for (const [index, model] of comparisonModels.entries()) {
      const pinned = providers[index];
      try {
        const input = generation.input as PrimaryInput;
        let draft: PrimaryInput['replayGeneration'] = null;
        await evaluatePrimarySuggestions({
          ...input, llm: pinned, generationOnly: true, captureRawResponse: true,
          onDraftsGenerated: result => { draft = result; },
        });
        const decodeRequest = (text: string) => JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
        const baselineRequest = decodeRequest(generation.calls[0].userPrompt);
        const benchmarkRequest = decodeRequest(calls[0].userPrompt);
        if (!isDeepStrictEqual(baselineRequest.facts, benchmarkRequest.facts) ||
            !isDeepStrictEqual(baselineRequest.chatContext, benchmarkRequest.chatContext) ||
            !isDeepStrictEqual(baselineRequest.excerpts,
              benchmarkRequest.excerpts.map((excerpt: Record<string, unknown>) =>
                Object.fromEntries(Object.keys(baselineRequest.excerpts[0]).map(key => [key, excerpt[key]]))))) {
          throw new Error('Frozen PI, chat context or eligible AS evidence changed.');
        }
        const captured = draft as PrimaryInput['replayGeneration'];
        await record(profile, `${model}-suggestion-generator`, generation.input, draft,
          'Isolated report. Runtime database unchanged.', undefined,
          `Model: ${model}. Input capture: ${sourceRun}. Transport: ${values.stream ? 'streaming' : 'standard'}. Thinking level: ${values['minimal-thinking'] ? 'minimal' : 'provider default'}.`,
          captured?.liveCallUsed ? 'COMPLETED' : 'FAILED');
        const checked = await evaluatePrimarySuggestions({
          ...(generation.input as PrimaryInput), replayGeneration: draft, llm: pinned,
        });
        await record(profile, `${model}-checker`, { generation: draft, sourceRun, primaryInput: generation.input, catalogInput },
          checked, 'Isolated report. Runtime database unchanged.');
        const fallback = checked.fallbackReason
          ? await SuggestionGenerator.generateCandidates({ ...catalogInput, llmClient: pinned }) : [];
        await record(profile, `${model}-catalog-selector`, { trigger: checked.fallbackReason }, fallback,
          'Isolated report.', undefined, '', checked.fallbackReason ? 'COMPLETED' : 'SKIPPED');
        const checkerOutput = ActionChecker.runCheckerPipeline(
          [...checked.candidates, ...fallback],
          input.checker, checked.fallbackReason !== null);
        const decisionInput = decision.input as Parameters<typeof DecisionEngine.runDecisionEngine>[0];
        const next = applySourceAdvice(DecisionEngine.runDecisionEngine({ ...decisionInput, checkerOutput }), checked.advice, checked.clarification).decision;
        await record(profile, `${model}-decision`, { sourceRun, checkerOutput, fallbackReason: checked.fallbackReason },
          next, 'Isolated decision replay with frozen complexity inputs. Runtime database unchanged.');
      } catch (error) {
        const message = redact(error instanceof Error ? error.message : String(error));
        await record(profile, `${model}-run-error`, { sourceRun }, { message }, 'Isolated report.', undefined, '', 'FAILED');
        console.error(`${profile}/${model}: ${message}`);
        process.exitCode = 1;
      }
    }
  }
  console.log('Saved primary comparison ' + out);
} else if (stage) {
  const profile = requested[0] as Profile;
  const capturePath = resolve(evidence, 'runs', sourceRun!, profile, stage + '.json');
  const capture = JSON.parse(await readFile(capturePath, 'utf8')) as StageCapture;
  if (capture.stage !== stage) throw new Error('The saved stage identifier does not match the requested stage.');
  const result = await runCapturedStage(capture, mode, gemmaComparison ? llm : provider);
  if (!gemmaComparison) calls = result.calls;
  await mkdir(resolve(out, profile), { recursive: true });
  const output = result.output as { summaryText?: string } | null;
  await record(profile, stage, capture.input, result.output, 'Isolated report. Runtime database unchanged.',
    output?.summaryText, 'Mode: ' + mode + '. Input run: ' + sourceRun + '.', result.status);
  console.log(resolve(out, profile, stage + '.md'));
} else {
const summaries: Awaited<ReturnType<typeof runProfile>>[] = [];
for (const profile of profiles.filter(item => requested.length === 0 || requested.includes(item))) {
  try { summaries.push(await runProfile(profile)); }
  catch (error) {
    const message = redact(error instanceof Error ? error.message : String(error));
    failed.push(names[profile] + ' — ' + message);
    await record(profile, 'run-error', null, { message }, 'No persistence claim.');
    console.error(profile + ': ' + message);
  }
}

const recap = ['# Vela live results recap', '', `Run ${runId}. Financial snapshot ${asOf}.`, '',
  ...(variant ? [`Synthetic variant: ${variant}.`, ''] : []),
  'The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.', '',
  ...['PI and storage map|PI-STORAGE.md', 'Original baseline|BASELINE-RECAP.md', 'Previous Gemini recap|GEMINI-RECAP.md', 'Seven-stage results|SEVEN-STAGES.md', 'Formula explanation|FORMULAS.md'].map(link => {
    const [label, path] = link.split('|');
    return `- [${label}](${runRecap ? '../../' : ''}${path})`;
  }), '',
  ...[...stages].flatMap(([profile, list]) => {
    const result = summaries.find(summary => summary.profile === profile);
    const count = counts.get(profile);
    const base = runRecap ? profile : `runs/${runId}/${profile}`;
    return [`## ${names[profile]}`, '',
      `- Google API returned ${count?.live ?? 0} live responses. ${count?.fallback ?? 0} ${gemmaComparison ? 'model attempts failed or returned invalid output.' : 'calls used fallback.'}`,
      ...(result ? [`- Imported transactions **${result.transactionCount}**. Actual beta decision **${result.decisionStatus}**. Today **${cell(result.title ?? 'No card')}**. Financial score **${result.score ?? 'Not scored'}**.`,
        `- Debt summary — ${cell(result.debt)}`, `- Behavior summary — ${cell(result.behavior)}`, `- Pattern summary — ${cell(result.pattern)}`,
        ...result.liveDrafts.map((row: { id: string; title: string; description: string; origin?: string; status: string; reason: string }) => `- ${cell(`${row.id} · ${row.title}`)} — **${row.status}**. ${cell(row.description)} **Checker:** ${cell(row.reason)} **Origin:** ${row.origin ?? 'MODEL'}.`)] : []),
      '', ...list.map(stage => `- [${stage.replaceAll('-', ' ')}](${base}/${stage}.md)`), ''];
  }),
  ...(failed.length ? ['## Run errors', '', ...failed.map(failure => `- ${failure}`), ''] : []),
];
await mkdir(resolve(recapPath, '..'), { recursive: true });
const recapText = recap.join('\n');
const comparisonRecap = recapText.replace(/\]\(([^\s)]+)\)/g, '](../$1)')
  .replace('# Vela live results recap', '# Gemma 4 comparison results')
  .replace('[Seven-stage results](../SEVEN-STAGES.md)', '[Seven-stage results](SEVEN-STAGES.md)')
  .replace('- [Formula explanation](../FORMULAS.md)', '- [Formula explanation](../FORMULAS.md)\n- [Isolated primary proposals by model](PRIMARY-COMPARISON.md)')
  .replace('The authenticated beta API', 'Requests try Gemma 4 31B first and may retry or use Gemma 4 26B A4B. Failed attempts are included in stage logs.\n\nThe authenticated beta API');
await writeFile(recapPath, gemmaComparison ? comparisonRecap : recapText);
console.log('Saved ' + recapPath);
if (failed.length || [...counts.values()].every(count => count.live === 0)) process.exitCode = 1;
}
