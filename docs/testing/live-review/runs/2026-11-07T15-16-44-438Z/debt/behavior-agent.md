# 01 Debt · behavior agent

Snapshot date 2026-11-05T12:00:00.000Z. Policy `prototype_policy_bundle_v1.3`.

This stage made no Gemini calls.

| Input | Output | Summary | Saved in | Details |
| --- | --- | --- | --- | --- | --- |
| [Exact input](#input) | [Actual output](#output) | [Exact text](#summary) | Isolated result. Full beta saves engine.agents.BehaviorAgent.output in beta_documents.payload; draft PostgreSQL analysis.behavior_summaries and analysis.transaction_classifications. | — |

## Input

~~~~json
{
  "transactions": [],
  "classifications": {},
  "confirmations": [],
  "patternSummary": "Pattern Recognition found no statement activity to compare."
}
~~~~

## Output

~~~~json
{
  "categorizedCount": 0,
  "recurringDetected": [],
  "proposedConfirmations": [],
  "summaryText": "Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected. Pattern Recognition found no statement activity to compare.",
  "classifications": {}
}
~~~~

## Summary

~~~~text
Analyzed 0 transactions (0 classified; user_confirmed preserved). No unconfirmed optional subscriptions detected. Pattern Recognition found no statement activity to compare.
~~~~
