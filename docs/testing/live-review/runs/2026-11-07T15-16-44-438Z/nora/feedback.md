# 03 Nora · feedback

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.feedback, state.state.actionFeedback and feedback-request:&lt;id&gt; when accepted. Draft PostgreSQL pi.action_feedback. | — |

## Input

~~~~json
{
  "recommendationId": "rec_A014_eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
  "action": "accept",
  "expectedVersion": 3,
  "requestId": "nora-accept"
}
~~~~

## Output

~~~~json
{
  "status": "ACCEPTED",
  "accepted": true,
  "recommendation": {
    "id": "rec_A014_eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
    "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
    "snapshotId": "snap_beta_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_f317c6135affc306",
    "actionType": "review_recurring_subscription",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "suggestedAmount": 10.99,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "txn_stmt_1793880000000_f24z_6",
    "sourceAccountId": "main",
    "priority": "clarification",
    "status": "accepted",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-05T12:00:00.000Z",
    "updatedAt": "2026-11-05T12:00:00.000Z"
  },
  "decision": {
    "evaluationId": "eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
    "snapshotId": "snap_beta_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_f317c6135affc306",
    "snapshotVersion": "3.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1793880000000_f24z_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1793880000000_f24z_6",
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
      "evaluationId": "eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "snapshotId": "snap_beta_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_f317c6135affc306",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-05T12:00:00.000Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.3",
      "priorityClass": "VERIFICATION_UNLOCK",
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
            "candidateId": "cand_A007_snap_beta_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_f317c6135affc306",
            "actionId": "A007",
            "actionType": "FINANCIAL_ACTION",
            "title": "Add EUR 360 to your emergency reserve",
            "description": "Earmark EUR 360 from uncommitted available cash (EUR 3005.01 safe after upcoming bills) into your accessible emergency cushion.",
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
          "projectedMinCashAfterAction": 2645.01,
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
          "projectedMinCashAfterAction": 2155.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "cand_A015_txn_stmt_1793880000000_f24z_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1793880000000_f24z_6",
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
          "projectedMinCashAfterAction": 3005.01,
          "unlocksActionIds": []
        },
        {
          "candidate": {
            "candidateId": "verify_A014_txn_stmt_1793880000000_f24z_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1793880000000_f24z_6",
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
          "projectedMinCashAfterAction": 3005.01,
          "unlocksActionIds": [
            "A015"
          ]
        }
      ],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "verify_A014_txn_stmt_1793880000000_f24z_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1793880000000_f24z_6",
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
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review recurring subscriptions",
            "description": "Identify the recurring charges for 'Sound Library' and 'Screen Library' to determine if they are still necessary for your current budget.",
            "rationale": "You have consistent monthly charges for these services, which can be reviewed to see if they align with your financial goals.",
            "actionId": "A014",
            "factIds": [
              "subscription-1",
              "subscription-2",
              "subscription-3",
              "subscription-4",
              "subscription-5",
              "subscription-6"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review mandatory obligations and paydays",
            "description": "Create a timetable of your upcoming rent, energy, and internet obligations to ensure they are covered by your next salary payment.",
            "rationale": "Aligning your upcoming payment obligations with your salary date helps ensure you have sufficient funds available for essential expenses.",
            "actionId": "A017",
            "factIds": [
              "income-1",
              "obligation-1",
              "obligation-2",
              "obligation-3"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Review credit card debt terms",
            "description": "Check the APR and terms of your credit card debt to understand the cost of carrying this balance.",
            "rationale": "With an APR of 21.9%, understanding the terms of your debt is a critical step in managing your financial health.",
            "actionId": "A004",
            "factIds": [
              "debt-1"
            ],
            "claimIds": [
              "C023"
            ],
            "status": "REJECTED",
            "reason": "The provided evidence (C023) discusses the general efficacy of financial education and the difficulty of changing debt behavior, but it does not provide canonical evidence or a regulatory basis for the specific action of reviewing credit card APR or terms as a financial management strategy.",
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
        "fallbackReason": "NO_VALID_PRIMARY",
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
    "id": "fb_1793880000000_accept",
    "recommendationId": "rec_A014_eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
    "actionId": "A014",
    "snapshotId": "snap_beta_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_f317c6135affc306",
    "action": "accept",
    "amount": 10.99,
    "note": "User accepted recommendation (pending execution).",
    "timestamp": "2026-11-05T12:00:00.000Z"
  },
  "version": 3,
  "state": {
    "user": {
      "id": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "email": "nora@example.test",
      "authStatus": "unverified",
      "isDemoMode": false,
      "createdAt": "2026-11-05T12:00:00.000Z"
    },
    "profile": {
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "nickname": "03 Nora",
      "locale": "en",
      "baseCurrency": "EUR",
      "country": "EU",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "preferences": {
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "primaryConcern": null,
      "concernNotes": "",
      "notificationsEnabled": true,
      "reducedMotion": false,
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "onboarding": {
      "id": "843715c2-5cfe-4c82-b0c6-1fa4ee9e620d",
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "currentStep": 1,
      "completedSteps": [],
      "debtQuestionAnswer": "yes",
      "status": "completed",
      "startedAt": "2026-11-05T12:00:00.000Z",
      "completedAt": "2026-11-05T12:00:00.000Z"
    },
    "accounts": [
      {
        "id": "main",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
        "id": "961b8d41-d4ff-4e64-9283-903e8105eeae",
        "accountId": "main",
        "amount": 3577.01,
        "currency": "EUR",
        "asOf": "2026-10-28",
        "sourceType": "statement_closing",
        "sourceId": "stmt_1793880000000_f24z",
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "3bf0f581-2b45-4cf9-9c83-8a80a346c06d",
        "accountId": "savings",
        "amount": 600,
        "currency": "EUR",
        "asOf": "2026-10-28",
        "sourceType": "statement_closing",
        "sourceId": "stmt_1793880000000_96yi",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "incomes": [
      {
        "id": "salary",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
      "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
      "estimatedMonthlyAmount": 1450,
      "currency": "EUR",
      "notes": "Synthetic user estimate",
      "updatedAt": "2026-11-05T12:00:00.000Z"
    },
    "obligations": [
      {
        "id": "rent",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "name": "Emergency reserve",
        "goalType": "emergency_cushion",
        "targetAmount": 3000,
        "currency": "EUR",
        "targetDate": "2027-06-30",
        "priority": "high",
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "goalAllocations": [],
    "statements": [
      {
        "id": "stmt_1793880000000_f24z",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
        "importedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "stmt_1793880000000_96yi",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
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
        "importedAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "transactions": [
      {
        "id": "txn_stmt_1793880000000_f24z_1",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "2"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_2",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "3"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_3",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "4"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_4",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "5"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_5",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "6"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_6",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "7"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_7",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "8"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_8",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "9"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_9",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "10"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_10",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "11"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_11",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "12"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_12",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "13"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_13",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "14"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_14",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "15"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_15",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "16"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_16",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "17"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_17",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "18"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_18",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "19"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_19",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "20"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_20",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "21"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_21",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "22"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_22",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "23"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_23",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "24"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_24",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "25"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_25",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "26"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_26",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "27"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_27",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "28"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_28",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "29"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_29",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "30"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_30",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "31"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_31",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "32"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_32",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "33"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_33",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "34"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_34",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "35"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_35",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "36"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_36",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "37"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_37",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "38"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_38",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "39"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_39",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "40"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_40",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "41"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_41",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "42"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_42",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "43"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_43",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "44"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_44",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "45"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_f24z_45",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "main",
        "statementId": "stmt_1793880000000_f24z",
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
          "__source_file": "daily.csv",
          "__source_sheet": "",
          "__source_row": "46"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_96yi_1",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "savings",
        "statementId": "stmt_1793880000000_96yi",
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
          "__source_file": "reserve.csv",
          "__source_sheet": "",
          "__source_row": "2"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_96yi_2",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "savings",
        "statementId": "stmt_1793880000000_96yi",
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
          "__source_file": "reserve.csv",
          "__source_sheet": "",
          "__source_row": "3"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "txn_stmt_1793880000000_96yi_3",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "accountId": "savings",
        "statementId": "stmt_1793880000000_96yi",
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
          "__source_file": "reserve.csv",
          "__source_sheet": "",
          "__source_row": "4"
        },
        "createdAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "classifications": [
      {
        "id": "cls_txn_stmt_1793880000000_f24z_1",
        "transactionId": "txn_stmt_1793880000000_f24z_1",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring monthly rent payment identified.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_2",
        "transactionId": "txn_stmt_1793880000000_f24z_2",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Standard grocery purchase.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_3",
        "transactionId": "txn_stmt_1793880000000_f24z_3",
        "economicType": "expense",
        "category": "transport",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Public transit expenditure.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_4",
        "transactionId": "txn_stmt_1793880000000_f24z_4",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring monthly utility bill.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_5",
        "transactionId": "txn_stmt_1793880000000_f24z_5",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring monthly internet service.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_6",
        "transactionId": "txn_stmt_1793880000000_f24z_6",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring music subscription service.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_7",
        "transactionId": "txn_stmt_1793880000000_f24z_7",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring credit card debt repayment.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_8",
        "transactionId": "txn_stmt_1793880000000_f24z_8",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Standard grocery purchase.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_9",
        "transactionId": "txn_stmt_1793880000000_f24z_9",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Coffee shop transaction.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_10",
        "transactionId": "txn_stmt_1793880000000_f24z_10",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Restaurant dining expense.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_11",
        "transactionId": "txn_stmt_1793880000000_f24z_11",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring video streaming subscription.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_12",
        "transactionId": "txn_stmt_1793880000000_f24z_12",
        "economicType": "expense",
        "category": "health",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Pharmacy purchase classified as health.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_13",
        "transactionId": "txn_stmt_1793880000000_f24z_13",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Standard grocery purchase.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_14",
        "transactionId": "txn_stmt_1793880000000_f24z_14",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring salary payroll deposit.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_15",
        "transactionId": "txn_stmt_1793880000000_f24z_15",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "behavior_agent_v1.1_gemini-3.1-flash-lite",
        "isRecurringCandidate": false,
        "provenanceNote": "Internal transfer between accounts.",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_16",
        "transactionId": "txn_stmt_1793880000000_f24z_16",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Housing / rent payment",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_17",
        "transactionId": "txn_stmt_1793880000000_f24z_17",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Grocery merchant",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_18",
        "transactionId": "txn_stmt_1793880000000_f24z_18",
        "economicType": "expense",
        "category": "transport",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Transport & mobility",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_19",
        "transactionId": "txn_stmt_1793880000000_f24z_19",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Utility bill payment",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_20",
        "transactionId": "txn_stmt_1793880000000_f24z_20",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Telecom / internet recurring payment",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_21",
        "transactionId": "txn_stmt_1793880000000_f24z_21",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring subscription candidate",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_22",
        "transactionId": "txn_stmt_1793880000000_f24z_22",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Debt / credit card servicing payment",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_23",
        "transactionId": "txn_stmt_1793880000000_f24z_23",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Grocery merchant",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_24",
        "transactionId": "txn_stmt_1793880000000_f24z_24",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Dining & coffee",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_25",
        "transactionId": "txn_stmt_1793880000000_f24z_25",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Dining & coffee",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_26",
        "transactionId": "txn_stmt_1793880000000_f24z_26",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring subscription candidate",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_27",
        "transactionId": "txn_stmt_1793880000000_f24z_27",
        "economicType": "expense",
        "category": "other",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Classified by local deterministic rules",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_28",
        "transactionId": "txn_stmt_1793880000000_f24z_28",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Grocery merchant",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_29",
        "transactionId": "txn_stmt_1793880000000_f24z_29",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Matched earned income / scholarship inflow",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_30",
        "transactionId": "txn_stmt_1793880000000_f24z_30",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "medium",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Matched transfer to savings",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_31",
        "transactionId": "txn_stmt_1793880000000_f24z_31",
        "economicType": "expense",
        "category": "rent_housing",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Housing / rent payment",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_32",
        "transactionId": "txn_stmt_1793880000000_f24z_32",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Grocery merchant",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_33",
        "transactionId": "txn_stmt_1793880000000_f24z_33",
        "economicType": "expense",
        "category": "transport",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Transport & mobility",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_34",
        "transactionId": "txn_stmt_1793880000000_f24z_34",
        "economicType": "expense",
        "category": "utilities_energy",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Utility bill payment",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_35",
        "transactionId": "txn_stmt_1793880000000_f24z_35",
        "economicType": "expense",
        "category": "internet_telecom",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Telecom / internet recurring payment",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_36",
        "transactionId": "txn_stmt_1793880000000_f24z_36",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring subscription candidate",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_37",
        "transactionId": "txn_stmt_1793880000000_f24z_37",
        "economicType": "debt_payment",
        "category": "other",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Debt / credit card servicing payment",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_38",
        "transactionId": "txn_stmt_1793880000000_f24z_38",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Grocery merchant",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_39",
        "transactionId": "txn_stmt_1793880000000_f24z_39",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Dining & coffee",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_40",
        "transactionId": "txn_stmt_1793880000000_f24z_40",
        "economicType": "expense",
        "category": "dining_coffee",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Dining & coffee",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_41",
        "transactionId": "txn_stmt_1793880000000_f24z_41",
        "economicType": "expense",
        "category": "subscriptions",
        "confidence": "high",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Recurring subscription candidate",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_42",
        "transactionId": "txn_stmt_1793880000000_f24z_42",
        "economicType": "expense",
        "category": "other",
        "confidence": "medium",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Classified by local deterministic rules",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_43",
        "transactionId": "txn_stmt_1793880000000_f24z_43",
        "economicType": "expense",
        "category": "groceries_food",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Grocery merchant",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_44",
        "transactionId": "txn_stmt_1793880000000_f24z_44",
        "economicType": "income",
        "category": "income",
        "confidence": "high",
        "status": "auto_classified",
        "classifierVersion": "1.0",
        "isRecurringCandidate": true,
        "provenanceNote": "Matched earned income / scholarship inflow",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_f24z_45",
        "transactionId": "txn_stmt_1793880000000_f24z_45",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "medium",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Matched transfer to savings",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_96yi_1",
        "transactionId": "txn_stmt_1793880000000_96yi_1",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "medium",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Matched transfer from main",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_96yi_2",
        "transactionId": "txn_stmt_1793880000000_96yi_2",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "medium",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Matched transfer from main",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      },
      {
        "id": "cls_txn_stmt_1793880000000_96yi_3",
        "transactionId": "txn_stmt_1793880000000_96yi_3",
        "economicType": "internal_transfer",
        "category": "transfer",
        "confidence": "medium",
        "status": "needs_review",
        "classifierVersion": "1.0",
        "isRecurringCandidate": false,
        "provenanceNote": "Matched transfer from main",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "transferMatches": [
      {
        "id": "match_single_txn_stmt_1793880000000_f24z_15",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "outgoingTransactionId": "txn_stmt_1793880000000_f24z_15",
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
        "id": "match_single_txn_stmt_1793880000000_f24z_30",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "outgoingTransactionId": "txn_stmt_1793880000000_f24z_30",
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
        "id": "match_single_txn_stmt_1793880000000_f24z_45",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "outgoingTransactionId": "txn_stmt_1793880000000_f24z_45",
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
        "id": "match_txn_stmt_1793880000000_f24z_15_txn_stmt_1793880000000_96yi_1",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "outgoingTransactionId": "txn_stmt_1793880000000_f24z_15",
        "incomingTransactionId": "txn_stmt_1793880000000_96yi_1",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-08-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1793880000000_f24z_30_txn_stmt_1793880000000_96yi_2",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "outgoingTransactionId": "txn_stmt_1793880000000_f24z_30",
        "incomingTransactionId": "txn_stmt_1793880000000_96yi_2",
        "outgoingAccountId": "main",
        "incomingAccountId": "savings",
        "amount": 150,
        "currency": "EUR",
        "date": "2026-09-28",
        "description": "Transfer to Reserve Account ↔ Transfer from Daily Account",
        "status": "matched"
      },
      {
        "id": "match_txn_stmt_1793880000000_f24z_45_txn_stmt_1793880000000_96yi_3",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "outgoingTransactionId": "txn_stmt_1793880000000_f24z_45",
        "incomingTransactionId": "txn_stmt_1793880000000_96yi_3",
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
        "id": "conf_sub_txn_stmt_1793880000000_f24z_6",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1793880000000_f24z_6",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-08-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1793880000000_f24z_11",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1793880000000_f24z_11",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-08-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1793880000000_f24z_15",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1793880000000_f24z_15",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1793880000000_f24z_21",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1793880000000_f24z_21",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-09-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1793880000000_f24z_26",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1793880000000_f24z_26",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-09-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1793880000000_f24z_30",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1793880000000_f24z_30",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1793880000000_f24z_36",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1793880000000_f24z_36",
        "questionText": "Is the recurring \"Music subscription\" (EUR 10.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 132/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 10.99/mo · 2026-10-12",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1793880000000_f24z_41",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1793880000000_f24z_41",
        "questionText": "Is the recurring \"Video streaming subscription\" (EUR 15.99) still a service you actively use?",
        "impactReason": "Confirms whether EUR 192/yr is an essential subscription or a cancellation candidate.",
        "amountLabel": "EUR 15.99/mo · 2026-10-21",
        "field": "subscriptionActive",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1793880000000_f24z_45",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1793880000000_f24z_45",
        "questionText": "Is \"Transfer to Reserve Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as personal spending.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1793880000000_96yi_1",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1793880000000_96yi_1",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-08-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1793880000000_96yi_2",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1793880000000_96yi_2",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-09-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_trf_txn_stmt_1793880000000_96yi_3",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "transfer",
        "subjectId": "txn_stmt_1793880000000_96yi_3",
        "questionText": "Is \"Transfer from Daily Account\" (EUR 150.00) an internal transfer between your own accounts?",
        "impactReason": "Prevents double-counting EUR 150.00 as new income.",
        "amountLabel": "EUR 150.00 · 2026-10-28",
        "field": "economicType",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      },
      {
        "id": "conf_sub_txn_stmt_1793880000000_f24z_5",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "subjectType": "subscription",
        "subjectId": "txn_stmt_1793880000000_f24z_5",
        "questionText": "We detected a recurring charge of EUR 32.00/month at Fiber Home. Are you still actively using this subscription, and can it be cancelled without exit fees?",
        "impactReason": "Rule R010 requires confirming whether a recurring subscription is still wanted and checking exit terms before suggesting cancellation (A015).",
        "amountLabel": "EUR 32.00/mo",
        "field": "subscription_active_use",
        "userResponse": null,
        "confirmedValue": null,
        "confirmedAt": null
      }
    ],
    "recommendations": [
      {
        "id": "rec_A014_eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
        "userId": "7a94712f-1c1e-4364-a08d-78724eaf1210",
        "snapshotId": "snap_beta_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_f317c6135affc306",
        "actionType": "review_recurring_subscription",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
        "suggestedAmount": 10.99,
        "adjustedAmount": null,
        "currency": "EUR",
        "targetGoalId": "txn_stmt_1793880000000_f24z_6",
        "sourceAccountId": "main",
        "priority": "clarification",
        "status": "accepted",
        "readinessState": "state_a_action_ready",
        "createdAt": "2026-11-05T12:00:00.000Z",
        "updatedAt": "2026-11-05T12:00:00.000Z"
      }
    ],
    "assistantMessages": [],
    "actionFeedback": [
      {
        "id": "fb_1793880000000_accept",
        "recommendationId": "rec_A014_eval_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_0_1793880000000",
        "actionId": "A014",
        "snapshotId": "snap_beta_7a94712f-1c1e-4364-a08d-78724eaf1210_v3_f317c6135affc306",
        "action": "accept",
        "amount": 10.99,
        "note": "User accepted recommendation (pending execution).",
        "timestamp": "2026-11-05T12:00:00.000Z"
      }
    ]
  },
  "aiConsent": true,
  "experimentalRecommendations": true,
  "requestHash": "35b718500a01d65fcbf6ceb6243f99d2e13d7ee703c7c348b53aa77c571bdd42"
}
~~~~
