import { z } from 'zod';
import { BetaError, BetaFinancial, type BetaState } from './financial';
import type { BetaStore } from './store';
import { normalizedName } from '../../../shared/processing/essentialPlan';
import { SharedFinancialCalculator } from '../../../shared/calculator';
import { spendingCategories } from '@shared/pi/types';
import { merchantEvidence } from '../analyzer/statementEnrichment';
import type { ConfirmedSubscription } from '../../../shared/profile/seed';

type User = {id: string; name: string; email: string};
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => {
  const d = new Date(v + 'T00:00:00Z'); return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === v;
}, 'Use a valid calendar date.');
export const SubscriptionInput = z.object({
  name: z.string().trim().min(1).max(200), amount: z.number().finite().positive(), currency: z.string().regex(/^[A-Z]{3}$/),
  frequency: z.enum(['monthly','yearly','weekly']), nextDueDate: date.optional(),
  monthlyAmount: z.number().finite().positive().optional(), includedInEssentials: z.boolean(), detailId: z.string().optional(),
});

export class BetaPlanning {
  constructor(private store: BetaStore, private financial: BetaFinancial) {}
  private mutate(user: User, version: number, update: (state: BetaState['state']) => void): BetaState {
    this.store.database.exec('BEGIN IMMEDIATE');
    try {
      const current = this.financial.get(user);
      if (current.version !== version) throw new BetaError('VERSION_CONFLICT', 'Refresh before saving.', 409);
      const state = structuredClone(current.state); update(state);
      const result = {...current, state, version: current.version + 1};
      this.financial.persist(user.id, result);
      this.store.remove(user.id, 'analysis'); this.store.remove(user.id, 'analysis-private');
      this.store.database.exec('COMMIT'); return result;
    } catch (e) { this.store.database.exec('ROLLBACK'); throw e; }
  }
  transaction(user: User, id: string, raw: unknown): BetaState {
    const input = z.object({expectedVersion: z.number().int().nonnegative(), description: z.string().trim().min(1).max(1000).optional(),
      accountId: z.string().optional(), date: date.optional(), amount: z.number().finite().optional(),
      currency: z.string().regex(/^[A-Z]{3}$/).optional(), counterparty: z.string().max(500).optional(),
      displayName: z.string().trim().min(1).max(200).optional(),
      category: z.enum(spendingCategories).optional(),
      applyToMerchant: z.boolean().optional(),
      excluded: z.boolean().optional(), isSubscription: z.boolean().optional(), isInternalTransfer: z.boolean().optional(), restoreOriginal: z.boolean().optional(),
    }).strict().parse(raw);
    return this.mutate(user, input.expectedVersion, state => {
      const row = state.transactions.find(t => t.id === id);
      if (!row) throw new BetaError('NOT_FOUND', 'Operation not found.', 404);
      row.originalValues ??= {accountId: row.accountId, date: row.date, amount: row.amount, currency: row.currency, description: row.description, counterparty: row.counterparty};
      if (input.restoreOriginal) Object.assign(row, row.originalValues, {excluded: false});
      for (const key of ['accountId','date','amount','currency','description','counterparty','excluded'] as const)
        if (input[key] !== undefined) Object.assign(row, {[key]: input[key]});
      if (!state.accounts.some(a => a.id === row.accountId && a.currency === row.currency))
        throw new BetaError('INVALID_ACCOUNT', 'Choose an account with the operation currency.');
      if (input.isSubscription && input.isInternalTransfer) throw new BetaError('INVALID_LABELS', 'An operation cannot be both labels.');
      const previous = state.classifications.find(c => c.transactionId === id);
      const explicit = input.isSubscription !== undefined || input.isInternalTransfer !== undefined;
      const enrichmentEdited = input.category !== undefined || input.displayName !== undefined;
      const changesEvidence = input.restoreOriginal || ['accountId','date','amount','currency','description','counterparty'].some(key => (input as any)[key] !== undefined);
      if (explicit || (changesEvidence && previous?.status !== 'user_confirmed')) {
      state.classifications = state.classifications.filter(c => c.transactionId !== id);
      state.classifications.push({id: previous?.id || 'edit:' + id, transactionId: id,
        category: input.isInternalTransfer ? 'transfer' : input.isSubscription ? 'subscriptions' : 'other',
        economicType: input.isInternalTransfer ? 'internal_transfer' : row.amount < 0 ? 'expense' : 'income',
        isRecurringCandidate: input.isSubscription === true, confidence: explicit ? 'high' : 'low',
        status: explicit ? 'user_confirmed' : 'needs_review', classifierVersion: explicit ? 'user' : 'edited-operation',
        provenanceNote: 'Profile operation edit; original bank balance remains unchanged.', updatedAt: new Date().toISOString()});
      }
      if (enrichmentEdited) {
        const label = state.classifications.find(item => item.transactionId === id);
        if (!label) throw new BetaError('NEEDS_DATA', 'The operation is still processing.');
        const merchantKey = previous?.merchantKey || merchantEvidence(row)?.merchantKey;
        if (input.applyToMerchant && !merchantKey) throw new BetaError('NEEDS_DATA', 'A merchant must be identified before applying this to other operations.');
        const values = {...(input.displayName !== undefined && {displayName: input.displayName}),
          ...(input.category !== undefined && {category: input.category})};
        const apply = (item: typeof label) => {
          Object.assign(item, values, {status: 'user_confirmed', confidence: 'high', classifierVersion: 'user',
            updatedAt: new Date().toISOString()});
          if (input.category !== undefined) item.isRecurringCandidate = input.category === 'subscriptions' && item.economicType === 'expense';
        };
        label.merchantKey = merchantKey;
        apply(label);
        if (input.applyToMerchant && merchantKey) {
          for (const item of state.classifications) {
            if (item.transactionId !== id && item.merchantKey === merchantKey) apply(item);
          }
          const preferences = this.store.get(user.id, 'statement-merchant-edits') as Record<string, typeof values> | null;
          this.store.put(user.id, 'statement-merchant-edits', {...preferences, [merchantKey]: {...preferences?.[merchantKey], ...values}});
        }
      }
      if (changesEvidence || explicit) state.transferMatches = state.transferMatches.filter(m => m.outgoingTransactionId !== id && m.incomingTransactionId !== id);
      state.confirmations = state.confirmations.filter(c => c.subjectId !== id);
    });
  }
  saveSubscription(user: User, id: string, raw: unknown): BetaState {
    const input = SubscriptionInput.extend({frequency: SubscriptionInput.shape.frequency.optional(), expectedVersion: z.number().int().nonnegative(), status: z.enum(['active','ended']).default('active')}).strict().parse(raw);
    return this.mutate(user, input.expectedVersion, state => {
      const previous = state.subscriptions?.find(s => s.id === id);
      if (!previous) throw new BetaError('NOT_FOUND', 'Subscription not found.', 404);
      if (input.nextDueDate && !input.frequency) throw new BetaError('NEEDS_DATA', 'Select a billing frequency for the next payment.');
      const sub: ConfirmedSubscription = {...previous, name: input.name, amount: input.amount,
        frequency: input.frequency, nextDueDate: input.nextDueDate, status: input.status, detected: false,
        monthlyAmount: input.frequency ? SharedFinancialCalculator.confirmedMonthlySubscriptionCost(input.amount, input.frequency, input.monthlyAmount) ?? undefined : undefined};
      
      state.subscriptions = (state.subscriptions || []).map(s => s.id === id ? sub : s);
    });
  }
  reserveTarget(user: User, raw: unknown): BetaState {
    const input = z.object({
      expectedVersion: z.number().int().nonnegative(),
      amount: z.number().finite().positive(),
    }).strict().parse(raw);
    return this.mutate(user, input.expectedVersion, state => {
      const goal = state.goals.find(item => item.goalType === 'emergency_cushion');
      if (!goal) throw new BetaError('NEEDS_DATA', 'Save your essential spending to create a Safety Cushion.');
      goal.targetAmount = input.amount;
    });
  }
  reserveBalance(user: User, raw: unknown): BetaState {
    const input = z.object({expectedVersion:z.number().int().nonnegative(),accountId:z.string().min(1),amount:z.number().finite().nonnegative()}).strict().parse(raw);
    return this.mutate(user,input.expectedVersion,state=>{
      const snapshot = this.financial.snapshot(user);
      const account = snapshot.accountSummaries.find(a=>a.account.id===input.accountId);
      const goal = state.goals.find(g=>g.goalType==='emergency_cushion');
      if (!goal || !account || account.account.currency !== goal.currency) throw new BetaError('NEEDS_DATA','Choose a reserve account in the cushion currency.');
      if (account.isStale || account.personalAccessibleBalance === null) throw new BetaError('NEEDS_DATA','Update this account balance before recording earmarked funds.');
      const engine = this.store.get(user.id,'engine') as any;
      if (engine?.recommendations?.some((r:any)=>['accepted','adjusted'].includes(r.recommendation.status))) throw new BetaError('PENDING_ACTION','Complete or decline pending actions before updating earmarked funds.');
      const other = state.goalAllocations.filter(a=>a.accountId===input.accountId&&a.goalId!==goal.id);
      if (other.some(a=>a.currency!==goal.currency)) throw new BetaError('NEEDS_DATA','Review mixed-currency allocations before updating this balance.');
      if (input.amount+other.reduce((n,a)=>n+a.amount,0)>account.personalAccessibleBalance) throw new BetaError('INSUFFICIENT_CASH','Earmarks cannot exceed confirmed personal funds.');
      state.goalAllocations=state.goalAllocations.filter(a=>a.accountId!==input.accountId||a.goalId!==goal.id);
      if(input.amount)state.goalAllocations.push({id:'reported-reserve:'+input.accountId,userId:user.id,goalId:goal.id,accountId:input.accountId,amount:input.amount,currency:goal.currency,allocatedAt:new Date().toISOString(),note:'User-reported existing earmark. No money moved.'});
    });
  }
  /** Also used inside the atomic finding response transaction. */
  subscription(state: BetaState['state'], id: string, input: z.infer<typeof SubscriptionInput>, transactionIds: string[]): ConfirmedSubscription {
    const expense = state.expenseCommitment;
    const detail = expense?.details?.find(d => d.id === input.detailId || normalizedName(d.name) === normalizedName(input.name));
    const monthly = SharedFinancialCalculator.confirmedMonthlySubscriptionCost(input.amount,input.frequency,input.monthlyAmount);
    if (!monthly) throw new BetaError('NEEDS_DATA', 'Confirm the monthly equivalent of this weekly subscription.');
    if (detail && state.subscriptions?.some(s => s.id === id)) {
      const next = Math.round(monthly * 100) / 100;
      if (detail.id === 'sub-detail:' + id && expense?.estimatedMonthlyAmount !== null && expense)
        expense.estimatedMonthlyAmount = Math.round((expense.estimatedMonthlyAmount + next - detail.monthlyAmount) * 100) / 100;
      else if (expense && (expense.details || []).reduce((sum,d) => sum + (d.id === detail.id ? next : d.monthlyAmount),0) > (expense.estimatedMonthlyAmount ?? 0))
        throw new BetaError('NEEDS_DATA','Update your essential monthly total before increasing this detail.');
      detail.monthlyAmount = next; detail.name = input.name;
      if (expense) expense.updatedAt = new Date().toISOString();
    }
    if (!input.includedInEssentials && !detail && !state.subscriptions?.some(s => s.id === id)) {
      if (!expense || expense.estimatedMonthlyAmount === null || expense.currency !== input.currency)
        throw new BetaError('NEEDS_DATA', 'Confirm essential spending in the subscription currency before adding its monthly cost.');
      expense.estimatedMonthlyAmount = Math.round((expense.estimatedMonthlyAmount + monthly) * 100) / 100;
      expense.updatedAt = new Date().toISOString();
      (expense.details ??= []).push({id: 'sub-detail:' + id, name: input.name, monthlyAmount: Math.round(monthly * 100) / 100});
    }
    return {id, ...input, originAccountId:state.transactions.find(t=>transactionIds.includes(t.id))?.accountId,
      linkedObligationId:state.obligations.find(b=>!b.id.startsWith('subscription:')&&!b.id.startsWith('essential-detail:')&&b.currency===input.currency&&normalizedName(b.name)===normalizedName(input.name))?.id,
      monthlyAmount: Math.round(monthly * 100) / 100, includedInEssentials: true,
      detailId: detail?.id || (expense?.details?.find(d => d.id === 'sub-detail:' + id)?.id),
      status: 'active', transactionIds};
  }
}
