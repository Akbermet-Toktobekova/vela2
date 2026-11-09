# 03 Nora · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback and feedback-request:&lt;id&gt;; state.actionFeedback is an API projection when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_NONE_eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0",
  "action": "accept",
  "expectedVersion": 4,
  "requestId": "nora-accept"
}
~~~~

## Output

~~~~json
{
  "error": {
    "code": "ACCEPTANCE_REVALIDATION_FAILED",
    "message": "There is no publishable action to accept."
  }
}
~~~~
