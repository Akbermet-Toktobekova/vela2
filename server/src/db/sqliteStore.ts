import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import {
  ActionFeedback,
  AssistantMessage,
  ExtendedDebtTerms,
  FinancialSnapshot,
  FXRateEntry,
  RecommendationRecord,
  ScheduledAutomaticTransfer,
} from '@shared/pi/types';
import {
  DecisionTrace,
  RecommendationDecision,
  WeightProfileId,
} from '@shared/contracts';
import { CalculatorContextExtras } from '@shared/calculator';
import { ASCatalogRepository } from '../catalog/asCatalogRepository';
import { SecurityService } from '../security/securityService';
import { FXCachePersistence } from '../fx/frankfurterService';
import { createDemoSeedData, PIDatabaseSeed } from '../../../react-app/src/database/seed';
import { buildFinancialSnapshot } from '../../../react-app/src/services/snapshotBuilder';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_SQLITE_PATH = path.resolve(__dirname, '../../data/finagent.sqlite');
const DEFAULT_AS_JSON_PATH = path.resolve(
  __dirname,
  '../../data/as/FinAgent_Normalized_Database.json'
);

export interface StoredPIStateEnvelope {
  userId: string;
  version: string;
  versionNumber: number;
  inputHash: string;
  snapshot: FinancialSnapshot;
  seed?: PIDatabaseSeed;
  calculatorExtras?: CalculatorContextExtras;
  userConfirmedUnusedSubscriptionIds?: string[];
  verifiedCancellationTermsByTargetId?: Record<string, { exitFee: number; canCancel: boolean }>;
  verifiedAccountFeeSchedules?: Record<string, boolean>;
  verifiedUkDpcAgreement?: boolean;
  updatedAt: string;
}

export interface SavePIStateInput {
  snapshot?: FinancialSnapshot;
  seed?: PIDatabaseSeed;
  calculatorExtras?: CalculatorContextExtras;
  scheduledTransfers?: ScheduledAutomaticTransfer[];
  debtTerms?: Record<string, ExtendedDebtTerms>;
  userConfirmedUnusedSubscriptionIds?: string[];
  verifiedCancellationTermsByTargetId?: Record<string, { exitFee: number; canCancel: boolean }>;
  verifiedAccountFeeSchedules?: Record<string, boolean>;
  verifiedUkDpcAgreement?: boolean;
}

export interface AgentResultRow<T = unknown> {
  userId: string;
  agentName: string;
  inputHash: string;
  policyVersion: string;
  output: T;
  createdAt: string;
}

export interface EvaluationRunRow {
  evaluationId: string;
  userId: string;
  snapshotId: string;
  snapshotVersion: string;
  eventType: string;
  inputHash: string;
  policyVersion: string;
  status:
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SUPERSEDED_BY_NEWER_SNAPSHOT'
    | 'DUPLICATE_SUPPRESSED'
    | 'FAILED';
  createdAt: string;
  completedAt: string | null;
}

export interface PublishedRecommendationBundle {
  recommendation: RecommendationRecord;
  decision: RecommendationDecision;
  trace: DecisionTrace;
  snapshotVersion: string;
  updatedAt: string;
}

export class SQLiteStore implements FXCachePersistence {
  /** Synchronous savepoint permits atomic feedback + PI writes, including nested PI saves. */
  public runInTransaction<T>(operation: () => T): T {
    this.db.exec('SAVEPOINT feedback_write');
    try {
      const result = operation();
      this.db.exec('RELEASE SAVEPOINT feedback_write');
      return result;
    } catch (error) {
      this.db.exec('ROLLBACK TO SAVEPOINT feedback_write');
      this.db.exec('RELEASE SAVEPOINT feedback_write');
      throw error;
    }
  }
  public readonly db: DatabaseSync;
  public readonly dbPath: string;

  constructor(customDbPath?: string | { filename?: string; dbPath?: string }) {
    const resolvedPath =
      typeof customDbPath === 'string'
        ? customDbPath
        : customDbPath?.filename || customDbPath?.dbPath;
    this.dbPath = resolvedPath || process.env.FINAGENT_SQLITE_PATH || DEFAULT_SQLITE_PATH;
    if (this.dbPath !== ':memory:') {
      const dir = path.dirname(this.dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
    this.db = new DatabaseSync(this.dbPath);
    this.initializeSchema();
    this.seedCanonicalASTables();
  }

  private initializeSchema(): void {
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email_encrypted TEXT NOT NULL,
        auth_status TEXT NOT NULL,
        is_demo_mode INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS pi_states (
        user_id TEXT PRIMARY KEY,
        version TEXT NOT NULL,
        version_number INTEGER NOT NULL,
        input_hash TEXT NOT NULL,
        encrypted_payload TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS financial_snapshots (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        version TEXT NOT NULL,
        input_hash TEXT NOT NULL,
        encrypted_snapshot_json TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_snapshots_user_version
        ON financial_snapshots(user_id, created_at DESC);

      CREATE TABLE IF NOT EXISTS agent_results (
        user_id TEXT NOT NULL,
        agent_name TEXT NOT NULL,
        input_hash TEXT NOT NULL,
        policy_version TEXT NOT NULL,
        output_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY (user_id, agent_name)
      );

      CREATE TABLE IF NOT EXISTS evaluation_runs (
        evaluation_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        snapshot_id TEXT NOT NULL,
        snapshot_version TEXT NOT NULL,
        event_type TEXT NOT NULL,
        input_hash TEXT NOT NULL,
        policy_version TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        completed_at TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_eval_runs_user
        ON evaluation_runs(user_id, created_at DESC);

      CREATE TABLE IF NOT EXISTS decision_traces (
        evaluation_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        snapshot_id TEXT NOT NULL,
        snapshot_version TEXT NOT NULL,
        decision_status TEXT NOT NULL,
        priority_class TEXT NOT NULL,
        weight_profile_id TEXT,
        trace_json TEXT NOT NULL,
        decision_json TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_decision_traces_user
        ON decision_traces(user_id, created_at DESC);

      CREATE TABLE IF NOT EXISTS recommendations (
        id TEXT PRIMARY KEY,
        evaluation_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        snapshot_id TEXT NOT NULL,
        snapshot_version TEXT NOT NULL,
        action_id TEXT,
        action_type TEXT NOT NULL,
        status TEXT NOT NULL,
        suggested_amount REAL,
        adjusted_amount REAL,
        currency TEXT NOT NULL,
        record_json TEXT NOT NULL,
        decision_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_recommendations_user
        ON recommendations(user_id, updated_at DESC);

      CREATE TABLE IF NOT EXISTS action_feedback (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        recommendation_id TEXT NOT NULL,
        action_id TEXT,
        snapshot_id TEXT NOT NULL,
        action TEXT NOT NULL,
        amount REAL,
        note TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_feedback_user
        ON action_feedback(user_id, timestamp DESC);

      CREATE TABLE IF NOT EXISTS fx_rates_cache (
        base TEXT NOT NULL,
        target TEXT NOT NULL,
        rate_date TEXT NOT NULL,
        rate REAL NOT NULL,
        fetched_at TEXT NOT NULL,
        status TEXT NOT NULL,
        source TEXT NOT NULL,
        PRIMARY KEY (base, target, rate_date)
      );

      CREATE TABLE IF NOT EXISTS assistant_messages (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        tool_used TEXT,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_assistant_messages_user
        ON assistant_messages(user_id, created_at ASC);

      -- 13 Canonical AS Tables (seeded from FinAgent_Normalized_Database.json / ASCatalogRepository)
      CREATE TABLE IF NOT EXISTS as_sources (
        source_id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        issuer TEXT NOT NULL,
        source_type TEXT NOT NULL,
        jurisdiction TEXT NOT NULL,
        retrieval_evidence_status TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_financial_claims (
        claim_id TEXT PRIMARY KEY,
        domain TEXT NOT NULL,
        verification_status TEXT NOT NULL,
        source_primary_id TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_claim_source_mapping (
        mapping_id TEXT PRIMARY KEY,
        claim_id TEXT NOT NULL,
        source_id TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_financial_rules (
        rule_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        approval_status TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_financial_formulas (
        formula_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        expression TEXT NOT NULL,
        approval_status TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_evidence_gaps (
        gap_id TEXT PRIMARY KEY,
        domain TEXT NOT NULL,
        severity TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_action_candidates (
        action_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        action_type TEXT NOT NULL,
        status TEXT NOT NULL,
        approved_for_production TEXT NOT NULL,
        prototype_enabled INTEGER NOT NULL,
        today_enabled INTEGER NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_action_evidence_mapping (
        mapping_id TEXT PRIMARY KEY,
        action_id TEXT NOT NULL,
        claim_id TEXT NOT NULL,
        source_id TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_action_rule_mapping (
        mapping_id TEXT PRIMARY KEY,
        action_id TEXT NOT NULL,
        rule_id TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_action_formula_mapping (
        mapping_id TEXT PRIMARY KEY,
        action_id TEXT NOT NULL,
        formula_id TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_agent_knowledge_mapping (
        mapping_id TEXT PRIMARY KEY,
        agent_name TEXT NOT NULL,
        record_type TEXT NOT NULL,
        record_id TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_verification_audit (
        audit_id TEXT PRIMARY KEY,
        target_type TEXT NOT NULL,
        target_id TEXT NOT NULL,
        audit_status TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS as_version_history (
        version_id TEXT PRIMARY KEY,
        release_date TEXT NOT NULL,
        raw_json TEXT NOT NULL
      );
    `);
  }

  /**
   * Seeds the 13 canonical AS tables from ASCatalogRepository / FinAgent_Normalized_Database.json
   * while strictly preserving canonical statuses ('PENDING_REVIEW', approved_for_production = 'NO').
   */
  private seedCanonicalASTables(): void {
    const existingCount = this.db
      .prepare('SELECT COUNT(*) as cnt FROM as_action_candidates')
      .get() as { cnt: number };
    if (existingCount && existingCount.cnt >= 26) {
      return;
    }

    const catalogSnapshot = ASCatalogRepository.load();
    const rawFile = JSON.parse(fs.readFileSync(DEFAULT_AS_JSON_PATH, 'utf-8'));
    const rawTables = rawFile.tables || {};

    this.db.exec('BEGIN TRANSACTION');
    try {
      const insertSource = this.db.prepare(`
        INSERT OR REPLACE INTO as_sources
          (source_id, title, issuer, source_type, jurisdiction, retrieval_evidence_status, raw_json)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      for (const s of catalogSnapshot.sources) {
        insertSource.run(
          s.source_id,
          s.title,
          s.issuer,
          s.source_type,
          s.jurisdiction,
          s.retrieval_evidence_status,
          JSON.stringify(s)
        );
      }

      const insertClaim = this.db.prepare(`
        INSERT OR REPLACE INTO as_financial_claims
          (claim_id, domain, verification_status, source_primary_id, raw_json)
        VALUES (?, ?, ?, ?, ?)
      `);
      for (const c of catalogSnapshot.allClaims) {
        insertClaim.run(
          c.claim_id,
          c.domain,
          c.verification_status,
          c.source_primary_id,
          JSON.stringify(c)
        );
      }

      const insertClaimSource = this.db.prepare(`
        INSERT OR REPLACE INTO as_claim_source_mapping
          (mapping_id, claim_id, source_id, raw_json)
        VALUES (?, ?, ?, ?)
      `);
      catalogSnapshot.claimSourceMappings.forEach((m, idx) => {
        insertClaimSource.run(
          m.mapping_id || `CSM_${idx + 1}`,
          m.claim_id || '',
          m.source_id || '',
          JSON.stringify(m)
        );
      });

      const insertRule = this.db.prepare(`
        INSERT OR REPLACE INTO as_financial_rules
          (rule_id, name, approval_status, raw_json)
        VALUES (?, ?, ?, ?)
      `);
      for (const r of catalogSnapshot.rules) {
        insertRule.run(r.rule_id, r.name, r.approval_status, JSON.stringify(r));
      }

      const insertFormula = this.db.prepare(`
        INSERT OR REPLACE INTO as_financial_formulas
          (formula_id, name, expression, approval_status, raw_json)
        VALUES (?, ?, ?, ?, ?)
      `);
      for (const f of catalogSnapshot.formulas) {
        insertFormula.run(
          f.formula_id,
          f.name,
          f.expression,
          f.approval_status,
          JSON.stringify(f)
        );
      }

      const insertGap = this.db.prepare(`
        INSERT OR REPLACE INTO as_evidence_gaps
          (gap_id, domain, severity, raw_json)
        VALUES (?, ?, ?, ?)
      `);
      catalogSnapshot.evidenceGaps.forEach((g, idx) => {
        insertGap.run(
          g.gap_id || `G_${idx + 1}`,
          g.domain || '',
          g.severity || '',
          JSON.stringify(g)
        );
      });

      const insertAction = this.db.prepare(`
        INSERT OR REPLACE INTO as_action_candidates
          (action_id, name, action_type, status, approved_for_production, prototype_enabled, today_enabled, raw_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const a of catalogSnapshot.catalogActions) {
        insertAction.run(
          a.action_id,
          a.name,
          a.action_type,
          a.status, // Preserved: 'PENDING_REVIEW'
          a.approved_for_production, // Preserved: 'NO'
          a.prototype_enabled ? 1 : 0,
          a.today_enabled ? 1 : 0,
          JSON.stringify(a)
        );
      }

      const insertActionEvidence = this.db.prepare(`
        INSERT OR REPLACE INTO as_action_evidence_mapping
          (mapping_id, action_id, claim_id, source_id, raw_json)
        VALUES (?, ?, ?, ?, ?)
      `);
      catalogSnapshot.actionEvidenceMappings.forEach((m, idx) => {
        insertActionEvidence.run(
          m.evidence_map_id || m.mapping_id || `AE_${idx + 1}`,
          m.action_id || '',
          m.claim_id || '',
          m.source_id || '',
          JSON.stringify(m)
        );
      });

      const insertActionRule = this.db.prepare(`
        INSERT OR REPLACE INTO as_action_rule_mapping
          (mapping_id, action_id, rule_id, raw_json)
        VALUES (?, ?, ?, ?)
      `);
      catalogSnapshot.actionRuleMappings.forEach((m, idx) => {
        insertActionRule.run(
          m.rule_map_id || m.mapping_id || `AR_${idx + 1}`,
          m.action_id || '',
          m.rule_id || '',
          JSON.stringify(m)
        );
      });

      const insertActionFormula = this.db.prepare(`
        INSERT OR REPLACE INTO as_action_formula_mapping
          (mapping_id, action_id, formula_id, raw_json)
        VALUES (?, ?, ?, ?)
      `);
      catalogSnapshot.actionFormulaMappings.forEach((m, idx) => {
        insertActionFormula.run(
          m.formula_map_id || m.mapping_id || `AF_${idx + 1}`,
          m.action_id || '',
          m.formula_id || '',
          JSON.stringify(m)
        );
      });

      const insertAgentMapping = this.db.prepare(`
        INSERT OR REPLACE INTO as_agent_knowledge_mapping
          (mapping_id, agent_name, record_type, record_id, raw_json)
        VALUES (?, ?, ?, ?, ?)
      `);
      catalogSnapshot.agentKnowledgeMappings.forEach((m, idx) => {
        insertAgentMapping.run(
          m.agent_map_id || m.mapping_id || `AK_${idx + 1}`,
          m.agent_name || '',
          m.record_type || '',
          m.record_id || '',
          JSON.stringify(m)
        );
      });

      const insertAudit = this.db.prepare(`
        INSERT OR REPLACE INTO as_verification_audit
          (audit_id, target_type, target_id, audit_status, raw_json)
        VALUES (?, ?, ?, ?, ?)
      `);
      catalogSnapshot.verificationAudits.forEach((v, idx) => {
        insertAudit.run(
          v.audit_id || `VA_${idx + 1}`,
          v.record_type || v.target_type || '',
          v.record_id || v.target_id || '',
          v.verification_outcome || v.audit_status || '',
          JSON.stringify(v)
        );
      });

      const insertVersion = this.db.prepare(`
        INSERT OR REPLACE INTO as_version_history
          (version_id, release_date, raw_json)
        VALUES (?, ?, ?)
      `);
      const versionRows: Array<Record<string, string>> = rawTables.version_history || [];
      versionRows.forEach((vh, idx) => {
        insertVersion.run(
          vh.version || vh.version_id || `v_${idx + 1}`,
          vh.date || vh.release_date || '2026-11-01',
          JSON.stringify(vh)
        );
      });

      this.db.exec('COMMIT');
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  public getCanonicalTableCounts(): Record<string, number> {
    const tables = [
      'as_sources',
      'as_financial_claims',
      'as_claim_source_mapping',
      'as_financial_rules',
      'as_financial_formulas',
      'as_evidence_gaps',
      'as_action_candidates',
      'as_action_evidence_mapping',
      'as_action_rule_mapping',
      'as_action_formula_mapping',
      'as_agent_knowledge_mapping',
      'as_verification_audit',
      'as_version_history',
    ];
    const counts: Record<string, number> = {};
    for (const t of tables) {
      const row = this.db.prepare(`SELECT COUNT(*) as cnt FROM ${t}`).get() as { cnt: number };
      counts[t] = row?.cnt ?? 0;
    }
    return counts;
  }

  // ==========================================================================
  // FX Cache Persistence Implementation
  // ==========================================================================
  public getCachedFXRate(base: string, target: string, rateDate?: string): FXRateEntry | null {
    const b = base.toUpperCase();
    const t = target.toUpperCase();
    let row:
      | {
          base: string;
          target: string;
          rate_date: string;
          rate: number;
          fetched_at: string;
          status: 'OK' | 'STALE' | 'UNAVAILABLE';
          source: string;
        }
      | undefined;

    if (rateDate) {
      row = this.db
        .prepare(
          `SELECT base, target, rate_date, rate, fetched_at, status, source
           FROM fx_rates_cache
           WHERE base = ? AND target = ? AND rate_date = ?`
        )
        .get(b, t, rateDate.slice(0, 10)) as typeof row;
    } else {
      row = this.db
        .prepare(
          `SELECT base, target, rate_date, rate, fetched_at, status, source
           FROM fx_rates_cache
           WHERE base = ? AND target = ?
           ORDER BY fetched_at DESC
           LIMIT 1`
        )
        .get(b, t) as typeof row;
    }

    if (!row) return null;
    return {
      base: row.base,
      target: row.target,
      rate: row.rate,
      rateDate: row.rate_date,
      fetchedAt: row.fetched_at,
      status: row.status,
      source: row.source,
    };
  }

  public upsertFXRate(entry: FXRateEntry): void {
    this.db
      .prepare(
        `INSERT OR REPLACE INTO fx_rates_cache
          (base, target, rate_date, rate, fetched_at, status, source)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        entry.base.toUpperCase(),
        entry.target.toUpperCase(),
        entry.rateDate.slice(0, 10),
        entry.rate,
        entry.fetchedAt,
        entry.status,
        entry.source
      );
  }

  // ==========================================================================
  // User & PI State Isolation (Encrypted at Rest)
  // ==========================================================================
  public savePIState(
    authenticatedUserId: string,
    targetUserId: string,
    input: SavePIStateInput | FinancialSnapshot | PIDatabaseSeed
  ): StoredPIStateEnvelope {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

    const existing = this.getPIState(authenticatedUserId, targetUserId, false);
    const nextVersionNum = (existing?.versionNumber ?? 0) + 1;
    const nextVersionStr = `${nextVersionNum}.0`;
    const nowIso = new Date().toISOString();

    let snapshot: FinancialSnapshot;
    let seed: PIDatabaseSeed | undefined = existing?.seed;
    let calculatorExtras: CalculatorContextExtras | undefined = existing?.calculatorExtras;
    let userConfirmedUnusedSubscriptionIds = existing?.userConfirmedUnusedSubscriptionIds;
    let verifiedCancellationTermsByTargetId = existing?.verifiedCancellationTermsByTargetId;
    let verifiedAccountFeeSchedules = existing?.verifiedAccountFeeSchedules;
    let verifiedUkDpcAgreement = existing?.verifiedUkDpcAgreement;

    const isDirectSnapshot = (obj: unknown): obj is FinancialSnapshot =>
      Boolean(
        obj &&
          typeof obj === 'object' &&
          'accountSummaries' in obj &&
          'currencySummaries' in obj &&
          'dataQuality' in obj
      );

    const isDirectSeed = (obj: unknown): obj is PIDatabaseSeed =>
      Boolean(
        obj &&
          typeof obj === 'object' &&
          'accounts' in obj &&
          'balances' in obj &&
          'incomes' in obj &&
          !('accountSummaries' in obj)
      );

    if (isDirectSnapshot(input)) {
      snapshot = {
        ...input,
        userId: targetUserId,
        version: nextVersionStr,
        id: input.id && input.version === nextVersionStr ? input.id : `snap_${targetUserId}_v${nextVersionNum}`,
      };
    } else if (isDirectSeed(input)) {
      seed = {
        ...input,
        user: { ...input.user, id: targetUserId },
        profile: { ...input.profile, userId: targetUserId },
      };
      snapshot = buildFinancialSnapshot(seed);
      snapshot.userId = targetUserId;
      snapshot.version = nextVersionStr;
      snapshot.id = `snap_${targetUserId}_v${nextVersionNum}`;
    } else {
      const saveInput = input as SavePIStateInput;
      if (saveInput.seed) {
        seed = {
          ...saveInput.seed,
          user: { ...saveInput.seed.user, id: targetUserId },
          profile: { ...saveInput.seed.profile, userId: targetUserId },
        };
      }
      if (saveInput.snapshot) {
        snapshot = {
          ...saveInput.snapshot,
          userId: targetUserId,
          version: nextVersionStr,
          id:
            saveInput.snapshot.id && !existing
              ? saveInput.snapshot.id
              : `snap_${targetUserId}_v${nextVersionNum}`,
        };
      } else if (seed) {
        snapshot = buildFinancialSnapshot(seed);
        snapshot.userId = targetUserId;
        snapshot.version = nextVersionStr;
        snapshot.id = `snap_${targetUserId}_v${nextVersionNum}`;
      } else if (existing?.snapshot) {
        snapshot = {
          ...existing.snapshot,
          userId: targetUserId,
          version: nextVersionStr,
          id: `snap_${targetUserId}_v${nextVersionNum}`,
        };
      } else {
        throw new Error('Cannot save PI state: neither snapshot nor seed provided.');
      }

      if (saveInput.calculatorExtras) {
        calculatorExtras = { ...calculatorExtras, ...saveInput.calculatorExtras };
      }
      if (saveInput.scheduledTransfers) {
        calculatorExtras = {
          ...calculatorExtras,
          scheduledTransfers: saveInput.scheduledTransfers,
        };
      }
      if (saveInput.debtTerms) {
        calculatorExtras = {
          ...calculatorExtras,
          debtTerms: saveInput.debtTerms,
        };
      }
      if (saveInput.userConfirmedUnusedSubscriptionIds !== undefined) {
        userConfirmedUnusedSubscriptionIds = saveInput.userConfirmedUnusedSubscriptionIds;
      }
      if (saveInput.verifiedCancellationTermsByTargetId !== undefined) {
        verifiedCancellationTermsByTargetId = saveInput.verifiedCancellationTermsByTargetId;
      }
      if (saveInput.verifiedAccountFeeSchedules !== undefined) {
        verifiedAccountFeeSchedules = saveInput.verifiedAccountFeeSchedules;
      }
      if (saveInput.verifiedUkDpcAgreement !== undefined) {
        verifiedUkDpcAgreement = saveInput.verifiedUkDpcAgreement;
      }
    }

    // Compute semantic inputHash excluding ephemeral snapshot id / createdAt
    const semanticPayload = {
      baseCurrency: snapshot.baseCurrency,
      profile: snapshot.profile,
      accountSummaries: snapshot.accountSummaries,
      incomeSources: snapshot.incomeSources,
      essentialCommitment: snapshot.essentialCommitment,
      obligations: snapshot.obligations,
      debts: snapshot.debts,
      goals: snapshot.goals,
      goalAllocations: snapshot.goalAllocations,
      transactions: snapshot.transactions.map((t) => ({
        id: t.id,
        date: t.date,
        amount: t.amount,
        currency: t.currency,
        description: t.description,
      })),
      confirmations: snapshot.confirmations,
      calculatorExtras,
      userConfirmedUnusedSubscriptionIds,
      verifiedCancellationTermsByTargetId,
      verifiedAccountFeeSchedules,
      verifiedUkDpcAgreement,
    };
    const inputHash = SecurityService.computeCanonicalHash(semanticPayload);

    const envelope: StoredPIStateEnvelope = {
      userId: targetUserId,
      version: nextVersionStr,
      versionNumber: nextVersionNum,
      inputHash,
      snapshot,
      seed,
      calculatorExtras,
      userConfirmedUnusedSubscriptionIds,
      verifiedCancellationTermsByTargetId,
      verifiedAccountFeeSchedules,
      verifiedUkDpcAgreement,
      updatedAt: nowIso,
    };

    const encryptedEnvelope = SecurityService.encryptText(JSON.stringify(envelope));
    const encryptedSnapshot = SecurityService.encryptText(JSON.stringify(snapshot));
    const encryptedEmail = SecurityService.encryptText(seed?.user?.email || `${targetUserId}@vela.local`);

    this.db.exec('SAVEPOINT save_pi_state');
    try {
      this.db
        .prepare(
          `INSERT OR REPLACE INTO users
            (id, email_encrypted, auth_status, is_demo_mode, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        )
        .run(
          targetUserId,
          encryptedEmail,
          seed?.user?.authStatus || 'demo_verified',
          snapshot.isDemoMode ? 1 : 0,
          nowIso,
          nowIso
        );

      this.db
        .prepare(
          `INSERT OR REPLACE INTO pi_states
            (user_id, version, version_number, input_hash, encrypted_payload, updated_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        )
        .run(targetUserId, nextVersionStr, nextVersionNum, inputHash, encryptedEnvelope, nowIso);

      this.db
        .prepare(
          `INSERT OR REPLACE INTO financial_snapshots
            (id, user_id, version, input_hash, encrypted_snapshot_json, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        )
        .run(snapshot.id, targetUserId, nextVersionStr, inputHash, encryptedSnapshot, nowIso);

      this.db.exec('RELEASE SAVEPOINT save_pi_state');
    } catch (err) {
      this.db.exec('ROLLBACK TO SAVEPOINT save_pi_state');
      this.db.exec('RELEASE SAVEPOINT save_pi_state');
      throw err;
    }

    return envelope;
  }

  public getPIState(
    authenticatedUserId: string,
    targetUserId: string,
    autoSeedDemo = true
  ): StoredPIStateEnvelope | null {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

    const row = this.db
      .prepare(
        `SELECT user_id, version, version_number, input_hash, encrypted_payload, updated_at
         FROM pi_states
         WHERE user_id = ?`
      )
      .get(targetUserId) as
      | {
          user_id: string;
          version: string;
          version_number: number;
          input_hash: string;
          encrypted_payload: string;
          updated_at: string;
        }
      | undefined;

    if (!row) {
      if (autoSeedDemo && targetUserId === 'user_demo_alex') {
        const demoSeed = createDemoSeedData();
        return this.savePIState(authenticatedUserId, targetUserId, { seed: demoSeed });
      }
      return null;
    }

    const decryptedJson = SecurityService.decryptText(row.encrypted_payload);
    return JSON.parse(decryptedJson) as StoredPIStateEnvelope;
  }

  public getLatestSnapshotVersion(authenticatedUserId: string, targetUserId: string): string | null {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const row = this.db
      .prepare(`SELECT version FROM pi_states WHERE user_id = ?`)
      .get(targetUserId) as { version: string } | undefined;
    return row?.version ?? null;
  }

  // ==========================================================================
  // Step 1 Agent Results Cache (BehaviorAgent, DebtAgent)
  // ==========================================================================
  public getAgentResult<T = unknown>(
    authenticatedUserId: string,
    targetUserId: string,
    agentName: string
  ): AgentResultRow<T> | null {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const row = this.db
      .prepare(
        `SELECT user_id, agent_name, input_hash, policy_version, output_json, created_at
         FROM agent_results
         WHERE user_id = ? AND agent_name = ?`
      )
      .get(targetUserId, agentName) as
      | {
          user_id: string;
          agent_name: string;
          input_hash: string;
          policy_version: string;
          output_json: string;
          created_at: string;
        }
      | undefined;

    if (!row) return null;
    return {
      userId: row.user_id,
      agentName: row.agent_name,
      inputHash: row.input_hash,
      policyVersion: row.policy_version,
      output: JSON.parse(row.output_json) as T,
      createdAt: row.created_at,
    };
  }

  public saveAgentResult<T = unknown>(
    authenticatedUserId: string,
    targetUserId: string,
    agentName: string,
    inputHash: string,
    policyVersion: string,
    output: T
  ): AgentResultRow<T> {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const nowIso = new Date().toISOString();
    this.db
      .prepare(
        `INSERT OR REPLACE INTO agent_results
          (user_id, agent_name, input_hash, policy_version, output_json, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(targetUserId, agentName, inputHash, policyVersion, JSON.stringify(output), nowIso);

    return {
      userId: targetUserId,
      agentName,
      inputHash,
      policyVersion,
      output,
      createdAt: nowIso,
    };
  }

  // ==========================================================================
  // Evaluation Runs, Decision Traces, Recommendations & Feedback
  // ==========================================================================
  public createEvaluationRun(
    authenticatedUserId: string,
    targetUserId: string,
    params: {
      evaluationId: string;
      snapshotId: string;
      snapshotVersion: string;
      eventType: string;
      inputHash: string;
      policyVersion: string;
      status?: EvaluationRunRow['status'];
    }
  ): EvaluationRunRow {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const nowIso = new Date().toISOString();
    const status = params.status || 'IN_PROGRESS';

    this.db
      .prepare(
        `INSERT OR REPLACE INTO evaluation_runs
          (evaluation_id, user_id, snapshot_id, snapshot_version, event_type, input_hash, policy_version, status, created_at, completed_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        params.evaluationId,
        targetUserId,
        params.snapshotId,
        params.snapshotVersion,
        params.eventType,
        params.inputHash,
        params.policyVersion,
        status,
        nowIso,
        status === 'IN_PROGRESS' ? null : nowIso
      );

    return {
      evaluationId: params.evaluationId,
      userId: targetUserId,
      snapshotId: params.snapshotId,
      snapshotVersion: params.snapshotVersion,
      eventType: params.eventType,
      inputHash: params.inputHash,
      policyVersion: params.policyVersion,
      status,
      createdAt: nowIso,
      completedAt: status === 'IN_PROGRESS' ? null : nowIso,
    };
  }

  public updateEvaluationRunStatus(
    authenticatedUserId: string,
    targetUserId: string,
    evaluationId: string,
    status: EvaluationRunRow['status']
  ): void {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const nowIso = new Date().toISOString();
    this.db
      .prepare(
        `UPDATE evaluation_runs
         SET status = ?, completed_at = ?
         WHERE evaluation_id = ? AND user_id = ?`
      )
      .run(status, nowIso, evaluationId, targetUserId);
  }

  public getLatestEvaluationRun(
    authenticatedUserId: string,
    targetUserId: string
  ): EvaluationRunRow | null {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const row = this.db
      .prepare(
        `SELECT evaluation_id, user_id, snapshot_id, snapshot_version, event_type, input_hash, policy_version, status, created_at, completed_at
         FROM evaluation_runs
         WHERE user_id = ?
         ORDER BY created_at DESC, rowid DESC
         LIMIT 1`
      )
      .get(targetUserId) as
      | {
          evaluation_id: string;
          user_id: string;
          snapshot_id: string;
          snapshot_version: string;
          event_type: string;
          input_hash: string;
          policy_version: string;
          status: EvaluationRunRow['status'];
          created_at: string;
          completed_at: string | null;
        }
      | undefined;

    if (!row) return null;
    return {
      evaluationId: row.evaluation_id,
      userId: row.user_id,
      snapshotId: row.snapshot_id,
      snapshotVersion: row.snapshot_version,
      eventType: row.event_type,
      inputHash: row.input_hash,
      policyVersion: row.policy_version,
      status: row.status,
      createdAt: row.created_at,
      completedAt: row.completed_at,
    };
  }

  public saveDecisionTrace(
    authenticatedUserId: string,
    targetUserId: string,
    trace: DecisionTrace,
    decision: RecommendationDecision
  ): void {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const nowIso = new Date().toISOString();
    this.db
      .prepare(
        `INSERT OR REPLACE INTO decision_traces
          (evaluation_id, user_id, snapshot_id, snapshot_version, decision_status, priority_class, weight_profile_id, trace_json, decision_json, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        trace.evaluationId,
        targetUserId,
        trace.snapshotId,
        trace.snapshotVersion,
        trace.decisionStatus,
        trace.priorityClass,
        trace.weightSelection?.profileId ?? null,
        JSON.stringify(trace),
        JSON.stringify(decision),
        nowIso
      );
  }

  public getDecisionTrace(
    authenticatedUserId: string,
    targetUserId: string,
    evaluationId: string
  ): { trace: DecisionTrace; decision: RecommendationDecision } | null {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const row = this.db
      .prepare(
        `SELECT trace_json, decision_json
         FROM decision_traces
         WHERE evaluation_id = ? AND user_id = ?`
      )
      .get(evaluationId, targetUserId) as
      | { trace_json: string; decision_json: string }
      | undefined;

    if (!row) return null;
    return {
      trace: JSON.parse(row.trace_json) as DecisionTrace,
      decision: JSON.parse(row.decision_json) as RecommendationDecision,
    };
  }

  public getLatestWeightProfileId(
    authenticatedUserId: string,
    targetUserId: string
  ): WeightProfileId | null {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const row = this.db
      .prepare(
        `SELECT weight_profile_id
         FROM decision_traces
         WHERE user_id = ? AND weight_profile_id IS NOT NULL
         ORDER BY created_at DESC, rowid DESC
         LIMIT 1`
      )
      .get(targetUserId) as { weight_profile_id: WeightProfileId | null } | undefined;
    return row?.weight_profile_id ?? null;
  }

  public saveRecommendation(
    authenticatedUserId: string,
    targetUserId: string,
    record: RecommendationRecord,
    decision: RecommendationDecision
  ): void {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    this.db
      .prepare(
        `INSERT OR REPLACE INTO recommendations
          (id, evaluation_id, user_id, snapshot_id, snapshot_version, action_id, action_type, status, suggested_amount, adjusted_amount, currency, record_json, decision_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        record.id,
        decision.evaluationId,
        targetUserId,
        record.snapshotId,
        decision.snapshotVersion,
        decision.selectedActionId,
        record.actionType,
        record.status,
        record.suggestedAmount,
        record.adjustedAmount,
        record.currency,
        JSON.stringify(record),
        JSON.stringify(decision),
        record.createdAt,
        record.updatedAt
      );
  }

  public getRecommendationById(
    authenticatedUserId: string,
    targetUserId: string,
    recommendationId: string
  ): PublishedRecommendationBundle | null {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const row = this.db
      .prepare(
        `SELECT snapshot_version, record_json, decision_json, updated_at
         FROM recommendations
         WHERE id = ? AND user_id = ?`
      )
      .get(recommendationId, targetUserId) as
      | {
          snapshot_version: string;
          record_json: string;
          decision_json: string;
          updated_at: string;
        }
      | undefined;

    if (!row) return null;
    const recommendation = JSON.parse(row.record_json) as RecommendationRecord;
    const decision = JSON.parse(row.decision_json) as RecommendationDecision;
    return {
      recommendation,
      decision,
      trace: decision.trace,
      snapshotVersion: row.snapshot_version,
      updatedAt: row.updated_at,
    };
  }

  public getLatestRecommendationBundle(
    authenticatedUserId: string,
    targetUserId: string
  ): PublishedRecommendationBundle | null {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const row = this.db
      .prepare(
        `SELECT snapshot_version, record_json, decision_json, updated_at
         FROM recommendations
         WHERE user_id = ?
         ORDER BY updated_at DESC, rowid DESC
         LIMIT 1`
      )
      .get(targetUserId) as
      | {
          snapshot_version: string;
          record_json: string;
          decision_json: string;
          updated_at: string;
        }
      | undefined;

    if (!row) return null;
    const recommendation = JSON.parse(row.record_json) as RecommendationRecord;
    const decision = JSON.parse(row.decision_json) as RecommendationDecision;
    return {
      recommendation,
      decision,
      trace: decision.trace,
      snapshotVersion: row.snapshot_version,
      updatedAt: row.updated_at,
    };
  }

  public listRecommendationsForUser(
    authenticatedUserId: string,
    targetUserId: string
  ): RecommendationRecord[] {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const rows = this.db
      .prepare(
        `SELECT record_json
         FROM recommendations
         WHERE user_id = ?
         ORDER BY updated_at DESC, rowid DESC`
      )
      .all(targetUserId) as Array<{ record_json: string }>;

    return rows.map((r) => JSON.parse(r.record_json) as RecommendationRecord);
  }

  /** Pending execution reserves cash without changing balances or allocations. */
  public listPendingFinancialCommitments(
    authenticatedUserId: string,
    targetUserId: string,
    excludeRecommendationId?: string
  ): NonNullable<CalculatorContextExtras['pendingFinancialCommitments']> {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const rows = this.db.prepare(`SELECT record_json, decision_json FROM recommendations
      WHERE user_id = ? AND status IN ('accepted', 'adjusted')`).all(targetUserId) as
      Array<{ record_json: string; decision_json: string }>;
    const commitments: NonNullable<CalculatorContextExtras['pendingFinancialCommitments']> = [];
    for (const row of rows) {
      const rec = JSON.parse(row.record_json) as RecommendationRecord;
      const decision = JSON.parse(row.decision_json) as RecommendationDecision;
      if (rec.id === excludeRecommendationId || !decision.candidate ||
          !['A001', 'A002', 'A007', 'A008', 'A010', 'A012'].includes(decision.selectedActionId || '')) continue;
      const amount = rec.adjustedAmount ?? rec.suggestedAmount;
      if (amount === null || !Number.isFinite(amount) || amount <= 0) continue;
      commitments.push({ recommendationId: rec.id, actionId: decision.selectedActionId!,
        sourceAccountId: decision.candidate.sourceAccountId, amount, currency: rec.currency });
    }
    return commitments;
  }

  public recordActionFeedback(
    authenticatedUserId: string,
    targetUserId: string,
    feedback: ActionFeedback & { actionId?: string | null; snapshotId: string }
  ): ActionFeedback {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    this.db
      .prepare(
        `INSERT INTO action_feedback
          (id, user_id, recommendation_id, action_id, snapshot_id, action, amount, note, timestamp)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        feedback.id,
        targetUserId,
        feedback.recommendationId,
        feedback.actionId ?? null,
        feedback.snapshotId,
        feedback.action,
        feedback.amount,
        feedback.note,
        feedback.timestamp
      );

    return {
      id: feedback.id,
      recommendationId: feedback.recommendationId,
      action: feedback.action,
      amount: feedback.amount,
      note: feedback.note,
      timestamp: feedback.timestamp,
    };
  }

  public listActionFeedbackForUser(
    authenticatedUserId: string,
    targetUserId: string
  ): Array<ActionFeedback & { actionId: string | null; snapshotId: string }> {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const rows = this.db
      .prepare(
        `SELECT id, recommendation_id, action_id, snapshot_id, action, amount, note, timestamp
         FROM action_feedback
         WHERE user_id = ?
         ORDER BY timestamp DESC, rowid DESC`
      )
      .all(targetUserId) as Array<{
      id: string;
      recommendation_id: string;
      action_id: string | null;
      snapshot_id: string;
      action: 'accept' | 'adjust' | 'decline' | 'complete';
      amount: number | null;
      note: string;
      timestamp: string;
    }>;

    return rows.map((r) => ({
      id: r.id,
      recommendationId: r.recommendation_id,
      actionId: r.action_id,
      snapshotId: r.snapshot_id,
      action: r.action,
      amount: r.amount,
      note: r.note,
      timestamp: r.timestamp,
    }));
  }

  public saveAssistantMessage(
    authenticatedUserId: string,
    targetUserId: string,
    message: AssistantMessage
  ): void {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    this.db
      .prepare(
        `INSERT OR REPLACE INTO assistant_messages
          (id, user_id, role, content, tool_used, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(
        message.id,
        targetUserId,
        message.role,
        message.content,
        message.toolUsed ?? null,
        message.createdAt
      );
  }

  public listAssistantMessages(
    authenticatedUserId: string,
    targetUserId: string
  ): AssistantMessage[] {
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);
    const rows = this.db
      .prepare(
        `SELECT id, user_id, role, content, tool_used, created_at
         FROM assistant_messages
         WHERE user_id = ?
         ORDER BY created_at ASC, rowid ASC`
      )
      .all(targetUserId) as Array<{
      id: string;
      user_id: string;
      role: 'user' | 'assistant';
      content: string;
      tool_used: string | null;
      created_at: string;
    }>;

    return rows.map((r) => ({
      id: r.id,
      userId: r.user_id,
      role: r.role,
      content: r.content,
      toolUsed: r.tool_used || undefined,
      createdAt: r.created_at,
    }));
  }

  public getRawEncryptedPIPayloadForTesting(userId: string): string | null {
    const row = this.db
      .prepare('SELECT encrypted_payload FROM pi_states WHERE user_id = ?')
      .get(userId) as { encrypted_payload: string } | undefined;
    return row?.encrypted_payload ?? null;
  }

  public close(): void {
    try {
      this.db.close();
    } catch {
      // already closed
    }
  }
}
