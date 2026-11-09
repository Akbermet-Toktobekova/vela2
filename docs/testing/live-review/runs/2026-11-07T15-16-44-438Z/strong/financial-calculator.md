# 02 Strong · financial calculator

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Isolated calculation. Draft PostgreSQL analysis.financial_snapshots; full-run publication below. | — |

## Input

~~~~json
{
  "snapshotId": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
  "extras": {
    "referenceDateIso": "2026-11-05",
    "fxRates": {
      "HUF": {
        "base": "EUR",
        "target": "HUF",
        "rate": 363.9,
        "rateDate": "2026-11-06",
        "fetchedAt": "2026-11-05T12:00:00.000Z",
        "status": "OK",
        "source": "https://api.frankfurter.dev/v1/latest"
      }
    }
  },
  "pi": "pi.md"
}
~~~~

## Output

~~~~json
{
  "liquidity": {
    "totalLiquidAccessible": 9508.38,
    "dedicatedEmergencyReserve": 0,
    "uncommittedLiquidCash": 8008.38,
    "fxWarningCurrencies": []
  },
  "reserveMonths": 6.3389,
  "cashflow": {
    "horizonDays": 90,
    "startingLiquidCash": 9508.38,
    "bufferFloor": 0,
    "availableCashBeforeActionF003": 17608.38,
    "minProjectedCashSignedF004": 9108.38,
    "minProjectedCashDate": "2026-11-20",
    "hasProjectedDeficit": false,
    "shortfallsByObligation": [],
    "dailyTrajectory": [
      {
        "date": "2026-11-05",
        "dayOffset": 0,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-06",
        "dayOffset": 1,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-07",
        "dayOffset": 2,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-08",
        "dayOffset": 3,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-09",
        "dayOffset": 4,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-10",
        "dayOffset": 5,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-11",
        "dayOffset": 6,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-12",
        "dayOffset": 7,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-13",
        "dayOffset": 8,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-14",
        "dayOffset": 9,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-15",
        "dayOffset": 10,
        "inflows": 0,
        "outflows": 150,
        "netCashSigned": 9358.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-16",
        "dayOffset": 11,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9358.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-17",
        "dayOffset": 12,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9358.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-18",
        "dayOffset": 13,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9358.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-19",
        "dayOffset": 14,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9358.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-20",
        "dayOffset": 15,
        "inflows": 0,
        "outflows": 250,
        "netCashSigned": 9108.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-21",
        "dayOffset": 16,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9108.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-22",
        "dayOffset": 17,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9108.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-23",
        "dayOffset": 18,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9108.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-24",
        "dayOffset": 19,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 9108.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-25",
        "dayOffset": 20,
        "inflows": 4200,
        "outflows": 0,
        "netCashSigned": 13308.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-26",
        "dayOffset": 21,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 13308.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-27",
        "dayOffset": 22,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 13308.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-28",
        "dayOffset": 23,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 13308.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-29",
        "dayOffset": 24,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 13308.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-11-30",
        "dayOffset": 25,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 13308.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-01",
        "dayOffset": 26,
        "inflows": 0,
        "outflows": 1100,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-02",
        "dayOffset": 27,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-03",
        "dayOffset": 28,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-04",
        "dayOffset": 29,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-05",
        "dayOffset": 30,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-06",
        "dayOffset": 31,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-07",
        "dayOffset": 32,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-08",
        "dayOffset": 33,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-09",
        "dayOffset": 34,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-10",
        "dayOffset": 35,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-11",
        "dayOffset": 36,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-12",
        "dayOffset": 37,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-13",
        "dayOffset": 38,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-14",
        "dayOffset": 39,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12208.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-15",
        "dayOffset": 40,
        "inflows": 0,
        "outflows": 150,
        "netCashSigned": 12058.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-16",
        "dayOffset": 41,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12058.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-17",
        "dayOffset": 42,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12058.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-18",
        "dayOffset": 43,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12058.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-19",
        "dayOffset": 44,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 12058.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-20",
        "dayOffset": 45,
        "inflows": 0,
        "outflows": 250,
        "netCashSigned": 11808.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-21",
        "dayOffset": 46,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 11808.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-22",
        "dayOffset": 47,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 11808.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-23",
        "dayOffset": 48,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 11808.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-24",
        "dayOffset": 49,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 11808.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-25",
        "dayOffset": 50,
        "inflows": 4200,
        "outflows": 0,
        "netCashSigned": 16008.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-26",
        "dayOffset": 51,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 16008.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-27",
        "dayOffset": 52,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 16008.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-28",
        "dayOffset": 53,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 16008.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-29",
        "dayOffset": 54,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 16008.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-30",
        "dayOffset": 55,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 16008.38,
        "belowBufferFloor": false
      },
      {
        "date": "2026-12-31",
        "dayOffset": 56,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 16008.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-01",
        "dayOffset": 57,
        "inflows": 0,
        "outflows": 1100,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-02",
        "dayOffset": 58,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-03",
        "dayOffset": 59,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-04",
        "dayOffset": 60,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-05",
        "dayOffset": 61,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-06",
        "dayOffset": 62,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-07",
        "dayOffset": 63,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-08",
        "dayOffset": 64,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-09",
        "dayOffset": 65,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-10",
        "dayOffset": 66,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-11",
        "dayOffset": 67,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-12",
        "dayOffset": 68,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-13",
        "dayOffset": 69,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-14",
        "dayOffset": 70,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14908.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-15",
        "dayOffset": 71,
        "inflows": 0,
        "outflows": 150,
        "netCashSigned": 14758.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-16",
        "dayOffset": 72,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14758.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-17",
        "dayOffset": 73,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14758.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-18",
        "dayOffset": 74,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14758.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-19",
        "dayOffset": 75,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14758.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-20",
        "dayOffset": 76,
        "inflows": 0,
        "outflows": 250,
        "netCashSigned": 14508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-21",
        "dayOffset": 77,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-22",
        "dayOffset": 78,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-23",
        "dayOffset": 79,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-24",
        "dayOffset": 80,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 14508.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-25",
        "dayOffset": 81,
        "inflows": 4200,
        "outflows": 0,
        "netCashSigned": 18708.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-26",
        "dayOffset": 82,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 18708.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-27",
        "dayOffset": 83,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 18708.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-28",
        "dayOffset": 84,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 18708.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-29",
        "dayOffset": 85,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 18708.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-30",
        "dayOffset": 86,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 18708.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-01-31",
        "dayOffset": 87,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 18708.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-01",
        "dayOffset": 88,
        "inflows": 0,
        "outflows": 1100,
        "netCashSigned": 17608.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-02",
        "dayOffset": 89,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 17608.38,
        "belowBufferFloor": false
      },
      {
        "date": "2027-02-03",
        "dayOffset": 90,
        "inflows": 0,
        "outflows": 0,
        "netCashSigned": 17608.38,
        "belowBufferFloor": false
      }
    ],
    "missingInputs": []
  }
}
~~~~
