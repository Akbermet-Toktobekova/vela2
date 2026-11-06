import { CalculatorContextExtras } from '@shared/calculator';
import {
ActionType,
CandidateAction,
CheckFailure,
ComplexityComponent,
ComplexityFactorScore,
DecisionTrace,
PrototypePolicyBundle,
RecommendationDecision,
RecommendationDecisionSchema,
ValidationResult,
WeightProfileId
} from '@shared/contracts';
import {
ActionFeedback,
FinancialSnapshot,
GoalAllocation,
ReadinessState,
RecommendationRecord,
} from '@shared/pi/types';
import { buildFinancialSnapshot } from '../../../shared/processing/snapshotBuilder';
import type { PIDatabaseSeed } from '../../../shared/profile/seed';
import { AssistantAgent } from '../ai/assistantAgent';
import { AIEvaluationService } from '../ai/evaluationCall';
import { LLMClient } from '../ai/llmClient';
import { BehaviorAgent,BehaviorAnalysisResult } from '../analyzer/behaviorAgent';
import { DebtAgent,DebtAnalysisOutput } from '../analyzer/debtAgent';
import { ASCatalogRepository } from '../catalog/asCatalogRepository';
import { ActionChecker,CheckerBatchOutput,CheckerContext } from '../checker/actionChecker';
import { loadPrototypePolicy } from '../config/policyLoader';
import { DecisionEngine } from '../decision/decisionEngine';
import { ImpactCalculator } from '../decision/impactCalculator';
import { FrankfurterFXService } from '../fx/frankfurterService';
import { SecurityService } from '../security/securityService';
import { SuggestionGenerator } from '../suggestion/suggestionGenerator';
import {
AgentResultRow,
EngineRepository,
SavePIStateInput,
StoredPIStateEnvelope,
} from './engineTypes';

export interface AgentStalenessCheck {
  agentName: 'BehaviorAgent' | 'DebtAgent';
  stale: boolean;
  inputChanged: boolean;
  policyChanged: boolean;
  expired: boolean;
  inputHash: string;
  policyVersion: string;
  cachedReused: boolean;
}

export interface ReviewCycleOptions {
  authenticatedUserId: string;
  targetUserId: string;
  eventType?: string;
  piUpdate?: SavePIStateInput | FinancialSnapshot;
  forceRefresh?: boolean;
  referenceNowIso?: string;
  onBeforePublish?: () => Promise<void> | void;
}

export interface ReviewCycleResult {
  evaluationId: string;
  status: 'COMPLETED' | 'DUPLICATE_SUPPRESSED' | 'SUPERSEDED_BY_NEWER_SNAPSHOT';
  duplicateSuppressed: boolean;
  publishedToToday: boolean;
  snapshot: FinancialSnapshot;
  snapshotVersion: string;
  decision: RecommendationDecision;
  recommendation: RecommendationRecord;
  trace: DecisionTrace;
  agentFreshness: {
    BehaviorAgent: AgentStalenessCheck;
    DebtAgent: AgentStalenessCheck;
  };
}

export interface SubmitFeedbackParams {
  authenticatedUserId: string;
  targetUserId: string;
  recommendationId: string;
  action: 'accept' | 'adjust' | 'decline' | 'complete';
  adjustedAmount?: number | null;
  note?: string;
}

export interface SubmitFeedbackResult {
  status: 'ACCEPTED' | 'ADJUSTED' | 'ADJUSTMENT_REJECTED' | 'DECLINED_AND_RERUN' | 'COMPLETED' | 'VERIFICATION_REQUIRED';
  accepted: boolean;
  recommendation: RecommendationRecord;
  decision: RecommendationDecision;
  feedbackRecord: ActionFeedback | null;
  validationResult?: ValidationResult;
  failedChecks?: CheckFailure[];
  missingFields?: string[];
  rejectionReason?: string;
  nextCycleResult?: ReviewCycleResult;
  reviewPending?: boolean;
  reviewMessage?: string;
}

export type { EngineRepository } from './engineTypes';

export interface ReviewOrchestratorOptions {
  store: EngineRepository;
  fxService?: FrankfurterFXService;
  llmClient?: LLMClient;
  policy?: PrototypePolicyBundle;
}

function mapActionIdToLegacyActionType(
  actionId: string | null,
  actionType: ActionType | null
): RecommendationRecord['actionType'] {
  switch (actionId) {
    case 'A007':
    case 'A008':
    case 'A010':
    case 'A012':
    case 'A013':
      return 'allocate_safety_cushion';
    case 'A014':
    case 'A015':
    case 'A017':
    case 'A018':
      return 'review_recurring_subscription';
    case 'A001':
    case 'A002':
    case 'A005':
    case 'A011':
    case 'A019':
    case 'A020':
      return 'confirm_upcoming_bill';
    case 'A016':
      return 'clarify_internal_transfer';
    case 'A003':
    case 'A004':
    case 'A006':
    case 'A024':
    case 'A025':
    case 'A026':
      return 'update_stale_balance';
    case 'A009':
      return 'set_essential_expenses';
    default:
      return actionType === 'VERIFICATION_ACTION'
        ? 'update_stale_balance'
        : 'allocate_safety_cushion';
  }
}

function mapDecisionToReadinessState(decision: RecommendationDecision): ReadinessState {
  if (decision.decisionStatus === 'RECOMMENDATION_READY') {
    return 'state_a_action_ready';
  }
  if (decision.decisionStatus === 'NEEDS_DATA') {
    return 'state_b_clarification_needed';
  }
  return 'state_c_limited_data';
}

export class ReviewOrchestrator {
  public readonly store: EngineRepository;
  public readonly fxService: FrankfurterFXService;
  public readonly llmClient: LLMClient;
  private customPolicy?: PrototypePolicyBundle;

  constructor(options: ReviewOrchestratorOptions) {
    this.store = options.store;
    this.customPolicy = options?.policy;
    this.fxService =
      options?.fxService ||
      new FrankfurterFXService({
        policy: this.getPolicy(),
        cacheStore: this.store,
      });
    this.llmClient = options?.llmClient || new LLMClient();
  }

  public getPolicy(): PrototypePolicyBundle {
    return this.customPolicy || loadPrototypePolicy();
  }

  public setPolicy(policy: PrototypePolicyBundle): void {
    this.customPolicy = policy;
  }

  /**
   * Step 1 Freshness Formula:
   * Stale(y) = InputChanged(y) OR PolicyChanged(y) OR Expired(y)
   */
  public static computeAgentStaleness(params: {
    agentName: 'BehaviorAgent' | 'DebtAgent';
    currentInputHash: string;
    currentPolicyVersion: string;
    cachedResult: AgentResultRow | null;
    maxAgeHours?: number;
    referenceNowIso?: string;
  }): AgentStalenessCheck {
    const {
      agentName,
      currentInputHash,
      currentPolicyVersion,
      cachedResult,
      maxAgeHours = 24 * 14,
      referenceNowIso,
    } = params;

    if (!cachedResult) {
      return {
        agentName,
        stale: true,
        inputChanged: true,
        policyChanged: true,
        expired: true,
        inputHash: currentInputHash,
        policyVersion: currentPolicyVersion,
        cachedReused: false,
      };
    }

    const inputChanged = cachedResult.inputHash !== currentInputHash;
    const policyChanged = cachedResult.policyVersion !== currentPolicyVersion;

    const nowMs = referenceNowIso ? new Date(referenceNowIso).getTime() : Date.now();
    const createdMs = new Date(cachedResult.createdAt).getTime();
    const ageHours = Number.isNaN(createdMs) ? Infinity : (nowMs - createdMs) / (1000 * 60 * 60);
    const expired = ageHours > maxAgeHours;

    const stale = inputChanged || policyChanged || expired;

    return {
      agentName,
      stale,
      inputChanged,
      policyChanged,
      expired,
      inputHash: currentInputHash,
      policyVersion: currentPolicyVersion,
      cachedReused: !stale,
    };
  }

  /**
   * Executes Steps 1–6 of the Proactive Financial Review Pipeline.
   */
  public async runReviewCycle(options: ReviewCycleOptions): Promise<ReviewCycleResult> {
    const {
      authenticatedUserId,
      targetUserId,
      eventType = 'manual_or_pi_review',
      piUpdate,
      forceRefresh = false,
      referenceNowIso,
      onBeforePublish,
    } = options;

    // Strict user-level authorization check (D-010)
    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

    const policy = this.getPolicy();
    const policyBundleVersion = policy.policyMeta.policyBundleVersion;

    // ------------------------------------------------------------------------
    // STEP 1: Load or Update PI State, Check Duplicate Evaluation Suppression
    // ------------------------------------------------------------------------
    let piEnvelope: StoredPIStateEnvelope | null = null;
    if (piUpdate) {
      piEnvelope = this.store.savePIState(authenticatedUserId, targetUserId, piUpdate);
    } else {
      piEnvelope = this.store.getPIState(authenticatedUserId, targetUserId, true);
    }

    if (!piEnvelope) {
      throw new Error(`No PI state found for user '${targetUserId}'.`);
    }

    const startingSnapshotVersion = piEnvelope.version;
    const evaluationNowIso = referenceNowIso || new Date().toISOString();
    if (!Number.isFinite(new Date(evaluationNowIso).getTime())) {
      throw new Error('Invalid review reference time.');
    }
    const workingSnapshot: FinancialSnapshot = JSON.parse(JSON.stringify(piEnvelope.snapshot));
    const workingExtras: CalculatorContextExtras = {
      ...(piEnvelope.calculatorExtras || {}),
      referenceDateIso:
        referenceNowIso?.slice(0, 10) ||
        piEnvelope.calculatorExtras?.referenceDateIso ||
        evaluationNowIso.slice(0, 10),
      simulationHorizonDays: policy.horizonAndFreshness.simulationHorizonDays,
      pendingFinancialCommitments: this.store.listPendingFinancialCommitments(authenticatedUserId, targetUserId),
    };

    // Duplicate run suppression for the same unchanged snapshot version + event + policy
    if (!forceRefresh && eventType !== 'feedback_decline' && workingExtras.pendingFinancialCommitments!.length === 0) {
      const latestRun = this.store.getLatestEvaluationRun(authenticatedUserId, targetUserId);
      const latestPublished = this.store.getLatestRecommendationBundle(
        authenticatedUserId,
        targetUserId
      );

      if (
        latestRun &&
        latestRun.status === 'COMPLETED' &&
        latestRun.createdAt.slice(0, 10) === evaluationNowIso.slice(0, 10) &&
        latestRun.snapshotVersion === startingSnapshotVersion &&
        latestRun.inputHash === piEnvelope.inputHash &&
        latestRun.policyVersion === policyBundleVersion &&
        latestRun.eventType === eventType &&
        latestPublished &&
        latestPublished.snapshotVersion === startingSnapshotVersion
      ) {
        const cachedBehavior = this.store.getAgentResult(
          authenticatedUserId,
          targetUserId,
          'BehaviorAgent'
        );
        const cachedDebt = this.store.getAgentResult(
          authenticatedUserId,
          targetUserId,
          'DebtAgent'
        );

        return {
          evaluationId: latestRun.evaluationId,
          status: 'DUPLICATE_SUPPRESSED',
          duplicateSuppressed: true,
          publishedToToday: false,
          snapshot: workingSnapshot,
          snapshotVersion: startingSnapshotVersion,
          decision: latestPublished.decision,
          recommendation: latestPublished.recommendation,
          trace: latestPublished.trace,
          agentFreshness: {
            BehaviorAgent: {
              agentName: 'BehaviorAgent',
              stale: false,
              inputChanged: false,
              policyChanged: false,
              expired: false,
              inputHash: cachedBehavior?.inputHash || piEnvelope.inputHash,
              policyVersion: policyBundleVersion,
              cachedReused: true,
            },
            DebtAgent: {
              agentName: 'DebtAgent',
              stale: false,
              inputChanged: false,
              policyChanged: false,
              expired: false,
              inputHash: cachedDebt?.inputHash || piEnvelope.inputHash,
              policyVersion: policyBundleVersion,
              cachedReused: true,
            },
          },
        };
      }
    }

    const evaluationId = `eval_${targetUserId}_v${startingSnapshotVersion.replace(/\./g, '_')}_${Date.now()}`;
    this.store.createEvaluationRun(authenticatedUserId, targetUserId, {
      evaluationId,
      snapshotId: workingSnapshot.id,
      snapshotVersion: startingSnapshotVersion,
      eventType,
      inputHash: piEnvelope.inputHash,
      policyVersion: policyBundleVersion,
      status: 'IN_PROGRESS',
    });

    // ------------------------------------------------------------------------
    // STEP 2: Financial Analyzer (FX Service + BehaviorAgent + DebtAgent + Calculator)
    // ------------------------------------------------------------------------
    // 2A. Fetch or resolve FX rates for all currencies in snapshot
    const allCurrencies = new Set<string>([
      workingSnapshot.baseCurrency || 'EUR',
      ...(workingSnapshot.dataQuality?.currencies || []),
      ...workingSnapshot.accountSummaries.map((a) => a.account.currency),
      ...workingSnapshot.debts.map((d) => d.currency),
      ...workingSnapshot.obligations.map((o) => o.currency),
      ...workingSnapshot.goals.map((g) => g.currency),
    ]);
    const foreignSymbols = Array.from(allCurrencies).filter(
      (c) => c && c.toUpperCase() !== (workingSnapshot.baseCurrency || 'EUR').toUpperCase()
    );

    if (foreignSymbols.length > 0) {
      const fetchedFx = await this.fxService.getLatestRates(
        workingSnapshot.baseCurrency || 'EUR',
        foreignSymbols,
        { referenceNowIso: evaluationNowIso }
      );
      // Preserve explicitly passed fixture fxRates if already present on workingExtras, else populate
      workingExtras.fxRates = {
        ...fetchedFx,
        ...(workingExtras.fxRates || {}),
      };
    }

    // 2B. Minimize PI before any LLM calls (R015, S019)
    const minimizedSnapshot = SecurityService.minimizePIForLLM(workingSnapshot);

    // 2C. BehaviorAgent with Step 1 Stale(y) check
    const behaviorInputHash = SecurityService.computeCanonicalHash({
      baseCurrency: workingSnapshot.baseCurrency,
      transactions: workingSnapshot.transactions.map((t) => ({
        id: t.id,
        date: t.date,
        amount: t.amount,
        currency: t.currency,
        description: t.description,
        counterparty: t.counterparty,
      })),
      classifications: workingSnapshot.classifications,
      confirmations: workingSnapshot.confirmations,
    });

    const cachedBehaviorRow = this.store.getAgentResult<BehaviorAnalysisResult>(
      authenticatedUserId,
      targetUserId,
      'BehaviorAgent'
    );
    const behaviorStaleness = ReviewOrchestrator.computeAgentStaleness({
      agentName: 'BehaviorAgent',
      currentInputHash: behaviorInputHash,
      currentPolicyVersion: policyBundleVersion,
      cachedResult: cachedBehaviorRow,
      maxAgeHours: policy.horizonAndFreshness.staleBalanceThresholdDays * 24,
      referenceNowIso,
    });

    let behaviorOutput: BehaviorAnalysisResult;
    if (!behaviorStaleness.stale && !forceRefresh && cachedBehaviorRow) {
      behaviorOutput = cachedBehaviorRow.output;
    } else {
      const analyzed = await BehaviorAgent.analyzeTransactions({
        snapshot: minimizedSnapshot,
        llmClient: this.llmClient,
      });
      behaviorOutput = {
        ...analyzed,
        updatedClassifications: minimizedSnapshot.classifications,
      };
      this.store.saveAgentResult(
        authenticatedUserId,
        targetUserId,
        'BehaviorAgent',
        behaviorInputHash,
        policyBundleVersion,
        behaviorOutput
      );
    }

    // Apply BehaviorAgent classifications (never overwriting user_confirmed) and confirmations
    if (behaviorOutput.updatedClassifications) {
      for (const [txId, cls] of Object.entries(behaviorOutput.updatedClassifications)) {
        if (workingSnapshot.classifications[txId]?.status === 'user_confirmed') continue;
        workingSnapshot.classifications[txId] = cls;
      }
    }
    if (Array.isArray(behaviorOutput.proposedConfirmations)) {
      for (const conf of behaviorOutput.proposedConfirmations) {
        if (!workingSnapshot.confirmations.some((c) => c.id === conf.id)) {
          workingSnapshot.confirmations.push(conf);
        }
      }
      workingSnapshot.unresolvedConfirmations = workingSnapshot.confirmations.filter(
        (c) => c.userResponse === null
      );
    }

    // 2D. DebtAgent with Step 1 Stale(y) check
    const debtInputHash = SecurityService.computeCanonicalHash({
      baseCurrency: workingSnapshot.baseCurrency,
      debts: workingSnapshot.debts,
      debtTerms: workingExtras.debtTerms || {},
      referenceDateIso: workingExtras.referenceDateIso,
    });

    const cachedDebtRow = this.store.getAgentResult<DebtAnalysisOutput>(
      authenticatedUserId,
      targetUserId,
      'DebtAgent'
    );
    const debtStaleness = ReviewOrchestrator.computeAgentStaleness({
      agentName: 'DebtAgent',
      currentInputHash: debtInputHash,
      currentPolicyVersion: policyBundleVersion,
      cachedResult: cachedDebtRow,
      maxAgeHours: policy.horizonAndFreshness.staleBalanceThresholdDays * 24,
      referenceNowIso,
    });

    if (debtStaleness.stale || forceRefresh || !cachedDebtRow) {
      const debtOutput = await DebtAgent.analyzeDebts({
        snapshot: minimizedSnapshot,
        calculatorExtras: workingExtras,
        llmClient: this.llmClient,
      });
      this.store.saveAgentResult(
        authenticatedUserId,
        targetUserId,
        'DebtAgent',
        debtInputHash,
        policyBundleVersion,
        debtOutput
      );
    }

    // ------------------------------------------------------------------------
    // STEP 3: AI Suggestion Generator (using minimized PI snapshot)
    // ------------------------------------------------------------------------
    const existingRecommendations = this.store.listRecommendationsForUser(
      authenticatedUserId,
      targetUserId
    );
    const minimizedForSuggestions = SecurityService.minimizePIForLLM(workingSnapshot);

    const aiCandidates = await SuggestionGenerator.generateCandidates({
      snapshot: minimizedForSuggestions,
      policy,
      calculatorExtras: workingExtras,
      existingRecommendations,
      llmClient: this.llmClient,
    });

    // ------------------------------------------------------------------------
    // STEP 4: Checker + Critical Action Coverage
    // ------------------------------------------------------------------------
    const confirmedUnusedSubIds = new Set<string>(
      piEnvelope.userConfirmedUnusedSubscriptionIds || []
    );
    const verifiedCancelTerms: Record<string, { exitFee: number; canCancel: boolean }> = {
      ...(piEnvelope.verifiedCancellationTermsByTargetId || {}),
    };

    for (const conf of workingSnapshot.confirmations) {
      if (conf.subjectType === 'subscription' && conf.userResponse === 'no') {
        confirmedUnusedSubIds.add(conf.subjectId);
        // Unused is not evidence of cancellation rights or zero exit costs.
        // Only explicitly supplied verified terms may authorize a financial action.
      }
    }

    const checkerCtx: CheckerContext = {
      snapshot: workingSnapshot,
      policy,
      knowledgeDb: ASCatalogRepository.load(),
      calculatorExtras: workingExtras,
      existingRecommendations,
      userConfirmedUnusedSubscriptionIds: Array.from(confirmedUnusedSubIds),
      verifiedCancellationTermsByTargetId: verifiedCancelTerms,
      verifiedAccountFeeSchedules: piEnvelope.verifiedAccountFeeSchedules,
      verifiedUkDpcAgreement: piEnvelope.verifiedUkDpcAgreement,
    };

    const checkerOutput = ActionChecker.runCheckerPipeline(aiCandidates, checkerCtx);

    // ------------------------------------------------------------------------
    // STEP 5: Single AI Evaluation Call (T, S, D, O) + Decision Engine (5A–5E)
    // ------------------------------------------------------------------------
    const validValidationResults = [
      ...checkerOutput.validCriticalCandidates,
      ...checkerOutput.validFinancialCandidates,
      ...checkerOutput.validVerificationCandidates,
    ];
    const validCandidates = validValidationResults.map((v) => v.candidate);

    // Single batch AI Evaluation Call per cycle
    const aiComplexityMap = await AIEvaluationService.evaluateCandidateComplexities({
      snapshot: minimizedForSuggestions,
      validCandidates,
      policy,
      llmClient: this.llmClient,
    });

    const previousWeightProfileId = this.store.getLatestWeightProfileId(
      authenticatedUserId,
      targetUserId
    );
    const latestActiveBundle = this.store.getLatestRecommendationBundle(
      authenticatedUserId,
      targetUserId
    );
    const activeRecommendationActionId =
      latestActiveBundle?.recommendation.status === 'proposed' ||
      latestActiveBundle?.recommendation.status === 'accepted'
        ? latestActiveBundle.decision.selectedActionId
        : null;

    const rawDecision = await this.executeDecisionEngine({
      evaluationId,
      userId: targetUserId,
      snapshot: workingSnapshot,
      policy,
      checkerOutput,
      aiComplexityMap,
      previousWeightProfileId,
      calculatorExtras: workingExtras,
      activeRecommendationActionId,
    });

    // ------------------------------------------------------------------------
    // STEP 6: Assistant Explanation Generator + Stale Snapshot Publication Guard
    // ------------------------------------------------------------------------
    const explanation = AssistantAgent.generateExplanation(rawDecision, workingSnapshot);
    const enrichedDecision: RecommendationDecision = RecommendationDecisionSchema.parse({
      ...rawDecision,
      snapshotId: workingSnapshot.id,
      snapshotVersion: startingSnapshotVersion,
      title: explanation.title,
      description: explanation.description,
      reasoning: explanation.reasoning,
      expectedEffectSummary: explanation.expectedEffectSummary,
      trace: {
        ...rawDecision.trace,
        snapshotId: workingSnapshot.id,
        snapshotVersion: startingSnapshotVersion,
      },
    });

    // Optional test hook to simulate concurrent PI snapshot mutation during evaluation
    if (onBeforePublish) {
      await onBeforePublish();
    }

    // Stale snapshot publication guard: check if user's latest snapshotVersion in SQLiteStore advanced
    const latestVersionNow = this.store.getLatestSnapshotVersion(
      authenticatedUserId,
      targetUserId
    );
    if (latestVersionNow && latestVersionNow !== startingSnapshotVersion) {
      this.store.updateEvaluationRunStatus(
        authenticatedUserId,
        targetUserId,
        evaluationId,
        'SUPERSEDED_BY_NEWER_SNAPSHOT'
      );
      this.store.saveDecisionTrace(
        authenticatedUserId,
        targetUserId,
        enrichedDecision.trace,
        enrichedDecision
      );

      const existingPublished = this.store.getLatestRecommendationBundle(
        authenticatedUserId,
        targetUserId
      );
      const fallbackRecord =
        existingPublished?.recommendation ||
        this.buildRecommendationRecord(targetUserId, workingSnapshot, enrichedDecision);

      return {
        evaluationId,
        status: 'SUPERSEDED_BY_NEWER_SNAPSHOT',
        duplicateSuppressed: false,
        publishedToToday: false,
        snapshot: workingSnapshot,
        snapshotVersion: startingSnapshotVersion,
        decision: existingPublished?.decision || enrichedDecision,
        recommendation: fallbackRecord,
        trace: enrichedDecision.trace,
        agentFreshness: {
          BehaviorAgent: behaviorStaleness,
          DebtAgent: debtStaleness,
        },
      };
    }

    // Publish to Today (`recommendations` & `decision_traces`)
    const recommendationRecord = this.buildRecommendationRecord(
      targetUserId,
      workingSnapshot,
      enrichedDecision
    );
    this.store.saveDecisionTrace(
      authenticatedUserId,
      targetUserId,
      enrichedDecision.trace,
      enrichedDecision
    );
    this.store.saveRecommendation(
      authenticatedUserId,
      targetUserId,
      recommendationRecord,
      enrichedDecision
    );
    this.store.updateEvaluationRunStatus(
      authenticatedUserId,
      targetUserId,
      evaluationId,
      'COMPLETED'
    );

    return {
      evaluationId,
      status: 'COMPLETED',
      duplicateSuppressed: false,
      publishedToToday: true,
      snapshot: workingSnapshot,
      snapshotVersion: startingSnapshotVersion,
      decision: enrichedDecision,
      recommendation: recommendationRecord,
      trace: enrichedDecision.trace,
      agentFreshness: {
        BehaviorAgent: behaviorStaleness,
        DebtAgent: debtStaleness,
      },
    };
  }

  /**
   * Step 7: Feedback + PI Update Lifecycle
   * Handles:
   * - 'accept': sets status to 'accepted' (NEVER deducts bank balances or marks completed!)
   * - 'adjust': re-runs ActionChecker.validateCandidate with adjustedAmount; rejects if unsafe
   * - 'decline': records 'declined' and triggers a fresh review cycle excluding the declined action
   * - 'complete': records 'completed' and updates goal allocation / PI state
   */
  public async submitFeedback(params: SubmitFeedbackParams): Promise<SubmitFeedbackResult> {
    const {
      authenticatedUserId,
      targetUserId,
      recommendationId,
      action,
      adjustedAmount = null,
      note = '',
    } = params;

    SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

    const bundle = this.store.getRecommendationById(authenticatedUserId, targetUserId, recommendationId);

    if (!bundle) {
      throw Object.assign(new Error('The requested recommendation does not exist.'), {
        statusCode: 404, code: 'RECOMMENDATION_NOT_FOUND',
      });
    }

    const piEnvelope = this.store.getPIState(authenticatedUserId, targetUserId, true);
    if (!piEnvelope) {
      throw new Error(`PI state not found for user '${targetUserId}'.`);
    }

    const nowIso = new Date().toISOString();
    const { recommendation, decision } = bundle;
    const policy = this.getPolicy();
    const conflict = (code: string, message: string): never => {
      throw Object.assign(new Error(message), { statusCode: 409, code });
    };
    // Replaying cancellation is read-only and cannot duplicate feedback or release cash twice.
    if (action === 'decline' && recommendation.status === 'declined') {
      return { status: 'DECLINED_AND_RERUN', accepted: true, recommendation, decision,
        feedbackRecord: this.store.listActionFeedbackForUser(authenticatedUserId, targetUserId)
          .find(feedback => feedback.recommendationId === recommendation.id && feedback.action === 'decline') || null };
    }
    const transitions: Record<string, string[]> = {
      proposed: ['accept', 'adjust', 'decline'],
      accepted: ['adjust', 'decline', 'complete'],
      adjusted: ['accept', 'adjust', 'decline', 'complete'],
    };
    if (!transitions[recommendation.status]?.includes(action)) {
      conflict('INVALID_FEEDBACK_TRANSITION', `Cannot ${action} a ${recommendation.status} recommendation.`);
    }
    const latest = this.store.getLatestRecommendationBundle(authenticatedUserId, targetUserId);
    const cancelsPendingCommitment = action === 'decline' &&
      (recommendation.status === 'accepted' || recommendation.status === 'adjusted');
    if (!cancelsPendingCommitment && (bundle.snapshotVersion !== piEnvelope.version ||
        decision.trace.snapshotVersion !== piEnvelope.version ||
        latest?.recommendation.id !== recommendation.id)) {
      conflict('STALE_RECOMMENDATION', 'Financial information has changed. Reload Today before responding.');
    }

    if (action === 'accept') {
      if (decision.decisionStatus !== 'RECOMMENDATION_READY' || !decision.candidate) {
        conflict('ACCEPTANCE_REVALIDATION_FAILED', 'There is no publishable action to accept.');
      }
      const validation = ActionChecker.validateCandidate(
        { ...decision.candidate!, amount: recommendation.adjustedAmount ?? recommendation.suggestedAmount },
        { snapshot: piEnvelope.snapshot, policy,
          calculatorExtras: { ...piEnvelope.calculatorExtras,
            pendingFinancialCommitments: this.store.listPendingFinancialCommitments(authenticatedUserId, targetUserId, recommendation.id) },
          userConfirmedUnusedSubscriptionIds: piEnvelope.userConfirmedUnusedSubscriptionIds,
          verifiedCancellationTermsByTargetId: piEnvelope.verifiedCancellationTermsByTargetId,
          verifiedAccountFeeSchedules: piEnvelope.verifiedAccountFeeSchedules,
          verifiedUkDpcAgreement: piEnvelope.verifiedUkDpcAgreement });
      if (validation.status !== 'VALID') conflict('ACCEPTANCE_REVALIDATION_FAILED', 'The action requires fresh validation before acceptance.');
    }

    // 1. ACCEPT: sets status to 'accepted' WITHOUT deducting bank balances or marking completed
    if (action === 'accept') {
      const updatedRec: RecommendationRecord = {
        ...recommendation,
        status: 'accepted',
        updatedAt: nowIso,
      };
      const feedbackRecord = this.store.runInTransaction(() => {
      this.store.saveRecommendation(authenticatedUserId, targetUserId, updatedRec, decision);
      return this.store.recordActionFeedback(authenticatedUserId, targetUserId, {
        id: `fb_${Date.now()}_accept`,
        recommendationId: recommendation.id,
        actionId: decision.selectedActionId,
        snapshotId: recommendation.snapshotId,
        action: 'accept',
        amount: recommendation.adjustedAmount ?? recommendation.suggestedAmount,
        note: note || 'User accepted recommendation (pending execution).',
        timestamp: nowIso,
      });
      });

      return {
        status: 'ACCEPTED',
        accepted: true,
        recommendation: updatedRec,
        decision,
        feedbackRecord,
      };
    }

    // 2. ADJUST: must re-run ActionChecker.validateCandidate with the new adjustedAmount!
    if (action === 'adjust') {
      if (!['A002', 'A007', 'A008', 'A012'].includes(decision.selectedActionId || '')) {
        return { status: 'ADJUSTMENT_REJECTED', accepted: false, recommendation, decision,
          feedbackRecord: null, rejectionReason: 'This action does not support changing a monetary allocation.' };
      }
      if (typeof adjustedAmount !== 'number' || !Number.isFinite(adjustedAmount) || !(adjustedAmount > 0)) {
        return {
          status: 'ADJUSTMENT_REJECTED',
          accepted: false,
          recommendation,
          decision,
          feedbackRecord: null,
          rejectionReason: 'Adjusted amount must be a positive number.',
          failedChecks: [
            {
              layer: 'AFFORDABILITY',
              code: 'INVALID_ADJUSTED_AMOUNT',
              detail: 'Adjusted amount must be greater than zero.',
            },
          ],
          missingFields: ['action_amount'],
        };
      }

      if (!decision.candidate) {
        return {
          status: 'ADJUSTMENT_REJECTED',
          accepted: false,
          recommendation,
          decision,
          feedbackRecord: null,
          rejectionReason: 'Cannot adjust a recommendation that has no underlying candidate action.',
        };
      }

      const candidateToValidate: CandidateAction = {
        ...decision.candidate,
        amount: adjustedAmount,
      };

      const existingRecommendations = this.store
        .listRecommendationsForUser(authenticatedUserId, targetUserId)
        .filter((r) => r.id !== recommendation.id);

      const checkerCtx: CheckerContext = {
        snapshot: piEnvelope.snapshot,
        policy,
        knowledgeDb: ASCatalogRepository.load(),
        calculatorExtras: { ...piEnvelope.calculatorExtras,
          pendingFinancialCommitments: this.store.listPendingFinancialCommitments(authenticatedUserId, targetUserId, recommendation.id) },
        existingRecommendations,
        userConfirmedUnusedSubscriptionIds: piEnvelope.userConfirmedUnusedSubscriptionIds,
        verifiedCancellationTermsByTargetId: piEnvelope.verifiedCancellationTermsByTargetId,
        verifiedAccountFeeSchedules: piEnvelope.verifiedAccountFeeSchedules,
        verifiedUkDpcAgreement: piEnvelope.verifiedUkDpcAgreement,
      };

      const validationResult = ActionChecker.validateCandidate(candidateToValidate, checkerCtx);

      if (validationResult.status !== 'VALID') {
        const failureReason =
          validationResult.failedChecks
            .map((f: CheckFailure) => `${f.code}: ${f.detail}`)
            .join('; ') ||
          `Missing required data: ${validationResult.missingFields.join(', ')}`;

        // Do NOT corrupt or overwrite the existing valid recommendation!
        return {
          status: 'ADJUSTMENT_REJECTED',
          accepted: false,
          recommendation,
          decision,
          feedbackRecord: null,
          validationResult,
          failedChecks: validationResult.failedChecks,
          missingFields: validationResult.missingFields,
          rejectionReason: failureReason,
        };
      }

      // Adjustment is VALID -> update recommendation and decision
      const impact = ImpactCalculator.evaluateFinancialImpact({ candidate: candidateToValidate,
        snapshot: piEnvelope.snapshot, policy, calculatorExtras: checkerCtx.calculatorExtras });
      if (impact.status !== 'COMPUTED') {
        return { status: 'ADJUSTMENT_REJECTED', accepted: false, recommendation, decision,
          feedbackRecord: null, missingFields: impact.missingInputs,
          rejectionReason: 'The adjusted amount requires additional financial inputs before its effects can be verified.' };
      }
      const updatedDecision: RecommendationDecision = {
        ...decision, candidate: candidateToValidate,
        values: { resilience: impact.normalizedValues.v_R,
          financial_benefit: impact.normalizedValues.v_F, goal_progress: impact.normalizedValues.v_G },
        rawImpacts: { resilienceMonths: impact.rawImpacts.deltaResilienceMonths,
          financialBenefitCurrency: impact.rawImpacts.deltaFinancialBenefitCurrency,
          goalProgressPctPoints: impact.rawImpacts.deltaGoalProgressFraction * 100,
          annualizedSaving12m: impact.rawImpacts.annualizedRecurringSaving12m,
          debt12mInterestAvoided: impact.rawImpacts.debt12mCounterfactualInterestAvoided },
        score: null, stability: null,
        expectedEffectSummary: `Adjusted amount ${candidateToValidate.currency} ${adjustedAmount}; financial effects recalculated. Ranking and stability await the next review.`,
      };
      const updatedRec: RecommendationRecord = {
        ...recommendation,
        status: 'adjusted',
        adjustedAmount,
        updatedAt: nowIso,
      };

      const feedbackRecord = this.store.runInTransaction(() => {
      this.store.saveRecommendation(
        authenticatedUserId,
        targetUserId,
        updatedRec,
        updatedDecision
      );
      return this.store.recordActionFeedback(authenticatedUserId, targetUserId, {
        id: `fb_${Date.now()}_adjust`,
        recommendationId: recommendation.id,
        actionId: decision.selectedActionId,
        snapshotId: recommendation.snapshotId,
        action: 'adjust',
        amount: adjustedAmount,
        note: note || `User adjusted amount to ${adjustedAmount} (validated by Checker).`,
        timestamp: nowIso,
      });
      });

      return {
        status: 'ADJUSTED',
        accepted: true,
        recommendation: updatedRec,
        decision: updatedDecision,
        feedbackRecord,
        validationResult,
      };
    }

    // 3. DECLINE: records 'declined' in action_feedback and triggers a fresh review cycle excluding the declined action
    if (action === 'decline') {
      const declinedRec: RecommendationRecord = {
        ...recommendation,
        status: 'declined',
        updatedAt: nowIso,
      };
      const feedbackRecord = this.store.runInTransaction(() => {
      this.store.saveRecommendation(authenticatedUserId, targetUserId, declinedRec, decision);
      return this.store.recordActionFeedback(authenticatedUserId, targetUserId, {
        id: `fb_${Date.now()}_decline`,
        recommendationId: recommendation.id,
        actionId: decision.selectedActionId,
        snapshotId: recommendation.snapshotId,
        action: 'decline',
        amount: null,
        note: note || 'User declined recommendation.',
        timestamp: nowIso,
      });
      });

      let nextCycleResult: ReviewCycleResult | undefined;
      try {
        nextCycleResult = await this.runReviewCycle({
          authenticatedUserId, targetUserId, eventType: 'feedback_decline', forceRefresh: true,
        });
      } catch {
        // Decline is already committed; a review outage must not masquerade as a failed write.
      }
      return {
        status: 'DECLINED_AND_RERUN', accepted: true,
        recommendation: nextCycleResult?.recommendation || declinedRec,
        decision: nextCycleResult?.decision || decision,
        feedbackRecord, nextCycleResult,
        ...(!nextCycleResult ? { reviewPending: true,
          reviewMessage: 'Decline was saved. Reload Today to retry the recommendation review.' } : {}),
      };
    }

    // 4. COMPLETE: records 'completed' and updates goal allocation / PI state when confirmed by user
    const finalAmount =
      recommendation.adjustedAmount ??
      recommendation.suggestedAmount ??
      decision.candidate?.amount ??
      null;
    if (adjustedAmount !== null && adjustedAmount !== finalAmount) {
      conflict('COMPLETION_AMOUNT_MISMATCH', 'Complete uses the previously validated amount. Adjust the recommendation first.');
    }
    if (!decision.candidate) {
      conflict('INVALID_FEEDBACK_TRANSITION', 'There is no action to complete.');
    }
    if (decision.selectedActionType === 'FINANCIAL_ACTION' &&
        !['A001', 'A002', 'A007', 'A008', 'A012', 'A011'].includes(decision.selectedActionId || '')) {
      return { status: 'VERIFICATION_REQUIRED', accepted: false, recommendation, decision,
        feedbackRecord: null,
        rejectionReason: 'Real-world execution must be verified manually before this action can be recorded as completed. No financial change was recorded.' };
    }
    if (decision.selectedActionId === 'A011' &&
        !piEnvelope.calculatorExtras?.scheduledTransfers?.some((transfer) => transfer.id === decision.candidate!.targetId && transfer.isActive)) {
      conflict('COMPLETION_NEEDS_DATA', 'Confirm the exact active scheduled transfer before recording its pause.');
    }
    const completionValidation = ActionChecker.validateCandidate(
      { ...decision.candidate!, amount: finalAmount },
      {
        snapshot: piEnvelope.snapshot, policy, knowledgeDb: ASCatalogRepository.load(),
        calculatorExtras: { ...piEnvelope.calculatorExtras,
          pendingFinancialCommitments: this.store.listPendingFinancialCommitments(authenticatedUserId, targetUserId, recommendation.id) },
        existingRecommendations: this.store.listRecommendationsForUser(authenticatedUserId, targetUserId)
          .filter((record) => record.id !== recommendation.id),
        userConfirmedUnusedSubscriptionIds: piEnvelope.userConfirmedUnusedSubscriptionIds,
        verifiedCancellationTermsByTargetId: piEnvelope.verifiedCancellationTermsByTargetId,
        verifiedAccountFeeSchedules: piEnvelope.verifiedAccountFeeSchedules,
        verifiedUkDpcAgreement: piEnvelope.verifiedUkDpcAgreement,
      }
    );
    if (completionValidation.status !== 'VALID') {
      conflict('COMPLETION_REVALIDATION_FAILED', 'This action is no longer valid. Reload Today.');
    }

    const completedRec: RecommendationRecord = {
      ...recommendation,
      status: 'completed',
      adjustedAmount: finalAmount ?? recommendation.adjustedAmount,
      updatedAt: nowIso,
    };
    const feedbackInput = {
      id: `fb_${Date.now()}_complete`,
      recommendationId: recommendation.id,
      actionId: decision.selectedActionId,
      snapshotId: recommendation.snapshotId,
      action: 'complete' as const,
      amount: finalAmount,
      note: note || 'User confirmed action completion.',
      timestamp: nowIso,
    };

    // Update PI state upon user-confirmed completion
    const updatedSnapshot: FinancialSnapshot = JSON.parse(JSON.stringify(piEnvelope.snapshot));
    const updatedExtras: CalculatorContextExtras = JSON.parse(
      JSON.stringify(piEnvelope.calculatorExtras || {})
    );
    const actId = decision.selectedActionId;

    if (
      (actId === 'A007' || actId === 'A008' || actId === 'A010' || actId === 'A012') &&
      finalAmount &&
      finalAmount > 0
    ) {
      const targetGoalId =
        decision.candidate?.targetId ||
        recommendation.targetGoalId ||
        updatedSnapshot.safetyCushionGoal?.id;
      const sourceAccountId =
        decision.candidate?.sourceAccountId ||
        recommendation.sourceAccountId;
      const targetGoal = updatedSnapshot.goals.find((goal) => goal.id === targetGoalId);
      const source = updatedSnapshot.accountSummaries.find((summary) => summary.account.id === sourceAccountId);
      if (!targetGoalId || !sourceAccountId || !targetGoal || !source ||
          targetGoal.currency !== recommendation.currency || source.account.currency !== recommendation.currency) {
        conflict('COMPLETION_NEEDS_DATA', 'Confirm an existing savings goal and same-currency source account before completing this allocation.');
      }

      const newAlloc: GoalAllocation = {
        id: `alloc_completed_${Date.now()}`,
        userId: targetUserId,
        goalId: targetGoalId!,
        accountId: sourceAccountId!,
        amount: finalAmount,
        currency: recommendation.currency || updatedSnapshot.baseCurrency,
        allocatedAt: nowIso,
        note: `Completed ${actId}: ${recommendation.title}`,
        recommendationId: recommendation.id,
      };
      updatedSnapshot.goalAllocations.push(newAlloc);
      if (
        updatedSnapshot.safetyCushionGoal &&
        targetGoalId === updatedSnapshot.safetyCushionGoal.id
      ) {
        updatedSnapshot.safetyCushionAllocated = Number(
          (updatedSnapshot.safetyCushionAllocated + finalAmount).toFixed(2)
        );
      }
    } else if ((actId === 'A001' || actId === 'A002') && finalAmount && finalAmount > 0) {
      const targetDebt = updatedSnapshot.debts.find((d) => d.id === decision.candidate?.targetId);
      const source = updatedSnapshot.accountSummaries.find((summary) =>
        summary.account.id === decision.candidate?.sourceAccountId);
      if (!targetDebt || !source?.latestBalance || source.account.fundsOwnership !== 'personal' ||
          source.account.currency !== targetDebt.currency ||
          source.latestBalance.currency !== recommendation.currency || source.latestBalance.amount < finalAmount) {
        conflict('COMPLETION_NEEDS_DATA', 'Confirm the same-currency personal source account and balance before completing this payment.');
      }
      const balance = source!.latestBalance!;
      balance.amount = Number((balance.amount - finalAmount).toFixed(2));
      balance.asOf = nowIso;
      source!.balanceHistory = source!.balanceHistory.map((entry) => entry.id === balance.id ? balance : entry);
      if (actId === 'A001') {
        // Only settle an obligation explicitly linked to this payment; never guess a later due date.
        updatedSnapshot.obligations = updatedSnapshot.obligations.map((obligation) =>
          obligation.id === decision.candidate?.targetId ? { ...obligation, status: 'paid' as const } : obligation);
        targetDebt!.minimumPayment = null;
        targetDebt!.nextDueDate = null;
      }
      if (targetDebt && targetDebt.remainingBalance !== null) {
        targetDebt.remainingBalance = Number(
          Math.max(0, targetDebt.remainingBalance - finalAmount).toFixed(2)
        );
      }
    } else if (actId === 'A011' && decision.candidate?.targetId && updatedExtras.scheduledTransfers) {
      updatedExtras.scheduledTransfers = updatedExtras.scheduledTransfers.map((tr) =>
        tr.id === decision.candidate?.targetId ? { ...tr, isActive: false } : tr
      );
    }

    // Rebuild derived views from the updated primary records rather than retaining
    // pre-completion cash/allocation summaries. No new financial policy is introduced.
    const seedForRebuild: PIDatabaseSeed = {
      ...piEnvelope.seed,
      user: piEnvelope.seed?.user || ({ id: targetUserId, isDemoMode: updatedSnapshot.isDemoMode } as PIDatabaseSeed['user']),
      profile: updatedSnapshot.profile, preferences: updatedSnapshot.preferences,
      onboarding: updatedSnapshot.onboarding,
      accounts: updatedSnapshot.accountSummaries.map((summary) => summary.account),
      balances: updatedSnapshot.accountSummaries.flatMap((summary) => {
        const balances = [...summary.balanceHistory];
        if (summary.latestBalance && !balances.some((balance) => balance.id === summary.latestBalance!.id)) {
          balances.push(summary.latestBalance);
        }
        return balances;
      }),
      incomes: updatedSnapshot.incomeSources, expenseCommitment: updatedSnapshot.essentialCommitment,
      obligations: updatedSnapshot.obligations, debts: updatedSnapshot.debts, goals: updatedSnapshot.goals,
      goalAllocations: updatedSnapshot.goalAllocations, statements: updatedSnapshot.statements,
      transactions: updatedSnapshot.transactions, classifications: Object.values(updatedSnapshot.classifications),
      transferMatches: updatedSnapshot.transferMatches, confirmations: updatedSnapshot.confirmations,
      recommendations: piEnvelope.seed?.recommendations || [],
      assistantMessages: piEnvelope.seed?.assistantMessages || [],
    };
    const rebuiltSnapshot = buildFinancialSnapshot(seedForRebuild);
    const feedbackRecord = this.store.runInTransaction(() => {
      this.store.saveRecommendation(authenticatedUserId, targetUserId, completedRec, decision);
      const feedback = this.store.recordActionFeedback(authenticatedUserId, targetUserId, feedbackInput);
      this.store.savePIState(authenticatedUserId, targetUserId, {
        snapshot: rebuiltSnapshot,
        ...(piEnvelope.seed ? { seed: seedForRebuild } : {}),
        calculatorExtras: updatedExtras,
      });
      return feedback;
    });
    let nextCycleResult: ReviewCycleResult | undefined;
    let reviewPending = false;
    try {
      nextCycleResult = await this.runReviewCycle({
        authenticatedUserId, targetUserId, eventType: 'feedback_complete', forceRefresh: true,
      });
    } catch {
      // Completion already committed. Report its actual outcome even if the
      // subsequent asynchronous review is unavailable; Today retries freshness.
      reviewPending = true;
    }

    return {
      status: 'COMPLETED',
      accepted: true,
      recommendation: completedRec,
      decision,
      feedbackRecord,
      nextCycleResult,
      ...(reviewPending ? {
        reviewPending: true,
        reviewMessage: 'Completion was saved. Reload Today to retry the recommendation review.',
      } : {}),
    };
  }

  private buildRecommendationRecord(
    userId: string,
    snapshot: FinancialSnapshot,
    decision: RecommendationDecision
  ): RecommendationRecord {
    const nowIso = new Date().toISOString();
    const actId = decision.selectedActionId || 'NONE';
    const priority: RecommendationRecord['priority'] =
      decision.priorityClass === 'CRITICAL'
        ? 'priority'
        : decision.decisionStatus === 'NEEDS_DATA' ||
          decision.priorityClass === 'VERIFICATION_UNLOCK'
        ? 'clarification'
        : 'suggested';

    return {
      id: `rec_${actId}_${decision.evaluationId}`,
      userId,
      snapshotId: snapshot.id,
      actionType: mapActionIdToLegacyActionType(decision.selectedActionId, decision.selectedActionType),
      title: decision.title,
      description: decision.description,
      reasoning: decision.reasoning,
      suggestedAmount: decision.candidate?.amount ?? null,
      adjustedAmount: null,
      currency: decision.candidate?.currency || snapshot.baseCurrency || 'EUR',
      targetGoalId: decision.candidate?.targetId ?? null,
      sourceAccountId: decision.candidate?.sourceAccountId ?? null,
      priority,
      status: 'proposed',
      readinessState: mapDecisionToReadinessState(decision),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
  }

  /**
   * Delegates Step 5A–5E to DecisionEngine.runDecisionEngine from server/src/decision/decisionEngine.ts
   */
  private async executeDecisionEngine(params: {
    evaluationId: string;
    userId: string;
    snapshot: FinancialSnapshot;
    policy: PrototypePolicyBundle;
    checkerOutput: CheckerBatchOutput;
    aiComplexityMap: Record<string, Partial<Record<ComplexityComponent, ComplexityFactorScore>>>;
    previousWeightProfileId: WeightProfileId | null;
    calculatorExtras?: CalculatorContextExtras;
    activeRecommendationActionId: string | null;
  }): Promise<RecommendationDecision> {
    return DecisionEngine.runDecisionEngine({
      evaluationId: params.evaluationId,
      snapshot: params.snapshot,
      checkerOutput: params.checkerOutput,
      policy: params.policy,
      knowledgeDb: ASCatalogRepository.load(),
      calculatorExtras: params.calculatorExtras,
      previousProfileId: params.previousWeightProfileId,
      aiComplexityByCandidateId: params.aiComplexityMap,
    });
  }
}

