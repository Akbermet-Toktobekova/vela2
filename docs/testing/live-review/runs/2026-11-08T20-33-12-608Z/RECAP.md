# Vela live results recap

Run 2026-11-08T20-33-12-608Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Synthetic variant: strong-confirmed.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 02 Strong

- Google API returned 12 live responses. 1 calls used fallback.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Contribute EUR 4550 toward "Education"**. Financial score **0.58875**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — An outflow of -1100 EUR was recorded on 2026-11-01. A general savings goal of 6000 EUR with a target date of 2027-06-30 is stated.
- Pattern summary — Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
- primary-1 · Allocate confirmed savings contribution to general savings — **NEEDS_DATA**. Allocate the confirmed monthly contribution of 500 EUR from account-1 toward goal-1. **Checker:** Use a reference to the exact PI field for a date, amount or rate. **Origin:** MODEL.
- primary-2 · Review upcoming energy obligation — **NEEDS_DATA**. Review the status and timing of the upcoming energy obligation due on 2026-11-15. **Checker:** Use a reference to the exact PI field for a date, amount or rate. **Origin:** MODEL.
- primary-3 · Clarify desired dedicated emergency reserve target — **NEEDS_DATA**. Identify the desired dedicated emergency reserve target to protect before funding other goals. **Checker:** Missing: Desired dedicated emergency reserve target **Origin:** MODEL.

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
- [feedback adjust](strong/feedback-adjust.md)
- [postgres mock](strong/postgres-mock.md)
