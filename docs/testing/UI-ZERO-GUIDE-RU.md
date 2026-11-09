# Vela from an empty profile — historical manual verification guide

This guide records the interface and synthetic test plan prepared on 2026-11-04. Later authenticated beta behavior is documented in BETA-TEST-RU.md and D-013/D-014. The filename is retained for existing links.

All amounts, names and operations are fictional test inputs. For a later review date, shift future payment, income and goal dates relative to that day. Keep historical CSV data historical. Date changes may change the recommendation.

## 1. Version under review

The original Expo interface review covered appearance, the empty registration form, keyboard behavior, ten onboarding screens and three demo tabs. Financial screens were demonstrational at that checkpoint. Server authentication and profile persistence were still pending. A full restart reopened Welcome.

The web review covered a fresh profile, seven working onboarding steps, CSV import, accounts, goals, debts, Today, Assistant and local persistence. Some old labels referred to ten steps despite the seven-step web flow.

## 2. Phone and friends

1. Install Expo Go compatible with SDK 58. Open the supplied Expo link or scan its QR in Expo Go. On iPhone the camera can open the link.
2. A tunnel requires the author's computer and Expo to remain running. Restart can change its address. Use the reachable tunnel address on the phone.
3. A LAN link such as exp://<IP>:8081 requires the same Wi-Fi network. Guest or corporate networks may prevent connectivity.
4. Press Get started. Name and Email must be empty.
5. Press Continue with empty fields and verify the error. Enter Mira Test and mira@example.com and continue.
6. Verify forward/back navigation, scrolling, keyboard overlap and the phone bottom bar. Open Dashboard on step 10.
7. Check Today, My Plan and Assistant. Record inactive buttons or demo text. These historical UI checks did not establish server financial-workflow acceptance.
8. Fully restart for a fresh run. Development Fast Refresh may preserve screen state.

An independently installable app requires its own test build. The original Expo link served interface demonstrations.

## 3. Empty web profile

1. Start server and react-app according to README. The local address was http://127.0.0.1:5173 under D-011. Remote friends require the separate beta configuration.
2. Use a separate browser profile. The initial Alex demo is populated data.
3. Open Settings → Demo / Data → Start Fresh Blank Profile. Export PI Database (.json) before replacing any working profile. Use disposable test data for resets.
4. Verify step 1 opens without Alex's accounts, statements or reserve allocations. Missing values must retain their missing state.
5. In a separate empty run press Skip to App. Today should request data rather than publish an unsupported transfer. Then begin the main empty-profile test.

## 4. Main manual web input

The profile.json next to the CSV files is a tester reference. The historical UI did not import it as a complete profile.

1. Step 1 — Get started.
2. Step 2 — Create Account with Mira Test and mira@example.com. Empty name, malformed email or an invalid code blocks continuation. The local demo code was 8492 and did not represent email delivery or real authentication.
3. Step 3 — Select I'm saving for something specific. Add Test Safety Cushion, 1000 EUR, due 2027-05-04. Verify back navigation preserves the selection.
4. Step 4 — Add Test Main / Test Bank / EUR / 1800 / 2026-11-04 / Personal / Daily spending / Primary. Add Test Savings / Test Savings Bank / EUR / 700 / the same date / Personal / Savings. The initial total is 2500 personal EUR across two accounts. Verify editing and cancellation. Enter these fixtures explicitly.
5. Step 5 — Add Test Salary / Regular / 2400 EUR / Monthly / Salary / next receipt 2026-11-05 / Test Main. Verify its account link.
6. Step 6 — Enter estimated monthly essential expenses of 1200 EUR. Add separate unpaid monthly EUR obligations to Test Main for Test Rent 800 due 2026-11-06, Test Energy 120 due 2026-11-08, and Test Internet 30 due 2026-11-09. Answer Yes for debt. Add Test Card / Credit card / 600 EUR / APR 19.9 / minimum 35 / due 2026-11-10. Record the minimum through the debt entry only.
7. Step 7 — Upload 01-main.csv to Test Main and 02-savings.csv to Test Savings through the file picker. Expect eight and one operations, nine total. CSV balances describe their dated history.
8. Finish onboarding. Open Today, My Plan and Assistant. Reload and verify the entered records persist.

## 5. Web manual checklist

Record PASS, FAIL or BLOCKED with the actual outcome. These are intended checks, not historical claims of completed acceptance.

- [ ] All seven steps support forward/back navigation, Skip to App, onboarding return and reload midway.
- [ ] Registration handles missing/invalid inputs and explains the historical local demo's identity limitations.
- [ ] Accounts support add, cancel, name/balance edit, primary-account change and deletion of a disposable account. Use a separate run for deleting baseline accounts.
- [ ] Income supports add, unknown amount, account selection and deletion of a temporary source.
- [ ] Obligations support Test Temporary 1 EUR, details, change to 2 EUR, cancel/save and confirmed deletion. Paid/unpaid changes must avoid duplicate balance effects.
- [ ] Debt question supports No, Yes and Add later. Missing APR and minimum stay unknown. Use available onboarding controls for edits.
- [ ] Today shows connection status, readiness, at most one main recommendation, explanation and available confirmations.
- [ ] For a published recommendation, verify separate Accept and Complete states, checked Adjust, Decline without money movement and replay-safe repeated clicks. Mark unavailable branches BLOCKED. This UI fixture lacks some server-side execution-term confirmations, so it does not guarantee an action ID.
- [ ] My Plan supports add/edit goal, cancel, and a synthetic allocation of 50 EUR without creating money or silently changing account balances. Delete only a Test Disposable Goal.
- [ ] Assistant answers questions such as “What information is missing?”, “Explain my accessible balance” and “Is this my own transfer or income?” Verify against the entered profile. Record provider unavailability explicitly.
- [ ] Settings Profile, Accounts, CSV and Demo / Data preserve name/currency changes, modal closure and JSON export. Before additional imports, expect two accounts and nine operations. JSON reimport was outside the historical UI promise.
- [ ] Browser reload/reopen preserves the profile without injecting demo records.
- [ ] Check 360–390 px and wide layouts, scrolling, keyboard, fields, modals and complete visibility of primary controls.
- [ ] Verify Tab order, visible focus, Enter submission and readable errors.
- [ ] With the server unavailable, UI exposes the disconnected/error state and does not claim a locally invented recommendation was server-checked.

## 6. Statements, duplicates and errors

1. Reimport 01-main.csv into Test Main. Expect zero new operations and a duplicate notice. Keep nine operations across both accounts.
2. Import 03-overlap.csv into Test Main. Expect one duplicate skipped and one new Test Coffee −5 EUR, ten operations total. The reported 1795 balance is the last dated row's explicit balance.
3. Inspect Review / Transaction Review & Provenance. Verify date, sign, currency, description and source row. OWN-1015 has −300 on Main and +300 on Savings as one own-account transfer. Confirm classification through available controls.
4. Import 04-invalid.csv only in a separate test run/account. Expect one accepted −12.50 operation, two rejected rows and needs_review. Invalid amounts must retain errors.
5. Import 05-unsupported.txt. Expect explicit unsupported/failed status without fabricated operations.
6. Export before deleting a statement and associated operations. Test on a disposable account and record any unclear consequences or retained operations.

## 7. Additional isolated profiles

Start each variation from a separate blank profile.

- **UNKNOWN** — Debt lacks APR and minimum. Request the facts or withhold unsupported financial advice.
- **Shortfall** — Only Test Main 20 EUR, no confirmed future income, the original obligations and debt. Prevent allocations exceeding available funds. A diagnostic shortfall action does not close the deficit.
- **No goals** — Create no goals. The engine cannot claim progress toward a missing goal.
- **Mixed ownership** — Test Work 100000 HUF / Mixed / personal share unknown. Preserve ownership and currency uncertainty.

## 8. Defect reports

Record device/OS, Expo Go or browser version, step, exact synthetic input, expected and actual results, screenshot and reproducibility after restart. Keep PASS/FAIL/BLOCKED for manual items. Server automation alone does not establish physical-phone acceptance.

## Historical friend demo launch

From expo-mobile-app, run `npm run friends` and share its current Expo link or QR. The author's computer must remain running. At the original checkpoint a full launch reopened Welcome → Get started → an empty local Name/Email demo form. Financial screens were demonstrational and genuine authentication and persistence were pending.

The historical address was exp://c-dizbalanser-4xqnru-mw2p5srqosr2dwqd.on.expo.app . Use the new address printed after restart. The recorded QR is docs/coordination/evidence/UI-ZERO-1/expo-qr.png from the repository root.
