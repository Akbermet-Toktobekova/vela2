# 01 Debt · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback and feedback-request:&lt;id&gt;; state.actionFeedback is an API projection when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_A005_eval_17e9f39a-128c-433f-88c0-3f505ecf11e4",
  "action": "accept",
  "expectedVersion": 2,
  "requestId": "debt-accept"
}
~~~~

## Output

~~~~json
{
  "status": "ACCEPTED",
  "accepted": true,
  "recommendation": {
    "id": "rec_A005_eval_17e9f39a-128c-433f-88c0-3f505ecf11e4",
    "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
    "snapshotId": "snap_beta_1a48dbe4-9dc4-4dbb-8f36-eb1586635655_v2_6cab96e174f9c6a2",
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
    "status": "accepted",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:06:51.723Z",
    "updatedAt": "2026-11-08T20:06:57.692Z"
  },
  "decision": {
    "evaluationId": "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4",
    "snapshotId": "snap_beta_1a48dbe4-9dc4-4dbb-8f36-eb1586635655_v2_6cab96e174f9c6a2",
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
      "evaluationId": "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4",
      "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
      "snapshotId": "snap_beta_1a48dbe4-9dc4-4dbb-8f36-eb1586635655_v2_6cab96e174f9c6a2",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T20:06:51.703Z",
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
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:pi",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:fx",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:classification",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:pattern-recognition",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:behavior-agent",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:financial-calculator",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:debt-calculator",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:debt-agent",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:suggestion-generator",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:catalog-selector",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:checker",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:critical-coverage",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:ai-evaluation",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:weights",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:decision-engine",
        "eval_17e9f39a-128c-433f-88c0-3f505ecf11e4:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review Credit Card Payment Risk",
            "description": "Review the upcoming credit card minimum payment due on 2026-11-08 and check available liquid funds.",
            "rationale": "The credit card minimum payment of EUR 65 is due on 2026-11-08, but the personal accessible balance is EUR 20, indicating a projected shortfall of EUR 45.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Advice requires executable financial checks or contains a monetary amount or rate.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review Utility Obligation Timing",
            "description": "Examine the energy obligation due on 2026-11-18 relative to the monthly salary income date of 2025-11-25.",
            "rationale": "The utility obligation date of 2026-11-18 occurs before the salary income date of 2026-11-25, highlighting a cash timing gap.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "income-1"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The proposal correctly examines the energy obligation due on 2026-11-18 relative to the salary income timing, grounded in obligation-1 and income-1 without conflicting with any PI or AS facts.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Clarify Available Funding for Debt",
            "description": "Clarify what funds can be confirmed as available before the payment due on 2026-11-08 for debt-1.",
            "rationale": "There is a projected shortfall for the credit card payment due on 2026-11-08 requiring confirmation of funding.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "prerequisites": [],
            "missingInfo": [
              "Available funding by the due date for debt-1"
            ],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Available funding by the due date for debt-1",
            "evidence": []
          }
        ],
        "shortfallReason": "Projected cash shortfalls exist for both the credit card minimum payment due on 2026-11-08 and the energy obligation due on 2026-11-18 against the current account balance.",
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
  "feedbackRecord": {
    "id": "fb_1794168417705_accept",
    "recommendationId": "rec_A005_eval_17e9f39a-128c-433f-88c0-3f505ecf11e4",
    "actionId": "A005",
    "snapshotId": "snap_beta_1a48dbe4-9dc4-4dbb-8f36-eb1586635655_v2_6cab96e174f9c6a2",
    "action": "accept",
    "amount": 20,
    "note": "User accepted recommendation (pending execution).",
    "timestamp": "2026-11-08T20:06:57.692Z"
  },
  "version": 2,
  "state": {
    "user": {
      "id": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
      "email": "debt@example.test",
      "authStatus": "unverified",
      "isDemoMode": false,
      "createdAt": "2026-11-08T20:06:05.654Z"
    },
    "profile": {
      "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T20:06:05.654Z"
    },
    "onboarding": {
      "id": "34dd49c7-952d-4bea-975a-7b63a0d1a133",
      "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T20:06:05.654Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accounts": [
      {
        "id": "main",
        "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
        "name": "Current account",
        "institution": "Synthetic bank",
        "currency": "EUR",
        "purposes": [
          "daily_spending"
        ],
        "fundsOwnership": "personal",
        "personalAvailableAmount": null,
        "isPrimary": true,
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "balances": [
      {
        "id": "balance-main",
        "accountId": "main",
        "amount": 20,
        "currency": "EUR",
        "asOf": "2026-11-05T12:00:00.000Z",
        "sourceType": "user_reported",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "incomes": [
      {
        "id": "salary",
        "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
        "name": "Salary",
        "pattern": "regular",
        "estimatedMonthlyAmount": 1800,
        "currency": "EUR",
        "frequency": "monthly",
        "sourceType": "salary",
        "nextExpectedDate": "2026-11-25",
        "receivingAccountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "expenseCommitment": {
      "id": "essentials",
      "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "utility",
        "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
        "name": "Utilities",
        "amount": 65,
        "currency": "EUR",
        "dueDate": "2026-11-18",
        "recurrence": "monthly",
        "category": "energy",
        "status": "unpaid",
        "accountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "debts": [
      {
        "id": "card",
        "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
        "name": "Credit card",
        "debtType": "credit_card",
        "currency": "EUR",
        "remainingBalance": 900,
        "apr": 24,
        "minimumPayment": 65,
        "nextDueDate": "2026-11-08",
        "paymentFrequency": "monthly",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "goals": [],
    "goalAllocations": [],
    "statements": [],
    "transactions": [],
    "classifications": [],
    "transferMatches": [],
    "confirmations": [],
    "recommendations": [
      {
        "id": "rec_A005_eval_17e9f39a-128c-433f-88c0-3f505ecf11e4",
        "userId": "1a48dbe4-9dc4-4dbb-8f36-eb1586635655",
        "snapshotId": "snap_beta_1a48dbe4-9dc4-4dbb-8f36-eb1586635655_v2_6cab96e174f9c6a2",
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
        "status": "accepted",
        "readinessState": "state_a_action_ready",
        "createdAt": "2026-11-08T20:06:51.723Z",
        "updatedAt": "2026-11-08T20:06:57.692Z"
      }
    ],
    "assistantMessages": [],
    "actionFeedback": [
      {
        "id": "fb_1794168417705_accept",
        "recommendationId": "rec_A005_eval_17e9f39a-128c-433f-88c0-3f505ecf11e4",
        "actionId": "A005",
        "snapshotId": "snap_beta_1a48dbe4-9dc4-4dbb-8f36-eb1586635655_v2_6cab96e174f9c6a2",
        "action": "accept",
        "amount": 20,
        "note": "User accepted recommendation (pending execution).",
        "timestamp": "2026-11-08T20:06:57.692Z"
      }
    ]
  },
  "aiConsent": true,
  "experimentalRecommendations": true,
  "requestHash": "8ce27748a491da29cc327be3b793a2ec2cf12b9b4502846ec25b87b6c03cfd8c"
}
~~~~
