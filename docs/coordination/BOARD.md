# Expo branch coordination

Previous task ownership and historical board are preserved in the external cleanup recovery snapshot. Current structure is documented in docs/EXPO-CLEANUP.md. Shared contracts remain coordinator-owned. Preserve canonical financial data and explicit user choices.

| ID | Task | Owner | Status | Files | Dependencies |
|---|---|---|---|---|---|
| EXPO-ONLY | Expo-focused cleanup and shared extraction | coordinator | DONE | expo-mobile-app/**; shared/**; server/**; docs/**; .agents/skills/**; README.md; AGENTS.md; .gitignore | Approved cleanup plan |

| UNUSED-CLEANUP | Remove confirmed dead code and guard unused declarations | coordinator | DONE | expo-mobile-app/**; shared/**; server/**; docs/progress.md; docs/coordination/** | Approved cleanup plan |
