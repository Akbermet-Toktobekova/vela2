# 01 Debt · financial calculator

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload / stage:eval_eef6011c-4c98-42d6-942a-81dfa4bf4aa1:financial-calculator / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T20:31:40.282Z

Consumers: Suggestion Generator, Checker and Decision Engine

Upstream artifact IDs: eval_eef6011c-4c98-42d6-942a-81dfa4bf4aa1:fx, eval_eef6011c-4c98-42d6-942a-81dfa4bf4aa1:classification

Missing inputs: None flagged

## Input

~~~~json
{
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
  },
  "extras": {
    "referenceDateIso": "2026-11-05",
    "debtTerms": {
      "card": {
        "debtId": "card",
        "interestAccruing": true,
        "issuerContact": "Support in the bank app"
      }
    },
    "simulationHorizonDays": 90,
    "pendingFinancialCommitments": [],
    "fxRates": {}
  }
}
~~~~

## Output

~~~~json
{
  "currency": "EUR",
  "referenceDate": "2026-11-05",
  "liquidity": {
    "totalLiquidAccessible": 65,
    "dedicatedEmergencyReserve": 0,
    "uncommittedLiquidCash": 0,
    "fxWarningCurrencies": []
  },
  "cashflow": {
    "horizonDays": 90,
    "startingLiquidCash": 65,
    "bufferFloor": 0,
    "availableCashBeforeActionF003": 5075,
    "minProjectedCashSignedF004": -65,
    "minProjectedCashDate": "2026-11-18",
    "hasProjectedDeficit": true,
    "shortfallsByObligation": [
      {
        "targetId": "utility",
        "targetType": "obligation",
        "name": "Utilities",
        "dueDate": "2026-11-18",
        "amountDue": 65,
        "liquidAvailableByDue": 0,
        "shortfallAmountF019": 65
      }
    ],
    "dailyTrajectory": [
      {
        "date": "2026-11-05",
        "dayOffset": 0,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 65,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-06",
        "dayOffset": 1,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 65,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-07",
        "dayOffset": 2,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 65,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-08",
        "dayOffset": 3,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-09",
        "dayOffset": 4,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-10",
        "dayOffset": 5,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-11",
        "dayOffset": 6,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-12",
        "dayOffset": 7,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-13",
        "dayOffset": 8,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-14",
        "dayOffset": 9,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-15",
        "dayOffset": 10,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-16",
        "dayOffset": 11,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-17",
        "dayOffset": 12,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 0,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-18",
        "dayOffset": 13,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": -65,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-19",
        "dayOffset": 14,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -65,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-20",
        "dayOffset": 15,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -65,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-21",
        "dayOffset": 16,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -65,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-22",
        "dayOffset": 17,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -65,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-23",
        "dayOffset": 18,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -65,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-24",
        "dayOffset": 19,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -65,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-25",
        "dayOffset": 20,
        "inflows": 1800,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-26",
        "dayOffset": 21,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-27",
        "dayOffset": 22,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-28",
        "dayOffset": 23,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-29",
        "dayOffset": 24,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-30",
        "dayOffset": 25,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-01",
        "dayOffset": 26,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-02",
        "dayOffset": 27,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-03",
        "dayOffset": 28,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-04",
        "dayOffset": 29,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-05",
        "dayOffset": 30,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-06",
        "dayOffset": 31,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-07",
        "dayOffset": 32,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1735,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-08",
        "dayOffset": 33,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-09",
        "dayOffset": 34,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-10",
        "dayOffset": 35,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-11",
        "dayOffset": 36,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-12",
        "dayOffset": 37,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-13",
        "dayOffset": 38,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-14",
        "dayOffset": 39,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-15",
        "dayOffset": 40,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-16",
        "dayOffset": 41,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-17",
        "dayOffset": 42,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1670,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-18",
        "dayOffset": 43,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 1605,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-19",
        "dayOffset": 44,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1605,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-20",
        "dayOffset": 45,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1605,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-21",
        "dayOffset": 46,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1605,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-22",
        "dayOffset": 47,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1605,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-23",
        "dayOffset": 48,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1605,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-24",
        "dayOffset": 49,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1605,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-25",
        "dayOffset": 50,
        "inflows": 1800,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-26",
        "dayOffset": 51,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-27",
        "dayOffset": 52,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-28",
        "dayOffset": 53,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-29",
        "dayOffset": 54,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-30",
        "dayOffset": 55,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-31",
        "dayOffset": 56,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-01",
        "dayOffset": 57,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-02",
        "dayOffset": 58,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-03",
        "dayOffset": 59,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-04",
        "dayOffset": 60,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-05",
        "dayOffset": 61,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-06",
        "dayOffset": 62,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-07",
        "dayOffset": 63,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3405,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-08",
        "dayOffset": 64,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-09",
        "dayOffset": 65,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-10",
        "dayOffset": 66,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-11",
        "dayOffset": 67,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-12",
        "dayOffset": 68,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-13",
        "dayOffset": 69,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-14",
        "dayOffset": 70,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-15",
        "dayOffset": 71,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-16",
        "dayOffset": 72,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-17",
        "dayOffset": 73,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3340,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-18",
        "dayOffset": 74,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 3275,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-19",
        "dayOffset": 75,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3275,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-20",
        "dayOffset": 76,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3275,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-21",
        "dayOffset": 77,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3275,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-22",
        "dayOffset": 78,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3275,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-23",
        "dayOffset": 79,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3275,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-24",
        "dayOffset": 80,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3275,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-25",
        "dayOffset": 81,
        "inflows": 1800,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-26",
        "dayOffset": 82,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-27",
        "dayOffset": 83,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-28",
        "dayOffset": 84,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-29",
        "dayOffset": 85,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-30",
        "dayOffset": 86,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-31",
        "dayOffset": 87,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-01",
        "dayOffset": 88,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-02",
        "dayOffset": 89,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-03",
        "dayOffset": 90,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5075,
        "belowBufferFloor": false
      }
    ],
    "missingInputs": []
  },
  "essentialMonthlyExpense": 950,
  "liquidExpenseCoverageMonths": 0.0684,
  "emergencyReserveAllocated": 0,
  "emergencyReserveCoverageMonths": 0,
  "optionalActionCash": 5075
}
~~~~
