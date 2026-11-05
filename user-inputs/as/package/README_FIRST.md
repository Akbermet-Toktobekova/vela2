# FinAgent — actual generated database delivery (2026-11-01)

## What is in this package

- `FinAgent_Master_Knowledge_Base.xlsx`: **real populated** Excel workbook, 10 required sheets.
- 13 relational CSV exports and `FinAgent_Normalized_Database.json`: same canonical rows.
- `Sensitivity_Scenario_Comparison.png`, `Sensitivity_Winner_Frequency.png`, `Sensitivity_Score_Intervals.png`: **actual generated** charts; `weighting_scenarios.csv` and `weighting_winner_frequency.csv` provide numerical scenarios.
- `Quality_Audit_Report.json`, `DATA_DICTIONARY.md`, and `build_finagent.py` for reconstruction.

## Critical provenance and limitations

The earlier deep-research-generated ZIP was NOT present among accessible uploads. No claims are made about verifying or preserving those inaccessible CSV records. This is a new and intentionally **partial** reconstructed dataset grounded in the accompanying research report plus original institutional and academic content retrieved on 2026-11-01. Stable IDs are new within this rebuild.

Only directly checked claims are marked VERIFIED. Legal claims where EUR-Lex blocked a full original-page reopen are `PENDING_ORIGINAL_REOPEN`. Source titles and original URLs are included per row. A web result snippet was reviewed for some original publishers; full article text was not always available. This is a source-text review, **not a comprehensive scientific peer review**.

All 26 actions are templates, not approved instructions, and none may be automatically executed in production. Proposed rules and most formulas are product engineering and require review. Financial weights and friction functions are NOT empirically validated. All sensitivity figures use **hypothetical feature values**, random but reproducibly seeded weight variation, not real customer data.

The research remains below 40-60 sources and is not ready for autonomous financial advice. See Evidence_Gaps and `Quality_Audit_Report.json`.

## Relational pathways

`action_candidates.action_id` → `action_rule_mapping.rule_id` → `financial_rules.supporting_claim_ids` → `claim_source_mapping.source_id` → `sources.canonical_url`. There is also direct `action_evidence_mapping` for each action-claim-source link. A separate `action_formula_mapping` joins calculations.

## How to inspect

Open the `.xlsx` and filter the first header row. Use `Open_Source_URL` links to open the original source pages. For machine processing, load `FinAgent_Normalized_Database.json` or per-table CSV. Inspect candidate action safety flags before integration.
