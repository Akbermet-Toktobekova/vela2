# ACTION-HISTORY — 2026-11-06

Implemented the approved user-facing action history separately from engine recommendations and financial state. Shared contracts validate retrieval and outcome inputs. Manual review origin/request IDs travel through durable jobs; only successful concrete RECOMMENDATION_READY candidates create cards. Background, cancelled/stale, failed/provider-unavailable and empty reviews do not. Identical retries deduplicate; unchanged open actions update last-reviewed time and preserve their original snapshot. Completed outcomes allow a later fresh suggestion card.

Legacy engine audit remains unchanged. Existing entries appear only when engine feedback proves explicit user interaction. Legacy completion is not inferred into a new user-reported outcome. New history resides in the owner-bound encrypted action-history-v1 document, included in export and account deletion.

Mobile My Plan replaces the raw recommendation log with original suggestion/date/amount cards and Awaiting your update, Done (reported by you), Changed, Not done, Not now statuses. Changed requires a description; other notes are optional. Item-level saving/error/saved feedback preserves input; stale edits offer refresh. Manual review remains accessible when Today already shows a background suggestion. Background jobs cannot override an in-progress manual job or produce routine history announcements. Empty manual results show a brief message near the button.

Outcome updates use item revisions and idempotency request IDs, without changing profile versions, balances, allocations, reservations, recommendation completion or scheduling a financial review. Existing validated engine feedback/completion is unchanged. No canonical AS data, action IDs, formulas or policy thresholds changed.

Verification:
- server: npm run typecheck — exit 0.
- server: npm test -- --reporter=dot — 32 files passed; 309 tests passed, 2 skipped.
- expo-mobile-app: npm run typecheck — exit 0.
- expo-mobile-app: npx expo export --platform all --output-dir /tmp/vela-action-history-export — Android/iOS/web succeeded.
- Added service and HTTP tests for selection, deduplication, changed suggestions, all outcomes, revisions/stale edits, owner isolation, legacy filtering, refresh persistence, export/deletion and unchanged financial/engine state.

Native Android/iPhone UI/keyboard/tap acceptance not performed. No production deployment.
