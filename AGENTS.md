# Vela (FinAgent) — Agent instructions

Project-authored code comments, documentation, prompts, reports, UI text and new commit messages must be in English. Collaborate with the user in Russian. Preserve original-language source evidence and user content and label translations separately. Preserve Git history.

1. **Sources of truth:** Use the specification, recorded decisions, and canonical tables in server/data/as/FinAgent_Normalized_Database.json.
2. **Data authority:** Preserve canonical DB_FACT records, including PENDING_REVIEW, PENDING_ORIGINAL_REOPEN and approved_for_production = NO. Record PRODUCT_DECISION in DECISIONS.md. Keep PROTOTYPE_ONLY parameters in server/config/prototype-policy.json and label them as preliminary.
3. **No invention:** Do not invent action IDs, rules, sources, formulas or thresholds. Return NEEDS_DATA or document an issue when the required facts or formula are missing.
4. **Responsibilities:** SharedFinancialCalculator owns deterministic financial formulas F001–F015, F019 and F020. AI Evaluation assesses only T, S, D and O in one batch per cycle. Code applies F016. Checker, Critical Coverage and Decision Engine follow shared contracts.
5. **Ownership and handoff:** Follow the file ownership in BOARD.md and the vela-team-protocol and vela-handoff skills. Record real verification output and run integration checks and the 14 mandatory E2E scenarios.
