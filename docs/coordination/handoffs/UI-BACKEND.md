# Expo UI/backend integration

Status: DONE for source integration and automated acceptance. Physical-device acceptance remains open.

## Modified/Created Files

Prepared `C:/Users/sanat/OneDrive/Desktop/vela-ui-integration` on `integrate/new-ui-backend`, based on `origin/new-ui` commit `6a62325afc986e186b3e8503196f79bea7eb6835`. The source checkout at `vela1` remains untouched. Integration changes are present in this worktree; no commit or push was performed.

- `expo-mobile-app/src/screens/TodayScreen.tsx`: retain Compass design, add current NEEDS_DATA question/account route and source-backed advice links.
- `shared/pi/types.ts`, `shared/processing/**`, `shared/contracts/**`, `shared/calculator/index.ts`: integrate completed backend changes into the extracted shared structure.
- `server/src/{ai,analyzer,suggestion,checker,decision,fx,orchestrator,beta}/**`: integrate the completed seven-stage pipeline, persistent artifacts, memory, financial checks and feedback with the UI branch's findings, action-history and reliable-import APIs.
- `server/src/orchestrator/reviewWorkflow.ts`: require the injected repository, retain beta-only runtime structure, and preserve completed backend behavior.
- `server/src/beta/app.ts`: one idempotent clear-chat route now clears dependent memory and preserves owner isolation; export includes both pipeline artifacts and UI findings/history.
- `server/src/beta/imports.ts`: retain normalized imports, repeated-row handling and source provenance including per-row worksheet names.
- `server/tests/**`: current backend regressions with extracted test harness paths; added HTTP memory-deletion/retry assertions to `mobile-parity-api.test.ts`.
- `README.md`, `AGENTS.md`, `docs/**`, `.cursor/**`, synthetic fixtures: current conventions, decisions and verification evidence. Historical backend captures were copied locally without rewriting their content.

## Requirements and Decisions Used

D-014, D-016, D-018, D-021, D-022 and D-023 apply. Backend chat `01a1b622-5d83-7a43-bf77-8e84eb0008fd` was observed completed before source integration began. Preserve the completed new-ui design; deliver Expo Android and iOS only. The retired separate React web application was not restored.

Original user scope: “делай чисто expo web par we dont need”. English translation: “Use Expo only; we do not need the web part.”

No new financial formula, threshold, catalog action, source or canonical approval was introduced. Canonical JSON matches the source checkout exactly after normalizing line endings; parsed values are identical. See `../evidence/UI-BACKEND/canonical-integrity.json`.

## Exact Verification Commands and Real Output

From `expo-mobile-app`:

`npm ci --no-audit --no-fund` — exit 0, `added 539 packages in 2m`.

`npm run typecheck` — exit 0, `tsc --noEmit`. Raw output: `../evidence/UI-BACKEND/mobile-typecheck.txt`.

PowerShell: `$env:CI='1'; $env:EXPO_NO_TELEMETRY='1'; npx expo export --platform android --platform ios` — exit 0.

```text
iOS Bundled 13177ms node_modules\expo\AppEntry.js (821 modules)
Android Bundled 23680ms node_modules\expo\AppEntry.js (828 modules)
Exported: dist
```

Raw output: `../evidence/UI-BACKEND/native-export.txt`. An all-platform UI-only export also passed before integration; web is not a delivery target.

From `server`:

`npm ci --no-audit --no-fund` — exit 0, `added 171 packages in 27s`.

`npm run typecheck` — exit 0, `tsc --noEmit`. Raw output: `../evidence/UI-BACKEND/server-typecheck.txt`.

`npm test` — exit 0.

```text
Test Files  35 passed (35)
Tests       331 passed | 2 skipped (333)
Start at    22:33:08
Duration    33.12s
```

Includes all 14 mandatory E2E scenarios, current financial/feedback/pipeline regressions and UI-branch findings/action-history/import/HTTP tests. Raw output: `../evidence/UI-BACKEND/tests.txt`. Two platform-conditional storage tests are skipped by the existing suite.

After preserving per-row worksheet provenance: `npm exec --offline -- vitest run tests/beta-imports.test.ts tests/reliable-imports.test.ts tests/pipeline-v2.test.ts` — exit 0, 3 files and 34 tests passed. Raw output: `../evidence/UI-BACKEND/import-verification.txt`.

`npm exec --offline -- tsx src/scripts/inspect-review.ts` — exit 0, isolated in-memory synthetic Nora profile, deterministic mock provider mode. Returned NEEDS_DATA with a current-balance clarification and accounts route; monetary amounts and score remain null. Raw output: `../evidence/UI-BACKEND/synthetic-profile.txt`. This is not a new live-provider benchmark. Previously completed Debt/Strong/Nora live and paired captures remain unchanged in the copied historical evidence.

From worktree root: `git diff --check` — exit 0; line-ending advisories only. No `react-app` references remain in runtime/shared/Expo source.

## Discovered Limitations and Operational Boundaries

- Original encrypted database, encryption keys, provider credentials and local tunnel configuration stay in the source checkout. This isolated worktree does not automatically use those data/config files. Configure its ignored local settings before running against a real account; no credentials are bundled into Expo.
- API integration was exercised by local authenticated HTTP tests with synthetic data. No physical Android/iPhone interaction, actual phone-to-tunnel connection, or production deployment was performed.
- Existing Primary usefulness/provider reliability and execution-mapping limits documented in TODAY-QUALITY remain. Integration does not establish production policy approval.
- The canonical AS records and preliminary numerical policy values retain their existing authority/statuses.
