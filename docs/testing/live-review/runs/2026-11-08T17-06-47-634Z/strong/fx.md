# 02 Strong · fx

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload / stage:eval_fd532315-85a6-4bc1-a4da-229f74121549:fx / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T17:14:29.033Z

Consumers: Shared Financial Calculator and Checker

Upstream artifact IDs: eval_fd532315-85a6-4bc1-a4da-229f74121549:pi

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
    "rate": 363.18,
    "rateDate": "2026-11-05",
    "fetchedAt": "2026-11-08T17:14:28.874Z",
    "status": "OK",
    "source": "https://api.frankfurter.dev/v1/2026-11-05"
  }
}
~~~~
