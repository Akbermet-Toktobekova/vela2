import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LLMClient } from '../ai/llmClient';
import { BetaAnalysis } from '../beta/analysis';
import { BetaEngineRepository } from '../beta/engineRepository';
import { BetaFinancial } from '../beta/financial';
import { BetaImports } from '../beta/imports';
import { BetaStore } from '../beta/store';
import profile from '../../../user-inputs/synthetic/backend-review/profile.json';

const fixtureDirectory = fileURLToPath(new URL('../../../user-inputs/synthetic/backend-review/', import.meta.url));
const live = process.argv.includes('--live');
const store = new BetaStore({ filename: ':memory:' });

function log(stage: string, output: unknown): void {
  console.log(JSON.stringify({ stage, output }, null, 2));
}

try {
  if (process.argv.slice(2).some(arg => arg !== '--live') || !profile.fixtureOnly) {
    throw new Error('Usage: tsx src/scripts/inspect-review.ts [--live] (bundled synthetic data only)');
  }

  const user = { id: randomUUID(), name: profile.name, email: profile.email };
  const financial = new BetaFinancial(store);
  const imports = new BetaImports(store, financial);
  const llm = new LLMClient({
    mockMode: !live,
    ...(live ? {} : { geminiApiKey: '', openaiApiKey: '' }),
  });
  const now = () => new Date(profile.asOf);
  const analysis = new BetaAnalysis(store, financial, llm, {
    now,
    onSyntheticCall: call => log('llm_call', call),
  });
  const repository = new BetaEngineRepository(store, user, financial, { referenceNowIso: profile.asOf });

  const initial = financial.get(user);
  let current = financial.save(user, {
    expectedVersion: initial.version,
    aiConsent: true,
    experimentalRecommendations: true,
    state: {
      ...initial.state,
      accounts: profile.accounts.map(account => ({
        ...account, userId: user.id, createdAt: profile.asOf, updatedAt: profile.asOf,
      })),
      incomes: profile.incomes.map(income => ({ ...income, userId: user.id, createdAt: profile.asOf })),
      expenseCommitment: { ...profile.expenseCommitment, userId: user.id, updatedAt: profile.asOf },
      obligations: profile.obligations.map(obligation => ({ ...obligation, userId: user.id, createdAt: profile.asOf })),
      debts: profile.debts.map(debt => ({ ...debt, userId: user.id, createdAt: profile.asOf })),
      goals: profile.goals.map(goal => ({ ...goal, userId: user.id, createdAt: profile.asOf })),
      goalAllocations: profile.goalAllocations.map(allocation => ({ ...allocation, userId: user.id })),
      onboarding: {
        ...initial.state.onboarding, status: 'completed', completedAt: profile.asOf, debtQuestionAnswer: 'yes',
      },
    },
  });
  log('run', { profile: profile.name, asOf: profile.asOf, mode: live ? 'live_requested' : 'deterministic' });

  for (const statement of profile.statements) {
    const preview = await imports.preview(user, {
      ...statement,
      contentBase64: readFileSync(resolve(fixtureDirectory, statement.fileName)).toString('base64'),
    });
    log('statement_preview', {
      file: statement.fileName,
      statement: preview.statement,
      status: preview.status,
      parsedTransactions: preview.transactions.length,
      rejectedRows: preview.rejectedRows,
      message: preview.message,
    });
    current = imports.confirm(user, preview.id, current.version);
  }
  log('imported_state', {
    transactions: current.state.transactions.length,
    balances: current.state.balances,
    transferMatches: current.state.transferMatches,
    confirmations: current.state.confirmations,
  });

  const result = await analysis.review(user, current.version);
  for (const agent of ['BehaviorAgent', 'DebtAgent']) {
    log(agent, repository.getAgentResult(user.id, user.id, agent));
  }
  log('analysis', {
    status: result.status,
    readiness: result.readinessState,
    decisionStatus: result.decisionStatus,
    policyVersion: result.policyVersion,
    provenance: result.provenance,
    freshness: result.agentFreshness,
  });
  log('decision_trace', analysis.getTrace(user, result.traceId));
  log('recommendation', result.recommendation);
} finally {
  store.close();
}
