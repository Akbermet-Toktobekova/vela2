# Vela seven-stage implementation assessment

The later D-022 recommendation-quality implementation has a separate [updated assessment](today-quality/ASSESSMENT.md), [actual recap](today-quality/RECAP.md) and [seven-stage executed evidence](today-quality/SEVEN-STAGES.md). The evaluation below is retained as historical context.

Ratings reflect engineering judgment based on the acceptance tests and three synthetic profiles. The readiness criterion under each item describes what would warrant a 10. Previous ratings appear where the earlier evaluation recorded a score. Model-draft judgments and the F017 ranking score measure different things.

[Four-model draft comparison](gemma-4-31b/PRIMARY-COMPARISON.md) · [Gemma runtime recap](gemma-4-31b/RECAP.md) · [Seven-stage evidence](gemma-4-31b/SEVEN-STAGES.md) · [Earlier results](old/RECAP.md) · [Formula guide](FORMULAS.md) · [Storage map](PI-STORAGE.md) · [All files](FILE-INDEX.md)

## Stage 1 — Personal Information Database

### 1. Import — 9/10 · Previously 8/10

**What it does** Parses supported statements deterministically. Accepted transactions retain their original currency, date, description and source locator. Tests cover replayed files, overlapping statements, legitimate equal rows, PDF page provenance, and partial imports.

**What to improve** Make balance reconciliation and the reason for every skipped or rejected row equally easy to inspect across formats.

**Next steps** Compare opening balance, accepted movement and closing balance per account and currency on real export fixtures. Include refunds, pending versus posted rows, same-day duplicates and own-account transfers. Show discrepancies in import review.

**Readiness criterion** A user can reconcile each accepted balance and transaction to source data and can resolve every material import omission from the review.

### 2. Personal Information — 8/10 · Previously 7/10

**What it does** Stores versioned financial facts and provides the snapshot used by the pipeline. Analysis, classifications, allocations, chat context and feedback retain separate ownership and can be assembled through references.

**What to improve** Make the winning source, conflicting facts and freshness visible for every field that can affect a decision.

**Next steps** Trace balance, income, obligation and debt fields from import or confirmation to the snapshot. Verify zero, null, stale and conflicting cases independently. Expose which source won where multiple values exist.

**Readiness criterion** A reviewer can identify the exact value, origin, freshness and snapshot version for every fact used in a recommendation.

### 3. Encrypted artifact storage and database mapping — 8/10

**What it does** Stores versioned stage outputs and summaries separately from primary PI. Tests cover atomic migration, encryption, retention of published evidence and safe pruning. The storage map identifies the actual SQLite fields and proposed PostgreSQL destinations.

**What to improve** Verify long-running retention and recovery with representative history. The Supabase mapping is ready for separate integration work.

**Next steps** Exercise backup and restore with several generations of published and unpublished artifacts. Verify deletion and replay across users. Validate the proposed mapping on a dedicated test database when that integration is scheduled.

**Readiness criterion** Recovery preserves ownership, provenance, readable current context and exactly the historical evidence still referenced by decisions.

## Stage 2 — Automatic Review Orchestrator

### 4. Scheduling, dependencies and publication guard — 8/10

**What it does** Detects changed inputs, rebuilds classification-dependent aggregates, reuses compatible stage results and rejects publication from an older snapshot. Financial reference time and execution time are recorded separately.

**What to improve** Make cache reuse and invalidation reasons easier to follow at the individual stage level.

**Next steps** Record before-and-after traces for a category edit, chat-only edit, prompt update, FX date change and concurrent PI update. Compare the stages refreshed against their declared inputs.

**Readiness criterion** Each edit refreshes its actual dependents and a superseded review cannot replace the current Today action.

## Stage 3 — Financial Analyzer

### 5. Transaction Classification — 7/10

**What it does** Processes relevant transactions in tracked batches, preserves confirmed classifications, validates IDs and rebuilds affected totals. Regression tests exercise transactions beyond the initial batch and mixed currencies.

**What to improve** Improve batch recovery and make unresolved classifications actionable. Several Gemma batches used deterministic handling after provider errors.

**Next steps** Measure processed, resolved and unresolved rows per batch and provider. Compare labels against reviewed fixtures and recover a failed batch independently from its captured input.

**Readiness criterion** Every relevant row has a traceable outcome, all user overrides survive, and partial classification cannot look complete.

### 6. Pattern Recognition — 8/10

**What it does** Builds deterministic observations and allows AI to interpret only cited observations. Tests verify currency separation, partial-period handling and rejection of out-of-snapshot references.

**What to improve** Give hypotheses and coverage limitations clearer visibility when the interpretation is incomplete or unavailable.

**Next steps** Replay irregular salary, repeated merchant, fee and incomplete-month fixtures. Verify that every explanation cites the appropriate observation and every unconfirmed pattern leads only to clarification.

**Readiness criterion** All findings trace to compatible observations and no hypothesis creates an expected payment, a saving or a critical trigger on its own.

### 7. Behavior Agent — 7/10

**What it does** Interprets observed patterns against confirmed goals and classifications. It can explain the impact of known timing and ask for context.

**What to improve** Improve concise, profile-specific summaries when inputs are partial and make deterministic versus model-authored summaries easy to distinguish.

**Next steps** Compare the actual outputs for Debt, Strong and Nora against the same observations. Check that future bills are described as scheduled and that each implication cites the goal or obligation it concerns.

**Readiness criterion** Every behavioral implication has evidence, dates and scope, with useful clarification when the available record is incomplete.

### 8. FX — 9/10

**What it does** Requests historical valuation quotes when needed, separates quote date from retrieval time, and rejects quotes after the valuation date. Mixed-currency observations remain scoped unless a conversion basis exists.

**What to improve** Expand coverage of market closures, stale quotes and unavailable pairs in the end-to-end evidence.

**Next steps** Replay the same EUR/HUF profile across a weekend, a stale quote and a missing quote. Check the value and freshness status in the calculator, Checker and decision trace.

**Readiness criterion** Every converted amount points to its actual quote and no missing or future rate affects a published monetary result.

### 9. Shared Financial Calculator — 9/10

**What it does** Calculates liquid coverage, dedicated reserve, reserve coverage and optional cash separately. Strong demonstrates that total cash coverage can be positive while the dedicated emergency reserve is zero.

**What to improve** Expose a concise bridge from balances and dated obligations to the capacity used to size an action.

**Next steps** Verify the same bridge in the calculator, candidate builder and final explanation for one baseline, one accepted commitment and one mixed-currency case.

**Readiness criterion** Each figure states its currency and reference date and reconciles to the same recorded inputs across all consuming stages.

### 10. Debt Calculator — 8/10 · Previously 6/10

**What it does** Uses `SharedFinancialCalculator` to simulate dated debt effects. Tests distinguish unknown APR and accrual terms from a confirmed zero rate and separate baseline interest, avoided interest and principal.

**What to improve** Make unsupported contract features and missing fee, promotion or accrual data more specific in the result.

**Next steps** Verify a confirmed zero-rate promotion, an unknown accrual status and a known minimum with missing future dates. Record which result can be calculated and what fact is still needed.

**Readiness criterion** Every amount can be reproduced from verified contract terms and the snapshot date, or carries an explicit limitation.

### 11. Debt Agent — 7/10

**What it does** Summarizes deterministic debt outputs, supporting facts and missing inputs. The runtime capture shows labelled fallback when a provider fails.

**What to improve** Improve the usefulness and reliability of the summary for multiple debts or conflicting terms.

**Next steps** Compare each model summary to its exact debt-calculator inputs. Flag mismatched numbers and dates automatically and require the summary to distinguish the baseline from a proposed action.

**Readiness criterion** Every factual sentence traces to the matching calculation and uncertainty is visible on the relevant debt.

## Stage 4 — AI Suggestion Generator

### 12. Approved Sources and context assembly — 8/10

**What it does** Supplies minimized confirmed PI, current analysis, feedback and contextual memory alongside eligible AS excerpts. Canonical source IDs and approvals govern the evidence available to the generator.

**What to improve** Make the reason an excerpt is applicable, unavailable or out of scope explicit for the user and the model.

**Next steps** Audit profiles where a useful local fact lacks an applicable approved claim. Add explicit positive and negative applicability examples using already approved material, then check citation precision in the fixed-input comparison.

**Readiness criterion** Each supporting claim is eligible and relevant to the exact action and its jurisdiction and circumstances.

### 13. Primary Suggestion Generator — 6/10

**What it does** Requests three distinct slots from PI and verified AS. It preserves actual drafts separately from deterministic clarification slots. The primary request excludes catalog templates and execution IDs.

**What to improve** The comparison produced 36 actual drafts and only one VALID verdict. Missing applicable references, malformed `missingInfo` and suggestions that were too generic limited their usefulness.

**Next steps** Align the model-visible examples and structured shape, especially `missingInfo`. Give the model a verified-claim example and a grounded clarification example. Replay the same inputs and track distinct, evidence-supported, actionable outputs separately from format success.

**Readiness criterion** Three slots remain traceable, and an unsupported action becomes a specific clarification rather than an apparently executable draft.

### 14. System prompts and output contracts — 7/10

**What it does** Defines separately versioned English prompts for analysis, generation, checking, selection, complexity, memory and Assistant. Runtime code checks identifiers, data shape and publication eligibility.

**What to improve** Some models followed the overall envelope while returning invalid nested fields. Prompt examples need to cover structured output and failure cases role by role.

**Next steps** Add a valid array example and an invalid scalar example for `missingInfo`, and run fixed-input schema checks for each supported model. Track the prompt version with each change and report behavioral regressions.

**Readiness criterion** Prompt and code contracts agree, and malformed or unsupported output consistently fails closed with an intelligible reason.

## Stage 5 — Checker and Critical Action Coverage

### 15. Checker — 8/10

**What it does** Checks structure, references, support, eligibility, affordability and the execution contract. Semantic verification runs separately. Results show per-draft verdicts and reasons.

**What to improve** Explain multiple relevant failure causes in plain language and expose when the semantic verifier was unavailable.

**Next steps** Replay malformed proposals, an existing but irrelevant source, insufficient cash and a missing semantic verdict. Check the individual reasons and the effect on eligibility and fallback.

**Readiness criterion** A reviewer can reproduce each verdict and identify what evidence or action change would resolve a fixable failure.

### 16. Catalog Selector — 8/10

**What it does** Runs a separate selection branch when zero primary drafts pass. It receives supported candidates with code-calculated values. Selected candidates still pass mandatory checking.

**What to improve** Make the proposed shortlist, removed items and deterministic fallback branch clearer in the decision summary.

**Next steps** Capture a valid primary branch, a catalog AI branch and a catalog provider failure on the same profile with controlled inputs. Compare shortlist membership and every candidate's check result.

**Readiness criterion** Every catalog result explains its trigger, model or fallback origin and independent check outcome.

### 17. Critical Action Coverage — 9/10

**What it does** Detects existing critical conditions independently of generation. Debt demonstrates A005 with EUR20 available against a EUR65 required minimum.

**What to improve** Put the exact deadline, shortfall and critical reason next to the action in Today.

**Next steps** Replay the approved critical cases with generation unavailable and with a competing valid draft. Compare the trigger, ordering and Today explanation with the recorded facts.

**Readiness criterion** Every applicable critical action survives generator failure, passes its mandatory checks and exposes the facts that determined priority.

## Stage 6 — Final Recommendation Engine

### 18. Priority, safety and decision branches — 9/10

**What it does** Routes checked candidates into critical, ordinary financial, verification or source-backed advisory branches. The Gemma run demonstrates the first three branches.

**What to improve** Make branch selection and the reason each alternative lost equally visible in the compact decision trace.

**Next steps** Replay a fixture with a critical action, a valid advisory draft and a scored financial alternative. Verify branch ordering and the reasons for each unselected action.

**Readiness criterion** Every displayed action and every blocked branch can be explained from checked inputs and the current policy version.

### 19. Weight Calculator — 8/10

**What it does** Chooses the existing importance profile with hysteresis. Strong used goal advancement weights of 0.20, 0.20 and 0.60 for resilience, avoided cost and goal progress.

**What to improve** Document boundary transitions and how much the preliminary weight choices affect genuinely competing actions.

**Next steps** Replay values on both sides of each approved entry and exit boundary. Capture the decisive PI, prior profile and resulting weights. Review calibration separately from formula correctness.

**Readiness criterion** Profile choice is reproducible and every change or retained profile identifies the condition that decided it.

### 20. Impact Calculator — 9/10

**What it does** Compares the baseline with an action scenario. R measures reserve coverage effects, F measures verified avoided costs, and G measures goal progress. Tests cover dated debt, transfers, subscriptions and insufficient terms.

**What to improve** Make the cash-flow and coverage assumptions behind each effect available directly from the user-facing explanation.

**Next steps** Verify at least one multi-currency action, a confirmed cancellation with an exit fee, and an unknown debt term. Reconcile each baseline and action scenario over the agreed horizon.

**Readiness criterion** Every benefit has a reproducible counterfactual and monetary effects are unavailable where their inputs are unsupported.

### 21. AI Complexity Evaluation — 6/10

**What it does** Requests contextual time, steps, dependencies and ongoing effort in one batch. Code calculates their average and records UNKNOWN factors or the existing catalog baseline. Strong's recorded complexity was 0.1125.

**What to improve** Recover more usable factor assessments and show which parts of the score came from baseline values.

**Next steps** Run a common candidate set with known execution steps and confirm the factor evidence, range and UNKNOWN behavior. Inspect variation across repeated model calls without changing the weighting formula.

**Readiness criterion** Each assessed factor has specific supporting context and every fallback factor is individually identified.

### 22. Ranking and normalization — 9/10

**What it does** Applies F017 to normalized R, F and G and subtracts the complexity penalty. Strong's normalized goal value was 1 and its final score was 0.58875.

**What to improve** Explain saturation clearly. Different contribution amounts can produce the same normalized goal benefit after clipping.

**Next steps** Compare several eligible actions with different raw impacts and trace the scales, clipping, weights and deductions. Keep the configured policy version visible.

**Readiness criterion** A reviewer can reconstruct each score and explain how the recorded weights and scale limits affected ranking.

### 23. Robustness — 8/10

**What it does** Tests sensitivity to existing weight perturbations. Strong's 200 out of 200 wins came from a single scored candidate.

**What to improve** Show when stability has little comparative meaning and make the sensitivity scope clear.

**Next steps** Compare multiple eligible candidates with near ties and weight-sensitive wins. Verify conservative publication behavior on an unstable case.

**Readiness criterion** The trace explains which assumptions varied and whether the winner was tested against meaningful alternatives.

## Stage 7 — Proactive Recommendation and Feedback

### 24. Today action and explanation — 8/10

**What it does** Publishes one primary action with reasoning and relevant source links. The three profile logs show one critical, one scored financial and one verification outcome.

**What to improve** Improve target specificity and show the single most important reason or missing fact before the full trace.

**Next steps** Review Today wording for Debt's shortfall, Strong's allocation and Nora's specific subscription. Check the explanation against the actual selected branch and source record.

**Readiness criterion** The user can identify the action, target, timing, assumptions and actual effect at a glance.

### 25. Feedback — 8/10 · Previously 8/10

**What it does** Records intent, adjustment, decline and separate completion in authoritative history exposed to future review. Tests cover adjusted amounts, idempotency and rollback.

**What to improve** Debt and Nora accepted their selected actions. Strong's A012 was published, then its acceptance was blocked by `ACCEPTANCE_REVALIDATION_FAILED`, as in earlier captures. Offline validation reproduced `VALID` with the review's historical EUR/HUF quote and `NEEDS_DATA` with `verified_fx_rate_HUF` when that quote was omitted. [Strong feedback log](runs/2026-11-08T17-06-47-634Z/strong/feedback.md)

**Next steps** Resolve the applicable FX quote for the acceptance recheck as the review does. Verify that a still-valid A012 can be accepted and that missing or stale evidence still blocks the action. Compare one adjusted, declined and completed action across two review cycles.

**Readiness criterion** Each user response is applied once, only supported completion updates bookkeeping, and future decisions explain any relevant history.

## Context and evidence tooling

### 26. Conversation Memory — 8/10

**What it does** Keeps cited English summaries of explicit statements, preferences and tentative plans separate from confirmed PI. Deleting supporting messages invalidates dependent memory.

**What to improve** Strengthen the visibility of outdated context and conflicting statements in downstream requests.

**Next steps** Replay an explicit correction, a tentative plan, a memory provider failure and deletion. Check message citations, stale status and the exact consumer inputs.

**Readiness criterion** Every remembered statement has a source, a correct confidence label and a traceable update or removal path.

### 27. Assistant — 7/10

**What it does** Answers from user context and explains saved recommendations. The authenticated runtime can return a labelled contextual fallback during model failure.

**What to improve** Improve the specificity of answers when account or debt facts are stale and make the route to correction clear.

**Next steps** Ask the same debt and balance questions against fresh, stale and conflicting records. Verify fact IDs, wording and the resulting unchanged financial snapshot.

**Readiness criterion** Responses distinguish recorded facts from memory, cite the relevant data and guide financial changes through the confirmed input flow.

### 28. Isolated execution, retries and evidence reports — 9/10

**What it does** Saves exact inputs, outputs, summaries, Checker verdicts and storage readbacks. Captured inputs support replay and pinned live model comparison. The comparison includes four folders with three drafts per profile and per-model recovery logs.

**What to improve** Record provider-reported input tokens and timestamps per attempt so local pacing can be compared with project-level quota measurements.

**Next steps** Validate every report link, verify all model identities and generator requests, and add per-attempt usage telemetry where the provider exposes it. Exercise an isolated 429 response with the minute-window pause.

**Readiness criterion** A stage can be inspected or reproduced without rerunning unrelated work, and an unavailable response remains distinguishable from model output and deterministic fallback.

## Verification used for these ratings

- Server typecheck and 296 automated tests passed across 28 suites, including all 14 mandatory E2E scenarios. The separate live provider test was excluded from that command. The actual live synthetic captures exercise the provider directly.
- The authenticated Gemma runtime published A005 for Debt, A012 for Strong and A014 for Nora. The earlier Gemini 3.5 Flash Lite run chose the same actions. In both runs, no primary draft passed Checker. In the separate fixed-input comparison Gemma 26B had one VALID educational draft for Debt.
- The fixed-input comparison verified 12 live generator results, 36 drafts and 36 verdicts. Each profile used matching system and user prompts across four pinned models. Gemma 31B required recovery settings documented in the capture.
