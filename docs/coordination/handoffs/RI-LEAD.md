# RI integration handoff

Changes: shared/statement core; import adapter; merchant directory and centralized finding policy; finding contracts and dependency-free mobile types; finding service/routes; StatementReview and FindingsReview mobile components; Today integration; synthetic normalization/findings/HTTP lifecycle tests. Existing working edits preserved. Canonical database and deterministic financial formula owners untouched.

Commands: `cd server && npm run typecheck`; `npm test -- --reporter=dot`; `cd ../expo-mobile-app && npm run typecheck`; `npx expo export --platform all --output-dir /tmp/vela-reliable-export`.

Focused checks: reliable imports + prior import tests + HTTP workflow: 25 passed. Findings: 7 passed. Mobile typecheck passed. All platform exports succeeded. Final full suite: 30 files passed; 300 tests passed, 2 skipped. Server typecheck passed. No native device acceptance performed. Independent verifier interrupted after initial review by agent usage limit.

See docs/statement-import-findings.md for supported matrix, import example and five-card preview. Generic non-Revolut multi-currency files require separate account imports and explicit exclusions; no universal format claim.
