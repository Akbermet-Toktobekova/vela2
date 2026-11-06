import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach,describe,expect,it } from 'vitest';
import policy from '../config/prototype-policy.json';
import { LLMClient } from '../src/ai/llmClient';
import { BetaEngineRepository } from '../src/beta/engineRepository';
import { BetaFinancial } from '../src/beta/financial';
import { BetaStore } from '../src/beta/store';
import { ReviewOrchestrator } from '../src/orchestrator/reviewWorkflow';
import { createDemoSeedData } from './fixtures/profile';
const user = { id: 'user_demo_alex', name: 'Alex', email: 'alex@example.com' };
const stores: BetaStore[] = [];
const directories: string[] = [];
function setup(filename = ':memory:', key?: Buffer) {
  const store = new BetaStore({ filename, key }); stores.push(store);
  const financial = new BetaFinancial(store); financial.get(user);
  return { store, financial, repository: new BetaEngineRepository(store, user, financial) };
}
afterEach(() => {
  for (const store of stores.splice(0)) store.close();
  for (const directory of directories.splice(0)) fs.rmSync(directory, { recursive: true, force: true });
});
describe('Persistent beta engine repository', () => {
  it('reuses cached agents and decision after storage restart', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vela-engine-')); directories.push(directory);
    const filename = path.join(directory, 'beta.sqlite'); const key = randomBytes(32);
    const first = setup(filename, key); const initial = first.financial.get(user);
    const seed = createDemoSeedData(); seed.user.email = user.email; seed.user.isDemoMode = false;
    first.store.put(user.id, 'state', { ...initial, state: seed });
    const result = await new ReviewOrchestrator({ store: first.repository, llmClient: new LLMClient({ mockMode: true }) }).runReviewCycle({ authenticatedUserId: user.id, targetUserId: user.id });
    const agent = first.repository.getAgentResult(user.id, user.id, 'BehaviorAgent');
    expect(agent).not.toBeNull();
    expect(first.repository.getDecisionTrace(user.id, user.id, result.evaluationId)).not.toBeNull();
    const snapshot = first.repository.getPIState(user.id, user.id)!.snapshot;
    first.store.close(); const second = setup(filename, key);
    expect(second.repository.getPIState(user.id, user.id)!.snapshot).toEqual(snapshot);
    expect(second.repository.getAgentResult(user.id, user.id, 'BehaviorAgent')).toEqual(agent);
    const repeated = await new ReviewOrchestrator({ store: second.repository, llmClient: new LLMClient({ mockMode: true }) }).runReviewCycle({ authenticatedUserId: user.id, targetUserId: user.id });
    expect(repeated.status).toBe('DUPLICATE_SUPPRESSED');
    expect(repeated.evaluationId).toBe(result.evaluationId);
    const raw = second.store.database.prepare('SELECT payload FROM beta_documents WHERE user_id=? AND doc_key=?').get(user.id, 'engine') as any;
    expect(raw.payload).not.toContain('Apartment Rent'); expect(raw.payload).not.toContain('BehaviorAgent');
  });
  it('refreshes time-dependent freshness without mutating the original source snapshot', async () => {
    const { store, financial } = setup();
    const initial = financial.get(user);
    const observed = '2026-11-01T12:00:00.000Z';
    const seed = createDemoSeedData();
    seed.balances = seed.balances.map(balance => ({ ...balance, asOf: observed, sourceType: 'user_reported' }));
    store.put(user.id, 'state', { ...initial, state: seed });
    const boundary = Date.parse(observed) + policy.horizonAndFreshness.staleBalanceThresholdDays * 86400000;
    const beforeBoundary = new Date(boundary - 1000).toISOString();
    const afterBoundary = new Date(boundary + 1000).toISOString();
    const beforeRepository = new BetaEngineRepository(store, user, financial, { referenceNowIso: beforeBoundary });
    const before = beforeRepository.getPIState(user.id, user.id)!;
    const original = structuredClone((store.get(user.id, 'engine') as any).snapshots['0.0']);
    expect(before.snapshot.accountSummaries[0].isStale).toBe(false);
    const beforeReview = await new ReviewOrchestrator({ store: beforeRepository, llmClient: new LLMClient({ mockMode: true }) }).runReviewCycle({ authenticatedUserId: user.id, targetUserId: user.id, referenceNowIso: beforeBoundary });
    const laterRepository = new BetaEngineRepository(store, user, financial, { referenceNowIso: afterBoundary });
    const later = laterRepository.getPIState(user.id, user.id)!;
    expect(later.snapshot.accountSummaries[0].isStale).toBe(true);
    const laterReview = await new ReviewOrchestrator({ store: laterRepository, llmClient: new LLMClient({ mockMode: true }) }).runReviewCycle({ authenticatedUserId: user.id, targetUserId: user.id, referenceNowIso: afterBoundary });
    expect(laterReview.status).not.toBe('DUPLICATE_SUPPRESSED');
    expect(laterReview.evaluationId).not.toBe(beforeReview.evaluationId);
    expect(laterReview.snapshot.accountSummaries[0].isStale).toBe(true);
    expect(later.snapshot.id).not.toBe(before.snapshot.id);
    expect(later.inputHash).not.toBe(before.inputHash);
    expect(later.version).toBe(before.version);
    expect(financial.get(user).version).toBe(initial.version);
    expect((store.get(user.id, 'engine') as any).snapshots['0.0']).toEqual(original);
    const sameView = new BetaEngineRepository(store, user, financial, { referenceNowIso: new Date(boundary + 2000).toISOString() }).getPIState(user.id, user.id)!;
    expect(sameView.snapshot).toEqual(later.snapshot);
    const tomorrow = new BetaEngineRepository(store, user, financial, { referenceNowIso: new Date(boundary + 86400000).toISOString() }).getPIState(user.id, user.id)!;
    expect(tomorrow.snapshot.createdAt.slice(0, 10)).not.toBe(later.snapshot.createdAt.slice(0, 10));
    expect(tomorrow.snapshot.id).not.toBe(later.snapshot.id);
  });

  it('rejects foreign access, stale writes and writes after abort', () => {
    const { store, financial, repository } = setup();
    expect(() => repository.getPIState(user.id, 'another-user')).toThrow();
    repository.getPIState(user.id, user.id);
    const current = financial.get(user); store.put(user.id, 'state', { ...current, version: current.version + 1 });
    expect(repository.getLatestSnapshotVersion(user.id, user.id)).toBe('1.0');
    expect(() => repository.saveAgentResult(user.id, user.id, 'BehaviorAgent', 'old', 'policy', {})).toThrow('changed');
    const newRepository = new BetaEngineRepository(store, user, financial); newRepository.abort();
    expect(() => newRepository.saveAgentResult(user.id, user.id, 'DebtAgent', 'hash', 'policy', {})).toThrow('changed');
  });
  it('rolls back nested feedback and PI updates together', () => {
    const { financial, repository } = setup(); const before = financial.get(user);
    expect(() => repository.runInTransaction(() => {
      repository.savePIState(user.id, user.id, { seed: before.state });
      repository.recordActionFeedback(user.id, user.id, { id: 'feedback', recommendationId: 'rec', snapshotId: 'snap', action: 'complete', amount: 1, note: 'test', timestamp: new Date().toISOString() });
      throw new Error('rollback');
    })).toThrow('rollback');
    expect(financial.get(user).version).toBe(before.version);
    expect(repository.listActionFeedbackForUser(user.id, user.id)).toEqual([]);
    repository.saveAgentResult(user.id, user.id, 'DebtAgent', 'hash', 'policy', {});
    expect(repository.getAgentResult(user.id, user.id, 'DebtAgent')).not.toBeNull();
  });
  it('preserves user-confirmed values when merging derived classifications', () => {
    const { store, financial, repository } = setup(); const current = financial.get(user);
    const seed = createDemoSeedData(); seed.user.isDemoMode = false; seed.classifications[0].status = 'user_confirmed';
    store.put(user.id, 'state', { ...current, state: seed });
    const snapshot = repository.getPIState(user.id, user.id)!.snapshot;
    const original = structuredClone(seed.classifications[0]);
    snapshot.classifications[original.transactionId] = { ...original, economicType: 'unknown', status: 'auto_classified' };
    const result = repository.syncFromSnapshot(snapshot, current.version);
    expect(result.state.classifications.find(c => c.transactionId === original.transactionId)).toEqual(original);
    expect(result.version).toBe(current.version);
  });
});
