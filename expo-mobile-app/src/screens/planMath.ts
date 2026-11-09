import type { FinancialGoal, FinancialSnapshot, FXRateEntry } from '../../../shared/pi/types';
import { SharedFinancialCalculator } from '../../../shared/calculator';

/** Display-only aggregates: no recommendation, conversion, or affordability decisions. */
export function deriveObservedPlan(snapshot: FinancialSnapshot, currency: string, month?: string, accountId?: string) {
  const rows = snapshot.transactions.filter(row => row.currency === currency && (!month || row.date.startsWith(month + '-')) &&
    (!accountId || row.accountId === accountId));
  const result = {income: 0, grossSpending: 0, refunds: 0, transfers: 0, debtPayments: 0, workMovements: 0, unknownCount: 0, count: rows.length, categories: {} as Record<string, number>};
  for (const row of rows) {
    const classification = snapshot.classifications[row.id];
    const type = classification?.economicType;
    if (classification?.isInternalTransferCandidate || type === 'external_transfer') {
      result.transfers += Math.abs(row.amount);
      continue;
    }
    const contradictory = ((type === 'income' || type === 'refund') && row.amount < 0) ||
      (['expense', 'interest_fee', 'cash_withdrawal', 'debt_payment'].includes(type || '') && row.amount > 0);
    if (contradictory) { result.unknownCount += 1; continue; }
    switch (type) {
      case 'income': result.income += Math.abs(row.amount); break;
      case 'expense': case 'interest_fee': case 'cash_withdrawal': {
        result.grossSpending += Math.abs(row.amount);
        const category = classification.category || 'other';
        result.categories[category] = (result.categories[category] || 0) + Math.abs(row.amount);
        break;
      }
      case 'refund': result.refunds += Math.abs(row.amount); break;
      case 'internal_transfer': case 'savings_allocation': result.transfers += Math.abs(row.amount); break;
      case 'debt_payment': result.debtPayments += Math.abs(row.amount); break;
      case 'work_business_movement': result.workMovements += Math.abs(row.amount); break;
      default: result.unknownCount += 1;
    }
  }
  return {...result, netSpending: result.grossSpending - result.refunds};
}

export function deriveSpendingCategories(snapshot: FinancialSnapshot, options: {
  currency: string | 'all';
  accountId?: string;
  rates?: Record<string, FXRateEntry>;
}) {
  const currency = options.currency === 'all' ? snapshot.baseCurrency : options.currency;
  const sourceCurrencies = options.currency === 'all'
    ? [...new Set(snapshot.transactions.filter(row => !options.accountId || row.accountId === options.accountId).map(row => row.currency))]
    : [currency];
  const categories: Record<string, number> = {};
  const unconverted: {currency: string; amount: number}[] = [];
  const quoteDates: Record<string, string> = {};
  for (const source of sourceCurrencies) {
    const observed = deriveObservedPlan(snapshot, source, undefined, options.accountId);
    if (!(observed.grossSpending > 0)) continue;
    const quote = options.rates?.[source];
    if (source !== currency && (!quote || quote.base !== currency || quote.target !== source || quote.status !== 'OK' || !Number.isFinite(quote.rate) || quote.rate <= 0)) {
      unconverted.push({currency: source, amount: observed.grossSpending});
      continue;
    }
    if (source !== currency && quote) quoteDates[source] = quote.rateDate;
    for (const [category, amount] of Object.entries(observed.categories)) {
      const {converted} = SharedFinancialCalculator.convertToBaseCurrency(amount, source, currency, options.rates);
      if (converted !== null) categories[category] = (categories[category] || 0) + converted;
    }
  }
  return {currency, categories, unconverted, quoteDates};
}

export function goalAllocated(snapshot: FinancialSnapshot, goal: FinancialGoal) {
  return snapshot.goalAllocations.filter(a => a.goalId === goal.id && a.currency === goal.currency).reduce((sum, a) => sum + a.amount, 0);
}

export function goalTimeline(target: number | null, allocated: number, monthly: number, now = new Date()) {
  if (target == null || !Number.isFinite(target) || target < 0 || !Number.isFinite(allocated) || allocated < 0) return {remaining: null, months: null, date: null};
  const remaining = Math.max(0, target - allocated);
  if (remaining === 0) return {remaining, months: 0, date: new Date(now)};
  if (!Number.isFinite(monthly) || monthly <= 0) return {remaining, months: null, date: null};
  const months = Math.ceil(remaining / monthly);
  if (!Number.isSafeInteger(months)) return {remaining, months: null, date: null};
  const date = new Date(now);
  const day = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(day, endOfMonth));
  return Number.isFinite(date.getTime()) ? {remaining, months, date} : {remaining, months: null, date: null};
}
