# 03 Nora · weights

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload / stage:eval_345a1ff9-9c36-409c-9594-4a2406a445d2:weights / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T20:38:44.454Z

Consumers: Scoring and Robustness

Upstream artifact IDs: eval_345a1ff9-9c36-409c-9594-4a2406a445d2:financial-calculator

Missing inputs: None flagged

## Input

~~~~json
{
  "snapshot": {
    "id": "snap_beta_acad8412-bf7c-4769-b644-3865313d7549_v4_e4cb7fb91816a439",
    "userId": "acad8412-bf7c-4769-b644-3865313d7549",
    "version": "4.0",
    "createdAt": "2026-11-05T12:00:00.000Z",
    "baseCurrency": "EUR",
    "isDemoMode": false,
    "profile": {
      "userId": "acad8412-bf7c-4769-b644-3865313d7549",
      "nickname": "03 Nora",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "acad8412-bf7c-4769-b644-3865313d7549",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T20:37:27.465Z"
    },
    "onboarding": {
      "id": "9f2f6c92-b048-402b-84de-660161dcbd6b",
      "userId": "acad8412-bf7c-4769-b644-3865313d7549",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T20:37:27.465Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accountSummaries": [
      {
        "account": {
          "id": "main",
          "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
          "id": "fresh-main",
          "accountId": "main",
          "amount": 3577.01,
          "currency": "EUR",
          "asOf": "2026-11-05T12:00:00.000Z",
          "sourceType": "user_reported",
          "sourceId": "stmt_1794170247562_d1bi",
          "createdAt": "2026-11-05T12:00:00.000Z"
        },
        "balanceHistory": [
          {
            "id": "fresh-main",
            "accountId": "main",
            "amount": 3577.01,
            "currency": "EUR",
            "asOf": "2026-11-05T12:00:00.000Z",
            "sourceType": "user_reported",
            "sourceId": "stmt_1794170247562_d1bi",
            "createdAt": "2026-11-05T12:00:00.000Z"
          },
          {
            "id": "c6cdd89e-af39-407c-afea-052cb0551874",
            "accountId": "main",
            "amount": 3577.01,
            "currency": "EUR",
            "asOf": "2026-10-28",
            "sourceType": "statement_closing",
            "sourceId": "stmt_1794170247562_d1bi",
            "createdAt": "2026-11-08T20:37:27.564Z"
          }
        ],
        "isStale": false,
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
          "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
          "id": "fresh-savings",
          "accountId": "savings",
          "amount": 600,
          "currency": "EUR",
          "asOf": "2026-11-05T12:00:00.000Z",
          "sourceType": "user_reported",
          "sourceId": "stmt_1794170247598_bnuu",
          "createdAt": "2026-11-05T12:00:00.000Z"
        },
        "balanceHistory": [
          {
            "id": "fresh-savings",
            "accountId": "savings",
            "amount": 600,
            "currency": "EUR",
            "asOf": "2026-11-05T12:00:00.000Z",
            "sourceType": "user_reported",
            "sourceId": "stmt_1794170247598_bnuu",
            "createdAt": "2026-11-05T12:00:00.000Z"
          },
          {
            "id": "43a9420e-39db-4d78-b64c-118c16e4fdb7",
            "accountId": "savings",
            "amount": 600,
            "currency": "EUR",
            "asOf": "2026-10-28",
            "sourceType": "statement_closing",
            "sourceId": "stmt_1794170247598_bnuu",
            "createdAt": "2026-11-08T20:37:27.599Z"
          }
        ],
        "isStale": false,
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
      "userId": "acad8412-bf7c-4769-b644-3865313d7549",
      "estimatedMonthlyAmount": 1450,
      "currency": "EUR",
      "notes": "Synthetic user estimate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "rent",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "userId": "acad8412-bf7c-4769-b644-3865313d7549"
      }
    ],
    "safetyCushionGoal": {
      "id": "reserve",
      "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "id": "stmt_1794170247562_d1bi",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "importedAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "stmt_1794170247598_bnuu",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
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
        "importedAt": "2026-11-08T20:37:27.598Z"
      }
    ],
    "transactions": [
      {
        "id": "txn_stmt_1794170247562_d1bi_1",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_2",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_3",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_4",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_5",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_6",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_7",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_8",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_9",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_10",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_11",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_12",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_13",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_14",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_15",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_16",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_17",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_18",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_19",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_20",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_21",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_22",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_23",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_24",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_25",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_26",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_27",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_28",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_29",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_30",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_31",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_32",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_33",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_34",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_35",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_36",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_37",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_38",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_39",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_40",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_41",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_42",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_43",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_44",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247562_d1bi_45",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "main",
        "statementId": "stmt_1794170247562_d1bi",
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
        "createdAt": "2026-11-08T20:37:27.562Z"
      },
      {
        "id": "txn_stmt_1794170247598_bnuu_1",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "savings",
        "statementId": "stmt_1794170247598_bnuu",
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
        "createdAt": "2026-11-08T20:37:27.598Z"
      },
      {
        "id": "txn_stmt_1794170247598_bnuu_2",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "savings",
        "statementId": "stmt_1794170247598_bnuu",
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
        "createdAt": "2026-11-08T20:37:27.598Z"
      },
      {
        "id": "txn_stmt_1794170247598_bnuu_3",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "accountId": "savings",
        "statementId": "stmt_1794170247598_bnuu",
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
        "createdAt": "2026-11-08T20:37:27.598Z"
      }
    ],
    "classifications": {
      "txn_stmt_1794170247562_d1bi_1": {
        "id": "cls_txn_stmt_1794170247562_d1bi_1",
        "transactionId": "txn_stmt_1794170247562_d1bi_1",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_2": {
        "id": "cls_txn_stmt_1794170247562_d1bi_2",
        "transactionId": "txn_stmt_1794170247562_d1bi_2",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_3": {
        "id": "cls_txn_stmt_1794170247562_d1bi_3",
        "transactionId": "txn_stmt_1794170247562_d1bi_3",
        "economicType": "expense",
        "category": "transport",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_4": {
        "id": "cls_txn_stmt_1794170247562_d1bi_4",
        "transactionId": "txn_stmt_1794170247562_d1bi_4",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_5": {
        "id": "cls_txn_stmt_1794170247562_d1bi_5",
        "transactionId": "txn_stmt_1794170247562_d1bi_5",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_6": {
        "id": "cls_txn_stmt_1794170247562_d1bi_6",
        "transactionId": "txn_stmt_1794170247562_d1bi_6",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription payment to Sound Library.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_7": {
        "id": "cls_txn_stmt_1794170247562_d1bi_7",
        "transactionId": "txn_stmt_1794170247562_d1bi_7",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_8": {
        "id": "cls_txn_stmt_1794170247562_d1bi_8",
        "transactionId": "txn_stmt_1794170247562_d1bi_8",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_9": {
        "id": "cls_txn_stmt_1794170247562_d1bi_9",
        "transactionId": "txn_stmt_1794170247562_d1bi_9",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_10": {
        "id": "cls_txn_stmt_1794170247562_d1bi_10",
        "transactionId": "txn_stmt_1794170247562_d1bi_10",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_11": {
        "id": "cls_txn_stmt_1794170247562_d1bi_11",
        "transactionId": "txn_stmt_1794170247562_d1bi_11",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription payment to Screen Library.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_12": {
        "id": "cls_txn_stmt_1794170247562_d1bi_12",
        "transactionId": "txn_stmt_1794170247562_d1bi_12",
        "economicType": "expense",
        "category": "health",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase at Oak Pharmacy.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_13": {
        "id": "cls_txn_stmt_1794170247562_d1bi_13",
        "transactionId": "txn_stmt_1794170247562_d1bi_13",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_14": {
        "id": "cls_txn_stmt_1794170247562_d1bi_14",
        "transactionId": "txn_stmt_1794170247562_d1bi_14",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll inflow from Danube Studio.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_15": {
        "id": "cls_txn_stmt_1794170247562_d1bi_15",
        "transactionId": "txn_stmt_1794170247562_d1bi_15",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Transfer to own account with matched evidence.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_16": {
        "id": "cls_txn_stmt_1794170247562_d1bi_16",
        "transactionId": "txn_stmt_1794170247562_d1bi_16",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_17": {
        "id": "cls_txn_stmt_1794170247562_d1bi_17",
        "transactionId": "txn_stmt_1794170247562_d1bi_17",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_18": {
        "id": "cls_txn_stmt_1794170247562_d1bi_18",
        "transactionId": "txn_stmt_1794170247562_d1bi_18",
        "economicType": "expense",
        "category": "transport",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_19": {
        "id": "cls_txn_stmt_1794170247562_d1bi_19",
        "transactionId": "txn_stmt_1794170247562_d1bi_19",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_20": {
        "id": "cls_txn_stmt_1794170247562_d1bi_20",
        "transactionId": "txn_stmt_1794170247562_d1bi_20",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_21": {
        "id": "cls_txn_stmt_1794170247562_d1bi_21",
        "transactionId": "txn_stmt_1794170247562_d1bi_21",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription payment to Sound Library.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_22": {
        "id": "cls_txn_stmt_1794170247562_d1bi_22",
        "transactionId": "txn_stmt_1794170247562_d1bi_22",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_23": {
        "id": "cls_txn_stmt_1794170247562_d1bi_23",
        "transactionId": "txn_stmt_1794170247562_d1bi_23",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_24": {
        "id": "cls_txn_stmt_1794170247562_d1bi_24",
        "transactionId": "txn_stmt_1794170247562_d1bi_24",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_25": {
        "id": "cls_txn_stmt_1794170247562_d1bi_25",
        "transactionId": "txn_stmt_1794170247562_d1bi_25",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_26": {
        "id": "cls_txn_stmt_1794170247562_d1bi_26",
        "transactionId": "txn_stmt_1794170247562_d1bi_26",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription payment to Screen Library.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_27": {
        "id": "cls_txn_stmt_1794170247562_d1bi_27",
        "transactionId": "txn_stmt_1794170247562_d1bi_27",
        "economicType": "expense",
        "category": "health",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase at Oak Pharmacy.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_28": {
        "id": "cls_txn_stmt_1794170247562_d1bi_28",
        "transactionId": "txn_stmt_1794170247562_d1bi_28",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_29": {
        "id": "cls_txn_stmt_1794170247562_d1bi_29",
        "transactionId": "txn_stmt_1794170247562_d1bi_29",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll inflow from Danube Studio.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_30": {
        "id": "cls_txn_stmt_1794170247562_d1bi_30",
        "transactionId": "txn_stmt_1794170247562_d1bi_30",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Transfer to own account with matched evidence.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_31": {
        "id": "cls_txn_stmt_1794170247562_d1bi_31",
        "transactionId": "txn_stmt_1794170247562_d1bi_31",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_32": {
        "id": "cls_txn_stmt_1794170247562_d1bi_32",
        "transactionId": "txn_stmt_1794170247562_d1bi_32",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_33": {
        "id": "cls_txn_stmt_1794170247562_d1bi_33",
        "transactionId": "txn_stmt_1794170247562_d1bi_33",
        "economicType": "expense",
        "category": "transport",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase from City Transit.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_34": {
        "id": "cls_txn_stmt_1794170247562_d1bi_34",
        "transactionId": "txn_stmt_1794170247562_d1bi_34",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_35": {
        "id": "cls_txn_stmt_1794170247562_d1bi_35",
        "transactionId": "txn_stmt_1794170247562_d1bi_35",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_36": {
        "id": "cls_txn_stmt_1794170247562_d1bi_36",
        "transactionId": "txn_stmt_1794170247562_d1bi_36",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription payment to Sound Library.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_37": {
        "id": "cls_txn_stmt_1794170247562_d1bi_37",
        "transactionId": "txn_stmt_1794170247562_d1bi_37",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_38": {
        "id": "cls_txn_stmt_1794170247562_d1bi_38",
        "transactionId": "txn_stmt_1794170247562_d1bi_38",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_39": {
        "id": "cls_txn_stmt_1794170247562_d1bi_39",
        "transactionId": "txn_stmt_1794170247562_d1bi_39",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_40": {
        "id": "cls_txn_stmt_1794170247562_d1bi_40",
        "transactionId": "txn_stmt_1794170247562_d1bi_40",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen.",
        "updatedAt": "2026-11-08T20:37:50.551Z"
      },
      "txn_stmt_1794170247562_d1bi_41": {
        "id": "cls_txn_stmt_1794170247562_d1bi_41",
        "transactionId": "txn_stmt_1794170247562_d1bi_41",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "The transaction is a video streaming subscription payment to Screen Library.",
        "updatedAt": "2026-11-08T20:37:57.494Z"
      },
      "txn_stmt_1794170247562_d1bi_42": {
        "id": "cls_txn_stmt_1794170247562_d1bi_42",
        "transactionId": "txn_stmt_1794170247562_d1bi_42",
        "economicType": "expense",
        "category": "health",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is a pharmacy purchase at Oak Pharmacy, categorized under health.",
        "updatedAt": "2026-11-08T20:37:57.494Z"
      },
      "txn_stmt_1794170247562_d1bi_43": {
        "id": "cls_txn_stmt_1794170247562_d1bi_43",
        "transactionId": "txn_stmt_1794170247562_d1bi_43",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is a grocery purchase at Green Basket.",
        "updatedAt": "2026-11-08T20:37:57.494Z"
      },
      "txn_stmt_1794170247562_d1bi_44": {
        "id": "cls_txn_stmt_1794170247562_d1bi_44",
        "transactionId": "txn_stmt_1794170247562_d1bi_44",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "The transaction is a salary payroll inflow from Danube Studio.",
        "updatedAt": "2026-11-08T20:37:57.494Z"
      },
      "txn_stmt_1794170247562_d1bi_45": {
        "id": "cls_txn_stmt_1794170247562_d1bi_45",
        "transactionId": "txn_stmt_1794170247562_d1bi_45",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is an outgoing own-account transfer supported by matching transfer evidence.",
        "updatedAt": "2026-11-08T20:37:57.494Z"
      },
      "txn_stmt_1794170247598_bnuu_1": {
        "id": "cls_txn_stmt_1794170247598_bnuu_1",
        "transactionId": "txn_stmt_1794170247598_bnuu_1",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is an incoming own-account transfer supported by matching transfer evidence.",
        "updatedAt": "2026-11-08T20:37:57.494Z"
      },
      "txn_stmt_1794170247598_bnuu_2": {
        "id": "cls_txn_stmt_1794170247598_bnuu_2",
        "transactionId": "txn_stmt_1794170247598_bnuu_2",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is an incoming own-account transfer supported by matching transfer evidence.",
        "updatedAt": "2026-11-08T20:37:57.494Z"
      },
      "txn_stmt_1794170247598_bnuu_3": {
        "id": "cls_txn_stmt_1794170247598_bnuu_3",
        "transactionId": "txn_stmt_1794170247598_bnuu_3",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is an incoming own-account transfer supported by matching transfer evidence.",
        "updatedAt": "2026-11-08T20:37:57.494Z"
      }
    },
    "transferMatches": [
      {
        "id": "match_single_txn_stmt_1794170247562_d1bi_15",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "outgoingTransactionId": "txn_stmt_1794170247562_d1bi_15",
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
        "id": "match_single_txn_stmt_1794170247562_d1bi_30",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "outgoingTransactionId": "txn_stmt_1794170247562_d1bi_30",
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
        "id": "match_single_txn_stmt_1794170247562_d1bi_45",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "outgoingTransactionId": "txn_stmt_1794170247562_d1bi_45",
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
        "id": "match_txn_stmt_1794170247562_d1bi_15_txn_stmt_1794170247598_bnuu_1",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "outgoingTransactionId": "txn_stmt_1794170247562_d1bi_15",
        "incomingTransactionId": "txn_stmt_1794170247598_bnuu_1",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-08-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1794170247562_d1bi_30_txn_stmt_1794170247598_bnuu_2",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "outgoingTransactionId": "txn_stmt_1794170247562_d1bi_30",
        "incomingTransactionId": "txn_stmt_1794170247598_bnuu_2",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-09-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1794170247562_d1bi_45_txn_stmt_1794170247598_bnuu_3",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "outgoingTransactionId": "txn_stmt_1794170247562_d1bi_45",
        "incomingTransactionId": "txn_stmt_1794170247598_bnuu_3",
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
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_6",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_6",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-08-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_11",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_11",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-08-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247562_d1bi_15",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247562_d1bi_15",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_21",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_21",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-09-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_26",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_26",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-09-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247562_d1bi_30",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247562_d1bi_30",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_36",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_36",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-10-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_41",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_41",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-10-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247562_d1bi_45",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247562_d1bi_45",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247598_bnuu_1",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247598_bnuu_1",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247598_bnuu_2",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247598_bnuu_2",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247598_bnuu_3",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247598_bnuu_3",
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
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_6",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_6",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-08-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_11",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_11",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-08-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247562_d1bi_15",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247562_d1bi_15",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_21",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_21",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-09-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_26",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_26",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-09-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247562_d1bi_30",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247562_d1bi_30",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_36",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_36",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-10-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794170247562_d1bi_41",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794170247562_d1bi_41",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-10-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247562_d1bi_45",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247562_d1bi_45",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247598_bnuu_1",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247598_bnuu_1",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247598_bnuu_2",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247598_bnuu_2",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794170247598_bnuu_3",
        "userId": "acad8412-bf7c-4769-b644-3865313d7549",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794170247598_bnuu_3",
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
      "staleBalanceAccountIds": [],
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
      "transport": 126,
      "subscriptions": 80.94,
      "shopping": 0,
      "health": 67.80000000000001,
      "education": 0,
      "work_expense": 0,
      "income": 0,
      "transfer": 0,
      "other": 0
    },
    "readinessState": "state_b_clarification_needed",
    "readinessReason": "One transaction clarification will help sharpen your available cash picture."
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
    "simulationHorizonDays": 90,
    "pendingFinancialCommitments": [],
    "fxRates": {}
  }
}
~~~~

## Output

~~~~json
{
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
}
~~~~
