# EXPO-ONLY cleanup handoff

Branch: ui-parity-update. No commit/staging/history rewrite performed. All pre-existing changes were preserved in the recovery copy before extraction.

## Changes

- Moved the standalone website, archived prototypes, duplicate source packages and obsolete documentation outside the working tree, into the documented recovery directory.
- Shared domain types now own their definitions and financial extensions; profile state/blank-profile creation and pure processing moved into shared. Synthetic seed data and statements moved into test fixtures.
- Extracted explicit EngineRepository contracts. Production orchestration requires an injected repository; it no longer implicitly creates a legacy SQLite store. The beta API already injects its encrypted repository.
- Legacy storage/HTTP/local-access adapters remain under tests/helpers solely to preserve engine, security and 14-scenario acceptance coverage. Production code has no imports from test helpers or removed entrypoints.
- Server dev/start/beta all run the authenticated beta API. Removed unused cors dependencies and updated package lock. Kept Expo browser preview, skills, canonical data, essential decisions/docs and original data/credentials in place.
- Updated README, skill fixture paths, ownership board and source/recovery mapping in docs/EXPO-CLEANUP.md.

## Verification

- Baseline: npm test -- --reporter=dot — 32 files passed; 309 tests passed, 2 skipped.
- Final server npm run typecheck — exit 0.
- Final server npm test -- --reporter=dot — 30 files passed; 282 tests passed, 2 skipped. The 27 removed tests belonged to the two retired website-only suites. Existing financial scenarios and mobile API suites passed.
- Expo npm run typecheck — exit 0.
- Expo npx expo export --platform all --output-dir /tmp/vela-expo-only-export — Android/iOS/web passed.
- Runtime dependency search found no references to removed website/legacy paths or test helpers in shared, mobile or production backend code.
- Canonical JSON checksum unchanged: 7ce385e40ea872fd49927458f3a787cccb1e9e1cb02707c80ccdcd6419e8b6b9. All retained canonical provenance files match the recovery snapshot.
- Local API /health, browser preview and live iOS bundle returned HTTP 200 after API reload.

Native physical Android/iPhone UI/picker/keyboard acceptance was not performed. Existing saved data, keys and provider credentials were neither deleted nor migrated. No production deployment performed.

Recovery: /Users/akbermettoktobekova/Documents/ChatGPT/Vela2-recovery-20261106-141334
