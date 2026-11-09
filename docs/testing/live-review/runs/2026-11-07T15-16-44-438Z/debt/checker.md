# 01 Debt · checker

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | Full beta beta_documents.payload → engine.traces[evaluationId].trace.primarySuggestions and validatedCandidates. Draft PostgreSQL analysis.candidate_checks. | — |

| Draft | Verdict | Reason | AS claims |
| --- | --- | --- | --- |
| primary-1 · Review upcoming credit card minimum payment and statement | REJECTED | Unverified or unknown AS reference. | None |
| primary-2 · Check upcoming energy obligation due date | REJECTED | Unverified or unknown AS reference. | None |

## Input

~~~~json
{
  "draft": {
    "data": {
      "proposals": [
        {
          "title": "Review upcoming credit card minimum payment and statement",
          "description": "Examine the credit card statement details, APR, and due date for your upcoming debt obligation.",
          "rationale": "Checking your statement and APR helps you understand your current credit card obligations and terms.",
          "actionId": "A004",
          "factIds": [
            "debt-1"
          ],
          "claimIds": []
        },
        {
          "title": "Check upcoming energy obligation due date",
          "description": "Verify the details of your upcoming energy bill and scheduled due date to ensure timely payment preparation.",
          "rationale": "Reviewing upcoming bills helps maintain awareness of your pending monthly commitments.",
          "actionId": null,
          "factIds": [
            "obligation-1"
          ],
          "claimIds": []
        }
      ]
    },
    "provider": "gemini",
    "modelUsed": "gemini-3.5-flash-lite",
    "liveCallUsed": true
  },
  "candidates": [],
  "snapshotId": "snap_beta_de7948b2-bc74-4adc-a179-aa9039f7b32f_v2_373f467295431927"
}
~~~~

## Output

~~~~json
{
  "allResults": [
    {
      "candidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer for hardship payment options",
        "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
        "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 20,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [
          "C017",
          "C018"
        ],
        "supportingSourceIds": [
          "S004"
        ],
        "requiredPiInputs": [
          "issuer_contact",
          "minimum_due",
          "affordable_payment"
        ],
        "origin": "CRITICAL_COVERAGE"
      },
      "status": "VALID",
      "isCritical": true,
      "criticalPriorityRank": 1,
      "resolvesCriticalProblemDirectly": true,
      "failedChecks": [],
      "missingFields": [],
      "inputEvidence": [
        {
          "field": "issuer_contact",
          "status": "VERIFIED"
        },
        {
          "field": "minimum_due",
          "status": "VERIFIED"
        },
        {
          "field": "affordable_payment",
          "status": "VERIFIED"
        }
      ],
      "projectedMinCashAfterAction": -110,
      "unlocksActionIds": []
    },
    {
      "candidate": {
        "candidateId": "crit_A020_deficit",
        "actionId": "A020",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review projected EUR 45 cash shortfall before 2026-11-08",
        "description": "Projected cash drops below required obligations by 2026-11-08 (Credit card minimum). Review upcoming bills and available balances.",
        "rationale": "Diagnostic alert (F004, F019, R009): flags upcoming payment shortfall for user verification without assuming automatic resolution.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 45,
        "currency": "EUR",
        "proposedTiming": "2026-11-08",
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
      "projectedMinCashAfterAction": -110,
      "unlocksActionIds": [
        "A001",
        "A005",
        "A011"
      ]
    }
  ],
  "validFinancialCandidates": [],
  "validCriticalCandidates": [
    {
      "candidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer for hardship payment options",
        "description": "Required minimum of EUR 65 is due on 2026-11-08, but available liquid funds are insufficient.",
        "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 20,
        "currency": "EUR",
        "proposedTiming": "2026-11-05",
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [
          "C017",
          "C018"
        ],
        "supportingSourceIds": [
          "S004"
        ],
        "requiredPiInputs": [
          "issuer_contact",
          "minimum_due",
          "affordable_payment"
        ],
        "origin": "CRITICAL_COVERAGE"
      },
      "status": "VALID",
      "isCritical": true,
      "criticalPriorityRank": 1,
      "resolvesCriticalProblemDirectly": true,
      "failedChecks": [],
      "missingFields": [],
      "inputEvidence": [
        {
          "field": "issuer_contact",
          "status": "VERIFIED"
        },
        {
          "field": "minimum_due",
          "status": "VERIFIED"
        },
        {
          "field": "affordable_payment",
          "status": "VERIFIED"
        }
      ],
      "projectedMinCashAfterAction": -110,
      "unlocksActionIds": []
    },
    {
      "candidate": {
        "candidateId": "crit_A020_deficit",
        "actionId": "A020",
        "actionType": "VERIFICATION_ACTION",
        "title": "Review projected EUR 45 cash shortfall before 2026-11-08",
        "description": "Projected cash drops below required obligations by 2026-11-08 (Credit card minimum). Review upcoming bills and available balances.",
        "rationale": "Diagnostic alert (F004, F019, R009): flags upcoming payment shortfall for user verification without assuming automatic resolution.",
        "targetId": "card",
        "sourceAccountId": null,
        "destinationAccountId": null,
        "amount": 45,
        "currency": "EUR",
        "proposedTiming": "2026-11-08",
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
      "projectedMinCashAfterAction": -110,
      "unlocksActionIds": [
        "A001",
        "A005",
        "A011"
      ]
    }
  ],
  "validVerificationCandidates": [],
  "rejectedCandidates": [],
  "needsDataCandidates": [],
  "missingFieldsUnion": [],
  "criticalCoverageAddedIds": [
    "A005",
    "A020"
  ],
  "fallbackTriggered": false,
  "proposals": [
    {
      "title": "Review upcoming credit card minimum payment and statement",
      "description": "Examine the credit card statement details, APR, and due date for your upcoming debt obligation.",
      "rationale": "Checking your statement and APR helps you understand your current credit card obligations and terms.",
      "actionId": "A004",
      "factIds": [
        "debt-1"
      ],
      "claimIds": [],
      "id": "primary-1",
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference.",
      "evidence": [],
      "candidateId": null
    },
    {
      "title": "Check upcoming energy obligation due date",
      "description": "Verify the details of your upcoming energy bill and scheduled due date to ensure timely payment preparation.",
      "rationale": "Reviewing upcoming bills helps maintain awareness of your pending monthly commitments.",
      "actionId": null,
      "factIds": [
        "obligation-1"
      ],
      "claimIds": [],
      "id": "primary-2",
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference.",
      "evidence": [],
      "candidateId": null
    }
  ],
  "fallbackReason": "NO_VALID_PRIMARY"
}
~~~~
