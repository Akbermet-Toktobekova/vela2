# 03 Nora · postgres mock

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | In-memory projection exported to this report. | — |

## Input

~~~~json
{
  "betaEvaluationId": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2",
  "draft": "See ../../../PI-STORAGE.md."
}
~~~~

## Output

~~~~json
{
  "simulated": true,
  "pi.debts": [
    {
      "id": "card",
      "userId": "acad8412-bf7c-4769-b644-3865313d7549",
      "name": "Credit card",
      "debtType": "credit_card",
      "currency": "EUR",
      "remainingBalance": 850,
      "apr": 21.9,
      "minimumPayment": 55,
      "nextDueDate": "2026-11-15",
      "paymentFrequency": "monthly",
      "createdAt": "2026-11-05T12:00:00.000Z"
    }
  ],
  "analysis.stage_artifacts": [
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:fx",
      "stage": "fx",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:classification",
      "stage": "classification",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "summary_text": "Analyzed 48 transactions (48 classified; user_confirmed preserved). Detected 2 recurring subscription candidate(s) (Sound Library: EUR 10.99, Screen Library: EUR 15.99) requiring user confirmation before any cancellation proposal (R010)."
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pattern-recognition",
      "stage": "pattern-recognition",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "summary_text": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:behavior-agent",
      "stage": "behavior-agent",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "summary_text": "Outflows to harbor properties occurred monthly in August, September, and October 2026 with an amount of -980 EUR. Inflows from danube studio occurred monthly in August, September, and October 2026 with an amount of 2350 EUR. An emergency cushion goal is specified with a target amount of 3000 EUR by target date 2027-06-30."
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:financial-calculator",
      "stage": "financial-calculator",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-calculator",
      "stage": "debt-calculator",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-agent",
      "stage": "debt-agent",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "summary_text": "Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing."
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:suggestion-generator",
      "stage": "suggestion-generator",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "summary_text": "No immediate cash shortfalls identified for upcoming obligations."
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:catalog-selector",
      "stage": "catalog-selector",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:checker",
      "stage": "checker",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:critical-coverage",
      "stage": "critical-coverage",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:ai-evaluation",
      "stage": "ai-evaluation",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:weights",
      "stage": "weights",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:decision-engine",
      "stage": "decision-engine",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439"
    },
    {
      "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:explanation",
      "stage": "explanation",
      "input_snapshot_id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "summary_text": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: dated_essential_outflows, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001."
    }
  ],
  "analysis.conversation_memory": {
    "inputHash": "1e3078c0c8d6828f3f9cb2693bb3e12a95d9a7d1305cc1f0e6d83d0d0a07b6e6",
    "promptVersion": "chat-memory.v2",
    "status": "CURRENT",
    "updatedAt": "2026-11-08T20:37:38.857Z",
    "entries": [
      {
        "messageIds": [
          "nora-context"
        ],
        "kind": "STATEMENT",
        "text": "The user wants to understand their saved financial information."
      },
      {
        "messageIds": [
          "nora-context"
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
    "id": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2",
    "status": "RECOMMENDATION_READY",
    "selected_action_id": "A014"
  }
}
~~~~
