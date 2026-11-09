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
    "allResults": [],
    "validFinancialCandidates": [],
    "validCriticalCandidates": [],
    "validVerificationCandidates": [],
    "rejectedCandidates": [],
    "needsDataCandidates": [],
    "missingFieldsUnion": [],
    "criticalCoverageAddedIds": [],
    "fallbackTriggered": false
  },
  "fallbackReason": null
}
~~~~

## Output

~~~~json
{
  "evaluationId": "eval_4c70b47b-c2aa-4692-b35b-ea2a3ba4646a",
  "snapshotId": "snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
  "snapshotVersion": "4.0",
  "decisionStatus": "NO_RECOMMENDATION",
  "priorityClass": "NONE",
  "selectedActionId": null,
  "selectedActionType": null,
  "candidate": null,
  "title": "No proactive action needed today",
  "description": "No candidate action passed safety, eligibility, and cash-flow affordability gates for this snapshot.",
  "reasoning": "No candidate action passed safety, eligibility, and cash-flow affordability gates for this snapshot.",
  "expectedEffectSummary": "Current obligations and liquidity buffers do not support a safe change today.",
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
    "evaluationId": "eval_4c70b47b-c2aa-4692-b35b-ea2a3ba4646a",
    "userId": "9cf0e99b-d6d4-4f08-83bf-b25403108210",
    "snapshotId": "snap_beta_9cf0e99b-d6d4-4f08-83bf-b25403108210_v4_b892896fd60f4d4f",
    "snapshotVersion": "4.0",
    "createdAt": "2026-11-08T20:10:26.462Z",
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
    "validatedCandidates": [],
    "scoredCandidates": [],
    "robustness": null,
    "selectedCandidate": null,
    "selectedActionType": null,
    "decisionStatus": "NO_RECOMMENDATION",
    "decisionReason": "No candidate action passed safety, eligibility, and cash-flow affordability gates for this snapshot.",
    "supportingSourceIds": [],
    "supportingRuleIds": [],
    "supportingClaimIds": [],
    "missingDataFields": [],
    "clarificationQuestion": null
  }
}
~~~~
