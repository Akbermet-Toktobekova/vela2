# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3",
  "draft": "See ../../../PI-STORAGE.md."
}
~~~~

## Output

~~~~json
{
  "simulated": true,
  "pi.debts": [],
  "analysis.stage_artifacts": [
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
      "summary_text": "Account service charge fees of -0.11 EUR, -0.11 EUR, and -0.13 EUR were observed on the main account on 2026-10-09, 2026-09-10, and 2026-08-09 respectively. Fees of -9 HUF and -537 HUF were observed on the huf account on 2026-10-07 and 2026-09-10 respectively. The largest observed outflow on the main account was -1100 EUR on 2026-11-01. Inflows of 4200 EUR on 2026-09-16 and 275.4 EUR on 2026-09-10 were observed on the main account. On the huf account, observed transactions include an outflow of -200000 HUF on 2026-09-16, an inflow of 411400 HUF on 2026-09-16, and an outflow of -300000 HUF on 2026-09-16. Unconfirmed: Account service charges appear repeatedly on the main account, but terms of a recurring contract are unconfirmed."
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
      "summary_text": "Account service charges are consistently applied to the main account on a monthly basis. Significant inflows and outflows occurred on the HUF account on 2026-09-16, including a 411,400 HUF inflow and combined outflows of 500,000 HUF. Unconfirmed: The recurring nature of account service charges suggests a potential fixed monthly cost, though the specific contract terms are not provided."
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
      "summary_text": "No applicable verified claim supports a specific action."
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:impact-cand_A012_education",
      "stage": "impact-cand_A012_education",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035"
    },
    {
      "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
      "summary_text": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "1249333667d15d9b1386acff8dc69be8c41ff93a65bcbeb18e70ba9f3efd44a1",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T15:46:04.388Z",
    "entries": [
      {
        "messageIds": [
          "strong-context"
        ],
        "kind": "QUESTION",
        "text": "The user wants to understand their saved financial information."
      },
      {
        "messageIds": [
          "strong-context"
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
    "id": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
