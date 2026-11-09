# 01 Debt · explanation

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / stage:eval_eef6011c-4c98-42d6-942a-81dfa4bf4aa1:explanation / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T20:31:59.338Z

Consumers: Today and Assistant

Upstream artifact IDs: eval_eef6011c-4c98-42d6-942a-81dfa4bf4aa1:decision-engine

Missing inputs: None flagged

## Input

~~~~json
{
  "decision": {
    "evaluationId": "eval_eef6011c-4c98-42d6-942a-81dfa4bf4aa1",
    "snapshotId": "snap_beta_10ec1fbb-32b1-43a1-89b2-711668715da3_v2_694c68ff563ab38b",
    "snapshotVersion": "2.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "CRITICAL",
    "selectedActionId": "A001",
    "selectedActionType": "FINANCIAL_ACTION",
    "candidate": {
      "candidateId": "crit_A001_card",
      "actionId": "A001",
      "actionType": "FINANCIAL_ACTION",
      "title": "Pay required EUR 65 minimum on Credit card",
      "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
      "rationale": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
      "targetId": "card",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 65,
      "currency": "EUR",
      "proposedTiming": "2026-11-08",
      "supportingRuleIds": [
        "R001",
        "R005"
      ],
      "supportingClaimIds": [
        "C013"
      ],
      "supportingSourceIds": [
        "S002"
      ],
      "requiredPiInputs": [
        "amount_due",
        "due_date",
        "bank_balance",
        "obligations"
      ],
      "origin": "CRITICAL_COVERAGE"
    },
    "title": "Pay required EUR 65 minimum on Credit card",
    "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
    "reasoning": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
    "expectedEffectSummary": "Addresses imminent payment or cash-flow shortfall directly (A001).",
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
      "S002"
    ],
    "ruleIds": [
      "R001",
      "R005"
    ],
    "claimIds": [
      "C013"
    ],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": null,
    "missingFields": [],
    "trace": {
      "evaluationId": "eval_eef6011c-4c98-42d6-942a-81dfa4bf4aa1",
      "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
      "snapshotId": "snap_beta_10ec1fbb-32b1-43a1-89b2-711668715da3_v2_694c68ff563ab38b",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T20:31:59.327Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "CRITICAL",
      "weightSelection": {
        "profileId": "liquidity_protection",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.5,
          "F": 0.35,
          "G": 0.15
        },
        "triggerReason": "Liquid expense coverage M = 0.07 months is below entry threshold 1.00 months.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "crit_A001_card",
            "actionId": "A001",
            "actionType": "FINANCIAL_ACTION",
            "title": "Pay required EUR 65 minimum on Credit card",
            "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
            "rationale": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
            "targetId": "card",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 65,
            "currency": "EUR",
            "proposedTiming": "2026-11-08",
            "supportingRuleIds": [
              "R001",
              "R005"
            ],
            "supportingClaimIds": [
              "C013"
            ],
            "supportingSourceIds": [
              "S002"
            ],
            "requiredPiInputs": [
              "amount_due",
              "due_date",
              "bank_balance",
              "obligations"
            ],
            "origin": "CRITICAL_COVERAGE"
          },
          "status": "VALID",
          "isCritical": true,
          "criticalPriorityRank": 2,
          "resolvesCriticalProblemDirectly": true,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "amount_due",
              "status": "VERIFIED"
            },
            {
              "field": "due_date",
              "status": "VERIFIED"
            },
            {
              "field": "bank_balance",
              "status": "VERIFIED"
            },
            {
              "field": "obligations",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": -65,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "crit_A020_deficit",
            "actionId": "A020",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review projected EUR 65 cash shortfall before 2026-11-18",
            "description": "Projected cash drops below required obligations by 2026-11-18 (Utilities). Review upcoming bills and available balances.",
            "rationale": "Diagnostic alert (F004, F019, R009): flags upcoming payment shortfall for user verification without assuming automatic resolution.",
            "targetId": "utility",
            "sourceAccountId": null,
            "destinationAccountId": null,
            "amount": 65,
            "currency": "EUR",
            "proposedTiming": "2026-11-18",
            "supportingRuleIds": [
              "R009"
            ],
            "supportingClaimIds": [
              "C004",
              "C009"
            ],
            "supportingSourceIds": [
              "S001",
              "S007"
            ],
            "requiredPiInputs": [
              "cash",
              "due_obligations",
              "confirmed_income"
            ],
            "origin": "CRITICAL_COVERAGE"
          },
          "status": "VALID",
          "isCritical": true,
          "criticalPriorityRank": 3,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "cash",
              "status": "VERIFIED"
            },
            {
              "field": "due_obligations",
              "status": "VERIFIED"
            },
            {
              "field": "confirmed_income",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": -65,
          "unlocksActionIds": [
            "A001",
            "A005",
            "A011"
          ]
        }
      ],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "crit_A001_card",
        "actionId": "A001",
        "actionType": "FINANCIAL_ACTION",
        "title": "Pay required EUR 65 minimum on Credit card",
        "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
        "rationale": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
        "targetId": "card",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 65,
        "currency": "EUR",
        "proposedTiming": "2026-11-08",
        "supportingRuleIds": [
          "R001",
          "R005"
        ],
        "supportingClaimIds": [
          "C013"
        ],
        "supportingSourceIds": [
          "S002"
        ],
        "requiredPiInputs": [
          "amount_due",
          "due_date",
          "bank_balance",
          "obligations"
        ],
        "origin": "CRITICAL_COVERAGE"
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
      "supportingSourceIds": [
        "S002"
      ],
      "supportingRuleIds": [
        "R001",
        "R005"
      ],
      "supportingClaimIds": [
        "C013"
      ],
      "missingDataFields": [],
      "clarificationQuestion": null
    }
  },
  "snapshot": {
    "id": "snap_beta_10ec1fbb-32b1-43a1-89b2-711668715da3_v2_694c68ff563ab38b",
    "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
    "version": "2.0",
    "createdAt": "2026-11-05T12:00:00.000Z",
    "baseCurrency": "EUR",
    "isDemoMode": false,
    "profile": {
      "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T20:31:18.256Z"
    },
    "onboarding": {
      "id": "d9061a60-9171-419d-a346-bf13279b874c",
      "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T20:31:18.256Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accountSummaries": [
      {
        "account": {
          "id": "main",
          "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
          "name": "Current account",
          "institution": "Synthetic bank",
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
          "id": "balance-main",
          "accountId": "main",
          "amount": 65,
          "currency": "EUR",
          "asOf": "2026-11-05T12:00:00.000Z",
          "sourceType": "user_reported",
          "createdAt": "2026-11-05T12:00:00.000Z"
        },
        "balanceHistory": [
          {
            "id": "balance-main",
            "accountId": "main",
            "amount": 65,
            "currency": "EUR",
            "asOf": "2026-11-05T12:00:00.000Z",
            "sourceType": "user_reported",
            "createdAt": "2026-11-05T12:00:00.000Z"
          }
        ],
        "isStale": false,
        "personalAccessibleBalance": 65,
        "allocatedToGoals": 0,
        "coverage": null,
        "statementCount": 0,
        "transactionCount": 0
      }
    ],
    "currencySummaries": [
      {
        "currency": "EUR",
        "totalReportedBalance": 65,
        "personalAccessibleCash": 65,
        "allocatedToGoals": 0,
        "upcomingUnpaidObligations": 65,
        "uncommittedSafeToSpend": 0,
        "hasWorkOrMixedUncertainty": false,
        "hasMissingBalances": false
      }
    ],
    "primaryCurrencySummary": {
      "currency": "EUR",
      "totalReportedBalance": 65,
      "personalAccessibleCash": 65,
      "allocatedToGoals": 0,
      "upcomingUnpaidObligations": 65,
      "uncommittedSafeToSpend": 0,
      "hasWorkOrMixedUncertainty": false,
      "hasMissingBalances": false
    },
    "incomeSources": [
      {
        "id": "salary",
        "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
        "name": "Salary",
        "pattern": "regular",
        "estimatedMonthlyAmount": 1800,
        "currency": "EUR",
        "frequency": "monthly",
        "sourceType": "salary",
        "nextExpectedDate": "2026-11-25",
        "receivingAccountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "declaredMonthlyIncomeByCurrency": {
      "EUR": 1800
    },
    "essentialCommitment": {
      "id": "essentials",
      "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "utility",
        "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
        "name": "Utilities",
        "amount": 65,
        "currency": "EUR",
        "dueDate": "2026-11-18",
        "recurrence": "monthly",
        "category": "energy",
        "status": "unpaid",
        "accountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "upcomingUnpaidObligations": [
      {
        "id": "utility",
        "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
        "name": "Utilities",
        "amount": 65,
        "currency": "EUR",
        "dueDate": "2026-11-18",
        "recurrence": "monthly",
        "category": "energy",
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
        "userId": "10ec1fbb-32b1-43a1-89b2-711668715da3",
        "name": "Credit card",
        "debtType": "credit_card",
        "currency": "EUR",
        "remainingBalance": 900,
        "apr": 24,
        "minimumPayment": 65,
        "nextDueDate": "2026-11-08",
        "paymentFrequency": "monthly",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "goals": [],
    "goalAllocations": [],
    "safetyCushionGoal": null,
    "safetyCushionAllocated": 0,
    "emergencyCoverageMonths": 0,
    "emergencyCoverageDays": 0,
    "statements": [],
    "transactions": [],
    "classifications": {},
    "transferMatches": [],
    "confirmations": [],
    "unresolvedConfirmations": [],
    "dataQuality": {
      "totalAccounts": 1,
      "accountsWithBalance": 1,
      "accountsWithStatements": 0,
      "staleBalanceAccountIds": [],
      "missingBalanceAccountIds": [],
      "multiCurrencyDetected": false,
      "currencies": [
        "EUR"
      ],
      "singleMonthWarning": false,
      "coverageStatus": "none",
      "missingFields": []
    },
    "observedInflowsByCurrency": {},
    "observedSpendingTotal": 0,
    "observedIncomeTotal": 0,
    "observedSubscriptionsTotal": 0,
    "observedInternalTransfersTotal": 0,
    "observedDebtPaymentsTotal": 0,
    "observedWorkMovementsTotal": 0,
    "spendingByCategory": {
      "rent_housing": 0,
      "utilities_energy": 0,
      "internet_telecom": 0,
      "groceries_food": 0,
      "dining_coffee": 0,
      "transport": 0,
      "subscriptions": 0,
      "shopping": 0,
      "health": 0,
      "education": 0,
      "work_expense": 0,
      "income": 0,
      "transfer": 0,
      "other": 0
    },
    "readinessState": "state_c_limited_data",
    "readinessReason": "Your current uncommitted buffer is tight or covers upcoming obligations. Vela is monitoring your cashflow without forcing an allocation."
  }
}
~~~~

## Output

~~~~json
{
  "title": "Pay required EUR 65 minimum on Credit card",
  "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
  "reasoning": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005). Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R001, R005; Sources: S002]",
  "expectedEffectSummary": "Addresses imminent payment or cash-flow shortfall directly (A001)."
}
~~~~

## Summary

~~~~text
Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005). Selected under weight profile "liquidity_protection". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R001, R005; Sources: S002]
~~~~
