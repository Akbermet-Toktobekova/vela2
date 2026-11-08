import { SharedFinancialCalculator } from '@shared/calculator';
import type { FinancialSnapshot } from '@shared/pi/types';
import type { CheckerContext } from '../checker/actionChecker';
import type { KnowledgeDatabaseSnapshot } from '../catalog/asCatalogRepository';
import { immediateCash } from './primaryExecution';

export type PrimaryFact = { id: string; value: unknown; targetId?: string };
export type ClarificationGap = {
  factIds: string[];
  missingInfo: string;
  question: string;
  dueDate?: string;
  route?: 'accounts';
};

export function applicable(jurisdiction: string, country: string) {
  const region = jurisdiction.trim().toUpperCase();
  const home = country.trim().toUpperCase();
  return region === 'INTERNATIONAL' || region === 'GENERAL_METHOD' ||
    (home !== '' && (region === home || (region === 'UK' && home === 'GB')));
}

export function getEligibleExcerpts(db: KnowledgeDatabaseSnapshot, country: string) {
  const sources = new Map(db.sources.map(source => [source.source_id, source]));
  const supportScope: Record<string, string> = {
    C004: 'Background about cash-flow timing. It does not support a specific subscription review or cancellation.',
    C017: 'Direct guidance to contact the issuer for a US cardholder unable to make the required minimum. Terms and outcomes are unknown.',
    C022: 'Population-level support for general education. It does not prescribe a financial decision.',
    C023: 'Background about financial education outcomes. It does not support an individualized repayment or payoff strategy.',
  };
  return db.verifiedClaims.flatMap(claim => {
    const source = sources.get(claim.source_primary_id);
    if (!source || !applicable(claim.jurisdiction, country) || !applicable(source.jurisdiction, country)) return [];
    const mapping = db.claimSourceMappings.find(row => row.claim_id === claim.claim_id &&
      row.source_id === source.source_id && row.verification_status === 'VERIFIED');
    return [{
      claimId: claim.claim_id, sourceId: source.source_id, text: claim.claim,
      jurisdiction: claim.jurisdiction, population: claim.population, limitations: claim.limitations,
      sourceJurisdiction: source.jurisdiction, sourcePopulation: source.population, sourceLimitations: source.limitations,
      claimType: claim.claim_type, sourceType: source.source_type,
      sourceSupportForClaim: mapping?.support_type ?? null,
      sourceLocation: mapping?.exact_location ?? source.exact_sections_reviewed,
      sourceEvidenceStatus: source.retrieval_evidence_status,
      actionSupportScope: supportScope[claim.claim_id] ?? 'Use only for actions directly supported by the claim text.',
    }];
  });
}

export function getPrimaryGrounding(snapshot: FinancialSnapshot, facts: PrimaryFact[], checker: CheckerContext) {
  const gaps: ClarificationGap[] = [];
  const add = (factIds: string[], missingInfo: string, question: string, detail: Pick<ClarificationGap, 'dueDate' | 'route'> = {}) =>
    gaps.push({ factIds, missingInfo, question, ...detail });
  const projection = SharedFinancialCalculator.projectNetCashTrajectory90d(checker.snapshot, checker.calculatorExtras);
  const referenceDate = (checker.calculatorExtras?.referenceDateIso ?? snapshot.createdAt).slice(0, 10);
  const paymentRisks = projection.shortfallsByObligation.flatMap(row => {
    const prefix = row.targetType === 'debt_minimum' ? 'debt-' : 'obligation-';
    const fact = facts.find(fact => fact.targetId === row.targetId && fact.id.startsWith(prefix));
    if (!fact) return [];
    const missingInfo = 'Available funding by the due date for ' + fact.id;
    if (gaps.some(gap => gap.missingInfo === missingInfo)) return [];
    add([fact.id], missingInfo, 'What funds can you confirm are available before the payment due on ' + row.dueDate + '?', { dueDate: row.dueDate });
    if (row.targetType === 'debt_minimum') {
      add([fact.id], 'Any payment arrangement already offered for ' + fact.id,
        'Has the issuer offered or confirmed any payment arrangement for this minimum payment?', { dueDate: row.dueDate });
    }
    return [{
      targetFactId: fact.id, dueDate: row.dueDate, currency: snapshot.baseCurrency,
      amountDue: row.amountDue, liquidAvailableByDue: row.liquidAvailableByDue,
      projectedShortfall: row.shortfallAmountF019,
    }];
  });
  const balanceIds = snapshot.accountSummaries.flatMap(({ latestBalance, isStale }, index) =>
    !latestBalance || isStale ? ['account-' + (index + 1)] : []);
  if (balanceIds.length) add(balanceIds, 'Current dated account balances',
    'What is the current available balance and balance date for each affected account?', { route: 'accounts' });
  if (balanceIds.length) {
    const imminentUntil = new Date(referenceDate + 'T00:00:00Z');
    imminentUntil.setUTCDate(imminentUntil.getUTCDate() + checker.policy.horizonAndFreshness.imminentObligationWindowDays);
    snapshot.obligations.forEach((bill, index) => {
      if (bill.status !== 'unpaid' || !bill.dueDate || bill.dueDate < referenceDate || bill.dueDate > imminentUntil.toISOString().slice(0, 10)) return;
      const factId = 'obligation-' + (index + 1);
      add([factId], 'Confirmed funding arrangement for ' + factId,
        'Is the ' + bill.category.replaceAll('_', ' ') + ' payment due on ' + bill.dueDate + ' already scheduled, and which funded account will cover it?', { dueDate: bill.dueDate });
    });
  }
  snapshot.debts.forEach((debt, index) => {
    const factId = 'debt-' + (index + 1);
    if (debt.apr == null) add([factId], 'Current APR for ' + factId, 'What APR appears on the latest statement?');
    if (debt.minimumPayment == null || !debt.nextDueDate) {
      add([factId], 'Missing minimum payment or due date for ' + factId, 'What are the required minimum and due date on the latest statement?');
    }
    if (debt.apr !== 0 && checker.calculatorExtras?.debtTerms?.[debt.id]?.interestAccruing == null) {
      add([factId], 'Interest accrual status for ' + factId, 'Does the latest statement confirm that interest is currently accruing?');
    }
  });
  snapshot.goals.forEach((goal, index) => {
    if (!goal.targetAmount || goal.goalType === 'emergency_cushion') return;
    const factId = 'goal-' + (index + 1);
    const allocations = snapshot.goalAllocations.filter(row => row.goalId === goal.id);
    if (allocations.some(row => row.currency !== goal.currency) ||
      allocations.reduce((sum, row) => sum + row.amount, 0) >= goal.targetAmount) return;
    if (!checker.calculatorExtras?.confirmedGoalContributions?.[goal.id]) {
      add([factId], 'Intended contribution to ' + factId,
        'What amount, if any, do you intend to allocate toward this goal and when?');
    }
    if (!checker.calculatorExtras?.confirmedGoalContributions?.[goal.id] &&
        new Set(snapshot.accountSummaries.map(row => row.account.currency)).size > 1) {
      add([factId], 'Preferred funding account for ' + factId,
        'Which account and currency, if any, would you prefer to use for this goal?');
    }
  });
  if (snapshot.goals.length && !snapshot.goals.some(goal => goal.goalType === 'emergency_cushion')) {
    add(['financial-metrics'].filter(id => facts.some(fact => fact.id === id)).concat('data-quality'),
      'Desired dedicated emergency reserve target', 'What dedicated emergency reserve target would you like to protect before funding other goals?');
  }
  const paymentContext = [
    ...snapshot.obligations.filter(item => item.status === 'unpaid').map(item => ({ id: item.id, type: 'obligation-', dueDate: item.dueDate })),
    ...snapshot.debts.map(item => ({ id: item.id, type: 'debt-', dueDate: item.nextDueDate })),
  ].flatMap(item => {
    const fact = facts.find(fact => fact.targetId === item.id && fact.id.startsWith(item.type));
    if (!fact || !item.dueDate) return [];
    const coverage = projection.paymentCoverage.find(row => row.targetId === item.id &&
      row.targetType === (item.type === 'debt-' ? 'debt_minimum' : 'obligation') && row.dueDate === item.dueDate);
    return [{ targetFactId: fact.id, dueDate: item.dueDate, currency: snapshot.baseCurrency,
      liquidAvailableByDue: projection.missingInputs?.length ? null : coverage?.liquidAvailableByDue ?? null,
      projectedShortfall: projection.missingInputs?.length ? null : coverage?.shortfallAmountF019 ?? null,
      projectionComplete: !projection.missingInputs?.length }];
  });
  return {
    referenceDate, paymentRisks, paymentContext, projectionMissingInputs: projection.missingInputs,
    cashCapacity: { currency: snapshot.baseCurrency, horizon: projection.availableCashBeforeActionF003,
      immediate: projection.missingInputs?.length ? null : immediateCash(projection) },
    gaps,
  };
}
