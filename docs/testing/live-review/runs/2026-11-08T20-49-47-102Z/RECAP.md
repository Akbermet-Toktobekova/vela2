# Vela live results recap

Run 2026-11-08T20-49-47-102Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Synthetic variant: debt-us.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 01 Debt

- Google API returned 9 live responses. 0 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer for hardship payment options**. Financial score **Not scored**.
- Debt summary — Debt 1: next due 2026-11-08, APR 24%, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months.
- Behavior summary — For the currency EUR, the utility obligation date occurs before the salary income date relative to the reference date, resulting in the bill occurring before income.
- Pattern summary — For the currency EUR, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) relative to the reference date (2026-11-05), resulting in the bill occurring before income.
- primary-1 · Review the upcoming debt payment and available cash balance — **NEEDS_DATA**. Examine the minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}} for debt-1 against the accessible daily spending balance of {{account-1.personalAccessibleBalance}} {{account-1.currency}}. **Checker:** Use a reference to the exact PI field for a date, amount or rate. **Origin:** MODEL.
- primary-2 · Review the energy obligation timing and income schedule — **VALID**. Verify the obligation amount of 65 EUR due on 2026-11-18 against the upcoming salary income date of 2026-11-25. **Checker:** The review step examines the energy obligation due on 2026-11-18 relative to the salary income date of 2026-11-25. This is consistent with the supplied pattern findings and supported generally by cash-flow and timing considerations in C004 and C010. **Origin:** MODEL.
- primary-3 · Available funding by the due date for debt-1 — **NEEDS_DATA**. What funds can you confirm are available before the payment due on 2026-11-08? **Checker:** Missing: Available funding by the due date for debt-1 **Origin:** MODEL.

- [import](debt/import.md)
- [pi](debt/pi.md)
- [as](debt/as.md)
- [assistant context](debt/assistant-context.md)
- [conversation memory](debt/conversation-memory.md)
- [fx](debt/fx.md)
- [classification](debt/classification.md)
- [pattern recognition](debt/pattern-recognition.md)
- [behavior agent](debt/behavior-agent.md)
- [financial calculator](debt/financial-calculator.md)
- [debt calculator](debt/debt-calculator.md)
- [debt agent](debt/debt-agent.md)
- [suggestion generator](debt/suggestion-generator.md)
- [catalog selector](debt/catalog-selector.md)
- [checker](debt/checker.md)
- [critical coverage](debt/critical-coverage.md)
- [ai evaluation](debt/ai-evaluation.md)
- [weights](debt/weights.md)
- [decision engine](debt/decision-engine.md)
- [explanation](debt/explanation.md)
- [scoring](debt/scoring.md)
- [robustness](debt/robustness.md)
- [impact](debt/impact.md)
- [beta review](debt/beta-review.md)
- [assistant](debt/assistant.md)
- [feedback](debt/feedback.md)
- [postgres mock](debt/postgres-mock.md)
