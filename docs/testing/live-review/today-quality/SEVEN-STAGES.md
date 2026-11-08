# Seven stages — recommendation quality implementation

[Actual acceptance results and nine baseline proposals](RECAP.md)

## 1. Personal Information Database

The existing encrypted PI repository remains authoritative. Original Debt, Strong and Nora fixtures are preserved. Paired variants change a documented fact: current funding, jurisdiction, a confirmed contribution, FX availability or balance-confirmation freshness. Confirmed synthetic contributions live in calculator extras and remain distinct from model interpretations.

The new `paymentCoverage` projection records the amount due, dated available funds and F019 shortfall for every known payment, including payments without a shortfall. It reuses the calculator's existing event calculation. Horizon capacity and immediately safe optional cash remain separate.

**Remaining improvement:** build an explicit user-facing contribution form before using the synthetic confirmed-contribution input outside test tooling. The production generator can still use supported deterministic sizing when a confirmed contribution is absent.

## 2. Automatic Review Orchestrator

The dependency order and current-version publication protections remain intact. A useful valid primary action skips catalog selection; all rejections, weak-only reviews and clarification-only outputs enable catalog selection under D-022. Independent Critical Coverage always runs. Primary clarification context reaches the final decision instead of disappearing after generation.

Publication and monetary Accept, Adjust and Complete now resolve FX through the same historical quote and freshness checks. A failed quote cannot become an implicit conversion of zero or permission to proceed. Feedback rechecks the current snapshot and recommendation after asynchronous FX resolution.

## 3. Financial Analyzer

Classification, deterministic observations, Pattern, Behavior, FX and Debt retain their responsibilities. The financial calculator exposes dated payment coverage so that Primary does not mistake a positive 90-day capacity for money available before an imminent card minimum. Debt arithmetic and uncertainty propagation remain deterministic.

No AS record, prototype weight, threshold, coefficient or financial formula was changed for this improvement. The EU issuer-contact rule is a recorded product decision rather than a claim of US-source applicability.

## 4. Primary Suggestion Generator

Primary receives PI, applicable VERIFIED AS excerpts, calculated risk context and real clarification gaps, without catalog candidate templates or execution IDs. Prompt `primary.v11` asks for three distinct traceable slots, meaningful next steps and explicit intent. It distinguishes an actionable review from asking the user for a missing fact.

Dates, balances, APR and amounts in proposed action text use a cited `{{fact-id.field}}` token. Code validates the cited fact and field and renders the exact value. Literal financial assertions and unsupported fields remain blocked. The unmodified provider response and checked rendered output are both captured.

Supported `ALLOCATE_TO_GOAL` and `PAY_EXTRA_DEBT` intents can map to existing execution contracts. The mapper uses PI targets, confirmed contributions or existing sizing policy. It never invokes Catalog Selector, substitutes another action, or bypasses ActionChecker.

**Remaining improvement:** model compliance and practical specificity remain variable; inspect actual statuses rather than treating the three-slot response as evidence of useful advice. Unsupported operations return NEEDS_DATA.

## 5. Checker and Critical Action Coverage

Structural validity, reference checks, independent semantic contradiction checking and deterministic financial safety retain separate authority. Semantic Checker `semantic-checker.v7` receives a provider JSON schema requiring one verdict per pending ID. Missing, duplicated or unavailable verdicts cannot approve proposals.

The safety verdict remains VALID, NEEDS_DATA or REJECTED. Usefulness is recorded separately. A safe review can be VALID but WEAK when it fails to resolve an actual supplied open question, or duplicates one. Verified figures are permitted in a read-only review after deterministic rendering; mentioning APR does not turn it into a payment instruction.

Critical A005 for the EU profile states the real minimum, date and F019 gap without attaching CFPB/C017/S004. The US paired profile retains applicable source support. Fully funded required minimums do not trigger the insufficient-funds contact branch.

**Remaining improvement:** gap matching and independent semantic checking reduce weak reviews but cannot prove usefulness for every real user. Wider real-world evaluations remain necessary.

## 6. Final Recommendation Engine

Priority is checked critical action, eligible ranked financial action, useful safe review, then one concrete clarification. Useful reviews prefer the closest unresolved obligation and then a high-priority stated goal. Ties retain generator order. A known bill alone does not establish a useful next step.

Financial impact, normalization, weights, F016 complexity aggregation, F017 scoring and F018 weight sensitivity are unchanged. Critical, verification, advisory and clarification branches do not receive fabricated monetary effects or scores. Decision traces record catalog triggers, rejected candidates and the selection branch.

**Remaining improvement:** the prototype's existing sizing and scoring parameters still require calibration. This task did not validate them as optimal personalized financial advice.

## 7. Today and Feedback

Today publishes the checked decision or a specific missing-data question. Web and mobile display the clarification with the existing route to balances when applicable, without financial Accept controls. Accept remains intention. Adjust rechecks the changed action. Complete retains separate confirmation and idempotent bookkeeping without moving money.

The confirmed Strong variant exercises EUR 500 acceptance followed by an adjusted EUR 400 contribution when the live decision is eligible. Its missing-FX pair must block publication or monetary feedback rather than ignore an unavailable EUR/HUF rate. See actual feedback files linked from the variant report; automated tests also verify both paths.

**Verification scope:** web production build and mobile typecheck are automated checks. Interactive browser/device operation was not performed.
## Actual stage evidence

These are saved executions, not proposed examples. Each capture states whether its role ran or used fallback.

### 1. PI and import

- Debt: [import](../runs/2026-11-08T20-50-32-315Z/debt/import.md) · [pi](../runs/2026-11-08T20-50-32-315Z/debt/pi.md)
- Strong: [import](../runs/2026-11-08T21-16-59-426Z/strong/import.md) · [pi](../runs/2026-11-08T21-16-59-426Z/strong/pi.md)
- Nora: [import](../runs/2026-11-08T20-50-32-315Z/nora/import.md) · [pi](../runs/2026-11-08T20-50-32-315Z/nora/pi.md)

### 2. Automatic Review Orchestrator

- Debt: [beta-review](../runs/2026-11-08T20-50-32-315Z/debt/beta-review.md)
- Strong: [beta-review](../runs/2026-11-08T21-16-59-426Z/strong/beta-review.md)
- Nora: [beta-review](../runs/2026-11-08T20-50-32-315Z/nora/beta-review.md)

### 3. Financial Analyzer

- Debt: [classification](../runs/2026-11-08T20-50-32-315Z/debt/classification.md) · [pattern-recognition](../runs/2026-11-08T20-50-32-315Z/debt/pattern-recognition.md) · [behavior-agent](../runs/2026-11-08T20-50-32-315Z/debt/behavior-agent.md) · [fx](../runs/2026-11-08T20-50-32-315Z/debt/fx.md) · [financial-calculator](../runs/2026-11-08T20-50-32-315Z/debt/financial-calculator.md) · [debt-calculator](../runs/2026-11-08T20-50-32-315Z/debt/debt-calculator.md) · [debt-agent](../runs/2026-11-08T20-50-32-315Z/debt/debt-agent.md)
- Strong: [classification](../runs/2026-11-08T21-16-59-426Z/strong/classification.md) · [pattern-recognition](../runs/2026-11-08T21-16-59-426Z/strong/pattern-recognition.md) · [behavior-agent](../runs/2026-11-08T21-16-59-426Z/strong/behavior-agent.md) · [fx](../runs/2026-11-08T21-16-59-426Z/strong/fx.md) · [financial-calculator](../runs/2026-11-08T21-16-59-426Z/strong/financial-calculator.md) · [debt-calculator](../runs/2026-11-08T21-16-59-426Z/strong/debt-calculator.md) · [debt-agent](../runs/2026-11-08T21-16-59-426Z/strong/debt-agent.md)
- Nora: [classification](../runs/2026-11-08T20-50-32-315Z/nora/classification.md) · [pattern-recognition](../runs/2026-11-08T20-50-32-315Z/nora/pattern-recognition.md) · [behavior-agent](../runs/2026-11-08T20-50-32-315Z/nora/behavior-agent.md) · [fx](../runs/2026-11-08T20-50-32-315Z/nora/fx.md) · [financial-calculator](../runs/2026-11-08T20-50-32-315Z/nora/financial-calculator.md) · [debt-calculator](../runs/2026-11-08T20-50-32-315Z/nora/debt-calculator.md) · [debt-agent](../runs/2026-11-08T20-50-32-315Z/nora/debt-agent.md)

### 4. Primary Generator

- Debt: [suggestion-generator](../runs/2026-11-08T20-50-32-315Z/debt/suggestion-generator.md)
- Strong: [suggestion-generator](../runs/2026-11-08T21-16-59-426Z/strong/suggestion-generator.md)
- Nora: [suggestion-generator](../runs/2026-11-08T20-50-32-315Z/nora/suggestion-generator.md)

### 5. Checker and Critical Coverage

- Debt: [checker](../runs/2026-11-08T20-50-32-315Z/debt/checker.md) · [critical-coverage](../runs/2026-11-08T20-50-32-315Z/debt/critical-coverage.md) · [catalog-selector](../runs/2026-11-08T20-50-32-315Z/debt/catalog-selector.md)
- Strong: [checker](../runs/2026-11-08T21-16-59-426Z/strong/checker.md) · [critical-coverage](../runs/2026-11-08T21-16-59-426Z/strong/critical-coverage.md) · [catalog-selector](../runs/2026-11-08T21-16-59-426Z/strong/catalog-selector.md)
- Nora: [checker](../runs/2026-11-08T20-50-32-315Z/nora/checker.md) · [critical-coverage](../runs/2026-11-08T20-50-32-315Z/nora/critical-coverage.md) · [catalog-selector](../runs/2026-11-08T20-50-32-315Z/nora/catalog-selector.md)

### 6. Recommendation Engine

- Debt: [weights](../runs/2026-11-08T20-50-32-315Z/debt/weights.md) · [ai-evaluation](../runs/2026-11-08T20-50-32-315Z/debt/ai-evaluation.md) · [scoring](../runs/2026-11-08T20-50-32-315Z/debt/scoring.md) · [robustness](../runs/2026-11-08T20-50-32-315Z/debt/robustness.md) · [decision-engine](../runs/2026-11-08T20-50-32-315Z/debt/decision-engine.md) · [explanation](../runs/2026-11-08T20-50-32-315Z/debt/explanation.md)
- Strong: [weights](../runs/2026-11-08T21-16-59-426Z/strong/weights.md) · [ai-evaluation](../runs/2026-11-08T21-16-59-426Z/strong/ai-evaluation.md) · [scoring](../runs/2026-11-08T21-16-59-426Z/strong/scoring.md) · [robustness](../runs/2026-11-08T21-16-59-426Z/strong/robustness.md) · [decision-engine](../runs/2026-11-08T21-16-59-426Z/strong/decision-engine.md) · [explanation](../runs/2026-11-08T21-16-59-426Z/strong/explanation.md)
- Nora: [weights](../runs/2026-11-08T20-50-32-315Z/nora/weights.md) · [ai-evaluation](../runs/2026-11-08T20-50-32-315Z/nora/ai-evaluation.md) · [scoring](../runs/2026-11-08T20-50-32-315Z/nora/scoring.md) · [robustness](../runs/2026-11-08T20-50-32-315Z/nora/robustness.md) · [decision-engine](../runs/2026-11-08T20-50-32-315Z/nora/decision-engine.md) · [explanation](../runs/2026-11-08T20-50-32-315Z/nora/explanation.md)

### 7. Today and Feedback

- Debt: [beta-review](../runs/2026-11-08T20-50-32-315Z/debt/beta-review.md) · [feedback](../runs/2026-11-08T20-50-32-315Z/debt/feedback.md) · [assistant](../runs/2026-11-08T20-50-32-315Z/debt/assistant.md) · [conversation-memory](../runs/2026-11-08T20-50-32-315Z/debt/conversation-memory.md)
- Strong: [beta-review](../runs/2026-11-08T21-16-59-426Z/strong/beta-review.md) · [feedback](../runs/2026-11-08T21-16-59-426Z/strong/feedback.md) · [assistant](../runs/2026-11-08T21-16-59-426Z/strong/assistant.md) · [conversation-memory](../runs/2026-11-08T21-16-59-426Z/strong/conversation-memory.md)
- Nora: [beta-review](../runs/2026-11-08T20-50-32-315Z/nora/beta-review.md) · [feedback](../runs/2026-11-08T20-50-32-315Z/nora/feedback.md) · [assistant](../runs/2026-11-08T20-50-32-315Z/nora/assistant.md) · [conversation-memory](../runs/2026-11-08T20-50-32-315Z/nora/conversation-memory.md)
