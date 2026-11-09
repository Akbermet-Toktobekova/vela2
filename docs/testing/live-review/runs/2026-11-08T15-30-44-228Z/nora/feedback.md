# 03 Nora · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback and feedback-request:&lt;id&gt;; state.actionFeedback is an API projection when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_A014_eval_e1155468-9845-4388-81a9-d17627bc19bc",
  "action": "accept",
  "expectedVersion": 3,
  "requestId": "nora-accept"
}
~~~~

## Output

~~~~json
{
  "status": "ACCEPTED",
  "accepted": true,
  "recommendation": {
    "id": "rec_A014_eval_e1155468-9845-4388-81a9-d17627bc19bc",
    "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
    "snapshotId": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
    "actionType": "review_recurring_subscription",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "suggestedAmount": 10.99,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "txn_stmt_1794152163809_oqsp_6",
    "sourceAccountId": "main",
    "priority": "clarification",
    "status": "accepted",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T15:36:47.222Z",
    "updatedAt": "2026-11-08T15:36:49.131Z"
  },
  "decision": {
    "evaluationId": "eval_e1155468-9845-4388-81a9-d17627bc19bc",
    "snapshotId": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
    "snapshotVersion": "3.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1794152163809_oqsp_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794152163809_oqsp_6",
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
    "weightProfileId": "liquidity_protection",
    "weights": {
      "resilience": 0.5,
      "financial_benefit": 0.35,
      "goal_progress": 0.15
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
      "evaluationId": "eval_e1155468-9845-4388-81a9-d17627bc19bc",
      "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
      "snapshotId": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:36:47.191Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "VERIFICATION_UNLOCK",
      "weightSelection": {
        "profileId": "liquidity_protection",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.5,
          "F": 0.35,
          "G": 0.15
        },
        "triggerReason": "Emergency reserve coverage M = 0.00 months is below entry threshold 1.00 months.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "cand_A007_snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
            "actionId": "A007",
            "actionType": "FINANCIAL_ACTION",
            "title": "Add EUR 360 to your emergency reserve",
            "description": "Earmark EUR 360 from uncommitted available cash (EUR 3005.01 safe after upcoming bills) into your accessible emergency cushion.",
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
          "projectedMinCashAfterAction": 2645.01,
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
          "projectedMinCashAfterAction": 2155.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A015_txn_stmt_1794152163809_oqsp_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794152163809_oqsp_6",
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
          "projectedMinCashAfterAction": 3005.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "verify_A014_txn_stmt_1794152163809_oqsp_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794152163809_oqsp_6",
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
          "projectedMinCashAfterAction": 3005.01,
          "unlocksActionIds": [
            "A015"
          ]
        }
      ],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "verify_A014_txn_stmt_1794152163809_oqsp_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794152163809_oqsp_6",
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
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:pi",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:fx",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:classification",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:pattern-recognition",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:behavior-agent",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:financial-calculator",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:debt-calculator",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:debt-agent",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:suggestion-generator",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:catalog-selector",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:checker",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:critical-coverage",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:ai-evaluation",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:weights",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:decision-engine",
        "eval_e1155468-9845-4388-81a9-d17627bc19bc:explanation"
      ],
      "primarySuggestions": {
        "proposals": [],
        "shortfallReason": "No applicable verified claim supports a specific action.",
        "fallbackReason": "NO_PROPOSALS",
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
  "feedbackRecord": {
    "id": "fb_1794152209173_accept",
    "recommendationId": "rec_A014_eval_e1155468-9845-4388-81a9-d17627bc19bc",
    "actionId": "A014",
    "snapshotId": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
    "action": "accept",
    "amount": 10.99,
    "note": "User accepted recommendation (pending execution).",
    "timestamp": "2026-11-08T15:36:49.131Z"
  },
  "version": 3,
  "state": {
    "user": {
      "id": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
      "email": "nora@example.test",
      "authStatus": "unverified",
      "isDemoMode": false,
      "createdAt": "2026-11-08T15:36:03.793Z"
    },
    "profile": {
      "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
      "nickname": "03 Nora",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T15:36:03.793Z"
    },
    "onboarding": {
      "id": "436e5952-70a5-43d1-b28b-6b50081f9a67",
      "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T15:36:03.793Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accounts": [
      {
        "id": "main",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "name": "Daily Account",
        "institution": "Fictional Retail Bank",
        "currency": "EUR",
        "purposes": [
          "daily_spending"
        ],
        "fundsOwnership": "personal",
        "personalAvailableAmount": null,
        "isPrimary": true,
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "savings",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "name": "Reserve Account",
        "institution": "Fictional Savings Bank",
        "currency": "EUR",
        "purposes": [
          "savings"
        ],
        "fundsOwnership": "personal",
        "personalAvailableAmount": null,
        "isPrimary": false,
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "balances": [
      {
        "id": "45d7fc59-b4ff-438a-9ea1-0215282e8ecc",
        "accountId": "main",
        "amount": 3577.01,
        "currency": "EUR",
        "asOf": "2026-10-28",
        "sourceType": "statement_closing",
        "sourceId": "stmt_1794152163809_oqsp",
        "createdAt": "2026-11-08T15:36:03.810Z"
      },
      {
        "id": "c6384cb2-8a24-4175-9fd5-eaadaedf95cd",
        "accountId": "savings",
        "amount": 600,
        "currency": "EUR",
        "asOf": "2026-10-28",
        "sourceType": "statement_closing",
        "sourceId": "stmt_1794152163822_my4o",
        "createdAt": "2026-11-08T15:36:03.823Z"
      }
    ],
    "incomes": [
      {
        "id": "salary",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "name": "Monthly salary",
        "pattern": "regular",
        "estimatedMonthlyAmount": 2350,
        "currency": "EUR",
        "frequency": "monthly",
        "sourceType": "salary",
        "nextExpectedDate": "2026-11-27",
        "receivingAccountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "expenseCommitment": {
      "id": "essentials",
      "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
      "estimatedMonthlyAmount": 1450,
      "currency": "EUR",
      "notes": "Synthetic user estimate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "rent",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "name": "Apartment rent",
        "amount": 980,
        "currency": "EUR",
        "dueDate": "2026-11-06",
        "recurrence": "monthly",
        "category": "rent",
        "status": "unpaid",
        "accountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "energy",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "name": "Electricity",
        "amount": 105,
        "currency": "EUR",
        "dueDate": "2026-11-10",
        "recurrence": "monthly",
        "category": "energy",
        "status": "unpaid",
        "accountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "internet",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "name": "Home internet",
        "amount": 32,
        "currency": "EUR",
        "dueDate": "2026-11-12",
        "recurrence": "monthly",
        "category": "internet",
        "status": "unpaid",
        "accountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "debts": [
      {
        "id": "card",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
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
    "goals": [
      {
        "id": "reserve",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "name": "Emergency reserve",
        "goalType": "emergency_cushion",
        "targetAmount": 3000,
        "currency": "EUR",
        "targetDate": "2027-06-30",
        "priority": "high",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "goalAllocations": [],
    "statements": [
      {
        "id": "stmt_1794152163809_oqsp",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "fileName": "daily.csv",
        "fileFormat": "csv",
        "fileHash": "hash_acb4f636_4002",
        "periodStart": "2026-08-03",
        "periodEnd": "2026-10-28",
        "currency": "EUR",
        "transactionCount": 45,
        "duplicateCountSkipped": 0,
        "status": "needs_review",
        "closingBalance": 3577.01,
        "importedAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "stmt_1794152163822_my4o",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "savings",
        "fileName": "reserve.csv",
        "fileFormat": "csv",
        "fileHash": "hash_bc62e127_326",
        "periodStart": "2026-08-28",
        "periodEnd": "2026-10-28",
        "currency": "EUR",
        "transactionCount": 3,
        "duplicateCountSkipped": 0,
        "status": "needs_review",
        "closingBalance": 600,
        "importedAt": "2026-11-08T15:36:03.822Z"
      }
    ],
    "transactions": [
      {
        "id": "txn_stmt_1794152163809_oqsp_1",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-03",
        "amount": -980,
        "currency": "EUR",
        "description": "Apartment rent",
        "counterparty": "Harbor Properties",
        "reference": "RENT-08",
        "rawRow": {
          "date": "2026-08-03",
          "description": "Apartment rent",
          "counterparty": "Harbor Properties",
          "amount": "-980.00",
          "currency": "EUR",
          "reference": "RENT-08",
          "balance": "780.00",
          "__source_row": "2",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_2",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-05",
        "amount": -89.4,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD1-08",
        "rawRow": {
          "date": "2026-08-05",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-89.40",
          "currency": "EUR",
          "reference": "FOOD1-08",
          "balance": "690.60",
          "__source_row": "3",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_3",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-06",
        "amount": -42,
        "currency": "EUR",
        "description": "Metro pass",
        "counterparty": "City Transit",
        "reference": "METRO-08",
        "rawRow": {
          "date": "2026-08-06",
          "description": "Metro pass",
          "counterparty": "City Transit",
          "amount": "-42.00",
          "currency": "EUR",
          "reference": "METRO-08",
          "balance": "648.60",
          "__source_row": "4",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_4",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-08",
        "amount": -105,
        "currency": "EUR",
        "description": "Electricity utility",
        "counterparty": "Bright Energy",
        "reference": "ENERGY-08",
        "rawRow": {
          "date": "2026-08-08",
          "description": "Electricity utility",
          "counterparty": "Bright Energy",
          "amount": "-105.00",
          "currency": "EUR",
          "reference": "ENERGY-08",
          "balance": "543.60",
          "__source_row": "5",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_5",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-10",
        "amount": -32,
        "currency": "EUR",
        "description": "Internet bill",
        "counterparty": "Fiber Home",
        "reference": "NET-08",
        "rawRow": {
          "date": "2026-08-10",
          "description": "Internet bill",
          "counterparty": "Fiber Home",
          "amount": "-32.00",
          "currency": "EUR",
          "reference": "NET-08",
          "balance": "511.60",
          "__source_row": "6",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_6",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-12",
        "amount": -10.99,
        "currency": "EUR",
        "description": "Music subscription",
        "counterparty": "Sound Library",
        "reference": "MUSIC-08",
        "rawRow": {
          "date": "2026-08-12",
          "description": "Music subscription",
          "counterparty": "Sound Library",
          "amount": "-10.99",
          "currency": "EUR",
          "reference": "MUSIC-08",
          "balance": "500.61",
          "__source_row": "7",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_7",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-14",
        "amount": -55,
        "currency": "EUR",
        "description": "Credit card payment",
        "counterparty": "Fictional Card Services",
        "reference": "CARD-08",
        "rawRow": {
          "date": "2026-08-14",
          "description": "Credit card payment",
          "counterparty": "Fictional Card Services",
          "amount": "-55.00",
          "currency": "EUR",
          "reference": "CARD-08",
          "balance": "445.61",
          "__source_row": "8",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_8",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-16",
        "amount": -94.8,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD2-08",
        "rawRow": {
          "date": "2026-08-16",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-94.80",
          "currency": "EUR",
          "reference": "FOOD2-08",
          "balance": "350.81",
          "__source_row": "9",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_9",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-18",
        "amount": -14.7,
        "currency": "EUR",
        "description": "Coffee shop",
        "counterparty": "Corner Coffee",
        "reference": "CAFE-08",
        "rawRow": {
          "date": "2026-08-18",
          "description": "Coffee shop",
          "counterparty": "Corner Coffee",
          "amount": "-14.70",
          "currency": "EUR",
          "reference": "CAFE-08",
          "balance": "336.11",
          "__source_row": "10",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_10",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-20",
        "amount": -44.5,
        "currency": "EUR",
        "description": "Restaurant",
        "counterparty": "Maple Kitchen",
        "reference": "DINNER-08",
        "rawRow": {
          "date": "2026-08-20",
          "description": "Restaurant",
          "counterparty": "Maple Kitchen",
          "amount": "-44.50",
          "currency": "EUR",
          "reference": "DINNER-08",
          "balance": "291.61",
          "__source_row": "11",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_11",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-21",
        "amount": -15.99,
        "currency": "EUR",
        "description": "Video streaming subscription",
        "counterparty": "Screen Library",
        "reference": "VIDEO-08",
        "rawRow": {
          "date": "2026-08-21",
          "description": "Video streaming subscription",
          "counterparty": "Screen Library",
          "amount": "-15.99",
          "currency": "EUR",
          "reference": "VIDEO-08",
          "balance": "275.62",
          "__source_row": "12",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_12",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-23",
        "amount": -22.6,
        "currency": "EUR",
        "description": "Pharmacy purchase",
        "counterparty": "Oak Pharmacy",
        "reference": "PHARM-08",
        "rawRow": {
          "date": "2026-08-23",
          "description": "Pharmacy purchase",
          "counterparty": "Oak Pharmacy",
          "amount": "-22.60",
          "currency": "EUR",
          "reference": "PHARM-08",
          "balance": "253.02",
          "__source_row": "13",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_13",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-25",
        "amount": -87.35,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD3-08",
        "rawRow": {
          "date": "2026-08-25",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-87.35",
          "currency": "EUR",
          "reference": "FOOD3-08",
          "balance": "165.67",
          "__source_row": "14",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_14",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-27",
        "amount": 2350,
        "currency": "EUR",
        "description": "Salary payroll",
        "counterparty": "Danube Studio",
        "reference": "SALARY-08",
        "rawRow": {
          "date": "2026-08-27",
          "description": "Salary payroll",
          "counterparty": "Danube Studio",
          "amount": "2350.00",
          "currency": "EUR",
          "reference": "SALARY-08",
          "balance": "2515.67",
          "__source_row": "15",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_15",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-08-28",
        "amount": -150,
        "currency": "EUR",
        "description": "Transfer to Reserve Account",
        "counterparty": "Fictional Savings Bank",
        "reference": "OWN-08",
        "rawRow": {
          "date": "2026-08-28",
          "description": "Transfer to Reserve Account",
          "counterparty": "Fictional Savings Bank",
          "amount": "-150.00",
          "currency": "EUR",
          "reference": "OWN-08",
          "balance": "2365.67",
          "__source_row": "16",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_16",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-03",
        "amount": -980,
        "currency": "EUR",
        "description": "Apartment rent",
        "counterparty": "Harbor Properties",
        "reference": "RENT-09",
        "rawRow": {
          "date": "2026-09-03",
          "description": "Apartment rent",
          "counterparty": "Harbor Properties",
          "amount": "-980.00",
          "currency": "EUR",
          "reference": "RENT-09",
          "balance": "1385.67",
          "__source_row": "17",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_17",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-05",
        "amount": -89.4,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD1-09",
        "rawRow": {
          "date": "2026-09-05",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-89.40",
          "currency": "EUR",
          "reference": "FOOD1-09",
          "balance": "1296.27",
          "__source_row": "18",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_18",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-06",
        "amount": -42,
        "currency": "EUR",
        "description": "Metro pass",
        "counterparty": "City Transit",
        "reference": "METRO-09",
        "rawRow": {
          "date": "2026-09-06",
          "description": "Metro pass",
          "counterparty": "City Transit",
          "amount": "-42.00",
          "currency": "EUR",
          "reference": "METRO-09",
          "balance": "1254.27",
          "__source_row": "19",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_19",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-08",
        "amount": -105,
        "currency": "EUR",
        "description": "Electricity utility",
        "counterparty": "Bright Energy",
        "reference": "ENERGY-09",
        "rawRow": {
          "date": "2026-09-08",
          "description": "Electricity utility",
          "counterparty": "Bright Energy",
          "amount": "-105.00",
          "currency": "EUR",
          "reference": "ENERGY-09",
          "balance": "1149.27",
          "__source_row": "20",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_20",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-10",
        "amount": -32,
        "currency": "EUR",
        "description": "Internet bill",
        "counterparty": "Fiber Home",
        "reference": "NET-09",
        "rawRow": {
          "date": "2026-09-10",
          "description": "Internet bill",
          "counterparty": "Fiber Home",
          "amount": "-32.00",
          "currency": "EUR",
          "reference": "NET-09",
          "balance": "1117.27",
          "__source_row": "21",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_21",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-12",
        "amount": -10.99,
        "currency": "EUR",
        "description": "Music subscription",
        "counterparty": "Sound Library",
        "reference": "MUSIC-09",
        "rawRow": {
          "date": "2026-09-12",
          "description": "Music subscription",
          "counterparty": "Sound Library",
          "amount": "-10.99",
          "currency": "EUR",
          "reference": "MUSIC-09",
          "balance": "1106.28",
          "__source_row": "22",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_22",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-14",
        "amount": -55,
        "currency": "EUR",
        "description": "Credit card payment",
        "counterparty": "Fictional Card Services",
        "reference": "CARD-09",
        "rawRow": {
          "date": "2026-09-14",
          "description": "Credit card payment",
          "counterparty": "Fictional Card Services",
          "amount": "-55.00",
          "currency": "EUR",
          "reference": "CARD-09",
          "balance": "1051.28",
          "__source_row": "23",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_23",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-16",
        "amount": -94.8,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD2-09",
        "rawRow": {
          "date": "2026-09-16",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-94.80",
          "currency": "EUR",
          "reference": "FOOD2-09",
          "balance": "956.48",
          "__source_row": "24",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_24",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-18",
        "amount": -14.7,
        "currency": "EUR",
        "description": "Coffee shop",
        "counterparty": "Corner Coffee",
        "reference": "CAFE-09",
        "rawRow": {
          "date": "2026-09-18",
          "description": "Coffee shop",
          "counterparty": "Corner Coffee",
          "amount": "-14.70",
          "currency": "EUR",
          "reference": "CAFE-09",
          "balance": "941.78",
          "__source_row": "25",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_25",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-20",
        "amount": -44.5,
        "currency": "EUR",
        "description": "Restaurant",
        "counterparty": "Maple Kitchen",
        "reference": "DINNER-09",
        "rawRow": {
          "date": "2026-09-20",
          "description": "Restaurant",
          "counterparty": "Maple Kitchen",
          "amount": "-44.50",
          "currency": "EUR",
          "reference": "DINNER-09",
          "balance": "897.28",
          "__source_row": "26",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_26",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-21",
        "amount": -15.99,
        "currency": "EUR",
        "description": "Video streaming subscription",
        "counterparty": "Screen Library",
        "reference": "VIDEO-09",
        "rawRow": {
          "date": "2026-09-21",
          "description": "Video streaming subscription",
          "counterparty": "Screen Library",
          "amount": "-15.99",
          "currency": "EUR",
          "reference": "VIDEO-09",
          "balance": "881.29",
          "__source_row": "27",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_27",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-23",
        "amount": -22.6,
        "currency": "EUR",
        "description": "Pharmacy purchase",
        "counterparty": "Oak Pharmacy",
        "reference": "PHARM-09",
        "rawRow": {
          "date": "2026-09-23",
          "description": "Pharmacy purchase",
          "counterparty": "Oak Pharmacy",
          "amount": "-22.60",
          "currency": "EUR",
          "reference": "PHARM-09",
          "balance": "858.69",
          "__source_row": "28",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_28",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-25",
        "amount": -87.35,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD3-09",
        "rawRow": {
          "date": "2026-09-25",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-87.35",
          "currency": "EUR",
          "reference": "FOOD3-09",
          "balance": "771.34",
          "__source_row": "29",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_29",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-27",
        "amount": 2350,
        "currency": "EUR",
        "description": "Salary payroll",
        "counterparty": "Danube Studio",
        "reference": "SALARY-09",
        "rawRow": {
          "date": "2026-09-27",
          "description": "Salary payroll",
          "counterparty": "Danube Studio",
          "amount": "2350.00",
          "currency": "EUR",
          "reference": "SALARY-09",
          "balance": "3121.34",
          "__source_row": "30",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_30",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-09-28",
        "amount": -150,
        "currency": "EUR",
        "description": "Transfer to Reserve Account",
        "counterparty": "Fictional Savings Bank",
        "reference": "OWN-09",
        "rawRow": {
          "date": "2026-09-28",
          "description": "Transfer to Reserve Account",
          "counterparty": "Fictional Savings Bank",
          "amount": "-150.00",
          "currency": "EUR",
          "reference": "OWN-09",
          "balance": "2971.34",
          "__source_row": "31",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_31",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-03",
        "amount": -980,
        "currency": "EUR",
        "description": "Apartment rent",
        "counterparty": "Harbor Properties",
        "reference": "RENT-10",
        "rawRow": {
          "date": "2026-10-03",
          "description": "Apartment rent",
          "counterparty": "Harbor Properties",
          "amount": "-980.00",
          "currency": "EUR",
          "reference": "RENT-10",
          "balance": "1991.34",
          "__source_row": "32",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_32",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-05",
        "amount": -89.4,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD1-10",
        "rawRow": {
          "date": "2026-10-05",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-89.40",
          "currency": "EUR",
          "reference": "FOOD1-10",
          "balance": "1901.94",
          "__source_row": "33",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_33",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-06",
        "amount": -42,
        "currency": "EUR",
        "description": "Metro pass",
        "counterparty": "City Transit",
        "reference": "METRO-10",
        "rawRow": {
          "date": "2026-10-06",
          "description": "Metro pass",
          "counterparty": "City Transit",
          "amount": "-42.00",
          "currency": "EUR",
          "reference": "METRO-10",
          "balance": "1859.94",
          "__source_row": "34",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_34",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-08",
        "amount": -105,
        "currency": "EUR",
        "description": "Electricity utility",
        "counterparty": "Bright Energy",
        "reference": "ENERGY-10",
        "rawRow": {
          "date": "2026-10-08",
          "description": "Electricity utility",
          "counterparty": "Bright Energy",
          "amount": "-105.00",
          "currency": "EUR",
          "reference": "ENERGY-10",
          "balance": "1754.94",
          "__source_row": "35",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_35",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-10",
        "amount": -32,
        "currency": "EUR",
        "description": "Internet bill",
        "counterparty": "Fiber Home",
        "reference": "NET-10",
        "rawRow": {
          "date": "2026-10-10",
          "description": "Internet bill",
          "counterparty": "Fiber Home",
          "amount": "-32.00",
          "currency": "EUR",
          "reference": "NET-10",
          "balance": "1722.94",
          "__source_row": "36",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_36",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-12",
        "amount": -10.99,
        "currency": "EUR",
        "description": "Music subscription",
        "counterparty": "Sound Library",
        "reference": "MUSIC-10",
        "rawRow": {
          "date": "2026-10-12",
          "description": "Music subscription",
          "counterparty": "Sound Library",
          "amount": "-10.99",
          "currency": "EUR",
          "reference": "MUSIC-10",
          "balance": "1711.95",
          "__source_row": "37",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_37",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-14",
        "amount": -55,
        "currency": "EUR",
        "description": "Credit card payment",
        "counterparty": "Fictional Card Services",
        "reference": "CARD-10",
        "rawRow": {
          "date": "2026-10-14",
          "description": "Credit card payment",
          "counterparty": "Fictional Card Services",
          "amount": "-55.00",
          "currency": "EUR",
          "reference": "CARD-10",
          "balance": "1656.95",
          "__source_row": "38",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_38",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-16",
        "amount": -94.8,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD2-10",
        "rawRow": {
          "date": "2026-10-16",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-94.80",
          "currency": "EUR",
          "reference": "FOOD2-10",
          "balance": "1562.15",
          "__source_row": "39",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_39",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-18",
        "amount": -14.7,
        "currency": "EUR",
        "description": "Coffee shop",
        "counterparty": "Corner Coffee",
        "reference": "CAFE-10",
        "rawRow": {
          "date": "2026-10-18",
          "description": "Coffee shop",
          "counterparty": "Corner Coffee",
          "amount": "-14.70",
          "currency": "EUR",
          "reference": "CAFE-10",
          "balance": "1547.45",
          "__source_row": "40",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_40",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-20",
        "amount": -44.5,
        "currency": "EUR",
        "description": "Restaurant",
        "counterparty": "Maple Kitchen",
        "reference": "DINNER-10",
        "rawRow": {
          "date": "2026-10-20",
          "description": "Restaurant",
          "counterparty": "Maple Kitchen",
          "amount": "-44.50",
          "currency": "EUR",
          "reference": "DINNER-10",
          "balance": "1502.95",
          "__source_row": "41",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_41",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-21",
        "amount": -15.99,
        "currency": "EUR",
        "description": "Video streaming subscription",
        "counterparty": "Screen Library",
        "reference": "VIDEO-10",
        "rawRow": {
          "date": "2026-10-21",
          "description": "Video streaming subscription",
          "counterparty": "Screen Library",
          "amount": "-15.99",
          "currency": "EUR",
          "reference": "VIDEO-10",
          "balance": "1486.96",
          "__source_row": "42",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_42",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-23",
        "amount": -22.6,
        "currency": "EUR",
        "description": "Pharmacy purchase",
        "counterparty": "Oak Pharmacy",
        "reference": "PHARM-10",
        "rawRow": {
          "date": "2026-10-23",
          "description": "Pharmacy purchase",
          "counterparty": "Oak Pharmacy",
          "amount": "-22.60",
          "currency": "EUR",
          "reference": "PHARM-10",
          "balance": "1464.36",
          "__source_row": "43",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_43",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-25",
        "amount": -87.35,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD3-10",
        "rawRow": {
          "date": "2026-10-25",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-87.35",
          "currency": "EUR",
          "reference": "FOOD3-10",
          "balance": "1377.01",
          "__source_row": "44",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_44",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-27",
        "amount": 2350,
        "currency": "EUR",
        "description": "Salary payroll",
        "counterparty": "Danube Studio",
        "reference": "SALARY-10",
        "rawRow": {
          "date": "2026-10-27",
          "description": "Salary payroll",
          "counterparty": "Danube Studio",
          "amount": "2350.00",
          "currency": "EUR",
          "reference": "SALARY-10",
          "balance": "3727.01",
          "__source_row": "45",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163809_oqsp_45",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "main",
        "statementId": "stmt_1794152163809_oqsp",
        "date": "2026-10-28",
        "amount": -150,
        "currency": "EUR",
        "description": "Transfer to Reserve Account",
        "counterparty": "Fictional Savings Bank",
        "reference": "OWN-10",
        "rawRow": {
          "date": "2026-10-28",
          "description": "Transfer to Reserve Account",
          "counterparty": "Fictional Savings Bank",
          "amount": "-150.00",
          "currency": "EUR",
          "reference": "OWN-10",
          "balance": "3577.01",
          "__source_row": "46",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.809Z"
      },
      {
        "id": "txn_stmt_1794152163822_my4o_1",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "savings",
        "statementId": "stmt_1794152163822_my4o",
        "date": "2026-08-28",
        "amount": 150,
        "currency": "EUR",
        "description": "Transfer from Daily Account",
        "counterparty": "Fictional Retail Bank",
        "reference": "OWN-08",
        "rawRow": {
          "date": "2026-08-28",
          "description": "Transfer from Daily Account",
          "counterparty": "Fictional Retail Bank",
          "amount": "150.00",
          "currency": "EUR",
          "reference": "OWN-08",
          "balance": "300.00",
          "__source_row": "2",
          "__source_file": "reserve.csv",
          "__source_hash": "65eced9888e127f71311f2d317a0ce53ecb7d38f5caaecaa4a69ed92ca788df4",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.822Z"
      },
      {
        "id": "txn_stmt_1794152163822_my4o_2",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "savings",
        "statementId": "stmt_1794152163822_my4o",
        "date": "2026-09-28",
        "amount": 150,
        "currency": "EUR",
        "description": "Transfer from Daily Account",
        "counterparty": "Fictional Retail Bank",
        "reference": "OWN-09",
        "rawRow": {
          "date": "2026-09-28",
          "description": "Transfer from Daily Account",
          "counterparty": "Fictional Retail Bank",
          "amount": "150.00",
          "currency": "EUR",
          "reference": "OWN-09",
          "balance": "450.00",
          "__source_row": "3",
          "__source_file": "reserve.csv",
          "__source_hash": "65eced9888e127f71311f2d317a0ce53ecb7d38f5caaecaa4a69ed92ca788df4",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.822Z"
      },
      {
        "id": "txn_stmt_1794152163822_my4o_3",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "accountId": "savings",
        "statementId": "stmt_1794152163822_my4o",
        "date": "2026-10-28",
        "amount": 150,
        "currency": "EUR",
        "description": "Transfer from Daily Account",
        "counterparty": "Fictional Retail Bank",
        "reference": "OWN-10",
        "rawRow": {
          "date": "2026-10-28",
          "description": "Transfer from Daily Account",
          "counterparty": "Fictional Retail Bank",
          "amount": "150.00",
          "currency": "EUR",
          "reference": "OWN-10",
          "balance": "600.00",
          "__source_row": "4",
          "__source_file": "reserve.csv",
          "__source_hash": "65eced9888e127f71311f2d317a0ce53ecb7d38f5caaecaa4a69ed92ca788df4",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T15:36:03.822Z"
      }
    ],
    "classifications": [
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_1",
        "transactionId": "txn_stmt_1794152163809_oqsp_1",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties is a recurring monthly housing expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_2",
        "transactionId": "txn_stmt_1794152163809_oqsp_2",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket represents a grocery expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_3",
        "transactionId": "txn_stmt_1794152163809_oqsp_3",
        "economicType": "expense",
        "category": "transport",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit is a transportation expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_4",
        "transactionId": "txn_stmt_1794152163809_oqsp_4",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy is a recurring utility expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_5",
        "transactionId": "txn_stmt_1794152163809_oqsp_5",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home is a recurring telecom expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_6",
        "transactionId": "txn_stmt_1794152163809_oqsp_6",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music streaming subscription payment to Sound Library is a recurring subscription expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_7",
        "transactionId": "txn_stmt_1794152163809_oqsp_7",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services represents a recurring debt repayment.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_8",
        "transactionId": "txn_stmt_1794152163809_oqsp_8",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket represents a grocery expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_9",
        "transactionId": "txn_stmt_1794152163809_oqsp_9",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee is a dining and coffee expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_10",
        "transactionId": "txn_stmt_1794152163809_oqsp_10",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen is a dining expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_11",
        "transactionId": "txn_stmt_1794152163809_oqsp_11",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription payment to Screen Library is a recurring subscription expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_12",
        "transactionId": "txn_stmt_1794152163809_oqsp_12",
        "economicType": "expense",
        "category": "health",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase at Oak Pharmacy is a health-related expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_13",
        "transactionId": "txn_stmt_1794152163809_oqsp_13",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket represents a grocery expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_14",
        "transactionId": "txn_stmt_1794152163809_oqsp_14",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll from Danube Studio is recurring employment income.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_15",
        "transactionId": "txn_stmt_1794152163809_oqsp_15",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Transfer to savings account with matched evidence.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_16",
        "transactionId": "txn_stmt_1794152163809_oqsp_16",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties is a recurring monthly housing expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_17",
        "transactionId": "txn_stmt_1794152163809_oqsp_17",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket represents a grocery expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_18",
        "transactionId": "txn_stmt_1794152163809_oqsp_18",
        "economicType": "expense",
        "category": "transport",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit is a transportation expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_19",
        "transactionId": "txn_stmt_1794152163809_oqsp_19",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy is a recurring utility expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_20",
        "transactionId": "txn_stmt_1794152163809_oqsp_20",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home is a recurring telecom expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_21",
        "transactionId": "txn_stmt_1794152163809_oqsp_21",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music streaming subscription payment to Sound Library is a recurring subscription expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_22",
        "transactionId": "txn_stmt_1794152163809_oqsp_22",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services represents a recurring debt repayment.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_23",
        "transactionId": "txn_stmt_1794152163809_oqsp_23",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket represents a grocery expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_24",
        "transactionId": "txn_stmt_1794152163809_oqsp_24",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee is a dining and coffee expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_25",
        "transactionId": "txn_stmt_1794152163809_oqsp_25",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen is a dining expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_26",
        "transactionId": "txn_stmt_1794152163809_oqsp_26",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription payment to Screen Library is a recurring subscription expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_27",
        "transactionId": "txn_stmt_1794152163809_oqsp_27",
        "economicType": "expense",
        "category": "health",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase at Oak Pharmacy is a health-related expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_28",
        "transactionId": "txn_stmt_1794152163809_oqsp_28",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket represents a grocery expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_29",
        "transactionId": "txn_stmt_1794152163809_oqsp_29",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll from Danube Studio is recurring employment income.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_30",
        "transactionId": "txn_stmt_1794152163809_oqsp_30",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Transfer to savings account with matched evidence.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_31",
        "transactionId": "txn_stmt_1794152163809_oqsp_31",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties is a recurring monthly housing expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_32",
        "transactionId": "txn_stmt_1794152163809_oqsp_32",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket represents a grocery expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_33",
        "transactionId": "txn_stmt_1794152163809_oqsp_33",
        "economicType": "expense",
        "category": "transport",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit is a transportation expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_34",
        "transactionId": "txn_stmt_1794152163809_oqsp_34",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy is a recurring utility expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_35",
        "transactionId": "txn_stmt_1794152163809_oqsp_35",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home is a recurring telecom expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_36",
        "transactionId": "txn_stmt_1794152163809_oqsp_36",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music streaming subscription payment to Sound Library is a recurring subscription expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_37",
        "transactionId": "txn_stmt_1794152163809_oqsp_37",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services represents a recurring debt repayment.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_38",
        "transactionId": "txn_stmt_1794152163809_oqsp_38",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket represents a grocery expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_39",
        "transactionId": "txn_stmt_1794152163809_oqsp_39",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee is a dining and coffee expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_40",
        "transactionId": "txn_stmt_1794152163809_oqsp_40",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen is a dining expense.",
        "updatedAt": "2026-11-08T15:36:13.974Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_41",
        "transactionId": "txn_stmt_1794152163809_oqsp_41",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription identified as a recurring expense.",
        "updatedAt": "2026-11-08T15:36:17.577Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_42",
        "transactionId": "txn_stmt_1794152163809_oqsp_42",
        "economicType": "expense",
        "category": "health",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase classified as a health expense.",
        "updatedAt": "2026-11-08T15:36:17.577Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_43",
        "transactionId": "txn_stmt_1794152163809_oqsp_43",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket groceries purchase.",
        "updatedAt": "2026-11-08T15:36:17.577Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_44",
        "transactionId": "txn_stmt_1794152163809_oqsp_44",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll inflow.",
        "updatedAt": "2026-11-08T15:36:17.577Z"
      },
      {
        "id": "cls_txn_stmt_1794152163809_oqsp_45",
        "transactionId": "txn_stmt_1794152163809_oqsp_45",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Outgoing transfer matched with incoming savings transaction via verified evidence.",
        "updatedAt": "2026-11-08T15:36:17.577Z"
      },
      {
        "id": "cls_txn_stmt_1794152163822_my4o_1",
        "transactionId": "txn_stmt_1794152163822_my4o_1",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Incoming transfer matched with outgoing transaction via verified evidence.",
        "updatedAt": "2026-11-08T15:36:17.577Z"
      },
      {
        "id": "cls_txn_stmt_1794152163822_my4o_2",
        "transactionId": "txn_stmt_1794152163822_my4o_2",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Incoming transfer matched with outgoing transaction via verified evidence.",
        "updatedAt": "2026-11-08T15:36:17.577Z"
      },
      {
        "id": "cls_txn_stmt_1794152163822_my4o_3",
        "transactionId": "txn_stmt_1794152163822_my4o_3",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Incoming transfer matched with outgoing transaction via verified evidence.",
        "updatedAt": "2026-11-08T15:36:17.577Z"
      }
    ],
    "transferMatches": [
      {
        "id": "match_single_txn_stmt_1794152163809_oqsp_15",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "outgoingTransactionId": "txn_stmt_1794152163809_oqsp_15",
        "incomingTransactionId": null,
        "outgoingAccountId": "main",
        "incomingAccountId": null,
        "amount": 150,
        "currency": "EUR",
        "date": "2026-08-28",
        "description": "Transfer to Reserve Account",
        "status": "probable"
      },
      {
        "id": "match_single_txn_stmt_1794152163809_oqsp_30",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "outgoingTransactionId": "txn_stmt_1794152163809_oqsp_30",
        "incomingTransactionId": null,
        "outgoingAccountId": "main",
        "incomingAccountId": null,
        "amount": 150,
        "currency": "EUR",
        "date": "2026-09-28",
        "description": "Transfer to Reserve Account",
        "status": "probable"
      },
      {
        "id": "match_single_txn_stmt_1794152163809_oqsp_45",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "outgoingTransactionId": "txn_stmt_1794152163809_oqsp_45",
        "incomingTransactionId": null,
        "outgoingAccountId": "main",
        "incomingAccountId": null,
        "amount": 150,
        "currency": "EUR",
        "date": "2026-10-28",
        "description": "Transfer to Reserve Account",
        "status": "probable"
      },
      {
        "id": "match_txn_stmt_1794152163809_oqsp_15_txn_stmt_1794152163822_my4o_1",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "outgoingTransactionId": "txn_stmt_1794152163809_oqsp_15",
        "incomingTransactionId": "txn_stmt_1794152163822_my4o_1",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-08-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1794152163809_oqsp_30_txn_stmt_1794152163822_my4o_2",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "outgoingTransactionId": "txn_stmt_1794152163809_oqsp_30",
        "incomingTransactionId": "txn_stmt_1794152163822_my4o_2",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-09-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1794152163809_oqsp_45_txn_stmt_1794152163822_my4o_3",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "outgoingTransactionId": "txn_stmt_1794152163809_oqsp_45",
        "incomingTransactionId": "txn_stmt_1794152163822_my4o_3",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-10-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      }
    ],
    "confirmations": [
      {
        "id": "conf_sub_txn_stmt_1794152163809_oqsp_6",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152163809_oqsp_6",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-08-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152163809_oqsp_11",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152163809_oqsp_11",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-08-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152163809_oqsp_15",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152163809_oqsp_15",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152163809_oqsp_21",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152163809_oqsp_21",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-09-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152163809_oqsp_26",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152163809_oqsp_26",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-09-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152163809_oqsp_30",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152163809_oqsp_30",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152163809_oqsp_36",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152163809_oqsp_36",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-10-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152163809_oqsp_41",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152163809_oqsp_41",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-10-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152163809_oqsp_45",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152163809_oqsp_45",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152163822_my4o_1",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152163822_my4o_1",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152163822_my4o_2",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152163822_my4o_2",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152163822_my4o_3",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152163822_my4o_3",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      }
    ],
    "recommendations": [
      {
        "id": "rec_A014_eval_e1155468-9845-4388-81a9-d17627bc19bc",
        "userId": "8a11672a-1635-48ac-bcb9-0b94fa9eb4ee",
        "snapshotId": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
        "actionType": "review_recurring_subscription",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
        "suggestedAmount": 10.99,
        "adjustedAmount": null,
        "currency": "EUR",
        "targetGoalId": "txn_stmt_1794152163809_oqsp_6",
        "sourceAccountId": "main",
        "priority": "clarification",
        "status": "accepted",
        "readinessState": "state_a_action_ready",
        "createdAt": "2026-11-08T15:36:47.222Z",
        "updatedAt": "2026-11-08T15:36:49.131Z"
      }
    ],
    "assistantMessages": [],
    "actionFeedback": [
      {
        "id": "fb_1794152209173_accept",
        "recommendationId": "rec_A014_eval_e1155468-9845-4388-81a9-d17627bc19bc",
        "actionId": "A014",
        "snapshotId": "snap_beta_8a11672a-1635-48ac-bcb9-0b94fa9eb4ee_v3_9d90bacf69ae3214",
        "action": "accept",
        "amount": 10.99,
        "note": "User accepted recommendation (pending execution).",
        "timestamp": "2026-11-08T15:36:49.131Z"
      }
    ]
  },
  "aiConsent": true,
  "experimentalRecommendations": true,
  "requestHash": "20e4f0c75263706e3697b5bd5f698b356a0790782913e54f6126a7ab344fee77"
}
~~~~
