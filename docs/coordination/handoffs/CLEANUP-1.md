# Project cleanup — 2026-11-04

Archived 35 files (5,744,249 bytes), preserving all original bytes and relative prototype paths. Moved root standalone index.html, Python generators, svgs.json, original instruction, assets/ and public/ into archive/legacy-prototype/. Moved Figma Make original, design_reference.png and thumbnail.png into archive/design-source/. All 26 duplicate root SVGs match the 13 active icons in react-app/public/assets/; active icons remain untouched. Added root README.md and archive/README.md. Extended .gitignore for Vite/tool/Python caches, coverage and OS metadata. Updated BOARD.md.

Evidence: ../evidence/cleanup/manifest.json records every original path, size and SHA256. Rechecked all35 archived file hashes and canonical AS SHA256 (7CE385E40EA872FD49927458F3A787CCCB1E9E1CB02707C80CCDCD6419E8B6B9). No active code, dependency packages, lockfiles, secrets, SQLite databases, canonical records, decision policies or verification history were removed or changed. No financial constants/formulas/action IDs were introduced.

Verification commands and actual results:

- server/: `npm test -- --reporter=default` → `Test Files 14 passed (14); Tests 185 passed (185)`, including all14 E2E scenarios; duration22.79s; exit0. Full output: ../evidence/cleanup/tests.txt.
- server/: `npm run typecheck` → `tsc --noEmit`; exit0, no diagnostics. Output: ../evidence/cleanup/server-types.txt.
- react-app/: `npx tsc --noEmit` → exit0, no diagnostics.
- react-app/: `npm run build` → `58 modules transformed`, `built in4.95s`; exit0. Output: ../evidence/cleanup/web-build.txt.

Limitation (CLEANUP-2): automatic command policy rejected the combined move/recursive-delete command before execution, without a detailed reason. A safer archive-only operation succeeded; deletion was not retried. Generated dist/Vite caches remain, excluded from Git. Build verification regenerated the current dist. No disk-space savings are claimed for archival moves. No applicable financial-policy questions arose.
