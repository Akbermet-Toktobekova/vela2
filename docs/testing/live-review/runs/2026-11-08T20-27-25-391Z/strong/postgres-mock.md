# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f",
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
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20",
      "summary_text": "Observed multiple recurring outflow categories in the main EUR account between August 2026 and October 2026. Observed account service charge outflows in the main EUR account on 2026-08-09, 2026-09-10, and 2026-10-09. Observed multiple recurring inflows and outflows in the HUF account between August 2026 and November 2026. Observed fee transactions in the HUF account on 2026-10-07 and 2026-09-10."
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20",
      "summary_text": "Observed multiple recurring outflow categories in the main EUR account between August 2026 and October 2026. Observed account service charge outflows in the main EUR account on 2026-08-09, 2026-09-10, and 2026-10-09. Observed multiple recurring inflows and outflows in the HUF account between August 2026 and November 2026. Observed fee transactions in the HUF account on 2026-10-07 and 2026-09-10."
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20",
      "summary_text": ""
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:impact-cand_A012_education",
      "stage": "impact-cand_A012_education",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20"
    },
    {
      "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20",
      "summary_text": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "eeb402eb9471df7c6ca7c73014f7f3ee97f19fea18940571a466211ea12b49c7",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:28:24.180Z",
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
    "id": "eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
