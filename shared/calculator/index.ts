import {
  FinancialSnapshot,
  FinancialObligation,
  DebtRecord,
  FinancialGoal,
  IncomeSource,
} from '../pi/types';
import {
  CashflowProjectionSummary,
  DailyCashProjectionPoint,
  ExtendedDebtTerms,
  FXRateEntry,
  ScheduledAutomaticTransfer,
} from '../pi/types';
import { CandidateAction, PrototypePolicyBundle } from '../contracts';
import prototypePolicy from '../../server/config/prototype-policy.json';

// ============================================================================
// FORMULA OWNERSHIP REGISTRY (Single Owner Verification per Review Point 7)
// ============================================================================
export const FORMULA_OWNERSHIP_MAP: Record<string, string> = {
  F001: 'SharedFinancialCalculator.computeLiquidEmergencyFunds',
  F002: 'SharedFinancialCalculator.computeEmergencyMonthsCoverage',
  F003: 'SharedFinancialCalculator.computeAvailableCashBeforeAction',
  F004: 'SharedFinancialCalculator.projectNetCashTrajectory90d',
  F005: 'SharedFinancialCalculator.computeDailyPeriodicApr',
  F006: 'SharedFinancialCalculator.computeSimpleDailyInterest',
  F007: 'SharedFinancialCalculator.computeLoanAnnuityPayment',
  F008: 'SharedFinancialCalculator.computeDebtInterestAvoided',
  F009: 'SharedFinancialCalculator.computeDebtPayoffHorizon',
  F010: 'SharedFinancialCalculator.computeDebtInterestAvoided',
  F011: 'SharedFinancialCalculator.computeRecurringExpenseSaved',
  F012: 'SharedFinancialCalculator.computeSavingsGoalProgress',
  F013: 'SharedFinancialCalculator.computeMonthlySavingRequired',
  F014: 'ImpactCalculator.computeResilienceDelta',
  F015: 'ImpactCalculator.computeGoalProgressDelta',
  F016: 'ComplexityEvaluator.computeEffortFeature',
  F017: 'ScoringEngine.computeFinAgentScore',
  F018: 'RobustnessEngine.computeSensitivityWinnerFrequency',
  F019: 'SharedFinancialCalculator.computeShortfallBeforeDueDate',
  F020: 'SharedFinancialCalculator.computePotentialFeesAvoided',
};

export interface CalculatorContextExtras {
  confirmedGoalContributions?: Record<string, { sourceAccountId: string; amount: number; currency: string }>;
  pendingFinancialCommitments?: Array<{ recommendationId: string; actionId: string; sourceAccountId: string | null; amount: number; currency: string }>;
  referenceDateIso?: string; // defaults to the actual current UTC calendar date
  simulationHorizonDays?: number;
  bufferFloor?: number; // minimum required liquidity floor B_min
  fxRates?: Record<string, FXRateEntry>; // keyed by currency code -> baseCurrency rate
  scheduledTransfers?: ScheduledAutomaticTransfer[];
  debtTerms?: Record<string, ExtendedDebtTerms>;
  confirmedExitFeesByTargetId?: Record<string, number>;
  confirmedReplacementCostMonthlyByTargetId?: Record<string, number>;
  confirmedFeeScheduleSavings90dByTargetId?: Record<string, number>;
  confirmedSubscriptionBillingDatesByTargetId?: Record<string, string[]>;
}

function addDaysIso(baseDateIso: string, days: number): string {
  const base = new Date(baseDateIso.slice(0, 10) + 'T00:00:00Z');
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}

function diffDaysIso(startIso: string, endIso: string): number {
  const s = new Date(startIso.slice(0, 10) + 'T00:00:00Z').getTime();
  const e = new Date(endIso.slice(0, 10) + 'T00:00:00Z').getTime();
  return Math.round((e - s) / (1000 * 60 * 60 * 24));
}

function addMonthsIso(startIso: string, months: number): string {
  const original = new Date(startIso.slice(0, 10) + 'T00:00:00Z');
  const result = new Date(Date.UTC(original.getUTCFullYear(), original.getUTCMonth() + months, 1));
  const lastDay = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();
  result.setUTCDate(Math.min(original.getUTCDate(), lastDay));
  return result.toISOString().slice(0, 10);
}

export class SharedFinancialCalculator {
  static getScheduledOccurrenceDates(startIso: string, frequency: string, referenceDateIso: string, horizonDays: number): string[] {
    if (!Number.isFinite(Date.parse(startIso)) || !Number.isFinite(Date.parse(referenceDateIso))) return [];
    const dates: string[] = [];
    const recurring = ['weekly', 'biweekly', 'monthly', 'yearly'].includes(frequency);
    for (let occurrence = 0; ; occurrence++) {
      const date = frequency === 'monthly' ? addMonthsIso(startIso, occurrence)
        : frequency === 'yearly' ? addMonthsIso(startIso, occurrence * 12)
          : addDaysIso(startIso, occurrence * (frequency === 'biweekly' ? 14 : 7));
      const offset = diffDaysIso(referenceDateIso, date);
      if (offset > horizonDays) break;
      if (offset >= 0) dates.push(date);
      if (!recurring) break;
    }
    return dates;
  }
  /**
   * Currency conversion helper using verified Frankfurter FX rates.
   * Never invents a 1:1 rate for missing currencies.
   */
  static convertToBaseCurrency(
    amount: number,
    currency: string,
    baseCurrency: string,
    fxRates?: Record<string, FXRateEntry>
  ): { converted: number | null; fxStatus: 'OK' | 'STALE' | 'UNAVAILABLE' } {
    const cur = (currency || baseCurrency).toUpperCase();
    const base = (baseCurrency || 'EUR').toUpperCase();
    if (cur === base) {
      return { converted: amount, fxStatus: 'OK' };
    }
    const entry = fxRates?.[cur];
    if (!entry || entry.status === 'UNAVAILABLE' || !(entry.rate > 0)) {
      return { converted: null, fxStatus: 'UNAVAILABLE' };
    }
    // entry.rate is defined as 1 unit of base = entry.rate units of target OR 1 unit of target in base.
    // Standard Frankfurter ?base=EUR returns rates[HUF] = 400 (meaning 1 EUR = 400 HUF -> amountInBase = amount / rate).
    const inBase = Number((amount / entry.rate).toFixed(2));
    return { converted: inBase, fxStatus: entry.status };
  }

  /**
   * F001: Liquid emergency funds
   * L = sum(accessible_cash_like_accounts) - restricted_amounts
   * Distinguishes total accessible liquid cash vs dedicated emergency reserve
   * so transferring between equally liquid accounts never fabricates resilience.
   */
  static computeLiquidEmergencyFunds(
    snapshot: FinancialSnapshot,
    extras?: CalculatorContextExtras
  ): {
    totalLiquidAccessible: number;
    dedicatedEmergencyReserve: number;
    uncommittedLiquidCash: number;
    fxWarningCurrencies: string[];
  } {
    const base = snapshot.baseCurrency || 'EUR';
    let totalAccessible = 0;
    const fxWarningCurrencies: string[] = [];

    for (const acctSummary of snapshot.accountSummaries) {
      if (acctSummary.personalAccessibleBalance === null) continue;
      const cur = acctSummary.account.currency || base;
      const conv = this.convertToBaseCurrency(
        acctSummary.personalAccessibleBalance,
        cur,
        base,
        extras?.fxRates
      );
      if (conv.converted === null) {
        if (!fxWarningCurrencies.includes(cur)) fxWarningCurrencies.push(cur);
        continue;
      }
      if (conv.fxStatus === 'STALE' && !fxWarningCurrencies.includes(cur)) {
        fxWarningCurrencies.push(cur);
      }
      totalAccessible += conv.converted;
    }

    // Dedicated emergency reserve = funds explicitly earmarked in emergency cushion goal
    // or held in a dedicated 'savings' purpose account without upcoming obligation lock
    let dedicatedEmergencyReserve = 0;
    const cushionGoalIds = new Set(
      snapshot.goals.filter((g) => g.goalType === 'emergency_cushion').map((g) => g.id)
    );
    for (const alloc of snapshot.goalAllocations) {
      if (cushionGoalIds.has(alloc.goalId)) {
        const conv = this.convertToBaseCurrency(
          alloc.amount,
          alloc.currency,
          base,
          extras?.fxRates
        );
        if (conv.fxStatus !== 'OK' && !fxWarningCurrencies.includes(alloc.currency)) fxWarningCurrencies.push(alloc.currency);
        if (conv.converted !== null) {
          dedicatedEmergencyReserve += conv.converted;
        }
      }
    }

    // Non-emergency goal allocations and unpaid mandatory obligations are restricted
    let nonEmergencyAllocated = 0;
    for (const alloc of snapshot.goalAllocations) {
      if (!cushionGoalIds.has(alloc.goalId)) {
        const conv = this.convertToBaseCurrency(
          alloc.amount,
          alloc.currency,
          base,
          extras?.fxRates
        );
        if (conv.fxStatus !== 'OK' && !fxWarningCurrencies.includes(alloc.currency)) fxWarningCurrencies.push(alloc.currency);
        if (conv.converted !== null) nonEmergencyAllocated += conv.converted;
      }
    }

    let unpaidObligationsInBase = 0;
    for (const obl of snapshot.upcomingUnpaidObligations) {
      const conv = this.convertToBaseCurrency(obl.amount, obl.currency, base, extras?.fxRates);
      if (conv.fxStatus !== 'OK' && !fxWarningCurrencies.includes(obl.currency)) fxWarningCurrencies.push(obl.currency);
      if (conv.converted !== null) unpaidObligationsInBase += conv.converted;
    }

    // Cap dedicated reserve by actual net liquid funds after mandatory unpaid bills
    const netLiquidAfterBills = Math.max(0, totalAccessible - unpaidObligationsInBase);
    const effectiveEmergencyReserve = Math.min(dedicatedEmergencyReserve, netLiquidAfterBills);
    const uncommittedLiquidCash =
      totalAccessible - dedicatedEmergencyReserve - nonEmergencyAllocated - unpaidObligationsInBase -
      (extras?.pendingFinancialCommitments || []).reduce((sum, commitment) => {
        const converted = this.convertToBaseCurrency(commitment.amount, commitment.currency, base, extras?.fxRates);
        if (converted.fxStatus !== 'OK' && !fxWarningCurrencies.includes(commitment.currency)) fxWarningCurrencies.push(commitment.currency);
        return sum + (converted.converted ?? 0);
      }, 0);

    return {
      totalLiquidAccessible: Number(totalAccessible.toFixed(2)),
      dedicatedEmergencyReserve: Number(effectiveEmergencyReserve.toFixed(2)),
      uncommittedLiquidCash: Number(uncommittedLiquidCash.toFixed(2)),
      fxWarningCurrencies,
    };
  }

  /**
   * F002: Emergency months coverage
   * M = L / E_month
   */
  static computeEmergencyMonthsCoverage(
    liquidEmergencyFunds: number,
    essentialMonthlyExpense: number | null
  ): number | null {
    if (essentialMonthlyExpense === null || !(essentialMonthlyExpense > 0)) {
      return null;
    }
    return Number((liquidEmergencyFunds / essentialMonthlyExpense).toFixed(4));
  }

  /**
   * F003: Available cash before action (for optional actions)
   * A = max(0, cash + confirmed_inflows_before_horizon - mandatory_outflows_before_horizon - buffer_floor)
   * NOTE: Never used to overwrite signed projection F004 or shortfall F019!
   */
  static computeAvailableCashBeforeAction(params: {
    startingCash: number;
    confirmedInflows: number;
    mandatoryOutflows: number;
    bufferFloor: number;
  }): number {
    const raw =
      params.startingCash +
      params.confirmedInflows -
      params.mandatoryOutflows -
      params.bufferFloor;
    return Number(Math.max(0, raw).toFixed(2));
  }

  /**
   * F019: Shortfall before due date
   * shortfall = max(0, mandatory_due - liquid_available_by_due)
   */
  static computeShortfallBeforeDueDate(
    mandatoryDue: number,
    liquidAvailableByDue: number
  ): number {
    return Number(Math.max(0, mandatoryDue - liquidAvailableByDue).toFixed(2));
  }

  /**
   * F004: Net cash projection over horizon H (default 90 days)
   * cash_t = cash_0 + SUM(inflows_<=t) - SUM(outflows_<=t)
   * Preserves negative values (deficits) without masking them via max(0, ...).
   */
  static projectNetCashTrajectory90d(
    snapshot: FinancialSnapshot,
    extras?: CalculatorContextExtras,
    candidateAction?: CandidateAction | null
  ): CashflowProjectionSummary & { paymentCoverage: CashflowProjectionSummary['shortfallsByObligation'] } {
    const refDate = (extras?.referenceDateIso || new Date().toISOString()).slice(0, 10);
    const horizonDays = extras?.simulationHorizonDays ?? prototypePolicy.horizonAndFreshness.simulationHorizonDays;
    const bufferFloor = extras?.bufferFloor ?? 0;
    const base = snapshot.baseCurrency || 'EUR';
    const missingInputs = new Set<string>();
    const convert = (amount: number, currency: string): number | null => {
      const result = this.convertToBaseCurrency(amount, currency, base, extras?.fxRates);
      if (result.fxStatus !== 'OK') missingInputs.add(`verified_fx_rate_${currency}`);
      return result.converted;
    };
    for (const summary of snapshot.accountSummaries) {
      if (summary.personalAccessibleBalance === null) missingInputs.add(`accessible_balance_${summary.account.id}`);
      else convert(summary.personalAccessibleBalance, summary.account.currency);
    }

    // Starting liquid personal cash excluding non-accessible work funds and already locked goals
    const liq = this.computeLiquidEmergencyFunds(snapshot, extras);
    // Start from accessible cash minus already earmarked goal allocations
    let totalGoalEarmarks = 0;
    for (const ga of snapshot.goalAllocations) {
      const converted = convert(ga.amount, ga.currency);
      if (converted !== null) totalGoalEarmarks += converted;
    }
    const pendingReserved = (extras?.pendingFinancialCommitments || []).reduce((sum, commitment) => {
      const value = convert(commitment.amount, commitment.currency);
      return sum + (value ?? 0);
    }, 0);
    let currentCash = Number((liq.totalLiquidAccessible - totalGoalEarmarks - pendingReserved).toFixed(2));

    const dailyInflows: Record<number, number> = {};
    const dailyOutflows: Record<number, number> = {};
    const actionDate = candidateAction?.proposedTiming?.slice(0, 10) || refDate;
    const actionDay = Math.max(0, diffDaysIso(refDate, actionDate));
    const cashActions = new Set(['A002', 'A007', 'A008', 'A012']);
    if (candidateAction && cashActions.has(candidateAction.actionId) && candidateAction.amount !== null) {
      const amount = convert(candidateAction.amount, candidateAction.currency);
      const destination = snapshot.accountSummaries.find(a => a.account.id === candidateAction.destinationAccountId);
      // Transfers between accessible personal accounts preserve liquidity. Earmarking a goal restricts it.
      const internalTransfer = ['A007', 'A008'].includes(candidateAction.actionId) &&
        destination?.account.fundsOwnership === 'personal' && destination.personalAccessibleBalance !== null &&
        !snapshot.goals.some(g => g.id === candidateAction.targetId);
      if (amount !== null && !internalTransfer && actionDay <= horizonDays) dailyOutflows[actionDay] = amount;
    }
    const datedEvents: Array<{
      dayOffset: number; date: string; targetId: string;
      targetType: 'obligation' | 'debt_minimum' | 'auto_transfer'; name: string; amount: number;
    }> = [];

    // 1. Confirmed regular income sources (irregular unconfirmed income is NOT assumed guaranteed per R009 / F003)
    for (const inc of snapshot.incomeSources) {
      if (inc.frequency !== 'monthly') { missingInputs.add(`verified_income_per_occurrence_${inc.id}`); continue; }
      if (inc.pattern === 'irregular') continue; // Do not assume uncertain irregular income arrives
      if (!inc.estimatedMonthlyAmount || inc.estimatedMonthlyAmount <= 0) continue;
      if (!inc.nextExpectedDate) { missingInputs.add(`income_date_${inc.id}`); continue; }
      const converted = convert(inc.estimatedMonthlyAmount, inc.currency);
      if (converted === null) continue;
      for (const date of this.getScheduledOccurrenceDates(inc.nextExpectedDate, inc.frequency, refDate, horizonDays)) {
        const d = diffDaysIso(refDate, date);
        dailyInflows[d] = (dailyInflows[d] || 0) + converted;
      }
    }

    // 2. Mandatory unpaid obligations across the 90-day window
    for (const obl of snapshot.upcomingUnpaidObligations) {

      const converted = convert(obl.amount, obl.currency);
      if (converted === null) continue;
      const dates = this.getScheduledOccurrenceDates(obl.dueDate, obl.recurrence, refDate, horizonDays);
      if (diffDaysIso(refDate, obl.dueDate) < 0) dates.unshift(obl.dueDate.slice(0, 10));
      for (const due of dates) {
        if (candidateAction?.actionId === 'A015' && candidateAction.targetId === obl.id && due >= actionDate && due >= refDate) continue;
        const d = Math.max(0, diffDaysIso(refDate, due));
        if (d <= horizonDays) {
          dailyOutflows[d] = (dailyOutflows[d] || 0) + converted;
          datedEvents.push({
            dayOffset: d,
            date: due,
            targetId: obl.id,
            targetType: 'obligation',
            name: obl.name,
            amount: converted,
          });
        }
      }
    }

    // Explicitly verified billing dates can establish a subscription schedule
    // from an observed transaction; history alone never implies future charges.
    for (const [targetId, dates] of Object.entries(extras?.confirmedSubscriptionBillingDatesByTargetId || {})) {
      if (snapshot.upcomingUnpaidObligations.some(o => o.id === targetId)) continue;
      const transaction = snapshot.transactions.find(t => t.id === targetId && t.amount < 0);
      if (!transaction) { missingInputs.add(`subscription_target_${targetId}`); continue; }
      const amount = convert(Math.abs(transaction.amount), transaction.currency);
      if (amount === null) continue;
      for (const date of dates) {
        const day = diffDaysIso(refDate, date);
        if (day < 0 || day > horizonDays) continue;
        if (candidateAction?.actionId === 'A015' && candidateAction.targetId === targetId && date >= actionDate) continue;
        dailyOutflows[day] = (dailyOutflows[day] || 0) + amount;
        datedEvents.push({ dayOffset: day, date, targetId, targetType: 'obligation', name: transaction.counterparty || transaction.description, amount });
      }
    }

    // 3. Required debt minimum payments across the 90-day window
    for (const debt of snapshot.debts) {
      if (debt.remainingBalance !== 0) {
        if (debt.minimumPayment === null || debt.minimumPayment < 0) missingInputs.add(`debt_minimum_${debt.id}`);
        if (!debt.nextDueDate) missingInputs.add(`debt_due_date_${debt.id}`);
      }
      if (!debt.minimumPayment || debt.minimumPayment <= 0 || !debt.nextDueDate) continue;
      if (debt.remainingBalance !== null && debt.remainingBalance <= 0) continue;
      const converted = convert(debt.minimumPayment, debt.currency);
      if (converted === null) continue;
      if (!debt.paymentFrequency || debt.paymentFrequency === 'irregular') {
        missingInputs.add(`debt_payment_schedule_${debt.id}`);
      }
      const extraPayment = candidateAction?.actionId === 'A002' && candidateAction.targetId === debt.id
        && candidateAction.currency === debt.currency ? candidateAction.amount || 0 : 0;
      const terms = extras?.debtTerms?.[debt.id];
      const simulated = debt.remainingBalance !== null && debt.apr !== null && terms
        ? this.simulateDebtScenario(debt, extraPayment, horizonDays, refDate, actionDate, terms.interestAccruing) : null;
      const dates = this.getScheduledOccurrenceDates(debt.nextDueDate, debt.paymentFrequency || 'one_time', refDate, horizonDays);
      if (diffDaysIso(refDate, debt.nextDueDate) < 0) dates.unshift(debt.nextDueDate.slice(0, 10));
      for (const due of dates) {
        const d = Math.max(0, diffDaysIso(refDate, due));
        if (d <= horizonDays) {
          const payment = simulated?.payments[due];
          const paymentInBase = payment === undefined ? converted : convert(payment, debt.currency) ?? 0;
          dailyOutflows[d] = (dailyOutflows[d] || 0) + paymentInBase;
          datedEvents.push({
            dayOffset: d,
            date: due,
            targetId: debt.id,
            targetType: 'debt_minimum',
            name: `${debt.name} minimum`,
            amount: paymentInBase,
          });
        }
      }
    }

    // 4. Scheduled automatic transfers (for A010 / A011)
    for (const tr of extras?.scheduledTransfers || []) {
      if (!tr.isActive) continue;
      // If candidate action is A011 targeting this transfer, pause it!
      if (candidateAction?.actionId === 'A011' && candidateAction.targetId === tr.id && tr.scheduledDate >= actionDate) {
        continue;
      }
      const converted = convert(tr.amount, tr.currency);
      if (converted === null) continue;
      const destination = snapshot.accountSummaries.find(a => a.account.id === tr.toAccountId);
      if (destination?.account.fundsOwnership === 'personal' && destination.personalAccessibleBalance !== null) continue;
      const d = diffDaysIso(refDate, tr.scheduledDate.slice(0, 10));
      if (d >= 0 && d <= horizonDays) {
        dailyOutflows[d] = (dailyOutflows[d] || 0) + converted;
        datedEvents.push({
          dayOffset: d,
          date: tr.scheduledDate.slice(0, 10),
          targetId: tr.id,
          targetType: 'auto_transfer',
          name: tr.description,
          amount: converted,
        });
      }
    }

    // If candidateAction is A010 (Set safe payday saving), schedule recurring transfer after paydays
    if (
      candidateAction?.actionId === 'A010' &&
      !snapshot.accountSummaries.some(a => a.account.id === candidateAction.destinationAccountId && a.account.fundsOwnership === 'personal' && a.personalAccessibleBalance !== null) &&
      candidateAction.amount !== null &&
      candidateAction.amount > 0
    ) {
      const amt = convert(candidateAction.amount, candidateAction.currency);
      for (const dayStr of Object.keys(dailyInflows)) {
        const d = Math.min(horizonDays, Number(dayStr) + 1);
        if (amt !== null) dailyOutflows[d] = (dailyOutflows[d] || 0) + amt;
      }
    }

    if (candidateAction?.actionId === 'A015' && candidateAction.targetId && actionDay <= horizonDays) {
      const target = candidateAction.targetId;
      const fee = extras?.confirmedExitFeesByTargetId?.[target];
      const replacement = extras?.confirmedReplacementCostMonthlyByTargetId?.[target];
      if (fee === undefined) missingInputs.add('verified_subscription_exit_fee');
      if (replacement === undefined) missingInputs.add('verified_subscription_replacement_cost');
      const feeBase = fee === undefined ? null : convert(fee, candidateAction.currency);
      if (feeBase !== null) dailyOutflows[actionDay] = (dailyOutflows[actionDay] || 0) + feeBase;
      const dates = extras?.confirmedSubscriptionBillingDatesByTargetId?.[target];
      if (!dates) missingInputs.add('verified_subscription_billing_dates');
      for (const date of dates || []) {
        const day = diffDaysIso(refDate, date);
        if (date >= actionDate && day >= 0 && day <= horizonDays && replacement !== undefined) {
          const cost = convert(replacement, candidateAction.currency);
          if (cost !== null) dailyOutflows[day] = (dailyOutflows[day] || 0) + cost;
        }
      }
    }

    // A monthly essential estimate is not a payment schedule. Discretionary
    // allocations need enough dated mandatory expenses in every full reference-date-anchored
    // month to substantiate that estimate; missing dates are never invented.
    if (candidateAction && ['A002', 'A007', 'A008', 'A012'].includes(candidateAction.actionId)) {
      const essential = snapshot.essentialCommitment;
      if (!essential || essential.estimatedMonthlyAmount === null || essential.estimatedMonthlyAmount <= 0) {
        missingInputs.add('essential_monthly_expense');
      } else {
        const monthly = convert(essential.estimatedMonthlyAmount, essential.currency);
        if (monthly !== null) {
          for (let month = 0; ; month++) {
            const start = addMonthsIso(refDate, month);
            const end = addMonthsIso(refDate, month + 1);
            if (diffDaysIso(refDate, end) > horizonDays) break;
            const datedMandatory = datedEvents.filter(event => event.targetType === 'obligation' && event.date >= start && event.date < end)
              .reduce((sum, event) => sum + event.amount, 0);
            if (datedMandatory < monthly) missingInputs.add('dated_essential_outflows');
          }
        }
      }
    }

    // Build day-by-day trajectory F004
    const dailyTrajectory: DailyCashProjectionPoint[] = [];
    let runningCash = currentCash;
    let minProjectedCashSignedF004 = runningCash;
    let minProjectedCashDate: string | null = refDate;
    let totalInflows = 0;
    let totalOutflows = 0;

    const cashBeforeEventByDay: Record<number, number> = {};

    for (let d = 0; d <= horizonDays; d++) {
      const inf = Number((dailyInflows[d] || 0).toFixed(2));
      const out = Number((dailyOutflows[d] || 0).toFixed(2));
      cashBeforeEventByDay[d] = Number((runningCash + inf).toFixed(2));
      runningCash = Number((runningCash + inf - out).toFixed(2));
      totalInflows += inf;
      totalOutflows += out;

      const dateStr = addDaysIso(refDate, d);
      if (runningCash < minProjectedCashSignedF004) {
        minProjectedCashSignedF004 = runningCash;
        minProjectedCashDate = dateStr;
      }

      dailyTrajectory.push({
        date: dateStr,
        dayOffset: d,
        inflows: inf,
        outflows: out,
        netCashSigned: runningCash,
        belowBufferFloor: runningCash < bufferFloor,
      });
    }

    // Compute F019 shortfalls per dated obligation/minimum
    const paymentCoverage = datedEvents
      .sort((a, b) => a.dayOffset - b.dayOffset)
      .map((ev) => {
        const netAfterDay = dailyTrajectory[ev.dayOffset]?.netCashSigned ?? 0;
        const availableBeforeThisBill = Number((netAfterDay + ev.amount).toFixed(2));
        const shortfall = this.computeShortfallBeforeDueDate(
          ev.amount,
          Math.max(0, availableBeforeThisBill)
        );
        return {
          targetId: ev.targetId,
          targetType: ev.targetType,
          name: ev.name,
          dueDate: ev.date,
          amountDue: ev.amount,
          liquidAvailableByDue: Math.max(0, availableBeforeThisBill),
          shortfallAmountF019: shortfall,
        };
      });
    const shortfallsByObligation = paymentCoverage.filter((s) => s.shortfallAmountF019 > 0);

    const availableCashBeforeActionF003 = this.computeAvailableCashBeforeAction({
      startingCash: currentCash,
      confirmedInflows: totalInflows,
      mandatoryOutflows: totalOutflows,
      bufferFloor,
    });

    return {
      horizonDays,
      startingLiquidCash: currentCash,
      bufferFloor,
      availableCashBeforeActionF003,
      minProjectedCashSignedF004,
      minProjectedCashDate,
      hasProjectedDeficit: minProjectedCashSignedF004 < bufferFloor || shortfallsByObligation.length > 0,
      shortfallsByObligation,
      paymentCoverage,
      dailyTrajectory,
      missingInputs: Array.from(missingInputs),
    };
  }

  /** Dated source-account affordability. Unknown payment accounts conservatively
   * compete for this account; confirmed income assigned elsewhere cannot fund it. */
  static projectSourceCashByDate(snapshot: FinancialSnapshot, extras: CalculatorContextExtras | undefined,
    sourceAccountId: string, dueDate: string, excludedDebtId?: string): { available: number; missingInputs: string[] } {
    const referenceDate = (extras?.referenceDateIso || new Date().toISOString()).slice(0, 10);
    const source = snapshot.accountSummaries.find(a => a.account.id === sourceAccountId);
    if (!source) return { available: 0, missingInputs: ['source_account'] };
    const partial: FinancialSnapshot = {
      ...snapshot,
      accountSummaries: [source],
      goalAllocations: snapshot.goalAllocations.filter(a => a.accountId === sourceAccountId),
      incomeSources: snapshot.incomeSources.filter(i => i.receivingAccountId === sourceAccountId),
      upcomingUnpaidObligations: snapshot.upcomingUnpaidObligations.filter(o => !o.accountId || o.accountId === sourceAccountId),
      debts: snapshot.debts.filter(d => d.id !== excludedDebtId),
    };
    const projection = this.projectNetCashTrajectory90d(partial, {
      ...extras, referenceDateIso: referenceDate,
      simulationHorizonDays: Math.max(0, diffDaysIso(referenceDate, dueDate)),
      scheduledTransfers: extras?.scheduledTransfers?.filter(t => t.fromAccountId === sourceAccountId),
      pendingFinancialCommitments: extras?.pendingFinancialCommitments?.filter(c => !c.sourceAccountId || c.sourceAccountId === sourceAccountId),
    });
    return { available: projection.dailyTrajectory.at(-1)?.netCashSigned ?? 0, missingInputs: projection.missingInputs || [] };
  }

  /**
   * F005: Daily periodic APR
   * daily_rate = APR_decimal / 365
   */
  static computeDailyPeriodicApr(aprPercent: number): number {
    return (aprPercent / 100) / 365;
  }

  /**
   * F006: Simple daily interest
   * interest_day = principal_day * daily_rate
   */
  static computeSimpleDailyInterest(principalDay: number, dailyRate: number): number {
    if (principalDay <= 0 || dailyRate <= 0) return 0;
    return principalDay * dailyRate;
  }

  /**
   * F007: Loan fixed-payment annuity
   * P = B*r/(1-(1+r)^(-n)) for r>0; P=B/n if r=0
   */
  static computeLoanAnnuityPayment(principal: number, periodicRate: number, periods: number): number {
    if (periods <= 0 || principal <= 0) return 0;
    if (periodicRate <= 0) return Number((principal / periods).toFixed(2));
    const payment = (principal * periodicRate) / (1 - Math.pow(1 + periodicRate, -periods));
    return Number(payment.toFixed(2));
  }

  /**
   * F009: Debt payoff horizon
   * n = -ln(1-B*r/P)/ln(1+r) if P>B*r
   */
  static computeDebtPayoffHorizon(
    principal: number,
    monthlyRate: number,
    monthlyPayment: number
  ): number | null {
    if (principal <= 0) return 0;
    if (monthlyRate <= 0) {
      return monthlyPayment > 0 ? Number((principal / monthlyPayment).toFixed(2)) : null;
    }
    if (monthlyPayment <= principal * monthlyRate) {
      return null; // Never amortizes
    }
    const n = -Math.log(1 - (principal * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
    return Number(n.toFixed(2));
  }

  private static simulateDebtScenario(debt: DebtRecord, extra: number, horizonDays: number,
    referenceDate: string, paymentDate: string, interestAccruing: boolean): { totalInterest: number; payments: Record<string, number> } {
    const paymentDay = Math.max(0, diffDaysIso(referenceDate, paymentDate));
    const paymentDays = new Set(debt.nextDueDate
      ? this.getScheduledOccurrenceDates(debt.nextDueDate, debt.paymentFrequency || 'one_time', referenceDate, horizonDays)
        .map(date => Math.max(0, diffDaysIso(referenceDate, date))) : []);
    let principal = debt.remainingBalance ?? 0;
    let interestDue = 0;
    let totalInterest = 0;
    const payments: Record<string, number> = {};
    const dailyRate = interestAccruing ? this.computeDailyPeriodicApr(debt.apr ?? 0) : 0;
    for (let day = 0; day <= horizonDays; day++) {
      if (day === paymentDay) {
        const interestPaid = Math.min(Math.max(0, extra), interestDue);
        interestDue -= interestPaid;
        principal = Math.max(0, principal - Math.max(0, extra - interestPaid));
      }
      if (paymentDays.has(day)) {
        const payment = Math.min(debt.minimumPayment ?? 0, principal + interestDue);
        payments[addDaysIso(referenceDate, day)] = Number(payment.toFixed(2));
        const interestPaid = Math.min(payment, interestDue);
        interestDue -= interestPaid;
        principal = Math.max(0, principal - (payment - interestPaid));
      }
      if (day < horizonDays) {
        const interest = this.computeSimpleDailyInterest(principal, dailyRate);
        totalInterest += interest;
        interestDue += interest;
      }
    }
    return { totalInterest, payments };
  }

  /**
   * F008 & F010: Counterfactual debt interest & fees avoided over a defined horizon (days)
   * Explicitly separates principal payment from interest/fee savings!
   */
  static computeDebtInterestAvoided(params: {
    debt: DebtRecord;
    extraPaymentDay0: number;
    referenceDateIso?: string;
    paymentDateIso?: string;
    horizonDays: number;
    interestAccruing?: boolean;
    avoidedLateFee?: number;
  }): {
    baselineInterest: number | null;
    afterActionInterest: number | null;
    interestAvoidedF008: number | null;
    effectiveIncrementalCostAvoidedF010: number | null;
    status: 'OK' | 'NEEDS_DATA';
    missingInputs: string[];
  } {
    const { debt, extraPaymentDay0, horizonDays, avoidedLateFee = 0 } = params;
    const interestAccruing = params.interestAccruing ?? (debt.apr === 0 || debt.remainingBalance === 0 ? false : undefined);
    const missingInputs: string[] = [];
    if (debt.remainingBalance == null) missingInputs.push('remainingBalance');
    if (interestAccruing === undefined) missingInputs.push('interestAccruing');
    if (debt.apr == null && interestAccruing && debt.remainingBalance !== 0) missingInputs.push('apr');
    if (debt.remainingBalance !== 0 && interestAccruing && debt.apr !== 0) {
      if (debt.minimumPayment == null) missingInputs.push('minimumPayment');
      if (!debt.nextDueDate) missingInputs.push('nextDueDate');
      if (!debt.paymentFrequency) missingInputs.push('paymentFrequency');
    }
    if (missingInputs.length) return {
      status: 'NEEDS_DATA', missingInputs, baselineInterest: null, afterActionInterest: null,
      interestAvoidedF008: null, effectiveIncrementalCostAvoidedF010: null,
    };
    const balance0 = debt.remainingBalance!;
    const apr = debt.apr;

    if (balance0 <= 0 || apr === 0 || interestAccruing !== true) {
      return {
        status: 'OK', missingInputs,
        baselineInterest: 0,
        afterActionInterest: 0,
        interestAvoidedF008: 0,
        effectiveIncrementalCostAvoidedF010: Number(avoidedLateFee.toFixed(2)),
      };
    }

    const referenceDate = params.referenceDateIso || new Date().toISOString().slice(0, 10);
    const paymentDate = params.paymentDateIso || referenceDate;
    const baselineInterest = this.simulateDebtScenario(debt, 0, horizonDays, referenceDate, paymentDate, interestAccruing).totalInterest;
    const afterActionInterest = this.simulateDebtScenario(debt, Math.max(0, extraPaymentDay0), horizonDays, referenceDate, paymentDate, interestAccruing).totalInterest;
    const interestAvoided = Math.max(0, baselineInterest - afterActionInterest);
    const totalAvoided = interestAvoided + Math.max(0, avoidedLateFee);

    return {
      status: 'OK', missingInputs,
      baselineInterest: Number(baselineInterest.toFixed(2)),
      afterActionInterest: Number(afterActionInterest.toFixed(2)),
      interestAvoidedF008: Number(interestAvoided.toFixed(2)),
      effectiveIncrementalCostAvoidedF010: Number(totalAvoided.toFixed(2)),
    };
  }

  /**
   * F011: Recurring expense saved
   * Adapts annual F011 formula to actual payment occurrences inside the 90-day window
   * while also returning the 12-month F011 figure for explanation.
   */
  static computeRecurringExpenseSaved(params: {
    monthlyCost: number;
    exitFees: number;
    replacementMonthlyCost: number;
    chargesIn90dWindow: number; // verified occurrences in the evaluation window
  }): {
    saving90d: number;
    annualSavingF011: number;
  } {
    const charges90d = params.chargesIn90dWindow;
    const netMonthlyDiff = params.monthlyCost - params.replacementMonthlyCost;
    const saving90d = netMonthlyDiff * charges90d - params.exitFees;
    const annualSavingF011 = params.monthlyCost * 12 - params.exitFees - params.replacementMonthlyCost * 12;
    return {
      saving90d: Number(saving90d.toFixed(2)),
      annualSavingF011: Number(annualSavingF011.toFixed(2)),
    };
  }

  /**
   * F020: Potential fees avoided
   * fee_delta = future_baseline_fees - future_fees_after_change
   */
  static computePotentialFeesAvoided(
    futureBaselineFees90d: number,
    futureFeesAfterChange90d: number
  ): number {
    return Number((futureBaselineFees90d - futureFeesAfterChange90d).toFixed(2));
  }

  /**
   * F012: Savings-goal progress
   * goal_pct = min(1, max(0, saved_amount / target_amount))
   */
  static computeSavingsGoalProgress(savedAmount: number, targetAmount: number | null): number | null {
    if (targetAmount === null || !(targetAmount > 0)) return null;
    return Number(Math.min(1, Math.max(0, savedAmount / targetAmount)).toFixed(4));
  }

  /**
   * F013: Monthly saving required (zero growth)
   * required = max(0, target - current_saving) / months_remaining
   */
  static computeMonthlySavingRequired(
    targetAmount: number,
    currentSaving: number,
    monthsRemaining: number
  ): number | null {
    if (!(monthsRemaining > 0) || !(targetAmount > 0)) return null;
    return Number((Math.max(0, targetAmount - currentSaving) / monthsRemaining).toFixed(2));
  }
}
