# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e",
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
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5",
      "summary_text": "Analyzed 159 transactions (142 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5",
      "summary_text": "Observed multiple outflow transactions across various merchant categories in the main EUR account between August and November 2026. Observed multiple HUF account inflows and outflows across various categories between August and November 2026. Observed account service charges and fees on both the main (EUR) and huf (HUF) accounts."
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5",
      "summary_text": "Observed multiple outflow transactions across various merchant categories in the main EUR account between August and November 2026. Observed multiple HUF account inflows and outflows across various categories between August and November 2026. Observed account service charges and fees on both the main (EUR) and huf (HUF) accounts."
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5",
      "summary_text": "No further executable financial transfers or external data sources are needed for these foundational review and clarification steps."
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5"
    },
    {
      "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_5cfb19d4-c0fe-4693-9360-c0ce7994aa65_v3_3f07421bed3939f5",
      "summary_text": "Checking upcoming obligations prevents missed payments and maintains clear visibility of immediate financial commitments."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "b0fe945b1584844d000e2d81da0e2d816583a9086a36ebab5e89b127f9dce95f",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:07:08.989Z",
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
    "id": "eval_3435dce0-4a4f-4e62-9e9b-e36153f62b3e",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": null
  }
}
~~~~
