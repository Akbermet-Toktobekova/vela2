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
  "jobId": "d2d3428b-36b4-4509-ace8-f7ad10a0b4cb",
  "decision": {
    "evaluationId": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1",
    "snapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
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
      "evaluationId": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1",
      "userId": "8cf73310-831a-4b71-b906-f5c529550476",
      "snapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:25:07.384Z",
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
        "triggerReason": "Coverage M = 5.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
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
              "inputSnapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
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
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pi",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:fx",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:classification",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pattern-recognition",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:behavior-agent",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:financial-calculator",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-calculator",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-agent",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:suggestion-generator",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:catalog-selector",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:checker",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:critical-coverage",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:ai-evaluation",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:weights",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:impact-cand_A012_education",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:scoring",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:robustness",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:decision-engine",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review unpaid energy obligation",
            "description": "Review the upcoming unpaid energy obligation of 150 EUR due on 2026-11-15.",
            "rationale": "Obligation-2 is currently unpaid and due soon.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-2",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-2",
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review unpaid other obligation",
            "description": "Review the unpaid other obligation of 250 EUR due on 2026-11-20.",
            "rationale": "Obligation-3 is currently unpaid and due in November.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-3",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-3",
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Review unpaid rent obligation",
            "description": "Review the upcoming unpaid rent obligation of 1100 EUR due on 2026-12-01.",
            "rationale": "Obligation-4 is currently unpaid and scheduled for December 2026.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-4",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-4",
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          }
        ],
        "shortfallReason": "",
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
    "id": "rec_A012_eval_399c86a0-d345-4365-b35f-3e5d59e7deb1",
    "userId": "8cf73310-831a-4b71-b906-f5c529550476",
    "snapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
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
    "createdAt": "2026-11-08T15:25:07.430Z",
    "updatedAt": "2026-11-08T15:25:07.430Z"
  },
  "trace": {
    "trace": {
      "evaluationId": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1",
      "userId": "8cf73310-831a-4b71-b906-f5c529550476",
      "snapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:25:07.384Z",
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
        "triggerReason": "Coverage M = 5.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
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
              "inputSnapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
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
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pi",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:fx",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:classification",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pattern-recognition",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:behavior-agent",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:financial-calculator",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-calculator",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-agent",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:suggestion-generator",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:catalog-selector",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:checker",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:critical-coverage",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:ai-evaluation",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:weights",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:impact-cand_A012_education",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:scoring",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:robustness",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:decision-engine",
        "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review unpaid energy obligation",
            "description": "Review the upcoming unpaid energy obligation of 150 EUR due on 2026-11-15.",
            "rationale": "Obligation-2 is currently unpaid and due soon.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-2",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-2",
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review unpaid other obligation",
            "description": "Review the unpaid other obligation of 250 EUR due on 2026-11-20.",
            "rationale": "Obligation-3 is currently unpaid and due in November.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-3",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-3",
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Review unpaid rent obligation",
            "description": "Review the upcoming unpaid rent obligation of 1100 EUR due on 2026-12-01.",
            "rationale": "Obligation-4 is currently unpaid and scheduled for December 2026.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-4",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-4",
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          }
        ],
        "shortfallReason": "",
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
      "evaluationId": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1",
      "snapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
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
        "evaluationId": "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1",
        "userId": "8cf73310-831a-4b71-b906-f5c529550476",
        "snapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
        "snapshotVersion": "3.0",
        "createdAt": "2026-11-08T15:25:07.384Z",
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
          "triggerReason": "Coverage M = 5.34 months is sufficient, no high-APR debt is accruing, and goal 'Education' is active and unfulfilled.",
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
                "inputSnapshotId": "snap_beta_8cf73310-831a-4b71-b906-f5c529550476_v3_36d1f3031d8058e4",
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
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pi",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:fx",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:classification",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pattern-recognition",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:behavior-agent",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:financial-calculator",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-calculator",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-agent",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:suggestion-generator",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:catalog-selector",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:checker",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:critical-coverage",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:ai-evaluation",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:weights",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:impact-cand_A012_education",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:scoring",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:robustness",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:decision-engine",
          "eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review unpaid energy obligation",
              "description": "Review the upcoming unpaid energy obligation of 150 EUR due on 2026-11-15.",
              "rationale": "Obligation-2 is currently unpaid and due soon.",
              "actionId": null,
              "intent": "REVIEW",
              "targetFactId": "obligation-2",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-2",
                "account-1"
              ],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Unverified or unknown AS reference.",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Review unpaid other obligation",
              "description": "Review the unpaid other obligation of 250 EUR due on 2026-11-20.",
              "rationale": "Obligation-3 is currently unpaid and due in November.",
              "actionId": null,
              "intent": "REVIEW",
              "targetFactId": "obligation-3",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-3",
                "account-1"
              ],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Unverified or unknown AS reference.",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "Review unpaid rent obligation",
              "description": "Review the upcoming unpaid rent obligation of 1100 EUR due on 2026-12-01.",
              "rationale": "Obligation-4 is currently unpaid and scheduled for December 2026.",
              "actionId": null,
              "intent": "REVIEW",
              "targetFactId": "obligation-4",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-4",
                "account-1"
              ],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Unverified or unknown AS reference.",
              "evidence": []
            }
          ],
          "shortfallReason": "",
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
      "title": "Review unpaid energy obligation",
      "description": "Review the upcoming unpaid energy obligation of 150 EUR due on 2026-11-15.",
      "rationale": "Obligation-2 is currently unpaid and due soon.",
      "actionId": null,
      "intent": "REVIEW",
      "targetFactId": "obligation-2",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-2",
        "account-1"
      ],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Review unpaid other obligation",
      "description": "Review the unpaid other obligation of 250 EUR due on 2026-11-20.",
      "rationale": "Obligation-3 is currently unpaid and due in November.",
      "actionId": null,
      "intent": "REVIEW",
      "targetFactId": "obligation-3",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-3",
        "account-1"
      ],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Review unpaid rent obligation",
      "description": "Review the upcoming unpaid rent obligation of 1100 EUR due on 2026-12-01.",
      "rationale": "Obligation-4 is currently unpaid and scheduled for December 2026.",
      "actionId": null,
      "intent": "REVIEW",
      "targetFactId": "obligation-4",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-4",
        "account-1"
      ],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference.",
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 363668
    },
    {
      "doc_key": "chat",
      "stored_bytes": 1320
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 900
    },
    {
      "doc_key": "chat-request:strong-context",
      "stored_bytes": 2728
    },
    {
      "doc_key": "engine",
      "stored_bytes": 1489088
    },
    {
      "doc_key": "import:7defce82-b9f5-43e6-bc1e-e699c1b92f68",
      "stored_bytes": 88516
    },
    {
      "doc_key": "import:fa08327d-75c0-415a-bce8-f2fef0f02e64",
      "stored_bytes": 197072
    },
    {
      "doc_key": "job-request:6d2d2adffe120660d8a14ac33f05a29f43636b9bbd00009020dad49dfab1b79b",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:6db08378becfdbcb362eb1d317d32c15253ad99ea81f1b8f88e71a49a91bff21",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:b23efa48af718e5c54687f3f4b3ef36fbc6d67d1dc88bcc6ac8751644df187d1",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:2745ca12-745e-4d2a-aafc-4ed0c4ab5660",
      "stored_bytes": 104624
    },
    {
      "doc_key": "job:84c35e8f-b005-4fb0-b35e-79b734ade992",
      "stored_bytes": 233820
    },
    {
      "doc_key": "job:d2d3428b-36b4-4509-ace8-f7ad10a0b4cb",
      "stored_bytes": 364112
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:ai-evaluation",
      "stored_bytes": 4496
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:behavior-agent",
      "stored_bytes": 5608
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:catalog-selector",
      "stored_bytes": 2732
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:checker",
      "stored_bytes": 6892
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:classification",
      "stored_bytes": 107288
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-agent",
      "stored_bytes": 1636
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:debt-calculator",
      "stored_bytes": 1336
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:decision-engine",
      "stored_bytes": 14964
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:explanation",
      "stored_bytes": 2616
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:financial-calculator",
      "stored_bytes": 15976
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:fx",
      "stored_bytes": 1540
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:impact-cand_A012_education",
      "stored_bytes": 3520
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pattern-recognition",
      "stored_bytes": 73736
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:pi",
      "stored_bytes": 1624
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:robustness",
      "stored_bytes": 2396
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:scoring",
      "stored_bytes": 6728
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:suggestion-generator",
      "stored_bytes": 3656
    },
    {
      "doc_key": "stage:eval_399c86a0-d345-4365-b35f-3e5d59e7deb1:weights",
      "stored_bytes": 1776
    },
    {
      "doc_key": "state",
      "stored_bytes": 319048
    }
  ]
}
~~~~

## Summary

~~~~text
Advances verified savings goal "Education" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile "goal_advancement", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]
~~~~
