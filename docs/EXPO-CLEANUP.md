# Expo-focused branch cleanup

Branch: ui-parity-update. The Expo UI adapted from the former website is preserved.

## Source mapping

| Former source | Current owner |
|---|---|
| Website PI types and shared type extensions | shared/pi/types.ts |
| Profile state shape and blank-profile creation | shared/profile/seed.ts |
| Snapshot builder, statement parser, reconciliation | shared/processing/ |
| Demo profiles and sample statements | server/tests/fixtures/profile.ts |
| User-provided synthetic acceptance inputs | server/tests/fixtures/synthetic/ |
| Engine storage contracts | server/src/orchestrator/engineTypes.ts |
| Legacy SQLite/HTTP/local-access test adapters | server/tests/helpers/ |
| Production server entry | server/src/beta/index.ts |

The separate website, archived prototypes, duplicate source packages, old inventory reports and stale build screenshots have been moved out of the working tree. Historical decisions and retained handoffs can mention former paths; use this mapping for their current location. Canonical financial data and provenance stay in server/data/as. The user-inputs/secrets directory remains local-only for credential compatibility.

## Recovery

Recovery snapshot: /Users/akbermettoktobekova/Documents/ChatGPT/Vela2-recovery-20261106-141334

`source/` preserves affected tracked/untracked source before cleanup; `removed/` contains retired originals, including website dependencies and source materials. Credentials and live databases were not copied or deleted. Git history was not rewritten; no commit or staging was performed.

Canonical SHA-256 before cleanup: `7ce385e40ea872fd49927458f3a787cccb1e9e1cb02707c80ccdcd6419e8b6b9`.

## Test coverage

Two website-only suites (web-core-regressions and web-feedback-regressions) were retired: 27 tests. Financial, engine, security, beta HTTP, import, findings, progress and history coverage remains. The 14 financial scenarios and engine HTTP acceptance harness remain test-only; existing beta HTTP tests exercise the production API. A wholesale rewrite of the engine test harness is unnecessary for this structural cleanup.

Validation results are recorded in docs/progress.md and docs/coordination/handoffs/EXPO-ONLY.md. Native-device acceptance is separate from exports.
