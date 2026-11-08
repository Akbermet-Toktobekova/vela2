import { z } from 'zod';
import type { FinancialSnapshot } from '@shared/pi/types';
import { type CalculatorContextExtras, SharedFinancialCalculator as Calculator } from '@shared/calculator';
import { loadPrototypePolicy } from '../config/policyLoader';
import { LLMClient, wrapUntrustedData } from '../ai/llmClient';
import { prompts } from '../ai/prompts';

const responseSchema = z.object({
  observations: z.array(z.object({ debtId: z.string(), focus: z.enum(['TERMS', 'TIMING', 'COST', 'PAYOFF']) })),
});

export function calculateDebtReport(snapshot: FinancialSnapshot, extras: CalculatorContextExtras = {}) {
  const policy = loadPrototypePolicy().horizonAndFreshness;
  const referenceDate = (extras.referenceDateIso ?? snapshot.createdAt).slice(0, 10);
  const annualEnd = new Date(referenceDate + 'T00:00:00Z');
  annualEnd.setUTCMonth(annualEnd.getUTCMonth() + policy.debtExplanationHorizonMonths);
  const annualDays = Math.round((+annualEnd - Date.parse(referenceDate)) / 86400000);
  return snapshot.debts.map(debt => {
    const terms = extras.debtTerms?.[debt.id];
    const knownAccrual = terms?.interestAccruing ?? (debt.apr === 0 || debt.remainingBalance === 0 ? false : undefined);
    const calculate = (horizonDays: number) => knownAccrual === undefined ? null :
      Calculator.computeDebtInterestAvoided({
        debt, extraPaymentDay0: 0, horizonDays, referenceDateIso: referenceDate, interestAccruing: knownAccrual,
      });
    const near = calculate(policy.simulationHorizonDays);
    const annual = calculate(annualDays);
    const missingInputs = [...new Set([
      ...(knownAccrual === undefined ? ['interestAccruing'] : []),
      ...(debt.apr == null ? ['apr'] : []),
      ...(debt.remainingBalance == null ? ['remainingBalance'] : []),
      ...(debt.minimumPayment == null ? ['minimumPayment'] : []),
      ...(!debt.nextDueDate ? ['nextDueDate'] : []),
      ...(!debt.paymentFrequency ? ['paymentFrequency'] : []),
      ...(near?.missingInputs ?? []),
    ])];
    const payoffMonths = debt.remainingBalance != null && debt.minimumPayment != null &&
      debt.apr != null && knownAccrual !== undefined && debt.paymentFrequency === 'monthly' ?
      Calculator.computeDebtPayoffHorizon(debt.remainingBalance, knownAccrual ? debt.apr / 1200 : 0, debt.minimumPayment) : null;
    return {
      debtId: debt.id, currency: debt.currency, referenceDate, apr: debt.apr,
      balance: debt.remainingBalance, minimumPayment: debt.minimumPayment, dueDate: debt.nextDueDate,
      interest90dBaseline: near?.baselineInterest ?? null, interest12mBaseline: annual?.baselineInterest ?? null,
      payoffMonths, missingInputs, status: missingInputs.length ? 'NEEDS_DATA' as const : 'OK' as const,
      formulaRefs: ['F005', 'F006', 'F008', 'F009', 'F010'],
    };
  });
}

export class DebtAgent {
  static async analyzeDebts(params: { snapshot: FinancialSnapshot; calculatorExtras?: CalculatorContextExtras; llmClient: LLMClient; calculated?: ReturnType<typeof calculateDebtReport> }) {
    const debtsAnalyzed = params.calculated ?? calculateDebtReport(params.snapshot, params.calculatorExtras);
    const fallback = () => ({ observations: [] });
    const result = debtsAnalyzed.length ? await params.llmClient.generateStructured({
      systemPrompt: prompts.debt.text,
      userPrompt: wrapUntrustedData(JSON.stringify(debtsAnalyzed), 'debt_metrics'),
      schema: responseSchema, fallback,
    }).catch(() => null) : null;
    const parsed = responseSchema.safeParse(result?.data);
    const observations = parsed.success && result?.liveCallUsed ?
      parsed.data.observations.filter(item => debtsAnalyzed.some(debt => debt.debtId === item.debtId &&
        (item.focus === 'TERMS' || (item.focus === 'TIMING' && debt.dueDate) ||
         (item.focus === 'COST' && debt.interest90dBaseline !== null) || (item.focus === 'PAYOFF' && debt.payoffMonths !== null)))) : [];
    // Render figures directly from the calculator. The model selects supported topics only.
    const summaryText = debtsAnalyzed.length ? debtsAnalyzed.map((debt, index) => {
      const clauses = [
        debt.apr == null ? 'APR unknown' : 'APR ' + debt.apr + '%',
        debt.dueDate ? 'next due ' + debt.dueDate : 'due date unknown',
        debt.interest90dBaseline == null ? 'baseline interest unavailable' :
          'baseline interest ' + debt.currency + ' ' + debt.interest90dBaseline + ' over the analysis horizon',
        debt.payoffMonths == null ? 'payoff horizon unavailable' : 'estimated payoff ' + debt.payoffMonths + ' months',
      ];
      const preferred = observations.find(item => item.debtId === debt.debtId)?.focus;
      const position = preferred ? ['TERMS', 'TIMING', 'COST', 'PAYOFF'].indexOf(preferred) : 0;
      const ordered = [clauses[position], ...clauses.filter((_, i) => i !== position)];
      return 'Debt ' + (index + 1) + ': ' + ordered.join(', ') +
        (debt.missingInputs.length ? '. Missing: ' + debt.missingInputs.join(', ') : '') + '.';
    }).join(' ') : 'No debt records are present in this snapshot.';
    return { debtsAnalyzed, observations, summaryText, models: result ? [{
      provider: result.provider, modelUsed: result.modelUsed, liveCallUsed: result.liveCallUsed,
      fallbackReason: result.fallbackReason,
    }] : [] };
  }
}
export type DebtAnalysisOutput = Awaited<ReturnType<typeof DebtAgent.analyzeDebts>>;
