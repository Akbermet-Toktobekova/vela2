# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_0831432d-3016-446f-97ea-098e07af7927",
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
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856",
      "summary_text": "Analyzed 159 transactions (143 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856",
      "summary_text": "Observed account service charge outflows on the main account in EUR. Observed fee outflows on the huf account in HUF. Observed largest transactions classified as extreme-1 through extreme-18 across main and huf accounts. Unconfirmed: Hypothesized timing relationships between income and obligations for EUR currency scope. Observed repeated activity categories on the main account in EUR. Observed repeated activity categories on the huf account in HUF."
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856",
      "summary_text": "Recorded multiple outflow categories on the main EUR account. Recorded multiple inflow and outflow categories on the HUF account. Recorded recurring fee and service charge outflows across accounts. Identified the largest recorded amounts across accounts under extreme classifications. Unconfirmed: Hypothesized timing intervals between projected income and obligations for EUR currency."
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856",
      "summary_text": ""
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:impact-cand_A012_education",
      "stage": "impact-cand_A012_education",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856"
    },
    {
      "id": "eval_0831432d-3016-446f-97ea-098e07af7927:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_84c7c8d7-71c9-4cd1-a61a-f04173df500e_v3_b67a03346e34b856",
      "summary_text": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "a2333a2cba047f1754f429ebc5c23e98ff40909cf16c0738461aa3158addbccd",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T16:41:31.390Z",
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
    "id": "eval_0831432d-3016-446f-97ea-098e07af7927",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
