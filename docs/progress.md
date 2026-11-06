# Progress

## 2026-11-05 — Web design parity review

Branch: `ui-parity-update`. Web is the design reference. Separate legacy and beta APIs remain unchanged.

- Implemented web-derived mobile colors, surfaces, typography hierarchy and navigation; Today/My Plan/Assistant grouping and five-section Settings.
- Early essentials guidance preserves saved onboarding step numbering. Dashboard skip no longer records completion.
- Confirmed imports return to Today; transaction/extraction details are expandable and blocking errors stay visible.
- Keyboard handling adjusted per screen/modal; native keyboard acceptance remains pending.
- Web Settings retains profile/account/statement/export/demo handlers and explains unavailable authenticated controls. Assistant processing disclosure aligned.
- Web TypeScript/build and mobile TypeScript pass. Android/iOS/web exports pass; these are bundle checks, not device validation.
- Audit and independent verification: `ui-parity-audit.md`, `ui-parity-verification.md`.
- Review preview: http://127.0.0.1:4173/. Settings screenshot: `/tmp/vela-settings-parity.png`.
- Pending acceptance: equivalent-state mobile screenshots, physical Android/iOS interaction, exact bundled font parity, and full chart/simulator feature parity. No deployment, merge, backend/data migration or financial formula changes.

## 2026-11-05 — Mobile beta connectivity

- Added automatic persistent macOS key generation in a private owner-only `.key.local` file. Existing Windows DPAPI and explicit-key behavior preserved.
- Missing keys on an existing database fail closed; unsafe key permissions are rejected. Backup carries the correct platform key suffix.
- Server TypeScript passed. Storage/auth/HTTP tests: 23 passed, 2 Windows-only skipped, including macOS restart, backup, permissions and missing-key checks.
- Started beta on loopback port 3002 and a separate HTTPS tunnel using the running Expo tunnel agent. Legacy port 3001 is not exposed.
- API tunnel: https://vela-api-cakd9ec-dizbalanser.exp.direct/api/beta (temporary; requires backend and tunnel agent running).
- SMTP is not configured; password-email delivery remains unavailable. Native device login acceptance is still user verification.

## 2026-11-05 — Registration and connection errors

- Reproduced shared ESM/CJS Zod constructor mismatch: invalid registration was returned as 500 instead of 400. Added cross-constructor validation recognition and safe field messages.
- Mobile validates auth input, focuses fields, displays errors in the form, distinguishes network/server/credential failures, and checks health before authentication.
- Local ignored Expo configuration supplies the beta API URL. Advanced manual connection setup validates server identity before saving.
- Server/mobile TypeScript passed; 25 auth/storage/HTTP tests passed, 2 Windows-only skipped. Regression coverage includes foreign validation constructors, invalid fields, duplicate accounts, wrong credentials and sanitized server errors.
- Native keyboard visibility still needs physical-device acceptance; no credentials or personal profiles altered by code changes.

- Public HTTPS acceptance passed: missing name/invalid email/short password return 400 with safe field messages; registration 201, duplicate 409, wrong credentials 401, login/profile 200. Disposable synthetic account removed.
- Expo browser preview confirms default server configuration, visible form errors, and focus moving to name/email. Screenshot `/tmp/vela-auth-validation.png`. Physical-device keyboard behavior remains unverified.
- Android/iOS/web exports passed. Expo restarted with local API configuration; existing Expo URL retained and separate API tunnel restored.

## 2026-11-05 — Rejected saved-session recovery

- Observed `/auth/me` 401 for stored native session. Boot now discards rejected tokens and returns to Sign in, rather than retaining the invalid session.
- Secured API requests also recover on 401; a delayed rejection cannot invalidate a newer active token. Ordinary connection failures do not delete the session.
- Recovery preserves server records and secure saved drafts/import progress. In-memory account/editor views are cleared to prevent showing another user's state on subsequent login.
- Mobile TypeScript passed. Native stored-token recovery and keyboard experience remain physical-device acceptance checks.

## 2026-11-05 — Mobile functional parity follow-up

- Today: primary-currency observed spending/subscriptions/transfer movements, coverage, readiness, versioned confirmation prompts and detailed account cards.
- My Plan: currency and imported-period/planned selectors, classified cash-flow breakdown, category donut/drill-down, cushion/goal progress and hypothetical goal timeline with accessible contribution controls. Display math excludes contradictory classification signs and never converts or adds currencies together.
- Added authenticated owner-scoped profile-name update, version-checked confirmation responses, and idempotent chat clearing. Clearing uses a generation guard so delayed replies cannot restore cleared history.
- Mobile feedback honors rejection states and reuses retry IDs. Account edits preserve multiple purposes. Foreground/manual refresh resumes existing job IDs; stale editor versions expose conflict recovery instead of overwriting newer records.
- Independent server/mobile TypeScript and 83 targeted regression tests passed. Native chart/slider, keyboard and two-device acceptance remain unverified.
- Browser review uses an isolated in-memory synthetic beta backend on loopback port 3004, without live AI or personal records. Production/legacy databases are not used for these preview checks.

- Follow-up integration: web build/TypeScript and 83 targeted tests passed again. Late stale-draft recovery issue fixed with explicit comparison/reapply, without silent rebasing. Save blocked for stale/deleted records. Final device acceptance remains pending.
- Browser preview of synthetic Today completed; further browser interaction blocked by Work settings. Authenticated My Plan screenshots and native interactions remain unverified.

## Reliable import / focused findings — 2026-11-05
Shared statement normalization, CSV/Excel/generic PDF adapters, original filename/provenance preservation, blocking row review and reconciliation, typed evidence findings and mobile grouped queue implemented. See `docs/statement-import-findings.md` for matrix, examples, synthetic coverage and limitations. Android/iOS/web export succeeded (`/tmp/vela-reliable-export`); mobile typecheck passed. Independent final verification and native acceptance remain outstanding; interrupted verifier usage limit recorded.

Final verification: server typecheck passed; full Vitest suite: 30 files passed, 300 tests passed, 2 skipped (302 total). Expo mobile typecheck passed; Android, iOS and web exports succeeded.

## Transaction review navigation — 2026-11-06
Review transactions now opens a dedicated Transactions view at the top, retaining category/currency/month filters and individual classification controls. My Plan provides an explicit Review all transactions entry and a return button. Mobile `npm run typecheck` passed. Phone tap acceptance requires reloading Expo Go.

## Focused review and progress — 2026-11-06
Critical-only case selection, informational fees/recurrences, persistent review batches, visible saved outcomes, deferred handling, progress bar and reviewed history implemented. Full server suite: 303 passed / 2 skipped; server/mobile typechecks passed; Android/iOS/web exports succeeded. Native device acceptance pending. See `docs/coordination/handoffs/REVIEW-PROGRESS.md`.

## Useful action history — 2026-11-06
Manual useful suggestions now have separate persistent history and user-reported Done/Changed/Not done/Not now outcomes. Background and empty reviews excluded; legacy audit retained. Server/mobile typechecks passed; 309 tests passed, 2 skipped; Android/iOS/web exports passed. Native acceptance remains pending. See docs/coordination/handoffs/ACTION-HISTORY.md.

## Expo-only branch cleanup — 2026-11-06
Removed the separate website and obsolete prototypes recoverably; retained the updated Expo UI, beta API, shared code, skills and canonical data. Shared dependencies extracted; old storage/HTTP harness retained only for tests. Server/mobile typechecks and Android/iOS/web exports passed. Final suite: 282 passed, 2 skipped; 27 website-only tests retired from baseline 309. Financial/mobile acceptance coverage retained. Local API, Expo web and live iOS bundle return 200. Native acceptance pending. See docs/EXPO-CLEANUP.md and docs/coordination/handoffs/EXPO-ONLY.md.

## Unused code cleanup — 2026-11-06
Removed confirmed dead code and disconnected helpers; retained functional modules, safeguards and all tests. Unused-local/parameter checks enabled for server/mobile. 282 tests passed, 2 skipped; typechecks and all platform exports passed; local API/Expo health passed. Canonical data unchanged. Recovery and verification: docs/coordination/handoffs/UNUSED-CLEANUP.md. Native-device checks pending.
