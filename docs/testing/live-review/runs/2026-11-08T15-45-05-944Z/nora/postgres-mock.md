# 03 Nora · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4",
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
      "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
      "summary_text": "Analyzed 48 transactions (48 classified; user_confirmed preserved). Detected 2 recurring subscription candidate(s) (Sound Library: EUR 10.99, Screen Library: EUR 15.99) requiring user confirmation before any cancellation proposal (R010)."
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
      "summary_text": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
      "summary_text": "The account exhibits consistent monthly recurring inflows from 'danube studio' and recurring outflows to various service providers and vendors. Multiple recurring obligations, including rent, energy, and internet, are settled prior to the receipt of the monthly salary inflow."
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
      "summary_text": "Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing."
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
      "summary_text": "No applicable verified claim supports a specific action."
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724"
    },
    {
      "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
      "summary_text": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "2e8e530611c8f13649ed118fb73acc10041a805e6c38beda0b2fc728032690d6",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T15:48:25.750Z",
    "entries": [
      {
        "messageIds": [
          "nora-context"
        ],
        "kind": "QUESTION",
        "text": "The user wants to understand their saved financial information."
      },
      {
        "messageIds": [
          "nora-context"
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
    "id": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A014"
  }
}
~~~~
