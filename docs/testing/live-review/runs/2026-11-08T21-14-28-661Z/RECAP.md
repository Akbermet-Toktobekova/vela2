# Vela live results recap

Run 2026-11-08T21-14-28-661Z. Financial snapshot 2026-11-05T12:00:00.000Z.

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
- Behavior summary — Account service charge outflows were observed on the main EUR account on 2026-10-09 (-0.11 EUR), 2026-09-10 (-0.11 EUR), and 2026-08-09 (-0.13 EUR). Fee outflows were observed on the huf account on 2026-10-07 (-9 HUF) and 2026-09-10 (-537 HUF). An outflow of -1100 EUR occurred on the main account on 2026-11-01. An inflow of 4200 EUR occurred on the main account on 2026-09-16. A pharmacy outflow of -300000 HUF occurred on the huf account on 2026-09-16. An incoming transfer of 411400 HUF occurred on the huf account on 2026-09-16. Multiple spending and transfer categories are present on the main EUR account between August and October 2026. Multiple spending, transfer, and inflow categories are present on the huf account between August and November 2026.
- Pattern summary — Observed account service charge outflows on the main EUR account on 2026-10-09 (-0.11 EUR), 2026-09-10 (-0.11 EUR), and 2026-08-09 (-0.13 EUR). Observed fee outflows on the huf account on 2026-10-07 (-9 HUF) and 2026-09-10 (-537 HUF). Observed an outflow of -1100 EUR on the main account on 2026-11-01. Observed an inflow of 4200 EUR on the main account on 2026-09-16. Observed a pharmacy outflow of -300000 HUF on the huf account on 2026-09-16. Observed an incoming transfer of 411400 HUF on the huf account on 2026-09-16. Multiple repeated spending and transfer categories are observed on the main EUR account between August and October 2026. Multiple repeated spending, transfer, and inflow categories are observed on the huf account between August and November 2026.
- primary-1 · Allocate the confirmed contribution to the general savings goal — **NEEDS_DATA**. Set aside the contribution recorded in 500 EUR from the confirmed account. **Checker:** verified_fx_rate_HUF; verified_fx_rate_HUF; verified_fx_rate_HUF **Origin:** MODEL.
- primary-2 · Review unpaid energy obligation — **VALID**. Verify the details of your energy obligation due on 2026-11-15 for 150 EUR. **Checker:** The review of obligation-2 due on 2026-11-15 for 150 EUR is consistent with the supplied facts and is read-only. **Origin:** MODEL.
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
