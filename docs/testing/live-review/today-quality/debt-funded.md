# debt-funded

Actual run: `2026-11-08T20-48-28-000Z`. Model: Gemini 3.5 Flash Lite.

Today: **Pay required EUR 65 minimum on Credit card**.
Decision: `RECOMMENDATION_READY`. Action: `A001`. Score: `None`.

Catalog requested: `False`. Critical coverage: `['A001', 'A020']`.

[Exact generator input and raw output](../runs/2026-11-08T20-48-28-000Z/debt/suggestion-generator.md) · [Checker and per-proposal evidence](../runs/2026-11-08T20-48-28-000Z/debt/checker.md) · [Decision trace](../runs/2026-11-08T20-48-28-000Z/debt/decision-engine.md)

## primary-1 — Review the upcoming credit card payment due date and APR

Intent: `REVIEW`. Verdict: **REJECTED**. Origin: `MODEL`.

Examine the credit card debt {{debt-1.targetFactId}} with a balance of {{debt-1.balance}} {{debt-1.currency}}, a minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}}, and an APR of {{debt-1.apr}}%.

Rationale: Reviewing the credit card details helps verify the upcoming payment commitment and understand interest costs.

Checker: The proposal references an unavailable PI field.

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['debt-1']`. Claims: `[]`.
Missing information: `[]`.

## primary-2 — Review account balance and cash availability

Intent: `REVIEW`. Verdict: **REJECTED**. Origin: `MODEL`.

Verify the current balance of {{account-1.balance}} {{account-1.currency}} in account {{account-1.id}} as of {{account-1.asOf}} to assess liquidity.

Rationale: Checking current liquid funds clarifies the immediate financial position relative to scheduled obligations.

Checker: The proposal references an unavailable PI field.

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['account-1']`. Claims: `[]`.
Missing information: `[]`.

## primary-3 — What funds can you confirm are available before the payment due on 2026-11-18?

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

What funds can you confirm are available before the payment due on 2026-11-18?

Rationale: Clarifying available funding for obligation-1 helps address the projected shortfall before the due date on 2026-11-18.

Checker: Missing: Available funding by the due date for obligation-1

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['obligation-1']`. Claims: `[]`.
Missing information: `['Available funding by the due date for obligation-1']`.

## Evidence files

- [ai-evaluation](../runs/2026-11-08T20-48-28-000Z/debt/ai-evaluation.md)
- [as](../runs/2026-11-08T20-48-28-000Z/debt/as.md)
- [assistant-context](../runs/2026-11-08T20-48-28-000Z/debt/assistant-context.md)
- [assistant](../runs/2026-11-08T20-48-28-000Z/debt/assistant.md)
- [behavior-agent](../runs/2026-11-08T20-48-28-000Z/debt/behavior-agent.md)
- [beta-review](../runs/2026-11-08T20-48-28-000Z/debt/beta-review.md)
- [catalog-selector](../runs/2026-11-08T20-48-28-000Z/debt/catalog-selector.md)
- [checker](../runs/2026-11-08T20-48-28-000Z/debt/checker.md)
- [classification](../runs/2026-11-08T20-48-28-000Z/debt/classification.md)
- [conversation-memory](../runs/2026-11-08T20-48-28-000Z/debt/conversation-memory.md)
- [critical-coverage](../runs/2026-11-08T20-48-28-000Z/debt/critical-coverage.md)
- [debt-agent](../runs/2026-11-08T20-48-28-000Z/debt/debt-agent.md)
- [debt-calculator](../runs/2026-11-08T20-48-28-000Z/debt/debt-calculator.md)
- [decision-engine](../runs/2026-11-08T20-48-28-000Z/debt/decision-engine.md)
- [explanation](../runs/2026-11-08T20-48-28-000Z/debt/explanation.md)
- [feedback](../runs/2026-11-08T20-48-28-000Z/debt/feedback.md)
- [financial-calculator](../runs/2026-11-08T20-48-28-000Z/debt/financial-calculator.md)
- [fx](../runs/2026-11-08T20-48-28-000Z/debt/fx.md)
- [impact](../runs/2026-11-08T20-48-28-000Z/debt/impact.md)
- [import](../runs/2026-11-08T20-48-28-000Z/debt/import.md)
- [pattern-recognition](../runs/2026-11-08T20-48-28-000Z/debt/pattern-recognition.md)
- [pi](../runs/2026-11-08T20-48-28-000Z/debt/pi.md)
- [postgres-mock](../runs/2026-11-08T20-48-28-000Z/debt/postgres-mock.md)
- [robustness](../runs/2026-11-08T20-48-28-000Z/debt/robustness.md)
- [scoring](../runs/2026-11-08T20-48-28-000Z/debt/scoring.md)
- [suggestion-generator](../runs/2026-11-08T20-48-28-000Z/debt/suggestion-generator.md)
- [weights](../runs/2026-11-08T20-48-28-000Z/debt/weights.md)

## Provider failures and retries

- assistant: Retryable HTTP Error: Service Unavailable; used by runtime: False.
- suggestion-generator: Retryable HTTP Error: Service Unavailable; used by runtime: False.
