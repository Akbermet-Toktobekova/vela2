import { randomUUID } from 'node:crypto';
import { AnalysisArtifactSchema, type AnalysisArtifact, type ChatMemory } from '@shared/contracts/pipeline';
import { prompts, promptFingerprint } from '../ai/prompts';
import { TransactionClassifier } from '../analyzer/transactionClassifier';
import { analyzePatterns, interpretBehavior } from '../analyzer/patternAgent';
import { calculateFinancialMetrics } from '../analyzer/financialMetrics';
import {
  ActionType,
  CandidateAction,
  CandidateComplexityEvaluation,
  CandidateComplexityEvaluationSchema,
  CheckFailure,
  ComplexityComponent,
  ComplexityFactorScore,
  DecisionTrace,
  DecisionTraceSchema,
  ImpactSimulationResult,
  ImpactSimulationResultSchema,
  PrototypePolicyBundle,
  RecommendationDecision,
  RecommendationDecisionSchema,
  RobustnessResult,
  RobustnessResultSchema,
  ScoredCandidate,
  ScoredCandidateSchema,
  ValidationResult,
  WeightProfileId,
} from '@shared/contracts';
import {
  ActionFeedback,
  FinancialSnapshot,
  GoalAllocation,
  ReadinessState,
  RecommendationRecord,
} from '@shared/pi/types';
import { CalculatorContextExtras, SharedFinancialCalculator } from '@shared/calculator';
import { loadPrototypePolicy } from '../config/policyLoader';
import { ASCatalogRepository } from '../catalog/asCatalogRepository';
import { ActionChecker, CheckerBatchOutput, CheckerContext } from '../checker/actionChecker';
import { SecurityService } from '../security/securityService';
import { FrankfurterFXService } from '../fx/frankfurterService';
import {
  AgentResultRow,
  SavePIStateInput,
  SQLiteStore,
  StoredPIStateEnvelope,
} from '../db/sqliteStore';
import { LLMClient } from '../ai/llmClient';
import { DebtAgent, DebtAnalysisOutput, calculateDebtReport } from '../analyzer/debtAgent';
import { SuggestionGenerator } from '../suggestion/suggestionGenerator';
import { evaluatePrimarySuggestions } from '../suggestion/primarySuggestions';
import { AIEvaluationService } from '../ai/evaluationCall';
import { AssistantAgent } from '../ai/assistantAgent';
import { DecisionEngine } from '../decision/decisionEngine';
import { ImpactCalculator } from '../decision/impactCalculator';
import { WeightCalculator } from '../decision/weightCalculator';
import { buildFinancialSnapshot, computeObservedAnalytics } from '../../../react-app/src/services/snapshotBuilder';
import type { PIDatabaseSeed } from '../../../react-app/src/database/seed';

export interface AgentStalenessCheck {
  agentName: 'BehaviorAgent' | 'DebtAgent' | 'TransactionClassifier' | 'PatternAgent';
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
  onStage?: (artifact: AnalysisArtifact, input: unknown) => void;
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

export type EngineRepository = Pick<SQLiteStore,
  'runInTransaction' | 'getPIState' | 'savePIState' | 'getLatestSnapshotVersion' | 'getAgentResult' | 'saveAgentResult' | 'createEvaluationRun' | 'updateEvaluationRunStatus' | 'getLatestEvaluationRun' | 'saveDecisionTrace' | 'getDecisionTrace' | 'getLatestWeightProfileId' | 'saveRecommendation' | 'getRecommendationById' | 'getLatestRecommendationBundle' | 'listRecommendationsForUser' | 'listPendingFinancialCommitments' | 'recordActionFeedback' | 'listActionFeedbackForUser' | 'saveAssistantMessage' | 'listAssistantMessages' | 'getCachedFXRate' | 'upsertFXRate'> & {
  getConversationContextVersion?(auth: string, target: string): string;
  getConversationMemory?(auth: string, target: string): ChatMemory | null;
  saveStageArtifacts?(auth: string, target: string, artifacts: AnalysisArtifact[]): void;
};

export interface ReviewOrchestratorOptions {
  store?: EngineRepository;
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

  constructor(options?: ReviewOrchestratorOptions) {
    this.store = options?.store || new SQLiteStore();
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
    agentName: 'BehaviorAgent' | 'DebtAgent' | 'TransactionClassifier' | 'PatternAgent';
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

    const readMemory = () => this.store.getConversationMemory?.(authenticatedUserId, targetUserId) ?? null;
    const memory = readMemory();
    const chatVersion = this.store.getConversationContextVersion?.(authenticatedUserId, targetUserId);
    const modelCalls: { prompt: string; provenance: AnalysisArtifact['models'][number] }[] = [];
    const llmClient = new Proxy(this.llmClient, {
      get(target, key, receiver) {
        if (key !== 'generateStructured' && key !== 'generateText') return Reflect.get(target, key, receiver);
        return async (request: { systemPrompt: string }) => {
          const invoke = target[key].bind(target) as (value: unknown) => Promise<AnalysisArtifact['models'][number]>;
          const response = await invoke(request);
          modelCalls.push({ prompt: request.systemPrompt, provenance: {
            provider: response.provider, modelUsed: response.modelUsed, liveCallUsed: response.liveCallUsed, fallbackReason: response.fallbackReason,
          } });
          return response;
        };
      },
    });
    const runInputHash = SecurityService.computeCanonicalHash({
      modelConfiguration: this.llmClient.getQuotaAndModelStatus?.().candidateModels ?? [], source: piEnvelope.inputHash, day: workingExtras.referenceDateIso,
      prompts: promptFingerprint, chatVersion, memory: memory && [memory.inputHash, memory.status, memory.updatedAt],
    });

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
        latestRun.snapshotVersion === startingSnapshotVersion &&
        latestRun.inputHash === runInputHash &&
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

    const evaluationId = 'eval_' + randomUUID();
    const artifacts: AnalysisArtifact[] = [];
    const stageInputs: Record<string, string[]> = {
      fx: ['pi'], classification: ['pi'], 'pattern-recognition': ['classification'],
      'behavior-agent': ['classification', 'pattern-recognition'], 'financial-calculator': ['fx', 'classification'],
      'debt-calculator': ['pi'], 'debt-agent': ['debt-calculator'],
      'suggestion-generator': ['behavior-agent', 'pattern-recognition', 'financial-calculator', 'debt-agent'],
      'catalog-selector': ['suggestion-generator', 'financial-calculator'], checker: ['suggestion-generator', 'catalog-selector', 'financial-calculator'],
      'critical-coverage': ['financial-calculator'], 'ai-evaluation': ['checker', 'critical-coverage'],
      weights: ['financial-calculator'], impact: ['checker', 'financial-calculator'],
      scoring: ['ai-evaluation', 'weights', 'impact'], robustness: ['scoring'],
      'decision-engine': ['checker', 'critical-coverage', 'weights', 'scoring', 'robustness'], explanation: ['decision-engine'],
    };
    const record = (stage: string, input: unknown, output: unknown, details: Partial<Pick<AnalysisArtifact,
      'summaryText' | 'promptVersion' | 'models' | 'status' | 'missingInputs' | 'evidenceIds'>> = {}) => {
      const prompt = Object.values(prompts).find(item => item.version === details.promptVersion);
      const models = details.models ?? modelCalls.filter(call => prompt && call.prompt.startsWith(prompt.text)).map(call => call.provenance);
      const status = details.status ?? (models.some(model => !model.liveCallUsed) ? 'PARTIAL' : 'COMPLETED');
      const inputs = stageInputs[stage.startsWith('impact-') ? 'impact' : stage] ?? [];
      const upstream = artifacts.filter(item => inputs.some(name => item.stage === name || item.stage.startsWith(name + '-')));
      const artifact = AnalysisArtifactSchema.parse({
        schemaVersion: 1, id: evaluationId + ':' + stage, userId: targetUserId, runId: evaluationId,
        stage, snapshotId: workingSnapshot.id, snapshotVersion: startingSnapshotVersion,
        inputHash: SecurityService.computeCanonicalHash(input),
        dependencies: { pi: startingSnapshotVersion, policy: policyBundleVersion, prompts: promptFingerprint,
          ...Object.fromEntries(upstream.map(item => [item.stage, item.inputHash])) },
        referenceDate: workingExtras.referenceDateIso, executedAt: new Date().toISOString(),
        policyVersion: policyBundleVersion, missingInputs: [], evidenceIds: [],
        upstreamIds: upstream.map(prior => prior.id), ...details, models, status, output,
      });
      artifacts.push(artifact);
      options.onStage?.(structuredClone(artifact), structuredClone(input));
    };
    record('pi', { snapshotId: workingSnapshot.id, version: startingSnapshotVersion }, {
      readiness: workingSnapshot.dataQuality, inputHash: piEnvelope.inputHash,
    });
    this.store.createEvaluationRun(authenticatedUserId, targetUserId, {
      evaluationId,
      snapshotId: workingSnapshot.id,
      snapshotVersion: startingSnapshotVersion,
      eventType,
      inputHash: runInputHash,
      policyVersion: policyBundleVersion,
      status: 'IN_PROGRESS',
    });

    // ------------------------------------------------------------------------
    // STEP 2: Financial Analyzer (FX Service + BehaviorAgent + DebtAgent + Calculator)
    // ------------------------------------------------------------------------
    // 2A. Fetch or resolve FX rates for all currencies in snapshot
    const fx = await this.resolveReviewFx(workingSnapshot, workingExtras, evaluationNowIso);
    workingExtras.fxRates = fx.rates;
    record('fx', { foreignSymbols: fx.foreignSymbols, date: evaluationNowIso, baseCurrency: workingSnapshot.baseCurrency }, fx.rates);
    const minimizedSnapshot = SecurityService.minimizePIForLLM(workingSnapshot);

    const cachedAnalysis = async <T>(agentName: AgentStalenessCheck['agentName'], input: unknown, calculate: () => Promise<T>) => {
      const inputHash = SecurityService.computeCanonicalHash({ input, models: this.llmClient.getQuotaAndModelStatus?.().candidateModels ?? [] });
      const cached = this.store.getAgentResult<T>(authenticatedUserId, targetUserId, agentName);
      const freshness = ReviewOrchestrator.computeAgentStaleness({
        agentName, currentInputHash: inputHash, currentPolicyVersion: policyBundleVersion,
        cachedResult: cached, maxAgeHours: policy.horizonAndFreshness.staleBalanceThresholdDays * 24,
        referenceNowIso: evaluationNowIso,
      });
      if (!freshness.stale && !forceRefresh && cached) return { output: cached.output, freshness };
      const output = await calculate();
      this.store.saveAgentResult(authenticatedUserId, targetUserId, agentName, inputHash, policyBundleVersion, output);
      return { output, freshness };
    };

    const classificationInput = {
      prompt: prompts.classification.version, transactions: minimizedSnapshot.transactions,
      matches: workingSnapshot.transferMatches,
      confirmations: workingSnapshot.confirmations,
      confirmed: Object.fromEntries(Object.entries(workingSnapshot.classifications).filter(([, row]) => row.status === 'user_confirmed')),
    };
    const classification = await cachedAnalysis('TransactionClassifier', classificationInput, () =>
      TransactionClassifier.classify({ snapshot: minimizedSnapshot, llmClient }));
    const classified = classification.output;
    record('classification', { snapshot: minimizedSnapshot }, classified, {
      promptVersion: prompts.classification.version, models: classified.models,
      summaryText: classified.summaryText, evidenceIds: classified.processedIds, missingInputs: classified.unresolvedIds,
      status: classification.freshness.cachedReused ? 'CACHED' : classified.unresolvedIds.length ? 'PARTIAL' : 'COMPLETED',
    });
    for (const [txId, row] of Object.entries(classified.updatedClassifications)) {
      if (workingSnapshot.classifications[txId]?.status !== 'user_confirmed') workingSnapshot.classifications[txId] = row;
    }
    for (const confirmation of classified.proposedConfirmations) {
      if (!workingSnapshot.confirmations.some(row => row.id === confirmation.id)) workingSnapshot.confirmations.push(confirmation);
    }
    workingSnapshot.unresolvedConfirmations = workingSnapshot.confirmations.filter(row => row.userResponse === null);
    Object.assign(workingSnapshot, computeObservedAnalytics(workingSnapshot.transactions, workingSnapshot.classifications, workingSnapshot.baseCurrency));

    const classifiedSnapshot = SecurityService.minimizePIForLLM(workingSnapshot);
    const patternInput = {
      prompt: prompts.pattern.version, date: workingExtras.referenceDateIso, transactions: classifiedSnapshot.transactions,
      classifications: classifiedSnapshot.classifications, transferMatches: classifiedSnapshot.transferMatches,
      statements: classifiedSnapshot.statements, income: classifiedSnapshot.incomeSources, obligations: classifiedSnapshot.upcomingUnpaidObligations,
    };
    const pattern = await cachedAnalysis('PatternAgent', patternInput, () =>
      analyzePatterns(classifiedSnapshot, workingExtras.referenceDateIso!, llmClient));
    record('pattern-recognition', { snapshot: classifiedSnapshot, referenceDate: workingExtras.referenceDateIso }, pattern.output, {
      promptVersion: prompts.pattern.version, models: pattern.output.models, summaryText: pattern.output.summaryText,
      evidenceIds: pattern.output.evidence.map(row => row.id), status: pattern.freshness.cachedReused ? 'CACHED' : 'COMPLETED',
    });
    const behaviorInput = { prompt: prompts.behavior.version, pattern: pattern.output, goals: classifiedSnapshot.goals };
    const behavior = await cachedAnalysis('BehaviorAgent', behaviorInput, async () => ({
      ...await interpretBehavior(classifiedSnapshot, pattern.output, llmClient),
      categorizedCount: classified.categorizedCount, recurringDetected: classified.recurringDetected,
    }));
    const behaviorStaleness = behavior.freshness;
    record('behavior-agent', { snapshot: classifiedSnapshot, pattern: pattern.output, classification: { categorizedCount: classified.categorizedCount, recurringDetected: classified.recurringDetected } }, behavior.output, {
      promptVersion: prompts.behavior.version, models: behavior.output.models, summaryText: behavior.output.summaryText,
      status: behaviorStaleness.cachedReused ? 'CACHED' : 'COMPLETED',
    });

    const metrics = calculateFinancialMetrics(workingSnapshot, workingExtras);
    record('financial-calculator', { snapshot: workingSnapshot, extras: workingExtras }, metrics, { missingInputs: metrics.cashflow.missingInputs ?? [] });
    const debtCalculations = calculateDebtReport(classifiedSnapshot, workingExtras);
    record('debt-calculator', { snapshot: classifiedSnapshot, extras: workingExtras }, debtCalculations,
      { missingInputs: debtCalculations.flatMap(item => item.missingInputs) });
    const debtInput = { prompt: prompts.debt.version, calculations: debtCalculations };
    const debt = await cachedAnalysis('DebtAgent', debtInput, () => DebtAgent.analyzeDebts({
      snapshot: classifiedSnapshot, calculated: debtCalculations, llmClient,
    }));
    const debtStaleness = debt.freshness;
    record('debt-agent', { snapshot: classifiedSnapshot, calculated: debtCalculations }, debt.output, {
      promptVersion: prompts.debt.version, summaryText: debt.output.summaryText, models: debt.output.models,
      status: debtStaleness.cachedReused ? 'CACHED' : 'COMPLETED',
    });

    // ------------------------------------------------------------------------
    // STEP 3: AI Suggestion Generator (using minimized PI snapshot)
    // ------------------------------------------------------------------------
    const existingRecommendations = this.store.listRecommendationsForUser(
      authenticatedUserId,
      targetUserId
    );
    const minimizedForSuggestions = SecurityService.minimizePIForLLM(workingSnapshot);

    const catalogParams = {
      snapshot: minimizedForSuggestions,
      policy,
      calculatorExtras: workingExtras,
      existingRecommendations,
      llmClient,
    };

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

    const context = {
      memory,
      analysis: [
        { id: 'financial-metrics', value: {
          currency: metrics.currency, referenceDate: metrics.referenceDate,
          liquidExpenseCoverageMonths: metrics.liquidExpenseCoverageMonths,
          emergencyReserveAllocated: metrics.emergencyReserveAllocated,
          emergencyReserveCoverageMonths: metrics.emergencyReserveCoverageMonths,
          optionalActionCash: metrics.optionalActionCash,
          missingInputs: metrics.cashflow.missingInputs,
        } },
        { id: 'pattern-findings', value: { findings: pattern.output.findings, summary: pattern.output.summaryText, authority: 'INTERPRETATION_ONLY' } },
        { id: 'behavior-findings', value: { findings: behavior.output.findings, summary: behavior.output.summaryText, authority: 'INTERPRETATION_ONLY' } },
        { id: 'debt-analysis', value: { debts: debt.output.debtsAnalyzed, summary: debt.output.summaryText } },
      ],
    };
    let drafts: import('../suggestion/primarySuggestions').PrimaryDraftResult = null;
    const primaryParams = { snapshot: minimizedForSuggestions, history: existingRecommendations, context,
      checker: checkerCtx, llm: llmClient,
    };
    const primary = await evaluatePrimarySuggestions({
      ...primaryParams, onDraftsGenerated: result => { drafts = result; },
    });
    const { llm: _llm, ...primaryInput } = primaryParams;
    const { llmClient: _provider, ...catalogInput } = catalogParams;
    record('suggestion-generator', primaryInput, drafts, {
      promptVersion: prompts.primary.version, summaryText: primary.shortfallReason,
    });
    const fallback = primary.fallbackReason ? await SuggestionGenerator.generateCandidates(catalogParams) : [];
    record('catalog-selector', { trigger: primary.fallbackReason, catalogInput }, fallback, {
      status: primary.fallbackReason ? 'COMPLETED' : 'SKIPPED', promptVersion: prompts.catalog.version,
    });
    const checkerOutput = ActionChecker.runCheckerPipeline(
      [...primary.candidates, ...fallback],
      checkerCtx,
      primary.fallbackReason !== null,
    );

    // ------------------------------------------------------------------------
    // STEP 5: Single AI Evaluation Call (T, S, D, O) + Decision Engine (5A–5E)
    // ------------------------------------------------------------------------
    record('checker', { primaryInput, catalogInput, drafts, fallback }, { ...checkerOutput, primary: primary.proposals }, { promptVersion: prompts.checker.version });
    record('critical-coverage', checkerCtx, ActionChecker.discoverCriticalActions(checkerCtx));
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
      llmClient,
    });

    record('ai-evaluation', { snapshot: minimizedForSuggestions, validCandidates, policy }, aiComplexityMap, { promptVersion: prompts.complexity.version, status: validCandidates.length ? 'COMPLETED' : 'SKIPPED' });
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

    const catalogDecision = await this.executeDecisionEngine({
      evaluationId,
      userId: targetUserId,
      snapshot: workingSnapshot,
      policy,
      checkerOutput,
      aiComplexityMap,
      previousWeightProfileId,
      calculatorExtras: workingExtras,
      activeRecommendationActionId,
      onStage: record,
    });

    // ------------------------------------------------------------------------
    // STEP 6: Assistant Explanation Generator + Stale Snapshot Publication Guard
    // ------------------------------------------------------------------------
    const { decision: rawDecision, advice } = applySourceAdvice(catalogDecision, primary.advice, primary.clarification);
    record('decision-engine', { snapshot: workingSnapshot, checkerOutput, policy, knowledgeDb: checkerCtx.knowledgeDb, calculatorExtras: workingExtras, previousProfileId: previousWeightProfileId, aiComplexityByCandidateId: aiComplexityMap, evaluationId, sourceAdvice: primary.advice, primaryClarification: primary.clarification }, rawDecision);
    const explanation = AssistantAgent.generateExplanation(rawDecision, workingSnapshot);
    record('explanation', { decision: rawDecision, snapshot: workingSnapshot }, explanation, { summaryText: explanation.reasoning });
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
        ...(advice ? {
          sourceAdvice: advice,
          selectedCandidate: null,
          robustness: null,
          selectedActionType: null,
          priorityClass: rawDecision.priorityClass,
          decisionStatus: rawDecision.decisionStatus,
          decisionReason: rawDecision.reasoning,
          supportingSourceIds: rawDecision.sourceIds,
          supportingClaimIds: rawDecision.claimIds,
          supportingRuleIds: [],
          missingDataFields: [],
          clarificationQuestion: null,
        } : {}),
        stageArtifactIds: artifacts.map(artifact => artifact.id),
        primarySuggestions: {
          shortfallReason: primary.shortfallReason,
          proposals: primary.proposals,
          fallbackReason: primary.fallbackReason,
          criticalCoverageAddedIds: checkerOutput.criticalCoverageAddedIds,
        },
        snapshotId: workingSnapshot.id,
        snapshotVersion: startingSnapshotVersion,
      },
    });

    // Optional test hook to simulate concurrent PI snapshot mutation during evaluation
    if (onBeforePublish) {
      await onBeforePublish();
    }

    if (this.store.getConversationContextVersion?.(authenticatedUserId, targetUserId) !== chatVersion ||
        SecurityService.computeCanonicalHash(readMemory()) !== SecurityService.computeCanonicalHash(memory)) {
      this.store.updateEvaluationRunStatus(authenticatedUserId, targetUserId, evaluationId, 'SUPERSEDED_BY_NEWER_SNAPSHOT');
      throw new Error('Conversation context changed during evaluation.');
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
    this.store.runInTransaction(() => {
      this.store.saveStageArtifacts?.(authenticatedUserId, targetUserId, artifacts);
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
    });

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

  private async resolveReviewFx(snapshot: FinancialSnapshot, extras: CalculatorContextExtras, referenceNowIso: string) {
    const allCurrencies = new Set<string>([
      snapshot.baseCurrency || 'EUR',
      ...(snapshot.dataQuality?.currencies || []),
      ...snapshot.accountSummaries.map((a) => a.account.currency),
      ...snapshot.debts.map((d) => d.currency),
      ...snapshot.obligations.map((o) => o.currency),
      ...snapshot.goals.map((g) => g.currency),
    ]);
    const foreignSymbols = Array.from(allCurrencies).filter(
      (c) => c && c.toUpperCase() !== (snapshot.baseCurrency || 'EUR').toUpperCase()
    );

    const base = snapshot.baseCurrency || 'EUR';
    const historical = referenceNowIso.slice(0, 10) < new Date().toISOString().slice(0, 10);
    const rates = { ...extras.fxRates };
    const evaluate = (rate: NonNullable<CalculatorContextExtras['fxRates']>[string]) =>
      historical ? this.fxService.evaluateHistoricalQuote(rate, referenceNowIso)
        : this.fxService.evaluateFreshnessStatus(rate, referenceNowIso);
    const refresh = foreignSymbols.filter(symbol => {
      const rate = rates[symbol];
      if (rate?.base === base && rate.target === symbol && evaluate(rate) === 'OK') return false;
      delete rates[symbol];
      return true;
    });
    if (refresh.length) {
      const fetched = historical
        ? await this.fxService.getHistoricalRates(referenceNowIso, base, refresh, { referenceNowIso })
        : await this.fxService.getLatestRates(base, refresh, { referenceNowIso });
      Object.assign(rates, fetched);
    }
    return { foreignSymbols, rates };
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

    if (decision.sourceAdvice && (action === 'adjust' || adjustedAmount !== null)) {
      conflict('INVALID_FEEDBACK_TRANSITION', 'Source-backed advice has no financial amount to adjust.');
    }
    const calculatorExtras: CalculatorContextExtras = {
      ...piEnvelope.calculatorExtras,
      pendingFinancialCommitments: this.store.listPendingFinancialCommitments(authenticatedUserId, targetUserId, recommendation.id),
    };
    if (action !== 'decline' && decision.selectedActionType === 'FINANCIAL_ACTION' && decision.candidate?.amount !== null) {
      const valuation = calculatorExtras.referenceDateIso && calculatorExtras.referenceDateIso !== nowIso.slice(0, 10)
        ? calculatorExtras.referenceDateIso : nowIso;
      const fx = await this.resolveReviewFx(piEnvelope.snapshot, calculatorExtras, valuation);
      calculatorExtras.fxRates = fx.rates;
      const current = this.store.getRecommendationById(authenticatedUserId, targetUserId, recommendation.id);
      if (current?.recommendation.status !== recommendation.status ||
          current.recommendation.updatedAt !== recommendation.updatedAt ||
          this.store.getLatestSnapshotVersion(authenticatedUserId, targetUserId) !== piEnvelope.version ||
          this.store.getLatestRecommendationBundle(authenticatedUserId, targetUserId)?.recommendation.id !== recommendation.id) {
        conflict('STALE_RECOMMENDATION', 'Financial information has changed. Reload Today before responding.');
      }
      calculatorExtras.pendingFinancialCommitments = this.store.listPendingFinancialCommitments(authenticatedUserId, targetUserId, recommendation.id);
    }
    if (action === 'accept' && !decision.sourceAdvice) {
      if (decision.decisionStatus !== 'RECOMMENDATION_READY' || !decision.candidate) {
        conflict('ACCEPTANCE_REVALIDATION_FAILED', 'There is no publishable action to accept.');
      }
      const validation = ActionChecker.validateCandidate(
        { ...decision.candidate!, amount: recommendation.adjustedAmount ?? recommendation.suggestedAmount },
        { snapshot: piEnvelope.snapshot, policy,
          calculatorExtras,
          userConfirmedUnusedSubscriptionIds: piEnvelope.userConfirmedUnusedSubscriptionIds,
          verifiedCancellationTermsByTargetId: piEnvelope.verifiedCancellationTermsByTargetId,
          verifiedAccountFeeSchedules: piEnvelope.verifiedAccountFeeSchedules,
          verifiedUkDpcAgreement: piEnvelope.verifiedUkDpcAgreement });
      if (validation.status !== 'VALID') {
        const missing = validation.missingFields.join(', ');
        conflict('ACCEPTANCE_REVALIDATION_FAILED', missing ? 'Confirm these inputs before accepting: ' + missing : 'The action requires fresh validation before acceptance.');
      }
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
        calculatorExtras,
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

    if (decision.sourceAdvice) {
      const completed: RecommendationRecord = { ...recommendation, status: 'completed', updatedAt: nowIso };
      const feedbackRecord = this.store.runInTransaction(() => {
        this.store.saveRecommendation(authenticatedUserId, targetUserId, completed, decision);
        return this.store.recordActionFeedback(authenticatedUserId, targetUserId, {
          id: `fb_${Date.now()}_complete`,
          recommendationId: recommendation.id,
          actionId: null,
          snapshotId: recommendation.snapshotId,
          action: 'complete',
          amount: null,
          note: note || 'User confirmed completion of source-backed advice.',
          timestamp: nowIso,
        });
      });
      return { status: 'COMPLETED', accepted: true, recommendation: completed, decision, feedbackRecord };
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
        calculatorExtras,
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
    const actId = decision.selectedActionId || (decision.sourceAdvice ? 'advice' : 'NONE');
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
      actionType: decision.sourceAdvice ? 'source_backed_advice'
        : mapActionIdToLegacyActionType(decision.selectedActionId, decision.selectedActionType),
      ...(decision.sourceAdvice ? { sourceAdvice: decision.sourceAdvice } : {}),
      ...(decision.decisionStatus === 'NEEDS_DATA' && decision.clarificationQuestion ? {
        clarification: { question: decision.clarificationQuestion, route: decision.clarificationRoute },
      } : {}),
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
    onStage?: (stage: string, input: unknown, output: unknown) => void;
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
      onStage: params.onStage,
    });
  }
}
export function applySourceAdvice(
  catalogDecision: RecommendationDecision,
  sourceAdvice: NonNullable<RecommendationDecision['sourceAdvice']>[],
  clarification?: { question: string; missingInfo: string; route?: 'accounts' },
) {
  const advice = catalogDecision.priorityClass !== 'CRITICAL' &&
      !(catalogDecision.decisionStatus === 'RECOMMENDATION_READY' && catalogDecision.selectedActionType === 'FINANCIAL_ACTION')
      ? sourceAdvice[0] : undefined;
  const missingFx = catalogDecision.missingFields.filter(field => field.startsWith('verified_fx_rate_'));
  if (!advice && catalogDecision.decisionStatus !== 'RECOMMENDATION_READY' && missingFx.length) {
    const currencies = [...new Set(missingFx.map(field => field.slice('verified_fx_rate_'.length)))];
    clarification = {
      question: `Verified FX rates for ${currencies.join(', ')} are unavailable or stale. Refresh rates before calculating a monetary action.`,
      missingInfo: missingFx[0],
    };
  }
  const decision: RecommendationDecision = advice ? {
      ...catalogDecision,
      decisionStatus: 'RECOMMENDATION_READY',
      priorityClass: 'NORMAL',
      selectedActionId: null,
      selectedActionType: null,
      candidate: null,
      sourceAdvice: advice,
      title: advice.title,
      description: advice.description,
      reasoning: advice.rationale,
      expectedEffectSummary: advice.sources.length
        ? 'Review the cited guidance before deciding on your next step.'
        : 'Review the relevant information in your profile before deciding on your next step.',
      values: null,
      rawImpacts: null,
      complexity: null,
      score: null,
      stability: null,
      sourceIds: [...new Set(advice.sources.map(source => source.sourceId))],
      ruleIds: [],
      claimIds: advice.sources.map(source => source.claimId),
      dataQualityStatus: 'PROTOTYPE_POLICY',
      clarificationQuestion: null,
      missingFields: [],
  } : clarification && catalogDecision.decisionStatus !== 'RECOMMENDATION_READY' ? {
    ...catalogDecision,
    decisionStatus: 'NEEDS_DATA' as const,
    title: 'Confirm financial information',
    description: clarification.question,
    reasoning: 'This information is needed before choosing a useful next action.',
    expectedEffectSummary: '',
    dataQualityStatus: catalogDecision.dataQualityStatus === 'FX_WARNING' ? 'FX_WARNING' as const : 'NEEDS_DATA' as const,
    clarificationQuestion: clarification.question,
    clarificationRoute: clarification.route,
    missingFields: [...new Set([...catalogDecision.missingFields, clarification.missingInfo])],
    trace: {
      ...catalogDecision.trace,
      decisionStatus: 'NEEDS_DATA' as const,
      decisionReason: clarification.question,
      clarificationQuestion: clarification.question,
      missingDataFields: [...new Set([...catalogDecision.missingFields, clarification.missingInfo])],
    },
  } : catalogDecision;
  return { decision, advice };
}
