import { CalculatorContextExtras } from '@shared/calculator';
import { CandidateAction } from '@shared/contracts';
import {
AccountSummaryView,
BalanceObservation,
CurrencyCashSummary,
DebtRecord,
ExpenseCommitment,
FinancialAccount,
FinancialGoal,
FinancialObligation,
FinancialSnapshot,
GoalAllocation,
IncomeSource,
OnboardingSession,
UserPreferences,
UserProfile,
} from '@shared/pi/types';

export const REFERENCE_DATE_ISO = '2026-11-03';
export const REFERENCE_TIMESTAMP_ISO = '2026-11-03T09:30:00Z';

export interface TestFixtureBundle {
  snapshot: FinancialSnapshot;
  extras: CalculatorContextExtras;
}

function buildAccountSummaries(
  accounts: FinancialAccount[],
  balances: BalanceObservation[],
  goalAllocations: GoalAllocation[],
  staleAccountIds: string[] = []
): AccountSummaryView[] {
  return accounts.map((account) => {
    const balanceHistory = balances
      .filter((b) => b.accountId === account.id)
      .sort((a, b) => new Date(b.asOf).getTime() - new Date(a.asOf).getTime());
    const latestBalance = balanceHistory[0] || null;
    const allocatedToGoals = goalAllocations
      .filter((ga) => ga.accountId === account.id)
      .reduce((sum, ga) => sum + ga.amount, 0);

    let personalAccessibleBalance: number | null = null;
    if (latestBalance !== null) {
      if (account.fundsOwnership === 'personal') {
        personalAccessibleBalance = latestBalance.amount;
      } else if (
        account.fundsOwnership === 'work_business' ||
        account.fundsOwnership === 'held_for_others'
      ) {
        personalAccessibleBalance =
          account.personalAvailableAmount !== null ? account.personalAvailableAmount : 0;
      } else {
        personalAccessibleBalance =
          account.personalAvailableAmount !== null ? account.personalAvailableAmount : null;
      }
    }

    return {
      account,
      latestBalance,
      balanceHistory,
      isStale: staleAccountIds.includes(account.id),
      personalAccessibleBalance,
      allocatedToGoals,
      coverage: {
        id: `cov_${account.id}`,
        accountId: account.id,
        periodStart: '2026-10-01',
        periodEnd: '2026-10-31',
        daysCovered: 31,
        monthsCovered: 1,
        completeness: 'full_month',
      },
      statementCount: 1,
      transactionCount: 5,
    };
  });
}

function buildCurrencySummaries(
  accountSummaries: AccountSummaryView[],
  goalAllocations: GoalAllocation[],
  upcomingUnpaidObligations: FinancialObligation[],
  baseCurrency: string
): {
  currencySummaries: CurrencyCashSummary[];
  primaryCurrencySummary: CurrencyCashSummary;
} {
  const currencies = Array.from(
    new Set(accountSummaries.map((a) => a.account.currency).concat([baseCurrency]))
  );
  const currencySummaries: CurrencyCashSummary[] = currencies.map((currency) => {
    const inCurr = accountSummaries.filter((a) => a.account.currency === currency);
    const totalReportedBalance = inCurr.reduce(
      (sum, a) => sum + (a.latestBalance?.amount ?? 0),
      0
    );
    const personalAccessibleCash = inCurr.reduce(
      (sum, a) => sum + (a.personalAccessibleBalance ?? 0),
      0
    );
    const allocatedToGoals = goalAllocations
      .filter((g) => g.currency === currency)
      .reduce((sum, g) => sum + g.amount, 0);
    const unpaidInCurr = upcomingUnpaidObligations
      .filter((o) => o.currency === currency)
      .reduce((sum, o) => sum + o.amount, 0);

    return {
      currency,
      totalReportedBalance,
      personalAccessibleCash,
      allocatedToGoals,
      upcomingUnpaidObligations: unpaidInCurr,
      uncommittedSafeToSpend: personalAccessibleCash - allocatedToGoals - unpaidInCurr,
      hasWorkOrMixedUncertainty: false,
      hasMissingBalances: inCurr.some((a) => a.latestBalance === null),
    };
  });

  const primaryCurrencySummary =
    currencySummaries.find((c) => c.currency === baseCurrency) || currencySummaries[0];

  return { currencySummaries, primaryCurrencySummary };
}

/**
 * 1. Baseline solvent user:
 * - €1,500 monthly regular income (next expected 2026-11-05)
 * - €1,000 essential monthly expenses (rent €750 on 2026-11-12 + utilities €250 on 2026-11-14)
 * - €1,700 total accessible liquid cash across 2 EUR accounts (€1,400 checking + €300 savings)
 * - €300 emergency reserve allocation = 0.30 months coverage (F002)
 * - €400 uncommitted liquid cash after €300 reserve and €1,000 upcoming unpaid obligations
 * - €500 credit card debt at 24% APR with €25 minimum due in 15 days (2026-11-18)
 */
export function createBaselineSolventFixture(overrides?: {
  snapshotId?: string;
  country?: string;
  staleBalanceAccountIds?: string[];
}): TestFixtureBundle {
  const userId = 'user_test_baseline';
  const baseCurrency = 'EUR';

  const profile: UserProfile = {
    userId,
    nickname: 'Elena',
    locale: 'en-US',
    baseCurrency,
    country: overrides?.country || 'HU',
    updatedAt: REFERENCE_TIMESTAMP_ISO,
  };

  const preferences: UserPreferences = {
    userId,
    primaryConcern: 'save_more',
    concernNotes: 'Build emergency cushion and pay down credit card.',
    notificationsEnabled: true,
    reducedMotion: false,
    updatedAt: REFERENCE_TIMESTAMP_ISO,
  };

  const onboarding: OnboardingSession = {
    id: 'ob_test_01',
    userId,
    currentStep: 10,
    completedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    debtQuestionAnswer: 'yes',
    status: 'completed',
    startedAt: REFERENCE_TIMESTAMP_ISO,
    completedAt: REFERENCE_TIMESTAMP_ISO,
  };

  const accounts: FinancialAccount[] = [
    {
      id: 'acc_checking_eur',
      userId,
      name: 'Main Checking EUR',
      institution: 'Revolut',
      currency: 'EUR',
      purposes: ['daily_spending', 'receiving_income'],
      fundsOwnership: 'personal',
      personalAvailableAmount: null,
      isPrimary: true,
      notes: 'Primary checking account',
      createdAt: REFERENCE_TIMESTAMP_ISO,
      updatedAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'acc_savings_eur',
      userId,
      name: 'Safety Vault EUR',
      institution: 'Revolut',
      currency: 'EUR',
      purposes: ['savings'],
      fundsOwnership: 'personal',
      personalAvailableAmount: null,
      isPrimary: false,
      notes: 'Dedicated liquid reserve vault',
      createdAt: REFERENCE_TIMESTAMP_ISO,
      updatedAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'acc_secondary_checking_eur',
      userId,
      name: 'Secondary Checking EUR',
      institution: 'Wise',
      currency: 'EUR',
      purposes: ['daily_spending'],
      fundsOwnership: 'personal',
      personalAvailableAmount: null,
      isPrimary: false,
      notes: 'Second daily spending account with equal liquidity',
      createdAt: REFERENCE_TIMESTAMP_ISO,
      updatedAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const balances: BalanceObservation[] = [
    {
      id: 'bal_chk_1',
      accountId: 'acc_checking_eur',
      amount: 1200,
      currency: 'EUR',
      asOf: REFERENCE_TIMESTAMP_ISO,
      sourceType: 'user_reported',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'bal_sav_1',
      accountId: 'acc_savings_eur',
      amount: 300,
      currency: 'EUR',
      asOf: REFERENCE_TIMESTAMP_ISO,
      sourceType: 'user_reported',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'bal_chk_2',
      accountId: 'acc_secondary_checking_eur',
      amount: 200,
      currency: 'EUR',
      asOf: REFERENCE_TIMESTAMP_ISO,
      sourceType: 'user_reported',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const incomeSources: IncomeSource[] = [
    {
      id: 'inc_salary_main',
      userId,
      name: 'Monthly Net Salary',
      pattern: 'regular',
      estimatedMonthlyAmount: 1500,
      currency: 'EUR',
      frequency: 'monthly',
      sourceType: 'salary',
      nextExpectedDate: '2026-11-05',
      receivingAccountId: 'acc_checking_eur',
      notes: 'Confirmed monthly payroll on the 5th',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const essentialCommitment: ExpenseCommitment = {
    id: 'exp_essential_1000',
    userId,
    estimatedMonthlyAmount: 1000,
    currency: 'EUR',
    notes: 'Rent €750 + utilities & essentials €250',
    updatedAt: REFERENCE_TIMESTAMP_ISO,
  };

  const obligations: FinancialObligation[] = [
    {
      id: 'obl_rent_750',
      userId,
      name: 'Apartment Rent',
      amount: 750,
      currency: 'EUR',
      dueDate: '2026-11-12',
      recurrence: 'monthly',
      category: 'rent',
      status: 'unpaid',
      accountId: 'acc_checking_eur',
      notes: 'Monthly rent due on the 12th',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'obl_utilities_250',
      userId,
      name: 'Utilities & Essential Bills',
      amount: 250,
      currency: 'EUR',
      dueDate: '2026-11-14',
      recurrence: 'monthly',
      category: 'energy',
      status: 'unpaid',
      accountId: 'acc_checking_eur',
      notes: 'Electricity, heating, and internet',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const debts: DebtRecord[] = [
    {
      id: 'debt_cc_500',
      userId,
      debtType: 'credit_card',
      name: 'Visa Classic Credit Card',
      currency: 'EUR',
      remainingBalance: 500,
      apr: 24.0,
      minimumPayment: 25,
      nextDueDate: '2026-11-18', // 15 days from 2026-11-03
      paymentFrequency: 'monthly',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const goals: FinancialGoal[] = [
    {
      id: 'goal_cushion',
      userId,
      name: 'Emergency Reserve Cushion',
      goalType: 'emergency_cushion',
      targetAmount: 1500,
      currency: 'EUR',
      targetDate: '2027-06-30',
      priority: 'high',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'goal_laptop',
      userId,
      name: 'Workstation Upgrade Fund',
      goalType: 'specific_purchase',
      targetAmount: 1000,
      currency: 'EUR',
      targetDate: '2027-05-03',
      priority: 'medium',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const goalAllocations: GoalAllocation[] = [
    {
      id: 'alloc_cushion_300',
      userId,
      goalId: 'goal_cushion',
      accountId: 'acc_savings_eur',
      amount: 300,
      currency: 'EUR',
      allocatedAt: REFERENCE_TIMESTAMP_ISO,
      note: 'Dedicated emergency reserve (€300 = 0.30 months of €1,000 essentials)',
    },
  ];

  const staleIds = overrides?.staleBalanceAccountIds || [];
  const accountSummaries = buildAccountSummaries(accounts, balances, goalAllocations, staleIds);
  const { currencySummaries, primaryCurrencySummary } = buildCurrencySummaries(
    accountSummaries,
    goalAllocations,
    obligations,
    baseCurrency
  );

  const snapshot: FinancialSnapshot = {
    id: overrides?.snapshotId || 'snap_baseline_solvent',
    userId,
    version: '1.0',
    createdAt: REFERENCE_TIMESTAMP_ISO,
    baseCurrency,
    isDemoMode: true,
    profile,
    preferences,
    onboarding,
    accountSummaries,
    currencySummaries,
    primaryCurrencySummary,
    incomeSources,
    declaredMonthlyIncomeByCurrency: { EUR: 1500 },
    observedInflowsByCurrency: { EUR: 1500 },
    essentialCommitment,
    obligations,
    upcomingUnpaidObligations: obligations,
    overdueObligations: [],
    debts,
    goals,
    goalAllocations,
    safetyCushionGoal: goals[0],
    safetyCushionAllocated: 300,
    emergencyCoverageMonths: 0.3,
    emergencyCoverageDays: 9.0,
    statements: [],
    transactions: [],
    classifications: {},
    transferMatches: [],
    confirmations: [],
    unresolvedConfirmations: [],
    observedSpendingTotal: 1000,
    observedIncomeTotal: 1500,
    observedSubscriptionsTotal: 30,
    observedInternalTransfersTotal: 0,
    observedDebtPaymentsTotal: 25,
    observedWorkMovementsTotal: 0,
    spendingByCategory: {
      rent_housing: 750,
      utilities_energy: 250,
      internet_telecom: 0,
      groceries_food: 0,
      dining_coffee: 0,
      transport: 0,
      subscriptions: 30,
      shopping: 0,
      health: 0,
      education: 0,
      work_expense: 0,
      income: 1500,
      transfer: 0,
      other: 0,
    },
    dataQuality: {
      totalAccounts: accounts.length,
      accountsWithBalance: accounts.length,
      accountsWithStatements: accounts.length,
      staleBalanceAccountIds: staleIds,
      missingBalanceAccountIds: [],
      multiCurrencyDetected: false,
      currencies: ['EUR'],
      singleMonthWarning: false,
      coverageStatus: 'complete',
      missingFields: [],
    },
    readinessState: 'state_a_action_ready',
    readinessReason: 'Verified €400.00 uncommitted liquid cash after obligations and emergency reserve.',
  };

  const extras: CalculatorContextExtras = {
    referenceDateIso: REFERENCE_DATE_ISO,
    bufferFloor: 100,
    debtTerms: {
      debt_cc_500: {
        debtId: 'debt_cc_500',
        interestAccruing: true,
        lateFeeAmount: 30,
        issuerContact: '+36-1-555-0199',
      },
    },
  };

  return { snapshot, extras };
}

/**
 * 2. User with imminent mandatory bill shortfall (C(d) < 0, F019 > 0):
 * - Starting liquid cash: €200
 * - Mandatory rent bill of €650 due in 3 days (2026-11-06) -> F019 shortfall = €450, C(d) = -€450
 * - Imminent credit card minimum of €40 due in 4 days (2026-11-07) with insufficient funds (triggers A005 & A020)
 * - Next salary (€1,500) does not arrive until 2026-11-20
 */
export function createImminentBillShortfallFixture(options?: {
  canCoverCardMinimum?: boolean;
}): TestFixtureBundle {
  const base = createBaselineSolventFixture({ snapshotId: 'snap_shortfall' });
  const canCoverMin = options?.canCoverCardMinimum ?? false;

  // If canCoverCardMinimum is true, give user €100 starting cash, €35 card min due 2026-11-05 (can cover min -> A001),
  // and €650 rent due 2026-11-08 (causes shortfall -> A020).
  // If false, give user €20 starting cash, €40 card min due 2026-11-06 (cannot cover min -> A005), and €650 rent due 2026-11-06.
  const startingBalance = canCoverMin ? 100 : 20;

  const accounts: FinancialAccount[] = [base.snapshot.accountSummaries[0].account];
  const balances: BalanceObservation[] = [
    {
      id: 'bal_shortfall_1',
      accountId: accounts[0].id,
      amount: startingBalance,
      currency: 'EUR',
      asOf: REFERENCE_TIMESTAMP_ISO,
      sourceType: 'user_reported',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const obligations: FinancialObligation[] = [
    {
      id: 'obl_rent_imminent',
      userId: base.snapshot.userId,
      name: 'Apartment Rent',
      amount: 650,
      currency: 'EUR',
      dueDate: '2026-11-08',
      recurrence: 'monthly',
      category: 'rent',
      status: 'unpaid',
      accountId: accounts[0].id,
      notes: 'Due before salary arrives',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const debts: DebtRecord[] = [
    {
      id: 'debt_cc_imminent',
      userId: base.snapshot.userId,
      debtType: 'credit_card',
      name: 'Urgent Visa Card',
      currency: 'EUR',
      remainingBalance: 800,
      apr: 22.5,
      minimumPayment: 40,
      nextDueDate: '2026-11-05', // 2 days from 2026-11-03 (within 7-day window)
      paymentFrequency: 'monthly',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const incomeSources: IncomeSource[] = [
    {
      ...base.snapshot.incomeSources[0],
      nextExpectedDate: '2026-11-25', // Arrives after mandatory bills
    },
  ];

  const accountSummaries = buildAccountSummaries(accounts, balances, []);
  const { currencySummaries, primaryCurrencySummary } = buildCurrencySummaries(
    accountSummaries,
    [],
    obligations,
    'EUR'
  );

  return {
    snapshot: {
      ...base.snapshot,
      id: 'snap_imminent_shortfall',
      accountSummaries,
      currencySummaries,
      primaryCurrencySummary,
      incomeSources,
      obligations,
      upcomingUnpaidObligations: obligations,
      debts,
      goalAllocations: [],
      safetyCushionAllocated: 0,
      emergencyCoverageMonths: 0,
      emergencyCoverageDays: 0,
    },
    extras: {
      referenceDateIso: REFERENCE_DATE_ISO,
      bufferFloor: 50,
      debtTerms: {
        debt_cc_imminent: {
          debtId: 'debt_cc_imminent',
          interestAccruing: true,
          lateFeeAmount: 35,
          issuerContact: '+36-1-555-0100',
        },
      },
    },
  };
}

/**
 * 3. User with risky scheduled automatic transfer (A011 trigger):
 * - Starting liquid cash: €700 (no goal earmarks)
 * - Mandatory rent of €600 due on 2026-11-08 (day 5)
 * - Scheduled automatic transfer of €250 on 2026-11-05 (day 2) to external savings/investment
 * - Next salary (€1,500) arrives on 2026-11-15 (day 12)
 * Without pausing the €250 transfer, cash drops to €450 on day 2 and -€150 on day 5 (F019 shortfall = €150).
 * Pausing the transfer (A011) keeps cash at +€100 on day 5, completely preventing the deficit!
 */
export function createRiskyAutoTransferFixture(): TestFixtureBundle {
  const base = createBaselineSolventFixture({ snapshotId: 'snap_risky_transfer' });
  const accounts: FinancialAccount[] = [base.snapshot.accountSummaries[0].account];
  const balances: BalanceObservation[] = [
    {
      id: 'bal_risky_700',
      accountId: accounts[0].id,
      amount: 700,
      currency: 'EUR',
      asOf: REFERENCE_TIMESTAMP_ISO,
      sourceType: 'user_reported',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const obligations: FinancialObligation[] = [
    {
      id: 'obl_rent_600',
      userId: base.snapshot.userId,
      name: 'Monthly Apartment Rent',
      amount: 600,
      currency: 'EUR',
      dueDate: '2026-11-08',
      recurrence: 'monthly',
      category: 'rent',
      status: 'unpaid',
      accountId: accounts[0].id,
      notes: 'Mandatory rent payment',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const incomeSources: IncomeSource[] = [
    {
      ...base.snapshot.incomeSources[0],
      nextExpectedDate: '2026-11-15',
    },
  ];

  const accountSummaries = buildAccountSummaries(accounts, balances, []);
  const { currencySummaries, primaryCurrencySummary } = buildCurrencySummaries(
    accountSummaries,
    [],
    obligations,
    'EUR'
  );

  return {
    snapshot: {
      ...base.snapshot,
      id: 'snap_risky_auto_transfer',
      accountSummaries,
      currencySummaries,
      primaryCurrencySummary,
      incomeSources,
      obligations,
      upcomingUnpaidObligations: obligations,
      debts: [],
      goalAllocations: [],
      safetyCushionAllocated: 0,
      emergencyCoverageMonths: 0,
      emergencyCoverageDays: 0,
    },
    extras: {
      referenceDateIso: REFERENCE_DATE_ISO,
      bufferFloor: 50,
      scheduledTransfers: [
        {
          id: 'tr_auto_250',
          userId: base.snapshot.userId,
          fromAccountId: accounts[0].id,
          toAccountId: null,
          amount: 250,
          currency: 'EUR',
          scheduledDate: '2026-11-05',
          description: 'Pre-payday Auto-Invest Transfer',
          isActive: true,
        },
      ],
    },
  };
}

/**
 * 4. User with multi-currency accounts (EUR, HUF, and unsupported KGS):
 * - EUR checking: €1,000
 * - HUF account: 80,000 HUF (at 400 HUF/EUR = €200)
 * - KGS account: 50,000 KGS (unsupported by Frankfurter ECB feed -> UNAVAILABLE, never converted at 1:1)
 */
export function createMultiCurrencyFixture(options?: {
  hufStatus?: 'OK' | 'STALE';
}): TestFixtureBundle {
  const base = createBaselineSolventFixture({ snapshotId: 'snap_multicurrency' });
  const userId = base.snapshot.userId;
  const hufStatus = options?.hufStatus || 'OK';

  const accounts: FinancialAccount[] = [
    base.snapshot.accountSummaries[0].account,
    {
      id: 'acc_otp_huf',
      userId,
      name: 'OTP Bank HUF',
      institution: 'OTP Bank',
      currency: 'HUF',
      purposes: ['daily_spending'],
      fundsOwnership: 'personal',
      personalAvailableAmount: null,
      isPrimary: false,
      notes: 'Local Hungarian Forint account',
      createdAt: REFERENCE_TIMESTAMP_ISO,
      updatedAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'acc_mbank_kgs',
      userId,
      name: 'MBANK Reserve KGS',
      institution: 'MBANK',
      currency: 'KGS',
      purposes: ['other'],
      fundsOwnership: 'personal',
      personalAvailableAmount: null,
      isPrimary: false,
      notes: 'Unsupported KGS account',
      createdAt: REFERENCE_TIMESTAMP_ISO,
      updatedAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const balances: BalanceObservation[] = [
    {
      id: 'bal_mc_eur',
      accountId: accounts[0].id,
      amount: 1000,
      currency: 'EUR',
      asOf: REFERENCE_TIMESTAMP_ISO,
      sourceType: 'user_reported',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'bal_mc_huf',
      accountId: 'acc_otp_huf',
      amount: 80000,
      currency: 'HUF',
      asOf: REFERENCE_TIMESTAMP_ISO,
      sourceType: 'user_reported',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
    {
      id: 'bal_mc_kgs',
      accountId: 'acc_mbank_kgs',
      amount: 50000,
      currency: 'KGS',
      asOf: REFERENCE_TIMESTAMP_ISO,
      sourceType: 'user_reported',
      createdAt: REFERENCE_TIMESTAMP_ISO,
    },
  ];

  const accountSummaries = buildAccountSummaries(accounts, balances, []);
  const { currencySummaries, primaryCurrencySummary } = buildCurrencySummaries(
    accountSummaries,
    [],
    base.snapshot.obligations,
    'EUR'
  );

  return {
    snapshot: {
      ...base.snapshot,
      id: 'snap_multicurrency',
      accountSummaries,
      currencySummaries,
      primaryCurrencySummary,
      goalAllocations: [],
      dataQuality: {
        ...base.snapshot.dataQuality,
        totalAccounts: 3,
        accountsWithBalance: 3,
        multiCurrencyDetected: true,
        currencies: ['EUR', 'HUF', 'KGS'],
      },
    },
    extras: {
      referenceDateIso: REFERENCE_DATE_ISO,
      bufferFloor: 100,
      fxRates: {
        HUF: {
          base: 'EUR',
          target: 'HUF',
          rate: 400,
          rateDate: hufStatus === 'OK' ? '2026-11-03' : '2026-10-25',
          fetchedAt: REFERENCE_TIMESTAMP_ISO,
          status: hufStatus,
          source: 'Frankfurter ECB',
        },
        KGS: {
          base: 'EUR',
          target: 'KGS',
          rate: 0,
          rateDate: '2026-11-03',
          fetchedAt: REFERENCE_TIMESTAMP_ISO,
          status: 'UNAVAILABLE',
          source: 'Frankfurter ECB',
        },
      },
    },
  };
}

/**
 * 5. User with 0 active goals:
 */
export function createZeroGoalsFixture(): TestFixtureBundle {
  const base = createBaselineSolventFixture({ snapshotId: 'snap_zero_goals' });
  return {
    snapshot: {
      ...base.snapshot,
      id: 'snap_zero_goals',
      goals: [],
      goalAllocations: [],
      safetyCushionGoal: null,
      safetyCushionAllocated: 0,
      emergencyCoverageMonths: 0,
      emergencyCoverageDays: 0,
    },
    extras: base.extras,
  };
}

/**
 * 6. User with unknown debt APR or unknown due date:
 */
export function createUnknownDebtTermsFixture(options?: {
  missingApr?: boolean;
  missingDueDate?: boolean;
}): TestFixtureBundle {
  const base = createBaselineSolventFixture({ snapshotId: 'snap_unknown_debt' });
  const missingApr = options?.missingApr ?? true;
  const missingDueDate = options?.missingDueDate ?? false;

  const debt: DebtRecord = {
    ...base.snapshot.debts[0],
    id: 'debt_cc_unknown_terms',
    apr: missingApr ? null : 24.0,
    nextDueDate: missingDueDate ? null : '2026-11-18',
  };

  return {
    snapshot: {
      ...base.snapshot,
      id: 'snap_unknown_debt',
      debts: [debt],
    },
    extras: base.extras,
  };
}

/**
 * Helper to create a clean CandidateAction for testing ActionChecker
 */
export function createCandidateActionFixture(
  partial: Partial<CandidateAction> & { actionId: string }
): CandidateAction {
  return {
    candidateId: partial.candidateId || `cand_${partial.actionId}`,
    actionId: partial.actionId,
    actionType: partial.actionType || 'FINANCIAL_ACTION',
    title: partial.title || `Test candidate for ${partial.actionId}`,
    description: partial.description || `Description for ${partial.actionId}`,
    rationale: partial.rationale || `Rationale for ${partial.actionId}`,
    targetId: partial.targetId !== undefined ? partial.targetId : null,
    sourceAccountId:
      partial.sourceAccountId !== undefined ? partial.sourceAccountId : 'acc_checking_eur',
    destinationAccountId:
      partial.destinationAccountId !== undefined ? partial.destinationAccountId : null,
    amount: partial.amount !== undefined ? partial.amount : 100,
    currency: partial.currency || 'EUR',
    proposedTiming: partial.proposedTiming !== undefined ? partial.proposedTiming : '2026-11-03',
    supportingRuleIds: partial.supportingRuleIds || ['R001'],
    supportingClaimIds: partial.supportingClaimIds || ['C001'],
    supportingSourceIds: partial.supportingSourceIds || ['S001'],
    requiredPiInputs: partial.requiredPiInputs || [],
    origin: partial.origin || 'AI_SUGGESTION',
  };
}
