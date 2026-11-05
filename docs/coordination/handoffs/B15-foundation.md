# B04 / B15 foundation verification — 2026-11-05

## Owned deliverables
- server/tests/beta-financial.test.ts (5 tests)
- server/tests/beta-http.test.ts (5 tests)
- docs/coordination/handoffs/B15-foundation.md

No production source or peer module was edited. Coordinator explicitly assigned these test files. Read BETA-CONTRACT, app.ts, financial.ts, auth.ts, imports.ts and analysis.ts for integration behavior. No canonical AS facts, formulas or prototype parameters changed.

## Verified behaviors
Financial tests: fresh per-user blank profiles; compare-and-swap version conflict with no state overwrite; profile/entity ownership spoof rejection; unknown expenses remain null; invalid balance currency/account rejected; client-forged transactions/statements/messages/recommendations ignored in favor of server state; changing profile invalidates prior analysis.

HTTP integration uses a real Express listener on an ephemeral loopback port, encrypted memory BetaStore and an injected reset-mail sender. Covers registration without a code, login/me/logout, rejecting X-User-Id and raw user-ID bearer spoofing, state CAS, two-user isolation, foreign import preview/confirmation/job lookup denial, repeated confirmation without duplicate transactions, AI consent gates, reset link delivery capture without token disclosure in response, single-use reset and session revocation, own-profile export, account deletion and unrelated account preservation.

No live LLM request is performed by these tests. The reset sender is an explicit test injection; successful actual email delivery is not claimed.

## Exact commands and actual output
From server:

`npx vitest run tests/beta-financial.test.ts tests/beta-http.test.ts`

```
✓ tests/beta-financial.test.ts (5 tests) 34ms
✓ tests/beta-http.test.ts (5 tests) 1491ms
Test Files 2 passed (2)
Tests 10 passed (10)
Start at 03:22:25
Duration 5.37s
```

`npx tsc --noEmit`: exit 0, no output.

`npx vitest run --exclude tests/e2e/live-ai-integration.test.ts`

```
✓ tests/beta-http.test.ts (5 tests) 2824ms
✓ tests/beta-financial.test.ts (5 tests) 44ms
✓ tests/e2e/finagent-14-scenarios.test.ts (14 tests) 515ms
Test Files 20 passed (20)
Tests 230 passed (230)
Start at 03:23:01
Duration 18.61s
```

The paid/live-provider suite was explicitly excluded to follow the coordinator instruction to avoid live AI calls. All other discovered test suites passed, including the mandatory 14 deterministic E2E scenarios. Full-suite typecheck ran separately; final status reported to coordinator.

## Review findings sent to coordinator
- Shared date validation accepts some impossible calendar dates via Date.parse normalization; strengthen validation.
- Shared credential limits (10–256) differ from auth limits (12–128); align schema/client guidance.
- /export currently includes financial state/chat but not every retained original file and private analysis; assess/extend full-data export claims.

## Acceptance limits
This verifies backend behavior, not full physical Android/iPhone acceptance, delivery through an actual SMTP service, universal PDF layouts, review of financial policies for real-data release, or privacy erasure from historical backups. No claim that B15 overall release acceptance is complete.

## Follow-up verification — persisted import jobs and erasure

Updated beta-http tests to expect POST /imports HTTP 202 and poll owner-scoped GET /jobs/:id until completed; preview comes from job.result. Added identical-upload job deduplication and file deletion regression. Regression verifies removed original base64 is absent both from all remaining user beta_documents and the HTTP export, with deleted transaction text absent from export as well. Added strict calendar-invalid-date regressions (3 cases). Extended beta-jobs coverage to job fingerprint dedup, unknown-kind nonblocking and late completion after purge not recreating job/result.

Final commands from server:

`npx vitest run --exclude tests/e2e/live-ai-integration.test.ts`

```
Test Files 20 passed (20)
Tests 238 passed (238)
Start at 03:30:17
Duration 27.61s
```

Mandatory 14 E2E passed. beta-financial: 8 tests; beta-http: 6 tests; beta-jobs: 8 tests. Targeted queue rerun: 8/8 passed. Typecheck status reported separately to coordinator. No live AI calls made.

Privacy review sent to coordinator: filename leaks in old minimize paths; chat same-request concurrency and missing conversational history; original file retention in completed import jobs after deletion; late in-flight job publication after purge. Root and peer source owners fixed the relevant beta paths during this test pass. Latest BetaAnalysis uses constrained model fact selection with deterministic rendering and release gating, minimizing output leakage/advice bypass. Full physical-device UX, all PDF layouts and production mail delivery remain outside these tests.

## Transaction classification follow-up

Added an actual async CSV upload -> confirm -> POST /transactions/:id/classify regression. Verifies classification becomes user_confirmed with selected economicType/category, only one classification remains, original operation is unchanged, stale expectedVersion returns 409, foreign user returns 404, unrelated account remains empty, and prior analysis is invalidated.

`npx vitest run tests/beta-http.test.ts`

```
Test Files 1 passed (1)
Tests 7 passed (7)
Start at 03:34:15
Duration 5.55s
```

`npx tsc --noEmit`: exit 0, no output.

Source review sent to coordinator: the classification route's synchronous CAS cannot interleave ordinary JS handlers, but state-write + analysis-invalidation + task-cancellation need a transaction for failure/crash atomicity; changing a reviewed economic type also needs to maintain transfer matching/confirmation consistency. No production source edited by this test assignment.
