# 03 Nora · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_e1155468-9845-4388-81a9-d17627bc19bc",
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
      "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
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
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
      "summary_text": "Analyzed 48 transactions (48 classified; user_confirmed preserved). Detected 2 recurring subscription candidate(s) (Sound Library: EUR 10.99, Screen Library: EUR 15.99) requiring user confirmation before any cancellation proposal (R010)."
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
      "summary_text": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
      "summary_text": "The supplied records show recurring monthly outflows of -980 EUR and recurring monthly inflows of 2350 EUR across the observed periods. There is a stated goal of achieving an emergency cushion target amount of 3000 EUR by 2027-06-30. Certain obligations are billed prior to anticipated income dates based on the referenced timing data."
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
      "summary_text": "Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing."
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
      "summary_text": "No applicable verified claim supports a specific action."
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214"
    },
    {
      "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
      "summary_text": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "35af2aa51c695c24ded16b6ed70fc1ce8514abe5ecc3e8ab1c7d922699a3e3e4",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T15:36:06.361Z",
    "entries": [
      {
        "messageIds": [
          "nora-context"
        ],
        "kind": "STATEMENT",
        "text": "The user wants to understand their saved financial information."
      },
      {
        "messageIds": [
          "nora-context"
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
    "id": "eval_e1155468-9845-4388-81a9-d17627bc19bc",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A014"
  }
}
~~~~
