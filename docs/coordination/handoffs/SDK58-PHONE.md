# SDK58-PHONE — deliverables

Files: expo-mobile-app/App.tsx, package.json, package-lock.json; BOARD.md; this handoff. Default entry is onboarding step 1; registration uses empty editable Name/Email fields with required-name and email validation. No credentials, emails or real accounts are created. Subsequent financial screens are still the existing demo.

Added reproducible `npm run friends` (Expo tunnel) and local dev tunnel dependency @expo/ngrok. Server remains loopback-only under D-011; only the mobile development runtime is exposed. No financial formulas, AS facts, policies or backend modules changed.

Verification: `npm run typecheck` exit 0 (evidence/UI-ZERO-1/mobile-typecheck.txt); `npx expo export --platform android --max-workers 2`: Android Bundled, 628 modules, Exported: dist (android-export.txt). Full server suite 192 tests passed. `npx expo start --tunnel --port 8081` running; external HTTPS manifest HTTP 200 and local Android manifest HTTP 200. Generated QR in evidence/UI-ZERO-1/expo-qr.png. Browser preview smoke: welcome, empty registration fields, invalid blank submission retained step 2, Mira Test/mira@example.com advances to step 3; reload returns to step 1. Screenshot registration.png. Physical phone execution is not yet verified.

Tunnel: exp://c-dizbalanser-4xqnru-mw2p5srqosr2dwqd.on.expo.app . Link lifetime depends on active Expo process. npm install reported 7 moderate audit findings in development dependency tree; no forced major updates applied.
