# Vela live results recap

Run 2026-11-08T20-31-17-860Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Synthetic variant: debt-funded.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 01 Debt

- Google API returned 8 live responses. 0 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Pay required EUR 65 minimum on Credit card**. Financial score **Not scored**.
- Debt summary — Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months.
- Behavior summary — The utility obligation date of 2026-11-18 occurs before the salary income date of 2026-11-25 in currency EUR, with reference to 2026-11-05.
- Pattern summary — The utility obligation date of 2026-11-18 occurs before the salary income date of 2026-11-25 in currency EUR, with reference to 2026-11-05.
- primary-1 · Review Credit Card Debt Obligations — **NEEDS_DATA**. Examine the credit card debt 900 EUR with an APR of 24% due on 2026-11-08. **Checker:** Missing: Available funding by the due date for obligation-1 **Origin:** MODEL.
- primary-2 · Review Upcoming Utility Obligation Shortfall — **NEEDS_DATA**. Check the utility obligation of 65 EUR due on 2026-11-18 against available account balances. **Checker:** Missing: Available funding by the due date for obligation-1 **Origin:** MODEL.
- primary-3 · Clarify Available Funding for Energy Bill — **NEEDS_DATA**. Provide information on available funds for the energy obligation due on 2026-11-18. **Checker:** Missing: Available funding by the due date for obligation-1 **Origin:** MODEL.

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
