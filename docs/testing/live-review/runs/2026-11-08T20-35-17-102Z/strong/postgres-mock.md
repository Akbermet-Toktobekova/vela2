# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909",
  "draft": "See ../../../PI-STORAGE.md."
}
~~~~

## Output

~~~~json
{
  "simulated": true,
  "pi.debts": [],
  "analysis.stage_artifacts": [
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f",
      "summary_text": "Analyzed 159 transactions (142 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f",
      "summary_text": "Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f",
      "summary_text": "Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f",
      "summary_text": "The model did not return a valid three-proposal response."
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f"
    },
    {
      "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_9a74bbe3-cd6a-419b-83b4-94e0dbe16287_v4_92b445f365343e3f",
      "summary_text": "This information is needed before choosing a useful next action."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "0dfb6ee39465b27ee68991121acf19e99d7438c777f49ea884d89a100f940a2f",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:35:30.529Z",
    "entries": [
      {
        "messageIds": [
          "strong-context"
        ],
        "kind": "STATEMENT",
        "text": "The user wants to understand their saved financial information."
      },
      {
        "messageIds": [
          "strong-context"
        ],
        "kind": "TENTATIVE_PLAN",
        "text": "The user may review their budget later."
      }
    ],
    "summaryText": "The user wants to understand their saved financial information. The user may review their budget later.",
    "model": {
      "provider": "gemini",
      "modelUsed": "gemini-3.5-flash-lite",
      "liveCallUsed": true
    }
  },
  "analysis.decisions": {
    "id": "eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909",
    "status": "NEEDS_DATA",
    "selected_action_id": null
  }
}
~~~~
