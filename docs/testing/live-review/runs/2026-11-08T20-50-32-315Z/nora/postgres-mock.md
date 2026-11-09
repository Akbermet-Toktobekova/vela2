# 03 Nora · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
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
      "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
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
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
      "summary_text": "Analyzed 48 transactions (48 classified; user_confirmed preserved). Detected 2 recurring subscription candidate(s) (Sound Library: EUR 10.99, Screen Library: EUR 15.99) requiring user confirmation before any cancellation proposal (R010)."
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
      "summary_text": "Repeated outflows to harbor properties were observed in the main account in EUR. Repeated outflows to green basket were observed in the main account in EUR. Repeated outflows to city transit were observed in the main account in EUR. Repeated outflows to bright energy were observed in the main account in EUR. Repeated outflows to fiber home were observed in the main account in EUR. Repeated outflows to sound library were observed in the main account in EUR. Repeated outflows to fictional card services were observed in the main account in EUR. Repeated outflows to corner coffee were observed in the main account in EUR. Repeated outflows to maple kitchen were observed in the main account in EUR. Repeated outflows to screen library were observed in the main account in EUR. Repeated outflows to oak pharmacy were observed in the main account in EUR. Repeated inflows from danube studio were observed in the main account in EUR."
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
      "summary_text": "Repeated outflows of -980 EUR to harbor properties were observed on August 3, September 3, and October 3, 2026. Repeated inflows of 2350 EUR from danube studio were observed on August 27, September 27, and October 27, 2026. The timing configuration indicates that the obligation date for rent occurs before the income date."
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
      "summary_text": "Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing."
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
      "summary_text": ""
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a"
    },
    {
      "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
      "summary_text": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "e90b11fdc6f6a13489c5a6a41fa0e792bc1ea4318d02f00c7aef83960b96a836",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T21:14:21.040Z",
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
    "id": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A014"
  }
}
~~~~
