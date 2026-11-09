import type { PIDatabaseSeed } from '../../../../react-app/src/database/seed';
import type { CalculatorContextExtras } from '@shared/calculator';
import nora from '../../../../user-inputs/synthetic/backend-review/profile.json';

export const asOf = nora.asOf;
export const profiles = ['debt', 'strong', 'nora'] as const;
export type Profile = typeof profiles[number];
export const names: Record<Profile, string> = { debt: '01 Debt', strong: '02 Strong', nora: '03 Nora' };
export const variants = {
  'debt-funded': 'debt', 'debt-us': 'debt', 'strong-confirmed': 'strong',
  'strong-missing-fx': 'strong', 'nora-fresh': 'nora',
} as const;
export type ProfileVariant = keyof typeof variants;

export function prepare(profile: Profile, initial: PIDatabaseSeed, variant?: ProfileVariant) {
  const userId = initial.user.id;
  const isDebt = profile === 'debt';
  const stamp = { userId, createdAt: asOf };
  const account = (id: string, name: string, currency: string, isPrimary: boolean) => ({
    ...stamp, id, name, currency, institution: 'Synthetic bank', isPrimary,
    purposes: ['daily_spending' as const], fundsOwnership: 'personal' as const,
    personalAvailableAmount: null, notes: '', updatedAt: asOf,
  });
  const obligation = (id: string, name: string, amount: number, dueDate: string, category: PIDatabaseSeed['obligations'][number]['category'], paid = false) => ({
    ...stamp, id, name, amount, dueDate, category, currency: 'EUR', accountId: 'main',
    recurrence: 'monthly' as const, status: paid ? 'paid' as const : 'unpaid' as const, notes: '',
  });
  const state: PIDatabaseSeed = {
    ...initial,
    profile: { ...initial.profile, baseCurrency: 'EUR', locale: 'en', updatedAt: asOf },
    onboarding: { ...initial.onboarding, status: 'completed', completedAt: asOf, debtQuestionAnswer: profile === 'strong' ? 'no' : 'yes' },
    accounts: isDebt ? [account('main', 'Current account', 'EUR', true)] : [account('main', 'Wise EUR', 'EUR', true), account('huf', 'Wise HUF', 'HUF', false)],
    balances: isDebt ? [{ id: 'balance-main', accountId: 'main', amount: 20, currency: 'EUR', asOf, sourceType: 'user_reported', createdAt: asOf }] : [],
    incomes: [{ ...stamp, id: 'salary', name: 'Salary', pattern: 'regular', estimatedMonthlyAmount: isDebt ? 1800 : 4200,
      currency: 'EUR', frequency: 'monthly', sourceType: 'salary', nextExpectedDate: '2026-11-25', receivingAccountId: 'main', notes: '' }],
    expenseCommitment: { userId, id: 'essentials', estimatedMonthlyAmount: isDebt ? 950 : 1500, currency: 'EUR', notes: '', updatedAt: asOf },
    obligations: isDebt ? [obligation('utility', 'Utilities', 65, '2026-11-18', 'energy')] : [
      obligation('rent-paid', 'November rent', 1100, '2026-11-01', 'rent', true),
      obligation('utility', 'Utilities', 150, '2026-11-15', 'energy'),
      obligation('other', 'Other essential bills', 250, '2026-11-20', 'other'),
      obligation('rent', 'Rent', 1100, '2026-12-01', 'rent'),
    ],
    debts: isDebt ? [{ ...stamp, id: 'card', name: 'Credit card', debtType: 'credit_card', currency: 'EUR',
      remainingBalance: 900, apr: 24, minimumPayment: 65, nextDueDate: '2026-11-08', paymentFrequency: 'monthly' }] : [],
    goals: profile === 'strong' ? [{ ...stamp, id: 'education', name: 'Education', goalType: 'general_savings',
      targetAmount: 6000, currency: 'EUR', targetDate: '2027-06-30', priority: 'high' }] : [],
  };
  if (profile === 'nora') {
    // The existing fixture is parsed again by the beta state API before it can be used.
    state.accounts = nora.accounts.map(item => ({ ...item, ...stamp, updatedAt: asOf })) as PIDatabaseSeed['accounts'];
    state.incomes = nora.incomes.map(item => ({ ...item, ...stamp })) as PIDatabaseSeed['incomes'];
    state.expenseCommitment = { ...nora.expenseCommitment, userId, updatedAt: asOf };
    state.obligations = nora.obligations.map(item => ({ ...item, ...stamp })) as PIDatabaseSeed['obligations'];
    state.debts = nora.debts.map(item => ({ ...item, ...stamp })) as PIDatabaseSeed['debts'];
    state.goals = nora.goals.map(item => ({ ...item, ...stamp })) as PIDatabaseSeed['goals'];
    state.goalAllocations = nora.goalAllocations.map(item => ({ ...item, userId }));
  }
  const statements = profile === 'nora' ? nora.statements : profile === 'strong' ? [
    { accountId: 'main', fileName: 'strong-wise-eur.csv' }, { accountId: 'huf', fileName: 'strong-wise-huf.csv' },
  ] : [];
  const extras: CalculatorContextExtras = { referenceDateIso: asOf.slice(0, 10) };
  if (isDebt) extras.debtTerms = { card: { debtId: 'card', interestAccruing: true, issuerContact: 'Support in the bank app' } };
  if (variant === 'debt-funded') state.balances[0].amount = state.debts[0].minimumPayment!;
  if (variant === 'debt-us') state.profile.country = 'US';
  if (variant === 'strong-confirmed' || variant === 'strong-missing-fx') {
    extras.confirmedGoalContributions = { education: { amount: 500, currency: 'EUR', sourceAccountId: 'main' } };
  }
  return { state, statements, extras };
}
