# 01 Debt · scoring

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Full beta engine.traces[evaluationId].trace.scoredCandidates[].finalScore. Draft PostgreSQL analysis.decision_traces. | — |

## Input

~~~~json
{
  "candidates": [],
  "weight": {
    "profileId": "liquidity_protection",
    "previousProfileId": null,
    "hysteresisApplied": false,
    "weights": {
      "R": 0.5,
      "F": 0.35,
      "G": 0.15
    },
    "triggerReason": "Emergency reserve coverage M = 0.00 months is below entry threshold 1.00 months.",
    "policyVersion": "weight_policy_v1_prototype"
  }
}
~~~~

## Output

~~~~json
{
  "scores": [],
  "rankingSkipped": true
}
~~~~
