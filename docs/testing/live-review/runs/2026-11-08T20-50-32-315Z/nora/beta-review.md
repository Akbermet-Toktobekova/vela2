# 03 Nora · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations. | — |

Actual Today output: **Review recurring subscription before cancellation**.

## Input

~~~~json
{
  "request": "POST /api/beta/review",
  "body": {
    "forceRefresh": true
  },
  "version": 4
}
~~~~

## Output

~~~~json
{
  "jobId": "d67416cf-2266-418a-8719-e12c27c71835",
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
  "todayCard": {
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
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T21:15:16.545Z",
    "updatedAt": "2026-11-08T21:15:16.545Z"
  },
  "trace": {
    "trace": {
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
    }
  },
  "primaryProposals": [
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
      "evidence": [],
      "score": null,
      "selected": false
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
      "evidence": [],
      "score": null,
      "selected": false
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
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 137040
    },
    {
      "doc_key": "chat",
      "stored_bytes": 1340
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 872
    },
    {
      "doc_key": "chat-request:nora-context",
      "stored_bytes": 2768
    },
    {
      "doc_key": "engine",
      "stored_bytes": 493440
    },
    {
      "doc_key": "import:86da27a9-4b5e-4d61-9af7-cd97eeac25b4",
      "stored_bytes": 55096
    },
    {
      "doc_key": "import:c95fae13-969e-48be-856c-fb5c64c887e8",
      "stored_bytes": 4864
    },
    {
      "doc_key": "job-request:5cbd62bf706c2239299ceea058fc96948a5bd2e9eb3025715a1c176e7aeabeab",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:796e0dcb97b249b39e1adab2e016031f37cf4c69dab919ecf8c0b181375043ec",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:a5e9e43dba7ced726ccb124786df4c78f6d8c0d72eb5056c9052e073e105de22",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:286bef28-778e-47f0-b757-ba764edeaf3b",
      "stored_bytes": 62416
    },
    {
      "doc_key": "job:98f9fd6f-4a10-43a1-94c3-df4d94c67acd",
      "stored_bytes": 5652
    },
    {
      "doc_key": "job:d67416cf-2266-418a-8719-e12c27c71835",
      "stored_bytes": 137480
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:ai-evaluation",
      "stored_bytes": 4528
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:behavior-agent",
      "stored_bytes": 4620
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:catalog-selector",
      "stored_bytes": 5036
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:checker",
      "stored_bytes": 18892
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:classification",
      "stored_bytes": 43708
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:debt-agent",
      "stored_bytes": 2520
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:debt-calculator",
      "stored_bytes": 1780
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:decision-engine",
      "stored_bytes": 14556
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:explanation",
      "stored_bytes": 2984
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:financial-calculator",
      "stored_bytes": 18568
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:fx",
      "stored_bytes": 1304
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:pattern-recognition",
      "stored_bytes": 32344
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:pi",
      "stored_bytes": 1640
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:suggestion-generator",
      "stored_bytes": 4240
    },
    {
      "doc_key": "stage:eval_ef139460-80d6-4c77-873a-5b60015ebf2e:weights",
      "stored_bytes": 1788
    },
    {
      "doc_key": "state",
      "stored_bytes": 87836
    }
  ]
}
~~~~

## Summary

~~~~text
Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.
~~~~
