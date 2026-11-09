# 01 Debt · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback and feedback-request:&lt;id&gt;; state.actionFeedback is an API projection when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_A001_eval_fe88c641-b456-481d-a275-90745095eedd",
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
    "id": "rec_A001_eval_fe88c641-b456-481d-a275-90745095eedd",
    "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
    "snapshotId": "snap_beta_f8b4bd21-3df9-4f4a-8cae-d475d50fc271_v2_d33f1441b5f73b9d",
    "actionType": "confirm_upcoming_bill",
    "title": "Pay required EUR 65 minimum on Credit card",
    "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
    "reasoning": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005). Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R001, R005; Sources: S002]",
    "suggestedAmount": 65,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "card",
    "sourceAccountId": "main",
    "priority": "priority",
    "status": "accepted",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:49:25.947Z",
    "updatedAt": "2026-11-08T20:49:39.161Z"
  },
  "decision": {
    "evaluationId": "eval_fe88c641-b456-481d-a275-90745095eedd",
    "snapshotId": "snap_beta_f8b4bd21-3df9-4f4a-8cae-d475d50fc271_v2_d33f1441b5f73b9d",
    "snapshotVersion": "2.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "CRITICAL",
    "selectedActionId": "A001",
    "selectedActionType": "FINANCIAL_ACTION",
    "candidate": {
      "candidateId": "crit_A001_card",
      "actionId": "A001",
      "actionType": "FINANCIAL_ACTION",
      "title": "Pay required EUR 65 minimum on Credit card",
      "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
      "rationale": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
      "targetId": "card",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 65,
      "currency": "EUR",
      "proposedTiming": "2026-11-08",
      "supportingRuleIds": [
        "R001",
        "R005"
      ],
      "supportingClaimIds": [
        "C013"
      ],
      "supportingSourceIds": [
        "S002"
      ],
      "requiredPiInputs": [
        "amount_due",
        "due_date",
        "bank_balance",
        "obligations"
      ],
      "origin": "CRITICAL_COVERAGE"
    },
    "title": "Pay required EUR 65 minimum on Credit card",
    "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
    "reasoning": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005). Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R001, R005; Sources: S002]",
    "expectedEffectSummary": "Addresses imminent payment or cash-flow shortfall directly (A001).",
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
      "S002"
    ],
    "ruleIds": [
      "R001",
      "R005"
    ],
    "claimIds": [
      "C013"
    ],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": null,
    "missingFields": [],
    "trace": {
      "evaluationId": "eval_fe88c641-b456-481d-a275-90745095eedd",
      "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
      "snapshotId": "snap_beta_f8b4bd21-3df9-4f4a-8cae-d475d50fc271_v2_d33f1441b5f73b9d",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T20:49:25.927Z",
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
        "triggerReason": "Liquid expense coverage M = 0.07 months is below entry threshold 1.00 months.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "crit_A001_card",
            "actionId": "A001",
            "actionType": "FINANCIAL_ACTION",
            "title": "Pay required EUR 65 minimum on Credit card",
            "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
            "rationale": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
            "targetId": "card",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 65,
            "currency": "EUR",
            "proposedTiming": "2026-11-08",
            "supportingRuleIds": [
              "R001",
              "R005"
            ],
            "supportingClaimIds": [
              "C013"
            ],
            "supportingSourceIds": [
              "S002"
            ],
            "requiredPiInputs": [
              "amount_due",
              "due_date",
              "bank_balance",
              "obligations"
            ],
            "origin": "CRITICAL_COVERAGE"
          },
          "status": "VALID",
          "isCritical": true,
          "criticalPriorityRank": 2,
          "resolvesCriticalProblemDirectly": true,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "amount_due",
              "status": "VERIFIED"
            },
            {
              "field": "due_date",
              "status": "VERIFIED"
            },
            {
              "field": "bank_balance",
              "status": "VERIFIED"
            },
            {
              "field": "obligations",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": -65,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "crit_A020_deficit",
            "actionId": "A020",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review projected EUR 65 cash shortfall before 2026-11-18",
            "description": "Projected cash drops below required obligations by 2026-11-18 (Utilities). Review upcoming bills and available balances.",
            "rationale": "Diagnostic alert (F004, F019, R009): flags upcoming payment shortfall for user verification without assuming automatic resolution.",
            "targetId": "utility",
            "sourceAccountId": null,
            "destinationAccountId": null,
            "amount": 65,
            "currency": "EUR",
            "proposedTiming": "2026-11-18",
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
          "projectedMinCashAfterAction": -65,
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
        "candidateId": "crit_A001_card",
        "actionId": "A001",
        "actionType": "FINANCIAL_ACTION",
        "title": "Pay required EUR 65 minimum on Credit card",
        "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
        "rationale": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
        "targetId": "card",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 65,
        "currency": "EUR",
        "proposedTiming": "2026-11-08",
        "supportingRuleIds": [
          "R001",
          "R005"
        ],
        "supportingClaimIds": [
          "C013"
        ],
        "supportingSourceIds": [
          "S002"
        ],
        "requiredPiInputs": [
          "amount_due",
          "due_date",
          "bank_balance",
          "obligations"
        ],
        "origin": "CRITICAL_COVERAGE"
      },
      "stageArtifactIds": [
        "eval_fe88c641-b456-481d-a275-90745095eedd:pi",
        "eval_fe88c641-b456-481d-a275-90745095eedd:fx",
        "eval_fe88c641-b456-481d-a275-90745095eedd:classification",
        "eval_fe88c641-b456-481d-a275-90745095eedd:pattern-recognition",
        "eval_fe88c641-b456-481d-a275-90745095eedd:behavior-agent",
        "eval_fe88c641-b456-481d-a275-90745095eedd:financial-calculator",
        "eval_fe88c641-b456-481d-a275-90745095eedd:debt-calculator",
        "eval_fe88c641-b456-481d-a275-90745095eedd:debt-agent",
        "eval_fe88c641-b456-481d-a275-90745095eedd:suggestion-generator",
        "eval_fe88c641-b456-481d-a275-90745095eedd:catalog-selector",
        "eval_fe88c641-b456-481d-a275-90745095eedd:checker",
        "eval_fe88c641-b456-481d-a275-90745095eedd:critical-coverage",
        "eval_fe88c641-b456-481d-a275-90745095eedd:ai-evaluation",
        "eval_fe88c641-b456-481d-a275-90745095eedd:weights",
        "eval_fe88c641-b456-481d-a275-90745095eedd:decision-engine",
        "eval_fe88c641-b456-481d-a275-90745095eedd:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review the upcoming credit card payment due date and APR",
            "description": "Examine the credit card debt {{debt-1.targetFactId}} with a balance of {{debt-1.balance}} {{debt-1.currency}}, a minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}}, and an APR of {{debt-1.apr}}%.",
            "rationale": "Reviewing the credit card details helps verify the upcoming payment commitment and understand interest costs.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "The proposal references an unavailable PI field.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review account balance and cash availability",
            "description": "Verify the current balance of {{account-1.balance}} {{account-1.currency}} in account {{account-1.id}} as of {{account-1.asOf}} to assess liquidity.",
            "rationale": "Checking current liquid funds clarifies the immediate financial position relative to scheduled obligations.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "account-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "The proposal references an unavailable PI field.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "What funds can you confirm are available before the payment due on 2026-11-18?",
            "description": "What funds can you confirm are available before the payment due on 2026-11-18?",
            "rationale": "Clarifying available funding for obligation-1 helps address the projected shortfall before the due date on 2026-11-18.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Available funding by the due date for obligation-1"
            ],
            "factIds": [
              "obligation-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Available funding by the due date for obligation-1",
            "evidence": []
          }
        ],
        "shortfallReason": "There is a projected shortfall of 65 EUR for the utility obligation due on 2026-11-18 because the payment date occurs before the incoming salary on 2026-11-25.",
        "fallbackReason": "NO_USEFUL_PRIMARY",
        "criticalCoverageAddedIds": [
          "A001",
          "A020"
        ]
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).",
      "supportingSourceIds": [
        "S002"
      ],
      "supportingRuleIds": [
        "R001",
        "R005"
      ],
      "supportingClaimIds": [
        "C013"
      ],
      "missingDataFields": [],
      "clarificationQuestion": null
    }
  },
  "feedbackRecord": {
    "id": "fb_1794170979211_accept",
    "recommendationId": "rec_A001_eval_fe88c641-b456-481d-a275-90745095eedd",
    "actionId": "A001",
    "snapshotId": "snap_beta_f8b4bd21-3df9-4f4a-8cae-d475d50fc271_v2_d33f1441b5f73b9d",
    "action": "accept",
    "amount": 65,
    "note": "User accepted recommendation (pending execution).",
    "timestamp": "2026-11-08T20:49:39.161Z"
  },
  "version": 2,
  "state": {
    "user": {
      "id": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
      "email": "debt@example.test",
      "authStatus": "unverified",
      "isDemoMode": false,
      "createdAt": "2026-11-08T20:48:28.268Z"
    },
    "profile": {
      "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
      "nickname": "01 Debt",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T20:48:28.268Z"
    },
    "onboarding": {
      "id": "8c2a3756-2d1f-4868-b70a-c4397417e1d6",
      "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T20:48:28.268Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accounts": [
      {
        "id": "main",
        "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
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
        "amount": 65,
        "currency": "EUR",
        "asOf": "2026-11-05T12:00:00.000Z",
        "sourceType": "user_reported",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "incomes": [
      {
        "id": "salary",
        "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
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
      "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
      "estimatedMonthlyAmount": 950,
      "currency": "EUR",
      "notes": "",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "utility",
        "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
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
        "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
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
        "id": "rec_A001_eval_fe88c641-b456-481d-a275-90745095eedd",
        "userId": "f8b4bd21-3df9-4f4a-8cae-d475d50fc271",
        "snapshotId": "snap_beta_f8b4bd21-3df9-4f4a-8cae-d475d50fc271_v2_d33f1441b5f73b9d",
        "actionType": "confirm_upcoming_bill",
        "title": "Pay required EUR 65 minimum on Credit card",
        "description": "Your required minimum payment of EUR 65 is due on 2026-11-08 (3 days).",
        "reasoning": "Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005). Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R001, R005; Sources: S002]",
        "suggestedAmount": 65,
        "adjustedAmount": null,
        "currency": "EUR",
        "targetGoalId": "card",
        "sourceAccountId": "main",
        "priority": "priority",
        "status": "accepted",
        "readinessState": "state_a_action_ready",
        "createdAt": "2026-11-08T20:49:25.947Z",
        "updatedAt": "2026-11-08T20:49:39.161Z"
      }
    ],
    "assistantMessages": [],
    "actionFeedback": [
      {
        "id": "fb_1794170979211_accept",
        "recommendationId": "rec_A001_eval_fe88c641-b456-481d-a275-90745095eedd",
        "actionId": "A001",
        "snapshotId": "snap_beta_f8b4bd21-3df9-4f4a-8cae-d475d50fc271_v2_d33f1441b5f73b9d",
        "action": "accept",
        "amount": 65,
        "note": "User accepted recommendation (pending execution).",
        "timestamp": "2026-11-08T20:49:39.161Z"
      }
    ]
  },
  "aiConsent": true,
  "experimentalRecommendations": true,
  "requestHash": "4af93833c3ab1b4c642d744f2bb821823daca59cea06ca15da4e28e0b17f7710"
}
~~~~
