import { z } from 'zod';
import { SharedFinancialCalculator } from '@shared/calculator';
import type { CandidateAction, PrototypePolicyBundle } from '@shared/contracts';
import type { CheckerContext } from '../checker/actionChecker';
import { ASCatalogRepository } from '../catalog/asCatalogRepository';

const contributionSchema = z.object({
  sourceAccountId: z.string().min(1), amount: z.number().finite().positive(), currency: z.string().length(3),
});

export function immediateCash(projection: ReturnType<typeof SharedFinancialCalculator.projectNetCashTrajectory90d>) {
  return projection.missingInputs?.length ? 0 : Math.max(0, Math.min(
    projection.availableCashBeforeActionF003, projection.minProjectedCashSignedF004 - projection.bufferFloor,
  ));
}

export function sizeOptionalAction(capacity: number, limit: number, policy: PrototypePolicyBundle['suggestionPolicy']) {
  return Math.min(limit, capacity, Math.max(policy.minimumMonetaryAmount,
    Math.floor(capacity * policy.optionalOutflowFraction / policy.amountRoundingIncrement) * policy.amountRoundingIncrement));
}

export function buildPrimaryExecution(
  operation: 'ALLOCATE_TO_GOAL' | 'PAY_EXTRA_DEBT' | undefined,
  targetId: string | undefined,
  ctx: CheckerContext,
  evidence: { claimId: string; sourceId: string }[],
): CandidateAction | undefined {
  const { snapshot, calculatorExtras, policy } = ctx;
  if (!operation || !targetId || !calculatorExtras?.referenceDateIso) return undefined;
  const goal = operation === 'ALLOCATE_TO_GOAL' ? snapshot.goals.find(item => item.id === targetId) : undefined;
  const debt = operation === 'PAY_EXTRA_DEBT' ? snapshot.debts.find(item => item.id === targetId) : undefined;
  const target = goal ?? debt;
  if (!target || target.currency !== snapshot.baseCurrency || goal?.goalType === 'emergency_cushion') return undefined;
  const actionId = goal ? 'A012' : 'A002';
  const contract = (ctx.knowledgeDb ?? ASCatalogRepository.load()).catalogActions.find(row => row.action_id === actionId);
  if (!contract) return undefined;
  const confirmed = goal ? calculatorExtras.confirmedGoalContributions?.[targetId] : undefined;
  const plan = contributionSchema.safeParse(confirmed);
  if (confirmed && (!plan.success || plan.data.currency !== target.currency)) return undefined;
  const account = plan.success
    ? snapshot.accountSummaries.find(item => item.account.id === plan.data.sourceAccountId)
    : snapshot.accountSummaries.find(item => item.account.isPrimary) ?? snapshot.accountSummaries[0];
  if (!account) return undefined;
  let limit = debt?.remainingBalance ?? 0;
  if (goal) {
    if (goal.targetAmount === null) return undefined;
    let saved = 0;
    for (const allocation of snapshot.goalAllocations.filter(row => row.goalId === targetId)) {
      const conversion = SharedFinancialCalculator.convertToBaseCurrency(
        allocation.amount, allocation.currency, target.currency, calculatorExtras.fxRates);
      if (conversion.fxStatus !== 'OK' || conversion.converted === null) return undefined;
      saved += conversion.converted;
    }
    limit = goal.targetAmount - saved;
  }
  if (!(limit > 0)) return undefined;
  const capacity = immediateCash(SharedFinancialCalculator.projectNetCashTrajectory90d(snapshot, calculatorExtras, null));
  if (plan.success && plan.data.amount > limit) return undefined;
  if (!plan.success && capacity < policy.suggestionPolicy.minimumMonetaryAmount) return undefined;
  const amount = plan.success ? plan.data.amount : sizeOptionalAction(capacity, limit, policy.suggestionPolicy);
  if (!(amount > 0)) return undefined;
  const timing = calculatorExtras.referenceDateIso.slice(0, 10);
  const title = goal
    ? `Allocate ${target.currency} ${amount} toward ${goal.name}`
    : `Pay an extra ${target.currency} ${amount} toward ${target.name}`;
  const description = goal
    ? 'Set aside the checked contribution from the selected account toward this goal.'
    : 'Apply the checked additional amount above the required minimum toward this debt.';
  return {
    candidateId: `primary_${actionId}_${targetId}`, actionId, actionType: 'FINANCIAL_ACTION', title, description,
    rationale: plan.success ? 'Uses the confirmed contribution and funding account.' : 'Uses the current dated cash projection and the existing sizing policy.',
    targetId, sourceAccountId: account.account.id, destinationAccountId: null, amount, currency: target.currency,
    proposedTiming: timing, supportingRuleIds: contract.supporting_rule_ids_list,
    supportingClaimIds: evidence.map(row => row.claimId), supportingSourceIds: [...new Set(evidence.map(row => row.sourceId))],
    requiredPiInputs: contract.required_inputs_list, origin: 'AI_SUGGESTION',
  };
}
