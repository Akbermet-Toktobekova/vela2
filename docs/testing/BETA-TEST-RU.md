# Vela beta launch and verification

Historical checkpoint dated 2026-11-05. The addresses below were temporary integration-test addresses. Use the current tunnel output for a new session.

## Open on a phone

1. Open `exp://c-dizbalanser-4xqnru-mw3fdg6zc9x62bp6.on.expo.app` in a compatible Expo Go client, or use the QR image at docs/coordination/evidence/beta/expo-qr.png.
2. The configured server at that checkpoint was https://dean-stadium-extract-manuals.trycloudflare.com/api/beta . A phone requires the reachable API address.
3. Enter a name, email and 12–128 character password. Registration has no verification code. Use a synthetic email such as test@example.com for testing.
4. Complete onboarding for the profile, priorities, accounts, income, obligations/debts and documents. Leave unknown amounts empty.
5. Upload CSV, Excel or text PDF, inspect the preview and confirm it. Ambiguous PDF tables require explicit CSV correction. Scans require a separate OCR capability.
6. Enable AI processing to use analysis or chat. Records can be stored without consent. Inspect provider provenance separately from the job's COMPLETED state.
7. Close and reopen Expo to verify session restoration. Verify logout and sign-in again.

The computer, API, Cloudflare tunnel and Expo must be running. Addresses can change after restart. Run `npm run beta` from server, `cloudflared tunnel --url http://127.0.0.1:3002 --no-autoupdate`, update expo-mobile-app/.env.local, and run `npm run friends` from expo-mobile-app.

## Historical acceptance limitations

- SMTP delivery required a real sender configured in server/.env.beta.local. Password reset had been checked with an injected test sender.
- The original checkpoint gated financial recommendations. Later D-014 allows experimental recommendations after separate user opt-in. AI consent is still required.
- Physical Android/iPhone acceptance remained outstanding. Browser control was disabled in Work settings during that checkpoint. Keyboard, file-picker and SecureStore require physical-device verification.
- Scheduled backup rotation, parser process isolation and full load/security acceptance remained outstanding.
- Active-data export and deletion were available. Separately created offline backups require their own retention handling.

## Test data and defect reports

Use user-inputs/synthetic/ui-zero/. For a new test date, move future income, payment and goal dates relative to the review date. Use current dates for manually entered balance observations. UI-ZERO-GUIDE-RU.md describes the earlier interface and is retained as historical guidance.

For a defect record the device, OS, Expo Go version, screen, exact synthetic input, expected and actual results, and screenshot. Keep passwords and real statements out of the report.
