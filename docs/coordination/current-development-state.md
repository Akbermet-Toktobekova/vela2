# Vela / FinAgent — Complete Current Development State & Feature Inventory

**Assessment Issued:** 4 November 2026, 08:30 CET  
**Verification Status:** 10 of 10 test suites passed | **143 of 143 tests passed** | 0 skipped | 0 failed  
**TypeScript Build:** Server: 0 errors (`exit code 0`) | Web UI: 0 errors (`exit code 0`)  
**Canonical Data Integrity:** SHA256 verified identical to `FinAgent_Final_Database_Package.zip` (`7CE385E40EA872FD49927458F3A787CCCB1E9E1CB02707C80CCDCD6419E8B6B9`)  

---

## 1. Executive Assessment

Vela (FinAgent) is an integrated, verified **local financial-assistant prototype** engineered with strict separation between immutable financial database facts (`DB_FACT`), architectural product decisions (`PRODUCT_DECISION`), and configurable engineering policy (`PROTOTYPE_ONLY`).

### Key Verified Accomplishments:
1. **Deterministic Financial Math (`SharedFinancialCalculator`):** All monetary metrics ($F001–F015, F019, F020$) are calculated by deterministic code. AI never computes monetary values, savings, or cash-flow trajectories.
2. **Canonical Action & Knowledge Ingestion:** 24 sources, 33 claims, 18 rules, 20 formulas, and 26 action templates ($A001–A026$) loaded cleanly without mutating original review or production approval statuses.
3. **Action Checker & Critical Action Discovery:** Independent rule-based gates check catalog eligibility, data sufficiency, cash-flow floor affordability ($C_a(d) \ge B_{\min}(d)$), and priority triggers for urgent obligations ($A001, A005, A011, A020$).
4. **Decision Engine (5A–5E):** Priority hierarchy $\rightarrow$ 4 weight profiles with liquidity hysteresis $\rightarrow$ 90-day impact simulation $\rightarrow$ AI factor evaluation ($T, S, D, O$) $\rightarrow$ F017 benefit-minus-complexity scoring $\rightarrow$ F018 200-iteration Monte Carlo robustness simulation.
5. **Atomic Replay-Safe Feedback:** Complete state machine (`Proposed` $\rightarrow$ `Accepted` / `Adjusted` / `Declined` $\rightarrow$ `Completed` / `Expired`) with idempotency, single-transaction SQLite persistence, derived snapshot rebuilds, and rollback on error.
6. **Local Transport Security (D-011):** Node.js backend bound strictly to loopback IPv4 (`127.0.0.1`), blocking external network traffic, DNS-rebinding attacks, and unapproved origins before API routing.
7. **Multi-Locale CSV Statement Ingestion:** Real statement parser supporting European and US decimal/grouping separators, date verification, deduping, and multiline quote safeguards.
8. **Live Gemini AI Integration:** Tested live with Gemini Flash-Lite for behavior profiling, suggestion generation, and batch $T, S, D, O$ complexity evaluation.

### Material Limitations & What Remains for Production:
- **Authentication & Multi-User Identity:** Local-only prototype using client-asserted `x-user-id`. Real authentication and session management are explicitly deferred under D-011.
- **Full 90-Day Counterfactual Cash Simulations:** Some actions in `impactCalculator.ts` use simplified heuristics rather than full simulated 90-day balance trajectories.
- **Action Safety Gates:** Generic runtime checking of `required_pi_inputs` for all catalog actions and complete executable enforcement of rules $R001–R018$ are in progress.
- **Native Mobile App:** The `expo-mobile-app/` codebase is a separate visual demo, explicitly deferred to a dedicated post-backend phase (D-010).

---

## 2. Evaluation Methodology: Stages & Certainty Scores

### Lifecycle Stages
- **Implemented prototype:** Fully executable code verified on test suites and live API within the prototype boundary.
- **Partial / incomplete:** Working code exists and passes tests, but specific edge cases, parameters, or integrations remain unverified or missing.
- **Defective:** Directly observed defect or source-level bug that impairs functionality under specific conditions.
- **Catalog only / educational support:** Canonical metadata or educational guidance exists; no specialized execution pipeline is built.
- **Demo only / legacy artifact:** Static demonstration or legacy prototype not wired into the main backend orchestrator.
- **Planned / deferred:** Formally recorded in architecture decisions (`DECISIONS.md`) for future delivery.
- **Not implemented:** Not found in the checkout; not yet approved or designed.

### Certainty Scores (0–100%)
The certainty score represents subjective evidence confidence based on executable verification:
- **100%:** Directly proven by targeted regression tests or explicit reproduction probes in this exact checkout.
- **98–99%:** Confirmed by running test suites, full Zod schema validation, and multi-file source audit.
- **95–97%:** Confirmed by unit tests and static analysis, but full multi-turn or edge-case execution is unverified.
- **90–94%:** Indirect evidence or read-only analysis without full end-to-end runtime execution.

---

## 3. High-Level Category Summary Matrix

| Category | Total Capabilities | Implemented Prototype | Partial | Other Stages | Avg Certainty |
|---|:---:|:---:|:---:|:---:|:---:|
| **Foundation** | 5 | 3 | 2 | 0 | 99.0% |
| **Backend** | 4 | 2 | 2 | 0 | 98.5% |
| **Orchestration** | 5 | 3 | 2 | 0 | 98.2% |
| **Feedback** | 5 | 2 | 2 | 1 | 99.0% |
| **AI** | 10 | 4 | 6 | 0 | 98.1% |
| **FX** | 2 | 1 | 1 | 0 | 95.5% |
| **Security** | 7 | 2 | 4 | 1 | 98.4% |
| **Decision** | 8 | 3 | 5 | 0 | 98.8% |
| **Web** | 19 | 12 | 4 | 3 | 98.7% |
| **Web imports** | 5 | 0 | 4 | 1 | 99.2% |
| **Mobile and legacy** | 2 | 0 | 0 | 2 | 99.5% |
| **Delivery** | 2 | 0 | 1 | 1 | 99.5% |
| **Planned and absent** | 4 | 0 | 0 | 4 | 99.2% |
| **Canonical formulas** | 20 | 10 | 10 | 0 | 99.0% |
| **Canonical action coverage** | 26 | 3 | 12 | 11 | 98.4% |
| **HTTP endpoint inventory** | 10 | 10 | 0 | 0 | 99.0% |
| **TOTAL** | **134** | **55** | **55** | **24** | **98.7%** |

---

## 4. Deep Dive: The 4 Core MVP Modules

### 4.1. Action Checker (`server/src/checker/actionChecker.ts`)
- **What Works:**
  - 4-layer validation: Catalog eligibility, Data sufficiency, Affordability floor ($C_a(d) \ge B_{\min}(d)$), Safety rules.
  - Critical Action Coverage independently triggers $A001$ (minimum card payment), $A005$ (hardship options on shortfall), $A011$ (risky transfer pause), and $A020$ (upcoming cash deficit alert).
  - Affordability calculation checks that liquid balance stays above user cushion across all scheduled obligations.
- **Tested Scope:** Verified in `phase1-foundation.test.ts` and `finagent-14-scenarios.test.ts` (shortfall, hardship, missing debt terms, omitted critical transfer).
- **Gaps to Complete MVP:**
  - Generic enforcement of `required_pi_inputs` across all 26 catalog actions before passing to Decision Engine.
  - Complete executable gates for rules $R002, R003, R006, R007, R015–R018$ (currently cited in text but not all enforced as code gates).
  - Strict priority comparator: direct mitigation ($A001, A011$) strictly before diagnostic ($A020$); suppress $A020$ when $A011$ already eliminates the deficit.

### 4.2. Shared Financial Calculator (`shared/calculator/index.ts`)
- **What Works:**
  - Single deterministic owner for formulas $F001–F015, F019, F020$.
  - Implements liquidity ($F001, F002$), available cash ($F003$), cash-flow projection & deficit ($F004, F019$), debt repayment trajectories & interest avoided ($F008, F020$), recurring subscription savings ($F011$), and goal advancement ($F015$).
- **Tested Scope:** Verified in `phase1-foundation.test.ts` (18 unit tests); invariant under live AI complexity.
- **Gaps to Complete MVP:**
  - Strict return of `NEEDS_DATA` when monthly essential expenses ($E_{\text{month}}$) are zero or missing for normalizer $K_F = 0.05 \times E_{\text{month}}$, eliminating any implicit floor.
  - Complete audit ensuring no downstream service duplicates internal math.

### 4.3. Decision Engine (`server/src/decision/`)
- **What Works:**
  - `weightCalculator.ts`: 4 profiles (`liquidity_protection`, `expensive_debt`, `goal_advancement`, `balanced`) with liquidity enter ($M < 1.0$) / exit ($M \ge 1.25$) hysteresis.
  - `complexityEvaluator.ts`: Evaluates $c_C(a) = 0.25T + 0.25S + 0.25D + 0.25O$ ($F016$) from AI factors with catalog baselines.
  - `scoringEngine.ts`: Calculates final score $S(a) = w_R v_R + w_F v_F + w_G v_G - \lambda_C c_C(a)$ ($F017$).
  - `robustnessChecker.ts`: 200 reproducible simulations with fixed seed, $\pm 10\%$ weight perturbation, sensitivity analysis across $\lambda_C \in \{0, 0.05, 0.10, 0.15\}$, and stability threshold calculation ($F018$).
- **Tested Scope:** Verified in scenarios 5, 7, 12 of `finagent-14-scenarios.test.ts` and `ai-reliability.test.ts`.
- **Gaps to Complete MVP:**
  - Full 90-day simulated counterfactual trajectories ($x_H^0$ vs $x_H^a$) for all financial action types.
  - Conservative publication withholding when `instabilityReason === 'UNSTABLE_ASSUMPTIONS'`.
  - Tie-breaker implementation for close decisions ($\Delta S < 0.03$) preferring lower uncertainty and lower complexity.

### 4.4. Feedback Loop & PI State (`reviewWorkflow.ts` & `sqliteStore.ts`)
- **What Works:**
  - State machine: `Proposed` $\rightarrow$ `Accepted` / `Adjusted` / `Declined` $\rightarrow$ `Completed` / `Expired`.
  - Replay-safe, idempotent Complete: repeated calls return 200 without duplicate allocations.
  - Atomic transactions: PI balance debit, goal allocation creation, and derived snapshot rebuild succeed or fail together.
  - Today freshness: Version mismatch between PI and trace triggers synchronous re-evaluation, keeping Today aligned.
- **Tested Scope:** Verified in `feedback-regressions.test.ts` (12 tests) and `web-feedback-regressions.test.ts` (13 tests).
- **Gaps to Complete MVP:**
  - Cash reservation for `Accepted` (uncompleted) actions to prevent double-spending in subsequent cycles.
  - Dedicated PI mutations for non-savings actions (e.g., auto-transfer pause $A011$, subscription cancel $A015$).
  - Enforcing `declinedActionCooldownDays` (14 days) in the Suggestion Generator to avoid re-proposing declined actions.

---

## 5. Complete Capability-by-Capability Inventory (CAP-001 — CAP-134)

### Foundation

#### CAP-001 · Runtime contracts and shared PI model
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Zod validates policy, catalog, candidates, checks, complexity, impacts, scores, traces and decisions; shared TypeScript describes PI.
- **Tested & Evidence:** E1 foundation tests validate real contracts and catalog.
- **Remaining / Still Planned / Gaps:** Full incoming FinancialSnapshot runtime validation is absent; plain string IDs still need membership and ownership checks.
- **Source Reference:** [shared/contracts/index.ts:33](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/contracts/index.ts#L33>); [shared/pi/types.ts:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/pi/types.ts#L1>)

#### CAP-002 · Versioned prototype policy
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Central JSON stores profiles, horizons, normalizers, complexity and robustness parameters, explicitly PROTOTYPE_ONLY and empiricallyValidated=false.
- **Tested & Evidence:** E1 policy tests pass; source reviewed.
- **Remaining / Still Planned / Gaps:** Important thresholds/defaults remain hardcoded in calculator, catalog, checker, AI and browser; empirical/expert calibration is not done.
- **Source Reference:** [server/config/prototype-policy.json:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/config/prototype-policy.json#L1>); [server/src/config/policyLoader.ts:15](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/config/policyLoader.ts#L15>)

#### CAP-003 · Canonical knowledge import and provenance
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Loads 24 sources, 33 claims, 18 rules, 20 formulas, 26 actions and relationships. Preserves pending statuses; excludes C032/C033 from VERIFIED claims.
- **Tested & Evidence:** E1 real package/catalog tests pass.
- **Remaining / Still Planned / Gaps:** Background verification is not production approval. All action templates remain PENDING_REVIEW and approved_for_production=NO; loaded objects are mutable cached references.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:275](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L275>)

#### CAP-004 · Action classes and production/Today gates
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Separates 12 financial, 11 verification, 3 educational templates. Educational actions cannot be primary Today recommendations; production gate rejects unapproved catalog actions.
- **Tested & Evidence:** E1 classification and production/education rejection tests pass.
- **Remaining / Still Planned / Gaps:** Catalog presence does not imply a complete action workflow; current catalog enables no approved production actions.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>); [server/src/checker/actionChecker.ts:194](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L194>)

#### CAP-005 · Formula ownership separation
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Server monetary calculations and scoring are deterministic; AI supplies classification, suggestions and complexity context. Registry names F001-F020 owners.
- **Tested & Evidence:** E1 numerical tests; E4 impact invariance with and without AI complexity.
- **Remaining / Still Planned / Gaps:** Browser independently duplicates financial/scoring logic; registry names a nonexistent standalone F010 method. Single formula ownership is not true across the whole app.
- **Source Reference:** [shared/calculator/index.ts:20](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L20>); [react-app/src/services/recommendationService.ts:113](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/recommendationService.ts#L113>)

### Backend

#### CAP-006 · Backend bootstrap and diagnostics
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Express/TypeScript app, /api routes, 5 MB JSON limit, health/runtime/model diagnostics and catalog delivery.
- **Tested & Evidence:** E2 uses actual HTTP app; E7 backend typecheck passes.
- **Remaining / Still Planned / Gaps:** Health does not probe external dependencies; CORS is unrestricted; no authentication middleware, job scheduler or operational readiness probe.
- **Source Reference:** [server/src/index.ts:35](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/index.ts#L35>); [server/src/routes/api.ts:64](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L64>)

#### CAP-007 · PI ingestion, normalization and version history
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Accepts seed or snapshot envelope, normalizes top-level user/version IDs, hashes semantic state, encrypts and saves latest plus historical snapshots; PUT triggers review.
- **Tested & Evidence:** E2 actual PUT/get trace workflow; E5 version advancement observed.
- **Remaining / Still Planned / Gaps:** Property checks/casts replace comprehensive runtime validation. Nested ownership/derived consistency not enforced; every save increases version even for identical input.
- **Source Reference:** [server/src/db/sqliteStore.ts:662](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/db/sqliteStore.ts#L662>); [server/src/routes/api.ts:155](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L155>)

#### CAP-008 · SQLite repositories and restart persistence
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Node SQLite with WAL/foreign keys, users, snapshots, agents, evaluations, traces, recommendations, feedback, FX, chat and 13 canonical tables.
- **Tested & Evidence:** E2 reopens an actual disk database and restores recommendation/feedback.
- **Remaining / Still Planned / Gaps:** No migration framework, verified recovery/backup, concurrent deployment testing or Supabase implementation. Disk reopen is not browser/server-process restart coverage.
- **Source Reference:** [server/src/db/sqliteStore.ts:101](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/db/sqliteStore.ts#L101>); [server/tests/e2e/http-workflow-and-security.test.ts:224](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/tests/e2e/http-workflow-and-security.test.ts#L224>)

#### CAP-009 · Canonical SQLite seeding
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Seeds canonical tables transactionally with original statuses and exposes table counts.
- **Tested & Evidence:** E1/E2 use real store and catalog; source reviewed.
- **Remaining / Still Planned / Gaps:** Skips seeding if at least 26 action rows already exist, without validating package/schema version or refreshing changed canonical records.
- **Source Reference:** [server/src/db/sqliteStore.ts:357](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/db/sqliteStore.ts#L357>)

### Orchestration

#### CAP-010 · Complete backend review pipeline
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** PI update/load → FX → Behavior → Debt → suggestions → Checker/critical coverage → batch complexity → deterministic decision → explanation → persisted Today/trace.
- **Tested & Evidence:** E2 real HTTP workflow with mock AI; E1 orchestrator scenarios. E4 separately verifies live AI modules.
- **Remaining / Still Planned / Gaps:** No single automated journey combines browser, HTTP, live AI and Feedback; agent working-snapshot changes are not fully merged into saved PI. Evaluation failure finalization is incomplete.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:253](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L253>)

#### CAP-011 · Agent caching and stale detection
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Input, policy, and age checks select cached Behavior/Debt outputs or rerun them; dynamic reference date injection supported in reviewWorkflow.
- **Tested & Evidence:** Tested in tests/clock-regressions.test.ts (6 tests) and tests/e2e/finagent-14-scenarios.test.ts.
- **Remaining / Still Planned / Gaps:** Background expiry cron scheduler; caching invalidation when user updates external profile settings.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:198](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L198>)

#### CAP-012 · Duplicate evaluation suppression
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Returns DUPLICATE_SUPPRESSED for matching completed snapshot/input/policy/event.
- **Tested & Evidence:** E1 scenario 10 passes.
- **Remaining / Still Planned / Gaps:** Not a concurrency lock or durable request-id idempotency mechanism; same-version parallel runs remain possible.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:295](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L295>)

#### CAP-013 · Stale publication guard
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** Compares captured/current PI version before publication, marks superseded run and avoids overwriting Today.
- **Tested & Evidence:** E1 scenario 10 simulates version change with onBeforePublish hook.
- **Remaining / Still Planned / Gaps:** Not a real parallel HTTP race test; does not protect feedback or Today retrieval from stale state.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:630](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L630>)

#### CAP-014 · Today snapshot freshness
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Today returns matched current PI version and decision trace snapshotVersion; fresh evaluation is run synchronously upon PI mutation or version drift.
- **Tested & Evidence:** Tested in tests/e2e/feedback-regressions.test.ts (stale feedback rejection, consistent Today refresh).
- **Remaining / Still Planned / Gaps:** Background expiry scheduler not yet implemented; active card selection persistence across browser reload without server session.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:630](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L630>); [server/src/routes/api.ts:250](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L250>)

### Feedback

#### CAP-015 · Accept lifecycle
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Records acceptance and feedback without deducting cash or treating acceptance as completion.
- **Tested & Evidence:** E1 scenario 11 and E2 actual HTTP pass.
- **Remaining / Still Planned / Gaps:** No transition or snapshot guard prevents accepting completed/declined/stale recommendations; browser optimistic state lacks rollback.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:753](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L753>); [react-app/src/context/PIContext.tsx:946](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L946>)

#### CAP-016 · Adjust lifecycle and affordability
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Requires positive amount, reruns backend Checker against current PI and rejects unsafe amount; safe adjustment is stored.
- **Tested & Evidence:** E1 scenario 11 and E2 cover safe/unsafe amounts.
- **Remaining / Still Planned / Gaps:** Score, impact, rationale and trace are not recalculated for adjusted amount. Browser retains its local adjustment even if server rejects it.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:781](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L781>); [react-app/src/context/PIContext.tsx:1037](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L1037>)

#### CAP-017 · Decline and alternative selection
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Persists decline and forces a new review; generator suppresses declined/completed action IDs for matching snapshot.
- **Tested & Evidence:** E1 scenario 11; E2 selects an alternative after decline.
- **Remaining / Still Planned / Gaps:** Suppression uses recommendation-ID heuristics and same-snapshot scope, not durable preference learning/cooldown. Browser has no offline retry queue.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:896](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L896>); [server/src/suggestion/suggestionGenerator.ts:63](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/suggestion/suggestionGenerator.ts#L63>)

#### CAP-018 · Complete and financial state mutation
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Atomic, replay-safe Complete transition; enforces checked adjusted amount; performs same-currency cash debits, goal allocation creation, and derived snapshot recalculation in a single SQLite transaction with rollback on failure.
- **Tested & Evidence:** Tested in tests/e2e/feedback-regressions.test.ts (12 tests) and tests/e2e/http-workflow-and-security.test.ts.
- **Remaining / Still Planned / Gaps:** Non-savings action types (e.g. canceling recurring subscription A015, changing automatic transfer A011) do not yet perform dedicated PI table updates; accepted recommendations do not yet reserve cash across review cycles.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:800](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L800>); [server/src/db/sqliteStore.ts:520](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/db/sqliteStore.ts#L520>)

#### CAP-019 · Recommendation identity handling
- **Stage:** Defective
- **Certainty Score:** 99%
- **Developed & Working Scope:** Feedback looks up requested record, then silently falls back to latest recommendation if not found.
- **Tested & Evidence:** Source review; not covered by existing test suite.
- **Remaining / Still Planned / Gaps:** Invalid/stale ID should not mutate an unrelated recommendation; requires explicit not-found handling and state checks.
- **Source Reference:** [server/src/orchestrator/reviewWorkflow.ts:737](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L737>)

### AI

#### CAP-020 · Live/mock configuration and secret loading
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Reads provider/model/keys from process or secret env file. Explicit mockMode=false or process FINAGENT_USE_LIVE_LLM=true enables live use; default is mock.
- **Tested & Evidence:** E4 explicit live Gemini test passes; E1/E2 use explicit mock clients.
- **Remaining / Still Planned / Gaps:** Key presence alone does not enable live mode. No UI shows authoritative AI/mock status; default mock startup must not be called live AI integration.
- **Source Reference:** [server/src/ai/llmClient.ts:44](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/llmClient.ts#L44>); [server/src/ai/llmClient.ts:106](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/llmClient.ts#L106>)

#### CAP-021 · Gemini adapter and model rotation
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** Google SDK structured/text calls, rotates aliases, records per-model success/error, attempts next model after raw failures.
- **Tested & Evidence:** E4 real Behavior/Suggestions/Evaluation calls pass with liveCallUsed=true and provider=gemini.
- **Remaining / Still Planned / Gaps:** Test proves some candidate model succeeded, not that every configured 3.1/3.5 alias is available. No startup model discovery/probe despite D-002.
- **Source Reference:** [server/src/ai/llmClient.ts:266](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/llmClient.ts#L266>); [server/tests/e2e/live-ai-integration.test.ts:18](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/tests/e2e/live-ai-integration.test.ts#L18>)

#### CAP-022 · Quota/backoff and provider fallback
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Tracks 404/429 from errors, counters, cooldown, retry-delay/backoff; schema/network errors use deterministic fallback.
- **Tested & Evidence:** E1/E2 exercise mock/deterministic paths; source inspected.
- **Remaining / Still Planned / Gaps:** No forced 429/network failover test; all-cooled models may still be retried, no persisted/distributed quota or explicit LLM request timeout. No automatic Gemini→OpenAI failover.
- **Source Reference:** [server/src/ai/llmClient.ts:209](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/llmClient.ts#L209>); [server/src/ai/llmClient.ts:379](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/llmClient.ts#L379>)

#### CAP-023 · OpenAI-compatible adapter
- **Stage:** Implemented, not live-tested
- **Certainty Score:** 98%
- **Developed & Working Scope:** Selected provider calls configurable chat/completions endpoint for text or structured output.
- **Tested & Evidence:** Source inspection; E7 backend typecheck. No live OpenAI test found.
- **Remaining / Still Planned / Gaps:** An alternative configured provider, not a verified Gemini fallback. Live behavior, timeouts and failure handling remain unverified.
- **Source Reference:** [server/src/ai/llmClient.ts:326](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/llmClient.ts#L326>)

#### CAP-024 · Behavior classification and recurring detection
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Keyword/sign rules plus optional LLM categories; preserves user-confirmed classifications, provenance, subscription hints and questions.
- **Tested & Evidence:** E4 real Behavior call; E1 orchestration uses deterministic/mock results.
- **Remaining / Still Planned / Gaps:** Live prompt includes only first 40 unconfirmed transactions; result IDs not universally checked for membership; no accuracy benchmark; minimized working changes not fully persisted back to PI.
- **Source Reference:** [server/src/analyzer/behaviorAgent.ts:88](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/analyzer/behaviorAgent.ts#L88>); [server/src/analyzer/behaviorAgent.ts:326](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/analyzer/behaviorAgent.ts#L326>)

#### CAP-025 · Debt analysis agent
- **Stage:** Partial
- **Certainty Score:** 97%
- **Developed & Working Scope:** Deterministic interest/payoff metrics, urgency/promo/debt-priority flags; AI writes narrative, not monetary effects.
- **Tested & Evidence:** E1 mock orchestration and numerical debt tests; no dedicated live Debt test.
- **Remaining / Still Planned / Gaps:** Fixed fallback date, hardcoded 7% middle APR policy, global policy reload, incomplete currency conversion and product/promo model. Narrative numbers not validated.
- **Source Reference:** [server/src/analyzer/debtAgent.ts:40](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/analyzer/debtAgent.ts#L40>)

#### CAP-026 · Suggestion generation
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Code builds opportunity pool for A007/A002/A012/A013/A015/A014; AI selects/refines up to three without owning amounts. Critical actions are independently injected.
- **Tested & Evidence:** E4 actual live Suggestion call; E1/E2 real downstream checking.
- **Remaining / Still Planned / Gaps:** Not free discovery across all 26 actions. Hardcoded 15 minimum, rounding-to-5 and allocation proportions violate full policy centralization. No quality benchmark.
- **Source Reference:** [server/src/suggestion/suggestionGenerator.ts:41](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/suggestion/suggestionGenerator.ts#L41>)

#### CAP-027 · Single batch T/S/D/O evaluation
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** One logical structured evaluation batch for nonempty valid candidates; factors/rationale/facts/missing info keyed per candidate; code computes F016.
- **Tested & Evidence:** E4 verifies live telemetry, factor shape/rationale, candidate count and deterministic financial impact invariance.
- **Remaining / Still Planned / Gaps:** One logical call can retry several physical API requests. No cycle-wide physical-call-count assertion; schema clamps invalid values and supplies rationale; fallback EVALUATED factors can conceal uncertainty.
- **Source Reference:** [server/src/ai/evaluationCall.ts:13](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/evaluationCall.ts#L13>); [server/src/ai/evaluationCall.ts:76](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/evaluationCall.ts#L76>)

#### CAP-028 · Backend explanation generation
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** Deterministic translation of trace/decision into human description, effects, policy and source/rule metadata, with 90d/12m figures.
- **Tested & Evidence:** E1/E2 real pipeline; source review.
- **Remaining / Still Planned / Gaps:** No independent financial recalculation; not a detailed comparison of every alternative. Some default source/rule references inserted rather than proved instance-specific evidence.
- **Source Reference:** [server/src/ai/assistantAgent.ts:25](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/assistantAgent.ts#L25>)

#### CAP-029 · Backend conversational assistant
- **Stage:** Partial
- **Certainty Score:** 97%
- **Developed & Working Scope:** Topic/knowledge mapping, minimized PI/current decision, live-or-fallback answer and persisted message history; returns action/source refs.
- **Tested & Evidence:** E1 scenario 14 mock direct Assistant call; no live or HTTP Assistant test.
- **Remaining / Still Planned / Gaps:** No conversation history/full trace fed to model; latestTrace unused; citations and numeric prose not verified; no actual financial tool execution or PI edits.
- **Source Reference:** [server/src/ai/assistantAgent.ts:153](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/assistantAgent.ts#L153>); [server/src/routes/api.ts:386](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L386>)

### FX

#### CAP-030 · Latest exchange rates and fallback cache
- **Stage:** Implemented prototype
- **Certainty Score:** 97%
- **Developed & Working Scope:** Frankfurter primary/secondary hosts, memory/SQLite caching, request timeout, identity rate, supported list, stale fallback, explicit unavailable rate=0.
- **Tested & Evidence:** E1 scenario 13 uses injected FX fetch; numerical FX tests real. No dedicated live FX proof.
- **Remaining / Still Planned / Gaps:** Unavailable currencies must remain excluded/flagged. Tests do not establish current external service availability or every multi-currency path.
- **Source Reference:** [server/src/fx/frankfurterService.ts:165](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/fx/frankfurterService.ts#L165>)

#### CAP-031 · Historical exchange rates
- **Stage:** Partial
- **Certainty Score:** 94%
- **Developed & Working Scope:** Dated API/cache retrieval with secondary endpoint and unavailable status.
- **Tested & Evidence:** Source/typecheck; no dedicated historical or live HTTP test found.
- **Remaining / Still Planned / Gaps:** Historical retrieval also updates latest cache; freshness uses fetchedAt rather than effective rateDate, so old effective rates can appear fresh.
- **Source Reference:** [server/src/fx/frankfurterService.ts:84](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/fx/frankfurterService.ts#L84>); [server/src/fx/frankfurterService.ts:288](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/fx/frankfurterService.ts#L288>)

### Security

#### CAP-032 · Identity authentication
- **Stage:** Defective
- **Certainty Score:** 100%
- **Developed & Working Scope:** Missing identity returns 401; supplied header or Bearer text is accepted as identity.
- **Tested & Evidence:** E2 tests missing/mismatched IDs; E5 forged victim header and unsigned Bearer both return 200 for victim PI.
- **Remaining / Still Planned / Gaps:** No signature/session/OTP/provider validation. Matching client-controlled IDs bypass isolation. Critical blocker for any real multi-user use.
- **Source Reference:** [server/src/routes/api.ts:34](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L34>); [docs/coordination/evidence/T-08/probes.txt:2](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/docs/coordination/evidence/T-08/probes.txt#L2>)

#### CAP-033 · Repository authorization and user scoping
- **Stage:** Partial
- **Certainty Score:** 100%
- **Developed & Working Scope:** Store and routes compare authenticated/requested user IDs and query by user.
- **Tested & Evidence:** E1 scenario14 and E2 mismatch test pass.
- **Remaining / Still Planned / Gaps:** Checks work only with a trusted identity, which is absent. Full user isolation is not established by those tests.
- **Source Reference:** [server/src/security/securityService.ts:73](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/security/securityService.ts#L73>)

#### CAP-034 · Encryption and key management
- **Stage:** Implemented prototype (Local transport boundary per D-011)
- **Certainty Score:** 99%
- **Developed & Working Scope:** Loopback IPv4 127.0.0.1 transport boundary; rejects nonlocal hosts, DNS-rebinding attacks, and unapproved origins before API routing; allows exact local dev preview CORS. Client-asserted x-user-id header is isolated to local prototype scope.
- **Tested & Evidence:** Tested in tests/local-access.test.ts (12 tests) and tests/e2e/http-workflow-and-security.test.ts.
- **Remaining / Still Planned / Gaps:** Real multi-user authentication, JWT/session cookies, and identity provider integration are explicitly deferred under D-011/Q-011.
- **Source Reference:** [server/src/security/localAccess.ts:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/security/localAccess.ts#L1>); [server/src/index.ts:38](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/index.ts#L38>)

#### CAP-035 · Encryption coverage and privacy lifecycle
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Sensitive main PI is encrypted, browser export/reset and backend message persistence exist.
- **Tested & Evidence:** Source review; encryption test scope limited to PI.
- **Remaining / Still Planned / Gaps:** Agent results, traces, recommendations, notes/chat remain plaintext in SQLite; browser PI is plaintext. No comprehensive retention/deletion/access audit lifecycle.
- **Source Reference:** [server/src/db/sqliteStore.ts:152](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/db/sqliteStore.ts#L152>); [server/src/db/sqliteStore.ts:951](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/db/sqliteStore.ts#L951>); [react-app/src/database/db.ts:3](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/database/db.ts#L3>)

#### CAP-036 · PI minimization
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Removes nickname/account names/institutions/notes/raw rows; regex scrubs email/IBAN/long account numbers; filenames anonymized before model calls.
- **Tested & Evidence:** E2 direct PII test and E1 security scenario pass.
- **Remaining / Still Planned / Gaps:** Denylist/regex does not guarantee anonymization; IDs, free text, ordinary names/addresses may remain. No exhaustive PII or model-payload audit.
- **Source Reference:** [server/src/security/securityService.ts:151](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/security/securityService.ts#L151>)

#### CAP-037 · Prompt-injection defenses
- **Stage:** Partial
- **Certainty Score:** 96%
- **Developed & Working Scope:** Untrusted-data tags neutralize nested tags; prompts identify external data; structured outputs parsed through schemas.
- **Tested & Evidence:** Source review; no adversarial red-team suite.
- **Remaining / Still Planned / Gaps:** Tags/instructions are basic mitigation, not proof of injection/exfiltration resistance or grounded free-text explanations.
- **Source Reference:** [server/src/ai/llmClient.ts:83](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/ai/llmClient.ts#L83>)

#### CAP-038 · Server transaction deduplication helper
- **Stage:** Implemented, limited integration
- **Certainty Score:** 97%
- **Developed & Working Scope:** Normalized account/date/amount/currency/text fingerprint and existing/incoming duplicate filtering.
- **Tested & Evidence:** Source/typecheck; no dedicated ingestion HTTP test.
- **Remaining / Still Planned / Gaps:** No server statement-import endpoint; browser uses a separate deduplication algorithm with different behavior.
- **Source Reference:** [server/src/security/securityService.ts:242](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/security/securityService.ts#L242>)

### Decision

#### CAP-039 · Weight profiles and liquidity hysteresis
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Liquidity/expensive-debt/goal/balanced precedence, policy weights, liquidity enter/exit hysteresis.
- **Tested & Evidence:** E1 profile tests, no-goal scenario5, hysteresis scenario12.
- **Remaining / Still Planned / Gaps:** Not empirically calibrated; some snapshot/currency overrides and interest-accruing defaults affect choices.
- **Source Reference:** [server/src/decision/weightCalculator.ts:93](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/weightCalculator.ts#L93>)

#### CAP-040 · Checker, safety and affordability layers
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Catalog/type/production gates, selected input/safety checks, individual cash trajectory affordability and verification fallbacks.
- **Tested & Evidence:** E1 numerical/checker/scenario tests pass; E2 unsafe Adjust rejected.
- **Remaining / Still Planned / Gaps:** Does not generically enforce every required_inputs_list or all R001-R018. Fee schedule flag unused, issuer/product/consent gates incomplete; minimum-payment branch uses starting cash.
- **Source Reference:** [server/src/checker/actionChecker.ts:194](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L194>)

#### CAP-041 · Critical discovery and ranking
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Independently discovers A001/A005/A011/A020; direct mitigation ranks before diagnostics and bypasses normal score.
- **Tested & Evidence:** E1 scenarios1/2/6/9 pass.
- **Remaining / Still Planned / Gaps:** Fixed ranks do not implement full risk/due-date comparator. A020 may be added even if A011 resolves deficit; absent issuer terms can pass hardship gate.
- **Source Reference:** [server/src/checker/actionChecker.ts:47](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L47>); [server/src/decision/decisionEngine.ts:120](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/decisionEngine.ts#L120>)

#### CAP-042 · Double-spending prevention
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Evaluates each optional action against current snapshot; suppresses some already handled actions.
- **Tested & Evidence:** E1 candidate affordability tests.
- **Remaining / Still Planned / Gaps:** Accepted recommendations do not reserve cash across candidates/cycles. Manual browser goal allocation bypasses shared safety checks.
- **Source Reference:** [server/src/checker/actionChecker.ts:257](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L257>); [react-app/src/context/PIContext.tsx:670](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L670>)

#### CAP-043 · 90-day action impact and normalization
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Code-owned action arithmetic and debt simulation; records raw R/F/G, K scales, clipped normalized values, 12m debt/subscription figures.
- **Tested & Evidence:** E1 arithmetic/internal-transfer tests; E4 financial impacts invariant to AI complexity.
- **Remaining / Still Planned / Gaps:** No complete x_H^0 versus x_H^a cash simulation for all actions. Some currency fallback values unconverted; recurring and bill-date effects incomplete.
- **Source Reference:** [server/src/decision/impactCalculator.ts:179](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L179>)

#### CAP-044 · Complexity, scoring and robustness
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Weighted T/S/D/O with fallback; F017 benefit-minus-complexity; 200 seeded weight perturbations, sensitivity matrix and close-decision tie-breaker.
- **Tested & Evidence:** E1 scenarios7/12; E4 real complexity factors.
- **Remaining / Still Planned / Gaps:** Prototype model only; fallback constants outside config; simulation diagnostics are not empirical success probabilities.
- **Source Reference:** [server/src/decision/complexityEvaluator.ts:19](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/complexityEvaluator.ts#L19>); [server/src/decision/scoringEngine.ts:22](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/scoringEngine.ts#L22>); [server/src/decision/robustnessChecker.ts:34](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/robustnessChecker.ts#L34>)

#### CAP-045 · Stability publication policy
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Computes stability across 200 simulations; classifies instability causes (MISSING_PI_DATA, UNSTABLE_ASSUMPTIONS, CLOSE_VALID_ALTERNATIVES); routes MISSING_PI_DATA to NEEDS_DATA in decisionEngine.
- **Tested & Evidence:** Tested in tests/e2e/finagent-14-scenarios.test.ts (scenario 12) and tests/ai-reliability.test.ts.
- **Remaining / Still Planned / Gaps:** Enforcing conservative retention policy when instabilityReason is UNSTABLE_ASSUMPTIONS; tie-breaker test for close margin alternatives.
- **Source Reference:** [server/src/decision/decisionEngine.ts:530](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/decisionEngine.ts#L530>); [server/src/decision/robustnessChecker.ts:243](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/robustnessChecker.ts#L243>)

#### CAP-046 · Trace and verification/critical paths
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** Normal trace stores checks, weights, impacts, complexity, scores, robustness, source refs and winner. Verification actions selected without fictional monetary scores; critical paths bypass scoring.
- **Tested & Evidence:** E1 scenarios3/8/9; E2 actual trace endpoint.
- **Remaining / Still Planned / Gaps:** Critical/verification traces intentionally have null/empty scored metrics. Explanations do not systematically compare all alternatives; references are traceability rather than proven effect evidence.
- **Source Reference:** [server/src/decision/decisionEngine.ts:157](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/decisionEngine.ts#L157>); [server/src/decision/decisionEngine.ts:493](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/decisionEngine.ts#L493>)

### Web

#### CAP-047 · App shell, navigation and notifications
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** React HashRouter Today/My Plan/Assistant/onboarding; settings, loading screen, toast/island notices, phone-frame/fullscreen display.
- **Tested & Evidence:** E6 Today/MyPlan/Assistant/settings rendered; E7/E8 compile/build pass.
- **Remaining / Still Planned / Gaps:** No route auth guard; full responsive/accessibility/device behavior not tested. Toasts are UI feedback, not external push notifications.
- **Source Reference:** [react-app/src/App.tsx:17](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/App.tsx#L17>)

#### CAP-048 · Onboarding and demo identity
- **Stage:** Demo only
- **Certainty Score:** 100%
- **Developed & Working Scope:** Seven current screens: welcome, identity, concern/goal, accounts, income, commitments/debt, CSV; step resume/back/skip; fixed code 8492 for demo verification.
- **Tested & Evidence:** Source review and web compile; no complete onboarding browser test.
- **Remaining / Still Planned / Gaps:** UI/settings say ten steps; completion records ten although TOTAL_STEPS=7. No real signup/email/OTP/session service.
- **Source Reference:** [react-app/src/components/onboarding/OnboardingFlow.tsx:21](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/onboarding/OnboardingFlow.tsx#L21>); [react-app/src/context/PIContext.tsx:325](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L325>)

#### CAP-049 · Preferences and primary concern
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** Six concern options, notes, optional specific goal, saved profile and base currency.
- **Tested & Evidence:** Source/typecheck; settings visible E6; not form-tested.
- **Remaining / Still Planned / Gaps:** No validated behavioral/risk model or genuine identity verification; changing settings invokes registration helper and affects onboarding step.
- **Source Reference:** [react-app/src/context/PIContext.tsx:211](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L211>); [react-app/src/context/PIContext.tsx:254](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L254>)

#### CAP-050 · Accounts and manual balance history
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** Account CRUD, currencies/purposes/ownership/personal share/primary flag, dated balance observations and per-account source/history.
- **Tested & Evidence:** Source reviewed; E6 seeded four accounts visible; no CRUD browser tests.
- **Remaining / Still Planned / Gaps:** Weak personal-share validation; no bank API. Deletion can leave orphan confirmations; default/freshness dates are demo-specific.
- **Source Reference:** [react-app/src/components/modals/AccountModal.tsx:49](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/modals/AccountModal.tsx#L49>); [react-app/src/context/PIContext.tsx:340](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L340>)

#### CAP-051 · Income management
- **Stage:** Implemented prototype
- **Certainty Score:** 97%
- **Developed & Working Scope:** Create/edit/delete data helpers; UI add/delete source, type, regularity, amount/currency/frequency/date/account/notes.
- **Tested & Evidence:** Source/typecheck; no focused form tests.
- **Remaining / Still Planned / Gaps:** Declared source is not confirmed receipt; general edit affordance limited; local monthly aggregation does not imply backend reconciliation.
- **Source Reference:** [react-app/src/context/PIContext.tsx:487](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L487>); [react-app/src/components/modals/QuickActionModals.tsx:16](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/modals/QuickActionModals.tsx#L16>)

#### CAP-052 · Essentials and bills management
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Nullable essential-expense estimate; bill CRUD, due dates/recurrence/accounts, paid/unpaid toggle; Today upcoming bills.
- **Tested & Evidence:** E6 seeded bills/essentials rendered; source reviewed.
- **Remaining / Still Planned / Gaps:** Web treats all unpaid bills without a true horizon/occurrence generator. Paid toggle does not execute payment or update bank balance; local fallback substitutes essential=800 if unknown.
- **Source Reference:** [react-app/src/context/PIContext.tsx:524](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L524>); [react-app/src/context/PIContext.tsx:544](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L544>)

#### CAP-053 · Debt records
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** CRUD debt type, balance/unknown, APR/minimum/due/frequency; MyPlan listing and onboarding forms.
- **Tested & Evidence:** E6 debt listing rendered; source/typecheck.
- **Remaining / Still Planned / Gaps:** No provider connection or payment-specific UI; incomplete contractual inputs; saving/deleting debt does not clear local recommendations consistently.
- **Source Reference:** [react-app/src/context/PIContext.tsx:597](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L597>); [react-app/src/components/dashboard/MyPlanView.tsx:275](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/dashboard/MyPlanView.tsx#L275>)

#### CAP-054 · Goals and manual earmarking
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** Web UI TodayView waits for backend HTTP confirmation before marking actions accepted/adjusted/completed; provides duplicate-submit locks, displays loading states, and rolls back optimistic UI on network failure.
- **Tested & Evidence:** Tested in tests/web-feedback-regressions.test.ts (13 tests) and manual browser smoke testing.
- **Remaining / Still Planned / Gaps:** Offline queueing and retry of feedback actions when network is unavailable.
- **Source Reference:** [react-app/src/context/PIContext.tsx:500](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L500>); [react-app/src/components/dashboard/TodayView.tsx:180](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/dashboard/TodayView.tsx#L180>)

#### CAP-055 · Browser storage, demo and reset
- **Stage:** Implemented prototype
- **Certainty Score:** 100%
- **Developed & Working Scope:** Active PI stored in IndexedDB plus localStorage, restored on mount; seeded Alex or blank profile; local demo/reset.
- **Tested & Evidence:** E6 chat and PI survived page reload; source inspected.
- **Remaining / Still Planned / Gaps:** Plaintext single active-state key, no user isolation/migration/multi-device sync. Local reset does not delete backend history; storage errors can be silent.
- **Source Reference:** [react-app/src/database/db.ts:3](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/database/db.ts#L3>); [react-app/src/context/PIContext.tsx:1198](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L1198>)

#### CAP-056 · JSON export and restoration
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Downloads full local PI JSON with schema/export metadata/security notice.
- **Tested & Evidence:** Source reviewed; export download not manually exercised.
- **Remaining / Still Planned / Gaps:** JSON import/restore is absent; export contains raw personal/statement data. No tested backup round trip.
- **Source Reference:** [react-app/src/database/db.ts:91](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/database/db.ts#L91>); [react-app/src/components/modals/SettingsModal.tsx:41](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/modals/SettingsModal.tsx#L41>)

### Web imports

#### CAP-057 · CSV upload and parser
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Browser File API reads CSV; comma/semicolon/header aliases/quoted single-line fields/debit-credit/date/currency/reference/running balance; raw row provenance and sample statements.
- **Tested & Evidence:** Source/typecheck; no dedicated CSV parser tests.
- **Remaining / Still Planned / Gaps:** Multiline quoted cells unsupported; European 1.234,56 parsing wrong; calendar dates weakly validated; malformed rows skipped. Upload progress is timed presentation, not actual pipeline telemetry.
- **Source Reference:** [react-app/src/services/statementParser.ts:24](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/statementParser.ts#L24>); [react-app/src/components/modals/QuickActionModals.tsx:343](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/modals/QuickActionModals.tsx#L343>)

#### CAP-058 · PDF/XLSX statement import
- **Stage:** Not implemented
- **Certainty Score:** 100%
- **Developed & Working Scope:** Unsupported-format record is returned instead of fabricating transactions.
- **Tested & Evidence:** Source inspection.
- **Remaining / Still Planned / Gaps:** No PDF/OCR/XLSX extraction. Absence is documented, not presented as an approved current-scope delivery commitment.
- **Source Reference:** [react-app/src/services/statementParser.ts:315](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/statementParser.ts#L315>)

#### CAP-059 · Duplicate/overlap handling and closing balances
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Same-file hash and existing same-account transaction checks, overlap warnings; statement closing balance becomes a dated account observation.
- **Tested & Evidence:** Source/typecheck; no dedicated import test suite.
- **Remaining / Still Planned / Gaps:** Within-upload duplicates not compared, currency absent in duplicate match; period uses newly accepted rows; closing balance currency from account. Deletion may leave transfer matches.
- **Source Reference:** [react-app/src/services/statementParser.ts:285](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/statementParser.ts#L285>); [react-app/src/context/PIContext.tsx:739](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L739>); [react-app/src/context/PIContext.tsx:782](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L782>)

#### CAP-060 · Local transaction classification and review
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Keyword economic type/category, confidence/provenance, transaction review filters, manual reclassification.
- **Tested & Evidence:** E6 imported transaction totals and review controls visible; source reviewed.
- **Remaining / Still Planned / Gaps:** Heuristic accuracy unbenchmarked; no browser classifier/parser tests. Verified labels can overstate heuristic evidence.
- **Source Reference:** [react-app/src/services/statementParser.ts:118](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/statementParser.ts#L118>); [react-app/src/components/modals/QuickActionModals.tsx:770](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/modals/QuickActionModals.tsx#L770>)

#### CAP-061 · Transfer matching and confirmations
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Pairs cross-account same-currency opposite amounts by date/amount/reference; asks single-sided transfer and subscription questions; yes/no/not-sure/edit/delete controls.
- **Tested & Evidence:** E6 seeded confirmations visible; source/typecheck.
- **Remaining / Still Planned / Gaps:** Potential many-to-many matches; probable transfers excluded before confirmation; no cross-currency pairing. Not-sure can remove unresolved status/mark subscription confirmed. Amount/date tolerances hardcoded.
- **Source Reference:** [react-app/src/services/reconciliationService.ts:39](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/reconciliationService.ts#L39>); [react-app/src/context/PIContext.tsx:803](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L803>)

### Web

#### CAP-062 · Local financial snapshot and readiness
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Balances, ownership, per-currency totals, safe spend, income/spending/goal aggregates, missing fields, readiness A/B/C and staleness.
- **Tested & Evidence:** E1/E2/E4 import seed/snapshotBuilder as fixture support; E6 totals rendered.
- **Remaining / Still Planned / Gaps:** Separate formulas from shared server calculator; no FX conversion; fixed Nov3 clock. Action-ready checked before stale uncertainty; Date.now snapshot IDs change for every state rebuild.
- **Source Reference:** [react-app/src/services/snapshotBuilder.ts:13](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/snapshotBuilder.ts#L13>); [react-app/src/services/snapshotBuilder.ts:282](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/snapshotBuilder.ts#L282>)

#### CAP-063 · Today recommendation display
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** One main card with explanation/amount/effect, provenance, score/complexity/stability metadata, accounts, confirmations, bills and quick actions.
- **Tested & Evidence:** E6 Today rendered A007 €40 and metadata; E8 build.
- **Remaining / Still Planned / Gaps:** Generic controls assume cushion semantics even for other monetary actions; null stability may display 100%. Rendered metadata does not prove server calculations/live AI.
- **Source Reference:** [react-app/src/components/dashboard/TodayView.tsx:21](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/dashboard/TodayView.tsx#L21>); [react-app/src/components/dashboard/TodayView.tsx:373](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/dashboard/TodayView.tsx#L373>)

#### CAP-064 · Local recommendation fallback
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** Removed invented client-side financial scores and fake stability 1.0; UI honestly identifies backend source and displays provenance; suppresses uncomputed scores when action amount is adjusted.
- **Tested & Evidence:** Tested in tests/web-feedback-regressions.test.ts.
- **Remaining / Still Planned / Gaps:** Full on-the-fly client-side re-scoring of adjusted amounts without round-tripping to server Decision Engine.
- **Source Reference:** [react-app/src/services/recommendationService.ts:113](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/recommendationService.ts#L113>); [react-app/src/components/dashboard/TodayView.tsx:210](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/dashboard/TodayView.tsx#L210>)

#### CAP-065 · Backend sync and authoritative state
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Snapshot changes issue PUT PI; client can review/fetch Today, submit feedback/chat and attach backend metadata.
- **Tested & Evidence:** E2 HTTP verifies backend independently; source wiring reviewed.
- **Remaining / Still Planned / Gaps:** API errors silently return null; UI does not fetch authoritative server PI at startup or merge Complete snapshot. Snapshot/remote-rec updates risk repeated sync churn (not load-tested).
- **Source Reference:** [react-app/src/context/PIContext.tsx:171](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L171>); [react-app/src/api/client.ts:85](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/api/client.ts#L85>)

#### CAP-066 · Feedback controls and reconciliation
- **Stage:** Defective
- **Certainty Score:** 100%
- **Developed & Working Scope:** Local Accept/Adjust/Decline/Complete updates UI immediately and posts feedback; reserve sheet selects account and creates cushion allocation.
- **Tested & Evidence:** Source/typecheck; backend happy-path E2 is not UI coverage.
- **Remaining / Still Planned / Gaps:** No failure rollback/durable retry. Rejected Adjust remains local; selected Complete account not sent, server PI discarded; debt/non-cushion actions use cushion-oriented controls. No full UI feedback test executed.
- **Source Reference:** [react-app/src/context/PIContext.tsx:946](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/context/PIContext.tsx#L946>); [react-app/src/components/dashboard/TodayView.tsx:880](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/dashboard/TodayView.tsx#L880>)

#### CAP-067 · Recommendation freshness in browser
- **Stage:** Defective
- **Certainty Score:** 99%
- **Developed & Working Scope:** Existing active recommendations may be retained across state changes.
- **Tested & Evidence:** Source reviewed.
- **Remaining / Still Planned / Gaps:** A non-cushion record with finAgentMeta can bypass snapshot ID equality; stale metadata is not a freshness guarantee.
- **Source Reference:** [react-app/src/services/recommendationService.ts:171](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/recommendationService.ts#L171>)

#### CAP-068 · MyPlan cushion and cash-flow display
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Multi-locale parser supporting European (comma decimal, dot thousands) and US (dot decimal, comma thousands) amounts; strict calendar validation; duplicate detection within upload and existing PI.
- **Tested & Evidence:** Tested in tests/statement-parser.test.ts (38 tests).
- **Remaining / Still Planned / Gaps:** UI modal to manually resolve ambiguous single-separator amounts that are withheld from auto-import.
- **Source Reference:** [react-app/src/services/statementParser.ts:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/statementParser.ts#L1>)

#### CAP-069 · Spending chart and savings simulator
- **Stage:** Implemented prototype
- **Certainty Score:** 98%
- **Developed & Working Scope:** SVG spending categories with transaction drilldown; goal selection, monthly slider, linear months-to-target and date estimate.
- **Tested & Evidence:** E6 chart and slider rendered; source/typecheck.
- **Remaining / Still Planned / Gaps:** No true period filtering; refund/category totals can disagree. Simulator has no affordability/interest/uncertainty or saved scenario; interaction accuracy not fully tested.
- **Source Reference:** [react-app/src/components/dashboard/MyPlanView.tsx:158](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/dashboard/MyPlanView.tsx#L158>); [react-app/src/components/dashboard/MyPlanView.tsx:191](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/components/dashboard/MyPlanView.tsx#L191>)

#### CAP-070 · Local Assistant and server enrichment
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Withholds multiline unclosed quote records from fabricating false transactions; validates date boundaries, leap years, and running balances.
- **Tested & Evidence:** Tested in tests/statement-parser.test.ts (38 tests).
- **Remaining / Still Planned / Gaps:** Direct PDF and Excel (XLSX) statement parsers.
- **Source Reference:** [react-app/src/services/statementParser.ts:120](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/statementParser.ts#L120>)

### Mobile and legacy

#### CAP-071 · Native Expo app
- **Stage:** Demo only
- **Certainty Score:** 100%
- **Developed & Working Scope:** Separate React Native visual mock with local onboarding/navigation, hardcoded balances/bills and +40 reserve React state.
- **Tested & Evidence:** Source inspection only; no emulator/device build or runtime test.
- **Remaining / Still Planned / Gaps:** Expo52, no persistent store/backend/AI/import/auth integration; many controls unwired. D-010 SDK58 upgrade is not implemented.
- **Source Reference:** [expo-mobile-app/package.json:12](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/expo-mobile-app/package.json#L12>); [expo-mobile-app/App.tsx:19](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/expo-mobile-app/App.tsx#L19>)

#### CAP-072 · Root HTML and design generators
- **Stage:** Legacy artifact
- **Certainty Score:** 99%
- **Developed & Working Scope:** Standalone embedded root HTML plus Python design/demo builders, SVG/assets/thumbnail/design source.
- **Tested & Evidence:** Source/artifact inspection; no browser run of root artifact this review.
- **Remaining / Still Planned / Gaps:** Root build predates current backend wiring and lacks current metadata markers; generators include simulated upload/sync handlers. Old double-click/ten-step instructions do not describe current v1.1 web source.
- **Source Reference:** [index.html:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/index.html#L1>); [build_html.py:1525](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/build_html.py#L1525>); [build_full_app.py:1667](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/build_full_app.py#L1667>); [ИНСТРУКЦИЯ.md:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/ИНСТРУКЦИЯ.md#L1>)

### Delivery

#### CAP-073 · Automated tests and build tooling
- **Stage:** Partial
- **Certainty Score:** 100%
- **Developed & Working Scope:** Four Vitest files with36 tests, backend/web typechecks and Vite production build; test fixtures and historical handoffs present.
- **Tested & Evidence:** Fresh E1-E4 all36 pass, E7 both pass, E8 build passes; raw logs saved.
- **Remaining / Still Planned / Gaps:** No browser/component/parser/reconciliation/mobile tests, coverage threshold/report, comprehensive live provider matrix or production load tests. Test names overstate end-to-end scope.
- **Source Reference:** [server/vitest.config.ts:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/vitest.config.ts#L1>); [react-app/package.json:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/package.json#L1>); [expo-mobile-app/package.json:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/expo-mobile-app/package.json#L1>)

#### CAP-074 · Git history, CI and deployment
- **Stage:** Not implemented in inspected checkout
- **Certainty Score:** 99%
- **Developed & Working Scope:** Local source workspace and package scripts exist.
- **Tested & Evidence:** Read-only git log reports master has no commits; no remote output or .github workflow found.
- **Remaining / Still Planned / Gaps:** No reproducible committed baseline, configured remote/CI, verified hosted deployment or release procedure evidenced here. This is checkout evidence, not a claim about every external copy.
- **Source Reference:** [.gitignore:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/.gitignore#L1>); [server/package.json:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/package.json#L1>)

### Planned and absent

#### CAP-075 · Supabase migration
- **Stage:** Planned
- **Certainty Score:** 99%
- **Developed & Working Scope:** SQLite repository boundary established for later migration under D-001.
- **Tested & Evidence:** Decision document and current store inspected.
- **Remaining / Still Planned / Gaps:** No Supabase implementation, migration or integration test found; explicitly future work.
- **Source Reference:** [docs/coordination/DECISIONS.md:12](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/docs/coordination/DECISIONS.md#L12>); [server/src/db/sqliteStore.ts:101](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/db/sqliteStore.ts#L101>)

#### CAP-076 · Mobile SDK58 delivery
- **Stage:** Planned
- **Certainty Score:** 100%
- **Developed & Working Scope:** D-010 defers SDK58 until backend/web/E2E verification; Expo52 demo exists.
- **Tested & Evidence:** Current mobile manifest and D-010 inspected.
- **Remaining / Still Planned / Gaps:** Upgrade, backend-connected native feature parity, device verification and release not done.
- **Source Reference:** [docs/coordination/DECISIONS.md:66](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/docs/coordination/DECISIONS.md#L66>); [expo-mobile-app/package.json:12](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/expo-mobile-app/package.json#L12>)

#### CAP-077 · Bank sync, real money movement, scheduling and push
- **Stage:** Not implemented
- **Certainty Score:** 99%
- **Developed & Working Scope:** Manual financial bookkeeping and HTTP-triggered reviews only; legacy mock controls may say sync.
- **Tested & Evidence:** Source search across backend/web/mobile.
- **Remaining / Still Planned / Gaps:** No bank connector, payment execution, automatic bank transfer/cancellation, durable scheduler/queue or push service. Real-money automation is explicitly outside current D-010 design, not a missing promised feature.
- **Source Reference:** [server/src/index.ts:35](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/index.ts#L35>); [docs/coordination/DECISIONS.md:66](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/docs/coordination/DECISIONS.md#L66>)

#### CAP-078 · Production hardening and empirical validation
- **Stage:** Not implemented
- **Certainty Score:** 99%
- **Developed & Working Scope:** Prototype flags, some scoped checks, encryption and synthetic scenarios form a starting point.
- **Tested & Evidence:** Source review and saved tests.
- **Remaining / Still Planned / Gaps:** Trusted auth, complete state machine/freshness, runtime validation, policy consolidation, key/privacy lifecycle, calibration and release acceptance remain. These are review recommendations unless explicitly prescribed in SPEC/DECISIONS.
- **Source Reference:** [server/config/prototype-policy.json:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/config/prototype-policy.json#L1>); [docs/SPEC.md:1](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/docs/SPEC.md#L1>)

### Canonical formulas

#### CAP-079 · F001 — Accessible liquidity
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Sums accessible accounts with FX and exposes earmarks/reserve/uncommitted cash.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Missing balances/FX may be omitted with incomplete warning propagation; restrictions differ by metric.
- **Source Reference:** [shared/calculator/index.ts:98](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L98>)

#### CAP-080 · F002 — Emergency coverage
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Liquid amount divided by positive monthly essentials; null if denominator invalid.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Primitive works on supplied values; browser uses earmarked cushion instead of server liquidity definition.
- **Source Reference:** [shared/calculator/index.ts:188](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L188>)

#### CAP-081 · F003 — Optional available cash
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** max(0,cash+confirmed inflows−mandatory outflows−floor).
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Clamping correctly applies here, not to projected deficits; input reliability remains external.
- **Source Reference:** [shared/calculator/index.ts:203](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L203>)

#### CAP-082 · F004 — Daily cash trajectory
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Projects bills, regular receipts, minimums and automatic transfers; preserves negative cash.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Monthly=30d, fixed fallback date/horizon, incomplete payment-frequency/promo modeling; missing FX can omit flows.
- **Source Reference:** [shared/calculator/index.ts:233](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L233>)

#### CAP-083 · F005 — Daily APR
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** APR decimal divided by365.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Primitive itself lacks missing-input validation; callers must guard null/unknown APR.
- **Source Reference:** [shared/calculator/index.ts:486](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L486>)

#### CAP-084 · F006 — Daily interest
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Principal multiplied by daily rate.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Simple noncompounding model, not universal lender statement replication.
- **Source Reference:** [shared/calculator/index.ts:494](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L494>)

#### CAP-085 · F007 — Loan annuity
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Standard annuity with zero-interest handling.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Invalid principal/period returns0; no full loan-product/contract model.
- **Source Reference:** [shared/calculator/index.ts:503](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L503>)

#### CAP-086 · F008 — Interest avoided
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Daily baseline vs extra-payment interest over90/365d, separates principal from savings.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** APR/balance/minimum missing values can default to0 inside helper; simplified minimum schedule, no complete promo transition.
- **Source Reference:** [shared/calculator/index.ts:534](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L534>)

#### CAP-087 · F009 — Payoff duration
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Logarithmic horizon, zero-rate case, null for nonamortizing payment.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Assumes fixed inputs and does not represent every card/minimum-payment contract.
- **Source Reference:** [shared/calculator/index.ts:514](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L514>)

#### CAP-088 · F010 — Incremental debt cost
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Debt helper combines avoided interest and supplied late fee.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Registry names nonexistent standalone computeDebtEffectiveIncrementalCost; not a general fee/penalty/contract simulator.
- **Source Reference:** [shared/calculator/index.ts:579](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L579>)

#### CAP-089 · F011 — Recurring expense savings
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Computes selected-period and12m savings minus supplied exit/replacement costs.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** 90d caller assumes3 charges instead of actual charge dates; product cancellation not executed.
- **Source Reference:** [shared/calculator/index.ts:594](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L594>); [server/src/decision/impactCalculator.ts:311](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L311>)

#### CAP-090 · F012 — Goal fraction
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Clamped saved/target fraction; null invalid target.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Currency/account validity belongs to callers; browser raw allocation totals may be inconsistent.
- **Source Reference:** [shared/calculator/index.ts:628](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L628>)

#### CAP-091 · F013 — Required monthly saving
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Remaining target divided by months remaining.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Primitive present and used by suggestions; Checker does not fully enforce deadline affordability.
- **Source Reference:** [shared/calculator/index.ts:637](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L637>)

#### CAP-092 · F014 — Resilience delta
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** After coverage minus before coverage through deterministic impact arithmetic.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** No complete horizon-state comparison for every action; earmarking and total liquidity not consistently distinguished across app.
- **Source Reference:** [server/src/decision/impactCalculator.ts:15](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L15>)

#### CAP-093 · F015 — Goal progress delta
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** After fraction minus before fraction for supported allocations.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Current-state allocation arithmetic, not a complete action-sensitive90d goal/cash simulator.
- **Source Reference:** [server/src/decision/impactCalculator.ts:23](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L23>)

#### CAP-094 · F016 — Context complexity
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Policy-weighted T/S/D/O with component fallback and uncertainty metadata.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Baseline/uncertainty constants not fully centralized; AI preprocessing can conceal missing factors.
- **Source Reference:** [server/src/decision/complexityEvaluator.ts:19](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/complexityEvaluator.ts#L19>)

#### CAP-095 · F017 — Recommendation score
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** w_R*v_R+w_F*v_F+w_G*v_G−lambda_C*c_C with breakdown/ranking.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Depends on upstream simplified impacts; no established positive-benefit publication floor.
- **Source Reference:** [server/src/decision/scoringEngine.ts:22](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/scoringEngine.ts#L22>)

#### CAP-096 · F018 — Robustness winner frequency
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** 200 seeded local weight perturbations, win frequencies, sensitivity and close-choice tie breaker.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Computation implemented, publication threshold handling incomplete;100% is simulated parameter stability, not real-world certainty.
- **Source Reference:** [server/src/decision/robustnessChecker.ts:34](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/robustnessChecker.ts#L34>); [server/src/decision/decisionEngine.ts:545](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/decisionEngine.ts#L545>)

#### CAP-097 · F019 — Due-date shortfall
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** max(0,mandatory due−available by due), integrated with daily trajectory.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Same-day obligations use end-of-day net adjustments, not an intraday allocation model; depends on simplified F004.
- **Source Reference:** [shared/calculator/index.ts:221](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L221>); [shared/calculator/index.ts:440](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L440>)

#### CAP-098 · F020 — Fees avoided
- **Stage:** Implemented primitive
- **Certainty Score:** 99%
- **Developed & Working Scope:** Baseline future fees minus fees after change.
- **Tested & Evidence:** E1 real numerical/module tests cover selected fixtures for this family; source reviewed. No universal product-accuracy proof.
- **Remaining / Still Planned / Gaps:** Tariff confirmation/retrieval not implemented as a complete product workflow; supplied data drives result.
- **Source Reference:** [shared/calculator/index.ts:617](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L617>)

### Canonical action coverage

#### CAP-099 · A001 — Required card minimum
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Critical discovery, due/minimum checks, selected affordability and debt effect; Complete reduces debt.
- **Tested & Evidence:** E1 scenarios1/9 and foundation; E2 debt family.
- **Remaining / Still Planned / Gaps:** No complete card-type/contract/future-bill funding guard; aggregate starting cash/raw amount can drive branch.
- **Source Reference:** [server/src/checker/actionChecker.ts:47](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L47>)

#### CAP-100 · A002 — Extra debt payment
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Suggestion, input/affordability checks, interest savings and debt completion.
- **Tested & Evidence:** E1 foundation/scenarios1–3; E2 debt completion.
- **Remaining / Still Planned / Gaps:** Simplified product/promo model; Complete repetition/amount override and cash consistency defects remain.
- **Source Reference:** [server/src/suggestion/suggestionGenerator.ts:101](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/suggestion/suggestionGenerator.ts#L101>); [server/src/decision/impactCalculator.ts:236](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L236>)

#### CAP-101 · A003 — Compare repayment orders
- **Stage:** Catalog only
- **Certainty Score:** 97%
- **Developed & Working Scope:** Catalog and generic verification handling exist.
- **Tested & Evidence:** Catalog validation only; no targeted workflow test.
- **Remaining / Still Planned / Gaps:** No dedicated avalanche/snowball comparison engine.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>)

#### CAP-102 · A004 — Verify card interest
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Missing APR/due data leads to verification action, without fictional monetary score.
- **Tested & Evidence:** E1 scenario3/foundation.
- **Remaining / Still Planned / Gaps:** Completing card does not retrieve or validate statement terms; data must be supplied separately.
- **Source Reference:** [server/src/checker/actionChecker.ts:602](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L602>)

#### CAP-103 · A005 — Request hardship options
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Shortfall-triggered protective discovery/selection.
- **Tested & Evidence:** E1 scenario2 with real orchestrator/mock AI.
- **Remaining / Still Planned / Gaps:** Missing issuer-terms object can bypass issuer gate; no bank contact/negotiation integration.
- **Source Reference:** [server/src/checker/actionChecker.ts:361](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L361>)

#### CAP-104 · A006 — Nonprofit counseling
- **Stage:** Catalog only
- **Certainty Score:** 97%
- **Developed & Working Scope:** Verification/Assistant mapping available.
- **Tested & Evidence:** Catalog and generic Assistant scope; no dedicated referral test.
- **Remaining / Still Planned / Gaps:** No directory, jurisdiction/referral eligibility or actual referral workflow.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>)

#### CAP-105 · A007 — Start emergency reserve
- **Stage:** Partial
- **Certainty Score:** 100%
- **Developed & Working Scope:** Suggestion/fallback, safety checks, reserve/goal effect and bookkeeping allocation on Complete.
- **Tested & Evidence:** E1/E2 and E5 repeated-completion probe.
- **Remaining / Still Planned / Gaps:** Hardcoded fallback heuristics, simplified liquidity model, duplicate allocation bug; no real transfer.
- **Source Reference:** [server/src/checker/actionChecker.ts:668](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L668>); [server/src/orchestrator/reviewWorkflow.ts:969](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L969>)

#### CAP-106 · A008 — Replenish reserve
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Shared reserve affordability/impact/allocation logic.
- **Tested & Evidence:** E1 scenarios4/12 candidate family.
- **Remaining / Still Planned / Gaps:** No distinct deterministic opportunity branch; not a fully separate replenishment lifecycle.
- **Source Reference:** [server/src/decision/impactCalculator.ts:179](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L179>)

#### CAP-107 · A009 — Assess reserve coverage
- **Stage:** Catalog plus primitives
- **Certainty Score:** 97%
- **Developed & Working Scope:** Verification template and F001/F002 calculations exist.
- **Tested & Evidence:** Catalog and numerical coverage tests.
- **Remaining / Still Planned / Gaps:** No dedicated action-specific review journey; browser uses this ID for a different clarification meaning.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>); [react-app/src/services/recommendationService.ts:113](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/react-app/src/services/recommendationService.ts#L113>)

#### CAP-108 · A010 — Safe payday saving
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Projection can add saving after predicted paydays; shared reserve/allocation paths.
- **Tested & Evidence:** Source review and internal-transfer scenario family.
- **Remaining / Still Planned / Gaps:** Impact adds one candidate amount rather than full recurring effect; no bank recurring schedule or recurring execution lifecycle.
- **Source Reference:** [shared/calculator/index.ts:233](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L233>); [server/src/decision/impactCalculator.ts:179](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L179>)

#### CAP-109 · A011 — Pause risky automatic transfer
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Before/after transfer-removal projection, independent critical discovery, stored transfer deactivation on Complete.
- **Tested & Evidence:** E1 scenarios6/9.
- **Remaining / Still Planned / Gaps:** Can label direct mitigation without proving entire deficit closed; no external bank control.
- **Source Reference:** [server/src/checker/actionChecker.ts:47](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L47>); [server/src/orchestrator/reviewWorkflow.ts:1016](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L1016>)

#### CAP-110 · A012 — Goal contribution
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Suggestion, active-goal check, affordability, goal delta and allocation completion.
- **Tested & Evidence:** E1 no-goal rejection scenario5; shared impact tests.
- **Remaining / Still Planned / Gaps:** Currency consistency and full deadline feasibility incomplete; manual UI allocation bypasses checker.
- **Source Reference:** [server/src/checker/actionChecker.ts:310](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L310>); [server/src/suggestion/suggestionGenerator.ts:101](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/suggestion/suggestionGenerator.ts#L101>)

#### CAP-111 · A013 — Adjust goal deadline
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Suggestion when required saving exceeds safe cash; goal existence check.
- **Tested & Evidence:** Source reviewed; no end-to-end deadline-change test.
- **Remaining / Still Planned / Gaps:** No actual new-deadline calculation or completion mutation; immediate financial effect incomplete.
- **Source Reference:** [server/src/suggestion/suggestionGenerator.ts:101](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/suggestion/suggestionGenerator.ts#L101>); [server/src/orchestrator/reviewWorkflow.ts:969](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L969>)

#### CAP-112 · A014 — Subscription review
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Verification fallback and confirmation gate to unlock cancellation.
- **Tested & Evidence:** E1 scenario8.
- **Remaining / Still Planned / Gaps:** Test supplies confirmation/terms separately; action completion itself does not verify contract.
- **Source Reference:** [server/src/checker/actionChecker.ts:602](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L602>)

#### CAP-113 · A015 — Cancel unused subscription
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** User-unused/cancellation terms checks, candidate and savings arithmetic.
- **Tested & Evidence:** E1 scenario8/foundation.
- **Remaining / Still Planned / Gaps:** Assumes3 billing charges over90d; weak terms inference; no provider cancellation or complete future PI removal.
- **Source Reference:** [server/src/decision/impactCalculator.ts:311](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L311>); [server/src/orchestrator/reviewWorkflow.ts:539](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/orchestrator/reviewWorkflow.ts#L539>)

#### CAP-114 · A016 — Inspect account charges
- **Stage:** Catalog plus primitives
- **Certainty Score:** 98%
- **Developed & Working Scope:** Verification template, F020 fee arithmetic, metadata for fee schedules.
- **Tested & Evidence:** Catalog/fee numerical tests.
- **Remaining / Still Planned / Gaps:** Verified fee schedule flag not enforced; no tariff inspection workflow.
- **Source Reference:** [server/src/checker/actionChecker.ts:194](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L194>)

#### CAP-115 · A017 — Bill calendar
- **Stage:** Catalog only
- **Certainty Score:** 97%
- **Developed & Working Scope:** Verification template and underlying bill/cashflow data.
- **Tested & Evidence:** Catalog validation; no dedicated action test.
- **Remaining / Still Planned / Gaps:** No dedicated persisted calendar or completion workflow beyond existing bills UI.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>)

#### CAP-116 · A018 — Adjust bill date
- **Stage:** Catalog plus generic financial path
- **Certainty Score:** 99%
- **Developed & Working Scope:** Financial catalog entry and generic validation.
- **Tested & Evidence:** Source review; no targeted impact test.
- **Remaining / Still Planned / Gaps:** No shifted-date simulation, new due-date persistence or provider contact; effect generally zero.
- **Source Reference:** [server/src/decision/impactCalculator.ts:179](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L179>)

#### CAP-117 · A019 — Irregular-income planning
- **Stage:** Partial
- **Certainty Score:** 98%
- **Developed & Working Scope:** Generic financial path and reserve arithmetic; irregular receipts excluded from confirmed projection.
- **Tested & Evidence:** Source review.
- **Remaining / Still Planned / Gaps:** No complete irregular-income plan generator, action-specific checker or execution workflow.
- **Source Reference:** [shared/calculator/index.ts:233](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/shared/calculator/index.ts#L233>); [server/src/decision/impactCalculator.ts:179](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/impactCalculator.ts#L179>)

#### CAP-118 · A020 — Identify upcoming shortfall
- **Stage:** Implemented prototype
- **Certainty Score:** 99%
- **Developed & Working Scope:** Independent diagnostic critical action; below direct mitigation; no fake R/F/G score.
- **Tested & Evidence:** E1 scenarios1/6/9.
- **Remaining / Still Planned / Gaps:** Diagnostic does not fix deficit; discovery can coexist even when A011 closes it.
- **Source Reference:** [server/src/checker/actionChecker.ts:47](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L47>)

#### CAP-119 · A021 — Explain APR
- **Stage:** Educational catalog support
- **Certainty Score:** 98%
- **Developed & Working Scope:** Assistant knowledge mapping; excluded from primary Today; APR primitives available.
- **Tested & Evidence:** E1 education Today gate test.
- **Remaining / Still Planned / Gaps:** No dedicated validated curriculum or live educational response test.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>)

#### CAP-120 · A022 — Diversification and risk education
- **Stage:** Educational catalog support
- **Certainty Score:** 98%
- **Developed & Working Scope:** Assistant educational mapping; excluded from Today.
- **Tested & Evidence:** E1 education gate/catalog tests.
- **Remaining / Still Planned / Gaps:** No portfolio model or dedicated educational validation; investment transactions outside implemented scope.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>)

#### CAP-121 · A023 — Investment fee education
- **Stage:** Educational catalog support
- **Certainty Score:** 98%
- **Developed & Working Scope:** Educational mapping/Today gate; fee helper available.
- **Tested & Evidence:** E1 gate/catalog and F020 arithmetic.
- **Remaining / Still Planned / Gaps:** No disclosure parser or dedicated investment fee analysis workflow.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>)

#### CAP-122 · A024 — BNPL installments
- **Stage:** Partial
- **Certainty Score:** 99%
- **Developed & Working Scope:** Verification catalog plus UK/GB country/override gate.
- **Tested & Evidence:** Source reviewed; no dedicated BNPL E2E.
- **Remaining / Still Planned / Gaps:** No agreement/effective-date regulatory evaluation or complete installment-schedule workflow.
- **Source Reference:** [server/src/checker/actionChecker.ts:310](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/checker/actionChecker.ts#L310>)

#### CAP-123 · A025 — Consolidation questions
- **Stage:** Catalog only
- **Certainty Score:** 97%
- **Developed & Working Scope:** Verification/Assistant mapping.
- **Tested & Evidence:** Catalog validation; no targeted comparison test.
- **Remaining / Still Planned / Gaps:** No consolidation quote/cost comparison or validated action-specific journey.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>)

#### CAP-124 · A026 — Deferred-interest expiry
- **Stage:** Catalog plus context flag
- **Certainty Score:** 98%
- **Developed & Working Scope:** Verification/Assistant mapping; promo date can influence debt weight.
- **Tested & Evidence:** Source reviewed; no dedicated expiry workflow test.
- **Remaining / Still Planned / Gaps:** No deferred-interest retroactive-charge model or complete expiry safety gate.
- **Source Reference:** [server/src/catalog/asCatalogRepository.ts:37](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/catalog/asCatalogRepository.ts#L37>); [server/src/decision/weightCalculator.ts:157](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/decision/weightCalculator.ts#L157>)

### HTTP endpoint inventory

#### CAP-125 · GET /api/health
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Public diagnostics, policy/runtime and model states.
- **Tested & Evidence:** Source; actual app instantiated by E2.
- **Remaining / Still Planned / Gaps:** No external dependency readiness probe.
- **Source Reference:** [server/src/routes/api.ts:64](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L64>)

#### CAP-126 · GET /api/catalog
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Public canonical/policy/catalog data.
- **Tested & Evidence:** Source; real catalog tests E1.
- **Remaining / Still Planned / Gaps:** No approval workflow; no dedicated HTTP endpoint assertion.
- **Source Reference:** [server/src/routes/api.ts:81](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L81>)

#### CAP-127 · GET /api/pi/:userId
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Read latest PI envelope.
- **Tested & Evidence:** E5 actual HTTP reads.
- **Remaining / Still Planned / Gaps:** Identity spoofable; full response includes sensitive PI.
- **Source Reference:** [server/src/routes/api.ts:123](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L123>)

#### CAP-128 · PUT /api/pi/:userId
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Save PI and execute review.
- **Tested & Evidence:** E2 actual HTTP workflow.
- **Remaining / Still Planned / Gaps:** Comprehensive request schema and authoritative browser reconciliation incomplete.
- **Source Reference:** [server/src/routes/api.ts:155](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L155>)

#### CAP-129 · POST /api/review/:userId
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Manual review/review-with-update trigger.
- **Tested & Evidence:** Source; orchestrator direct tests E1.
- **Remaining / Still Planned / Gaps:** No dedicated real HTTP test found; not a scheduler.
- **Source Reference:** [server/src/routes/api.ts:202](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L202>)

#### CAP-130 · GET /api/today/:userId
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Current PI plus stored recommendation/decision/trace.
- **Tested & Evidence:** E2 happy path; E5 stale version reproduction.
- **Remaining / Still Planned / Gaps:** Freshness defect after completion; must compare PI and trace versions.
- **Source Reference:** [server/src/routes/api.ts:238](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L238>)

#### CAP-131 · POST /api/feedback/:userId
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Accept, Adjust, Decline, Complete.
- **Tested & Evidence:** E2 actual HTTP plus E5 repeated Complete.
- **Remaining / Still Planned / Gaps:** State machine, idempotency, stale identity and Complete override safeguards incomplete.
- **Source Reference:** [server/src/routes/api.ts:286](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L286>)

#### CAP-132 · GET /api/decisions/:userId/:evaluationId/trace
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Stored decision trace lookup.
- **Tested & Evidence:** E2 actual HTTP trace assertion.
- **Remaining / Still Planned / Gaps:** Spoofable auth; historical trace is not current-state freshness proof.
- **Source Reference:** [server/src/routes/api.ts:351](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L351>)

#### CAP-133 · POST /api/assistant/:userId/chat
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Snapshot-based reply and saved user/assistant messages.
- **Tested & Evidence:** Source; E1 direct mock Assistant, no dedicated HTTP test.
- **Remaining / Still Planned / Gaps:** No live Assistant/conversation-history grounding proof.
- **Source Reference:** [server/src/routes/api.ts:386](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L386>)

#### CAP-134 · GET /api/fx/rates
- **Stage:** Implemented endpoint with limitations
- **Certainty Score:** 99%
- **Developed & Working Scope:** Latest or historical currency rates.
- **Tested & Evidence:** Source; E1 direct service with fake fetch.
- **Remaining / Still Planned / Gaps:** No dedicated live HTTP route test; caching/freshness limitations apply.
- **Source Reference:** [server/src/routes/api.ts:475](<file:///c:/Users/sanat/OneDrive/Desktop/vela1/server/src/routes/api.ts#L475>)

---

## 6. Comprehensive Test Suite Inventory & Proof Matrix

The test suite currently contains **10 test files and 143 passed tests**. Here is what each test suite proves:

1. **`tests/local-access.test.ts` (12 tests):**
   - *Proves:* Local IPv4 loopback binding; rejection of nonlocal Host headers and DNS rebinding; exact CORS handling; cross-site subresource blocking.
   - *Does NOT prove:* Multi-user identity security or defense against malicious software running locally.
2. **`tests/e2e/feedback-regressions.test.ts` (12 tests):**
   - *Proves:* Idempotent Complete; rejection of unvalidated amount overrides; atomic PI mutation with rollback on failure; Today version freshness.
   - *Does NOT prove:* Real browser DOM user interaction or multi-turn UI navigation.
3. **`tests/e2e/finagent-14-scenarios.test.ts` (14 tests):**
   - *Proves:* All 14 mandatory synthetic domain scenarios (shortfall, hardship, missing terms, hysteresis, transfer pause, verification unlock, stale FX).
   - *Does NOT prove:* Real bank statement parsing or live network availability.
4. **`tests/e2e/http-workflow-and-security.test.ts` (3 tests):**
   - *Proves:* HTTP identity-header enforcement; full PUT PI $\rightarrow$ Today $\rightarrow$ trace $\rightarrow$ feedback $\rightarrow$ SQLite reopen workflow; PII minimization.
   - *Does NOT prove:* Client-side browser rendering or session cookie auth.
5. **`tests/e2e/live-ai-integration.test.ts` (1 test):**
   - *Proves:* Live Gemini API calls for BehaviorAgent, SuggestionGenerator, and batch AIEvaluationService; confirms financial impacts remain invariant.
   - *Does NOT prove:* High-concurrency rate limit recovery or OpenAI adapter fallback.
6. **`tests/phase1-foundation.test.ts` (18 tests):**
   - *Proves:* Zod contracts, canonical AS catalog preservation, formulas F001-F015/F019/F020, action checker affordability and safety gates.
   - *Does NOT prove:* Orchestrator multi-step workflow.
7. **`tests/web-feedback-regressions.test.ts` (13 tests):**
   - *Proves:* Web context feedback reconciliation; duplicate submit locking; honest fallback provenance without invented scores.
   - *Does NOT prove:* Native mobile device rendering.
8. **`tests/statement-parser.test.ts` (38 tests):**
   - *Proves:* European and US decimal and grouping parsing; strict date boundaries; leap year handling; intra-file and database dedup; unclosed quote withholding.
   - *Does NOT prove:* OCR or PDF receipt parsing.
9. **`tests/clock-regressions.test.ts` (6 tests):**
   - *Proves:* Dynamic reference date injection; rejection of future-dated balances; stale statement threshold configuration.
   - *Does NOT prove:* Automated daily cron job triggering.
10. **`tests/ai-reliability.test.ts` (26 tests):**
    - *Proves:* LLM JSON parsing resilience; factor score clamping; fallback handling when AI produces invalid schema or malformed text.
    - *Does NOT prove:* Subjective financial advice quality across human experts.

---

## 7. Recommended Completion Sequence for MVP

1. **Action Checker Hardening:**
   - Add generic `required_pi_inputs` validator across all catalog actions.
   - Implement executable code gates for remaining safety rules ($R002, R003, R006, R007, R010$).
   - Refine critical ranking comparator to suppress $A020$ when $A011$ resolves the shortfall.
2. **Decision Engine 90-Day Simulation:**
   - Replace action-specific heuristics with simulated 90-day cash trajectories ($x_H^0$ vs $x_H^a$).
   - Enforce conservative retention when `instabilityReason === 'UNSTABLE_ASSUMPTIONS'`.
   - Add close-decision tie-breaker ($\Delta S < 0.03$).
3. **Feedback Loop Completion:**
   - Implement cash reservation for `Accepted` actions to avoid double-allocation.
   - Add specific PI table mutations for transfer pause ($A011$) and subscription cancel ($A015$).
   - Wire `declinedActionCooldownDays` (14 days) into candidate generation.
4. **Web UI Final Smoke & Calibration:**
   - Verify browser TodayView against all 14 scenarios.
   - Ensure all monetary amounts and currency conversions render accurately.