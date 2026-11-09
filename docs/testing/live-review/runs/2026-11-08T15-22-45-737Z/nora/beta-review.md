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
  "version": 3
}
~~~~

## Output

~~~~json
{
  "jobId": "a4100e13-dc54-467d-b4af-f5bbefd41bb9",
  "decision": {
    "evaluationId": "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623",
    "snapshotId": "snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
    "snapshotVersion": "3.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1794151514485_u8kx_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794151514485_u8kx_6",
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
      "evaluationId": "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623",
      "userId": "2e4f3475-7aa1-43f0-be51-345483301d42",
      "snapshotId": "snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:27:08.975Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
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
            "candidateId": "cand_A007_snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
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
            "candidateId": "cand_A015_txn_stmt_1794151514485_u8kx_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794151514485_u8kx_6",
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
            "candidateId": "verify_A014_txn_stmt_1794151514485_u8kx_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794151514485_u8kx_6",
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
        "candidateId": "verify_A014_txn_stmt_1794151514485_u8kx_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794151514485_u8kx_6",
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
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:pi",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:fx",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:classification",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:pattern-recognition",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:behavior-agent",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:financial-calculator",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:debt-calculator",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:debt-agent",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:suggestion-generator",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:catalog-selector",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:checker",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:critical-coverage",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:ai-evaluation",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:weights",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:decision-engine",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review upcoming rent, energy, and internet obligations",
            "description": "Review the upcoming unpaid obligations for rent (980 EUR due 2026-11-06), energy (105 EUR due 2026-11-10), and internet (32 EUR due 2026-11-12) against available account balances.",
            "rationale": "The user has upcoming bills due in early November before the expected monthly salary inflow on 2026-11-27.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "obligation-2",
              "obligation-3",
              "income-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review active subscriptions",
            "description": "Inspect recurring subscription transactions such as Sound Library and Screen Library observed in recent monthly statements.",
            "rationale": "Multiple recurring subscription transactions were observed in the user's account history between August and October 2026.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "subscription-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "subscription-1",
              "subscription-2",
              "subscription-3",
              "subscription-4",
              "subscription-5",
              "subscription-6",
              "behavior"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Review credit card debt details",
            "description": "Check the credit card debt terms, including the 21.9% APR, minimum payment of 55 EUR due on 2026-11-15, and the 850 EUR balance.",
            "rationale": "Debt analysis indicates missing input regarding interest accruing and outlines the upcoming payment due date.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "debt-1",
            "prerequisites": [],
            "missingInfo": [
              "interestAccruing"
            ],
            "factIds": [
              "debt-1",
              "debt-analysis"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          }
        ],
        "shortfallReason": "",
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
  "todayCard": {
    "id": "rec_A014_eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623",
    "userId": "2e4f3475-7aa1-43f0-be51-345483301d42",
    "snapshotId": "snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
    "actionType": "review_recurring_subscription",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "suggestedAmount": 10.99,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "txn_stmt_1794151514485_u8kx_6",
    "sourceAccountId": "main",
    "priority": "clarification",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T15:27:08.990Z",
    "updatedAt": "2026-11-08T15:27:08.990Z"
  },
  "trace": {
    "trace": {
      "evaluationId": "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623",
      "userId": "2e4f3475-7aa1-43f0-be51-345483301d42",
      "snapshotId": "snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:27:08.975Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
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
            "candidateId": "cand_A007_snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
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
            "candidateId": "cand_A015_txn_stmt_1794151514485_u8kx_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794151514485_u8kx_6",
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
            "candidateId": "verify_A014_txn_stmt_1794151514485_u8kx_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794151514485_u8kx_6",
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
        "candidateId": "verify_A014_txn_stmt_1794151514485_u8kx_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794151514485_u8kx_6",
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
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:pi",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:fx",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:classification",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:pattern-recognition",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:behavior-agent",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:financial-calculator",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:debt-calculator",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:debt-agent",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:suggestion-generator",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:catalog-selector",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:checker",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:critical-coverage",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:ai-evaluation",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:weights",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:decision-engine",
        "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review upcoming rent, energy, and internet obligations",
            "description": "Review the upcoming unpaid obligations for rent (980 EUR due 2026-11-06), energy (105 EUR due 2026-11-10), and internet (32 EUR due 2026-11-12) against available account balances.",
            "rationale": "The user has upcoming bills due in early November before the expected monthly salary inflow on 2026-11-27.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "obligation-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "obligation-2",
              "obligation-3",
              "income-1",
              "account-1"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review active subscriptions",
            "description": "Inspect recurring subscription transactions such as Sound Library and Screen Library observed in recent monthly statements.",
            "rationale": "Multiple recurring subscription transactions were observed in the user's account history between August and October 2026.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "subscription-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "subscription-1",
              "subscription-2",
              "subscription-3",
              "subscription-4",
              "subscription-5",
              "subscription-6",
              "behavior"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          },
          {
            "id": "primary-3",
            "title": "Review credit card debt details",
            "description": "Check the credit card debt terms, including the 21.9% APR, minimum payment of 55 EUR due on 2026-11-15, and the 850 EUR balance.",
            "rationale": "Debt analysis indicates missing input regarding interest accruing and outlines the upcoming payment due date.",
            "actionId": null,
            "intent": "REVIEW",
            "targetFactId": "debt-1",
            "prerequisites": [],
            "missingInfo": [
              "interestAccruing"
            ],
            "factIds": [
              "debt-1",
              "debt-analysis"
            ],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Unverified or unknown AS reference.",
            "evidence": []
          }
        ],
        "shortfallReason": "",
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
    },
    "decision": {
      "evaluationId": "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623",
      "snapshotId": "snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
      "snapshotVersion": "3.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "VERIFICATION_UNLOCK",
      "selectedActionId": "A014",
      "selectedActionType": "VERIFICATION_ACTION",
      "candidate": {
        "candidateId": "verify_A014_txn_stmt_1794151514485_u8kx_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794151514485_u8kx_6",
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
        "evaluationId": "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623",
        "userId": "2e4f3475-7aa1-43f0-be51-345483301d42",
        "snapshotId": "snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
        "snapshotVersion": "3.0",
        "createdAt": "2026-11-08T15:27:08.975Z",
        "runtimeMode": "PROTOTYPE_MODE",
        "policyBundleVersion": "prototype_policy_bundle_v1.4",
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
              "candidateId": "cand_A007_snap_beta_2e4f3475-7aa1-43f0-be51-345483301d42_v3_b7144666f30c6bde",
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
              "candidateId": "cand_A015_txn_stmt_1794151514485_u8kx_6",
              "actionId": "A015",
              "actionType": "FINANCIAL_ACTION",
              "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
              "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
              "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
              "targetId": "txn_stmt_1794151514485_u8kx_6",
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
              "candidateId": "verify_A014_txn_stmt_1794151514485_u8kx_6",
              "actionId": "A014",
              "actionType": "VERIFICATION_ACTION",
              "title": "Review recurring subscription before cancellation",
              "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
              "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
              "targetId": "txn_stmt_1794151514485_u8kx_6",
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
          "candidateId": "verify_A014_txn_stmt_1794151514485_u8kx_6",
          "actionId": "A014",
          "actionType": "VERIFICATION_ACTION",
          "title": "Review recurring subscription before cancellation",
          "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
          "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
          "targetId": "txn_stmt_1794151514485_u8kx_6",
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
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:pi",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:fx",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:classification",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:pattern-recognition",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:behavior-agent",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:financial-calculator",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:debt-calculator",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:debt-agent",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:suggestion-generator",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:catalog-selector",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:checker",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:critical-coverage",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:ai-evaluation",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:weights",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:decision-engine",
          "eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review upcoming rent, energy, and internet obligations",
              "description": "Review the upcoming unpaid obligations for rent (980 EUR due 2026-11-06), energy (105 EUR due 2026-11-10), and internet (32 EUR due 2026-11-12) against available account balances.",
              "rationale": "The user has upcoming bills due in early November before the expected monthly salary inflow on 2026-11-27.",
              "actionId": null,
              "intent": "REVIEW",
              "targetFactId": "obligation-1",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-1",
                "obligation-2",
                "obligation-3",
                "income-1",
                "account-1"
              ],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Unverified or unknown AS reference.",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Review active subscriptions",
              "description": "Inspect recurring subscription transactions such as Sound Library and Screen Library observed in recent monthly statements.",
              "rationale": "Multiple recurring subscription transactions were observed in the user's account history between August and October 2026.",
              "actionId": null,
              "intent": "REVIEW",
              "targetFactId": "subscription-1",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "subscription-1",
                "subscription-2",
                "subscription-3",
                "subscription-4",
                "subscription-5",
                "subscription-6",
                "behavior"
              ],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Unverified or unknown AS reference.",
              "evidence": []
            },
            {
              "id": "primary-3",
              "title": "Review credit card debt details",
              "description": "Check the credit card debt terms, including the 21.9% APR, minimum payment of 55 EUR due on 2026-11-15, and the 850 EUR balance.",
              "rationale": "Debt analysis indicates missing input regarding interest accruing and outlines the upcoming payment due date.",
              "actionId": null,
              "intent": "REVIEW",
              "targetFactId": "debt-1",
              "prerequisites": [],
              "missingInfo": [
                "interestAccruing"
              ],
              "factIds": [
                "debt-1",
                "debt-analysis"
              ],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Unverified or unknown AS reference.",
              "evidence": []
            }
          ],
          "shortfallReason": "",
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
    }
  },
  "primaryProposals": [
    {
      "id": "primary-1",
      "title": "Review upcoming rent, energy, and internet obligations",
      "description": "Review the upcoming unpaid obligations for rent (980 EUR due 2026-11-06), energy (105 EUR due 2026-11-10), and internet (32 EUR due 2026-11-12) against available account balances.",
      "rationale": "The user has upcoming bills due in early November before the expected monthly salary inflow on 2026-11-27.",
      "actionId": null,
      "intent": "REVIEW",
      "targetFactId": "obligation-1",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-1",
        "obligation-2",
        "obligation-3",
        "income-1",
        "account-1"
      ],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Review active subscriptions",
      "description": "Inspect recurring subscription transactions such as Sound Library and Screen Library observed in recent monthly statements.",
      "rationale": "Multiple recurring subscription transactions were observed in the user's account history between August and October 2026.",
      "actionId": null,
      "intent": "REVIEW",
      "targetFactId": "subscription-1",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "subscription-1",
        "subscription-2",
        "subscription-3",
        "subscription-4",
        "subscription-5",
        "subscription-6",
        "behavior"
      ],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Review credit card debt details",
      "description": "Check the credit card debt terms, including the 21.9% APR, minimum payment of 55 EUR due on 2026-11-15, and the 850 EUR balance.",
      "rationale": "Debt analysis indicates missing input regarding interest accruing and outlines the upcoming payment due date.",
      "actionId": null,
      "intent": "REVIEW",
      "targetFactId": "debt-1",
      "prerequisites": [],
      "missingInfo": [
        "interestAccruing"
      ],
      "factIds": [
        "debt-1",
        "debt-analysis"
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
      "stored_bytes": 133544
    },
    {
      "doc_key": "chat",
      "stored_bytes": 904
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 884
    },
    {
      "doc_key": "chat-request:nora-context",
      "stored_bytes": 1896
    },
    {
      "doc_key": "engine",
      "stored_bytes": 485752
    },
    {
      "doc_key": "import:51e38e75-f34d-40f2-9121-afd3a7109c93",
      "stored_bytes": 55096
    },
    {
      "doc_key": "import:f75ec563-e71f-430a-a1dc-1979e24d5539",
      "stored_bytes": 4864
    },
    {
      "doc_key": "job-request:c8aab4b0ae97659dc842212ab9aa8f3f8cb4b18d9bebac1ed6c92f1ba4fc196c",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:c90944689a0d4e09b2c3fe3c2452084990f69176d2c38ab4787bcf1f63b26618",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:fa32cad87057de9c9e0da285344fdded01736cff37b75fc0cf7817e871ff7268",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:2fd6f816-eb28-4c1c-b264-e4666d2c2144",
      "stored_bytes": 62416
    },
    {
      "doc_key": "job:8c3036ac-f76f-4ec7-b3d1-7b6a914ee638",
      "stored_bytes": 5652
    },
    {
      "doc_key": "job:a4100e13-dc54-467d-b4af-f5bbefd41bb9",
      "stored_bytes": 133984
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:ai-evaluation",
      "stored_bytes": 4528
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:behavior-agent",
      "stored_bytes": 5528
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:catalog-selector",
      "stored_bytes": 5036
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:checker",
      "stored_bytes": 18564
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:classification",
      "stored_bytes": 41272
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:debt-agent",
      "stored_bytes": 2520
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:debt-calculator",
      "stored_bytes": 1780
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:decision-engine",
      "stored_bytes": 14512
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:explanation",
      "stored_bytes": 2984
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:financial-calculator",
      "stored_bytes": 15876
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:fx",
      "stored_bytes": 1300
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:pattern-recognition",
      "stored_bytes": 28556
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:pi",
      "stored_bytes": 1640
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:suggestion-generator",
      "stored_bytes": 4392
    },
    {
      "doc_key": "stage:eval_fe5c03b9-d105-4e2f-8373-9d98b36a4623:weights",
      "stored_bytes": 1732
    },
    {
      "doc_key": "state",
      "stored_bytes": 85080
    }
  ]
}
~~~~

## Summary

~~~~text
Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.
~~~~
