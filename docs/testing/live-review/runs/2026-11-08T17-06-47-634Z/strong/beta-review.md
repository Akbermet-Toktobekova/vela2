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
  "jobId": "ff20713e-57ce-45d7-ac31-97442b108b39",
  "decision": {
    "evaluationId": "eval_fd532315-85a6-4bc1-a4da-229f74121549",
    "snapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
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
      "evaluationId": "eval_fd532315-85a6-4bc1-a4da-229f74121549",
      "userId": "8527a9a5-f83e-4fef-8d92-9342e4c57302",
      "snapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T17:26:16.512Z",
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
              "inputSnapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
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
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:pi",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:fx",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:classification",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:pattern-recognition",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:behavior-agent",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:financial-calculator",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:debt-calculator",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:debt-agent",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:suggestion-generator",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:catalog-selector",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:checker",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:critical-coverage",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:ai-evaluation",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:weights",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:impact-cand_A012_education",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:scoring",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:robustness",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:decision-engine",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Malformed proposal",
            "description": "",
            "rationale": "",
            "actionId": null,
            "origin": "MODEL",
            "factIds": [],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Malformed proposal: missingInfo.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Malformed proposal",
            "description": "",
            "rationale": "",
            "actionId": null,
            "origin": "MODEL",
            "factIds": [],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Malformed proposal: missingInfo.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Malformed proposal",
            "description": "",
            "rationale": "",
            "actionId": null,
            "origin": "MODEL",
            "factIds": [],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Malformed proposal: missingInfo.",
            "evidence": []
          }
        ],
        "shortfallReason": "Insufficient verified claims to support specific execution of financial transfers or goal funding; current data requires clarification on unpaid obligations and goal allocation.",
        "fallbackReason": "NO_VALID_PRIMARY",
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
    "id": "rec_A012_eval_fd532315-85a6-4bc1-a4da-229f74121549",
    "userId": "8527a9a5-f83e-4fef-8d92-9342e4c57302",
    "snapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
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
    "createdAt": "2026-11-08T17:26:16.768Z",
    "updatedAt": "2026-11-08T17:26:16.768Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:pi",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:fx",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:classification",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:pattern-recognition",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:behavior-agent",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:financial-calculator",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:debt-calculator",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:debt-agent",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:suggestion-generator",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:catalog-selector",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:checker",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:critical-coverage",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:ai-evaluation",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:weights",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:impact-cand_A012_education",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:scoring",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:robustness",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:decision-engine",
        "eval_fd532315-85a6-4bc1-a4da-229f74121549:explanation"
      ],
      "evaluationId": "eval_fd532315-85a6-4bc1-a4da-229f74121549",
      "userId": "8527a9a5-f83e-4fef-8d92-9342e4c57302",
      "snapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T17:26:16.512Z",
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
              "inputSnapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
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
        "proposals": [
          {
            "id": "primary-1",
            "title": "Malformed proposal",
            "description": "",
            "rationale": "",
            "actionId": null,
            "origin": "MODEL",
            "factIds": [],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Malformed proposal: missingInfo.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Malformed proposal",
            "description": "",
            "rationale": "",
            "actionId": null,
            "origin": "MODEL",
            "factIds": [],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Malformed proposal: missingInfo.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Malformed proposal",
            "description": "",
            "rationale": "",
            "actionId": null,
            "origin": "MODEL",
            "factIds": [],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Malformed proposal: missingInfo.",
            "evidence": []
          }
        ],
        "shortfallReason": "Insufficient verified claims to support specific execution of financial transfers or goal funding; current data requires clarification on unpaid obligations and goal allocation.",
        "fallbackReason": "NO_VALID_PRIMARY",
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
      "evaluationId": "eval_fd532315-85a6-4bc1-a4da-229f74121549",
      "snapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
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
        "evaluationId": "eval_fd532315-85a6-4bc1-a4da-229f74121549",
        "userId": "8527a9a5-f83e-4fef-8d92-9342e4c57302",
        "snapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
        "snapshotVersion": "3.0",
        "createdAt": "2026-11-08T17:26:16.512Z",
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
                "inputSnapshotId": "snap_beta_8527a9a5-f83e-4fef-8d92-9342e4c57302_v3_f3bbf79584e7d3fd",
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
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:pi",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:fx",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:classification",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:pattern-recognition",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:behavior-agent",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:financial-calculator",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:debt-calculator",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:debt-agent",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:suggestion-generator",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:catalog-selector",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:checker",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:critical-coverage",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:ai-evaluation",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:weights",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:impact-cand_A012_education",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:scoring",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:robustness",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:decision-engine",
          "eval_fd532315-85a6-4bc1-a4da-229f74121549:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Malformed proposal",
              "description": "",
              "rationale": "",
              "actionId": null,
              "origin": "MODEL",
              "factIds": [],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Malformed proposal: missingInfo.",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Malformed proposal",
              "description": "",
              "rationale": "",
              "actionId": null,
              "origin": "MODEL",
              "factIds": [],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Malformed proposal: missingInfo.",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "Malformed proposal",
              "description": "",
              "rationale": "",
              "actionId": null,
              "origin": "MODEL",
              "factIds": [],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Malformed proposal: missingInfo.",
              "evidence": []
            }
          ],
          "shortfallReason": "Insufficient verified claims to support specific execution of financial transfers or goal funding; current data requires clarification on unpaid obligations and goal allocation.",
          "fallbackReason": "NO_VALID_PRIMARY",
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
  "primaryProposals": [
    {
      "id": "primary-1",
      "title": "Malformed proposal",
      "description": "",
      "rationale": "",
      "actionId": null,
      "origin": "MODEL",
      "factIds": [],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Malformed proposal: missingInfo.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Malformed proposal",
      "description": "",
      "rationale": "",
      "actionId": null,
      "origin": "MODEL",
      "factIds": [],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Malformed proposal: missingInfo.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Malformed proposal",
      "description": "",
      "rationale": "",
      "actionId": null,
      "origin": "MODEL",
      "factIds": [],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Malformed proposal: missingInfo.",
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 366664
    },
    {
      "doc_key": "chat",
      "stored_bytes": 560
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 872
    },
    {
      "doc_key": "chat-request:strong-context",
      "stored_bytes": 1256
    },
    {
      "doc_key": "engine",
      "stored_bytes": 1485044
    },
    {
      "doc_key": "import:6a63f48c-c931-48e9-8462-ce0cc677f056",
      "stored_bytes": 197072
    },
    {
      "doc_key": "import:b9c8a75f-a8a2-4aee-9b25-394e50a155b4",
      "stored_bytes": 88516
    },
    {
      "doc_key": "job-request:6e3abad9be19e87c3d16dc232d63219f36f78eabe62a5782bb8807b77c1dc994",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:7aed86e8c5f2a3bbb0bf75aed0e9f29ba4070bc5dd7781df3ab64476e644f035",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:b52debc624fec7a497fa13cbf43e500cb0fe819118940f61c7187de5de6862e7",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:b0c4ba86-48a9-4a91-94c9-d4b0d561f4fe",
      "stored_bytes": 233820
    },
    {
      "doc_key": "job:b660ddfd-6eb3-4f09-a5ac-ebf58ac656e1",
      "stored_bytes": 104624
    },
    {
      "doc_key": "job:ff20713e-57ce-45d7-ac31-97442b108b39",
      "stored_bytes": 367108
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:ai-evaluation",
      "stored_bytes": 4492
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:behavior-agent",
      "stored_bytes": 2964
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:catalog-selector",
      "stored_bytes": 2848
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:checker",
      "stored_bytes": 5960
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:classification",
      "stored_bytes": 119128
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:debt-agent",
      "stored_bytes": 1636
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:debt-calculator",
      "stored_bytes": 1336
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:decision-engine",
      "stored_bytes": 14964
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:explanation",
      "stored_bytes": 2616
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:financial-calculator",
      "stored_bytes": 15976
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:fx",
      "stored_bytes": 1540
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:impact-cand_A012_education",
      "stored_bytes": 3520
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:pattern-recognition",
      "stored_bytes": 66072
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:pi",
      "stored_bytes": 1624
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:robustness",
      "stored_bytes": 2396
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:scoring",
      "stored_bytes": 6728
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:suggestion-generator",
      "stored_bytes": 5028
    },
    {
      "doc_key": "stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:weights",
      "stored_bytes": 1776
    },
    {
      "doc_key": "state",
      "stored_bytes": 323076
    }
  ]
}
~~~~

## Summary

~~~~text
Advances verified savings goal "Education" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile "goal_advancement", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]
~~~~
