# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c",
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
      "userId": "4f341b13-fa90-441d-8a09-5a4309f678c6",
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
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "summary_text": "For the currency EUR, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) relative to the reference date (2026-11-05), resulting in the bill occurring before income."
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "summary_text": "For the currency EUR, the utility obligation date occurs before the salary income date relative to the reference date, resulting in the bill occurring before income."
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "summary_text": "Debt 1: next due 2026-11-08, APR 24%, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months."
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "summary_text": "Immediate liquid balance is insufficient to cover the upcoming payments due before the next income date."
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81"
    },
    {
      "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "summary_text": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "5d2b5fbd1df04f0ed8c0e8b1f611c2d9fb95f84d9987a5c96f072a1fc20dc654",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:50:00.842Z",
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
    "id": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
