# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b",
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
      "userId": "a915423d-7cf6-43af-b7c6-f93155905052",
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
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434",
      "summary_text": "For the currency EUR, the obligation date (2026-11-18) occurs before the income date (2026-11-25) relative to the reference date (2026-11-05), resulting in the bill occurring before the income."
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434",
      "summary_text": "For the currency EUR, the obligation date of 2026-11-18 occurs before the income date of 2026-11-25 relative to the reference date of 2026-11-05."
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434",
      "summary_text": "Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months."
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434",
      "summary_text": "There are projected payment shortfalls for debt-1 and obligation-1 due before the next income date."
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434"
    },
    {
      "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_a915423d-7cf6-43af-b7c6-f93155905052_v2_b35557a76b894434",
      "summary_text": "Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "75e570e66eb1b341bc348234167083ef03deced80ef2442df4ed7b921d1d3bd4",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:50:44.735Z",
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
    "id": "eval_1ec3eb3e-74ad-4fbd-9875-76bf07fb433b",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
