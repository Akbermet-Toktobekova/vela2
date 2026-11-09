import { SharedFinancialCalculator as Calculator, type CalculatorContextExtras } from '@shared/calculator';
import type { FinancialSnapshot } from '@shared/pi/types';

export function calculateFinancialMetrics(snapshot: FinancialSnapshot, extras: CalculatorContextExtras) {
  const liquidity = Calculator.computeLiquidEmergencyFunds(snapshot, extras);
  const cashflow = Calculator.projectNetCashTrajectory90d(snapshot, extras);
  const essentials = snapshot.essentialCommitment;
  const essentialConversion = essentials?.estimatedMonthlyAmount == null ? null :
    Calculator.convertToBaseCurrency(essentials.estimatedMonthlyAmount, essentials.currency, snapshot.baseCurrency, extras.fxRates);
  const essentialBase = essentialConversion?.fxStatus === 'OK' ? essentialConversion.converted : null;
  const validLiquidity = liquidity.fxWarningCurrencies.length === 0;
  return {
    currency: snapshot.baseCurrency, referenceDate: extras.referenceDateIso ?? snapshot.createdAt.slice(0, 10),
    liquidity, cashflow, essentialMonthlyExpense: essentialBase,
    liquidExpenseCoverageMonths: validLiquidity ? Calculator.computeEmergencyMonthsCoverage(liquidity.totalLiquidAccessible, essentialBase) : null,
    emergencyReserveAllocated: validLiquidity ? liquidity.dedicatedEmergencyReserve : null,
    emergencyReserveCoverageMonths: validLiquidity ? Calculator.computeEmergencyMonthsCoverage(liquidity.dedicatedEmergencyReserve, essentialBase) : null,
    optionalActionCash: cashflow.missingInputs?.length ? null : cashflow.availableCashBeforeActionF003,
  };
}
