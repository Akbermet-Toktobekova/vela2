# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1",
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
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
      "summary_text": "Observed multiple outflow transactions in the main EUR account across categories such as coffee shop, supermarket groceries, bookshop, food delivery, local shop, household goods, restaurant, pharmacy, online purchase, public transport, account service charge, and outgoing transfer between August and November 2026. Observed multiple inflow and outflow transactions in the HUF account across various categories between August and November 2026. Observed account service charges and fees on specific dates in both the main EUR and huf HUF accounts. Observed specific largest transactions and amounts for both accounts during the specified observation periods. Observed timing relationships between income and obligations where some obligations fall before income and others after."
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
      "summary_text": "The accounts show consistent outflow activity across multiple categories, including recurring expenses like groceries, food delivery, and transport, alongside variable spending in both EUR and HUF. There are significant, non-recurring large-value transactions in both accounts, such as the -1100 EUR outflow in November and the -300,000 HUF outflow in September. The timing of financial obligations relative to income receipt is inconsistent, with some bills due before the expected income date."
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
      "summary_text": ""
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:impact-cand_A012_education",
      "stage": "impact-cand_A012_education",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4"
    },
    {
      "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
      "summary_text": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "e07bd2eef970bd09b57a50153289443a1373f9e2650f221c573108b186f32082",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T15:23:59.277Z",
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
    "id": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
