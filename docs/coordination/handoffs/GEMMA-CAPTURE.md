# GEMMA-CAPTURE handoff

## Deliverables

- [Gemma runtime recap](../../testing/live-review/gemma-4-31b/RECAP.md) and [seven-stage evidence](../../testing/live-review/gemma-4-31b/SEVEN-STAGES.md).
- [Primary proposals for all four models](../../testing/live-review/gemma-4-31b/PRIMARY-COMPARISON.md), with separate model folders.
- [Seven-stage implementation assessment](../../testing/live-review/PIPELINE-ASSESSMENT.md) and [file index](../../testing/live-review/FILE-INDEX.md).
- Capture code in `server/src/scripts/live-review/`. The LLM client accepts optional pinned model, HTTP, stream and thinking options for isolated testing. D-018 still controls the default model. D-019 covers the comparisons.

## Actual results

The authenticated beta run `2026-11-08T17-06-47-634Z` saved 81 stage records in Markdown and JSON. It recorded 2 accepted live responses from Gemma 31B and 10 from Gemma 26B, with 71 failed or invalid attempts. The full trace selected A005 for Debt, A012 for Strong at EUR4550 with F017 score 0.58875, and A014 for Nora on the EUR10.99 Sound Library charge. All primary drafts in that full run failed eligibility. Debt and Nora acceptance succeeded. Strong's separate acceptance revalidation returned `ACCEPTANCE_REVALIDATION_FAILED`, also present in the previous two captures.

The isolated comparison validated 12 live generator responses, 36 actual drafts and 36 verdicts. For each profile, all four models used identical system and user prompts from `2026-11-08T16-41-15-473Z`. Gemini 3.5 Flash Lite had 6 REJECTED and 3 NEEDS_DATA. Gemini 3.1 Flash Lite had 5 REJECTED and 4 NEEDS_DATA. Gemma 31B had 6 REJECTED and 3 NEEDS_DATA. Gemma 26B had 6 REJECTED, 2 NEEDS_DATA and 1 VALID. Its valid draft concerned financial education for Debt. The isolated comparison ends at Checker.

Gemma 31B returned live generator results on minimal thinking for Strong and Nora, and on minimal thinking with streaming for Debt. The attempts include one HTTP 429 for Nora in the standard comparison. The runner pauses 61 seconds before retrying a rate-limit response. The next standard attempt returned a server error. Other attempts recorded server errors, timeouts or invalid streaming output. Per-attempt Markdown and JSON preserve the provenance.

## Verification

Commands from `server` and observed results:

```text
npm run typecheck
exit code 0

npm test -- --exclude tests/e2e/live-ai-integration.test.ts
Test Files  28 passed (28)
Tests       296 passed (296)

npm exec --offline -- vitest run tests/gemma-model.test.ts tests/source-advice.test.ts tests/e2e/finagent-14-scenarios.test.ts
Test Files  3 passed (3)
Tests       29 passed (29)
Mandatory end-to-end scenarios: 14 passed (14)
```

The live and replay commands:

```text
npm exec --offline -- tsx src/scripts/live-review/run.ts --gemma-comparison
npm exec --offline -- tsx src/scripts/live-review/run.ts --profile debt --stage suggestion-generator --input-run 2026-11-08T17-06-47-634Z --mode replay
npm exec --offline -- tsx src/scripts/live-review/run.ts --compare-primary --input-run 2026-11-08T16-41-15-473Z
npm exec --offline -- tsx src/scripts/live-review/run.ts --compare-primary --input-run 2026-11-08T16-41-15-473Z --model gemma-4-31b-it --stream
npm exec --offline -- tsx src/scripts/live-review/run.ts --compare-primary --input-run 2026-11-08T16-41-15-473Z --model gemma-4-31b-it --minimal-thinking
npm exec --offline -- tsx src/scripts/live-review/run.ts --compare-primary --input-run 2026-11-08T16-41-15-473Z --model gemma-4-31b-it --profile debt --minimal-thinking
npm exec --offline -- tsx src/scripts/live-review/run.ts --compare-primary --input-run 2026-11-08T16-41-15-473Z --model gemma-4-31b-it --profile debt --minimal-thinking --stream
```

The recorded Debt generator replay reproduced the exact output without a network call. Local report link validation and `git diff --check` passed. See [actual execution log](../evidence/gemma-comparison-live.txt), [isolated comparison log](../evidence/gemma-primary-comparison-live.txt) and the file index for recovery logs.

Offline `ActionChecker.validateCandidate` with Strong's captured candidate and review context returned `VALID`. Omitting only `calculatorExtras.fxRates` returned `NEEDS_DATA` with `verified_fx_rate_HUF`. The feedback path takes calculator extras from PI and the captured PI extras lack the rate. This is a follow-up on consistent acceptance context.
