# 02 Strong · explanation

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | Standalone explanation of the catalog decision. The real Today card is recorded in beta-review.md. | — |

## Input

~~~~json
{
  "decision": {
    "evaluationId": "eval_snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f_1793880000000",
    "snapshotId": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
    "snapshotVersion": "3.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "NORMAL",
    "selectedActionId": "A012",
    "selectedActionType": "FINANCIAL_ACTION",
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
    "title": "Contribute EUR 4550 toward \"Education\"",
    "description": "Allocate EUR 4550 from available cash toward your \"Education\" goal (advancing progress from 0% to 76%).",
    "reasoning": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). (Selected under goal_advancement profile with F017 score 0.5887 and F018 stability 100.0%).",
    "expectedEffectSummary": "+75.8% goal completion",
    "weightProfileId": "goal_advancement",
    "weights": {
      "resilience": 0.2,
      "financial_benefit": 0.2,
      "goal_progress": 0.6
    },
    "values": {
      "resilience": 0,
      "financial_benefit": 0,
      "goal_progress": 1
    },
    "rawImpacts": {
      "resilienceMonths": 0,
      "financialBenefitCurrency": 0,
      "goalProgressPctPoints": 75.83,
      "annualizedSaving12m": null,
      "debt12mInterestAvoided": null
    },
    "complexity": 0.1125,
    "score": 0.58875,
    "stability": 1,
    "policyVersion": "prototype_policy_bundle_v1.3",
    "sourceIds": [
      "S001"
    ],
    "ruleIds": [
      "R002",
      "R012"
    ],
    "claimIds": [
      "C006"
    ],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": null,
    "missingFields": [],
    "trace": {
      "evaluationId": "eval_snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f_1793880000000",
      "userId": "b62224a2-e6b3-4ff2-9ba2-3fff49889029",
      "snapshotId": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-05T12:00:00.000Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.3",
      "priorityClass": "NORMAL",
      "weightSelection": {
        "profileId": "goal_advancement",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.2,
          "F": 0.2,
          "G": 0.6
        },
        "triggerReason": "Coverage M = 5.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
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
          "status": "VALID",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "liquid_balance",
              "status": "VERIFIED"
            },
            {
              "field": "mandatory_outflows",
              "status": "VERIFIED"
            },
            {
              "field": "amount",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 8733.38,
          "unlocksActionIds": []
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
          "status": "VALID",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "goal_target",
              "status": "VERIFIED"
            },
            {
              "field": "goal_balance",
              "status": "VERIFIED"
            },
            {
              "field": "available_cash",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 4558.38,
          "unlocksActionIds": []
        }
      ],
      "scoredCandidates": [
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
          },
          "complexity": {
            "candidateId": "cand_A012_education",
            "actionId": "A012",
            "T": {
              "score": 0.1,
              "status": "EVALUATED",
              "rationale": "Baseline time requirement for goal contribution.",
              "supportingFacts": [
                "action_id:A012"
              ],
              "missingInfo": []
            },
            "S": {
              "score": 0.15,
              "status": "EVALUATED",
              "rationale": "Standard procedural steps for goal-based contribution.",
              "supportingFacts": [
                "action_id:A012"
              ],
              "missingInfo": []
            },
            "D": {
              "score": 0.1,
              "status": "EVALUATED",
              "rationale": "Minimal external dependencies for internal goal funding.",
              "supportingFacts": [
                "action_id:A012"
              ],
              "missingInfo": []
            },
            "O": {
              "score": 0.1,
              "status": "EVALUATED",
              "rationale": "Standard ongoing effort for goal tracking.",
              "supportingFacts": [
                "action_id:A012"
              ],
              "missingInfo": []
            },
            "computedComplexity": 0.1125,
            "usedCatalogFallback": false,
            "hasUnknownComponents": false,
            "uncertaintyScore": 0.05,
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
        },
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
          },
          "complexity": {
            "candidateId": "cand_A007_snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
            "actionId": "A007",
            "T": {
              "score": 0.1,
              "status": "EVALUATED",
              "rationale": "Baseline time requirement for internal transfer to emergency reserve.",
              "supportingFacts": [
                "action_id:A007"
              ],
              "missingInfo": []
            },
            "S": {
              "score": 0.15,
              "status": "EVALUATED",
              "rationale": "Standard procedural steps for internal account transfer.",
              "supportingFacts": [
                "action_id:A007"
              ],
              "missingInfo": []
            },
            "D": {
              "score": 0.1,
              "status": "EVALUATED",
              "rationale": "Minimal external dependencies as it is an internal transfer.",
              "supportingFacts": [
                "action_id:A007"
              ],
              "missingInfo": []
            },
            "O": {
              "score": 0.15,
              "status": "EVALUATED",
              "rationale": "Ongoing effort associated with maintaining emergency reserve balance.",
              "supportingFacts": [
                "action_id:A007"
              ],
              "missingInfo": []
            },
            "computedComplexity": 0.125,
            "usedCatalogFallback": false,
            "hasUnknownComponents": false,
            "uncertaintyScore": 0.05,
            "policyVersion": "effort_rubric_v1_prototype",
            "formulaRef": "F016"
          },
          "weightedBenefit": 0.1875,
          "complexityPenalty": 0.0125,
          "finalScore": 0.175,
          "scoreBreakdown": {
            "wR_vR": 0,
            "wF_vF": 0,
            "wG_vG": 0.1875,
            "lambdaC_cC": 0.0125
          },
          "rank": 2
        }
      ],
      "robustness": {
        "topCandidateId": "cand_A012_education",
        "runnerUpCandidateId": "cand_A007_snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f",
        "baseScore": 0.58875,
        "runnerUpScore": 0.175,
        "scoreMargin": 0.41375,
        "isCloseDecision": false,
        "stability": 1,
        "winningScenarios": 200,
        "simulationCount": 200,
        "simulationSeed": 20261103,
        "perturbationFraction": 0.1,
        "meetsStabilityThreshold": true,
        "lambdaSensitivity": [
          {
            "lambda_C": 0,
            "winnerCandidateId": "cand_A012_education",
            "winnerScore": 0.6
          },
          {
            "lambda_C": 0.05,
            "winnerCandidateId": "cand_A012_education",
            "winnerScore": 0.594375
          },
          {
            "lambda_C": 0.1,
            "winnerCandidateId": "cand_A012_education",
            "winnerScore": 0.58875
          },
          {
            "lambda_C": 0.15,
            "winnerCandidateId": "cand_A012_education",
            "winnerScore": 0.583125
          }
        ],
        "tieBreakerApplied": false,
        "tieBreakerReason": null,
        "instabilityReason": "NONE",
        "policyVersion": "robustness_policy_v1_prototype",
        "formulaRef": "F018"
      },
      "selectedCandidate": {
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
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). (Selected under goal_advancement profile with F017 score 0.5887 and F018 stability 100.0%).",
      "supportingSourceIds": [
        "S001"
      ],
      "supportingRuleIds": [
        "R002",
        "R012"
      ],
      "supportingClaimIds": [
        "C006"
      ],
      "missingDataFields": [],
      "clarificationQuestion": null
    }
  },
  "snapshotId": "snap_beta_b62224a2-e6b3-4ff2-9ba2-3fff49889029_v3_74bfb7f562e8a87f"
}
~~~~

## Output

~~~~json
{
  "title": "Contribute EUR 4550 toward \"Education\"",
  "description": "Allocate EUR 4550 from available cash toward your \"Education\" goal (advancing progress from 0% to 76%).",
  "reasoning": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.3 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]",
  "expectedEffectSummary": "Goal progress (90d F015): +75.8 percentage points"
}
~~~~

## Summary

~~~~text
Advances verified savings goal "Education" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile "goal_advancement", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.3 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]
~~~~
