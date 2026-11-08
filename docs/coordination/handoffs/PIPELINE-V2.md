# PIPELINE-V2 implementation checkpoint

Date 2026-11-08. The task is DONE. The checkpoint history below records intermediate failures and fixes.

## Implemented

The runtime now separates transaction classification, deterministic pattern observations, AI pattern interpretation, Behavior interpretation, debt calculation and Debt summary. Classification processes every batch and preserves confirmed labels. Aggregates are rebuilt before downstream generation.

Versioned English prompts cover the analysis roles, source-based proposals, independent semantic checking, catalog selection, contextual complexity, memory and beta Assistant. The primary request excludes Action Catalog references. Execution mapping occurs in the checking stage.

Encrypted stage artifacts store financial reference time, actual execution time, dependencies, structured output, model provenance and summary. Conversation memory cites user messages and remains context. Feedback has an authoritative engine history and a compatibility PI projection. The chat deletion endpoint clears dependent memory.

Historical FX uses the valuation date and rejects future quotes. Debt calculations distinguish missing APR and accrual information from confirmed zero interest. Emergency and liquid coverage have separate fields.

The runner captures actual runtime inputs and outputs, reads artifacts back from SQLite and exports English Markdown plus JSON. Individual stage replay was verified on Strong classification.

## Verification

From server:

- npm run typecheck — exit code 0.
- npm test -- --exclude tests/e2e/live-ai-integration.test.ts — 26 files passed, 285 tests passed, including all 14 mandatory E2E scenarios.
- npm exec --offline -- tsx src/scripts/live-review/run.ts --profile strong --stage classification --mode replay --input-run 2026-11-08T15-22-45-737Z — exit code 0.

From react-app, npm run build passed. From expo-mobile-app, npm run typecheck passed.

The preceding full npm test run passed 285 tests and timed out in the separate live AI integration test after 60 seconds.

## Intermediate checkpoint history

Earlier runs identified masked JSON corruption, lost synthetic goal allocations, inconsistent coverage inputs and missing artifact retention validation. These issues were resolved in finalization. The earlier 60-second live test timeout is retained as historical evidence. Final verification and the accepted capture appear below.

## Finalization verification — 2026-11-08

The full command npm test passed 293 tests in 28 files, including the live Gemini integration test and all 14 mandatory E2E scenarios. Exact output is retained in ../evidence/pipeline-full-final.txt. npm run typecheck passed, with output in ../evidence/pipeline-typecheck-final.txt. Web production build and mobile typecheck also passed, with corresponding pipeline-web-build.txt and pipeline-mobile-typecheck.txt evidence.

Storage acceptance adds seven tests for migration, malformed documents, atomic writes, user boundaries and safe artifact pruning. The formula audit fixed weight selection to use total-liquid F002 coverage with converted essential expenses, removed implicit snapshot overrides, required verified debt accrual and stopped native-currency fallback in goal comparison. Test scenarios now set actual balances and expenses instead of overriding a summary field.

Nora fixture loading now preserves its original EUR600 allocation through the synthetic repository setup after authenticated profile/import validation. A complete three-profile capture is being recorded after this correction. The fixture correction does not change production PI write permissions.

English documentation conversion and local-link validation passed. The source package and original user quotes retain their original language. Git history is preserved.

Supabase preparation supplies a credential-free example and ignores server/.env.postgres.local. The current runtime remains SQLite, and PostgreSQL integration will use the requested Supabase target in a subsequent migration task.


## Final accepted capture

Completed run 2026-11-08T15-45-05-944Z contains 27 reports per profile (Debt, Strong and Nora), with exact JSON captures and encrypted SQLite readbacks. All recap, seven-stage and formula-guide local links resolve. Report scanning found no configured API secrets. Nora's original EUR600 emergency allocation is present.

Final decisions are A005 for Debt, A012 for Strong (EUR4550, score0.58875), and A014 for Nora. The run contains 33 live model responses and one explicitly recorded provider-schema fallback in Nora's contextual Assistant call. That call returned too many fact IDs. The financial pipeline finished and records actual fallback provenance.

Published reports are docs/testing/live-review/RECAP.md, SEVEN-STAGES.md, FORMULAS.md and PI-STORAGE.md. The original baseline remains linked. New uncertainty conditions remain visible and do not manufacture a monetary score.

Implementation choices include 40-operation request batches, a synthetic-only longer review deadline, and recorded-output replay for authenticated API checkpoints. Those checkpoints are freshly executed by full authenticated profile runs. Numerical policies remain preliminary and unchanged. PostgreSQL is prepared with a local environment-file example and remains a separate integration task.
