# Vela live results recap

Run 2026-11-08T20-32-20-542Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Synthetic variant: debt-us.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 01 Debt

- Google API returned 8 live responses. 0 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer for hardship payment options**. Financial score **Not scored**.
- Debt summary — Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months.
- Behavior summary — An obligation (utility) occurred on 2026-11-18, prior to the income (salary) on 2026-11-25, in currency EUR relative to the reference date 2026-11-05.
- Pattern summary — An obligation (utility) occurred on 2026-11-18, prior to the income (salary) on 2026-11-25, in currency EUR relative to the reference date 2026-11-05.
- primary-1 · Review credit card payment terms and due date — **NEEDS_DATA**. Review the upcoming credit card payment due on {{debt-1.nextDueDate}} with an APR of {{debt-1.apr}}% and a minimum payment of EUR 65. **Checker:** Use a reference to the exact PI field for a date, amount or rate. **Origin:** MODEL.
- primary-2 · Review energy obligation cash flow timing — **NEEDS_DATA**. Review the energy obligation due on 2026-11-18 relative to the upcoming salary date on 2026-11-25. **Checker:** Use a reference to the exact PI field for a date, amount or rate. **Origin:** MODEL.
- primary-3 · Clarify available funding for debt-1 — **NEEDS_DATA**. Clarify what funds can be confirmed as available before the payment due on 2026-11-08. **Checker:** Missing: Available funding by the due date for debt-1 **Origin:** MODEL.

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
