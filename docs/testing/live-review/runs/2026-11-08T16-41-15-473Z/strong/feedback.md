# 02 Strong · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback and feedback-request:&lt;id&gt;; state.actionFeedback is an API projection when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_A012_eval_0831432d-3016-446f-97ea-098e07af7927",
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
