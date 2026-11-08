# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41",
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
      "userId": "4f49a4d9-80fd-496f-9f22-11aa7d9597a2",
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
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "summary_text": "Pattern Recognition found no statement activity to compare."
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "summary_text": "Pattern Recognition found no statement activity to compare."
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "summary_text": "Debt 1: APR 24%, next due 2026-11-08, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months."
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "summary_text": "Insufficient verified claims to support EXECUTE actions for debt or obligation management; behavior data is incomplete."
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a"
    },
    {
      "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "summary_text": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "34ed99681a0abeee9a59fd2a96b0f408ae1cc02a56f2e8ef83400f6a5ae78892",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T17:08:02.634Z",
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
      "modelUsed": "gemma-4-31b-it",
      "liveCallUsed": true
    }
  },
  "analysis.decisions": {
    "id": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
