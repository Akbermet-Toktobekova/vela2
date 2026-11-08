import { afterEach, describe, expect, it, vi } from 'vitest';
import { BetaStore } from '../src/beta/store';
import { BetaFinancial } from '../src/beta/financial';
import { BetaEngineRepository } from '../src/beta/engineRepository';
import type { AnalysisArtifact } from '@shared/contracts/pipeline';

const user = { id: 'artifact-owner', name: 'Fixture', email: 'fixture@example.test' };
const stores: BetaStore[] = [];
afterEach(() => { vi.restoreAllMocks(); for (const store of stores.splice(0)) store.close(); });
function setup() {
  const store = new BetaStore({ filename: ':memory:' }); stores.push(store);
  const financial = new BetaFinancial(store); financial.get(user);
  const repository = new BetaEngineRepository(store, user, financial);
  return { store, financial, repository };
}
function artifact(id: string, executedAt: string, changes: Partial<AnalysisArtifact> = {}): AnalysisArtifact {
  return { schemaVersion: 1, id, userId: user.id, runId: id.split(':')[0], stage: 'classification',
    snapshotId: 'snapshot', snapshotVersion: '0.0', inputHash: id, dependencies: {},
    referenceDate: '2026-11-05', executedAt, policyVersion: 'fixture', status: 'COMPLETED',
    missingInputs: [], evidenceIds: [], upstreamIds: [], models: [], output: { summary: 'private result' }, ...changes };
}
const first = '2026-11-08T10:00:00Z';
const second = '2026-11-08T11:00:00Z';

describe('Versioned analysis storage', () => {
  it('upgrades absent legacy collections and merges feedback without losing history or extension fields', () => {
    const { store, financial, repository } = setup();
    const current = financial.get(user);
    const oldFeedback = { id: 'old', recommendationId: 'rec', action: 'decline', amount: null, note: 'historic', timestamp: first };
    store.put(user.id, 'state', { ...current, state: { ...current.state, actionFeedback: [oldFeedback] } });
    store.put(user.id, 'engine', { agents: {}, customLegacyEvidence: { preserve: true } });
    expect(repository.listActionFeedbackForUser(user.id, user.id)).toEqual([{ ...oldFeedback, actionId: null, snapshotId: '' }]);
    expect(store.get(user.id, 'engine')).toMatchObject({ customLegacyEvidence: { preserve: true }, feedback: [{ id: 'old' }], snapshots: {} });
    expect((store.get(user.id, 'state') as any).state.actionFeedback).toEqual([]);
    expect(financial.get(user).state.actionFeedback).toHaveLength(1);
  });

  it('fails closed on malformed stored collections without resetting the original document', () => {
    const { store, repository } = setup();
    const malformed = { agents: {}, feedback: 'corrupted' };
    store.put(user.id, 'engine', malformed);
    expect(() => repository.listActionFeedbackForUser(user.id, user.id)).toThrow('requires repair');
    expect(store.get(user.id, 'engine')).toEqual(malformed);
  });

  it('rolls legacy migration back if clearing the redundant PI projection fails', () => {
    const { store, financial, repository } = setup();
    const current = financial.get(user);
    const feedback = { id: 'legacy', recommendationId: 'rec', action: 'accept', amount: null, note: '', timestamp: first };
    const state = { ...current, state: { ...current.state, actionFeedback: [feedback] } };
    store.put(user.id, 'state', state); store.put(user.id, 'engine', { agents: {} });
    const put = store.put.bind(store);
    vi.spyOn(store, 'put').mockImplementation((id, key, value) => {
      if (key === 'state') throw new Error('simulated write failure');
      put(id, key, value);
    });
    expect(() => repository.listActionFeedbackForUser(user.id, user.id)).toThrow('simulated write failure');
    expect(store.get(user.id, 'engine')).toEqual({ agents: {} });
    expect(store.get(user.id, 'state')).toEqual(state);
  });

  it('validates the full batch before writing artifacts and encrypts successful output', () => {
    const { store, repository } = setup();
    const valid = artifact('one:classification', first);
    expect(() => repository.saveStageArtifacts(user.id, user.id, [valid, { ...valid, id: 'foreign', userId: 'other' }])).toThrow();
    expect(repository.getStageArtifact(user.id, user.id, valid.id)).toBeNull();
    repository.saveStageArtifacts(user.id, user.id, [valid]);
    const row = store.database.prepare('SELECT payload FROM beta_documents WHERE user_id=? AND doc_key=?').get(user.id, 'stage:' + valid.id) as { payload: string };
    expect(row.payload).not.toContain('private result');
    expect(() => repository.getStageArtifact(user.id, 'other', valid.id)).toThrow();
    expect(() => repository.pruneStageArtifacts(user.id, 'other')).toThrow();
  });

  it('prunes superseded unpublished artifacts while preserving latest results, published evidence and upstream dependencies', () => {
    const { store, repository } = setup();
    const old = artifact('old:classification', first);
    const published = artifact('published:classification', first, { upstreamIds: ['old:classification'] });
    const disposable = artifact('unused:classification', first);
    const latest = artifact('new:classification', second);
    repository.saveStageArtifacts(user.id, user.id, [old, published, disposable, latest]);
    store.put(user.id, 'engine', { traces: { published: { trace: { stageArtifactIds: [published.id] }, decision: {} } } });
    expect(repository.pruneStageArtifacts(user.id, user.id)).toEqual([disposable.id]);
    for (const record of [old, published, latest]) expect(repository.getStageArtifact(user.id, user.id, record.id)).toEqual(record);
  });

  it('keeps the last successful reusable result when a newer attempt failed', () => {
    const { repository } = setup();
    const successful = artifact('good:classification', first);
    const failed = artifact('failed:classification', second, { status: 'FAILED' });
    repository.saveStageArtifacts(user.id, user.id, [successful, failed]);
    expect(repository.pruneStageArtifacts(user.id, user.id)).toEqual([]);
    expect(repository.getStageArtifact(user.id, user.id, successful.id)).toEqual(successful);
  });

  it('keeps in-progress evidence and rolls pruning back with its enclosing transaction', () => {
    const { store, repository } = setup();
    const pending = artifact('pending:classification', first);
    const old = artifact('old:classification', first);
    const latest = artifact('new:classification', second);
    repository.saveStageArtifacts(user.id, user.id, [pending, old, latest]);
    store.put(user.id, 'engine', { evaluations: [{ evaluationId: 'pending', userId: user.id, status: 'IN_PROGRESS' }] });
    expect(() => repository.runInTransaction(() => {
      expect(repository.pruneStageArtifacts(user.id, user.id)).toEqual([old.id]);
      throw new Error('outer rollback');
    })).toThrow('outer rollback');
    expect(repository.getStageArtifact(user.id, user.id, old.id)).toEqual(old);
    expect(repository.pruneStageArtifacts(user.id, user.id)).toEqual([old.id]);
    expect(repository.getStageArtifact(user.id, user.id, pending.id)).toEqual(pending);
  });
});
