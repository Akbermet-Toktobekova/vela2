# Automatic statements and reference UI — browser follow-up

Status: implementation and main-screen browser verification completed; live AI acceptance remains open. Physical Android/iPhone acceptance is not claimed.

## Modified/Created Files

This task continues the existing STATEMENT-AUTO changes in the `vela-ui-integration` worktree on `integrate/new-ui-backend`. This follow-up changed:

- `expo-mobile-app/src/BetaApp.tsx`: remove the duplicate legacy debt section from Analytics; retain the reference-style debt card and its Add/Edit routes.
- `expo-mobile-app/src/screens/AnalyticsScreen.tsx`: place cushion controls below the amount, with wrapping, and correct the reserve editor explanation.
- `docs/coordination/evidence/STATEMENT-AUTO/chrome-*.png` and `chrome-analytics-verified.txt`: actual Google Chrome verification evidence.
- `docs/coordination/evidence/STATEMENT-AUTO/{server-tests-visual-followup.txt,mobile-typecheck-visual-followup.txt,bundles-visual-followup.json}`: current verification output.
- This handoff, BOARD.md and synthetic-report.md.

Earlier implementation includes staged/background statement processing, provenance-preserving exclusions, essential-cost details and dated bills, subscription management, protected reserve checks and profile accordions. Earlier changes remain in the working tree. No commit or push was performed in this follow-up.

## Implemented Requirements & Decisions Used

D-025 governs the supplied reference images and explicit user overrides; D-023 keeps Expo Android/iOS as delivery targets. Expo web was used only as a local browser rendering harness. D-024 governs the configured backend address. No canonical facts, financial formulas, thresholds, prompt, or numerical policy were changed in this follow-up.

The original browser request was resumed after the user enabled Local browser use. At the user's explicit direction, final verification used the installed Google Chrome application, not the in-app browser.

## Exact Verification Commands & Real Output

From `expo-mobile-app`: `npm run typecheck` — exit 0, `tsc --noEmit`. Evidence: `../evidence/STATEMENT-AUTO/mobile-typecheck-visual-followup.txt`.

From `server`: `npm exec --offline -- vitest run --exclude tests/e2e/live-ai-integration.test.ts` — exit 0:

```text
Test Files  35 passed (35)
Tests       347 passed | 2 skipped (349)
Start at    11:38:58
Duration    29.19s
```

Includes the 14 mandatory E2E scenarios and automatic-statement regressions. Evidence: `../evidence/STATEMENT-AUTO/server-tests-visual-followup.txt`. No repeat paid-provider benchmark was run in this follow-up.

The prior full-suite file `server-tests.txt` currently records 347 passed, 2 skipped, 1 failed. The failed live-AI assertion expects AIEvaluationService.lastCallTelemetry.liveCallUsed to be true. An earlier full pass reported in the conversation is not substituted for this newer failure. The saved isolated classification captures also show a 503 on the first attempt and a confidence-schema rejection on the second. These remain unresolved acceptance evidence, not a successful live classification claim.

Browser harness: `npx expo start --localhost --web --port 8081` from `expo-mobile-app`. The existing phone preview on port 8083 was retained. The initial browser check on port 8083 could not authenticate; backend's default browser origin list allows 8081. No CORS weakening was applied.

Actual Chrome interactions at 390x844 and 320x740:

- Created the synthetic `visual-qa-20261109@example.test` profile, with AI consent and experimental recommendations left off.
- Traversed all seven onboarding steps. Saved EUR1000 essential monthly spending including a EUR600 named rent detail due 2026-11-15. The detail became a future bill without increasing the EUR1000 total.
- Created one synthetic personal account with EUR5000. Checked account validation, save and later sign-in.
- Today displayed the dated EUR600 bill and account balance. Profile sections started collapsed and could be expanded; logout remained separate. Statement retention and Show operations controls were visible through Profile.
- Analytics reserve editor recorded EUR3000 already earmarked. Analytics showed EUR3000/EUR3000, 100% funded and 3.00 months. After sign-in, Today still showed EUR5000 bank cash, EUR3000 earmarked, EUR600 bills and EUR1400 uncommitted.
- Found and corrected the duplicate debt section, misleading reserve copy and letter-by-letter cushion wrapping at 320px. Rechecked the actual updated screen; the amount and both buttons now fit. DOM inspection at 320px found document width 320 and no visible button/input/tab horizontal overflow in the inspected Analytics viewport.
- Checked Assistant suggested buttons and composer at 320px with AI off. No financial chat or provider request was sent. This is layout coverage, not live conversation acceptance.
- Saved screenshots and a post-fix Analytics DOM snapshot. Temporary browser viewport overrides were reset. Chrome was left open for review.

Native development delivery checked by requesting Expo manifests and launch bundles for Android and iOS on port 8083, and the public API health endpoint. All returned HTTP200. Both bundles contain the updated reserve explanation and configured HTTPS API address. Sizes: Android 4,798,741 characters; iOS 4,777,241 characters. Evidence: `../evidence/STATEMENT-AUTO/bundles-visual-followup.json`.

Current Expo Go address: `exp://c-dizbalanser-4xqnru-mw93g901la0zitgl.on.expo.app`. QR generated from this exact address at `C:/Users/sanat/.codex/visualizations/2026/11/09/01a1bfdc-fb78-7ae1-abc0-65640c3fbb63/expo-qr.png`.

## Discovered Formula/Rule Limitations or Edge Cases

- Live AI acceptance remains open as described above. Deterministic error fallback does not establish successful AI classification or evaluation.
- Browser visual coverage uses a deliberately small synthetic profile, with no uploaded operations. Populated subscription/transfer confirmations, file picking, real statements, deletion confirmation and physical mobile keyboard/date-picker behavior were not visually exercised in this follow-up. Automated suite coverage remains separate.
- No physical-device test, production deployment or canonical production approval is claimed. Browser rendering is not native-device equivalence.
- The synthetic test account remains saved on the authenticated beta service. No real account data was edited or deleted. Services and temporary URLs must remain available for phone preview.
- Some development-only web console warnings remain; this follow-up does not certify the retired web delivery target.
