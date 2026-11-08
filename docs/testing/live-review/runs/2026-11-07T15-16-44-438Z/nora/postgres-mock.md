# 03 Nora · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Simulation projected in memory and exported to this Markdown file. | — |

## Input

~~~~json
{
  "piVersion": "3.0",
  "betaEvaluationId": "eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
  "draft": "See ../../../PI-STORAGE.md."
}
~~~~

## Output

~~~~json
{
  "simulated": true,
  "pi.debts": [
    {
      "id": "card",
      "remaining_balance": 850,
      "apr": 21.9,
      "minimum_payment": 55
    }
  ],
  "analysis.pattern_summaries": {
    "input_snapshot_id": "snap_beta_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_f317c6135affc306",
    "summary_text": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
  },
  "analysis.behavior_summaries": {
    "run_id": "eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
    "summary_text": "Analyzed 48 transactions (48 classified; user_confirmed preserved). Detected 3 recurring subscription candidate(s) (Fiber Home: EUR 32, Sound Library: EUR 10.99, Screen Library: EUR 15.99) requiring user confirmation before any cancellation proposal (R010)."
  },
  "analysis.debt_summaries": {
    "run_id": "eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
    "summary_text": "The Credit card debt carries a 21.9% APR and is projected to be paid off in 18.32 months. It accrues €41.82 in interest over a 90-day baseline and €126.43 over a 12-month period."
  },
  "analysis.decisions": {
    "id": "eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A014",
    "selected_advice_id": null,
    "recommendation_id": "rec_A014_eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000"
  }
}
~~~~
