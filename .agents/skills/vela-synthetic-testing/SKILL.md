---
name: vela-synthetic-testing
description: >-
  Use this skill to run the 14 mandatory E2E scenarios and any user-provided synthetic profiles
  in server/tests/fixtures/synthetic/, generating an audit and calibration report.
---

# Vela Synthetic & E2E Testing

## Steps

1. Execute the 14 mandatory E2E scenarios in `server/tests/e2e/finagent-14-scenarios.test.ts`.
2. Scan `server/tests/fixtures/synthetic/` for any additional `.json` or `.csv` profiles.
3. For each scenario/profile, record:
   - `snapshotId`, `readinessState`, active weight profile, and `Critical` triggers;
   - candidate actions (`FINANCIAL_ACTION`, `VERIFICATION_ACTION`, `EDUCATIONAL_ACTION`), Checker outcomes (`VALID / REJECTED / NEEDS_DATA`);
   - raw impacts (`months`, `EUR`, `pct_points`, `12m debt projection`), normalized `v_R, v_F, v_G`, `T/S/D/O` complexity, `S(a)` score, and `F018` stability across 200 seeded runs;
   - final outcome (`RECOMMENDATION_READY / NEEDS_DATA / NO_RECOMMENDATION`).
4. Write the summary report to `docs/coordination/synthetic-report.md`.
