# TODAY-QUALITY handoff

## Scope and recorded decisions

Implemented the user-approved recommendation audit plan under D-022. Project-authored changes are English. Original fixtures, historical logs and pre-existing uncommitted changes remain preserved. No commit, PostgreSQL migration, real financial operation, AS approval/status change or numerical policy recalibration was performed.

DB_FACT remains in the canonical AS database. D-022 records product selection and EU issuer-contact behavior. Existing prototype policy v1.4 remains preliminary; this task does not change its parameters. SharedFinancialCalculator retains formula ownership.

## Modified and created files

- `shared/contracts/index.ts`, `shared/pi/types.ts`, `shared/calculator/index.ts`: usefulness traces, clarification routing, confirmed synthetic contribution context and complete dated payment coverage using existing arithmetic.
- `server/src/suggestion/primaryExecution.ts`: exact supported operation-to-contract mapping and shared existing optional-action sizing.
- `server/src/suggestion/{primaryGrounding,primaryProposalContract,primarySuggestions}.ts`: PI field references, open next steps, primary execution checking, semantic output schema and separate usefulness.
- `server/src/suggestion/suggestionGenerator.ts`: existing sizing reuse and respect for confirmed contribution inputs.
- `server/src/ai/prompts.ts`: primary v11 and semantic Checker v7 responsibilities and structured outputs.
- `server/src/ai/assistantAgent.ts`: remove fabricated default source/rule identifiers from explanations.
- `server/src/{checker/actionChecker,decision/decisionEngine,orchestrator/reviewWorkflow}.ts`: funded/shortfall critical branches, source scope, Today ordering, clarification propagation and shared FX validation for monetary feedback.
- `server/src/fx/frankfurterService.ts`, `server/src/beta/analysis.ts`: reuse historical quote validation and injectable synthetic FX service.
- `server/src/scripts/live-review/{profiles,run,stageReplay}.ts`: paired profiles, complete captures, execution mapping replay, best-effort initial Assistant request and safe temporary job/database shutdown.
- `react-app/src/types/pi.ts`, `react-app/src/components/dashboard/TodayView.tsx` and `expo-mobile-app/src/screens/TodayScreen.tsx`: clarification presentation and existing balance-update navigation.
- `server/tests/source-advice.test.ts`, `server/tests/today-quality.test.ts`, `server/tests/e2e/finagent-14-scenarios.test.ts`: targeted regression coverage and explicit US source fixture.
- `docs/SPEC.md`, `docs/coordination/{BOARD,DECISIONS,synthetic-report}.md`, `user-inputs/synthetic/backend-review/VARIANT-EXPECTATIONS.md`: decisions, ownership and predeclared expected outcomes.
- `docs/testing/live-review/today-quality/`: recap, per-profile actual results, seven-stage evidence, calculation example, assessment and reproducible offline report builder. Full immutable stage captures remain under `docs/testing/live-review/runs/`.

## Exact verification commands and actual results

From `server`:

```text
npm run typecheck
> tsc --noEmit
Exit 0.

npm test
> vitest run
Test Files  30 passed (30)
Tests       314 passed (314)
Start at    22:23:09
Duration    25.89s
```

All 14 mandatory E2E scenarios are included in the full suite. Focused source-advice verification also passed 23 tests. Raw output: [typecheck](../evidence/today-quality-typecheck.txt), [full tests](../evidence/today-quality-tests.txt), [focused](../evidence/today-quality-focused.txt).

From `react-app`: `npm run build` — exit 0, Vite production build completed. From `expo-mobile-app`: `npx tsc --noEmit` — exit 0. [Web output](../evidence/today-quality-web.txt), [mobile output](../evidence/today-quality-mobile.txt). No interactive browser or device validation is claimed.

`git diff --check` passed; Git reports a line-ending advisory for the shared PI file, not a whitespace error.

## Live commands and results

From `server`:

```text
npm exec --offline -- tsx src/scripts/live-review/run.ts --run-recap --model gemini-3.5-flash-lite
npm exec --offline -- tsx src/scripts/live-review/run.ts --run-recap --model gemini-3.5-flash-lite --profile strong
npm exec --offline -- tsx src/scripts/live-review/run.ts --run-recap --model gemini-3.5-flash-lite --variant <variant>
```

Variants: `debt-funded`, `debt-us`, `strong-confirmed`, `strong-missing-fx`, `nora-fresh`. Only pinned Gemini 3.5 Flash Lite was used. Original baseline final captures: Debt/Nora `2026-11-08T20-50-32-315Z`, Strong completed retry `2026-11-08T21-16-59-426Z`. Nine actual model-origin proposals: 1 VALID (WEAK), 7 NEEDS_DATA, 1 REJECTED. Today selects neutral issuer contact for Debt, EUR 4550 Education contribution for Strong, and a subscription verification for Nora.

Paired results: funded Debt A001 EUR65; US Debt A005 with applicable S004; confirmed Strong primary A012 EUR500, score 0.23865, Accept successful and Adjust EUR400 successful; unavailable HUF FX NEEDS_DATA, monetary acceptance blocked; fresh Nora A014 without the stale-balance question. Detailed trace links and all stage files: [RECAP](../../testing/live-review/today-quality/RECAP.md).

The first all-profile acceptance batch failed Strong's initial Assistant call with HTTP504. The first confirmed-Strong review timed out and exposed a temporary-database shutdown race. Successful completed retries are identified above and in the recap; failed attempts remain preserved and are not counted among the nine final proposals.

The source-label formatter correction was verified after the live captures with actual deterministic stage replays:

```text
npm exec --offline -- tsx src/scripts/live-review/run.ts --stage explanation --profile debt --input-run 2026-11-08T20-50-32-315Z --mode replay
npm exec --offline -- tsx src/scripts/live-review/run.ts --stage explanation --profile strong --input-run 2026-11-08T21-19-03-637Z --mode replay
```

Both succeeded without network requests. Original live captures are unchanged. Corrected outputs: Debt `2026-11-08T21-22-35-462Z`, confirmed Strong `2026-11-08T21-22-54-857Z`.

From repository root: `python docs/testing/live-review/today-quality/build_report.py` produced the final linked reports from actual captures.

## Limits and next development stage

Primary is not independently production-ready: none of the nine original-profile proposals was a useful valid primary action. The confirmed Strong pair demonstrates a successful primary financial path, but the system still depends heavily on independent critical coverage and catalog recovery. No model-compliance or approval-rate guarantee is made.

The confirmed Strong complexity batch was incomplete. Existing labelled catalog factors produced F016 complexity 0.1125 and F017 score 0.23865; the score is not entirely based on live contextual AI factors. A single scored candidate's 100% stability does not establish financial-shock robustness or comparative superiority. See [actual formula example](../../testing/live-review/today-quality/CALCULATION-EXAMPLE.md).

Execution mapping covers A012 and A002 only. Synthetic confirmed-contribution extras need a reviewed product input form for normal use. The adjusted record preserves its original title and suggested amount alongside the separately saved adjusted amount; presentation merits an interactive follow-up. Full source decisions, evidence statuses and current numerical policy restrictions remain authoritative.
