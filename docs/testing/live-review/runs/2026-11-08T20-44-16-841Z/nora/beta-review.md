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
  "jobId": "c0cdc6cb-9324-4473-8019-468087dfbb78",
  "decision": {
    "evaluationId": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b",
    "snapshotId": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
    "snapshotVersion": "4.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1794170821466_aau7_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794170821466_aau7_6",
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
      "evaluationId": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b",
      "userId": "029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6",
      "snapshotId": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T20:48:15.817Z",
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
            "candidateId": "cand_A007_snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
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
            "candidateId": "cand_A015_txn_stmt_1794170821466_aau7_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794170821466_aau7_6",
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
            "candidateId": "verify_A014_txn_stmt_1794170821466_aau7_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794170821466_aau7_6",
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
        "candidateId": "verify_A014_txn_stmt_1794170821466_aau7_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794170821466_aau7_6",
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
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pi",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:fx",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:classification",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pattern-recognition",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:behavior-agent",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:financial-calculator",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-calculator",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-agent",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:suggestion-generator",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:catalog-selector",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:checker",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:critical-coverage",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:ai-evaluation",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:weights",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:decision-engine",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Check current dated account balances",
            "description": "What is the current available balance and balance date for each affected account?",
            "rationale": "Account balances are currently marked as stale as of 2026-10-28.",
            "actionId": null,
            "intent": "CLARIFY",
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
            "title": "Review debt interest terms",
            "description": "Check the interest accrual status for credit card debt-1 currently carrying an APR of {{debt-1.apr}}% and balance of 850 EUR due on {{debt-1.nextDueDate}}.",
            "rationale": "Debt-1 requires verification of its interest accrual status.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Use a reference to the exact PI field for a date, amount or rate.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Check interest accrual status for debt-1",
            "description": "Does the latest statement confirm that interest is currently accruing?",
            "rationale": "Missing interest accrual status prevents complete debt evaluation.",
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
    "id": "rec_A014_eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b",
    "userId": "029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6",
    "snapshotId": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
    "actionType": "review_recurring_subscription",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "suggestedAmount": 10.99,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "txn_stmt_1794170821466_aau7_6",
    "sourceAccountId": "main",
    "priority": "clarification",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:48:15.840Z",
    "updatedAt": "2026-11-08T20:48:15.840Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pi",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:fx",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:classification",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pattern-recognition",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:behavior-agent",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:financial-calculator",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-calculator",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-agent",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:suggestion-generator",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:catalog-selector",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:checker",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:critical-coverage",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:ai-evaluation",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:weights",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:decision-engine",
        "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:explanation"
      ],
      "evaluationId": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b",
      "userId": "029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6",
      "snapshotId": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T20:48:15.817Z",
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
            "candidateId": "cand_A007_snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
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
            "candidateId": "cand_A015_txn_stmt_1794170821466_aau7_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794170821466_aau7_6",
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
            "candidateId": "verify_A014_txn_stmt_1794170821466_aau7_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794170821466_aau7_6",
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
        "candidateId": "verify_A014_txn_stmt_1794170821466_aau7_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794170821466_aau7_6",
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
            "title": "Check current dated account balances",
            "description": "What is the current available balance and balance date for each affected account?",
            "rationale": "Account balances are currently marked as stale as of 2026-10-28.",
            "actionId": null,
            "intent": "CLARIFY",
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
            "title": "Review debt interest terms",
            "description": "Check the interest accrual status for credit card debt-1 currently carrying an APR of {{debt-1.apr}}% and balance of 850 EUR due on {{debt-1.nextDueDate}}.",
            "rationale": "Debt-1 requires verification of its interest accrual status.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Use a reference to the exact PI field for a date, amount or rate.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Check interest accrual status for debt-1",
            "description": "Does the latest statement confirm that interest is currently accruing?",
            "rationale": "Missing interest accrual status prevents complete debt evaluation.",
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
      "evaluationId": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b",
      "snapshotId": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
      "snapshotVersion": "4.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "VERIFICATION_UNLOCK",
      "selectedActionId": "A014",
      "selectedActionType": "VERIFICATION_ACTION",
      "candidate": {
        "candidateId": "verify_A014_txn_stmt_1794170821466_aau7_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794170821466_aau7_6",
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
        "evaluationId": "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b",
        "userId": "029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6",
        "snapshotId": "snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
        "snapshotVersion": "4.0",
        "createdAt": "2026-11-08T20:48:15.817Z",
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
              "candidateId": "cand_A007_snap_beta_029c5a5f-a7a4-4a8c-94d4-8cf9fc4a03a6_v4_9e094179b5f325ff",
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
              "candidateId": "cand_A015_txn_stmt_1794170821466_aau7_6",
              "actionId": "A015",
              "actionType": "FINANCIAL_ACTION",
              "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
              "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
              "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
              "targetId": "txn_stmt_1794170821466_aau7_6",
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
              "candidateId": "verify_A014_txn_stmt_1794170821466_aau7_6",
              "actionId": "A014",
              "actionType": "VERIFICATION_ACTION",
              "title": "Review recurring subscription before cancellation",
              "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
              "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
              "targetId": "txn_stmt_1794170821466_aau7_6",
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
          "candidateId": "verify_A014_txn_stmt_1794170821466_aau7_6",
          "actionId": "A014",
          "actionType": "VERIFICATION_ACTION",
          "title": "Review recurring subscription before cancellation",
          "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
          "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
          "targetId": "txn_stmt_1794170821466_aau7_6",
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
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pi",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:fx",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:classification",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pattern-recognition",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:behavior-agent",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:financial-calculator",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-calculator",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-agent",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:suggestion-generator",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:catalog-selector",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:checker",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:critical-coverage",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:ai-evaluation",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:weights",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:decision-engine",
          "eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Check current dated account balances",
              "description": "What is the current available balance and balance date for each affected account?",
              "rationale": "Account balances are currently marked as stale as of 2026-10-28.",
              "actionId": null,
              "intent": "CLARIFY",
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
              "title": "Review debt interest terms",
              "description": "Check the interest accrual status for credit card debt-1 currently carrying an APR of {{debt-1.apr}}% and balance of 850 EUR due on {{debt-1.nextDueDate}}.",
              "rationale": "Debt-1 requires verification of its interest accrual status.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "debt-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "debt-1"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Use a reference to the exact PI field for a date, amount or rate.",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "Check interest accrual status for debt-1",
              "description": "Does the latest statement confirm that interest is currently accruing?",
              "rationale": "Missing interest accrual status prevents complete debt evaluation.",
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
      "title": "Check current dated account balances",
      "description": "What is the current available balance and balance date for each affected account?",
      "rationale": "Account balances are currently marked as stale as of 2026-10-28.",
      "actionId": null,
      "intent": "CLARIFY",
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
      "title": "Review debt interest terms",
      "description": "Check the interest accrual status for credit card debt-1 currently carrying an APR of {{debt-1.apr}}% and balance of 850 EUR due on {{debt-1.nextDueDate}}.",
      "rationale": "Debt-1 requires verification of its interest accrual status.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "debt-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "debt-1"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Use a reference to the exact PI field for a date, amount or rate.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Check interest accrual status for debt-1",
      "description": "Does the latest statement confirm that interest is currently accruing?",
      "rationale": "Missing interest accrual status prevents complete debt evaluation.",
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
      "stored_bytes": 135000
    },
    {
      "doc_key": "chat",
      "stored_bytes": 552
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 884
    },
    {
      "doc_key": "chat-request:nora-context",
      "stored_bytes": 1252
    },
    {
      "doc_key": "engine",
      "stored_bytes": 485188
    },
    {
      "doc_key": "import:5ced1550-c671-4b3c-b2b0-f8408f6c97b3",
      "stored_bytes": 4864
    },
    {
      "doc_key": "import:7405aef9-6d61-4697-a33c-184b2367c8a0",
      "stored_bytes": 55096
    },
    {
      "doc_key": "job-request:1858206bc328d1a1502f0b11f863c86ecaf77f72e28f088218242ad4391357dc",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:4d97663538c36ae765df6752d4485fd73b48ce26ce3ca32b33a6bc64dc9ee88c",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:dbbba75da1fefe7bb739369440144d7750c39d43792efc6f23a1fffd8db2f623",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:763c4d3a-a032-43c3-81cb-9bad4608b479",
      "stored_bytes": 5652
    },
    {
      "doc_key": "job:ad56cdcf-e517-4e6c-bac2-dd6c09c0a8a6",
      "stored_bytes": 62416
    },
    {
      "doc_key": "job:c0cdc6cb-9324-4473-8019-468087dfbb78",
      "stored_bytes": 135440
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:ai-evaluation",
      "stored_bytes": 4528
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:behavior-agent",
      "stored_bytes": 3472
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:catalog-selector",
      "stored_bytes": 5036
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:checker",
      "stored_bytes": 18660
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:classification",
      "stored_bytes": 42136
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-agent",
      "stored_bytes": 2520
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:debt-calculator",
      "stored_bytes": 1780
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:decision-engine",
      "stored_bytes": 14556
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:explanation",
      "stored_bytes": 2984
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:financial-calculator",
      "stored_bytes": 15888
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:fx",
      "stored_bytes": 1304
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pattern-recognition",
      "stored_bytes": 26552
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:pi",
      "stored_bytes": 1640
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:suggestion-generator",
      "stored_bytes": 3924
    },
    {
      "doc_key": "stage:eval_e3d80bd6-d8fc-4086-998f-f3e545feac8b:weights",
      "stored_bytes": 1788
    },
    {
      "doc_key": "state",
      "stored_bytes": 86264
    }
  ]
}
~~~~

## Summary

~~~~text
Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.
~~~~
