# debt

Actual run: `2026-11-08T20-50-32-315Z`. Model: Gemini 3.5 Flash Lite.

Today: **Contact Credit card issuer about the upcoming minimum**.
Decision: `RECOMMENDATION_READY`. Action: `A005`. Score: `None`.

Catalog requested: `False`. Critical coverage: `['A005', 'A020']`.

[Exact generator input and raw output](../runs/2026-11-08T20-50-32-315Z/debt/suggestion-generator.md) · [Checker and per-proposal evidence](../runs/2026-11-08T20-50-32-315Z/debt/checker.md) · [Decision trace](../runs/2026-11-08T20-50-32-315Z/debt/decision-engine.md)

## primary-1 — What funds can you confirm are available before the payment due on 2026-11-08?

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

What funds can you confirm are available before the payment due on 2026-11-08?

Rationale: There is a projected shortfall of EUR 45 for the credit card payment due on 2026-11-08.

Checker: Missing: Available funding by the due date for debt-1

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['debt-1']`. Claims: `[]`.
Missing information: `['Available funding by the due date for debt-1']`.

## primary-2 — Review the upcoming credit card minimum payment and shortfall

Intent: `REVIEW`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

Examine the credit card minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}} against the liquid balance of {{account-1.balance}} {{account-1.currency}} in {{account-1.id}} to understand the projected shortfall of 45 EUR.

Rationale: The payment due on {{debt-1.nextDueDate}} occurs before the income date and exceeds current liquid cash availability.

Checker: Use a reference to the exact PI field for a date, amount or rate.

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['debt-1', 'account-1']`. Claims: `[]`.
Missing information: `[]`.

## primary-3 — What funds can you confirm are available before the payment due on 2026-11-18?

Intent: `CLARIFY`. Verdict: **REJECTED**. Origin: `MODEL`.

What funds can you confirm are available before the payment due on 2026-11-18?

Rationale: The energy obligation due on 2026-11-18 occurs before the next income date of 2026-11-25 with a projected shortfall of 65 EUR.

Checker: Date 2026-11-25 does not appear in the cited PI facts.

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['obligation-1']`. Claims: `[]`.
Missing information: `['Available funding by the due date for obligation-1']`.

## Evidence files

- [ai-evaluation](../runs/2026-11-08T20-50-32-315Z/debt/ai-evaluation.md)
- [as](../runs/2026-11-08T20-50-32-315Z/debt/as.md)
- [assistant-context](../runs/2026-11-08T20-50-32-315Z/debt/assistant-context.md)
- [assistant](../runs/2026-11-08T20-50-32-315Z/debt/assistant.md)
- [behavior-agent](../runs/2026-11-08T20-50-32-315Z/debt/behavior-agent.md)
- [beta-review](../runs/2026-11-08T20-50-32-315Z/debt/beta-review.md)
- [catalog-selector](../runs/2026-11-08T20-50-32-315Z/debt/catalog-selector.md)
- [checker](../runs/2026-11-08T20-50-32-315Z/debt/checker.md)
- [classification](../runs/2026-11-08T20-50-32-315Z/debt/classification.md)
- [conversation-memory](../runs/2026-11-08T20-50-32-315Z/debt/conversation-memory.md)
- [critical-coverage](../runs/2026-11-08T20-50-32-315Z/debt/critical-coverage.md)
- [debt-agent](../runs/2026-11-08T20-50-32-315Z/debt/debt-agent.md)
- [debt-calculator](../runs/2026-11-08T20-50-32-315Z/debt/debt-calculator.md)
- [decision-engine](../runs/2026-11-08T20-50-32-315Z/debt/decision-engine.md)
- [explanation](../runs/2026-11-08T20-50-32-315Z/debt/explanation.md)
- [feedback](../runs/2026-11-08T20-50-32-315Z/debt/feedback.md)
- [financial-calculator](../runs/2026-11-08T20-50-32-315Z/debt/financial-calculator.md)
- [fx](../runs/2026-11-08T20-50-32-315Z/debt/fx.md)
- [impact](../runs/2026-11-08T20-50-32-315Z/debt/impact.md)
- [import](../runs/2026-11-08T20-50-32-315Z/debt/import.md)
- [pattern-recognition](../runs/2026-11-08T20-50-32-315Z/debt/pattern-recognition.md)
- [pi](../runs/2026-11-08T20-50-32-315Z/debt/pi.md)
- [postgres-mock](../runs/2026-11-08T20-50-32-315Z/debt/postgres-mock.md)
- [robustness](../runs/2026-11-08T20-50-32-315Z/debt/robustness.md)
- [scoring](../runs/2026-11-08T20-50-32-315Z/debt/scoring.md)
- [suggestion-generator](../runs/2026-11-08T20-50-32-315Z/debt/suggestion-generator.md)
- [weights](../runs/2026-11-08T20-50-32-315Z/debt/weights.md)

## Provider failures and retries

- assistant: Retryable HTTP Error: Too Many Requests; used by runtime: False.
