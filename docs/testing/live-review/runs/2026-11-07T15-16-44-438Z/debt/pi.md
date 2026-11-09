# 01 Debt · pi

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → state → state; engine → snapshots and derivedSnapshots. Draft PostgreSQL pi.* and analysis.financial_snapshots. | — |

## Input

~~~~json
{
  "expectedVersion": 0,
  "state": {
    "user": {
      "id": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "email": "debt@example.test",
      "authStatus": "unverified",
      "isDemoMode": false,
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    "profile": {
      "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "onboarding": {
      "id": "b45b569e-c208-426d-858f-001b0be0cd29",
      "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-05T12:00:00.000Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accounts": [
      {
        "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "id": "main",
        "name": "Current account",
        "currency": "EUR",
        "institution": "Synthetic bank",
        "isPrimary": true,
        "purposes": [
          "daily_spending"
        ],
        "fundsOwnership": "personal",
        "personalAvailableAmount": null,
        "notes": "",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "balances": [
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
    "incomes": [
      {
        "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "id": "salary",
        "name": "Salary",
        "pattern": "regular",
        "estimatedMonthlyAmount": 1800,
        "currency": "EUR",
        "frequency": "monthly",
        "sourceType": "salary",
        "nextExpectedDate": "2026-11-25",
        "receivingAccountId": "main",
        "notes": ""
      }
    ],
    "expenseCommitment": {
      "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "id": "essentials",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "id": "utility",
        "name": "Utilities",
        "amount": 65,
        "dueDate": "2026-11-18",
        "category": "energy",
        "currency": "EUR",
        "accountId": "main",
        "recurrence": "monthly",
        "status": "unpaid",
        "notes": ""
      }
    ],
    "debts": [
      {
        "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "id": "card",
        "name": "Credit card",
        "debtType": "credit_card",
        "currency": "EUR",
        "remainingBalance": 900,
        "apr": 24,
        "minimumPayment": 65,
        "nextDueDate": "2026-11-08",
        "paymentFrequency": "monthly"
      }
    ],
    "goals": [],
    "goalAllocations": [],
    "statements": [],
    "transactions": [],
    "classifications": [],
    "transferMatches": [],
    "confirmations": [],
    "recommendations": [],
    "assistantMessages": []
  },
  "aiConsent": true,
  "experimentalRecommendations": true
}
~~~~

## Output

~~~~json
{
  "version": "2.0",
  "snapshot": {
    "id": "snap_beta_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_373f467295431927",
    "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
    "version": "2.0",
    "createdAt": "2026-11-05T12:00:00.000Z",
    "baseCurrency": "EUR",
    "isDemoMode": false,
    "profile": {
      "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "onboarding": {
      "id": "b45b569e-c208-426d-858f-001b0be0cd29",
      "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-05T12:00:00.000Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accountSummaries": [
      {
        "account": {
          "id": "main",
          "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
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
        "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
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
    "observedInflowsByCurrency": {},
    "essentialCommitment": {
      "id": "essentials",
      "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "utility",
        "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
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
        "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
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
        "userId": "de7948b2-bc74-4adc-a179-aa9039f7b32f",
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
    "readinessState": "state_c_limited_data",
    "readinessReason": "Your current uncommitted buffer is tight or covers upcoming obligations. Vela is monitoring your cashflow without forcing an allocation."
  },
  "calculatorExtras": {
    "referenceDateIso": "2026-11-05",
    "debtTerms": {
      "card": {
        "debtId": "card",
        "interestAccruing": true,
        "issuerContact": "Support in the bank app"
      }
    }
  }
}
~~~~
