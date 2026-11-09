# Today recommendation quality — actual acceptance results

Only pinned Gemini 3.5 Flash Lite was used. Original profiles and historical results are preserved. Safety verdicts and usefulness are reported separately. Provider failures are not counted as successful model outputs.

[Previous nine outputs](../primary-grounding/CHECKER-LIVE-RESULTS.md) · [Seven-stage implementation](SEVEN-STAGES.md) · [Updated assessment](ASSESSMENT.md) · [Actual EUR 500 formula example](CALCULATION-EXAMPLE.md) · [Formula guide](../FORMULAS.md)

## Debt

3 model-origin slots. Verdicts: {'NEEDS_DATA': 2, 'REJECTED': 1}.
Today: **Contact Credit card issuer about the upcoming minimum**; `RECOMMENDATION_READY`.
[Three proposals, statuses and all stage files](debt.md)

## Strong

3 model-origin slots. Verdicts: {'VALID': 1, 'NEEDS_DATA': 2}.
Today: **Contribute EUR 4550 toward "Education"**; `RECOMMENDATION_READY`.
[Three proposals, statuses and all stage files](strong.md)

## Nora

3 model-origin slots. Verdicts: {'NEEDS_DATA': 3}.
Today: **Review recurring subscription before cancellation**; `RECOMMENDATION_READY`.
[Three proposals, statuses and all stage files](nora.md)

## Paired synthetic profiles

Expected outcomes were recorded before acceptance in [VARIANT-EXPECTATIONS.md](../../../../user-inputs/synthetic/backend-review/VARIANT-EXPECTATIONS.md). EUR 500 and the EUR 400 adjustment are explicit synthetic user choices, not new policy thresholds.

- **debt-funded:** Pay required EUR 65 minimum on Credit card; `RECOMMENDATION_READY`; score `None`. [Actual inputs, outputs and checks](debt-funded.md).
- **debt-us:** Contact Credit card issuer for hardship payment options; `RECOMMENDATION_READY`; score `None`. [Actual inputs, outputs and checks](debt-us.md).
- **strong-confirmed:** Allocate EUR 500 toward Education; `RECOMMENDATION_READY`; score `0.23865`. [Actual inputs, outputs and checks](strong-confirmed.md).
- **strong-missing-fx:** Confirm financial information; `NEEDS_DATA`; score `None`. [Actual inputs, outputs and checks](strong-missing-fx.md).
- **nora-fresh:** Review recurring subscription before cancellation; `RECOMMENDATION_READY`; score `None`. [Actual inputs, outputs and checks](nora-fresh.md).

## Verification and limits

- Server: 314 passing tests, including the 14 mandatory E2E scenarios; typecheck passed.
- Web production build and mobile TypeScript check passed. No browser/device interaction is claimed.
- The baseline comparison changes orchestration, prompts and context enrichment; it is not a frozen-request prompt-only experiment.
- Financial dates remain frozen at the fixture reference date. Actual model requests retain real execution timestamps.
- Non-executing steps and clarifications have no invented financial score. A005 critical priority bypasses F017.
- Synthetic databases are temporary encrypted SQLite; captures retain actual readback evidence. No production data or real money was changed.
- Model usefulness remains variable. A successful critical/catalog selection is not proof that the primary generator solved the case.

## Post-capture source-display correction

The final inspection found that the explanation formatter inserted S001 when the actual decision had no source. This presentation defect was removed and regression-tested. The live selection and amounts did not change. Original captures remain untouched; actual deterministic replays show the corrected text: [EU Debt](../runs/2026-11-08T21-22-35-462Z/debt/explanation.md) and [confirmed Strong](../runs/2026-11-08T21-22-54-857Z/strong/explanation.md). No additional live model call is claimed for these replays.

The confirmed Strong score used explicitly labelled catalog complexity factors because the AI factor batch was incomplete. See the formula example for the actual UNKNOWN factors and calculation.

## Interrupted attempts retained separately

- The first acceptance batch did not reach Strong generation because its initial Assistant request returned HTTP 504. Strong was rerun separately; its report uses the completed retry.
- The first confirmed-Strong attempt timed out during review and exposed an asynchronous temporary-database shutdown race. The runner now waits for running job writes before closing SQLite and records an initial Assistant failure without aborting the financial evaluation.
- Intermediate missing-FX captures blocked money correctly but showed a reserve question instead of the blocking FX field. The final retry follows the corrected deterministic clarification priority.
- These interrupted and intermediate attempts remain in the evidence directory and are excluded from the nine final proposal slots.
