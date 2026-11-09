# 01 Debt · financial calculator

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Isolated calculation. Draft PostgreSQL analysis.financial_snapshots; full-run publication below. | — |

## Input

~~~~json
{
  "snapshotId": "snap_beta_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_373f467295431927",
  "extras": {
    "referenceDateIso": "2026-11-05",
    "debtTerms": {
      "card": {
        "debtId": "card",
        "interestAccruing": true,
        "issuerContact": "Support in the bank app"
      }
    },
    "fxRates": {}
  },
  "pi": "pi.md"
}
~~~~

## Output

~~~~json
{
  "liquidity": {
    "totalLiquidAccessible": 20,
    "dedicatedEmergencyReserve": 0,
    "uncommittedLiquidCash": -45,
    "fxWarningCurrencies": []
  },
  "reserveMonths": 0.0211,
  "cashflow": {
    "horizonDays": 90,
    "startingLiquidCash": 20,
    "bufferFloor": 0,
    "availableCashBeforeActionF003": 5030,
    "minProjectedCashSignedF004": -110,
    "minProjectedCashDate": "2026-11-18",
    "hasProjectedDeficit": true,
    "shortfallsByObligation": [
      {
        "targetId": "card",
        "targetType": "debt_minimum",
        "name": "Credit card minimum",
        "dueDate": "2026-11-08",
        "amountDue": 65,
        "liquidAvailableByDue": 20,
        "shortfallAmountF019": 45
      },
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
        "netCashSigned": 20,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-06",
        "dayOffset": 1,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 20,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-07",
        "dayOffset": 2,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 20,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-08",
        "dayOffset": 3,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-09",
        "dayOffset": 4,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-10",
        "dayOffset": 5,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-11",
        "dayOffset": 6,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-12",
        "dayOffset": 7,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-13",
        "dayOffset": 8,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-14",
        "dayOffset": 9,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-15",
        "dayOffset": 10,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-16",
        "dayOffset": 11,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-17",
        "dayOffset": 12,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -45,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-18",
        "dayOffset": 13,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": -110,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-19",
        "dayOffset": 14,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -110,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-20",
        "dayOffset": 15,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -110,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-21",
        "dayOffset": 16,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -110,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-22",
        "dayOffset": 17,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -110,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-23",
        "dayOffset": 18,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -110,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-24",
        "dayOffset": 19,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": -110,
        "belowBufferFloor": true
      },
      {
        "date": "2026-11-25",
        "dayOffset": 20,
        "inflows": 1800,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-26",
        "dayOffset": 21,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-27",
        "dayOffset": 22,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-28",
        "dayOffset": 23,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-29",
        "dayOffset": 24,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-30",
        "dayOffset": 25,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-01",
        "dayOffset": 26,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-02",
        "dayOffset": 27,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-03",
        "dayOffset": 28,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-04",
        "dayOffset": 29,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-05",
        "dayOffset": 30,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-06",
        "dayOffset": 31,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-07",
        "dayOffset": 32,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1690,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-08",
        "dayOffset": 33,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-09",
        "dayOffset": 34,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-10",
        "dayOffset": 35,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-11",
        "dayOffset": 36,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-12",
        "dayOffset": 37,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-13",
        "dayOffset": 38,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-14",
        "dayOffset": 39,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-15",
        "dayOffset": 40,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-16",
        "dayOffset": 41,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-17",
        "dayOffset": 42,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1625,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-18",
        "dayOffset": 43,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 1560,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-19",
        "dayOffset": 44,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1560,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-20",
        "dayOffset": 45,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1560,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-21",
        "dayOffset": 46,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1560,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-22",
        "dayOffset": 47,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1560,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-23",
        "dayOffset": 48,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1560,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-24",
        "dayOffset": 49,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 1560,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-25",
        "dayOffset": 50,
        "inflows": 1800,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-26",
        "dayOffset": 51,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-27",
        "dayOffset": 52,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-28",
        "dayOffset": 53,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-29",
        "dayOffset": 54,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-30",
        "dayOffset": 55,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-31",
        "dayOffset": 56,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-01",
        "dayOffset": 57,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-02",
        "dayOffset": 58,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-03",
        "dayOffset": 59,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-04",
        "dayOffset": 60,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-05",
        "dayOffset": 61,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-06",
        "dayOffset": 62,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-07",
        "dayOffset": 63,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3360,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-08",
        "dayOffset": 64,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-09",
        "dayOffset": 65,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-10",
        "dayOffset": 66,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-11",
        "dayOffset": 67,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-12",
        "dayOffset": 68,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-13",
        "dayOffset": 69,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-14",
        "dayOffset": 70,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-15",
        "dayOffset": 71,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-16",
        "dayOffset": 72,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-17",
        "dayOffset": 73,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3295,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-18",
        "dayOffset": 74,
        "inflows": 0,
        "outflows": 65,
        "netCashSigned": 3230,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-19",
        "dayOffset": 75,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3230,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-20",
        "dayOffset": 76,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3230,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-21",
        "dayOffset": 77,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3230,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-22",
        "dayOffset": 78,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3230,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-23",
        "dayOffset": 79,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3230,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-24",
        "dayOffset": 80,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 3230,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-25",
        "dayOffset": 81,
        "inflows": 1800,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-26",
        "dayOffset": 82,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-27",
        "dayOffset": 83,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-28",
        "dayOffset": 84,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-29",
        "dayOffset": 85,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-30",
        "dayOffset": 86,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-31",
        "dayOffset": 87,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-01",
        "dayOffset": 88,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-02",
        "dayOffset": 89,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-03",
        "dayOffset": 90,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 5030,
        "belowBufferFloor": false
      }
    ],
    "missingInputs": []
  }
}
~~~~
