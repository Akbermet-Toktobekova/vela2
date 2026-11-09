# 02 Strong · fx

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload → engine.fx when a rate is cached. Draft PostgreSQL analysis.financial_snapshots references the rate used. | — |

## Input

~~~~json
{
  "baseCurrency": "EUR",
  "foreign": [
    "HUF"
  ],
  "asOf": "2026-11-05T12:00:00.000Z"
}
~~~~

## Output

~~~~json
{
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
~~~~
