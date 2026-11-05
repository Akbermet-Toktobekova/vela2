---
name: vela-no-invention
description: >-
  Use this skill before writing financial calculations, prompts, catalog loaders, or decision
  policies to ensure strict separation of DB_FACT, PRODUCT_DECISION, and PROTOTYPE_ONLY parameters.
---

# Vela No-Invention Guard

## Mandatory Rules

1. **Preserve Canonical DB Facts (`DB_FACT`)**:
   - Load `server/data/as/FinAgent_Normalized_Database.json` without altering `status = 'PENDING_REVIEW'`, `approved_for_production = 'NO'`, or `PENDING_ORIGINAL_REOPEN` (`C032, C033`).
   - Never fabricate source IDs, claim IDs, rule IDs, or action IDs.
2. **Centralized `PROTOTYPE_ONLY` Config**:
   - Read all preliminary engineering parameters (weight profiles, hysteresis thresholds `1.0 / 1.25`, `H = 90`, `K_R, K_F, K_G`, complexity weights `0.25`, `lambda_C = 0.10`, `200` simulations, `+-10%`, `Stability >= 0.80`, `deltaS < 0.03`) exclusively from `server/config/prototype-policy.json`.
   - Never invent fallback constants like `K_F_min`; if `essential_monthly_expenses` is missing or invalid, return `NEEDS_DATA`.
3. **No Fictional Monetary Scores**:
   - `VERIFICATION_ACTION` and `EDUCATIONAL_ACTION` must never be assigned fake `delta_R, delta_F, delta_G` values.
   - Internal transfers between equally liquid accounts must yield `delta_R = 0`.
   - `F003` (`max(0, ...)`) must never hide negative projected cash in `F004` or shortfall in `F019`.
