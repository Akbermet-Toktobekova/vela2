# 02 Strong · fx

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload / stage:eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:fx / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T20:28:24.521Z

Consumers: Shared Financial Calculator and Checker

Upstream artifact IDs: eval_fd8bd3c1-66a8-4634-8019-13b1d8d1b67f:pi

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
    "fetchedAt": "2026-11-08T20:28:24.481Z",
    "status": "OK",
    "source": "https://api.frankfurter.dev/v1/2026-11-05"
  }
}
~~~~
