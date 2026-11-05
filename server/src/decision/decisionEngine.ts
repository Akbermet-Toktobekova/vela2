import {
  CandidateAction,
  CandidateComplexityEvaluation,
  ComplexityComponent,
  ComplexityFactorScore,
  DecisionTrace,
  DecisionTraceSchema,
  PrototypePolicyBundle,
  RecommendationDecision,
  RecommendationDecisionSchema,
  ScoredCandidate,
  ValidationResult,
  WeightProfileId,
} from '@shared/contracts';
import { FinancialSnapshot } from '@shared/pi/types';
import { CalculatorContextExtras, SharedFinancialCalculator } from '@shared/calculator';
import { loadPrototypePolicy } from '../config/policyLoader';
import { ASCatalogRepository, KnowledgeDatabaseSnapshot } from '../catalog/asCatalogRepository';
import { CheckerBatchOutput } from '../checker/actionChecker';
import { WeightCalculator } from './weightCalculator';
import { ImpactCalculator } from './impactCalculator';
import { ComplexityEvaluator } from './complexityEvaluator';
import { ScoringEngine } from './scoringEngine';
import { RobustnessEngine } from './robustnessChecker';

export interface RunDecisionEngineParams {
  evaluationId?: string;
  snapshot: FinancialSnapshot;
  checkerOutput: CheckerBatchOutput;
  policy?: PrototypePolicyBundle;
  knowledgeDb?: KnowledgeDatabaseSnapshot;
  calculatorExtras?: CalculatorContextExtras;
  previousProfileId?: WeightProfileId | null;
  aiComplexityByCandidateId?: Record<
    string,
    Partial<Record<ComplexityComponent, ComplexityFactorScore>>
  > | null;
  precomputedComplexityByCandidateId?: Record<string, CandidateComplexityEvaluation> | null;
}

const CRITICAL_ACTION_ORDER: Record<string, number> = {
  A011: 1,
  A005: 2,
  A001: 3,
  A020: 4,
};

function mergeUniqueStrings(...arrays: Array<string[] | undefined>): string[] {
  const set = new Set<string>();
  for (const arr of arrays) {
    if (!arr) continue;
    for (const item of arr) {
      if (item && item.trim()) set.add(item.trim());
    }
  }
  return Array.from(set);
}

function buildClarificationQuestion(missingFields: string[]): string | null {
  if (missingFields.length === 0) return null;
  if (missingFields.includes('essential_monthly_expense')) {
    return 'What are your estimated monthly essential expenses (rent, utilities, mandatory commitments) so we can safely normalize financial impacts and reserve coverage?';
  }
  if (
    missingFields.includes('debt_apr') ||
    missingFields.includes('debt_due_date') ||
    missingFields.includes('debt_remaining_balance')
  ) {
    return 'Could you confirm your credit card or loan APR, remaining balance, and next payment due date from your latest statement?';
  }
  if (missingFields.includes('subscription_usage_and_exit_terms_confirmation')) {
    return 'Could you confirm whether this recurring subscription is unused and whether your contract allows cancellation without exit penalties?';
  }
  if (missingFields.some((f) => f.startsWith('verified_fx_rate_'))) {
    return 'Exchange rate data for one of your foreign currency accounts is currently unavailable or stale; please refresh FX rates before proceeding.';
  }
  if (missingFields.includes('fresh_account_balance')) {
    return 'Your primary account balance is older than the freshness threshold; could you confirm your current accessible balance?';
  }
  return `Please provide or confirm the following missing details to unlock a verified recommendation: ${missingFields.join(', ')}.`;
}

export class DecisionEngine {
  /**
   * Step 5 (5A–5E): Final Recommendation Engine
   * 5A: Priority Policy for Critical Actions (A011, A001, A005 > diagnostic A020)
   * Verification Rule-Based Path: Selects VERIFICATION_ACTION (e.g. A014, A004) without fake R/F/G scores
   * 5B: WeightCalculator (4 profiles + Hysteresis)
   * 5C: ImpactCalculator (90d counterfactual + 12m debt/recurring metrics) & ComplexityEvaluator (F016)
   * 5D: ScoringEngine (F017)
   * 5E: RobustnessEngine (F018, 200 seeded runs, close-decision tie-breaker)
   */
  static runDecisionEngine(params: RunDecisionEngineParams): RecommendationDecision {
    const policy = params.policy || loadPrototypePolicy();
    const db = params.knowledgeDb || ASCatalogRepository.load();
    const {
      snapshot,
      checkerOutput: suppliedCheckerOutput,
      calculatorExtras,
      previousProfileId = null,
      aiComplexityByCandidateId,
      precomputedComplexityByCandidateId,
    } = params;

    // Treat the canonical validation results as the publication boundary. A caller
    // cannot smuggle a rejected candidate into a convenience "valid" array.
    const eligible = (item: ValidationResult) => item.status === 'VALID' &&
      suppliedCheckerOutput.allResults.some(result => result.status === 'VALID' &&
        result.candidate.candidateId === item.candidate.candidateId &&
        JSON.stringify(result.candidate) === JSON.stringify(item.candidate));
    const checkerOutput: CheckerBatchOutput = {
      ...suppliedCheckerOutput,
      validCriticalCandidates: suppliedCheckerOutput.validCriticalCandidates.filter(item => eligible(item) && item.isCritical),
      validFinancialCandidates: suppliedCheckerOutput.validFinancialCandidates.filter(item => eligible(item) && !item.isCritical && item.candidate.actionType === 'FINANCIAL_ACTION'),
      validVerificationCandidates: suppliedCheckerOutput.validVerificationCandidates.filter(item => eligible(item) && !item.isCritical && item.candidate.actionType === 'VERIFICATION_ACTION'),
    };

    const evaluationId = params.evaluationId || `eval_${snapshot.id}_${Date.now()}`;
    const createdAt = new Date().toISOString();
    const liq = SharedFinancialCalculator.computeLiquidEmergencyFunds(snapshot, calculatorExtras);
    const hasFxWarning = liq.fxWarningCurrencies.length > 0;

    // Always compute Step 5B weight profile selection for trace completeness
    const weightSelection = WeightCalculator.selectWeightProfile({
      snapshot,
      policy,
      previousProfileId,
      calculatorExtras,
    });

    // ========================================================================
    // STEP 5A: CRITICAL PRIORITY POLICY (Bypasses normal W/V tradeoff ranking)
    // ========================================================================
    if (checkerOutput.validCriticalCandidates.length > 0) {
      const sortedCriticals = [...checkerOutput.validCriticalCandidates].sort((a, b) => {
        // 1. Direct problem resolution (A011, A001, A005) always ranks above diagnostic-only (A020)
        if (a.resolvesCriticalProblemDirectly !== b.resolvesCriticalProblemDirectly) {
          return a.resolvesCriticalProblemDirectly ? -1 : 1;
        }
        // 2. Critical priority rank from Checker
        const rankA = a.criticalPriorityRank ?? 99;
        const rankB = b.criticalPriorityRank ?? 99;
        if (rankA !== rankB) {
          return rankA - rankB;
        }
        // 3. Deterministic action order
        const orderA = CRITICAL_ACTION_ORDER[a.candidate.actionId] ?? 50;
        const orderB = CRITICAL_ACTION_ORDER[b.candidate.actionId] ?? 50;
        return orderA - orderB;
      });

      const selectedValidation = sortedCriticals[0];
      const chosen = selectedValidation.candidate;
      const catEntry = db.catalogActions.find((a) => a.action_id === chosen.actionId);
      const actionSources = ASCatalogRepository.getSourcesForAction(chosen.actionId).map(
        (s) => s.source_id
      );

      const sourceIds = mergeUniqueStrings(chosen.supportingSourceIds, actionSources);
      const ruleIds = mergeUniqueStrings(
        chosen.supportingRuleIds,
        catEntry?.supporting_rule_ids_list
      );
      const claimIds = mergeUniqueStrings(
        chosen.supportingClaimIds,
        catEntry?.supporting_claim_ids_list
      );

      const decisionReason = chosen.rationale || `Critical priority action ${chosen.actionId} selected via Step 5A priority policy.`;

      const trace: DecisionTrace = DecisionTraceSchema.parse({
        evaluationId,
        userId: snapshot.userId,
        snapshotId: snapshot.id,
        snapshotVersion: snapshot.version,
        createdAt,
        runtimeMode: policy.runtimeMode.mode,
        policyBundleVersion: policy.policyMeta.policyBundleVersion,
        priorityClass: 'CRITICAL',
        weightSelection,
        validatedCandidates: checkerOutput.allResults,
        scoredCandidates: [],
        robustness: null,
        selectedCandidate: chosen,
        selectedActionType: chosen.actionType,
        decisionStatus: 'RECOMMENDATION_READY',
        decisionReason,
        supportingSourceIds: sourceIds,
        supportingRuleIds: ruleIds,
        supportingClaimIds: claimIds,
        missingDataFields: checkerOutput.missingFieldsUnion,
        clarificationQuestion: null,
      });

      return RecommendationDecisionSchema.parse({
        evaluationId,
        snapshotId: snapshot.id,
        snapshotVersion: snapshot.version,
        decisionStatus: 'RECOMMENDATION_READY',
        priorityClass: 'CRITICAL',
        selectedActionId: chosen.actionId,
        selectedActionType: chosen.actionType,
        candidate: chosen,
        title: chosen.title,
        description: chosen.description,
        reasoning: decisionReason,
        expectedEffectSummary: selectedValidation.resolvesCriticalProblemDirectly
          ? `Addresses imminent payment or cash-flow shortfall directly (${chosen.actionId}).`
          : `Diagnostic alert flagging projected cash shortfall for immediate review (${chosen.actionId}).`,
        weightProfileId: weightSelection.profileId,
        weights: {
          resilience: weightSelection.weights.R,
          financial_benefit: weightSelection.weights.F,
          goal_progress: weightSelection.weights.G,
        },
        values: null,
        rawImpacts: null,
        complexity: null,
        score: null,
        stability: null,
        policyVersion: policy.policyMeta.policyBundleVersion,
        sourceIds,
        ruleIds,
        claimIds,
        dataQualityStatus: hasFxWarning ? 'FX_WARNING' : 'PROTOTYPE_POLICY',
        clarificationQuestion: null,
        missingFields: checkerOutput.missingFieldsUnion,
        trace,
      });
    }

    // ========================================================================
    // RULE-BASED VERIFICATION UNLOCK PATH (Review Point 5)
    // ========================================================================
    const needsDataActionIds = new Set(
      checkerOutput.needsDataCandidates.map((nd) => nd.candidate.actionId)
    );
    const nonFallbackFinancialCandidates = checkerOutput.validFinancialCandidates.filter(
      (c) => c.candidate.origin !== 'CATALOG_FALLBACK'
    );
    const unlockingVerificationCandidates = checkerOutput.validVerificationCandidates.filter((vc) =>
      vc.unlocksActionIds.some((id) => needsDataActionIds.has(id))
    );

    const shouldSelectVerificationUnlock =
      (unlockingVerificationCandidates.length > 0 &&
        nonFallbackFinancialCandidates.length === 0) ||
      (checkerOutput.validFinancialCandidates.length === 0 &&
        checkerOutput.validVerificationCandidates.length > 0);

    if (shouldSelectVerificationUnlock) {
      const pool =
        unlockingVerificationCandidates.length > 0
          ? unlockingVerificationCandidates
          : checkerOutput.validVerificationCandidates;

      const selectedVerif = pool[0];
      const chosen = selectedVerif.candidate;
      const catEntry = db.catalogActions.find((a) => a.action_id === chosen.actionId);
      const actionSources = ASCatalogRepository.getSourcesForAction(chosen.actionId).map(
        (s) => s.source_id
      );

      const sourceIds = mergeUniqueStrings(chosen.supportingSourceIds, actionSources);
      const ruleIds = mergeUniqueStrings(
        chosen.supportingRuleIds,
        catEntry?.supporting_rule_ids_list
      );
      const claimIds = mergeUniqueStrings(
        chosen.supportingClaimIds,
        catEntry?.supporting_claim_ids_list
      );

      const clarificationQuestion = buildClarificationQuestion(checkerOutput.missingFieldsUnion);
      const decisionReason =
        chosen.rationale ||
        `Rule-based verification action ${chosen.actionId} selected to resolve missing or unconfirmed inputs before executing a financial action.`;

      const trace: DecisionTrace = DecisionTraceSchema.parse({
        evaluationId,
        userId: snapshot.userId,
        snapshotId: snapshot.id,
        snapshotVersion: snapshot.version,
        createdAt,
        runtimeMode: policy.runtimeMode.mode,
        policyBundleVersion: policy.policyMeta.policyBundleVersion,
        priorityClass: 'VERIFICATION_UNLOCK',
        weightSelection,
        validatedCandidates: checkerOutput.allResults,
        scoredCandidates: [],
        robustness: null,
        selectedCandidate: chosen,
        selectedActionType: chosen.actionType,
        decisionStatus: 'RECOMMENDATION_READY',
        decisionReason,
        supportingSourceIds: sourceIds,
        supportingRuleIds: ruleIds,
        supportingClaimIds: claimIds,
        missingDataFields: checkerOutput.missingFieldsUnion,
        clarificationQuestion,
      });

      return RecommendationDecisionSchema.parse({
        evaluationId,
        snapshotId: snapshot.id,
        snapshotVersion: snapshot.version,
        decisionStatus: 'RECOMMENDATION_READY',
        priorityClass: 'VERIFICATION_UNLOCK',
        selectedActionId: chosen.actionId,
        selectedActionType: chosen.actionType,
        candidate: chosen,
        title: chosen.title,
        description: chosen.description,
        reasoning: decisionReason,
        expectedEffectSummary: `Verification step (${chosen.actionId}) to confirm contract or usage terms without fabricating monetary R/F/G scores.`,
        weightProfileId: weightSelection.profileId,
        weights: {
          resilience: weightSelection.weights.R,
          financial_benefit: weightSelection.weights.F,
          goal_progress: weightSelection.weights.G,
        },
        values: null,
        rawImpacts: null,
        complexity: null,
        score: null,
        stability: null,
        policyVersion: policy.policyMeta.policyBundleVersion,
        sourceIds,
        ruleIds,
        claimIds,
        dataQualityStatus: hasFxWarning ? 'FX_WARNING' : 'PROTOTYPE_POLICY',
        clarificationQuestion,
        missingFields: checkerOutput.missingFieldsUnion,
        trace,
      });
    }

    // ========================================================================
    // STEPS 5B–5E: NORMAL W / V / COMPLEXITY / SCORING / ROBUSTNESS PATH
    // ========================================================================
    if (checkerOutput.validFinancialCandidates.length > 0) {
      const evaluatedItems: Array<{
        candidate: CandidateAction;
        impact: ReturnType<typeof ImpactCalculator.evaluateFinancialImpact>;
        complexity: CandidateComplexityEvaluation;
      }> = [];

      const impactMissingInputs: string[] = [];

      for (const valRes of checkerOutput.validFinancialCandidates) {
        const cand = valRes.candidate;
        const catEntry = db.catalogActions.find((a) => a.action_id === cand.actionId);

        const impact = ImpactCalculator.evaluateFinancialImpact({
          candidate: cand,
          snapshot,
          policy,
          calculatorExtras,
        });

        if (impact.status !== 'COMPUTED') {
          impactMissingInputs.push(...impact.missingInputs);
          continue;
        }

        const precomputedComp =
          precomputedComplexityByCandidateId?.[cand.candidateId] ??
          precomputedComplexityByCandidateId?.[cand.actionId];

        const aiFactors =
          aiComplexityByCandidateId?.[cand.candidateId] ??
          aiComplexityByCandidateId?.[cand.actionId] ??
          null;

        const complexity =
          precomputedComp ||
          ComplexityEvaluator.computeComplexityFromFactors({
            candidate: cand,
            aiFactors,
            policy,
            catalogEntry: catEntry,
          });

        evaluatedItems.push({ candidate: cand, impact, complexity });
      }

      // If ImpactCalculator returned NEEDS_DATA for all financial candidates (e.g. missing essential_monthly_expense)
      if (evaluatedItems.length === 0) {
        const allMissing = mergeUniqueStrings(
          checkerOutput.missingFieldsUnion,
          impactMissingInputs
        );
        const clarificationQuestion = buildClarificationQuestion(allMissing);
        const decisionReason = `Cannot normalize financial impact (K_F / F002) because required inputs are missing: ${allMissing.join(', ')}.`;

        const trace: DecisionTrace = DecisionTraceSchema.parse({
          evaluationId,
          userId: snapshot.userId,
          snapshotId: snapshot.id,
          snapshotVersion: snapshot.version,
          createdAt,
          runtimeMode: policy.runtimeMode.mode,
          policyBundleVersion: policy.policyMeta.policyBundleVersion,
          priorityClass: 'NONE',
          weightSelection,
          validatedCandidates: checkerOutput.allResults,
          scoredCandidates: [],
          robustness: null,
          selectedCandidate: null,
          selectedActionType: null,
          decisionStatus: 'NEEDS_DATA',
          decisionReason,
          supportingSourceIds: [],
          supportingRuleIds: [],
          supportingClaimIds: [],
          missingDataFields: allMissing,
          clarificationQuestion,
        });

        return RecommendationDecisionSchema.parse({
          evaluationId,
          snapshotId: snapshot.id,
          snapshotVersion: snapshot.version,
          decisionStatus: 'NEEDS_DATA',
          priorityClass: 'NONE',
          selectedActionId: null,
          selectedActionType: null,
          candidate: null,
          title: 'Additional financial details needed',
          description: decisionReason,
          reasoning: decisionReason,
          expectedEffectSummary: 'Provide missing baseline inputs to enable accurate 90-day impact simulation.',
          weightProfileId: weightSelection.profileId,
          weights: {
            resilience: weightSelection.weights.R,
            financial_benefit: weightSelection.weights.F,
            goal_progress: weightSelection.weights.G,
          },
          values: null,
          rawImpacts: null,
          complexity: null,
          score: null,
          stability: null,
          policyVersion: policy.policyMeta.policyBundleVersion,
          sourceIds: [],
          ruleIds: [],
          claimIds: [],
          dataQualityStatus: 'NEEDS_DATA',
          clarificationQuestion,
          missingFields: allMissing,
          trace,
        });
      }

      // Step 5D: Score candidates via F017
      const scoredCandidates: ScoredCandidate[] = ScoringEngine.scoreCandidates({
        candidates: evaluatedItems,
        weightSelection,
        policy,
      });

      // Step 5E: Evaluate Robustness via F018 (200 seeded simulations + close-decision tie-breaker)
      const robustness = RobustnessEngine.evaluateRobustness({
        scoredCandidates,
        weightSelection,
        policy,
        hasMissingPiData:
          checkerOutput.missingFieldsUnion.length > 0 ||
          snapshot.dataQuality.missingFields.length > 0,
        hasUnstableAssumptions:
          hasFxWarning ||
          scoredCandidates.some(
            (sc) => sc.complexity.hasUnknownComponents || sc.complexity.usedCatalogFallback
          ),
      });

      // Re-order scoredCandidates if tie-breaker promoted a close runner-up to topCandidateId
      const winningScored =
        scoredCandidates.find((sc) => sc.candidate.candidateId === robustness.topCandidateId) ||
        scoredCandidates[0];

      const orderedScoredCandidates: ScoredCandidate[] = [
        winningScored,
        ...scoredCandidates.filter(
          (sc) => sc.candidate.candidateId !== winningScored.candidate.candidateId
        ),
      ].map((sc, idx) => ({
        ...sc,
        rank: idx + 1,
      }));

      const chosen = winningScored.candidate;
      const catEntry = db.catalogActions.find((a) => a.action_id === chosen.actionId);
      const actionSources = ASCatalogRepository.getSourcesForAction(chosen.actionId).map(
        (s) => s.source_id
      );

      const sourceIds = mergeUniqueStrings(chosen.supportingSourceIds, actionSources);
      const ruleIds = mergeUniqueStrings(
        chosen.supportingRuleIds,
        catEntry?.supporting_rule_ids_list
      );
      const claimIds = mergeUniqueStrings(
        chosen.supportingClaimIds,
        catEntry?.supporting_claim_ids_list
      );

      const raw = winningScored.impact.rawImpacts;
      const effectParts: string[] = [];
      if (raw.deltaResilienceMonths !== 0) {
        effectParts.push(
          `${raw.deltaResilienceMonths >= 0 ? '+' : ''}${raw.deltaResilienceMonths.toFixed(2)} months reserve coverage`
        );
      }
      if (raw.deltaFinancialBenefitCurrency !== 0) {
        effectParts.push(
          `${snapshot.baseCurrency} ${raw.deltaFinancialBenefitCurrency.toFixed(2)} saved over 90d`
        );
      }
      if (raw.debt12mCounterfactualInterestAvoided !== null && raw.debt12mCounterfactualInterestAvoided > 0) {
        effectParts.push(
          `${snapshot.baseCurrency} ${raw.debt12mCounterfactualInterestAvoided.toFixed(2)} projected 12m interest avoided`
        );
      }
      if (raw.annualizedRecurringSaving12m !== null && raw.annualizedRecurringSaving12m > 0) {
        effectParts.push(
          `${snapshot.baseCurrency} ${raw.annualizedRecurringSaving12m.toFixed(2)} annualized 12m recurring saving`
        );
      }
      if (raw.deltaGoalProgressFraction !== 0) {
        effectParts.push(
          `+${(raw.deltaGoalProgressFraction * 100).toFixed(1)}% goal completion`
        );
      }
      const expectedEffectSummary =
        effectParts.length > 0
          ? effectParts.join('; ')
          : `Validated financial action (${chosen.actionId}) over 90-day horizon.`;

      const rankedReason = robustness.tieBreakerApplied && robustness.tieBreakerReason
        ? `${chosen.rationale} (${robustness.tieBreakerReason})`
        : `${chosen.rationale} (Selected under ${weightSelection.profileId} profile with F017 score ${winningScored.finalScore.toFixed(4)} and F018 stability ${(robustness.stability * 100).toFixed(1)}%).`;
      // F018 diagnoses the cause: uncertainty is not permission to publish a
      // financial instruction, and close valid alternatives are not missing PI.
      const withheldForMissingData = !robustness.meetsStabilityThreshold && robustness.instabilityReason === 'MISSING_PI_DATA';
      const withheldForAssumptions = !robustness.meetsStabilityThreshold && robustness.instabilityReason === 'UNSTABLE_ASSUMPTIONS';
      const publish = !withheldForMissingData && !withheldForAssumptions;
      const decisionStatus = withheldForMissingData ? 'NEEDS_DATA' : withheldForAssumptions ? 'NO_RECOMMENDATION' : 'RECOMMENDATION_READY';
      const missingFields = mergeUniqueStrings(checkerOutput.missingFieldsUnion, snapshot.dataQuality.missingFields);
      const clarificationQuestion = withheldForMissingData
        ? buildClarificationQuestion(missingFields)
        : withheldForAssumptions
          ? 'Please confirm the uncertain complexity factors and refresh any unverified exchange rates before a financial action is published.'
          : null;
      const decisionReason = withheldForMissingData
        ? 'Financial publication withheld: low F018 stability is caused by missing PI data.'
        : withheldForAssumptions
          ? 'Financial publication withheld: low F018 stability is caused by uncertain assumptions; clarification is required.'
          : rankedReason;

      const trace: DecisionTrace = DecisionTraceSchema.parse({
        evaluationId,
        userId: snapshot.userId,
        snapshotId: snapshot.id,
        snapshotVersion: snapshot.version,
        createdAt,
        runtimeMode: policy.runtimeMode.mode,
        policyBundleVersion: policy.policyMeta.policyBundleVersion,
        priorityClass: 'NORMAL',
        weightSelection,
        validatedCandidates: checkerOutput.allResults,
        scoredCandidates: orderedScoredCandidates,
        robustness,
        selectedCandidate: publish ? chosen : null,
        selectedActionType: publish ? chosen.actionType : null,
        decisionStatus,
        decisionReason,
        supportingSourceIds: sourceIds,
        supportingRuleIds: ruleIds,
        supportingClaimIds: claimIds,
        missingDataFields: missingFields,
        clarificationQuestion,
      });

      return RecommendationDecisionSchema.parse({
        evaluationId,
        snapshotId: snapshot.id,
        snapshotVersion: snapshot.version,
        decisionStatus,
        priorityClass: 'NORMAL',
        selectedActionId: publish ? chosen.actionId : null,
        selectedActionType: publish ? chosen.actionType : null,
        candidate: publish ? chosen : null,
        title: publish ? chosen.title : 'Recommendation requires clarification',
        description: publish ? chosen.description : decisionReason,
        reasoning: decisionReason,
        expectedEffectSummary: publish ? expectedEffectSummary : 'No financial action published.',
        weightProfileId: weightSelection.profileId,
        weights: {
          resilience: weightSelection.weights.R,
          financial_benefit: weightSelection.weights.F,
          goal_progress: weightSelection.weights.G,
        },
        values: publish ? {
          resilience: winningScored.impact.normalizedValues.v_R,
          financial_benefit: winningScored.impact.normalizedValues.v_F,
          goal_progress: winningScored.impact.normalizedValues.v_G,
        } : null,
        rawImpacts: publish ? {
          resilienceMonths: raw.deltaResilienceMonths,
          financialBenefitCurrency: raw.deltaFinancialBenefitCurrency,
          goalProgressPctPoints: Number((raw.deltaGoalProgressFraction * 100).toFixed(2)),
          annualizedSaving12m: raw.annualizedRecurringSaving12m,
          debt12mInterestAvoided: raw.debt12mCounterfactualInterestAvoided,
        } : null,
        complexity: publish ? winningScored.complexity.computedComplexity : null,
        score: publish ? winningScored.finalScore : null,
        stability: robustness.stability,
        policyVersion: policy.policyMeta.policyBundleVersion,
        sourceIds,
        ruleIds,
        claimIds,
        dataQualityStatus: hasFxWarning ? 'FX_WARNING' : 'PROTOTYPE_POLICY',
        clarificationQuestion,
        missingFields,
        trace,
      });
    }

    // ========================================================================
    // FALLBACK: NEEDS_DATA OR NO_RECOMMENDATION
    // ========================================================================
    const essentialMonthly = snapshot.essentialCommitment?.estimatedMonthlyAmount ?? null;
    const allMissing = mergeUniqueStrings(
      checkerOutput.missingFieldsUnion,
      essentialMonthly === null || !(essentialMonthly > 0) ? ['essential_monthly_expense'] : []
    );

    const isNeedsData =
      checkerOutput.needsDataCandidates.length > 0 || allMissing.length > 0;
    const finalStatus = isNeedsData ? 'NEEDS_DATA' : 'NO_RECOMMENDATION';
    const clarificationQuestion = isNeedsData ? buildClarificationQuestion(allMissing) : null;
    const decisionReason = isNeedsData
      ? `Additional user data is required before a safe action can be recommended (${allMissing.join(', ')}).`
      : 'No candidate action passed safety, eligibility, and cash-flow affordability gates for this snapshot.';

    const trace: DecisionTrace = DecisionTraceSchema.parse({
      evaluationId,
      userId: snapshot.userId,
      snapshotId: snapshot.id,
      snapshotVersion: snapshot.version,
      createdAt,
      runtimeMode: policy.runtimeMode.mode,
      policyBundleVersion: policy.policyMeta.policyBundleVersion,
      priorityClass: 'NONE',
      weightSelection,
      validatedCandidates: checkerOutput.allResults,
      scoredCandidates: [],
      robustness: null,
      selectedCandidate: null,
      selectedActionType: null,
      decisionStatus: finalStatus,
      decisionReason,
      supportingSourceIds: [],
      supportingRuleIds: [],
      supportingClaimIds: [],
      missingDataFields: allMissing,
      clarificationQuestion,
    });

    return RecommendationDecisionSchema.parse({
      evaluationId,
      snapshotId: snapshot.id,
      snapshotVersion: snapshot.version,
      decisionStatus: finalStatus,
      priorityClass: 'NONE',
      selectedActionId: null,
      selectedActionType: null,
      candidate: null,
      title: isNeedsData ? 'Clarification needed to unlock next step' : 'No proactive action needed today',
      description: decisionReason,
      reasoning: decisionReason,
      expectedEffectSummary: isNeedsData
        ? 'Confirming missing details unlocks verified financial evaluation.'
        : 'Current obligations and liquidity buffers do not support a safe change today.',
      weightProfileId: weightSelection.profileId,
      weights: {
        resilience: weightSelection.weights.R,
        financial_benefit: weightSelection.weights.F,
        goal_progress: weightSelection.weights.G,
      },
      values: null,
      rawImpacts: null,
      complexity: null,
      score: null,
      stability: null,
      policyVersion: policy.policyMeta.policyBundleVersion,
      sourceIds: [],
      ruleIds: [],
      claimIds: [],
      dataQualityStatus: isNeedsData ? 'NEEDS_DATA' : hasFxWarning ? 'FX_WARNING' : 'PROTOTYPE_POLICY',
      clarificationQuestion,
      missingFields: allMissing,
      trace,
    });
  }
}
