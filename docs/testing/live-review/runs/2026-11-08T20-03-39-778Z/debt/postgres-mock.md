# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5",
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
      "userId": "912fec2d-5d53-47ea-9a07-4783b1064abc",
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
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284",
      "summary_text": "For the currency EUR, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) relative to the reference date 2026-11-05, resulting in the bill occurring before income."
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284",
      "summary_text": "For the currency EUR, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) relative to the reference date 2026-11-05, resulting in the bill occurring before income."
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284",
      "summary_text": "Debt 1: next due 2026-11-08, APR 24%, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months."
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284",
      "summary_text": "Projected cash shortfalls exist for upcoming debt and utility obligation payments prior to the next salary income date."
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284"
    },
    {
      "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_912fec2d-5d53-47ea-9a07-4783b1064abc_v2_16bac651a59d4284",
      "summary_text": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "b4fd8b0a321b36901f8afa329b8ef326829375d21d82566735ff3ec5dc59f9e9",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:03:42.303Z",
    "entries": [
      {
        "messageIds": [
          "debt-context"
        ],
        "kind": "STATEMENT",
        "text": "The user would like to understand their saved financial information."
      },
      {
        "messageIds": [
          "debt-context"
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
    "id": "eval_3bfb4bb9-f564-453c-a878-eddce10082f5",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
