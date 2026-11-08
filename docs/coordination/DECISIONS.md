# Vela decision log

DB_FACT entries preserve the original knowledge package. PRODUCT_DECISION entries record approved architecture and product rules. PROTOTYPE_POLICY values are preliminary engineering parameters pending calibration under G004–G006.

### D-001 (PRODUCT_DECISION, 2026-11-03 18:53) — Backend and storage

Use Node.js and TypeScript with local node:sqlite. Access storage through a repository to support a later Supabase migration.

### D-002 (PRODUCT_DECISION, 2026-11-03 18:53 / 19:42 / 20:53) — Models and quotas

Use Gemini API with Gemini 3.1 Flash Lite and Gemini 3.5 Flash Lite, using the key in user-inputs/secrets/.env, plus an OpenAI adapter. Verify model availability at startup and handle rate limits adaptively. The proposed 15 RPM / 500 RPD figures are not universal constants.

### D-003 (PRODUCT_DECISION, 2026-11-03 18:53) — Coordination

Use a coordinator and parallel subagents with explicit file ownership in BOARD.md. Share Zod contracts under shared/contracts and run final integration and E2E checks after combining work.

### D-004 (DB_FACT and PRODUCT_DECISION, 2026-11-03 19:42 / 20:36 / 20:53) — Canonical AS and action catalog

Use the real FinAgent_Final_Database_Package.zip with 24 sources, 33 claims, 18 rules, 20 formulas and 26 actions. Preserve original PENDING_REVIEW, PENDING_ORIGINAL_REOPEN for C032/C033, and approved_for_production = NO. Keep prototype_enabled and today_enabled separate. AK051–AK060 are Assistant mappings. Today eligibility follows each action. Only financial actions compete in F017. Verification and educational actions follow their dedicated rules.

### D-005 (PRODUCT_DECISION, 2026-11-03 20:36 / 20:53) — Critical coverage

Independently discover A001, A005, A011 and A020 from current PI. A020 identifies a shortfall for follow-up. Eligible critical actions follow priority ordering outside normal W/V ranking and still pass the applicable safety checks.

### D-006 (PROTOTYPE_ONLY, 2026-11-03 20:36 / 20:53) — Weight profiles

Use liquidity protection (0.50, 0.35, 0.15), entering below 1.0 months and exiting at 1.25 or above. Expensive debt (0.20, 0.60, 0.20) requires verified expensive interest-bearing debt under the 15% APR policy and follows liquidity protection. Goal advancement (0.20, 0.20, 0.60) requires an active unfinished goal. Balanced (0.34, 0.33, 0.33) covers the remainder.

### D-007 (PROTOTYPE_ONLY, 2026-11-03 20:36 / 20:53) — Impact normalization

Use 90 days for financial scoring and a separate 12-month debt explanation. Use K_R = 0.25 months, K_F = 0.05 times monthly essential expenses, and K_G = 0.20. Missing or unusable essentials require NEEDS_DATA. No arbitrary K_F_min is authorized.

### D-008 (PRODUCT_DECISION and PROTOTYPE_ONLY, 2026-11-03 20:53) — Contextual complexity

Run one batch for valid candidates. AI estimates only T, S, D and O in [0, 1] with reasons, relevant facts and UNKNOWN for insufficient data. Code averages the factors with the 0.25 weights for F016. R, F and G remain deterministic.

### D-009 (PROTOTYPE_ONLY, 2026-11-03 20:53) — F017 and F018

Use lambda_C = 0.10 for scoring. Use 200 seeded runs with weights independently varied by ±10% and renormalized. The preliminary stability threshold is 0.80. With a score gap below 0.03, prioritize lower uncertainty and risk, then lower complexity. Low stability alone does not imply NEEDS_DATA.

### D-010 (PRODUCT_DECISION, 2026-11-03 20:36 / 20:53) — FX, security and Expo rollout

Use current and historical Frankfurter rates with quote dates. Enforce authenticated user access, encryption at rest and PI minimization. Vela performs no automatic money movement. Expo SDK 58 adoption is a separate final phase after backend, web and mandatory E2E verification.

### D-011 (PRODUCT_DECISION, 2026-11-04) — Local prototype access

- User answer verbatim: «Локальный прототип на моём компьютере — закрыть внешний доступ сейчас, полноценный вход позже».

English translation: “Keep the prototype local to my computer for now. Block external access now and add full sign-in later.”

Bind the legacy server to loopback. Validate Host, Origin and peer address and use approved local browser origins. Client-asserted identity is limited to this prototype. D-013 governs the separate authenticated beta.

### D-012 (PRODUCT_DECISION, 2026-11-04) — Local encryption key

- User answer verbatim: «Автоматически защищать ключ средствами Windows для моей учётной записи; при переносе базы потребуется перенос ключа».

English translation: “Protect the key automatically for my Windows account. Moving the database requires moving the key.”

Use a random key protected by Windows DPAPI. Existing explicit environment-key overrides remain available. Migrate records transactionally and fail closed on an unavailable or wrong key. Protect PI, analysis, traces, recommendations, feedback and chat. Browser storage has a separate boundary.

### D-013 (PRODUCT_DECISION, 2026-11-05) — User-authorized full beta
User approved implementation of B01–B15: free registration name/email/password without verification code or invitations; password recovery by emailed link; no AI spending caps; Android+iPhone; Windows-hosted server+SQLite through HTTPS tunnel; real statements CSV/XLSX/XLS/text PDF, no OCR. Authenticated beta is a separate runtime/database; legacy local-only prototype D-011 remains separate. Session-derived identity required, DPAPI protection per D-012. AI context processing requires consent. Canonical AS statuses and unapproved financial action gates remain intact. Actual email delivery needs configured sender credentials; missing configuration must be explicit, never simulated as delivery.

### D-014 (PRODUCT_DECISION, 2026-11-05) — Seven-block experimental beta and reference UI
User explicitly selected experimental recommendations on real data and archive/design-source/design_reference.png Soft Glass UI. Enable recommendations only after per-user explicit opt-in, separate from AI consent. Preserve all AS source statuses and prototype-policy parameters. Full trace, agent cache and feedback persist encrypted. Accept is intention, Complete is separately confirmed bookkeeping without automatic money movement. Safety/data/affordability checks remain mandatory. This supersedes unconditional beta releaseGate and read-only chat restriction only for opted-in experimental accounts. No empirical validation or canonical production approval is implied.

### D-015 (PRODUCT_DECISION) — AS-backed primary proposals and catalog fallback

Gemini generates up to three proposals from minimized PI, feedback and applicable VERIFIED AS excerpts. An independent Checker verifies content and applicability. Code checks references, facts and constraints. Executable actions use existing catalog checks and formulas. A supported non-executing review without a catalog ID may be displayed with AS links. It carries no amount or financial effect. When no primary proposal passes, run catalog selection and check its output. Critical coverage remains independent. D-014 and canonical statuses still apply. The policy bundle version was updated without changing numerical parameters.

### D-016 (PRODUCT_DECISION, 2026-11-08) — Seven-stage pipeline and evidence
User approved implementation of the seven-stage plan in this conversation. English project-authored text and future commit messages; Russian collaboration; preserve Git history and original-language evidence. Retain unique normalized transactions. Separate Classification -> Pattern Recognition -> Behavior; deterministic observations plus AI interpretation, hypotheses only support clarification. Persist versioned analysis separately from primary PI. Primary generation uses minimized PI, calculated facts, summaries, contextual chat memory, feedback and verified AS, with no Action Catalog input; generate up to three. Separate Gemini catalog selection only when no primary passes, followed by Checker; independent critical coverage. Chat messages and cited English memory remain contextual and cannot update financial fields. Preserve current SQLite encryption, canonical statuses, numerical policies and existing conservative instability behavior. Full live/replay isolated reports for Debt, Strong and Nora.

### D-017 (PRODUCT_DECISION, 2026-11-08) — Gemma 4 31B
User requested switching the application AI model to Gemma 4 31B and generating new results. Use gemma-4-31b-it through the existing Google API credentials for every AI role. Preserve previous recaps and stage evidence. A Gemma-selected run uses only that model, retaining explicit deterministic error/schema fallbacks.

### D-018 (PRODUCT_DECISION, 2026-11-08) — Gemini 3.5 Flash Lite and three proposal slots
Use gemini-3.5-flash-lite as the default model and for the acceptance capture. The primary generator is asked for exactly three distinct entries. In the absence of evidence for advice, use a concrete clarification with NEEDS_DATA. Fill missing slots with labeled deterministic clarification entries. Checker remains authoritative and clarification entries are not eligible for execution or scoring. This supersedes D-017 and the earlier optional proposal count.

### D-019 (PRODUCT_DECISION, 2026-11-08) — Gemma comparison run
Use Gemma 4 31B for the synthetic comparison. Allow Gemma 4 26B A4B for failed requests and retain per-attempt provenance. The application model remains as specified in D-018.

Compare isolated primary drafts for both Gemma models and Gemini 3.1 Flash Lite on the saved Gemini 3.5 Flash Lite input. Pin each isolated model and keep separate report folders. Label recovery transport and thinking settings in the evidence. Quota retries may pause without changing financial policy or candidate validation.

### D-020 (PRODUCT_DECISION, 2026-11-08) — Primary suggestion grounding

Require three strict model proposal slots, supplied PI and verified claim references, and intent-specific validation. Derive clarification options and dated risk context from the existing PI and deterministic calculator. Trace unavailable slots when the response fails and the PI supplies no distinct clarification gap. Keep raw provider output in opt-in synthetic captures. Use only pinned Gemini 3.5 Flash Lite and Gemma 4 31B for the new benchmark. Keep the captured PI, eligible claim set and v1.4 policy fixed. Independent Checker and critical coverage retain their existing financial authority.

The user subsequently narrowed the live acceptance benchmark to Gemini 3.5 Flash Lite. Its pinned model is the default for the isolated primary comparison. The existing partial Gemma captures are retained as historical evidence outside the acceptance results.

### D-021 (PRODUCT_DECISION, 2026-11-08) — Primary contradiction checking

Primary generation uses minimized PI and applicable VERIFIED AS. Primary semantic checking distinguishes contradictions, missing facts and consistent advice. A safe non-executing REVIEW grounded in PI may be VALID when applicable AS is silent. Only independently confirmed supporting claims are presented as source evidence. Invalid identifiers and malformed or duplicate proposals remain validation errors. EXECUTE requires a verified execution contract and the existing safety checks before it can be considered for publication.

Primary Checker receives PI and applicable AS. It does not build or consult catalog candidates. Catalog selection and its verification fallback are enabled only after three REJECTED primary proposals. NEEDS_DATA, including provider unavailability, does not trigger catalog. Independent deterministic critical coverage keeps its existing authority. This supersedes the primary evidence and fallback rules in D-015 and D-020 where they differ.

Original user selections:
- «Только когда все три REJECTED»
- «VALID: достаточно отсутствия противоречия»

English translations:
- “Only when all three are REJECTED.”
- “VALID: absence of a contradiction is sufficient.”

### D-022 (PRODUCT_DECISION) — Useful next steps on Today

Keep safety verdicts separate from usefulness. Run Catalog after all rejections or when Primary has no useful valid action, including clarification-only results. Independently checked critical actions take precedence, followed by eligible ranked financial actions, useful read-only reviews, then one concrete clarification. Primary may use an exact existing execution contract without invoking Catalog Selector. A neutral issuer contact remains available for a verified card shortfall in EU profiles without inapplicable CFPB citations or any promise about terms. Use the same FX validation policy for review and feedback. D-022 supersedes the three-rejection-only catalog gate in D-021.

### D-023 (PRODUCT_DECISION, 2026-11-08) — Expo UI and completed backend integration

Use the completed `new-ui` Expo interface with the backend after the concurrent backend task has completed. Android and iOS are the delivery targets. Do not integrate or develop the separate React web application. Preserve existing consent, safety and financial policy controls.

Original user wording: “делай чисто expo web par we dont need”.

English translation: “Use Expo only; we do not need the web part.”


### D-024 (PRODUCT_DECISION, 2026-11-08) — Automatic app connection

Remove the Connection section, host-address instructions and server-address input from the app. Configure the HTTPS API endpoint through deployment/local Expo configuration. Preserve endpoint-bound sessions: when a configured endpoint differs from the saved endpoint, discard the previous session before connecting.

Original user instruction after quoting the Connection section: “remove this”.
