# Vela live results recap

Run 2026-11-08T21-19-11-907Z. Financial snapshot 2026-11-05T12:00:00.000Z.

Synthetic variant: strong-missing-fx.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 02 Strong

- Google API returned 11 live responses. 0 calls used fallback.
- Imported transactions **159**. Actual beta decision **NEEDS_DATA**. Today **Confirm financial information**. Financial score **Not scored**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — Account service charge outflows were observed on the main EUR account. Fee outflows were observed on the huf account. Largest transactions on the main EUR account include specified outflows and inflows. Largest transactions on the huf account include specified large outflows and inflows. A general savings goal of 6000 EUR by 2027-06-30 is stated.
- Pattern summary — Observed account service charge outflows on the main EUR account. Observed fee outflows on the huf account. Observed largest transactions on the main EUR account including outflows and inflows. Observed largest transactions on the huf account including large outflows and inflows.
- primary-1 · Review the unpaid energy obligation — **VALID**. Check the unpaid energy obligation of 150 EUR due on 2026-11-15. **Checker:** The step proposes a read-only review of the unpaid energy obligation due on 2026-11-15 for 150 EUR, which is fully supported by the facts data and remains non-executing. **Origin:** MODEL.
- primary-2 · Review the general savings goal contribution — **VALID**. Examine the confirmed contribution of 500 EUR targeted toward the general savings goal. **Checker:** The step proposes a read-only review of the general savings goal contribution of 500 EUR, which is consistent with the supplied goal fact and remains non-executing. **Origin:** MODEL.
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
- [decision engine](strong/decision-engine.md)
- [explanation](strong/explanation.md)
- [scoring](strong/scoring.md)
- [robustness](strong/robustness.md)
- [impact](strong/impact.md)
- [beta review](strong/beta-review.md)
- [assistant](strong/assistant.md)
- [feedback](strong/feedback.md)
- [postgres mock](strong/postgres-mock.md)
