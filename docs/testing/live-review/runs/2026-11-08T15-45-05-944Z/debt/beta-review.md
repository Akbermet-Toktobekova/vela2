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
  "jobId": "a86a4a17-6a5a-45f4-b3ff-11da7e73e745",
  "decision": {
    "evaluationId": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989",
    "snapshotId": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
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
      "evaluationId": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989",
      "userId": "d30b9ce9-5a56-446e-b9bd-bdd3387d53ac",
      "snapshotId": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T15:45:19.307Z",
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
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pi",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:fx",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:classification",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pattern-recognition",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:behavior-agent",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:financial-calculator",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-calculator",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-agent",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:suggestion-generator",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:catalog-selector",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:checker",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:critical-coverage",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:ai-evaluation",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:weights",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:decision-engine",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review debt repayment strategy",
            "description": "Examine the credit card debt with a 24% APR and a minimum payment due on 2026-11-08 to understand the impact of interest and the 16.37-month payoff timeline.",
            "rationale": "The user has a high-interest credit card debt that requires attention, and research suggests that addressing debt behavior during 'teachable moments' (such as reviewing current financial status) is associated with stronger effects on financial behavior.",
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
            "title": "Check cash flow timing for upcoming obligations",
            "description": "Review the timing of the energy bill due on 2026-11-18 relative to the salary income expected on 2026-11-25 to ensure sufficient funds are available for the payment.",
            "rationale": "Pattern findings indicate the utility obligation occurs seven days before the salary income, creating a potential liquidity gap that requires proactive management.",
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
            "claimIds": [
              "C023"
            ],
            "status": "VALID",
            "reason": "The proposal targets an obligation fact with specific timing and income details provided in the context, and checking cash flow timing is a safe review action without financial execution.",
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
          }
        ],
        "shortfallReason": "The generator returned fewer than three proposals.",
        "fallbackReason": null,
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
    "id": "rec_A005_eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989",
    "userId": "d30b9ce9-5a56-446e-b9bd-bdd3387d53ac",
    "snapshotId": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
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
    "createdAt": "2026-11-08T15:45:19.321Z",
    "updatedAt": "2026-11-08T15:45:19.321Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pi",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:fx",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:classification",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pattern-recognition",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:behavior-agent",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:financial-calculator",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-calculator",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-agent",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:suggestion-generator",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:catalog-selector",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:checker",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:critical-coverage",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:ai-evaluation",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:weights",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:decision-engine",
        "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:explanation"
      ],
      "evaluationId": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989",
      "userId": "d30b9ce9-5a56-446e-b9bd-bdd3387d53ac",
      "snapshotId": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T15:45:19.307Z",
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
            "title": "Review debt repayment strategy",
            "description": "Examine the credit card debt with a 24% APR and a minimum payment due on 2026-11-08 to understand the impact of interest and the 16.37-month payoff timeline.",
            "rationale": "The user has a high-interest credit card debt that requires attention, and research suggests that addressing debt behavior during 'teachable moments' (such as reviewing current financial status) is associated with stronger effects on financial behavior.",
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
            "title": "Check cash flow timing for upcoming obligations",
            "description": "Review the timing of the energy bill due on 2026-11-18 relative to the salary income expected on 2026-11-25 to ensure sufficient funds are available for the payment.",
            "rationale": "Pattern findings indicate the utility obligation occurs seven days before the salary income, creating a potential liquidity gap that requires proactive management.",
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
            "claimIds": [
              "C023"
            ],
            "status": "VALID",
            "reason": "The proposal targets an obligation fact with specific timing and income details provided in the context, and checking cash flow timing is a safe review action without financial execution.",
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
          }
        ],
        "shortfallReason": "The generator returned fewer than three proposals.",
        "fallbackReason": null,
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
      "evaluationId": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989",
      "snapshotId": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
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
        "evaluationId": "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989",
        "userId": "d30b9ce9-5a56-446e-b9bd-bdd3387d53ac",
        "snapshotId": "snap_beta_d30b9ce9-5a56-446e-b9bd-bdd3387d53ac_v2_ca1df4033b14bf8d",
        "snapshotVersion": "2.0",
        "createdAt": "2026-11-08T15:45:19.307Z",
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
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pi",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:fx",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:classification",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pattern-recognition",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:behavior-agent",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:financial-calculator",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-calculator",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-agent",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:suggestion-generator",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:catalog-selector",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:checker",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:critical-coverage",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:ai-evaluation",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:weights",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:decision-engine",
          "eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review debt repayment strategy",
              "description": "Examine the credit card debt with a 24% APR and a minimum payment due on 2026-11-08 to understand the impact of interest and the 16.37-month payoff timeline.",
              "rationale": "The user has a high-interest credit card debt that requires attention, and research suggests that addressing debt behavior during 'teachable moments' (such as reviewing current financial status) is associated with stronger effects on financial behavior.",
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
              "title": "Check cash flow timing for upcoming obligations",
              "description": "Review the timing of the energy bill due on 2026-11-18 relative to the salary income expected on 2026-11-25 to ensure sufficient funds are available for the payment.",
              "rationale": "Pattern findings indicate the utility obligation occurs seven days before the salary income, creating a potential liquidity gap that requires proactive management.",
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
              "claimIds": [
                "C023"
              ],
              "status": "VALID",
              "reason": "The proposal targets an obligation fact with specific timing and income details provided in the context, and checking cash flow timing is a safe review action without financial execution.",
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
            }
          ],
          "shortfallReason": "The generator returned fewer than three proposals.",
          "fallbackReason": null,
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
      "title": "Review debt repayment strategy",
      "description": "Examine the credit card debt with a 24% APR and a minimum payment due on 2026-11-08 to understand the impact of interest and the 16.37-month payoff timeline.",
      "rationale": "The user has a high-interest credit card debt that requires attention, and research suggests that addressing debt behavior during 'teachable moments' (such as reviewing current financial status) is associated with stronger effects on financial behavior.",
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
      "title": "Check cash flow timing for upcoming obligations",
      "description": "Review the timing of the energy bill due on 2026-11-18 relative to the salary income expected on 2026-11-25 to ensure sufficient funds are available for the payment.",
      "rationale": "Pattern findings indicate the utility obligation occurs seven days before the salary income, creating a potential liquidity gap that requires proactive management.",
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
      "claimIds": [
        "C023"
      ],
      "status": "VALID",
      "reason": "The proposal targets an obligation fact with specific timing and income details provided in the context, and checking cash flow timing is a safe review action without financial execution.",
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
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 32816
    },
    {
      "doc_key": "chat",
      "stored_bytes": 1000
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 896
    },
    {
      "doc_key": "chat-request:debt-context",
      "stored_bytes": 2088
    },
    {
      "doc_key": "engine",
      "stored_bytes": 74364
    },
    {
      "doc_key": "job-request:1c0af0b302f5d8e01072447bdcb0100444d3b081e8ce066d93e10f9732e35b31",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:a86a4a17-6a5a-45f4-b3ff-11da7e73e745",
      "stored_bytes": 33256
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:ai-evaluation",
      "stored_bytes": 7284
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:behavior-agent",
      "stored_bytes": 3116
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:catalog-selector",
      "stored_bytes": 1656
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:checker",
      "stored_bytes": 11816
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:classification",
      "stored_bytes": 1924
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:critical-coverage",
      "stored_bytes": 3400
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-agent",
      "stored_bytes": 2620
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:debt-calculator",
      "stored_bytes": 1724
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:decision-engine",
      "stored_bytes": 9620
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:explanation",
      "stored_bytes": 2472
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:financial-calculator",
      "stored_bytes": 15848
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:fx",
      "stored_bytes": 1300
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pattern-recognition",
      "stored_bytes": 3396
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:pi",
      "stored_bytes": 1612
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:suggestion-generator",
      "stored_bytes": 3976
    },
    {
      "doc_key": "stage:eval_ff2c4489-3545-4f5a-bfc9-0f384bd51989:weights",
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
