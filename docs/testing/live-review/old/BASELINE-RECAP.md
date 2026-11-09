# Vela live results recap

Run 2026-11-07T15-16-44-438Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Real beta API runs used temporary SQLite databases. PostgreSQL locations are proposed mappings. Isolated checks replayed the exact generation result into the live verification stage. Isolated summaries and beta decisions come from separate calls.

- [PI and storage map](../PI-STORAGE.md)

## 01 Debt

- Gemini returned 8 live responses. 0 calls used fallback.
- Imported transactions **0**. Actual beta decision **RECOMMENDATION_READY**. Today **Contact Credit card issuer for hardship payment options**. Financial score **Not scored**.
- Debt summary — The Credit card debt carries a 24% APR, with projected interest costs of €46.99 over 90 days and €133.61 over 12 months. The estimated payoff horizon for this balance is 16.37 months.
- Behavior summary — Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected. Pattern Recognition found no statement activity to compare.
- Pattern summary — Pattern Recognition found no statement activity to compare.
- primary-1 · Pay credit card minimum — **REJECTED**. Unverified or unknown AS reference.
- primary-2 · Pay energy bill — **REJECTED**. Unverified or unknown AS reference.
- primary-3 · Review debt management strategies — **NEEDS_DATA**. Cannot bind this catalog action to an executable proposal and its cited target.

- [import](../runs/2026-11-07T15-16-44-438Z/debt/import.md)
- [pi](../runs/2026-11-07T15-16-44-438Z/debt/pi.md)
- [as](../runs/2026-11-07T15-16-44-438Z/debt/as.md)
- [fx](../runs/2026-11-07T15-16-44-438Z/debt/fx.md)
- [financial calculator](../runs/2026-11-07T15-16-44-438Z/debt/financial-calculator.md)
- [pattern recognition](../runs/2026-11-07T15-16-44-438Z/debt/pattern-recognition.md)
- [behavior agent](../runs/2026-11-07T15-16-44-438Z/debt/behavior-agent.md)
- [debt agent](../runs/2026-11-07T15-16-44-438Z/debt/debt-agent.md)
- [suggestion generator](../runs/2026-11-07T15-16-44-438Z/debt/suggestion-generator.md)
- [checker](../runs/2026-11-07T15-16-44-438Z/debt/checker.md)
- [ai evaluation](../runs/2026-11-07T15-16-44-438Z/debt/ai-evaluation.md)
- [weights](../runs/2026-11-07T15-16-44-438Z/debt/weights.md)
- [impact](../runs/2026-11-07T15-16-44-438Z/debt/impact.md)
- [scoring](../runs/2026-11-07T15-16-44-438Z/debt/scoring.md)
- [robustness](../runs/2026-11-07T15-16-44-438Z/debt/robustness.md)
- [decision engine](../runs/2026-11-07T15-16-44-438Z/debt/decision-engine.md)
- [explanation](../runs/2026-11-07T15-16-44-438Z/debt/explanation.md)
- [beta review](../runs/2026-11-07T15-16-44-438Z/debt/beta-review.md)
- [assistant](../runs/2026-11-07T15-16-44-438Z/debt/assistant.md)
- [feedback](../runs/2026-11-07T15-16-44-438Z/debt/feedback.md)
- [postgres mock](../runs/2026-11-07T15-16-44-438Z/debt/postgres-mock.md)

## 02 Strong

- Gemini returned 10 live responses. 0 calls used fallback.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Contribute EUR 4550 toward "Education"**. Financial score **0.58875**.
- Debt summary — No active debt records reported in the current financial snapshot.
- Behavior summary — Analyzed 159 transactions (159 classified; user_confirmed preserved). Detected 1 recurring subscription candidate(s) (Account service charge: EUR 0.11) requiring user confirmation before any cancellation proposal (R010). Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Pay outstanding obligations — **REJECTED**. Unverified or unknown AS reference.
- primary-2 · Review mandatory expenses and paydays — **REJECTED**. Unverified or unknown AS reference.
- primary-3 · Learn about financial education efficacy — **NEEDS_DATA**. Referenced PI fact is missing.

- [import](../runs/2026-11-07T15-16-44-438Z/strong/import.md)
- [pi](../runs/2026-11-07T15-16-44-438Z/strong/pi.md)
- [as](../runs/2026-11-07T15-16-44-438Z/strong/as.md)
- [fx](../runs/2026-11-07T15-16-44-438Z/strong/fx.md)
- [financial calculator](../runs/2026-11-07T15-16-44-438Z/strong/financial-calculator.md)
- [pattern recognition](../runs/2026-11-07T15-16-44-438Z/strong/pattern-recognition.md)
- [behavior agent](../runs/2026-11-07T15-16-44-438Z/strong/behavior-agent.md)
- [debt agent](../runs/2026-11-07T15-16-44-438Z/strong/debt-agent.md)
- [suggestion generator](../runs/2026-11-07T15-16-44-438Z/strong/suggestion-generator.md)
- [checker](../runs/2026-11-07T15-16-44-438Z/strong/checker.md)
- [ai evaluation](../runs/2026-11-07T15-16-44-438Z/strong/ai-evaluation.md)
- [weights](../runs/2026-11-07T15-16-44-438Z/strong/weights.md)
- [impact](../runs/2026-11-07T15-16-44-438Z/strong/impact.md)
- [scoring](../runs/2026-11-07T15-16-44-438Z/strong/scoring.md)
- [robustness](../runs/2026-11-07T15-16-44-438Z/strong/robustness.md)
- [decision engine](../runs/2026-11-07T15-16-44-438Z/strong/decision-engine.md)
- [explanation](../runs/2026-11-07T15-16-44-438Z/strong/explanation.md)
- [beta review](../runs/2026-11-07T15-16-44-438Z/strong/beta-review.md)
- [assistant](../runs/2026-11-07T15-16-44-438Z/strong/assistant.md)
- [feedback](../runs/2026-11-07T15-16-44-438Z/strong/feedback.md)
- [postgres mock](../runs/2026-11-07T15-16-44-438Z/strong/postgres-mock.md)

## 03 Nora

- Gemini returned 13 live responses. 0 calls used fallback.
- Imported transactions **48**. Actual beta decision **RECOMMENDATION_READY**. Today **Review recurring subscription before cancellation**. Financial score **Not scored**.
- Debt summary — The Credit card debt carries a 21.9% APR and is projected to be paid off in 18.32 months. It accrues €41.82 in interest over a 90-day baseline and €126.43 over a 12-month period.
- Behavior summary — Analyzed 48 transactions (48 classified; user_confirmed preserved). Detected 3 recurring subscription candidate(s) (Fiber Home: EUR 32, Sound Library: EUR 10.99, Screen Library: EUR 15.99) requiring user confirmation before any cancellation proposal (R010). Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- Pattern summary — Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Review recurring subscriptions — **REJECTED**. Unverified or unknown AS reference.
- primary-2 · Review mandatory obligations and paydays — **REJECTED**. Unverified or unknown AS reference.
- primary-3 · Review credit card debt terms — **REJECTED**. The provided evidence (C023) discusses the general efficacy of financial education and the difficulty of changing debt behavior, but it does not provide canonical evidence or a regulatory basis for the specific action of reviewing credit card APR or terms as a financial management strategy.

- [import](../runs/2026-11-07T15-16-44-438Z/nora/import.md)
- [pi](../runs/2026-11-07T15-16-44-438Z/nora/pi.md)
- [as](../runs/2026-11-07T15-16-44-438Z/nora/as.md)
- [fx](../runs/2026-11-07T15-16-44-438Z/nora/fx.md)
- [financial calculator](../runs/2026-11-07T15-16-44-438Z/nora/financial-calculator.md)
- [pattern recognition](../runs/2026-11-07T15-16-44-438Z/nora/pattern-recognition.md)
- [behavior agent](../runs/2026-11-07T15-16-44-438Z/nora/behavior-agent.md)
- [debt agent](../runs/2026-11-07T15-16-44-438Z/nora/debt-agent.md)
- [suggestion generator](../runs/2026-11-07T15-16-44-438Z/nora/suggestion-generator.md)
- [checker](../runs/2026-11-07T15-16-44-438Z/nora/checker.md)
- [ai evaluation](../runs/2026-11-07T15-16-44-438Z/nora/ai-evaluation.md)
- [weights](../runs/2026-11-07T15-16-44-438Z/nora/weights.md)
- [impact](../runs/2026-11-07T15-16-44-438Z/nora/impact.md)
- [scoring](../runs/2026-11-07T15-16-44-438Z/nora/scoring.md)
- [robustness](../runs/2026-11-07T15-16-44-438Z/nora/robustness.md)
- [decision engine](../runs/2026-11-07T15-16-44-438Z/nora/decision-engine.md)
- [explanation](../runs/2026-11-07T15-16-44-438Z/nora/explanation.md)
- [beta review](../runs/2026-11-07T15-16-44-438Z/nora/beta-review.md)
- [assistant](../runs/2026-11-07T15-16-44-438Z/nora/assistant.md)
- [feedback](../runs/2026-11-07T15-16-44-438Z/nora/feedback.md)
- [postgres mock](../runs/2026-11-07T15-16-44-438Z/nora/postgres-mock.md)
