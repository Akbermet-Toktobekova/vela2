# TX-NAV

Changed expo-mobile-app/src/BetaApp.tsx: reviewTransactions selects Transactions rather than My Plan and resets scroll. Transaction list moved into that dedicated view; filters and item edit handlers retained. My Plan has explicit entry and transaction screen has return navigation and empty state.

Validation: `cd expo-mobile-app && npm run typecheck` exited 0. Native tap check not performed.
