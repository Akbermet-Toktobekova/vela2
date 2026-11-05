import { describe, it, expect } from 'vitest';
import { ActionChecker } from '../src/checker/actionChecker';
import { loadPrototypePolicy } from '../src/config/policyLoader';
import { createBaselineSolventFixture, createCandidateActionFixture, createRiskyAutoTransferFixture } from './helpers/testFixtures';
const policy = loadPrototypePolicy();
describe('Core Checker publication gates', () => {
  it('uses canonical requirements even when AI omits them', () => {
    const {snapshot, extras} = createBaselineSolventFixture();
    snapshot.debts[0].apr = null;
    const result = ActionChecker.validateCandidate(createCandidateActionFixture({actionId:'A002', targetId:snapshot.debts[0].id, requiredPiInputs:[]}), {snapshot, calculatorExtras:extras, policy});
    expect(result.status).toBe('NEEDS_DATA');
    expect(result.missingFields).toContain('required_pi:apr');
    expect(result.inputEvidence).toContainEqual({field:'apr',status:'MISSING'});
  });
  it('rejects unsupported catalog financial effects', () => {
    const {snapshot, extras} = createBaselineSolventFixture();
    const result = ActionChecker.validateCandidate(createCandidateActionFixture({actionId:'A019'}), {snapshot, calculatorExtras:extras, policy});
    expect(result.status).toBe('REJECTED');
    expect(result.failedChecks.some(c=>c.code==='UNSUPPORTED_ACTION')).toBe(true);
  });
  it('rejects allocation that exceeds source cash', () => {
    const {snapshot, extras} = createBaselineSolventFixture();
    const result = ActionChecker.validateCandidate(createCandidateActionFixture({actionId:'A007', amount:100000, targetId:snapshot.safetyCushionGoal!.id}), {snapshot, calculatorExtras:extras, policy});
    expect(result.status).toBe('REJECTED');
    expect(result.failedChecks.some(c=>c.layer==='AFFORDABILITY')).toBe(true);
  });
  it('never treats an unknown target as the first debt', () => {
    const {snapshot, extras} = createBaselineSolventFixture();
    const result = ActionChecker.validateCandidate(createCandidateActionFixture({actionId:'A001', targetId:'unknown', amount:25}), {snapshot, calculatorExtras:extras, policy});
    expect(result.status).toBe('REJECTED');
  });
  it('suppresses duplicate shortfall diagnosis after validated mitigation', () => {
    const {snapshot, extras} = createRiskyAutoTransferFixture();
    const result = ActionChecker.runCheckerPipeline([], {snapshot, calculatorExtras:extras, policy});
    const pause = result.allResults.find(r=>r.candidate.actionId==='A011');
    expect(pause?.status).toBe('VALID');
    expect(pause?.resolvesCriticalProblemDirectly).toBe(true);
    expect(result.validCriticalCandidates.some(r=>r.candidate.actionId==='A020')).toBe(false);
    expect(result.rejectedCandidates.some(r=>r.failedChecks.some(c=>c.code==='SHORTFALL_RESOLVED_BY_A011'))).toBe(true);
  });
  it('reports stale and invalid PI instead of passing it', () => {
    const {snapshot, extras} = createBaselineSolventFixture();
    snapshot.accountSummaries[0].isStale = true;
    snapshot.essentialCommitment!.estimatedMonthlyAmount = -1;
    const result = ActionChecker.validateCandidate(createCandidateActionFixture({actionId:'A007', targetId:snapshot.safetyCushionGoal!.id}), {snapshot, calculatorExtras:extras, policy});
    expect(result.status).toBe('NEEDS_DATA');
    expect(result.missingFields).toContain('stale_account_balance');
    expect(result.missingFields).toContain('essential_monthly_expense');
    expect(result.inputEvidence).toContainEqual({field:'liquid_balance',status:'STALE'});
  });
  it('uses dated incoming cash for a required minimum instead of the opening balance', () => {
    const {snapshot, extras} = createBaselineSolventFixture();
    snapshot.goalAllocations = [];
    snapshot.upcomingUnpaidObligations = [];
    snapshot.accountSummaries = [snapshot.accountSummaries[0]];
    snapshot.accountSummaries[0].personalAccessibleBalance = 0;
    snapshot.accountSummaries[0].latestBalance!.amount = 0;
    snapshot.accountSummaries[0].allocatedToGoals = 0;
    snapshot.debts[0].nextDueDate = '2026-11-06';
    const result = ActionChecker.validateCandidate(createCandidateActionFixture({actionId:'A001', targetId:snapshot.debts[0].id,amount:snapshot.debts[0].minimumPayment}), {snapshot,calculatorExtras:extras,policy});
    expect(result.status).toBe('VALID');
  });
  it('detects stale balance timestamps even if snapshot freshness flags were omitted', () => {
    const {snapshot, extras} = createBaselineSolventFixture();
    snapshot.accountSummaries[0].latestBalance!.asOf = '2020-01-01';
    const result = ActionChecker.validateCandidate(createCandidateActionFixture({actionId:'A009',actionType:'VERIFICATION_ACTION'}), {snapshot,calculatorExtras:extras,policy});
    expect(result.status).toBe('NEEDS_DATA');
    expect(result.inputEvidence).toContainEqual({field:'liquid_balance',status:'STALE'});
  });
});
