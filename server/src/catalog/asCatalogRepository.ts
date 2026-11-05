import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPrototypePolicy } from '../config/policyLoader';
import {
  ActionType,
  ASClaim,
  ASClaimSchema,
  ASFormula,
  ASFormulaSchema,
  ASRule,
  ASRuleSchema,
  ASSource,
  ASSourceSchema,
  CanonicalActionCandidateSchema,
  CatalogActionEntry,
  CatalogActionEntrySchema,
} from '@shared/contracts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_DB_JSON_PATH = path.resolve(
  __dirname,
  '../../data/as/FinAgent_Normalized_Database.json'
);

interface ActionExtensionSpec {
  action_type: ActionType;
  today_enabled: boolean;
  critical_trigger_conditions: string | null;
  is_diagnostic_only_critical: boolean;
  unlocks_financial_action_ids: string[];
  baseline_complexity: { T: number; S: number; D: number; O: number };
}

// Explicit deterministic metadata per A001..A026 (Review Points 2, 3, 4, 5)
const ACTION_EXTENSION_MAP: Record<string, ActionExtensionSpec> = {
  A001: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions:
      'Imminent unpaid required credit-card minimum payment due within window where funds are available.',
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A001,
  },
  A002: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A002,
  },
  A003: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: ['A002'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A003,
  },
  A004: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: ['A001', 'A002'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A004,
  },
  A005: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions:
      'Verified inability to cover required minimum card payment by due date (F019 shortfall > 0).',
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A005,
  },
  A006: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: ['A005'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A006,
  },
  A007: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A007,
  },
  A008: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A008,
  },
  A009: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: ['A007', 'A008'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A009,
  },
  A010: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A010,
  },
  A011: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions:
      'Scheduled automatic transfer causes projected near-term cash deficit below floor or mandatory bill shortfall.',
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A011,
  },
  A012: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A012,
  },
  A013: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: ['A012'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A013,
  },
  A014: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: ['A015'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A014,
  },
  A015: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A015,
  },
  A016: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A016,
  },
  A017: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: ['A018', 'A010'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A017,
  },
  A018: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A018,
  },
  A019: {
    action_type: 'FINANCIAL_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A019,
  },
  A020: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions:
      'Projected cash trajectory F004/F019 indicates upcoming shortfall before a mandatory obligation.',
    is_diagnostic_only_critical: true, // Identifies problem; does NOT automatically eliminate deficit!
    unlocks_financial_action_ids: ['A001', 'A005', 'A011'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A020,
  },
  A021: {
    action_type: 'EDUCATIONAL_ACTION',
    today_enabled: false, // Educational -> shown in AI Assistant or contextual explanation
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A021,
  },
  A022: {
    action_type: 'EDUCATIONAL_ACTION',
    today_enabled: false,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A022,
  },
  A023: {
    action_type: 'EDUCATIONAL_ACTION',
    today_enabled: false,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A023,
  },
  A024: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A024,
  },
  A025: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: [],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A025,
  },
  A026: {
    action_type: 'VERIFICATION_ACTION',
    today_enabled: true,
    critical_trigger_conditions: null,
    is_diagnostic_only_critical: false,
    unlocks_financial_action_ids: ['A002'],
    baseline_complexity: loadPrototypePolicy().effortRubricPolicy.catalogBaselineByActionId.A026,
  },
};

export interface KnowledgeDatabaseSnapshot {
  metadata: {
    version: string;
    date: string;
    status: string;
  };
  sources: ASSource[];
  verifiedClaims: ASClaim[];
  allClaims: ASClaim[];
  claimSourceMappings: Array<Record<string, string>>;
  rules: ASRule[];
  formulas: ASFormula[];
  catalogActions: CatalogActionEntry[];
  actionEvidenceMappings: Array<Record<string, string>>;
  actionRuleMappings: Array<Record<string, string>>;
  actionFormulaMappings: Array<Record<string, string>>;
  agentKnowledgeMappings: Array<Record<string, string>>;
  evidenceGaps: Array<Record<string, string>>;
  verificationAudits: Array<Record<string, string>>;
}

let cachedKnowledgeDB: KnowledgeDatabaseSnapshot | null = null;

export class ASCatalogRepository {
  static load(customJsonPath?: string): KnowledgeDatabaseSnapshot {
    if (cachedKnowledgeDB && !customJsonPath) {
      return cachedKnowledgeDB;
    }
    const p = customJsonPath || DEFAULT_DB_JSON_PATH;
    const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
    const tables = raw.tables;

    const sources: ASSource[] = (tables.sources || []).map((s: unknown) => ASSourceSchema.parse(s));
    const allClaims: ASClaim[] = (tables.financial_claims || []).map((c: unknown) =>
      ASClaimSchema.parse(c)
    );
    // Exclude PENDING_ORIGINAL_REOPEN claims from verified layer per DATA_DICTIONARY.md
    const verifiedClaims = allClaims.filter((c) => c.verification_status === 'VERIFIED');
    const verifiedClaimIds = new Set(verifiedClaims.map((c) => c.claim_id));

    const rules: ASRule[] = (tables.financial_rules || []).map((r: unknown) => ASRuleSchema.parse(r));
    const formulas: ASFormula[] = (tables.financial_formulas || []).map((f: unknown) =>
      ASFormulaSchema.parse(f)
    );

    const agentKnowledgeMappings: Array<Record<string, string>> =
      tables.agent_knowledge_mapping || [];
    const assistantActionIds = new Set(
      agentKnowledgeMappings
        .filter((m) => m.agent_name === 'AI Assistant' && m.record_type === 'ACTION')
        .map((m) => m.record_id)
    );

    const catalogActions: CatalogActionEntry[] = (tables.action_candidates || []).map(
      (rawRow: unknown) => {
        const baseRow = CanonicalActionCandidateSchema.parse(rawRow);
        const ext = ACTION_EXTENSION_MAP[baseRow.action_id];
        if (!ext) {
          throw new Error(`Missing catalog extension specification for ${baseRow.action_id}`);
        }
        const claimIds = baseRow.supporting_claim_ids
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean);
        const allClaimsVerified = claimIds.every((cid) => verifiedClaimIds.has(cid));

        return CatalogActionEntrySchema.parse({
          ...baseRow,
          // Preserve original status ('PENDING_REVIEW') and approved_for_production ('NO')!
          status: baseRow.status,
          approved_for_production: baseRow.approved_for_production,
          action_type: ext.action_type,
          today_enabled: ext.today_enabled,
          prototype_enabled: true,
          required_inputs_list: baseRow.required_pi_inputs
            .split(';')
            .map((x) => x.trim())
            .filter(Boolean),
          supporting_rule_ids_list: baseRow.supporting_rule_ids
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean),
          supporting_claim_ids_list: claimIds,
          calculation_ids_list: baseRow.calculation_ids
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean),
          verification_status: allClaimsVerified
            ? 'VERIFIED_BACKGROUND'
            : 'PENDING_ORIGINAL_REOPEN',
          critical_trigger_conditions: ext.critical_trigger_conditions,
          is_diagnostic_only_critical: ext.is_diagnostic_only_critical,
          unlocks_financial_action_ids: ext.unlocks_financial_action_ids,
          baseline_complexity: ext.baseline_complexity,
          assistant_mapped: assistantActionIds.has(baseRow.action_id),
        });
      }
    );

    // Referential integrity verification (matching build_finagent.py / Quality_Audit_Report.json)
    const sourceIdSet = new Set(sources.map((s) => s.source_id));
    const claimIdSet = new Set(allClaims.map((c) => c.claim_id));
    const ruleIdSet = new Set(rules.map((r) => r.rule_id));
    const formulaIdSet = new Set(formulas.map((f) => f.formula_id));
    const actionIdSet = new Set(catalogActions.map((a) => a.action_id));

    for (const act of catalogActions) {
      if (act.approved_for_production !== 'NO') {
        throw new Error(`Integrity violation: ${act.action_id} approved_for_production was mutated!`);
      }
      for (const cid of act.supporting_claim_ids_list) {
        if (!claimIdSet.has(cid)) throw new Error(`Broken claim ref ${cid} in ${act.action_id}`);
      }
      for (const rid of act.supporting_rule_ids_list) {
        if (!ruleIdSet.has(rid)) throw new Error(`Broken rule ref ${rid} in ${act.action_id}`);
      }
      for (const fid of act.calculation_ids_list) {
        if (!formulaIdSet.has(fid)) throw new Error(`Broken formula ref ${fid} in ${act.action_id}`);
      }
    }

    for (const m of agentKnowledgeMappings) {
      if (!actionIdSet.has(m.record_id)) {
        throw new Error(`Broken agent_knowledge_mapping record_id: ${m.record_id}`);
      }
    }

    for (const c of allClaims) {
      if (!sourceIdSet.has(c.source_primary_id)) {
        throw new Error(`Broken source_primary_id ${c.source_primary_id} in ${c.claim_id}`);
      }
    }

    const db: KnowledgeDatabaseSnapshot = {
      metadata: raw.metadata,
      sources,
      verifiedClaims,
      allClaims,
      claimSourceMappings: tables.claim_source_mapping || [],
      rules,
      formulas,
      catalogActions,
      actionEvidenceMappings: tables.action_evidence_mapping || [],
      actionRuleMappings: tables.action_rule_mapping || [],
      actionFormulaMappings: tables.action_formula_mapping || [],
      agentKnowledgeMappings,
      evidenceGaps: tables.evidence_gaps || [],
      verificationAudits: tables.verification_audit || [],
    };

    if (!customJsonPath) {
      cachedKnowledgeDB = db;
    }
    return db;
  }

  static getActionById(actionId: string): CatalogActionEntry | undefined {
    return this.load().catalogActions.find((a) => a.action_id === actionId);
  }

  static getActionsForAgent(agentName: string): CatalogActionEntry[] {
    const db = this.load();
    const mappedIds = new Set(
      db.agentKnowledgeMappings
        .filter((m) => m.agent_name === agentName && m.record_type === 'ACTION')
        .map((m) => m.record_id)
    );
    return db.catalogActions.filter((a) => mappedIds.has(a.action_id));
  }

  static getSourcesForAction(actionId: string): ASSource[] {
    const db = this.load();
    const sids = new Set(
      db.actionEvidenceMappings.filter((m) => m.action_id === actionId).map((m) => m.source_id)
    );
    return db.sources.filter((s) => sids.has(s.source_id));
  }
}
