# PRIMARY-CONTRADICTION handoff

D-021 adopts contradiction checking for primary advice. The primary generator and semantic checker receive minimized PI and applicable verified AS. A grounded, non-executing review can pass when AS is silent. Source links are included only for verified claims identified as directly supportive. The catalog branch requires three REJECTED slots. A missing fact, provider failure, or unavailable execution contract yields NEEDS_DATA. Critical coverage still runs independently.

## Changes

- `server/src/ai/prompts.ts` aligns shared prompts with their runtime roles and schemas. Debt returns focus labels for deterministic rendering. The primary and checker prompts distinguish source silence from contradiction.
- `server/src/suggestion/primarySuggestions.ts` checks references and explicit ISO dates against the cited facts, records specific contradiction references, and no longer maps proposals to the catalog. It preserves the existing read-only safety gate. EXECUTE cannot publish without a verified execution contract.
- `server/src/suggestion/primaryProposalContract.ts` retains three structured slots and permits an empty claim list for a PI-grounded review. `shared/contracts/index.ts` permits empty advisory source lists and adds the new contradiction and fallback trace fields while retaining older trace values.
- `server/src/orchestrator/reviewWorkflow.ts` uses the catalog only when the primary result reports three rejections and applies the same gate to deterministic catalog fallback. It renders profile-grounded advice without claiming a source was cited.
- The live runner preserves prior recaps, supports a pinned, paced beta run, and records the isolated Checker and decision after rerunning primary. The feedback regression fixtures enter the catalog branch through explicit Checker rejections, preserving their original lifecycle assertions.

[Prompt and runtime audit](../../testing/live-review/primary-grounding/PROMPT-CONTRACT-AUDIT.md)

## Verification

From `server`:

```text
npm run typecheck
Exit code 0
npm test -- --exclude tests/e2e/live-ai-integration.test.ts
28 files, 304 tests passed, including all 14 mandatory E2E scenarios
npm exec --offline -- tsx src/scripts/live-review/run.ts --run-recap --model gemini-3.5-flash-lite
Exit code 0. Full authenticated beta capture 2026-11-08T20-06-05-430Z before the ISO-date guard.
npm exec --offline -- tsx src/scripts/live-review/run.ts --compare-primary --input-run 2026-11-08T16-41-15-473Z --model gemini-3.5-flash-lite
Exit code 0. Final isolated capture 2026-11-08T20-10-00-710Z.
9 actual drafts, 3 VALID, 5 NEEDS_DATA and 1 REJECTED. Catalog skipped for all profiles.
```

`npm run build` passed in `react-app`. `npm run typecheck` passed in `expo-mobile-app`. The separate provider integration test was excluded from the deterministic suite. The three-profile captures exercised the live provider. `git diff --check` passed.

[Server tests](../evidence/primary-contradiction-tests.txt) · [Server typecheck](../evidence/primary-contradiction-typecheck.txt) · [Web build](../evidence/primary-contradiction-web.txt) · [Mobile typecheck](../evidence/primary-contradiction-mobile.txt) · [Full live log](../evidence/primary-contradiction-paced-live.txt) · [Final live log](../evidence/primary-contradiction-final-live.txt) · [Nine drafts and decision traces](../../testing/live-review/primary-grounding/CHECKER-LIVE-RESULTS.md)

## Limitations

An early live Checker missed a wrong year in a Debt proposal. The new deterministic guard rejects ISO dates absent from cited PI. The semantic checker still determines whether a known date belongs to the claimed event and whether a proposal accurately describes context. Critical coverage still uses its existing source mappings, including the A005 CFPB citation in the EU Debt fixture.
