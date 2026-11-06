# Mobile parity follow-up verification — 2026-11-05

## Baseline

Independent source review of the current mobile/browser UI found: mobile feedback did not inspect `accepted:false`; account editor exposed only the first purpose; charts/simulator absent; review/import polling stopped on connection loss. These are implementation targets, not evidence of final acceptance.

The beta financial update deliberately preserves server-owned transactions, classifications, transfer matches and confirmations. Approval/dismissal must use dedicated authenticated/versioned server operations, not a browser-style state overwrite. Classifying a transaction alone is not equivalent to confirming that a subscription is active.

Profile nickname is overwritten by authenticated account name in the beta financial update. A profile edit needs an authenticated identity update, or must be clearly read-only.

## Required acceptance

- [ ] Server confirms owner isolation and version checks for any new confirmation endpoint.
- [ ] Rejected feedback never shows success; retries reuse operation identity without duplicate effects.
- [ ] Account edits preserve all existing purposes.
- [ ] Today coverage/readiness/accounts/confirmation controls reflect actual snapshot and server capabilities.
- [ ] My Plan charts and periods never aggregate unlike currencies; simulator uses the selected goal and matching allocations, handles zero contribution and date bounds.
- [ ] Drilldown targets the selected category and period.
- [ ] Foreground refresh/retry handles lost jobs and stale versions while preserving saved drafts.
- [ ] Delayed responses do not replace a newer session/profile or re-open stale jobs.
- [ ] Relevant TypeScript, regression tests and native exports pass.
- [ ] Physical Android/iOS interaction and equivalent-state screenshots explicitly recorded.

No live AI calls or personal account data are needed. Build/export success does not establish native acceptance.

## Final independent evidence

- Server TypeScript: passed.
- Mobile TypeScript: passed independently after recovery integration.
- Targeted regression suite: **8 files / 83 tests passed** (`/tmp/vela-mobile-followup-final.log`). Includes 14 financial E2E scenarios, web core/feedback, beta HTTP/financial/analysis, new mobile API operations and plan calculations. Live-provider tests excluded.
- New independent API checks: **6 passed**. Verify authenticated name persistence/session and owner isolation, confirmation version/ownership, transfer/subscription semantics, dismiss-only behavior, chat clear idempotency, pre-clear cached request isolation and a deferred provider reply racing with clear.
- Plan tests verify unlike currencies/months are separated, contradictory sign/classification rows withheld, refunds/debt/transfers distinct, matching goal allocations, zero/missing inputs and month-end/date-range behavior.
- Source review caught completion polling cleanup suppressing the final state refresh. Mobile owner corrected it to refresh state before publishing the completed job. Added monotonic envelope version updates and stale-session result guards.
- Source review caught planned currency choices missing currencies present only in debts/bills/essentials. Developer added those currencies. Extreme hypothetical timeline dates are now bounded.
- `git diff --check`: passed.

## Acceptance conclusion

No unresolved blocking source-level defect was identified in the reviewed changes. The server operations and pure display calculations have synthetic automated evidence. Native Android/iOS gesture, slider, keyboard, chart touch, foreground/reconnect and multi-device conflict acceptance are **not performed** here. Automated API/helper checks do not prove these native interactions.

The goal contribution control is a hypothetical simulator, not a funds transfer or saved allocation. Beta allocation release gates remain intact. Spending categories show gross classified spending before refunds and keep currencies separate. Shared legacy-web/beta accounts remain out of scope.

Parent must verify final exports and any runtime preview independently. No production data, credentials, deployments, or live AI calls were used by this verifier.

## Lead integration follow-up

- Final combined targeted suite rerun: 8 files / 83 tests passed (`/tmp/vela-final-followup-check.log`). Web TypeScript and production build passed.
- Expo browser Today was rendered using a synthetic-only in-memory backend on port 3004. Account cards, confirmations and financial picture were visible. Browser access was subsequently disabled in Work settings; My Plan screenshot comparison could not be completed.
- Final reviewer finding: stale restored drafts could retain an old version indefinitely. Lead added a saved-vs-draft comparison panel and explicit reviewed reapply action; Save remains disabled until review, and deleted records cannot be recreated implicitly. This final UI recovery patch has TypeScript/export evidence but no independent/native interaction acceptance yet.
- Existing HTTPS API health and both Expo/API tunnels were verified available.
