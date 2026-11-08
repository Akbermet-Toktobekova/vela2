# Vela live results recap

Run 2026-11-08T20-37-27-186Z. Financial snapshot 2026-11-05T12:00:00.000Z.

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
- Behavior summary — Outflows to harbor properties occurred monthly in August, September, and October 2026 with an amount of -980 EUR. Inflows from danube studio occurred monthly in August, September, and October 2026 with an amount of 2350 EUR. An emergency cushion goal is specified with a target amount of 3000 EUR by target date 2027-06-30.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Review Credit Card APR and Balance — **NEEDS_DATA**. Review the credit card details for debt-1, which carries an APR of 21.9% and a balance of 850 EUR due on 2026-11-15. **Checker:** Missing: Interest accrual status for debt-1 **Origin:** MODEL.
- primary-2 · Review Emergency Cushion Target Progress — **VALID**. Review the emergency cushion goal (goal-1) with a target of 3000 EUR by 2027-06-30 and current allocations. **Checker:** The review step aligns with goal-1 specifying a target of 3000 EUR by 2027-06-30 and account-2 showing 600 EUR allocated. It is read-only and does not contradict any facts or claims. **Origin:** MODEL.
- primary-3 · Check Upcoming Rent Obligation — **VALID**. Verify the status of the upcoming rent obligation (obligation-1) of 980 EUR due on 2026-11-06. **Checker:** The review step correctly verifies the status of obligation-1 of 980 EUR due on 2026-11-06 against account-1. It is read-only and consistent with the supplied facts. **Origin:** MODEL.

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
