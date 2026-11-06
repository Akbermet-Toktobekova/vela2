import prototypePolicy from '../../server/config/prototype-policy.json';
import {
AccountCoverage,
AccountSummaryView,
CurrencyCashSummary,
FinancialSnapshot,
ReadinessState,
SpendingCategory,
TransactionClassification,
} from '../pi/types';
import { PIDatabaseSeed } from '../profile/seed';

export function buildFinancialSnapshot(
  state: PIDatabaseSeed,
  options?: { referenceNowIso?: string }
): FinancialSnapshot {
  const baseCurrency = state.profile.baseCurrency || 'EUR';
  const referenceNow = options?.referenceNowIso ? new Date(options.referenceNowIso) : new Date();
  if (!Number.isFinite(referenceNow.getTime())) throw new Error('Invalid snapshot reference time.');
  const nowIso = referenceNow.toISOString();
  const referenceNowMs = referenceNow.getTime();

  // Map classifications by transactionId
  const classificationsMap: Record<string, TransactionClassification> = {};
  for (const cls of state.classifications) {
    classificationsMap[cls.transactionId] = cls;
  }

  // 1. Build AccountSummaryView for each account
  const accountSummaries: AccountSummaryView[] = state.accounts.map((account) => {
    const balanceHistory = state.balances
      .filter((b) => b.accountId === account.id)
      .sort((a, b) => new Date(b.asOf).getTime() - new Date(a.asOf).getTime());

    const latestBalance = balanceHistory[0] || null;

    let isStale = false;
    if (latestBalance) {
      const observedAt = new Date(latestBalance.asOf).getTime();
      const ageDays = (referenceNowMs - observedAt) / (1000 * 60 * 60 * 24);
      const threshold = latestBalance.sourceType === 'statement_closing'
        ? prototypePolicy.horizonAndFreshness.statementClosingStaleThresholdDays
        : prototypePolicy.horizonAndFreshness.staleBalanceThresholdDays;
      isStale = !Number.isFinite(observedAt) || observedAt > referenceNowMs || ageDays > threshold;
    }

    // Personal accessible balance calculation (respecting work/business/mixed rules)
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
        // mixed or unknown
        personalAccessibleBalance =
          account.personalAvailableAmount !== null ? account.personalAvailableAmount : null;
      }
    }

    const allocatedToGoals = state.goalAllocations
      .filter((ga) => ga.accountId === account.id)
      .reduce((sum, ga) => sum + ga.amount, 0);

    const acctStatements = state.statements.filter(
      (s) =>
        s.accountId === account.id &&
        (s.status === 'parsed_successfully' || s.status === 'needs_review')
    );
    const acctTxns = state.transactions.filter((t) => t.accountId === account.id);

    let coverage: AccountCoverage | null = null;
    if (acctStatements.length > 0) {
      const starts = acctStatements
        .map((s) => s.periodStart)
        .filter((d): d is string => Boolean(d))
        .sort();
      const ends = acctStatements
        .map((s) => s.periodEnd)
        .filter((d): d is string => Boolean(d))
        .sort();

      if (starts.length > 0 && ends.length > 0) {
        const periodStart = starts[0];
        const periodEnd = ends[ends.length - 1];
        const daysCovered = Math.max(
          1,
          Math.round(
            (new Date(periodEnd).getTime() - new Date(periodStart).getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        );
        const monthsCovered = Math.max(1, Math.round(daysCovered / 28));
        coverage = {
          id: `cov_${account.id}`,
          accountId: account.id,
          periodStart,
          periodEnd,
          daysCovered,
          monthsCovered,
          completeness:
            monthsCovered >= 2
              ? 'multi_month'
              : daysCovered >= 25
              ? 'full_month'
              : 'partial',
        };
      }
    }

    return {
      account,
      latestBalance,
      balanceHistory,
      isStale,
      personalAccessibleBalance,
      allocatedToGoals,
      coverage,
      statementCount: acctStatements.length,
      transactionCount: acctTxns.length,
    };
  });

  // 2. Group cash by currency
  const currenciesSet = new Set<string>();
  state.accounts.forEach((a) => currenciesSet.add(a.currency));
  if (currenciesSet.size === 0) currenciesSet.add(baseCurrency);

  const upcomingUnpaidObligations = state.obligations
    .filter((o) => o.status === 'unpaid')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const overdueObligations = upcomingUnpaidObligations.filter(
    (o) => new Date(o.dueDate).getTime() < new Date(`${nowIso.slice(0, 10)}T00:00:00Z`).getTime()
  );

  const currencySummaries: CurrencyCashSummary[] = Array.from(currenciesSet).map((currency) => {
    const acctsInCurr = accountSummaries.filter((as) => as.account.currency === currency);
    let totalReportedBalance = 0;
    let personalAccessibleCash = 0;
    let hasWorkOrMixedUncertainty = false;
    let hasMissingBalances = false;

    for (const as of acctsInCurr) {
      if (as.latestBalance === null) {
        hasMissingBalances = true;
      } else {
        totalReportedBalance += as.latestBalance.amount;
      }

      if (as.personalAccessibleBalance !== null) {
        personalAccessibleCash += as.personalAccessibleBalance;
      } else if (as.latestBalance !== null) {
        hasWorkOrMixedUncertainty = true;
      }
    }

    const allocatedToGoals = state.goalAllocations
      .filter((ga) => ga.currency === currency)
      .reduce((sum, ga) => sum + ga.amount, 0);

    const unpaidInCurr = upcomingUnpaidObligations
      .filter((o) => o.currency === currency)
      .reduce((sum, o) => sum + o.amount, 0);

    const uncommittedSafeToSpend =
      personalAccessibleCash - allocatedToGoals - unpaidInCurr;

    return {
      currency,
      totalReportedBalance,
      personalAccessibleCash,
      allocatedToGoals,
      upcomingUnpaidObligations: unpaidInCurr,
      uncommittedSafeToSpend,
      hasWorkOrMixedUncertainty,
      hasMissingBalances,
    };
  });

  const primaryCurrencySummary =
    currencySummaries.find((cs) => cs.currency === baseCurrency) ||
    currencySummaries[0] || {
      currency: baseCurrency,
      totalReportedBalance: 0,
      personalAccessibleCash: 0,
      allocatedToGoals: 0,
      upcomingUnpaidObligations: 0,
      uncommittedSafeToSpend: 0,
      hasWorkOrMixedUncertainty: false,
      hasMissingBalances: true,
    };

  // 3. Income summaries
  const declaredMonthlyIncomeByCurrency: Record<string, number> = {};
  for (const inc of state.incomes) {
    if (inc.estimatedMonthlyAmount !== null && inc.estimatedMonthlyAmount > 0) {
      declaredMonthlyIncomeByCurrency[inc.currency] =
        (declaredMonthlyIncomeByCurrency[inc.currency] || 0) + inc.estimatedMonthlyAmount;
    }
  }

  // 4. Observed Transactions Analytics (in baseCurrency or primary imported currency)
  const observedInflowsByCurrency: Record<string, number> = {};
  let observedSpendingTotal = 0;
  let observedIncomeTotal = 0;
  let observedSubscriptionsTotal = 0;
  let observedInternalTransfersTotal = 0;
  let observedDebtPaymentsTotal = 0;
  let observedWorkMovementsTotal = 0;

  const spendingByCategory: Record<SpendingCategory, number> = {
    rent_housing: 0,
    utilities_energy: 0,
    internet_telecom: 0,
    groceries_food: 0,
    dining_coffee: 0,
    transport: 0,
    subscriptions: 0,
    shopping: 0,
    health: 0,
    education: 0,
    work_expense: 0,
    income: 0,
    transfer: 0,
    other: 0,
  };

  for (const txn of state.transactions) {
    const cls = classificationsMap[txn.id];
    const econType = cls ? cls.economicType : txn.amount >= 0 ? 'income' : 'expense';
    const cat = cls ? cls.category : txn.amount >= 0 ? 'income' : 'other';

    if (econType === 'internal_transfer' || econType === 'savings_allocation') {
      observedInternalTransfersTotal += Math.abs(txn.amount);
      continue; // Never count internal transfers as income or spending!
    }

    if (econType === 'work_business_movement') {
      observedWorkMovementsTotal += Math.abs(txn.amount);
      continue; // Keep work disbursements separate from personal lifestyle spending
    }

    if (econType === 'debt_payment') {
      observedDebtPaymentsTotal += Math.abs(txn.amount);
      continue;
    }

    if (econType === 'income') {
      observedInflowsByCurrency[txn.currency] =
        (observedInflowsByCurrency[txn.currency] || 0) + Math.abs(txn.amount);
      if (txn.currency === baseCurrency) {
        observedIncomeTotal += Math.abs(txn.amount);
      }
    } else if (econType === 'refund') {
      if (txn.currency === baseCurrency) {
        observedSpendingTotal = Math.max(0, observedSpendingTotal - Math.abs(txn.amount));
      }
    } else if (econType === 'expense' || econType === 'interest_fee' || econType === 'cash_withdrawal') {
      const absAmt = Math.abs(txn.amount);
      if (txn.currency === baseCurrency) {
        observedSpendingTotal += absAmt;
        spendingByCategory[cat] = (spendingByCategory[cat] || 0) + absAmt;
        if (cat === 'subscriptions') {
          observedSubscriptionsTotal += absAmt;
        }
      }
    }
  }

  // 5. Safety Cushion & Emergency Coverage
  const safetyCushionGoal =
    state.goals.find((g) => g.goalType === 'emergency_cushion') || state.goals[0] || null;

  const safetyCushionAllocated = safetyCushionGoal
    ? state.goalAllocations
        .filter((ga) => ga.goalId === safetyCushionGoal.id)
        .reduce((sum, ga) => sum + ga.amount, 0)
    : 0;

  let emergencyCoverageMonths: number | null = null;
  let emergencyCoverageDays: number | null = null;

  const essentialMonthly = state.expenseCommitment?.estimatedMonthlyAmount || null;
  if (essentialMonthly !== null && essentialMonthly > 0) {
    emergencyCoverageMonths = Number((safetyCushionAllocated / essentialMonthly).toFixed(2));
    emergencyCoverageDays = Number(((safetyCushionAllocated / essentialMonthly) * 30).toFixed(1));
  }

  // 6. Data Quality & Readiness Evaluation
  const accountsWithBalance = accountSummaries.filter((a) => a.latestBalance !== null).length;
  const accountsWithStatements = accountSummaries.filter((a) => a.statementCount > 0).length;
  const staleBalanceAccountIds = accountSummaries
    .filter((a) => a.isStale)
    .map((a) => a.account.id);
  const missingBalanceAccountIds = accountSummaries
    .filter((a) => a.latestBalance === null)
    .map((a) => a.account.id);

  const currencies = Array.from(currenciesSet);
  const multiCurrencyDetected = currencies.length > 1;

  const singleMonthWarning =
    accountsWithStatements > 0 &&
    accountSummaries.every((a) => !a.coverage || a.coverage.monthsCovered <= 1);

  let coverageStatus: 'none' | 'partial_single_month' | 'partial_multi_account' | 'complete' = 'none';
  if (accountsWithStatements === 0) {
    coverageStatus = 'none';
  } else if (accountsWithStatements < state.accounts.length) {
    coverageStatus = singleMonthWarning ? 'partial_single_month' : 'partial_multi_account';
  } else {
    coverageStatus = singleMonthWarning ? 'partial_single_month' : 'complete';
  }

  const missingFields: string[] = [];
  if (state.accounts.length === 0) missingFields.push('At least one bank account');
  if (accountsWithBalance === 0 && state.accounts.length > 0)
    missingFields.push('Reported account balance');
  if (state.incomes.length === 0) missingFields.push('Income source or pattern');
  if (!essentialMonthly) missingFields.push('Monthly essential expenses estimate');
  if (missingBalanceAccountIds.length > 0)
    missingFields.push(`Balance for ${missingBalanceAccountIds.length} account(s)`);
  if (state.debts.some((d) => d.remainingBalance === null))
    missingFields.push('Remaining balance on declared debt');

  const unresolvedConfirmations = state.confirmations.filter((c) => c.userResponse === null);

  let readinessState: ReadinessState = 'state_c_limited_data';
  let readinessReason =
    'Add at least one account balance and your essential commitments so Vela can evaluate a safe next step.';

  if (state.accounts.length > 0 && accountsWithBalance > 0) {
    if (unresolvedConfirmations.length > 0 || !essentialMonthly || staleBalanceAccountIds.length > 0) {
      readinessState = 'state_b_clarification_needed';
      readinessReason =
        staleBalanceAccountIds.length > 0
          ? 'Update stale account balances before relying on a monetary recommendation.'
          : unresolvedConfirmations.length > 0
            ? 'One transaction clarification will help sharpen your available cash picture.'
            : 'Confirm your monthly essentials before evaluating a monetary step.';
    } else if (
      primaryCurrencySummary.uncommittedSafeToSpend >= prototypePolicy.checkerFallbackPolicy.minimumAvailableCash &&
      (essentialMonthly !== null || state.obligations.length > 0)
    ) {
      readinessState = 'state_a_action_ready';
      readinessReason = `Verified ${primaryCurrencySummary.currency} ${primaryCurrencySummary.uncommittedSafeToSpend.toFixed(2)} uncommitted after obligations and protected funds.`;
    } else {
      readinessState = 'state_c_limited_data';
      readinessReason =
        'Your current uncommitted buffer is tight or covers upcoming obligations. Vela is monitoring your cashflow without forcing an allocation.';
    }
  }

  return {
    id: `snap_${referenceNowMs}`,
    userId: state.user.id,
    version: '1.0',
    createdAt: nowIso,
    baseCurrency,
    isDemoMode: state.user.isDemoMode,
    profile: state.profile,
    preferences: state.preferences,
    onboarding: state.onboarding,
    accountSummaries,
    currencySummaries,
    primaryCurrencySummary,
    incomeSources: state.incomes,
    declaredMonthlyIncomeByCurrency,
    observedInflowsByCurrency,
    essentialCommitment: state.expenseCommitment,
    obligations: state.obligations,
    upcomingUnpaidObligations,
    overdueObligations,
    debts: state.debts,
    goals: state.goals,
    goalAllocations: state.goalAllocations,
    safetyCushionGoal,
    safetyCushionAllocated,
    emergencyCoverageMonths,
    emergencyCoverageDays,
    statements: state.statements,
    transactions: state.transactions,
    classifications: classificationsMap,
    transferMatches: state.transferMatches,
    confirmations: state.confirmations,
    unresolvedConfirmations,
    observedSpendingTotal,
    observedIncomeTotal,
    observedSubscriptionsTotal,
    observedInternalTransfersTotal,
    observedDebtPaymentsTotal,
    observedWorkMovementsTotal,
    spendingByCategory,
    dataQuality: {
      totalAccounts: state.accounts.length,
      accountsWithBalance,
      accountsWithStatements,
      staleBalanceAccountIds,
      missingBalanceAccountIds,
      multiCurrencyDetected,
      currencies,
      singleMonthWarning,
      coverageStatus,
      missingFields,
    },
    readinessState,
    readinessReason,
  };
}

