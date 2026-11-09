# FinAgent (Vela) Technical and Mathematical Specification

This is the canonical implementation specification. The knowledge package is FinAgent_Final_Database_Package.zip, deliverable version 0.1-rebuilt dated 2026-11-01. Product and engineering decisions are recorded in [DECISIONS.md](coordination/DECISIONS.md).

- **DB_FACT** includes the canonical S, C, M, R, F, A, AE, AR, AF, AK, G and VA records. Preserve their original values and statuses, including PENDING_REVIEW, PENDING_ORIGINAL_REOPEN and approved_for_production = NO.
- **PRODUCT_DECISION** includes the architecture, action categories, safety requirements and user controls in the decision log.
- **PROTOTYPE_POLICY** includes preliminary weights, hysteresis, normalization constants, complexity coefficients and robustness settings. Store these in the versioned prototype policy. The settings require synthetic and expert calibration under G004–G006.

## 1. Seven-stage pipeline

1. **Personal Information Database.** Import statements deterministically. Preserve unique normalized transactions, user confirmations and provenance. Expose primary facts, analysis, action history and conversation context through the repository. Derived interpretations remain distinct from confirmed PI.
2. **Automatic Review Orchestrator.** Trigger review on input, policy or relevant date changes. Reuse fresh results by dependency fingerprint. Tie the review to a versioned financial snapshot and reject publication of superseded results.
3. **Financial Analyzer.** Classify transactions, reconcile transfers and rebuild dependent aggregates before Pattern Recognition and Behavior. Pattern combines deterministic observations with AI interpretation. Behavior explains the evidence and proposes questions. Resolve FX for the valuation date and calculate deterministic liquidity and debt metrics. Debt Agent explains the debt report. Unknown terms or rates remain explicit.
4. **AI Suggestion Generator.** Return exactly three distinct proposal slots, using clarification requests when evidence is insufficient. Use minimized PI, calculated metrics, Pattern/Behavior/Debt summaries, relevant contextual chat memory, feedback, and applicable VERIFIED AS excerpts. The primary request excludes Action Catalog templates and IDs.
5. **Checker and Critical Action Coverage.** Check primary proposals against PI and applicable verified AS without catalog mapping. A consistent, safe PI-grounded review can pass when AS is silent. Financial execution requires a verified contract and safety checks, including C_a(d) >= B_min(d) where applicable. Discover critical actions independently. Run the separate Catalog Selector and check its selections when Primary has no useful valid step, including all-rejected and clarification-only results.
6. **Final Recommendation Engine.** Apply critical priority, then weight selection, deterministic impact, the single contextual complexity batch, scoring and robustness as appropriate. Produce RECOMMENDATION_READY, NEEDS_DATA or NO_RECOMMENDATION with a DecisionTrace.
7. **Proactive Recommendation and Feedback.** Explain the trace and publish at most one main action on Today with sources, limitations and controls. Accept records intent. Adjust is rechecked. Decline records feedback. Complete is a separate confirmation. Trigger reevaluation when relevant.

The **AI Assistant** uses saved PI, relevant summaries, decision evidence and AS mappings AK051–AK060. Conversation memory cites its source messages and serves as context. Financial fields are updated through PI controls.

## 2. Formula ownership

Each canonical formula has one implementation owner. Formula names and policy references are retained in the decision trace.

| ID | Canonical expression | Owner | Use |
|---|---|---|---|
| `F001` | `L = sum(accessible_cash_like_accounts) - restricted_amounts` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Compute accessible liquid funds and a separate dedicated reserve. Moving funds between equally liquid accounts creates no liquid assets. |
| `F002` | `M = L / E_month` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Compute months of essential expenses covered. Return NEEDS_DATA if the denominator is missing or nonpositive. |
| `F003` | `A = max(0, cash + confirmed_inflows_before_horizon - mandatory_outflows_before_horizon - buffer_floor)` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Determine cash available for optional actions. Preserve any negative cash projection in F004 and shortfall in F019. |
| `F004` | `cash_t = cash_0 + SUM(inflows_<=t) - SUM(outflows_<=t)` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Project signed daily cash on the 90-day horizon, including negative cash balances. |
| `F005` | `daily_rate = APR_decimal / 365` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Compute daily interest rate from known APR. Unknown APR requires data. |
| `F006` | `interest_day = principal_day * daily_rate` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Compute daily interest given the principal and verified accrual conditions. |
| `F007` | `P = B*r/(1-(1+r)^(-n))` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Compute a fixed loan annuity payment. |
| `F008` | `delta_I = interest_baseline - interest_after_action` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Calculate interest avoided over 90 days for scoring and over 12 months for explanation. Principal repayment is excluded from savings. |
| `F009` | `n = -ln(1-B*r/P)/ln(1+r)` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Estimate time to repay using a fixed payment under the stated assumptions. |
| `F010` | `avoidable_cost = future_interest_and_fees_if_no_action - after_action_cost` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Calculate avoided interest and fees over the 90-day horizon. |
| `F011` | `annual_saving = monthly_cancelled_cost * 12 - exit_fees - replacement_cost` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Calculate the 90-day effect from confirmed billing occurrences, exit fees and replacement costs. Keep the annual value separately for explanation. |
| `F012` | `goal_pct = min(1, max(0, saved_amount / target_amount))` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Calculate goal progress for a positive target. |
| `F013` | `required = max(0, target - current_saving) / months_remaining` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Calculate the required monthly contribution for deadline feasibility (R012, A012, A013). |
| `F014` | `delta_M = months_after_action - months_before_action` | `ImpactCalculator` (`impactCalculator.ts`) | Apply F002 to comparable baseline and action states to compute the resilience difference. |
| `F015` | `delta_G = progress_after - progress_before` | `ImpactCalculator` (`impactCalculator.ts`) | Apply F012 to baseline and action states. Avoid counting goal advancement as monetary savings. |
| `F016` | `C = documented_task_steps_or_minutes + calibrated_user_burden_model` | `ComplexityEvaluator` (`complexityEvaluator.ts`) | Combine T, S, D and O with the versioned prototype rubric. |
| `F017` | `S(a) = w_R*v_R(a) + w_F*v_F(a) + w_G*v_G(a) - lambda_C*c_C(a)` | `ScoringEngine` (`scoringEngine.ts`) | Rank eligible financial actions using the approved prototype scoring policy. |
| `F018` | `p_win(i) = count(i is argmax S under sampled parameters) / N` | `RobustnessEngine` (`robustnessChecker.ts`) | Estimate win frequency using seeded variation of the chosen weight profile. |
| `F019` | `shortfall = max(0, mandatory_due - liquid_available_by_due)` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Identify cash shortfall at the payment due date for A001, A005 and A020. |
| `F020` | `fee_delta = future_baseline_fees - future_fees_after_change` | `SharedFinancialCalculator` (shared/calculator/index.ts) | Calculate avoided fees over 90 days when the fee schedule is confirmed. |

## 3. Catalog eligibility and action types

- All A001–A026 records preserve PENDING_REVIEW and approved_for_production = NO. The prototype_enabled and today_enabled flags are separate from canonical approval. Experimental beta publication follows D-014.
- Financial actions are A001, A002, A005, A007, A008, A010, A011, A012, A013, A015, A018 and A019.
- Verification actions are A003, A004, A006, A009, A014, A016, A017, A020, A024, A025 and A026. Use rules to select clarification and unlocking actions. They do not receive invented financial effects.
- Educational actions A021, A022 and A023 are available for explanations or Assistant and have today_enabled = false.
- AK051–AK060 map Assistant to A004, A005, A006, A009, A013, A021, A022, A023, A025 and A026. These mappings are references. Today eligibility follows the action's own flags.
- A supported non-executing source-backed review may be shown with AS links and without a financial score. A proposal requiring execution must bind to an existing checked contract for the same action and target.

## 4. Independent critical coverage

| ID | Trigger | Priority behavior |
|---|---|---|
| A001 | Required unpaid card minimum within the configured imminent window, affordable under R001. | Prioritize payment of the obligation. |
| A005 | Confirmed shortfall for the required card minimum under F019/R008 and a confirmed issuer. | Prioritize contacting the issuer about affordable arrangements. |
| A011 | A scheduled transfer causes cash to fall below the protected floor before a mandatory payment under R001/R004. | Prioritize preventing the avoidable shortfall. |
| A020 | F004/F019 detects a shortfall and pausing an applicable transfer alone does not close it. | Show the diagnostic action and needed information. |

Eligible critical actions bypass ordinary financial scoring. They are ordered by severity, due date and ability to reduce or eliminate the shortfall. Applicable data and safety checks still apply.

## 5. Decision mathematics

### Weights

Select the first applicable profile in policy order:

- **Liquidity protection:** (0.50, 0.35, 0.15). Enter below 1.0 months of liquid coverage and exit at 1.25 months or above.
- **Expensive debt:** (0.20, 0.60, 0.20). Applies outside liquidity protection when a confirmed debt has APR at least 15% and accrues interest or its promotion expires within the horizon.
- **Goal advancement:** (0.20, 0.20, 0.60). Applies outside the preceding profiles when a positive-target active goal remains unfinished.
- **Balanced:** (0.34, 0.33, 0.33). Applies otherwise.

### Impacts and complexity

Compare the baseline trajectory and the action trajectory over the same 90-day horizon. Preserve raw impacts, currencies, units, 12-month explanatory debt projections, normalized values and clipping indicators.

Normalize by the prototype references \(K_R=0.25\) months, \(K_F=0.05 E_{\mathrm{month}}\) in base currency and \(K_G=0.20\). Clip normalized effects to [-1, 1]. Return NEEDS_DATA when essential expenses cannot support normalization. With no active goal, the goal effect is zero.

Run one complexity batch for eligible checked candidates. The model assesses time \(T\), procedural steps \(S\), external dependencies \(D\) and ongoing effort \(O\) in [0, 1], with rationale, supporting facts and missing information. For UNKNOWN or invalid factors, apply the existing catalog baseline and record uncertainty. Code computes F016 and F017:

\[
c_C(a)=0.25(T+S+D+O)
\qquad
S(a,x)=w_Rv_R+w_Fv_F+w_Gv_G-\lambda_Cc_C(a)
\]

The prototype value of \(\lambda_C\) is 0.10.

### Robustness

Use 200 seeded simulations with each selected weight varied independently within ±10% and renormalized to sum to one. Record sensitivity to \(\lambda_C\) in {0, 0.05, 0.10, 0.15} without requiring the winner to persist at every value.

The prototype stability threshold is 0.80. Mark decisions within a score gap below 0.03 as close. Prefer lower data uncertainty and financial risk, then lower complexity, without applying the complexity penalty twice.

Distinguish MISSING_PI_DATA, UNSTABLE_ASSUMPTIONS and CLOSE_VALID_ALTERNATIVES. Follow the conservative non-publication behavior recorded in Q-014 for unresolved instability. F018 measures sensitivity to scoring parameters.

## 6. Evidence and persistence

Persist versioned analysis and published traces in encrypted SQLite. Keep a distinct financial reference date and execution timestamp. Save source references and status, including actual fallback use, for each stage. Report observed repeats, comparative spending and largest observations with their account, currency and coverage. An unconfirmed pattern cannot establish future obligations, savings or critical triggers.

The [storage map](testing/live-review/PI-STORAGE.md) specifies actual SQLite paths and proposed PostgreSQL mappings. The [live results recap](testing/live-review/RECAP.md) links isolated evidence for Debt, Strong and Nora.
