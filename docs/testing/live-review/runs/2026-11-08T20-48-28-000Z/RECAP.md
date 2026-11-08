# Vela live results recap

Run 2026-11-08T20-48-28-000Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Synthetic variant: debt-funded.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 01 Debt

- Google API returned 8 live responses. 2 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Pay required EUR 65 minimum on Credit card**. Financial score **Not scored**.
- Debt summary — Debt 1: next due 2026-11-08, APR 24%, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months.
- Behavior summary — For the period referenced on 2026-11-05, the utility obligation date of 2026-11-18 occurs before the salary income date of 2026-11-25 in EUR.
- Pattern summary — For the period referenced on 2026-11-05, the utility obligation date of 2026-11-18 occurs before the salary income date of 2026-11-25 in EUR.
- primary-1 · Review the upcoming credit card payment due date and APR — **REJECTED**. Examine the credit card debt {{debt-1.targetFactId}} with a balance of {{debt-1.balance}} {{debt-1.currency}}, a minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}}, and an APR of {{debt-1.apr}}%. **Checker:** The proposal references an unavailable PI field. **Origin:** MODEL.
- primary-2 · Review account balance and cash availability — **REJECTED**. Verify the current balance of {{account-1.balance}} {{account-1.currency}} in account {{account-1.id}} as of {{account-1.asOf}} to assess liquidity. **Checker:** The proposal references an unavailable PI field. **Origin:** MODEL.
- primary-3 · What funds can you confirm are available before the payment due on 2026-11-18? — **NEEDS_DATA**. What funds can you confirm are available before the payment due on 2026-11-18? **Checker:** Missing: Available funding by the due date for obligation-1 **Origin:** MODEL.

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
