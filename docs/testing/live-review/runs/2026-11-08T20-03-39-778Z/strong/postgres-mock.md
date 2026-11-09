# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_a6188dea-46c9-412c-a216-5050f05b3544",
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
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d",
      "summary_text": "Observed multiple outflow transactions across various categories in the main EUR account between August and November 2026. Observed multiple inflow and outflow transactions across various categories in the HUF account between August and November 2026. Observed account service charges and fees in both EUR and HUF accounts. Observed specific largest transactions and amounts within the observed periods for both accounts. Observed comparative timing between income and specific financial obligations relative to reference date 2026-11-05."
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d",
      "summary_text": "Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d",
      "summary_text": "The model did not return a valid three-proposal response."
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d"
    },
    {
      "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_4558dd19-99b1-4dda-a9ec-0f6a9275184c_v3_3efd58a95133b65d",
      "summary_text": "No candidate action passed safety, eligibility, and cash-flow affordability gates for this snapshot."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "a74be18bee2a862e9478438e5b471ee07253dc22fd2b093700a0e90230ef5f2a",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:03:53.850Z",
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
    "id": "eval_a6188dea-46c9-412c-a216-5050f05b3544",
    "status": "NO_RECOMMENDATION",
    "selected_action_id": null
  }
}
~~~~
