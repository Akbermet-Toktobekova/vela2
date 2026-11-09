# Statement enrichment and budgeting

## Modified and created files

- Expo statement library and operation editor expose the file, parsed operations, original evidence, row corrections and merchant-wide edits. The standard flow uses file details instead of technical import or bulk review.
- The shared parser and beta upload service preserve valid and unresolved rows separately. Recognized worksheets are read independently, and PDF layout comes from headers and relative text positions. Overlapping files share operation records.
- The classifier separates merchant name, category, economic type and subscription evidence. The Google client validates an ordered model chain for this stage. User overrides survive reclassification. Only plausible own-account transfers require a question.
- Expo and shared contracts support five spending groups, the balancing Other amount, a saved reserve target, eight-character passwords and suggestions for empty chats.

## Decisions and implementation

D-026 supersedes the affected portions of D-025. D-023 defines Android and iOS as delivery targets. The canonical AS data, approval statuses and scoring coefficients were preserved. SharedFinancialCalculator owns the reserve recommendation and recurrence calculation. A single detected subscription charge has no forecast date and leaves essential expenses intact.

Original user wording: “если что не надо hard кодом подправлять под наши bank statments он должен быть динамичным”.

English translation: “Do not hard-code adjustments for our statements. It should work dynamically.”

## Verification and evidence

- Backend and Expo: npm run typecheck. Logs: [backend](../evidence/STATEMENT-ENRICHMENT/server-typecheck.txt) and [Expo](../evidence/STATEMENT-ENRICHMENT/expo-typecheck.txt).
- Backend: npm test. This run passed 350, skipped 2 and failed 1. The existing live AI Evaluation assertion at tests/e2e/live-ai-integration.test.ts:72 did not observe a live response. See [full output](../evidence/STATEMENT-ENRICHMENT/server-tests.txt).
- Backend: npm exec --offline -- vitest run --exclude tests/e2e/live-ai-integration.test.ts. Final result: 35 test files passed, 351 tests passed, 2 platform skips, including all 14 mandatory E2E scenarios. See [final non-live output](../evidence/STATEMENT-ENRICHMENT/final-non-live.txt). The model-chain test injects quota and invalid schema errors, then a valid Other from the final model. It also exercises exhaustion of the chain.
- Backend: npm exec --offline -- tsx src/scripts/benchmark-statement-enrichment.ts --live. The same six synthetic rows scored 4/6 names, 2/6 categories and 3/6 types using the reproduced D-025 offline rule. New local evidence scored 6/6 for each. Live Gemini 3.5 Flash Lite scored 6/6 names, 5/6 categories and 6/6 types. All six rows were represented in each comparison. See [benchmark output](../evidence/STATEMENT-ENRICHMENT/classification-benchmark.txt).
- Local in-memory import used no model calls on personal data. Revolut HUF imported 81 operations, Wise EUR 41 and MBANK KGS 8. There were no unresolved operation rows. Fifteen Revolut discrepancies were explained by the explicit fee column. The remaining discrepancy withheld the closing balance. The input documents and extracted personal records are outside the repository.
- Expo: npm exec --offline -- expo export --platform android --platform ios --output-dir $env:TEMP/vela-statement-enrichment-native. Both native platforms exported. Current Expo Go bundles contained the statement details and expense editor. The public Expo manifest and beta API returned HTTP 200, and the served reset page required eight characters. See [preview probe](../evidence/STATEMENT-ENRICHMENT/expo-preview.json).
- Chrome layout verification was waived by the user after Local browser use reported that it was disabled. No physical-device walkthrough was performed.

## Limitations

The live result is a single synthetic Gemini 3.5 batch. Gemini 3.1 and Gemma failover transitions were verified with controlled transport responses. The benchmark is not a general accuracy estimate. Unknown categories remain editable. No push or deployment was performed. The QR points to the running development preview.
