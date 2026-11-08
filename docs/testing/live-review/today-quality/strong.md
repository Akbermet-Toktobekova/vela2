# strong

Actual run: `2026-11-08T21-16-59-426Z`. Model: Gemini 3.5 Flash Lite.

Today: **Contribute EUR 4550 toward "Education"**.
Decision: `RECOMMENDATION_READY`. Action: `A012`. Score: `0.58875`.

Catalog requested: `False`. Critical coverage: `[]`.

[Exact generator input and raw output](../runs/2026-11-08T21-16-59-426Z/strong/suggestion-generator.md) · [Checker and per-proposal evidence](../runs/2026-11-08T21-16-59-426Z/strong/checker.md) · [Decision trace](../runs/2026-11-08T21-16-59-426Z/strong/decision-engine.md)

## primary-1 — Review upcoming energy obligation status and timing

Intent: `REVIEW`. Verdict: **VALID**. Origin: `MODEL`.

Review the unpaid energy obligation energy of 150 EUR due on 2026-11-15 against liquid balances.

Rationale: Verifies that sufficient liquidity covers the upcoming energy obligation.

Checker: The proposal asks to review the unpaid energy obligation of 150 EUR due on 2026-11-15 against liquid balances. This matches the data in obligation-2 and account-1, and is a safe read-only review.

Usefulness: `WEAK` — No matching open decision or information gap.

PI: `['obligation-2', 'account-1']`. Claims: `[]`.
Missing information: `[]`.

## primary-2 — Intended contribution to goal-1

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

What amount, if any, do you intend to allocate toward this goal and when?

Rationale: Clarifies the intended contribution amount and schedule for the savings goal.

Checker: Missing: Intended contribution to goal-1

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['goal-1']`. Claims: `[]`.
Missing information: `['Intended contribution to goal-1']`.

## primary-3 — Preferred funding account for goal-1

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

Which account and currency, if any, would you prefer to use for this goal?

Rationale: Identifies the preferred funding source for allocations toward the savings goal.

Checker: Missing: Preferred funding account for goal-1

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['goal-1', 'account-1', 'account-2']`. Claims: `[]`.
Missing information: `['Preferred funding account for goal-1']`.

## Evidence files

- [ai-evaluation](../runs/2026-11-08T21-16-59-426Z/strong/ai-evaluation.md)
- [as](../runs/2026-11-08T21-16-59-426Z/strong/as.md)
- [assistant-context](../runs/2026-11-08T21-16-59-426Z/strong/assistant-context.md)
- [assistant](../runs/2026-11-08T21-16-59-426Z/strong/assistant.md)
- [behavior-agent](../runs/2026-11-08T21-16-59-426Z/strong/behavior-agent.md)
- [beta-review](../runs/2026-11-08T21-16-59-426Z/strong/beta-review.md)
- [catalog-selector](../runs/2026-11-08T21-16-59-426Z/strong/catalog-selector.md)
- [checker](../runs/2026-11-08T21-16-59-426Z/strong/checker.md)
- [classification](../runs/2026-11-08T21-16-59-426Z/strong/classification.md)
- [conversation-memory](../runs/2026-11-08T21-16-59-426Z/strong/conversation-memory.md)
- [critical-coverage](../runs/2026-11-08T21-16-59-426Z/strong/critical-coverage.md)
- [debt-agent](../runs/2026-11-08T21-16-59-426Z/strong/debt-agent.md)
- [debt-calculator](../runs/2026-11-08T21-16-59-426Z/strong/debt-calculator.md)
- [decision-engine](../runs/2026-11-08T21-16-59-426Z/strong/decision-engine.md)
- [explanation](../runs/2026-11-08T21-16-59-426Z/strong/explanation.md)
- [feedback](../runs/2026-11-08T21-16-59-426Z/strong/feedback.md)
- [financial-calculator](../runs/2026-11-08T21-16-59-426Z/strong/financial-calculator.md)
- [fx](../runs/2026-11-08T21-16-59-426Z/strong/fx.md)
- [impact-cand_A012_education](../runs/2026-11-08T21-16-59-426Z/strong/impact-cand_A012_education.md)
- [import](../runs/2026-11-08T21-16-59-426Z/strong/import.md)
- [pattern-recognition](../runs/2026-11-08T21-16-59-426Z/strong/pattern-recognition.md)
- [pi](../runs/2026-11-08T21-16-59-426Z/strong/pi.md)
- [postgres-mock](../runs/2026-11-08T21-16-59-426Z/strong/postgres-mock.md)
- [robustness](../runs/2026-11-08T21-16-59-426Z/strong/robustness.md)
- [scoring](../runs/2026-11-08T21-16-59-426Z/strong/scoring.md)
- [suggestion-generator](../runs/2026-11-08T21-16-59-426Z/strong/suggestion-generator.md)
- [weights](../runs/2026-11-08T21-16-59-426Z/strong/weights.md)

## Provider failures and retries

None recorded.
