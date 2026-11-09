# 02 Strong · fx

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.4`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | — | SQLite beta_documents.payload / stage:eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:fx / output. Read back from encrypted storage. | — |

Status: COMPLETED

Prompt: None

Executed at: 2026-11-08T20:35:30.656Z

Consumers: Shared Financial Calculator and Checker

Upstream artifact IDs: eval_c0f2bb5d-cb74-4db7-ae84-9d741cbfe909:pi

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
    "fetchedAt": "2026-11-08T20:35:30.656Z",
    "status": "UNAVAILABLE",
    "source": "frankfurter_unavailable"
  }
}
~~~~
