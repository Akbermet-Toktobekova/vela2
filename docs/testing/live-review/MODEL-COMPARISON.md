# Model run comparison

[Four-model primary proposal comparison](gemma-4-31b/PRIMARY-COMPARISON.md) · [Gemma pipeline recap](gemma-4-31b/RECAP.md)

Previous capture 2026-11-08T15-45-05-944Z. Current capture 2026-11-08T16-41-15-473Z.

[Previous Gemini recap](GEMINI-RECAP.md) · [Current recap](RECAP.md) · [Seven-stage logs](SEVEN-STAGES.md)

The profiles, financial reference date and financial policy are the same. Live model responses can vary between runs.

## Debt

### Previous Gemini

```json
{
  "models": [
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash-lite"
  ],
  "decision": "RECOMMENDATION_READY",
  "actionId": "A005",
  "title": "Contact Credit card issuer for hardship payment options",
  "score": null,
  "generatedProposals": 2,
  "generationExplanation": "",
  "checkerVerdicts": [
    {
      "id": "primary-1",
      "status": "NEEDS_DATA",
      "reason": "Advice requires executable financial checks or contains a monetary amount or rate."
    },
    {
      "id": "primary-2",
      "status": "VALID",
      "reason": "The proposal targets an obligation fact with specific timing and income details provided in the context, and checking cash flow timing is a safe review action without financial execution."
    }
  ],
  "fallbacks": []
}
```

[Actual decision](runs/2026-11-08T15-45-05-944Z/debt/beta-review.md) · [Checker](runs/2026-11-08T15-45-05-944Z/debt/checker.md)

**pattern-recognition**

In the scope of currency EUR, obligationId 'utility' occurred on 2026-11-18, which is prior to incomeId 'salary' on 2026-11-25.

**behavior-agent**

The utility obligation occurred on 2026-11-18, seven days before the salary income on 2026-11-25.

**debt-agent**

Debt 1: baseline interest EUR 46.99 over the analysis horizon, APR 24%, next due 2026-11-08, estimated payoff 16.37 months.

### Current run

```json
{
  "models": [
    "gemini-3.5-flash-lite"
  ],
  "decision": "RECOMMENDATION_READY",
  "actionId": "A005",
  "title": "Contact Credit card issuer for hardship payment options",
  "score": null,
  "generatedProposals": 3,
  "generationExplanation": "Account balance is currently lower than upcoming obligations and debt payments, requiring review and clarification of cash flow timing.",
  "checkerVerdicts": [
    {
      "id": "primary-1",
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference."
    },
    {
      "id": "primary-2",
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference."
    },
    {
      "id": "primary-3",
      "status": "NEEDS_DATA",
      "reason": "Missing: Additional accounts, Supplementary income sources"
    }
  ],
  "fallbacks": []
}
```

[Actual decision](runs/2026-11-08T16-41-15-473Z/debt/beta-review.md) · [Checker](runs/2026-11-08T16-41-15-473Z/debt/checker.md)

**pattern-recognition**

An obligation (utility) occurred on 2026-11-18 in EUR, which was before the income (salary) received on 2026-11-25.

**behavior-agent**

An obligation (utility) occurred on 2026-11-18 in EUR, which was before the income (salary) received on 2026-11-25.

**debt-agent**

Debt 1: APR 24%, next due 2026-11-08, baseline interest EUR 46.99 over the analysis horizon, estimated payoff 16.37 months.

## Strong

### Previous Gemini

```json
{
  "models": [
    "gemini-3.1-flash-lite",
    "gemini-3.1-flash-lite-preview",
    "gemini-3.5-flash-lite"
  ],
  "decision": "RECOMMENDATION_READY",
  "actionId": "A012",
  "title": "Contribute EUR 4550 toward \"Education\"",
  "score": 0.58875,
  "generatedProposals": 0,
  "generationExplanation": "No applicable verified claim supports a specific action.",
  "checkerVerdicts": [],
  "fallbacks": []
}
```

[Actual decision](runs/2026-11-08T15-45-05-944Z/strong/beta-review.md) · [Checker](runs/2026-11-08T15-45-05-944Z/strong/checker.md)

**pattern-recognition**

Account service charge fees of -0.11 EUR, -0.11 EUR, and -0.13 EUR were observed on the main account on 2026-10-09, 2026-09-10, and 2026-08-09 respectively. Fees of -9 HUF and -537 HUF were observed on the huf account on 2026-10-07 and 2026-09-10 respectively. The largest observed outflow on the main account was -1100 EUR on 2026-11-01. Inflows of 4200 EUR on 2026-09-16 and 275.4 EUR on 2026-09-10 were observed on the main account. On the huf account, observed transactions include an outflow of -200000 HUF on 2026-09-16, an inflow of 411400 HUF on 2026-09-16, and an outflow of -300000 HUF on 2026-09-16. Unconfirmed: Account service charges appear repeatedly on the main account, but terms of a recurring contract are unconfirmed.

**behavior-agent**

Account service charges are consistently applied to the main account on a monthly basis. Significant inflows and outflows occurred on the HUF account on 2026-09-16, including a 411,400 HUF inflow and combined outflows of 500,000 HUF. Unconfirmed: The recurring nature of account service charges suggests a potential fixed monthly cost, though the specific contract terms are not provided.

**debt-agent**

No debt records are present in this snapshot.

### Current run

```json
{
  "models": [
    "gemini-3.5-flash-lite"
  ],
  "decision": "RECOMMENDATION_READY",
  "actionId": "A012",
  "title": "Contribute EUR 4550 toward \"Education\"",
  "score": 0.58875,
  "generatedProposals": 3,
  "generationExplanation": "",
  "checkerVerdicts": [
    {
      "id": "primary-1",
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference."
    },
    {
      "id": "primary-2",
      "status": "NEEDS_DATA",
      "reason": "Missing: User interest in financial education resources or topics"
    },
    {
      "id": "primary-3",
      "status": "NEEDS_DATA",
      "reason": "Missing: Preferred date and scope for the budget review"
    }
  ],
  "fallbacks": [
    {
      "stage": "classification",
      "reason": "{\"error\":{\"code\":503,\"message\":\"This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.\",\"status\":\"UNAVAILABLE\"}}"
    }
  ]
}
```

[Actual decision](runs/2026-11-08T16-41-15-473Z/strong/beta-review.md) · [Checker](runs/2026-11-08T16-41-15-473Z/strong/checker.md)

**pattern-recognition**

Observed account service charge outflows on the main account in EUR. Observed fee outflows on the huf account in HUF. Observed largest transactions classified as extreme-1 through extreme-18 across main and huf accounts. Unconfirmed: Hypothesized timing relationships between income and obligations for EUR currency scope. Observed repeated activity categories on the main account in EUR. Observed repeated activity categories on the huf account in HUF.

**behavior-agent**

Recorded multiple outflow categories on the main EUR account. Recorded multiple inflow and outflow categories on the HUF account. Recorded recurring fee and service charge outflows across accounts. Identified the largest recorded amounts across accounts under extreme classifications. Unconfirmed: Hypothesized timing intervals between projected income and obligations for EUR currency.

**debt-agent**

No debt records are present in this snapshot.

## Nora

### Previous Gemini

```json
{
  "models": [
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash-lite"
  ],
  "decision": "RECOMMENDATION_READY",
  "actionId": "A014",
  "title": "Review recurring subscription before cancellation",
  "score": null,
  "generatedProposals": 0,
  "generationExplanation": "No applicable verified claim supports a specific action.",
  "checkerVerdicts": [],
  "fallbacks": [
    {
      "stage": "assistant-context",
      "reason": "[\n  {\n    \"code\": \"too_big\",\n    \"maximum\": 12,\n    \"type\": \"array\",\n    \"inclusive\": true,\n    \"exact\": false,\n    \"message\": \"Array must contain at most 12 element(s)\",\n    \"path\": [\n      \"factIds\"\n    ]\n  }\n]"
    }
  ]
}
```

[Actual decision](runs/2026-11-08T15-45-05-944Z/nora/beta-review.md) · [Checker](runs/2026-11-08T15-45-05-944Z/nora/checker.md)

**pattern-recognition**

Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.

**behavior-agent**

The account exhibits consistent monthly recurring inflows from 'danube studio' and recurring outflows to various service providers and vendors. Multiple recurring obligations, including rent, energy, and internet, are settled prior to the receipt of the monthly salary inflow.

**debt-agent**

Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.

### Current run

```json
{
  "models": [
    "gemini-3.5-flash-lite"
  ],
  "decision": "RECOMMENDATION_READY",
  "actionId": "A014",
  "title": "Review recurring subscription before cancellation",
  "score": null,
  "generatedProposals": 3,
  "generationExplanation": "",
  "checkerVerdicts": [
    {
      "id": "primary-1",
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference."
    },
    {
      "id": "primary-2",
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference."
    },
    {
      "id": "primary-3",
      "status": "REJECTED",
      "reason": "Unverified or unknown AS reference."
    }
  ],
  "fallbacks": [
    {
      "stage": "assistant-context",
      "reason": "{\"error\":{\"code\":503,\"message\":\"This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.\",\"status\":\"UNAVAILABLE\"}}"
    }
  ]
}
```

[Actual decision](runs/2026-11-08T16-41-15-473Z/nora/beta-review.md) · [Checker](runs/2026-11-08T16-41-15-473Z/nora/checker.md)

**pattern-recognition**

Pattern Recognition observed 12 groups with movements on multiple dates and 0 comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.

**behavior-agent**

The records show recurring outflows of 980 EUR to harbor properties and recurring inflows of 2350 EUR from danube studio across August, September, and October 2026. The stated goal is to maintain an emergency cushion of 3000 EUR by June 30, 2027.

**debt-agent**

Debt 1: APR 21.9%, next due 2026-11-15, baseline interest unavailable, payoff horizon unavailable. Missing: interestAccruing.
