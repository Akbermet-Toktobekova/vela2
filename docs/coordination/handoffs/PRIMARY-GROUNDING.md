# PRIMARY-GROUNDING handoff

[36-draft baseline audit](../../testing/live-review/primary-grounding/BASELINE-FAILURE-AUDIT.md) · [Gemini 3.5 Flash Lite before and after](../../testing/live-review/primary-grounding/GEMINI-3.5-BEFORE-AFTER.md)

## Changed files

- [primaryProposalContract.ts](../../../server/src/suggestion/primaryProposalContract.ts) defines the strict Zod proposal and three-slot response and derives the provider JSON schema from the same fields.
- [primaryGrounding.ts](../../../server/src/suggestion/primaryGrounding.ts) prepares eligible AS excerpts, canonical support metadata, F019 risks and concrete PI gaps.
- [primarySuggestions.ts](../../../server/src/suggestion/primarySuggestions.ts) validates the envelope and intent-specific references, detects duplicate gaps, records unavailable slots and requires independent semantic support and existing deterministic checks for eligible actions.
- [prompts.ts](../../../server/src/ai/prompts.ts) contains primary.v6 with grounded examples and semantic-checker.v3 with explicit execution and verification mapping.
- [llmClient.ts](../../../server/src/ai/llmClient.ts) passes the provider response schema and can retain raw structured responses in opt-in captures, including schema errors.
- [Shared contracts](../../../shared/contracts/index.ts) distinguishes unavailable slots from actual drafts and deterministic clarification records.
- [Live review runner](../../../server/src/scripts/live-review/run.ts) defaults the isolated primary benchmark to pinned Gemini 3.5 Flash Lite. It checks the frozen inputs, saves raw responses and records Checker, catalog and isolated decision evidence.
- [Source advice tests](../../../server/tests/source-advice.test.ts) cover the exact output shape, malformed arrays, missing and invented references, evidence mismatch, duplicate gaps, safe clarification and non-executing review constraints.

The work follows D-004, D-005, D-008, D-014, D-015, D-018 and D-020. The loaded and frozen policy is prototype_policy_bundle_v1.4. Financial policy and canonical source approvals were used as recorded in the checkout.

## Verification

Run from `server`.

```text
npm run typecheck
Exit code 0

npm test -- --exclude tests/e2e/live-ai-integration.test.ts
Test Files  28 passed (28)
Tests       302 passed (302)
Mandatory E2E scenarios  14 passed (14)

npm exec --offline -- tsx src/scripts/live-review/run.ts --compare-primary --input-run 2026-11-08T16-41-15-473Z --model gemini-3.5-flash-lite
Exit code 0
Run 2026-11-08T18-57-15-171Z
9 shaped CLARIFY drafts, 9 NEEDS_DATA, 0 REJECTED, 0 VALID
A005 critical for Debt, A012 for Strong, A014 for Nora
```

[Typecheck output](../evidence/primary-grounding-typecheck.txt) · [Automated test output](../evidence/primary-grounding-tests.txt) · [Pinned live command output](../evidence/primary-grounding-final-gemini.txt)

The final capture verified that all three model requests retained the saved PI, chat context and eligible AS excerpts, with added grounding metadata. The captured primary requests contain no execution IDs. All five provider calls in the final capture used Gemini 3.5 Flash Lite. Gemma runs had already started under the original scope and were stopped or excluded when the user narrowed live acceptance.

## Limitations

All final drafts were clarifications, so live acceptance exercised evidence prechecks and fallback. It did not exercise live semantic approval of a directly supported action. The test suite covers that decision boundary with controlled inputs. A wider test needs a profile with a verified, directly relevant claim and confirmed financial terms. The known Strong acceptance FX gap belongs to a separate feedback path. The isolated replay does not post feedback or update Today.
