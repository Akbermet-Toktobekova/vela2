# strong-confirmed

Actual run: `2026-11-08T21-19-03-637Z`. Model: Gemini 3.5 Flash Lite.

Today: **Allocate EUR 500 toward Education**.
Decision: `RECOMMENDATION_READY`. Action: `A012`. Score: `0.23865`.

Catalog requested: `False`. Critical coverage: `[]`.

[Exact generator input and raw output](../runs/2026-11-08T21-19-03-637Z/strong/suggestion-generator.md) · [Checker and per-proposal evidence](../runs/2026-11-08T21-19-03-637Z/strong/checker.md) · [Decision trace](../runs/2026-11-08T21-19-03-637Z/strong/decision-engine.md)

## primary-1 — Review the upcoming energy obligation

Intent: `REVIEW`. Verdict: **VALID**. Origin: `MODEL`.

Review the unpaid energy obligation energy amounting to 150 EUR due on 2026-11-15.

Rationale: The obligation is currently unpaid and coming due soon.

Checker: The review step correctly targets the unpaid energy obligation (obligation-2) due on 2026-11-15 for 150 EUR, which is consistent with the supplied facts and remains read-only.

Usefulness: `WEAK` — No matching open decision or information gap.

PI: `['obligation-2']`. Claims: `[]`.
Missing information: `[]`.

## primary-2 — Allocate the confirmed contribution to the general savings goal

Intent: `EXECUTE`. Verdict: **VALID**. Origin: `MODEL`.

Set aside the contribution recorded in 500 EUR from the confirmed account for the general savings goal.

Rationale: The goal has a confirmed contribution and funding account ready for allocation.

Checker: The execution step allocates the confirmed contribution of 500 EUR from account-1 to goal-1, aligning with the data in goal-1 and account-1.

Usefulness: `USEFUL` — The checked operation advances its specific financial target.

PI: `['goal-1', 'account-1']`. Claims: `[]`.
Missing information: `[]`.

## primary-3 — What dedicated emergency reserve target would you like to protect before funding other goals?

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

What dedicated emergency reserve target would you like to protect before funding other goals?

Rationale: The emergency reserve target is currently unspecified and needed to properly plan protections.

Checker: Missing: Desired dedicated emergency reserve target

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['financial-metrics', 'data-quality']`. Claims: `[]`.
Missing information: `['Desired dedicated emergency reserve target']`.

## Evidence files

- [ai-evaluation](../runs/2026-11-08T21-19-03-637Z/strong/ai-evaluation.md)
- [as](../runs/2026-11-08T21-19-03-637Z/strong/as.md)
- [assistant-context](../runs/2026-11-08T21-19-03-637Z/strong/assistant-context.md)
- [assistant](../runs/2026-11-08T21-19-03-637Z/strong/assistant.md)
- [behavior-agent](../runs/2026-11-08T21-19-03-637Z/strong/behavior-agent.md)
- [beta-review](../runs/2026-11-08T21-19-03-637Z/strong/beta-review.md)
- [catalog-selector](../runs/2026-11-08T21-19-03-637Z/strong/catalog-selector.md)
- [checker](../runs/2026-11-08T21-19-03-637Z/strong/checker.md)
- [classification](../runs/2026-11-08T21-19-03-637Z/strong/classification.md)
- [conversation-memory](../runs/2026-11-08T21-19-03-637Z/strong/conversation-memory.md)
- [critical-coverage](../runs/2026-11-08T21-19-03-637Z/strong/critical-coverage.md)
- [debt-agent](../runs/2026-11-08T21-19-03-637Z/strong/debt-agent.md)
- [debt-calculator](../runs/2026-11-08T21-19-03-637Z/strong/debt-calculator.md)
- [decision-engine](../runs/2026-11-08T21-19-03-637Z/strong/decision-engine.md)
- [explanation](../runs/2026-11-08T21-19-03-637Z/strong/explanation.md)
- [feedback-adjust](../runs/2026-11-08T21-19-03-637Z/strong/feedback-adjust.md)
- [feedback](../runs/2026-11-08T21-19-03-637Z/strong/feedback.md)
- [financial-calculator](../runs/2026-11-08T21-19-03-637Z/strong/financial-calculator.md)
- [fx](../runs/2026-11-08T21-19-03-637Z/strong/fx.md)
- [impact-primary_A012_education](../runs/2026-11-08T21-19-03-637Z/strong/impact-primary_A012_education.md)
- [import](../runs/2026-11-08T21-19-03-637Z/strong/import.md)
- [pattern-recognition](../runs/2026-11-08T21-19-03-637Z/strong/pattern-recognition.md)
- [pi](../runs/2026-11-08T21-19-03-637Z/strong/pi.md)
- [postgres-mock](../runs/2026-11-08T21-19-03-637Z/strong/postgres-mock.md)
- [robustness](../runs/2026-11-08T21-19-03-637Z/strong/robustness.md)
- [scoring](../runs/2026-11-08T21-19-03-637Z/strong/scoring.md)
- [suggestion-generator](../runs/2026-11-08T21-19-03-637Z/strong/suggestion-generator.md)
- [weights](../runs/2026-11-08T21-19-03-637Z/strong/weights.md)

## Provider failures and retries

None recorded.
