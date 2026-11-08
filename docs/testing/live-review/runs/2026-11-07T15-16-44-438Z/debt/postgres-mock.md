# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Simulation projected in memory and exported to this Markdown file. | — |

## Input

~~~~json
{
  "piVersion": "2.0",
  "betaEvaluationId": "eval_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_0_1793880000000",
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
      "remaining_balance": 900,
      "apr": 24,
      "minimum_payment": 65
    }
  ],
  "analysis.pattern_summaries": {
    "input_snapshot_id": "snap_beta_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_373f467295431927",
    "summary_text": "Pattern Recognition found no statement activity to compare."
  },
  "analysis.behavior_summaries": {
    "run_id": "eval_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_0_1793880000000",
    "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
  },
  "analysis.debt_summaries": {
    "run_id": "eval_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_0_1793880000000",
    "summary_text": "The highest priority debt (Credit card) carries an APR of 24.0% with a projected 90-day baseline interest of EUR 46.99, a 12-month baseline interest of EUR 133.61, and a payoff horizon of 16.37 months."
  },
  "analysis.decisions": {
    "id": "eval_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_0_1793880000000",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005",
    "selected_advice_id": null,
    "recommendation_id": "rec_A005_eval_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_0_1793880000000"
  }
}
~~~~
