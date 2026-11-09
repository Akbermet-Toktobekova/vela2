# strong-missing-fx

Actual run: `2026-11-08T21-19-11-907Z`. Model: Gemini 3.5 Flash Lite.

Today: **Confirm financial information**.
Decision: `NEEDS_DATA`. Action: `None`. Score: `None`.

Catalog requested: `True`. Critical coverage: `[]`.

[Exact generator input and raw output](../runs/2026-11-08T21-19-11-907Z/strong/suggestion-generator.md) · [Checker and per-proposal evidence](../runs/2026-11-08T21-19-11-907Z/strong/checker.md) · [Decision trace](../runs/2026-11-08T21-19-11-907Z/strong/decision-engine.md)

## primary-1 — Review the unpaid energy obligation

Intent: `REVIEW`. Verdict: **VALID**. Origin: `MODEL`.

Check the unpaid energy obligation of 150 EUR due on 2026-11-15.

Rationale: The obligation is currently unpaid and reviewable against available liquidity.

Checker: The step proposes a read-only review of the unpaid energy obligation due on 2026-11-15 for 150 EUR, which is fully supported by the facts data and remains non-executing.

Usefulness: `WEAK` — No matching open decision or information gap.

PI: `['obligation-2']`. Claims: `[]`.
Missing information: `[]`.

## primary-2 — Review the general savings goal contribution

Intent: `REVIEW`. Verdict: **VALID**. Origin: `MODEL`.

Examine the confirmed contribution of 500 EUR targeted toward the general savings goal.

Rationale: The goal has a confirmed contribution amount and funding account reference.

Checker: The step proposes a read-only review of the general savings goal contribution of 500 EUR, which is consistent with the supplied goal fact and remains non-executing.

Usefulness: `WEAK` — No matching open decision or information gap.

PI: `['goal-1']`. Claims: `[]`.
Missing information: `[]`.

## primary-3 — Desired dedicated emergency reserve target

Intent: `CLARIFY`. Verdict: **NEEDS_DATA**. Origin: `MODEL`.

What dedicated emergency reserve target would you like to protect before funding other goals?

Rationale: Clarifying the emergency reserve target helps assess overall liquidity needs.

Checker: Missing: Desired dedicated emergency reserve target

Usefulness: `NOT_ELIGIBLE` — The proposal has not passed the safety and evidence checks.

PI: `['financial-metrics', 'data-quality']`. Claims: `[]`.
Missing information: `['Desired dedicated emergency reserve target']`.

## Evidence files

- [ai-evaluation](../runs/2026-11-08T21-19-11-907Z/strong/ai-evaluation.md)
- [as](../runs/2026-11-08T21-19-11-907Z/strong/as.md)
- [assistant-context](../runs/2026-11-08T21-19-11-907Z/strong/assistant-context.md)
- [assistant](../runs/2026-11-08T21-19-11-907Z/strong/assistant.md)
- [behavior-agent](../runs/2026-11-08T21-19-11-907Z/strong/behavior-agent.md)
- [beta-review](../runs/2026-11-08T21-19-11-907Z/strong/beta-review.md)
- [catalog-selector](../runs/2026-11-08T21-19-11-907Z/strong/catalog-selector.md)
- [checker](../runs/2026-11-08T21-19-11-907Z/strong/checker.md)
- [classification](../runs/2026-11-08T21-19-11-907Z/strong/classification.md)
- [conversation-memory](../runs/2026-11-08T21-19-11-907Z/strong/conversation-memory.md)
- [critical-coverage](../runs/2026-11-08T21-19-11-907Z/strong/critical-coverage.md)
- [debt-agent](../runs/2026-11-08T21-19-11-907Z/strong/debt-agent.md)
- [debt-calculator](../runs/2026-11-08T21-19-11-907Z/strong/debt-calculator.md)
- [decision-engine](../runs/2026-11-08T21-19-11-907Z/strong/decision-engine.md)
- [explanation](../runs/2026-11-08T21-19-11-907Z/strong/explanation.md)
- [feedback](../runs/2026-11-08T21-19-11-907Z/strong/feedback.md)
- [financial-calculator](../runs/2026-11-08T21-19-11-907Z/strong/financial-calculator.md)
- [fx](../runs/2026-11-08T21-19-11-907Z/strong/fx.md)
- [impact](../runs/2026-11-08T21-19-11-907Z/strong/impact.md)
- [import](../runs/2026-11-08T21-19-11-907Z/strong/import.md)
- [pattern-recognition](../runs/2026-11-08T21-19-11-907Z/strong/pattern-recognition.md)
- [pi](../runs/2026-11-08T21-19-11-907Z/strong/pi.md)
- [postgres-mock](../runs/2026-11-08T21-19-11-907Z/strong/postgres-mock.md)
- [robustness](../runs/2026-11-08T21-19-11-907Z/strong/robustness.md)
- [scoring](../runs/2026-11-08T21-19-11-907Z/strong/scoring.md)
- [suggestion-generator](../runs/2026-11-08T21-19-11-907Z/strong/suggestion-generator.md)
- [weights](../runs/2026-11-08T21-19-11-907Z/strong/weights.md)

## Provider failures and retries

None recorded.
