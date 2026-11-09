# 02 Strong · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c",
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
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846",
      "summary_text": "Analyzed 159 transactions (141 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected."
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846",
      "summary_text": "Observed account service charge outflows on the main EUR account on 2026-10-09, 2026-09-10, and 2026-08-09. Observed fee transactions on the huf account on 2026-10-07 and 2026-09-10. Observed multiple repeating categories of outflows on the main EUR account across August, September, and October 2026. Observed multiple repeating categories of inflows and outflows on the huf HUF account across August, September, October, and November 2026. Observed largest transactions include a EUR -1100 outflow and EUR 4200 inflow on the main account, and HUF -300000 and HUF 411400 amounts on the huf account."
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846",
      "summary_text": "The stated goal is to achieve general savings of 6000 EUR by 2027-06-30. Account service charges occurred on the main EUR account on 2026-10-09, 2026-09-10, and 2026-08-09. Fee transactions were recorded on the HUF account on 2026-10-07 and 2026-09-10. Large transactions include a EUR -1100 outflow and a EUR 4200 inflow on the main account, alongside HUF -300000 and HUF 411400 transactions on the HUF account."
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846",
      "summary_text": "No debt records are present in this snapshot."
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846",
      "summary_text": "No immediate cash shortfalls are projected for upcoming obligations, leaving primary focus on clarifying goal and reserve parameters."
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:impact-cand_A012_education",
      "stage": "impact-cand_A012_education",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:scoring",
      "stage": "scoring",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:robustness",
      "stage": "robustness",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846"
    },
    {
      "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_5358ee4b-af95-41b7-814e-d55e37ee146b_v3_71a481cd30d8d846",
      "summary_text": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]"
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "cb8028a1f4481ebb9238d7233c087f315a73c8f8ef47c253de832dc3b8dbcab9",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:45:25.175Z",
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
    "id": "eval_ba502d1d-d3ac-4ace-83ee-d568fdc4715c",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A012"
  }
}
~~~~
