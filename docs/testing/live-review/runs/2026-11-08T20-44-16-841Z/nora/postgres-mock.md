# 03 Nora · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b",
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
      "userId": "029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6",
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
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "summary_text": "Analyzed 48 transactions (48 classified; user_confirmed preserved). Detected 2 recurring subscription candidate(s) (Sound Library: EUR 10.99, Screen Library: EUR 15.99) requiring user confirmation before any cancellation proposal (R010)."
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "summary_text": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "summary_text": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "summary_text": "Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing."
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "summary_text": ""
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff"
    },
    {
      "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "summary_text": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "0740f2769d53b372731c6b55dbfbacd019e4d022156c5f677a5487ebf475a0b3",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:47:13.944Z",
    "entries": [
      {
        "messageIds": [
          "nora-context"
        ],
        "kind": "STATEMENT",
        "text": "The user would like to understand their saved financial information."
      },
      {
        "messageIds": [
          "nora-context"
        ],
        "kind": "TENTATIVE_PLAN",
        "text": "The user may review their budget later."
      }
    ],
    "summaryText": "The user would like to understand their saved financial information. The user may review their budget later.",
    "model": {
      "provider": "gemini",
      "modelUsed": "gemini-3.5-flash-lite",
      "liveCallUsed": true
    }
  },
  "analysis.decisions": {
    "id": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A014"
  }
}
~~~~
