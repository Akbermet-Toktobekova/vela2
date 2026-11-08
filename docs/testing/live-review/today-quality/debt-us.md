# debt-us

Actual run: `2026-11-08T20-49-47-102Z`. Model: Gemini 3.5 Flash Lite.

Today: **Contact Credit card issuer for hardship payment options**.
Decision: `RECOMMENDATION_READY`. Action: `A005`. Score: `None`.

Catalog requested: `False`. Critical coverage: `['A005', 'A020']`.

[Exact generator input and raw output](../runs/2026-11-08T20-49-47-102Z/debt/suggestion-generator.md) · [Checker and per-proposal evidence](../runs/2026-11-08T20-49-47-102Z/debt/checker.md) · [Decision trace](../runs/2026-11-08T20-49-47-102Z/debt/decision-engine.md)

## primary-1 — Review the upcoming debt payment and available cash balance

Intent: `REVIEW`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

Examine the minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}} for debt-1 against the accessible daily spending balance of {{account-1.personalAccessibleBalance}} {{account-1.currency}}.

Rationale: Reviewing the cash balance against the imminent due date helps identify the projected shortfall of {{riskContext.paymentRisks.0.projectedShortfall}} {{riskContext.paymentRisks.0.currency}} for debt-1.

Checker: Use a reference to the exact PI field for a date, amount or rate.

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['debt-1', 'account-1']`. Claims: `['C013']`.
Missing information: `[]`.

## primary-2 — Review the energy obligation timing and income schedule

Intent: `REVIEW`. Verdict: **VALID**. Origin: `MODEL`.

Verify the obligation amount of 65 EUR due on 2026-11-18 against the upcoming salary income date of 2026-11-25.

Rationale: The utility obligation date occurs before the salary income date, creating a timing mismatch.

Checker: The review step examines the energy obligation due on 2026-11-18 relative to the salary income date of 2026-11-25. This is consistent with the supplied pattern findings and supported generally by cash-flow and timing considerations in C004 and C010.

Usefulness: `USEFUL` — Resolves an open question: Available funding by the due date for obligation-1

PI: `['obligation-1', 'income-1']`. Claims: `['C004', 'C010']`.
Missing information: `[]`.

## primary-3 — Available funding by the due date for debt-1

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

What funds can you confirm are available before the payment due on 2026-11-08?

Rationale: Clarification is needed to address the projected shortfall before the upcoming due date.

Checker: Missing: Available funding by the due date for debt-1

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['debt-1']`. Claims: `[]`.
Missing information: `['Available funding by the due date for debt-1']`.

## Evidence files

- [ai-evaluation](../runs/2026-11-08T20-49-47-102Z/debt/ai-evaluation.md)
- [as](../runs/2026-11-08T20-49-47-102Z/debt/as.md)
- [assistant-context](../runs/2026-11-08T20-49-47-102Z/debt/assistant-context.md)
- [assistant](../runs/2026-11-08T20-49-47-102Z/debt/assistant.md)
- [behavior-agent](../runs/2026-11-08T20-49-47-102Z/debt/behavior-agent.md)
- [beta-review](../runs/2026-11-08T20-49-47-102Z/debt/beta-review.md)
- [catalog-selector](../runs/2026-11-08T20-49-47-102Z/debt/catalog-selector.md)
- [checker](../runs/2026-11-08T20-49-47-102Z/debt/checker.md)
- [classification](../runs/2026-11-08T20-49-47-102Z/debt/classification.md)
- [conversation-memory](../runs/2026-11-08T20-49-47-102Z/debt/conversation-memory.md)
- [critical-coverage](../runs/2026-11-08T20-49-47-102Z/debt/critical-coverage.md)
- [debt-agent](../runs/2026-11-08T20-49-47-102Z/debt/debt-agent.md)
- [debt-calculator](../runs/2026-11-08T20-49-47-102Z/debt/debt-calculator.md)
- [decision-engine](../runs/2026-11-08T20-49-47-102Z/debt/decision-engine.md)
- [explanation](../runs/2026-11-08T20-49-47-102Z/debt/explanation.md)
- [feedback](../runs/2026-11-08T20-49-47-102Z/debt/feedback.md)
- [financial-calculator](../runs/2026-11-08T20-49-47-102Z/debt/financial-calculator.md)
- [fx](../runs/2026-11-08T20-49-47-102Z/debt/fx.md)
- [impact](../runs/2026-11-08T20-49-47-102Z/debt/impact.md)
- [import](../runs/2026-11-08T20-49-47-102Z/debt/import.md)
- [pattern-recognition](../runs/2026-11-08T20-49-47-102Z/debt/pattern-recognition.md)
- [pi](../runs/2026-11-08T20-49-47-102Z/debt/pi.md)
- [postgres-mock](../runs/2026-11-08T20-49-47-102Z/debt/postgres-mock.md)
- [robustness](../runs/2026-11-08T20-49-47-102Z/debt/robustness.md)
- [scoring](../runs/2026-11-08T20-49-47-102Z/debt/scoring.md)
- [suggestion-generator](../runs/2026-11-08T20-49-47-102Z/debt/suggestion-generator.md)
- [weights](../runs/2026-11-08T20-49-47-102Z/debt/weights.md)

## Provider failures and retries

None recorded.
