# PI and results storage map

The live beta API ran against a separate in-memory SQLite database for each synthetic profile. The beta reports read back the saved agent outputs, the published decision, and the SQLite document keys. PostgreSQL names below are draft destinations. Each profile’s `postgres-mock.md` shows example rows projected from that run. Those rows were generated in memory and exported to Markdown.

## Reading a result from source to output

| Record                                            | Current beta storage                                                                                            | Simulated PostgreSQL destination                                                             | Keep for                                                                     |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Profile, preferences and consent                  | `beta_documents.payload` → `state` → `state.profile`, `state.preferences`, and consent on the envelope          | `pi.financial_profiles`                                                                      | Currency, locale, relevant profile context, and permissions                  |
| Accounts and balances                             | `state.state.accounts[]`, `state.state.balances[]`                                                              | `pi.accounts`, `pi.balance_snapshots`                                                        | Ownership, accessible balance, currency, date, and source                    |
| Imports and statement history                     | `import:<id>` plus `state.state.statements[]` and `state.state.transactions[]`                                  | `pi.statement_imports`, `pi.statements`, `pi.transactions`                                   | Provenance, deduplication, coverage, and normalized operations               |
| Income and dated obligations                      | `state.state.incomes[]`, `state.state.obligations[]`, `state.state.expenseCommitment`                           | `pi.income_sources`, `pi.obligations`, `pi.expense_commitments`                              | Forecast inputs and essential spending estimates                             |
| Debt records                                      | `state.state.debts[]`; verified terms under `engine.snapshots[version].calculatorExtras.debtTerms` when present | `pi.debts` with referenced verified terms                                                    | APR, balance, minimum payment, due date, and known terms                     |
| Goals and allocations                             | `state.state.goals[]`, `state.state.goalAllocations[]`                                                          | `pi.goals`, `pi.goal_allocations`                                                            | Targets, deadlines, and money already set aside                              |
| Classifications, transfers and user confirmations | `state.state.classifications[]`, `state.state.transferMatches[]`, `state.state.confirmations[]`                 | `analysis.transaction_classifications`, `analysis.transfer_matches`, `pi.user_confirmations` | Distinguish inferred information from confirmed facts                        |
| Pattern observations and summary                  | beta_documents.payload / stage:<evaluationId>:pattern-recognition / output                                                              | Proposed `analysis.pattern_observations` and `analysis.pattern_summaries.summary_text`       | Observed patterns and supporting transaction IDs                             |
| Behavior summary                                  | `engine.agents.BehaviorAgent.output.summaryText`                                                                | `analysis.behavior_summaries.summary_text`                                                   | Latest behavior summary linked to its input and pattern evidence             |
| Debt summary                                      | `engine.agents.DebtAgent.output.summaryText`; per-debt numbers in `.debtsAnalyzed[]`                            | Proposed `analysis.debt_summaries.summary_text`; per-debt rows in `analysis.debt_analyses`   | Keep one text summary per run and link the debt calculations                 |
| Snapshot, FX and run metadata                     | `engine.snapshots`, `engine.derivedSnapshots`, `engine.fx`, `engine.evaluations`                                | `analysis.financial_snapshots`, `analysis.analysis_runs`                                     | Reconstruct the PI, rate, AS and policy context used in a published decision |
| Drafts and Checker verdicts                       | `engine.traces[evaluationId].trace.primarySuggestions.proposals[]` and `.validatedCandidates[]`                 | `analysis.suggestion_candidates`, `analysis.candidate_checks`                                | Retain evidence needed for published decisions                               |
| Score, decision and Today                         | `engine.traces[evaluationId]`, `engine.recommendations[]`, and `analysis.recommendation`                        | `analysis.decisions`, `analysis.decision_traces`                                             | Show what was selected and why, including an actual score when present       |
| Chat and feedback                                 | `chat`, `engine.feedback[]`, `state.state.actionFeedback[]`                                                     | `analysis.assistant_messages`, `pi.action_feedback`                                          | Conversation and the user’s recorded response                                |
| AS evidence                                       | `server/data/as/FinAgent_Normalized_Database.json` loaded through the catalog repository                        | `as.*` under the existing canonical IDs                                                      | Link the exact claim, source, rule or formula and its version                |

The paths beginning with `state`, `engine`, `analysis`, or `chat` are document keys and decoded JSON paths under `beta_documents.payload`. Only `user_id`, `doc_key`, and `payload` are physical columns of that table.

## Retention choices for the draft

- Keep the original statement while import review or correction is open. After confirmation, keep the normalized transactions, statement metadata, hash, and source row or page reference.
- Preserve the inputs and evidence needed to explain a published decision after PI changes. Keep reusable summaries and the user’s feedback. Keep full draft histories and AI requests and responses in these synthetic reports.
- Keep canonical AS evidence in the versioned catalog and link by ID. The PostgreSQL projections are examples for schema review.

## Reproduce the live reports

From the `server` directory, with the existing Gemini configuration available, run `npm exec --offline -- tsx src/scripts/live-review/run.ts`. Pass `debt`, `strong`, or `nora` to run only that profile. The command writes a timestamped set of English Markdown reports and updates [RECAP.md](RECAP.md). The financial date remains fixed at the date of the three existing profiles.

## Seven-stage runtime storage

Each analysis artifact is encrypted in beta_documents.payload under doc_key stage:<evaluationId>:<stage>, scoped by user_id. Fields include referenceDate, executedAt, inputHash, dependencies, models, output, summaryText, missingInputs and upstreamIds. Published traces list stageArtifactIds.

Classification uses engine.agents.TransactionClassifier. Pattern and Behavior use engine.agents.PatternAgent and engine.agents.BehaviorAgent. Debt uses engine.agents.DebtAgent.

Messages use chat. The chat-memory document stores an English summary, cited message IDs, status and input fingerprint. It refreshes before review. DELETE /api/beta/chat removes messages, memory and cached replies. A conversation epoch prevents a late reply from restoring deleted history.

Feedback is authoritative in engine.feedback. The API projects it into state.actionFeedback for compatibility. Confirmed imports retain normalized operations, source hashes and row/page references and clear original bytes and parsed CSV.

Proposed PostgreSQL destinations are analysis.stage_artifacts, analysis.conversation_memory, analysis.assistant_messages and pi.action_feedback.

## Independent execution

From server, run npm exec --offline -- tsx src/scripts/live-review/run.ts for all profiles.

For a captured stage, run npm exec --offline -- tsx src/scripts/live-review/run.ts --profile strong --stage classification --mode replay --input-run RUN_ID.

Replace RUN_ID with the recap identifier. Use --mode live for a fresh Gemini result on the captured inputs. Missing captures or incompatible prompts fail explicitly. Authenticated API checkpoints, including feedback, require a full profile run.

Runtime API checkpoints support recorded-output replay. A fresh API mutation such as feedback is exercised through the complete authenticated profile run. This distinction is included in the replay status.\n