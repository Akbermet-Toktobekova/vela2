# 01 Debt · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations. | — |

Actual Today output: **Contact Credit card issuer for hardship payment options**.

## Input

~~~~json
{
  "request": "POST /api/beta/review",
  "body": {
    "forceRefresh": true
  },
  "version": 2
}
~~~~

## Output

~~~~json
{
  "jobId": "e8a408d0-8733-4739-abf2-7214313da31c",
  "decision": {
    "evaluationId": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41",
    "snapshotId": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
    "snapshotVersion": "2.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "CRITICAL",
    "selectedActionId": "A005",
    "selectedActionType": "FINANCIAL_ACTION",
    "candidate": {
      "candidateId": "crit_A005_card",
      "actionId": "A005",
      "actionType": "FINANCIAL_ACTION",
      "title": "Contact Credit card issuer for hardship payment options",
      "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
      "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
      "targetId": "card",
      "sourceAccountId": null,
      "destinationAccountId": null,
      "amount": 20,
      "currency": "EUR",
      "proposedTiming": "2026-11-05",
      "supportingRuleIds": [
        "R008"
      ],
      "supportingClaimIds": [
        "C017",
        "C018"
      ],
      "supportingSourceIds": [
        "S004"
      ],
      "requiredPiInputs": [
        "issuer_contact",
        "minimum_due",
        "affordable_payment"
      ],
      "origin": "CRITICAL_COVERAGE"
    },
    "title": "Contact Credit card issuer for hardship payment options",
    "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
    "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
    "expectedEffectSummary": "Addresses imminent payment or cash-flow shortfall directly (A005).",
    "weightProfileId": "liquidity_protection",
    "weights": {
      "resilience": 0.5,
      "financial_benefit": 0.35,
      "goal_progress": 0.15
    },
    "values": null,
    "rawImpacts": null,
    "complexity": null,
    "score": null,
    "stability": null,
    "policyVersion": "prototype_policy_bundle_v1.4",
    "sourceIds": [
      "S004"
    ],
    "ruleIds": [
      "R008"
    ],
    "claimIds": [
      "C017",
      "C018"
    ],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": null,
    "missingFields": [],
    "trace": {
      "evaluationId": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41",
      "userId": "4f49a4d9-80fd-496f-9f22-11aa7d9597a2",
      "snapshotId": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T17:12:30.370Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "CRITICAL",
      "weightSelection": {
        "profileId": "liquidity_protection",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.5,
          "F": 0.35,
          "G": 0.15
        },
        "triggerReason": "Liquid expense coverage M = 0.02 months is below entry threshold 1.00 months.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "crit_A005_card",
            "actionId": "A005",
            "actionType": "FINANCIAL_ACTION",
            "title": "Contact Credit card issuer for hardship payment options",
            "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
            "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
            "targetId": "card",
            "sourceAccountId": null,
            "destinationAccountId": null,
            "amount": 20,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R008"
            ],
            "supportingClaimIds": [
              "C017",
              "C018"
            ],
            "supportingSourceIds": [
              "S004"
            ],
            "requiredPiInputs": [
              "issuer_contact",
              "minimum_due",
              "affordable_payment"
            ],
            "origin": "CRITICAL_COVERAGE"
          },
          "status": "VALID",
          "isCritical": true,
          "criticalPriorityRank": 1,
          "resolvesCriticalProblemDirectly": true,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "issuer_contact",
              "status": "VERIFIED"
            },
            {
              "field": "minimum_due",
              "status": "VERIFIED"
            },
            {
              "field": "affordable_payment",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": -110,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "crit_A020_deficit",
            "actionId": "A020",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review projected EUR 45 cash shortfall before 2026-11-08",
            "description": "Projected cash drops below required obligations by 2026-11-08 (Credit card minimum). Review upcoming bills and available balances.",
            "rationale": "Diagnostic alert (F004, F019, R009): flags upcoming payment shortfall for user verification without assuming automatic resolution.",
            "targetId": "card",
            "sourceAccountId": null,
            "destinationAccountId": null,
            "amount": 45,
            "currency": "EUR",
            "proposedTiming": "2026-11-08",
            "supportingRuleIds": [
              "R009"
            ],
            "supportingClaimIds": [
              "C004",
              "C009"
            ],
            "supportingSourceIds": [
              "S001",
              "S007"
            ],
            "requiredPiInputs": [
              "cash",
              "due_obligations",
              "confirmed_income"
            ],
            "origin": "CRITICAL_COVERAGE"
          },
          "status": "VALID",
          "isCritical": true,
          "criticalPriorityRank": 3,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "cash",
              "status": "VERIFIED"
            },
            {
              "field": "due_obligations",
              "status": "VERIFIED"
            },
            {
              "field": "confirmed_income",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": -110,
          "unlocksActionIds": [
            "A001",
            "A005",
            "A011"
          ]
        }
      ],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer for hardship payment options",
        "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
        "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 20,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [
          "C017",
          "C018"
        ],
        "supportingSourceIds": [
          "S004"
        ],
        "requiredPiInputs": [
          "issuer_contact",
          "minimum_due",
          "affordable_payment"
        ],
        "origin": "CRITICAL_COVERAGE"
      },
      "stageArtifactIds": [
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pi",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:fx",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:classification",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pattern-recognition",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:behavior-agent",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:financial-calculator",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-calculator",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-agent",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:suggestion-generator",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:catalog-selector",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:checker",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:critical-coverage",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:ai-evaluation",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:weights",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:decision-engine",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:explanation"
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
        "shortfallReason": "Insufficient verified claims to support EXECUTE actions for debt or obligation management; behavior data is incomplete.",
        "fallbackReason": "NO_VALID_PRIMARY",
        "criticalCoverageAddedIds": [
          "A005",
          "A020"
        ]
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
      "supportingSourceIds": [
        "S004"
      ],
      "supportingRuleIds": [
        "R008"
      ],
      "supportingClaimIds": [
        "C017",
        "C018"
      ],
      "missingDataFields": [],
      "clarificationQuestion": null
    }
  },
  "todayCard": {
    "id": "rec_A005_eval_484b49e1-5671-47d0-bfae-e0fa0546cd41",
    "userId": "4f49a4d9-80fd-496f-9f22-11aa7d9597a2",
    "snapshotId": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
    "actionType": "confirm_upcoming_bill",
    "title": "Contact Credit card issuer for hardship payment options",
    "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
    "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
    "suggestedAmount": 20,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "card",
    "sourceAccountId": null,
    "priority": "priority",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T17:12:30.385Z",
    "updatedAt": "2026-11-08T17:12:30.385Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pi",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:fx",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:classification",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pattern-recognition",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:behavior-agent",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:financial-calculator",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-calculator",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-agent",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:suggestion-generator",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:catalog-selector",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:checker",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:critical-coverage",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:ai-evaluation",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:weights",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:decision-engine",
        "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:explanation"
      ],
      "evaluationId": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41",
      "userId": "4f49a4d9-80fd-496f-9f22-11aa7d9597a2",
      "snapshotId": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T17:12:30.370Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "CRITICAL",
      "weightSelection": {
        "profileId": "liquidity_protection",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.5,
          "F": 0.35,
          "G": 0.15
        },
        "triggerReason": "Liquid expense coverage M = 0.02 months is below entry threshold 1.00 months.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "crit_A005_card",
            "actionId": "A005",
            "actionType": "FINANCIAL_ACTION",
            "title": "Contact Credit card issuer for hardship payment options",
            "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
            "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
            "targetId": "card",
            "sourceAccountId": null,
            "destinationAccountId": null,
            "amount": 20,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R008"
            ],
            "supportingClaimIds": [
              "C017",
              "C018"
            ],
            "supportingSourceIds": [
              "S004"
            ],
            "requiredPiInputs": [
              "issuer_contact",
              "minimum_due",
              "affordable_payment"
            ],
            "origin": "CRITICAL_COVERAGE"
          },
          "status": "VALID",
          "isCritical": true,
          "criticalPriorityRank": 1,
          "resolvesCriticalProblemDirectly": true,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "issuer_contact",
              "status": "VERIFIED"
            },
            {
              "field": "minimum_due",
              "status": "VERIFIED"
            },
            {
              "field": "affordable_payment",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": -110,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "crit_A020_deficit",
            "actionId": "A020",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review projected EUR 45 cash shortfall before 2026-11-08",
            "description": "Projected cash drops below required obligations by 2026-11-08 (Credit card minimum). Review upcoming bills and available balances.",
            "rationale": "Diagnostic alert (F004, F019, R009): flags upcoming payment shortfall for user verification without assuming automatic resolution.",
            "targetId": "card",
            "sourceAccountId": null,
            "destinationAccountId": null,
            "amount": 45,
            "currency": "EUR",
            "proposedTiming": "2026-11-08",
            "supportingRuleIds": [
              "R009"
            ],
            "supportingClaimIds": [
              "C004",
              "C009"
            ],
            "supportingSourceIds": [
              "S001",
              "S007"
            ],
            "requiredPiInputs": [
              "cash",
              "due_obligations",
              "confirmed_income"
            ],
            "origin": "CRITICAL_COVERAGE"
          },
          "status": "VALID",
          "isCritical": true,
          "criticalPriorityRank": 3,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "cash",
              "status": "VERIFIED"
            },
            {
              "field": "due_obligations",
              "status": "VERIFIED"
            },
            {
              "field": "confirmed_income",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": -110,
          "unlocksActionIds": [
            "A001",
            "A005",
            "A011"
          ]
        }
      ],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer for hardship payment options",
        "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
        "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 20,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [
          "C017",
          "C018"
        ],
        "supportingSourceIds": [
          "S004"
        ],
        "requiredPiInputs": [
          "issuer_contact",
          "minimum_due",
          "affordable_payment"
        ],
        "origin": "CRITICAL_COVERAGE"
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
        "shortfallReason": "Insufficient verified claims to support EXECUTE actions for debt or obligation management; behavior data is incomplete.",
        "fallbackReason": "NO_VALID_PRIMARY",
        "criticalCoverageAddedIds": [
          "A005",
          "A020"
        ]
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
      "supportingSourceIds": [
        "S004"
      ],
      "supportingRuleIds": [
        "R008"
      ],
      "supportingClaimIds": [
        "C017",
        "C018"
      ],
      "missingDataFields": [],
      "clarificationQuestion": null
    },
    "decision": {
      "evaluationId": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41",
      "snapshotId": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
      "snapshotVersion": "2.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "CRITICAL",
      "selectedActionId": "A005",
      "selectedActionType": "FINANCIAL_ACTION",
      "candidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer for hardship payment options",
        "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
        "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 20,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [
          "C017",
          "C018"
        ],
        "supportingSourceIds": [
          "S004"
        ],
        "requiredPiInputs": [
          "issuer_contact",
          "minimum_due",
          "affordable_payment"
        ],
        "origin": "CRITICAL_COVERAGE"
      },
      "title": "Contact Credit card issuer for hardship payment options",
      "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
      "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
      "expectedEffectSummary": "Addresses imminent payment or cash-flow shortfall directly (A005).",
      "weightProfileId": "liquidity_protection",
      "weights": {
        "resilience": 0.5,
        "financial_benefit": 0.35,
        "goal_progress": 0.15
      },
      "values": null,
      "rawImpacts": null,
      "complexity": null,
      "score": null,
      "stability": null,
      "policyVersion": "prototype_policy_bundle_v1.4",
      "sourceIds": [
        "S004"
      ],
      "ruleIds": [
        "R008"
      ],
      "claimIds": [
        "C017",
        "C018"
      ],
      "dataQualityStatus": "PROTOTYPE_POLICY",
      "clarificationQuestion": null,
      "missingFields": [],
      "trace": {
        "evaluationId": "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41",
        "userId": "4f49a4d9-80fd-496f-9f22-11aa7d9597a2",
        "snapshotId": "snap_beta_4f49a4d9-80fd-496f-9f22-11aa7d9597a2_v2_4f0502439afb0c1a",
        "snapshotVersion": "2.0",
        "createdAt": "2026-11-08T17:12:30.370Z",
        "runtimeMode": "PROTOTYPE_MODE",
        "policyBundleVersion": "prototype_policy_bundle_v1.4",
        "priorityClass": "CRITICAL",
        "weightSelection": {
          "profileId": "liquidity_protection",
          "previousProfileId": null,
          "hysteresisApplied": false,
          "weights": {
            "R": 0.5,
            "F": 0.35,
            "G": 0.15
          },
          "triggerReason": "Liquid expense coverage M = 0.02 months is below entry threshold 1.00 months.",
          "policyVersion": "weight_policy_v1_prototype"
        },
        "validatedCandidates": [
          {
            "candidate": {
              "candidateId": "crit_A005_card",
              "actionId": "A005",
              "actionType": "FINANCIAL_ACTION",
              "title": "Contact Credit card issuer for hardship payment options",
              "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
              "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
              "targetId": "card",
              "sourceAccountId": null,
              "destinationAccountId": null,
              "amount": 20,
              "currency": "EUR",
              "proposedTiming": "2026-11-05",
              "supportingRuleIds": [
                "R008"
              ],
              "supportingClaimIds": [
                "C017",
                "C018"
              ],
              "supportingSourceIds": [
                "S004"
              ],
              "requiredPiInputs": [
                "issuer_contact",
                "minimum_due",
                "affordable_payment"
              ],
              "origin": "CRITICAL_COVERAGE"
            },
            "status": "VALID",
            "isCritical": true,
            "criticalPriorityRank": 1,
            "resolvesCriticalProblemDirectly": true,
            "failedChecks": [],
            "missingFields": [],
            "inputEvidence": [
              {
                "field": "issuer_contact",
                "status": "VERIFIED"
              },
              {
                "field": "minimum_due",
                "status": "VERIFIED"
              },
              {
                "field": "affordable_payment",
                "status": "VERIFIED"
              }
            ],
            "projectedMinCashAfterAction": -110,
            "unlocksActionIds": []
          },
          {
            "candidate": {
              "candidateId": "crit_A020_deficit",
              "actionId": "A020",
              "actionType": "VERIFICATION_ACTION",
              "title": "Review projected EUR 45 cash shortfall before 2026-11-08",
              "description": "Projected cash drops below required obligations by 2026-11-08 (Credit card minimum). Review upcoming bills and available balances.",
              "rationale": "Diagnostic alert (F004, F019, R009): flags upcoming payment shortfall for user verification without assuming automatic resolution.",
              "targetId": "card",
              "sourceAccountId": null,
              "destinationAccountId": null,
              "amount": 45,
              "currency": "EUR",
              "proposedTiming": "2026-11-08",
              "supportingRuleIds": [
                "R009"
              ],
              "supportingClaimIds": [
                "C004",
                "C009"
              ],
              "supportingSourceIds": [
                "S001",
                "S007"
              ],
              "requiredPiInputs": [
                "cash",
                "due_obligations",
                "confirmed_income"
              ],
              "origin": "CRITICAL_COVERAGE"
            },
            "status": "VALID",
            "isCritical": true,
            "criticalPriorityRank": 3,
            "resolvesCriticalProblemDirectly": false,
            "failedChecks": [],
            "missingFields": [],
            "inputEvidence": [
              {
                "field": "cash",
                "status": "VERIFIED"
              },
              {
                "field": "due_obligations",
                "status": "VERIFIED"
              },
              {
                "field": "confirmed_income",
                "status": "VERIFIED"
              }
            ],
            "projectedMinCashAfterAction": -110,
            "unlocksActionIds": [
              "A001",
              "A005",
              "A011"
            ]
          }
        ],
        "scoredCandidates": [],
        "robustness": null,
        "selectedCandidate": {
          "candidateId": "crit_A005_card",
          "actionId": "A005",
          "actionType": "FINANCIAL_ACTION",
          "title": "Contact Credit card issuer for hardship payment options",
          "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
          "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
          "targetId": "card",
          "sourceAccountId": null,
          "destinationAccountId": null,
          "amount": 20,
          "currency": "EUR",
          "proposedTiming": "2026-11-05",
          "supportingRuleIds": [
            "R008"
          ],
          "supportingClaimIds": [
            "C017",
            "C018"
          ],
          "supportingSourceIds": [
            "S004"
          ],
          "requiredPiInputs": [
            "issuer_contact",
            "minimum_due",
            "affordable_payment"
          ],
          "origin": "CRITICAL_COVERAGE"
        },
        "stageArtifactIds": [
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pi",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:fx",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:classification",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pattern-recognition",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:behavior-agent",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:financial-calculator",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-calculator",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-agent",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:suggestion-generator",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:catalog-selector",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:checker",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:critical-coverage",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:ai-evaluation",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:weights",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:decision-engine",
          "eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:explanation"
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
          "shortfallReason": "Insufficient verified claims to support EXECUTE actions for debt or obligation management; behavior data is incomplete.",
          "fallbackReason": "NO_VALID_PRIMARY",
          "criticalCoverageAddedIds": [
            "A005",
            "A020"
          ]
        },
        "selectedActionType": "FINANCIAL_ACTION",
        "decisionStatus": "RECOMMENDATION_READY",
        "decisionReason": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
        "supportingSourceIds": [
          "S004"
        ],
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [
          "C017",
          "C018"
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
      "stored_bytes": 28612
    },
    {
      "doc_key": "chat",
      "stored_bytes": 552
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 860
    },
    {
      "doc_key": "chat-request:debt-context",
      "stored_bytes": 1252
    },
    {
      "doc_key": "engine",
      "stored_bytes": 64460
    },
    {
      "doc_key": "job-request:547b9c640c6fcdeb6dd957d5194d2ed5bb94f918703511f469e5cb29a8253486",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:e8a408d0-8733-4739-abf2-7214313da31c",
      "stored_bytes": 29052
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:ai-evaluation",
      "stored_bytes": 7228
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:behavior-agent",
      "stored_bytes": 2496
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:catalog-selector",
      "stored_bytes": 1660
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:checker",
      "stored_bytes": 9032
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:classification",
      "stored_bytes": 1924
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:critical-coverage",
      "stored_bytes": 3400
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-agent",
      "stored_bytes": 2668
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:debt-calculator",
      "stored_bytes": 1724
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:decision-engine",
      "stored_bytes": 9620
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:explanation",
      "stored_bytes": 2472
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:financial-calculator",
      "stored_bytes": 15848
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:fx",
      "stored_bytes": 1300
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pattern-recognition",
      "stored_bytes": 2996
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:pi",
      "stored_bytes": 1612
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:suggestion-generator",
      "stored_bytes": 4308
    },
    {
      "doc_key": "stage:eval_484b49e1-5671-47d0-bfae-e0fa0546cd41:weights",
      "stored_bytes": 1728
    },
    {
      "doc_key": "state",
      "stored_bytes": 4844
    }
  ]
}
~~~~

## Summary

~~~~text
CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile "liquidity_protection". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]
~~~~
