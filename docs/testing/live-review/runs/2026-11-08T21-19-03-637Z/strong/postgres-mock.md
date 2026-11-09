# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d",
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
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "summary_text": "Observed multiple categories of outflows in the main EUR account between August 2026 and November 2026. Observed multiple categories of inflows and outflows in the HUF account between August 2026 and November 2026. Observed account service charge fees on the main EUR account on 2026-08-09, 2026-09-10, and 2026-10-09. Observed fee transactions on the HUF account on 2026-10-07 and 2026-09-10. Observed significant transactions including a -1100 EUR outflow on 2026-11-01, a 4200 EUR inflow on 2026-09-16, a 275.4 EUR inflow on 2026-09-10, and a 411400 HUF inflow on 2026-09-16."
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "summary_text": "Multiple categories of outflows were observed in the main EUR account between August 2026 and November 2026. Multiple categories of inflows and outflows were observed in the HUF account between August 2026 and November 2026. Significant transactions occurred, including a -1100 EUR outflow on 2026-11-01, a 4200 EUR inflow on 2026-09-16, a 275.4 EUR inflow on 2026-09-10, and a 411400 HUF inflow on 2026-09-16."
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "summary_text": "No cash shortfalls projected for upcoming obligations."
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:impact-primary_A012_education",
      "stage": "impact-primary_A012_education",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675"
    },
    {
      "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "summary_text": "Uses the confirmed contribution and funding account. Selected under weight profile \"goal_advancement\", score S=0.239 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "2583e98782a8d9d12e0f277735945263ede1e1dc58ac1e26371956d09b845049",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T21:19:15.769Z",
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
    "id": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
