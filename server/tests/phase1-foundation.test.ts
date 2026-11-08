import {
FORMULA_OWNERSHIP_MAP,
SharedFinancialCalculator,
} from '@shared/calculator';
import {
CheckFailure,
PrototypePolicyBundle,
PrototypePolicyBundleSchema,
} from '@shared/contracts';
import { beforeEach,describe,expect,it } from 'vitest';
import { ASCatalogRepository } from '../src/catalog/asCatalogRepository';
import { ActionChecker } from '../src/checker/actionChecker';
import { loadPrototypePolicy,resetPolicyCache } from '../src/config/policyLoader';
import {
createBaselineSolventFixture,
createCandidateActionFixture,
createImminentBillShortfallFixture,
createMultiCurrencyFixture,
createRiskyAutoTransferFixture,
createUnknownDebtTermsFixture,
createZeroGoalsFixture,
} from './helpers/testFixtures';

describe('Phase 1 Foundation: Policy Loader, AS Catalog (DB_FACT), SharedFinancialCalculator (F001-F020), and ActionChecker', () => {
  let policy: PrototypePolicyBundle;

  beforeEach(() => {
    resetPolicyCache();
    policy = loadPrototypePolicy();
  });

  // ==========================================================================
  // 1. Prototype Policy Loader (`PROTOTYPE_ONLY` centralized config)
  // ==========================================================================
  describe('1. Prototype Policy Loader & Schema Verification', () => {
    it('loads prototype-policy.json and validates against PrototypePolicyBundleSchema', () => {
      const parsed = PrototypePolicyBundleSchema.parse(policy);
      expect(parsed).toBeDefined();
      expect(parsed.policyMeta.status).toBe('PROTOTYPE_ONLY');
      expect(parsed.policyMeta.empiricallyValidated).toBe(false);
      expect(parsed.policyMeta.evidenceGapRefs).toEqual(
        expect.arrayContaining(['G004', 'G005', 'G006'])
      );
    });

    it('confirms allowArbitraryKFMinFallback === false and all policy sub-bundles are PROTOTYPE_ONLY', () => {
      expect(policy.normalizationPolicy.allowArbitraryKFMinFallback).toBe(false);
      expect(policy.weightPolicy.status).toBe('PROTOTYPE_ONLY');
      expect(policy.normalizationPolicy.status).toBe('PROTOTYPE_ONLY');
      expect(policy.effortRubricPolicy.status).toBe('PROTOTYPE_ONLY');
      expect(policy.scoringPolicy.status).toBe('PROTOTYPE_ONLY');
      expect(policy.robustnessPolicy.status).toBe('PROTOTYPE_ONLY');

      expect(policy.effortRubricPolicy.formulaRef).toBe('F016');
      expect(policy.scoringPolicy.formulaRef).toBe('F017');
      expect(policy.robustnessPolicy.formulaRef).toBe('F018');
    });

    it('verifies each weight profile sums to 1.0 and hysteresis bounds are consistent', () => {
      const { profiles, hysteresis } = policy.weightPolicy;
      expect(hysteresis.liquidityExitAtOrAboveMonths).toBeGreaterThan(
        hysteresis.liquidityEnterBelowMonths
      );
      for (const profileId of Object.keys(profiles) as Array<keyof typeof profiles>) {
        const w = profiles[profileId];
        const sum = Number((w.R + w.F + w.G).toFixed(4));
        expect(sum).toBe(1);
      }
    });
  });

  // ==========================================================================
  // 2. AS & Catalog Repository (`DB_FACT`)
  // ==========================================================================
  describe('2. AS & Catalog Repository (DB_FACT Integrity & Separation)', () => {
    it('loads all 24 sources (S001-S024), 33 claims (31 VERIFIED, 2 PENDING_ORIGINAL_REOPEN), 18 rules, 20 formulas, 26 actions, and 60 agent mappings', () => {
      const db = ASCatalogRepository.load();

      expect(db.sources).toHaveLength(24);
      expect(db.sources[0].source_id).toBe('S001');
      expect(db.sources[23].source_id).toBe('S024');

      expect(db.allClaims).toHaveLength(33);
      expect(db.verifiedClaims).toHaveLength(31);
      const pendingReopenClaims = db.allClaims.filter(
        (c) => c.verification_status === 'PENDING_ORIGINAL_REOPEN'
      );
      expect(pendingReopenClaims).toHaveLength(2);
      expect(pendingReopenClaims.map((c) => c.claim_id).sort()).toEqual(['C032', 'C033']);
      expect(
        db.verifiedClaims.some((c) => c.verification_status === 'PENDING_ORIGINAL_REOPEN')
      ).toBe(false);

      expect(db.rules).toHaveLength(18);
      expect(db.rules[0].rule_id).toBe('R001');
      expect(db.rules[17].rule_id).toBe('R018');

      expect(db.formulas).toHaveLength(20);
      expect(db.formulas[0].formula_id).toBe('F001');
      expect(db.formulas[19].formula_id).toBe('F020');

      expect(db.catalogActions).toHaveLength(26);
      expect(db.catalogActions[0].action_id).toBe('A001');
      expect(db.catalogActions[25].action_id).toBe('A026');

      expect(db.agentKnowledgeMappings).toHaveLength(60);
    });

    it('preserves canonical status === PENDING_REVIEW and approved_for_production === NO on all 26 actions', () => {
      const db = ASCatalogRepository.load();
      for (const action of db.catalogActions) {
        expect(action.status).toBe('PENDING_REVIEW');
        expect(action.approved_for_production).toBe('NO');
        expect(action.prototype_enabled).toBe(true);
      }
    });

    it('separates FINANCIAL_ACTION, VERIFICATION_ACTION, and EDUCATIONAL_ACTION and ensures AK051-AK060 does not exclude A005 or A013 from Today', () => {
      const db = ASCatalogRepository.load();

      const financialIds = db.catalogActions
        .filter((a) => a.action_type === 'FINANCIAL_ACTION')
        .map((a) => a.action_id);
      const verificationIds = db.catalogActions
        .filter((a) => a.action_type === 'VERIFICATION_ACTION')
        .map((a) => a.action_id);
      const educationalIds = db.catalogActions
        .filter((a) => a.action_type === 'EDUCATIONAL_ACTION')
        .map((a) => a.action_id);

      expect(financialIds).toEqual([
        'A001',
        'A002',
        'A005',
        'A007',
        'A008',
        'A010',
        'A011',
        'A012',
        'A013',
        'A015',
        'A018',
        'A019',
      ]);
      expect(verificationIds).toEqual([
        'A003',
        'A004',
        'A006',
        'A009',
        'A014',
        'A016',
        'A017',
        'A020',
        'A024',
        'A025',
        'A026',
      ]);
      expect(educationalIds).toEqual(['A021', 'A022', 'A023']);

      // Educational actions have today_enabled === false
      for (const eduId of educationalIds) {
        const entry = ASCatalogRepository.getActionById(eduId);
        expect(entry?.today_enabled).toBe(false);
      }

      // Operational actions mapped to AI Assistant in AK051-AK060 (such as A005 and A013) remain today_enabled === true
      const a005 = ASCatalogRepository.getActionById('A005');
      const a013 = ASCatalogRepository.getActionById('A013');
      expect(a005?.assistant_mapped).toBe(true);
      expect(a005?.today_enabled).toBe(true);
      expect(a013?.assistant_mapped).toBe(true);
      expect(a013?.today_enabled).toBe(true);

      // Every formula F001..F020 has a single explicit code owner in FORMULA_OWNERSHIP_MAP
      for (const f of db.formulas) {
        expect(FORMULA_OWNERSHIP_MAP[f.formula_id]).toBeDefined();
      }
    });
  });

  // ==========================================================================
  // 3. SharedFinancialCalculator (`F001-F015, F019, F020` & Multi-Currency)
  // ==========================================================================
  describe('3. SharedFinancialCalculator (F001-F015, F019, F020 & FX Handling)', () => {
    it('F001 & F002: computes liquid funds and emergency months coverage, and internal transfer between equally liquid checking accounts yields Delta R = 0', () => {
      const { snapshot, extras } = createBaselineSolventFixture();

      const liqBefore = SharedFinancialCalculator.computeLiquidEmergencyFunds(snapshot, extras);
      expect(liqBefore.totalLiquidAccessible).toBe(1700);
      expect(liqBefore.dedicatedEmergencyReserve).toBe(300);
      expect(liqBefore.uncommittedLiquidCash).toBe(400);

      const monthsBefore = SharedFinancialCalculator.computeEmergencyMonthsCoverage(
        liqBefore.dedicatedEmergencyReserve,
        snapshot.essentialCommitment?.estimatedMonthlyAmount ?? null
      );
      expect(monthsBefore).toBe(0.3);

      // Simulate internal transfer of €150 from Main Checking (1200 -> 1050) to Secondary Checking (200 -> 350)
      const transferredSnapshot = {
        ...snapshot,
        accountSummaries: snapshot.accountSummaries.map((as) => {
          if (as.account.id === 'acc_checking_eur') {
            return { ...as, personalAccessibleBalance: 1050 };
          }
          if (as.account.id === 'acc_secondary_checking_eur') {
            return { ...as, personalAccessibleBalance: 350 };
          }
          return as;
        }),
      };

      const liqAfter = SharedFinancialCalculator.computeLiquidEmergencyFunds(
        transferredSnapshot,
        extras
      );
      const monthsAfter = SharedFinancialCalculator.computeEmergencyMonthsCoverage(
        liqAfter.dedicatedEmergencyReserve,
        transferredSnapshot.essentialCommitment?.estimatedMonthlyAmount ?? null
      );

      expect(liqAfter.totalLiquidAccessible).toBe(1700);
      expect(liqAfter.dedicatedEmergencyReserve).toBe(300);
      expect((monthsAfter ?? 0) - (monthsBefore ?? 0)).toBe(0);

      // Verify F002 returns null when essentialMonthlyExpense is null or <= 0 (never inventing a denominator)
      expect(SharedFinancialCalculator.computeEmergencyMonthsCoverage(300, null)).toBeNull();
      expect(SharedFinancialCalculator.computeEmergencyMonthsCoverage(300, 0)).toBeNull();
    });

    it('F003, F004 & F019: preserves negative projected cash balances in F004 without being masked by F003 max(0, ...) and computes F019 shortfall before due date', () => {
      const { snapshot, extras } = createImminentBillShortfallFixture({
        canCoverCardMinimum: false,
      });

      const proj = SharedFinancialCalculator.projectNetCashTrajectory90d(snapshot, extras, null);

      // F003 clamps optional available cash to >= 0
      expect(proj.availableCashBeforeActionF003).toBeGreaterThanOrEqual(0);

      // F004 preserves negative cash deficits!
      expect(proj.minProjectedCashSignedF004).toBeLessThan(0);
      expect(proj.hasProjectedDeficit).toBe(true);
      expect(proj.dailyTrajectory.some((pt) => pt.netCashSigned < 0)).toBe(true);

      // F019 accurately reports shortfall on imminent card minimum and rent obligation
      expect(proj.shortfallsByObligation.length).toBeGreaterThanOrEqual(2);
      const cardShortfall = proj.shortfallsByObligation.find(
        (s) => s.targetId === 'debt_cc_imminent'
      );
      const rentShortfall = proj.shortfallsByObligation.find(
        (s) => s.targetId === 'obl_rent_imminent'
      );
      expect(cardShortfall?.shortfallAmountF019).toBe(20); // €40 due - €20 available = €20 shortfall
      expect(rentShortfall?.shortfallAmountF019).toBe(650); // €0 available before €650 rent = €650 shortfall
    });

    it('F005-F010: computes daily periodic APR, daily interest, loan annuity, payoff horizon, and counterfactual 90d vs 12m debt interest avoided without counting principal as interest saving', () => {
      // F005: 24% APR -> 0.24 / 365
      const dailyRate = SharedFinancialCalculator.computeDailyPeriodicApr(24);
      expect(dailyRate).toBeCloseTo(0.24 / 365, 8);

      // F006: €500 principal * dailyRate
      const dayInterest = SharedFinancialCalculator.computeSimpleDailyInterest(500, dailyRate);
      expect(dayInterest).toBeCloseTo((500 * 0.24) / 365, 6);

      // F007: Loan annuity payment (e.g. €1,200 principal, 1% monthly rate, 12 months)
      const annuity = SharedFinancialCalculator.computeLoanAnnuityPayment(1200, 0.01, 12);
      expect(annuity).toBeCloseTo(106.62, 2);

      // F009: Debt payoff horizon
      const horizonMonths = SharedFinancialCalculator.computeDebtPayoffHorizon(
        1200,
        0.01,
        annuity
      );
      expect(horizonMonths).toBeCloseTo(12, 1);
      // When payment <= monthly interest, never amortizes -> returns null
      expect(SharedFinancialCalculator.computeDebtPayoffHorizon(1200, 0.02, 20)).toBeNull();

      // F008 & F010: 90-day vs 12-month counterfactual interest avoided on €500 debt at 24% APR with €200 extra payment
      const { snapshot } = createBaselineSolventFixture();
      const debt = snapshot.debts[0];
      const horizon90d = policy.horizonAndFreshness.simulationHorizonDays;
      const horizon12mDays = policy.horizonAndFreshness.debtExplanationHorizonMonths * 30;

      const sim90d = SharedFinancialCalculator.computeDebtInterestAvoided({
        debt,
        extraPaymentDay0: 200,
        horizonDays: horizon90d,
        interestAccruing: true,
        avoidedLateFee: 0,
      });
      const sim12m = SharedFinancialCalculator.computeDebtInterestAvoided({
        debt,
        extraPaymentDay0: 200,
        horizonDays: horizon12mDays,
        interestAccruing: true,
        avoidedLateFee: 25,
      });

      // Extra principal payment is €200, but interest avoided over 90 days is ~€11.84 (never €200 + €11.84!)
      expect(sim90d.interestAvoidedF008).toBeGreaterThan(10);
      expect(sim90d.interestAvoidedF008).toBeLessThan(20);
      expect(sim12m.interestAvoidedF008).toBeGreaterThan(sim90d.interestAvoidedF008!);
      expect(sim12m.effectiveIncrementalCostAvoidedF010).toBeCloseTo(
        sim12m.interestAvoidedF008! + 25,
        2
      );
    });

    it('F011 & F020: computes recurring expense saving over 90-day billing occurrences vs 12-month annual saving, plus 90-day fee delta', () => {
      const rec = SharedFinancialCalculator.computeRecurringExpenseSaved({
        monthlyCost: 15,
        exitFees: 5,
        replacementMonthlyCost: 0,
        chargesIn90dWindow: 3,
      });
      // 90-day saving: 3 * €15 - €5 exit fee = €40
      expect(rec.saving90d).toBe(40);
      // 12-month annual F011 saving: 12 * €15 - €5 exit fee = €175
      expect(rec.annualSavingF011).toBe(175);

      // F020: Potential fees avoided over 90 days
      const feeSaved = SharedFinancialCalculator.computePotentialFeesAvoided(27, 0);
      expect(feeSaved).toBe(27);
    });

    it('F012 & F013: computes savings goal progress and monthly required saving', () => {
      expect(SharedFinancialCalculator.computeSavingsGoalProgress(300, 1500)).toBe(0.2);
      expect(SharedFinancialCalculator.computeSavingsGoalProgress(1800, 1500)).toBe(1);
      expect(SharedFinancialCalculator.computeSavingsGoalProgress(300, null)).toBeNull();
      expect(SharedFinancialCalculator.computeSavingsGoalProgress(300, 0)).toBeNull();

      expect(SharedFinancialCalculator.computeMonthlySavingRequired(1000, 200, 4)).toBe(200);
      expect(SharedFinancialCalculator.computeMonthlySavingRequired(1000, 200, 0)).toBeNull();
    });

    it('Multi-currency conversion: handles valid rate (OK), stale rate (STALE), and unsupported currency KGS (UNAVAILABLE without inventing 1:1)', () => {
      const okFixture = createMultiCurrencyFixture({ hufStatus: 'OK' });
      const okConvHuf = SharedFinancialCalculator.convertToBaseCurrency(
        80000,
        'HUF',
        'EUR',
        okFixture.extras.fxRates
      );
      expect(okConvHuf).toEqual({ converted: 200, fxStatus: 'OK' });

      const unavailKgs = SharedFinancialCalculator.convertToBaseCurrency(
        50000,
        'KGS',
        'EUR',
        okFixture.extras.fxRates
      );
      expect(unavailKgs).toEqual({ converted: null, fxStatus: 'UNAVAILABLE' });

      // Total accessible liquid cash includes €1,000 EUR + €200 (from 80,000 HUF) = €1,200, and excludes 50,000 KGS while flagging KGS
      const liqOk = SharedFinancialCalculator.computeLiquidEmergencyFunds(
        okFixture.snapshot,
        okFixture.extras
      );
      expect(liqOk.totalLiquidAccessible).toBe(1200);
      expect(liqOk.fxWarningCurrencies).toEqual(['KGS']);

      // When HUF rate is STALE, it converts using the last known rate but adds HUF to fxWarningCurrencies
      const staleFixture = createMultiCurrencyFixture({ hufStatus: 'STALE' });
      const staleConvHuf = SharedFinancialCalculator.convertToBaseCurrency(
        80000,
        'HUF',
        'EUR',
        staleFixture.extras.fxRates
      );
      expect(staleConvHuf).toEqual({ converted: 200, fxStatus: 'STALE' });
      const liqStale = SharedFinancialCalculator.computeLiquidEmergencyFunds(
        staleFixture.snapshot,
        staleFixture.extras
      );
      expect(liqStale.fxWarningCurrencies).toEqual(expect.arrayContaining(['HUF', 'KGS']));
    });
  });

  // ==========================================================================
  // 4. ActionChecker & Critical Action Coverage (`A001, A005, A011, A020`)
  // ==========================================================================
  describe('4. ActionChecker & Critical Action Coverage (A001, A005, A011, A020)', () => {
    it('rejects non-catalog actions and blocks PENDING_REVIEW actions when runtimeMode.mode === PRODUCTION_MODE', () => {
      const { snapshot, extras } = createBaselineSolventFixture();

      // Non-catalog action ID
      const bogusCandidate = createCandidateActionFixture({ actionId: 'A999' });
      const bogusRes = ActionChecker.validateCandidate(bogusCandidate, {
        snapshot,
        policy,
        calculatorExtras: extras,
      });
      expect(bogusRes.status).toBe('REJECTED');
      expect(bogusRes.failedChecks[0].code).toBe('ACTION_NOT_IN_CATALOG');

      // Production mode gate blocks PENDING_REVIEW actions (where approved_for_production === 'NO')
      const prodPolicy: PrototypePolicyBundle = {
        ...policy,
        runtimeMode: {
          ...policy.runtimeMode,
          mode: 'PRODUCTION_MODE',
        },
      };
      const validProtoCandidate = createCandidateActionFixture({
        actionId: 'A007',
        targetId: 'goal_cushion',
        amount: 100,
      });
      const protoRes = ActionChecker.validateCandidate(validProtoCandidate, {
        snapshot,
        policy,
        calculatorExtras: extras,
      });
      expect(protoRes.status).toBe('VALID');

      const prodRes = ActionChecker.validateCandidate(validProtoCandidate, {
        snapshot,
        policy: prodPolicy,
        calculatorExtras: extras,
      });
      expect(prodRes.status).toBe('REJECTED');
      expect(
        prodRes.failedChecks.some((f: CheckFailure) => f.code === 'NOT_APPROVED_FOR_PRODUCTION')
      ).toBe(true);
    });

    it('blocks EDUCATIONAL_ACTION (A021-A023) from Today with TODAY_DISABLED_EDUCATIONAL_ACTION', () => {
      const { snapshot, extras } = createBaselineSolventFixture();

      for (const eduId of ['A021', 'A022', 'A023']) {
        const cand = createCandidateActionFixture({
          actionId: eduId,
          actionType: 'EDUCATIONAL_ACTION',
          amount: null,
        });
        const res = ActionChecker.validateCandidate(cand, {
          snapshot,
          policy,
          calculatorExtras: extras,
        });
        expect(res.status).toBe('REJECTED');
        expect(
          res.failedChecks.some((f: CheckFailure) => f.code === 'TODAY_DISABLED_EDUCATIONAL_ACTION')
        ).toBe(true);
      }
    });

    it('returns NEEDS_DATA when APR or due date is missing for A002, and automatically proposes VERIFICATION_ACTION A004 to unlock it', () => {
      const { snapshot, extras } = createUnknownDebtTermsFixture({
        missingApr: true,
        missingDueDate: true,
      });

      const a002Candidate = createCandidateActionFixture({
        actionId: 'A002',
        targetId: 'debt_cc_unknown_terms',
        amount: 100,
      });

      const batch = ActionChecker.runCheckerPipeline([a002Candidate], {
        snapshot,
        policy,
        calculatorExtras: extras,
      });

      const a002Result = batch.needsDataCandidates.find(
        (r) => r.candidate.actionId === 'A002'
      );
      expect(a002Result).toBeDefined();
      expect(a002Result?.status).toBe('NEEDS_DATA');
      expect(a002Result?.missingFields).toEqual(
        expect.arrayContaining(['debt_apr', 'debt_due_date'])
      );

      // Verify A004 was automatically generated and validated to unlock A002
      const a004Result = batch.allResults.find(
        (r) => r.candidate.actionId === 'A004'
      );
      expect(a004Result).toBeDefined();
      expect(a004Result?.status).toBe('NEEDS_DATA');
      expect(a004Result?.missingFields).toContain('required_pi:card_statement');
      expect(a004Result?.unlocksActionIds).toContain('A002');
    });

    it('returns NEEDS_DATA when subscription usage/exit terms are unconfirmed for A015, and proposes VERIFICATION_ACTION A014', () => {
      const { snapshot, extras } = createBaselineSolventFixture();

      const a015Candidate = createCandidateActionFixture({
        actionId: 'A015',
        targetId: 'txn_sub_cloudbox',
        amount: 15,
      });

      const batch = ActionChecker.runCheckerPipeline([a015Candidate], {
        snapshot,
        policy,
        calculatorExtras: extras,
        userConfirmedUnusedSubscriptionIds: [],
        verifiedCancellationTermsByTargetId: {},
      });

      const a015Result = batch.needsDataCandidates.find(
        (r) => r.candidate.actionId === 'A015'
      );
      expect(a015Result).toBeDefined();
      expect(a015Result?.status).toBe('NEEDS_DATA');
      expect(a015Result?.missingFields).toContain(
        'subscription_usage_and_exit_terms_confirmation'
      );

      const a014Result = batch.allResults.find(
        (r) => r.candidate.actionId === 'A014'
      );
      expect(a014Result).toBeDefined();
      expect(a014Result?.status).toBe('NEEDS_DATA');
      expect(a014Result?.missingFields).toContain('required_pi:merchant');
      expect(a014Result?.unlocksActionIds).toContain('A015');
    });

    it('rejects goal actions (A012, A013) when user has 0 active goals (R012)', () => {
      const { snapshot, extras } = createZeroGoalsFixture();
      const a012 = createCandidateActionFixture({
        actionId: 'A012',
        targetId: 'non_existent_goal',
        amount: 50,
      });
      const res = ActionChecker.validateCandidate(a012, {
        snapshot,
        policy,
        calculatorExtras: extras,
      });
      expect(res.status).toBe('REJECTED');
      expect(res.failedChecks.some((f: CheckFailure) => f.code === 'NO_ACTIVE_GOAL')).toBe(true);
    });

    it('independently discovers Critical Actions (A011, A001, A005, A020) when AI omits them, and marks A020 with resolvesCriticalProblemDirectly === false ranked below direct mitigation', () => {
      // Case A: Risky scheduled automatic transfer triggers A011 (rank 1, direct resolution) and A020 (rank 3, diagnostic only)
      const risky = createRiskyAutoTransferFixture();
      const riskyBatch = ActionChecker.runCheckerPipeline([], {
        snapshot: risky.snapshot,
        policy,
        calculatorExtras: risky.extras,
      });

      expect(riskyBatch.criticalCoverageAddedIds).toEqual(
        expect.arrayContaining(['A011', 'A020'])
      );
      expect(riskyBatch.validCriticalCandidates.length).toBeGreaterThanOrEqual(1);

      const topCritical = riskyBatch.validCriticalCandidates[0];
      const diagnosticA020 = riskyBatch.rejectedCandidates.find(
        (r) => r.candidate.actionId === 'A020'
      );

      expect(topCritical.candidate.actionId).toBe('A011');
      expect(topCritical.resolvesCriticalProblemDirectly).toBe(true);
      expect(topCritical.criticalPriorityRank).toBe(1);

      expect(diagnosticA020).toBeDefined();
      expect(diagnosticA020?.resolvesCriticalProblemDirectly).toBe(false);
      expect(diagnosticA020?.criticalPriorityRank).toBeGreaterThan(
        topCritical.criticalPriorityRank!
      );

      // Case B: Imminent card minimum where user CAN cover the minimum (€100 cash vs €40 min due in 2 days) -> discovers A001 (rank 2) above A020 (rank 3)
      const canCoverMin = createImminentBillShortfallFixture({ canCoverCardMinimum: true });
      const canCoverBatch = ActionChecker.runCheckerPipeline([], {
        snapshot: canCoverMin.snapshot,
        policy,
        calculatorExtras: canCoverMin.extras,
      });
      expect(canCoverBatch.criticalCoverageAddedIds).toEqual(
        expect.arrayContaining(['A001', 'A020'])
      );
      expect(canCoverBatch.validCriticalCandidates[0].candidate.actionId).toBe('A001');
      expect(canCoverBatch.validCriticalCandidates[0].resolvesCriticalProblemDirectly).toBe(true);

      // Case C: Imminent card minimum where user CANNOT cover the minimum (€20 cash vs €40 min due in 2 days) -> discovers A005 (rank 1) above A020 (rank 3)
      const cannotCoverMin = createImminentBillShortfallFixture({ canCoverCardMinimum: false });
      const cannotCoverBatch = ActionChecker.runCheckerPipeline([], {
        snapshot: cannotCoverMin.snapshot,
        policy,
        calculatorExtras: cannotCoverMin.extras,
      });
      expect(cannotCoverBatch.criticalCoverageAddedIds).toEqual(
        expect.arrayContaining(['A005', 'A020'])
      );
      expect(cannotCoverBatch.validCriticalCandidates[0].candidate.actionId).toBe('A005');
      expect(cannotCoverBatch.validCriticalCandidates[0].resolvesCriticalProblemDirectly).toBe(
        true
      );
      expect(cannotCoverBatch.validCriticalCandidates[0].criticalPriorityRank).toBe(1);
    });
  });
});
