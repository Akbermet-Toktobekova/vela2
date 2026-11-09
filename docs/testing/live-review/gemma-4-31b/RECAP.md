# Gemma 4 comparison results

Run 2026-11-08T17-06-47-634Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Requests try Gemma 4 31B first and may retry or use Gemma 4 26B A4B. Failed attempts are included in stage logs.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../PI-STORAGE.md)
- [Original baseline](../BASELINE-RECAP.md)
- [Previous Gemini recap](../GEMINI-RECAP.md)
- [Seven-stage results](SEVEN-STAGES.md)
- [Formula explanation](../FORMULAS.md)
- [Isolated primary proposals by model](PRIMARY-COMPARISON.md)
- [Seven-stage implementation assessment](../PIPELINE-ASSESSMENT.md)

## 01 Debt

- Google API returned 2 live responses. 18 model attempts failed or returned invalid output.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer for hardship payment options**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 24%, next due 2026-11-08, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months.
- Behavior summary — Pattern Recognition found no statement activity to compare.
- Pattern summary — Pattern Recognition found no statement activity to compare.
- primary-1 · Malformed proposal — **REJECTED**.  **Checker:** Malformed proposal: missingInfo. **Origin:** MODEL.
- primary-2 · Malformed proposal — **REJECTED**.  **Checker:** Malformed proposal: missingInfo. **Origin:** MODEL.
- primary-3 · Malformed proposal — **REJECTED**.  **Checker:** Malformed proposal: missingInfo. **Origin:** MODEL.

- [import](../runs/2026-11-08T17-06-47-634Z/debt/import.md)
- [pi](../runs/2026-11-08T17-06-47-634Z/debt/pi.md)
- [as](../runs/2026-11-08T17-06-47-634Z/debt/as.md)
- [assistant context](../runs/2026-11-08T17-06-47-634Z/debt/assistant-context.md)
- [conversation memory](../runs/2026-11-08T17-06-47-634Z/debt/conversation-memory.md)
- [fx](../runs/2026-11-08T17-06-47-634Z/debt/fx.md)
- [classification](../runs/2026-11-08T17-06-47-634Z/debt/classification.md)
- [pattern recognition](../runs/2026-11-08T17-06-47-634Z/debt/pattern-recognition.md)
- [behavior agent](../runs/2026-11-08T17-06-47-634Z/debt/behavior-agent.md)
- [financial calculator](../runs/2026-11-08T17-06-47-634Z/debt/financial-calculator.md)
- [debt calculator](../runs/2026-11-08T17-06-47-634Z/debt/debt-calculator.md)
- [debt agent](../runs/2026-11-08T17-06-47-634Z/debt/debt-agent.md)
- [suggestion generator](../runs/2026-11-08T17-06-47-634Z/debt/suggestion-generator.md)
- [catalog selector](../runs/2026-11-08T17-06-47-634Z/debt/catalog-selector.md)
- [checker](../runs/2026-11-08T17-06-47-634Z/debt/checker.md)
- [critical coverage](../runs/2026-11-08T17-06-47-634Z/debt/critical-coverage.md)
- [ai evaluation](../runs/2026-11-08T17-06-47-634Z/debt/ai-evaluation.md)
- [weights](../runs/2026-11-08T17-06-47-634Z/debt/weights.md)
- [decision engine](../runs/2026-11-08T17-06-47-634Z/debt/decision-engine.md)
- [explanation](../runs/2026-11-08T17-06-47-634Z/debt/explanation.md)
- [scoring](../runs/2026-11-08T17-06-47-634Z/debt/scoring.md)
- [robustness](../runs/2026-11-08T17-06-47-634Z/debt/robustness.md)
- [impact](../runs/2026-11-08T17-06-47-634Z/debt/impact.md)
- [beta review](../runs/2026-11-08T17-06-47-634Z/debt/beta-review.md)
- [assistant](../runs/2026-11-08T17-06-47-634Z/debt/assistant.md)
- [feedback](../runs/2026-11-08T17-06-47-634Z/debt/feedback.md)
- [postgres mock](../runs/2026-11-08T17-06-47-634Z/debt/postgres-mock.md)

## 02 Strong

- Google API returned 4 live responses. 31 model attempts failed or returned invalid output.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Contribute EUR 4550 toward "Education"**. Financial score **0.58875**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Malformed proposal — **REJECTED**.  **Checker:** Malformed proposal: missingInfo. **Origin:** MODEL.
- primary-2 · Malformed proposal — **REJECTED**.  **Checker:** Malformed proposal: missingInfo. **Origin:** MODEL.
- primary-3 · Malformed proposal — **REJECTED**.  **Checker:** Malformed proposal: missingInfo. **Origin:** MODEL.

- [import](../runs/2026-11-08T17-06-47-634Z/strong/import.md)
- [pi](../runs/2026-11-08T17-06-47-634Z/strong/pi.md)
- [as](../runs/2026-11-08T17-06-47-634Z/strong/as.md)
- [assistant context](../runs/2026-11-08T17-06-47-634Z/strong/assistant-context.md)
- [conversation memory](../runs/2026-11-08T17-06-47-634Z/strong/conversation-memory.md)
- [fx](../runs/2026-11-08T17-06-47-634Z/strong/fx.md)
- [classification](../runs/2026-11-08T17-06-47-634Z/strong/classification.md)
- [pattern recognition](../runs/2026-11-08T17-06-47-634Z/strong/pattern-recognition.md)
- [behavior agent](../runs/2026-11-08T17-06-47-634Z/strong/behavior-agent.md)
- [financial calculator](../runs/2026-11-08T17-06-47-634Z/strong/financial-calculator.md)
- [debt calculator](../runs/2026-11-08T17-06-47-634Z/strong/debt-calculator.md)
- [debt agent](../runs/2026-11-08T17-06-47-634Z/strong/debt-agent.md)
- [suggestion generator](../runs/2026-11-08T17-06-47-634Z/strong/suggestion-generator.md)
- [catalog selector](../runs/2026-11-08T17-06-47-634Z/strong/catalog-selector.md)
- [checker](../runs/2026-11-08T17-06-47-634Z/strong/checker.md)
- [critical coverage](../runs/2026-11-08T17-06-47-634Z/strong/critical-coverage.md)
- [ai evaluation](../runs/2026-11-08T17-06-47-634Z/strong/ai-evaluation.md)
- [weights](../runs/2026-11-08T17-06-47-634Z/strong/weights.md)
- [impact cand_A012_education](../runs/2026-11-08T17-06-47-634Z/strong/impact-cand_A012_education.md)
- [scoring](../runs/2026-11-08T17-06-47-634Z/strong/scoring.md)
- [robustness](../runs/2026-11-08T17-06-47-634Z/strong/robustness.md)
- [decision engine](../runs/2026-11-08T17-06-47-634Z/strong/decision-engine.md)
- [explanation](../runs/2026-11-08T17-06-47-634Z/strong/explanation.md)
- [beta review](../runs/2026-11-08T17-06-47-634Z/strong/beta-review.md)
- [assistant](../runs/2026-11-08T17-06-47-634Z/strong/assistant.md)
- [feedback](../runs/2026-11-08T17-06-47-634Z/strong/feedback.md)
- [postgres mock](../runs/2026-11-08T17-06-47-634Z/strong/postgres-mock.md)

## 03 Nora

- Google API returned 6 live responses. 22 model attempts failed or returned invalid output.
- Imported transactions **48**. Actual beta decision **RECOMMENDATION_READY**. Today **Review recurring subscription before cancellation**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
- Behavior summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Review credit card interest details — **REJECTED**. Verify if interest is currently accruing on the credit card balance to better understand the cost of the debt. **Checker:** Unverified or unknown AS reference. **Origin:** MODEL.
- primary-2 · Identify subscription renewal dates — **NEEDS_DATA**. Confirm the exact recurring dates and amounts for the 'Sound Library' and 'Screen Library' subscriptions. **Checker:** Missing: Confirmation of recurring dates and amounts for Sound Library and Screen Library subscriptions **Origin:** MODEL.
- primary-3 · Verify account staleness — **NEEDS_DATA**. Confirm if the balances for account-1 and account-2 are up to date. **Checker:** Missing: Current up-to-date balances for account-1 and account-2 **Origin:** MODEL.

- [import](../runs/2026-11-08T17-06-47-634Z/nora/import.md)
- [pi](../runs/2026-11-08T17-06-47-634Z/nora/pi.md)
- [as](../runs/2026-11-08T17-06-47-634Z/nora/as.md)
- [assistant context](../runs/2026-11-08T17-06-47-634Z/nora/assistant-context.md)
- [conversation memory](../runs/2026-11-08T17-06-47-634Z/nora/conversation-memory.md)
- [fx](../runs/2026-11-08T17-06-47-634Z/nora/fx.md)
- [classification](../runs/2026-11-08T17-06-47-634Z/nora/classification.md)
- [pattern recognition](../runs/2026-11-08T17-06-47-634Z/nora/pattern-recognition.md)
- [behavior agent](../runs/2026-11-08T17-06-47-634Z/nora/behavior-agent.md)
- [financial calculator](../runs/2026-11-08T17-06-47-634Z/nora/financial-calculator.md)
- [debt calculator](../runs/2026-11-08T17-06-47-634Z/nora/debt-calculator.md)
- [debt agent](../runs/2026-11-08T17-06-47-634Z/nora/debt-agent.md)
- [suggestion generator](../runs/2026-11-08T17-06-47-634Z/nora/suggestion-generator.md)
- [catalog selector](../runs/2026-11-08T17-06-47-634Z/nora/catalog-selector.md)
- [checker](../runs/2026-11-08T17-06-47-634Z/nora/checker.md)
- [critical coverage](../runs/2026-11-08T17-06-47-634Z/nora/critical-coverage.md)
- [ai evaluation](../runs/2026-11-08T17-06-47-634Z/nora/ai-evaluation.md)
- [weights](../runs/2026-11-08T17-06-47-634Z/nora/weights.md)
- [decision engine](../runs/2026-11-08T17-06-47-634Z/nora/decision-engine.md)
- [explanation](../runs/2026-11-08T17-06-47-634Z/nora/explanation.md)
- [scoring](../runs/2026-11-08T17-06-47-634Z/nora/scoring.md)
- [robustness](../runs/2026-11-08T17-06-47-634Z/nora/robustness.md)
- [impact](../runs/2026-11-08T17-06-47-634Z/nora/impact.md)
- [beta review](../runs/2026-11-08T17-06-47-634Z/nora/beta-review.md)
- [assistant](../runs/2026-11-08T17-06-47-634Z/nora/assistant.md)
- [feedback](../runs/2026-11-08T17-06-47-634Z/nora/feedback.md)
- [postgres mock](../runs/2026-11-08T17-06-47-634Z/nora/postgres-mock.md)
