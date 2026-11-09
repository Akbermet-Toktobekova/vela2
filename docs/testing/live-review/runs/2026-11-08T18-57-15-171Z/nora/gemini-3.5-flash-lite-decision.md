# 03 Nora · gemini 3.5 flash lite decision

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
          "candidateId": "cand_A007_snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
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
          "candidateId": "cand_A015_txn_stmt_1794156158739_un7u_6",
          "actionId": "A015",
          "actionType": "FINANCIAL_ACTION",
          "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
          "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
          "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
          "targetId": "txn_stmt_1794156158739_un7u_6",
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
          "candidateId": "verify_A014_txn_stmt_1794156158739_un7u_6",
          "actionId": "A014",
          "actionType": "VERIFICATION_ACTION",
          "title": "Review recurring subscription before cancellation",
          "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
          "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
          "targetId": "txn_stmt_1794156158739_un7u_6",
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
    "validFinancialCandidates": [],
    "validCriticalCandidates": [],
    "validVerificationCandidates": [
      {
        "candidate": {
          "candidateId": "verify_A014_txn_stmt_1794156158739_un7u_6",
          "actionId": "A014",
          "actionType": "VERIFICATION_ACTION",
          "title": "Review recurring subscription before cancellation",
          "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
          "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
          "targetId": "txn_stmt_1794156158739_un7u_6",
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
    "rejectedCandidates": [],
    "needsDataCandidates": [
      {
        "candidate": {
          "candidateId": "cand_A007_snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
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
          "candidateId": "cand_A015_txn_stmt_1794156158739_un7u_6",
          "actionId": "A015",
          "actionType": "FINANCIAL_ACTION",
          "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
          "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
          "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
          "targetId": "txn_stmt_1794156158739_un7u_6",
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
      }
    ],
    "missingFieldsUnion": [
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
    "criticalCoverageAddedIds": [],
    "fallbackTriggered": true
  },
  "fallbackReason": "NO_VALID_PRIMARY"
}
~~~~

## Output

~~~~json
{
  "evaluationId": "eval_4c70b47b-c2aa-4692-b35b-ea2a3ba4646a",
  "snapshotId": "snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
  "snapshotVersion": "4.0",
  "decisionStatus": "RECOMMENDATION_READY",
  "priorityClass": "VERIFICATION_UNLOCK",
  "selectedActionId": "A014",
  "selectedActionType": "VERIFICATION_ACTION",
  "candidate": {
    "candidateId": "verify_A014_txn_stmt_1794156158739_un7u_6",
    "actionId": "A014",
    "actionType": "VERIFICATION_ACTION",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
    "targetId": "txn_stmt_1794156158739_un7u_6",
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
  "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
  "expectedEffectSummary": "Verification step (A014) to confirm contract or usage terms without fabricating monetary R/F/G scores.",
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
    "evaluationId": "eval_4c70b47b-c2aa-4692-b35b-ea2a3ba4646a",
    "userId": "9cf0e99b-d6d4-4f08-83bf-b25403108210",
    "snapshotId": "snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
    "snapshotVersion": "4.0",
    "createdAt": "2026-11-08T18:57:30.547Z",
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
          "candidateId": "cand_A007_snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
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
          "candidateId": "cand_A015_txn_stmt_1794156158739_un7u_6",
          "actionId": "A015",
          "actionType": "FINANCIAL_ACTION",
          "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
          "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
          "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
          "targetId": "txn_stmt_1794156158739_un7u_6",
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
          "candidateId": "verify_A014_txn_stmt_1794156158739_un7u_6",
          "actionId": "A014",
          "actionType": "VERIFICATION_ACTION",
          "title": "Review recurring subscription before cancellation",
          "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
          "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
          "targetId": "txn_stmt_1794156158739_un7u_6",
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
      "candidateId": "verify_A014_txn_stmt_1794156158739_un7u_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794156158739_un7u_6",
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
~~~~
