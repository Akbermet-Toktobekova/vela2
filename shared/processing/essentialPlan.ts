import policy from '../../server/config/prototype-policy.json';
import type { PIDatabaseSeed } from '../profile/seed';
import { SharedFinancialCalculator } from '../calculator';

export const reserveMonths = policy.productRules.essentialReserveMonths;
export const normalizedName = (name: string) => name.trim().toLocaleLowerCase().replace(/\s+/g, ' ');

/** D-025: details explain the total; dated records are not additional monthly costs. */
export function applyEssentialPlan(state: PIDatabaseSeed): void {
  if (state.preferences.statementReviewMode !== 'automatic') return;
  const expense = state.expenseCommitment;
  const now = new Date().toISOString();
  let cushion = state.goals.find(goal => goal.goalType === 'emergency_cushion');
  const target = SharedFinancialCalculator.essentialReserveTarget(expense?.estimatedMonthlyAmount);
  if (!cushion) {
    cushion = {id: 'essential-safety-cushion', userId: state.user.id, name: 'Safety Cushion', goalType: 'emergency_cushion',
      targetAmount: target, currency: expense?.currency || state.profile.baseCurrency, targetDate: null, priority: 'high', createdAt: now};
    state.goals.push(cushion);
  }
  if (cushion.targetAmount === null && target !== null) {
    cushion.targetAmount = target;
    cushion.currency = expense?.currency || state.profile.baseCurrency;
  }
  state.obligations = state.obligations.filter(row => !row.id.startsWith('essential-detail:') && !row.id.startsWith('subscription:'));
  for (const sub of state.subscriptions || []) {
    if (!sub.linkedObligationId) continue;
    if (sub.status === 'ended' || !sub.nextDueDate) state.obligations = state.obligations.filter(row => row.id !== sub.linkedObligationId);
    else {
      const bill = state.obligations.find(row => row.id === sub.linkedObligationId);
      if (bill) Object.assign(bill,{name:sub.name,amount:sub.amount,currency:sub.currency,dueDate:sub.nextDueDate,recurrence:sub.frequency});
    }
  }
  const addBill = (id: string, name: string, amount: number, currency: string, dueDate: string, recurrence: 'monthly'|'weekly'|'yearly') => {
    // Existing user-entered obligations take precedence over derived schedules.
    if (state.obligations.some(row => normalizedName(row.name) === normalizedName(name) && row.currency === currency)) return;
    state.obligations.push({id, userId: state.user.id, name, amount, currency, dueDate, recurrence,
      accountId: null, category: 'other', status: 'unpaid', notes: 'Schedule supported by recorded payment evidence.', createdAt: now});
  };
  for (const detail of expense?.details || []) {
    if (!detail.dueDate) continue;
    if (state.subscriptions?.some(s => s.status === 'active' && s.detailId === detail.id && s.nextDueDate)) continue;
    addBill('essential-detail:' + detail.id, detail.name, detail.monthlyAmount, expense!.currency, detail.dueDate, 'monthly');
  }
  for (const sub of state.subscriptions || []) {
    if (sub.status === 'active' && sub.nextDueDate && sub.frequency) addBill('subscription:' + sub.id, sub.name, sub.amount, sub.currency, sub.nextDueDate, sub.frequency);
  }
}
