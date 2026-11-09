# Vela / FinAgent

Vela combines a local server, web and mobile clients, and deterministic financial calculations.

## Run locally

Run these commands in two terminals from the project root.

```powershell
cd server
npm ci
npm run dev
```

```powershell
cd react-app
npm ci
npm run dev
```

Open the local address printed by Vite. The original server defaults to port 3001. See [provider configuration](user-inputs/README.md) and keep credentials outside Git.

## Verification

```powershell
cd server
npm run typecheck
npm test
```

```powershell
cd react-app
npx tsc --noEmit
npm run build
```

The server test suite includes `server/tests/web-*.test.ts`.

## Repository layout

- `react-app/` — Web application with icons in `react-app/public/assets/`.
- `server/` — API, SQLite, recommendation pipeline and tests.
- `shared/` — Shared contracts, types and financial calculator.
- `expo-mobile-app/` — Mobile application.
- `user-inputs/` — Source materials, local configuration and synthetic profiles.
- `docs/SPEC.md`, `docs/coordination/DECISIONS.md` — Specification and accepted decisions.
- `archive/` — Historical prototype and design evidence.

See [AGENTS.md](AGENTS.md) for the treatment of canonical AS evidence and preliminary policy parameters.

## Mobile app — Expo SDK 58

```powershell
cd expo-mobile-app
npm ci
npm start -- --localhost
```

For browser preview on this computer, run `npm run web -- --localhost` (usually http://localhost:8081).
Validation commands are `npm run typecheck`, `npx expo install --check`, `npx expo-doctor`, `npx expo export --platform all`.
Physical device verification requires an Expo SDK 58 compatible client. The legacy server is local. The authenticated beta uses its separate API configuration below.


## Authenticated mobile beta (work in progress)

The new API is separate from the original local prototype. From `server`, run `npm run beta`. Its database is `server/data/beta.sqlite`; Windows protects its key with DPAPI. Keep the database and protected key together for backup/restore under the same Windows account. Do not delete either file to resolve an error.

Copy `server/.env.beta.example` to `server/.env.beta.local` to configure password email. No message is sent until a real SMTP sender is configured. SMTP uses TLS. Set `BETA_RESET_URL` to your public HTTPS API address plus `/reset`.

Expose only port 3002 through an HTTPS tunnel; legacy port 3001 must stay local. In the mobile app, enter the HTTPS address ending in `/api/beta`, or set `EXPO_PUBLIC_API_URL` before starting Expo. Run `npm run friends` from `expo-mobile-app` for Expo Go access. The API and Expo tunnels have different addresses and both must remain running. Never enter your computer's localhost address on a phone.

Accounts use name, email and a 12–128 character password, with no email verification code. Sessions persist in native secure storage. Experimental real-data recommendations require explicit opt-in in addition to AI consent. Read-only records and imports are available. Generic PDF tables may require manual CSV mapping; scanned PDFs are not OCR-supported.

Original statement bytes are retained during import review. Confirmed imports retain normalized transactions and provenance. No scheduled backup rotation is enabled yet; any manually created backups remain until the operator removes them. Account/file deletion removes active data, not separately created offline backups. Physical Android/iPhone acceptance and SMTP delivery must still be verified before calling the full beta complete.

## Seven-stage evidence\n\nSee the [specification](docs/SPEC.md), [storage map](docs/testing/live-review/PI-STORAGE.md) and [live recap](docs/testing/live-review/RECAP.md).\n