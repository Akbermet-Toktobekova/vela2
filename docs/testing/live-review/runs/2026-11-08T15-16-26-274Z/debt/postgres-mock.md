# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_0583f994-a005-4e53-80f9-15c64109f9c9",
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
      "userId": "fc048197-a2d0-44fd-b91d-32152f8ac2a5",
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
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
      "summary_text": "An obligation (utility) occurred on 2026-11-18 before the income (salary) on 2026-11-25 in currency EUR, with a reference date of 2026-11-05."
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
      "summary_text": "The utility obligation occurred on 2026-11-18, which precedes the salary income date of 2026-11-25."
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
      "summary_text": "Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months."
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
      "summary_text": "Only two distinct, actionable steps are supported by the provided facts. The third proposal is omitted because there is insufficient data to suggest specific financial education or budgeting actions beyond the immediate debt and cash flow concerns identified."
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583"
    },
    {
      "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
      "summary_text": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.3 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "d0f57ea7ac79d4b1aea9a284debee759ee59acc73d5a5f06ca0157891cff7d26",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T15:17:48.514Z",
    "entries": [
      {
        "messageIds": [
          "debt-context"
        ],
        "kind": "STATEMENT",
        "text": "The user expressed interest in reviewing their saved financial information."
      },
      {
        "messageIds": [
          "debt-context"
        ],
        "kind": "TENTATIVE_PLAN",
        "text": "The user may review their budget at a later time."
      }
    ],
    "summaryText": "The user expressed interest in reviewing their saved financial information. The user may review their budget at a later time.",
    "model": {
      "provider": "gemini",
      "modelUsed": "gemini-3.1-flash-lite",
      "liveCallUsed": true
    }
  },
  "analysis.decisions": {
    "id": "eval_0583f994-a005-4e53-80f9-15c64109f9c9",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
