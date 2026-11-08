# 03 Nora · pattern recognition

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | Lab stage. Draft PostgreSQL analysis.pattern_observations and analysis.pattern_summaries. | — |

## Input

~~~~json
{
  "transactions": [
    {
      "id": "txn_stmt_1793880000000_f24z_1",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "2"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_2",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "3"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_3",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "4"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_4",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "5"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_5",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "6"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_6",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "7"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_7",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "8"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_8",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "9"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_9",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "10"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_10",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "11"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_11",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "12"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_12",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "13"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_13",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "14"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_14",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "15"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_15",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "16"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_16",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "17"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_17",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "18"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_18",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "19"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_19",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "20"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_20",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "21"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_21",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "22"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_22",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "23"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_23",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "24"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_24",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "25"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_25",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "26"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_26",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "27"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_27",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "28"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_28",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "29"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_29",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "30"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_30",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "31"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_31",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "32"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_32",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "33"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_33",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "34"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_34",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "35"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_35",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "36"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_36",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "37"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_37",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "38"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_38",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "39"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_39",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "40"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_40",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "41"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_41",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "42"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_42",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "43"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_43",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "44"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_44",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "45"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_f24z_45",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "main",
      "statementId": "stmt_1793880000000_f24z",
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
        "__source_file": "daily.csv",
        "__source_sheet": "",
        "__source_row": "46"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_96yi_1",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "savings",
      "statementId": "stmt_1793880000000_96yi",
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
        "__source_file": "reserve.csv",
        "__source_sheet": "",
        "__source_row": "2"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_96yi_2",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "savings",
      "statementId": "stmt_1793880000000_96yi",
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
        "__source_file": "reserve.csv",
        "__source_sheet": "",
        "__source_row": "3"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "txn_stmt_1793880000000_96yi_3",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "accountId": "savings",
      "statementId": "stmt_1793880000000_96yi",
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
        "__source_file": "reserve.csv",
        "__source_sheet": "",
        "__source_row": "4"
      },
      "createdAt": "2026-11-05T12:00:00.000Z"
    }
  ],
  "transferMatches": [
    {
      "id": "match_single_txn_stmt_1793880000000_f24z_15",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "outgoingTransactionId": "txn_stmt_1793880000000_f24z_15",
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
      "id": "match_single_txn_stmt_1793880000000_f24z_30",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "outgoingTransactionId": "txn_stmt_1793880000000_f24z_30",
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
      "id": "match_single_txn_stmt_1793880000000_f24z_45",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "outgoingTransactionId": "txn_stmt_1793880000000_f24z_45",
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
      "id": "match_txn_stmt_1793880000000_f24z_15_txn_stmt_1793880000000_96yi_1",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "outgoingTransactionId": "txn_stmt_1793880000000_f24z_15",
      "incomingTransactionId": "txn_stmt_1793880000000_96yi_1",
      "outgoingAccountId": "main",
      "incomingAccountId": "savings",
      "amount": 150,
      "currency": "EUR",
      "date": "2026-08-28",
      "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
      "status": "matched"
    },
    {
      "id": "match_txn_stmt_1793880000000_f24z_30_txn_stmt_1793880000000_96yi_2",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "outgoingTransactionId": "txn_stmt_1793880000000_f24z_30",
      "incomingTransactionId": "txn_stmt_1793880000000_96yi_2",
      "outgoingAccountId": "main",
      "incomingAccountId": "savings",
      "amount": 150,
      "currency": "EUR",
      "date": "2026-09-28",
      "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
      "status": "matched"
    },
    {
      "id": "match_txn_stmt_1793880000000_f24z_45_txn_stmt_1793880000000_96yi_3",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "outgoingTransactionId": "txn_stmt_1793880000000_f24z_45",
      "incomingTransactionId": "txn_stmt_1793880000000_96yi_3",
      "outgoingAccountId": "main",
      "incomingAccountId": "savings",
      "amount": 150,
      "currency": "EUR",
      "date": "2026-10-28",
      "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
      "status": "matched"
    }
  ],
  "classifications": {
    "txn_stmt_1793880000000_f24z_1": {
      "id": "cls_txn_stmt_1793880000000_f24z_1",
      "transactionId": "txn_stmt_1793880000000_f24z_1",
      "economicType": "expense",
      "category": "rent_housing",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Housing / rent payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_2": {
      "id": "cls_txn_stmt_1793880000000_f24z_2",
      "transactionId": "txn_stmt_1793880000000_f24z_2",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_3": {
      "id": "cls_txn_stmt_1793880000000_f24z_3",
      "transactionId": "txn_stmt_1793880000000_f24z_3",
      "economicType": "expense",
      "category": "transport",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Transport & mobility",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_4": {
      "id": "cls_txn_stmt_1793880000000_f24z_4",
      "transactionId": "txn_stmt_1793880000000_f24z_4",
      "economicType": "expense",
      "category": "utilities_energy",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Utility bill payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_5": {
      "id": "cls_txn_stmt_1793880000000_f24z_5",
      "transactionId": "txn_stmt_1793880000000_f24z_5",
      "economicType": "expense",
      "category": "internet_telecom",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Telecom / internet recurring payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_6": {
      "id": "cls_txn_stmt_1793880000000_f24z_6",
      "transactionId": "txn_stmt_1793880000000_f24z_6",
      "economicType": "expense",
      "category": "subscriptions",
      "confidence": "high",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Recurring subscription candidate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_7": {
      "id": "cls_txn_stmt_1793880000000_f24z_7",
      "transactionId": "txn_stmt_1793880000000_f24z_7",
      "economicType": "debt_payment",
      "category": "other",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Debt / credit card servicing payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_8": {
      "id": "cls_txn_stmt_1793880000000_f24z_8",
      "transactionId": "txn_stmt_1793880000000_f24z_8",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_9": {
      "id": "cls_txn_stmt_1793880000000_f24z_9",
      "transactionId": "txn_stmt_1793880000000_f24z_9",
      "economicType": "expense",
      "category": "dining_coffee",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Dining & coffee",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_10": {
      "id": "cls_txn_stmt_1793880000000_f24z_10",
      "transactionId": "txn_stmt_1793880000000_f24z_10",
      "economicType": "expense",
      "category": "dining_coffee",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Dining & coffee",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_11": {
      "id": "cls_txn_stmt_1793880000000_f24z_11",
      "transactionId": "txn_stmt_1793880000000_f24z_11",
      "economicType": "expense",
      "category": "subscriptions",
      "confidence": "high",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Recurring subscription candidate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_12": {
      "id": "cls_txn_stmt_1793880000000_f24z_12",
      "transactionId": "txn_stmt_1793880000000_f24z_12",
      "economicType": "expense",
      "category": "other",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Classified by local deterministic rules",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_13": {
      "id": "cls_txn_stmt_1793880000000_f24z_13",
      "transactionId": "txn_stmt_1793880000000_f24z_13",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_14": {
      "id": "cls_txn_stmt_1793880000000_f24z_14",
      "transactionId": "txn_stmt_1793880000000_f24z_14",
      "economicType": "income",
      "category": "income",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Matched earned income / scholarship inflow",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_15": {
      "id": "cls_txn_stmt_1793880000000_f24z_15",
      "transactionId": "txn_stmt_1793880000000_f24z_15",
      "economicType": "internal_transfer",
      "category": "transfer",
      "confidence": "medium",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Matched transfer to savings",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_16": {
      "id": "cls_txn_stmt_1793880000000_f24z_16",
      "transactionId": "txn_stmt_1793880000000_f24z_16",
      "economicType": "expense",
      "category": "rent_housing",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Housing / rent payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_17": {
      "id": "cls_txn_stmt_1793880000000_f24z_17",
      "transactionId": "txn_stmt_1793880000000_f24z_17",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_18": {
      "id": "cls_txn_stmt_1793880000000_f24z_18",
      "transactionId": "txn_stmt_1793880000000_f24z_18",
      "economicType": "expense",
      "category": "transport",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Transport & mobility",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_19": {
      "id": "cls_txn_stmt_1793880000000_f24z_19",
      "transactionId": "txn_stmt_1793880000000_f24z_19",
      "economicType": "expense",
      "category": "utilities_energy",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Utility bill payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_20": {
      "id": "cls_txn_stmt_1793880000000_f24z_20",
      "transactionId": "txn_stmt_1793880000000_f24z_20",
      "economicType": "expense",
      "category": "internet_telecom",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Telecom / internet recurring payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_21": {
      "id": "cls_txn_stmt_1793880000000_f24z_21",
      "transactionId": "txn_stmt_1793880000000_f24z_21",
      "economicType": "expense",
      "category": "subscriptions",
      "confidence": "high",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Recurring subscription candidate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_22": {
      "id": "cls_txn_stmt_1793880000000_f24z_22",
      "transactionId": "txn_stmt_1793880000000_f24z_22",
      "economicType": "debt_payment",
      "category": "other",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Debt / credit card servicing payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_23": {
      "id": "cls_txn_stmt_1793880000000_f24z_23",
      "transactionId": "txn_stmt_1793880000000_f24z_23",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_24": {
      "id": "cls_txn_stmt_1793880000000_f24z_24",
      "transactionId": "txn_stmt_1793880000000_f24z_24",
      "economicType": "expense",
      "category": "dining_coffee",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Dining & coffee",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_25": {
      "id": "cls_txn_stmt_1793880000000_f24z_25",
      "transactionId": "txn_stmt_1793880000000_f24z_25",
      "economicType": "expense",
      "category": "dining_coffee",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Dining & coffee",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_26": {
      "id": "cls_txn_stmt_1793880000000_f24z_26",
      "transactionId": "txn_stmt_1793880000000_f24z_26",
      "economicType": "expense",
      "category": "subscriptions",
      "confidence": "high",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Recurring subscription candidate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_27": {
      "id": "cls_txn_stmt_1793880000000_f24z_27",
      "transactionId": "txn_stmt_1793880000000_f24z_27",
      "economicType": "expense",
      "category": "other",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Classified by local deterministic rules",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_28": {
      "id": "cls_txn_stmt_1793880000000_f24z_28",
      "transactionId": "txn_stmt_1793880000000_f24z_28",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_29": {
      "id": "cls_txn_stmt_1793880000000_f24z_29",
      "transactionId": "txn_stmt_1793880000000_f24z_29",
      "economicType": "income",
      "category": "income",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Matched earned income / scholarship inflow",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_30": {
      "id": "cls_txn_stmt_1793880000000_f24z_30",
      "transactionId": "txn_stmt_1793880000000_f24z_30",
      "economicType": "internal_transfer",
      "category": "transfer",
      "confidence": "medium",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Matched transfer to savings",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_31": {
      "id": "cls_txn_stmt_1793880000000_f24z_31",
      "transactionId": "txn_stmt_1793880000000_f24z_31",
      "economicType": "expense",
      "category": "rent_housing",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Housing / rent payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_32": {
      "id": "cls_txn_stmt_1793880000000_f24z_32",
      "transactionId": "txn_stmt_1793880000000_f24z_32",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_33": {
      "id": "cls_txn_stmt_1793880000000_f24z_33",
      "transactionId": "txn_stmt_1793880000000_f24z_33",
      "economicType": "expense",
      "category": "transport",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Transport & mobility",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_34": {
      "id": "cls_txn_stmt_1793880000000_f24z_34",
      "transactionId": "txn_stmt_1793880000000_f24z_34",
      "economicType": "expense",
      "category": "utilities_energy",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Utility bill payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_35": {
      "id": "cls_txn_stmt_1793880000000_f24z_35",
      "transactionId": "txn_stmt_1793880000000_f24z_35",
      "economicType": "expense",
      "category": "internet_telecom",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Telecom / internet recurring payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_36": {
      "id": "cls_txn_stmt_1793880000000_f24z_36",
      "transactionId": "txn_stmt_1793880000000_f24z_36",
      "economicType": "expense",
      "category": "subscriptions",
      "confidence": "high",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Recurring subscription candidate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_37": {
      "id": "cls_txn_stmt_1793880000000_f24z_37",
      "transactionId": "txn_stmt_1793880000000_f24z_37",
      "economicType": "debt_payment",
      "category": "other",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Debt / credit card servicing payment",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_38": {
      "id": "cls_txn_stmt_1793880000000_f24z_38",
      "transactionId": "txn_stmt_1793880000000_f24z_38",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_39": {
      "id": "cls_txn_stmt_1793880000000_f24z_39",
      "transactionId": "txn_stmt_1793880000000_f24z_39",
      "economicType": "expense",
      "category": "dining_coffee",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Dining & coffee",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_40": {
      "id": "cls_txn_stmt_1793880000000_f24z_40",
      "transactionId": "txn_stmt_1793880000000_f24z_40",
      "economicType": "expense",
      "category": "dining_coffee",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Dining & coffee",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_41": {
      "id": "cls_txn_stmt_1793880000000_f24z_41",
      "transactionId": "txn_stmt_1793880000000_f24z_41",
      "economicType": "expense",
      "category": "subscriptions",
      "confidence": "high",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Recurring subscription candidate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_42": {
      "id": "cls_txn_stmt_1793880000000_f24z_42",
      "transactionId": "txn_stmt_1793880000000_f24z_42",
      "economicType": "expense",
      "category": "other",
      "confidence": "medium",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Classified by local deterministic rules",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_43": {
      "id": "cls_txn_stmt_1793880000000_f24z_43",
      "transactionId": "txn_stmt_1793880000000_f24z_43",
      "economicType": "expense",
      "category": "groceries_food",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Grocery merchant",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_44": {
      "id": "cls_txn_stmt_1793880000000_f24z_44",
      "transactionId": "txn_stmt_1793880000000_f24z_44",
      "economicType": "income",
      "category": "income",
      "confidence": "high",
      "status": "auto_classified",
      "classifierVersion": "1.0",
      "isRecurringCandidate": true,
      "provenanceNote": "Matched earned income / scholarship inflow",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_f24z_45": {
      "id": "cls_txn_stmt_1793880000000_f24z_45",
      "transactionId": "txn_stmt_1793880000000_f24z_45",
      "economicType": "internal_transfer",
      "category": "transfer",
      "confidence": "medium",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Matched transfer to savings",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_96yi_1": {
      "id": "cls_txn_stmt_1793880000000_96yi_1",
      "transactionId": "txn_stmt_1793880000000_96yi_1",
      "economicType": "internal_transfer",
      "category": "transfer",
      "confidence": "medium",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Matched transfer from main",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_96yi_2": {
      "id": "cls_txn_stmt_1793880000000_96yi_2",
      "transactionId": "txn_stmt_1793880000000_96yi_2",
      "economicType": "internal_transfer",
      "category": "transfer",
      "confidence": "medium",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Matched transfer from main",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "txn_stmt_1793880000000_96yi_3": {
      "id": "cls_txn_stmt_1793880000000_96yi_3",
      "transactionId": "txn_stmt_1793880000000_96yi_3",
      "economicType": "internal_transfer",
      "category": "transfer",
      "confidence": "medium",
      "status": "needs_review",
      "classifierVersion": "1.0",
      "isRecurringCandidate": false,
      "provenanceNote": "Matched transfer from main",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    }
  },
  "statements": [
    {
      "id": "stmt_1793880000000_f24z",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
      "importedAt": "2026-11-05T12:00:00.000Z"
    },
    {
      "id": "stmt_1793880000000_96yi",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
      "importedAt": "2026-11-05T12:00:00.000Z"
    }
  ]
}
~~~~

## Output

~~~~json
{
  "coverage": [
    {
      "id": "stmt_1793880000000_f24z",
      "accountId": "main",
      "currency": "EUR",
      "periodStart": "2026-08-03",
      "periodEnd": "2026-10-28",
      "status": "needs_review"
    },
    {
      "id": "stmt_1793880000000_96yi",
      "accountId": "savings",
      "currency": "EUR",
      "periodStart": "2026-08-28",
      "periodEnd": "2026-10-28",
      "status": "needs_review"
    }
  ],
  "repeated": [
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "harbor properties"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_1",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-03",
          "amount": -980
        },
        {
          "id": "txn_stmt_1793880000000_f24z_16",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-03",
          "amount": -980
        },
        {
          "id": "txn_stmt_1793880000000_f24z_31",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-03",
          "amount": -980
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "green basket"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_2",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-05",
          "amount": -89.4
        },
        {
          "id": "txn_stmt_1793880000000_f24z_8",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-16",
          "amount": -94.8
        },
        {
          "id": "txn_stmt_1793880000000_f24z_13",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-25",
          "amount": -87.35
        },
        {
          "id": "txn_stmt_1793880000000_f24z_17",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-05",
          "amount": -89.4
        },
        {
          "id": "txn_stmt_1793880000000_f24z_23",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-16",
          "amount": -94.8
        },
        {
          "id": "txn_stmt_1793880000000_f24z_28",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-25",
          "amount": -87.35
        },
        {
          "id": "txn_stmt_1793880000000_f24z_32",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-05",
          "amount": -89.4
        },
        {
          "id": "txn_stmt_1793880000000_f24z_38",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-16",
          "amount": -94.8
        },
        {
          "id": "txn_stmt_1793880000000_f24z_43",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-25",
          "amount": -87.35
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "city transit"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_3",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-06",
          "amount": -42
        },
        {
          "id": "txn_stmt_1793880000000_f24z_18",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-06",
          "amount": -42
        },
        {
          "id": "txn_stmt_1793880000000_f24z_33",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-06",
          "amount": -42
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "bright energy"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_4",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-08",
          "amount": -105
        },
        {
          "id": "txn_stmt_1793880000000_f24z_19",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-08",
          "amount": -105
        },
        {
          "id": "txn_stmt_1793880000000_f24z_34",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-08",
          "amount": -105
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "fiber home"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_5",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-10",
          "amount": -32
        },
        {
          "id": "txn_stmt_1793880000000_f24z_20",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-10",
          "amount": -32
        },
        {
          "id": "txn_stmt_1793880000000_f24z_35",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-10",
          "amount": -32
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "sound library"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_6",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-12",
          "amount": -10.99
        },
        {
          "id": "txn_stmt_1793880000000_f24z_21",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-12",
          "amount": -10.99
        },
        {
          "id": "txn_stmt_1793880000000_f24z_36",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-12",
          "amount": -10.99
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "fictional card services"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_7",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-14",
          "amount": -55
        },
        {
          "id": "txn_stmt_1793880000000_f24z_22",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-14",
          "amount": -55
        },
        {
          "id": "txn_stmt_1793880000000_f24z_37",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-14",
          "amount": -55
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "corner coffee"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_9",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-18",
          "amount": -14.7
        },
        {
          "id": "txn_stmt_1793880000000_f24z_24",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-18",
          "amount": -14.7
        },
        {
          "id": "txn_stmt_1793880000000_f24z_39",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-18",
          "amount": -14.7
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "maple kitchen"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_10",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-20",
          "amount": -44.5
        },
        {
          "id": "txn_stmt_1793880000000_f24z_25",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-20",
          "amount": -44.5
        },
        {
          "id": "txn_stmt_1793880000000_f24z_40",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-20",
          "amount": -44.5
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "screen library"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_11",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-21",
          "amount": -15.99
        },
        {
          "id": "txn_stmt_1793880000000_f24z_26",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-21",
          "amount": -15.99
        },
        {
          "id": "txn_stmt_1793880000000_f24z_41",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-21",
          "amount": -15.99
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "outflow",
        "oak pharmacy"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_12",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-23",
          "amount": -22.6
        },
        {
          "id": "txn_stmt_1793880000000_f24z_27",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-23",
          "amount": -22.6
        },
        {
          "id": "txn_stmt_1793880000000_f24z_42",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-23",
          "amount": -22.6
        }
      ],
      "confirmation": "observed_repeat_only"
    },
    {
      "group": [
        "main",
        "EUR",
        "inflow",
        "danube studio"
      ],
      "observations": [
        {
          "id": "txn_stmt_1793880000000_f24z_14",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-08-27",
          "amount": 2350
        },
        {
          "id": "txn_stmt_1793880000000_f24z_29",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-09-27",
          "amount": 2350
        },
        {
          "id": "txn_stmt_1793880000000_f24z_44",
          "statementId": "stmt_1793880000000_f24z",
          "date": "2026-10-27",
          "amount": 2350
        }
      ],
      "confirmation": "observed_repeat_only"
    }
  ],
  "comparisons": [],
  "summaryText": "Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence."
}
~~~~

## Summary

~~~~text
Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.
~~~~
