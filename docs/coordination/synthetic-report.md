> Core MVP revalidation 2026-11-04: **185/185 tests,14/14 E2E,27/27 web tests passed**; server/web types and production build passed. Current actual scenario data, Checker results, raw and normalized impacts, complexity and F018 are recorded in [core-mvp/scenarios.json](evidence/core-mvp/scenarios.json); [commands/output](handoffs/FIX-1.md). All12 captured ready decisions match exact VALID Checker candidates. No extra JSON/CSV synthetic profiles. Policy remains PROTOTYPE_ONLY; synthetic tests do not calibrate empirical benefit. Historical results below are retained as history and are superseded by this evidence.

# FinAgent (Vela) v1.1 — Report on the 14 mandatory E2E scenarios and synthetic audit (`synthetic-report.md`)

> **Revalidation 2026-11-04 (T-09).** All 14 mandatory scenarios passed again in **111/111 tests across eight files**. Commands, mock/live/HTTP boundaries and regressions are documented in [T-09](handoffs/T-09.md) with [actual output](evidence/T-09/integration-tests.txt). The following 32-test report is historical evidence. It does not establish empirical calibration. At that checkpoint user-inputs/synthetic contained no additional JSON/CSV profiles.

> **Historical status.** All 14 mandatory E2E scenarios (`server/tests/e2e/finagent-14-scenarios.test.ts`) and 18 Phase 1 unit/contract tests (`server/tests/phase1-foundation.test.ts`) passed (**32 / 32 passed**).
> **Policy configuration:** `prototype_policy_bundle_v1.1` (`status: PROTOTYPE_ONLY`, `empiricallyValidated: false`, `server/config/prototype-policy.json`).

---

## 1. Summary of 14 E2E scenarios

| № | Scenario | `snapshotId` | Active weight profile | `Critical` triggers | Selected action (`ActionType`) | `DecisionStatus` / `PriorityClass` | Deterministic effect (`R / F / G`) | Normalized `v_R, v_F, v_G` | Complexity `c_C(a)` (`F016`) | Final `Score` (`F017`) / `Stability` (`F018`) | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **1** | Shortfall before required rent (`€650` due in three days with `€400` liquid cash) | `snap_shortfall_01` | `liquidity_protection` (`0.50/0.35/0.15`) | `A005, A020` | `A005` / `A020` (`CRITICAL`) | `RECOMMENDATION_READY` (`CRITICAL`) | Optional saving `A007` rejected by `Checker` (`INSUFFICIENT_AVAILABLE_CASH_OR_BILL_SHORTFALL`) | N/A (Step 5A Priority Policy) | N/A | N/A (Critical bypass) | **PASS** |
| **2** | Card debt at `24% APR` with insufficient cash for the minimum (`€65` due, `€20` cash) | `snap_s2_hardship` | `liquidity_protection` | `A005, A020` | `A005` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`CRITICAL`) | Protection against overdue payment (`R008`, `S004`, `C017–C020`); `A002` blocked | N/A (Step 5A Priority Policy) | N/A | N/A (Critical bypass) | **PASS** |
| **3** | Debt with unknown `APR = null` and `minimumPayment = null` | `snap_unknown_debt_01` | `liquidity_protection` | — | `A004` (`VERIFICATION_ACTION`) | `RECOMMENDATION_READY` (`VERIFICATION_UNLOCK`) | `NULL` (without invented `R/F/G`); `A002` has status `NEEDS_DATA` (`debt_apr, debt_minimum_payment`) | `NULL` | `NULL` | `NULL` | **PASS** |
| **4** | Transfer between equally liquid personal accounts (`acc_checking_eur` $\rightarrow$ `acc_secondary_checking_eur`) | `snap_baseline_01` | `liquidity_protection` | — | `A010` (`FINANCIAL_ACTION`) | `COMPUTED` (`NORMAL`) | $\Delta R = 0\text{ months}$, $\Delta F = €0$, $\Delta G = 0$ | $v_R = 0, v_F = 0, v_G = 0$ | `0.1500` | `0.0000` / `100%` | **PASS** |
| **5** | Profile with `0` active financial goals (`goals = []`, $M = 2.0$, $\text{APR} = 9.9\%$) | `snap_zero_goals_01` | `balanced` (`0.34/0.33/0.33`, excluding `goal_advancement`) | — | `A002` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`NORMAL`) | `A012` rejected by `Checker` (`NO_ACTIVE_GOAL`, `R012`); $\Delta G = 0$ | $v_G = 0$ | `0.1625` | `0.0800` / `100%` | **PASS** |
| **6** | `AI Suggestion Generator` omits a critical action for a risky automatic transfer (`€450`) causing a shortfall (`F004 < 0`) | `snap_risky_autotransfer_01` | `liquidity_protection` | `A011` (`CRITICAL_COVERAGE`) | `A011` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`CRITICAL`) | `Critical Action Coverage` independently discovers and adds `A011`, preventing the `€250` shortfall | N/A (Step 5A Priority Policy) | N/A | N/A (Critical bypass) | **PASS** |
| **7** | `AI Evaluation Call` returns invalid (`1.85`) or `UNKNOWN` factors for `T, S, O` | `snap_s7_complexity` | `liquidity_protection` | — | `A007` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`NORMAL`) | Deterministic fallback to catalog `baseline_complexity` (`usedCatalogFallback = true`, `hasUnknownComponents = true`) | `uncertaintyScore = 0.75` | `0.1250` (`F016`) | `0.1800` / `100%` | **PASS** |
| **8** | `VERIFICATION_ACTION` (`A014`) unlocks `FINANCIAL_ACTION` (`A015`, cancelling a `€29.99/month` subscription) in the next cycle | `snap_s8_sub_unlock` | `liquidity_protection` | — | Cycle 1: `A014` (`VERIFICATION_ACTION`) $\rightarrow$ Cycle 2: `A015` (`FINANCIAL_ACTION`) | Cycle 1: `VERIFICATION_UNLOCK` $\rightarrow$ Cycle 2: `RECOMMENDATION_READY` (`NORMAL`) | Cycle 2: 90-day saving `€89.97` (`3 × €29.99`), 12-month `F011` saving `€359.88` | $v_R = 0, v_F = 1.0, v_G = 0$ | `0.2125` (`F016`) | `0.3288` / `100%` | **PASS** |
| **9** | Several simultaneous `Critical Actions` (`A011`, `A001` and diagnostic `A020`) | `snap_risky_autotransfer_01` | `liquidity_protection` | `A011` (rank 1), `A001` (rank 3), `A020` (rank 4) | `A011` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`CRITICAL`) | Actions directly resolving the shortfall (`A011, A001`, `resolvesCriticalProblemDirectly = true`), rank strictly above `A020` (`false`) | N/A (Step 5A Priority Policy) | N/A | N/A (Critical bypass) | **PASS** |
| **10** | `PI` (`snapshotVersion`) changes during calculation, duplicate suppression and `Stale(y)` caching | `snap_baseline_01` | `liquidity_protection` | — | `A008` / `A007` | Run 1: `COMPLETED` $\rightarrow$ Run 2: `DUPLICATE_SUPPRESSED` $\rightarrow$ Run 3: `SUPERSEDED_BY_NEWER_SNAPSHOT` | Superseded run cannot overwrite Today (`publishedToToday = false`); `BehaviorAgent` and `DebtAgent` reuse cache (`cachedReused = true`) | Valid calculation `v_R, v_F, v_G` | `0.1250` | `0.2625` / `100%` | **PASS** |
| **11** | User feedback (`Accept`, `Adjust` with `Checker` revalidation, and `Decline`) | `snap_baseline_01` | `liquidity_protection` | — | `A008` (declined) $\rightarrow$ `A007` | `ACCEPTED` $\rightarrow$ `ADJUSTMENT_REJECTED` (`€2500`) $\rightarrow$ `ADJUSTED` (`€60`) $\rightarrow$ `DECLINED_AND_RERUN` | `Accept` preserves the balance; `Checker` blocks unsafe `Adjust €2500`; `Decline` excludes the declined action and selects the next one | Recalculated for the alternative | `0.1250` | `0.2625` / `100%` | **PASS** |
| **12** | Close decision under `F018` ($\Delta S < 0.03$) + Hysteresis `liquidity_protection` ($M = 1.15$) | `snap_baseline_01` | `liquidity_protection` (`hysteresisApplied = true` at $M = 1.15$) | — | `A007` (wins the tie-break against `A008` with an `UNKNOWN` factor) | `RECOMMENDATION_READY` (`NORMAL`) | Tie-break selects lower uncertainty and risk, then lower complexity **without subtracting $\lambda_C c_C(a)$ again** | $v_R = 0.4, v_F = 0, v_G = 0.5$ | `0.1125` | `0.2638` / `200 sims` | **PASS** |
| **13** | Multi-currency profile with unavailable `KGS` in Frankfurter ECB and stale `HUF` (>48 hours) | `snap_multicurrency_01` | `liquidity_protection` | — | `A008` / `A007` | `RECOMMENDATION_READY` (`dataQualityStatus = 'FX_WARNING'`) | `KGS` marked `UNAVAILABLE` (`rate = 0`, no invented rate `1:1`); `HUF` marked `STALE` | Calculation uses verified base-currency `EUR` data | `0.1250` | `0.2625` / `100%` | **PASS** |
| **14** | Security checks for user isolation (`403 Forbidden`), SQLite `AES-256-GCM` encryption and `PI` minimization (`R015, S019`) | `snap_baseline_01` | `liquidity_protection` | — | `A008` / `A007` + `AI Assistant` (`AK051–AK060`) | `403 FORBIDDEN_CROSS_USER_ACCESS` for another user’s `userId` | `pi_states.encrypted_payload` stores `enc:v1:...`; `minimizePIForLLM` clears `institution`, `notes`, `concernNotes` before model submission | User isolation verified | `0.1250` | `0.2625` / `100%` | **PASS** |

---

## 2. Actual test output

```text
 RUN  v3.2.7 C:/Users/sanat/OneDrive/Desktop/vela1/server

 ✓ tests/phase1-foundation.test.ts (18 tests) 135ms
 ✓ tests/e2e/finagent-14-scenarios.test.ts (14 tests) 222ms

 Test Files  2 passed (2)
      Tests  32 passed (32)
```

## UI-ZERO-1 / SDK58-PHONE — 2026-11-04

- New human-input profile: user-inputs/synthetic/ui-zero/profile.json; not a server snapshot or uploadable JSON profile. Normal, empty, unknown debt, shortfall, mixed-funds and no-goal manual branches are documented in docs/testing/UI-ZERO-GUIDE-RU.md. These branches are not claimed as completed device tests.
- Parser fixtures executed with the production parser: 8 main operations; 1 savings transfer leg; same file adds 0; overlap adds 1 and skips 1; malformed CSV accepts -12.50 and retains 2 rejected rows; unsupported text adds 0. Seven new tests passed.
- Full server suite: 15 files, 192 tests passed. Mandatory scenarios: 14/14 passed. Detailed snapshotId/readiness/profile/checker/impacts/complexity/score/stability traces are retained in evidence/core-mvp/scenarios.json from FINAGENT_CAPTURE_EVIDENCE=1.
- For parser-only/manual-input fixtures, recommendation score, action selection, complexity and stability are not applicable until a review cycle receives a completed snapshot; no values fabricated. This batch does not calibrate policy parameters or validate empirical suitability.
- Expo: typecheck passed; Android Hermes export passed. External tunnel and local Android manifest HTTP 200. Browser preview confirmed first-step welcome, empty name/email, validation blocks empty Continue, valid synthetic input advances to step 3, reload starts at step 1. Physical-device/full UI acceptance remains manual.
- No canonical AS fields, formulas, prototype-policy thresholds or backend network boundary changed.

## Latest beta verification
249 tests / 21 suites passed in the full deterministic run. Final post-fix focused run: beta-http7 + beta-financial8 =15 passed. Native Android/iOS/web export and typecheck passed. HTTPS API and Expo Android manifest each returned HTTP200. Current QR: evidence/beta/expo-qr.png. Guide: docs/testing/BETA-TEST-RU.md. Actual device run not performed. No new calibration or canonical policy approval claimed.

## AS-FIRST — 2026-11-05

Nora was rerun with `prototype_policy_bundle_v1.3`. Two primary proposals were rejected for missing supporting references. The third proposal, learning about repayment strategies, passed independent verification against C022/C023 and was published as `source_backed_advice`. Weight profile and other fields remain in the trace. The selected advice has no score or F018 result. Catalog fallback did not run. Four live Gemini calls completed without provider fallback. Controlled tests cover fallback. [Comparison](../../user-inputs/synthetic/backend-review/comparison.md) · [Actual log](evidence/CLI-REVIEW/as-first-live.log).

## Three-profile live Gemini review

The Debt, Strong, and Nora results are in [the English recap](../testing/live-review/RECAP.md). The run recorded 31 live Gemini responses, zero provider fallbacks, and the published actions A005, A012, and A014 respectively. The server suite passed all 272 tests, including the 14 mandatory E2E scenarios.


## PIPELINE-V2 checkpoint — 2026-11-08

The deterministic and injected-provider suite passed 285 tests in 26 files, including all 14 mandatory E2E scenarios. Server typecheck passed. The separate live integration test exceeded its 60-second deadline in the preceding full run.

The three-profile live capture 2026-11-08T15-22-45-737Z completed 33 model responses without provider fallback. All eight primary drafts lacked evidence references and were rejected. Catalog and critical coverage produced A005 for Debt, A012 for Strong (score 0.58875), and A014 for Nora. A later audit found JSON PII masking corrupted a decimal in Nora's model input. The fix and a regression test preserve JSON numbers and evidence IDs. Fresh acceptance is running with that fix and a stricter source-requirement prompt. See the current recap and PIPELINE-V2 handoff for final acceptance status.


## PIPELINE-V2 final acceptance — 2026-11-08

All 293 tests in 28 files passed, including the live test and 14 mandatory E2E scenarios. Server typecheck, web build and mobile typecheck passed.

Final capture 2026-11-08T15-45-05-944Z contains 81 Markdown stage reports and exact JSON inputs/outputs. Debt selected A005, Strong selected A012 for EUR4550 with score0.58875, Nora selected A014. Nora preserves the original EUR600 reserve allocation. The run includes 33 live model responses and one labelled contextual Assistant schema fallback. Source and policy approval statuses are unchanged.

The final recap, seven-stage report, formula guide and storage map are under docs/testing/live-review. Exact full-suite output is retained in evidence/pipeline-full-final.txt.

## GEMMA-CAPTURE — 2026-11-08

The authenticated beta run selected Debt A005, Strong A012 at EUR4550 with F017 score 0.58875, and Nora A014 on a EUR10.99 Sound Library charge. The Gemma pipeline completed all three profiles, with model and deterministic fallback attempts identified in the stage logs. Strong's acceptance revalidation failed while Debt and Nora accepted successfully.

The separate pinned model comparison used identical recorded requests per profile and captured 36 drafts with Checker verdicts. Gemma 26B supplied the only valid draft in that comparison. The latest automated suite passed 296 tests, including all 14 mandatory E2E scenarios. See the [runtime recap](../testing/live-review/gemma-4-31b/RECAP.md), [model comparison](../testing/live-review/gemma-4-31b/PRIMARY-COMPARISON.md) and [implementation assessment](../testing/live-review/PIPELINE-ASSESSMENT.md).

## PRIMARY-GROUNDING — 2026-11-08

The offline audit examined all 36 historical drafts and their Checker traces. The pinned Gemini 3.5 Flash Lite acceptance capture compared nine v4 drafts against nine v6 drafts with identical PI and eligible claims. Specific clarifications rose from one to nine. REJECTED fell from six to zero, and all nine after drafts returned NEEDS_DATA. Critical Debt A005 remained selected. Strong retained A012 with score 0.58875 and Nora retained A014 in the isolated decision replay. The server passed 302 automated tests, including all 14 mandatory E2E scenarios.

[Before and after](../testing/live-review/primary-grounding/GEMINI-3.5-BEFORE-AFTER.md) · [Handoff](handoffs/PRIMARY-GROUNDING.md)

## PRIMARY-CONTRADICTION — 2026-11-08

Gemini 3.5 Flash Lite returned nine actual drafts under D-021. Three reviews were VALID, five drafts were NEEDS_DATA, and one was REJECTED for a date absent from its cited facts. The catalog was skipped for all three profiles. Independent critical coverage retained A005 for Debt. The isolated decision replay selected an unscored energy-obligation review for Strong and no recommendation for Nora. The full deterministic server suite passed 304 tests including all 14 mandatory E2E scenarios.

[Live outputs and traces](../testing/live-review/primary-grounding/CHECKER-LIVE-RESULTS.md) · [Handoff](handoffs/PRIMARY-CONTRADICTION.md)

## TODAY-QUALITY — 2026-11-08

D-022 separates safety validity from usefulness and restores checked primary financial execution. The nine final original-profile drafts contain one VALID but WEAK review, seven NEEDS_DATA proposals and one REJECTED proposal; all nine are actual Gemini 3.5 Flash Lite outputs. Independent critical and catalog handling select a neutral EU issuer contact, an Education contribution and subscription verification instead of publishing a weak bill review or losing the missing-data context.

Paired profiles confirm the intended changes: EUR65 funding switches Debt to A001; US Debt retains applicable S004; confirmed Strong selects primary A012 EUR500 with score 0.23865, accepts it and validates an adjustment to EUR400; missing HUF FX blocks monetary publication and names the missing rate; fresh Nora removes the obsolete balance-confirmation gap. No real money moves. Full server verification passes 314 tests including all 14 mandatory E2E scenarios, with web build and mobile typecheck passing.

Interrupted provider attempts and a post-capture source-display correction are separately disclosed. The corrected explanation was executed deterministically from saved inputs; original live records remain unchanged. Primary and contextual complexity reliability remain development limitations.

[Actual recap](../testing/live-review/today-quality/RECAP.md) · [Seven stages with executed logs](../testing/live-review/today-quality/SEVEN-STAGES.md) · [Actual formula example](../testing/live-review/today-quality/CALCULATION-EXAMPLE.md) · [Assessment](../testing/live-review/today-quality/ASSESSMENT.md) · [Handoff](handoffs/TODAY-QUALITY.md)


## UI-BACKEND � 2026-11-08

Integrated the completed backend with the new-ui Expo Android/iOS application under D-023. Full automated verification: 35 test files, 331 passed and 2 platform-conditional skipped, including all 14 mandatory E2E scenarios. Server and Expo TypeScript checks passed. Both native bundles exported successfully.

The isolated deterministic Nora import/review profile returned NEEDS_DATA, with no invented amount or score and a concrete account-balance clarification. Current live captures remain historical evidence; this integration did not repeat the paid live benchmark. Existing synthetic financial/FX/feedback regressions passed, and import provenance verification passed 34 focused tests after the final worksheet-preservation adjustment.

[Handoff](handoffs/UI-BACKEND.md) � [Raw test output](evidence/UI-BACKEND/tests.txt) � [Synthetic profile output](evidence/UI-BACKEND/synthetic-profile.txt) � [Native export](evidence/UI-BACKEND/native-export.txt)
