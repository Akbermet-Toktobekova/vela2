# 02 Strong · impact

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Full beta impact details are retained for scored candidates in engine.traces[evaluationId].trace.scoredCandidates. | — |

## Input

~~~~json
{
  "snapshotId": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
  "candidates": [
    {
      "candidateId": "cand_A007_snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
      "actionId": "A007",
      "actionType": "FINANCIAL_ACTION",
      "title": "Add EUR 375 to your emergency reserve",
      "description": "Earmark EUR 375 from uncommitted available cash (EUR 9108.38 safe after upcoming bills) into your accessible emergency cushion.",
      "rationale": "Organizes existing liquid funds for an emergency goal; liquid coverage is 6.34 months. Earmarking equally liquid cash does not itself increase liquidity. Checker must verify obligations over the 90-day horizon.",
      "targetId": "education",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 375,
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
    {
      "candidateId": "cand_A012_education",
      "actionId": "A012",
      "actionType": "FINANCIAL_ACTION",
      "title": "Contribute EUR 4550 toward \"Education\"",
      "description": "Allocate EUR 4550 from available cash toward your \"Education\" goal (advancing progress from 0% to 76%).",
      "rationale": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012).",
      "targetId": "education",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 4550,
      "currency": "EUR",
      "proposedTiming": "2026-11-05",
      "supportingRuleIds": [
        "R002",
        "R012"
      ],
      "supportingClaimIds": [
        "C006"
      ],
      "supportingSourceIds": [
        "S001"
      ],
      "requiredPiInputs": [
        "goal_target",
        "goal_balance",
        "available_cash"
      ],
      "origin": "AI_SUGGESTION"
    }
  ],
  "calculatorExtras": {
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
  }
}
~~~~

## Output

~~~~json
[
  {
    "candidate": {
      "candidateId": "cand_A007_snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
      "actionId": "A007",
      "actionType": "FINANCIAL_ACTION",
      "title": "Add EUR 375 to your emergency reserve",
      "description": "Earmark EUR 375 from uncommitted available cash (EUR 9108.38 safe after upcoming bills) into your accessible emergency cushion.",
      "rationale": "Organizes existing liquid funds for an emergency goal; liquid coverage is 6.34 months. Earmarking equally liquid cash does not itself increase liquidity. Checker must verify obligations over the 90-day horizon.",
      "targetId": "education",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 375,
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
    "impact": {
      "scenarioMetadata": {
        "referenceDate": "2026-11-05",
        "actionDate": "2026-11-05",
        "currency": "EUR",
        "policyVersion": "prototype_policy_bundle_v1.3",
        "inputSnapshotId": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
        "terminalDate": "2027-02-03",
        "cashUnit": "currency",
        "resilienceUnit": "months",
        "goalUnit": "fraction",
        "assumptions": [
          "Same dated confirmed income and mandatory obligations in both scenarios.",
          "Debt uses simple daily interest on outstanding principal and verified dated minimum payments; no future borrowing.",
          "Internal allocations change earmarks, not total liquid wealth."
        ]
      },
      "candidateId": "cand_A007_snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
      "actionId": "A007",
      "horizonDays": 90,
      "status": "COMPUTED",
      "missingInputs": [],
      "rawImpacts": {
        "beforeTerminalLiquidCash": 17608.38,
        "afterTerminalLiquidCash": 17608.38,
        "beforeTerminalDate": "2027-02-03",
        "afterTerminalDate": "2027-02-03",
        "deltaResilienceMonths": 0,
        "deltaFinancialBenefitCurrency": 0,
        "deltaGoalProgressFraction": 0.0625,
        "beforeResilienceMonths": 0,
        "afterResilienceMonths": 0,
        "beforeCost90d": 0,
        "afterCost90d": 0,
        "beforeGoalProgress": 0,
        "afterGoalProgress": 0.0625,
        "annualizedRecurringSaving12m": null,
        "debt12mCounterfactualInterestAvoided": null
      },
      "referenceScales": {
        "K_R": 0.25,
        "K_F": 75,
        "K_G": 0.2
      },
      "normalizedValues": {
        "v_R": 0,
        "v_F": 0,
        "v_G": 0.3125
      },
      "saturationFlags": {
        "R_clipped": false,
        "F_clipped": false,
        "G_clipped": false
      },
      "doubleCountingCheckPassed": true,
      "normalizationPolicyVersion": "normalization_policy_v1_prototype"
    }
  },
  {
    "candidate": {
      "candidateId": "cand_A012_education",
      "actionId": "A012",
      "actionType": "FINANCIAL_ACTION",
      "title": "Contribute EUR 4550 toward \"Education\"",
      "description": "Allocate EUR 4550 from available cash toward your \"Education\" goal (advancing progress from 0% to 76%).",
      "rationale": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012).",
      "targetId": "education",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 4550,
      "currency": "EUR",
      "proposedTiming": "2026-11-05",
      "supportingRuleIds": [
        "R002",
        "R012"
      ],
      "supportingClaimIds": [
        "C006"
      ],
      "supportingSourceIds": [
        "S001"
      ],
      "requiredPiInputs": [
        "goal_target",
        "goal_balance",
        "available_cash"
      ],
      "origin": "AI_SUGGESTION"
    },
    "impact": {
      "scenarioMetadata": {
        "referenceDate": "2026-11-05",
        "actionDate": "2026-11-05",
        "currency": "EUR",
        "policyVersion": "prototype_policy_bundle_v1.3",
        "inputSnapshotId": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
        "terminalDate": "2027-02-03",
        "cashUnit": "currency",
        "resilienceUnit": "months",
        "goalUnit": "fraction",
        "assumptions": [
          "Same dated confirmed income and mandatory obligations in both scenarios.",
          "Debt uses simple daily interest on outstanding principal and verified dated minimum payments; no future borrowing.",
          "Internal allocations change earmarks, not total liquid wealth."
        ]
      },
      "candidateId": "cand_A012_education",
      "actionId": "A012",
      "horizonDays": 90,
      "status": "COMPUTED",
      "missingInputs": [],
      "rawImpacts": {
        "beforeTerminalLiquidCash": 17608.38,
        "afterTerminalLiquidCash": 17608.38,
        "beforeTerminalDate": "2027-02-03",
        "afterTerminalDate": "2027-02-03",
        "deltaResilienceMonths": 0,
        "deltaFinancialBenefitCurrency": 0,
        "deltaGoalProgressFraction": 0.7583,
        "beforeResilienceMonths": 0,
        "afterResilienceMonths": 0,
        "beforeCost90d": 0,
        "afterCost90d": 0,
        "beforeGoalProgress": 0,
        "afterGoalProgress": 0.7583,
        "annualizedRecurringSaving12m": null,
        "debt12mCounterfactualInterestAvoided": null
      },
      "referenceScales": {
        "K_R": 0.25,
        "K_F": 75,
        "K_G": 0.2
      },
      "normalizedValues": {
        "v_R": 0,
        "v_F": 0,
        "v_G": 1
      },
      "saturationFlags": {
        "R_clipped": false,
        "F_clipped": false,
        "G_clipped": true
      },
      "doubleCountingCheckPassed": true,
      "normalizationPolicyVersion": "normalization_policy_v1_prototype"
    }
  }
]
~~~~
