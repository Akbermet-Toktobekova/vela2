import {
  PrototypePolicyBundle,
  WeightProfileId,
  WeightSelectionResult,
  WeightSelectionResultSchema,
} from '@shared/contracts';
import { FinancialSnapshot } from '@shared/pi/types';
import { CalculatorContextExtras, SharedFinancialCalculator } from '@shared/calculator';

function diffDaysIso(startIso: string, endIso: string): number {
  const s = new Date(startIso.slice(0, 10) + 'T00:00:00Z').getTime();
  const e = new Date(endIso.slice(0, 10) + 'T00:00:00Z').getTime();
  return Math.round((e - s) / (1000 * 60 * 60 * 24));
}

function normalizeWeights(raw: { R: number; F: number; G: number }): {
  R: number;
  F: number;
  G: number;
} {
  const sum = raw.R + raw.F + raw.G;
  if (!(sum > 0)) {
    throw new Error('Invalid weight profile: total weight must be positive.');
  }
  const R = Number((raw.R / sum).toFixed(4));
  const F = Number((raw.F / sum).toFixed(4));
  const G = Number(Math.max(0, 1 - R - F).toFixed(4));
  return { R, F, G };
}

export class WeightCalculator {
  /**
   * Computes F002 total-liquid expense coverage for profile selection.
   * Convert essential expenses to base currency and require current FX.
   */
  static computeEffectiveCoverageMonths(
    snapshot: FinancialSnapshot,
    calculatorExtras?: CalculatorContextExtras
  ): number | null {
    const essentials = snapshot.essentialCommitment;
    const liq = SharedFinancialCalculator.computeLiquidEmergencyFunds(snapshot, calculatorExtras);
    if (!essentials || essentials.estimatedMonthlyAmount === null || liq.fxWarningCurrencies.length) return null;
    const converted = SharedFinancialCalculator.convertToBaseCurrency(
      essentials.estimatedMonthlyAmount, essentials.currency, snapshot.baseCurrency, calculatorExtras?.fxRates);
    if (converted.fxStatus !== 'OK') return null;
    return SharedFinancialCalculator.computeEmergencyMonthsCoverage(liq.totalLiquidAccessible, converted.converted);
  }

  /**
   * Step 5B: Selects personalized weight profile W = (w_R, w_F, w_G) with Hysteresis.
   * Reads all numerical thresholds and profile weights strictly from PrototypePolicyBundle.
   */
  static selectWeightProfile(params: {
    snapshot: FinancialSnapshot;
    policy: PrototypePolicyBundle;
    previousProfileId?: WeightProfileId | null;
    calculatorExtras?: CalculatorContextExtras;
  }): WeightSelectionResult {
    const { snapshot, policy, previousProfileId = null, calculatorExtras } = params;
    const weightPolicy = policy.weightPolicy;
    const enterBelow = weightPolicy.hysteresis.liquidityEnterBelowMonths;
    const exitAtOrAbove = weightPolicy.hysteresis.liquidityExitAtOrAboveMonths;
    const refDate = (calculatorExtras?.referenceDateIso || snapshot.createdAt).slice(0, 10);
    const horizonDays = policy.horizonAndFreshness.simulationHorizonDays;

    const coverageMonths = this.computeEffectiveCoverageMonths(snapshot, calculatorExtras);

    // 1. Check Liquidity Protection (with Hysteresis)
    if (coverageMonths === null) {
      const weights = normalizeWeights(weightPolicy.profiles.liquidity_protection);
      return WeightSelectionResultSchema.parse({
        profileId: 'liquidity_protection',
        previousProfileId,
        hysteresisApplied: false,
        weights,
        triggerReason:
          'Essential monthly expense is unconfirmed; defaulting to liquidity_protection until coverage M (F002) is verified.',
        policyVersion: weightPolicy.version,
      });
    }

    if (coverageMonths < enterBelow) {
      const weights = normalizeWeights(weightPolicy.profiles.liquidity_protection);
      return WeightSelectionResultSchema.parse({
        profileId: 'liquidity_protection',
        previousProfileId,
        hysteresisApplied: false,
        weights,
        triggerReason: `Liquid expense coverage M = ${coverageMonths.toFixed(2)} months is below entry threshold ${enterBelow.toFixed(2)} months.`,
        policyVersion: weightPolicy.version,
      });
    }

    if (previousProfileId === 'liquidity_protection' && coverageMonths < exitAtOrAbove) {
      const weights = normalizeWeights(weightPolicy.profiles.liquidity_protection);
      return WeightSelectionResultSchema.parse({
        profileId: 'liquidity_protection',
        previousProfileId,
        hysteresisApplied: true,
        weights,
        triggerReason: `Hysteresis active: previous profile was liquidity_protection and M = ${coverageMonths.toFixed(2)} months is below exit threshold ${exitAtOrAbove.toFixed(2)} months.`,
        policyVersion: weightPolicy.version,
      });
    }

    // 2. Check Expensive Debt profile
    const aprThreshold = weightPolicy.expensiveDebtThresholdApr;
    const expensiveDebt = snapshot.debts.find((d) => {
      if (d.remainingBalance === null || !(d.remainingBalance > 0)) return false;
      if (d.apr === null || d.apr < aprThreshold) return false;

      if (!weightPolicy.requireActiveInterestAccrualOrImminentPromoExpiry) {
        return true;
      }

      const terms = calculatorExtras?.debtTerms?.[d.id];
      const interestAccruing = terms?.interestAccruing === true;
      let imminentPromoExpiry = false;
      if (terms?.promoEndDate) {
        const daysToPromoEnd = diffDaysIso(refDate, terms.promoEndDate);
        imminentPromoExpiry = daysToPromoEnd >= 0 && daysToPromoEnd <= horizonDays;
      }
      return interestAccruing || imminentPromoExpiry;
    });

    if (expensiveDebt) {
      const weights = normalizeWeights(weightPolicy.profiles.expensive_debt);
      return WeightSelectionResultSchema.parse({
        profileId: 'expensive_debt',
        previousProfileId,
        hysteresisApplied: false,
        weights,
        triggerReason: `Coverage M = ${coverageMonths.toFixed(2)} months is outside liquidity_protection and debt '${expensiveDebt.name}' has active APR ${expensiveDebt.apr}% >= ${aprThreshold}%.`,
        policyVersion: weightPolicy.version,
      });
    }

    // 3. Check Goal Advancement profile (requires at least one active unfulfilled goal)
    const base = snapshot.baseCurrency || 'EUR';
    const activeUnfulfilledGoal = snapshot.goals.find((g) => {
      if (g.targetAmount === null || !(g.targetAmount > 0)) return false;
      const targetConv = SharedFinancialCalculator.convertToBaseCurrency(
        g.targetAmount,
        g.currency || base,
        base,
        calculatorExtras?.fxRates
      );
      if (targetConv.converted === null || targetConv.fxStatus !== 'OK') return false;
      const targetInBase = targetConv.converted;

      let missingFx = false;
      const allocatedInBase = snapshot.goalAllocations
        .filter((ga) => ga.goalId === g.id)
        .reduce((sum, ga) => {
          const c = SharedFinancialCalculator.convertToBaseCurrency(
            ga.amount,
            ga.currency || base,
            base,
            calculatorExtras?.fxRates
          );
          if (c.converted === null || c.fxStatus !== 'OK') { missingFx = true; return sum; }
          return sum + c.converted;
        }, 0);

      return !missingFx && allocatedInBase < targetInBase;
    });

    if (activeUnfulfilledGoal) {
      const weights = normalizeWeights(weightPolicy.profiles.goal_advancement);
      return WeightSelectionResultSchema.parse({
        profileId: 'goal_advancement',
        previousProfileId,
        hysteresisApplied: false,
        weights,
        triggerReason: `Coverage M = ${coverageMonths.toFixed(2)} months is sufficient, no high-APR debt is accruing, and goal '${activeUnfulfilledGoal.name}' is active and unfulfilled.`,
        policyVersion: weightPolicy.version,
      });
    }

    // 4. Fallback: Balanced profile
    const weights = normalizeWeights(weightPolicy.profiles.balanced);
    return WeightSelectionResultSchema.parse({
      profileId: 'balanced',
      previousProfileId,
      hysteresisApplied: false,
      weights,
      triggerReason: `Fallback balanced profile selected (M = ${coverageMonths.toFixed(2)} months, no expensive debt >= ${aprThreshold}%, and no active unfulfilled savings goal).`,
      policyVersion: weightPolicy.version,
    });
  }
}
