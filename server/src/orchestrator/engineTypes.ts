import { CalculatorContextExtras } from '@shared/calculator';
import {
DecisionTrace,
RecommendationDecision,
WeightProfileId,
} from '@shared/contracts';
import {
ActionFeedback,
AssistantMessage,
ExtendedDebtTerms,
FinancialSnapshot,
FXRateEntry,
RecommendationRecord,
ScheduledAutomaticTransfer,
} from '@shared/pi/types';
import type { PIDatabaseSeed } from '../../../shared/profile/seed';

export interface StoredPIStateEnvelope {
  userId: string;
  version: string;
  versionNumber: number;
  inputHash: string;
  snapshot: FinancialSnapshot;
  seed?: PIDatabaseSeed;
  calculatorExtras?: CalculatorContextExtras;
  userConfirmedUnusedSubscriptionIds?: string[];
  verifiedCancellationTermsByTargetId?: Record<string, { exitFee: number; canCancel: boolean }>;
  verifiedAccountFeeSchedules?: Record<string, boolean>;
  verifiedUkDpcAgreement?: boolean;
  updatedAt: string;
}

export interface SavePIStateInput {
  snapshot?: FinancialSnapshot;
  seed?: PIDatabaseSeed;
  calculatorExtras?: CalculatorContextExtras;
  scheduledTransfers?: ScheduledAutomaticTransfer[];
  debtTerms?: Record<string, ExtendedDebtTerms>;
  userConfirmedUnusedSubscriptionIds?: string[];
  verifiedCancellationTermsByTargetId?: Record<string, { exitFee: number; canCancel: boolean }>;
  verifiedAccountFeeSchedules?: Record<string, boolean>;
  verifiedUkDpcAgreement?: boolean;
}

export interface AgentResultRow<T = unknown> {
  userId: string;
  agentName: string;
  inputHash: string;
  policyVersion: string;
  output: T;
  createdAt: string;
}

export interface EvaluationRunRow {
  evaluationId: string;
  userId: string;
  snapshotId: string;
  snapshotVersion: string;
  eventType: string;
  inputHash: string;
  policyVersion: string;
  status:
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SUPERSEDED_BY_NEWER_SNAPSHOT'
    | 'DUPLICATE_SUPPRESSED'
    | 'FAILED';
  createdAt: string;
  completedAt: string | null;
}

export interface PublishedRecommendationBundle {
  recommendation: RecommendationRecord;
  decision: RecommendationDecision;
  trace: DecisionTrace;
  snapshotVersion: string;
  updatedAt: string;
}


export interface EngineRepository {
runInTransaction<T>(operation: () => T): T;
getCachedFXRate(base: string, target: string, rateDate?: string): FXRateEntry | null;
upsertFXRate(entry: FXRateEntry): void;
savePIState(authenticatedUserId: string, targetUserId: string, input: SavePIStateInput | FinancialSnapshot | PIDatabaseSeed): StoredPIStateEnvelope;
getPIState(authenticatedUserId: string, targetUserId: string, autoSeedDemo?: boolean): StoredPIStateEnvelope | null;
getLatestSnapshotVersion(authenticatedUserId: string, targetUserId: string): string | null;
getAgentResult<T = unknown>(authenticatedUserId: string, targetUserId: string, agentName: string): AgentResultRow<T> | null;
saveAgentResult<T = unknown>(authenticatedUserId: string, targetUserId: string, agentName: string, inputHash: string, policyVersion: string, output: T): AgentResultRow<T>;
createEvaluationRun(authenticatedUserId: string, targetUserId: string, params: {
    evaluationId: string;
    snapshotId: string;
    snapshotVersion: string;
    eventType: string;
    inputHash: string;
    policyVersion: string;
    status?: EvaluationRunRow['status'];
}): EvaluationRunRow;
updateEvaluationRunStatus(authenticatedUserId: string, targetUserId: string, evaluationId: string, status: EvaluationRunRow['status']): void;
getLatestEvaluationRun(authenticatedUserId: string, targetUserId: string): EvaluationRunRow | null;
saveDecisionTrace(authenticatedUserId: string, targetUserId: string, trace: DecisionTrace, decision: RecommendationDecision): void;
getDecisionTrace(authenticatedUserId: string, targetUserId: string, evaluationId: string): {
    trace: DecisionTrace;
    decision: RecommendationDecision;
} | null;
getLatestWeightProfileId(authenticatedUserId: string, targetUserId: string): WeightProfileId | null;
saveRecommendation(authenticatedUserId: string, targetUserId: string, record: RecommendationRecord, decision: RecommendationDecision): void;
getRecommendationById(authenticatedUserId: string, targetUserId: string, recommendationId: string): PublishedRecommendationBundle | null;
getLatestRecommendationBundle(authenticatedUserId: string, targetUserId: string): PublishedRecommendationBundle | null;
listRecommendationsForUser(authenticatedUserId: string, targetUserId: string): RecommendationRecord[];
listPendingFinancialCommitments(authenticatedUserId: string, targetUserId: string, excludeRecommendationId?: string): NonNullable<CalculatorContextExtras['pendingFinancialCommitments']>;
recordActionFeedback(authenticatedUserId: string, targetUserId: string, feedback: ActionFeedback & {
    actionId?: string | null;
    snapshotId: string;
}): ActionFeedback;
listActionFeedbackForUser(authenticatedUserId: string, targetUserId: string): Array<ActionFeedback & {
    actionId: string | null;
    snapshotId: string;
}>;
saveAssistantMessage(authenticatedUserId: string, targetUserId: string, message: AssistantMessage): void;
listAssistantMessages(authenticatedUserId: string, targetUserId: string): AssistantMessage[];
}
