# Vela live results recap

Run 2026-11-08T20-03-39-778Z. Financial snapshot 2026-11-05T12:00:00.000Z.

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
- Behavior summary — For the currency EUR, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) relative to the reference date 2026-11-05, resulting in the bill occurring before income.
- Pattern summary — For the currency EUR, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) relative to the reference date 2026-11-05, resulting in the bill occurring before income.
- primary-1 · Review debt and obligation timeline risks — **VALID**. Review the upcoming payment risks for debt-1 due on 2026-11-08 and obligation-1 due on 2026-11-18 relative to available cash and the incoming salary date. **Checker:** The review suggestion accurately aligns with the PI account balance, obligation due dates, and projected payment risks without contradicting any source or applicable standard. **Origin:** MODEL.
- primary-2 · What funds can you confirm are available before the payment due on 2026-11-08? — **NEEDS_DATA**. Clarify the available funding for debt-1 before its due date. **Checker:** Missing: Available funding by the due date for debt-1 **Origin:** MODEL.
- primary-3 · What funds can you confirm are available before the payment due on 2026-11-18? — **NEEDS_DATA**. Clarify the available funding for obligation-1 before its due date. **Checker:** Missing: Available funding by the due date for obligation-1 **Origin:** MODEL.

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

- Google API returned 7 live responses. 3 calls used fallback.
- Imported transactions **159**. Actual beta decision **NO_RECOMMENDATION**. Today **No proactive action needed today**. Financial score **Not scored**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Observed multiple outflow transactions across various categories in the main EUR account between August and November 2026. Observed multiple inflow and outflow transactions across various categories in the HUF account between August and November 2026. Observed account service charges and fees in both EUR and HUF accounts. Observed specific largest transactions and amounts within the observed periods for both accounts. Observed comparative timing between income and specific financial obligations relative to reference date 2026-11-05.
- primary-1 · Intended contribution to goal-1 — **NEEDS_DATA**. What amount, if any, do you intend to allocate toward this goal and when? **Checker:** Missing: Intended contribution to goal-1 **Origin:** SYSTEM_CLARIFICATION.
- primary-2 · Preferred funding account for goal-1 — **NEEDS_DATA**. Which account and currency, if any, would you prefer to use for this goal? **Checker:** Missing: Preferred funding account for goal-1 **Origin:** SYSTEM_CLARIFICATION.
- primary-3 · Desired dedicated emergency reserve target — **NEEDS_DATA**. What dedicated emergency reserve target would you like to protect before funding other goals? **Checker:** Missing: Desired dedicated emergency reserve target **Origin:** SYSTEM_CLARIFICATION.

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
- [decision engine](strong/decision-engine.md)
- [explanation](strong/explanation.md)
- [scoring](strong/scoring.md)
- [robustness](strong/robustness.md)
- [impact](strong/impact.md)
- [beta review](strong/beta-review.md)
- [assistant](strong/assistant.md)
- [feedback](strong/feedback.md)
- [postgres mock](strong/postgres-mock.md)

## 03 Nora

- Google API returned 0 live responses. 9 calls used fallback.
- Imported transactions **48**. Actual beta decision **NO_RECOMMENDATION**. Today **No proactive action needed today**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
- Behavior summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Current dated account balances — **NEEDS_DATA**. What is the current available balance and balance date for each cited account? **Checker:** Missing: Current dated account balances **Origin:** SYSTEM_CLARIFICATION.
- primary-2 · Confirmed funding arrangement for obligation-1 — **NEEDS_DATA**. Is this payment already scheduled, and which currently funded account will cover it by the due date? **Checker:** Missing: Confirmed funding arrangement for obligation-1 **Origin:** SYSTEM_CLARIFICATION.
- primary-3 · Confirmed funding arrangement for obligation-2 — **NEEDS_DATA**. Is this payment already scheduled, and which currently funded account will cover it by the due date? **Checker:** Missing: Confirmed funding arrangement for obligation-2 **Origin:** SYSTEM_CLARIFICATION.

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
