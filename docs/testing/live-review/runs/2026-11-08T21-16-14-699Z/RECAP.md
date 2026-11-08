# Vela live results recap

Run 2026-11-08T21-16-14-699Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Synthetic variant: nora-fresh.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 03 Nora

- Google API returned 11 live responses. 1 calls used fallback.
- Imported transactions **48**. Actual beta decision **RECOMMENDATION_READY**. Today **Review recurring subscription before cancellation**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
- Behavior summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Review the upcoming rent obligation due on 2026-11-06 — **VALID**. Review the rent obligation of 980 EUR due on 2026-11-06 to ensure funds are allocated. **Checker:** The review step for the upcoming rent obligation due on 2026-11-06 of 980 EUR is fully consistent with obligation-1 and does not contradict any PI facts or applicable AS claims. **Origin:** MODEL.
- primary-2 · Interest accrual status for debt-1 — **NEEDS_DATA**. Does the latest statement confirm that interest is currently accruing? **Checker:** Missing: Interest accrual status for debt-1 **Origin:** MODEL.
- primary-3 · Review the credit card minimum payment due on 2026-11-15 — **VALID**. Examine the credit card minimum payment of 55 EUR with an APR of 21.9% due on 2026-11-15. **Checker:** The review step for the credit card minimum payment due on 2026-11-15 with an APR of 21.9% is consistent with debt-1 and does not contradict any PI facts or applicable AS claims. **Origin:** MODEL.

- [import](nora/import.md)
- [pi](nora/pi.md)
- [as](nora/as.md)
- [assistant context](nora/assistant-context.md)
- [conversation memory](nora/conversation-memory.md)
- [fx](nora/fx.md)
- [classification](nora/classification.md)
- [pattern recognition](nora/pattern-recognition.md)
- [behavior agent](nora/behavior-agent.md)
- [financial calculator](nora/financial-calculator.md)
- [debt calculator](nora/debt-calculator.md)
- [debt agent](nora/debt-agent.md)
- [suggestion generator](nora/suggestion-generator.md)
- [catalog selector](nora/catalog-selector.md)
- [checker](nora/checker.md)
- [critical coverage](nora/critical-coverage.md)
- [ai evaluation](nora/ai-evaluation.md)
- [weights](nora/weights.md)
- [decision engine](nora/decision-engine.md)
- [explanation](nora/explanation.md)
- [scoring](nora/scoring.md)
- [robustness](nora/robustness.md)
- [impact](nora/impact.md)
- [beta review](nora/beta-review.md)
- [assistant](nora/assistant.md)
- [feedback](nora/feedback.md)
- [postgres mock](nora/postgres-mock.md)
