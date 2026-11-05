# FIX-5 — authoritative web integration

Changed: `react-app/src/context/PIContext.tsx`, `react-app/src/api/client.ts`, `react-app/src/components/dashboard/TodayView.tsx`, `react-app/src/services/recommendationService.ts`, `server/tests/web-core-regressions.test.ts`.

- PI sync now retains the authoritative snapshot and updates browser financial records from it. Complete and recovery use the server snapshot, without locally replaying financial effects.
- Cached server actions remain hidden until the current financial input version has a successful online review. Offline fallback does not reinterpret cached server actions as local suggestions.
- Explicit manual-verification/rejection outcomes and incomplete completion responses surface as errors; existing feedback lock and authoritative recovery remain in place.
- Completion controls distinguish debt payment, reserve/goal allocations, scheduled-transfer pause and cancellation verification. Amount editing is restricted to supported allocations and extra debt payments. Backend-validated source accounts are locked.
- Browser-generated backend cushion forecasts were removed, null evaluations remain unevaluated, and observed amounts use their snapshot currency.
- No canonical facts, approval statuses, financial policies or formulas were modified. Uses D-004/D-005 action separation, D-007/D-009 server evaluation ownership, D-010 no real bank movement.

Verification (2026-11-04):

`cd server; npx vitest run tests/web-core-regressions.test.ts tests/web-feedback-regressions.test.ts`

```
Test Files  2 passed (2)
Tests       27 passed (27)
```

`cd server; npx tsc --noEmit` — exit 0, no diagnostics.

`cd react-app; npx tsc --noEmit` — exit 0, no diagnostics.

`cd react-app; npm run build` — exit 0, 58 modules transformed, Vite production build passed.

Scope: new tests exercise the actual Today component via server rendering, real browser services and mocked HTTP responses. They do not claim a live browser end-to-end interaction test. Cancellation completion remains blocked until the backend can verify it; the web displays that reason and preserves state.
