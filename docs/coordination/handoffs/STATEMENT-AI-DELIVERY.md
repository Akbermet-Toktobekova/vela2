# STATEMENT-AI-DELIVERY

## Modified files and decisions

- `server/src/orchestrator/reviewWorkflow.ts` and `server/src/beta/analysis.ts` publish automatic labels and derived subscriptions as soon as the classification stage finishes. The commit checks the current profile version and consent. Existing transaction edits retain priority.
- `server/src/analyzer/transactionClassifier.ts` preserves earlier live labels when the provider chain fails and no stronger local evidence exists.
- `expo-mobile-app/src/BetaApp.tsx` refreshes account data when the background job ends, including a failed review with labels already available.
- `server/tests/automatic-statements.test.ts` exercises upload, background Gemini invocation, downstream failure, saved categories and provider fallback. `server/src/scripts/score-statement-reference.ts` adds an opt-in live probe using an isolated authenticated beta and the original statement hash.
- D-026, D-028 and D-029 apply. No canonical facts or financial formulas changed.

## Exact verification commands and outputs

- In server and expo-mobile-app, `npm run typecheck` exited 0.
- In server, `npm exec --offline -- vitest run --exclude tests/e2e/live-ai-integration.test.ts` passed 36 files and 356 tests with 2 platform skips. All 14 mandatory cases in `tests/e2e/finagent-14-scenarios.test.ts` passed. See [server output](../evidence/STATEMENT-AI-DELIVERY/server-tests.txt).
- In server, `npm exec --offline -- tsx src/scripts/score-statement-reference.ts "<original Wise EUR CSV>" ../docs/coordination/evidence/ANALYTICS-FX/wise-eur-reference.json EUR --live` exited 0. Live Gemini 3.5 Flash Lite returned valid labels for both batches. The isolated authenticated app returned all 41 persisted operations, 5 Other, 27/27 grounded category matches, 40/41 all-category matches and 32/32 economic-type matches. The probe intentionally fails the later pattern stage and reads the saved labels through GET /state. See [Wise live output](../evidence/STATEMENT-AI-DELIVERY/wise-live.json).
- In server, `npm exec --offline -- tsx src/scripts/verify-automatic-labels.ts` exited 0, using live Gemini 3.5 Flash Lite for the synthetic subscription and two transfer candidates. The existing probe writes the default STATEMENT-AUTO capture path. That path now contains the latest synthetic capture, also copied to [live synthetic output](../evidence/STATEMENT-AI-DELIVERY/live-synthetic.json). The separately named first attempt remains available.
- Restarted the authenticated beta preview and started Expo using `node node_modules/expo/bin/cli start --tunnel --port 8083` from expo-mobile-app. The public API health, remote Expo manifest and both local Android and iOS manifests and launch bundles returned 200. Bundles contain the updated background refresh and configured beta API. See [Expo probes](../evidence/STATEMENT-AI-DELIVERY/expo-preview.json).

## Limits and interpretation

The live Wise probe processed the original file locally in memory. It sent minimized classification requests with signed amounts in place of exact values and withheld descriptions for unclear and bank-identified sensitive rows. No original file or output containing a personal name was sent or saved. One bank deposit was labelled as income with the synthetic profile name and was scored separately as an unresolved transfer candidate. A matching real profile name triggers the own-transfer candidate rule, covered by the automatic statements test. The five Other labels describe this run. Existing beta accounts may have other counts from earlier live runs, and a later provider response can vary.

The paid-provider end-to-end recommendation suite was excluded. The statement live probe directly covers the requested model and import path. No Chrome or physical-device checks were performed.
