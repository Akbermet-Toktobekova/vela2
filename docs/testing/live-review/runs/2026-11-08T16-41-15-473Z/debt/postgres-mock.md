# 01 Debt · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a",
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
      "userId": "936917e7-f0ca-4346-85f0-45dd0460deee",
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
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693",
      "summary_text": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693",
      "summary_text": "An obligation (utility) occurred on 2026-11-18 in EUR, which was before the income (salary) received on 2026-11-25."
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693",
      "summary_text": "An obligation (utility) occurred on 2026-11-18 in EUR, which was before the income (salary) received on 2026-11-25."
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693",
      "summary_text": "Debt 1: APR 24%, next due 2026-11-08, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months."
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693",
      "summary_text": "Account balance is currently lower than upcoming obligations and debt payments, requiring review and clarification of cash flow timing."
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693"
    },
    {
      "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693",
      "summary_text": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "778c90b2816ef15bcbffe7f9866d7a0b1b08e72eccbb4b0388424dab0286141f",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T16:41:17.882Z",
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
        "text": "The user might review their budget later."
      }
    ],
    "summaryText": "The user wants to understand their saved financial information. The user might review their budget later.",
    "model": {
      "provider": "gemini",
      "modelUsed": "gemini-3.5-flash-lite",
      "liveCallUsed": true
    }
  },
  "analysis.decisions": {
    "id": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A005"
  }
}
~~~~
