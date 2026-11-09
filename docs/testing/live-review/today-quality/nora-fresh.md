# nora-fresh

Actual run: `2026-11-08T21-16-14-699Z`. Model: Gemini 3.5 Flash Lite.

Today: **Review recurring subscription before cancellation**.
Decision: `RECOMMENDATION_READY`. Action: `A014`. Score: `None`.

Catalog requested: `True`. Critical coverage: `[]`.

[Exact generator input and raw output](../runs/2026-11-08T21-16-14-699Z/nora/suggestion-generator.md) · [Checker and per-proposal evidence](../runs/2026-11-08T21-16-14-699Z/nora/checker.md) · [Decision trace](../runs/2026-11-08T21-16-14-699Z/nora/decision-engine.md)

## primary-1 — Review the upcoming rent obligation due on 2026-11-06

Intent: `REVIEW`. Verdict: **VALID**. Origin: `MODEL`.

Review the rent obligation of 980 EUR due on 2026-11-06 to ensure funds are allocated.

Rationale: Verifying upcoming recurring bills helps maintain cash flow visibility.

Checker: The review step for the upcoming rent obligation due on 2026-11-06 of 980 EUR is fully consistent with obligation-1 and does not contradict any PI facts or applicable AS claims.

Usefulness: `WEAK` — No matching open decision or information gap.

PI: `['obligation-1']`. Claims: `[]`.
Missing information: `[]`.

## primary-2 — Interest accrual status for debt-1

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

Does the latest statement confirm that interest is currently accruing?

Rationale: Clarifying interest accrual status for debt-1 is necessary for complete debt analysis.

Checker: Missing: Interest accrual status for debt-1

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['debt-1']`. Claims: `[]`.
Missing information: `['Interest accrual status for debt-1']`.

## primary-3 — Review the credit card minimum payment due on 2026-11-15

Intent: `REVIEW`. Verdict: **VALID**. Origin: `MODEL`.

Examine the credit card minimum payment of 55 EUR with an APR of 21.9% due on 2026-11-15.

Rationale: Checking upcoming debt obligations and APR ensures proper debt management.

Checker: The review step for the credit card minimum payment due on 2026-11-15 with an APR of 21.9% is consistent with debt-1 and does not contradict any PI facts or applicable AS claims.

Usefulness: `WEAK` — No matching open decision or information gap.

PI: `['debt-1']`. Claims: `[]`.
Missing information: `[]`.

## Evidence files

- [ai-evaluation](../runs/2026-11-08T21-16-14-699Z/nora/ai-evaluation.md)
- [as](../runs/2026-11-08T21-16-14-699Z/nora/as.md)
- [assistant-context](../runs/2026-11-08T21-16-14-699Z/nora/assistant-context.md)
- [assistant](../runs/2026-11-08T21-16-14-699Z/nora/assistant.md)
- [behavior-agent](../runs/2026-11-08T21-16-14-699Z/nora/behavior-agent.md)
- [beta-review](../runs/2026-11-08T21-16-14-699Z/nora/beta-review.md)
- [catalog-selector](../runs/2026-11-08T21-16-14-699Z/nora/catalog-selector.md)
- [checker](../runs/2026-11-08T21-16-14-699Z/nora/checker.md)
- [classification](../runs/2026-11-08T21-16-14-699Z/nora/classification.md)
- [conversation-memory](../runs/2026-11-08T21-16-14-699Z/nora/conversation-memory.md)
- [critical-coverage](../runs/2026-11-08T21-16-14-699Z/nora/critical-coverage.md)
- [debt-agent](../runs/2026-11-08T21-16-14-699Z/nora/debt-agent.md)
- [debt-calculator](../runs/2026-11-08T21-16-14-699Z/nora/debt-calculator.md)
- [decision-engine](../runs/2026-11-08T21-16-14-699Z/nora/decision-engine.md)
- [explanation](../runs/2026-11-08T21-16-14-699Z/nora/explanation.md)
- [feedback](../runs/2026-11-08T21-16-14-699Z/nora/feedback.md)
- [financial-calculator](../runs/2026-11-08T21-16-14-699Z/nora/financial-calculator.md)
- [fx](../runs/2026-11-08T21-16-14-699Z/nora/fx.md)
- [impact](../runs/2026-11-08T21-16-14-699Z/nora/impact.md)
- [import](../runs/2026-11-08T21-16-14-699Z/nora/import.md)
- [pattern-recognition](../runs/2026-11-08T21-16-14-699Z/nora/pattern-recognition.md)
- [pi](../runs/2026-11-08T21-16-14-699Z/nora/pi.md)
- [postgres-mock](../runs/2026-11-08T21-16-14-699Z/nora/postgres-mock.md)
- [robustness](../runs/2026-11-08T21-16-14-699Z/nora/robustness.md)
- [scoring](../runs/2026-11-08T21-16-14-699Z/nora/scoring.md)
- [suggestion-generator](../runs/2026-11-08T21-16-14-699Z/nora/suggestion-generator.md)
- [weights](../runs/2026-11-08T21-16-14-699Z/nora/weights.md)

## Provider failures and retries

- assistant-context: [
  {
    "code": "too_big",
    "maximum": 12,
    "type": "array",
    "inclusive": true,
    "exact": false,
    "message": "Array must contain at most 12 element(s)",
    "path": [
      "factIds"
    ]
  }
]; used by runtime: True.
