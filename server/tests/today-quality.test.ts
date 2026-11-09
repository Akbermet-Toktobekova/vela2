import { describe, expect, it } from 'vitest';
import { createBlankUserSeedData } from '../../react-app/src/database/seed';
import { buildFinancialSnapshot } from '../../react-app/src/services/snapshotBuilder';
import { prepare, asOf } from '../src/scripts/live-review/profiles';
import { loadPrototypePolicy } from '../src/config/policyLoader';
import { ActionChecker } from '../src/checker/actionChecker';
import { DecisionEngine } from '../src/decision/decisionEngine';
import { SharedFinancialCalculator } from '@shared/calculator';
import { applySourceAdvice } from '../src/orchestrator/reviewWorkflow';
import { AssistantAgent } from '../src/ai/assistantAgent';

describe('Useful next steps and paired profiles', () => {
  it('changes the required card minimum branch when the current funds cover the due amount', () => {
    const seed = createBlankUserSeedData();
    const baseline = prepare('debt', seed);
    const funded = prepare('debt', seed, 'debt-funded');
    expect(funded.state.balances[0].amount).toBe(baseline.state.debts[0].minimumPayment);
    const actions = [baseline, funded].map(fixture => {
      const snapshot = buildFinancialSnapshot(fixture.state, { referenceNowIso: asOf });
      return ActionChecker.discoverCriticalActions({ snapshot, policy: loadPrototypePolicy(), calculatorExtras: fixture.extras });
    });
    expect(actions[0].some(row => row.actionId === 'A005')).toBe(true);
    expect(actions[1].some(row => row.actionId === 'A005')).toBe(false);
    expect(actions[1].some(row => row.actionId === 'A001')).toBe(true);
  });

  it.each(['EU', 'US'])('uses the correct source scope for the %s hardship contact', country => {
    const fixture = prepare('debt', createBlankUserSeedData());
    fixture.state.profile.country = country;
    const snapshot = buildFinancialSnapshot(fixture.state, { referenceNowIso: asOf });
    const ctx = { snapshot, calculatorExtras: fixture.extras, policy: loadPrototypePolicy() };
    const candidate = ActionChecker.discoverCriticalActions(ctx).find(row => row.actionId === 'A005')!;
    expect(candidate.supportingSourceIds).toEqual(country === 'US' ? ['S004'] : []);
    expect(candidate.description).toContain('45');
    const decision = DecisionEngine.runDecisionEngine({ evaluationId: 'contact-' + country, snapshot,
      checkerOutput: ActionChecker.runCheckerPipeline([], ctx), policy: ctx.policy, calculatorExtras: fixture.extras });
    expect(decision.selectedActionId).toBe('A005');
    expect(decision.sourceIds).toEqual(country === 'US' ? ['S004'] : []);
    expect(candidate.amount).toBe(country === 'US' ? 20 : null);
    const explanation = AssistantAgent.generateExplanation(decision, snapshot);
    expect(explanation.reasoning).not.toContain('Sources: S001');
    expect(explanation.reasoning).toContain(country === 'US' ? 'Sources: S004' : 'Sources: None attached');
  });

  it('keeps a clarification on Today without inventing a financial effect', () => {
    const fixture = prepare('strong', createBlankUserSeedData());
    const snapshot = buildFinancialSnapshot(fixture.state, { referenceNowIso: asOf });
    const policy = loadPrototypePolicy();
    const decision = DecisionEngine.runDecisionEngine({ evaluationId: 'clarify', snapshot, policy,
      checkerOutput: ActionChecker.runCheckerPipeline([], { snapshot, policy, calculatorExtras: fixture.extras }, false),
      calculatorExtras: fixture.extras });
    const result = applySourceAdvice(decision, [], {
      question: 'What are the current dated balances?', missingInfo: 'current balances', route: 'accounts',
    }).decision;
    expect(result).toMatchObject({ decisionStatus: 'NEEDS_DATA', clarificationRoute: 'accounts',
      clarificationQuestion: 'What are the current dated balances?', rawImpacts: null, score: null });
    expect(result.trace.missingDataFields).toContain('current balances');
    const fxBlocked = applySourceAdvice({ ...decision, missingFields: ['verified_fx_rate_HUF'] }, [], {
      question: 'What reserve do you want?', missingInfo: 'reserve target',
    }).decision;
    expect(fxBlocked.clarificationQuestion).toContain('Verified FX rates for HUF');
    expect(fxBlocked.missingFields).not.toContain('reserve target');
    expect(fxBlocked.score).toBeNull();
  });

  it('reports dated funding separately from horizon capacity', () => {
    const fixture = prepare('debt', createBlankUserSeedData());
    const snapshot = buildFinancialSnapshot(fixture.state, { referenceNowIso: asOf });
    const projection = SharedFinancialCalculator.projectNetCashTrajectory90d(snapshot, fixture.extras);
    const minimum = projection.paymentCoverage.find(row => row.targetType === 'debt_minimum')!;
    expect(minimum).toMatchObject({ dueDate: '2026-11-08', amountDue: 65, liquidAvailableByDue: 20, shortfallAmountF019: 45 });
    expect(projection.availableCashBeforeActionF003).toBeGreaterThan(20);
  });
});
