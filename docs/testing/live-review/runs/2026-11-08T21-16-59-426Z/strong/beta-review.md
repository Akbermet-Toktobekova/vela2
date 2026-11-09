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
  "jobId": "3d27b2d1-f1ab-496d-a980-c48af523b8cf",
  "decision": {
    "evaluationId": "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a",
    "snapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
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
      "evaluationId": "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a",
      "userId": "c28320db-bd6b-4600-b627-b0f8730fad24",
      "snapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T21:18:44.304Z",
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
              "inputSnapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
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
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:pi",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:fx",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:classification",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:pattern-recognition",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:behavior-agent",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:financial-calculator",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:debt-calculator",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:debt-agent",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:suggestion-generator",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:catalog-selector",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:checker",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:critical-coverage",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:ai-evaluation",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:weights",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:impact-cand_A012_education",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:scoring",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:robustness",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:decision-engine",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review upcoming energy obligation status and timing",
            "description": "Review the unpaid energy obligation energy of 150 EUR due on 2026-11-15 against liquid balances.",
            "rationale": "Verifies that sufficient liquidity covers the upcoming energy obligation.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-2",
            "usefulness": "WEAK",
            "usefulnessReason": "No matching open decision or information gap.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-2",
              "account-1"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The proposal asks to review the unpaid energy obligation of 150 EUR due on 2026-11-15 against liquid balances. This matches the data in obligation-2 and account-1, and is a safe read-only review.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Intended contribution to goal-1",
            "description": "What amount, if any, do you intend to allocate toward this goal and when?",
            "rationale": "Clarifies the intended contribution amount and schedule for the savings goal.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "goal-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Intended contribution to goal-1"
            ],
            "factIds": [
              "goal-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Intended contribution to goal-1",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Preferred funding account for goal-1",
            "description": "Which account and currency, if any, would you prefer to use for this goal?",
            "rationale": "Identifies the preferred funding source for allocations toward the savings goal.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "goal-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Preferred funding account for goal-1"
            ],
            "factIds": [
              "goal-1",
              "account-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Preferred funding account for goal-1",
            "evidence": []
          }
        ],
        "shortfallReason": "",
        "fallbackReason": "NO_USEFUL_PRIMARY",
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
    "id": "rec_A012_eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a",
    "userId": "c28320db-bd6b-4600-b627-b0f8730fad24",
    "snapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
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
    "createdAt": "2026-11-08T21:18:44.474Z",
    "updatedAt": "2026-11-08T21:18:44.474Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:pi",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:fx",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:classification",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:pattern-recognition",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:behavior-agent",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:financial-calculator",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:debt-calculator",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:debt-agent",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:suggestion-generator",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:catalog-selector",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:checker",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:critical-coverage",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:ai-evaluation",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:weights",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:impact-cand_A012_education",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:scoring",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:robustness",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:decision-engine",
        "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:explanation"
      ],
      "evaluationId": "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a",
      "userId": "c28320db-bd6b-4600-b627-b0f8730fad24",
      "snapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T21:18:44.304Z",
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
              "inputSnapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
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
            "title": "Review upcoming energy obligation status and timing",
            "description": "Review the unpaid energy obligation energy of 150 EUR due on 2026-11-15 against liquid balances.",
            "rationale": "Verifies that sufficient liquidity covers the upcoming energy obligation.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-2",
            "usefulness": "WEAK",
            "usefulnessReason": "No matching open decision or information gap.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-2",
              "account-1"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The proposal asks to review the unpaid energy obligation of 150 EUR due on 2026-11-15 against liquid balances. This matches the data in obligation-2 and account-1, and is a safe read-only review.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Intended contribution to goal-1",
            "description": "What amount, if any, do you intend to allocate toward this goal and when?",
            "rationale": "Clarifies the intended contribution amount and schedule for the savings goal.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "goal-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Intended contribution to goal-1"
            ],
            "factIds": [
              "goal-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Intended contribution to goal-1",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Preferred funding account for goal-1",
            "description": "Which account and currency, if any, would you prefer to use for this goal?",
            "rationale": "Identifies the preferred funding source for allocations toward the savings goal.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "goal-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Preferred funding account for goal-1"
            ],
            "factIds": [
              "goal-1",
              "account-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Preferred funding account for goal-1",
            "evidence": []
          }
        ],
        "shortfallReason": "",
        "fallbackReason": "NO_USEFUL_PRIMARY",
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
      "evaluationId": "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a",
      "snapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
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
        "evaluationId": "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a",
        "userId": "c28320db-bd6b-4600-b627-b0f8730fad24",
        "snapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
        "snapshotVersion": "3.0",
        "createdAt": "2026-11-08T21:18:44.304Z",
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
                "inputSnapshotId": "snap_beta_c28320db-bd6b-4600-b627-b0f8730fad24_v3_a9c254963dbb370f",
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
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:pi",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:fx",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:classification",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:pattern-recognition",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:behavior-agent",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:financial-calculator",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:debt-calculator",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:debt-agent",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:suggestion-generator",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:catalog-selector",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:checker",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:critical-coverage",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:ai-evaluation",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:weights",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:impact-cand_A012_education",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:scoring",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:robustness",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:decision-engine",
          "eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review upcoming energy obligation status and timing",
              "description": "Review the unpaid energy obligation energy of 150 EUR due on 2026-11-15 against liquid balances.",
              "rationale": "Verifies that sufficient liquidity covers the upcoming energy obligation.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "obligation-2",
              "usefulness": "WEAK",
              "usefulnessReason": "No matching open decision or information gap.",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-2",
                "account-1"
              ],
              "claimIds": [],
              "status": "VALID",
              "reason": "The proposal asks to review the unpaid energy obligation of 150 EUR due on 2026-11-15 against liquid balances. This matches the data in obligation-2 and account-1, and is a safe read-only review.",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Intended contribution to goal-1",
              "description": "What amount, if any, do you intend to allocate toward this goal and when?",
              "rationale": "Clarifies the intended contribution amount and schedule for the savings goal.",
              "actionId": null,
              "intent": "CLARIFY",
              "origin": "MODEL",
              "targetFactId": "goal-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Intended contribution to goal-1"
              ],
              "factIds": [
                "goal-1"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Intended contribution to goal-1",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "Preferred funding account for goal-1",
              "description": "Which account and currency, if any, would you prefer to use for this goal?",
              "rationale": "Identifies the preferred funding source for allocations toward the savings goal.",
              "actionId": null,
              "intent": "CLARIFY",
              "origin": "MODEL",
              "targetFactId": "goal-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Preferred funding account for goal-1"
              ],
              "factIds": [
                "goal-1",
                "account-1",
                "account-2"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Preferred funding account for goal-1",
              "evidence": []
            }
          ],
          "shortfallReason": "",
          "fallbackReason": "NO_USEFUL_PRIMARY",
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
      "title": "Review upcoming energy obligation status and timing",
      "description": "Review the unpaid energy obligation energy of 150 EUR due on 2026-11-15 against liquid balances.",
      "rationale": "Verifies that sufficient liquidity covers the upcoming energy obligation.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "obligation-2",
      "usefulness": "WEAK",
      "usefulnessReason": "No matching open decision or information gap.",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-2",
        "account-1"
      ],
      "claimIds": [],
      "status": "VALID",
      "reason": "The proposal asks to review the unpaid energy obligation of 150 EUR due on 2026-11-15 against liquid balances. This matches the data in obligation-2 and account-1, and is a safe read-only review.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Intended contribution to goal-1",
      "description": "What amount, if any, do you intend to allocate toward this goal and when?",
      "rationale": "Clarifies the intended contribution amount and schedule for the savings goal.",
      "actionId": null,
      "intent": "CLARIFY",
      "origin": "MODEL",
      "targetFactId": "goal-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Intended contribution to goal-1"
      ],
      "factIds": [
        "goal-1"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Intended contribution to goal-1",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Preferred funding account for goal-1",
      "description": "Which account and currency, if any, would you prefer to use for this goal?",
      "rationale": "Identifies the preferred funding source for allocations toward the savings goal.",
      "actionId": null,
      "intent": "CLARIFY",
      "origin": "MODEL",
      "targetFactId": "goal-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Preferred funding account for goal-1"
      ],
      "factIds": [
        "goal-1",
        "account-1",
        "account-2"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Preferred funding account for goal-1",
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 367672
    },
    {
      "doc_key": "chat",
      "stored_bytes": 1248
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 876
    },
    {
      "doc_key": "chat-request:strong-context",
      "stored_bytes": 2580
    },
    {
      "doc_key": "engine",
      "stored_bytes": 1492448
    },
    {
      "doc_key": "import:12297b66-3216-45a7-9296-d1df2245c023",
      "stored_bytes": 88516
    },
    {
      "doc_key": "import:ae5ad928-fc5e-4bca-896c-8a52197a0073",
      "stored_bytes": 197072
    },
    {
      "doc_key": "job-request:b43178115670416f3aa9662d69804aa57f9dbb1969d0ff4fb96023dbd72cc0a8",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:beb622a9fceb4a91d6c0e3bc1704779fee728b1566a749c6b9db5953555b6cbc",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:eca2f6eb2f60714d026a0ad7defae143d01e12897a8668177cba257bb289601f",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:3cbab869-0657-4ddc-a40b-44a066b3aa3f",
      "stored_bytes": 233820
    },
    {
      "doc_key": "job:3d27b2d1-f1ab-496d-a980-c48af523b8cf",
      "stored_bytes": 368116
    },
    {
      "doc_key": "job:bf09a255-cc78-45e5-8b04-4ebed40647cf",
      "stored_bytes": 104624
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:ai-evaluation",
      "stored_bytes": 4500
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:behavior-agent",
      "stored_bytes": 5164
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:catalog-selector",
      "stored_bytes": 2736
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:checker",
      "stored_bytes": 8000
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:classification",
      "stored_bytes": 108112
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:debt-agent",
      "stored_bytes": 1636
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:debt-calculator",
      "stored_bytes": 1336
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:decision-engine",
      "stored_bytes": 14964
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:explanation",
      "stored_bytes": 2620
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:financial-calculator",
      "stored_bytes": 17972
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:fx",
      "stored_bytes": 1540
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:impact-cand_A012_education",
      "stored_bytes": 3520
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:pattern-recognition",
      "stored_bytes": 72196
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:pi",
      "stored_bytes": 1624
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:robustness",
      "stored_bytes": 2400
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:scoring",
      "stored_bytes": 6728
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:suggestion-generator",
      "stored_bytes": 4052
    },
    {
      "doc_key": "stage:eval_6febd890-af1c-47ef-b21a-0d069fdb3e5a:weights",
      "stored_bytes": 1776
    },
    {
      "doc_key": "state",
      "stored_bytes": 320948
    }
  ]
}
~~~~

## Summary

~~~~text
Advances verified savings goal "Education" by 75.8 percentage points (F012, F015) while keeping cash above floor (R002, R012). Selected under weight profile "goal_advancement", score S=0.589 (F017), robustness stability=100% (F018). [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R002, R012; Sources: S001]
~~~~
