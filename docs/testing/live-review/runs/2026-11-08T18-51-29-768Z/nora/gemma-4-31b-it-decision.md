# 03 Nora · gemma 4 31b it decision

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
          "candidateId": "cand_A012_reserve",
          "actionId": "A012",
          "actionType": "FINANCIAL_ACTION",
          "title": "Contribute EUR 1200 toward \"Emergency reserve\"",
          "description": "Allocate EUR 1200 from available cash toward your \"Emergency reserve\" goal (advancing progress from 20% to 60%).",
          "rationale": "Advances verified savings goal \"Emergency reserve\" by 40.0 percentage points (F012, F015) while keeping cash above floor (R002, R012).",
          "targetId": "reserve",
          "sourceAccountId": "main",
          "destinationAccountId": null,
          "amount": 1200,
          "currency": "EUR",
          "proposedTiming": "2026-11-05",
          "supportingRuleIds": [
            "R002",
            "R012"
          ],
          "supportingClaimIds": [
            "C006"
          ],
          "supportingSourceIds": [
            "S001"
          ],
          "requiredPiInputs": [
            "goal_target",
            "goal_balance",
            "available_cash"
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
          "stale_pi:available_cash",
          "stale_account_balance",
          "dated_essential_outflows"
        ],
        "inputEvidence": [
          {
            "field": "goal_target",
            "status": "VERIFIED"
          },
          {
            "field": "goal_balance",
            "status": "VERIFIED"
          },
          {
            "field": "available_cash",
            "status": "STALE"
          }
        ],
        "projectedMinCashAfterAction": 1205.01,
        "unlocksActionIds": []
      }
    ],
    "validFinancialCandidates": [],
    "validCriticalCandidates": [],
    "validVerificationCandidates": [],
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
          "candidateId": "cand_A012_reserve",
          "actionId": "A012",
          "actionType": "FINANCIAL_ACTION",
          "title": "Contribute EUR 1200 toward \"Emergency reserve\"",
          "description": "Allocate EUR 1200 from available cash toward your \"Emergency reserve\" goal (advancing progress from 20% to 60%).",
          "rationale": "Advances verified savings goal \"Emergency reserve\" by 40.0 percentage points (F012, F015) while keeping cash above floor (R002, R012).",
          "targetId": "reserve",
          "sourceAccountId": "main",
          "destinationAccountId": null,
          "amount": 1200,
          "currency": "EUR",
          "proposedTiming": "2026-11-05",
          "supportingRuleIds": [
            "R002",
            "R012"
          ],
          "supportingClaimIds": [
            "C006"
          ],
          "supportingSourceIds": [
            "S001"
          ],
          "requiredPiInputs": [
            "goal_target",
            "goal_balance",
            "available_cash"
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
          "stale_pi:available_cash",
          "stale_account_balance",
          "dated_essential_outflows"
        ],
        "inputEvidence": [
          {
            "field": "goal_target",
            "status": "VERIFIED"
          },
          {
            "field": "goal_balance",
            "status": "VERIFIED"
          },
          {
            "field": "available_cash",
            "status": "STALE"
          }
        ],
        "projectedMinCashAfterAction": 1205.01,
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
      "stale_pi:available_cash"
    ],
    "criticalCoverageAddedIds": [],
    "fallbackTriggered": true
  },
  "fallbackReason": "GENERATION_UNAVAILABLE"
}
~~~~

## Output

~~~~json
{
  "evaluationId": "eval_4c70b47b-c2aa-4692-b35b-ea2a3ba4646a",
  "snapshotId": "snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
  "snapshotVersion": "4.0",
  "decisionStatus": "NEEDS_DATA",
  "priorityClass": "NONE",
  "selectedActionId": null,
  "selectedActionType": null,
  "candidate": null,
  "title": "Clarification needed to unlock next step",
  "description": "Additional user data is required before a safe action can be recommended (fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, stale_pi:available_cash).",
  "reasoning": "Additional user data is required before a safe action can be recommended (fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, stale_pi:available_cash).",
  "expectedEffectSummary": "Confirming missing details unlocks verified financial evaluation.",
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
  "sourceIds": [],
  "ruleIds": [],
  "claimIds": [],
  "dataQualityStatus": "NEEDS_DATA",
  "clarificationQuestion": "Your primary account balance is older than the freshness threshold; could you confirm your current accessible balance?",
  "missingFields": [
    "fresh_account_balance",
    "stale_pi:liquid_balance",
    "stale_account_balance",
    "dated_essential_outflows",
    "stale_pi:cash_flow",
    "verified_debt_interest_terms",
    "stale_pi:available_cash"
  ],
  "trace": {
    "evaluationId": "eval_4c70b47b-c2aa-4692-b35b-ea2a3ba4646a",
    "userId": "9cf0e99b-d6d4-4f08-83bf-b25403108210",
    "snapshotId": "snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
    "snapshotVersion": "4.0",
    "createdAt": "2026-11-08T18:53:51.110Z",
    "runtimeMode": "PROTOTYPE_MODE",
    "policyBundleVersion": "prototype_policy_bundle_v1.4",
    "priorityClass": "NONE",
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
          "candidateId": "cand_A012_reserve",
          "actionId": "A012",
          "actionType": "FINANCIAL_ACTION",
          "title": "Contribute EUR 1200 toward \"Emergency reserve\"",
          "description": "Allocate EUR 1200 from available cash toward your \"Emergency reserve\" goal (advancing progress from 20% to 60%).",
          "rationale": "Advances verified savings goal \"Emergency reserve\" by 40.0 percentage points (F012, F015) while keeping cash above floor (R002, R012).",
          "targetId": "reserve",
          "sourceAccountId": "main",
          "destinationAccountId": null,
          "amount": 1200,
          "currency": "EUR",
          "proposedTiming": "2026-11-05",
          "supportingRuleIds": [
            "R002",
            "R012"
          ],
          "supportingClaimIds": [
            "C006"
          ],
          "supportingSourceIds": [
            "S001"
          ],
          "requiredPiInputs": [
            "goal_target",
            "goal_balance",
            "available_cash"
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
          "stale_pi:available_cash",
          "stale_account_balance",
          "dated_essential_outflows"
        ],
        "inputEvidence": [
          {
            "field": "goal_target",
            "status": "VERIFIED"
          },
          {
            "field": "goal_balance",
            "status": "VERIFIED"
          },
          {
            "field": "available_cash",
            "status": "STALE"
          }
        ],
        "projectedMinCashAfterAction": 1205.01,
        "unlocksActionIds": []
      }
    ],
    "scoredCandidates": [],
    "robustness": null,
    "selectedCandidate": null,
    "selectedActionType": null,
    "decisionStatus": "NEEDS_DATA",
    "decisionReason": "Additional user data is required before a safe action can be recommended (fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, stale_pi:available_cash).",
    "supportingSourceIds": [],
    "supportingRuleIds": [],
    "supportingClaimIds": [],
    "missingDataFields": [
      "fresh_account_balance",
      "stale_pi:liquid_balance",
      "stale_account_balance",
      "dated_essential_outflows",
      "stale_pi:cash_flow",
      "verified_debt_interest_terms",
      "stale_pi:available_cash"
    ],
    "clarificationQuestion": "Your primary account balance is older than the freshness threshold; could you confirm your current accessible balance?"
  }
}
~~~~
