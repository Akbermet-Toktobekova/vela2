# Automatic Expo API connection

Status: DONE.

## Modified/Created Files

- `expo-mobile-app/src/BetaApp.tsx`: removed the Connection panel, manual address input and advanced connection toggle. Use the configured endpoint; discard the previous session when changing from its saved endpoint.
- `expo-mobile-app/.env.local` (ignored): active HTTPS API address.
- `docs/coordination/DECISIONS.md`: D-024 records the requested behavior.
- `docs/coordination/BOARD.md`, this handoff and verification evidence.

## Requirements and Decisions Used

D-013, D-014, D-023, D-024. User requested removal of the quoted connection panel. Financial rules and formulas are unchanged. The original database and keys remain in place.

Started beta API on loopback port 3002, its HTTPS tunnel, and Expo Go on port 8083. Configured the application automatically. Existing ignored provider configuration is available in the isolated worktree; provider credentials are excluded from Expo.

## Exact Verification Commands and Real Output

From `expo-mobile-app`: `npm run typecheck` — exit 0, `tsc --noEmit`. See `../evidence/UI-AUTO-CONNECT/mobile-typecheck.txt`.

From `server`: `npm exec --offline -- vitest run tests/e2e/finagent-14-scenarios.test.ts` — exit 0:

```text
Test Files  1 passed (1)
Tests       14 passed (14)
Start at    23:07:15
Duration    3.46s
```

Raw output: `../evidence/UI-AUTO-CONNECT/e2e.txt`.

PowerShell `Invoke-RestMethod` against the configured HTTPS API `/health` returned `{"status":"ok","runtime":"authenticated-beta"}`.

Running Expo: `npm run friends -- --port 8083 --clear`. Startup confirmed `.env.local` loading and `EXPO_PUBLIC_API_URL` export.

Executed a Node fetch check via PowerShell here-string piped to `node`: get the Metro manifest from `http://127.0.0.1:8083` using `accept: application/expo+json` and `expo-platform: android`; fetch its launch asset through localhost and inspect the delivered bundle. Actual output:

```json
{"manifestStatus":200,"bundleStatus":200,"configuredApi":true,"connectionPromptRemoved":true,"serverAddressFieldRemoved":true}
```

Raw result: `../evidence/UI-AUTO-CONNECT/metro-verification.json`. The bundle contains the configured HTTPS API address and excludes the removed prompt/save-address control.

## Limitations

No physical-device interaction is claimed. The temporary HTTPS address depends on the running tunnel. A changed address requires updating ignored host configuration and restarting Expo. Users no longer enter that address inside the app. API, tunnel and Expo remain running. Existing SMTP configuration remains unavailable.
