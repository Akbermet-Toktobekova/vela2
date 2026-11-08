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
