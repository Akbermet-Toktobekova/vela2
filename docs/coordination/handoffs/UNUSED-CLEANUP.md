# UNUSED-CLEANUP

Removed compiler-confirmed unused imports/locals, obsolete mobile state/setters, the unconsumed confirmation callback and handler, unused formatter and sample CSV constants, unused compatibility alias/test wrapper, and the disconnected privacy module. The latter had no callers; active runtime consent/release gates remain intact. Moved stale ignored mobile build output into recovery. Consolidated duplicate imports with TypeScript semantic import organization. Repository dependency tracing included app/API/test entrypoints, static and literal dynamic imports, and alias resolution; retained all remaining modules. Config/plugin resources, API registration, job handlers and platform dependencies remain intact.

Enabled noUnusedLocals and noUnusedParameters in server and mobile configurations. Preserved financial formulas, canonical data, saved records and credentials. No product features or tests removed. A mock's intentionally unused input remains as an underscore-prefixed parameter because assertions inspect its typed call arguments.

Verification: server/mobile npm run typecheck exited 0; server npm test -- --reporter=dot passed 30 files, 282 tests with 2 skipped (including retained financial scenarios); Android/iOS/web exports succeeded to /tmp/vela-unused-cleanup-export. API health and Expo browser returned HTTP 200. Canonical JSON SHA-256 unchanged. Native physical-device acceptance not performed.

Recovery: /Users/akbermettoktobekova/Documents/ChatGPT/Vela2-unused-recovery-20261106-150520
No staging, commit, or Git history rewrite performed.
