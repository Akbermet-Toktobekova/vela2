# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef",
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
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405",
      "summary_text": "Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405",
      "summary_text": "Pattern Recognition observed 24 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405",
      "summary_text": "No applicable verified claim supports a specific action."
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:impact-cand_A012_education",
      "stage": "impact-cand_A012_education",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405"
    },
    {
      "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_12f5c658-c6af-4658-bb90-19825ae3369e_v3_25c62c0fed000405",
      "summary_text": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "f1d753ada6710c69c3dd8aa20a782b2d7ca5a41cb4015b695d8d6371a545ff08",
    "promptVersion": "chat-memory.v1",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T15:32:24.613Z",
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
    "id": "eval_033bfb28-6cee-4237-9c6c-c113d54fbeef",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
