# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989",
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
      "userId": "d30b9ce9-5a56-446e-b9bd-bdd3387d53ac",
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
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
      "summary_text": "In the scope of currency EUR, obligationId 'utility' occurred on 2026-11-18, which is prior to incomeId 'salary' on 2026-11-25."
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
      "summary_text": "The utility obligation occurred on 2026-11-18, seven days before the salary income on 2026-11-25."
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
      "summary_text": "Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months."
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
      "summary_text": "The generator returned fewer than three proposals."
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d"
    },
    {
      "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
      "summary_text": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "27028b36270a7e9e4ea22bc329ce977197a9b50c091645667819746c4edef61d",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T15:45:10.457Z",
    "entries": [
      {
        "messageIds": [
          "debt-context"
        ],
        "kind": "QUESTION",
        "text": "The user wants to understand their saved financial information."
      },
      {
        "messageIds": [
          "debt-context"
        ],
        "kind": "TENTATIVE_PLAN",
        "text": "The user may review their budget at a later time."
      }
    ],
    "summaryText": "The user wants to understand their saved financial information. The user may review their budget at a later time.",
    "model": {
      "provider": "gemini",
      "modelUsed": "gemini-3.1-flash-lite",
      "liveCallUsed": true
    }
  },
  "analysis.decisions": {
    "id": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
