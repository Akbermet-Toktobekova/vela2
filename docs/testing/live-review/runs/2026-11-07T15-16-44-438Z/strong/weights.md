# 02 Strong · weights

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Full beta engine.traces[evaluationId].trace.weightSelection. Draft PostgreSQL analysis.decision_traces. | — |

## Input

~~~~json
{
  "snapshotId": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
  "calculatorExtras": {
    "referenceDateIso": "2026-11-05",
    "fxRates": {
      "HUF": {
        "base": "EUR",
        "target": "HUF",
        "rate": 363.9,
        "rateDate": "2026-11-06",
        "fetchedAt": "2026-11-05T12:00:00.000Z",
        "status": "OK",
        "source": "https://api.frankfurter.dev/v1/latest"
      }
    }
  }
}
~~~~

## Output

~~~~json
{
  "profileId": "goal_advancement",
  "previousProfileId": null,
  "hysteresisApplied": false,
  "weights": {
    "R": 0.2,
    "F": 0.2,
    "G": 0.6
  },
  "triggerReason": "Coverage M = 5.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
  "policyVersion": "weight_policy_v1_prototype"
}
~~~~
