# Primary Suggestion Generator — Gemini 3.5 Flash Lite before and after

The acceptance comparison uses only `gemini-3.5-flash-lite`. It compares nine saved v4 drafts from run `2026-11-08T16-41-15-473Z` with nine fresh v6 drafts from run `2026-11-08T18-57-15-171Z`. The benchmark asserted equality of the original PI facts, chat context and eligible claim text, IDs and scopes. The new request adds dated calculator evidence, clarification gaps and canonical source metadata. The frozen policy is `prototype_policy_bundle_v1.4`. The original task mentioned v1.3.

[Baseline audit of all 36 saved drafts](BASELINE-FAILURE-AUDIT.md) · [Live command output](../../../coordination/evidence/primary-grounding-final-gemini.txt) · [Verification and changed files](../../../coordination/handoffs/PRIMARY-GROUNDING.md)

| Metric | Gemini 3.5 Flash Lite before | Gemini 3.5 Flash Lite after |
| --- | ---: | ---: |
| Actual model drafts | 9 | 9 |
| Schema-valid drafts | 9 | 9 |
| Correct `missingInfo` array | 9 | 9 |
| Valid PI references and target membership | 9 | 9 |
| Satisfies intent-specific AS reference requirement | 3 | 9 |
| Proposals requiring direct AS support | 6 | 0 |
| Proposals with direct AS support established | 0 | 0 |
| Intent complies with evidence requirements | 3 | 9 |
| Useful, specific clarifications | 1 | 9 |
| Cases with three distinct and traceable model slots | 3/3 | 3/3 |
| VALID financial or verification drafts | 0 | 0 |
| NEEDS_DATA | 3 | 9 |
| REJECTED | 6 | 0 |
| Unsupported actions passing Checker | 0 | 0 |
| Cases entering the catalog fallback branch | 3/3 | 3/3 |

The AS reference measure requires an applicable supplied citation for EXECUTE or REVIEW and an empty citation list for CLARIFY. The after run meets that measure through grounded clarifications. It did not generate a financial or verification proposal that could exercise the live semantic verifier. The controlled tests cover supported source advice, unrelated evidence, invalid mappings, malformed output and review safety. Useful clarification counts reflect editorial review against the supplied target fact. Nora's two bill questions have similar wording and distinct dated targets. A user-facing rendering could name those bills more clearly.

## Debt

Before, Gemini drafted two uncited reviews and one broad question about additional funds. After, it produced three CLARIFY drafts with NEEDS_DATA:

1. What funds are available before the card minimum due November 8.
2. Whether the issuer already offered a payment arrangement for that minimum.
3. What funds are available before the utility payment due November 18.

The EUR45 projected minimum-payment gap remains covered by independent A005. The catalog fallback branch ran and had an empty pool. A005 was selected by critical priority in both captures.

[Before drafts](../runs/2026-11-08T16-41-15-473Z/debt/suggestion-generator.md) · [Before Checker](../runs/2026-11-08T16-41-15-473Z/debt/checker.md) · [Before decision](../runs/2026-11-08T16-41-15-473Z/debt/decision-engine.md)

[After draft and exact response](../runs/2026-11-08T18-57-15-171Z/debt/gemini-3.5-flash-lite-suggestion-generator.md) · [After Checker](../runs/2026-11-08T18-57-15-171Z/debt/gemini-3.5-flash-lite-checker.md) · [After catalog](../runs/2026-11-08T18-57-15-171Z/debt/gemini-3.5-flash-lite-catalog-selector.md) · [After decision](../runs/2026-11-08T18-57-15-171Z/debt/gemini-3.5-flash-lite-decision.md)

## Strong

Before, Gemini returned an uncited fee review and two peripheral questions. After, it produced three CLARIFY drafts with NEEDS_DATA:

1. Intended amount and timing of a contribution to the education goal.
2. Preferred funding account and currency.
3. Desired dedicated emergency reserve target before funding other goals.

The checked catalog selection remained A012 for EUR4550 with F017 score 0.58875.

[Before drafts](../runs/2026-11-08T16-41-15-473Z/strong/suggestion-generator.md) · [Before Checker](../runs/2026-11-08T16-41-15-473Z/strong/checker.md) · [Before decision](../runs/2026-11-08T16-41-15-473Z/strong/decision-engine.md)

[After draft and exact response](../runs/2026-11-08T18-57-15-171Z/strong/gemini-3.5-flash-lite-suggestion-generator.md) · [After Checker](../runs/2026-11-08T18-57-15-171Z/strong/gemini-3.5-flash-lite-checker.md) · [After catalog](../runs/2026-11-08T18-57-15-171Z/strong/gemini-3.5-flash-lite-catalog-selector.md) · [After decision](../runs/2026-11-08T18-57-15-171Z/strong/gemini-3.5-flash-lite-decision.md)

## Nora

Before, Gemini returned three uncited bill reviews. After, it produced three CLARIFY drafts with NEEDS_DATA:

1. Current available amounts and dates for the stale balances.
2. Whether rent is already scheduled and which funded account covers it.
3. Whether the energy payment is already scheduled and which funded account covers it.

The checked decision remained A014 to verify a recurring subscription before cancellation.

[Before drafts](../runs/2026-11-08T16-41-15-473Z/nora/suggestion-generator.md) · [Before Checker](../runs/2026-11-08T16-41-15-473Z/nora/checker.md) · [Before decision](../runs/2026-11-08T16-41-15-473Z/nora/decision-engine.md)

[After draft and exact response](../runs/2026-11-08T18-57-15-171Z/nora/gemini-3.5-flash-lite-suggestion-generator.md) · [After Checker](../runs/2026-11-08T18-57-15-171Z/nora/gemini-3.5-flash-lite-checker.md) · [After catalog](../runs/2026-11-08T18-57-15-171Z/nora/gemini-3.5-flash-lite-catalog-selector.md) · [After decision](../runs/2026-11-08T18-57-15-171Z/nora/gemini-3.5-flash-lite-decision.md)

## Execution and readiness

The after capture contains three live generator calls and two live catalog-selection calls. All five used the pinned model and standard transport. The final capture recorded zero retries, streaming calls, rate-limit errors or model errors. The earlier Gemma experiment was interrupted after the scope was narrowed. It contributes no acceptance metrics.

After decisions were isolated replays using the actual checked candidates and frozen complexity inputs. They did not write a new production Today card. The raw responses and schemas can be reproduced from the links above. The canonical AS package supplies verified claim text and source locations. Source quotations beyond the stored material were not added.

The generator is ready for the next development stage as a source of grounded clarifications on these profiles. Evidence-backed financial opportunity discovery remains unmeasured in the live acceptance sample. A follow-up live fixture needs applicable direct action evidence and confirmed PI to evaluate that path.
