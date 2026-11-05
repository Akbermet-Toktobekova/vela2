# UI-ZERO-1 — deliverables

Created docs/testing/UI-ZERO-GUIDE-RU.md, user-inputs/synthetic/ui-zero/profile.json, README.md, five import/negative fixtures; server/tests/ui-zero-fixtures.test.ts; evidence/UI-ZERO-1/; updated BOARD.md and synthetic-report.md.

D-010/D-011: native UI demo and full web acceptance guide are explicitly distinguished. Server stays local. No new financial policies or formulas; canonical statuses and prototype configuration untouched. Synthetic amounts are test inputs only.

Commands from server: `npm run typecheck` (exit 0); `npm test` (`Test Files 15 passed (15)`, `Tests 192 passed (192)`, including 7 fixture checks and 14 mandatory E2E scenarios). Real outputs: evidence/UI-ZERO-1/typecheck.txt and tests.txt. A preceding full-suite run with `FINAGENT_CAPTURE_EVIDENCE=1` wrote evidence/core-mvp/scenarios.json; detailed traces remain there. No additional external input profiles existed before this generated set.

The guide covers complete manual UI acceptance, but does not claim that every checkbox has been executed. Only the Expo preview registration smoke path was exercised via UI. No full device walkthrough, real authentication or native backend integration claimed. JSON is a human input card, not an import feature. CSV balance is the last statement balance, not proof of today's funds. Date-sensitive scenarios must be rebased for later runs. A specific recommended action is not promised for incomplete UI action inputs.
