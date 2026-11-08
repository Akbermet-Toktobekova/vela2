# 03 Nora · explanation

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / stage:eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:explanation / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T15:48:49.162Z

Consumers: Today and Assistant

Upstream artifact IDs: eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4:decision-engine

Missing inputs: None flagged

## Input

~~~~json
{
  "decision": {
    "evaluationId": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4",
    "snapshotId": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
    "snapshotVersion": "4.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1794152889907_8l22_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794152889907_8l22_6",
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
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
    "expectedEffectSummary": "Verification step (A014) to confirm contract or usage terms without fabricating monetary R/F/G scores.",
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
      "evaluationId": "eval_f30a06a2-f7fa-4a18-98c5-39357cb8afb4",
      "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
      "snapshotId": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T15:48:49.134Z",
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
            "candidateId": "cand_A007_snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
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
            "candidateId": "cand_A015_txn_stmt_1794152889907_8l22_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794152889907_8l22_6",
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
            "candidateId": "verify_A014_txn_stmt_1794152889907_8l22_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794152889907_8l22_6",
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
        "candidateId": "verify_A014_txn_stmt_1794152889907_8l22_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794152889907_8l22_6",
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
  "snapshot": {
    "id": "snap_beta_68a3aa1f-3c62-40f4-a334-3335750a06aa_v4_116b99558b921724",
    "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
    "version": "4.0",
    "createdAt": "2026-11-05T12:00:00.000Z",
    "baseCurrency": "EUR",
    "isDemoMode": false,
    "profile": {
      "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
      "nickname": "03 Nora",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T15:48:09.875Z"
    },
    "onboarding": {
      "id": "80754e11-ba77-43e2-8ffb-b6b2bb6c7bab",
      "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T15:48:09.875Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accountSummaries": [
      {
        "account": {
          "id": "main",
          "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        "latestBalance": {
          "id": "9f0ecb81-5e70-4b5d-acfb-2f263d25a733",
          "accountId": "main",
          "amount": 3577.01,
          "currency": "EUR",
          "asOf": "2026-10-28",
          "sourceType": "statement_closing",
          "sourceId": "stmt_1794152889907_8l22",
          "createdAt": "2026-11-08T15:48:09.910Z"
        },
        "balanceHistory": [
          {
            "id": "9f0ecb81-5e70-4b5d-acfb-2f263d25a733",
            "accountId": "main",
            "amount": 3577.01,
            "currency": "EUR",
            "asOf": "2026-10-28",
            "sourceType": "statement_closing",
            "sourceId": "stmt_1794152889907_8l22",
            "createdAt": "2026-11-08T15:48:09.910Z"
          }
        ],
        "isStale": true,
        "personalAccessibleBalance": 3577.01,
        "allocatedToGoals": 0,
        "coverage": {
          "id": "cov_main",
          "accountId": "main",
          "periodStart": "2026-08-03",
          "periodEnd": "2026-10-28",
          "daysCovered": 87,
          "monthsCovered": 3,
          "completeness": "multi_month"
        },
        "statementCount": 1,
        "transactionCount": 45
      },
      {
        "account": {
          "id": "savings",
          "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        },
        "latestBalance": {
          "id": "41992569-b1bb-4b42-a720-c211b5985b90",
          "accountId": "savings",
          "amount": 600,
          "currency": "EUR",
          "asOf": "2026-10-28",
          "sourceType": "statement_closing",
          "sourceId": "stmt_1794152889938_xezo",
          "createdAt": "2026-11-08T15:48:09.939Z"
        },
        "balanceHistory": [
          {
            "id": "41992569-b1bb-4b42-a720-c211b5985b90",
            "accountId": "savings",
            "amount": 600,
            "currency": "EUR",
            "asOf": "2026-10-28",
            "sourceType": "statement_closing",
            "sourceId": "stmt_1794152889938_xezo",
            "createdAt": "2026-11-08T15:48:09.939Z"
          }
        ],
        "isStale": true,
        "personalAccessibleBalance": 600,
        "allocatedToGoals": 600,
        "coverage": {
          "id": "cov_savings",
          "accountId": "savings",
          "periodStart": "2026-08-28",
          "periodEnd": "2026-10-28",
          "daysCovered": 62,
          "monthsCovered": 2,
          "completeness": "multi_month"
        },
        "statementCount": 1,
        "transactionCount": 3
      }
    ],
    "currencySummaries": [
      {
        "currency": "EUR",
        "totalReportedBalance": 4177.01,
        "personalAccessibleCash": 4177.01,
        "allocatedToGoals": 600,
        "upcomingUnpaidObligations": 1117,
        "uncommittedSafeToSpend": 2460.01,
        "hasWorkOrMixedUncertainty": false,
        "hasMissingBalances": false
      }
    ],
    "primaryCurrencySummary": {
      "currency": "EUR",
      "totalReportedBalance": 4177.01,
      "personalAccessibleCash": 4177.01,
      "allocatedToGoals": 600,
      "upcomingUnpaidObligations": 1117,
      "uncommittedSafeToSpend": 2460.01,
      "hasWorkOrMixedUncertainty": false,
      "hasMissingBalances": false
    },
    "incomeSources": [
      {
        "id": "salary",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
    "declaredMonthlyIncomeByCurrency": {
      "EUR": 2350
    },
    "essentialCommitment": {
      "id": "essentials",
      "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
      "estimatedMonthlyAmount": 1450,
      "currency": "EUR",
      "notes": "Synthetic user estimate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "rent",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
    "upcomingUnpaidObligations": [
      {
        "id": "rent",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
    "overdueObligations": [],
    "debts": [
      {
        "id": "card",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "name": "Emergency reserve",
        "goalType": "emergency_cushion",
        "targetAmount": 3000,
        "currency": "EUR",
        "targetDate": "2027-06-30",
        "priority": "high",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "goalAllocations": [
      {
        "id": "reserved",
        "goalId": "reserve",
        "accountId": "savings",
        "amount": 600,
        "currency": "EUR",
        "allocatedAt": "2026-11-05",
        "note": "Existing reserve balance earmarked for this goal",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa"
      }
    ],
    "safetyCushionGoal": {
      "id": "reserve",
      "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
      "name": "Emergency reserve",
      "goalType": "emergency_cushion",
      "targetAmount": 3000,
      "currency": "EUR",
      "targetDate": "2027-06-30",
      "priority": "high",
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    "safetyCushionAllocated": 600,
    "emergencyCoverageMonths": 0.41,
    "emergencyCoverageDays": 12.4,
    "statements": [
      {
        "id": "stmt_1794152889907_8l22",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        "importedAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "stmt_1794152889938_xezo",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
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
        "importedAt": "2026-11-08T15:48:09.938Z"
      }
    ],
    "transactions": [
      {
        "id": "txn_stmt_1794152889907_8l22_1",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_2",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_3",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_4",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_5",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_6",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_7",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_8",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_9",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_10",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_11",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_12",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_13",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_14",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_15",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_16",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_17",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_18",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_19",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_20",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_21",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_22",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_23",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_24",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_25",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_26",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_27",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_28",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_29",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_30",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_31",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_32",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_33",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_34",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_35",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_36",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_37",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_38",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_39",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_40",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_41",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_42",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_43",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_44",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889907_8l22_45",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "main",
        "statementId": "stmt_1794152889907_8l22",
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
        "createdAt": "2026-11-08T15:48:09.907Z"
      },
      {
        "id": "txn_stmt_1794152889938_xezo_1",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "savings",
        "statementId": "stmt_1794152889938_xezo",
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
        "createdAt": "2026-11-08T15:48:09.938Z"
      },
      {
        "id": "txn_stmt_1794152889938_xezo_2",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "savings",
        "statementId": "stmt_1794152889938_xezo",
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
        "createdAt": "2026-11-08T15:48:09.938Z"
      },
      {
        "id": "txn_stmt_1794152889938_xezo_3",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "accountId": "savings",
        "statementId": "stmt_1794152889938_xezo",
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
        "createdAt": "2026-11-08T15:48:09.938Z"
      }
    ],
    "classifications": {
      "txn_stmt_1794152889907_8l22_1": {
        "id": "cls_txn_stmt_1794152889907_8l22_1",
        "transactionId": "txn_stmt_1794152889907_8l22_1",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_2": {
        "id": "cls_txn_stmt_1794152889907_8l22_2",
        "transactionId": "txn_stmt_1794152889907_8l22_2",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_3": {
        "id": "cls_txn_stmt_1794152889907_8l22_3",
        "transactionId": "txn_stmt_1794152889907_8l22_3",
        "economicType": "expense",
        "category": "other",
        "confidence": "low",
        "status": "needs_review",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_4": {
        "id": "cls_txn_stmt_1794152889907_8l22_4",
        "transactionId": "txn_stmt_1794152889907_8l22_4",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility payment to Bright Energy.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_5": {
        "id": "cls_txn_stmt_1794152889907_8l22_5",
        "transactionId": "txn_stmt_1794152889907_8l22_5",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_6": {
        "id": "cls_txn_stmt_1794152889907_8l22_6",
        "transactionId": "txn_stmt_1794152889907_8l22_6",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription payment to Sound Library.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_7": {
        "id": "cls_txn_stmt_1794152889907_8l22_7",
        "transactionId": "txn_stmt_1794152889907_8l22_7",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_8": {
        "id": "cls_txn_stmt_1794152889907_8l22_8",
        "transactionId": "txn_stmt_1794152889907_8l22_8",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_9": {
        "id": "cls_txn_stmt_1794152889907_8l22_9",
        "transactionId": "txn_stmt_1794152889907_8l22_9",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_10": {
        "id": "cls_txn_stmt_1794152889907_8l22_10",
        "transactionId": "txn_stmt_1794152889907_8l22_10",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant meal at Maple Kitchen.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_11": {
        "id": "cls_txn_stmt_1794152889907_8l22_11",
        "transactionId": "txn_stmt_1794152889907_8l22_11",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription payment to Screen Library.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_12": {
        "id": "cls_txn_stmt_1794152889907_8l22_12",
        "transactionId": "txn_stmt_1794152889907_8l22_12",
        "economicType": "expense",
        "category": "other",
        "confidence": "low",
        "status": "needs_review",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase at Oak Pharmacy.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_13": {
        "id": "cls_txn_stmt_1794152889907_8l22_13",
        "transactionId": "txn_stmt_1794152889907_8l22_13",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_14": {
        "id": "cls_txn_stmt_1794152889907_8l22_14",
        "transactionId": "txn_stmt_1794152889907_8l22_14",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll from Danube Studio.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_15": {
        "id": "cls_txn_stmt_1794152889907_8l22_15",
        "transactionId": "txn_stmt_1794152889907_8l22_15",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Matched own-account transfer to savings.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_16": {
        "id": "cls_txn_stmt_1794152889907_8l22_16",
        "transactionId": "txn_stmt_1794152889907_8l22_16",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_17": {
        "id": "cls_txn_stmt_1794152889907_8l22_17",
        "transactionId": "txn_stmt_1794152889907_8l22_17",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_18": {
        "id": "cls_txn_stmt_1794152889907_8l22_18",
        "transactionId": "txn_stmt_1794152889907_8l22_18",
        "economicType": "expense",
        "category": "other",
        "confidence": "low",
        "status": "needs_review",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_19": {
        "id": "cls_txn_stmt_1794152889907_8l22_19",
        "transactionId": "txn_stmt_1794152889907_8l22_19",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility payment to Bright Energy.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_20": {
        "id": "cls_txn_stmt_1794152889907_8l22_20",
        "transactionId": "txn_stmt_1794152889907_8l22_20",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_21": {
        "id": "cls_txn_stmt_1794152889907_8l22_21",
        "transactionId": "txn_stmt_1794152889907_8l22_21",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription payment to Sound Library.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_22": {
        "id": "cls_txn_stmt_1794152889907_8l22_22",
        "transactionId": "txn_stmt_1794152889907_8l22_22",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_23": {
        "id": "cls_txn_stmt_1794152889907_8l22_23",
        "transactionId": "txn_stmt_1794152889907_8l22_23",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_24": {
        "id": "cls_txn_stmt_1794152889907_8l22_24",
        "transactionId": "txn_stmt_1794152889907_8l22_24",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_25": {
        "id": "cls_txn_stmt_1794152889907_8l22_25",
        "transactionId": "txn_stmt_1794152889907_8l22_25",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant meal at Maple Kitchen.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_26": {
        "id": "cls_txn_stmt_1794152889907_8l22_26",
        "transactionId": "txn_stmt_1794152889907_8l22_26",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription payment to Screen Library.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_27": {
        "id": "cls_txn_stmt_1794152889907_8l22_27",
        "transactionId": "txn_stmt_1794152889907_8l22_27",
        "economicType": "expense",
        "category": "other",
        "confidence": "low",
        "status": "needs_review",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase at Oak Pharmacy.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_28": {
        "id": "cls_txn_stmt_1794152889907_8l22_28",
        "transactionId": "txn_stmt_1794152889907_8l22_28",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_29": {
        "id": "cls_txn_stmt_1794152889907_8l22_29",
        "transactionId": "txn_stmt_1794152889907_8l22_29",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll from Danube Studio.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_30": {
        "id": "cls_txn_stmt_1794152889907_8l22_30",
        "transactionId": "txn_stmt_1794152889907_8l22_30",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Matched own-account transfer to savings.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_31": {
        "id": "cls_txn_stmt_1794152889907_8l22_31",
        "transactionId": "txn_stmt_1794152889907_8l22_31",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_32": {
        "id": "cls_txn_stmt_1794152889907_8l22_32",
        "transactionId": "txn_stmt_1794152889907_8l22_32",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_33": {
        "id": "cls_txn_stmt_1794152889907_8l22_33",
        "transactionId": "txn_stmt_1794152889907_8l22_33",
        "economicType": "expense",
        "category": "other",
        "confidence": "low",
        "status": "needs_review",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_34": {
        "id": "cls_txn_stmt_1794152889907_8l22_34",
        "transactionId": "txn_stmt_1794152889907_8l22_34",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility payment to Bright Energy.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_35": {
        "id": "cls_txn_stmt_1794152889907_8l22_35",
        "transactionId": "txn_stmt_1794152889907_8l22_35",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_36": {
        "id": "cls_txn_stmt_1794152889907_8l22_36",
        "transactionId": "txn_stmt_1794152889907_8l22_36",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription payment to Sound Library.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_37": {
        "id": "cls_txn_stmt_1794152889907_8l22_37",
        "transactionId": "txn_stmt_1794152889907_8l22_37",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_38": {
        "id": "cls_txn_stmt_1794152889907_8l22_38",
        "transactionId": "txn_stmt_1794152889907_8l22_38",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_39": {
        "id": "cls_txn_stmt_1794152889907_8l22_39",
        "transactionId": "txn_stmt_1794152889907_8l22_39",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_40": {
        "id": "cls_txn_stmt_1794152889907_8l22_40",
        "transactionId": "txn_stmt_1794152889907_8l22_40",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant meal at Maple Kitchen.",
        "updatedAt": "2026-11-08T15:48:32.794Z"
      },
      "txn_stmt_1794152889907_8l22_41": {
        "id": "cls_txn_stmt_1794152889907_8l22_41",
        "transactionId": "txn_stmt_1794152889907_8l22_41",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "The description explicitly identifies this as a video streaming subscription.",
        "updatedAt": "2026-11-08T15:48:34.829Z"
      },
      "txn_stmt_1794152889907_8l22_42": {
        "id": "cls_txn_stmt_1794152889907_8l22_42",
        "transactionId": "txn_stmt_1794152889907_8l22_42",
        "economicType": "expense",
        "category": "health",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The counterparty is a pharmacy and the description indicates a purchase.",
        "updatedAt": "2026-11-08T15:48:34.829Z"
      },
      "txn_stmt_1794152889907_8l22_43": {
        "id": "cls_txn_stmt_1794152889907_8l22_43",
        "transactionId": "txn_stmt_1794152889907_8l22_43",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The counterparty and description confirm a supermarket grocery purchase.",
        "updatedAt": "2026-11-08T15:48:34.829Z"
      },
      "txn_stmt_1794152889907_8l22_44": {
        "id": "cls_txn_stmt_1794152889907_8l22_44",
        "transactionId": "txn_stmt_1794152889907_8l22_44",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "The description identifies this as a salary payroll payment.",
        "updatedAt": "2026-11-08T15:48:34.829Z"
      },
      "txn_stmt_1794152889907_8l22_45": {
        "id": "cls_txn_stmt_1794152889907_8l22_45",
        "transactionId": "txn_stmt_1794152889907_8l22_45",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "This transaction is matched to an incoming transfer in the provided evidence.",
        "updatedAt": "2026-11-08T15:48:34.829Z"
      },
      "txn_stmt_1794152889938_xezo_1": {
        "id": "cls_txn_stmt_1794152889938_xezo_1",
        "transactionId": "txn_stmt_1794152889938_xezo_1",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "This transaction is matched to an outgoing transfer in the provided evidence.",
        "updatedAt": "2026-11-08T15:48:34.829Z"
      },
      "txn_stmt_1794152889938_xezo_2": {
        "id": "cls_txn_stmt_1794152889938_xezo_2",
        "transactionId": "txn_stmt_1794152889938_xezo_2",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "This transaction is matched to an outgoing transfer in the provided evidence.",
        "updatedAt": "2026-11-08T15:48:34.829Z"
      },
      "txn_stmt_1794152889938_xezo_3": {
        "id": "cls_txn_stmt_1794152889938_xezo_3",
        "transactionId": "txn_stmt_1794152889938_xezo_3",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v2:gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "This transaction is matched to an outgoing transfer in the provided evidence.",
        "updatedAt": "2026-11-08T15:48:34.829Z"
      }
    },
    "transferMatches": [
      {
        "id": "match_single_txn_stmt_1794152889907_8l22_15",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "outgoingTransactionId": "txn_stmt_1794152889907_8l22_15",
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
        "id": "match_single_txn_stmt_1794152889907_8l22_30",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "outgoingTransactionId": "txn_stmt_1794152889907_8l22_30",
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
        "id": "match_single_txn_stmt_1794152889907_8l22_45",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "outgoingTransactionId": "txn_stmt_1794152889907_8l22_45",
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
        "id": "match_txn_stmt_1794152889907_8l22_15_txn_stmt_1794152889938_xezo_1",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "outgoingTransactionId": "txn_stmt_1794152889907_8l22_15",
        "incomingTransactionId": "txn_stmt_1794152889938_xezo_1",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-08-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1794152889907_8l22_30_txn_stmt_1794152889938_xezo_2",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "outgoingTransactionId": "txn_stmt_1794152889907_8l22_30",
        "incomingTransactionId": "txn_stmt_1794152889938_xezo_2",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-09-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1794152889907_8l22_45_txn_stmt_1794152889938_xezo_3",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "outgoingTransactionId": "txn_stmt_1794152889907_8l22_45",
        "incomingTransactionId": "txn_stmt_1794152889938_xezo_3",
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
        "id": "conf_sub_txn_stmt_1794152889907_8l22_6",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_6",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-08-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_11",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_11",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-08-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889907_8l22_15",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889907_8l22_15",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_21",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_21",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-09-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_26",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_26",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-09-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889907_8l22_30",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889907_8l22_30",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_36",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_36",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-10-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_41",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_41",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-10-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889907_8l22_45",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889907_8l22_45",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889938_xezo_1",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889938_xezo_1",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889938_xezo_2",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889938_xezo_2",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889938_xezo_3",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889938_xezo_3",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      }
    ],
    "unresolvedConfirmations": [
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_6",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_6",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-08-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_11",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_11",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-08-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889907_8l22_15",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889907_8l22_15",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_21",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_21",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-09-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_26",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_26",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-09-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889907_8l22_30",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889907_8l22_30",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_36",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_36",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-10-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794152889907_8l22_41",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794152889907_8l22_41",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-10-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889907_8l22_45",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889907_8l22_45",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889938_xezo_1",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889938_xezo_1",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889938_xezo_2",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889938_xezo_2",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794152889938_xezo_3",
        "userId": "68a3aa1f-3c62-40f4-a334-3335750a06aa",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794152889938_xezo_3",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      }
    ],
    "dataQuality": {
      "totalAccounts": 2,
      "accountsWithBalance": 2,
      "accountsWithStatements": 2,
      "staleBalanceAccountIds": [
        "main",
        "savings"
      ],
      "missingBalanceAccountIds": [],
      "multiCurrencyDetected": false,
      "currencies": [
        "EUR"
      ],
      "singleMonthWarning": false,
      "coverageStatus": "complete",
      "missingFields": []
    },
    "observedInflowsByCurrency": {
      "EUR": 7050
    },
    "observedSpendingTotal": 4617.99,
    "observedIncomeTotal": 7050,
    "observedSubscriptionsTotal": 80.94,
    "observedInternalTransfersTotal": 450,
    "observedDebtPaymentsTotal": 165,
    "observedWorkMovementsTotal": 0,
    "spendingByCategory": {
      "rent_housing": 2940,
      "utilities_energy": 315,
      "internet_telecom": 96,
      "groceries_food": 814.6499999999999,
      "dining_coffee": 177.6,
      "transport": 0,
      "subscriptions": 80.94,
      "shopping": 0,
      "health": 22.6,
      "education": 0,
      "work_expense": 0,
      "income": 0,
      "transfer": 0,
      "other": 171.2
    },
    "readinessState": "state_b_clarification_needed",
    "readinessReason": "Update stale account balances before relying on a monetary recommendation."
  }
}
~~~~

## Output

~~~~json
{
  "title": "Review recurring subscription before cancellation",
  "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
  "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
  "expectedEffectSummary": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?"
}
~~~~

## Summary

~~~~text
Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.
~~~~
