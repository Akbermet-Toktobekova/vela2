# 02 Strong · debt agent

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | Isolated result. Full beta saves engine.agents.DebtAgent.output.summaryText in beta_documents.payload. Draft PostgreSQL pi.debts → analysis.debt_analyses and proposed analysis.debt_summaries.summary_text. | — |

## Input

~~~~json
{
  "baseCurrency": "EUR",
  "debts": [],
  "extras": {
    "referenceDateIso": "2026-11-05",
    "fxRates": {
      "HUF": {
        "base": "EUR",
        "target": "HUF",
        "rate": 363.9,
        "rateDate": "2026-11-06",
        "fetchedAt": "2026-11-05T12:00:00.000Z",
        "status": "OK",
        "source": "https://api.frankfurter.dev/v1/latest"
      }
    }
  }
}
~~~~

## Output

~~~~json
{
  "debtsAnalyzed": [],
  "highestPriorityDebtId": null,
  "summaryText": "No active debt records reported in the current financial snapshot."
}
~~~~

## Summary

~~~~text
No active debt records reported in the current financial snapshot.
~~~~
