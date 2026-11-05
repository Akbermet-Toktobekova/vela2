import { describe, it, expect, vi, afterEach } from 'vitest';
import { SharedFinancialCalculator as Calc } from '@shared/calculator';
import { ImpactCalculator } from '../src/decision/impactCalculator';
import { DecisionEngine } from '../src/decision/decisionEngine';
import { RobustnessEngine } from '../src/decision/robustnessChecker';
import { ComplexityEvaluator } from '../src/decision/complexityEvaluator';
import { ScoringEngine } from '../src/decision/scoringEngine';
import { loadPrototypePolicy } from '../src/config/policyLoader';
import { createBaselineSolventFixture as fixture, createCandidateActionFixture as candidate } from './helpers/testFixtures';
import type { CheckerBatchOutput } from '../src/checker/actionChecker';
const policy = loadPrototypePolicy();
function checkOutput(c: ReturnType<typeof candidate>, status: 'VALID' | 'REJECTED' = 'VALID'): CheckerBatchOutput {
  const validation = { candidate: c, status, isCritical: false, criticalPriorityRank: null, resolvesCriticalProblemDirectly: false, failedChecks: [], missingFields: [], projectedMinCashAfterAction: 1000, unlocksActionIds: [] };
  return { allResults: [validation], validFinancialCandidates: [validation], validCriticalCandidates: [], validVerificationCandidates: [], rejectedCandidates: [], needsDataCandidates: [], missingFieldsUnion: [], criticalCoverageAddedIds: [], fallbackTriggered: false };
}
afterEach(() => vi.restoreAllMocks());
describe('Financial counterfactual and publication regression', () => {
  it('reserve earmarks preserve total liquid assets at the same terminal date', () => {
    const { snapshot, extras } = fixture();
    const impact = ImpactCalculator.evaluateFinancialImpact({ candidate: candidate({ actionId: 'A007', targetId: snapshot.goals.find(g => g.goalType === 'emergency_cushion')!.id }), snapshot, policy, calculatorExtras: extras });
    expect(impact.status).toBe('COMPUTED');
    expect(impact.rawImpacts.beforeTerminalDate).toBe(impact.rawImpacts.afterTerminalDate);
    expect(impact.rawImpacts.beforeTerminalLiquidCash).toBe(impact.rawImpacts.afterTerminalLiquidCash);
    expect(impact.rawImpacts.deltaFinancialBenefitCurrency).toBe(0);
    expect(impact.rawImpacts.deltaResilienceMonths).toBeGreaterThan(0);
  });
  it('transfers between accessible personal accounts create no liquidity', () => {
    const { snapshot, extras } = fixture();
    const impact = ImpactCalculator.evaluateFinancialImpact({ candidate: candidate({ actionId: 'A008', destinationAccountId: snapshot.accountSummaries[1].account.id }), snapshot, policy, calculatorExtras: extras });
    expect(impact.rawImpacts.deltaResilienceMonths).toBe(0);
    expect(impact.rawImpacts.beforeTerminalLiquidCash).toBe(impact.rawImpacts.afterTerminalLiquidCash);
  });
  it('a destination account cannot hide debt repayment or restricted-account cash outflow', () => {
    const { snapshot, extras } = fixture();
    const baseline = Calc.projectNetCashTrajectory90d(snapshot, extras);
    const destinationAccountId = snapshot.accountSummaries[1].account.id;
    const repayment = candidate({ actionId: 'A002', targetId: snapshot.debts[0].id, destinationAccountId, amount: 100 });
    const withDestination = Calc.projectNetCashTrajectory90d(snapshot, extras, repayment);
    const withoutDestination = Calc.projectNetCashTrajectory90d(snapshot, extras, { ...repayment, destinationAccountId: null });
    expect(withDestination.dailyTrajectory).toEqual(withoutDestination.dailyTrajectory);
    expect(withDestination.dailyTrajectory[0].netCashSigned).toBe(baseline.dailyTrajectory[0].netCashSigned - 100);
    for (const ownership of ['work_business', 'held_for_others'] as const) {
      snapshot.accountSummaries[1].account.fundsOwnership = ownership;
      const transfer = Calc.projectNetCashTrajectory90d(snapshot, extras, candidate({ actionId: 'A007', destinationAccountId }));
      expect(transfer.dailyTrajectory[0].netCashSigned).toBe(Calc.projectNetCashTrajectory90d(snapshot, extras).dailyTrajectory[0].netCashSigned - 100);
    }
    snapshot.accountSummaries[1].account.fundsOwnership = 'personal';
    snapshot.accountSummaries[1].personalAccessibleBalance = null;
    const inaccessible = Calc.projectNetCashTrajectory90d(snapshot, extras, candidate({ actionId: 'A007', destinationAccountId }));
    expect(inaccessible.dailyTrajectory[0].netCashSigned).toBe(Calc.projectNetCashTrajectory90d(snapshot, extras).dailyTrajectory[0].netCashSigned - 100);
  });
  it('dated debt repayment earns actual avoided interest, never principal savings', () => {
    const { snapshot } = fixture(); const debt = snapshot.debts[0];
    const early = Calc.computeDebtInterestAvoided({ debt, extraPaymentDay0: 100, horizonDays: 90, referenceDateIso: '2026-11-03', paymentDateIso: '2026-11-03' });
    const late = Calc.computeDebtInterestAvoided({ debt, extraPaymentDay0: 100, horizonDays: 90, referenceDateIso: '2026-11-03', paymentDateIso: '2026-12-03' });
    expect(early.interestAvoidedF008).toBeGreaterThan(late.interestAvoidedF008); expect(early.interestAvoidedF008).toBeLessThan(100);
  });
  it('cash minimum payments stop after extra repayment pays off the debt', () => {
    const { snapshot, extras } = fixture(); const debt = snapshot.debts[0];
    debt.apr = 0; debt.remainingBalance = 100;
    extras.debtTerms = { [debt.id]: { debtId: debt.id, interestAccruing: false } };
    const baseline = Calc.projectNetCashTrajectory90d(snapshot, extras);
    const after = Calc.projectNetCashTrajectory90d(snapshot, extras, candidate({ actionId: 'A002', targetId: debt.id, amount: 100 }));
    // Three scheduled minimums cease, so terminal cash declines by 100 - 75.
    expect(after.dailyTrajectory.at(-1)!.netCashSigned - baseline.dailyTrajectory.at(-1)!.netCashSigned).toBe(-25);
  });
  it('undated essential spending blocks optional allocations rather than inventing dates', () => {
    const { snapshot, extras } = fixture(); snapshot.essentialCommitment!.estimatedMonthlyAmount = 2000;
    expect(Calc.projectNetCashTrajectory90d(snapshot, extras, candidate({ actionId: 'A007' })).missingInputs).toContain('dated_essential_outflows');
  });
  it('minimum already paid in baseline earns no fictional incremental benefit', () => {
    const { snapshot, extras } = fixture();
    const impact = ImpactCalculator.evaluateFinancialImpact({ candidate: candidate({ actionId: 'A001', targetId: snapshot.debts[0].id, amount: snapshot.debts[0].minimumPayment }), snapshot, policy, calculatorExtras: extras });
    expect(impact.rawImpacts.deltaFinancialBenefitCurrency).toBe(0);
  });
  it('subscription savings use verified actual billing dates and costs', () => {
    const { snapshot, extras } = fixture();
    snapshot.upcomingUnpaidObligations = [{ ...snapshot.upcomingUnpaidObligations[0], id: 'sub', amount: 20, dueDate: '2027-01-30', recurrence: 'monthly' }]; snapshot.debts = [];
    extras.confirmedSubscriptionBillingDatesByTargetId = { sub: ['2027-01-30'] }; extras.confirmedExitFeesByTargetId = { sub: 3 }; extras.confirmedReplacementCostMonthlyByTargetId = { sub: 5 };
    const impact = ImpactCalculator.evaluateFinancialImpact({ candidate: candidate({ actionId: 'A015', targetId: 'sub', amount: 20 }), snapshot, policy, calculatorExtras: extras });
    expect(impact.status).toBe('COMPUTED'); expect(impact.rawImpacts.deltaFinancialBenefitCurrency).toBe(12);
    expect(impact.rawImpacts.afterTerminalLiquidCash! - impact.rawImpacts.beforeTerminalLiquidCash!).toBe(12);
  });
  it('missing expenses, FX, subscription terms and unsupported effects need data', () => {
    const { snapshot, extras } = fixture(); snapshot.essentialCommitment = null;
    const evaluate = (actionId: string, currency = 'EUR') => ImpactCalculator.evaluateFinancialImpact({ candidate: candidate({ actionId, currency, targetId: 'missing' }), snapshot, policy, calculatorExtras: extras });
    expect(evaluate('A007').missingInputs).toContain('essential_monthly_expense'); expect(evaluate('A015').status).toBe('NEEDS_DATA');
    expect(evaluate('A002', 'USD').missingInputs).toContain('verified_fx_rate_USD'); expect(evaluate('A019').missingInputs).toContain('unsupported_financial_effect_A019');
  });
  it('pending commitments reserve cash without moving actual balances', () => {
    const { snapshot, extras } = fixture(); const baseline = Calc.projectNetCashTrajectory90d(snapshot, extras);
    extras.pendingFinancialCommitments = [{ recommendationId: 'accepted', actionId: 'A007', sourceAccountId: null, amount: 100, currency: 'EUR' }];
    expect(Calc.projectNetCashTrajectory90d(snapshot, extras).startingLiquidCash).toBe(baseline.startingLiquidCash - 100);
    expect(Calc.computeLiquidEmergencyFunds(snapshot, extras).totalLiquidAccessible).toBe(1700);
  });
  it('rejected candidates cannot be smuggled into publication lists', () => {
    const { snapshot, extras } = fixture();
    expect(DecisionEngine.runDecisionEngine({ snapshot, calculatorExtras: extras, policy, checkerOutput: checkOutput(candidate({ actionId: 'A007' }), 'REJECTED') }).candidate).toBeNull();
  });
  it('F018 withholds unstable assumptions and requests missing data', () => {
    const { snapshot, extras } = fixture(); const c = candidate({ actionId: 'A007', targetId: snapshot.goals[0].id }); const original = RobustnessEngine.evaluateRobustness;
    for (const reason of ['UNSTABLE_ASSUMPTIONS', 'MISSING_PI_DATA'] as const) {
      vi.spyOn(RobustnessEngine, 'evaluateRobustness').mockImplementation(params => ({ ...original.call(RobustnessEngine, params), meetsStabilityThreshold: false, stability: 0.2, instabilityReason: reason }));
      const decision = DecisionEngine.runDecisionEngine({ snapshot, calculatorExtras: extras, policy, checkerOutput: checkOutput(c) });
      expect(decision.decisionStatus).toBe(reason === 'MISSING_PI_DATA' ? 'NEEDS_DATA' : 'NO_RECOMMENDATION'); expect(decision.candidate).toBeNull(); vi.restoreAllMocks();
    }
  });
  it('near ties prefer lower uncertainty before complexity', () => {
    const { snapshot, extras } = fixture(); const first = candidate({ actionId: 'A007', candidateId: 'first', targetId: snapshot.goals[0].id }); const second = candidate({ ...first, actionId: 'A007', candidateId: 'second' });
    const impact = ImpactCalculator.evaluateFinancialImpact({ candidate: first, snapshot, policy, calculatorExtras: extras }); const complexity = ComplexityEvaluator.computeComplexityFromFactors({ candidate: first, policy, aiFactors: null });
    const scored = ScoringEngine.scoreCandidates({ candidates: [
      { candidate: first, impact, complexity: { ...complexity, hasUnknownComponents: true, uncertaintyScore: 0.9, computedComplexity: 0.1 } },
      { candidate: second, impact: { ...impact, candidateId: second.candidateId }, complexity: { ...complexity, hasUnknownComponents: false, uncertaintyScore: 0, computedComplexity: 0.2 } },
    ], policy });
    const result = RobustnessEngine.evaluateRobustness({ scoredCandidates: scored, policy }); expect(result.tieBreakerApplied).toBe(true); expect(result.topCandidateId).toBe('second');
  });
});
