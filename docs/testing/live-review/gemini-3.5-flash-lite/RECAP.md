# Vela live results recap

Run 2026-11-08T16-41-15-473Z. Financial snapshot 2026-11-05T12:00:00.000Z.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../PI-STORAGE.md)
- [Original baseline](../BASELINE-RECAP.md)
- [Previous Gemini recap](../GEMINI-RECAP.md)
- [Seven-stage results](../SEVEN-STAGES.md)
- [Formula explanation for the earlier capture](../FORMULAS.md)
- [Model run comparison](../MODEL-COMPARISON.md)
- [Primary proposals and Checker verdicts](PRIMARY-PROPOSALS.md)

## 01 Debt

- Google API returned 8 live responses. 0 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer for hardship payment options**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 24%, next due 2026-11-08, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months.
- Behavior summary — An obligation (utility) occurred on 2026-11-18 in EUR, which was before the income (salary) received on 2026-11-25.
- Pattern summary — An obligation (utility) occurred on 2026-11-18 in EUR, which was before the income (salary) received on 2026-11-25.
- primary-1 · Review energy obligation due date alignment — **REJECTED**. Review the upcoming energy obligation due on 2026-11-18 relative to your salary income date on 2026-11-25. **Checker:** Unverified or unknown AS reference. **Origin:** MODEL.
- primary-2 · Review credit card debt terms and balance — **REJECTED**. Review the credit card debt details including the balance, APR, and next due date. **Checker:** Unverified or unknown AS reference. **Origin:** MODEL.
- primary-3 · Clarify additional financial accounts or income sources — **NEEDS_DATA**. Provide details on any other potential income sources or accounts available to cover upcoming expenses. **Checker:** Missing: Additional accounts, Supplementary income sources **Origin:** MODEL.

- [import](../runs/2026-11-08T16-41-15-473Z/debt/import.md)
- [pi](../runs/2026-11-08T16-41-15-473Z/debt/pi.md)
- [as](../runs/2026-11-08T16-41-15-473Z/debt/as.md)
- [assistant context](../runs/2026-11-08T16-41-15-473Z/debt/assistant-context.md)
- [conversation memory](../runs/2026-11-08T16-41-15-473Z/debt/conversation-memory.md)
- [fx](../runs/2026-11-08T16-41-15-473Z/debt/fx.md)
- [classification](../runs/2026-11-08T16-41-15-473Z/debt/classification.md)
- [pattern recognition](../runs/2026-11-08T16-41-15-473Z/debt/pattern-recognition.md)
- [behavior agent](../runs/2026-11-08T16-41-15-473Z/debt/behavior-agent.md)
- [financial calculator](../runs/2026-11-08T16-41-15-473Z/debt/financial-calculator.md)
- [debt calculator](../runs/2026-11-08T16-41-15-473Z/debt/debt-calculator.md)
- [debt agent](../runs/2026-11-08T16-41-15-473Z/debt/debt-agent.md)
- [suggestion generator](../runs/2026-11-08T16-41-15-473Z/debt/suggestion-generator.md)
- [catalog selector](../runs/2026-11-08T16-41-15-473Z/debt/catalog-selector.md)
- [checker](../runs/2026-11-08T16-41-15-473Z/debt/checker.md)
- [critical coverage](../runs/2026-11-08T16-41-15-473Z/debt/critical-coverage.md)
- [ai evaluation](../runs/2026-11-08T16-41-15-473Z/debt/ai-evaluation.md)
- [weights](../runs/2026-11-08T16-41-15-473Z/debt/weights.md)
- [decision engine](../runs/2026-11-08T16-41-15-473Z/debt/decision-engine.md)
- [explanation](../runs/2026-11-08T16-41-15-473Z/debt/explanation.md)
- [scoring](../runs/2026-11-08T16-41-15-473Z/debt/scoring.md)
- [robustness](../runs/2026-11-08T16-41-15-473Z/debt/robustness.md)
- [impact](../runs/2026-11-08T16-41-15-473Z/debt/impact.md)
- [beta review](../runs/2026-11-08T16-41-15-473Z/debt/beta-review.md)
- [assistant](../runs/2026-11-08T16-41-15-473Z/debt/assistant.md)
- [feedback](../runs/2026-11-08T16-41-15-473Z/debt/feedback.md)
- [postgres mock](../runs/2026-11-08T16-41-15-473Z/debt/postgres-mock.md)

## 02 Strong

- Google API returned 11 live responses. 1 calls used fallback.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Contribute EUR 4550 toward "Education"**. Financial score **0.58875**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — Recorded multiple outflow categories on the main EUR account. Recorded multiple inflow and outflow categories on the HUF account. Recorded recurring fee and service charge outflows across accounts. Identified the largest recorded amounts across accounts under extreme classifications. Unconfirmed: Hypothesized timing intervals between projected income and obligations for EUR currency.
- Pattern summary — Observed account service charge outflows on the main account in EUR. Observed fee outflows on the huf account in HUF. Observed largest transactions classified as extreme-1 through extreme-18 across main and huf accounts. Unconfirmed: Hypothesized timing relationships between income and obligations for EUR currency scope. Observed repeated activity categories on the main account in EUR. Observed repeated activity categories on the huf account in HUF.
- primary-1 · Review account service charges — **REJECTED**. Review the observed account service charge outflows on the main account in EUR and fee outflows on the HUF account. **Checker:** Unverified or unknown AS reference. **Origin:** MODEL.
- primary-2 · Clarify financial education preferences — **NEEDS_DATA**. Verify whether the user wants to apply general financial education principles to manage their recurring obligations. **Checker:** Missing: User interest in financial education resources or topics **Origin:** MODEL.
- primary-3 · Clarify budget review scheduling — **NEEDS_DATA**. Confirm the preferred timing and scope for reviewing the budget based on the tentative plan. **Checker:** Missing: Preferred date and scope for the budget review **Origin:** MODEL.

- [import](../runs/2026-11-08T16-41-15-473Z/strong/import.md)
- [pi](../runs/2026-11-08T16-41-15-473Z/strong/pi.md)
- [as](../runs/2026-11-08T16-41-15-473Z/strong/as.md)
- [assistant context](../runs/2026-11-08T16-41-15-473Z/strong/assistant-context.md)
- [conversation memory](../runs/2026-11-08T16-41-15-473Z/strong/conversation-memory.md)
- [fx](../runs/2026-11-08T16-41-15-473Z/strong/fx.md)
- [classification](../runs/2026-11-08T16-41-15-473Z/strong/classification.md)
- [pattern recognition](../runs/2026-11-08T16-41-15-473Z/strong/pattern-recognition.md)
- [behavior agent](../runs/2026-11-08T16-41-15-473Z/strong/behavior-agent.md)
- [financial calculator](../runs/2026-11-08T16-41-15-473Z/strong/financial-calculator.md)
- [debt calculator](../runs/2026-11-08T16-41-15-473Z/strong/debt-calculator.md)
- [debt agent](../runs/2026-11-08T16-41-15-473Z/strong/debt-agent.md)
- [suggestion generator](../runs/2026-11-08T16-41-15-473Z/strong/suggestion-generator.md)
- [catalog selector](../runs/2026-11-08T16-41-15-473Z/strong/catalog-selector.md)
- [checker](../runs/2026-11-08T16-41-15-473Z/strong/checker.md)
- [critical coverage](../runs/2026-11-08T16-41-15-473Z/strong/critical-coverage.md)
- [ai evaluation](../runs/2026-11-08T16-41-15-473Z/strong/ai-evaluation.md)
- [weights](../runs/2026-11-08T16-41-15-473Z/strong/weights.md)
- [impact cand_A012_education](../runs/2026-11-08T16-41-15-473Z/strong/impact-cand_A012_education.md)
- [scoring](../runs/2026-11-08T16-41-15-473Z/strong/scoring.md)
- [robustness](../runs/2026-11-08T16-41-15-473Z/strong/robustness.md)
- [decision engine](../runs/2026-11-08T16-41-15-473Z/strong/decision-engine.md)
- [explanation](../runs/2026-11-08T16-41-15-473Z/strong/explanation.md)
- [beta review](../runs/2026-11-08T16-41-15-473Z/strong/beta-review.md)
- [assistant](../runs/2026-11-08T16-41-15-473Z/strong/assistant.md)
- [feedback](../runs/2026-11-08T16-41-15-473Z/strong/feedback.md)
- [postgres mock](../runs/2026-11-08T16-41-15-473Z/strong/postgres-mock.md)

## 03 Nora

- Google API returned 10 live responses. 1 calls used fallback.
- Imported transactions **48**. Actual beta decision **RECOMMENDATION_READY**. Today **Review recurring subscription before cancellation**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
- Behavior summary — The records show recurring outflows of 980 EUR to harbor properties and recurring inflows of 2350 EUR from danube studio across August, September, and October 2026. The stated goal is to maintain an emergency cushion of 3000 EUR by June 30, 2027.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Review — **REJECTED**. Review the upcoming rent obligation. **Checker:** Unverified or unknown AS reference. **Origin:** MODEL.
- primary-2 · Check — **REJECTED**. Check the energy utility obligation details. **Checker:** Unverified or unknown AS reference. **Origin:** MODEL.
- primary-3 · Verify — **REJECTED**. Verify the internet obligation details. **Checker:** Unverified or unknown AS reference. **Origin:** MODEL.

- [import](../runs/2026-11-08T16-41-15-473Z/nora/import.md)
- [pi](../runs/2026-11-08T16-41-15-473Z/nora/pi.md)
- [as](../runs/2026-11-08T16-41-15-473Z/nora/as.md)
- [assistant context](../runs/2026-11-08T16-41-15-473Z/nora/assistant-context.md)
- [conversation memory](../runs/2026-11-08T16-41-15-473Z/nora/conversation-memory.md)
- [fx](../runs/2026-11-08T16-41-15-473Z/nora/fx.md)
- [classification](../runs/2026-11-08T16-41-15-473Z/nora/classification.md)
- [pattern recognition](../runs/2026-11-08T16-41-15-473Z/nora/pattern-recognition.md)
- [behavior agent](../runs/2026-11-08T16-41-15-473Z/nora/behavior-agent.md)
- [financial calculator](../runs/2026-11-08T16-41-15-473Z/nora/financial-calculator.md)
- [debt calculator](../runs/2026-11-08T16-41-15-473Z/nora/debt-calculator.md)
- [debt agent](../runs/2026-11-08T16-41-15-473Z/nora/debt-agent.md)
- [suggestion generator](../runs/2026-11-08T16-41-15-473Z/nora/suggestion-generator.md)
- [catalog selector](../runs/2026-11-08T16-41-15-473Z/nora/catalog-selector.md)
- [checker](../runs/2026-11-08T16-41-15-473Z/nora/checker.md)
- [critical coverage](../runs/2026-11-08T16-41-15-473Z/nora/critical-coverage.md)
- [ai evaluation](../runs/2026-11-08T16-41-15-473Z/nora/ai-evaluation.md)
- [weights](../runs/2026-11-08T16-41-15-473Z/nora/weights.md)
- [decision engine](../runs/2026-11-08T16-41-15-473Z/nora/decision-engine.md)
- [explanation](../runs/2026-11-08T16-41-15-473Z/nora/explanation.md)
- [scoring](../runs/2026-11-08T16-41-15-473Z/nora/scoring.md)
- [robustness](../runs/2026-11-08T16-41-15-473Z/nora/robustness.md)
- [impact](../runs/2026-11-08T16-41-15-473Z/nora/impact.md)
- [beta review](../runs/2026-11-08T16-41-15-473Z/nora/beta-review.md)
- [assistant](../runs/2026-11-08T16-41-15-473Z/nora/assistant.md)
- [feedback](../runs/2026-11-08T16-41-15-473Z/nora/feedback.md)
- [postgres mock](../runs/2026-11-08T16-41-15-473Z/nora/postgres-mock.md)
