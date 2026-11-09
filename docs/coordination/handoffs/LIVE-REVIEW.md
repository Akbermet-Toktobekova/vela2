# LIVE-REVIEW handoff

## Delivered

- [English recap](../../testing/live-review/RECAP.md) for the original Debt, Strong, and Nora profiles, with 21 stage reports per profile.
- [PI storage map](../../testing/live-review/PI-STORAGE.md) with verified beta storage and simulated PostgreSQL mappings.
- `server/src/scripts/live-review/` runs the isolated components and the authenticated beta API against disposable SQLite. The three fixtures preserve the prior profile descriptions, including Strong’s two later Wise exports.
- The lab Pattern Recognition stage supplies its summary to the isolated Behavior Agent. The baseline beta API cycle retains its existing behavior. The lab records the exact provider request and returned text or parsed structured response.
- Restored the existing `buildOnly` catalog path so binding a draft does not call Gemini to choose among catalog candidates. The separate Checker run replays the exact generated drafts and uses Gemini for semantic verification when the draft reaches that gate.

## Decisions used

D-004 and D-015 for canonical evidence and AS-first suggestions, D-005 for independent critical coverage, and D-014 for the opted-in synthetic beta. The run did not change canonical AS data, financial formulas, or policy parameters. SQLite locations are verified with readback. PostgreSQL projections are simulated.

## Verification

Commands ran from `server`.

```text
npm run typecheck
> tsc --noEmit
Exit code 0

npm test
Test Files  26 passed (26)
     Tests  272 passed (272)
✓ tests/e2e/finagent-14-scenarios.test.ts (14 tests)
✓ tests/source-advice.test.ts (7 tests)

npm exec --offline -- tsx src/scripts/live-review/run.ts
nora/beta-review
nora/assistant
nora/feedback
nora/postgres-mock
Saved ...\docs\testing\live-review\RECAP.md
Exit code 0
```

Completed capture `2026-11-07T15-16-44-438Z`. Verified all 64 recap links and retrieved both saved agent results and the persisted trace for every profile. Gemini returned 31 live responses across the isolated calls and the beta runs. No provider call used fallback. The decision pipeline can still use the action catalog when Checker finds no usable primary drafts.

- **Debt** returned `A005` and bypassed financial scoring through the critical path.
- **Strong** returned `A012` with score `0.58875` after the catalog fallback. Both Wise statements imported, for 159 transactions.
- **Nora** returned `A014`, a verification action. Both statements imported, for 48 transactions. The report preserves the exact reason Checker rejected the draft that cited `C023`.
