# 03 Nora · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations. | — |

Actual Today output: **Review account balance freshness**.

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
  "jobId": "83b2cbb6-2882-46e1-bb33-ae6dcae5bbe8",
  "decision": {
    "evaluationId": "eval_9301c02d-a2d5-4816-8c3e-082398ae1832",
    "snapshotId": "snap_beta_4580d11c-121b-43fc-ad1c-4a54a2e02af6_v4_59e13370cd4f57b4",
    "snapshotVersion": "4.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "NORMAL",
    "selectedActionId": null,
    "selectedActionType": null,
    "candidate": null,
    "sourceAdvice": {
      "id": "primary-1",
      "title": "Review account balance freshness",
      "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
      "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
      "sources": []
    },
    "title": "Review account balance freshness",
    "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
    "reasoning": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
    "expectedEffectSummary": "Review the relevant information in your profile before deciding on your next step.",
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
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": null,
    "missingFields": [],
    "trace": {
      "evaluationId": "eval_9301c02d-a2d5-4816-8c3e-082398ae1832",
      "userId": "4580d11c-121b-43fc-ad1c-4a54a2e02af6",
      "snapshotId": "snap_beta_4580d11c-121b-43fc-ad1c-4a54a2e02af6_v4_59e13370cd4f57b4",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T20:09:46.035Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "NORMAL",
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
      "validatedCandidates": [],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": null,
      "sourceAdvice": {
        "id": "primary-1",
        "title": "Review account balance freshness",
        "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
        "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
        "sources": []
      },
      "stageArtifactIds": [
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:pi",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:fx",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:classification",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:pattern-recognition",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:behavior-agent",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:financial-calculator",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:debt-calculator",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:debt-agent",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:suggestion-generator",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:catalog-selector",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:checker",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:critical-coverage",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:ai-evaluation",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:weights",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:decision-engine",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review account balance freshness",
            "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
            "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "account-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "account-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The step proposes reviewing account balances for account-1 and account-2, which is consistent with the data showing that account-1 and account-2 balances are marked as stale (isStale: true) on 2026-10-28.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Verify credit card interest accrual status",
            "description": "Check whether interest is currently accruing on debt-1 to evaluate future card balance growth.",
            "rationale": "Debt analysis indicates that interest accrual status is missing for debt-1.",
            "actionId": null,
            "intent": "EXECUTE",
            "origin": "MODEL",
            "targetFactId": "debt-1",
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
            "id": "primary-3",
            "title": "Clarify Current dated account balances",
            "description": "Provide the current available balance and balance date for each cited account.",
            "rationale": "Required to resolve stale data for account balances.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "account-1",
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
          }
        ],
        "shortfallReason": "",
        "fallbackReason": null,
        "criticalCoverageAddedIds": []
      },
      "selectedActionType": null,
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
      "supportingSourceIds": [],
      "supportingRuleIds": [],
      "supportingClaimIds": [],
      "missingDataFields": [],
      "clarificationQuestion": null
    }
  },
  "todayCard": {
    "id": "rec_advice_eval_9301c02d-a2d5-4816-8c3e-082398ae1832",
    "userId": "4580d11c-121b-43fc-ad1c-4a54a2e02af6",
    "snapshotId": "snap_beta_4580d11c-121b-43fc-ad1c-4a54a2e02af6_v4_59e13370cd4f57b4",
    "actionType": "source_backed_advice",
    "sourceAdvice": {
      "id": "primary-1",
      "title": "Review account balance freshness",
      "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
      "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
      "sources": []
    },
    "title": "Review account balance freshness",
    "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
    "reasoning": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
    "suggestedAmount": null,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": null,
    "sourceAccountId": null,
    "priority": "suggested",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:09:46.047Z",
    "updatedAt": "2026-11-08T20:09:46.047Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:pi",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:fx",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:classification",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:pattern-recognition",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:behavior-agent",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:financial-calculator",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:debt-calculator",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:debt-agent",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:suggestion-generator",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:catalog-selector",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:checker",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:critical-coverage",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:ai-evaluation",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:weights",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:decision-engine",
        "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:explanation"
      ],
      "evaluationId": "eval_9301c02d-a2d5-4816-8c3e-082398ae1832",
      "userId": "4580d11c-121b-43fc-ad1c-4a54a2e02af6",
      "snapshotId": "snap_beta_4580d11c-121b-43fc-ad1c-4a54a2e02af6_v4_59e13370cd4f57b4",
      "snapshotVersion": "4.0",
      "createdAt": "2026-11-08T20:09:46.035Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "NORMAL",
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
      "validatedCandidates": [],
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": null,
      "sourceAdvice": {
        "id": "primary-1",
        "title": "Review account balance freshness",
        "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
        "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
        "sources": []
      },
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review account balance freshness",
            "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
            "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "account-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "account-1",
              "account-2"
            ],
            "claimIds": [],
            "status": "VALID",
            "reason": "The step proposes reviewing account balances for account-1 and account-2, which is consistent with the data showing that account-1 and account-2 balances are marked as stale (isStale: true) on 2026-10-28.",
            "evidence": []
          },
          {
            "id": "primary-2",
            "title": "Verify credit card interest accrual status",
            "description": "Check whether interest is currently accruing on debt-1 to evaluate future card balance growth.",
            "rationale": "Debt analysis indicates that interest accrual status is missing for debt-1.",
            "actionId": null,
            "intent": "EXECUTE",
            "origin": "MODEL",
            "targetFactId": "debt-1",
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
            "id": "primary-3",
            "title": "Clarify Current dated account balances",
            "description": "Provide the current available balance and balance date for each cited account.",
            "rationale": "Required to resolve stale data for account balances.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "account-1",
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
          }
        ],
        "shortfallReason": "",
        "fallbackReason": null,
        "criticalCoverageAddedIds": []
      },
      "selectedActionType": null,
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
      "supportingSourceIds": [],
      "supportingRuleIds": [],
      "supportingClaimIds": [],
      "missingDataFields": [],
      "clarificationQuestion": null
    },
    "decision": {
      "evaluationId": "eval_9301c02d-a2d5-4816-8c3e-082398ae1832",
      "snapshotId": "snap_beta_4580d11c-121b-43fc-ad1c-4a54a2e02af6_v4_59e13370cd4f57b4",
      "snapshotVersion": "4.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "NORMAL",
      "selectedActionId": null,
      "selectedActionType": null,
      "candidate": null,
      "sourceAdvice": {
        "id": "primary-1",
        "title": "Review account balance freshness",
        "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
        "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
        "sources": []
      },
      "title": "Review account balance freshness",
      "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
      "reasoning": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
      "expectedEffectSummary": "Review the relevant information in your profile before deciding on your next step.",
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
      "dataQualityStatus": "PROTOTYPE_POLICY",
      "clarificationQuestion": null,
      "missingFields": [],
      "trace": {
        "evaluationId": "eval_9301c02d-a2d5-4816-8c3e-082398ae1832",
        "userId": "4580d11c-121b-43fc-ad1c-4a54a2e02af6",
        "snapshotId": "snap_beta_4580d11c-121b-43fc-ad1c-4a54a2e02af6_v4_59e13370cd4f57b4",
        "snapshotVersion": "4.0",
        "createdAt": "2026-11-08T20:09:46.035Z",
        "runtimeMode": "PROTOTYPE_MODE",
        "policyBundleVersion": "prototype_policy_bundle_v1.4",
        "priorityClass": "NORMAL",
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
        "validatedCandidates": [],
        "scoredCandidates": [],
        "robustness": null,
        "selectedCandidate": null,
        "sourceAdvice": {
          "id": "primary-1",
          "title": "Review account balance freshness",
          "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
          "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
          "sources": []
        },
        "stageArtifactIds": [
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:pi",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:fx",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:classification",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:pattern-recognition",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:behavior-agent",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:financial-calculator",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:debt-calculator",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:debt-agent",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:suggestion-generator",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:catalog-selector",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:checker",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:critical-coverage",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:ai-evaluation",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:weights",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:decision-engine",
          "eval_9301c02d-a2d5-4816-8c3e-082398ae1832:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review account balance freshness",
              "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
              "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "account-1",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "account-1",
                "account-2"
              ],
              "claimIds": [],
              "status": "VALID",
              "reason": "The step proposes reviewing account balances for account-1 and account-2, which is consistent with the data showing that account-1 and account-2 balances are marked as stale (isStale: true) on 2026-10-28.",
              "evidence": []
            },
            {
              "id": "primary-2",
              "title": "Verify credit card interest accrual status",
              "description": "Check whether interest is currently accruing on debt-1 to evaluate future card balance growth.",
              "rationale": "Debt analysis indicates that interest accrual status is missing for debt-1.",
              "actionId": null,
              "intent": "EXECUTE",
              "origin": "MODEL",
              "targetFactId": "debt-1",
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
              "id": "primary-3",
              "title": "Clarify Current dated account balances",
              "description": "Provide the current available balance and balance date for each cited account.",
              "rationale": "Required to resolve stale data for account balances.",
              "actionId": null,
              "intent": "CLARIFY",
              "origin": "MODEL",
              "targetFactId": "account-1",
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
            }
          ],
          "shortfallReason": "",
          "fallbackReason": null,
          "criticalCoverageAddedIds": []
        },
        "selectedActionType": null,
        "decisionStatus": "RECOMMENDATION_READY",
        "decisionReason": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
        "supportingSourceIds": [],
        "supportingRuleIds": [],
        "supportingClaimIds": [],
        "missingDataFields": [],
        "clarificationQuestion": null
      }
    }
  },
  "primaryProposals": [
    {
      "id": "primary-1",
      "title": "Review account balance freshness",
      "description": "Examine the recorded dates and balances for account-1 and account-2 to verify whether updated statements are available.",
      "rationale": "Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "account-1",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "account-1",
        "account-2"
      ],
      "claimIds": [],
      "status": "VALID",
      "reason": "The step proposes reviewing account balances for account-1 and account-2, which is consistent with the data showing that account-1 and account-2 balances are marked as stale (isStale: true) on 2026-10-28.",
      "evidence": [],
      "score": null,
      "selected": true
    },
    {
      "id": "primary-2",
      "title": "Verify credit card interest accrual status",
      "description": "Check whether interest is currently accruing on debt-1 to evaluate future card balance growth.",
      "rationale": "Debt analysis indicates that interest accrual status is missing for debt-1.",
      "actionId": null,
      "intent": "EXECUTE",
      "origin": "MODEL",
      "targetFactId": "debt-1",
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
      "id": "primary-3",
      "title": "Clarify Current dated account balances",
      "description": "Provide the current available balance and balance date for each cited account.",
      "rationale": "Required to resolve stale data for account balances.",
      "actionId": null,
      "intent": "CLARIFY",
      "origin": "MODEL",
      "targetFactId": "account-1",
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
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 117200
    },
    {
      "doc_key": "chat",
      "stored_bytes": 552
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 884
    },
    {
      "doc_key": "chat-request:nora-context",
      "stored_bytes": 1252
    },
    {
      "doc_key": "engine",
      "stored_bytes": 449400
    },
    {
      "doc_key": "import:1dd7d84f-86a7-4c8e-9dd4-e3af7a81c628",
      "stored_bytes": 4864
    },
    {
      "doc_key": "import:c7a14fdc-5db9-4be3-9349-fb5166762add",
      "stored_bytes": 55096
    },
    {
      "doc_key": "job-request:95ac9ee4bc5becb1fad65b22662c4e7e8ceb9949efafc04f43a8805265dd6561",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:a348d704efd0ab6cfa707aa52ce29ea91380f7ed83630afc29db6200cb311365",
      "stored_bytes": 96
    },
    {
      "doc_key": "job-request:b1421e60b7bf5af12a8342f9f69217dc893b3d0048a2ce8bde887aa595023b3e",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:5bca373e-7e8b-499c-92d7-25175f56547c",
      "stored_bytes": 5652
    },
    {
      "doc_key": "job:83b2cbb6-2882-46e1-bb33-ae6dcae5bbe8",
      "stored_bytes": 117640
    },
    {
      "doc_key": "job:b972933d-2e7e-4ad2-8dd1-31ec4829163d",
      "stored_bytes": 62416
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:ai-evaluation",
      "stored_bytes": 1596
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:behavior-agent",
      "stored_bytes": 3452
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:catalog-selector",
      "stored_bytes": 1656
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:checker",
      "stored_bytes": 4660
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:classification",
      "stored_bytes": 42076
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:critical-coverage",
      "stored_bytes": 1404
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:debt-agent",
      "stored_bytes": 2520
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:debt-calculator",
      "stored_bytes": 1780
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:decision-engine",
      "stored_bytes": 5100
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:explanation",
      "stored_bytes": 2100
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:financial-calculator",
      "stored_bytes": 15888
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:fx",
      "stored_bytes": 1300
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:pattern-recognition",
      "stored_bytes": 26124
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:pi",
      "stored_bytes": 1640
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:suggestion-generator",
      "stored_bytes": 3940
    },
    {
      "doc_key": "stage:eval_9301c02d-a2d5-4816-8c3e-082398ae1832:weights",
      "stored_bytes": 1784
    },
    {
      "doc_key": "state",
      "stored_bytes": 86216
    }
  ]
}
~~~~

## Summary

~~~~text
Account balances are marked as stale, requiring verification before planning cash allocation or bill fulfillment.
~~~~
