# ANALYTICS-FX handoff

## Verified deliverables

- Analytics > Spending Categories filters by source currency and account. All converts category totals into the profile base currency with the shared calculator and Frankfurter v2 display rates. It shows quote dates, and separately lists native amounts excluded from a partial total. The authenticated API derives currencies from the current profile. No balance, financial policy, or recommendation engine FX source changed (D-027).
- The frozen Wise EUR reference labels all 41 CSV rows by category, economic type and evidence certainty before comparison to the saved classifier output. Five merchant descriptions lack enough evidence, eight bank-branded card payments are possible wallet transfers, and one self-named deposit requires ownership confirmation. The bakery row accepts either dining or groceries. Strict category accuracy excludes the five underspecified descriptions and nine transfer candidates.
- Explicit bank operation types now identify fees and currency conversion before any model output. A bank-declared deposit with a matching owner name is a candidate, and its amount stays out of spending and income pending confirmation. Raw bank fields and the owner name stay local. The updated model prompt distinguishes retail categories from location-only descriptors. Generic bank type and amount checks apply across layouts without relying on the filename, benchmark rows or source provider (D-028).

## Exact verification commands and output

Run from server unless otherwise noted:

- `npm run typecheck` and `npm run typecheck` in expo-mobile-app: both exited 0.
- `npm exec --offline -- vitest run --exclude tests/e2e/live-ai-integration.test.ts`: 36 files passed; 355 tests passed and 2 platform-conditional tests skipped. `tests/e2e/finagent-14-scenarios.test.ts`: 14 passed. Coverage includes profile isolation on the rate route, currency and account totals, partial totals, future quote rejection, bank evidence after minimization, and prior automatic import regressions.
- `npm exec --offline -- vitest run tests/beta-http.test.ts`: 10 passed after tightening the existing password error assertion to the complete text.
- `npm exec --offline -- tsx src/scripts/score-statement-reference.ts "<original Wise EUR CSV>" ../docs/coordination/evidence/ANALYTICS-FX/wise-eur-reference.json EUR`: verified source hash and 41 mapped rows. Optionally provide the profile's account-holder name via `VELA_BENCHMARK_OWNER` for a local own-transfer comparison; the reported offline run used a synthetic owner, matching the original offline baseline.

| Run | Rows | Other | Grounded categories | All category labels | Economic types |
| --- | ---: | ---: | ---: | ---: | ---: |
| Previous local import | 41/41 | 38 | 3/27 | 8/41 | 28/32 |
| Updated local import | 41/41 | 34 | 7/27 | 12/41 | 32/32 |
| Previously saved Gemini 3.1 Flash Lite | 41/41 | 11 | 27/27 | 30/41 | 31/32 |
| Previously saved Gemini 3.5 Flash Lite | 41/41 | 15 | 22/27 | 25/41 | 31/32 |

- HTTP GET to `https://api.frankfurter.dev/v2/rate/EUR/HUF?date=2026-11-09` and the equivalent KGS URL returned 200 with usable quotes dated 2026-11-09. The authenticated beta public health endpoint returned 200 and the new route rejected an anonymous request with 401.
- Expo preview HTTP GET at port 8083 with Android and iOS headers returned 200 for both manifests and launch bundles. Both bundles include the new spending filters and configured API. Remote Expo manifest returned 200.

Raw evidence: [reference](../evidence/ANALYTICS-FX/wise-eur-reference.json), [previous comparison](../evidence/ANALYTICS-FX/wise-eur-comparison.json), [updated replay](../evidence/ANALYTICS-FX/wise-eur-local-updated.json), [server tests](../evidence/ANALYTICS-FX/server-tests.txt), [rate probes](../evidence/ANALYTICS-FX/frankfurter-live.json), [Expo probes](../evidence/ANALYTICS-FX/expo-preview.json).

## Limitations

The saved Gemini runs are historical; the updated prompt was not sent with this private file. The new live-model category score is unknown. The low offline category score remains visible. The report does not treat a card purchase from a financial brand as proof of a transfer between owned accounts or prefer one model based on one statement. No raw CSV, payee name, or amount is embedded in the benchmark. Chrome was waived by the user. Expo bundle verification did not execute on a physical device.
