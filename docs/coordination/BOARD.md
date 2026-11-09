# Expo branch coordination

Previous task ownership and historical board are preserved in the external cleanup recovery snapshot. Current structure is documented in docs/EXPO-CLEANUP.md. Shared contracts remain coordinator-owned. Preserve canonical financial data and explicit user choices.

| ID | Task | Owner | Status | Files | Dependencies |
|---|---|---|---|---|---|
| EXPO-ONLY | Expo-focused cleanup and shared extraction | coordinator | DONE | expo-mobile-app/**; shared/**; server/**; docs/**; .agents/skills/**; README.md; AGENTS.md; .gitignore | Approved cleanup plan |

| UNUSED-CLEANUP | Remove confirmed dead code and guard unused declarations | coordinator | DONE | expo-mobile-app/**; shared/**; server/**; docs/progress.md; docs/coordination/** | Approved cleanup plan |

## UI/backend integration - 2026-11-08

| ID | Task | Owner | Status | Files | Dependencies |
|---|---|---|---|---|---|
| UI-BACKEND | Preserve new-ui design and connect completed backend | coordinator-ui-integration | DONE | expo-mobile-app/**; shared/**; server/**; docs/**; README.md; AGENTS.md; .gitignore; .cursor/**; user-inputs/synthetic/backend-review/** (integration only) | origin/new-ui 6a62325; completed backend chat 01a1b622-5d83-7a43-bf77-8e84eb0008fd |

Prepared in the isolated vela-ui-integration worktree on integrate/new-ui-backend. Backend completion was observed before source integration. Expo Android/iOS only under D-023. Original checkout is preserved; final acceptance is recorded in the integration handoff.

| UI-AUTO-CONNECT | Remove manual API connection controls and configure the running Expo app | coordinator-ui-integration | DONE | expo-mobile-app/src/BetaApp.tsx; expo-mobile-app/.env.local (ignored); docs/coordination/{BOARD.md,DECISIONS.md,handoffs/UI-AUTO-CONNECT.md,evidence/UI-AUTO-CONNECT/**} | D-023; user request |

| UI-FINALIZE | Verify and commit unified backend and new UI branch | coordinator | DONE | server/**; shared/**; expo-mobile-app/**; docs/**; README.md; AGENTS.md; .gitignore; .cursor/**; user-inputs/synthetic/** | UI-BACKEND; TODAY-QUALITY |

| EXPO-VERIFY | Verify API wiring and launch phone preview | coordinator | DONE | expo-mobile-app/.env.local; docs/coordination/** | UI-FINALIZE |

| STATEMENT-AUTO | Reference UI, background statements, essential details and protected reserve | coordinator | IN_PROGRESS | server/**; shared/**; expo-mobile-app/**; docs/** | D-025; UI-FINALIZE |

| SETTINGS-BUTTON | Refine the header settings button | coordinator | DONE | expo-mobile-app/src/BetaApp.tsx; expo-mobile-app/src/components/SoftGlass.tsx; docs/coordination/BOARD.md; docs/coordination/handoffs/SETTINGS-BUTTON.md | User visual request |

STATEMENT-AUTO follow-up (2026-11-09): main-screen Google Chrome checks completed at 390px and 320px; duplicate debt section, reserve explanation and narrow cushion layout corrected. Automated non-live verification passed (347 tests, 2 platform skips, including 14 mandatory E2E). Live AI acceptance remains open; task stays IN_PROGRESS. See handoffs/STATEMENT-AUTO.md for current evidence and limits.

| STATEMENT-ENRICHMENT | Automatic file details, ordered classification fallback, editable essentials and fixed cushion | coordinator | DONE | server/**; shared/**; expo-mobile-app/**; docs/coordination/** | Approved implementation plan |

| ANALYTICS-FX | Spending category filters, Frankfurter totals and statement benchmark | coordinator | DONE | expo-mobile-app/src/**; shared/contracts/beta.ts; server/src/beta/app.ts; server/src/fx/**; server/src/analyzer/**; server/src/ai/prompts.ts; server/src/orchestrator/reviewWorkflow.ts; server/src/scripts/score-statement-reference.ts; server/tests/**; docs/coordination/** | D-010, D-026, D-027, D-028 |

| STATEMENT-AI-DELIVERY | Publish automatic statement AI categories and verify live imports | coordinator | DONE | server/src/beta/analysis.ts; server/src/orchestrator/reviewWorkflow.ts; server/src/analyzer/transactionClassifier.ts; server/src/scripts/score-statement-reference.ts; server/tests/automatic-statements.test.ts; expo-mobile-app/src/BetaApp.tsx; docs/coordination/** | D-026, D-028 |
