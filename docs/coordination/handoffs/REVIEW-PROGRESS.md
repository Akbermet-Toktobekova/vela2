# Focused classification review and visible progress — 2026-11-06

Implemented the approved plan in Desktop/Vela2. Critical queue excludes confident fees/recurrences and ordinary confident classifications. Processor ambiguity, low/missing classification, uncertain transfers, ownership blockers and possible duplicate charges remain reviewable. Conflicting transaction signs and classification meanings are separated before grouping. Explicit user classifications remain protected.

Owner-scoped encrypted `finding-review-batches-v1` persists case snapshots and Approved/Corrected/Dismissed/Deferred outcomes. Completed batch totals stay fixed as new evidence creates new batches. Deferred items remain pending and do not fill progress. Responses keep profile/evidence version checks and exact retry behavior. Existing finding decisions remain intact; no historical imports are reprocessed.

API adds informational observations, reviewed summaries and active batch progress to FindingsPacket; mobile dependency-free types match validated server contracts. Today shows up to five cards, first expanded initially, bar/count, reviewed history with checkmarks, inline saving/error feedback and saved-answer notice. Reviewed history expands after a saved decision. Transaction rows distinguish user approval from automatic classification. Subscription-use/cancellation and financial calculation/action policies remain separate.

Verification:
- Server `npm run typecheck`: exit 0.
- Server `npm test -- --reporter=dot`: 30 files passed; 303 tests passed, 2 skipped.
- Mobile `npm run typecheck`: exit 0.
- Mobile `npx expo export --platform all --output-dir /tmp/vela-focused-review-export`: Android/iOS/web succeeded.
- Regression coverage: confident suppression, processor ambiguity, fee/recurrence information, grouped compatible cases, deferral, stale writes without progress, saved outcomes, refresh via new service instance, completed batch/new work, changed evidence, and authenticated HTTP lifecycle.

Native Android/iPhone tap, keyboard, screen-reader and visual acceptance were not performed. Bundle success is not native-device acceptance. No deployment performed.
