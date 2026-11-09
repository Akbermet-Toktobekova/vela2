# Gemini 3.5 Flash Lite and three proposal slots

D-018 sets gemini-3.5-flash-lite as the default and pins its requests to that model. Review freshness, agent caches and chat-memory reuse account for the selected model. The earlier Gemini recap and the original baseline remain available.

The primary prompt requests three distinct entries. Clarifications remain NEEDS_DATA and cannot enter financial ranking. Missing slots use labeled deterministic clarifications. Historical responses with fewer proposals remain readable. The recap displays text, provenance and Checker outcomes for every slot.

## Verification

From server, npm run typecheck passed. npm test -- --exclude tests/e2e/live-ai-integration.test.ts passed 295 tests in 28 files, including the 14 mandatory E2E scenarios. After the final freshness-key and memory changes, npm exec --offline -- vitest run tests/gemma-model.test.ts tests/source-advice.test.ts tests/beta-analysis.test.ts tests/beta-review-scheduler.test.ts passed 31 tests in four files.

npm exec --offline -- tsx src/scripts/live-review/run.ts completed run 2026-11-08T16-41-15-473Z. All three profiles returned exactly three primary entries directly from gemini-3.5-flash-lite. Across the run, 29 model calls succeeded and two HTTP 503 responses used deterministic fallbacks. These occurred in one Strong classification batch and Nora's initial assistant context request.

All nine entries lacked verified AS citations. Checker rejected six advisory entries and retained three clarification requests as NEEDS_DATA. Critical coverage and catalog checking produced A005 for Debt, A012 for Strong (EUR 4550 and score 0.58875), and A014 for Nora. Every live response was verified as gemini-3.5-flash-lite. Report links resolve.

See RECAP.md, SEVEN-STAGES.md and MODEL-COMPARISON.md under docs/testing/live-review. The financial formulas and canonical AS records are unchanged.
