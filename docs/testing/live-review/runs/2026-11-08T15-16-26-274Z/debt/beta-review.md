# 01 Debt · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

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
  "jobId": "70214e54-0d81-4bc5-b10b-9c9a0f38b281",
  "decision": {
    "evaluationId": "eval_0583f994-a005-4e53-80f9-15c64109f9c9",
    "snapshotId": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
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
    "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.3 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
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
    "policyVersion": "prototype_policy_bundle_v1.3",
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
      "evaluationId": "eval_0583f994-a005-4e53-80f9-15c64109f9c9",
      "userId": "fc048197-a2d0-44fd-b91d-32152f8ac2a5",
      "snapshotId": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T15:17:57.179Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.3",
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
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:pi",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:fx",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:classification",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:pattern-recognition",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:behavior-agent",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:financial-calculator",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-calculator",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-agent",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:suggestion-generator",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:catalog-selector",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:checker",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:critical-coverage",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:ai-evaluation",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:weights",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:decision-engine",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review credit card debt obligations",
            "description": "Examine the credit card debt details, including the upcoming payment due on 2026-11-08 and the associated 24% APR, to understand the impact on your financial situation.",
            "rationale": "The user has a credit card debt with a near-term due date and high interest rate, which is a critical financial obligation.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "debt-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1",
              "debt-analysis"
            ],
            "claimIds": [
              "C023"
            ],
            "status": "NEEDS_DATA",
            "reason": "Advice requires executable financial checks or contains a monetary amount or rate.",
            "evidence": [
              {
                "claimId": "C023",
                "sourceId": "S013",
                "text": "A meta-analysis of 126 studies finds heterogeneous financial education effects; debt behavior is comparatively difficult to change and teachable-moment delivery is associated with stronger effects.",
                "jurisdiction": "INTERNATIONAL",
                "population": "126 evaluated studies",
                "limitations": "Heterogeneous by behavior, country, audience"
              }
            ]
          },
          {
            "id": "primary-2",
            "title": "Review upcoming utility payment timing",
            "description": "Compare the utility bill due date of 2026-11-18 against your salary income date of 2026-11-25 to assess potential cash flow gaps.",
            "rationale": "Pattern findings indicate the utility obligation occurs before the next salary payment, which may require planning to ensure funds are available.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "income-1",
              "pattern-findings"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          }
        ],
        "shortfallReason": "Only two distinct, actionable steps are supported by the provided facts. The third proposal is omitted because there is insufficient data to suggest specific financial education or budgeting actions beyond the immediate debt and cash flow concerns identified.",
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
    "id": "rec_A005_eval_0583f994-a005-4e53-80f9-15c64109f9c9",
    "userId": "fc048197-a2d0-44fd-b91d-32152f8ac2a5",
    "snapshotId": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
    "actionType": "confirm_upcoming_bill",
    "title": "Contact Credit card issuer for hardship payment options",
    "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
    "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.3 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
    "suggestedAmount": 20,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "card",
    "sourceAccountId": null,
    "priority": "priority",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T15:17:57.190Z",
    "updatedAt": "2026-11-08T15:17:57.190Z"
  },
  "trace": {
    "trace": {
      "evaluationId": "eval_0583f994-a005-4e53-80f9-15c64109f9c9",
      "userId": "fc048197-a2d0-44fd-b91d-32152f8ac2a5",
      "snapshotId": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T15:17:57.179Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.3",
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
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:pi",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:fx",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:classification",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:pattern-recognition",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:behavior-agent",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:financial-calculator",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-calculator",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-agent",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:suggestion-generator",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:catalog-selector",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:checker",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:critical-coverage",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:ai-evaluation",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:weights",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:decision-engine",
        "eval_0583f994-a005-4e53-80f9-15c64109f9c9:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review credit card debt obligations",
            "description": "Examine the credit card debt details, including the upcoming payment due on 2026-11-08 and the associated 24% APR, to understand the impact on your financial situation.",
            "rationale": "The user has a credit card debt with a near-term due date and high interest rate, which is a critical financial obligation.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "debt-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1",
              "debt-analysis"
            ],
            "claimIds": [
              "C023"
            ],
            "status": "NEEDS_DATA",
            "reason": "Advice requires executable financial checks or contains a monetary amount or rate.",
            "evidence": [
              {
                "claimId": "C023",
                "sourceId": "S013",
                "text": "A meta-analysis of 126 studies finds heterogeneous financial education effects; debt behavior is comparatively difficult to change and teachable-moment delivery is associated with stronger effects.",
                "jurisdiction": "INTERNATIONAL",
                "population": "126 evaluated studies",
                "limitations": "Heterogeneous by behavior, country, audience"
              }
            ]
          },
          {
            "id": "primary-2",
            "title": "Review upcoming utility payment timing",
            "description": "Compare the utility bill due date of 2026-11-18 against your salary income date of 2026-11-25 to assess potential cash flow gaps.",
            "rationale": "Pattern findings indicate the utility obligation occurs before the next salary payment, which may require planning to ensure funds are available.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "income-1",
              "pattern-findings"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          }
        ],
        "shortfallReason": "Only two distinct, actionable steps are supported by the provided facts. The third proposal is omitted because there is insufficient data to suggest specific financial education or budgeting actions beyond the immediate debt and cash flow concerns identified.",
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
      "evaluationId": "eval_0583f994-a005-4e53-80f9-15c64109f9c9",
      "snapshotId": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
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
      "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.3 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
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
      "policyVersion": "prototype_policy_bundle_v1.3",
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
        "evaluationId": "eval_0583f994-a005-4e53-80f9-15c64109f9c9",
        "userId": "fc048197-a2d0-44fd-b91d-32152f8ac2a5",
        "snapshotId": "snap_beta_fc048197-a2d0-44fd-b91d-32152f8ac2a5_v2_33b606b38f19f583",
        "snapshotVersion": "2.0",
        "createdAt": "2026-11-08T15:17:57.179Z",
        "runtimeMode": "PROTOTYPE_MODE",
        "policyBundleVersion": "prototype_policy_bundle_v1.3",
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
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:pi",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:fx",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:classification",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:pattern-recognition",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:behavior-agent",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:financial-calculator",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-calculator",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-agent",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:suggestion-generator",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:catalog-selector",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:checker",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:critical-coverage",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:ai-evaluation",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:weights",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:decision-engine",
          "eval_0583f994-a005-4e53-80f9-15c64109f9c9:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review credit card debt obligations",
              "description": "Examine the credit card debt details, including the upcoming payment due on 2026-11-08 and the associated 24% APR, to understand the impact on your financial situation.",
              "rationale": "The user has a credit card debt with a near-term due date and high interest rate, which is a critical financial obligation.",
              "actionId": null,
              "intent": "REVIEW",
              "targetFactId": "debt-1",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "debt-1",
                "debt-analysis"
              ],
              "claimIds": [
                "C023"
              ],
              "status": "NEEDS_DATA",
              "reason": "Advice requires executable financial checks or contains a monetary amount or rate.",
              "evidence": [
                {
                  "claimId": "C023",
                  "sourceId": "S013",
                  "text": "A meta-analysis of 126 studies finds heterogeneous financial education effects; debt behavior is comparatively difficult to change and teachable-moment delivery is associated with stronger effects.",
                  "jurisdiction": "INTERNATIONAL",
                  "population": "126 evaluated studies",
                  "limitations": "Heterogeneous by behavior, country, audience"
                }
              ]
            },
            {
              "id": "primary-2",
              "title": "Review upcoming utility payment timing",
              "description": "Compare the utility bill due date of 2026-11-18 against your salary income date of 2026-11-25 to assess potential cash flow gaps.",
              "rationale": "Pattern findings indicate the utility obligation occurs before the next salary payment, which may require planning to ensure funds are available.",
              "actionId": null,
              "intent": "REVIEW",
              "targetFactId": "obligation-1",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-1",
                "income-1",
                "pattern-findings"
              ],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Unverified or unknown AS reference.",
              "evidence": []
            }
          ],
          "shortfallReason": "Only two distinct, actionable steps are supported by the provided facts. The third proposal is omitted because there is insufficient data to suggest specific financial education or budgeting actions beyond the immediate debt and cash flow concerns identified.",
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
      "title": "Review credit card debt obligations",
      "description": "Examine the credit card debt details, including the upcoming payment due on 2026-11-08 and the associated 24% APR, to understand the impact on your financial situation.",
      "rationale": "The user has a credit card debt with a near-term due date and high interest rate, which is a critical financial obligation.",
      "actionId": null,
      "intent": "REVIEW",
      "targetFactId": "debt-1",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "debt-1",
        "debt-analysis"
      ],
      "claimIds": [
        "C023"
      ],
      "status": "NEEDS_DATA",
      "reason": "Advice requires executable financial checks or contains a monetary amount or rate.",
      "evidence": [
        {
          "claimId": "C023",
          "sourceId": "S013",
          "text": "A meta-analysis of 126 studies finds heterogeneous financial education effects; debt behavior is comparatively difficult to change and teachable-moment delivery is associated with stronger effects.",
          "jurisdiction": "INTERNATIONAL",
          "population": "126 evaluated studies",
          "limitations": "Heterogeneous by behavior, country, audience"
        }
      ],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Review upcoming utility payment timing",
      "description": "Compare the utility bill due date of 2026-11-18 against your salary income date of 2026-11-25 to assess potential cash flow gaps.",
      "rationale": "Pattern findings indicate the utility obligation occurs before the next salary payment, which may require planning to ensure funds are available.",
      "actionId": null,
      "intent": "REVIEW",
      "targetFactId": "obligation-1",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-1",
        "income-1",
        "pattern-findings"
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
      "stored_bytes": 31540
    },
    {
      "doc_key": "chat",
      "stored_bytes": 500
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 928
    },
    {
      "doc_key": "chat-request:debt-context",
      "stored_bytes": 1092
    },
    {
      "doc_key": "engine",
      "stored_bytes": 71548
    },
    {
      "doc_key": "job-request:0b52f4b743d8edf5e455620103c2ac01ef84e8e54a9e4a60f68d48c18e5138ee",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:70214e54-0d81-4bc5-b10b-9c9a0f38b281",
      "stored_bytes": 31980
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:ai-evaluation",
      "stored_bytes": 6892
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:behavior-agent",
      "stored_bytes": 2736
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:catalog-selector",
      "stored_bytes": 1332
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:checker",
      "stored_bytes": 10052
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:classification",
      "stored_bytes": 1844
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:critical-coverage",
      "stored_bytes": 3260
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-agent",
      "stored_bytes": 2368
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:debt-calculator",
      "stored_bytes": 1668
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:decision-engine",
      "stored_bytes": 9152
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:explanation",
      "stored_bytes": 2360
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:financial-calculator",
      "stored_bytes": 15576
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:fx",
      "stored_bytes": 1220
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:pattern-recognition",
      "stored_bytes": 3248
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:pi",
      "stored_bytes": 1612
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:suggestion-generator",
      "stored_bytes": 3548
    },
    {
      "doc_key": "stage:eval_0583f994-a005-4e53-80f9-15c64109f9c9:weights",
      "stored_bytes": 1604
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
CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met. Selected under weight profile "liquidity_protection". [Policy: prototype_policy_bundle_v1.3 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]
~~~~
