# 02 Strong · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback, state.state.actionFeedback and feedback-request:&lt;id&gt; when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_A012_eval_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_0_1793880000000",
  "action": "accept",
  "expectedVersion": 3,
  "requestId": "strong-accept"
}
~~~~

## Output

~~~~json
{
  "error": {
    "code": "ACCEPTANCE_REVALIDATION_FAILED",
    "message": "The action requires fresh validation before acceptance."
  }
}
~~~~
