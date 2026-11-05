# FIX-4 — Feedback safety (2026-11-04)

Changed: `server/src/orchestrator/reviewWorkflow.ts`, `server/src/db/sqliteStore.ts`, `server/src/suggestion/suggestionGenerator.ts`, `server/tests/e2e/feedback-core-regressions.test.ts`, `server/tests/e2e/feedback-regressions.test.ts`.

Implemented under D-004/D-005/D-007/D-010: accepted/adjusted pending monetary commitments are derived from persisted recommendation decisions and supplied to the central calculator without changing actual balances or allocations. Current recommendation is excluded from its own fresh acceptance/adjustment/completion validation. Accept, Adjust, Decline writes are atomic alongside feedback. Complete retains the existing transactional/replay protection. Adjust recomputes raw and normalized financial effects centrally and clears obsolete ranking/stability results. Unsupported financial completion, including unverified A015 cancellation, returns explicit VERIFICATION_REQUIRED without recording execution. A011 requires an exact active scheduled transfer, then records the user's confirmed pause without creating cash. Required-payment completion clears the now-unverified next minimum/date instead of inventing a later due date. Decline cooldown uses configured days across snapshot changes. Historical accepted/adjusted commitments can be cancelled with Decline without mutating PI; repeated cancellation is read-only and creates no duplicate feedback. Stale accept/adjust/complete remain blocked. A failed post-commit decline refresh is reported as saved with reviewPending, matching completion semantics.

Existing source-missing regression now expects rejection at Accept rather than proceeding to Complete, because the strengthened Checker correctly catches the absent source earlier. No test expectations were relaxed to permit an unsafe result.

Verification from `server/`:

`npx vitest run tests/e2e/feedback-core-regressions.test.ts tests/e2e/feedback-regressions.test.ts`

```text
 ✓ tests/e2e/feedback-core-regressions.test.ts (7 tests) 531ms
 ✓ tests/e2e/feedback-regressions.test.ts (12 tests) 975ms
 Test Files  2 passed (2)
      Tests  19 passed (19)
```

`npm run typecheck` (`tsc --noEmit`) exited 0.

Limitations: A015 requires verified real-world cancellation evidence not represented by the current feedback endpoint; manual verification outcome is intentional. Financial effects and commitments depend on the central calculator implementation owned by FIX-2-3. No canonical AS data, financial approval statuses, financial thresholds, sources or action IDs were altered. Full integration/E2E evidence is owned by coordinator.
