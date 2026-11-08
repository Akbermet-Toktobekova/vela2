# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Simulation projected in memory and exported to this Markdown file. | — |

## Input

~~~~json
{
  "piVersion": "3.0",
  "betaEvaluationId": "eval_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_0_1793880000000",
  "draft": "See ../../../PI-STORAGE.md."
}
~~~~

## Output

~~~~json
{
  "simulated": true,
  "pi.debts": [],
  "analysis.pattern_summaries": {
    "input_snapshot_id": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
    "summary_text": "Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
  },
  "analysis.behavior_summaries": {
    "run_id": "eval_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_0_1793880000000",
    "summary_text": "Analyzed 159 transactions (159 classified; user_confirmed preserved). Detected 1 recurring subscription candidate(s) (Account service charge: EUR 0.11) requiring user confirmation before any cancellation proposal (R010)."
  },
  "analysis.debt_summaries": {
    "run_id": "eval_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_0_1793880000000",
    "summary_text": "No active debt records reported in the current financial snapshot."
  },
  "analysis.decisions": {
    "id": "eval_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_0_1793880000000",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012",
    "selected_advice_id": null,
    "recommendation_id": "rec_A012_eval_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_0_1793880000000"
  }
}
~~~~
