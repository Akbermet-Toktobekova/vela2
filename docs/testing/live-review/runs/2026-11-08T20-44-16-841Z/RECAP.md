# Vela live results recap

Run 2026-11-08T20-44-16-841Z. Financial snapshot 2026-11-05T12:00:00.000Z.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 01 Debt

- Google API returned 9 live responses. 0 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer about the upcoming minimum**. Financial score **Not scored**.
- Debt summary — Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months.
- Behavior summary — The utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) in currency EUR, with the reference date set to 2026-11-05.
- Pattern summary — The utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) in currency EUR, with the reference date set to 2026-11-05.
- primary-1 · Review the upcoming credit card minimum payment due date — **NEEDS_DATA**. Review the credit card minimum payment of 65 EUR due on 2026-11-08 with an APR of 24%. **Checker:** Independent contradiction check unavailable or incomplete. **Origin:** MODEL.
- primary-2 · Review the upcoming utility obligation due date — **NEEDS_DATA**. Review the utility obligation amount of 65 EUR due on 2026-11-18. **Checker:** Independent contradiction check unavailable or incomplete. **Origin:** MODEL.
- primary-3 · What funds can you confirm are available before the payment due on 2026-11-08? — **NEEDS_DATA**. What funds can you confirm are available before the payment due on 2026-11-08? **Checker:** Missing: Available funding by the due date for debt-1 **Origin:** MODEL.

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

- Google API returned 12 live responses. 0 calls used fallback.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Contribute EUR 4550 toward "Education"**. Financial score **0.58875**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — The stated goal is to achieve general savings of 6000 EUR by 2027-06-30. Account service charges occurred on the main EUR account on 2026-10-09, 2026-09-10, and 2026-08-09. Fee transactions were recorded on the HUF account on 2026-10-07 and 2026-09-10. Large transactions include a EUR -1100 outflow and a EUR 4200 inflow on the main account, alongside HUF -300000 and HUF 411400 transactions on the HUF account.
- Pattern summary — Observed account service charge outflows on the main EUR account on 2026-10-09, 2026-09-10, and 2026-08-09. Observed fee transactions on the huf account on 2026-10-07 and 2026-09-10. Observed multiple repeating categories of outflows on the main EUR account across August, September, and October 2026. Observed multiple repeating categories of inflows and outflows on the huf HUF account across August, September, October, and November 2026. Observed largest transactions include a EUR -1100 outflow and EUR 4200 inflow on the main account, and HUF -300000 and HUF 411400 amounts on the huf account.
- primary-1 · Intended contribution to goal-1 — **NEEDS_DATA**. What amount, if any, do you intend to allocate toward this goal and when? **Checker:** Missing: Intended contribution to goal-1 **Origin:** MODEL.
- primary-2 · Preferred funding account for goal-1 — **NEEDS_DATA**. Which account and currency, if any, would you prefer to use for this goal? **Checker:** Missing: Preferred funding account for goal-1 **Origin:** MODEL.
- primary-3 · Desired dedicated emergency reserve target — **NEEDS_DATA**. What dedicated emergency reserve target would you like to protect before funding other goals? **Checker:** Missing: Desired dedicated emergency reserve target **Origin:** MODEL.

- [import](strong/import.md)
- [pi](strong/pi.md)
- [as](strong/as.md)
- [assistant context](strong/assistant-context.md)
- [conversation memory](strong/conversation-memory.md)
- [fx](strong/fx.md)
- [classification](strong/classification.md)
- [pattern recognition](strong/pattern-recognition.md)
- [behavior agent](strong/behavior-agent.md)
- [financial calculator](strong/financial-calculator.md)
- [debt calculator](strong/debt-calculator.md)
- [debt agent](strong/debt-agent.md)
- [suggestion generator](strong/suggestion-generator.md)
- [catalog selector](strong/catalog-selector.md)
- [checker](strong/checker.md)
- [critical coverage](strong/critical-coverage.md)
- [ai evaluation](strong/ai-evaluation.md)
- [weights](strong/weights.md)
- [impact cand_A012_education](strong/impact-cand_A012_education.md)
- [scoring](strong/scoring.md)
- [robustness](strong/robustness.md)
- [decision engine](strong/decision-engine.md)
- [explanation](strong/explanation.md)
- [beta review](strong/beta-review.md)
- [assistant](strong/assistant.md)
- [feedback](strong/feedback.md)
- [postgres mock](strong/postgres-mock.md)

## 03 Nora

- Google API returned 10 live responses. 1 calls used fallback.
- Imported transactions **48**. Actual beta decision **RECOMMENDATION_READY**. Today **Review recurring subscription before cancellation**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
- Behavior summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Check current dated account balances — **NEEDS_DATA**. What is the current available balance and balance date for each affected account? **Checker:** Missing: Current dated account balances **Origin:** MODEL.
- primary-2 · Review debt interest terms — **NEEDS_DATA**. Check the interest accrual status for credit card debt-1 currently carrying an APR of {{debt-1.apr}}% and balance of 850 EUR due on {{debt-1.nextDueDate}}. **Checker:** Use a reference to the exact PI field for a date, amount or rate. **Origin:** MODEL.
- primary-3 · Check interest accrual status for debt-1 — **NEEDS_DATA**. Does the latest statement confirm that interest is currently accruing? **Checker:** Missing: Interest accrual status for debt-1 **Origin:** MODEL.

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
