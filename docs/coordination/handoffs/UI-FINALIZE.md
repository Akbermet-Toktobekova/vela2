# Unified backend and new UI branch

The unified branch is `integrate/new-ui-backend`, based on `origin/new-ui` at `6a62325`. It contains the completed backend from the original `vela1` checkout and the new Expo interface. Original checkout changes remain preserved. D-023 specifies Expo Android/iOS delivery rather than reintegrating the old React web application.

Source comparison confirmed that Primary Generator and prompts are preserved. Differences in calculator and decision files are import cleanup; Checker also removes an unused variable. The orchestrator uses the UI branch's repository interface and shared processing modules rather than importing the old web application. Existing UI-BACKEND and UI-AUTO-CONNECT integrations remain intact. No financial formula or coefficient was changed during finalization.

Verification commands from `server`:

- `npm run typecheck`: passed.
- `npm test`: 330 passed, 1 failed, 2 skipped. The live-provider integration expected `liveCallUsed: true` but received fallback. This is a failed live-provider check, not a fully passing suite.
- `npm exec --offline -- vitest run --exclude tests/e2e/live-ai-integration.test.ts`: 34 files passed; 330 tests passed and 2 platform-conditional tests skipped; includes all 14 mandatory deterministic E2E scenarios.

From `expo-mobile-app`: `npx tsc --noEmit` passed. No physical-device interaction or new live recommendation benchmark is claimed.

Evidence is retained in `docs/coordination/evidence/UI-BACKEND/final-{typecheck,tests,offline-tests,mobile}.txt`. Historical live captures and TODAY-QUALITY remain included. Provider credentials, encrypted user databases and ignored deployment settings are not included. The branch is saved by a local English commit; remote publication is separate.

Runtime source whitespace check passed. The complete historical evidence check reports preserved trailing spaces and terminal-log blank lines; those original captures were not rewritten.
