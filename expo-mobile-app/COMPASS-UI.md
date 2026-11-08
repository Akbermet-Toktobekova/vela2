# Financial Compass UI

The native Today, Analytics, Assistant, and Profile tabs follow the stone / forest-green web reference. `src/theme.ts` owns the color and typography tokens; Manrope is bundled locally through Expo Font. `SoftGlass` supplies shared glass cards, buttons, and navigation.

Analytics keeps currencies separate, puts spending categories first, and suggestion history last. Its debt scenario uses `SharedFinancialCalculator.computeDebtPayoffHorizon` for recorded monthly debts. Missing terms and unsupported schedules show a needs-data state. The safety cushion's account-balance button opens the existing account editor; goal allocations remain server-controlled.

Assistant uses the existing authenticated API and AI-consent controls. Prompt chips populate the composer, and starting a new chat confirms deletion of the server-side conversation. Profile reuses existing account, statement, export, logout, and account-deletion handlers inside accessible accordions.

## Verification

- `npm run typecheck`: passed (`tsc --noEmit`; this package has no lint script).
- `CI=1 EXPO_NO_TELEMETRY=1 npx expo export --platform all`: passed for iOS, Android, and web, including the bundled fonts.
- Existing `server/tests/mobile-plan-insights.test.ts`: 6 passed.
- Required `server/tests/e2e/finagent-14-scenarios.test.ts`: 14 passed.
- Browser smoke check used the exported build and a localhost-only fixture API, without real accounts: all four tabs rendered, prompt selection populated the composer, and Profile account accordions expanded.
- No server or shared source changes. Native device execution and real API integration were not exercised in this UI-only task.

The branch was created in a clean worktree because the source checkout contained unrelated, unfinished changes. The untracked web reference is kept outside the source repository as `~/Desktop/Vela2-new-ui-reference-backup-20261108`.
