# Доска координации задач FinAgent MVP (`BOARD.md`)

| ID | Фаза / Задача | Владелец | Статус | Файлы (строгое владение) | Зависимости |
|---|---|---|---|---|---|
| `T-00` | Инфраструктура, скилы, `prototype-policy.json`, распаковка `AS` | `coordinator` | `DONE` | `AGENTS.md`, `.agents/skills/**`, `server/config/prototype-policy.json`, `server/data/as/**` | — |
| `T-01` | Общие контракты (`shared/contracts/`) и типы `PI` | `coordinator` | `DONE` | `shared/contracts/index.ts`, `shared/pi/types.ts` | `T-00` |
| `T-02` | `SharedFinancialCalculator` (`F001–F015, F019, F020`) | `coordinator` | `DONE` | `shared/calculator/index.ts` | `T-01` |
| `T-03` | Загрузчик `AS + Action Catalog` (`A001–A026`) и `Checker + Critical Coverage` | `coordinator` | `DONE` | `server/src/config/policyLoader.ts`, `server/src/catalog/asCatalogRepository.ts`, `server/src/checker/actionChecker.ts` | `T-01, T-02` |
| `T-04` | `Decision Engine` (`5A–5E`: Priority, Weights + Hysteresis, Impact 90d, Complexity `T/S/D/O`, Scoring `F017`, Robustness `F018`) | `subagent-decision` | `DONE` | `server/src/decision/**`, `docs/coordination/handoffs/T-04.md` | `T-01..T-03` |
| `T-05` | `LLM Client` (Gemini 3.1/3.5 Flash Lite + OpenAI), `Behavior Agent`, `Debt Agent`, `Suggestion Generator`, `AI Evaluation Call`, `Assistant Agent` | `subagent-ai` | `DONE` | `server/src/ai/**`, `server/src/analyzer/**`, `server/src/suggestion/**`, `docs/coordination/handoffs/T-05.md` | `T-01..T-03` |
| `T-06` | `SQLite DB`, `Security / Auth / Encryption / PI Minimization`, `Frankfurter FX Service`, `Orchestrator` и HTTP Routes | `subagent-backend` | `DONE` | `server/src/security/**`, `server/src/fx/**`, `server/src/db/**`, `server/src/orchestrator/**`, `server/src/routes/**`, `server/src/index.ts`, `docs/coordination/handoffs/T-06.md` | `T-01..T-05` |
| `T-07A` | Unit-тесты Фазы 1 (`F001–F020`, `AS`, `Checker`) и подготовка тест-сьюта 14 обязательных E2E-сценариев | `subagent-qa` | `DONE` | `server/tests/phase1-foundation.test.ts`, `server/tests/helpers/**`, `docs/coordination/handoffs/T-07A.md` | `T-01..T-03` |
| `T-07B` | Интеграционное ревью, запуск 14 E2E-сценариев и подключение Web UI (`react-app/`) | `coordinator` | `DONE` | `server/tests/e2e/**`, `react-app/src/**`, `docs/coordination/synthetic-report.md` | `T-04..T-07A` |
| `T-08` | Current development state inventory and evidence review (documentation only) | `coordinator` | `DONE` | `docs/coordination/BOARD.md`, `docs/coordination/current-development-state.md`, `docs/coordination/current-development-state.json`, `docs/coordination/handoffs/T-08.md`, `docs/coordination/evidence/T-08/**` | `T-00..T-07B` |
| `T-08A` | Read-only inventory: financial calculations, catalog, checker, decision engine | `review-financial` | `DONE` | Read only; findings returned to coordinator | `T-08` |
| `T-08B` | Read-only inventory: web/mobile features, local storage, imports, UI/backend wiring | `review-ui` | `DONE` | Read only; findings returned to coordinator | `T-08` |
| `T-08C` | Read-only inventory: backend, security, AI, persistence, orchestration, HTTP | `review-backend` | `DONE` | Read only; findings returned to coordinator | `T-08` |
| `T-09` | Remediation batch1: local access, coordination, integration and evidence | `coordinator` | `DONE` | `docs/coordination/BOARD.md`, `docs/coordination/DECISIONS.md`, `docs/coordination/QUESTIONS.md`, `docs/coordination/synthetic-report.md`, `docs/coordination/handoffs/T-09.md`, `docs/coordination/evidence/T-09/**`, `server/src/security/localAccess.ts`, `server/src/index.ts`, `server/tests/local-access.test.ts` | `T-08` |
| `T-09A` | Feedback state/freshness/idempotency and current Today | `review-backend` | `DONE` | `server/src/orchestrator/reviewWorkflow.ts`, `server/src/routes/api.ts`, `server/src/db/sqliteStore.ts`, `server/tests/e2e/http-workflow-and-security.test.ts`, `server/tests/e2e/finagent-14-scenarios.test.ts`, `server/tests/e2e/feedback-regressions.test.ts`, `docs/coordination/handoffs/T-09A.md` | `T-09` |
| `T-09B` | Reconcile browser feedback with backend and remove misleading fallback metadata | `review-ui` | `DONE` | `react-app/src/context/PIContext.tsx`, `react-app/src/api/client.ts`, `react-app/src/components/dashboard/TodayView.tsx`, `react-app/src/services/recommendationService.ts`, `react-app/src/services/assistantService.ts`, `server/tests/web-feedback-regressions.test.ts`, `docs/coordination/handoffs/T-09B.md` | `T-09` |
| `T-09C` | CSV locale/date/in-file duplicate correctness | `review-financial` | `DONE` | `react-app/src/services/statementParser.ts`, `server/tests/statement-parser.test.ts`, `docs/coordination/handoffs/T-09C.md` | `T-09` |
| `T-10` | Financial model completion: 90d counterfactuals, full catalog safety/input gates, F018 publication, policy centralization and clock | `coordinator` | `IN_PROGRESS` | Coordinator: `shared/contracts/index.ts`, `shared/pi/types.ts`, `server/src/orchestrator/reviewWorkflow.ts`, `react-app/src/services/snapshotBuilder.ts`, `server/tests/e2e/finagent-14-scenarios.test.ts`, `server/tests/clock-regressions.test.ts`, `docs/coordination/**` except active subagent handoffs; `server/src/index.ts`, `.gitignore` | `T-09` |
| `T-10A` | Documented financial safeguards, horizon effects and F018 publication | `review-financial` | `IN_PROGRESS` | `shared/calculator/index.ts`, `server/src/decision/**`, `server/src/checker/actionChecker.ts`, `server/src/catalog/asCatalogRepository.ts`, `server/config/prototype-policy.json`, `server/tests/financial-policy-regressions.test.ts`, `server/tests/phase1-foundation.test.ts`, `docs/coordination/handoffs/T-10A.md` | `T-10` |
| `T-11` | Deferred AI provider availability/retries/diagnostics; user prioritizes core logic first | `unassigned` | `TODO` | Assign ownership when resumed; no discovery/timeout/provider changes in core batch | `T-10` |
| `T-11A` | Core decision AI inputs: strict T/S/D/O uncertainty and fact-based candidates | `review-ui` | `IN_PROGRESS` | `server/src/ai/evaluationCall.ts`, `server/src/suggestion/suggestionGenerator.ts`, `server/tests/ai-core-regressions.test.ts`, `docs/coordination/handoffs/T-11A.md` | `T-10A` |
| `T-12` | Deferred Windows-protected keys/encrypted SQLite; user prioritizes core logic first | `unassigned` | `TODO` | Assign ownership when resumed; no privacy implementation started; D-012 retained | `T-10`, `D-012` |
| `T-13` | Expanded browser acceptance, import-review UI, calibration and release checks | `unassigned` | `TODO` | Assign exact ownership before start; web acceptance and synthetic evidence | `T-09..T-12` |
| `T-14` | Deferred SDK58 native implementation and device verification (D-010) | `unassigned` | `TODO` | `expo-mobile-app/**`; define exact scope before start | `T-13` |
| `T-15` | Real accounts/authentication (deferred under D-011) | `unassigned` | `TODO` | Identity provider/session decision required before ownership/implementation | User decision after local prototype |
| `T-16` | Future Supabase storage migration (D-001) | `unassigned` | `TODO` | Define migration/hosting scope before ownership/implementation | Separate future phase |

## Core MVP fixes — 2026-11-04 (supersedes T-10/T-10A/T-11A ownership for this batch)
| ID | Task | Owner | Status | Files | Dependencies |
|---|---|---|---|---|---|
| FIX-1 | Checker and integration | coordinator | DONE | server/src/checker/actionChecker.ts; shared/contracts/index.ts; shared/pi/types.ts; server/tests/checker-core-regressions.test.ts; server/tests/phase1-foundation.test.ts; server/tests/e2e/finagent-14-scenarios.test.ts; docs/coordination/** except other FIX handoffs | — |
| FIX-2-3 | Counterfactual calculator and decision publication | financial | DONE | shared/calculator/index.ts; server/src/decision/**; server/config/prototype-policy.json; server/tests/financial-core-regressions.test.ts; docs/coordination/handoffs/FIX-2-3.md | FIX-1 contracts |
| FIX-4 | Safe feedback and commitments | feedback | DONE | server/src/orchestrator/reviewWorkflow.ts; server/src/db/sqliteStore.ts; server/src/suggestion/suggestionGenerator.ts; server/tests/e2e/feedback-core-regressions.test.ts; docs/coordination/handoffs/FIX-4.md | FIX-2 calculator |
| FIX-5 | Server-authoritative browser | web | DONE | react-app/src/context/PIContext.tsx; react-app/src/api/client.ts; react-app/src/components/dashboard/TodayView.tsx; react-app/src/services/recommendationService.ts; server/tests/web-core-regressions.test.ts; docs/coordination/handoffs/FIX-5.md | FIX-4 |

Integration ownership extension: coordinator owns `server/tests/e2e/http-workflow-and-security.test.ts` (verified debt-term fixture), feedback owns `server/tests/e2e/feedback-regressions.test.ts` (earlier safe rejection regression). Shared contracts remain coordinator-owned.

| CLEANUP-1 | Archive superseded standalone prototype/design inputs and exclude generated clutter | coordinator | DONE | .gitignore; README.md; archive/**; root index.html/assets/public/build_html.py/build_full_app.py/generate_app.py/svgs.json/design_reference.png/thumbnail.png/Apply Soft Glass Navigation.make/ИНСТРУКЦИЯ.md (move only); docs/coordination/BOARD.md; docs/coordination/handoffs/CLEANUP-1.md; docs/coordination/evidence/cleanup/** | FIX-1..FIX-5 |
| CLEANUP-2 | Delete reproducible build/cache directories | coordinator | BLOCKED | react-app/dist; react-app/node_modules/.vite*; server/node_modules/.vite* | Automatic safety review rejected recursive deletion; no detailed reason supplied; no deletion retried |

| SDK58-1 | Upgrade and launch existing mobile prototype on SDK58 (user requested now) | coordinator | DONE | expo-mobile-app/**; README.md; docs/coordination/BOARD.md; docs/coordination/handoffs/SDK58-1.md; docs/coordination/evidence/SDK58-1/** | D-010; user overrides deferred scheduling |

| UI-ZERO-1 | Full manual UI guide and synthetic new-user fixtures, parser verification and E2E evidence | coordinator | DONE | user-inputs/synthetic/ui-zero/**; docs/testing/UI-ZERO-GUIDE-RU.md; server/tests/ui-zero-fixtures.test.ts; docs/coordination/BOARD.md; docs/coordination/synthetic-report.md; docs/coordination/handoffs/UI-ZERO-1.md; docs/coordination/evidence/UI-ZERO-1/**; docs/coordination/evidence/core-mvp/scenarios.json | SDK58-1; D-010, D-011 |
| SDK58-PHONE | Start native onboarding by default and run Expo LAN for phone access | coordinator | DONE | expo-mobile-app/App.tsx; expo-mobile-app/package.json; expo-mobile-app/package-lock.json; docs/coordination/BOARD.md; docs/coordination/handoffs/SDK58-PHONE.md | SDK58-1; user request |



## Full beta implementation — 2026-11-05
Existing task ownership is superseded only for files explicitly assigned below. Coordinator owns shared contracts, route integration, manifests and BOARD updates. Subagents write only their modules/tests/handoffs.

| ID | Task | Owner | Status | Files | Dependencies |
|---|---|---|---|---|---|
| B01 | Contracts and integration coordination | coordinator | IN_PROGRESS | shared/contracts/beta.ts; server/src/beta/app.ts; server/src/beta/index.ts; server/package.json; server/package-lock.json; expo-mobile-app/package.json; expo-mobile-app/package-lock.json; docs/coordination/**; README.md | — |
| B02 | Accounts, sessions, reset links | backend-auth | IN_PROGRESS | server/src/beta/auth.ts; server/tests/beta-auth.test.ts; docs/coordination/handoffs/B02.md | B01 |
| B03 | Encrypted beta persistence, DPAPI, backup | storage | IN_PROGRESS | server/src/beta/store.ts; server/tests/beta-store.test.ts; docs/coordination/handoffs/B03.md | B01 |
| B04 | Authoritative financial state/versioning | coordinator | TODO | server/src/beta/financial.ts; server/tests/beta-financial.test.ts | B03 |
| B05 | Persistent jobs | coordinator | TODO | server/src/beta/jobs.ts; server/tests/beta-jobs.test.ts | B03 |
| B06 | Mobile auth/sync foundation | mobile | IN_PROGRESS | expo-mobile-app/App.tsx; expo-mobile-app/src/**; docs/coordination/handoffs/B06.md | B01 |
| B07 | CSV preview/confirm/reconciliation | coordinator | TODO | server/src/beta/imports.ts; server/tests/beta-imports.test.ts | B04,B05 |
| B08 | Agent and assistant integration | coordinator | TODO | server/src/beta/analysis.ts; server/tests/beta-analysis.test.ts | B04,B05 |
| B09 | End-to-end mobile integration | coordinator | TODO | server/tests/beta-http.test.ts; docs/coordination/evidence/beta/** | B06,B07,B08 |
| B10 | Full onboarding | mobile | TODO | expo-mobile-app/src/**; docs/coordination/handoffs/B10.md | B06 |
| B11 | Excel/text PDF import | coordinator | TODO | server/src/beta/imports.ts; server/tests/beta-imports.test.ts | B07 |
| B12 | Today, plan, chat | mobile | TODO | expo-mobile-app/src/**; docs/coordination/handoffs/B12.md | B06 |
| B13 | Privacy and real-data release gates | coordinator | TODO | server/src/beta/privacy.ts; server/tests/beta-privacy.test.ts | B01 |
| B14 | Friends launch | coordinator | TODO | server/src/beta/index.ts; README.md | B02,B03,B13 |
| B15 | Integration acceptance | coordinator | TODO | server/tests/beta-http.test.ts; docs/testing/**; docs/coordination/evidence/beta/** | B09..B14 |

Ownership extension 2026-11-05: storage owns server/tests/beta-jobs.test.ts; backend-auth owns server/src/beta/imports.ts and server/tests/beta-imports.test.ts after B02 handoff; coordinator retains integration/routes/contracts.
Ownership extension: storage owns server/tests/beta-financial.test.ts, server/tests/beta-http.test.ts and handoffs/B15-foundation.md for independent integration checks.
Integration phase ownership: coordinator may fix all completed beta modules/tests; active agents retain analysis/imports, mobile UI, and integration tests until handoff.

## Beta integration checkpoint — 2026-11-05
B01 contracts and task assignment recorded. B02 auth code complete; actual SMTP remains unconfigured. B03 encrypted storage verified including DPAPI/backup. B04 financial validation and B05 durable queue implemented/tested. B06/B10/B12 mobile implementation and all-platform bundles pass, physical acceptance outstanding. B07/B11 parsers implemented; general PDF tables may require explicit corrected CSV. B08 agents integrated, chat constrained to deterministic factual output for real-data policy gate. B09/B15 HTTP acceptance tested, full physical Android/iPhone walkthrough NOT complete. B13 active-data deletion checks implemented; backup scheduling/parser process isolation/security hardening remain. B14 HTTPS API tunnel verified; Expo link verification in progress. Do not mark entire beta DONE.
Outstanding: SMTP sender, physical-device acceptance, scheduled backup/retention, parser isolation/resource controls, actual financial policy approval. No production readiness claim.

## Seven-block restoration and Soft Glass — supersedes beta ownership for assigned files
| ID | Task | Owner | Status | Files | Dependencies |
|---|---|---|---|---|---|
| C01 | Integration contracts/experimental mode | coordinator | DONE | shared/contracts/beta.ts; docs/coordination/**; server/src/beta/app.ts; server/src/beta/financial.ts; server/src/beta/jobs.ts; server/src/beta/privacy.ts | — |
| C02 | Persistent encrypted orchestrator repository | persistence | DONE | server/src/beta/engineRepository.ts; server/tests/beta-engine-repository.test.ts; server/src/orchestrator/reviewWorkflow.ts (store interface only); docs/coordination/handoffs/C02.md | C01 |
| C03-C06 | Persistent analysis, feedback, context and freshness | engine | DONE | server/src/beta/analysis.ts; server/tests/beta-analysis.test.ts; docs/coordination/handoffs/C03-C06.md | C02 |
| U01-U04 | Reference Soft Glass native UI and forms | mobile-ui | IN_PROGRESS | expo-mobile-app/App.tsx; expo-mobile-app/src/**; docs/coordination/handoffs/U01-U04.md | C01 |
| C-INTEGRATION | HTTP lifecycle and regression acceptance | coordinator | IN_PROGRESS | server/tests/beta-http.test.ts; server/tests/beta-cycle.test.ts; docs/testing/**; server/package.json; expo-mobile-app/package.json; expo-mobile-app/package-lock.json | C02-C06,U01-U04 |
C03 integration ownership extension: coordinator owns server/src/beta/reviewScheduler.ts and tests/beta-review-scheduler.test.ts.
C-INTEGRATION and U01-U04: automated and browser checks recorded in handoff. Physical Android and iPhone acceptance remains open.
| U05 | Native onboarding, currency/date selectors, statement and assistant fixes | coordinator | IN_PROGRESS | expo-mobile-app/src/**; expo-mobile-app/app.json; server/src/beta/analysis.ts; server/tests/beta-analysis.test.ts; docs/coordination/handoffs/U05.md; docs/coordination/BOARD.md | U01-U04 |
