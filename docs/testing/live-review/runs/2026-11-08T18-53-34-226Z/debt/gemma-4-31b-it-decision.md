# 01 Debt · gemma 4 31b it decision

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Isolated decision replay with frozen complexity inputs. Runtime database unchanged. | — |

## Input

~~~~json
{
  "sourceRun": "2026-11-08T16-41-15-473Z",
  "checkerOutput": {
    "allResults": [
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
    "validFinancialCandidates": [],
    "validCriticalCandidates": [
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
    "validVerificationCandidates": [],
    "rejectedCandidates": [],
    "needsDataCandidates": [],
    "missingFieldsUnion": [],
    "criticalCoverageAddedIds": [
      "A005",
      "A020"
    ],
    "fallbackTriggered": false
  },
  "fallbackReason": "NO_VALID_PRIMARY"
}
~~~~

## Output

~~~~json
{
  "evaluationId": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a",
  "snapshotId": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693",
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
  "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
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
    "evaluationId": "eval_8a458f5d-fcd5-4c12-9b39-0a8005a5766a",
    "userId": "936917e7-f0ca-4346-85f0-45dd0460deee",
    "snapshotId": "snap_beta_936917e7-f0ca-4346-85f0-45dd0460deee_v2_d42905fbd8b88693",
    "snapshotVersion": "2.0",
    "createdAt": "2026-11-08T18:54:47.477Z",
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
~~~~
