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
  "jobId": "7499e45c-065d-45b3-88e8-dc5c7ea0b633",
  "decision": {
    "evaluationId": "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b",
    "snapshotId": "snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
    "snapshotVersion": "3.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "VERIFICATION_UNLOCK",
    "selectedActionId": "A014",
    "selectedActionType": "VERIFICATION_ACTION",
    "candidate": {
      "candidateId": "verify_A014_txn_stmt_1794152577419_uzrw_6",
      "actionId": "A014",
      "actionType": "VERIFICATION_ACTION",
      "title": "Review recurring subscription before cancellation",
      "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
      "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
      "targetId": "txn_stmt_1794152577419_uzrw_6",
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
      "evaluationId": "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b",
      "userId": "7e75b452-39a2-42d7-a2e4-7a788da23ba0",
      "snapshotId": "snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:44:06.982Z",
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
            "candidateId": "cand_A007_snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
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
            "candidateId": "cand_A015_txn_stmt_1794152577419_uzrw_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794152577419_uzrw_6",
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
            "candidateId": "verify_A014_txn_stmt_1794152577419_uzrw_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794152577419_uzrw_6",
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
        "candidateId": "verify_A014_txn_stmt_1794152577419_uzrw_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794152577419_uzrw_6",
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
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:pi",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:fx",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:classification",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:pattern-recognition",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:behavior-agent",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:financial-calculator",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:debt-calculator",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:debt-agent",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:suggestion-generator",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:catalog-selector",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:checker",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:critical-coverage",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:ai-evaluation",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:weights",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:decision-engine",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Malformed proposal",
            "description": "",
            "rationale": "",
            "actionId": null,
            "factIds": [],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Malformed proposal: missingInfo.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review upcoming monthly obligations",
            "description": "Examine the timing of rent, energy, and internet payments (obligation-1, obligation-2, obligation-3) relative to the next salary date on 2026-11-27 to ensure sufficient liquidity.",
            "rationale": "Multiple obligations are due before the next income date, necessitating a review of current account balances to avoid potential payment delays.",
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
            "claimIds": [
              "C023"
            ],
            "status": "REJECTED",
            "reason": "The provided evidence (a meta-analysis of financial education studies) does not verify the proposed review action, target facts, or financial execution terms.",
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
        "shortfallReason": "No applicable verified claim supports a specific action.",
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
    "id": "rec_A014_eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b",
    "userId": "7e75b452-39a2-42d7-a2e4-7a788da23ba0",
    "snapshotId": "snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
    "actionType": "review_recurring_subscription",
    "title": "Review recurring subscription before cancellation",
    "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
    "reasoning": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.",
    "suggestedAmount": 10.99,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "txn_stmt_1794152577419_uzrw_6",
    "sourceAccountId": "main",
    "priority": "clarification",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T15:44:07.018Z",
    "updatedAt": "2026-11-08T15:44:07.018Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:pi",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:fx",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:classification",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:pattern-recognition",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:behavior-agent",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:financial-calculator",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:debt-calculator",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:debt-agent",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:suggestion-generator",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:catalog-selector",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:checker",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:critical-coverage",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:ai-evaluation",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:weights",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:decision-engine",
        "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:explanation"
      ],
      "evaluationId": "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b",
      "userId": "7e75b452-39a2-42d7-a2e4-7a788da23ba0",
      "snapshotId": "snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
      "snapshotVersion": "3.0",
      "createdAt": "2026-11-08T15:44:06.982Z",
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
            "candidateId": "cand_A007_snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
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
            "candidateId": "cand_A015_txn_stmt_1794152577419_uzrw_6",
            "actionId": "A015",
            "actionType": "FINANCIAL_ACTION",
            "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
            "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
            "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
            "targetId": "txn_stmt_1794152577419_uzrw_6",
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
            "candidateId": "verify_A014_txn_stmt_1794152577419_uzrw_6",
            "actionId": "A014",
            "actionType": "VERIFICATION_ACTION",
            "title": "Review recurring subscription before cancellation",
            "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
            "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
            "targetId": "txn_stmt_1794152577419_uzrw_6",
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
        "candidateId": "verify_A014_txn_stmt_1794152577419_uzrw_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794152577419_uzrw_6",
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
            "title": "Malformed proposal",
            "description": "",
            "rationale": "",
            "actionId": null,
            "factIds": [],
            "claimIds": [],
            "status": "REJECTED",
            "reason": "Malformed proposal: missingInfo.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Review upcoming monthly obligations",
            "description": "Examine the timing of rent, energy, and internet payments (obligation-1, obligation-2, obligation-3) relative to the next salary date on 2026-11-27 to ensure sufficient liquidity.",
            "rationale": "Multiple obligations are due before the next income date, necessitating a review of current account balances to avoid potential payment delays.",
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
            "claimIds": [
              "C023"
            ],
            "status": "REJECTED",
            "reason": "The provided evidence (a meta-analysis of financial education studies) does not verify the proposed review action, target facts, or financial execution terms.",
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
        "shortfallReason": "No applicable verified claim supports a specific action.",
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
      "evaluationId": "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b",
      "snapshotId": "snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
      "snapshotVersion": "3.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "VERIFICATION_UNLOCK",
      "selectedActionId": "A014",
      "selectedActionType": "VERIFICATION_ACTION",
      "candidate": {
        "candidateId": "verify_A014_txn_stmt_1794152577419_uzrw_6",
        "actionId": "A014",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review recurring subscription before cancellation",
        "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
        "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
        "targetId": "txn_stmt_1794152577419_uzrw_6",
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
        "evaluationId": "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b",
        "userId": "7e75b452-39a2-42d7-a2e4-7a788da23ba0",
        "snapshotId": "snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
        "snapshotVersion": "3.0",
        "createdAt": "2026-11-08T15:44:06.982Z",
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
              "candidateId": "cand_A007_snap_beta_7e75b452-39a2-42d7-a2e4-7a788da23ba0_v3_6b028b00d113b10b",
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
              "candidateId": "cand_A015_txn_stmt_1794152577419_uzrw_6",
              "actionId": "A015",
              "actionType": "FINANCIAL_ACTION",
              "title": "Cancel unused Sound Library subscription (observed charge EUR 10.99)",
              "description": "Observed charge EUR 10.99 at Sound Library. Confirm usage, recurrence and cancellation terms before calculating any savings.",
              "rationale": "Recurring charge detected at Sound Library; requires user usage and cancellation-term confirmation per R010.",
              "targetId": "txn_stmt_1794152577419_uzrw_6",
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
              "candidateId": "verify_A014_txn_stmt_1794152577419_uzrw_6",
              "actionId": "A014",
              "actionType": "VERIFICATION_ACTION",
              "title": "Review recurring subscription before cancellation",
              "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
              "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
              "targetId": "txn_stmt_1794152577419_uzrw_6",
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
          "candidateId": "verify_A014_txn_stmt_1794152577419_uzrw_6",
          "actionId": "A014",
          "actionType": "VERIFICATION_ACTION",
          "title": "Review recurring subscription before cancellation",
          "description": "Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.",
          "rationale": "Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).",
          "targetId": "txn_stmt_1794152577419_uzrw_6",
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
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:pi",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:fx",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:classification",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:pattern-recognition",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:behavior-agent",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:financial-calculator",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:debt-calculator",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:debt-agent",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:suggestion-generator",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:catalog-selector",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:checker",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:critical-coverage",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:ai-evaluation",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:weights",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:decision-engine",
          "eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Malformed proposal",
              "description": "",
              "rationale": "",
              "actionId": null,
              "factIds": [],
              "claimIds": [],
              "status": "REJECTED",
              "reason": "Malformed proposal: missingInfo.",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Review upcoming monthly obligations",
              "description": "Examine the timing of rent, energy, and internet payments (obligation-1, obligation-2, obligation-3) relative to the next salary date on 2026-11-27 to ensure sufficient liquidity.",
              "rationale": "Multiple obligations are due before the next income date, necessitating a review of current account balances to avoid potential payment delays.",
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
              "claimIds": [
                "C023"
              ],
              "status": "REJECTED",
              "reason": "The provided evidence (a meta-analysis of financial education studies) does not verify the proposed review action, target facts, or financial execution terms.",
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
          "shortfallReason": "No applicable verified claim supports a specific action.",
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
      "title": "Malformed proposal",
      "description": "",
      "rationale": "",
      "actionId": null,
      "factIds": [],
      "claimIds": [],
      "status": "REJECTED",
      "reason": "Malformed proposal: missingInfo.",
      "evidence": [],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Review upcoming monthly obligations",
      "description": "Examine the timing of rent, energy, and internet payments (obligation-1, obligation-2, obligation-3) relative to the next salary date on 2026-11-27 to ensure sufficient liquidity.",
      "rationale": "Multiple obligations are due before the next income date, necessitating a review of current account balances to avoid potential payment delays.",
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
      "claimIds": [
        "C023"
      ],
      "status": "REJECTED",
      "reason": "The provided evidence (a meta-analysis of financial education studies) does not verify the proposed review action, target facts, or financial execution terms.",
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
      "stored_bytes": 134796
    },
    {
      "doc_key": "chat",
      "stored_bytes": 552
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 896
    },
    {
      "doc_key": "chat-request:nora-context",
      "stored_bytes": 1252
    },
    {
      "doc_key": "engine",
      "stored_bytes": 482936
    },
    {
      "doc_key": "import:5e7cc526-cd8d-4d4f-85bb-d2b8542d715c",
      "stored_bytes": 55096
    },
    {
      "doc_key": "import:8bb8ca30-51bd-4391-9cdf-169d1590b84c",
      "stored_bytes": 4864
    },
    {
      "doc_key": "job-request:2d34c8db0b0afbc1c869546e1f918c701add2cbaee4899a65f16dbfd371f757d",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:300a40588c37c3bbe59e13f9534b6f16231daabf9a7d17eb448d087cad8093f1",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:828b39498753c57f2d4f482f011fbfc14e3f6b13b97c2e0e67e892a0dcb2f302",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:4914734d-8b95-422d-bb94-cd593869747f",
      "stored_bytes": 5652
    },
    {
      "doc_key": "job:7499e45c-065d-45b3-88e8-dc5c7ea0b633",
      "stored_bytes": 135236
    },
    {
      "doc_key": "job:e0bf39f0-a14f-4f96-9541-0fa6131659da",
      "stored_bytes": 62416
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:ai-evaluation",
      "stored_bytes": 4528
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:behavior-agent",
      "stored_bytes": 3712
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:catalog-selector",
      "stored_bytes": 5036
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:checker",
      "stored_bytes": 18184
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:classification",
      "stored_bytes": 43532
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:debt-agent",
      "stored_bytes": 2520
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:debt-calculator",
      "stored_bytes": 1780
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:decision-engine",
      "stored_bytes": 14556
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:explanation",
      "stored_bytes": 2984
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:financial-calculator",
      "stored_bytes": 15876
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:fx",
      "stored_bytes": 1300
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:pattern-recognition",
      "stored_bytes": 26548
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:pi",
      "stored_bytes": 1640
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:suggestion-generator",
      "stored_bytes": 4028
    },
    {
      "doc_key": "stage:eval_884c84de-5ede-4df4-9e3b-ccc5b9728b3b:weights",
      "stored_bytes": 1784
    },
    {
      "doc_key": "state",
      "stored_bytes": 87364
    }
  ]
}
~~~~

## Summary

~~~~text
Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015). Missing or unconfirmed data: fresh_account_balance, stale_pi:liquid_balance, stale_account_balance, dated_essential_outflows, stale_pi:cash_flow, verified_debt_interest_terms, required_pi:monthly_fee, required_pi:exit_terms, subscription_usage_and_exit_terms_confirmation. Safety rules: R010. Sources: S001.
~~~~
