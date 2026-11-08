import { SharedFinancialCalculator as Calculator,CalculatorContextExtras } from '@shared/calculator';
import { CandidateAction,ImpactSimulationResult,ImpactSimulationResultSchema,PrototypePolicyBundle } from '@shared/contracts';
import { FinancialSnapshot } from '@shared/pi/types';

export class ImpactCalculator {
  static computeResilienceDelta(before: number, after: number): number { return Number((after - before).toFixed(4)); }
  static computeGoalProgressDelta(before: number, after: number): number { return Number((after - before).toFixed(4)); }

  static evaluateFinancialImpact(params: { candidate: CandidateAction; snapshot: FinancialSnapshot; policy: PrototypePolicyBundle; calculatorExtras?: CalculatorContextExtras }): ImpactSimulationResult {
    const { candidate, snapshot, policy } = params;
    const horizonDays = policy.horizonAndFreshness.simulationHorizonDays;
    const extras = { ...params.calculatorExtras, referenceDateIso: params.calculatorExtras?.referenceDateIso || new Date().toISOString().slice(0, 10), simulationHorizonDays: horizonDays };
    const reference = extras.referenceDateIso.slice(0, 10);
    const actionDate = candidate.proposedTiming?.slice(0, 10) || reference;
    const norm = policy.normalizationPolicy;
    const missing = new Set<string>();
    const convert = (amount: number, currency: string) => {
      const result = Calculator.convertToBaseCurrency(amount, currency, snapshot.baseCurrency, extras.fxRates);
      if (result.fxStatus !== 'OK') missing.add(`verified_fx_rate_${currency}`);
      return result.converted ?? 0;
    };
    const essential = snapshot.essentialCommitment?.estimatedMonthlyAmount;
    const essentialBase = essential === null || essential === undefined ? 0 : convert(essential, snapshot.essentialCommitment!.currency);
    const K_F = essentialBase > 0 ? norm.K_F_essentialExpenseFraction * essentialBase : null;
    const raw = {
      beforeTerminalLiquidCash: 0, afterTerminalLiquidCash: 0,
      beforeTerminalDate: reference, afterTerminalDate: reference,
      deltaResilienceMonths: 0, deltaFinancialBenefitCurrency: 0, deltaGoalProgressFraction: 0,
      beforeResilienceMonths: 0, afterResilienceMonths: 0, beforeCost90d: 0, afterCost90d: 0,
      beforeGoalProgress: 0, afterGoalProgress: 0,
      annualizedRecurringSaving12m: null as number | null, debt12mCounterfactualInterestAvoided: null as number | null,
    };
    const result = (status: ImpactSimulationResult['status']): ImpactSimulationResult => {
      const ratios = [raw.deltaResilienceMonths / norm.K_R_months, K_F ? raw.deltaFinancialBenefitCurrency / K_F : 0, raw.deltaGoalProgressFraction / norm.K_G_goalProgressFraction];
      const clip = (value: number) => Number(Math.max(norm.clipMin, Math.min(norm.clipMax, value)).toFixed(4));
      return ImpactSimulationResultSchema.parse({
        candidateId: candidate.candidateId, actionId: candidate.actionId, horizonDays, status,
        scenarioMetadata: { referenceDate: reference, actionDate, terminalDate: raw.beforeTerminalDate,
          currency: snapshot.baseCurrency, cashUnit: 'currency', resilienceUnit: 'months', goalUnit: 'fraction',
          policyVersion: policy.policyMeta.policyBundleVersion, inputSnapshotId: snapshot.id,
          assumptions: ['Same dated confirmed income and mandatory obligations in both scenarios.',
            'Debt uses simple daily interest on outstanding principal and verified dated minimum payments; no future borrowing.',
            'Internal allocations change earmarks, not total liquid wealth.'] },
        missingInputs: [...missing], rawImpacts: raw, referenceScales: { K_R: norm.K_R_months, K_F, K_G: norm.K_G_goalProgressFraction },
        normalizedValues: { v_R: clip(ratios[0]), v_F: clip(ratios[1]), v_G: clip(ratios[2]) },
        saturationFlags: { R_clipped: clip(ratios[0]) !== Number(ratios[0].toFixed(4)), F_clipped: clip(ratios[1]) !== Number(ratios[1].toFixed(4)), G_clipped: clip(ratios[2]) !== Number(ratios[2].toFixed(4)) },
        doubleCountingCheckPassed: true, normalizationPolicyVersion: norm.version,
      });
    };
    if (candidate.actionType !== 'FINANCIAL_ACTION') return result('NOT_APPLICABLE_NON_FINANCIAL');
    if (!K_F || !Number.isFinite(essentialBase)) missing.add('essential_monthly_expense');
    const supported = ['A001', 'A002', 'A007', 'A008', 'A011', 'A012', 'A015'];
    const neutralInternalTransfer = candidate.actionId === 'A010' && !!snapshot.accountSummaries.find(a => a.account.id === candidate.destinationAccountId && a.account.fundsOwnership === 'personal' && a.personalAccessibleBalance !== null);
    if (!supported.includes(candidate.actionId) && !neutralInternalTransfer) missing.add(`unsupported_financial_effect_${candidate.actionId}`);
    if (!Number.isFinite(Date.parse(actionDate)) || actionDate < reference) missing.add('valid_action_date');
    const amount = candidate.amount === null ? 0 : convert(candidate.amount, candidate.currency);
    if (['A001', 'A002', 'A007', 'A008', 'A012'].includes(candidate.actionId) && !(amount > 0)) missing.add('action_amount');

    const baseline = Calculator.projectNetCashTrajectory90d(snapshot, extras, null);
    const after = Calculator.projectNetCashTrajectory90d(snapshot, extras, candidate);
    for (const field of [...baseline.missingInputs || [], ...after.missingInputs || []]) missing.add(field);
    const end = baseline.dailyTrajectory.at(-1)!;
    const actionInHorizon = actionDate <= end.date;
    const effectiveAmount = actionInHorizon ? amount : 0;
    const allocations = snapshot.goalAllocations.reduce((sum, allocation) => sum + convert(allocation.amount, allocation.currency), 0);
    const goal = snapshot.goals.find(g => g.id === candidate.targetId);
    const earmarks = ['A007', 'A008', 'A012'].includes(candidate.actionId) && !!goal;
    raw.beforeTerminalDate = end.date;
    raw.afterTerminalDate = after.dailyTrajectory.at(-1)!.date;
    // Earmarks restrict spendable cash; they do not create or destroy liquid assets.
    raw.beforeTerminalLiquidCash = Number((end.netCashSigned + allocations).toFixed(2));
    raw.afterTerminalLiquidCash = Number((after.dailyTrajectory.at(-1)!.netCashSigned + allocations + (earmarks ? effectiveAmount : 0)).toFixed(2));
    const liquid = Calculator.computeLiquidEmergencyFunds(snapshot, extras);
    const reserveIncrease = ['A007', 'A008'].includes(candidate.actionId) && goal?.goalType === 'emergency_cushion' ? effectiveAmount : 0;
    const reserveBefore = Math.min(liquid.dedicatedEmergencyReserve, Math.max(0, raw.beforeTerminalLiquidCash));
    const reserveAfter = Math.min(liquid.dedicatedEmergencyReserve + reserveIncrease, Math.max(0, raw.afterTerminalLiquidCash));
    if (essentialBase > 0) {
      raw.beforeResilienceMonths = Calculator.computeEmergencyMonthsCoverage(reserveBefore, essentialBase)!;
      raw.afterResilienceMonths = Calculator.computeEmergencyMonthsCoverage(reserveAfter, essentialBase)!;
      raw.deltaResilienceMonths = this.computeResilienceDelta(raw.beforeResilienceMonths, raw.afterResilienceMonths);
    }
    if (candidate.actionId === 'A002' || candidate.actionId === 'A001') {
      const debt = snapshot.debts.find(d => d.id === candidate.targetId);
      const terms = debt ? extras.debtTerms?.[debt.id] : undefined;
      if (!debt || debt.apr === null || debt.remainingBalance === null || debt.minimumPayment === null || !debt.nextDueDate || !debt.paymentFrequency) missing.add('verified_debt_balance_apr_and_schedule');
      if (!terms) missing.add('verified_debt_interest_accrual');
      if (debt && debt.apr !== null && debt.remainingBalance !== null && terms) {
        // The baseline already pays mandatory minimums. A001 adds no extra principal payment.
        const payment = candidate.actionId === 'A002' ? candidate.amount || 0 : 0;
        if (candidate.currency !== debt.currency) missing.add('action_debt_currency_match');
        const debtImpact = Calculator.computeDebtInterestAvoided({ debt, extraPaymentDay0: actionInHorizon ? payment : 0, horizonDays, referenceDateIso: reference, paymentDateIso: actionDate, interestAccruing: terms.interestAccruing });
        for (const field of debtImpact.missingInputs) missing.add('debt_' + field);
        if (debtImpact.baselineInterest !== null && debtImpact.afterActionInterest !== null) {
          raw.beforeCost90d = convert(debtImpact.baselineInterest, debt.currency);
          raw.afterCost90d = convert(debtImpact.afterActionInterest, debt.currency);
        }
        const annualEnd = new Date(reference + 'T00:00:00Z');
        annualEnd.setUTCMonth(annualEnd.getUTCMonth() + policy.horizonAndFreshness.debtExplanationHorizonMonths);
        const annualDays = Math.round((annualEnd.getTime() - Date.parse(reference + 'T00:00:00Z')) / 86400000);
        const annual = Calculator.computeDebtInterestAvoided({ debt, extraPaymentDay0: payment, horizonDays: annualDays, referenceDateIso: reference, paymentDateIso: actionDate, interestAccruing: terms.interestAccruing });
        raw.debt12mCounterfactualInterestAvoided = annual.interestAvoidedF008 === null ? null : convert(annual.interestAvoidedF008, debt.currency);
      }
    }
    if (candidate.actionId === 'A015' && candidate.targetId) {
      const obligation = snapshot.upcomingUnpaidObligations.find(o => o.id === candidate.targetId);
      const transaction = snapshot.transactions.find(t => t.id === candidate.targetId && t.amount < 0);
      const target = obligation || (transaction ? { amount: Math.abs(transaction.amount), currency: transaction.currency } : undefined);
      const dates = extras.confirmedSubscriptionBillingDatesByTargetId?.[candidate.targetId];
      const fee = extras.confirmedExitFeesByTargetId?.[candidate.targetId];
      const replacement = extras.confirmedReplacementCostMonthlyByTargetId?.[candidate.targetId];
      if (!target) missing.add('verified_subscription_target');
      if (!dates) missing.add('verified_subscription_billing_dates');
      if (fee === undefined) missing.add('verified_subscription_exit_fee');
      if (replacement === undefined) missing.add('verified_subscription_replacement_cost');
      if (replacement && (!obligation || obligation.recurrence !== 'monthly')) missing.add('verified_monthly_replacement_billing_alignment');
      if (target && dates && fee !== undefined && replacement !== undefined) {
        const applicable = dates.filter(date => date >= reference && date >= actionDate && date <= end.date);
        const scheduled = obligation ? Calculator.getScheduledOccurrenceDates(obligation.dueDate, obligation.recurrence, reference, horizonDays).filter(date => date >= actionDate) : applicable;
        if (scheduled.length !== applicable.length || scheduled.some(date => !applicable.includes(date))) missing.add('consistent_subscription_billing_dates');
        raw.beforeCost90d = convert(target.amount * applicable.length, target.currency);
        raw.afterCost90d = convert(replacement * applicable.length + (actionInHorizon ? fee : 0), target.currency);
        const annualEnd = new Date(reference + 'T00:00:00Z');
        annualEnd.setUTCMonth(annualEnd.getUTCMonth() + policy.horizonAndFreshness.debtExplanationHorizonMonths);
        const annualDays = Math.round((annualEnd.getTime() - Date.parse(reference + 'T00:00:00Z')) / 86400000);
        const annualSchedule = obligation ? Calculator.getScheduledOccurrenceDates(obligation.dueDate, obligation.recurrence, reference, annualDays).filter(date => date >= actionDate) : [];
        if (obligation && annualSchedule.every(date => dates.includes(date))) {
          raw.annualizedRecurringSaving12m = convert((target.amount - replacement) * annualSchedule.length - fee, target.currency);
        }
      }
    }
    raw.deltaFinancialBenefitCurrency = Number((raw.beforeCost90d - raw.afterCost90d).toFixed(2));
    if (earmarks && goal && goal.targetAmount && goal.targetAmount > 0) {
      const target = convert(goal.targetAmount, goal.currency);
      const saved = snapshot.goalAllocations.filter(g => g.goalId === goal.id).reduce((sum, g) => sum + convert(g.amount, g.currency), 0);
      raw.beforeGoalProgress = Calculator.computeSavingsGoalProgress(saved, target) || 0;
      raw.afterGoalProgress = Calculator.computeSavingsGoalProgress(saved + effectiveAmount, target) || 0;
      // Emergency goal gain is already represented in resilience; avoid double counting it.
      raw.deltaGoalProgressFraction = goal.goalType === 'emergency_cushion' ? 0 : this.computeGoalProgressDelta(raw.beforeGoalProgress, raw.afterGoalProgress);
    }
    return result(missing.size ? 'NEEDS_DATA' : 'COMPUTED');
  }
}
