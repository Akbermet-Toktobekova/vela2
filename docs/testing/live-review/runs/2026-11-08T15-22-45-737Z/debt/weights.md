# 01 Debt · weights

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload / stage:eval_5c7c8638-6f02-4202-8680-87af6e088ddf:weights / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T15:23:35.849Z

Consumers: Scoring and Robustness

Upstream artifact IDs: eval_5c7c8638-6f02-4202-8680-87af6e088ddf:financial-calculator

Missing inputs: None flagged

## Input

~~~~json
{
  "snapshot": {
    "id": "snap_beta_a7dd4247-15f2-4e67-928f-6d9198880dd9_v2_d32cc2a958d33729",
    "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
    "version": "2.0",
    "createdAt": "2026-11-05T12:00:00.000Z",
    "baseCurrency": "EUR",
    "isDemoMode": false,
    "profile": {
      "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T15:22:46.051Z"
    },
    "onboarding": {
      "id": "3cc03514-d922-4613-869d-6f97bf703bc1",
      "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T15:22:46.051Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accountSummaries": [
      {
        "account": {
          "id": "main",
          "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
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
          "amount": 20,
          "currency": "EUR",
          "asOf": "2026-11-05T12:00:00.000Z",
          "sourceType": "user_reported",
          "createdAt": "2026-11-05T12:00:00.000Z"
        },
        "balanceHistory": [
          {
            "id": "balance-main",
            "accountId": "main",
            "amount": 20,
            "currency": "EUR",
            "asOf": "2026-11-05T12:00:00.000Z",
            "sourceType": "user_reported",
            "createdAt": "2026-11-05T12:00:00.000Z"
          }
        ],
        "isStale": false,
        "personalAccessibleBalance": 20,
        "allocatedToGoals": 0,
        "coverage": null,
        "statementCount": 0,
        "transactionCount": 0
      }
    ],
    "currencySummaries": [
      {
        "currency": "EUR",
        "totalReportedBalance": 20,
        "personalAccessibleCash": 20,
        "allocatedToGoals": 0,
        "upcomingUnpaidObligations": 65,
        "uncommittedSafeToSpend": -45,
        "hasWorkOrMixedUncertainty": false,
        "hasMissingBalances": false
      }
    ],
    "primaryCurrencySummary": {
      "currency": "EUR",
      "totalReportedBalance": 20,
      "personalAccessibleCash": 20,
      "allocatedToGoals": 0,
      "upcomingUnpaidObligations": 65,
      "uncommittedSafeToSpend": -45,
      "hasWorkOrMixedUncertainty": false,
      "hasMissingBalances": false
    },
    "incomeSources": [
      {
        "id": "salary",
        "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
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
      "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "utility",
        "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
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
        "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
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
        "userId": "a7dd4247-15f2-4e67-928f-6d9198880dd9",
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
  },
  "policy": {
    "policyMeta": {
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "status": "PROTOTYPE_ONLY",
      "empiricallyValidated": false,
      "evidenceGapRefs": [
        "G003",
        "G004",
        "G005",
        "G006",
        "G009",
        "G012"
      ],
      "notice": "All numerical weights, normalization references, complexity coefficients, and robustness thresholds in this file are preliminary engineering parameters (PROTOTYPE_ONLY) requiring empirical calibration before production use."
    },
    "runtimeMode": {
      "mode": "PROTOTYPE_MODE",
      "allowPendingReviewActionsInPrototype": true,
      "requireApprovedForProductionInLive": true
    },
    "horizonAndFreshness": {
      "simulationHorizonDays": 90,
      "debtExplanationHorizonMonths": 12,
      "staleBalanceThresholdDays": 14,
      "statementClosingStaleThresholdDays": 5,
      "fxRateStaleThresholdHours": 48,
      "imminentObligationWindowDays": 7,
      "declinedActionCooldownDays": 14
    },
    "weightPolicy": {
      "version": "weight_policy_v1_prototype",
      "status": "PROTOTYPE_ONLY",
      "hysteresis": {
        "liquidityEnterBelowMonths": 1,
        "liquidityExitAtOrAboveMonths": 1.25
      },
      "expensiveDebtThresholdApr": 15,
      "requireActiveInterestAccrualOrImminentPromoExpiry": true,
      "priorityOrder": [
        "liquidity_protection",
        "expensive_debt",
        "goal_advancement",
        "balanced"
      ],
      "profiles": {
        "liquidity_protection": {
          "R": 0.5,
          "F": 0.35,
          "G": 0.15
        },
        "expensive_debt": {
          "R": 0.2,
          "F": 0.6,
          "G": 0.2
        },
        "goal_advancement": {
          "R": 0.2,
          "F": 0.2,
          "G": 0.6
        },
        "balanced": {
          "R": 0.34,
          "F": 0.33,
          "G": 0.33
        }
      }
    },
    "normalizationPolicy": {
      "version": "normalization_policy_v1_prototype",
      "status": "PROTOTYPE_ONLY",
      "K_R_months": 0.25,
      "K_F_essentialExpenseFraction": 0.05,
      "K_G_goalProgressFraction": 0.2,
      "clipMin": -1,
      "clipMax": 1,
      "allowArbitraryKFMinFallback": false
    },
    "effortRubricPolicy": {
      "version": "effort_rubric_v1_prototype",
      "status": "PROTOTYPE_ONLY",
      "formulaRef": "F016",
      "componentWeights": {
        "T": 0.25,
        "S": 0.25,
        "D": 0.25,
        "O": 0.25
      },
      "catalogBaselineByActionId": {
        "A001": {
          "T": 0.15,
          "S": 0.2,
          "D": 0.1,
          "O": 0.1
        },
        "A002": {
          "T": 0.2,
          "S": 0.25,
          "D": 0.15,
          "O": 0.15
        },
        "A003": {
          "T": 0.35,
          "S": 0.4,
          "D": 0.3,
          "O": 0.2
        },
        "A004": {
          "T": 0.3,
          "S": 0.35,
          "D": 0.45,
          "O": 0.1
        },
        "A005": {
          "T": 0.6,
          "S": 0.55,
          "D": 0.65,
          "O": 0.4
        },
        "A006": {
          "T": 0.55,
          "S": 0.5,
          "D": 0.6,
          "O": 0.45
        },
        "A007": {
          "T": 0.1,
          "S": 0.15,
          "D": 0.1,
          "O": 0.15
        },
        "A008": {
          "T": 0.1,
          "S": 0.15,
          "D": 0.1,
          "O": 0.15
        },
        "A009": {
          "T": 0.2,
          "S": 0.2,
          "D": 0.15,
          "O": 0.1
        },
        "A010": {
          "T": 0.2,
          "S": 0.25,
          "D": 0.2,
          "O": 0.25
        },
        "A011": {
          "T": 0.15,
          "S": 0.2,
          "D": 0.15,
          "O": 0.2
        },
        "A012": {
          "T": 0.1,
          "S": 0.15,
          "D": 0.1,
          "O": 0.1
        },
        "A013": {
          "T": 0.15,
          "S": 0.2,
          "D": 0.05,
          "O": 0.1
        },
        "A014": {
          "T": 0.25,
          "S": 0.3,
          "D": 0.25,
          "O": 0.15
        },
        "A015": {
          "T": 0.35,
          "S": 0.45,
          "D": 0.4,
          "O": 0.15
        },
        "A016": {
          "T": 0.35,
          "S": 0.4,
          "D": 0.45,
          "O": 0.15
        },
        "A017": {
          "T": 0.3,
          "S": 0.35,
          "D": 0.25,
          "O": 0.3
        },
        "A018": {
          "T": 0.45,
          "S": 0.5,
          "D": 0.55,
          "O": 0.15
        },
        "A019": {
          "T": 0.3,
          "S": 0.35,
          "D": 0.2,
          "O": 0.4
        },
        "A020": {
          "T": 0.2,
          "S": 0.25,
          "D": 0.2,
          "O": 0.2
        },
        "A021": {
          "T": 0.1,
          "S": 0.1,
          "D": 0.05,
          "O": 0.05
        },
        "A022": {
          "T": 0.15,
          "S": 0.1,
          "D": 0.05,
          "O": 0.05
        },
        "A023": {
          "T": 0.25,
          "S": 0.25,
          "D": 0.3,
          "O": 0.1
        },
        "A024": {
          "T": 0.25,
          "S": 0.3,
          "D": 0.35,
          "O": 0.2
        },
        "A025": {
          "T": 0.4,
          "S": 0.45,
          "D": 0.5,
          "O": 0.15
        },
        "A026": {
          "T": 0.3,
          "S": 0.35,
          "D": 0.4,
          "O": 0.15
        }
      },
      "unknownActionBaseline": {
        "T": 0.25,
        "S": 0.25,
        "D": 0.25,
        "O": 0.25
      },
      "uncertainty": {
        "evaluated": 0.05,
        "perUnknownComponent": 0.25,
        "unknownBase": 0.1
      }
    },
    "suggestionPolicy": {
      "minimumMonetaryAmount": 15,
      "amountRoundingIncrement": 5,
      "optionalOutflowFraction": 0.5,
      "goalMonthDays": 30
    },
    "checkerFallbackPolicy": {
      "minimumAvailableCash": 20,
      "minimumAmount": 10,
      "availableCashFraction": 0.4,
      "amountRoundingIncrement": 5
    },
    "scoringPolicy": {
      "version": "scoring_policy_v1_prototype",
      "status": "PROTOTYPE_ONLY",
      "formulaRef": "F017",
      "lambda_C": 0.1,
      "sensitivityLambdaCValues": [
        0,
        0.05,
        0.1,
        0.15
      ]
    },
    "robustnessPolicy": {
      "version": "robustness_policy_v1_prototype",
      "status": "PROTOTYPE_ONLY",
      "formulaRef": "F018",
      "simulationCount": 200,
      "simulationSeed": 20261103,
      "weightPerturbationFraction": 0.1,
      "stabilityThreshold": 0.8,
      "closeScoreMarginThreshold": 0.03
    }
  },
  "previousProfileId": null,
  "calculatorExtras": {
    "referenceDateIso": "2026-11-05",
    "debtTerms": {
      "card": {
        "debtId": "card",
        "interestAccruing": true,
        "issuerContact": "Support in the bank app"
      }
    },
    "simulationHorizonDays": 90,
    "pendingFinancialCommitments": []
  }
}
~~~~

## Output

~~~~json
{
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
}
~~~~
