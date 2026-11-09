# 02 Strong · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations. | — |

Actual Today output: **Contribute EUR 4550 toward "Education"**.

## Input

~~~~json
{
  "request": "POST /api/beta/review",
  "body": {
    "forceRefresh": true
  },
  "version": 3
}
~~~~

## Output

~~~~json
{
  "jobId": "e4b61fae-ea20-4f57-a53d-a99ffd4a5dda",
  "decision": {
    "evaluationId": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3",
    "snapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
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
    "reasoning": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]",
    "expectedEffectSummary": "Goal progress (90d F015): +75.8 percentage points",
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
    "policyVersion": "prototype_policy_bundle_v1.4",
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
      "evaluationId": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3",
      "userId": "af5a80b2-7684-46ec-9f91-7ce62c67f3da",
      "snapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:48:06.711Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
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
        "triggerReason": "Coverage M = 6.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
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
          "projectedMinCashAfterAction": 4559.39,
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
              "policyVersion": "prototype_policy_bundle_v1.4",
              "inputSnapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
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
      ],
      "robustness": {
        "topCandidateId": "cand_A012_education",
        "runnerUpCandidateId": null,
        "baseScore": 0.58875,
        "runnerUpScore": null,
        "scoreMargin": 0.58875,
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
      "stageArtifactIds": [
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pi",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:fx",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:classification",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pattern-recognition",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:behavior-agent",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:financial-calculator",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-calculator",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-agent",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:suggestion-generator",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:catalog-selector",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:checker",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:critical-coverage",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:ai-evaluation",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:weights",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:impact-cand_A012_education",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:scoring",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:robustness",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:decision-engine",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:explanation"
      ],
      "primarySuggestions": {
        "proposals": [],
        "shortfallReason": "No applicable verified claim supports a specific action.",
        "fallbackReason": "NO_PROPOSALS",
        "criticalCoverageAddedIds": []
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
  "todayCard": {
    "id": "rec_A012_eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3",
    "userId": "af5a80b2-7684-46ec-9f91-7ce62c67f3da",
    "snapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
    "actionType": "allocate_safety_cushion",
    "title": "Contribute EUR 4550 toward \"Education\"",
    "description": "Allocate EUR 4550 from available cash toward your \"Education\" goal (advancing progress from 0% to 76%).",
    "reasoning": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]",
    "suggestedAmount": 4550,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "education",
    "sourceAccountId": "main",
    "priority": "suggested",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T15:48:06.804Z",
    "updatedAt": "2026-11-08T15:48:06.804Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pi",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:fx",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:classification",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pattern-recognition",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:behavior-agent",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:financial-calculator",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-calculator",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-agent",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:suggestion-generator",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:catalog-selector",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:checker",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:critical-coverage",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:ai-evaluation",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:weights",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:impact-cand_A012_education",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:scoring",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:robustness",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:decision-engine",
        "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:explanation"
      ],
      "evaluationId": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3",
      "userId": "af5a80b2-7684-46ec-9f91-7ce62c67f3da",
      "snapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:48:06.711Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
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
        "triggerReason": "Coverage M = 6.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
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
          "projectedMinCashAfterAction": 4559.39,
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
              "policyVersion": "prototype_policy_bundle_v1.4",
              "inputSnapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
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
      ],
      "robustness": {
        "topCandidateId": "cand_A012_education",
        "runnerUpCandidateId": null,
        "baseScore": 0.58875,
        "runnerUpScore": null,
        "scoreMargin": 0.58875,
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
      "primarySuggestions": {
        "proposals": [],
        "shortfallReason": "No applicable verified claim supports a specific action.",
        "fallbackReason": "NO_PROPOSALS",
        "criticalCoverageAddedIds": []
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
    },
    "decision": {
      "evaluationId": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3",
      "snapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
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
      "reasoning": "Advances verified savings goal \"Education\" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile \"goal_advancement\", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]",
      "expectedEffectSummary": "Goal progress (90d F015): +75.8 percentage points",
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
      "policyVersion": "prototype_policy_bundle_v1.4",
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
        "evaluationId": "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3",
        "userId": "af5a80b2-7684-46ec-9f91-7ce62c67f3da",
        "snapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
        "snapshotVersion": "3.0",
        "createdAt": "2026-11-08T15:48:06.711Z",
        "runtimeMode": "PROTOTYPE_MODE",
        "policyBundleVersion": "prototype_policy_bundle_v1.4",
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
          "triggerReason": "Coverage M = 6.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
          "policyVersion": "weight_policy_v1_prototype"
        },
        "validatedCandidates": [
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
            "projectedMinCashAfterAction": 4559.39,
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
                "policyVersion": "prototype_policy_bundle_v1.4",
                "inputSnapshotId": "snap_beta_af5a80b2-7684-46ec-9f91-7ce62c67f3da_v3_f804b1d3714e6035",
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
        ],
        "robustness": {
          "topCandidateId": "cand_A012_education",
          "runnerUpCandidateId": null,
          "baseScore": 0.58875,
          "runnerUpScore": null,
          "scoreMargin": 0.58875,
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
        "stageArtifactIds": [
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pi",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:fx",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:classification",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pattern-recognition",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:behavior-agent",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:financial-calculator",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-calculator",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-agent",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:suggestion-generator",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:catalog-selector",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:checker",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:critical-coverage",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:ai-evaluation",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:weights",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:impact-cand_A012_education",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:scoring",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:robustness",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:decision-engine",
          "eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:explanation"
        ],
        "primarySuggestions": {
          "proposals": [],
          "shortfallReason": "No applicable verified claim supports a specific action.",
          "fallbackReason": "NO_PROPOSALS",
          "criticalCoverageAddedIds": []
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
    }
  },
  "primaryProposals": [],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 361060
    },
    {
      "doc_key": "chat",
      "stored_bytes": 708
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 900
    },
    {
      "doc_key": "chat-request:strong-context",
      "stored_bytes": 1500
    },
    {
      "doc_key": "engine",
      "stored_bytes": 1481492
    },
    {
      "doc_key": "import:6db57a25-dabb-4d4b-865b-56d148bf366b",
      "stored_bytes": 197072
    },
    {
      "doc_key": "import:a2621497-b234-4aff-b41a-003e5f5a97d3",
      "stored_bytes": 88516
    },
    {
      "doc_key": "job-request:2f5b15907c540f4b4d147933731938d019ecf96cb368225188d77b5b2c56c430",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:a7b97b912456d6d33ffdd8bbc0f29fd8fc9acb636f04e45250042904522558b2",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:c0e548fcbd2b1e57463d6afee46a8bbe5f73983a4b0f042b5cdcb5cbee83e8c7",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:7bb53778-0805-4bd6-a33a-69a4895201ff",
      "stored_bytes": 104624
    },
    {
      "doc_key": "job:8aaa151e-5ea1-458a-af07-08f441ad42d8",
      "stored_bytes": 233820
    },
    {
      "doc_key": "job:e4b61fae-ea20-4f57-a53d-a99ffd4a5dda",
      "stored_bytes": 361504
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:ai-evaluation",
      "stored_bytes": 4508
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:behavior-agent",
      "stored_bytes": 4980
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:catalog-selector",
      "stored_bytes": 2732
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:checker",
      "stored_bytes": 5092
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:classification",
      "stored_bytes": 107592
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-agent",
      "stored_bytes": 1636
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:debt-calculator",
      "stored_bytes": 1336
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:decision-engine",
      "stored_bytes": 14964
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:explanation",
      "stored_bytes": 2616
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:financial-calculator",
      "stored_bytes": 15976
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:fx",
      "stored_bytes": 1540
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:impact-cand_A012_education",
      "stored_bytes": 3520
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pattern-recognition",
      "stored_bytes": 72932
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:pi",
      "stored_bytes": 1624
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:robustness",
      "stored_bytes": 2396
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:scoring",
      "stored_bytes": 6728
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:suggestion-generator",
      "stored_bytes": 2460
    },
    {
      "doc_key": "stage:eval_5982129b-0e50-4b0b-8227-00ca2e4e21d3:weights",
      "stored_bytes": 1776
    },
    {
      "doc_key": "state",
      "stored_bytes": 319904
    }
  ]
}
~~~~

## Summary

~~~~text
Advances verified savings goal "Education" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile "goal_advancement", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]
~~~~
