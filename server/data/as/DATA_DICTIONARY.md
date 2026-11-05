# FinAgent database data dictionary — reconstructed partial corpus

These are generated source-of-truth **CSV/JSON** tables, not the inaccessible prior deep-research ZIP. Workbook is a materialized export.

## sources — 24 rows

Primary key: `source_id`. Columns: `source_id`, `title`, `issuer`, `source_type`, `jurisdiction`, `population`, `canonical_url`, `exact_sections_reviewed`, `retrieval_evidence_status`, `publication_or_effective_date`, `last_reviewed`, `limitations`, `provenance`, `link`.

## financial_claims — 33 rows

Primary key: `claim_id`. Columns: `claim_id`, `domain`, `claim`, `claim_type`, `verification_status`, `jurisdiction`, `population`, `limitations`, `source_primary_id`, `last_reviewed`, `provenance`.

## claim_source_mapping — 34 rows

Primary key: `mapping_id`. Columns: `mapping_id`, `claim_id`, `source_id`, `exact_location`, `support_type`, `verification_status`, `last_reviewed`, `source_url`.

## financial_rules — 18 rows

Primary key: `rule_id`. Columns: `rule_id`, `name`, `rule_text`, `supporting_claim_ids`, `supporting_formula_ids`, `jurisdiction`, `approval_status`, `safety_review_required`, `provenance`.

## financial_formulas — 20 rows

Primary key: `formula_id`. Columns: `formula_id`, `name`, `expression`, `output_units`, `required_inputs`, `formula_status`, `source_id`, `source_url`, `assumptions_limits`, `test_example`, `approval_status`.

## evidence_gaps — 14 rows

Primary key: `gap_id`. Columns: `gap_id`, `category`, `description`, `severity`, `status`, `last_reviewed`, `resolution_needed`.

## action_candidates — 26 rows

Primary key: `action_id`. Columns: `action_id`, `name`, `category`, `action_template`, `required_pi_inputs`, `optional_pi_inputs`, `eligibility_conditions`, `rejection_conditions`, `safety_requirements`, `expected_effects`, `possible_harms`, `applicable_jurisdiction`, `calculation_ids`, `supporting_rule_ids`, `supporting_claim_ids`, `source_name`, `source_url`, `evidence_status`, `evidence_limits`, `status`, `approved_for_production`, `missing_dependencies`, `template_not_instance`.

## action_evidence_mapping — 44 rows

Primary key: `mapping_id`. Columns: `mapping_id`, `action_id`, `claim_id`, `source_id`, `claim_source_mapping_id`, `source_url`, `relationship`.

## action_rule_mapping — 36 rows

Primary key: `mapping_id`. Columns: `mapping_id`, `action_id`, `rule_id`.

## action_formula_mapping — 49 rows

Primary key: `mapping_id`. Columns: `mapping_id`, `action_id`, `formula_id`.

## agent_knowledge_mapping — 60 rows

Primary key: `mapping_id`. Columns: `mapping_id`, `agent_name`, `record_type`, `record_id`, `usage`, `status`.

## verification_audit — 57 rows

Primary key: `audit_id`. Columns: `audit_id`, `record_type`, `record_id`, `status`, `review_date`, `method`, `finding`, `requires_followup`.

## version_history — 2 rows

Primary key: `version_id`. Columns: `version_id`, `date`, `change`, `breaking_change`, `prior_data_accessible`, `assurance`.

Foreign keys: `financial_claims.source_primary_id` → `sources.source_id`, `claim_source_mapping.source_id` → `sources.source_id`, `claim_source_mapping.claim_id` → `financial_claims.claim_id`, `financial_formulas.source_id` → `sources.source_id`, `action_evidence_mapping.source_id` → `sources.source_id`, `action_evidence_mapping.claim_id` → `financial_claims.claim_id`, `action_evidence_mapping.action_id` → `action_candidates.action_id`, `action_evidence_mapping.claim_source_mapping_id` → `claim_source_mapping.mapping_id`, `action_rule_mapping.rule_id` → `financial_rules.rule_id`, `action_rule_mapping.action_id` → `action_candidates.action_id`, `action_formula_mapping.formula_id` → `financial_formulas.formula_id`, `action_formula_mapping.action_id` → `action_candidates.action_id`.

VERIFIED claims have at least one directly retrieved original publisher/institutional source excerpt and a precise section. PENDING_ORIGINAL_REOPEN claims are excluded from the verified layer.
