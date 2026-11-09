# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
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
      "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
      "name": "Credit card",
      "debtType": "credit_card",
      "currency": "EUR",
      "remainingBalance": 900,
      "apr": 24,
      "minimumPayment": 65,
      "nextDueDate": "2026-11-08",
      "paymentFrequency": "monthly",
      "createdAt": "2026-11-05T12:00:00.000Z"
    }
  ],
  "analysis.stage_artifacts": [
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
      "summary_text": "The utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) in currency EUR, with the reference date set to 2026-11-05."
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
      "summary_text": "The utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) in currency EUR, with the reference date set to 2026-11-05."
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
      "summary_text": "Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months."
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
      "summary_text": "There is a projected shortfall for upcoming obligations due before the next salary income date."
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469"
    },
    {
      "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
      "summary_text": "Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "298363726e9932eb5449fae583b7789dff5f1eadd61d2df459033e471ef73cec",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:44:29.305Z",
    "entries": [
      {
        "messageIds": [
          "debt-context"
        ],
        "kind": "STATEMENT",
        "text": "The user wants to understand their saved financial information."
      },
      {
        "messageIds": [
          "debt-context"
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
    "id": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
