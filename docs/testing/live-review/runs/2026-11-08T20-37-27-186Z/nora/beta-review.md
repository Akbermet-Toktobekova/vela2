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
  "jobId": "a859514e-65aa-4686-9da9-f124b5f065b5",
  "decision": {
    "evaluationId": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2",
    "snapshotId": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
    "snapshotVersion": "4.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1794170247562_d1bi_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794170247562_d1bi_6",
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
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: dated_essential_outflows, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
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
      "dated_essential_outflows",
      "verified_debt_interest_terms",
      "required_pi:monthly_fee",
      "required_pi:exit_terms",
      "subscription_usage_and_exit_terms_confirmation"
    ],
    "trace": {
      "evaluationId": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2",
      "userId": "acad8412-bf7c-4769-b644-3865313d7549",
      "snapshotId": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T20:38:44.449Z",
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
            "candidateId": "cand_A007_snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
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
            "dated_essential_outflows"
          ],
          "inputEvidence": [
            {
              "field": "liquid_balance",
              "status": "VERIFIED"
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
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 1555.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A015_txn_stmt_1794170247562_d1bi_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794170247562_d1bi_6",
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
            "required_pi:monthly_fee",
            "required_pi:exit_terms",
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
            "candidateId": "verify_A014_txn_stmt_1794170247562_d1bi_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794170247562_d1bi_6",
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
        "candidateId": "verify_A014_txn_stmt_1794170247562_d1bi_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794170247562_d1bi_6",
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
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pi",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:fx",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:classification",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pattern-recognition",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:behavior-agent",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:financial-calculator",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-calculator",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-agent",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:suggestion-generator",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:catalog-selector",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:checker",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:critical-coverage",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:ai-evaluation",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:weights",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:decision-engine",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review Credit Card APR and Balance",
            "description": "Review the credit card details for debt-1, which carries an APR of 21.9% and a balance of 850 EUR due on 2026-11-15.",
            "rationale": "Reviewing debt terms helps understand ongoing interest obligations before the upcoming due date.",
            "actionId": null,
            "intent": "REVIEW",
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
          },
          {
            "id": "primary-2",
            "title": "Review Emergency Cushion Target Progress",
            "description": "Review the emergency cushion goal (goal-1) with a target of 3000 EUR by 2027-06-30 and current allocations.",
            "rationale": "Tracking progress toward the emergency cushion target aligns with the user's recorded savings goal.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "goal-1",
            "usefulness": "WEAK",
            "usefulnessReason": "No matching open decision or information gap.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "goal-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The review step aligns with goal-1 specifying a target of 3000 EUR by 2027-06-30 and account-2 showing 600 EUR allocated. It is read-only and does not contradict any facts or claims.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Check Upcoming Rent Obligation",
            "description": "Verify the status of the upcoming rent obligation (obligation-1) of 980 EUR due on 2026-11-06.",
            "rationale": "Checking imminent monthly obligations ensures timely coverage from available balances.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "WEAK",
            "usefulnessReason": "No matching open decision or information gap.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The review step correctly verifies the status of obligation-1 of 980 EUR due on 2026-11-06 against account-1. It is read-only and consistent with the supplied facts.",
            "evidence": []
          }
        ],
        "shortfallReason": "No immediate cash shortfalls identified for upcoming obligations.",
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
        "dated_essential_outflows",
        "verified_debt_interest_terms",
        "required_pi:monthly_fee",
        "required_pi:exit_terms",
        "subscription_usage_and_exit_terms_confirmation"
      ],
      "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?"
    }
  },
  "todayCard": {
    "id": "rec_A014_eval_345a1ff9-9c36-409c-9594-4a2406a445d2",
    "userId": "acad8412-bf7c-4769-b644-3865313d7549",
    "snapshotId": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
    "actionType": "review_recurring_subscription",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: dated_essential_outflows, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "suggestedAmount": 10.99,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "txn_stmt_1794170247562_d1bi_6",
    "sourceAccountId": "main",
    "priority": "clarification",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:38:44.617Z",
    "updatedAt": "2026-11-08T20:38:44.617Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pi",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:fx",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:classification",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pattern-recognition",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:behavior-agent",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:financial-calculator",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-calculator",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-agent",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:suggestion-generator",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:catalog-selector",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:checker",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:critical-coverage",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:ai-evaluation",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:weights",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:decision-engine",
        "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:explanation"
      ],
      "evaluationId": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2",
      "userId": "acad8412-bf7c-4769-b644-3865313d7549",
      "snapshotId": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T20:38:44.449Z",
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
            "candidateId": "cand_A007_snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
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
            "dated_essential_outflows"
          ],
          "inputEvidence": [
            {
              "field": "liquid_balance",
              "status": "VERIFIED"
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
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 1555.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A015_txn_stmt_1794170247562_d1bi_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794170247562_d1bi_6",
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
            "required_pi:monthly_fee",
            "required_pi:exit_terms",
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
            "candidateId": "verify_A014_txn_stmt_1794170247562_d1bi_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794170247562_d1bi_6",
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
        "candidateId": "verify_A014_txn_stmt_1794170247562_d1bi_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794170247562_d1bi_6",
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
            "title": "Review Credit Card APR and Balance",
            "description": "Review the credit card details for debt-1, which carries an APR of 21.9% and a balance of 850 EUR due on 2026-11-15.",
            "rationale": "Reviewing debt terms helps understand ongoing interest obligations before the upcoming due date.",
            "actionId": null,
            "intent": "REVIEW",
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
          },
          {
            "id": "primary-2",
            "title": "Review Emergency Cushion Target Progress",
            "description": "Review the emergency cushion goal (goal-1) with a target of 3000 EUR by 2027-06-30 and current allocations.",
            "rationale": "Tracking progress toward the emergency cushion target aligns with the user's recorded savings goal.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "goal-1",
            "usefulness": "WEAK",
            "usefulnessReason": "No matching open decision or information gap.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "goal-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The review step aligns with goal-1 specifying a target of 3000 EUR by 2027-06-30 and account-2 showing 600 EUR allocated. It is read-only and does not contradict any facts or claims.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Check Upcoming Rent Obligation",
            "description": "Verify the status of the upcoming rent obligation (obligation-1) of 980 EUR due on 2026-11-06.",
            "rationale": "Checking imminent monthly obligations ensures timely coverage from available balances.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "WEAK",
            "usefulnessReason": "No matching open decision or information gap.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The review step correctly verifies the status of obligation-1 of 980 EUR due on 2026-11-06 against account-1. It is read-only and consistent with the supplied facts.",
            "evidence": []
          }
        ],
        "shortfallReason": "No immediate cash shortfalls identified for upcoming obligations.",
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
        "dated_essential_outflows",
        "verified_debt_interest_terms",
        "required_pi:monthly_fee",
        "required_pi:exit_terms",
        "subscription_usage_and_exit_terms_confirmation"
      ],
      "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?"
    },
    "decision": {
      "evaluationId": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2",
      "snapshotId": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
      "snapshotVersion": "4.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "VERIFICATION_UNLOCK",
      "selectedActionId": "A014",
      "selectedActionType": "VERIFICATION_ACTION",
      "candidate": {
        "candidateId": "verify_A014_txn_stmt_1794170247562_d1bi_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794170247562_d1bi_6",
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
      "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: dated_essential_outflows, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
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
        "dated_essential_outflows",
        "verified_debt_interest_terms",
        "required_pi:monthly_fee",
        "required_pi:exit_terms",
        "subscription_usage_and_exit_terms_confirmation"
      ],
      "trace": {
        "evaluationId": "eval_345a1ff9-9c36-409c-9594-4a2406a445d2",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "snapshotId": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
        "snapshotVersion": "4.0",
        "createdAt": "2026-11-08T20:38:44.449Z",
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
              "candidateId": "cand_A007_snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
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
              "dated_essential_outflows"
            ],
            "inputEvidence": [
              {
                "field": "liquid_balance",
                "status": "VERIFIED"
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
                "status": "VERIFIED"
              }
            ],
            "projectedMinCashAfterAction": 1555.01,
            "unlocksActionIds": []
          },
          {
            "candidate": {
              "candidateId": "cand_A015_txn_stmt_1794170247562_d1bi_6",
              "actionId": "A015",
              "actionType": "FINANCIAL_ACTION",
              "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
              "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
              "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
              "targetId": "txn_stmt_1794170247562_d1bi_6",
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
              "required_pi:monthly_fee",
              "required_pi:exit_terms",
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
              "candidateId": "verify_A014_txn_stmt_1794170247562_d1bi_6",
              "actionId": "A014",
              "actionType": "VERIFICATION_ACTION",
              "title": "Review recurring subscription before cancellation",
              "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
              "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
              "targetId": "txn_stmt_1794170247562_d1bi_6",
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
          "candidateId": "verify_A014_txn_stmt_1794170247562_d1bi_6",
          "actionId": "A014",
          "actionType": "VERIFICATION_ACTION",
          "title": "Review recurring subscription before cancellation",
          "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
          "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
          "targetId": "txn_stmt_1794170247562_d1bi_6",
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
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pi",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:fx",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:classification",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pattern-recognition",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:behavior-agent",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:financial-calculator",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-calculator",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-agent",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:suggestion-generator",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:catalog-selector",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:checker",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:critical-coverage",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:ai-evaluation",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:weights",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:decision-engine",
          "eval_345a1ff9-9c36-409c-9594-4a2406a445d2:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review Credit Card APR and Balance",
              "description": "Review the credit card details for debt-1, which carries an APR of 21.9% and a balance of 850 EUR due on 2026-11-15.",
              "rationale": "Reviewing debt terms helps understand ongoing interest obligations before the upcoming due date.",
              "actionId": null,
              "intent": "REVIEW",
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
            },
            {
              "id": "primary-2",
              "title": "Review Emergency Cushion Target Progress",
              "description": "Review the emergency cushion goal (goal-1) with a target of 3000 EUR by 2027-06-30 and current allocations.",
              "rationale": "Tracking progress toward the emergency cushion target aligns with the user's recorded savings goal.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "goal-1",
              "usefulness": "WEAK",
              "usefulnessReason": "No matching open decision or information gap.",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "goal-1",
                "account-2"
              ],
              "claimIds": [],
              "status": "VALID",
              "reason": "The review step aligns with goal-1 specifying a target of 3000 EUR by 2027-06-30 and account-2 showing 600 EUR allocated. It is read-only and does not contradict any facts or claims.",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "Check Upcoming Rent Obligation",
              "description": "Verify the status of the upcoming rent obligation (obligation-1) of 980 EUR due on 2026-11-06.",
              "rationale": "Checking imminent monthly obligations ensures timely coverage from available balances.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "obligation-1",
              "usefulness": "WEAK",
              "usefulnessReason": "No matching open decision or information gap.",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-1",
                "account-1"
              ],
              "claimIds": [],
              "status": "VALID",
              "reason": "The review step correctly verifies the status of obligation-1 of 980 EUR due on 2026-11-06 against account-1. It is read-only and consistent with the supplied facts.",
              "evidence": []
            }
          ],
          "shortfallReason": "No immediate cash shortfalls identified for upcoming obligations.",
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
          "dated_essential_outflows",
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
      "title": "Review Credit Card APR and Balance",
      "description": "Review the credit card details for debt-1, which carries an APR of 21.9% and a balance of 850 EUR due on 2026-11-15.",
      "rationale": "Reviewing debt terms helps understand ongoing interest obligations before the upcoming due date.",
      "actionId": null,
      "intent": "REVIEW",
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
    },
    {
      "id": "primary-2",
      "title": "Review Emergency Cushion Target Progress",
      "description": "Review the emergency cushion goal (goal-1) with a target of 3000 EUR by 2027-06-30 and current allocations.",
      "rationale": "Tracking progress toward the emergency cushion target aligns with the user's recorded savings goal.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "goal-1",
      "usefulness": "WEAK",
      "usefulnessReason": "No matching open decision or information gap.",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "goal-1",
        "account-2"
      ],
      "claimIds": [],
      "status": "VALID",
      "reason": "The review step aligns with goal-1 specifying a target of 3000 EUR by 2027-06-30 and account-2 showing 600 EUR allocated. It is read-only and does not contradict any facts or claims.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Check Upcoming Rent Obligation",
      "description": "Verify the status of the upcoming rent obligation (obligation-1) of 980 EUR due on 2026-11-06.",
      "rationale": "Checking imminent monthly obligations ensures timely coverage from available balances.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "obligation-1",
      "usefulness": "WEAK",
      "usefulnessReason": "No matching open decision or information gap.",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-1",
        "account-1"
      ],
      "claimIds": [],
      "status": "VALID",
      "reason": "The review step correctly verifies the status of obligation-1 of 980 EUR due on 2026-11-06 against account-1. It is read-only and consistent with the supplied facts.",
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 135416
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
      "stored_bytes": 487940
    },
    {
      "doc_key": "import:0af6eabe-a4c7-4710-b696-893f2f3a1d4b",
      "stored_bytes": 4864
    },
    {
      "doc_key": "import:71bea061-c646-451c-be35-2a085fe16ddb",
      "stored_bytes": 55096
    },
    {
      "doc_key": "job-request:51c8bbd1c27db45be180cd003b8012b0beb85b94e258fec5632383de1cb55ad0",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:677d57741ae95ff5ddb6381c37b9af53ecfaa9ff2fb63468f533cf2e03f28b19",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:d3148aae2d97cc87454956c36760a8a1a3c86d4090cd10447f85ac0a7e3bacbf",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:1f2b0032-111d-453b-9141-31bc91ae55d2",
      "stored_bytes": 5652
    },
    {
      "doc_key": "job:268e5b89-3305-414f-9a9c-9d3b7dbc0f1a",
      "stored_bytes": 62416
    },
    {
      "doc_key": "job:a859514e-65aa-4686-9da9-f124b5f065b5",
      "stored_bytes": 135856
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:ai-evaluation",
      "stored_bytes": 4528
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:behavior-agent",
      "stored_bytes": 4444
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:catalog-selector",
      "stored_bytes": 5036
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:checker",
      "stored_bytes": 18640
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:classification",
      "stored_bytes": 42140
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-agent",
      "stored_bytes": 2520
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:debt-calculator",
      "stored_bytes": 1780
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:decision-engine",
      "stored_bytes": 14056
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:explanation",
      "stored_bytes": 2740
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:financial-calculator",
      "stored_bytes": 15888
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:fx",
      "stored_bytes": 1304
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pattern-recognition",
      "stored_bytes": 26644
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:pi",
      "stored_bytes": 1620
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:suggestion-generator",
      "stored_bytes": 4460
    },
    {
      "doc_key": "stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:weights",
      "stored_bytes": 1788
    },
    {
      "doc_key": "state",
      "stored_bytes": 86712
    }
  ]
}
~~~~

## Summary

~~~~text
Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: dated_essential_outflows, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.
~~~~
