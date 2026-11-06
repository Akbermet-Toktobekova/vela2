# Vela — Expo mobile app and API

This branch contains the Expo application and its authenticated backend. The updated Today, My Plan, charts, Assistant, statement imports, transaction review, review progress, and action history are retained. Expo also supports a browser preview of the same application.

## Layout

- `expo-mobile-app/`: Android/iPhone application and Expo browser preview.
- `server/`: authenticated beta API, encrypted persistence, jobs, financial engine, AI and regression tests.
- `shared/`: domain types, blank profiles, processing, validated contracts and deterministic calculator.
- `.agents/skills/` and `AGENTS.md`: project skills, ownership and financial safeguards.
- `docs/`: specifications, decisions, current verification and cleanup mapping.
- `server/data/as/`: canonical financial knowledge and provenance. Existing review/production-approval statuses remain unchanged.
- `server/tests/fixtures/`: synthetic profiles and statements. Test-only engine/HTTP harnesses live under `server/tests/helpers/`; they are not production API entrypoints.

## Install

Use Node.js with built-in `node:sqlite` support and a version compatible with the installed Expo SDK. In each package, run `npm ci` once:

```bash
cd ~/Desktop/Vela2/server
npm ci
```

```bash
cd ~/Desktop/Vela2/expo-mobile-app
npm ci
```

## Start

Terminal 1 — authenticated API on loopback port 3002:

```bash
cd ~/Desktop/Vela2/server
npm run dev
```

`npm start` and `npm run beta` also start the beta API. `dev` watches source changes.

Terminal 2 — Expo Go on a phone:

```bash
cd ~/Desktop/Vela2/expo-mobile-app
npm run friends
```

Scan the current QR code. Keep both terminals open. The phone also needs a separate approved HTTPS tunnel to port 3002. Set the app server address to that tunnel URL ending in `/api/beta`; localhost on a phone points to the phone itself. Restarting a tunnel may change its address. No public API exposure is started automatically.

For a Mac browser preview, use this instead of a second Expo process:

```bash
npm run web -- --localhost --port 8081
```

Open http://localhost:8081 and use http://localhost:3002/api/beta as the server address. Run only one Expo process per port; stop it with Control+C before changing launch modes.

## Local configuration and data

- Optional mobile default: `EXPO_PUBLIC_API_URL` in `expo-mobile-app/.env.local`. No provider credentials belong in the app.
- AI provider credentials remain in the ignored compatibility path `user-inputs/secrets/.env`. Only that local secrets directory remains; it is not part of tracked source.
- Password email configuration: copy `server/.env.beta.example` to ignored `server/.env.beta.local` and configure SMTP. No reset email is delivered without a sender.
- Beta records reside in `server/data/beta.sqlite`. Preserve the adjacent key file with the database; do not remove either to fix an error. On macOS the local key has owner-only permissions; Windows uses DPAPI.
- AI processing and experimental recommendations retain their existing consent gates. User-reported action outcomes do not move money or change financial records.

## Verify

```bash
cd ~/Desktop/Vela2/server
npm run typecheck
npm test
```

```bash
cd ~/Desktop/Vela2/expo-mobile-app
npm run typecheck
npx expo export --platform all
```

Exports verify bundles, not physical-device behavior. Android/iPhone picking, keyboard, accessibility and UI acceptance must be checked separately.

See `docs/EXPO-CLEANUP.md` for migration/recovery details and `docs/progress.md` for verification results. No production deployment is implied.
