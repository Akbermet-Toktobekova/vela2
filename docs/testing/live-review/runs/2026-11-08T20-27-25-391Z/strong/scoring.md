# 02 Strong · scoring

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload / stage:eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:scoring / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T20:29:44.586Z

Consumers: Robustness and Decision Engine

Upstream artifact IDs: eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:ai-evaluation, eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:weights, eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:impact-cand_A012_education

Missing inputs: None flagged

## Input

~~~~json
{
  "candidates": [
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
          "policyVersion": "prototype_policy_bundle_v1.4",
          "inputSnapshotId": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20",
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
          "beforeTerminalLiquidCash": 17609.39,
          "afterTerminalLiquidCash": 17609.39,
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
      },
      "complexity": {
        "candidateId": "cand_A012_education",
        "actionId": "A012",
        "T": {
          "score": 0.1,
          "status": "UNKNOWN",
          "rationale": "AI factor unavailable: missing or invalid structured factor. Deterministic code must use the catalog baseline with uncertainty.",
          "supportingFacts": [
            "catalog_baseline_A012_T=0.1"
          ],
          "missingInfo": [
            "valid_contextual_complexity_evaluation"
          ]
        },
        "S": {
          "score": 0.15,
          "status": "UNKNOWN",
          "rationale": "AI factor unavailable: missing or invalid structured factor. Deterministic code must use the catalog baseline with uncertainty.",
          "supportingFacts": [
            "catalog_baseline_A012_S=0.15"
          ],
          "missingInfo": [
            "valid_contextual_complexity_evaluation"
          ]
        },
        "D": {
          "score": 0.1,
          "status": "UNKNOWN",
          "rationale": "AI factor unavailable: missing or invalid structured factor. Deterministic code must use the catalog baseline with uncertainty.",
          "supportingFacts": [
            "catalog_baseline_A012_D=0.1"
          ],
          "missingInfo": [
            "valid_contextual_complexity_evaluation"
          ]
        },
        "O": {
          "score": 0.1,
          "status": "UNKNOWN",
          "rationale": "AI factor unavailable: missing or invalid structured factor. Deterministic code must use the catalog baseline with uncertainty.",
          "supportingFacts": [
            "catalog_baseline_A012_O=0.1"
          ],
          "missingInfo": [
            "valid_contextual_complexity_evaluation"
          ]
        },
        "computedComplexity": 0.1125,
        "usedCatalogFallback": true,
        "hasUnknownComponents": true,
        "uncertaintyScore": 1,
        "policyVersion": "effort_rubric_v1_prototype",
        "formulaRef": "F016"
      }
    }
  ],
  "weightSelection": {
    "profileId": "goal_advancement",
    "previousProfileId": null,
    "hysteresisApplied": false,
    "weights": {
      "R": 0.2,
      "F": 0.2,
      "G": 0.6
    },
    "triggerReason": "Coverage M = 6.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
    "policyVersion": "weight_policy_v1_prototype"
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
  }
}
~~~~

## Output

~~~~json
[
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
        "policyVersion": "prototype_policy_bundle_v1.4",
        "inputSnapshotId": "snap_beta_bc325fd3-8384-4caf-8ebf-87bf5cc839f0_v3_f50094c1cedbeb20",
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
        "beforeTerminalLiquidCash": 17609.39,
        "afterTerminalLiquidCash": 17609.39,
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
    },
    "complexity": {
      "candidateId": "cand_A012_education",
      "actionId": "A012",
      "T": {
        "score": 0.1,
        "status": "UNKNOWN",
        "rationale": "AI factor unavailable: missing or invalid structured factor. Deterministic code must use the catalog baseline with uncertainty.",
        "supportingFacts": [
          "catalog_baseline_A012_T=0.1"
        ],
        "missingInfo": [
          "valid_contextual_complexity_evaluation"
        ]
      },
      "S": {
        "score": 0.15,
        "status": "UNKNOWN",
        "rationale": "AI factor unavailable: missing or invalid structured factor. Deterministic code must use the catalog baseline with uncertainty.",
        "supportingFacts": [
          "catalog_baseline_A012_S=0.15"
        ],
        "missingInfo": [
          "valid_contextual_complexity_evaluation"
        ]
      },
      "D": {
        "score": 0.1,
        "status": "UNKNOWN",
        "rationale": "AI factor unavailable: missing or invalid structured factor. Deterministic code must use the catalog baseline with uncertainty.",
        "supportingFacts": [
          "catalog_baseline_A012_D=0.1"
        ],
        "missingInfo": [
          "valid_contextual_complexity_evaluation"
        ]
      },
      "O": {
        "score": 0.1,
        "status": "UNKNOWN",
        "rationale": "AI factor unavailable: missing or invalid structured factor. Deterministic code must use the catalog baseline with uncertainty.",
        "supportingFacts": [
          "catalog_baseline_A012_O=0.1"
        ],
        "missingInfo": [
          "valid_contextual_complexity_evaluation"
        ]
      },
      "computedComplexity": 0.1125,
      "usedCatalogFallback": true,
      "hasUnknownComponents": true,
      "uncertaintyScore": 1,
      "policyVersion": "effort_rubric_v1_prototype",
      "formulaRef": "F016"
    },
    "weightedBenefit": 0.6,
    "complexityPenalty": 0.01125,
    "finalScore": 0.58875,
    "scoreBreakdown": {
      "wR_vR": 0,
      "wF_vF": 0,
      "wG_vG": 0.6,
      "lambdaC_cC": 0.01125
    },
    "rank": 1
  }
]
~~~~
