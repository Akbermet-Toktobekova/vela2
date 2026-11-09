# Vela live results recap

Run 2026-11-08T20-50-32-315Z. Financial snapshot 2026-11-05T12:00:00.000Z.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 01 Debt

- Google API returned 8 live responses. 1 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer about the upcoming minimum**. Financial score **Not scored**.
- Debt summary — Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months.
- Behavior summary — For the currency EUR, the obligation date of 2026-11-18 occurs before the income date of 2026-11-25 relative to the reference date of 2026-11-05.
- Pattern summary — For the currency EUR, the obligation date (2026-11-18) occurs before the income date (2026-11-25) relative to the reference date (2026-11-05), resulting in the bill occurring before the income.
- primary-1 · What funds can you confirm are available before the payment due on 2026-11-08? — **NEEDS_DATA**. What funds can you confirm are available before the payment due on 2026-11-08? **Checker:** Missing: Available funding by the due date for debt-1 **Origin:** MODEL.
- primary-2 · Review the upcoming credit card minimum payment and shortfall — **NEEDS_DATA**. Examine the credit card minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}} against the liquid balance of {{account-1.balance}} {{account-1.currency}} in {{account-1.id}} to understand the projected shortfall of 45 EUR. **Checker:** Use a reference to the exact PI field for a date, amount or rate. **Origin:** MODEL.
- primary-3 · What funds can you confirm are available before the payment due on 2026-11-18? — **REJECTED**. What funds can you confirm are available before the payment due on 2026-11-18? **Checker:** Date 2026-11-25 does not appear in the cited PI facts. **Origin:** MODEL.

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

## 02 Strong

- Google API returned 0 live responses. 1 calls used fallback.

- [import](strong/import.md)
- [pi](strong/pi.md)
- [as](strong/as.md)
- [run error](strong/run-error.md)

## 03 Nora

- Google API returned 12 live responses. 0 calls used fallback.
- Imported transactions **48**. Actual beta decision **RECOMMENDATION_READY**. Today **Review recurring subscription before cancellation**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
- Behavior summary — Repeated outflows of -980 EUR to harbor properties were observed on August 3, September 3, and October 3, 2026. Repeated inflows of 2350 EUR from danube studio were observed on August 27, September 27, and October 27, 2026. The timing configuration indicates that the obligation date for rent occurs before the income date.
- Pattern summary — Repeated outflows to harbor properties were observed in the main account in EUR. Repeated outflows to green basket were observed in the main account in EUR. Repeated outflows to city transit were observed in the main account in EUR. Repeated outflows to bright energy were observed in the main account in EUR. Repeated outflows to fiber home were observed in the main account in EUR. Repeated outflows to sound library were observed in the main account in EUR. Repeated outflows to fictional card services were observed in the main account in EUR. Repeated outflows to corner coffee were observed in the main account in EUR. Repeated outflows to maple kitchen were observed in the main account in EUR. Repeated outflows to screen library were observed in the main account in EUR. Repeated outflows to oak pharmacy were observed in the main account in EUR. Repeated inflows from danube studio were observed in the main account in EUR.
- primary-1 · Review the interest accrual status for debt-1 — **NEEDS_DATA**. Review the latest statement for the credit card balance of 850 EUR with an APR of 21.9% and a next due date of 2026-11-15 to verify whether interest is currently accruing. **Checker:** Missing: Interest accrual status for debt-1 **Origin:** MODEL.
- primary-2 · Clarify current account balances — **NEEDS_DATA**. What is the current available balance and balance date for each affected account? **Checker:** Missing: Current dated account balances **Origin:** MODEL.
- primary-3 · Clarify confirmed funding arrangement for obligation-1 — **NEEDS_DATA**. Is the rent payment due on 2026-11-06 already scheduled, and which funded account will cover it? **Checker:** Missing: Confirmed funding arrangement for obligation-1 **Origin:** MODEL.

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

## Run errors

- 02 Strong — POST /chat (504): {"error":{"code":"AI_TIMEOUT","message":"Unable to complete request."}}
