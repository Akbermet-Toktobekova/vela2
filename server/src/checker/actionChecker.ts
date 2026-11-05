import {
  CandidateAction,
  CheckFailure,
  PrototypePolicyBundle,
  ValidationResult,
  ValidationResultSchema,
} from '@shared/contracts';
import { FinancialSnapshot, RecommendationRecord } from '@shared/pi/types';
import { CalculatorContextExtras, SharedFinancialCalculator } from '@shared/calculator';
import { ASCatalogRepository, KnowledgeDatabaseSnapshot } from '../catalog/asCatalogRepository';

export interface CheckerContext {
  snapshot: FinancialSnapshot;
  policy: PrototypePolicyBundle;
  knowledgeDb?: KnowledgeDatabaseSnapshot;
  calculatorExtras?: CalculatorContextExtras;
  existingRecommendations?: RecommendationRecord[];
  userConfirmedUnusedSubscriptionIds?: string[];
  verifiedCancellationTermsByTargetId?: Record<string, { exitFee: number; canCancel: boolean }>;
  verifiedAccountFeeSchedules?: Record<string, boolean>;
  verifiedUkDpcAgreement?: boolean;
}

export interface CheckerBatchOutput {
  allResults: ValidationResult[];
  validFinancialCandidates: ValidationResult[];
  validCriticalCandidates: ValidationResult[];
  validVerificationCandidates: ValidationResult[];
  rejectedCandidates: ValidationResult[];
  needsDataCandidates: ValidationResult[];
  missingFieldsUnion: string[];
  criticalCoverageAddedIds: string[];
  fallbackTriggered: boolean;
}

function diffDays(startIso: string, endIso: string): number {
  const s = new Date(startIso.slice(0, 10) + 'T00:00:00Z').getTime();
  const e = new Date(endIso.slice(0, 10) + 'T00:00:00Z').getTime();
  return Math.round((e - s) / (1000 * 60 * 60 * 24));
}

export class ActionChecker {
  /**
   * STEP 4A: Deterministic Critical Action Coverage (Independent of AI Suggestion Generator)
   * Evaluates PI conditions for A001, A005, A011, A020.
   */
  static discoverCriticalActions(ctx: CheckerContext): CandidateAction[] {
    const { snapshot, policy, calculatorExtras } = ctx;
    const db = ctx.knowledgeDb || ASCatalogRepository.load();
    const refDate = (calculatorExtras?.referenceDateIso || new Date().toISOString()).slice(0, 10);
    const windowDays = policy.horizonAndFreshness.imminentObligationWindowDays;
    const baseProj = SharedFinancialCalculator.projectNetCashTrajectory90d(
      snapshot,
      calculatorExtras,
      null
    );

    const criticals: CandidateAction[] = [];

    // 1. Check A011: Risky scheduled automatic transfer causing cash deficit / bill shortfall
    for (const tr of calculatorExtras?.scheduledTransfers || []) {
      if (!tr.isActive) continue;
      if (baseProj.hasProjectedDeficit) {
        const candidatePause: CandidateAction = {
          candidateId: `crit_A011_${tr.id}`,
          actionId: 'A011',
          actionType: 'FINANCIAL_ACTION',
          title: `Pause scheduled ${snapshot.baseCurrency} ${tr.amount} transfer (${tr.description})`,
          description: `Pausing this scheduled automatic transfer on ${tr.scheduledDate} prevents a projected cash shortfall before mandatory bills.`,
          rationale: `Projected minimum cash drops to ${baseProj.minProjectedCashSignedF004.toFixed(2)} ${snapshot.baseCurrency} under current automatic transfers.`,
          targetId: tr.id,
          sourceAccountId: tr.fromAccountId,
          destinationAccountId: tr.toAccountId,
          amount: tr.amount,
          currency: tr.currency,
          proposedTiming: tr.scheduledDate,
          supportingRuleIds: ['R001', 'R004'],
          supportingClaimIds: ['C005'],
          supportingSourceIds: ['S001'],
          requiredPiInputs: ['scheduled_transfer', 'cash_projection'],
          origin: 'CRITICAL_COVERAGE',
        };
        const afterPauseProj = SharedFinancialCalculator.projectNetCashTrajectory90d(
          snapshot,
          calculatorExtras,
          candidatePause
        );
        if (afterPauseProj.minProjectedCashSignedF004 > baseProj.minProjectedCashSignedF004) {
          criticals.push(candidatePause);
        }
      }
    }

    // 2. Check A001 & A005: Imminent credit-card minimum payment due
    for (const debt of snapshot.debts) {
      if (!debt.nextDueDate || debt.minimumPayment === null || debt.minimumPayment <= 0) continue;
      if (debt.remainingBalance !== null && debt.remainingBalance <= 0) continue;
      const daysUntilDue = diffDays(refDate, debt.nextDueDate);
      if (daysUntilDue >= 0 && daysUntilDue <= windowDays) {
        const shortfallRecord = baseProj.shortfallsByObligation.find(
          (s) => s.targetId === debt.id && s.targetType === 'debt_minimum'
        );
        const hasShortfall =
          (shortfallRecord && shortfallRecord.shortfallAmountF019 > 0) ||
          (!shortfallRecord && baseProj.startingLiquidCash < debt.minimumPayment);

        if (!hasShortfall) {
          // A001: Make required card minimum
          criticals.push({
            candidateId: `crit_A001_${debt.id}`,
            actionId: 'A001',
            actionType: 'FINANCIAL_ACTION',
            title: `Pay required ${debt.currency} ${debt.minimumPayment} minimum on ${debt.name}`,
            description: `Your required minimum payment of ${debt.currency} ${debt.minimumPayment} is due on ${debt.nextDueDate} (${daysUntilDue} days).`,
            rationale: `Timely minimum payment prevents late fees and contractual penalty consequences (R001, R005).`,
            targetId: debt.id,
            sourceAccountId: snapshot.accountSummaries[0]?.account.id || null,
            destinationAccountId: null,
            amount: debt.minimumPayment,
            currency: debt.currency,
            proposedTiming: debt.nextDueDate,
            supportingRuleIds: ['R001', 'R005'],
            supportingClaimIds: ['C013'],
            supportingSourceIds: ['S002'],
            requiredPiInputs: ['amount_due', 'due_date', 'bank_balance', 'obligations'],
            origin: 'CRITICAL_COVERAGE',
          });
        } else {
          // A005: Request card hardship options (cannot meet required minimum)
          criticals.push({
            candidateId: `crit_A005_${debt.id}`,
            actionId: 'A005',
            actionType: 'FINANCIAL_ACTION',
            title: `Contact ${debt.name} issuer for hardship payment options`,
            description: `Required minimum of ${debt.currency} ${debt.minimumPayment} is due on ${debt.nextDueDate}, but available liquid funds are insufficient.`,
            rationale: `CFPB guidance (S004, R008) recommends contacting the card issuer immediately when required minimum payments cannot be met.`,
            targetId: debt.id,
            sourceAccountId: null,
            destinationAccountId: null,
            amount: Math.max(0, baseProj.startingLiquidCash),
            currency: debt.currency,
            proposedTiming: refDate,
            supportingRuleIds: ['R008'],
            supportingClaimIds: ['C017', 'C018'],
            supportingSourceIds: ['S004'],
            requiredPiInputs: ['issuer_contact', 'minimum_due', 'affordable_payment'],
            origin: 'CRITICAL_COVERAGE',
          });
        }
      }
    }

    // 3. Check A020: Identify upcoming cash shortfall (Diagnostic Critical Verification Action)
    if (baseProj.hasProjectedDeficit) {
      const firstShortfall = baseProj.shortfallsByObligation[0];
      const deficitAmt = firstShortfall
        ? firstShortfall.shortfallAmountF019
        : Math.abs(baseProj.minProjectedCashSignedF004);
      const dueStr = firstShortfall?.dueDate || baseProj.minProjectedCashDate || refDate;
      const a020Cat = db.catalogActions.find((a) => a.action_id === 'A020');
      if (a020Cat) {
        criticals.push({
          candidateId: `crit_A020_deficit`,
          actionId: 'A020',
          actionType: 'VERIFICATION_ACTION',
          title: `Review projected ${snapshot.baseCurrency} ${deficitAmt.toFixed(0)} cash shortfall before ${dueStr}`,
          description: `Projected cash drops below required obligations by ${dueStr}${firstShortfall ? ` (${firstShortfall.name})` : ''}. Review upcoming bills and available balances.`,
          rationale: `Diagnostic alert (F004, F019, R009): flags upcoming payment shortfall for user verification without assuming automatic resolution.`,
          targetId: firstShortfall?.targetId || null,
          sourceAccountId: null,
          destinationAccountId: null,
          amount: deficitAmt,
          currency: snapshot.baseCurrency,
          proposedTiming: dueStr,
          supportingRuleIds: ['R009'],
          supportingClaimIds: ['C004', 'C009'],
          supportingSourceIds: ['S001', 'S007'],
          requiredPiInputs: ['cash', 'due_obligations', 'confirmed_income'],
          origin: 'CRITICAL_COVERAGE',
        });
      }
    }

    return criticals;
  }

  /**
   * Validates a single candidate across all 4 Checker layers:
   * 1) Catalog Eligibility
   * 2) Data Sufficiency
   * 3) Affordability (C_a(d) >= B_min(d) over 90 days)
   * 4) Applicability & Safety Rules (R001..R018)
   */
  static validateCandidate(
    candidate: CandidateAction,
    ctx: CheckerContext
  ): ValidationResult {
    const { snapshot, policy, calculatorExtras, existingRecommendations = [] } = ctx;
    const db = ctx.knowledgeDb || ASCatalogRepository.load();
    const catalogEntry = db.catalogActions.find((a) => a.action_id === candidate.actionId);

    const failedChecks: CheckFailure[] = [];
    const missingFields: string[] = [];

    // ------------------------------------------------------------------------
    // LAYER 1: CATALOG ELIGIBILITY & PRODUCTION / PROTOTYPE GATES
    // ------------------------------------------------------------------------
    if (!catalogEntry) {
      failedChecks.push({
        layer: 'CATALOG_ELIGIBILITY',
        code: 'ACTION_NOT_IN_CATALOG',
        detail: `Action ID '${candidate.actionId}' does not exist in Approved Action Catalog A001-A026.`,
      });
      return ValidationResultSchema.parse({
        candidate,
        status: 'REJECTED',
        isCritical: false,
        criticalPriorityRank: null,
        resolvesCriticalProblemDirectly: false,
        failedChecks,
        missingFields,
        projectedMinCashAfterAction: null,
        unlocksActionIds: [],
      });
    }

    // Ensure actionType matches catalog definition
    const normalizedCandidate: CandidateAction = {
      ...candidate,
      actionType: catalogEntry.action_type,
      requiredPiInputs: catalogEntry.required_inputs_list,
      proposedTiming: candidate.actionId === 'A001'
        ? snapshot.debts.find(d => d.id === candidate.targetId)?.nextDueDate || candidate.proposedTiming
        : candidate.proposedTiming,
    };

    // Only these actions have executable financial/safety semantics in this MVP.
    const supported = new Set(['A001', 'A002', 'A003', 'A004', 'A005', 'A006', 'A007', 'A008', 'A009', 'A011', 'A012', 'A014', 'A015', 'A017', 'A020', 'A026']);
    if (!supported.has(candidate.actionId)) failedChecks.push({
      layer: 'CATALOG_ELIGIBILITY', code: 'UNSUPPORTED_ACTION',
      detail: `Action ${candidate.actionId} has no complete executable safety model in the local MVP.`,
    });
    if (!catalogEntry.prototype_enabled || (policy.runtimeMode.mode === 'PROTOTYPE_MODE' && !policy.runtimeMode.allowPendingReviewActionsInPrototype)) {
      failedChecks.push({ layer: 'CATALOG_ELIGIBILITY', code: 'PROTOTYPE_ACTION_DISABLED', detail: 'Catalog/runtime prototype gate is disabled.' });
    }

    // Production gate check (Review Point 2)
    if (
      policy.runtimeMode.mode === 'PRODUCTION_MODE' &&
      policy.runtimeMode.requireApprovedForProductionInLive &&
      catalogEntry.approved_for_production !== 'YES'
    ) {
      failedChecks.push({
        layer: 'CATALOG_ELIGIBILITY',
        code: 'NOT_APPROVED_FOR_PRODUCTION',
        detail: `Action ${candidate.actionId} has status=${catalogEntry.status} and approved_for_production=${catalogEntry.approved_for_production}.`,
      });
    }

    // Today eligibility (Review Point 4 & 5: Educational actions do not appear as main Today recommendations)
    if (!catalogEntry.today_enabled) {
      failedChecks.push({
        layer: 'CATALOG_ELIGIBILITY',
        code: 'TODAY_DISABLED_EDUCATIONAL_ACTION',
        detail: `Action ${candidate.actionId} (${catalogEntry.action_type}) is reserved for AI Assistant / contextual explanation and cannot be selected as the primary Today action.`,
        ruleId: 'R013',
      });
    }

    // Recently declined or already completed check (D-004 point 11)
    const now = Date.parse(calculatorExtras?.referenceDateIso || new Date().toISOString());
    const cooldownMs = policy.horizonAndFreshness.declinedActionCooldownDays * 86400000;
    if (existingRecommendations.some(r => r.finAgentMeta?.catalogActionId === candidate.actionId &&
      (r.status === 'accepted' || r.status === 'adjusted' ||
        (r.status === 'declined' && now - Date.parse(r.updatedAt) >= 0 && now - Date.parse(r.updatedAt) < cooldownMs)))) {
      failedChecks.push({ layer: 'CATALOG_ELIGIBILITY', code: 'PENDING_COMMITMENT_OR_DECLINE_COOLDOWN', detail: 'Action is already pending or is within the configured decline cooldown.' });
    }
    const recentlyDeclinedOrCompleted = existingRecommendations.find(
      (r) =>
        (r.actionType === candidate.actionId || r.id.includes(candidate.actionId)) &&
        (r.status === 'declined' || r.status === 'completed') &&
        r.snapshotId === snapshot.id
    );
    if (recentlyDeclinedOrCompleted) {
      failedChecks.push({
        layer: 'CATALOG_ELIGIBILITY',
        code: 'RECENTLY_DECLINED_OR_COMPLETED_ON_SAME_SNAPSHOT',
        detail: `Action ${candidate.actionId} was already ${recentlyDeclinedOrCompleted.status} on snapshot ${snapshot.id} without material PI changes.`,
      });
    }

    // ------------------------------------------------------------------------
    // LAYER 2: DATA SUFFICIENCY (PI Freshness, FX Validity, Action Inputs)
    // ------------------------------------------------------------------------
    const liq = SharedFinancialCalculator.computeLiquidEmergencyFunds(snapshot, calculatorExtras);

    // Check stale balances on source account or primary accounts
    if (snapshot.dataQuality.staleBalanceAccountIds.length > 0 && candidate.actionType === 'FINANCIAL_ACTION') {
      const affectsStale =
        !candidate.sourceAccountId ||
        snapshot.dataQuality.staleBalanceAccountIds.includes(candidate.sourceAccountId);
      if (affectsStale && candidate.actionId !== 'A005') {
        missingFields.push('fresh_account_balance');
      }
    }

    // Check FX rate availability if action or required accounts involve foreign currencies
    if (liq.fxWarningCurrencies.length > 0 && candidate.currency !== snapshot.baseCurrency) {
      missingFields.push(`verified_fx_rate_${candidate.currency}`);
    }

    // Essential monthly expenses required for normalization K_F and coverage F002 on financial actions
    const essentialMonthly = snapshot.essentialCommitment?.estimatedMonthlyAmount ?? null;
    if (
      normalizedCandidate.actionType === 'FINANCIAL_ACTION' &&
      normalizedCandidate.actionId !== 'A001' &&
      normalizedCandidate.actionId !== 'A005' &&
      normalizedCandidate.actionId !== 'A011' &&
      (!essentialMonthly || essentialMonthly <= 0)
    ) {
      missingFields.push('essential_monthly_expense');
    }

    // Action-specific data sufficiency & safety rules
    const baseProj = SharedFinancialCalculator.projectNetCashTrajectory90d(
      snapshot,
      calculatorExtras,
      null
    );

    // Resolve canonical input names against PI, never against AI assertions.
    const debt = snapshot.debts.find(d => d.id === candidate.targetId);
    const goal = snapshot.goals.find(g => g.id === candidate.targetId);
    const transaction = snapshot.transactions.find(t => t.id === candidate.targetId);
    const bill = snapshot.upcomingUnpaidObligations.find(o => o.id === candidate.targetId);
    const validDate = (v: string | null | undefined) => !!v && Number.isFinite(Date.parse(v));
    const nonnegative = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && v >= 0;
    const cashKnown = snapshot.accountSummaries.length > 0 && snapshot.accountSummaries.every(a => nonnegative(a.personalAccessibleBalance));
    const referenceDate = calculatorExtras?.referenceDateIso || new Date().toISOString();
    const staleBalances = snapshot.accountSummaries.some(a => a.isStale ||
      snapshot.dataQuality.staleBalanceAccountIds.includes(a.account.id) ||
      (!!a.latestBalance && diffDays(a.latestBalance.asOf, referenceDate) > policy.horizonAndFreshness.staleBalanceThresholdDays));
    const datedBills = snapshot.upcomingUnpaidObligations.every(o => nonnegative(o.amount) && validDate(o.dueDate));
    const datedIncome = snapshot.incomeSources.every(i => i.pattern !== 'irregular' && nonnegative(i.estimatedMonthlyAmount) && validDate(i.nextExpectedDate));
    const statement = snapshot.statements.some(s => s.status === 'parsed_successfully');
    const values: Record<string, boolean> = {
      amount_due: nonnegative(debt?.minimumPayment), due_date: validDate(debt?.nextDueDate),
      bank_balance: cashKnown, obligations: datedBills, extra_amount: nonnegative(candidate.amount) && candidate.amount! > 0,
      apr: nonnegative(debt?.apr), balance: nonnegative(debt?.remainingBalance), cash_flow: cashKnown && datedBills && datedIncome,
      debts: snapshot.debts.length > 0, minimums: snapshot.debts.length > 0 && snapshot.debts.every(d => nonnegative(d.minimumPayment)),
      balances: snapshot.debts.length > 0 && snapshot.debts.every(d => nonnegative(d.remainingBalance)), card_statement: statement,
      issuer_contact: !!debt && !!calculatorExtras?.debtTerms?.[debt.id]?.issuerContact?.trim(),
      minimum_due: nonnegative(debt?.minimumPayment), affordable_payment: cashKnown && datedBills && datedIncome,
      country: !!snapshot.profile.country, debt_type: !!debt?.debtType,
      liquid_balance: cashKnown, mandatory_outflows: datedBills, amount: nonnegative(candidate.amount) && candidate.amount! > 0,
      reserve_balance: cashKnown && nonnegative(snapshot.safetyCushionAllocated), due_bills: datedBills,
      essential_monthly_expense: nonnegative(essentialMonthly) && essentialMonthly! > 0,
      scheduled_transfer: !!calculatorExtras?.scheduledTransfers?.some(t => t.id === candidate.targetId && t.isActive && nonnegative(t.amount) && validDate(t.scheduledDate)),
      cash_projection: cashKnown && datedBills && datedIncome,
      goal_target: !!goal && nonnegative(goal.targetAmount) && goal.targetAmount! > 0,
      goal_balance: !!goal && snapshot.goalAllocations.filter(a => a.goalId === goal.id).every(a => nonnegative(a.amount)),
      available_cash: cashKnown && datedBills && datedIncome,
      transactions: snapshot.transactions.length > 0,
      merchant: !!(transaction?.counterparty || bill?.name),
      frequency: !!bill?.recurrence || (!!transaction && !!snapshot.classifications[transaction.id]?.isRecurringCandidate),
      monthly_fee: !!bill && bill.recurrence === 'monthly' && bill.amount > 0,
      exit_terms: !!candidate.targetId && !!ctx.verifiedCancellationTermsByTargetId?.[candidate.targetId],
      due_dates: datedBills, income_dates: datedIncome, bill_amounts: datedBills,
      cash: cashKnown, due_obligations: datedBills, confirmed_income: datedIncome,
      promo_end: !!debt && validDate(calculatorExtras?.debtTerms?.[debt.id]?.promoEndDate),
      promo_balance: !!debt && nonnegative(calculatorExtras?.debtTerms?.[debt.id]?.promoBalance), statement,
    };
    if (candidate.actionId === 'A003') values.apr = snapshot.debts.length > 0 && snapshot.debts.every(d => nonnegative(d.apr));
    const rawInputs: Record<string, unknown> = {
      amount_due: debt?.minimumPayment, minimum_due: debt?.minimumPayment,
      apr: debt?.apr, balance: debt?.remainingBalance, due_date: debt?.nextDueDate,
      amount: candidate.amount, extra_amount: candidate.amount,
      essential_monthly_expense: essentialMonthly,
    };
    const cashFields = new Set(['bank_balance', 'liquid_balance', 'reserve_balance', 'cash', 'available_cash', 'cash_flow', 'cash_projection', 'affordable_payment']);
    const inputEvidence = catalogEntry.required_inputs_list.map(field => {
      const raw = rawInputs[field];
      let status: 'MISSING' | 'INVALID' | 'STALE' | 'VERIFIED' = values[field] ? 'VERIFIED' : 'MISSING';
      if (!values[field] && raw !== undefined && raw !== null) status = 'INVALID';
      if (cashFields.has(field) && staleBalances) status = 'STALE';
      return { field, status };
    });
    for (const field of catalogEntry.required_inputs_list) {
      if (!values[field]) missingFields.push(`required_pi:${field}`);
    }
    for (const evidence of inputEvidence) {
      if (evidence.status === 'STALE') missingFields.push(`stale_pi:${evidence.field}`);
      if (evidence.status === 'INVALID') missingFields.push(`invalid_pi:${evidence.field}`);
    }
    if (normalizedCandidate.actionType === 'FINANCIAL_ACTION') {
      missingFields.push(...(baseProj.missingInputs || []));
      if (staleBalances) missingFields.push('stale_account_balance');
      if (liq.fxWarningCurrencies.length) missingFields.push(...liq.fxWarningCurrencies.map(c => `verified_fx_rate_${c}`));
      if (candidate.amount !== null && !nonnegative(candidate.amount)) missingFields.push('invalid_action_amount');
      if (['A001', 'A002', 'A007', 'A008', 'A012'].includes(candidate.actionId) && !candidate.sourceAccountId) missingFields.push('source_account');
      if (candidate.sourceAccountId) {
        const source = snapshot.accountSummaries.find(a => a.account.id === candidate.sourceAccountId);
        if (!source) missingFields.push('source_account');
        else if (['A002', 'A007', 'A008', 'A012'].includes(candidate.actionId) && candidate.amount !== null) {
          const available = SharedFinancialCalculator.projectSourceCashByDate(snapshot, calculatorExtras, source.account.id, normalizedCandidate.proposedTiming || referenceDate);
          missingFields.push(...available.missingInputs);
          const amount = SharedFinancialCalculator.convertToBaseCurrency(candidate.amount, candidate.currency, snapshot.baseCurrency, calculatorExtras?.fxRates);
          if (amount.converted !== null && amount.converted > available.available) {
            failedChecks.push({ layer: 'AFFORDABILITY', code: 'INSUFFICIENT_SOURCE_ACCOUNT_CASH', detail: 'Source account cannot fund this amount after dated obligations, allocations and pending commitments.', ruleId: 'R002' });
          }
        }
      }
    }


    if (candidate.actionId === 'A001') {
      const targetDebt = snapshot.debts.find((d) => d.id === candidate.targetId);
      if (!targetDebt) {
        failedChecks.push({
          layer: 'CATALOG_ELIGIBILITY',
          code: 'NO_DEBT_RECORD',
          detail: 'No credit card or debt record found for A001.',
        });
      } else {
        if (targetDebt.minimumPayment === null || targetDebt.minimumPayment <= 0) {
          missingFields.push('debt_minimum_payment');
        }
        if (!targetDebt.nextDueDate) {
          missingFields.push('debt_due_date');
        }
      }
    }

    if (candidate.actionId === 'A002') {
      const targetDebt = snapshot.debts.find((d) => d.id === candidate.targetId);
      if (!targetDebt || (targetDebt.remainingBalance !== null && targetDebt.remainingBalance <= 0)) {
        failedChecks.push({
          layer: 'CATALOG_ELIGIBILITY',
          code: 'NO_ACTIVE_DEBT',
          detail: 'No active debt balance to apply extra payment.',
        });
      } else {
        const terms = calculatorExtras?.debtTerms?.[targetDebt.id];
        if (!terms) missingFields.push('verified_debt_interest_terms');
        if (terms?.promoBalance && !terms.promoEndDate) missingFields.push('promo_end_and_product_terms');
        if (candidate.amount !== null && targetDebt.remainingBalance !== null && candidate.amount > targetDebt.remainingBalance) {
          failedChecks.push({ layer: 'SAFETY_POLICY', code: 'PAYMENT_EXCEEDS_DEBT', detail: 'Extra payment exceeds outstanding principal.', ruleId: 'R006' });
        }
        if (targetDebt.apr === null) {
          missingFields.push('debt_apr');
        }
        if (targetDebt.minimumPayment === null) {
          missingFields.push('debt_minimum_payment');
        }
        if (targetDebt.remainingBalance === null) {
          missingFields.push('debt_remaining_balance');
        }
        if (!targetDebt.nextDueDate) {
          missingFields.push('debt_due_date');
        }
      }
    }

    if (candidate.actionId === 'A005') {
      const targetDebt = snapshot.debts.find((d) => d.id === candidate.targetId);
      if (!targetDebt) {
        failedChecks.push({
          layer: 'CATALOG_ELIGIBILITY',
          code: 'NO_DEBT_FOR_HARDSHIP',
          detail: 'No debt record found for A005.',
        });
      } else {
        const terms = calculatorExtras?.debtTerms?.[targetDebt.id];
        if (terms && terms.issuerContact === '') {
          missingFields.push('issuer_contact');
        }
      }
    }

    if (candidate.actionId === 'A007' || candidate.actionId === 'A008') {
      // Safety check: transferring between two equally liquid personal checking accounts without reserve earmark/savings target does not increase resilience
      if (
        candidate.sourceAccountId &&
        candidate.destinationAccountId &&
        candidate.sourceAccountId !== candidate.destinationAccountId
      ) {
        const src = snapshot.accountSummaries.find((a) => a.account.id === candidate.sourceAccountId)?.account;
        const dst = snapshot.accountSummaries.find((a) => a.account.id === candidate.destinationAccountId)?.account;
        if (
          src &&
          dst &&
          !dst.purposes.includes('savings') &&
          !candidate.targetId
        ) {
          failedChecks.push({
            layer: 'SAFETY_POLICY',
            code: 'EQUAL_LIQUIDITY_TRANSFER_NO_RESILIENCE_GAIN',
            detail:
              'Transferring funds between two equally liquid checking accounts without a dedicated reserve target does not increase financial resilience.',
            ruleId: 'R011',
          });
        }
      }
    }

    if (candidate.actionId === 'A012' || candidate.actionId === 'A013') {
      const nonCushionGoals = snapshot.goals.filter(
        (g) => g.targetAmount !== null && g.targetAmount > 0
      );
      const targetGoal =
        snapshot.goals.find((g) => g.id === candidate.targetId);
      if (!targetGoal || !targetGoal.targetAmount || targetGoal.targetAmount <= 0) {
        failedChecks.push({
          layer: 'CATALOG_ELIGIBILITY',
          code: 'NO_ACTIVE_GOAL',
          detail: 'No active financial goal with a positive target amount exists.',
          ruleId: 'R012',
        });
      } else {
        const saved = snapshot.goalAllocations
          .filter((ga) => ga.goalId === targetGoal.id)
          .reduce((s, ga) => s + ga.amount, 0);
        if (saved >= targetGoal.targetAmount) {
          failedChecks.push({
            layer: 'CATALOG_ELIGIBILITY',
            code: 'GOAL_ALREADY_MET',
            detail: `Goal '${targetGoal.name}' is already 100% funded.`,
            ruleId: 'R012',
          });
        }
      }
    }

    if (candidate.actionId === 'A015') {
      // Cancel unused subscription requires confirmed unused status AND reviewed exit terms (R010)
      const confirmedUnused =
        candidate.targetId &&
        ctx.userConfirmedUnusedSubscriptionIds?.includes(candidate.targetId);
      const cancelTerms = candidate.targetId
        ? ctx.verifiedCancellationTermsByTargetId?.[candidate.targetId]
        : undefined;
      if (!confirmedUnused || !cancelTerms) {
        missingFields.push('subscription_usage_and_exit_terms_confirmation');
      } else if (!cancelTerms.canCancel) {
        failedChecks.push({
          layer: 'SAFETY_POLICY',
          code: 'CANCELLATION_NOT_PERMITTED_BY_CONTRACT',
          detail: 'Subscription contract terms do not allow penalty-free cancellation.',
          ruleId: 'R010',
        });
      }
    }

    if (candidate.actionId === 'A024') {
      // UK DPC jurisdiction gate (R014)
      if (snapshot.profile.country !== 'UK' && snapshot.profile.country !== 'GB' && !ctx.verifiedUkDpcAgreement) {
        failedChecks.push({
          layer: 'SAFETY_POLICY',
          code: 'JURISDICTION_MISMATCH_UK_DPC',
          detail: 'Action A024 applies only to in-scope UK regulated deferred payment credit agreements (R014).',
          ruleId: 'R014',
        });
      }
    }

    // ------------------------------------------------------------------------
    // LAYER 3: AFFORDABILITY & CASH-FLOW FLOOR C_a(d) >= B_min(d) (R001, R002, R003, R006)
    // ------------------------------------------------------------------------
    let projectedMinCashAfterAction: number | null = baseProj.minProjectedCashSignedF004;

    if (normalizedCandidate.actionType === 'FINANCIAL_ACTION') {
      const spendsCash = new Set(['A001', 'A002', 'A007', 'A008', 'A010', 'A012']);
      if (spendsCash.has(candidate.actionId)) {
        if (candidate.amount === null || !(candidate.amount > 0)) {
          missingFields.push('action_amount');
        } else {
          const afterProj = SharedFinancialCalculator.projectNetCashTrajectory90d(
            snapshot,
            calculatorExtras,
            normalizedCandidate
          );
          projectedMinCashAfterAction = afterProj.minProjectedCashSignedF004;
          missingFields.push(...(afterProj.missingInputs || []));

          // Discretionary actions (A002, A007, A008, A010, A012) cannot exceed F003 availableCashBeforeAction or cause any shortfall
          if (candidate.actionId !== 'A001') {
            if (
              candidate.amount > baseProj.availableCashBeforeActionF003 ||
              afterProj.hasProjectedDeficit ||
              afterProj.minProjectedCashSignedF004 < (calculatorExtras?.bufferFloor ?? 0)
            ) {
              failedChecks.push({
                layer: 'AFFORDABILITY',
                code: 'INSUFFICIENT_AVAILABLE_CASH_OR_BILL_SHORTFALL',
                detail: `Proposed amount ${candidate.currency} ${candidate.amount} exceeds safe available buffer (${baseProj.availableCashBeforeActionF003.toFixed(2)}) or causes a mandatory payment shortfall (min cash ${afterProj.minProjectedCashSignedF004.toFixed(2)}).`,
                ruleId: 'R001',
              });
            }
          } else {
            // For A001 (required minimum), check if user actually has the cash by due date
            const payment = baseProj.shortfallsByObligation.find(s => s.targetId === candidate.targetId && s.targetType === 'debt_minimum');
            const debt = snapshot.debts.find(d => d.id === candidate.targetId);
            const sourceCash = candidate.sourceAccountId && debt?.nextDueDate
              ? SharedFinancialCalculator.projectSourceCashByDate(snapshot, calculatorExtras, candidate.sourceAccountId, debt.nextDueDate, debt.id) : null;
            if (sourceCash) missingFields.push(...sourceCash.missingInputs);
            const paymentBase = SharedFinancialCalculator.convertToBaseCurrency(candidate.amount, candidate.currency, snapshot.baseCurrency, calculatorExtras?.fxRates);
            if ((payment && payment.shortfallAmountF019 > 0) || (sourceCash && paymentBase.converted !== null && sourceCash.available < paymentBase.converted) || !baseProj.dailyTrajectory.some(p => p.date === debt?.nextDueDate) || candidate.amount !== debt?.minimumPayment || candidate.currency !== debt?.currency) {
              failedChecks.push({
                layer: 'AFFORDABILITY',
                code: 'CANNOT_COVER_REQUIRED_MINIMUM',
                detail: `Liquid cash (${baseProj.startingLiquidCash.toFixed(2)}) is insufficient to cover required minimum (${candidate.amount.toFixed(2)}); escalate to hardship A005 (R008).`,
                ruleId: 'R008',
              });
            }
          }
        }
      }
    }

    // ------------------------------------------------------------------------
    // DETERMINE CRITICAL STATUS & PRIORITY RANK (Review Point 3)
    // ------------------------------------------------------------------------
    let isCritical = false;
    let criticalPriorityRank: number | null = null;
    let resolvesCriticalProblemDirectly = false;

    const refDate = (calculatorExtras?.referenceDateIso || new Date().toISOString()).slice(0, 10);
    const windowDays = policy.horizonAndFreshness.imminentObligationWindowDays;

    if (candidate.actionId === 'A011') {
      const afterPause = SharedFinancialCalculator.projectNetCashTrajectory90d(
        snapshot,
        calculatorExtras,
        normalizedCandidate
      );
      if (
        baseProj.hasProjectedDeficit &&
        afterPause.minProjectedCashSignedF004 > baseProj.minProjectedCashSignedF004
      ) {
        isCritical = true;
        resolvesCriticalProblemDirectly = !afterPause.hasProjectedDeficit;
        criticalPriorityRank = 1; // Directly prevents self-inflicted deficit before mandatory payment
      }
    } else if (candidate.actionId === 'A001') {
      const targetDebt = snapshot.debts.find((d) => d.id === candidate.targetId);
      if (
        targetDebt?.nextDueDate &&
        diffDays(refDate, targetDebt.nextDueDate) >= 0 &&
        diffDays(refDate, targetDebt.nextDueDate) <= windowDays
      ) {
        isCritical = true;
        resolvesCriticalProblemDirectly = true;
        criticalPriorityRank = 2; // Directly satisfies imminent contractual obligation
      }
    } else if (candidate.actionId === 'A005') {
      const targetDebt = snapshot.debts.find((d) => d.id === candidate.targetId);
      const hasShortfall =
        baseProj.hasProjectedDeficit ||
        (targetDebt?.minimumPayment && baseProj.startingLiquidCash < targetDebt.minimumPayment);
      if (targetDebt && hasShortfall) {
        isCritical = true;
        resolvesCriticalProblemDirectly = true;
        criticalPriorityRank = 1; // Essential hardship escalation when minimum cannot be paid
      }
    } else if (candidate.actionId === 'A020') {
      if (baseProj.hasProjectedDeficit) {
        isCritical = true;
        resolvesCriticalProblemDirectly = false; // A020 only identifies the problem!
        criticalPriorityRank = 3; // Ranked below direct mitigation actions A011 / A001 / A005
      }
    }

    let status: 'VALID' | 'REJECTED' | 'NEEDS_DATA' = 'VALID';
    if (failedChecks.length > 0) {
      status = 'REJECTED';
    } else if (missingFields.length > 0) {
      status = 'NEEDS_DATA';
    }

    return ValidationResultSchema.parse({
      candidate: normalizedCandidate,
      status,
      isCritical,
      criticalPriorityRank,
      resolvesCriticalProblemDirectly,
      failedChecks,
      missingFields,
      inputEvidence,
      projectedMinCashAfterAction,
      unlocksActionIds: catalogEntry.unlocks_financial_action_ids,
    });
  }

  /**
   * STEP 4: Full Checker Pipeline
   * 1. Merges AI candidates with independent Critical Action Coverage.
   * 2. Deduplicates by (actionId, targetId).
   * 3. Validates every candidate.
   * 4. If financial actions are blocked by NEEDS_DATA or none are valid, generates deterministic
   *    VERIFICATION_ACTION / catalog fallback candidates and re-validates them.
   */
  static runCheckerPipeline(
    aiCandidates: CandidateAction[],
    ctx: CheckerContext
  ): CheckerBatchOutput {
    const criticalDiscovered = this.discoverCriticalActions(ctx);
    const criticalCoverageAddedIds: string[] = [];

    const combined: CandidateAction[] = [...aiCandidates];
    for (const crit of criticalDiscovered) {
      const alreadyPresent = combined.some(
        (c) => c.actionId === crit.actionId && (c.targetId === crit.targetId || !crit.targetId)
      );
      if (!alreadyPresent) {
        combined.push(crit);
        criticalCoverageAddedIds.push(crit.actionId);
      }
    }

    let results = combined.map((c) => this.validateCandidate(c, ctx));

    // Check if any candidate is NEEDS_DATA and can be unlocked by a VERIFICATION_ACTION
    const needsDataResults = results.filter((r) => r.status === 'NEEDS_DATA');
    const validNow = results.filter((r) => r.status === 'VALID');
    let fallbackTriggered = false;

    const unlockCandidates: CandidateAction[] = [];
    for (const nd of needsDataResults) {
      if (
        nd.missingFields.includes('subscription_usage_and_exit_terms_confirmation') &&
        !results.some((r) => r.candidate.actionId === 'A014')
      ) {
        unlockCandidates.push({
          candidateId: `verify_A014_${nd.candidate.targetId || 'sub'}`,
          actionId: 'A014',
          actionType: 'VERIFICATION_ACTION',
          title: `Review recurring subscription before cancellation`,
          description: `Confirm whether this recurring charge is still needed and check for any exit fees before cancelling.`,
          rationale: `Rule R010 requires assessing user need and cancellation cost before proposing subscription cancellation (A015).`,
          targetId: nd.candidate.targetId,
          sourceAccountId: nd.candidate.sourceAccountId,
          destinationAccountId: null,
          amount: nd.candidate.amount,
          currency: nd.candidate.currency,
          proposedTiming: null,
          supportingRuleIds: ['R010'],
          supportingClaimIds: ['C004'],
          supportingSourceIds: ['S001'],
          requiredPiInputs: ['transactions', 'merchant', 'frequency'],
          origin: 'CATALOG_FALLBACK',
        });
      }
      if (
        (nd.missingFields.includes('debt_apr') || nd.missingFields.includes('debt_due_date')) &&
        !results.some((r) => r.candidate.actionId === 'A004')
      ) {
        unlockCandidates.push({
          candidateId: `verify_A004_${nd.candidate.targetId || 'debt'}`,
          actionId: 'A004',
          actionType: 'VERIFICATION_ACTION',
          title: `Check credit card APR and statement terms`,
          description: `Provide or verify the card's APR, minimum payment, and due date from your statement to unlock accurate debt payoff evaluation.`,
          rationale: `Rule R006 requires verified APR and contract terms before recommending extra debt payments (A002).`,
          targetId: nd.candidate.targetId,
          sourceAccountId: null,
          destinationAccountId: null,
          amount: null,
          currency: ctx.snapshot.baseCurrency,
          proposedTiming: null,
          supportingRuleIds: ['R006'],
          supportingClaimIds: ['C015', 'C016'],
          supportingSourceIds: ['S003'],
          requiredPiInputs: ['card_statement'],
          origin: 'CATALOG_FALLBACK',
        });
      }
    }

    // If no valid candidates exist yet, also try deterministic catalog fallback (A007 emergency reserve or A014 subscription review)
    if (validNow.length === 0) {
      fallbackTriggered = true;
      const baseProj = SharedFinancialCalculator.projectNetCashTrajectory90d(
        ctx.snapshot,
        ctx.calculatorExtras,
        null
      );
      if (
        baseProj.availableCashBeforeActionF003 >= ctx.policy.checkerFallbackPolicy.minimumAvailableCash &&
        !results.some((r) => r.candidate.actionId === 'A007')
      ) {
        const safeAmt = Math.max(
          ctx.policy.checkerFallbackPolicy.minimumAmount,
          Math.floor((baseProj.availableCashBeforeActionF003 * ctx.policy.checkerFallbackPolicy.availableCashFraction) / ctx.policy.checkerFallbackPolicy.amountRoundingIncrement) * ctx.policy.checkerFallbackPolicy.amountRoundingIncrement
        );
        unlockCandidates.push({
          candidateId: `fallback_A007`,
          actionId: 'A007',
          actionType: 'FINANCIAL_ACTION',
          title: `Start or add ${ctx.snapshot.baseCurrency} ${safeAmt} to your emergency reserve`,
          description: `Earmark ${ctx.snapshot.baseCurrency} ${safeAmt} from uncommitted liquid cash into your accessible emergency reserve.`,
          rationale: `Fallback catalog evaluation (R002, R003, S001): builds liquid emergency buffer while preserving all upcoming obligations.`,
          targetId: ctx.snapshot.safetyCushionGoal?.id || 'goal_cushion',
          sourceAccountId: ctx.snapshot.accountSummaries[0]?.account.id || null,
          destinationAccountId: null,
          amount: safeAmt,
          currency: ctx.snapshot.baseCurrency,
          proposedTiming: (ctx.calculatorExtras?.referenceDateIso || new Date().toISOString()).slice(0, 10),
          supportingRuleIds: ['R002', 'R003', 'R011'],
          supportingClaimIds: ['C001', 'C002'],
          supportingSourceIds: ['S001'],
          requiredPiInputs: ['liquid_balance', 'mandatory_outflows', 'amount'],
          origin: 'CATALOG_FALLBACK',
        });
      }
    }

    if (unlockCandidates.length > 0) {
      fallbackTriggered = true;
      const fallbackValidated = unlockCandidates.map((c) => this.validateCandidate(c, ctx));
      results = [...results, ...fallbackValidated];
    }

    // A diagnostic must not displace validated mitigation of the same trajectory.
    if (results.some(r => r.status === 'VALID' && r.candidate.actionId === 'A011' && r.resolvesCriticalProblemDirectly)) {
      results = results.map(r => r.candidate.actionId === 'A020' ? ValidationResultSchema.parse({
        ...r, status: 'REJECTED', failedChecks: [...r.failedChecks, {
          layer: 'SAFETY_POLICY', code: 'SHORTFALL_RESOLVED_BY_A011',
          detail: 'Validated transfer pause resolves the projected shortfall; suppress duplicate diagnostic.', ruleId: 'R004',
        }],
      }) : r);
    }

    const validCriticalCandidates = results
      .filter((r) => r.status === 'VALID' && r.isCritical)
      .sort((a, b) => (a.criticalPriorityRank ?? 99) - (b.criticalPriorityRank ?? 99));

    const validFinancialCandidates = results.filter(
      (r) => r.status === 'VALID' && !r.isCritical && r.candidate.actionType === 'FINANCIAL_ACTION'
    );

    const validVerificationCandidates = results.filter(
      (r) => r.status === 'VALID' && !r.isCritical && r.candidate.actionType === 'VERIFICATION_ACTION'
    );

    const rejectedCandidates = results.filter((r) => r.status === 'REJECTED');
    const needsDataCandidates = results.filter((r) => r.status === 'NEEDS_DATA');
    const missingFieldsUnion = Array.from(
      new Set(needsDataCandidates.flatMap((r) => r.missingFields))
    );

    return {
      allResults: results,
      validFinancialCandidates,
      validCriticalCandidates,
      validVerificationCandidates,
      rejectedCandidates,
      needsDataCandidates,
      missingFieldsUnion,
      criticalCoverageAddedIds,
      fallbackTriggered,
    };
  }
}
