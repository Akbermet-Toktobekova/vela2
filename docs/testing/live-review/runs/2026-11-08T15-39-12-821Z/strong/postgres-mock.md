# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4",
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
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be",
      "summary_text": "Analyzed 159 transactions (143 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be",
      "summary_text": "Observed account service charge outflows on the main EUR account on 2026-10-09 (-0.11 EUR), 2026-09-10 (-0.11 EUR), and 2026-08-09 (-0.13 EUR). Observed fee outflows on the huf account on 2026-10-07 (-9 HUF) and 2026-09-10 (-537 HUF). Multiple observed outflow activities categorized across categories such as coffee shop, supermarket groceries, bookshop, food delivery, local shop, household goods, restaurant, pharmacy, online purchase, public transport, account service charge, and outgoing transfer on the main EUR account spanning August to October 2026. Multiple observed inflow and outflow activities categorized across local shop, household goods, restaurant, outgoing transfer, incoming transfer, coffee shop, supermarket groceries, food delivery, pharmacy, online purchase, bookshop, and public transport on the huf HUF account spanning August to November 2026."
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be",
      "summary_text": "The account holder maintains consistent, recurring outflow patterns across multiple categories in both EUR and HUF accounts, including food, transport, and household goods, between August and November 2026. Several high-value, non-recurring outflows were identified, such as a -1100 EUR transaction on 2026-11-01 and multiple large HUF transactions (e.g., -300,000 HUF on 2026-09-16). Both accounts incur recurring service charges or fees on a monthly basis."
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be",
      "summary_text": "No applicable verified claim supports a specific action."
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:impact-cand_A012_education",
      "stage": "impact-cand_A012_education",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be"
    },
    {
      "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_8cf630ac-8906-4043-8a9a-3ffc6512e0ea_v3_b08c0ba2e6d0d3be",
      "summary_text": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "19cd34c558269c39ac6bd0ca66a1c9e22cc7ad536453a8c8657266e2fe5fb193",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T15:42:11.242Z",
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
    "id": "eval_6452e795-07b6-4792-bfb6-1728b9e7c9f4",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
