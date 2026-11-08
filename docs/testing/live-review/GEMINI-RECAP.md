# Vela live results recap

Run 2026-11-08T15-45-05-944Z. Financial snapshot 2026-11-05T12:00:00.000Z.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](PI-STORAGE.md)
- [Original baseline](BASELINE-RECAP.md)
- [Seven-stage results](SEVEN-STAGES.md)
- [Formula explanation](FORMULAS.md)

## 01 Debt

Primary generation explanation: See per-proposal Checker results.


- Gemini returned 10 live responses. 0 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer for hardship payment options**. Financial score **Not scored**.
- Debt summary — Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months.
- Behavior summary — The utility obligation occurred on 2026-11-18, seven days before the salary income on 2026-11-25.
- Pattern summary — In the scope of currency EUR, obligationId 'utility' occurred on 2026-11-18, which is prior to incomeId 'salary' on 2026-11-25.
- primary-1 · Review debt repayment strategy — **NEEDS_DATA**. Advice requires executable financial checks or contains a monetary amount or rate.г
- primary-2 · Check cash flow timing for upcoming obligations — **VALID**. The proposal targets an obligation fact with specific timing and income details provided in the context, and checking cash flow timing is a safe review action without financial execution.

- [import](runs/2026-11-08T15-45-05-944Z/debt/import.md)
- [pi](runs/2026-11-08T15-45-05-944Z/debt/pi.md)
- [as](runs/2026-11-08T15-45-05-944Z/debt/as.md)
- [assistant context](runs/2026-11-08T15-45-05-944Z/debt/assistant-context.md)
- [conversation memory](runs/2026-11-08T15-45-05-944Z/debt/conversation-memory.md)
- [fx](runs/2026-11-08T15-45-05-944Z/debt/fx.md)
- [classification](runs/2026-11-08T15-45-05-944Z/debt/classification.md)
- [pattern recognition](runs/2026-11-08T15-45-05-944Z/debt/pattern-recognition.md)
- [behavior agent](runs/2026-11-08T15-45-05-944Z/debt/behavior-agent.md)
- [financial calculator](runs/2026-11-08T15-45-05-944Z/debt/financial-calculator.md)
- [debt calculator](runs/2026-11-08T15-45-05-944Z/debt/debt-calculator.md)
- [debt agent](runs/2026-11-08T15-45-05-944Z/debt/debt-agent.md)
- [suggestion generator](runs/2026-11-08T15-45-05-944Z/debt/suggestion-generator.md)
- [catalog selector](runs/2026-11-08T15-45-05-944Z/debt/catalog-selector.md)
- [checker](runs/2026-11-08T15-45-05-944Z/debt/checker.md)
- [critical coverage](runs/2026-11-08T15-45-05-944Z/debt/critical-coverage.md)
- [ai evaluation](runs/2026-11-08T15-45-05-944Z/debt/ai-evaluation.md)
- [weights](runs/2026-11-08T15-45-05-944Z/debt/weights.md)
- [decision engine](runs/2026-11-08T15-45-05-944Z/debt/decision-engine.md)
- [explanation](runs/2026-11-08T15-45-05-944Z/debt/explanation.md)
- [scoring](runs/2026-11-08T15-45-05-944Z/debt/scoring.md)
- [robustness](runs/2026-11-08T15-45-05-944Z/debt/robustness.md)
- [impact](runs/2026-11-08T15-45-05-944Z/debt/impact.md)
- [beta review](runs/2026-11-08T15-45-05-944Z/debt/beta-review.md)
- [assistant](runs/2026-11-08T15-45-05-944Z/debt/assistant.md)
- [feedback](runs/2026-11-08T15-45-05-944Z/debt/feedback.md)
- [postgres mock](runs/2026-11-08T15-45-05-944Z/debt/postgres-mock.md)

## 02 Strong

Primary generation explanation: No applicable verified claim supports a specific action.


- Gemini returned 13 live responses. 0 calls used fallback.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Contribute EUR 4550 toward "Education"**. Financial score **0.58875**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — Account service charges are consistently applied to the main account on a monthly basis. Significant inflows and outflows occurred on the HUF account on 2026-09-16, including a 411,400 HUF inflow and combined outflows of 500,000 HUF. Unconfirmed: The recurring nature of account service charges suggests a potential fixed monthly cost, though the specific contract terms are not provided.
- Pattern summary — Account service charge fees of -0.11 EUR, -0.11 EUR, and -0.13 EUR were observed on the main account on 2026-10-09, 2026-09-10, and 2026-08-09 respectively. Fees of -9 HUF and -537 HUF were observed on the huf account on 2026-10-07 and 2026-09-10 respectively. The largest observed outflow on the main account was -1100 EUR on 2026-11-01. Inflows of 4200 EUR on 2026-09-16 and 275.4 EUR on 2026-09-10 were observed on the main account. On the huf account, observed transactions include an outflow of -200000 HUF on 2026-09-16, an inflow of 411400 HUF on 2026-09-16, and an outflow of -300000 HUF on 2026-09-16. Unconfirmed: Account service charges appear repeatedly on the main account, but terms of a recurring contract are unconfirmed.

- [import](runs/2026-11-08T15-45-05-944Z/strong/import.md)
- [pi](runs/2026-11-08T15-45-05-944Z/strong/pi.md)
- [as](runs/2026-11-08T15-45-05-944Z/strong/as.md)
- [assistant context](runs/2026-11-08T15-45-05-944Z/strong/assistant-context.md)
- [conversation memory](runs/2026-11-08T15-45-05-944Z/strong/conversation-memory.md)
- [fx](runs/2026-11-08T15-45-05-944Z/strong/fx.md)
- [classification](runs/2026-11-08T15-45-05-944Z/strong/classification.md)
- [pattern recognition](runs/2026-11-08T15-45-05-944Z/strong/pattern-recognition.md)
- [behavior agent](runs/2026-11-08T15-45-05-944Z/strong/behavior-agent.md)
- [financial calculator](runs/2026-11-08T15-45-05-944Z/strong/financial-calculator.md)
- [debt calculator](runs/2026-11-08T15-45-05-944Z/strong/debt-calculator.md)
- [debt agent](runs/2026-11-08T15-45-05-944Z/strong/debt-agent.md)
- [suggestion generator](runs/2026-11-08T15-45-05-944Z/strong/suggestion-generator.md)
- [catalog selector](runs/2026-11-08T15-45-05-944Z/strong/catalog-selector.md)
- [checker](runs/2026-11-08T15-45-05-944Z/strong/checker.md)
- [critical coverage](runs/2026-11-08T15-45-05-944Z/strong/critical-coverage.md)
- [ai evaluation](runs/2026-11-08T15-45-05-944Z/strong/ai-evaluation.md)
- [weights](runs/2026-11-08T15-45-05-944Z/strong/weights.md)
- [impact cand_A012_education](runs/2026-11-08T15-45-05-944Z/strong/impact-cand_A012_education.md)
- [scoring](runs/2026-11-08T15-45-05-944Z/strong/scoring.md)
- [robustness](runs/2026-11-08T15-45-05-944Z/strong/robustness.md)
- [decision engine](runs/2026-11-08T15-45-05-944Z/strong/decision-engine.md)
- [explanation](runs/2026-11-08T15-45-05-944Z/strong/explanation.md)
- [beta review](runs/2026-11-08T15-45-05-944Z/strong/beta-review.md)
- [assistant](runs/2026-11-08T15-45-05-944Z/strong/assistant.md)
- [feedback](runs/2026-11-08T15-45-05-944Z/strong/feedback.md)
- [postgres mock](runs/2026-11-08T15-45-05-944Z/strong/postgres-mock.md)

## 03 Nora

Primary generation explanation: No applicable verified claim supports a specific action.


- Gemini returned 10 live responses. 1 calls used fallback.
- Imported transactions **48**. Actual beta decision **RECOMMENDATION_READY**. Today **Review recurring subscription before cancellation**. Financial score **Not scored**.
- Debt summary — Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
- Behavior summary — The account exhibits consistent monthly recurring inflows from 'danube studio' and recurring outflows to various service providers and vendors. Multiple recurring obligations, including rent, energy, and internet, are settled prior to the receipt of the monthly salary inflow.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.

- [import](runs/2026-11-08T15-45-05-944Z/nora/import.md)
- [pi](runs/2026-11-08T15-45-05-944Z/nora/pi.md)
- [as](runs/2026-11-08T15-45-05-944Z/nora/as.md)
- [assistant context](runs/2026-11-08T15-45-05-944Z/nora/assistant-context.md)
- [conversation memory](runs/2026-11-08T15-45-05-944Z/nora/conversation-memory.md)
- [fx](runs/2026-11-08T15-45-05-944Z/nora/fx.md)
- [classification](runs/2026-11-08T15-45-05-944Z/nora/classification.md)
- [pattern recognition](runs/2026-11-08T15-45-05-944Z/nora/pattern-recognition.md)
- [behavior agent](runs/2026-11-08T15-45-05-944Z/nora/behavior-agent.md)
- [financial calculator](runs/2026-11-08T15-45-05-944Z/nora/financial-calculator.md)
- [debt calculator](runs/2026-11-08T15-45-05-944Z/nora/debt-calculator.md)
- [debt agent](runs/2026-11-08T15-45-05-944Z/nora/debt-agent.md)
- [suggestion generator](runs/2026-11-08T15-45-05-944Z/nora/suggestion-generator.md)
- [catalog selector](runs/2026-11-08T15-45-05-944Z/nora/catalog-selector.md)
- [checker](runs/2026-11-08T15-45-05-944Z/nora/checker.md)
- [critical coverage](runs/2026-11-08T15-45-05-944Z/nora/critical-coverage.md)
- [ai evaluation](runs/2026-11-08T15-45-05-944Z/nora/ai-evaluation.md)
- [weights](runs/2026-11-08T15-45-05-944Z/nora/weights.md)
- [decision engine](runs/2026-11-08T15-45-05-944Z/nora/decision-engine.md)
- [explanation](runs/2026-11-08T15-45-05-944Z/nora/explanation.md)
- [scoring](runs/2026-11-08T15-45-05-944Z/nora/scoring.md)
- [robustness](runs/2026-11-08T15-45-05-944Z/nora/robustness.md)
- [impact](runs/2026-11-08T15-45-05-944Z/nora/impact.md)
- [beta review](runs/2026-11-08T15-45-05-944Z/nora/beta-review.md)
- [assistant](runs/2026-11-08T15-45-05-944Z/nora/assistant.md)
- [feedback](runs/2026-11-08T15-45-05-944Z/nora/feedback.md)
- [postgres mock](runs/2026-11-08T15-45-05-944Z/nora/postgres-mock.md)
