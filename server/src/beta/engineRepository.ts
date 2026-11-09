import { z } from 'zod';
import { memoryFingerprint, type ConversationMessage } from '../ai/conversationMemory';
import { AnalysisArtifactSchema, ChatMemorySchema, type AnalysisArtifact } from '@shared/contracts/pipeline';
import type { CalculatorContextExtras } from '../../../shared/calculator';
import type { DecisionTrace, RecommendationDecision, WeightProfileId } from '../../../shared/contracts';
import type { ActionFeedback, AssistantMessage, FinancialSnapshot, FXRateEntry, RecommendationRecord } from '../../../shared/pi/types';
import type { PIDatabaseSeed } from '../../../react-app/src/database/seed';
import { buildFinancialSnapshot } from '../../../react-app/src/services/snapshotBuilder';
import { SecurityService } from '../security/securityService';
import type { AgentResultRow, EvaluationRunRow, PublishedRecommendationBundle, SavePIStateInput, StoredPIStateEnvelope } from '../db/sqliteStore';
import type { EngineRepository } from '../orchestrator/reviewWorkflow';
import { BetaError, BetaFinancial, BetaState } from './financial';
import type { BetaStore } from './store';

type User = { id: string; name: string; email: string };
type Feedback = ActionFeedback & { actionId: string | null; snapshotId: string };
interface EngineData {
  snapshots: Record<string, StoredPIStateEnvelope>;
  derivedSnapshots?: Record<string, StoredPIStateEnvelope>;
  agents: Record<string, AgentResultRow<any>>;
  evaluations: EvaluationRunRow[];
  traces: Record<string, { trace: DecisionTrace; decision: RecommendationDecision }>;
  recommendations: PublishedRecommendationBundle[];
  feedback: Feedback[];
  messages: AssistantMessage[];
  fx: FXRateEntry[];
}

const feedbackSchema = z.object({
  id: z.string(), recommendationId: z.string(),
  action: z.enum(['accept', 'adjust', 'decline', 'complete']),
  amount: z.number().nullable(), note: z.string(), timestamp: z.string(),
  actionId: z.string().nullable().optional(), snapshotId: z.string().optional(),
}).passthrough();

const objectRecord = z.record(z.object({}).passthrough());
const engineDocumentSchema = z.object({
  snapshots: objectRecord.default({}),
  derivedSnapshots: objectRecord.optional(),
  agents: z.record(z.object({ userId: z.string(), agentName: z.string(), inputHash: z.string(),
    policyVersion: z.string(), output: z.unknown(), createdAt: z.string() }).passthrough()).default({}),
  evaluations: z.array(z.object({ evaluationId: z.string(), userId: z.string(), status: z.string() }).passthrough()).default([]),
  traces: z.record(z.object({ trace: z.object({ stageArtifactIds: z.array(z.string()).optional() }).passthrough(),
    decision: z.object({}).passthrough() }).passthrough()).default({}),
  recommendations: z.array(z.object({ recommendation: z.object({}).passthrough(), decision: z.object({}).passthrough(),
    trace: z.object({ stageArtifactIds: z.array(z.string()).optional() }).passthrough() }).passthrough()).default([]),
  feedback: z.array(feedbackSchema).default([]),
  messages: z.array(z.object({ id: z.string(), userId: z.string(), role: z.string(), content: z.string(), createdAt: z.string() }).passthrough()).default([]),
  fx: z.array(z.object({ base: z.string(), target: z.string(), rate: z.number(), rateDate: z.string(),
    fetchedAt: z.string(), status: z.enum(['OK', 'STALE', 'UNAVAILABLE']), source: z.string() }).passthrough()).default([]),
}).passthrough();

/** Existing engine semantics backed by beta's encrypted, user-bound documents. */
export class BetaEngineRepository implements EngineRepository {
  private aborted = false;
  private expectedVersion: number;
  private transactionDepth = 0;

  constructor(private store: BetaStore, private user: User, private financial: BetaFinancial, private options: { referenceNowIso?: string } = {}) {
    this.expectedVersion = this.financial.get(user).version;
  }

  abort(): void { this.aborted = true; }

  private authorize(authenticatedUserId: string, targetUserId: string): void {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    if (targetUserId !== this.user.id) throw new BetaError('FORBIDDEN', 'Repository belongs to another user.', 403);
  }

  private current(): BetaState {
    const state = this.store.get(this.user.id, 'state') as BetaState | null;
    if (!state) throw new BetaError('SUPERSEDED', 'Profile no longer exists.', 409);
    return state;
  }

  private assertWritable(): void {
    if (this.aborted || this.current().version !== this.expectedVersion) {
      throw new BetaError('SUPERSEDED', 'Profile changed during evaluation.', 409);
    }
  }

  private data(): EngineData {
    const existing = this.store.get(this.user.id, 'engine');
    const parsed = engineDocumentSchema.safeParse(existing ?? {});
    const legacy = z.array(feedbackSchema).safeParse(this.current().state.actionFeedback ?? []);
    if (!parsed.success || !legacy.success) {
      throw new BetaError('INVALID_ENGINE_DOCUMENT', 'Stored engine data requires repair.', 409);
    }
    const data = parsed.data;
    const feedback = new Map(data.feedback.map(row => [row.id, row]));
    for (const row of legacy.data) if (!feedback.has(row.id)) feedback.set(row.id, row);
    data.feedback = [...feedback.values()].map(row => ({ ...row, actionId: row.actionId ?? null, snapshotId: row.snapshotId ?? '' }));
    const normalized = data as unknown as EngineData;
    // Upgrade only writable existing documents. Defaults describe absent legacy collections.
    if (existing !== null && JSON.stringify(existing) !== JSON.stringify(data) &&
        !this.aborted && this.current().version === this.expectedVersion) {
      this.runInTransaction(() => {
        this.write(normalized);
        const current = this.current();
        this.store.put(this.user.id, 'state', { ...current, state: { ...current.state, actionFeedback: [] } });
      });
    }
    return normalized;
  }

  private write(data: EngineData): void {
    this.assertWritable();
    this.store.put(this.user.id, 'engine', data);
  }

  runInTransaction<T>(operation: () => T): T {
    this.assertWritable();
    const savepoint = `engine_${this.transactionDepth++}`;
    const previousVersion = this.expectedVersion;
    this.store.database.exec(`SAVEPOINT ${savepoint}`);
    try {
      const result = operation();
      this.store.database.exec(`RELEASE SAVEPOINT ${savepoint}`);
      return result;
    } catch (error) {
      this.expectedVersion = previousVersion;
      this.store.database.exec(`ROLLBACK TO SAVEPOINT ${savepoint}`);
      this.store.database.exec(`RELEASE SAVEPOINT ${savepoint}`);
      throw error;
    } finally { this.transactionDepth--; }
  }

  getPIState(auth: string, target: string, _autoSeedDemo = false): StoredPIStateEnvelope | null {
    this.authorize(auth, target);
    const current = this.current();
    const version = `${current.version}.0`;
    const data = this.data();
    const existing = data.snapshots[version];
    if (existing) return this.deriveEnvelope(existing, current);
    const snapshot = buildFinancialSnapshot(current.state, { referenceNowIso: this.referenceNow() });
    snapshot.userId = target;
    snapshot.version = version;
    snapshot.id = `snap_beta_${target}_v${current.version}`;
    const previous = Object.values(data.snapshots).at(-1);
    const seed = structuredClone(current.state);
    const { recommendations: _recommendations, assistantMessages: _messages, actionFeedback: _feedback, ...input } = seed;
    const envelope: StoredPIStateEnvelope = {
      userId: target, version, versionNumber: current.version,
      inputHash: SecurityService.computeCanonicalHash(input), snapshot, seed,
      calculatorExtras: previous?.calculatorExtras,
      userConfirmedUnusedSubscriptionIds: previous?.userConfirmedUnusedSubscriptionIds,
      verifiedCancellationTermsByTargetId: previous?.verifiedCancellationTermsByTargetId,
      verifiedAccountFeeSchedules: previous?.verifiedAccountFeeSchedules,
      verifiedUkDpcAgreement: previous?.verifiedUkDpcAgreement,
      updatedAt: new Date().toISOString(),
    };
    // Reads of a newer profile are allowed for the stale-publication guard, but an old repository cannot write it.
    if (current.version === this.expectedVersion && !this.aborted) {
      data.snapshots[version] = envelope;
      this.write(data);
    }
    return this.deriveEnvelope(envelope, current);
  }

  private referenceNow(): string {
    return this.options.referenceNowIso || new Date().toISOString();
  }

  /** Preserve source snapshots while refreshing views whose meaning changes with time. */
  private deriveEnvelope(original: StoredPIStateEnvelope, current: BetaState): StoredPIStateEnvelope {
    const referenceNowIso = this.referenceNow();
    const snapshot = buildFinancialSnapshot(original.seed || current.state, { referenceNowIso });
    const { id: _id, createdAt: _createdAt, version: _version, ...semanticView } = snapshot;
    const viewHash = SecurityService.computeCanonicalHash({ day: referenceNowIso.slice(0, 10), snapshot: semanticView });
    const key = `${original.version}:${viewHash}`;
    const data = this.data();
    const cached = data.derivedSnapshots?.[key];
    if (cached) return { ...cached, seed: structuredClone(current.state) };
    snapshot.userId = this.user.id;
    snapshot.version = original.version;
    snapshot.id = `${original.snapshot.id}_${viewHash.slice(0, 16)}`;
    const derived: StoredPIStateEnvelope = {
      ...original,
      snapshot,
      inputHash: SecurityService.computeCanonicalHash({ source: original.inputHash, viewHash }),
      calculatorExtras: { ...original.calculatorExtras, referenceDateIso: referenceNowIso.slice(0, 10) },
    };
    if (current.version === this.expectedVersion && !this.aborted) {
      data.derivedSnapshots = { ...data.derivedSnapshots, [key]: derived };
      this.write(data);
    }
    return { ...derived, seed: structuredClone(current.state) };
  }

  getLatestSnapshotVersion(auth: string, target: string): string | null {
    this.authorize(auth, target);
    const current = this.store.get(target, 'state') as BetaState | null;
    return current ? `${current.version}.0` : null;
  }

  savePIState(auth: string, target: string, input: SavePIStateInput | FinancialSnapshot | PIDatabaseSeed): StoredPIStateEnvelope {
    this.authorize(auth, target);
    return this.runInTransaction(() => {
      const current = this.current();
      const update = 'accounts' in input ? { seed: input as PIDatabaseSeed } : 'accountSummaries' in input ? { snapshot: input as FinancialSnapshot } : input as SavePIStateInput;
      let seed = update.seed ? structuredClone(update.seed) : structuredClone(current.state);
      if (!update.seed && update.snapshot) seed = this.seedFromSnapshot(seed, update.snapshot);
      const history = this.data();
      seed.recommendations = history.recommendations.map(row => row.recommendation);
      seed.actionFeedback = [];
      seed.user = current.state.user;
      seed.profile.userId = target;
      const next = { ...current, version: current.version + 1, state: seed };
      this.store.put(target, 'state', next);
      this.expectedVersion = next.version;
      this.getPIState(auth, target);
      const data = this.data();
      const envelope = data.snapshots[`${next.version}.0`];
      for (const key of ['calculatorExtras', 'userConfirmedUnusedSubscriptionIds', 'verifiedCancellationTermsByTargetId', 'verifiedAccountFeeSchedules', 'verifiedUkDpcAgreement'] as const) {
        if (update[key] !== undefined) (envelope as any)[key] = update[key];
      }
      envelope.calculatorExtras = { ...envelope.calculatorExtras, ...update.calculatorExtras, ...(update.scheduledTransfers ? { scheduledTransfers: update.scheduledTransfers } : {}), ...(update.debtTerms ? { debtTerms: update.debtTerms } : {}) };
      data.snapshots[envelope.version] = envelope;
      data.derivedSnapshots = Object.fromEntries(Object.entries(data.derivedSnapshots || {}).filter(([, view]) => view.version !== envelope.version));
      this.write(data);
      this.store.remove(target, 'analysis');
      return this.deriveEnvelope(envelope, next);
    });
  }

  private seedFromSnapshot(seed: PIDatabaseSeed, snapshot: FinancialSnapshot): PIDatabaseSeed {
    return { ...seed, profile: snapshot.profile, preferences: snapshot.preferences, onboarding: snapshot.onboarding,
      accounts: snapshot.accountSummaries.map(a => a.account),
      balances: snapshot.accountSummaries.flatMap(a => a.balanceHistory), incomes: snapshot.incomeSources,
      expenseCommitment: snapshot.essentialCommitment, obligations: snapshot.obligations, debts: snapshot.debts,
      goals: snapshot.goals, goalAllocations: snapshot.goalAllocations, transactions: snapshot.transactions,
      classifications: Object.values(snapshot.classifications), statements: snapshot.statements,
      transferMatches: snapshot.transferMatches, confirmations: snapshot.confirmations };
  }

  syncFromSnapshot(snapshot: FinancialSnapshot, expectedVersion: number): BetaState {
    this.assertWritable();
    const current = this.current();
    if (current.version !== expectedVersion) throw new BetaError('SUPERSEDED', 'Profile changed.', 409);
    const existing = new Map(current.state.classifications.map(c => [c.transactionId, c]));
    for (const classification of Object.values(snapshot.classifications)) {
      if (existing.get(classification.transactionId)?.status !== 'user_confirmed') existing.set(classification.transactionId, classification);
    }
    const confirmations = new Map(current.state.confirmations.map(c => [c.id, c]));
    for (const confirmation of snapshot.confirmations) if (!confirmations.has(confirmation.id)) confirmations.set(confirmation.id, confirmation);
    const result = { ...current, state: { ...current.state, classifications: [...existing.values()], confirmations: [...confirmations.values()] } };
    this.store.put(this.user.id, 'state', result);
    return result;
  }

  getConversationContextVersion(auth: string, target: string): string {
    this.authorize(auth, target);
    return memoryFingerprint((this.store.get(target, 'chat') as ConversationMessage[] | null) ?? []);
  }

  getConversationMemory(auth: string, target: string) {
    this.authorize(auth, target);
    const memory = this.store.get(target, 'chat-memory');
    if (memory === null) return null;
    const parsed = ChatMemorySchema.parse(memory);
    if (parsed.status === 'CURRENT' && parsed.inputHash !== this.getConversationContextVersion(auth, target)) {
      return { ...parsed, status: 'STALE' as const };
    }
    return parsed;
  }

  saveStageArtifacts(auth: string, target: string, artifacts: AnalysisArtifact[]): void {
    this.authorize(auth, target);
    const validated = artifacts.map(item => AnalysisArtifactSchema.parse(item));
    if (validated.some(artifact => artifact.userId !== target)) {
      throw new BetaError('FORBIDDEN', 'Artifact belongs to another user.', 403);
    }
    this.runInTransaction(() => {
      for (const artifact of validated) this.store.put(target, 'stage:' + artifact.id, artifact);
    });
  }

  pruneStageArtifacts(auth: string, target: string): string[] {
    this.authorize(auth, target);
    return this.runInTransaction(() => {
      const data = this.data();
      const rows = this.store.database.prepare(
        "SELECT doc_key FROM beta_documents WHERE user_id=? AND doc_key LIKE 'stage:%' ORDER BY rowid",
      ).all(target) as { doc_key: string }[];
      const artifacts = rows.map(row => {
        const artifact = AnalysisArtifactSchema.parse(this.store.get(target, row.doc_key));
        if (artifact.userId !== target || row.doc_key !== 'stage:' + artifact.id) {
          throw new BetaError('INVALID_STAGE_ARTIFACT', 'Artifact identity does not match its storage key.', 409);
        }
        return artifact;
      });
      const byId = new Map(artifacts.map(artifact => [artifact.id, artifact]));
      const retained = new Set<string>();
      const latest = new Map<string, AnalysisArtifact>();
      const reusable = new Map<string, AnalysisArtifact>();
      for (const artifact of artifacts) {
        const previous = latest.get(artifact.stage);
        if (!previous || artifact.executedAt >= previous.executedAt) latest.set(artifact.stage, artifact);
        const previousReusable = reusable.get(artifact.stage);
        if ((artifact.status === 'COMPLETED' || artifact.status === 'CACHED') &&
            (!previousReusable || artifact.executedAt >= previousReusable.executedAt)) {
          reusable.set(artifact.stage, artifact);
        }
      }
      for (const artifact of [...latest.values(), ...reusable.values()]) retained.add(artifact.id);
      for (const bundle of [...Object.values(data.traces), ...data.recommendations]) {
        for (const id of bundle.trace.stageArtifactIds ?? []) retained.add(id);
      }
      for (const artifact of artifacts) {
        if (data.evaluations.some(run => run.evaluationId === artifact.runId && run.status === 'IN_PROGRESS')) {
          retained.add(artifact.id);
        }
      }
      const pending = [...retained];
      for (let index = 0; index < pending.length; index++) {
        for (const upstream of byId.get(pending[index])?.upstreamIds ?? []) {
          if (!retained.has(upstream)) { retained.add(upstream); pending.push(upstream); }
        }
      }
      const removed = artifacts.filter(artifact => !retained.has(artifact.id)).map(artifact => artifact.id);
      for (const id of removed) this.store.remove(target, 'stage:' + id);
      return removed;
    });
  }

  getStageArtifact(auth: string, target: string, id: string): AnalysisArtifact | null {
    this.authorize(auth, target);
    const stored = this.store.get(target, 'stage:' + id);
    if (stored === null) return null;
    const artifact = AnalysisArtifactSchema.parse(stored);
    if (artifact.userId !== target || artifact.id !== id) {
      throw new BetaError('INVALID_STAGE_ARTIFACT', 'Artifact identity does not match its storage key.', 409);
    }
    return artifact;
  }

  getAgentResult<T = unknown>(auth: string, target: string, agentName: string): AgentResultRow<T> | null {
    this.authorize(auth, target); return this.data().agents[agentName] as AgentResultRow<T> || null;
  }
  saveAgentResult<T = unknown>(auth: string, target: string, agentName: string, inputHash: string, policyVersion: string, output: T): AgentResultRow<T> {
    this.authorize(auth, target);
    const row = { userId: target, agentName, inputHash, policyVersion, output, createdAt: new Date().toISOString() };
    const data = this.data(); data.agents[agentName] = row; this.write(data); return row;
  }
  createEvaluationRun(auth: string, target: string, params: Parameters<EngineRepository['createEvaluationRun']>[2]): EvaluationRunRow {
    this.authorize(auth, target);
    const status = params.status || 'IN_PROGRESS'; const now = new Date().toISOString();
    const row = { ...params, userId: target, status, createdAt: now, completedAt: status === 'IN_PROGRESS' ? null : now };
    const data = this.data(); data.evaluations = data.evaluations.filter(e => e.evaluationId !== row.evaluationId); data.evaluations.push(row); this.write(data); return row;
  }
  updateEvaluationRunStatus(auth: string, target: string, id: string, status: EvaluationRunRow['status']): void {
    this.authorize(auth, target); const data = this.data(); const row = data.evaluations.find(e => e.evaluationId === id); if (row) { row.status = status; row.completedAt = new Date().toISOString(); this.write(data); }
  }
  getLatestEvaluationRun(auth: string, target: string): EvaluationRunRow | null { this.authorize(auth, target); return this.data().evaluations.at(-1) || null; }
  saveDecisionTrace(auth: string, target: string, trace: DecisionTrace, decision: RecommendationDecision): void {
    this.authorize(auth, target); const data = this.data(); data.traces[trace.evaluationId] = { trace, decision }; this.write(data);
  }
  getDecisionTrace(auth: string, target: string, id: string) { this.authorize(auth, target); return this.data().traces[id] || null; }
  getLatestWeightProfileId(auth: string, target: string): WeightProfileId | null {
    this.authorize(auth, target); return Object.values(this.data().traces).reverse().find(t => t.trace.weightSelection?.profileId)?.trace.weightSelection?.profileId || null;
  }
  saveRecommendation(auth: string, target: string, recommendation: RecommendationRecord, decision: RecommendationDecision): void {
    this.authorize(auth, target);
    this.runInTransaction(() => {
      const data = this.data();
      data.recommendations = data.recommendations.filter(row => row.recommendation.id !== recommendation.id);
      data.recommendations.push({ recommendation, decision, trace: decision.trace, snapshotVersion: decision.snapshotVersion, updatedAt: recommendation.updatedAt });
      this.write(data);
      const current = this.current();
      this.store.put(target, 'state', { ...current, state: { ...current.state, recommendations: data.recommendations.map(row => row.recommendation) } });
      this.pruneStageArtifacts(auth, target);
    });
  }
  getRecommendationById(auth: string, target: string, id: string) { this.authorize(auth, target); return this.data().recommendations.find(r => r.recommendation.id === id) || null; }
  getLatestRecommendationBundle(auth: string, target: string) { this.authorize(auth, target); return this.data().recommendations.at(-1) || null; }
  listRecommendationsForUser(auth: string, target: string) { this.authorize(auth, target); return this.data().recommendations.slice().reverse().map(r => r.recommendation); }
  listPendingFinancialCommitments(auth: string, target: string, excludeRecommendationId?: string): NonNullable<CalculatorContextExtras['pendingFinancialCommitments']> {
    this.authorize(auth, target);
    return this.data().recommendations.filter(r => ['accepted', 'adjusted'].includes(r.recommendation.status) && r.recommendation.id !== excludeRecommendationId && r.decision.candidate && ['A001', 'A002', 'A007', 'A008', 'A010', 'A012'].includes(r.decision.selectedActionId || '')).flatMap(r => {
      const amount = r.recommendation.adjustedAmount ?? r.recommendation.suggestedAmount;
      return amount !== null && Number.isFinite(amount) && amount > 0 ? [{ recommendationId: r.recommendation.id, actionId: r.decision.selectedActionId!, sourceAccountId: r.decision.candidate!.sourceAccountId, amount, currency: r.recommendation.currency }] : [];
    });
  }
  recordActionFeedback(auth: string, target: string, feedback: ActionFeedback & { actionId?: string | null; snapshotId: string }): ActionFeedback {
    this.authorize(auth, target); const data = this.data(); if (data.feedback.some(f => f.id === feedback.id)) return data.feedback.find(f => f.id === feedback.id)!;
    return this.runInTransaction(() => {
      data.feedback.push({ ...feedback, actionId: feedback.actionId || null });
      this.write(data);
      const current = this.current();
      if (current.state.actionFeedback?.length) {
        this.store.put(target, 'state', { ...current, state: { ...current.state, actionFeedback: [] } });
      }
      return feedback;
    });
  }
  listActionFeedbackForUser(auth: string, target: string): Feedback[] { this.authorize(auth, target); return this.data().feedback.slice().reverse(); }
  saveAssistantMessage(auth: string, target: string, message: AssistantMessage): void { this.authorize(auth, target); const data = this.data(); data.messages = data.messages.filter(m => m.id !== message.id); data.messages.push(message); this.write(data); }
  listAssistantMessages(auth: string, target: string, limit = 100): AssistantMessage[] { this.authorize(auth, target); return this.data().messages.slice(-limit); }
  getCachedFXRate(base: string, target: string, rateDate?: string): FXRateEntry | null { return this.data().fx.slice().reverse().find(f => f.base === base && f.target === target && (!rateDate || f.rateDate === rateDate)) || null; }
  upsertFXRate(entry: FXRateEntry): void { const data = this.data(); data.fx = data.fx.filter(f => !(f.base === entry.base && f.target === entry.target && f.rateDate === entry.rateDate)); data.fx.push(entry); this.write(data); }
}

