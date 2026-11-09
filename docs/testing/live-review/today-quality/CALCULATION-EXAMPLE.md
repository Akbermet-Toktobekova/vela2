# Actual Strong contribution — how the score was calculated

The confirmed synthetic contribution is **EUR 500** toward the **EUR 6,000 Education** goal. These are PI inputs, not policy thresholds.

[Actual decision and score contributions](../runs/2026-11-08T21-19-03-637Z/strong/decision-engine.md) · [Impact calculation](../runs/2026-11-08T21-19-03-637Z/strong/impact-primary_A012_education.md) · [Complexity batch](../runs/2026-11-08T21-19-03-637Z/strong/ai-evaluation.md) · [Accept](../runs/2026-11-08T21-19-03-637Z/strong/feedback.md) · [Adjust to EUR 400](../runs/2026-11-08T21-19-03-637Z/strong/feedback-adjust.md)

## Effects and normalization

Both scenarios use the same confirmed income, obligations, reference date and 90-day horizon. Allocating liquid cash to the goal changes its earmark; it does not create income or increase total liquid wealth. Before and after terminal liquid cash are both EUR 17,609.39 in the saved calculation.

- Resilience effect: 0 months. Normalized `v_R = 0`.
- Financial benefit: EUR 0. Normalized `v_F = 0`.
- Goal progress: the stored rounded fraction is `0.0833`, or 8.33 percentage points. The existing prototype normalization scale is `K_G = 0.20`, so `v_G = 0.0833 / 0.20 = 0.4165`. No clipping applies.

The selected existing goal-advancement profile supplies weights `w_R = 0.20`, `w_F = 0.20`, `w_G = 0.60`. These are versioned preliminary policy values, not model-generated values.

## Complexity and final score

The AI batch did **not** supply usable contextual complexity factors in this run. All four factors remained UNKNOWN and the engine explicitly used the existing A012 catalog baseline: `T = 0.10`, `S = 0.15`, `D = 0.10`, `O = 0.10`. This is a complexity fallback, separate from whether Catalog Selector generated an action.

Code applies F016:

`c_C = 0.25 × (0.10 + 0.15 + 0.10 + 0.10) = 0.1125`.

Code then applies F017 with the existing prototype `lambda_C = 0.10`:

`S(a) = 0.20 × 0 + 0.20 × 0 + 0.60 × 0.4165 − 0.10 × 0.1125 = 0.23865`.

This score compares eligible actions under the selected policy. It is not an approval probability, a user satisfaction rating, or proof that the contribution is optimal. In this run only one financial candidate was scored. Its 100% F018 stability therefore provides little evidence of comparative superiority; it measures the recorded weight-sensitivity experiment, not resilience to delayed salary or an emergency expense.

Accept succeeded at EUR 500. Adjust to EUR 400 separately passed validation and was saved as `adjustedAmount: 400`; the original recommendation remains traceable as `suggestedAmount: 500`. Neither interaction moved money or marked completion.

## Source-display correction after live capture

The original live explanation incorrectly printed a default `S001` when the selected primary action had no attached source. The decision trace itself correctly had empty source and claim arrays. The presentation fallback was removed and verified by an actual deterministic replay, with no new model request: [corrected Strong explanation](../runs/2026-11-08T21-22-54-857Z/strong/explanation.md). The analogous [EU Debt explanation](../runs/2026-11-08T21-22-35-462Z/debt/explanation.md) now also states that no external source is attached. Original captures remain unchanged.
