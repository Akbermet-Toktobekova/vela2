# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7",
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
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc",
      "summary_text": "Observed account service charge outflows on the main EUR account on 2026-10-09 (-0.11 EUR), 2026-09-10 (-0.11 EUR), and 2026-08-09 (-0.13 EUR). Observed fee outflows on the huf account on 2026-10-07 (-9 HUF) and 2026-09-10 (-537 HUF). Observed an outflow of -1100 EUR on the main account on 2026-11-01. Observed an inflow of 4200 EUR on the main account on 2026-09-16. Observed a pharmacy outflow of -300000 HUF on the huf account on 2026-09-16. Observed an incoming transfer of 411400 HUF on the huf account on 2026-09-16. Multiple repeated spending and transfer categories are observed on the main EUR account between August and October 2026. Multiple repeated spending, transfer, and inflow categories are observed on the huf account between August and November 2026."
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc",
      "summary_text": "Account service charge outflows were observed on the main EUR account on 2026-10-09 (-0.11 EUR), 2026-09-10 (-0.11 EUR), and 2026-08-09 (-0.13 EUR). Fee outflows were observed on the huf account on 2026-10-07 (-9 HUF) and 2026-09-10 (-537 HUF). An outflow of -1100 EUR occurred on the main account on 2026-11-01. An inflow of 4200 EUR occurred on the main account on 2026-09-16. A pharmacy outflow of -300000 HUF occurred on the huf account on 2026-09-16. An incoming transfer of 411400 HUF occurred on the huf account on 2026-09-16. Multiple spending and transfer categories are present on the main EUR account between August and October 2026. Multiple spending, transfer, and inflow categories are present on the huf account between August and November 2026."
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc",
      "summary_text": ""
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc"
    },
    {
      "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_30b7a981-1adf-4253-884a-e53da09aa5ff_v4_b9b0fb22600403dc",
      "summary_text": "This information is needed before choosing a useful next action."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "69b4ead551616c0f4076595f70beb8441059cd9f930b3568eb59fbaa1cea4fe1",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T21:14:42.194Z",
    "entries": [
      {
        "messageIds": [
          "strong-context"
        ],
        "kind": "STATEMENT",
        "text": "The user wants to understand their saved financial information."
      },
      {
        "messageIds": [
          "strong-context"
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
    "id": "eval_95f9ffdb-78a6-4e77-9203-6de620e442a7",
    "status": "NEEDS_DATA",
    "selected_action_id": null
  }
}
~~~~
