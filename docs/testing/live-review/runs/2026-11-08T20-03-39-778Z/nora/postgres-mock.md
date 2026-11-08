# 03 Nora · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0",
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
      "userId": "76041125-72b3-4fb5-837e-ac3337c4d5d9",
      "name": "Credit card",
      "debtType": "credit_card",
      "currency": "EUR",
      "remainingBalance": 850,
      "apr": 21.9,
      "minimumPayment": 55,
      "nextDueDate": "2026-11-15",
      "paymentFrequency": "monthly",
      "createdAt": "2026-11-05T12:00:00.000Z"
    }
  ],
  "analysis.stage_artifacts": [
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1",
      "summary_text": "Analyzed 48 transactions (48 classified; user_confirmed preserved). Detected 2 recurring subscription candidate(s) (Sound Library: EUR 10.99, Screen Library: EUR 15.99) requiring user confirmation before any cancellation proposal (R010)."
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1",
      "summary_text": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1",
      "summary_text": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1",
      "summary_text": "Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing."
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1",
      "summary_text": "The model did not return a valid three-proposal response."
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1"
    },
    {
      "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_76041125-72b3-4fb5-837e-ac3337c4d5d9_v4_72e50b35fd7670e1",
      "summary_text": "No candidate action passed safety, eligibility, and cash-flow affordability gates for this snapshot."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "1f682dbf69a029f6506bcaa3da88ba375fe2b680c0deb70f6bc63fe903446d0d",
    "promptVersion": "chat-memory.v2",
    "status": "UNAVAILABLE",
    "updatedAt": "2026-11-08T20:04:36.208Z",
    "entries": [],
    "summaryText": "",
    "model": {
      "provider": "deterministic_fallback",
      "modelUsed": "deterministic_fallback_after_error",
      "liveCallUsed": false,
      "fallbackReason": "{\"error\":{\"code\":429,\"message\":\"You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://aistudio.google.com/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. \\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 15, model: gemini-3.5-flash-lite, description: Generate content requests per minute limit exceeded on Free Tier. See https://aistudio.google.com/docs/rate-limits.\\nPlease retry in 24.56872542s.\",\"status\":\"RESOURCE_EXHAUSTED\",\"details\":[{\"@type\":\"type.googleapis.com/google.rpc.Help\",\"links\":[{\"description\":\"Learn more about Gemini API quotas\",\"url\":\"https://aistudio.google.com/docs/rate-limits\"}]},{\"@type\":\"type.googleapis.com/google.rpc.QuotaFailure\",\"violations\":[{\"description\":\"Generate content requests per minute limit exceeded on Free Tier. See https://aistudio.google.com/docs/rate-limits.\",\"quotaMetric\":\"generativelanguage.googleapis.com/generate_content_free_tier_requests\",\"quotaId\":\"GenerateRequestsPerMinutePerProjectPerModel-FreeTier\",\"quotaDimensions\":{\"model\":\"gemini-3.5-flash-lite\",\"location\":\"global\"},\"quotaValue\":\"15\"}]},{\"@type\":\"type.googleapis.com/google.rpc.RetryInfo\",\"retryDelay\":\"24s\"}]}}"
    }
  },
  "analysis.decisions": {
    "id": "eval_e4da6495-b4e2-4700-a3e5-dd205aef9dd0",
    "status": "NO_RECOMMENDATION",
    "selected_action_id": null
  }
}
~~~~
