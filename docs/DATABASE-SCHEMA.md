# Vela database reference

## Storage locations

| Storage | Contents | Consumer |
| --- | --- | --- |
| server/data/beta.sqlite | Accounts, sessions, personal finances, statements, jobs, evaluations, recommendations and chat | Beta backend accessed by Expo through /api/beta |
| server/data/finagent.sqlite | Separate local-prototype SQLite schema with PI, engine results and imported AS | Local backend. Beta uses the engine through BetaEngineRepository |
| server/data/as/FinAgent_Normalized_Database.json | Canonical AS sources, claims, rules, formulas, actions and mappings | Catalog loader, internal selection, Checker, Critical Coverage and decision engine. Canonical records are shared across users |
| server/config/prototype-policy.json | Versioned preliminary calculation and decision parameters | Calculator and Recommendation Engine under their contracts |

## 1. Physical beta tables

PK means primary key. Both beta_documents PK columns identify one row. Auth timestamps use Unix milliseconds. SQL columns use snake_case and JSON fields use camelCase.

| Table | Column | Type and key | Stored value | Consumer and purpose |
| --- | --- | --- | --- | --- |
| auth_users | id | TEXT PK | User ID | Auth and API associate the account with its data. |
| auth_users | email_hash | TEXT UNIQUE | Hash of normalized email | Auth looks up sign-in and recovery accounts. |
| auth_users | profile_cipher | TEXT | Encrypted name and email | Auth returns the owner profile. |
| auth_users | password_hash | TEXT | scrypt salt and password hash | Auth verifies the password. |
| auth_users | created_at | INTEGER | Registration time | Auth stores account metadata. |
| auth_sessions | token_hash | TEXT PK | Session token hash | Auth verifies requests and revokes logout sessions. |
| auth_sessions | user_id | TEXT | Session owner ID | Auth determines whose data may be read. |
| auth_sessions | expires_at | INTEGER | Session expiry | Auth rejects expired tokens. |
| auth_resets | token_hash | TEXT PK | Single-use reset token hash | Auth verifies the reset link. |
| auth_resets | user_id | TEXT | Reset owner ID | Auth changes the intended account password. |
| auth_resets | expires_at | INTEGER | Reset expiry | Auth rejects expired reset links. |
| auth_attempts | bucket | TEXT PK | Attempt counter key | Auth limits repeated attempts. |
| auth_attempts | attempts | INTEGER | Attempt count | Auth applies attempt limits. |
| auth_attempts | started_at | INTEGER | Counter window start | Auth determines counter expiry. |
| beta_documents | user_id | TEXT PK 1 | Owner ID | Backend scopes document reads and writes. |
| beta_documents | doc_key | TEXT PK 2 | Document key such as state, engine or import:<id> | Backend chooses a document within the account. |
| beta_documents | payload | TEXT | Encrypted document content | BetaStore decrypts JSON for server modules. |
| beta_jobs | id | TEXT PK | Job ID | Queue locates job:<id> and API returns status. |
| beta_jobs | user_id | TEXT | Job owner ID | Queue and API enforce owner access. |
| beta_jobs | status | TEXT | queued, running, completed, failed or cancelled | Worker selects jobs and recovers the queue on startup. |
| beta_metadata | key | TEXT PK | Metadata key such as key_check | BetaStore finds the verification record. |
| beta_metadata | value | TEXT | Encrypted verification value | BetaStore verifies the key when opening the database. |

The application maintains user_id and job/document relationships. Documents use AES-256-GCM encryption. IDs, document keys and queue statuses remain visible in SQL. Windows DPAPI protects the default local key.

## 2. Documents in beta_documents

| doc_key | Decoded fields | Writer | Reader and purpose |
| --- | --- | --- | --- |
| state | version, state, aiConsent, experimentalRecommendations | BetaFinancial, import, engine and update routes | Onboarding and My Plan use /state. Calculator and orchestrator consume it. Version prevents stale-client overwrites. |
| engine | snapshots, derivedSnapshots?, agents, evaluations, traces, recommendations, feedback, messages, fx | BetaEngineRepository on behalf of the orchestrator and engine | Orchestrator checks freshness and caches. Engine and Assistant use saved decisions and history. |
| analysis | version, status, createdAt, snapshot, readinessState, decisionStatus, decision, recommendation, trace, traceId, policyVersion, releaseGate, experimentalRecommendations, agentFreshness, provenance | BetaAnalysis publishes for the current PI version | Today reads the result. Assistant uses checked context and trace. |
| import:<id> | preview, original, csv, originalHash, confirmedStatementId? | BetaImports | Worker and Statements use extraction, mapping, confirmation and deletion. Original Base64 bytes remain encrypted during review and are cleared after confirmation. |
| job:<id> | id, userId, kind, status, version, args, result?, error? | BetaJobs | Worker runs import or review. API exposes progress using beta_jobs.status. |
| job-request:<hash> | Job ID string | BetaJobs | Queue reuses a job with the same parameters and version. |
| chat | Array of messages with id, role, content, createdAt | BetaAnalysis | Assistant shows history and uses recent context. |
| chat-request:<requestId> | requestHash, messages, reply, status, releaseGate, traceId, provenance | BetaAnalysis | A repeated request returns the saved response. |
| feedback-request:<requestId or hash> | requestHash, feedback result and profile state | BetaAnalysis | Repeated Accept, Adjust, Decline or Complete requests do not apply effects twice. |

### Financial fields in state.state

Each row describes a JSON object or collection. A question mark denotes an optional field. Type contracts determine nullability.

| Object or collection | Fields | Producer and consumer |
| --- | --- | --- |
| user | id, email, authStatus, isDemoMode, createdAt | Server creates PI identity. Auth owns password and session checks. |
| profile | userId, nickname, locale, baseCurrency, country, updatedAt | Profile and onboarding set the base currency, locale and relevant context. |
| preferences | userId, primaryConcern, concernNotes, notificationsEnabled, reducedMotion, updatedAt | User priorities and settings. Engine consumes the financial concern. |
| onboarding | id, userId, currentStep, completedSteps, debtQuestionAnswer, status, startedAt, completedAt | Onboarding persists progress and resumes the intended step. |
| accounts[] | id, userId, name, institution, currency, purposes, fundsOwnership, personalAvailableAmount, isPrimary, notes, isDemoData?, createdAt, updatedAt | User accounts link imported statements and define fund ownership for calculations. |
| balances[] | id, accountId, amount, currency, asOf, sourceType, sourceId?, createdAt | User input or a confirmed statement creates a balance observation with its source and date. |
| incomes[] | id, userId, name, pattern, estimatedMonthlyAmount, currency, frequency, sourceType, nextExpectedDate, receivingAccountId, notes, isDemoData?, createdAt | User-declared expected income supplies the forecast. |
| expenseCommitment | id, userId, estimatedMonthlyAmount, currency, notes, updatedAt | User estimate of monthly essential expenses. The entire object can be null. |
| obligations[] | id, userId, name, amount, currency, dueDate, recurrence, category, status, accountId, notes, isDemoData?, createdAt | User-entered payments supply amounts and due dates to Today and the cash forecast. |
| debts[] | id, userId, debtType, name, currency, remainingBalance, apr, minimumPayment, nextDueDate, paymentFrequency, isDemoData?, createdAt | User-entered debt terms and schedules supply Debt Agent and deterministic calculations. |
| goals[] | id, userId, name, goalType, targetAmount, currency, targetDate, priority, isDemoData?, createdAt | User goals supply priorities, target amounts and deadlines to My Plan and the engine. |
| goalAllocations[] | id, userId, goalId, accountId, amount, currency, allocatedAt, note, recommendationId? | Goal allocations supply progress calculations and My Plan. |
| statements[] | id, userId, accountId, fileName, fileFormat, fileHash, periodStart, periodEnd, currency, transactionCount, duplicateCountSkipped, status, errorMessage?, overlapWarning?, closingBalance, importedAt, isDemoData? | Confirmed statement metadata supplies period coverage, account and hash to document history and reconciliation. |
| transactions[] | id, userId, accountId, statementId, date, amount, currency, description, counterparty, reference, rawRow, isDemoData?, createdAt | Imported normalized operations supply reconciliation and financial analysis. Negative amounts are outflows and positive amounts are inflows. |
| classifications[] | id, transactionId, economicType, category, confidence, status, classifierVersion, isRecurringCandidate, provenanceNote, updatedAt | Import, classifier and user labels distinguish income, spending, refunds and transfers. |
| transferMatches[] | id, userId, outgoingTransactionId, incomingTransactionId, outgoingAccountId, incomingAccountId, amount, currency, date, description, status | Reconciliation matches transfer sides. Calculations use confirmed match status when distinguishing income and spending. |
| confirmations[] | id, userId, subjectType, subjectId, questionText, impactReason, amountLabel, field, userResponse, confirmedValue, confirmedAt | Questions and responses about uncertain records supply analysis. |
| recommendations[] | id, userId, snapshotId, actionType, title, description, reasoning, suggestedAmount, adjustedAmount, currency, targetGoalId, sourceAccountId, priority, status, readinessState, isDemoSeeded?, finAgentMeta?, createdAt, updatedAt | Engine maintains recommendation history. Today reads the current published card from analysis. |
| actionFeedback[]? | id, recommendationId, action, amount, note, timestamp | Compatibility PI projection of authoritative engine.feedback. Full records include snapshotId and actionId. |
| assistantMessages[] | id, userId, role, content, toolUsed?, createdAt | Shared PI model field. Beta /chat uses the separate chat document. |

### Example record relationships

The following synthetic operation illustrates record relationships.

| Collection | id | accountId | statementId | transactionId | Record contents |
| --- | --- | --- | --- | --- | --- |
| accounts | acc_demo | — | — | — | Main EUR account |
| statements | stmt_demo | acc_demo | — | — | Statement for this account |
| transactions | tx_demo | acc_demo | stmt_demo | — | 2026-11-04, −12.50 EUR, groceries |
| classifications | cls_demo | — | — | tx_demo | expense, groceries_food |
| balances | bal_demo | acc_demo | — | — | Dated balance. For a statement source, sourceId refers to stmt_demo |

Import first creates job:<id> and import:<id>. PDF preview.sourceLines contains page, line and text. Confirming the preview adds statement and transaction records. The needs_mapping status requires explicit mapping.

| Nested record | Fields | Purpose |
| --- | --- | --- |
| import:<id> → preview | id, accountId, fileName, status, transactions, rejectedRows, statement?, sheetNames?, sheetName?, sourceLines?, message?, classifications?, confirmed? | Import preview shows parsed operations, errors, Excel sheets and extracted PDF lines before PI confirmation |
| engine → agents[agent name] | userId, agentName, inputHash, policyVersion, output, createdAt | Orchestrator compares input and policy fingerprints before cache reuse |
| engine → traces[evaluation ID] | trace, decision | Engine stores calculations and decisions under one evaluation ID. Assistant uses the current publication |

After a PI change, the orchestrator checks freshness, saves snapshots and stage results and publishes the current result in analysis. Accept records intent. Complete records execution confirmation.

## 3. Physical local-prototype tables

T = TEXT, I = INTEGER and R = REAL. An asterisk marks a primary-key component and a question mark marks a nullable column. Column order follows PRAGMA table_info. The as_* tables represent the local catalog and raw_json retains each original record.

| Table | Columns in SQLite order | Consumer and purpose |
| --- | --- | --- |
| users | id T*, email_encrypted T, auth_status T, is_demo_mode I, created_at T, updated_at T | Local identity and association with PI. |
| pi_states | user_id T*, version T, version_number I, input_hash T, encrypted_payload T, updated_at T | Current PI, version and canonical input hash. |
| financial_snapshots | id T*, user_id T, version T, input_hash T, encrypted_snapshot_json T, created_at T | Orchestrator stores reproducible financial state. |
| agent_results | user_id T*, agent_name T*, input_hash T, policy_version T, output_json T, created_at T | Orchestrator checks cached agent freshness. |
| evaluation_runs | evaluation_id T*, user_id T, snapshot_id T, snapshot_version T, event_type T, input_hash T, policy_version T, status T, created_at T, completed_at T? | Review execution, policy version and outcome. |
| decision_traces | evaluation_id T*, user_id T, snapshot_id T, snapshot_version T, decision_status T, priority_class T, weight_profile_id T?, trace_json T, decision_json T, created_at T | Decision reasoning and calculation evidence for explanation and audit. |
| recommendations | id T*, evaluation_id T, user_id T, snapshot_id T, snapshot_version T, action_id T?, action_type T, status T, suggested_amount R?, adjusted_amount R?, currency T, record_json T, decision_json T, created_at T, updated_at T | Published card and action lifecycle. |
| action_feedback | id T*, user_id T, recommendation_id T, action_id T?, snapshot_id T, action T, amount R?, note T, timestamp T | User response linked to recommendation and snapshot. |
| fx_rates_cache | base T*, target T*, rate_date T*, rate R, fetched_at T, status T, source T | FX quote cache by currency pair and date. |
| assistant_messages | id T*, user_id T, role T, content T, tool_used T?, created_at T | Local Assistant conversation history. |
| as_sources | source_id T*, title T, issuer T, source_type T, jurisdiction T, retrieval_evidence_status T, raw_json T | Canonical source provenance and status. |
| as_financial_claims | claim_id T*, domain T, verification_status T, source_primary_id T, raw_json T | Financial claims and verification status. |
| as_claim_source_mapping | mapping_id T*, claim_id T, source_id T, raw_json T | Links claims and sources. |
| as_financial_rules | rule_id T*, name T, approval_status T, raw_json T | Rules referenced by Checker and policy. |
| as_financial_formulas | formula_id T*, name T, expression T, approval_status T, raw_json T | Canonical expressions and approval status. Code performs monetary calculations. |
| as_evidence_gaps | gap_id T*, domain T, severity T, raw_json T | Documented evidence gaps. |
| as_action_candidates | action_id T*, name T, action_type T, status T, approved_for_production T, prototype_enabled I, today_enabled I, raw_json T | Internal action catalog for selection, checking and decision execution. |
| as_action_evidence_mapping | mapping_id T*, action_id T, claim_id T, source_id T, raw_json T | Links actions with claims and sources. |
| as_action_rule_mapping | mapping_id T*, action_id T, rule_id T, raw_json T | Links actions with applicable rules. |
| as_action_formula_mapping | mapping_id T*, action_id T, formula_id T, raw_json T | Links actions with applicable formulas. |
| as_agent_knowledge_mapping | mapping_id T*, agent_name T, record_type T, record_id T, raw_json T | Links agents with AS records. |
| as_verification_audit | audit_id T*, target_type T, target_id T, audit_status T, raw_json T | Catalog verification audit. |
| as_version_history | version_id T*, release_date T, raw_json T | Catalog release history. |

## 4. Implementation references

- [BetaStore and encryption](../server/src/beta/store.ts), [authentication](../server/src/beta/auth.ts), [queue](../server/src/beta/jobs.ts).
- [HTTP routes](../server/src/beta/app.ts) and [shared UI/backend contract](../shared/contracts/beta.ts).
- [PI model](../react-app/src/database/seed.ts), [financial field types](../react-app/src/types/pi.ts) and [snapshot construction](../react-app/src/services/snapshotBuilder.ts).
- [Import](../server/src/beta/imports.ts), [engine adapter](../server/src/beta/engineRepository.ts) and [analysis publication and chat](../server/src/beta/analysis.ts).
- [Prototype DDL](../server/src/db/sqliteStore.ts), [canonical catalog](../server/data/as/FinAgent_Normalized_Database.json) and [decisions D-013 and D-014](coordination/DECISIONS.md).

The original schema review inspected code and SQLite metadata for both local databases. All examples are synthetic.
