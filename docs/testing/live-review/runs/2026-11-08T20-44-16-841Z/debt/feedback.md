# 01 Debt · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback and feedback-request:&lt;id&gt;; state.actionFeedback is an API projection when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_A005_eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
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
    "id": "rec_A005_eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
    "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
    "snapshotId": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
    "actionType": "confirm_upcoming_bill",
    "title": "Contact Credit card issuer about the upcoming minimum",
    "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
    "reasoning": "Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]",
    "suggestedAmount": null,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "card",
    "sourceAccountId": null,
    "priority": "priority",
    "status": "accepted",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:45:05.964Z",
    "updatedAt": "2026-11-08T20:45:12.217Z"
  },
  "decision": {
    "evaluationId": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
    "snapshotId": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
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
      "amount": null,
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
      "evaluationId": "eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
      "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
      "snapshotId": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T20:45:05.944Z",
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
            "amount": null,
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
        "amount": null,
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
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:pi",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:fx",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:classification",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:pattern-recognition",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:behavior-agent",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:financial-calculator",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:debt-calculator",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:debt-agent",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:suggestion-generator",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:catalog-selector",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:checker",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:critical-coverage",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:ai-evaluation",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:weights",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:decision-engine",
        "eval_776d6ec6-4596-4d00-b624-5d8d25022bff:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review the upcoming credit card minimum payment due date",
            "description": "Review the credit card minimum payment of 65 EUR due on 2026-11-08 with an APR of 24%.",
            "rationale": "This review unlocks clarity on the credit card obligation and timing given the available liquid balance of 20 EUR.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Independent contradiction check unavailable or incomplete.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review the upcoming utility obligation due date",
            "description": "Review the utility obligation amount of 65 EUR due on 2026-11-18.",
            "rationale": "This review clarifies the timing of the utility obligation falling before the salary income date of 2026-11-25.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "income-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Independent contradiction check unavailable or incomplete.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "What funds can you confirm are available before the payment due on 2026-11-08?",
            "description": "What funds can you confirm are available before the payment due on 2026-11-08?",
            "rationale": "Clarifies available funding to address the projected shortfall for debt-1.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
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
        "shortfallReason": "There is a projected shortfall for upcoming obligations due before the next salary income date.",
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
  "feedbackRecord": {
    "id": "fb_1794170712243_accept",
    "recommendationId": "rec_A005_eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
    "actionId": "A005",
    "snapshotId": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
    "action": "accept",
    "amount": null,
    "note": "User accepted recommendation (pending execution).",
    "timestamp": "2026-11-08T20:45:12.217Z"
  },
  "version": 2,
  "state": {
    "user": {
      "id": "95c98b30-4b53-4433-bede-39857eccce4f",
      "email": "debt@example.test",
      "authStatus": "unverified",
      "isDemoMode": false,
      "createdAt": "2026-11-08T20:44:17.705Z"
    },
    "profile": {
      "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T20:44:17.705Z"
    },
    "onboarding": {
      "id": "d7414aed-637d-41a8-abd7-066177b764e2",
      "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T20:44:17.705Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accounts": [
      {
        "id": "main",
        "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
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
        "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
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
      "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "utility",
        "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
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
        "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
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
        "id": "rec_A005_eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
        "userId": "95c98b30-4b53-4433-bede-39857eccce4f",
        "snapshotId": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
        "actionType": "confirm_upcoming_bill",
        "title": "Contact Credit card issuer about the upcoming minimum",
        "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
        "reasoning": "Ask the issuer what options are available before the due date. Terms depend on the issuer. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S001]",
        "suggestedAmount": null,
        "adjustedAmount": null,
        "currency": "EUR",
        "targetGoalId": "card",
        "sourceAccountId": null,
        "priority": "priority",
        "status": "accepted",
        "readinessState": "state_a_action_ready",
        "createdAt": "2026-11-08T20:45:05.964Z",
        "updatedAt": "2026-11-08T20:45:12.217Z"
      }
    ],
    "assistantMessages": [],
    "actionFeedback": [
      {
        "id": "fb_1794170712243_accept",
        "recommendationId": "rec_A005_eval_776d6ec6-4596-4d00-b624-5d8d25022bff",
        "actionId": "A005",
        "snapshotId": "snap_beta_95c98b30-4b53-4433-bede-39857eccce4f_v2_bfbca8c77ff12469",
        "action": "accept",
        "amount": null,
        "note": "User accepted recommendation (pending execution).",
        "timestamp": "2026-11-08T20:45:12.217Z"
      }
    ]
  },
  "aiConsent": true,
  "experimentalRecommendations": true,
  "requestHash": "2245030c3b64d1731ea37f1448141252f3c18656d7c4ef3fdf3378fd5e568dd3"
}
~~~~
