# 03 Nora · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations. | — |

Actual Today output: **Review recurring subscription before cancellation**.

## Input

~~~~json
{
  "request": "POST /api/beta/review",
  "body": {
    "forceRefresh": true
  },
  "version": 4
}
~~~~

## Output

~~~~json
{
  "jobId": "d08943a0-2285-4b1e-9fed-3ede75a8049b",
  "decision": {
    "evaluationId": "eval_e677571b-017b-4b26-a5fd-3376f723b8a6",
    "snapshotId": "snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
    "snapshotVersion": "4.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1794169793181_e2pn_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794169793181_e2pn_6",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 10.99,
      "currency": "EUR",
      "proposedTiming": null,
      "supportingRuleIds": [
        "R010"
      ],
      "supportingClaimIds": [
        "C004"
      ],
      "supportingSourceIds": [
        "S001"
      ],
      "requiredPiInputs": [
        "transactions",
        "merchant",
        "frequency"
      ],
      "origin": "CATALOG_FALLBACK"
    },
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "expectedEffectSummary": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?",
    "weightProfileId": "goal_advancement",
    "weights": {
      "resilience": 0.2,
      "financial_benefit": 0.2,
      "goal_progress": 0.6
    },
    "values": null,
    "rawImpacts": null,
    "complexity": null,
    "score": null,
    "stability": null,
    "policyVersion": "prototype_policy_bundle_v1.4",
    "sourceIds": [
      "S001"
    ],
    "ruleIds": [
      "R010"
    ],
    "claimIds": [
      "C004"
    ],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?",
    "missingFields": [
      "fresh_account_balance",
      "stale_pi:liquid_balance",
      "stale_account_balance",
      "dated_essential_outflows",
      "stale_pi:cash_flow",
      "verified_debt_interest_terms",
      "required_pi:monthly_fee",
      "required_pi:exit_terms",
      "subscription_usage_and_exit_terms_confirmation"
    ],
    "trace": {
      "evaluationId": "eval_e677571b-017b-4b26-a5fd-3376f723b8a6",
      "userId": "a88957d8-1855-436f-91cc-17575f95ada5",
      "snapshotId": "snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T20:31:02.062Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "VERIFICATION_UNLOCK",
      "weightSelection": {
        "profileId": "goal_advancement",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.2,
          "F": 0.2,
          "G": 0.6
        },
        "triggerReason": "Coverage M = 2.88 months is sufficient, no high-APR debt is accruing, and goal 'Emergency reserve' is active and unfulfilled.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "cand_A007_snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
            "actionId": "A007",
            "actionType": "FINANCIAL_ACTION",
            "title": "Add EUR 360 to your emergency reserve",
            "description": "Earmark EUR 360 from uncommitted available cash (EUR 2405.01 safe after upcoming bills) into your accessible emergency cushion.",
            "rationale": "Organizes existing liquid funds for an emergency goal; liquid coverage is 2.88 months. Earmarking equally liquid cash does not itself increase liquidity. Checker must verify obligations over the 90-day horizon.",
            "targetId": "reserve",
            "sourceAccountId": "main",
            "destinationAccountId": "savings",
            "amount": 360,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R002",
              "R003",
              "R011"
            ],
            "supportingClaimIds": [
              "C001",
              "C002"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "liquid_balance",
              "mandatory_outflows",
              "amount"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "stale_pi:liquid_balance",
            "stale_account_balance",
            "dated_essential_outflows"
          ],
          "inputEvidence": [
            {
              "field": "liquid_balance",
              "status": "STALE"
            },
            {
              "field": "mandatory_outflows",
              "status": "VERIFIED"
            },
            {
              "field": "amount",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 2045.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A002_card",
            "actionId": "A002",
            "actionType": "FINANCIAL_ACTION",
            "title": "Pay an extra EUR 850 toward Credit card",
            "description": "Apply EUR 850 above the required minimum toward Credit card (21.9% APR).",
            "rationale": "Targets Credit card principal reduction. Checker must confirm current debt terms and deterministic code must calculate interest effects; no interest-accrual assumption is made here (R006, F008).",
            "targetId": "card",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 850,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R001",
              "R002",
              "R006"
            ],
            "supportingClaimIds": [
              "C014",
              "C015"
            ],
            "supportingSourceIds": [
              "S002",
              "S003"
            ],
            "requiredPiInputs": [
              "extra_amount",
              "apr",
              "balance",
              "cash_flow"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "stale_pi:cash_flow",
            "stale_account_balance",
            "verified_debt_interest_terms",
            "dated_essential_outflows"
          ],
          "inputEvidence": [
            {
              "field": "extra_amount",
              "status": "VERIFIED"
            },
            {
              "field": "apr",
              "status": "VERIFIED"
            },
            {
              "field": "balance",
              "status": "VERIFIED"
            },
            {
              "field": "cash_flow",
              "status": "STALE"
            }
          ],
          "projectedMinCashAfterAction": 1555.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A015_txn_stmt_1794169793181_e2pn_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794169793181_e2pn_6",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 10.99,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R010"
            ],
            "supportingClaimIds": [
              "C004"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "merchant",
              "monthly_fee",
              "exit_terms"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "required_pi:monthly_fee",
            "required_pi:exit_terms",
            "stale_account_balance",
            "subscription_usage_and_exit_terms_confirmation"
          ],
          "inputEvidence": [
            {
              "field": "merchant",
              "status": "VERIFIED"
            },
            {
              "field": "monthly_fee",
              "status": "MISSING"
            },
            {
              "field": "exit_terms",
              "status": "MISSING"
            }
          ],
          "projectedMinCashAfterAction": 2405.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "verify_A014_txn_stmt_1794169793181_e2pn_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794169793181_e2pn_6",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 10.99,
            "currency": "EUR",
            "proposedTiming": null,
            "supportingRuleIds": [
              "R010"
            ],
            "supportingClaimIds": [
              "C004"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "transactions",
              "merchant",
              "frequency"
            ],
            "origin": "CATALOG_FALLBACK"
          },
          "status": "VALID",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "transactions",
              "status": "VERIFIED"
            },
            {
              "field": "merchant",
              "status": "VERIFIED"
            },
            {
              "field": "frequency",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 2405.01,
          "unlocksActionIds": [
            "A015"
          ]
        }
      ],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "verify_A014_txn_stmt_1794169793181_e2pn_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794169793181_e2pn_6",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 10.99,
        "currency": "EUR",
        "proposedTiming": null,
        "supportingRuleIds": [
          "R010"
        ],
        "supportingClaimIds": [
          "C004"
        ],
        "supportingSourceIds": [
          "S001"
        ],
        "requiredPiInputs": [
          "transactions",
          "merchant",
          "frequency"
        ],
        "origin": "CATALOG_FALLBACK"
      },
      "stageArtifactIds": [
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:pi",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:fx",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:classification",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:pattern-recognition",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:behavior-agent",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:financial-calculator",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:debt-calculator",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:debt-agent",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:suggestion-generator",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:catalog-selector",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:checker",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:critical-coverage",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:ai-evaluation",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:weights",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:decision-engine",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review account balance currency and currency date currency",
            "description": "Examine the recorded balances for accounts account-1 and account-2 to ensure currency and balance dates are up to date.",
            "rationale": "Account balances for account-1 and account-2 are marked as stale, requiring verification before any funds allocation or debt payment.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "account-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Current dated account balances"
            ],
            "factIds": [
              "account-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Current dated account balances",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Verify rent obligation funding arrangement",
            "description": "Confirm if the rent obligation-1 due on 2026-11-06 is scheduled and which account covers it.",
            "rationale": "Obligation-1 is due soon and requires a confirmed funding arrangement to prevent payment issues.",
            "actionId": null,
            "intent": "EXECUTE",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Confirmed funding arrangement for obligation-1"
            ],
            "factIds": [
              "obligation-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Confirmed funding arrangement for obligation-1",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Verify interest accrual status for debt-1",
            "description": "Check whether interest is currently accruing on credit card debt-1.",
            "rationale": "Debt-1 analysis indicates missing interest accrual status, which is necessary to understand debt-1 terms fully.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Interest accrual status for debt-1"
            ],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Interest accrual status for debt-1",
            "evidence": []
          }
        ],
        "shortfallReason": "",
        "fallbackReason": "NO_USEFUL_PRIMARY",
        "criticalCoverageAddedIds": []
      },
      "selectedActionType": "VERIFICATION_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "supportingSourceIds": [
        "S001"
      ],
      "supportingRuleIds": [
        "R010"
      ],
      "supportingClaimIds": [
        "C004"
      ],
      "missingDataFields": [
        "fresh_account_balance",
        "stale_pi:liquid_balance",
        "stale_account_balance",
        "dated_essential_outflows",
        "stale_pi:cash_flow",
        "verified_debt_interest_terms",
        "required_pi:monthly_fee",
        "required_pi:exit_terms",
        "subscription_usage_and_exit_terms_confirmation"
      ],
      "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?"
    }
  },
  "todayCard": {
    "id": "rec_A014_eval_e677571b-017b-4b26-a5fd-3376f723b8a6",
    "userId": "a88957d8-1855-436f-91cc-17575f95ada5",
    "snapshotId": "snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
    "actionType": "review_recurring_subscription",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "suggestedAmount": 10.99,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "txn_stmt_1794169793181_e2pn_6",
    "sourceAccountId": "main",
    "priority": "clarification",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:31:02.086Z",
    "updatedAt": "2026-11-08T20:31:02.086Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:pi",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:fx",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:classification",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:pattern-recognition",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:behavior-agent",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:financial-calculator",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:debt-calculator",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:debt-agent",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:suggestion-generator",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:catalog-selector",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:checker",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:critical-coverage",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:ai-evaluation",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:weights",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:decision-engine",
        "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:explanation"
      ],
      "evaluationId": "eval_e677571b-017b-4b26-a5fd-3376f723b8a6",
      "userId": "a88957d8-1855-436f-91cc-17575f95ada5",
      "snapshotId": "snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T20:31:02.062Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "VERIFICATION_UNLOCK",
      "weightSelection": {
        "profileId": "goal_advancement",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.2,
          "F": 0.2,
          "G": 0.6
        },
        "triggerReason": "Coverage M = 2.88 months is sufficient, no high-APR debt is accruing, and goal 'Emergency reserve' is active and unfulfilled.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "cand_A007_snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
            "actionId": "A007",
            "actionType": "FINANCIAL_ACTION",
            "title": "Add EUR 360 to your emergency reserve",
            "description": "Earmark EUR 360 from uncommitted available cash (EUR 2405.01 safe after upcoming bills) into your accessible emergency cushion.",
            "rationale": "Organizes existing liquid funds for an emergency goal; liquid coverage is 2.88 months. Earmarking equally liquid cash does not itself increase liquidity. Checker must verify obligations over the 90-day horizon.",
            "targetId": "reserve",
            "sourceAccountId": "main",
            "destinationAccountId": "savings",
            "amount": 360,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R002",
              "R003",
              "R011"
            ],
            "supportingClaimIds": [
              "C001",
              "C002"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "liquid_balance",
              "mandatory_outflows",
              "amount"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "stale_pi:liquid_balance",
            "stale_account_balance",
            "dated_essential_outflows"
          ],
          "inputEvidence": [
            {
              "field": "liquid_balance",
              "status": "STALE"
            },
            {
              "field": "mandatory_outflows",
              "status": "VERIFIED"
            },
            {
              "field": "amount",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 2045.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A002_card",
            "actionId": "A002",
            "actionType": "FINANCIAL_ACTION",
            "title": "Pay an extra EUR 850 toward Credit card",
            "description": "Apply EUR 850 above the required minimum toward Credit card (21.9% APR).",
            "rationale": "Targets Credit card principal reduction. Checker must confirm current debt terms and deterministic code must calculate interest effects; no interest-accrual assumption is made here (R006, F008).",
            "targetId": "card",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 850,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R001",
              "R002",
              "R006"
            ],
            "supportingClaimIds": [
              "C014",
              "C015"
            ],
            "supportingSourceIds": [
              "S002",
              "S003"
            ],
            "requiredPiInputs": [
              "extra_amount",
              "apr",
              "balance",
              "cash_flow"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "stale_pi:cash_flow",
            "stale_account_balance",
            "verified_debt_interest_terms",
            "dated_essential_outflows"
          ],
          "inputEvidence": [
            {
              "field": "extra_amount",
              "status": "VERIFIED"
            },
            {
              "field": "apr",
              "status": "VERIFIED"
            },
            {
              "field": "balance",
              "status": "VERIFIED"
            },
            {
              "field": "cash_flow",
              "status": "STALE"
            }
          ],
          "projectedMinCashAfterAction": 1555.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A015_txn_stmt_1794169793181_e2pn_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794169793181_e2pn_6",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 10.99,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R010"
            ],
            "supportingClaimIds": [
              "C004"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "merchant",
              "monthly_fee",
              "exit_terms"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "required_pi:monthly_fee",
            "required_pi:exit_terms",
            "stale_account_balance",
            "subscription_usage_and_exit_terms_confirmation"
          ],
          "inputEvidence": [
            {
              "field": "merchant",
              "status": "VERIFIED"
            },
            {
              "field": "monthly_fee",
              "status": "MISSING"
            },
            {
              "field": "exit_terms",
              "status": "MISSING"
            }
          ],
          "projectedMinCashAfterAction": 2405.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "verify_A014_txn_stmt_1794169793181_e2pn_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794169793181_e2pn_6",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 10.99,
            "currency": "EUR",
            "proposedTiming": null,
            "supportingRuleIds": [
              "R010"
            ],
            "supportingClaimIds": [
              "C004"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "transactions",
              "merchant",
              "frequency"
            ],
            "origin": "CATALOG_FALLBACK"
          },
          "status": "VALID",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "transactions",
              "status": "VERIFIED"
            },
            {
              "field": "merchant",
              "status": "VERIFIED"
            },
            {
              "field": "frequency",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 2405.01,
          "unlocksActionIds": [
            "A015"
          ]
        }
      ],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "verify_A014_txn_stmt_1794169793181_e2pn_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794169793181_e2pn_6",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 10.99,
        "currency": "EUR",
        "proposedTiming": null,
        "supportingRuleIds": [
          "R010"
        ],
        "supportingClaimIds": [
          "C004"
        ],
        "supportingSourceIds": [
          "S001"
        ],
        "requiredPiInputs": [
          "transactions",
          "merchant",
          "frequency"
        ],
        "origin": "CATALOG_FALLBACK"
      },
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review account balance currency and currency date currency",
            "description": "Examine the recorded balances for accounts account-1 and account-2 to ensure currency and balance dates are up to date.",
            "rationale": "Account balances for account-1 and account-2 are marked as stale, requiring verification before any funds allocation or debt payment.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "account-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Current dated account balances"
            ],
            "factIds": [
              "account-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Current dated account balances",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Verify rent obligation funding arrangement",
            "description": "Confirm if the rent obligation-1 due on 2026-11-06 is scheduled and which account covers it.",
            "rationale": "Obligation-1 is due soon and requires a confirmed funding arrangement to prevent payment issues.",
            "actionId": null,
            "intent": "EXECUTE",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Confirmed funding arrangement for obligation-1"
            ],
            "factIds": [
              "obligation-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Confirmed funding arrangement for obligation-1",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Verify interest accrual status for debt-1",
            "description": "Check whether interest is currently accruing on credit card debt-1.",
            "rationale": "Debt-1 analysis indicates missing interest accrual status, which is necessary to understand debt-1 terms fully.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Interest accrual status for debt-1"
            ],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Interest accrual status for debt-1",
            "evidence": []
          }
        ],
        "shortfallReason": "",
        "fallbackReason": "NO_USEFUL_PRIMARY",
        "criticalCoverageAddedIds": []
      },
      "selectedActionType": "VERIFICATION_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "supportingSourceIds": [
        "S001"
      ],
      "supportingRuleIds": [
        "R010"
      ],
      "supportingClaimIds": [
        "C004"
      ],
      "missingDataFields": [
        "fresh_account_balance",
        "stale_pi:liquid_balance",
        "stale_account_balance",
        "dated_essential_outflows",
        "stale_pi:cash_flow",
        "verified_debt_interest_terms",
        "required_pi:monthly_fee",
        "required_pi:exit_terms",
        "subscription_usage_and_exit_terms_confirmation"
      ],
      "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?"
    },
    "decision": {
      "evaluationId": "eval_e677571b-017b-4b26-a5fd-3376f723b8a6",
      "snapshotId": "snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
      "snapshotVersion": "4.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "VERIFICATION_UNLOCK",
      "selectedActionId": "A014",
      "selectedActionType": "VERIFICATION_ACTION",
      "candidate": {
        "candidateId": "verify_A014_txn_stmt_1794169793181_e2pn_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794169793181_e2pn_6",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 10.99,
        "currency": "EUR",
        "proposedTiming": null,
        "supportingRuleIds": [
          "R010"
        ],
        "supportingClaimIds": [
          "C004"
        ],
        "supportingSourceIds": [
          "S001"
        ],
        "requiredPiInputs": [
          "transactions",
          "merchant",
          "frequency"
        ],
        "origin": "CATALOG_FALLBACK"
      },
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
      "expectedEffectSummary": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?",
      "weightProfileId": "goal_advancement",
      "weights": {
        "resilience": 0.2,
        "financial_benefit": 0.2,
        "goal_progress": 0.6
      },
      "values": null,
      "rawImpacts": null,
      "complexity": null,
      "score": null,
      "stability": null,
      "policyVersion": "prototype_policy_bundle_v1.4",
      "sourceIds": [
        "S001"
      ],
      "ruleIds": [
        "R010"
      ],
      "claimIds": [
        "C004"
      ],
      "dataQualityStatus": "PROTOTYPE_POLICY",
      "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?",
      "missingFields": [
        "fresh_account_balance",
        "stale_pi:liquid_balance",
        "stale_account_balance",
        "dated_essential_outflows",
        "stale_pi:cash_flow",
        "verified_debt_interest_terms",
        "required_pi:monthly_fee",
        "required_pi:exit_terms",
        "subscription_usage_and_exit_terms_confirmation"
      ],
      "trace": {
        "evaluationId": "eval_e677571b-017b-4b26-a5fd-3376f723b8a6",
        "userId": "a88957d8-1855-436f-91cc-17575f95ada5",
        "snapshotId": "snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
        "snapshotVersion": "4.0",
        "createdAt": "2026-11-08T20:31:02.062Z",
        "runtimeMode": "PROTOTYPE_MODE",
        "policyBundleVersion": "prototype_policy_bundle_v1.4",
        "priorityClass": "VERIFICATION_UNLOCK",
        "weightSelection": {
          "profileId": "goal_advancement",
          "previousProfileId": null,
          "hysteresisApplied": false,
          "weights": {
            "R": 0.2,
            "F": 0.2,
            "G": 0.6
          },
          "triggerReason": "Coverage M = 2.88 months is sufficient, no high-APR debt is accruing, and goal 'Emergency reserve' is active and unfulfilled.",
          "policyVersion": "weight_policy_v1_prototype"
        },
        "validatedCandidates": [
          {
            "candidate": {
              "candidateId": "cand_A007_snap_beta_a88957d8-1855-436f-91cc-17575f95ada5_v4_465e664de0264638",
              "actionId": "A007",
              "actionType": "FINANCIAL_ACTION",
              "title": "Add EUR 360 to your emergency reserve",
              "description": "Earmark EUR 360 from uncommitted available cash (EUR 2405.01 safe after upcoming bills) into your accessible emergency cushion.",
              "rationale": "Organizes existing liquid funds for an emergency goal; liquid coverage is 2.88 months. Earmarking equally liquid cash does not itself increase liquidity. Checker must verify obligations over the 90-day horizon.",
              "targetId": "reserve",
              "sourceAccountId": "main",
              "destinationAccountId": "savings",
              "amount": 360,
              "currency": "EUR",
              "proposedTiming": "2026-11-05",
              "supportingRuleIds": [
                "R002",
                "R003",
                "R011"
              ],
              "supportingClaimIds": [
                "C001",
                "C002"
              ],
              "supportingSourceIds": [
                "S001"
              ],
              "requiredPiInputs": [
                "liquid_balance",
                "mandatory_outflows",
                "amount"
              ],
              "origin": "AI_SUGGESTION"
            },
            "status": "NEEDS_DATA",
            "isCritical": false,
            "criticalPriorityRank": null,
            "resolvesCriticalProblemDirectly": false,
            "failedChecks": [],
            "missingFields": [
              "fresh_account_balance",
              "stale_pi:liquid_balance",
              "stale_account_balance",
              "dated_essential_outflows"
            ],
            "inputEvidence": [
              {
                "field": "liquid_balance",
                "status": "STALE"
              },
              {
                "field": "mandatory_outflows",
                "status": "VERIFIED"
              },
              {
                "field": "amount",
                "status": "VERIFIED"
              }
            ],
            "projectedMinCashAfterAction": 2045.01,
            "unlocksActionIds": []
          },
          {
            "candidate": {
              "candidateId": "cand_A002_card",
              "actionId": "A002",
              "actionType": "FINANCIAL_ACTION",
              "title": "Pay an extra EUR 850 toward Credit card",
              "description": "Apply EUR 850 above the required minimum toward Credit card (21.9% APR).",
              "rationale": "Targets Credit card principal reduction. Checker must confirm current debt terms and deterministic code must calculate interest effects; no interest-accrual assumption is made here (R006, F008).",
              "targetId": "card",
              "sourceAccountId": "main",
              "destinationAccountId": null,
              "amount": 850,
              "currency": "EUR",
              "proposedTiming": "2026-11-05",
              "supportingRuleIds": [
                "R001",
                "R002",
                "R006"
              ],
              "supportingClaimIds": [
                "C014",
                "C015"
              ],
              "supportingSourceIds": [
                "S002",
                "S003"
              ],
              "requiredPiInputs": [
                "extra_amount",
                "apr",
                "balance",
                "cash_flow"
              ],
              "origin": "AI_SUGGESTION"
            },
            "status": "NEEDS_DATA",
            "isCritical": false,
            "criticalPriorityRank": null,
            "resolvesCriticalProblemDirectly": false,
            "failedChecks": [],
            "missingFields": [
              "fresh_account_balance",
              "stale_pi:cash_flow",
              "stale_account_balance",
              "verified_debt_interest_terms",
              "dated_essential_outflows"
            ],
            "inputEvidence": [
              {
                "field": "extra_amount",
                "status": "VERIFIED"
              },
              {
                "field": "apr",
                "status": "VERIFIED"
              },
              {
                "field": "balance",
                "status": "VERIFIED"
              },
              {
                "field": "cash_flow",
                "status": "STALE"
              }
            ],
            "projectedMinCashAfterAction": 1555.01,
            "unlocksActionIds": []
          },
          {
            "candidate": {
              "candidateId": "cand_A015_txn_stmt_1794169793181_e2pn_6",
              "actionId": "A015",
              "actionType": "FINANCIAL_ACTION",
              "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
              "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
              "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
              "targetId": "txn_stmt_1794169793181_e2pn_6",
              "sourceAccountId": "main",
              "destinationAccountId": null,
              "amount": 10.99,
              "currency": "EUR",
              "proposedTiming": "2026-11-05",
              "supportingRuleIds": [
                "R010"
              ],
              "supportingClaimIds": [
                "C004"
              ],
              "supportingSourceIds": [
                "S001"
              ],
              "requiredPiInputs": [
                "merchant",
                "monthly_fee",
                "exit_terms"
              ],
              "origin": "AI_SUGGESTION"
            },
            "status": "NEEDS_DATA",
            "isCritical": false,
            "criticalPriorityRank": null,
            "resolvesCriticalProblemDirectly": false,
            "failedChecks": [],
            "missingFields": [
              "fresh_account_balance",
              "required_pi:monthly_fee",
              "required_pi:exit_terms",
              "stale_account_balance",
              "subscription_usage_and_exit_terms_confirmation"
            ],
            "inputEvidence": [
              {
                "field": "merchant",
                "status": "VERIFIED"
              },
              {
                "field": "monthly_fee",
                "status": "MISSING"
              },
              {
                "field": "exit_terms",
                "status": "MISSING"
              }
            ],
            "projectedMinCashAfterAction": 2405.01,
            "unlocksActionIds": []
          },
          {
            "candidate": {
              "candidateId": "verify_A014_txn_stmt_1794169793181_e2pn_6",
              "actionId": "A014",
              "actionType": "VERIFICATION_ACTION",
              "title": "Review recurring subscription before cancellation",
              "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
              "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
              "targetId": "txn_stmt_1794169793181_e2pn_6",
              "sourceAccountId": "main",
              "destinationAccountId": null,
              "amount": 10.99,
              "currency": "EUR",
              "proposedTiming": null,
              "supportingRuleIds": [
                "R010"
              ],
              "supportingClaimIds": [
                "C004"
              ],
              "supportingSourceIds": [
                "S001"
              ],
              "requiredPiInputs": [
                "transactions",
                "merchant",
                "frequency"
              ],
              "origin": "CATALOG_FALLBACK"
            },
            "status": "VALID",
            "isCritical": false,
            "criticalPriorityRank": null,
            "resolvesCriticalProblemDirectly": false,
            "failedChecks": [],
            "missingFields": [],
            "inputEvidence": [
              {
                "field": "transactions",
                "status": "VERIFIED"
              },
              {
                "field": "merchant",
                "status": "VERIFIED"
              },
              {
                "field": "frequency",
                "status": "VERIFIED"
              }
            ],
            "projectedMinCashAfterAction": 2405.01,
            "unlocksActionIds": [
              "A015"
            ]
          }
        ],
        "scoredCandidates": [],
        "robustness": null,
        "selectedCandidate": {
          "candidateId": "verify_A014_txn_stmt_1794169793181_e2pn_6",
          "actionId": "A014",
          "actionType": "VERIFICATION_ACTION",
          "title": "Review recurring subscription before cancellation",
          "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
          "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
          "targetId": "txn_stmt_1794169793181_e2pn_6",
          "sourceAccountId": "main",
          "destinationAccountId": null,
          "amount": 10.99,
          "currency": "EUR",
          "proposedTiming": null,
          "supportingRuleIds": [
            "R010"
          ],
          "supportingClaimIds": [
            "C004"
          ],
          "supportingSourceIds": [
            "S001"
          ],
          "requiredPiInputs": [
            "transactions",
            "merchant",
            "frequency"
          ],
          "origin": "CATALOG_FALLBACK"
        },
        "stageArtifactIds": [
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:pi",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:fx",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:classification",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:pattern-recognition",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:behavior-agent",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:financial-calculator",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:debt-calculator",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:debt-agent",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:suggestion-generator",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:catalog-selector",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:checker",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:critical-coverage",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:ai-evaluation",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:weights",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:decision-engine",
          "eval_e677571b-017b-4b26-a5fd-3376f723b8a6:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review account balance currency and currency date currency",
              "description": "Examine the recorded balances for accounts account-1 and account-2 to ensure currency and balance dates are up to date.",
              "rationale": "Account balances for account-1 and account-2 are marked as stale, requiring verification before any funds allocation or debt payment.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "account-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Current dated account balances"
              ],
              "factIds": [
                "account-1",
                "account-2"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Current dated account balances",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Verify rent obligation funding arrangement",
              "description": "Confirm if the rent obligation-1 due on 2026-11-06 is scheduled and which account covers it.",
              "rationale": "Obligation-1 is due soon and requires a confirmed funding arrangement to prevent payment issues.",
              "actionId": null,
              "intent": "EXECUTE",
              "origin": "MODEL",
              "targetFactId": "obligation-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Confirmed funding arrangement for obligation-1"
              ],
              "factIds": [
                "obligation-1",
                "account-1"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Confirmed funding arrangement for obligation-1",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "Verify interest accrual status for debt-1",
              "description": "Check whether interest is currently accruing on credit card debt-1.",
              "rationale": "Debt-1 analysis indicates missing interest accrual status, which is necessary to understand debt-1 terms fully.",
              "actionId": null,
              "intent": "CLARIFY",
              "origin": "MODEL",
              "targetFactId": "debt-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Interest accrual status for debt-1"
              ],
              "factIds": [
                "debt-1"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Interest accrual status for debt-1",
              "evidence": []
            }
          ],
          "shortfallReason": "",
          "fallbackReason": "NO_USEFUL_PRIMARY",
          "criticalCoverageAddedIds": []
        },
        "selectedActionType": "VERIFICATION_ACTION",
        "decisionStatus": "RECOMMENDATION_READY",
        "decisionReason": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "supportingSourceIds": [
          "S001"
        ],
        "supportingRuleIds": [
          "R010"
        ],
        "supportingClaimIds": [
          "C004"
        ],
        "missingDataFields": [
          "fresh_account_balance",
          "stale_pi:liquid_balance",
          "stale_account_balance",
          "dated_essential_outflows",
          "stale_pi:cash_flow",
          "verified_debt_interest_terms",
          "required_pi:monthly_fee",
          "required_pi:exit_terms",
          "subscription_usage_and_exit_terms_confirmation"
        ],
        "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?"
      }
    }
  },
  "primaryProposals": [
    {
      "id": "primary-1",
      "title": "Review account balance currency and currency date currency",
      "description": "Examine the recorded balances for accounts account-1 and account-2 to ensure currency and balance dates are up to date.",
      "rationale": "Account balances for account-1 and account-2 are marked as stale, requiring verification before any funds allocation or debt payment.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "account-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Current dated account balances"
      ],
      "factIds": [
        "account-1",
        "account-2"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Current dated account balances",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Verify rent obligation funding arrangement",
      "description": "Confirm if the rent obligation-1 due on 2026-11-06 is scheduled and which account covers it.",
      "rationale": "Obligation-1 is due soon and requires a confirmed funding arrangement to prevent payment issues.",
      "actionId": null,
      "intent": "EXECUTE",
      "origin": "MODEL",
      "targetFactId": "obligation-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Confirmed funding arrangement for obligation-1"
      ],
      "factIds": [
        "obligation-1",
        "account-1"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Confirmed funding arrangement for obligation-1",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Verify interest accrual status for debt-1",
      "description": "Check whether interest is currently accruing on credit card debt-1.",
      "rationale": "Debt-1 analysis indicates missing interest accrual status, which is necessary to understand debt-1 terms fully.",
      "actionId": null,
      "intent": "CLARIFY",
      "origin": "MODEL",
      "targetFactId": "debt-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Interest accrual status for debt-1"
      ],
      "factIds": [
        "debt-1"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Interest accrual status for debt-1",
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 135668
    },
    {
      "doc_key": "chat",
      "stored_bytes": 552
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 872
    },
    {
      "doc_key": "chat-request:nora-context",
      "stored_bytes": 1252
    },
    {
      "doc_key": "engine",
      "stored_bytes": 485968
    },
    {
      "doc_key": "import:39b21c49-6b99-4a4f-b732-3f987ffb6887",
      "stored_bytes": 55096
    },
    {
      "doc_key": "import:74047aca-57da-4cdc-9a91-f5aa1d416aed",
      "stored_bytes": 4864
    },
    {
      "doc_key": "job-request:6470b86612cab7e72fc8b7fc9aaf1bde2c12e665e413b237e85aac67684f36ef",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:6a5789fe5d647946a673d81307aa070cf3833ef33d88de60c6a267ae5518521c",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:ab63a5424f2b050da5c1265d5197836fc80514b43f5c6223afc100c448bd60af",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:8753135b-d97d-4eb2-9c58-eed01ed35937",
      "stored_bytes": 62416
    },
    {
      "doc_key": "job:8c085b77-e964-44fc-b2cf-45dc6699a9cd",
      "stored_bytes": 5652
    },
    {
      "doc_key": "job:d08943a0-2285-4b1e-9fed-3ede75a8049b",
      "stored_bytes": 136108
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:ai-evaluation",
      "stored_bytes": 4528
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:behavior-agent",
      "stored_bytes": 3436
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:catalog-selector",
      "stored_bytes": 5036
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:checker",
      "stored_bytes": 18988
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:classification",
      "stored_bytes": 42208
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:debt-agent",
      "stored_bytes": 2520
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:debt-calculator",
      "stored_bytes": 1780
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:decision-engine",
      "stored_bytes": 14556
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:explanation",
      "stored_bytes": 2984
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:financial-calculator",
      "stored_bytes": 15888
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:fx",
      "stored_bytes": 1300
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:pattern-recognition",
      "stored_bytes": 26104
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:pi",
      "stored_bytes": 1640
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:suggestion-generator",
      "stored_bytes": 4264
    },
    {
      "doc_key": "stage:eval_e677571b-017b-4b26-a5fd-3376f723b8a6:weights",
      "stored_bytes": 1784
    },
    {
      "doc_key": "state",
      "stored_bytes": 86336
    }
  ]
}
~~~~

## Summary

~~~~text
Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.
~~~~
