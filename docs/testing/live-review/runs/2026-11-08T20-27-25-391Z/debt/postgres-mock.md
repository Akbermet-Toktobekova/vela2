# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_49070fdc-7707-4201-8566-e9a2bfc81818",
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
      "userId": "979e01cc-7261-48e3-b720-2195868898d2",
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
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "summary_text": "For the period of 2026-11-05, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) in EUR."
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "summary_text": "For the period of 2026-11-05, the utility obligation date (2026-11-18) occurs before the salary income date (2026-11-25) in EUR."
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "summary_text": "Debt 1: next due 2026-11-08, APR 24%, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months."
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "summary_text": "Projected liquid funds are insufficient to cover upcoming obligations and debt minimums prior to the next income date."
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b"
    },
    {
      "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "summary_text": "Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "0d565b3dcc3d06a82d500c369b707dcadc94d6f810544f471a37a5dba02f35f1",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:27:37.131Z",
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
    "id": "eval_49070fdc-7707-4201-8566-e9a2bfc81818",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
