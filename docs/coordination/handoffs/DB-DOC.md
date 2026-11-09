# DB-DOC — Database schema reference

Created [DATABASE-SCHEMA.md](../../DATABASE-SCHEMA.md) for the UI and backend developers. It distinguishes the D-013 authenticated beta storage from the local prototype and describes the D-014 persistent PI engine documents. The examples use synthetic identifiers. This was a documentation-only change.

- Compared documented SQL column names, types and order using read-only Node SQLite connections and PRAGMA table_info. Output was `beta: 7 tables, 22 columns match names, types and order` and `finagent: 23 tables, 144 columns match names, types and order`.
- From server, `npx tsc --noEmit` exited 0.
- From server, `npx vitest run tests/beta-store.test.ts tests/beta-engine-repository.test.ts tests/e2e/finagent-14-scenarios.test.ts` reported `Test Files 3 passed (3)` and `Tests 26 passed (26)`.
