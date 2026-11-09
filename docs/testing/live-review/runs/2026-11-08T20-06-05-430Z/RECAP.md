# Vela live results recap

Run 2026-11-08T20-06-05-430Z. Financial snapshot 2026-11-05T12:00:00.000Z.

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
- Behavior summary — The utility obligation date of 2026-11-18 occurs before the salary income date of 2026-11-25 in EUR, with a reference date of 2026-11-05.
- Pattern summary — The utility obligation date of 2026-11-18 occurs before the salary income date of 2026-11-25 in EUR, with a reference date of 2026-11-05.
- primary-1 · Review Credit Card Payment Risk — **NEEDS_DATA**. Review the upcoming credit card minimum payment due on 2026-11-08 and check available liquid funds. **Checker:** Advice requires executable financial checks or contains a monetary amount or rate. **Origin:** MODEL.
- primary-2 · Review Utility Obligation Timing — **VALID**. Examine the energy obligation due on 2026-11-18 relative to the monthly salary income date of 2025-11-25. **Checker:** The proposal correctly examines the energy obligation due on 2026-11-18 relative to the salary income timing, grounded in obligation-1 and income-1 without conflicting with any PI or AS facts. **Origin:** MODEL.
- primary-3 · Clarify Available Funding for Debt — **NEEDS_DATA**. Clarify what funds can be confirmed as available before the payment due on 2026-11-08 for debt-1. **Checker:** Missing: Available funding by the due date for debt-1 **Origin:** MODEL.

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

- Google API returned 11 live responses. 0 calls used fallback.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Review recurring energy obligations**. Financial score **Not scored**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — Observed multiple outflow transactions across various merchant categories in the main EUR account between August and November 2026. Observed multiple HUF account inflows and outflows across various categories between August and November 2026. Observed account service charges and fees on both the main (EUR) and huf (HUF) accounts.
- Pattern summary — Observed multiple outflow transactions across various merchant categories in the main EUR account between August and November 2026. Observed multiple HUF account inflows and outflows across various categories between August and November 2026. Observed account service charges and fees on both the main (EUR) and huf (HUF) accounts.
- primary-1 · Review recurring energy obligations — **VALID**. Review the upcoming monthly energy obligation and ensure funds are ready for the November due date. **Checker:** The step proposes reviewing the upcoming monthly energy obligation (obligation-2) due on 2026-11-15, which is consistent with the supplied PI fact showing an unpaid energy obligation of 150 EUR due on that date. **Origin:** MODEL.
- primary-2 · Review general savings goal details — **VALID**. Review the current target amount and timeline set for the general savings goal. **Checker:** The step proposes reviewing the general savings goal details (goal-1), which is consistent with the supplied PI fact detailing a general savings goal with a target of 6000 EUR and a deadline of 2027-06-30. **Origin:** MODEL.
- primary-3 · Clarify intended contribution to goal-1 — **NEEDS_DATA**. Provide the intended contribution amount and timeline for the general savings goal. **Checker:** Missing: Intended contribution to goal-1 **Origin:** MODEL.

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

- Google API returned 9 live responses. 2 calls used fallback.
- Imported transactions **48**. Actual beta decision **RECOMMENDATION_READY**. Today **Review account balance freshness**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
- Behavior summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Review account balance freshness — **VALID**. Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available. **Checker:** The step proposes reviewing account balances for account-1 and account-2, which is consistent with the data showing that account-1 and account-2 balances are marked as stale (isStale: true) on 2026-10-28. **Origin:** MODEL.
- primary-2 · Verify credit card interest accrual status — **NEEDS_DATA**. Check whether interest is currently accruing on debt-1 to evaluate future card balance growth. **Checker:** Missing: Interest accrual status for debt-1 **Origin:** MODEL.
- primary-3 · Clarify Current dated account balances — **NEEDS_DATA**. Provide the current available balance and balance date for each cited account. **Checker:** Missing: Current dated account balances **Origin:** MODEL.

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
