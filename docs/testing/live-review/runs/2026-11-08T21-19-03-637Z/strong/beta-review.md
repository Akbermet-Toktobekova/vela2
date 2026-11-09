# 02 Strong · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations. | — |

Actual Today output: **Allocate EUR 500 toward Education**.

## Input

~~~~json
{
  "request": "POST /api/beta/review",
  "body": {
    "forceRefresh": true
  },
  "version": 4
}
~~~~

## Output

~~~~json
{
  "jobId": "4171b188-3437-4728-a406-a99a107ed519",
  "decision": {
    "evaluationId": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d",
    "snapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
    "snapshotVersion": "4.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "NORMAL",
    "selectedActionId": "A012",
    "selectedActionType": "FINANCIAL_ACTION",
    "candidate": {
      "candidateId": "primary_A012_education",
      "actionId": "A012",
      "actionType": "FINANCIAL_ACTION",
      "title": "Allocate EUR 500 toward Education",
      "description": "Set aside the checked contribution from the selected account toward this goal.",
      "rationale": "Uses the confirmed contribution and funding account.",
      "targetId": "education",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 500,
      "currency": "EUR",
      "proposedTiming": "2026-11-05",
      "supportingRuleIds": [
        "R002",
        "R012"
      ],
      "supportingClaimIds": [],
      "supportingSourceIds": [],
      "requiredPiInputs": [
        "goal_target",
        "goal_balance",
        "available_cash"
      ],
      "origin": "AI_SUGGESTION"
    },
    "title": "Allocate EUR 500 toward Education",
    "description": "Set aside the checked contribution from the selected account toward this goal.",
    "reasoning": "Uses the confirmed contribution and funding account. Selected under weight profile \"goal_advancement\", score S=0.239 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]",
    "expectedEffectSummary": "Goal progress (90d F015): +8.3 percentage points",
    "weightProfileId": "goal_advancement",
    "weights": {
      "resilience": 0.2,
      "financial_benefit": 0.2,
      "goal_progress": 0.6
    },
    "values": {
      "resilience": 0,
      "financial_benefit": 0,
      "goal_progress": 0.4165
    },
    "rawImpacts": {
      "resilienceMonths": 0,
      "financialBenefitCurrency": 0,
      "goalProgressPctPoints": 8.33,
      "annualizedSaving12m": null,
      "debt12mInterestAvoided": null
    },
    "complexity": 0.1125,
    "score": 0.23865,
    "stability": 1,
    "policyVersion": "prototype_policy_bundle_v1.4",
    "sourceIds": [],
    "ruleIds": [
      "R002",
      "R012"
    ],
    "claimIds": [],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": null,
    "missingFields": [],
    "trace": {
      "evaluationId": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d",
      "userId": "6ce9110a-722a-4315-a7ee-7cf967a8ffb3",
      "snapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T21:20:38.128Z",
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
            "candidateId": "primary_A012_education",
            "actionId": "A012",
            "actionType": "FINANCIAL_ACTION",
            "title": "Allocate EUR 500 toward Education",
            "description": "Set aside the checked contribution from the selected account toward this goal.",
            "rationale": "Uses the confirmed contribution and funding account.",
            "targetId": "education",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 500,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R002",
              "R012"
            ],
            "supportingClaimIds": [],
            "supportingSourceIds": [],
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
          "projectedMinCashAfterAction": 8609.39,
          "unlocksActionIds": []
        }
      ],
      "scoredCandidates": [
        {
          "candidate": {
            "candidateId": "primary_A012_education",
            "actionId": "A012",
            "actionType": "FINANCIAL_ACTION",
            "title": "Allocate EUR 500 toward Education",
            "description": "Set aside the checked contribution from the selected account toward this goal.",
            "rationale": "Uses the confirmed contribution and funding account.",
            "targetId": "education",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 500,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R002",
              "R012"
            ],
            "supportingClaimIds": [],
            "supportingSourceIds": [],
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
              "inputSnapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
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
            "candidateId": "primary_A012_education",
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
              "deltaGoalProgressFraction": 0.0833,
              "beforeResilienceMonths": 0,
              "afterResilienceMonths": 0,
              "beforeCost90d": 0,
              "afterCost90d": 0,
              "beforeGoalProgress": 0,
              "afterGoalProgress": 0.0833,
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
              "v_G": 0.4165
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
            "candidateId": "primary_A012_education",
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
          "weightedBenefit": 0.2499,
          "complexityPenalty": 0.01125,
          "finalScore": 0.23865,
          "scoreBreakdown": {
            "wR_vR": 0,
            "wF_vF": 0,
            "wG_vG": 0.2499,
            "lambdaC_cC": 0.01125
          },
          "rank": 1
        }
      ],
      "robustness": {
        "topCandidateId": "primary_A012_education",
        "runnerUpCandidateId": null,
        "baseScore": 0.23865,
        "runnerUpScore": null,
        "scoreMargin": 0.23865,
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
            "winnerCandidateId": "primary_A012_education",
            "winnerScore": 0.2499
          },
          {
            "lambda_C": 0.05,
            "winnerCandidateId": "primary_A012_education",
            "winnerScore": 0.244275
          },
          {
            "lambda_C": 0.1,
            "winnerCandidateId": "primary_A012_education",
            "winnerScore": 0.23865
          },
          {
            "lambda_C": 0.15,
            "winnerCandidateId": "primary_A012_education",
            "winnerScore": 0.233025
          }
        ],
        "tieBreakerApplied": false,
        "tieBreakerReason": null,
        "instabilityReason": "NONE",
        "policyVersion": "robustness_policy_v1_prototype",
        "formulaRef": "F018"
      },
      "selectedCandidate": {
        "candidateId": "primary_A012_education",
        "actionId": "A012",
        "actionType": "FINANCIAL_ACTION",
        "title": "Allocate EUR 500 toward Education",
        "description": "Set aside the checked contribution from the selected account toward this goal.",
        "rationale": "Uses the confirmed contribution and funding account.",
        "targetId": "education",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 500,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R002",
          "R012"
        ],
        "supportingClaimIds": [],
        "supportingSourceIds": [],
        "requiredPiInputs": [
          "goal_target",
          "goal_balance",
          "available_cash"
        ],
        "origin": "AI_SUGGESTION"
      },
      "stageArtifactIds": [
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pi",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:fx",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:classification",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pattern-recognition",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:behavior-agent",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:financial-calculator",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-calculator",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-agent",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:suggestion-generator",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:catalog-selector",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:checker",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:critical-coverage",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:ai-evaluation",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:weights",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:impact-primary_A012_education",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:scoring",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:robustness",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:decision-engine",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review the upcoming energy obligation",
            "description": "Review the unpaid energy obligation energy amounting to 150 EUR due on 2026-11-15.",
            "rationale": "The obligation is currently unpaid and coming due soon.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-2",
            "usefulness": "WEAK",
            "usefulnessReason": "No matching open decision or information gap.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-2"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The review step correctly targets the unpaid energy obligation (obligation-2) due on 2026-11-15 for 150 EUR, which is consistent with the supplied facts and remains read-only.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Allocate the confirmed contribution to the general savings goal",
            "description": "Set aside the contribution recorded in 500 EUR from the confirmed account for the general savings goal.",
            "rationale": "The goal has a confirmed contribution and funding account ready for allocation.",
            "actionId": "A012",
            "intent": "EXECUTE",
            "origin": "MODEL",
            "targetFactId": "goal-1",
            "mappedCandidateId": "primary_A012_education",
            "usefulness": "USEFUL",
            "usefulnessReason": "The checked operation advances its specific financial target.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "goal-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The execution step allocates the confirmed contribution of 500 EUR from account-1 to goal-1, aligning with the data in goal-1 and account-1.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "What dedicated emergency reserve target would you like to protect before funding other goals?",
            "description": "What dedicated emergency reserve target would you like to protect before funding other goals?",
            "rationale": "The emergency reserve target is currently unspecified and needed to properly plan protections.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "financial-metrics",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Desired dedicated emergency reserve target"
            ],
            "factIds": [
              "financial-metrics",
              "data-quality"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Desired dedicated emergency reserve target",
            "evidence": []
          }
        ],
        "shortfallReason": "No cash shortfalls projected for upcoming obligations.",
        "fallbackReason": null,
        "criticalCoverageAddedIds": []
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Uses the confirmed contribution and funding account. (Selected under goal_advancement profile with F017 score 0.2387 and F018 stability 100.0%).",
      "supportingSourceIds": [],
      "supportingRuleIds": [
        "R002",
        "R012"
      ],
      "supportingClaimIds": [],
      "missingDataFields": [],
      "clarificationQuestion": null
    }
  },
  "todayCard": {
    "id": "rec_A012_eval_307bf8dc-14dd-4712-a528-f4648760ac5d",
    "userId": "6ce9110a-722a-4315-a7ee-7cf967a8ffb3",
    "snapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
    "actionType": "allocate_safety_cushion",
    "title": "Allocate EUR 500 toward Education",
    "description": "Set aside the checked contribution from the selected account toward this goal.",
    "reasoning": "Uses the confirmed contribution and funding account. Selected under weight profile \"goal_advancement\", score S=0.239 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]",
    "suggestedAmount": 500,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "education",
    "sourceAccountId": "main",
    "priority": "suggested",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T21:20:38.201Z",
    "updatedAt": "2026-11-08T21:20:38.201Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pi",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:fx",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:classification",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pattern-recognition",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:behavior-agent",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:financial-calculator",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-calculator",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-agent",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:suggestion-generator",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:catalog-selector",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:checker",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:critical-coverage",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:ai-evaluation",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:weights",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:impact-primary_A012_education",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:scoring",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:robustness",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:decision-engine",
        "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:explanation"
      ],
      "evaluationId": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d",
      "userId": "6ce9110a-722a-4315-a7ee-7cf967a8ffb3",
      "snapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T21:20:38.128Z",
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
            "candidateId": "primary_A012_education",
            "actionId": "A012",
            "actionType": "FINANCIAL_ACTION",
            "title": "Allocate EUR 500 toward Education",
            "description": "Set aside the checked contribution from the selected account toward this goal.",
            "rationale": "Uses the confirmed contribution and funding account.",
            "targetId": "education",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 500,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R002",
              "R012"
            ],
            "supportingClaimIds": [],
            "supportingSourceIds": [],
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
          "projectedMinCashAfterAction": 8609.39,
          "unlocksActionIds": []
        }
      ],
      "scoredCandidates": [
        {
          "candidate": {
            "candidateId": "primary_A012_education",
            "actionId": "A012",
            "actionType": "FINANCIAL_ACTION",
            "title": "Allocate EUR 500 toward Education",
            "description": "Set aside the checked contribution from the selected account toward this goal.",
            "rationale": "Uses the confirmed contribution and funding account.",
            "targetId": "education",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 500,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R002",
              "R012"
            ],
            "supportingClaimIds": [],
            "supportingSourceIds": [],
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
              "inputSnapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
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
            "candidateId": "primary_A012_education",
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
              "deltaGoalProgressFraction": 0.0833,
              "beforeResilienceMonths": 0,
              "afterResilienceMonths": 0,
              "beforeCost90d": 0,
              "afterCost90d": 0,
              "beforeGoalProgress": 0,
              "afterGoalProgress": 0.0833,
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
              "v_G": 0.4165
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
            "candidateId": "primary_A012_education",
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
          "weightedBenefit": 0.2499,
          "complexityPenalty": 0.01125,
          "finalScore": 0.23865,
          "scoreBreakdown": {
            "wR_vR": 0,
            "wF_vF": 0,
            "wG_vG": 0.2499,
            "lambdaC_cC": 0.01125
          },
          "rank": 1
        }
      ],
      "robustness": {
        "topCandidateId": "primary_A012_education",
        "runnerUpCandidateId": null,
        "baseScore": 0.23865,
        "runnerUpScore": null,
        "scoreMargin": 0.23865,
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
            "winnerCandidateId": "primary_A012_education",
            "winnerScore": 0.2499
          },
          {
            "lambda_C": 0.05,
            "winnerCandidateId": "primary_A012_education",
            "winnerScore": 0.244275
          },
          {
            "lambda_C": 0.1,
            "winnerCandidateId": "primary_A012_education",
            "winnerScore": 0.23865
          },
          {
            "lambda_C": 0.15,
            "winnerCandidateId": "primary_A012_education",
            "winnerScore": 0.233025
          }
        ],
        "tieBreakerApplied": false,
        "tieBreakerReason": null,
        "instabilityReason": "NONE",
        "policyVersion": "robustness_policy_v1_prototype",
        "formulaRef": "F018"
      },
      "selectedCandidate": {
        "candidateId": "primary_A012_education",
        "actionId": "A012",
        "actionType": "FINANCIAL_ACTION",
        "title": "Allocate EUR 500 toward Education",
        "description": "Set aside the checked contribution from the selected account toward this goal.",
        "rationale": "Uses the confirmed contribution and funding account.",
        "targetId": "education",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 500,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R002",
          "R012"
        ],
        "supportingClaimIds": [],
        "supportingSourceIds": [],
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
            "title": "Review the upcoming energy obligation",
            "description": "Review the unpaid energy obligation energy amounting to 150 EUR due on 2026-11-15.",
            "rationale": "The obligation is currently unpaid and coming due soon.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-2",
            "usefulness": "WEAK",
            "usefulnessReason": "No matching open decision or information gap.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-2"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The review step correctly targets the unpaid energy obligation (obligation-2) due on 2026-11-15 for 150 EUR, which is consistent with the supplied facts and remains read-only.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Allocate the confirmed contribution to the general savings goal",
            "description": "Set aside the contribution recorded in 500 EUR from the confirmed account for the general savings goal.",
            "rationale": "The goal has a confirmed contribution and funding account ready for allocation.",
            "actionId": "A012",
            "intent": "EXECUTE",
            "origin": "MODEL",
            "targetFactId": "goal-1",
            "mappedCandidateId": "primary_A012_education",
            "usefulness": "USEFUL",
            "usefulnessReason": "The checked operation advances its specific financial target.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "goal-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The execution step allocates the confirmed contribution of 500 EUR from account-1 to goal-1, aligning with the data in goal-1 and account-1.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "What dedicated emergency reserve target would you like to protect before funding other goals?",
            "description": "What dedicated emergency reserve target would you like to protect before funding other goals?",
            "rationale": "The emergency reserve target is currently unspecified and needed to properly plan protections.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "financial-metrics",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Desired dedicated emergency reserve target"
            ],
            "factIds": [
              "financial-metrics",
              "data-quality"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Desired dedicated emergency reserve target",
            "evidence": []
          }
        ],
        "shortfallReason": "No cash shortfalls projected for upcoming obligations.",
        "fallbackReason": null,
        "criticalCoverageAddedIds": []
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Uses the confirmed contribution and funding account. (Selected under goal_advancement profile with F017 score 0.2387 and F018 stability 100.0%).",
      "supportingSourceIds": [],
      "supportingRuleIds": [
        "R002",
        "R012"
      ],
      "supportingClaimIds": [],
      "missingDataFields": [],
      "clarificationQuestion": null
    },
    "decision": {
      "evaluationId": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d",
      "snapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
      "snapshotVersion": "4.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "NORMAL",
      "selectedActionId": "A012",
      "selectedActionType": "FINANCIAL_ACTION",
      "candidate": {
        "candidateId": "primary_A012_education",
        "actionId": "A012",
        "actionType": "FINANCIAL_ACTION",
        "title": "Allocate EUR 500 toward Education",
        "description": "Set aside the checked contribution from the selected account toward this goal.",
        "rationale": "Uses the confirmed contribution and funding account.",
        "targetId": "education",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 500,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R002",
          "R012"
        ],
        "supportingClaimIds": [],
        "supportingSourceIds": [],
        "requiredPiInputs": [
          "goal_target",
          "goal_balance",
          "available_cash"
        ],
        "origin": "AI_SUGGESTION"
      },
      "title": "Allocate EUR 500 toward Education",
      "description": "Set aside the checked contribution from the selected account toward this goal.",
      "reasoning": "Uses the confirmed contribution and funding account. Selected under weight profile \"goal_advancement\", score S=0.239 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]",
      "expectedEffectSummary": "Goal progress (90d F015): +8.3 percentage points",
      "weightProfileId": "goal_advancement",
      "weights": {
        "resilience": 0.2,
        "financial_benefit": 0.2,
        "goal_progress": 0.6
      },
      "values": {
        "resilience": 0,
        "financial_benefit": 0,
        "goal_progress": 0.4165
      },
      "rawImpacts": {
        "resilienceMonths": 0,
        "financialBenefitCurrency": 0,
        "goalProgressPctPoints": 8.33,
        "annualizedSaving12m": null,
        "debt12mInterestAvoided": null
      },
      "complexity": 0.1125,
      "score": 0.23865,
      "stability": 1,
      "policyVersion": "prototype_policy_bundle_v1.4",
      "sourceIds": [],
      "ruleIds": [
        "R002",
        "R012"
      ],
      "claimIds": [],
      "dataQualityStatus": "PROTOTYPE_POLICY",
      "clarificationQuestion": null,
      "missingFields": [],
      "trace": {
        "evaluationId": "eval_307bf8dc-14dd-4712-a528-f4648760ac5d",
        "userId": "6ce9110a-722a-4315-a7ee-7cf967a8ffb3",
        "snapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
        "snapshotVersion": "4.0",
        "createdAt": "2026-11-08T21:20:38.128Z",
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
              "candidateId": "primary_A012_education",
              "actionId": "A012",
              "actionType": "FINANCIAL_ACTION",
              "title": "Allocate EUR 500 toward Education",
              "description": "Set aside the checked contribution from the selected account toward this goal.",
              "rationale": "Uses the confirmed contribution and funding account.",
              "targetId": "education",
              "sourceAccountId": "main",
              "destinationAccountId": null,
              "amount": 500,
              "currency": "EUR",
              "proposedTiming": "2026-11-05",
              "supportingRuleIds": [
                "R002",
                "R012"
              ],
              "supportingClaimIds": [],
              "supportingSourceIds": [],
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
            "projectedMinCashAfterAction": 8609.39,
            "unlocksActionIds": []
          }
        ],
        "scoredCandidates": [
          {
            "candidate": {
              "candidateId": "primary_A012_education",
              "actionId": "A012",
              "actionType": "FINANCIAL_ACTION",
              "title": "Allocate EUR 500 toward Education",
              "description": "Set aside the checked contribution from the selected account toward this goal.",
              "rationale": "Uses the confirmed contribution and funding account.",
              "targetId": "education",
              "sourceAccountId": "main",
              "destinationAccountId": null,
              "amount": 500,
              "currency": "EUR",
              "proposedTiming": "2026-11-05",
              "supportingRuleIds": [
                "R002",
                "R012"
              ],
              "supportingClaimIds": [],
              "supportingSourceIds": [],
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
                "inputSnapshotId": "snap_beta_6ce9110a-722a-4315-a7ee-7cf967a8ffb3_v4_74d5e18a569b2675",
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
              "candidateId": "primary_A012_education",
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
                "deltaGoalProgressFraction": 0.0833,
                "beforeResilienceMonths": 0,
                "afterResilienceMonths": 0,
                "beforeCost90d": 0,
                "afterCost90d": 0,
                "beforeGoalProgress": 0,
                "afterGoalProgress": 0.0833,
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
                "v_G": 0.4165
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
              "candidateId": "primary_A012_education",
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
            "weightedBenefit": 0.2499,
            "complexityPenalty": 0.01125,
            "finalScore": 0.23865,
            "scoreBreakdown": {
              "wR_vR": 0,
              "wF_vF": 0,
              "wG_vG": 0.2499,
              "lambdaC_cC": 0.01125
            },
            "rank": 1
          }
        ],
        "robustness": {
          "topCandidateId": "primary_A012_education",
          "runnerUpCandidateId": null,
          "baseScore": 0.23865,
          "runnerUpScore": null,
          "scoreMargin": 0.23865,
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
              "winnerCandidateId": "primary_A012_education",
              "winnerScore": 0.2499
            },
            {
              "lambda_C": 0.05,
              "winnerCandidateId": "primary_A012_education",
              "winnerScore": 0.244275
            },
            {
              "lambda_C": 0.1,
              "winnerCandidateId": "primary_A012_education",
              "winnerScore": 0.23865
            },
            {
              "lambda_C": 0.15,
              "winnerCandidateId": "primary_A012_education",
              "winnerScore": 0.233025
            }
          ],
          "tieBreakerApplied": false,
          "tieBreakerReason": null,
          "instabilityReason": "NONE",
          "policyVersion": "robustness_policy_v1_prototype",
          "formulaRef": "F018"
        },
        "selectedCandidate": {
          "candidateId": "primary_A012_education",
          "actionId": "A012",
          "actionType": "FINANCIAL_ACTION",
          "title": "Allocate EUR 500 toward Education",
          "description": "Set aside the checked contribution from the selected account toward this goal.",
          "rationale": "Uses the confirmed contribution and funding account.",
          "targetId": "education",
          "sourceAccountId": "main",
          "destinationAccountId": null,
          "amount": 500,
          "currency": "EUR",
          "proposedTiming": "2026-11-05",
          "supportingRuleIds": [
            "R002",
            "R012"
          ],
          "supportingClaimIds": [],
          "supportingSourceIds": [],
          "requiredPiInputs": [
            "goal_target",
            "goal_balance",
            "available_cash"
          ],
          "origin": "AI_SUGGESTION"
        },
        "stageArtifactIds": [
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pi",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:fx",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:classification",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pattern-recognition",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:behavior-agent",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:financial-calculator",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-calculator",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-agent",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:suggestion-generator",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:catalog-selector",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:checker",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:critical-coverage",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:ai-evaluation",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:weights",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:impact-primary_A012_education",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:scoring",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:robustness",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:decision-engine",
          "eval_307bf8dc-14dd-4712-a528-f4648760ac5d:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review the upcoming energy obligation",
              "description": "Review the unpaid energy obligation energy amounting to 150 EUR due on 2026-11-15.",
              "rationale": "The obligation is currently unpaid and coming due soon.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "obligation-2",
              "usefulness": "WEAK",
              "usefulnessReason": "No matching open decision or information gap.",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-2"
              ],
              "claimIds": [],
              "status": "VALID",
              "reason": "The review step correctly targets the unpaid energy obligation (obligation-2) due on 2026-11-15 for 150 EUR, which is consistent with the supplied facts and remains read-only.",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Allocate the confirmed contribution to the general savings goal",
              "description": "Set aside the contribution recorded in 500 EUR from the confirmed account for the general savings goal.",
              "rationale": "The goal has a confirmed contribution and funding account ready for allocation.",
              "actionId": "A012",
              "intent": "EXECUTE",
              "origin": "MODEL",
              "targetFactId": "goal-1",
              "mappedCandidateId": "primary_A012_education",
              "usefulness": "USEFUL",
              "usefulnessReason": "The checked operation advances its specific financial target.",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "goal-1",
                "account-1"
              ],
              "claimIds": [],
              "status": "VALID",
              "reason": "The execution step allocates the confirmed contribution of 500 EUR from account-1 to goal-1, aligning with the data in goal-1 and account-1.",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "What dedicated emergency reserve target would you like to protect before funding other goals?",
              "description": "What dedicated emergency reserve target would you like to protect before funding other goals?",
              "rationale": "The emergency reserve target is currently unspecified and needed to properly plan protections.",
              "actionId": null,
              "intent": "CLARIFY",
              "origin": "MODEL",
              "targetFactId": "financial-metrics",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Desired dedicated emergency reserve target"
              ],
              "factIds": [
                "financial-metrics",
                "data-quality"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Desired dedicated emergency reserve target",
              "evidence": []
            }
          ],
          "shortfallReason": "No cash shortfalls projected for upcoming obligations.",
          "fallbackReason": null,
          "criticalCoverageAddedIds": []
        },
        "selectedActionType": "FINANCIAL_ACTION",
        "decisionStatus": "RECOMMENDATION_READY",
        "decisionReason": "Uses the confirmed contribution and funding account. (Selected under goal_advancement profile with F017 score 0.2387 and F018 stability 100.0%).",
        "supportingSourceIds": [],
        "supportingRuleIds": [
          "R002",
          "R012"
        ],
        "supportingClaimIds": [],
        "missingDataFields": [],
        "clarificationQuestion": null
      }
    }
  },
  "primaryProposals": [
    {
      "id": "primary-1",
      "title": "Review the upcoming energy obligation",
      "description": "Review the unpaid energy obligation energy amounting to 150 EUR due on 2026-11-15.",
      "rationale": "The obligation is currently unpaid and coming due soon.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "obligation-2",
      "usefulness": "WEAK",
      "usefulnessReason": "No matching open decision or information gap.",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-2"
      ],
      "claimIds": [],
      "status": "VALID",
      "reason": "The review step correctly targets the unpaid energy obligation (obligation-2) due on 2026-11-15 for 150 EUR, which is consistent with the supplied facts and remains read-only.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Allocate the confirmed contribution to the general savings goal",
      "description": "Set aside the contribution recorded in 500 EUR from the confirmed account for the general savings goal.",
      "rationale": "The goal has a confirmed contribution and funding account ready for allocation.",
      "actionId": "A012",
      "intent": "EXECUTE",
      "origin": "MODEL",
      "targetFactId": "goal-1",
      "mappedCandidateId": "primary_A012_education",
      "usefulness": "USEFUL",
      "usefulnessReason": "The checked operation advances its specific financial target.",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "goal-1",
        "account-1"
      ],
      "claimIds": [],
      "status": "VALID",
      "reason": "The execution step allocates the confirmed contribution of 500 EUR from account-1 to goal-1, aligning with the data in goal-1 and account-1.",
      "evidence": [],
      "score": 0.23865,
      "selected": true
    },
    {
      "id": "primary-3",
      "title": "What dedicated emergency reserve target would you like to protect before funding other goals?",
      "description": "What dedicated emergency reserve target would you like to protect before funding other goals?",
      "rationale": "The emergency reserve target is currently unspecified and needed to properly plan protections.",
      "actionId": null,
      "intent": "CLARIFY",
      "origin": "MODEL",
      "targetFactId": "financial-metrics",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Desired dedicated emergency reserve target"
      ],
      "factIds": [
        "financial-metrics",
        "data-quality"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Desired dedicated emergency reserve target",
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 366068
    },
    {
      "doc_key": "chat",
      "stored_bytes": 996
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 876
    },
    {
      "doc_key": "chat-request:strong-context",
      "stored_bytes": 2080
    },
    {
      "doc_key": "engine",
      "stored_bytes": 1489916
    },
    {
      "doc_key": "import:117f438f-c640-411f-8bf1-c14270305f97",
      "stored_bytes": 197072
    },
    {
      "doc_key": "import:ce57a1df-b112-4eb4-81bc-1ec068488cc5",
      "stored_bytes": 88516
    },
    {
      "doc_key": "job-request:20e48c850350156e9ebb5e7f0e2b4a6c05a882ed7e68cd109befc8b1e05cf07c",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:27fba0261ff09a844b3e58be7e18aedc40a403784b0bcc1b3b347ebef830dc3c",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:883273b8f2293b3c98ed3c0afe1a5bf6ae368b7b58bc7ffcfcb570fce582e009",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:4171b188-3437-4728-a406-a99a107ed519",
      "stored_bytes": 366512
    },
    {
      "doc_key": "job:93e82a2e-207a-4ddf-8669-18a1fa9437cb",
      "stored_bytes": 104624
    },
    {
      "doc_key": "job:d0627d99-054d-48d9-bb70-6a3f2115b10a",
      "stored_bytes": 233820
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:ai-evaluation",
      "stored_bytes": 4504
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:behavior-agent",
      "stored_bytes": 5004
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:catalog-selector",
      "stored_bytes": 1656
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:checker",
      "stored_bytes": 8028
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:classification",
      "stored_bytes": 107328
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-agent",
      "stored_bytes": 1636
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:debt-calculator",
      "stored_bytes": 1336
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:decision-engine",
      "stored_bytes": 14096
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:explanation",
      "stored_bytes": 2368
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:financial-calculator",
      "stored_bytes": 17972
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:fx",
      "stored_bytes": 1540
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:impact-primary_A012_education",
      "stored_bytes": 3540
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pattern-recognition",
      "stored_bytes": 71532
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:pi",
      "stored_bytes": 1624
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:robustness",
      "stored_bytes": 2424
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:scoring",
      "stored_bytes": 6600
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:suggestion-generator",
      "stored_bytes": 4456
    },
    {
      "doc_key": "stage:eval_307bf8dc-14dd-4712-a528-f4648760ac5d:weights",
      "stored_bytes": 1776
    },
    {
      "doc_key": "state",
      "stored_bytes": 320192
    }
  ]
}
~~~~

## Summary

~~~~text
Uses the confirmed contribution and funding account. Selected under weight profile "goal_advancement", score S=0.239 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]
~~~~
