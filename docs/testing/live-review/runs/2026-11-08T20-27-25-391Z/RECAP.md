# Vela live results recap

Run 2026-11-08T20-27-25-391Z. Financial snapshot 2026-11-05T12:00:00.000Z.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 01 Debt

- Google API returned 8 live responses. 0 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer about the upcoming minimum**. Financial score **Not scored**.
- Debt summary — Debt 1: next due 2026-11-08, APR 24%, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months.
- Behavior summary — For the period of 2026-11-05, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) in EUR.
- Pattern summary — For the period of 2026-11-05, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) in EUR.
- primary-1 · Review debt-1 payment timing — **NEEDS_DATA**. Review the upcoming payment due date 2026-11-08 for debt-1 with an APR of 24% and balance of 900 EUR to align available cash. **Checker:** Missing: Available funding by the due date for debt-1 **Origin:** MODEL.
- primary-2 · Review obligation-1 timing and coverage — **NEEDS_DATA**. Review the energy obligation due on 2026-11-18 in relation to the upcoming income date. **Checker:** Missing: Available funding by the due date for obligation-1 **Origin:** MODEL.
- primary-3 · Clarify payment arrangement for debt-1 — **NEEDS_DATA**. Confirm whether any alternative payment arrangement has been offered for debt-1. **Checker:** Missing: Any payment arrangement already offered for debt-1 **Origin:** MODEL.

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
- Behavior summary — Observed multiple recurring outflow categories in the main EUR account between August 2026 and October 2026. Observed account service charge outflows in the main EUR account on 2026-08-09, 2026-09-10, and 2026-10-09. Observed multiple recurring inflows and outflows in the HUF account between August 2026 and November 2026. Observed fee transactions in the HUF account on 2026-10-07 and 2026-09-10.
- Pattern summary — Observed multiple recurring outflow categories in the main EUR account between August 2026 and October 2026. Observed account service charge outflows in the main EUR account on 2026-08-09, 2026-09-10, and 2026-10-09. Observed multiple recurring inflows and outflows in the HUF account between August 2026 and November 2026. Observed fee transactions in the HUF account on 2026-10-07 and 2026-09-10.
- primary-1 · Review — **NEEDS_DATA**. Review savings goal details to determine the desired contribution for goal-1. **Checker:** Missing: Intended contribution to goal-1 **Origin:** MODEL.
- primary-2 · Review — **REJECTED**. Identify the preferred funding account for goal-1. **Checker:** Duplicate suggestion. **Origin:** MODEL.
- primary-3 · Review — **REJECTED**. Determine the desired dedicated emergency reserve target. **Checker:** Duplicate suggestion. **Origin:** MODEL.

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
- primary-1 · Review account balance currency and currency date currency — **NEEDS_DATA**. Examine the recorded balances for accounts account-1 and account-2 to ensure currency and balance dates are up to date. **Checker:** Missing: Current dated account balances **Origin:** MODEL.
- primary-2 · Verify rent obligation funding arrangement — **NEEDS_DATA**. Confirm if the rent obligation-1 due on 2026-11-06 is scheduled and which account covers it. **Checker:** Missing: Confirmed funding arrangement for obligation-1 **Origin:** MODEL.
- primary-3 · Verify interest accrual status for debt-1 — **NEEDS_DATA**. Check whether interest is currently accruing on credit card debt-1. **Checker:** Missing: Interest accrual status for debt-1 **Origin:** MODEL.

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
