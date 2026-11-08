# PDF-REVOLUT — Multi-currency statement import

B11 adds deterministic parsing for the tested English Revolut PDF layout. PDF.js coordinates separate dates, descriptions, inflows, outflows and balances. The preview retains page and line provenance and lists pending rows and summaries separately. Unknown PDF layouts continue to use manual mapping.

The authenticated PUT /api/beta/imports/:id/accounts route persists account mappings, explicit exclusions and verified corrections. Confirmation revalidates the PI version and all mapped accounts, and writes all currency groups atomically. One source file can produce several statement records. Deleting that source removes all of those records. Same-file duplicate detection uses the original file hash. PDF groups preserve repeated rows within a statement and match overlapping transactions against prior records one at a time. CSV and Excel retain their existing duplicate behavior.

## Local acceptance

The attached file was tested through the authenticated HTTP API and import queue on loopback using an in-memory BetaStore with AI processing disabled. Only aggregate results were recorded. The PDF was neither copied into the workspace nor sent to a provider.

| Currency | Completed rows recognized | Saved | Detected on reupload |
|---|---:|---:|---:|
| EUR | 2 | 2 | 2 |
| HUF | 251 | 251 | 251 |
| USD | 4 | 4 | 4 |

Five pending HUF rows and 19 summary rows were excluded. No transaction rows required correction. Two source rows each on pages 1, 9 and 18 matched the saved date, currency, amount and sign. The three currency statements saved 257 operations. Repeating confirmation and reuploading the same file left 257 operations in the test profile.

- Server npx tsc --noEmit exited 0.
- Server npx vitest run tests/beta-imports.test.ts tests/beta-http.test.ts tests/statement-parser.test.ts tests/e2e/finagent-14-scenarios.test.ts reported 4 suites and 70 tests passed, including the generated synthetic Revolut PDF.
- Mobile npm run typecheck passed. Expo export completed for Android, iOS and web. The physical Expo Go file picker and confirmation are pending device verification.
