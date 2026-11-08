# 01 Debt · pi

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

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
      "id": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "email": "debt@example.test",
      "authStatus": "unverified",
      "isDemoMode": false,
      "createdAt": "2026-11-08T20:32:20.913Z"
    },
    "profile": {
      "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "US",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T20:32:20.913Z"
    },
    "onboarding": {
      "id": "a7345e12-285e-4ec0-96a3-7567167b6488",
      "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T20:32:20.913Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accounts": [
      {
        "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
        "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
      "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "id": "essentials",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
        "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
  "experimentalRecommendations": true,
  "variant": "debt-us"
}
~~~~

## Output

~~~~json
{
  "version": "2.0",
  "snapshot": {
    "id": "snap_beta_5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec_v2_129f08d67471b415",
    "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
    "version": "2.0",
    "createdAt": "2026-11-05T12:00:00.000Z",
    "baseCurrency": "EUR",
    "isDemoMode": false,
    "profile": {
      "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "US",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T20:32:20.913Z"
    },
    "onboarding": {
      "id": "a7345e12-285e-4ec0-96a3-7567167b6488",
      "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T20:32:20.913Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accountSummaries": [
      {
        "account": {
          "id": "main",
          "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
        "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
      "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "utility",
        "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
        "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
        "userId": "5d6da6e2-bfd4-4c3f-b1b7-a73877a381ec",
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
