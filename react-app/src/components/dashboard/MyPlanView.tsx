import React, { useState, useMemo } from 'react';
import { usePI } from '../../context/PIContext';
import { FinancialGoal, DebtRecord, SpendingCategory } from '../../types/pi';
import { formatCurrency } from '../../services/snapshotBuilder';
import {
  StatementUploadModal,
  TransactionReviewModal,
} from '../modals/QuickActionModals';

const CATEGORY_META: Record<
  SpendingCategory,
  { label: string; color: string }
> = {
  rent_housing: { label: 'Housing & Rent', color: '#386641' },
  groceries_food: { label: 'Groceries & Food', color: '#6a994e' },
  utilities_energy: { label: 'Utilities & Energy', color: '#a7c957' },
  internet_telecom: { label: 'Internet & Mobile', color: '#52796f' },
  transport: { label: 'Transport & Transit', color: '#84a98c' },
  dining_coffee: { label: 'Dining & Coffee', color: '#bc6c25' },
  subscriptions: { label: 'Subscriptions', color: '#dda15e' },
  shopping: { label: 'Shopping', color: '#9c6644' },
  health: { label: 'Health & Wellness', color: '#457b9d' },
  education: { label: 'Education', color: '#6d597a' },
  work_expense: { label: 'Work Expense', color: '#8d99ae' },
  income: { label: 'Income', color: '#2a9d8f' },
  transfer: { label: 'Transfers', color: '#adb5bd' },
  other: { label: 'Other Spending', color: '#74766d' },
};

export const MyPlanView: React.FC = () => {
  const {
    snapshot,
    saveEssentialExpenses,
    saveGoal,
    deleteGoal,
    allocateFundsToGoal,
    saveDebt,
    deleteDebt,
  } = usePI();

  const [cashFlowPeriod, setCashFlowPeriod] = useState<'oct_2026' | 'monthly_plan' | 'all_time'>(
    'oct_2026'
  );
  const [selectedSimGoalId, setSelectedSimGoalId] = useState<string>(
    snapshot.safetyCushionGoal?.id || snapshot.goals[0]?.id || ''
  );
  const [monthlyContribution, setMonthlyContribution] = useState<number>(80);

  // Modals
  const [showEssentialsModal, setShowEssentialsModal] = useState(false);
  const [essentialsAmount, setEssentialsAmount] = useState<string>(
    snapshot.essentialCommitment?.estimatedMonthlyAmount?.toString() || '935'
  );
  const [essentialsNotes, setEssentialsNotes] = useState<string>(
    snapshot.essentialCommitment?.notes || 'Rent, electricity, internet, basic groceries'
  );

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null);
  const [goalName, setGoalName] = useState('');
  const [goalType, setGoalType] = useState<FinancialGoal['goalType']>('emergency_cushion');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDate, setGoalDate] = useState('');

  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [allocatingGoal, setAllocatingGoal] = useState<FinancialGoal | null>(null);
  const [allocateAmount, setAllocateAmount] = useState('25');
  const [allocateAccountId, setAllocateAccountId] = useState(
    snapshot.accountSummaries.find((a) => a.account.isPrimary)?.account.id ||
      snapshot.accountSummaries[0]?.account.id ||
      ''
  );

  const [showDebtModal, setShowDebtModal] = useState(false);
  const [editingDebt, setEditingDebt] = useState<DebtRecord | null>(null);
  const [debtName, setDebtName] = useState('');
  const [debtType, setDebtType] = useState<DebtRecord['debtType']>('credit_card');
  const [debtBalanceUnknown, setDebtBalanceUnknown] = useState(false);
  const [debtBalance, setDebtBalance] = useState('');
  const [debtMinPayment, setDebtMinPayment] = useState('');
  const [debtApr, setDebtApr] = useState('');
  const [debtDueDate, setDebtDueDate] = useState('2026-11-15');

  const [statementModalOpen, setStatementModalOpen] = useState(false);
  const [txReviewModalOpen, setTxReviewModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<SpendingCategory | null>(
    null
  );

  // A. Safety Cushion Calculations
  const safetyGoal = snapshot.safetyCushionGoal || snapshot.goals[0] || null;
  const cushionAllocated = snapshot.safetyCushionAllocated;
  const cushionTarget = safetyGoal?.targetAmount ?? null;
  const cushionPercent =
    cushionTarget && cushionTarget > 0
      ? Math.min(100, Math.round((cushionAllocated / cushionTarget) * 100))
      : 0;

  const essentialMonthly = snapshot.essentialCommitment?.estimatedMonthlyAmount ?? null;

  // B. Cash Flow Metrics by Period
  const cashFlowMetrics = useMemo(() => {
    const essentialCats: SpendingCategory[] = [
      'rent_housing',
      'utilities_energy',
      'internet_telecom',
      'groceries_food',
    ];
    const observedEssential = essentialCats.reduce(
      (acc, cat) => acc + (snapshot.spendingByCategory[cat] || 0),
      0
    );
    const observedOther = Math.max(0, snapshot.observedSpendingTotal - observedEssential);
    const debtMinTotal = snapshot.debts.reduce(
      (acc, d) => acc + (d.minimumPayment || 0),
      0
    );

    if (cashFlowPeriod === 'monthly_plan') {
      const declaredIncome =
        snapshot.declaredMonthlyIncomeByCurrency[snapshot.baseCurrency] || 1320;
      const plannedEss = essentialMonthly ?? observedEssential;
      return {
        label: 'Declared Monthly Plan',
        income: declaredIncome,
        essentialSpending: plannedEss,
        otherSpending: observedOther,
        debtServicing: Math.max(snapshot.observedDebtPaymentsTotal, debtMinTotal),
        internalTransfers: snapshot.observedInternalTransfersTotal,
        goalAllocations: cushionAllocated,
      };
    }

    return {
      label:
        cashFlowPeriod === 'oct_2026'
          ? 'Oct 2026 (Verified CSV)'
          : 'All Imported Statements',
      income:
        snapshot.observedIncomeTotal ||
        snapshot.declaredMonthlyIncomeByCurrency[snapshot.baseCurrency] ||
        0,
      essentialSpending: observedEssential,
      otherSpending: observedOther,
      debtServicing: Math.max(snapshot.observedDebtPaymentsTotal, debtMinTotal),
      internalTransfers: snapshot.observedInternalTransfersTotal,
      goalAllocations: cushionAllocated,
    };
  }, [cashFlowPeriod, snapshot, essentialMonthly, cushionAllocated]);

  const maxBarValue = Math.max(
    1,
    cashFlowMetrics.income,
    cashFlowMetrics.essentialSpending + cashFlowMetrics.otherSpending,
    cashFlowMetrics.internalTransfers
  );

  // C. Donut Chart Slices
  const donutSlices = useMemo(() => {
    const entries = (Object.entries(snapshot.spendingByCategory) as [
      SpendingCategory,
      number
    ][])
      .filter(
        ([cat, val]) =>
          val > 0 && cat !== 'income' && cat !== 'transfer' && cat !== 'work_expense'
      )
      .sort((a, b) => b[1] - a[1]);

    const total = entries.reduce((sum, [, val]) => sum + val, 0);
    if (total <= 0) return { slices: [], total: 0 };

    let cumulativePercent = 0;
    const slices = entries.map(([cat, amount]) => {
      const pct = (amount / total) * 100;
      const startPercent = cumulativePercent;
      cumulativePercent += pct;
      return {
        category: cat,
        label: CATEGORY_META[cat]?.label || cat,
        color: CATEGORY_META[cat]?.color || '#386641',
        amount,
        percentage: pct,
        startPercent,
      };
    });

    return { slices, total };
  }, [snapshot.spendingByCategory]);

  // D. Simulator Target Goal
  const simGoal =
    snapshot.goals.find((g) => g.id === selectedSimGoalId) ||
    safetyGoal ||
    snapshot.goals[0] ||
    null;

  const simAllocated = useMemo(() => {
    if (!simGoal) return 0;
    return snapshot.goalAllocations
      .filter((a) => a.goalId === simGoal.id)
      .reduce((s, a) => s + a.amount, 0);
  }, [simGoal, snapshot.goalAllocations]);

  const simTarget = simGoal?.targetAmount ?? null;
  const simRemaining =
    simTarget !== null ? Math.max(0, simTarget - simAllocated) : null;
  const simMonths =
    simRemaining !== null && simRemaining > 0 && monthlyContribution > 0
      ? Math.ceil(simRemaining / monthlyContribution)
      : simRemaining === 0
      ? 0
      : null;

  // Handlers
  const handleSaveEssentials = (e: React.FormEvent) => {
    e.preventDefault();
    const num = essentialsAmount.trim() === '' ? null : Number(essentialsAmount);
    saveEssentialExpenses(
      num !== null && !Number.isNaN(num) ? num : null,
      snapshot.baseCurrency,
      essentialsNotes
    );
    setShowEssentialsModal(false);
  };

  const openAddGoal = () => {
    setEditingGoal(null);
    setGoalName('');
    setGoalType('specific_purchase');
    setGoalTarget('500');
    setGoalDate('2027-06-01');
    setShowGoalModal(true);
  };

  const openEditGoal = (g: FinancialGoal) => {
    setEditingGoal(g);
    setGoalName(g.name);
    setGoalType(g.goalType);
    setGoalTarget(g.targetAmount !== null ? g.targetAmount.toString() : '');
    setGoalDate(g.targetDate || '');
    setShowGoalModal(true);
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName.trim()) return;
    const tAmount = goalTarget.trim() === '' ? null : Number(goalTarget);
    saveGoal({
      id: editingGoal?.id,
      name: goalName.trim(),
      goalType,
      targetAmount: tAmount !== null && !Number.isNaN(tAmount) ? tAmount : null,
      currency: snapshot.baseCurrency,
      targetDate: goalDate.trim() || null,
      priority: goalType === 'emergency_cushion' ? 'high' : 'medium',
    });
    setShowGoalModal(false);
  };

  const handleSaveGoalAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocatingGoal || !allocateAccountId) return;
    const amt = Number(allocateAmount);
    if (Number.isNaN(amt) || amt <= 0) return;
    allocateFundsToGoal(
      allocatingGoal.id,
      allocateAccountId,
      amt,
      `Manual allocation to ${allocatingGoal.name}`
    );
    setShowAllocateModal(false);
  };

  const openAddDebt = () => {
    setEditingDebt(null);
    setDebtName('');
    setDebtType('credit_card');
    setDebtBalanceUnknown(false);
    setDebtBalance('');
    setDebtMinPayment('');
    setDebtApr('');
    setDebtDueDate('2026-11-15');
    setShowDebtModal(true);
  };

  const openEditDebt = (d: DebtRecord) => {
    setEditingDebt(d);
    setDebtName(d.name);
    setDebtType(d.debtType);
    setDebtBalanceUnknown(d.remainingBalance === null);
    setDebtBalance(d.remainingBalance !== null ? d.remainingBalance.toString() : '');
    setDebtMinPayment(
      d.minimumPayment !== null ? d.minimumPayment.toString() : ''
    );
    setDebtApr(d.apr !== null ? d.apr.toString() : '');
    setDebtDueDate(d.nextDueDate || '2026-11-15');
    setShowDebtModal(true);
  };

  const handleSaveDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtName.trim()) return;
    const bal =
      debtBalanceUnknown || debtBalance.trim() === '' ? null : Number(debtBalance);
    const minP = debtMinPayment.trim() === '' ? null : Number(debtMinPayment);
    const aprVal = debtApr.trim() === '' ? null : Number(debtApr);
    saveDebt({
      id: editingDebt?.id,
      name: debtName.trim(),
      debtType,
      remainingBalance: bal !== null && !Number.isNaN(bal) ? bal : null,
      currency: snapshot.baseCurrency,
      minimumPayment: minP !== null && !Number.isNaN(minP) ? minP : null,
      apr: aprVal !== null && !Number.isNaN(aprVal) ? aprVal : null,
      nextDueDate: debtDueDate || null,
      paymentFrequency: 'monthly',
    });
    setShowDebtModal(false);
  };

  // SVG Donut Helper
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="space-y-4 pb-6">
      {/* SECTION A: SAFETY CUSHION & EMERGENCY COVERAGE CARD */}
      <section className="glass-card recommendation-card rounded-[24px] p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="eyebrow block">Safety Cushion</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[28px] leading-[34px] font-bold tracking-[-0.7px] text-[#272e23]">
                {formatCurrency(cushionAllocated, snapshot.baseCurrency)}
              </span>
              <span className="text-[13px] font-medium text-[#74766d]">
                of{' '}
                {cushionTarget !== null
                  ? formatCurrency(cushionTarget, snapshot.baseCurrency)
                  : 'No target set'}
              </span>
            </div>
          </div>

          {safetyGoal && (
            <button
              type="button"
              onClick={() => openEditGoal(safetyGoal)}
              className="secondary-action rounded-xl px-2.5 py-1.5 text-[11px] font-semibold"
            >
              Edit Target
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-semibold text-[#272e23] mb-1">
            <span>{cushionPercent}% funded</span>
            <span className="text-[#386641]">
              {cushionTarget !== null
                ? `${formatCurrency(
                    Math.max(0, cushionTarget - cushionAllocated),
                    snapshot.baseCurrency
                  )} to go`
                : 'Flexible goal'}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/60 border border-white/80">
            <div
              className="h-full rounded-full bg-[#386641] transition-all duration-500"
              style={{ width: `${Math.max(4, cushionPercent)}%` }}
            />
          </div>
        </div>

        {/* Emergency Coverage Formula Box */}
        <div className="mt-3.5 rounded-[16px] bg-white/55 p-3 border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#272e23]">
              Emergency Coverage
            </span>
            <button
              type="button"
              onClick={() => setShowEssentialsModal(true)}
              className="text-[10px] font-semibold text-[#386641] hover:underline"
            >
              {essentialMonthly ? `Essentials: €${essentialMonthly}/mo (Edit)` : '+ Set essentials'}
            </button>
          </div>

          {snapshot.emergencyCoverageDays !== null &&
          snapshot.emergencyCoverageMonths !== null &&
          essentialMonthly ? (
            <div className="mt-1">
              <p className="text-[15px] font-bold text-[#386641]">
                {snapshot.emergencyCoverageDays} days ({snapshot.emergencyCoverageMonths} months) of essential expenses
              </p>
              <p className="mt-0.5 text-[11px] text-[#74766d]">
                Calculated as €{cushionAllocated} cushion ÷ €{essentialMonthly}/mo essential costs.
              </p>
            </div>
          ) : (
            <div className="mt-1 flex items-center justify-between">
              <p className="text-[11px] text-[#74766d]">
                Coverage unavailable until monthly essential expenses are set.
              </p>
              <button
                type="button"
                onClick={() => setShowEssentialsModal(true)}
                className="primary-action rounded-lg px-2.5 py-1 text-[10px] font-semibold"
              >
                Set Now
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION B: CASH FLOW CHART (INCOME VS SPENDING VS TRANSFERS) */}
      <section className="glass-card rounded-[24px] p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="eyebrow block">Cash Flow Breakdown</span>
            <h2 className="mt-0.5 text-[16px] font-bold text-[#272e23]">
              {cashFlowMetrics.label}
            </h2>
          </div>

          <div className="flex rounded-xl bg-white/50 p-0.5 border border-white/80 text-[10px] font-semibold">
            <button
              type="button"
              onClick={() => setCashFlowPeriod('oct_2026')}
              className={`rounded-lg px-2 py-1 transition ${
                cashFlowPeriod === 'oct_2026'
                  ? 'bg-white text-[#272e23] shadow-2xs'
                  : 'text-[#74766d]'
              }`}
            >
              Oct CSV
            </button>
            <button
              type="button"
              onClick={() => setCashFlowPeriod('monthly_plan')}
              className={`rounded-lg px-2 py-1 transition ${
                cashFlowPeriod === 'monthly_plan'
                  ? 'bg-white text-[#272e23] shadow-2xs'
                  : 'text-[#74766d]'
              }`}
            >
              Planned
            </button>
            <button
              type="button"
              onClick={() => setCashFlowPeriod('all_time')}
              className={`rounded-lg px-2 py-1 transition ${
                cashFlowPeriod === 'all_time'
                  ? 'bg-white text-[#272e23] shadow-2xs'
                  : 'text-[#74766d]'
              }`}
            >
              All Data
            </button>
          </div>
        </div>

        {/* Coverage limitation badge */}
        <div className="mt-2 rounded-xl bg-white/45 px-3 py-1.5 text-[10px] text-[#74766d] border border-white/70">
          Coverage: {snapshot.dataQuality.accountsWithStatements} of{' '}
          {snapshot.dataQuality.totalAccounts} accounts have uploaded CSV statements. Internal
          transfers are separated from spending.
        </div>

        {/* Horizontal Bars */}
        <div className="mt-4 space-y-3">
          {/* 1. Identified Income */}
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#272e23]">Identified Income</span>
              <span className="font-bold text-[#386641]">
                {formatCurrency(cashFlowMetrics.income, snapshot.baseCurrency)}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-white/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#386641] transition-all duration-500"
                style={{
                  width: `${Math.min(100, (cashFlowMetrics.income / maxBarValue) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* 2. Essential Spending */}
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#272e23]">Essential Spending</span>
              <span className="font-bold text-[#272e23]">
                {formatCurrency(cashFlowMetrics.essentialSpending, snapshot.baseCurrency)}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-white/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#6a994e] transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (cashFlowMetrics.essentialSpending / maxBarValue) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* 3. Other Lifestyle Spending */}
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#272e23]">Other Lifestyle Spending</span>
              <span className="font-bold text-[#272e23]">
                {formatCurrency(cashFlowMetrics.otherSpending, snapshot.baseCurrency)}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-white/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#bc6c25] transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (cashFlowMetrics.otherSpending / maxBarValue) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* 4. Debt Servicing */}
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#272e23]">Debt Servicing (Min Payments)</span>
              <span className="font-bold text-[#272e23]">
                {formatCurrency(cashFlowMetrics.debtServicing, snapshot.baseCurrency)}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-white/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#9c6644] transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (cashFlowMetrics.debtServicing / maxBarValue) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* 5. Internal Transfers (Excluded from Spend) */}
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#74766d]">
                Internal Transfers (Excluded from spend)
              </span>
              <span className="font-semibold text-[#74766d]">
                {formatCurrency(cashFlowMetrics.internalTransfers, snapshot.baseCurrency)}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-stone-400 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (cashFlowMetrics.internalTransfers / maxBarValue) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* 6. Goal Allocations */}
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#386641]">Earmarked for Goals</span>
              <span className="font-bold text-[#386641]">
                {formatCurrency(cashFlowMetrics.goalAllocations, snapshot.baseCurrency)}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#386641]/70 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (cashFlowMetrics.goalAllocations / maxBarValue) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: DONUT SPENDING CHART FROM REAL TRANSACTIONS */}
      <section className="glass-card rounded-[24px] p-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="eyebrow block">Verified Spending Categories</span>
            <h2 className="mt-0.5 text-[16px] font-bold text-[#272e23]">
              Where your money went
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryFilter(null);
              setTxReviewModalOpen(true);
            }}
            className="secondary-action rounded-xl px-2.5 py-1.5 text-[11px] font-semibold"
          >
            Review All ({snapshot.transactions.length})
          </button>
        </div>

        {donutSlices.total <= 0 ? (
          <div className="mt-4 rounded-[18px] bg-white/45 p-5 text-center border border-white/75">
            <p className="text-[13px] font-semibold text-[#272e23]">
              No categorized spending transactions yet
            </p>
            <p className="mt-1 text-[11px] text-[#74766d]">
              Upload a CSV bank statement to see your real spending breakdown by category.
            </p>
            <button
              type="button"
              onClick={() => setStatementModalOpen(true)}
              className="primary-action mt-3 rounded-xl px-4 py-2 text-[12px] font-semibold"
            >
              Upload Statement CSV
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex items-center gap-4">
              {/* SVG Donut */}
              <div className="relative flex h-[132px] w-[132px] shrink-0 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="16"
                  />
                  {donutSlices.slices.map((slice) => {
                    const strokeDasharray = `${
                      (slice.percentage / 100) * circumference
                    } ${circumference}`;
                    const strokeDashoffset = -(
                      (slice.startPercent / 100) *
                      circumference
                    );
                    return (
                      <circle
                        key={slice.category}
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="transparent"
                        stroke={slice.color}
                        strokeWidth="16"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="cursor-pointer transition-opacity hover:opacity-80"
                        onClick={() => {
                          setSelectedCategoryFilter(slice.category);
                          setTxReviewModalOpen(true);
                        }}
                      />
                    );
                  })}
                </svg>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-semibold uppercase text-[#74766d]">
                    Total Spend
                  </span>
                  <span className="text-[15px] font-bold text-[#272e23]">
                    {formatCurrency(donutSlices.total, snapshot.baseCurrency)}
                  </span>
                </div>
              </div>

              {/* Category Legend List */}
              <div className="flex-1 space-y-1.5">
                {donutSlices.slices.map((slice) => (
                  <button
                    key={slice.category}
                    type="button"
                    onClick={() => {
                      setSelectedCategoryFilter(slice.category);
                      setTxReviewModalOpen(true);
                    }}
                    className="flex w-full items-center justify-between rounded-xl bg-white/45 px-2.5 py-1.5 text-left transition hover:bg-white/80 border border-white/70"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: slice.color }}
                      />
                      <span className="truncate text-[11px] font-semibold text-[#272e23]">
                        {slice.label}
                      </span>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span className="text-[11px] font-bold text-[#272e23]">
                        {formatCurrency(slice.amount, snapshot.baseCurrency)}
                      </span>
                      <span className="ml-1 text-[10px] text-[#74766d]">
                        ({Math.round(slice.percentage)}%)
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2.5 text-[10px] text-[#74766d] text-center">
              Tap any category slice or row to inspect or re-classify its transactions.
            </p>
          </div>
        )}
      </section>

      {/* SECTION D: INTERACTIVE SAVINGS SIMULATOR */}
      <section className="glass-card rounded-[24px] p-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="eyebrow block">Interactive Simulator</span>
            <h2 className="mt-0.5 text-[16px] font-bold text-[#272e23]">
              Goal Timeline Calculator
            </h2>
          </div>

          {snapshot.goals.length > 1 && (
            <select
              value={simGoal?.id || ''}
              onChange={(e) => setSelectedSimGoalId(e.target.value)}
              className="rounded-xl bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-[#272e23] border border-white"
            >
              {snapshot.goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {simGoal ? (
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between rounded-[14px] bg-white/50 px-3.5 py-2.5 border border-white/80">
              <div>
                <span className="block text-[10px] text-[#74766d]">Selected Goal</span>
                <span className="text-[13px] font-bold text-[#272e23]">{simGoal.name}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-[#74766d]">Allocated / Target</span>
                <span className="text-[13px] font-bold text-[#386641]">
                  {formatCurrency(simAllocated, simGoal.currency)} /{' '}
                  {simTarget !== null
                    ? formatCurrency(simTarget, simGoal.currency)
                    : 'Not set'}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="sim-slider"
                  className="text-[12px] font-medium text-[#74766d]"
                >
                  If you set aside each month:
                </label>
                <span className="text-[18px] font-bold text-[#386641]">
                  €{monthlyContribution}/mo
                </span>
              </div>
              <input
                id="sim-slider"
                type="range"
                min={0}
                max={400}
                step={10}
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="mt-2 w-full accent-[#386641]"
              />
              <div className="flex justify-between text-[10px] text-[#74766d]">
                <span>€0/mo</span>
                <span>€100/mo</span>
                <span>€250/mo</span>
                <span>€400/mo</span>
              </div>
            </div>

            <div className="rounded-[16px] bg-[#386641]/10 p-3.5 border border-[#386641]/25">
              {simTarget === null ? (
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-[#272e23]">
                    This goal has no target amount yet. Set a target to calculate months to completion.
                  </p>
                  <button
                    type="button"
                    onClick={() => openEditGoal(simGoal)}
                    className="primary-action rounded-xl px-3 py-1.5 text-[11px] font-semibold shrink-0 ml-2"
                  >
                    Set Target
                  </button>
                </div>
              ) : simRemaining === 0 ? (
                <p className="text-[13px] font-bold text-[#386641]">
                  🎉 Goal reached! You have already allocated{' '}
                  {formatCurrency(simAllocated, simGoal.currency)}.
                </p>
              ) : monthlyContribution <= 0 ? (
                <p className="text-[12px] font-medium text-[#74766d]">
                  Move the slider above €0/month to see how quickly you will reach{' '}
                  {formatCurrency(simTarget, simGoal.currency)}.
                </p>
              ) : (
                <div>
                  <p className="text-[14px] font-bold text-[#272e23]">
                    Reached in{' '}
                    <span className="text-[#386641]">
                      {simMonths} {simMonths === 1 ? 'month' : 'months'}
                    </span>{' '}
                    ({formatCurrency(simRemaining || 0, simGoal.currency)} remaining)
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#74766d]">
                    At €{monthlyContribution}/month, your {simGoal.name} will be 100% funded by{' '}
                    {new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + (simMonths || 1),
                      1
                    ).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-2 text-[12px] text-[#74766d]">
            Add a goal below to use the savings simulator.
          </p>
        )}
      </section>

      {/* SECTION E: GOALS & DEBTS MANAGEMENT */}
      <section className="glass-card rounded-[24px] p-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="eyebrow block">Goals & Allocations</span>
            <h2 className="mt-0.5 text-[16px] font-bold text-[#272e23]">
              Your Financial Goals
            </h2>
          </div>
          <button
            type="button"
            onClick={openAddGoal}
            className="secondary-action rounded-xl px-2.5 py-1.5 text-[11px] font-semibold"
          >
            + Add Goal
          </button>
        </div>

        <div className="mt-3 space-y-2.5">
          {snapshot.goals.map((g) => {
            const allocated = snapshot.goalAllocations
              .filter((a) => a.goalId === g.id)
              .reduce((s, a) => s + a.amount, 0);
            return (
              <div
                key={g.id}
                className="rounded-[16px] bg-white/50 p-3.5 border border-white/80"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-bold text-[#272e23]">{g.name}</p>
                    <p className="text-[11px] text-[#74766d]">
                      Allocated:{' '}
                      <strong className="text-[#386641]">
                        {formatCurrency(allocated, g.currency)}
                      </strong>
                      {g.targetAmount !== null
                        ? ` of ${formatCurrency(g.targetAmount, g.currency)}`
                        : ' (Flexible target)'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setAllocatingGoal(g);
                        setAllocateAmount('25');
                        setShowAllocateModal(true);
                      }}
                      className="primary-action rounded-xl px-2.5 py-1 text-[10px] font-semibold"
                    >
                      + Earmark
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditGoal(g)}
                      className="secondary-action rounded-xl px-2.5 py-1 text-[10px] font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DEBTS SUBSECTION */}
        <div className="mt-5 border-t border-black/8 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow block">Debts & Credit</span>
              <h3 className="mt-0.5 text-[15px] font-bold text-[#272e23]">
                Tracked Balances & Minimums
              </h3>
            </div>
            <button
              type="button"
              onClick={openAddDebt}
              className="secondary-action rounded-xl px-2.5 py-1.5 text-[11px] font-semibold"
            >
              + Add Debt
            </button>
          </div>

          {snapshot.debts.length === 0 ? (
            <p className="mt-2 text-[12px] text-[#74766d]">
              No debts recorded. Tap "+ Add Debt" if you track a credit card, loan, or overdraft.
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {snapshot.debts.map((d) => (
                <div
                  key={d.id}
                  onClick={() => openEditDebt(d)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openEditDebt(d);
                  }}
                  className="flex items-center justify-between rounded-[16px] bg-white/50 px-3.5 py-3 border border-white/80 cursor-pointer hover:bg-white/75"
                >
                  <div>
                    <p className="text-[13px] font-bold text-[#272e23]">{d.name}</p>
                    <p className="text-[11px] text-[#74766d]">
                      Min payment:{' '}
                      {d.minimumPayment !== null
                        ? `${formatCurrency(d.minimumPayment, d.currency)}/mo`
                        : 'Not set'}
                      {d.apr !== null ? ` · ${d.apr}% APR` : ''}
                      {d.nextDueDate ? ` · Due ${d.nextDueDate}` : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[13px] font-bold text-[#272e23]">
                      {d.remainingBalance !== null
                        ? formatCurrency(d.remainingBalance, d.currency)
                        : 'Balance unknown'}
                    </span>
                    <span className="text-[10px] font-semibold text-[#386641]">Edit</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL: EDIT ESSENTIAL EXPENSES */}
      {showEssentialsModal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEssentialsModal(false);
          }}
        >
          <div className="modal-sheet-container p-5">
            <div className="sheet-handle-bar" />
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">Essential Monthly Costs</span>
              <button
                type="button"
                onClick={() => setShowEssentialsModal(false)}
                className="text-xs font-semibold text-[#74766d]"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleSaveEssentials} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Estimated monthly essentials ({snapshot.baseCurrency})
                </label>
                <input
                  type="number"
                  step="any"
                  value={essentialsAmount}
                  onChange={(e) => setEssentialsAmount(e.target.value)}
                  placeholder="e.g. 935"
                  className="vela-input"
                />
                <p className="mt-1 text-[10px] text-[#74766d]">
                  Used as the denominator to calculate how many days/months your Safety Cushion covers.
                </p>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  What does this include?
                </label>
                <input
                  type="text"
                  value={essentialsNotes}
                  onChange={(e) => setEssentialsNotes(e.target.value)}
                  className="vela-input"
                />
              </div>
              <button
                type="submit"
                className="primary-action w-full rounded-[16px] py-3 text-[13px] font-semibold"
              >
                Save Essential Expenses
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT GOAL */}
      {showGoalModal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowGoalModal(false);
          }}
        >
          <div className="modal-sheet-container p-5">
            <div className="sheet-handle-bar" />
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">
                {editingGoal ? 'Edit Financial Goal' : 'New Financial Goal'}
              </span>
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className="text-xs font-semibold text-[#74766d]"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleSaveGoal} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Goal Name
                </label>
                <input
                  type="text"
                  required
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g. Safety Cushion or New Laptop"
                  className="vela-input"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Goal Type
                </label>
                <select
                  value={goalType}
                  onChange={(e) => setGoalType(e.target.value as FinancialGoal['goalType'])}
                  className="vela-input"
                >
                  <option value="emergency_cushion">Safety / Emergency Cushion</option>
                  <option value="specific_purchase">Specific Purchase</option>
                  <option value="debt_paydown">Debt Paydown</option>
                  <option value="general_savings">General Savings</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Target Amount ({snapshot.baseCurrency}) — leave blank if flexible
                </label>
                <input
                  type="number"
                  step="any"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  placeholder="e.g. 1000"
                  className="vela-input"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Target Date (Optional)
                </label>
                <input
                  type="date"
                  value={goalDate}
                  onChange={(e) => setGoalDate(e.target.value)}
                  className="vela-input"
                />
              </div>
              <div className="flex gap-2 pt-2">
                {editingGoal && (
                  <button
                    type="button"
                    onClick={() => {
                      deleteGoal(editingGoal.id);
                      setShowGoalModal(false);
                    }}
                    className="secondary-action rounded-[16px] px-4 py-3 text-[12px] font-semibold text-red-700"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="primary-action flex-1 rounded-[16px] py-3 text-[13px] font-semibold"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EARMARK EXISTING FUNDS TO GOAL */}
      {showAllocateModal && allocatingGoal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAllocateModal(false);
          }}
        >
          <div className="modal-sheet-container p-5">
            <div className="sheet-handle-bar" />
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">Earmark Existing Cash</span>
              <button
                type="button"
                onClick={() => setShowAllocateModal(false)}
                className="text-xs font-semibold text-[#74766d]"
              >
                Close
              </button>
            </div>
            <h3 className="text-[16px] font-bold text-[#272e23]">
              Set aside cash for {allocatingGoal.name}
            </h3>
            <p className="mt-1 text-[11px] text-[#74766d]">
              This is an internal Vela planning allocation. It reserves part of your existing bank balance without creating fake money.
            </p>
            <form onSubmit={handleSaveGoalAllocation} className="mt-3 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Amount ({allocatingGoal.currency})
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  step="any"
                  value={allocateAmount}
                  onChange={(e) => setAllocateAmount(e.target.value)}
                  className="vela-input"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Earmark from Account
                </label>
                <select
                  value={allocateAccountId}
                  onChange={(e) => setAllocateAccountId(e.target.value)}
                  className="vela-input"
                >
                  {snapshot.accountSummaries.map((a) => (
                    <option key={a.account.id} value={a.account.id}>
                      {a.account.institution} · {a.account.name} (
                      {formatCurrency(a.personalAccessibleBalance ?? 0, a.account.currency)})
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="primary-action w-full rounded-[16px] py-3 text-[13px] font-semibold"
              >
                Confirm Earmark
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT DEBT */}
      {showDebtModal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDebtModal(false);
          }}
        >
          <div className="modal-sheet-container p-5">
            <div className="sheet-handle-bar" />
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">
                {editingDebt ? 'Edit Debt / Credit' : 'Add Debt / Credit'}
              </span>
              <button
                type="button"
                onClick={() => setShowDebtModal(false)}
                className="text-xs font-semibold text-[#74766d]"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleSaveDebt} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={debtName}
                    onChange={(e) => setDebtName(e.target.value)}
                    placeholder="Visa Credit Card"
                    className="vela-input"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                    Debt Type
                  </label>
                  <select
                    value={debtType}
                    onChange={(e) => setDebtType(e.target.value as DebtRecord['debtType'])}
                    className="vela-input"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="student_loan">Student Loan</option>
                    <option value="personal_loan">Personal Loan</option>
                    <option value="overdraft">Overdraft</option>
                    <option value="family_loan">Family / Friend Loan</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="debt-unknown-chk"
                  type="checkbox"
                  checked={debtBalanceUnknown}
                  onChange={(e) => setDebtBalanceUnknown(e.target.checked)}
                />
                <label htmlFor="debt-unknown-chk" className="text-[11px] text-[#272e23]">
                  I don't know the exact total balance right now
                </label>
              </div>

              {!debtBalanceUnknown && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                    Current Balance ({snapshot.baseCurrency})
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={debtBalance}
                    onChange={(e) => setDebtBalance(e.target.value)}
                    placeholder="450"
                    className="vela-input"
                  />
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                    Min Payment
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={debtMinPayment}
                    onChange={(e) => setDebtMinPayment(e.target.value)}
                    placeholder="35"
                    className="vela-input"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                    APR %
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={debtApr}
                    onChange={(e) => setDebtApr(e.target.value)}
                    placeholder="18.9"
                    className="vela-input"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                    Next Due Date
                  </label>
                  <input
                    type="date"
                    value={debtDueDate}
                    onChange={(e) => setDebtDueDate(e.target.value)}
                    className="vela-input text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {editingDebt && (
                  <button
                    type="button"
                    onClick={() => {
                      deleteDebt(editingDebt.id);
                      setShowDebtModal(false);
                    }}
                    className="secondary-action rounded-[16px] px-4 py-3 text-[12px] font-semibold text-red-700"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="primary-action flex-1 rounded-[16px] py-3 text-[13px] font-semibold"
                >
                  Save Debt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {statementModalOpen && (
        <StatementUploadModal
          onClose={() => setStatementModalOpen(false)}
          onOpenReview={() => setTxReviewModalOpen(true)}
        />
      )}
      {txReviewModalOpen && (
        <TransactionReviewModal
          filterCategory={selectedCategoryFilter}
          onClose={() => {
            setTxReviewModalOpen(false);
            setSelectedCategoryFilter(null);
          }}
        />
      )}
    </div>
  );
};
