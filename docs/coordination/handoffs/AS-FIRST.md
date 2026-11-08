# AS-FIRST handoff

Implemented D-015 on the review entry point used by beta and the local backend. The primary model receives dated PI facts and jurisdiction-eligible VERIFIED AS excerpts, then a separate structured call checks proposals that pass the deterministic evidence prechecks. Catalog-backed proposals still use the existing Checker. A safe supported review or learning step can be published as source-backed advice without an action ID. Today shows canonical source links, and Accept/Complete/Decline use the existing feedback path. Completion of advice records feedback without writing financial PI.

The existing catalog selector runs when zero primary proposals pass. Critical coverage stays independent. The bundle version is v1.3 to prevent reuse of pre-D-015 reviews. Canonical AS and numeric policy parameters were preserved.

## Modified areas

- Primary suggestion generation and checking, review orchestration, trace and recommendation contracts.
- Web and native Today cards and feedback compatibility for source-backed advice.
- SPEC, decisions, Board, synthetic inspection harness, comparison and evidence.

## Verification

- In server, `npm run typecheck` exited 0. `npm test` passed 271 tests in 26 files. This includes 14/14 mandatory E2E scenarios and seven new AS-first tests. [Actual output](../evidence/CLI-REVIEW/as-first-tests.log)
- In react-app and expo-mobile-app, `npx tsc --noEmit` exited 0 for each.
- In server PowerShell, set `$env:LLM_PROVIDER='gemini'` and run `cmd.exe /d /c 'npx tsx src/scripts/inspect-review.ts --live > ../docs/coordination/evidence/CLI-REVIEW/as-first-live.log'`. Exit 0. Four live calls, two proposals without AS references rejected, one advice approved and published, catalog fallback skipped. [Actual output](../evidence/CLI-REVIEW/as-first-live.log)

## Boundaries

Independent model verification is a semantic check over canonical excerpts. A missing, inapplicable or unsupported citation does not pass. Advice requiring an executable amount or financial safety model needs a deterministic binding and checks. If a proposed catalog action has no supported binding for its cited target, the trace records NEEDS_DATA. The synthetic run verifies the recommendation and its sources via the backend, with the client changes checked by typechecking.
