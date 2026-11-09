# nora

Actual run: `2026-11-08T20-50-32-315Z`. Model: Gemini 3.5 Flash Lite.

Today: **Review recurring subscription before cancellation**.
Decision: `RECOMMENDATION_READY`. Action: `A014`. Score: `None`.

Catalog requested: `True`. Critical coverage: `[]`.

[Exact generator input and raw output](../runs/2026-11-08T20-50-32-315Z/nora/suggestion-generator.md) · [Checker and per-proposal evidence](../runs/2026-11-08T20-50-32-315Z/nora/checker.md) · [Decision trace](../runs/2026-11-08T20-50-32-315Z/nora/decision-engine.md)

## primary-1 — Review the interest accrual status for debt-1

Intent: `REVIEW`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

Review the latest statement for the credit card balance of 850 EUR with an APR of 21.9% and a next due date of 2026-11-15 to verify whether interest is currently accruing.

Rationale: Checking the accrual status clarifies debt-1 terms using verified financial data.

Checker: Missing: Interest accrual status for debt-1

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['debt-1']`. Claims: `[]`.
Missing information: `['Interest accrual status for debt-1']`.

## primary-2 — Clarify current account balances

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

What is the current available balance and balance date for each affected account?

Rationale: Account balances are currently marked as stale and require verification.

Checker: Missing: Current dated account balances

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['account-1', 'account-2']`. Claims: `[]`.
Missing information: `['Current dated account balances']`.

## primary-3 — Clarify confirmed funding arrangement for obligation-1

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

Is the rent payment due on 2026-11-06 already scheduled, and which funded account will cover it?

Rationale: Confirming the funding arrangement ensures proper obligation tracking ahead of the due date.

Checker: Missing: Confirmed funding arrangement for obligation-1

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['obligation-1']`. Claims: `[]`.
Missing information: `['Confirmed funding arrangement for obligation-1']`.

## Evidence files

- [ai-evaluation](../runs/2026-11-08T20-50-32-315Z/nora/ai-evaluation.md)
- [as](../runs/2026-11-08T20-50-32-315Z/nora/as.md)
- [assistant-context](../runs/2026-11-08T20-50-32-315Z/nora/assistant-context.md)
- [assistant](../runs/2026-11-08T20-50-32-315Z/nora/assistant.md)
- [behavior-agent](../runs/2026-11-08T20-50-32-315Z/nora/behavior-agent.md)
- [beta-review](../runs/2026-11-08T20-50-32-315Z/nora/beta-review.md)
- [catalog-selector](../runs/2026-11-08T20-50-32-315Z/nora/catalog-selector.md)
- [checker](../runs/2026-11-08T20-50-32-315Z/nora/checker.md)
- [classification](../runs/2026-11-08T20-50-32-315Z/nora/classification.md)
- [conversation-memory](../runs/2026-11-08T20-50-32-315Z/nora/conversation-memory.md)
- [critical-coverage](../runs/2026-11-08T20-50-32-315Z/nora/critical-coverage.md)
- [debt-agent](../runs/2026-11-08T20-50-32-315Z/nora/debt-agent.md)
- [debt-calculator](../runs/2026-11-08T20-50-32-315Z/nora/debt-calculator.md)
- [decision-engine](../runs/2026-11-08T20-50-32-315Z/nora/decision-engine.md)
- [explanation](../runs/2026-11-08T20-50-32-315Z/nora/explanation.md)
- [feedback](../runs/2026-11-08T20-50-32-315Z/nora/feedback.md)
- [financial-calculator](../runs/2026-11-08T20-50-32-315Z/nora/financial-calculator.md)
- [fx](../runs/2026-11-08T20-50-32-315Z/nora/fx.md)
- [impact](../runs/2026-11-08T20-50-32-315Z/nora/impact.md)
- [import](../runs/2026-11-08T20-50-32-315Z/nora/import.md)
- [pattern-recognition](../runs/2026-11-08T20-50-32-315Z/nora/pattern-recognition.md)
- [pi](../runs/2026-11-08T20-50-32-315Z/nora/pi.md)
- [postgres-mock](../runs/2026-11-08T20-50-32-315Z/nora/postgres-mock.md)
- [robustness](../runs/2026-11-08T20-50-32-315Z/nora/robustness.md)
- [scoring](../runs/2026-11-08T20-50-32-315Z/nora/scoring.md)
- [suggestion-generator](../runs/2026-11-08T20-50-32-315Z/nora/suggestion-generator.md)
- [weights](../runs/2026-11-08T20-50-32-315Z/nora/weights.md)

## Provider failures and retries

None recorded.
