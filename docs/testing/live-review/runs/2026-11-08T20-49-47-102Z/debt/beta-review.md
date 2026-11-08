# 01 Debt · beta review

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | SQLite beta_documents.payload / analysis, engine.traces and engine.recommendations. | — |

Actual Today output: **Contact Credit card issuer for hardship payment options**.

## Input

~~~~json
{
  "request": "POST /api/beta/review",
  "body": {
    "forceRefresh": true
  },
  "version": 2
}
~~~~

## Output

~~~~json
{
  "jobId": "1da10b46-d1a8-45ea-8479-f712b397b0dc",
  "decision": {
    "evaluationId": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c",
    "snapshotId": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
    "snapshotVersion": "2.0",
    "decisionStatus": "RECOMMENDATION_READY",
    "priorityClass": "CRITICAL",
    "selectedActionId": "A005",
    "selectedActionType": "FINANCIAL_ACTION",
    "candidate": {
      "candidateId": "crit_A005_card",
      "actionId": "A005",
      "actionType": "FINANCIAL_ACTION",
      "title": "Contact Credit card issuer for hardship payment options",
      "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
      "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
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
    "title": "Contact Credit card issuer for hardship payment options",
    "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
    "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
    "expectedEffectSummary": "Addresses imminent payment or cash-flow shortfall directly (A005).",
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
      "S004"
    ],
    "ruleIds": [
      "R008"
    ],
    "claimIds": [
      "C017",
      "C018"
    ],
    "dataQualityStatus": "PROTOTYPE_POLICY",
    "clarificationQuestion": null,
    "missingFields": [],
    "trace": {
      "evaluationId": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c",
      "userId": "4f341b13-fa90-441d-8a09-5a4309f678c6",
      "snapshotId": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T20:50:37.832Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "CRITICAL",
      "weightSelection": {
        "profileId": "liquidity_protection",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.5,
          "F": 0.35,
          "G": 0.15
        },
        "triggerReason": "Liquid expense coverage M = 0.02 months is below entry threshold 1.00 months.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "crit_A005_card",
            "actionId": "A005",
            "actionType": "FINANCIAL_ACTION",
            "title": "Contact Credit card issuer for hardship payment options",
            "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
            "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
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
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer for hardship payment options",
        "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
        "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
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
      "stageArtifactIds": [
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pi",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:fx",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:classification",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pattern-recognition",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:behavior-agent",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:financial-calculator",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-calculator",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-agent",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:suggestion-generator",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:catalog-selector",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:checker",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:critical-coverage",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:ai-evaluation",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:weights",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:decision-engine",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:explanation"
      ],
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review the upcoming debt payment and available cash balance",
            "description": "Examine the minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}} for debt-1 against the accessible daily spending balance of {{account-1.personalAccessibleBalance}} {{account-1.currency}}.",
            "rationale": "Reviewing the cash balance against the imminent due date helps identify the projected shortfall of {{riskContext.paymentRisks.0.projectedShortfall}} {{riskContext.paymentRisks.0.currency}} for debt-1.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1",
              "account-1"
            ],
            "claimIds": [
              "C013"
            ],
            "status": "NEEDS_DATA",
            "reason": "Use a reference to the exact PI field for a date, amount or rate.",
            "evidence": [
              {
                "claimId": "C013",
                "sourceId": "S002",
                "text": "CFPB guidance says US credit-card minimum payments must be made by the due date to avoid late-payment consequences, subject to contract terms.",
                "jurisdiction": "US",
                "population": "Credit card users",
                "limitations": "Card-specific agreement controls"
              }
            ]
          },
          {
            "id": "primary-2",
            "title": "Review the energy obligation timing and income schedule",
            "description": "Verify the obligation amount of 65 EUR due on 2026-11-18 against the upcoming salary income date of 2026-11-25.",
            "rationale": "The utility obligation date occurs before the salary income date, creating a timing mismatch.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "USEFUL",
            "usefulnessReason": "Resolves an open question: Available funding by the due date for obligation-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "income-1"
            ],
            "claimIds": [
              "C004",
              "C010"
            ],
            "status": "VALID",
            "reason": "The review step examines the energy obligation due on 2026-11-18 relative to the salary income date of 2026-11-25. This is consistent with the supplied pattern findings and supported generally by cash-flow and timing considerations in C004 and C010.",
            "evidence": [
              {
                "claimId": "C004",
                "sourceId": "S001",
                "text": "Cash flow includes the timing of income and expenses; mismatched timing can create temporary shortages.",
                "jurisdiction": "US",
                "population": "Consumers",
                "limitations": "Guidance, not causal experiment"
              },
              {
                "claimId": "C010",
                "sourceId": "S007",
                "text": "Annual income totals can obscure month-to-month volatility and timing mismatches that cause financial challenges.",
                "jurisdiction": "US",
                "population": "US adults in SHED 2025",
                "limitations": "Survey self-report; population US adults"
              }
            ]
          },
          {
            "id": "primary-3",
            "title": "Available funding by the due date for debt-1",
            "description": "What funds can you confirm are available before the payment due on 2026-11-08?",
            "rationale": "Clarification is needed to address the projected shortfall before the upcoming due date.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Available funding by the due date for debt-1"
            ],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Available funding by the due date for debt-1",
            "evidence": []
          }
        ],
        "shortfallReason": "Immediate liquid balance is insufficient to cover the upcoming payments due before the next income date.",
        "fallbackReason": null,
        "criticalCoverageAddedIds": [
          "A005",
          "A020"
        ]
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
      "supportingSourceIds": [
        "S004"
      ],
      "supportingRuleIds": [
        "R008"
      ],
      "supportingClaimIds": [
        "C017",
        "C018"
      ],
      "missingDataFields": [],
      "clarificationQuestion": null
    }
  },
  "todayCard": {
    "id": "rec_A005_eval_5c67c9bc-b040-4453-acaa-b27ee228047c",
    "userId": "4f341b13-fa90-441d-8a09-5a4309f678c6",
    "snapshotId": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
    "actionType": "confirm_upcoming_bill",
    "title": "Contact Credit card issuer for hardship payment options",
    "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
    "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
    "suggestedAmount": 20,
    "adjustedAmount": null,
    "currency": "EUR",
    "targetGoalId": "card",
    "sourceAccountId": null,
    "priority": "priority",
    "status": "proposed",
    "readinessState": "state_a_action_ready",
    "createdAt": "2026-11-08T20:50:37.851Z",
    "updatedAt": "2026-11-08T20:50:37.851Z"
  },
  "trace": {
    "trace": {
      "stageArtifactIds": [
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pi",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:fx",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:classification",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pattern-recognition",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:behavior-agent",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:financial-calculator",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-calculator",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-agent",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:suggestion-generator",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:catalog-selector",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:checker",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:critical-coverage",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:ai-evaluation",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:weights",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:decision-engine",
        "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:explanation"
      ],
      "evaluationId": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c",
      "userId": "4f341b13-fa90-441d-8a09-5a4309f678c6",
      "snapshotId": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "snapshotVersion": "2.0",
      "createdAt": "2026-11-08T20:50:37.832Z",
      "runtimeMode": "PROTOTYPE_MODE",
      "policyBundleVersion": "prototype_policy_bundle_v1.4",
      "priorityClass": "CRITICAL",
      "weightSelection": {
        "profileId": "liquidity_protection",
        "previousProfileId": null,
        "hysteresisApplied": false,
        "weights": {
          "R": 0.5,
          "F": 0.35,
          "G": 0.15
        },
        "triggerReason": "Liquid expense coverage M = 0.02 months is below entry threshold 1.00 months.",
        "policyVersion": "weight_policy_v1_prototype"
      },
      "validatedCandidates": [
        {
          "candidate": {
            "candidateId": "crit_A005_card",
            "actionId": "A005",
            "actionType": "FINANCIAL_ACTION",
            "title": "Contact Credit card issuer for hardship payment options",
            "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
            "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
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
      "scoredCandidates": [],
      "robustness": null,
      "selectedCandidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer for hardship payment options",
        "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
        "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
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
      "primarySuggestions": {
        "proposals": [
          {
            "id": "primary-1",
            "title": "Review the upcoming debt payment and available cash balance",
            "description": "Examine the minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}} for debt-1 against the accessible daily spending balance of {{account-1.personalAccessibleBalance}} {{account-1.currency}}.",
            "rationale": "Reviewing the cash balance against the imminent due date helps identify the projected shortfall of {{riskContext.paymentRisks.0.projectedShortfall}} {{riskContext.paymentRisks.0.currency}} for debt-1.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "debt-1",
              "account-1"
            ],
            "claimIds": [
              "C013"
            ],
            "status": "NEEDS_DATA",
            "reason": "Use a reference to the exact PI field for a date, amount or rate.",
            "evidence": [
              {
                "claimId": "C013",
                "sourceId": "S002",
                "text": "CFPB guidance says US credit-card minimum payments must be made by the due date to avoid late-payment consequences, subject to contract terms.",
                "jurisdiction": "US",
                "population": "Credit card users",
                "limitations": "Card-specific agreement controls"
              }
            ]
          },
          {
            "id": "primary-2",
            "title": "Review the energy obligation timing and income schedule",
            "description": "Verify the obligation amount of 65 EUR due on 2026-11-18 against the upcoming salary income date of 2026-11-25.",
            "rationale": "The utility obligation date occurs before the salary income date, creating a timing mismatch.",
            "actionId": null,
            "intent": "REVIEW",
            "origin": "MODEL",
            "targetFactId": "obligation-1",
            "usefulness": "USEFUL",
            "usefulnessReason": "Resolves an open question: Available funding by the due date for obligation-1",
            "prerequisites": [],
            "missingInfo": [],
            "factIds": [
              "obligation-1",
              "income-1"
            ],
            "claimIds": [
              "C004",
              "C010"
            ],
            "status": "VALID",
            "reason": "The review step examines the energy obligation due on 2026-11-18 relative to the salary income date of 2026-11-25. This is consistent with the supplied pattern findings and supported generally by cash-flow and timing considerations in C004 and C010.",
            "evidence": [
              {
                "claimId": "C004",
                "sourceId": "S001",
                "text": "Cash flow includes the timing of income and expenses; mismatched timing can create temporary shortages.",
                "jurisdiction": "US",
                "population": "Consumers",
                "limitations": "Guidance, not causal experiment"
              },
              {
                "claimId": "C010",
                "sourceId": "S007",
                "text": "Annual income totals can obscure month-to-month volatility and timing mismatches that cause financial challenges.",
                "jurisdiction": "US",
                "population": "US adults in SHED 2025",
                "limitations": "Survey self-report; population US adults"
              }
            ]
          },
          {
            "id": "primary-3",
            "title": "Available funding by the due date for debt-1",
            "description": "What funds can you confirm are available before the payment due on 2026-11-08?",
            "rationale": "Clarification is needed to address the projected shortfall before the upcoming due date.",
            "actionId": null,
            "intent": "CLARIFY",
            "origin": "MODEL",
            "targetFactId": "debt-1",
            "usefulness": "NOT_ELIGIBLE",
            "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
            "prerequisites": [],
            "missingInfo": [
              "Available funding by the due date for debt-1"
            ],
            "factIds": [
              "debt-1"
            ],
            "claimIds": [],
            "status": "NEEDS_DATA",
            "reason": "Missing: Available funding by the due date for debt-1",
            "evidence": []
          }
        ],
        "shortfallReason": "Immediate liquid balance is insufficient to cover the upcoming payments due before the next income date.",
        "fallbackReason": null,
        "criticalCoverageAddedIds": [
          "A005",
          "A020"
        ]
      },
      "selectedActionType": "FINANCIAL_ACTION",
      "decisionStatus": "RECOMMENDATION_READY",
      "decisionReason": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
      "supportingSourceIds": [
        "S004"
      ],
      "supportingRuleIds": [
        "R008"
      ],
      "supportingClaimIds": [
        "C017",
        "C018"
      ],
      "missingDataFields": [],
      "clarificationQuestion": null
    },
    "decision": {
      "evaluationId": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c",
      "snapshotId": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
      "snapshotVersion": "2.0",
      "decisionStatus": "RECOMMENDATION_READY",
      "priorityClass": "CRITICAL",
      "selectedActionId": "A005",
      "selectedActionType": "FINANCIAL_ACTION",
      "candidate": {
        "candidateId": "crit_A005_card",
        "actionId": "A005",
        "actionType": "FINANCIAL_ACTION",
        "title": "Contact Credit card issuer for hardship payment options",
        "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
        "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
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
      "title": "Contact Credit card issuer for hardship payment options",
      "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
      "reasoning": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met. Selected under weight profile \"liquidity_protection\". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]",
      "expectedEffectSummary": "Addresses imminent payment or cash-flow shortfall directly (A005).",
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
        "S004"
      ],
      "ruleIds": [
        "R008"
      ],
      "claimIds": [
        "C017",
        "C018"
      ],
      "dataQualityStatus": "PROTOTYPE_POLICY",
      "clarificationQuestion": null,
      "missingFields": [],
      "trace": {
        "evaluationId": "eval_5c67c9bc-b040-4453-acaa-b27ee228047c",
        "userId": "4f341b13-fa90-441d-8a09-5a4309f678c6",
        "snapshotId": "snap_beta_4f341b13-fa90-441d-8a09-5a4309f678c6_v2_bc3e632ab39cbe81",
        "snapshotVersion": "2.0",
        "createdAt": "2026-11-08T20:50:37.832Z",
        "runtimeMode": "PROTOTYPE_MODE",
        "policyBundleVersion": "prototype_policy_bundle_v1.4",
        "priorityClass": "CRITICAL",
        "weightSelection": {
          "profileId": "liquidity_protection",
          "previousProfileId": null,
          "hysteresisApplied": false,
          "weights": {
            "R": 0.5,
            "F": 0.35,
            "G": 0.15
          },
          "triggerReason": "Liquid expense coverage M = 0.02 months is below entry threshold 1.00 months.",
          "policyVersion": "weight_policy_v1_prototype"
        },
        "validatedCandidates": [
          {
            "candidate": {
              "candidateId": "crit_A005_card",
              "actionId": "A005",
              "actionType": "FINANCIAL_ACTION",
              "title": "Contact Credit card issuer for hardship payment options",
              "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
              "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
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
        "scoredCandidates": [],
        "robustness": null,
        "selectedCandidate": {
          "candidateId": "crit_A005_card",
          "actionId": "A005",
          "actionType": "FINANCIAL_ACTION",
          "title": "Contact Credit card issuer for hardship payment options",
          "description": "Required minimum of EUR 65 is due on 2026-11-08. The dated cash projection shows a EUR 45 shortfall.",
          "rationale": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
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
        "stageArtifactIds": [
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pi",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:fx",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:classification",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pattern-recognition",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:behavior-agent",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:financial-calculator",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-calculator",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-agent",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:suggestion-generator",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:catalog-selector",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:checker",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:critical-coverage",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:ai-evaluation",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:weights",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:decision-engine",
          "eval_5c67c9bc-b040-4453-acaa-b27ee228047c:explanation"
        ],
        "primarySuggestions": {
          "proposals": [
            {
              "id": "primary-1",
              "title": "Review the upcoming debt payment and available cash balance",
              "description": "Examine the minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}} for debt-1 against the accessible daily spending balance of {{account-1.personalAccessibleBalance}} {{account-1.currency}}.",
              "rationale": "Reviewing the cash balance against the imminent due date helps identify the projected shortfall of {{riskContext.paymentRisks.0.projectedShortfall}} {{riskContext.paymentRisks.0.currency}} for debt-1.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "debt-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "debt-1",
                "account-1"
              ],
              "claimIds": [
                "C013"
              ],
              "status": "NEEDS_DATA",
              "reason": "Use a reference to the exact PI field for a date, amount or rate.",
              "evidence": [
                {
                  "claimId": "C013",
                  "sourceId": "S002",
                  "text": "CFPB guidance says US credit-card minimum payments must be made by the due date to avoid late-payment consequences, subject to contract terms.",
                  "jurisdiction": "US",
                  "population": "Credit card users",
                  "limitations": "Card-specific agreement controls"
                }
              ]
            },
            {
              "id": "primary-2",
              "title": "Review the energy obligation timing and income schedule",
              "description": "Verify the obligation amount of 65 EUR due on 2026-11-18 against the upcoming salary income date of 2026-11-25.",
              "rationale": "The utility obligation date occurs before the salary income date, creating a timing mismatch.",
              "actionId": null,
              "intent": "REVIEW",
              "origin": "MODEL",
              "targetFactId": "obligation-1",
              "usefulness": "USEFUL",
              "usefulnessReason": "Resolves an open question: Available funding by the due date for obligation-1",
              "prerequisites": [],
              "missingInfo": [],
              "factIds": [
                "obligation-1",
                "income-1"
              ],
              "claimIds": [
                "C004",
                "C010"
              ],
              "status": "VALID",
              "reason": "The review step examines the energy obligation due on 2026-11-18 relative to the salary income date of 2026-11-25. This is consistent with the supplied pattern findings and supported generally by cash-flow and timing considerations in C004 and C010.",
              "evidence": [
                {
                  "claimId": "C004",
                  "sourceId": "S001",
                  "text": "Cash flow includes the timing of income and expenses; mismatched timing can create temporary shortages.",
                  "jurisdiction": "US",
                  "population": "Consumers",
                  "limitations": "Guidance, not causal experiment"
                },
                {
                  "claimId": "C010",
                  "sourceId": "S007",
                  "text": "Annual income totals can obscure month-to-month volatility and timing mismatches that cause financial challenges.",
                  "jurisdiction": "US",
                  "population": "US adults in SHED 2025",
                  "limitations": "Survey self-report; population US adults"
                }
              ]
            },
            {
              "id": "primary-3",
              "title": "Available funding by the due date for debt-1",
              "description": "What funds can you confirm are available before the payment due on 2026-11-08?",
              "rationale": "Clarification is needed to address the projected shortfall before the upcoming due date.",
              "actionId": null,
              "intent": "CLARIFY",
              "origin": "MODEL",
              "targetFactId": "debt-1",
              "usefulness": "NOT_ELIGIBLE",
              "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
              "prerequisites": [],
              "missingInfo": [
                "Available funding by the due date for debt-1"
              ],
              "factIds": [
                "debt-1"
              ],
              "claimIds": [],
              "status": "NEEDS_DATA",
              "reason": "Missing: Available funding by the due date for debt-1",
              "evidence": []
            }
          ],
          "shortfallReason": "Immediate liquid balance is insufficient to cover the upcoming payments due before the next income date.",
          "fallbackReason": null,
          "criticalCoverageAddedIds": [
            "A005",
            "A020"
          ]
        },
        "selectedActionType": "FINANCIAL_ACTION",
        "decisionStatus": "RECOMMENDATION_READY",
        "decisionReason": "CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met.",
        "supportingSourceIds": [
          "S004"
        ],
        "supportingRuleIds": [
          "R008"
        ],
        "supportingClaimIds": [
          "C017",
          "C018"
        ],
        "missingDataFields": [],
        "clarificationQuestion": null
      }
    }
  },
  "primaryProposals": [
    {
      "id": "primary-1",
      "title": "Review the upcoming debt payment and available cash balance",
      "description": "Examine the minimum payment of {{debt-1.minimum}} {{debt-1.currency}} due on {{debt-1.nextDueDate}} for debt-1 against the accessible daily spending balance of {{account-1.personalAccessibleBalance}} {{account-1.currency}}.",
      "rationale": "Reviewing the cash balance against the imminent due date helps identify the projected shortfall of {{riskContext.paymentRisks.0.projectedShortfall}} {{riskContext.paymentRisks.0.currency}} for debt-1.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "debt-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "debt-1",
        "account-1"
      ],
      "claimIds": [
        "C013"
      ],
      "status": "NEEDS_DATA",
      "reason": "Use a reference to the exact PI field for a date, amount or rate.",
      "evidence": [
        {
          "claimId": "C013",
          "sourceId": "S002",
          "text": "CFPB guidance says US credit-card minimum payments must be made by the due date to avoid late-payment consequences, subject to contract terms.",
          "jurisdiction": "US",
          "population": "Credit card users",
          "limitations": "Card-specific agreement controls"
        }
      ],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-2",
      "title": "Review the energy obligation timing and income schedule",
      "description": "Verify the obligation amount of 65 EUR due on 2026-11-18 against the upcoming salary income date of 2026-11-25.",
      "rationale": "The utility obligation date occurs before the salary income date, creating a timing mismatch.",
      "actionId": null,
      "intent": "REVIEW",
      "origin": "MODEL",
      "targetFactId": "obligation-1",
      "usefulness": "USEFUL",
      "usefulnessReason": "Resolves an open question: Available funding by the due date for obligation-1",
      "prerequisites": [],
      "missingInfo": [],
      "factIds": [
        "obligation-1",
        "income-1"
      ],
      "claimIds": [
        "C004",
        "C010"
      ],
      "status": "VALID",
      "reason": "The review step examines the energy obligation due on 2026-11-18 relative to the salary income date of 2026-11-25. This is consistent with the supplied pattern findings and supported generally by cash-flow and timing considerations in C004 and C010.",
      "evidence": [
        {
          "claimId": "C004",
          "sourceId": "S001",
          "text": "Cash flow includes the timing of income and expenses; mismatched timing can create temporary shortages.",
          "jurisdiction": "US",
          "population": "Consumers",
          "limitations": "Guidance, not causal experiment"
        },
        {
          "claimId": "C010",
          "sourceId": "S007",
          "text": "Annual income totals can obscure month-to-month volatility and timing mismatches that cause financial challenges.",
          "jurisdiction": "US",
          "population": "US adults in SHED 2025",
          "limitations": "Survey self-report; population US adults"
        }
      ],
      "score": null,
      "selected": false
    },
    {
      "id": "primary-3",
      "title": "Available funding by the due date for debt-1",
      "description": "What funds can you confirm are available before the payment due on 2026-11-08?",
      "rationale": "Clarification is needed to address the projected shortfall before the upcoming due date.",
      "actionId": null,
      "intent": "CLARIFY",
      "origin": "MODEL",
      "targetFactId": "debt-1",
      "usefulness": "NOT_ELIGIBLE",
      "usefulnessReason": "The proposal has not passed the safety and evidence checks.",
      "prerequisites": [],
      "missingInfo": [
        "Available funding by the due date for debt-1"
      ],
      "factIds": [
        "debt-1"
      ],
      "claimIds": [],
      "status": "NEEDS_DATA",
      "reason": "Missing: Available funding by the due date for debt-1",
      "evidence": [],
      "score": null,
      "selected": false
    }
  ],
  "storageRows": [
    {
      "doc_key": "analysis",
      "stored_bytes": 35564
    },
    {
      "doc_key": "chat",
      "stored_bytes": 1024
    },
    {
      "doc_key": "chat-memory",
      "stored_bytes": 872
    },
    {
      "doc_key": "chat-request:debt-context",
      "stored_bytes": 2140
    },
    {
      "doc_key": "engine",
      "stored_bytes": 79492
    },
    {
      "doc_key": "job-request:7579f865154b1a2da2c6d4dc01a29f7bf6d1c7af79d8b60d7fc676d32dde528f",
      "stored_bytes": 96
    },
    {
      "doc_key": "job:1da10b46-d1a8-45ea-8479-f712b397b0dc",
      "stored_bytes": 36004
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:ai-evaluation",
      "stored_bytes": 7284
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:behavior-agent",
      "stored_bytes": 3044
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:catalog-selector",
      "stored_bytes": 1656
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:checker",
      "stored_bytes": 14540
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:classification",
      "stored_bytes": 1924
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:critical-coverage",
      "stored_bytes": 3396
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-agent",
      "stored_bytes": 2484
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:debt-calculator",
      "stored_bytes": 1724
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:decision-engine",
      "stored_bytes": 9588
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:explanation",
      "stored_bytes": 2456
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:financial-calculator",
      "stored_bytes": 17172
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:fx",
      "stored_bytes": 1304
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pattern-recognition",
      "stored_bytes": 3660
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:pi",
      "stored_bytes": 1612
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:suggestion-generator",
      "stored_bytes": 4876
    },
    {
      "doc_key": "stage:eval_5c67c9bc-b040-4453-acaa-b27ee228047c:weights",
      "stored_bytes": 1732
    },
    {
      "doc_key": "state",
      "stored_bytes": 4840
    }
  ]
}
~~~~

## Summary

~~~~text
CFPB guidance (S004, R008) recommends contacting the card issuer when a required minimum payment cannot be met. Selected under weight profile "liquidity_protection". [Policy: prototype_policy_bundle_v1.4 (PROTOTYPE_ONLY); Rules: R008; Sources: S004]
~~~~
