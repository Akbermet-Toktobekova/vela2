# 03 Nora · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback and feedback-request:&lt;id&gt;; state.actionFeedback is an API projection when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_A014_eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
  "action": "accept",
  "expectedVersion": 4,
  "requestId": "nora-accept"
}
~~~~

## Output

~~~~json
{
  "status": "ACCEPTED",
  "accepted": true,
  "recommendation": {
    "id": "rec_A014_eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
    "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
    "snapshotId": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
    "actionType": "review_recurring_subscription",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "suggestedAmount": 10.99,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "txn_stmt_1794172448951_r4ll_6",
    "sourceAccountId": "main",
    "priority": "clarification",
    "status": "accepted",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T21:15:16.545Z",
    "updatedAt": "2026-11-08T21:15:22.339Z"
  },
  "decision": {
    "evaluationId": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
    "snapshotId": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
    "snapshotVersion": "4.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1794172448951_r4ll_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794172448951_r4ll_6",
      "sourceAccountId": "main",
      "destinationAccountId": null,
      "amount": 10.99,
      "currency": "EUR",
      "proposedTiming": null,
      "supportingRuleIds": [
        "R010"
      ],
      "supportingClaimIds": [
        "C004"
      ],
      "supportingSourceIds": [
        "S001"
      ],
      "requiredPiInputs": [
        "transactions",
        "merchant",
        "frequency"
      ],
      "origin": "CATALOG_FALLBACK"
    },
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "expectedEffectSummary": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?",
    "weightProfileId": "goal_advancement",
    "weights": {
      "resilience": 0.2,
      "financial_benefit": 0.2,
      "goal_progress": 0.6
    },
    "values": null,
    "rawImpacts": null,
    "complexity": null,
    "score": null,
    "stability": null,
    "policyVersion": "prototype_policy_bundle_v1.4",
    "sourceIds": [
      "S001"
    ],
    "ruleIds": [
      "R010"
    ],
    "claimIds": [
      "C004"
    ],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?",
    "missingFields": [
      "fresh_account_balance",
      "stale_pi:liquid_balance",
      "stale_account_balance",
      "dated_essential_outflows",
      "stale_pi:cash_flow",
      "verified_debt_interest_terms",
      "required_pi:monthly_fee",
      "required_pi:exit_terms",
      "subscription_usage_and_exit_terms_confirmation"
    ],
    "trace": {
      "evaluationId": "eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
      "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
      "snapshotId": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T21:15:16.521Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "VERIFICATION_UNLOCK",
      "weightSelection": {
        "profileId": "goal_advancement",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.2,
          "F": 0.2,
          "G": 0.6
        },
        "triggerReason": "Coverage M = 2.88 months is sufficient, no high-APR debt is accruing, and goal 'Emergency reserve' is active and unfulfilled.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "cand_A007_snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
            "actionId": "A007",
            "actionType": "FINANCIAL_ACTION",
            "title": "Add EUR 360 to your emergency reserve",
            "description": "Earmark EUR 360 from uncommitted available cash (EUR 2405.01 safe after upcoming bills) into your accessible emergency cushion.",
            "rationale": "Organizes existing liquid funds for an emergency goal; liquid coverage is 2.88 months. Earmarking equally liquid cash does not itself increase liquidity. Checker must verify obligations over the 90-day horizon.",
            "targetId": "reserve",
            "sourceAccountId": "main",
            "destinationAccountId": "savings",
            "amount": 360,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R002",
              "R003",
              "R011"
            ],
            "supportingClaimIds": [
              "C001",
              "C002"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "liquid_balance",
              "mandatory_outflows",
              "amount"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "stale_pi:liquid_balance",
            "stale_account_balance",
            "dated_essential_outflows"
          ],
          "inputEvidence": [
            {
              "field": "liquid_balance",
              "status": "STALE"
            },
            {
              "field": "mandatory_outflows",
              "status": "VERIFIED"
            },
            {
              "field": "amount",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 2045.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A002_card",
            "actionId": "A002",
            "actionType": "FINANCIAL_ACTION",
            "title": "Pay an extra EUR 850 toward Credit card",
            "description": "Apply EUR 850 above the required minimum toward Credit card (21.9% APR).",
            "rationale": "Targets Credit card principal reduction. Checker must confirm current debt terms and deterministic code must calculate interest effects; no interest-accrual assumption is made here (R006, F008).",
            "targetId": "card",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 850,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R001",
              "R002",
              "R006"
            ],
            "supportingClaimIds": [
              "C014",
              "C015"
            ],
            "supportingSourceIds": [
              "S002",
              "S003"
            ],
            "requiredPiInputs": [
              "extra_amount",
              "apr",
              "balance",
              "cash_flow"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "stale_pi:cash_flow",
            "stale_account_balance",
            "verified_debt_interest_terms",
            "dated_essential_outflows"
          ],
          "inputEvidence": [
            {
              "field": "extra_amount",
              "status": "VERIFIED"
            },
            {
              "field": "apr",
              "status": "VERIFIED"
            },
            {
              "field": "balance",
              "status": "VERIFIED"
            },
            {
              "field": "cash_flow",
              "status": "STALE"
            }
          ],
          "projectedMinCashAfterAction": 1555.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A015_txn_stmt_1794172448951_r4ll_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794172448951_r4ll_6",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 10.99,
            "currency": "EUR",
            "proposedTiming": "2026-11-05",
            "supportingRuleIds": [
              "R010"
            ],
            "supportingClaimIds": [
              "C004"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "merchant",
              "monthly_fee",
              "exit_terms"
            ],
            "origin": "AI_SUGGESTION"
          },
          "status": "NEEDS_DATA",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [
            "fresh_account_balance",
            "required_pi:monthly_fee",
            "required_pi:exit_terms",
            "stale_account_balance",
            "subscription_usage_and_exit_terms_confirmation"
          ],
          "inputEvidence": [
            {
              "field": "merchant",
              "status": "VERIFIED"
            },
            {
              "field": "monthly_fee",
              "status": "MISSING"
            },
            {
              "field": "exit_terms",
              "status": "MISSING"
            }
          ],
          "projectedMinCashAfterAction": 2405.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "verify_A014_txn_stmt_1794172448951_r4ll_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794172448951_r4ll_6",
            "sourceAccountId": "main",
            "destinationAccountId": null,
            "amount": 10.99,
            "currency": "EUR",
            "proposedTiming": null,
            "supportingRuleIds": [
              "R010"
            ],
            "supportingClaimIds": [
              "C004"
            ],
            "supportingSourceIds": [
              "S001"
            ],
            "requiredPiInputs": [
              "transactions",
              "merchant",
              "frequency"
            ],
            "origin": "CATALOG_FALLBACK"
          },
          "status": "VALID",
          "isCritical": false,
          "criticalPriorityRank": null,
          "resolvesCriticalProblemDirectly": false,
          "failedChecks": [],
          "missingFields": [],
          "inputEvidence": [
            {
              "field": "transactions",
              "status": "VERIFIED"
            },
            {
              "field": "merchant",
              "status": "VERIFIED"
            },
            {
              "field": "frequency",
              "status": "VERIFIED"
            }
          ],
          "projectedMinCashAfterAction": 2405.01,
          "unlocksActionIds": [
            "A015"
          ]
        }
      ],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "verify_A014_txn_stmt_1794172448951_r4ll_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794172448951_r4ll_6",
        "sourceAccountId": "main",
        "destinationAccountId": null,
        "amount": 10.99,
        "currency": "EUR",
        "proposedTiming": null,
        "supportingRuleIds": [
          "R010"
        ],
        "supportingClaimIds": [
          "C004"
        ],
        "supportingSourceIds": [
          "S001"
        ],
        "requiredPiInputs": [
          "transactions",
          "merchant",
          "frequency"
        ],
        "origin": "CATALOG_FALLBACK"
      },
      "stageArtifactIds": [
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:pi",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:fx",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:classification",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:pattern-recognition",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:behavior-agent",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:financial-calculator",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:debt-calculator",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:debt-agent",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:suggestion-generator",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:catalog-selector",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:checker",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:critical-coverage",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:ai-evaluation",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:weights",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:decision-engine",
        "eval_ef139460-80d6-4c77-873a-5b60015ebf2e:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review the interest accrual status for debt-1",
            "description": "Review the latest statement for the credit card balance of 850 EUR with an APR of 21.9% and a next due date of 2026-11-15 to verify whether interest is currently accruing.",
            "rationale": "Checking the accrual status clarifies debt-1 terms using verified financial data.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Interest accrual status for debt-1"
            ],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Interest accrual status for debt-1",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Clarify current account balances",
            "description": "What is the current available balance and balance date for each affected account?",
            "rationale": "Account balances are currently marked as stale and require verification.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "account-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Current dated account balances"
            ],
            "factIds": [
              "account-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Current dated account balances",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Clarify confirmed funding arrangement for obligation-1",
            "description": "Is the rent payment due on 2026-11-06 already scheduled, and which funded account will cover it?",
            "rationale": "Confirming the funding arrangement ensures proper obligation tracking ahead of the due date.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Confirmed funding arrangement for obligation-1"
            ],
            "factIds": [
              "obligation-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Confirmed funding arrangement for obligation-1",
            "evidence": []
          }
        ],
        "shortfallReason": "",
        "fallbackReason": "NO_USEFUL_PRIMARY",
        "criticalCoverageAddedIds": []
      },
      "selectedActionType": "VERIFICATION_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "supportingSourceIds": [
        "S001"
      ],
      "supportingRuleIds": [
        "R010"
      ],
      "supportingClaimIds": [
        "C004"
      ],
      "missingDataFields": [
        "fresh_account_balance",
        "stale_pi:liquid_balance",
        "stale_account_balance",
        "dated_essential_outflows",
        "stale_pi:cash_flow",
        "verified_debt_interest_terms",
        "required_pi:monthly_fee",
        "required_pi:exit_terms",
        "subscription_usage_and_exit_terms_confirmation"
      ],
      "clarificationQuestion": "Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?"
    }
  },
  "feedbackRecord": {
    "id": "fb_1794172522436_accept",
    "recommendationId": "rec_A014_eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
    "actionId": "A014",
    "snapshotId": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
    "action": "accept",
    "amount": 10.99,
    "note": "User accepted recommendation (pending execution).",
    "timestamp": "2026-11-08T21:15:22.339Z"
  },
  "version": 4,
  "state": {
    "user": {
      "id": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
      "email": "nora@example.test",
      "authStatus": "unverified",
      "isDemoMode": false,
      "createdAt": "2026-11-08T21:14:08.597Z"
    },
    "profile": {
      "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
      "nickname": "03 Nora",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-08T21:14:08.597Z"
    },
    "onboarding": {
      "id": "3a66f01d-6603-4834-9caa-aa3dabe177e9",
      "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-08T21:14:08.597Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accounts": [
      {
        "id": "main",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "name": "Daily Account",
        "institution": "Fictional Retail Bank",
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
      },
      {
        "id": "savings",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "name": "Reserve Account",
        "institution": "Fictional Savings Bank",
        "currency": "EUR",
        "purposes": [
          "savings"
        ],
        "fundsOwnership": "personal",
        "personalAvailableAmount": null,
        "isPrimary": false,
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "balances": [
      {
        "id": "1d1f599d-c7f5-414f-935b-0d4ea1efd845",
        "accountId": "main",
        "amount": 3577.01,
        "currency": "EUR",
        "asOf": "2026-10-28",
        "sourceType": "statement_closing",
        "sourceId": "stmt_1794172448951_r4ll",
        "createdAt": "2026-11-08T21:14:08.953Z"
      },
      {
        "id": "ceefa4b0-d354-4563-bf23-84e7552ee9c0",
        "accountId": "savings",
        "amount": 600,
        "currency": "EUR",
        "asOf": "2026-10-28",
        "sourceType": "statement_closing",
        "sourceId": "stmt_1794172449152_lffk",
        "createdAt": "2026-11-08T21:14:09.153Z"
      }
    ],
    "incomes": [
      {
        "id": "salary",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "name": "Monthly salary",
        "pattern": "regular",
        "estimatedMonthlyAmount": 2350,
        "currency": "EUR",
        "frequency": "monthly",
        "sourceType": "salary",
        "nextExpectedDate": "2026-11-27",
        "receivingAccountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "expenseCommitment": {
      "id": "essentials",
      "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
      "estimatedMonthlyAmount": 1450,
      "currency": "EUR",
      "notes": "Synthetic user estimate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "rent",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "name": "Apartment rent",
        "amount": 980,
        "currency": "EUR",
        "dueDate": "2026-11-06",
        "recurrence": "monthly",
        "category": "rent",
        "status": "unpaid",
        "accountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "energy",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "name": "Electricity",
        "amount": 105,
        "currency": "EUR",
        "dueDate": "2026-11-10",
        "recurrence": "monthly",
        "category": "energy",
        "status": "unpaid",
        "accountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "internet",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "name": "Home internet",
        "amount": 32,
        "currency": "EUR",
        "dueDate": "2026-11-12",
        "recurrence": "monthly",
        "category": "internet",
        "status": "unpaid",
        "accountId": "main",
        "notes": "",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "debts": [
      {
        "id": "card",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "name": "Credit card",
        "debtType": "credit_card",
        "currency": "EUR",
        "remainingBalance": 850,
        "apr": 21.9,
        "minimumPayment": 55,
        "nextDueDate": "2026-11-15",
        "paymentFrequency": "monthly",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "goals": [
      {
        "id": "reserve",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "name": "Emergency reserve",
        "goalType": "emergency_cushion",
        "targetAmount": 3000,
        "currency": "EUR",
        "targetDate": "2027-06-30",
        "priority": "high",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "goalAllocations": [
      {
        "id": "reserved",
        "goalId": "reserve",
        "accountId": "savings",
        "amount": 600,
        "currency": "EUR",
        "allocatedAt": "2026-11-05",
        "note": "Existing reserve balance earmarked for this goal",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7"
      }
    ],
    "statements": [
      {
        "id": "stmt_1794172448951_r4ll",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "fileName": "daily.csv",
        "fileFormat": "csv",
        "fileHash": "hash_acb4f636_4002",
        "periodStart": "2026-08-03",
        "periodEnd": "2026-10-28",
        "currency": "EUR",
        "transactionCount": 45,
        "duplicateCountSkipped": 0,
        "status": "needs_review",
        "closingBalance": 3577.01,
        "importedAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "stmt_1794172449152_lffk",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "savings",
        "fileName": "reserve.csv",
        "fileFormat": "csv",
        "fileHash": "hash_bc62e127_326",
        "periodStart": "2026-08-28",
        "periodEnd": "2026-10-28",
        "currency": "EUR",
        "transactionCount": 3,
        "duplicateCountSkipped": 0,
        "status": "needs_review",
        "closingBalance": 600,
        "importedAt": "2026-11-08T21:14:09.152Z"
      }
    ],
    "transactions": [
      {
        "id": "txn_stmt_1794172448951_r4ll_1",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-03",
        "amount": -980,
        "currency": "EUR",
        "description": "Apartment rent",
        "counterparty": "Harbor Properties",
        "reference": "RENT-08",
        "rawRow": {
          "date": "2026-08-03",
          "description": "Apartment rent",
          "counterparty": "Harbor Properties",
          "amount": "-980.00",
          "currency": "EUR",
          "reference": "RENT-08",
          "balance": "780.00",
          "__source_row": "2",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_2",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-05",
        "amount": -89.4,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD1-08",
        "rawRow": {
          "date": "2026-08-05",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-89.40",
          "currency": "EUR",
          "reference": "FOOD1-08",
          "balance": "690.60",
          "__source_row": "3",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_3",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-06",
        "amount": -42,
        "currency": "EUR",
        "description": "Metro pass",
        "counterparty": "City Transit",
        "reference": "METRO-08",
        "rawRow": {
          "date": "2026-08-06",
          "description": "Metro pass",
          "counterparty": "City Transit",
          "amount": "-42.00",
          "currency": "EUR",
          "reference": "METRO-08",
          "balance": "648.60",
          "__source_row": "4",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_4",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-08",
        "amount": -105,
        "currency": "EUR",
        "description": "Electricity utility",
        "counterparty": "Bright Energy",
        "reference": "ENERGY-08",
        "rawRow": {
          "date": "2026-08-08",
          "description": "Electricity utility",
          "counterparty": "Bright Energy",
          "amount": "-105.00",
          "currency": "EUR",
          "reference": "ENERGY-08",
          "balance": "543.60",
          "__source_row": "5",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_5",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-10",
        "amount": -32,
        "currency": "EUR",
        "description": "Internet bill",
        "counterparty": "Fiber Home",
        "reference": "NET-08",
        "rawRow": {
          "date": "2026-08-10",
          "description": "Internet bill",
          "counterparty": "Fiber Home",
          "amount": "-32.00",
          "currency": "EUR",
          "reference": "NET-08",
          "balance": "511.60",
          "__source_row": "6",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_6",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-12",
        "amount": -10.99,
        "currency": "EUR",
        "description": "Music subscription",
        "counterparty": "Sound Library",
        "reference": "MUSIC-08",
        "rawRow": {
          "date": "2026-08-12",
          "description": "Music subscription",
          "counterparty": "Sound Library",
          "amount": "-10.99",
          "currency": "EUR",
          "reference": "MUSIC-08",
          "balance": "500.61",
          "__source_row": "7",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_7",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-14",
        "amount": -55,
        "currency": "EUR",
        "description": "Credit card payment",
        "counterparty": "Fictional Card Services",
        "reference": "CARD-08",
        "rawRow": {
          "date": "2026-08-14",
          "description": "Credit card payment",
          "counterparty": "Fictional Card Services",
          "amount": "-55.00",
          "currency": "EUR",
          "reference": "CARD-08",
          "balance": "445.61",
          "__source_row": "8",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_8",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-16",
        "amount": -94.8,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD2-08",
        "rawRow": {
          "date": "2026-08-16",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-94.80",
          "currency": "EUR",
          "reference": "FOOD2-08",
          "balance": "350.81",
          "__source_row": "9",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_9",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-18",
        "amount": -14.7,
        "currency": "EUR",
        "description": "Coffee shop",
        "counterparty": "Corner Coffee",
        "reference": "CAFE-08",
        "rawRow": {
          "date": "2026-08-18",
          "description": "Coffee shop",
          "counterparty": "Corner Coffee",
          "amount": "-14.70",
          "currency": "EUR",
          "reference": "CAFE-08",
          "balance": "336.11",
          "__source_row": "10",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_10",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-20",
        "amount": -44.5,
        "currency": "EUR",
        "description": "Restaurant",
        "counterparty": "Maple Kitchen",
        "reference": "DINNER-08",
        "rawRow": {
          "date": "2026-08-20",
          "description": "Restaurant",
          "counterparty": "Maple Kitchen",
          "amount": "-44.50",
          "currency": "EUR",
          "reference": "DINNER-08",
          "balance": "291.61",
          "__source_row": "11",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_11",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-21",
        "amount": -15.99,
        "currency": "EUR",
        "description": "Video streaming subscription",
        "counterparty": "Screen Library",
        "reference": "VIDEO-08",
        "rawRow": {
          "date": "2026-08-21",
          "description": "Video streaming subscription",
          "counterparty": "Screen Library",
          "amount": "-15.99",
          "currency": "EUR",
          "reference": "VIDEO-08",
          "balance": "275.62",
          "__source_row": "12",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_12",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-23",
        "amount": -22.6,
        "currency": "EUR",
        "description": "Pharmacy purchase",
        "counterparty": "Oak Pharmacy",
        "reference": "PHARM-08",
        "rawRow": {
          "date": "2026-08-23",
          "description": "Pharmacy purchase",
          "counterparty": "Oak Pharmacy",
          "amount": "-22.60",
          "currency": "EUR",
          "reference": "PHARM-08",
          "balance": "253.02",
          "__source_row": "13",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_13",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-25",
        "amount": -87.35,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD3-08",
        "rawRow": {
          "date": "2026-08-25",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-87.35",
          "currency": "EUR",
          "reference": "FOOD3-08",
          "balance": "165.67",
          "__source_row": "14",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_14",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-27",
        "amount": 2350,
        "currency": "EUR",
        "description": "Salary payroll",
        "counterparty": "Danube Studio",
        "reference": "SALARY-08",
        "rawRow": {
          "date": "2026-08-27",
          "description": "Salary payroll",
          "counterparty": "Danube Studio",
          "amount": "2350.00",
          "currency": "EUR",
          "reference": "SALARY-08",
          "balance": "2515.67",
          "__source_row": "15",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_15",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-08-28",
        "amount": -150,
        "currency": "EUR",
        "description": "Transfer to Reserve Account",
        "counterparty": "Fictional Savings Bank",
        "reference": "OWN-08",
        "rawRow": {
          "date": "2026-08-28",
          "description": "Transfer to Reserve Account",
          "counterparty": "Fictional Savings Bank",
          "amount": "-150.00",
          "currency": "EUR",
          "reference": "OWN-08",
          "balance": "2365.67",
          "__source_row": "16",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_16",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-03",
        "amount": -980,
        "currency": "EUR",
        "description": "Apartment rent",
        "counterparty": "Harbor Properties",
        "reference": "RENT-09",
        "rawRow": {
          "date": "2026-09-03",
          "description": "Apartment rent",
          "counterparty": "Harbor Properties",
          "amount": "-980.00",
          "currency": "EUR",
          "reference": "RENT-09",
          "balance": "1385.67",
          "__source_row": "17",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_17",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-05",
        "amount": -89.4,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD1-09",
        "rawRow": {
          "date": "2026-09-05",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-89.40",
          "currency": "EUR",
          "reference": "FOOD1-09",
          "balance": "1296.27",
          "__source_row": "18",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_18",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-06",
        "amount": -42,
        "currency": "EUR",
        "description": "Metro pass",
        "counterparty": "City Transit",
        "reference": "METRO-09",
        "rawRow": {
          "date": "2026-09-06",
          "description": "Metro pass",
          "counterparty": "City Transit",
          "amount": "-42.00",
          "currency": "EUR",
          "reference": "METRO-09",
          "balance": "1254.27",
          "__source_row": "19",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_19",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-08",
        "amount": -105,
        "currency": "EUR",
        "description": "Electricity utility",
        "counterparty": "Bright Energy",
        "reference": "ENERGY-09",
        "rawRow": {
          "date": "2026-09-08",
          "description": "Electricity utility",
          "counterparty": "Bright Energy",
          "amount": "-105.00",
          "currency": "EUR",
          "reference": "ENERGY-09",
          "balance": "1149.27",
          "__source_row": "20",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_20",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-10",
        "amount": -32,
        "currency": "EUR",
        "description": "Internet bill",
        "counterparty": "Fiber Home",
        "reference": "NET-09",
        "rawRow": {
          "date": "2026-09-10",
          "description": "Internet bill",
          "counterparty": "Fiber Home",
          "amount": "-32.00",
          "currency": "EUR",
          "reference": "NET-09",
          "balance": "1117.27",
          "__source_row": "21",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_21",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-12",
        "amount": -10.99,
        "currency": "EUR",
        "description": "Music subscription",
        "counterparty": "Sound Library",
        "reference": "MUSIC-09",
        "rawRow": {
          "date": "2026-09-12",
          "description": "Music subscription",
          "counterparty": "Sound Library",
          "amount": "-10.99",
          "currency": "EUR",
          "reference": "MUSIC-09",
          "balance": "1106.28",
          "__source_row": "22",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_22",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-14",
        "amount": -55,
        "currency": "EUR",
        "description": "Credit card payment",
        "counterparty": "Fictional Card Services",
        "reference": "CARD-09",
        "rawRow": {
          "date": "2026-09-14",
          "description": "Credit card payment",
          "counterparty": "Fictional Card Services",
          "amount": "-55.00",
          "currency": "EUR",
          "reference": "CARD-09",
          "balance": "1051.28",
          "__source_row": "23",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_23",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-16",
        "amount": -94.8,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD2-09",
        "rawRow": {
          "date": "2026-09-16",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-94.80",
          "currency": "EUR",
          "reference": "FOOD2-09",
          "balance": "956.48",
          "__source_row": "24",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_24",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-18",
        "amount": -14.7,
        "currency": "EUR",
        "description": "Coffee shop",
        "counterparty": "Corner Coffee",
        "reference": "CAFE-09",
        "rawRow": {
          "date": "2026-09-18",
          "description": "Coffee shop",
          "counterparty": "Corner Coffee",
          "amount": "-14.70",
          "currency": "EUR",
          "reference": "CAFE-09",
          "balance": "941.78",
          "__source_row": "25",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_25",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-20",
        "amount": -44.5,
        "currency": "EUR",
        "description": "Restaurant",
        "counterparty": "Maple Kitchen",
        "reference": "DINNER-09",
        "rawRow": {
          "date": "2026-09-20",
          "description": "Restaurant",
          "counterparty": "Maple Kitchen",
          "amount": "-44.50",
          "currency": "EUR",
          "reference": "DINNER-09",
          "balance": "897.28",
          "__source_row": "26",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_26",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-21",
        "amount": -15.99,
        "currency": "EUR",
        "description": "Video streaming subscription",
        "counterparty": "Screen Library",
        "reference": "VIDEO-09",
        "rawRow": {
          "date": "2026-09-21",
          "description": "Video streaming subscription",
          "counterparty": "Screen Library",
          "amount": "-15.99",
          "currency": "EUR",
          "reference": "VIDEO-09",
          "balance": "881.29",
          "__source_row": "27",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_27",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-23",
        "amount": -22.6,
        "currency": "EUR",
        "description": "Pharmacy purchase",
        "counterparty": "Oak Pharmacy",
        "reference": "PHARM-09",
        "rawRow": {
          "date": "2026-09-23",
          "description": "Pharmacy purchase",
          "counterparty": "Oak Pharmacy",
          "amount": "-22.60",
          "currency": "EUR",
          "reference": "PHARM-09",
          "balance": "858.69",
          "__source_row": "28",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_28",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-25",
        "amount": -87.35,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD3-09",
        "rawRow": {
          "date": "2026-09-25",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-87.35",
          "currency": "EUR",
          "reference": "FOOD3-09",
          "balance": "771.34",
          "__source_row": "29",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_29",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-27",
        "amount": 2350,
        "currency": "EUR",
        "description": "Salary payroll",
        "counterparty": "Danube Studio",
        "reference": "SALARY-09",
        "rawRow": {
          "date": "2026-09-27",
          "description": "Salary payroll",
          "counterparty": "Danube Studio",
          "amount": "2350.00",
          "currency": "EUR",
          "reference": "SALARY-09",
          "balance": "3121.34",
          "__source_row": "30",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_30",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-09-28",
        "amount": -150,
        "currency": "EUR",
        "description": "Transfer to Reserve Account",
        "counterparty": "Fictional Savings Bank",
        "reference": "OWN-09",
        "rawRow": {
          "date": "2026-09-28",
          "description": "Transfer to Reserve Account",
          "counterparty": "Fictional Savings Bank",
          "amount": "-150.00",
          "currency": "EUR",
          "reference": "OWN-09",
          "balance": "2971.34",
          "__source_row": "31",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_31",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-03",
        "amount": -980,
        "currency": "EUR",
        "description": "Apartment rent",
        "counterparty": "Harbor Properties",
        "reference": "RENT-10",
        "rawRow": {
          "date": "2026-10-03",
          "description": "Apartment rent",
          "counterparty": "Harbor Properties",
          "amount": "-980.00",
          "currency": "EUR",
          "reference": "RENT-10",
          "balance": "1991.34",
          "__source_row": "32",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_32",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-05",
        "amount": -89.4,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD1-10",
        "rawRow": {
          "date": "2026-10-05",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-89.40",
          "currency": "EUR",
          "reference": "FOOD1-10",
          "balance": "1901.94",
          "__source_row": "33",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_33",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-06",
        "amount": -42,
        "currency": "EUR",
        "description": "Metro pass",
        "counterparty": "City Transit",
        "reference": "METRO-10",
        "rawRow": {
          "date": "2026-10-06",
          "description": "Metro pass",
          "counterparty": "City Transit",
          "amount": "-42.00",
          "currency": "EUR",
          "reference": "METRO-10",
          "balance": "1859.94",
          "__source_row": "34",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_34",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-08",
        "amount": -105,
        "currency": "EUR",
        "description": "Electricity utility",
        "counterparty": "Bright Energy",
        "reference": "ENERGY-10",
        "rawRow": {
          "date": "2026-10-08",
          "description": "Electricity utility",
          "counterparty": "Bright Energy",
          "amount": "-105.00",
          "currency": "EUR",
          "reference": "ENERGY-10",
          "balance": "1754.94",
          "__source_row": "35",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_35",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-10",
        "amount": -32,
        "currency": "EUR",
        "description": "Internet bill",
        "counterparty": "Fiber Home",
        "reference": "NET-10",
        "rawRow": {
          "date": "2026-10-10",
          "description": "Internet bill",
          "counterparty": "Fiber Home",
          "amount": "-32.00",
          "currency": "EUR",
          "reference": "NET-10",
          "balance": "1722.94",
          "__source_row": "36",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_36",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-12",
        "amount": -10.99,
        "currency": "EUR",
        "description": "Music subscription",
        "counterparty": "Sound Library",
        "reference": "MUSIC-10",
        "rawRow": {
          "date": "2026-10-12",
          "description": "Music subscription",
          "counterparty": "Sound Library",
          "amount": "-10.99",
          "currency": "EUR",
          "reference": "MUSIC-10",
          "balance": "1711.95",
          "__source_row": "37",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_37",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-14",
        "amount": -55,
        "currency": "EUR",
        "description": "Credit card payment",
        "counterparty": "Fictional Card Services",
        "reference": "CARD-10",
        "rawRow": {
          "date": "2026-10-14",
          "description": "Credit card payment",
          "counterparty": "Fictional Card Services",
          "amount": "-55.00",
          "currency": "EUR",
          "reference": "CARD-10",
          "balance": "1656.95",
          "__source_row": "38",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_38",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-16",
        "amount": -94.8,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD2-10",
        "rawRow": {
          "date": "2026-10-16",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-94.80",
          "currency": "EUR",
          "reference": "FOOD2-10",
          "balance": "1562.15",
          "__source_row": "39",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_39",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-18",
        "amount": -14.7,
        "currency": "EUR",
        "description": "Coffee shop",
        "counterparty": "Corner Coffee",
        "reference": "CAFE-10",
        "rawRow": {
          "date": "2026-10-18",
          "description": "Coffee shop",
          "counterparty": "Corner Coffee",
          "amount": "-14.70",
          "currency": "EUR",
          "reference": "CAFE-10",
          "balance": "1547.45",
          "__source_row": "40",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_40",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-20",
        "amount": -44.5,
        "currency": "EUR",
        "description": "Restaurant",
        "counterparty": "Maple Kitchen",
        "reference": "DINNER-10",
        "rawRow": {
          "date": "2026-10-20",
          "description": "Restaurant",
          "counterparty": "Maple Kitchen",
          "amount": "-44.50",
          "currency": "EUR",
          "reference": "DINNER-10",
          "balance": "1502.95",
          "__source_row": "41",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_41",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-21",
        "amount": -15.99,
        "currency": "EUR",
        "description": "Video streaming subscription",
        "counterparty": "Screen Library",
        "reference": "VIDEO-10",
        "rawRow": {
          "date": "2026-10-21",
          "description": "Video streaming subscription",
          "counterparty": "Screen Library",
          "amount": "-15.99",
          "currency": "EUR",
          "reference": "VIDEO-10",
          "balance": "1486.96",
          "__source_row": "42",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_42",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-23",
        "amount": -22.6,
        "currency": "EUR",
        "description": "Pharmacy purchase",
        "counterparty": "Oak Pharmacy",
        "reference": "PHARM-10",
        "rawRow": {
          "date": "2026-10-23",
          "description": "Pharmacy purchase",
          "counterparty": "Oak Pharmacy",
          "amount": "-22.60",
          "currency": "EUR",
          "reference": "PHARM-10",
          "balance": "1464.36",
          "__source_row": "43",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_43",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-25",
        "amount": -87.35,
        "currency": "EUR",
        "description": "Supermarket groceries",
        "counterparty": "Green Basket",
        "reference": "FOOD3-10",
        "rawRow": {
          "date": "2026-10-25",
          "description": "Supermarket groceries",
          "counterparty": "Green Basket",
          "amount": "-87.35",
          "currency": "EUR",
          "reference": "FOOD3-10",
          "balance": "1377.01",
          "__source_row": "44",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_44",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-27",
        "amount": 2350,
        "currency": "EUR",
        "description": "Salary payroll",
        "counterparty": "Danube Studio",
        "reference": "SALARY-10",
        "rawRow": {
          "date": "2026-10-27",
          "description": "Salary payroll",
          "counterparty": "Danube Studio",
          "amount": "2350.00",
          "currency": "EUR",
          "reference": "SALARY-10",
          "balance": "3727.01",
          "__source_row": "45",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172448951_r4ll_45",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "main",
        "statementId": "stmt_1794172448951_r4ll",
        "date": "2026-10-28",
        "amount": -150,
        "currency": "EUR",
        "description": "Transfer to Reserve Account",
        "counterparty": "Fictional Savings Bank",
        "reference": "OWN-10",
        "rawRow": {
          "date": "2026-10-28",
          "description": "Transfer to Reserve Account",
          "counterparty": "Fictional Savings Bank",
          "amount": "-150.00",
          "currency": "EUR",
          "reference": "OWN-10",
          "balance": "3577.01",
          "__source_row": "46",
          "__source_file": "daily.csv",
          "__source_hash": "f3946ef6c2e4a5a9e49466c258ae10221f1d2bd17b9b1dcd4e51900afebe1eda",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:08.951Z"
      },
      {
        "id": "txn_stmt_1794172449152_lffk_1",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "savings",
        "statementId": "stmt_1794172449152_lffk",
        "date": "2026-08-28",
        "amount": 150,
        "currency": "EUR",
        "description": "Transfer from Daily Account",
        "counterparty": "Fictional Retail Bank",
        "reference": "OWN-08",
        "rawRow": {
          "date": "2026-08-28",
          "description": "Transfer from Daily Account",
          "counterparty": "Fictional Retail Bank",
          "amount": "150.00",
          "currency": "EUR",
          "reference": "OWN-08",
          "balance": "300.00",
          "__source_row": "2",
          "__source_file": "reserve.csv",
          "__source_hash": "65eced9888e127f71311f2d317a0ce53ecb7d38f5caaecaa4a69ed92ca788df4",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:09.152Z"
      },
      {
        "id": "txn_stmt_1794172449152_lffk_2",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "savings",
        "statementId": "stmt_1794172449152_lffk",
        "date": "2026-09-28",
        "amount": 150,
        "currency": "EUR",
        "description": "Transfer from Daily Account",
        "counterparty": "Fictional Retail Bank",
        "reference": "OWN-09",
        "rawRow": {
          "date": "2026-09-28",
          "description": "Transfer from Daily Account",
          "counterparty": "Fictional Retail Bank",
          "amount": "150.00",
          "currency": "EUR",
          "reference": "OWN-09",
          "balance": "450.00",
          "__source_row": "3",
          "__source_file": "reserve.csv",
          "__source_hash": "65eced9888e127f71311f2d317a0ce53ecb7d38f5caaecaa4a69ed92ca788df4",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:09.152Z"
      },
      {
        "id": "txn_stmt_1794172449152_lffk_3",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "accountId": "savings",
        "statementId": "stmt_1794172449152_lffk",
        "date": "2026-10-28",
        "amount": 150,
        "currency": "EUR",
        "description": "Transfer from Daily Account",
        "counterparty": "Fictional Retail Bank",
        "reference": "OWN-10",
        "rawRow": {
          "date": "2026-10-28",
          "description": "Transfer from Daily Account",
          "counterparty": "Fictional Retail Bank",
          "amount": "150.00",
          "currency": "EUR",
          "reference": "OWN-10",
          "balance": "600.00",
          "__source_row": "4",
          "__source_file": "reserve.csv",
          "__source_hash": "65eced9888e127f71311f2d317a0ce53ecb7d38f5caaecaa4a69ed92ca788df4",
          "__source_sheet": ""
        },
        "createdAt": "2026-11-08T21:14:09.152Z"
      }
    ],
    "classifications": [
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_1",
        "transactionId": "txn_stmt_1794172448951_r4ll_1",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties is a recurring monthly housing expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_2",
        "transactionId": "txn_stmt_1794172448951_r4ll_2",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket is a standard grocery expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_3",
        "transactionId": "txn_stmt_1794172448951_r4ll_3",
        "economicType": "expense",
        "category": "transport",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase at City Transit represents public transportation costs.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_4",
        "transactionId": "txn_stmt_1794172448951_r4ll_4",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy is a recurring energy expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_5",
        "transactionId": "txn_stmt_1794172448951_r4ll_5",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home is a recurring telecommunication expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_6",
        "transactionId": "txn_stmt_1794172448951_r4ll_6",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription to Sound Library is a recurring digital subscription.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_7",
        "transactionId": "txn_stmt_1794172448951_r4ll_7",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services is a recurring debt payment.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_8",
        "transactionId": "txn_stmt_1794172448951_r4ll_8",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket is a standard grocery expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_9",
        "transactionId": "txn_stmt_1794172448951_r4ll_9",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee is a dining and coffee expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_10",
        "transactionId": "txn_stmt_1794172448951_r4ll_10",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen is a dining expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_11",
        "transactionId": "txn_stmt_1794172448951_r4ll_11",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription to Screen Library is a recurring digital subscription.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_12",
        "transactionId": "txn_stmt_1794172448951_r4ll_12",
        "economicType": "expense",
        "category": "health",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase at Oak Pharmacy represents a healthcare expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_13",
        "transactionId": "txn_stmt_1794172448951_r4ll_13",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket is a standard grocery expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_14",
        "transactionId": "txn_stmt_1794172448951_r4ll_14",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll inflow from Danube Studio is regular employment income.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_15",
        "transactionId": "txn_stmt_1794172448951_r4ll_15",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Transfer to savings account supported by matched internal transfer evidence.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_16",
        "transactionId": "txn_stmt_1794172448951_r4ll_16",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties is a recurring monthly housing expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_17",
        "transactionId": "txn_stmt_1794172448951_r4ll_17",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket is a standard grocery expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_18",
        "transactionId": "txn_stmt_1794172448951_r4ll_18",
        "economicType": "expense",
        "category": "transport",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase at City Transit represents public transportation costs.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_19",
        "transactionId": "txn_stmt_1794172448951_r4ll_19",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy is a recurring energy expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_20",
        "transactionId": "txn_stmt_1794172448951_r4ll_20",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home is a recurring telecommunication expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_21",
        "transactionId": "txn_stmt_1794172448951_r4ll_21",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription to Sound Library is a recurring digital subscription.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_22",
        "transactionId": "txn_stmt_1794172448951_r4ll_22",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services is a recurring debt payment.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_23",
        "transactionId": "txn_stmt_1794172448951_r4ll_23",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket is a standard grocery expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_24",
        "transactionId": "txn_stmt_1794172448951_r4ll_24",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee is a dining and coffee expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_25",
        "transactionId": "txn_stmt_1794172448951_r4ll_25",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen is a dining expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_26",
        "transactionId": "txn_stmt_1794172448951_r4ll_26",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Video streaming subscription to Screen Library is a recurring digital subscription.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_27",
        "transactionId": "txn_stmt_1794172448951_r4ll_27",
        "economicType": "expense",
        "category": "health",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase at Oak Pharmacy represents a healthcare expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_28",
        "transactionId": "txn_stmt_1794172448951_r4ll_28",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket is a standard grocery expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_29",
        "transactionId": "txn_stmt_1794172448951_r4ll_29",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Salary payroll inflow from Danube Studio is regular employment income.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_30",
        "transactionId": "txn_stmt_1794172448951_r4ll_30",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Transfer to savings account supported by matched internal transfer evidence.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_31",
        "transactionId": "txn_stmt_1794172448951_r4ll_31",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Apartment rent payment to Harbor Properties is a recurring monthly housing expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_32",
        "transactionId": "txn_stmt_1794172448951_r4ll_32",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket is a standard grocery expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_33",
        "transactionId": "txn_stmt_1794172448951_r4ll_33",
        "economicType": "expense",
        "category": "transport",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Metro pass purchase at City Transit represents public transportation costs.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_34",
        "transactionId": "txn_stmt_1794172448951_r4ll_34",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Electricity utility bill payment to Bright Energy is a recurring energy expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_35",
        "transactionId": "txn_stmt_1794172448951_r4ll_35",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Internet bill payment to Fiber Home is a recurring telecommunication expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_36",
        "transactionId": "txn_stmt_1794172448951_r4ll_36",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Music subscription to Sound Library is a recurring digital subscription.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_37",
        "transactionId": "txn_stmt_1794172448951_r4ll_37",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Credit card payment to Fictional Card Services is a recurring debt payment.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_38",
        "transactionId": "txn_stmt_1794172448951_r4ll_38",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Supermarket purchase at Green Basket is a standard grocery expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_39",
        "transactionId": "txn_stmt_1794172448951_r4ll_39",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop purchase at Corner Coffee is a dining and coffee expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_40",
        "transactionId": "txn_stmt_1794172448951_r4ll_40",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant purchase at Maple Kitchen is a dining expense.",
        "updatedAt": "2026-11-08T21:14:31.957Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_41",
        "transactionId": "txn_stmt_1794172448951_r4ll_41",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "The transaction is a video streaming subscription payment to Screen Library.",
        "updatedAt": "2026-11-08T21:14:38.704Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_42",
        "transactionId": "txn_stmt_1794172448951_r4ll_42",
        "economicType": "expense",
        "category": "health",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is a pharmacy purchase from Oak Pharmacy.",
        "updatedAt": "2026-11-08T21:14:38.704Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_43",
        "transactionId": "txn_stmt_1794172448951_r4ll_43",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is a supermarket grocery purchase from Green Basket.",
        "updatedAt": "2026-11-08T21:14:38.704Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_44",
        "transactionId": "txn_stmt_1794172448951_r4ll_44",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "The transaction is a salary payroll inflow from Danube Studio.",
        "updatedAt": "2026-11-08T21:14:38.704Z"
      },
      {
        "id": "cls_txn_stmt_1794172448951_r4ll_45",
        "transactionId": "txn_stmt_1794172448951_r4ll_45",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is an outgoing own-account transfer supported by matching transfer evidence.",
        "updatedAt": "2026-11-08T21:14:38.704Z"
      },
      {
        "id": "cls_txn_stmt_1794172449152_lffk_1",
        "transactionId": "txn_stmt_1794172449152_lffk_1",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is an incoming own-account transfer supported by matching transfer evidence.",
        "updatedAt": "2026-11-08T21:14:38.704Z"
      },
      {
        "id": "cls_txn_stmt_1794172449152_lffk_2",
        "transactionId": "txn_stmt_1794172449152_lffk_2",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is an incoming own-account transfer supported by matching transfer evidence.",
        "updatedAt": "2026-11-08T21:14:38.704Z"
      },
      {
        "id": "cls_txn_stmt_1794172449152_lffk_3",
        "transactionId": "txn_stmt_1794172449152_lffk_3",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "classification.v3:gemini-3.5-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "The transaction is an incoming own-account transfer supported by matching transfer evidence.",
        "updatedAt": "2026-11-08T21:14:38.704Z"
      }
    ],
    "transferMatches": [
      {
        "id": "match_single_txn_stmt_1794172448951_r4ll_15",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "outgoingTransactionId": "txn_stmt_1794172448951_r4ll_15",
        "incomingTransactionId": null,
        "outgoingAccountId": "main",
        "incomingAccountId": null,
        "amount": 150,
        "currency": "EUR",
        "date": "2026-08-28",
        "description": "Transfer to Reserve Account",
        "status": "probable"
      },
      {
        "id": "match_single_txn_stmt_1794172448951_r4ll_30",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "outgoingTransactionId": "txn_stmt_1794172448951_r4ll_30",
        "incomingTransactionId": null,
        "outgoingAccountId": "main",
        "incomingAccountId": null,
        "amount": 150,
        "currency": "EUR",
        "date": "2026-09-28",
        "description": "Transfer to Reserve Account",
        "status": "probable"
      },
      {
        "id": "match_single_txn_stmt_1794172448951_r4ll_45",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "outgoingTransactionId": "txn_stmt_1794172448951_r4ll_45",
        "incomingTransactionId": null,
        "outgoingAccountId": "main",
        "incomingAccountId": null,
        "amount": 150,
        "currency": "EUR",
        "date": "2026-10-28",
        "description": "Transfer to Reserve Account",
        "status": "probable"
      },
      {
        "id": "match_txn_stmt_1794172448951_r4ll_15_txn_stmt_1794172449152_lffk_1",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "outgoingTransactionId": "txn_stmt_1794172448951_r4ll_15",
        "incomingTransactionId": "txn_stmt_1794172449152_lffk_1",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-08-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1794172448951_r4ll_30_txn_stmt_1794172449152_lffk_2",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "outgoingTransactionId": "txn_stmt_1794172448951_r4ll_30",
        "incomingTransactionId": "txn_stmt_1794172449152_lffk_2",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-09-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1794172448951_r4ll_45_txn_stmt_1794172449152_lffk_3",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "outgoingTransactionId": "txn_stmt_1794172448951_r4ll_45",
        "incomingTransactionId": "txn_stmt_1794172449152_lffk_3",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-10-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      }
    ],
    "confirmations": [
      {
        "id": "conf_sub_txn_stmt_1794172448951_r4ll_6",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794172448951_r4ll_6",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-08-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794172448951_r4ll_11",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794172448951_r4ll_11",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-08-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794172448951_r4ll_15",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794172448951_r4ll_15",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794172448951_r4ll_21",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794172448951_r4ll_21",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-09-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794172448951_r4ll_26",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794172448951_r4ll_26",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-09-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794172448951_r4ll_30",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794172448951_r4ll_30",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794172448951_r4ll_36",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794172448951_r4ll_36",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-10-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1794172448951_r4ll_41",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1794172448951_r4ll_41",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-10-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794172448951_r4ll_45",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794172448951_r4ll_45",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794172449152_lffk_1",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794172449152_lffk_1",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794172449152_lffk_2",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794172449152_lffk_2",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1794172449152_lffk_3",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1794172449152_lffk_3",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      }
    ],
    "recommendations": [
      {
        "id": "rec_A014_eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
        "userId": "71d645f3-6fd2-4889-a6d2-41b38aaeeba7",
        "snapshotId": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
        "actionType": "review_recurring_subscription",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
        "suggestedAmount": 10.99,
        "adjustedAmount": null,
        "currency": "EUR",
        "targetGoalId": "txn_stmt_1794172448951_r4ll_6",
        "sourceAccountId": "main",
        "priority": "clarification",
        "status": "accepted",
        "readinessState": "state_a_action_ready",
        "createdAt": "2026-11-08T21:15:16.545Z",
        "updatedAt": "2026-11-08T21:15:22.339Z"
      }
    ],
    "assistantMessages": [],
    "actionFeedback": [
      {
        "id": "fb_1794172522436_accept",
        "recommendationId": "rec_A014_eval_ef139460-80d6-4c77-873a-5b60015ebf2e",
        "actionId": "A014",
        "snapshotId": "snap_beta_71d645f3-6fd2-4889-a6d2-41b38aaeeba7_v4_51d96582ae0fa97a",
        "action": "accept",
        "amount": 10.99,
        "note": "User accepted recommendation (pending execution).",
        "timestamp": "2026-11-08T21:15:22.339Z"
      }
    ]
  },
  "aiConsent": true,
  "experimentalRecommendations": true,
  "requestHash": "acc47b786c9375198e20658bbaf08c6911cf57bf157512746436e41dd66a4e48"
}
~~~~
