# 01 Debt · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations. | — |

Actual Today output: **Contact Credit card issuer about the upcoming minimum**.

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
  "jobId": "88267902-643e-4e64-99d0-516938876791",
  "decision": {
    "evaluationId": "eval_49070fdc-7707-4201-8566-e9a2bfc81818",
    "snapshotId": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
    "snapshotVersion": "2.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "CRITICAL",
    "selectedActionId": "A005",
    "selectedActionType": "FINANCIAL_ACTION",
    "candidate": {
      "candidateId": "crit_A005_card",
      "actionId": "A005",
      "actionType": "FINANCIAL_ACTION",
      "title": "Contact Credit card issuer about the upcoming minimum",
      "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
      "rationale": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
      "targetId": "card",
      "sourceAccountId": null,
      "destinationAccountId": null,
      "amount": 20,
      "currency": "EUR",
      "proposedTiming": "2026-11-05",
      "supportingRuleIds": [
        "R008"
      ],
      "supportingClaimIds": [],
      "supportingSourceIds": [],
      "requiredPiInputs": [
        "issuer_contact",
        "minimum_due",
        "affordable_payment"
      ],
      "origin": "CRITICAL_COVERAGE"
    },
    "title": "Contact Credit card issuer about the upcoming minimum",
    "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
    "reasoning": "Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]",
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
    "sourceIds": [],
    "ruleIds": [
      "R008"
    ],
    "claimIds": [],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": null,
    "missingFields": [],
    "trace": {
      "evaluationId": "eval_49070fdc-7707-4201-8566-e9a2bfc81818",
      "userId": "979e01cc-7261-48e3-b720-2195868898d2",
      "snapshotId": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T20:28:06.976Z",
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
            "title": "Contact Credit card issuer about the upcoming minimum",
            "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
            "rationale": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
            "targetId": "card",
            "sourceAccountId": null,
            "destinationAccountId": null,
            "amount": 20,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R008"
            ],
            "supportingClaimIds": [],
            "supportingSourceIds": [],
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
        "title": "Contact Credit card issuer about the upcoming minimum",
        "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
        "rationale": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 20,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [],
        "supportingSourceIds": [],
        "requiredPiInputs": [
          "issuer_contact",
          "minimum_due",
          "affordable_payment"
        ],
        "origin": "CRITICAL_COVERAGE"
      },
      "stageArtifactIds": [
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:pi",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:fx",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:classification",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:pattern-recognition",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:behavior-agent",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:financial-calculator",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-calculator",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-agent",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:suggestion-generator",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:catalog-selector",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:checker",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:critical-coverage",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:ai-evaluation",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:weights",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:decision-engine",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review debt-1 payment timing",
            "description": "Review the upcoming payment due date 2026-11-08 for debt-1 with an APR of 24% and balance of 900 EUR to align available cash.",
            "rationale": "Evaluating the timing of the impending due date helps identify potential shortfalls before the payment deadline.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Available funding by the due date for debt-1"
            ],
            "factIds": [
              "debt-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Available funding by the due date for debt-1",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review obligation-1 timing and coverage",
            "description": "Review the energy obligation due on 2026-11-18 in relation to the upcoming income date.",
            "rationale": "Checking the timing of the utility bill ensures awareness of the gap before salary is received.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Available funding by the due date for obligation-1"
            ],
            "factIds": [
              "obligation-1",
              "income-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Available funding by the due date for obligation-1",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Clarify payment arrangement for debt-1",
            "description": "Confirm whether any alternative payment arrangement has been offered for debt-1.",
            "rationale": "Gathering details on potential relief options aids in managing short-term liquidity constraints.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Any payment arrangement already offered for debt-1"
            ],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Any payment arrangement already offered for debt-1",
            "evidence": []
          }
        ],
        "shortfallReason": "Projected liquid funds are insufficient to cover upcoming obligations and debt minimums prior to the next income date.",
        "fallbackReason": "NO_USEFUL_PRIMARY",
        "criticalCoverageAddedIds": [
          "A005",
          "A020"
        ]
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
      "supportingSourceIds": [],
      "supportingRuleIds": [
        "R008"
      ],
      "supportingClaimIds": [],
      "missingDataFields": [],
      "clarificationQuestion": null
    }
  },
  "todayCard": {
    "id": "rec_A005_eval_49070fdc-7707-4201-8566-e9a2bfc81818",
    "userId": "979e01cc-7261-48e3-b720-2195868898d2",
    "snapshotId": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
    "actionType": "confirm_upcoming_bill",
    "title": "Contact Credit card issuer about the upcoming minimum",
    "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
    "reasoning": "Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]",
    "suggestedAmount": 20,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "card",
    "sourceAccountId": null,
    "priority": "priority",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:28:06.994Z",
    "updatedAt": "2026-11-08T20:28:06.994Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:pi",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:fx",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:classification",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:pattern-recognition",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:behavior-agent",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:financial-calculator",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-calculator",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-agent",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:suggestion-generator",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:catalog-selector",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:checker",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:critical-coverage",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:ai-evaluation",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:weights",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:decision-engine",
        "eval_49070fdc-7707-4201-8566-e9a2bfc81818:explanation"
      ],
      "evaluationId": "eval_49070fdc-7707-4201-8566-e9a2bfc81818",
      "userId": "979e01cc-7261-48e3-b720-2195868898d2",
      "snapshotId": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T20:28:06.976Z",
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
            "title": "Contact Credit card issuer about the upcoming minimum",
            "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
            "rationale": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
            "targetId": "card",
            "sourceAccountId": null,
            "destinationAccountId": null,
            "amount": 20,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R008"
            ],
            "supportingClaimIds": [],
            "supportingSourceIds": [],
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
        "title": "Contact Credit card issuer about the upcoming minimum",
        "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
        "rationale": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 20,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [],
        "supportingSourceIds": [],
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
            "title": "Review debt-1 payment timing",
            "description": "Review the upcoming payment due date 2026-11-08 for debt-1 with an APR of 24% and balance of 900 EUR to align available cash.",
            "rationale": "Evaluating the timing of the impending due date helps identify potential shortfalls before the payment deadline.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Available funding by the due date for debt-1"
            ],
            "factIds": [
              "debt-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Available funding by the due date for debt-1",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review obligation-1 timing and coverage",
            "description": "Review the energy obligation due on 2026-11-18 in relation to the upcoming income date.",
            "rationale": "Checking the timing of the utility bill ensures awareness of the gap before salary is received.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Available funding by the due date for obligation-1"
            ],
            "factIds": [
              "obligation-1",
              "income-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Available funding by the due date for obligation-1",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Clarify payment arrangement for debt-1",
            "description": "Confirm whether any alternative payment arrangement has been offered for debt-1.",
            "rationale": "Gathering details on potential relief options aids in managing short-term liquidity constraints.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Any payment arrangement already offered for debt-1"
            ],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Any payment arrangement already offered for debt-1",
            "evidence": []
          }
        ],
        "shortfallReason": "Projected liquid funds are insufficient to cover upcoming obligations and debt minimums prior to the next income date.",
        "fallbackReason": "NO_USEFUL_PRIMARY",
        "criticalCoverageAddedIds": [
          "A005",
          "A020"
        ]
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
      "supportingSourceIds": [],
      "supportingRuleIds": [
        "R008"
      ],
      "supportingClaimIds": [],
      "missingDataFields": [],
      "clarificationQuestion": null
    },
    "decision": {
      "evaluationId": "eval_49070fdc-7707-4201-8566-e9a2bfc81818",
      "snapshotId": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
      "snapshotVersion": "2.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "CRITICAL",
      "selectedActionId": "A005",
      "selectedActionType": "FINANCIAL_ACTION",
      "candidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer about the upcoming minimum",
        "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
        "rationale": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 20,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [],
        "supportingSourceIds": [],
        "requiredPiInputs": [
          "issuer_contact",
          "minimum_due",
          "affordable_payment"
        ],
        "origin": "CRITICAL_COVERAGE"
      },
      "title": "Contact Credit card issuer about the upcoming minimum",
      "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
      "reasoning": "Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]",
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
      "sourceIds": [],
      "ruleIds": [
        "R008"
      ],
      "claimIds": [],
      "dataQualityStatus": "PROTOTYPE_POLICY",
      "clarificationQuestion": null,
      "missingFields": [],
      "trace": {
        "evaluationId": "eval_49070fdc-7707-4201-8566-e9a2bfc81818",
        "userId": "979e01cc-7261-48e3-b720-2195868898d2",
        "snapshotId": "snap_beta_979e01cc-7261-48e3-b720-2195868898d2_v2_6c911a8325db003b",
        "snapshotVersion": "2.0",
        "createdAt": "2026-11-08T20:28:06.976Z",
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
              "title": "Contact Credit card issuer about the upcoming minimum",
              "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
              "rationale": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
              "targetId": "card",
              "sourceAccountId": null,
              "destinationAccountId": null,
              "amount": 20,
              "currency": "EUR",
              "proposedTiming": "2026-11-05",
              "supportingRuleIds": [
                "R008"
              ],
              "supportingClaimIds": [],
              "supportingSourceIds": [],
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
          "title": "Contact Credit card issuer about the upcoming minimum",
          "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
          "rationale": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
          "targetId": "card",
          "sourceAccountId": null,
          "destinationAccountId": null,
          "amount": 20,
          "currency": "EUR",
          "proposedTiming": "2026-11-05",
          "supportingRuleIds": [
            "R008"
          ],
          "supportingClaimIds": [],
          "supportingSourceIds": [],
          "requiredPiInputs": [
            "issuer_contact",
            "minimum_due",
            "affordable_payment"
          ],
          "origin": "CRITICAL_COVERAGE"
        },
        "stageArtifactIds": [
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:pi",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:fx",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:classification",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:pattern-recognition",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:behavior-agent",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:financial-calculator",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-calculator",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-agent",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:suggestion-generator",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:catalog-selector",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:checker",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:critical-coverage",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:ai-evaluation",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:weights",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:decision-engine",
          "eval_49070fdc-7707-4201-8566-e9a2bfc81818:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review debt-1 payment timing",
              "description": "Review the upcoming payment due date 2026-11-08 for debt-1 with an APR of 24% and balance of 900 EUR to align available cash.",
              "rationale": "Evaluating the timing of the impending due date helps identify potential shortfalls before the payment deadline.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "debt-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Available funding by the due date for debt-1"
              ],
              "factIds": [
                "debt-1",
                "account-1"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Available funding by the due date for debt-1",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Review obligation-1 timing and coverage",
              "description": "Review the energy obligation due on 2026-11-18 in relation to the upcoming income date.",
              "rationale": "Checking the timing of the utility bill ensures awareness of the gap before salary is received.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "obligation-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Available funding by the due date for obligation-1"
              ],
              "factIds": [
                "obligation-1",
                "income-1"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Available funding by the due date for obligation-1",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "Clarify payment arrangement for debt-1",
              "description": "Confirm whether any alternative payment arrangement has been offered for debt-1.",
              "rationale": "Gathering details on potential relief options aids in managing short-term liquidity constraints.",
              "actionId": null,
              "intent": "CLARIFY",
              "origin": "MODEL",
              "targetFactId": "debt-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Any payment arrangement already offered for debt-1"
              ],
              "factIds": [
                "debt-1"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Any payment arrangement already offered for debt-1",
              "evidence": []
            }
          ],
          "shortfallReason": "Projected liquid funds are insufficient to cover upcoming obligations and debt minimums prior to the next income date.",
          "fallbackReason": "NO_USEFUL_PRIMARY",
          "criticalCoverageAddedIds": [
            "A005",
            "A020"
          ]
        },
        "selectedActionType": "FINANCIAL_ACTION",
        "decisionStatus": "RECOMMENDATION_READY",
        "decisionReason": "Ask the issuer what options are available before the due date. Terms depend on the issuer.",
        "supportingSourceIds": [],
        "supportingRuleIds": [
          "R008"
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
      "title": "Review debt-1 payment timing",
      "description": "Review the upcoming payment due date 2026-11-08 for debt-1 with an APR of 24% and balance of 900 EUR to align available cash.",
      "rationale": "Evaluating the timing of the impending due date helps identify potential shortfalls before the payment deadline.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "debt-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Available funding by the due date for debt-1"
      ],
      "factIds": [
        "debt-1",
        "account-1"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Available funding by the due date for debt-1",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Review obligation-1 timing and coverage",
      "description": "Review the energy obligation due on 2026-11-18 in relation to the upcoming income date.",
      "rationale": "Checking the timing of the utility bill ensures awareness of the gap before salary is received.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "obligation-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Available funding by the due date for obligation-1"
      ],
      "factIds": [
        "obligation-1",
        "income-1"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Available funding by the due date for obligation-1",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Clarify payment arrangement for debt-1",
      "description": "Confirm whether any alternative payment arrangement has been offered for debt-1.",
      "rationale": "Gathering details on potential relief options aids in managing short-term liquidity constraints.",
      "actionId": null,
      "intent": "CLARIFY",
      "origin": "MODEL",
      "targetFactId": "debt-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Any payment arrangement already offered for debt-1"
      ],
      "factIds": [
        "debt-1"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Any payment arrangement already offered for debt-1",
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 31924
    },
    {
      "doc_key": "chat",
      "stored_bytes": 1024
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 872
    },
    {
      "doc_key": "chat-request:debt-context",
      "stored_bytes": 2140
    },
    {
      "doc_key": "engine",
      "stored_bytes": 72260
    },
    {
      "doc_key": "job-request:3ca3e7f4b4a6415093ee538f65e943e58476c14d37c76140f44097ce8a9ec7d4",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:88267902-643e-4e64-99d0-516938876791",
      "stored_bytes": 32364
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:ai-evaluation",
      "stored_bytes": 7284
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:behavior-agent",
      "stored_bytes": 2988
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:catalog-selector",
      "stored_bytes": 1660
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:checker",
      "stored_bytes": 11068
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:classification",
      "stored_bytes": 1924
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:critical-coverage",
      "stored_bytes": 3336
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-agent",
      "stored_bytes": 2484
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:debt-calculator",
      "stored_bytes": 1724
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:decision-engine",
      "stored_bytes": 9308
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:explanation",
      "stored_bytes": 2396
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:financial-calculator",
      "stored_bytes": 15848
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:fx",
      "stored_bytes": 1300
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:pattern-recognition",
      "stored_bytes": 3372
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:pi",
      "stored_bytes": 1612
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:suggestion-generator",
      "stored_bytes": 4692
    },
    {
      "doc_key": "stage:eval_49070fdc-7707-4201-8566-e9a2bfc81818:weights",
      "stored_bytes": 1728
    },
    {
      "doc_key": "state",
      "stored_bytes": 4808
    }
  ]
}
~~~~

## Summary

~~~~text
Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile "liquidity_protection". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]
~~~~
