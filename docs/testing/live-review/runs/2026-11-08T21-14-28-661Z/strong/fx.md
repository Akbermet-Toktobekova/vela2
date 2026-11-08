# 02 Strong · fx

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload / stage:eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:fx / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T21:14:42.373Z

Consumers: Shared Financial Calculator and Checker

Upstream artifact IDs: eval_95f9ffdb-78a6-4e77-9203-6de620e442a7:pi

Missing inputs: None flagged

## Input

~~~~json
{
  "foreignSymbols": [
    "HUF"
  ],
  "date": "2026-11-05T12:00:00.000Z",
  "baseCurrency": "EUR"
}
~~~~

## Output

~~~~json
{
  "HUF": {
    "base": "EUR",
    "target": "HUF",
    "rate": 0,
    "rateDate": "2026-11-05",
    "fetchedAt": "2026-11-08T21:14:42.372Z",
    "status": "UNAVAILABLE",
    "source": "frankfurter_unavailable"
  }
}
~~~~
