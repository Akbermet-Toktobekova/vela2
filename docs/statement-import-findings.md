# Statement import and focused findings

Implemented in the mobile beta and shared deterministic normalization core. Historical imports are not automatically reprocessed. Original uploaded bytes remain in the owner-scoped import record. Detection describes evidence and does not change financial action eligibility.

## Supported-format matrix

| Format | Supported path | Review and limits |
|---|---|---|
| CSV | UTF-8/BOM and Windows-1252; comma, semicolon, tab; quoted multiline fields, preambles, debit/credit | Explicit header/column mapping, DMY/MDY/YMD and decimal convention; original values and physical row retained |
| XLS | Typed cells, displayed references, 1900/1904 date systems | Worksheet/header selection; formula cells rejected for correction; macros never executed |
| XLSX | Same typed-cell path as XLS | Same review gates; worksheet metadata retained |
| Text PDF | Existing Revolut adapter and coordinate-column table extraction | Page/row/x coordinates exposed; guided ranges or verified corrected CSV; scans require OCR outside this phase |

Server limits remain 20 MB, 10,000 rows, 200 PDF pages; mobile picker retains its existing 18 MB limit. CSV/Excel/generic PDF target one account currency per import. Mismatched currency rows remain blocking until the correct account is selected through a separate import or the rows are explicitly excluded. Revolut retains currency-to-account mapping. Arbitrary layouts are not universally supported. Unreadable/encrypted/corrupt PDF errors remain explicit; no OCR is attempted.

## Before and after

Input `statement.csv`:

```csv
Date;Description;Amount;Currency
03/04/2026;Netflix;-12,99;EUR
2026-02-30;Unclear charge;-2,00;EUR
```

Before: the internal CSV representation changed the name to `statement.csv.csv`, ambiguous dates had no file-level correction contract, and invalid rows could pass through a general review state.

After: the original name stays `statement.csv`; row 2 requires DMY/MDY selection. Selecting DMY produces `2026-04-03`, `Netflix`, `-12.99`, `EUR`. Row 3 remains an impossible date and blocks confirmation until corrected or explicitly excluded. Both original values and row references remain reviewable. Suspect closing balances are not promoted when reconciliation differs.

## Five-finding mobile review preview

The `FindingsReview` component on Today shows up to five unresolved groups, with evidence expansion and typed answers. Example synthetic queue:

| Order | Mobile card | Question / controls |
|---|---|---|
| 1 | Account ownership: Main · EUR | Review ownership in account settings; dismiss |
| 2 | Potential duplicate charges · two matching EUR outflows | Inspect supporting charges; dismiss if separate purchases |
| 3 | Recorded ATM fees · EUR | Confirm/correct category and economic type; dismiss |
| 4 | Netflix: monthly charges · three distinct dates · EUR | Still used / no longer used / unsure / classification / dismiss |
| 5 | Review transfers · EUR | Between my accounts / external transfer / unsure / dismiss |

Each card includes observation, date range, evidence IDs, currency, confidence, why it matters, and a specific question. Ordinary transaction review remains available separately. Usage answers do not establish cancellation eligibility, cancel services, or move money.

## Reviewed synthetic checks

`server/tests/reliable-imports.test.ts`: explicit calendar validation, ISO written dates, locale amounts, quoted/multiline parsing, filename preservation, in-file possible duplicate retention, exact/overlap duplicate imports, ambiguous date correction, explicit exclusions, stale corrections, balance discrepancy acknowledgement, XLS/XLSX typed cells and 1904 dates, formatted identifiers, formula rejection and Windows-1252.

`server/tests/findings.test.ts`: weekly/monthly/annual cadence, three distinct dates, two-charge rejection, ordinary purchase and processor ambiguity, explicit fees, possible duplicates, dismissal persistence, changed evidence, consent refusal, invented AI IDs and provider failure.

`server/tests/reliable-workflow.test.ts`: authenticated upload job → blocked ambiguity → correction → confirmation → Today state and findings → usage answer → refresh → stale response rejection. Provider calls stay off without consent.

New contracts validate finding response IDs, profile versions and evidence fingerprints. Merchant preferences are account-scoped, apply to newly imported records, and avoid ambiguous processors/marketplaces. Existing explicit classifications are preserved. AI suggestions are an optional explicit endpoint with minimized merchant/transaction-ID context, strict category allowlist, timeout and safe provider-failure results; suggestions never write transactions or findings evidence.

## Verification limits

Android/iOS/web bundle export is build evidence only. Native picker behavior, keyboard/focus, large text, and real Android/iPhone acceptance have not been exercised. No production deployment, real statements, universal bank support, or production readiness is claimed. Independent review identified and helped correct the mobile validation dependency and automatic-header correction bugs; the independent verifier was interrupted by an agent usage limit before completing final verification. Final tests were run by the lead.
