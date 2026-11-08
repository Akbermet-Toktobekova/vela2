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
  "jobId": "bb59a40a-7a8d-4d87-8d5b-d86fecfa24a3",
  "decision": {
    "evaluationId": "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2",
    "snapshotId": "snap_beta_ae23b762-b6cc-4033-88c7-8964e935b78d_v2_b11df4eaa0bd0e1a",
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
      "evaluationId": "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2",
      "userId": "ae23b762-b6cc-4033-88c7-8964e935b78d",
      "snapshotId": "snap_beta_ae23b762-b6cc-4033-88c7-8964e935b78d_v2_b11df4eaa0bd0e1a",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T15:32:11.547Z",
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
        "triggerReason": "Emergency reserve coverage M = 0.00 months is below entry threshold 1.00 months.",
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
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:pi",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:fx",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:classification",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:pattern-recognition",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:behavior-agent",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:financial-calculator",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:debt-calculator",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:debt-agent",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:suggestion-generator",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:catalog-selector",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:checker",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:critical-coverage",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:ai-evaluation",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:weights",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:decision-engine",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:explanation"
      ],
      "primarySuggestions": {
        "proposals": [],
        "shortfallReason": "No applicable verified claim supports a specific action.",
        "fallbackReason": "NO_PROPOSALS",
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
    "id": "rec_A005_eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2",
    "userId": "ae23b762-b6cc-4033-88c7-8964e935b78d",
    "snapshotId": "snap_beta_ae23b762-b6cc-4033-88c7-8964e935b78d_v2_b11df4eaa0bd0e1a",
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
    "createdAt": "2026-11-08T15:32:11.569Z",
    "updatedAt": "2026-11-08T15:32:11.569Z"
  },
  "trace": {
    "trace": {
      "evaluationId": "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2",
      "userId": "ae23b762-b6cc-4033-88c7-8964e935b78d",
      "snapshotId": "snap_beta_ae23b762-b6cc-4033-88c7-8964e935b78d_v2_b11df4eaa0bd0e1a",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T15:32:11.547Z",
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
        "triggerReason": "Emergency reserve coverage M = 0.00 months is below entry threshold 1.00 months.",
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
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:pi",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:fx",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:classification",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:pattern-recognition",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:behavior-agent",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:financial-calculator",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:debt-calculator",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:debt-agent",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:suggestion-generator",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:catalog-selector",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:checker",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:critical-coverage",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:ai-evaluation",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:weights",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:decision-engine",
        "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:explanation"
      ],
      "primarySuggestions": {
        "proposals": [],
        "shortfallReason": "No applicable verified claim supports a specific action.",
        "fallbackReason": "NO_PROPOSALS",
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
      "evaluationId": "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2",
      "snapshotId": "snap_beta_ae23b762-b6cc-4033-88c7-8964e935b78d_v2_b11df4eaa0bd0e1a",
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
        "evaluationId": "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2",
        "userId": "ae23b762-b6cc-4033-88c7-8964e935b78d",
        "snapshotId": "snap_beta_ae23b762-b6cc-4033-88c7-8964e935b78d_v2_b11df4eaa0bd0e1a",
        "snapshotVersion": "2.0",
        "createdAt": "2026-11-08T15:32:11.547Z",
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
          "triggerReason": "Emergency reserve coverage M = 0.00 months is below entry threshold 1.00 months.",
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
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:pi",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:fx",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:classification",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:pattern-recognition",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:behavior-agent",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:financial-calculator",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:debt-calculator",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:debt-agent",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:suggestion-generator",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:catalog-selector",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:checker",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:critical-coverage",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:ai-evaluation",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:weights",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:decision-engine",
          "eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:explanation"
        ],
        "primarySuggestions": {
          "proposals": [],
          "shortfallReason": "No applicable verified claim supports a specific action.",
          "fallbackReason": "NO_PROPOSALS",
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
  "primaryProposals": [],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 26440
    },
    {
      "doc_key": "chat",
      "stored_bytes": 768
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 872
    },
    {
      "doc_key": "chat-request:debt-context",
      "stored_bytes": 1624
    },
    {
      "doc_key": "engine",
      "stored_bytes": 61736
    },
    {
      "doc_key": "job-request:a484e8cd41b7f20a881e3b3df72d44ff0264f27055453ceeb91b5851d5f403c1",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:bb59a40a-7a8d-4d87-8d5b-d86fecfa24a3",
      "stored_bytes": 26880
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:ai-evaluation",
      "stored_bytes": 7284
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:behavior-agent",
      "stored_bytes": 3060
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:catalog-selector",
      "stored_bytes": 1660
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:checker",
      "stored_bytes": 8160
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:classification",
      "stored_bytes": 1924
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:critical-coverage",
      "stored_bytes": 3400
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:debt-agent",
      "stored_bytes": 2620
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:debt-calculator",
      "stored_bytes": 1724
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:decision-engine",
      "stored_bytes": 9624
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:explanation",
      "stored_bytes": 2472
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:financial-calculator",
      "stored_bytes": 15848
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:fx",
      "stored_bytes": 1300
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:pattern-recognition",
      "stored_bytes": 3444
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:pi",
      "stored_bytes": 1612
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:suggestion-generator",
      "stored_bytes": 2460
    },
    {
      "doc_key": "stage:eval_a9ce3e2c-f9de-4d53-a8fd-ab3fbd958cf2:weights",
      "stored_bytes": 1732
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
