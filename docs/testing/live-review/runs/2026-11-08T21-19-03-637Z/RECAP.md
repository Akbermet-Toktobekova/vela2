# Vela live results recap

Run 2026-11-08T21-19-03-637Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Synthetic variant: strong-confirmed.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 02 Strong

- Google API returned 12 live responses. 0 calls used fallback.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Allocate EUR 500 toward Education**. Financial score **0.23865**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — Multiple categories of outflows were observed in the main EUR account between August 2026 and November 2026. Multiple categories of inflows and outflows were observed in the HUF account between August 2026 and November 2026. Significant transactions occurred, including a -1100 EUR outflow on 2026-11-01, a 4200 EUR inflow on 2026-09-16, a 275.4 EUR inflow on 2026-09-10, and a 411400 HUF inflow on 2026-09-16.
- Pattern summary — Observed multiple categories of outflows in the main EUR account between August 2026 and November 2026. Observed multiple categories of inflows and outflows in the HUF account between August 2026 and November 2026. Observed account service charge fees on the main EUR account on 2026-08-09, 2026-09-10, and 2026-10-09. Observed fee transactions on the HUF account on 2026-10-07 and 2026-09-10. Observed significant transactions including a -1100 EUR outflow on 2026-11-01, a 4200 EUR inflow on 2026-09-16, a 275.4 EUR inflow on 2026-09-10, and a 411400 HUF inflow on 2026-09-16.
- primary-1 · Review the upcoming energy obligation — **VALID**. Review the unpaid energy obligation energy amounting to 150 EUR due on 2026-11-15. **Checker:** The review step correctly targets the unpaid energy obligation (obligation-2) due on 2026-11-15 for 150 EUR, which is consistent with the supplied facts and remains read-only. **Origin:** MODEL.
- primary-2 · Allocate the confirmed contribution to the general savings goal — **VALID**. Set aside the contribution recorded in 500 EUR from the confirmed account for the general savings goal. **Checker:** The execution step allocates the confirmed contribution of 500 EUR from account-1 to goal-1, aligning with the data in goal-1 and account-1. **Origin:** MODEL.
- primary-3 · What dedicated emergency reserve target would you like to protect before funding other goals? — **NEEDS_DATA**. What dedicated emergency reserve target would you like to protect before funding other goals? **Checker:** Missing: Desired dedicated emergency reserve target **Origin:** MODEL.

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
- [impact primary_A012_education](strong/impact-primary_A012_education.md)
- [scoring](strong/scoring.md)
- [robustness](strong/robustness.md)
- [decision engine](strong/decision-engine.md)
- [explanation](strong/explanation.md)
- [beta review](strong/beta-review.md)
- [assistant](strong/assistant.md)
- [feedback](strong/feedback.md)
- [feedback adjust](strong/feedback-adjust.md)
- [postgres mock](strong/postgres-mock.md)
