# Vela live results recap

Run 2026-11-08T21-16-59-426Z. Financial snapshot 2026-11-05T12:00:00.000Z.

The authenticated beta API ran on temporary SQLite databases. Each stage report contains actual inputs and outputs from that cycle. Saved JSON captures support independent live or replay execution. PostgreSQL locations are proposed mappings.

- [PI and storage map](../../PI-STORAGE.md)
- [Original baseline](../../BASELINE-RECAP.md)
- [Previous Gemini recap](../../GEMINI-RECAP.md)
- [Seven-stage results](../../SEVEN-STAGES.md)
- [Formula explanation](../../FORMULAS.md)

## 02 Strong

- Google API returned 13 live responses. 0 calls used fallback.
- Imported transactions **159**. Actual beta decision **RECOMMENDATION_READY**. Today **Contribute EUR 4550 toward "Education"**. Financial score **0.58875**.
- Debt summary — No debt records are present in this snapshot.
- Behavior summary — Multiple outflows occurred in the main account in EUR between 2026-08-09 and 2026-11-01. Multiple inflows and outflows occurred in the huf account in HUF between 2026-08-07 and 2026-11-05. Observed significant transactions in the main account, including an outflow of -1100 EUR on 2026-11-01 and an inflow of 4200 EUR on 2026-09-16. Certain utility and other obligations are scheduled before the anticipated salary income date, while the rent obligation is scheduled after.
- Pattern summary — Observed multiple outflows across various categories in account main using currency EUR between 2026-08-09 and 2026-11-01. Observed multiple inflows and outflows across various categories in account huf using currency HUF between 2026-08-07 and 2026-11-05. Observed account service charge fee outflows on the main account in EUR on 2026-08-09, 2026-09-10, and 2026-10-09. Observed fee outflows on the huf account in HUF on 2026-10-07 and 2026-09-10. Observed largest transactions and transfers on the main account in EUR between 2026-08-16 and 2026-11-01. Observed largest transactions and transfers on the huf account in HUF between 2026-08-13 and 2026-10-17.
- primary-1 · Review upcoming energy obligation status and timing — **VALID**. Review the unpaid energy obligation energy of 150 EUR due on 2026-11-15 against liquid balances. **Checker:** The proposal asks to review the unpaid energy obligation of 150 EUR due on 2026-11-15 against liquid balances. This matches the data in obligation-2 and account-1, and is a safe read-only review. **Origin:** MODEL.
- primary-2 · Intended contribution to goal-1 — **NEEDS_DATA**. What amount, if any, do you intend to allocate toward this goal and when? **Checker:** Missing: Intended contribution to goal-1 **Origin:** MODEL.
- primary-3 · Preferred funding account for goal-1 — **NEEDS_DATA**. Which account and currency, if any, would you prefer to use for this goal? **Checker:** Missing: Preferred funding account for goal-1 **Origin:** MODEL.

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
