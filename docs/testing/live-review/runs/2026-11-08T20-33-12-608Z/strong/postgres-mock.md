# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7",
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
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f",
      "summary_text": "Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f",
      "summary_text": "An outflow of -1100 EUR was recorded on 2026-11-01. A general savings goal of 6000 EUR with a target date of 2027-06-30 is stated."
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f",
      "summary_text": ""
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:impact-cand_A012_education",
      "stage": "impact-cand_A012_education",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f"
    },
    {
      "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_3e7955c8-8f8e-40cc-9058-4ca40552fe90_v4_1f3ae7968544243f",
      "summary_text": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "e0728d17633c438f2a4e7064ab6a3ebbc7bd70a2cac73f43bacf9b3f42ba1316",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:33:24.002Z",
    "entries": [
      {
        "messageIds": [
          "strong-context"
        ],
        "kind": "STATEMENT",
        "text": "The user would like to understand their saved financial information."
      },
      {
        "messageIds": [
          "strong-context"
        ],
        "kind": "TENTATIVE_PLAN",
        "text": "The user may review their budget later."
      }
    ],
    "summaryText": "The user would like to understand their saved financial information. The user may review their budget later.",
    "model": {
      "provider": "gemini",
      "modelUsed": "gemini-3.5-flash-lite",
      "liveCallUsed": true
    }
  },
  "analysis.decisions": {
    "id": "eval_2e4ab420-b546-4b0d-bb69-1b22bfd1ecd7",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
