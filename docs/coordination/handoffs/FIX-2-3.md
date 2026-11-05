# FIX-2-3 — financial counterfactuals and publication

Changed: `shared/calculator/index.ts`, `server/src/decision/impactCalculator.ts`, `server/src/decision/decisionEngine.ts`, `server/src/decision/robustnessChecker.ts`, `server/src/decision/scoringEngine.ts`, `server/tests/financial-core-regressions.test.ts`.

Implemented under D-005/D-007/D-008/D-009: identical dated before/after horizons and raw terminal liquidity; metadata with snapshot, dates, currency, units and assumptions; internal allocations preserve total liquid assets; zero resilience gain for equally liquid transfers; dated debt interest simulation and minimum cash payments share amortization, stop at payoff, never count principal as savings; baseline already includes mandatory minimum payments, so A001 earns no invented incremental fee/interest saving. A015 requires explicit billing dates, exit/replacement costs and an observed target, with annual projection only when the verified schedule supports it. Unsupported financial effects return NEEDS_DATA. Missing essentials/FX are explicit. Optional allocations with undated essential-outflow coverage gaps require data. Accepted commitments restrict spendable liquidity without reducing actual account balances. Source-account affordability is projected by due date through a shared helper.

F018 withholding behavior is preserved and regression-tested; low stability outside eligible close valid alternatives now diagnoses unstable assumptions. Canonical validation results guard publication against rejected candidates inserted into convenience valid lists. Scoring excludes noncomputed/nonfinancial impacts. No canonical AS facts, approval statuses, financial parameters or new thresholds were introduced.

Verification (PowerShell, from `server/`):

`npx tsc --noEmit` — exit 0, no output.

`npx vitest run tests/financial-core-regressions.test.ts tests/phase1-foundation.test.ts tests/e2e/finagent-14-scenarios.test.ts`

Actual output:
```
✓ tests/phase1-foundation.test.ts (18 tests) 132ms
✓ tests/financial-core-regressions.test.ts (12 tests) 105ms
✓ tests/e2e/finagent-14-scenarios.test.ts (14 tests) 285ms
Test Files 3 passed (3)
Tests 44 passed (44)
Duration 2.54s
```

Limits: simple daily interest supports known APR/accrual state, dated minimum schedule and no new borrowing. More complex product-specific compounding or future contract changes need additional verified terms; no fictional benefit is assigned. Confirmed recurring transaction dates support the requested evaluation window; transaction history alone does not establish an annual forecast. Essential expense gaps need dated obligations, not invented payment dates. Nonfinancial critical/verification outcomes remain separate from F017 impacts. No previous recommendation is retained on unstable assumptions: it is conservatively withheld pending clarification.

Integration follow-up: restricted internal-transfer neutrality to A007/A008 with a personal destination and known accessible balance; A002 cannot suppress its cash repayment by supplying a destination account. Scheduled transfers/A010 use the same personal accessibility requirement. Corrected wording to reference-date-anchored month windows. New regression covers debt destination injection, work/held-for-others and inaccessible personal destinations.

Reverified from server/: `npx tsc --noEmit` exit 0; `npx vitest run tests/financial-core-regressions.test.ts tests/phase1-foundation.test.ts tests/e2e/finagent-14-scenarios.test.ts` → `Test Files 3 passed (3); Tests 45 passed (45)` (13 financial, 18 foundation, 14 E2E), duration 2.10s.
