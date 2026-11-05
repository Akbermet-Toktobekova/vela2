import { FinancialSnapshot, FinAgentDecisionMeta, RecommendationRecord } from '../types/pi';
import type { PIDatabaseSeed } from '../database/seed';

const DEFAULT_API_BASE = 'http://localhost:3001/api';

export interface BackendDecisionShape {
  selectedActionId: string | null;
  selectedActionType: 'FINANCIAL_ACTION' | 'VERIFICATION_ACTION' | 'EDUCATIONAL_ACTION' | null;
  priorityClass: 'CRITICAL' | 'NORMAL' | 'VERIFICATION_UNLOCK' | 'NONE';
  weightProfileId: 'liquidity_protection' | 'expensive_debt' | 'goal_advancement' | 'balanced' | null;
  weights: { resilience: number; financial_benefit: number; goal_progress: number } | null;
  values: { resilience: number; financial_benefit: number; goal_progress: number } | null;
  complexity: number | null;
  score: number | null;
  stability: number | null;
  policyVersion: string;
  dataQualityStatus: 'PROTOTYPE_POLICY' | 'NEEDS_DATA' | 'FX_WARNING';
  sourceIds: string[];
  ruleIds: string[];
  claimIds: string[];
}

export interface BackendReviewResponse {
  evaluationId: string;
  status: 'COMPLETED' | 'DUPLICATE_SUPPRESSED' | 'SUPERSEDED_BY_NEWER_SNAPSHOT';
  recommendation: RecommendationRecord;
  decision: BackendDecisionShape;
}

export function attachDecisionMeta(
  recommendation: RecommendationRecord,
  decision?: BackendDecisionShape | null
): RecommendationRecord {
  const meta: FinAgentDecisionMeta | undefined = decision?.selectedActionId && decision.selectedActionType
    ? {
        catalogActionId: decision.selectedActionId,
        catalogActionType: decision.selectedActionType,
        priorityClass: decision.priorityClass,
        weightProfileId: decision.weightProfileId,
        weights: decision.weights
          ? {
              R: decision.weights.resilience,
              F: decision.weights.financial_benefit,
              G: decision.weights.goal_progress,
            }
          : null,
        normalizedValues: decision.values
          ? {
              v_R: decision.values.resilience,
              v_F: decision.values.financial_benefit,
              v_G: decision.values.goal_progress,
            }
          : null,
        complexity: decision.complexity,
        score: decision.score,
        stability: decision.stability,
        policyVersion: decision.policyVersion,
        dataQualityStatus: decision.dataQualityStatus,
        sourceIds: decision.sourceIds || [],
        ruleIds: decision.ruleIds || [],
        claimIds: decision.claimIds || [],
      }
    : decision ? undefined : recommendation.finAgentMeta;

  return {
    ...recommendation,
    finAgentMeta: meta,
  };
}

export type FeedbackAction = 'accept' | 'adjust' | 'decline' | 'complete';
export interface FeedbackResult {
  status: string;
  accepted?: boolean;
  recommendation?: RecommendationRecord;
  decision?: BackendDecisionShape;
  snapshot?: FinancialSnapshot | null;
  snapshotVersion?: string | null;
  message?: string;
  rejectionReason?: string;
  nextCycleResult?: { recommendation: RecommendationRecord; decision?: BackendDecisionShape };
  reviewPending?: boolean;
  reviewMessage?: string;
}

export class FeedbackRequestError extends Error {
  constructor(message: string, public readonly httpStatus: number) { super(message); }
}

/** Only actual PI changes trigger a new review; chat and recommendation updates do not. */
export function financialStateKey(state: PIDatabaseSeed): string {
  const { recommendations: _r, actionFeedback: _f, assistantMessages: _m, ...financial } = state;
  return JSON.stringify(financial);
}

/** Merge authoritative server balances/debts/allocations instead of replaying money effects locally. */
export function mergeFeedbackResult(state: PIDatabaseSeed, result: FeedbackResult): PIDatabaseSeed {
  const snapshot = result.snapshot;
  let next = state;
  if (snapshot) {
    if (snapshot.userId !== state.user.id) throw new Error('Feedback snapshot belongs to another user.');
    const balanceMap = new Map(state.balances.map((balance) => [balance.id, balance]));
    for (const account of snapshot.accountSummaries) {
      for (const balance of account.balanceHistory) balanceMap.set(balance.id, balance);
      if (account.latestBalance) balanceMap.set(account.latestBalance.id, account.latestBalance);
    }
    next = {
      ...state,
      profile: snapshot.profile,
      preferences: snapshot.preferences,
      onboarding: snapshot.onboarding,
      accounts: snapshot.accountSummaries.map((account) => account.account),
      balances: Array.from(balanceMap.values()),
      incomes: snapshot.incomeSources,
      expenseCommitment: snapshot.essentialCommitment,
      obligations: snapshot.obligations,
      debts: snapshot.debts,
      goals: snapshot.goals,
      goalAllocations: snapshot.goalAllocations,
      statements: snapshot.statements,
      transactions: snapshot.transactions,
      classifications: Object.values(snapshot.classifications),
      transferMatches: snapshot.transferMatches,
      confirmations: snapshot.confirmations,
    };
  }
  const updates: RecommendationRecord[] = [];
  if (result.nextCycleResult?.recommendation) {
    updates.push(attachDecisionMeta(result.nextCycleResult.recommendation, result.nextCycleResult.decision));
  }
  if (result.recommendation && !updates.some((r) => r.id === result.recommendation!.id)) {
    updates.push(attachDecisionMeta(result.recommendation, result.decision));
  }
  return {
    ...next,
    recommendations: [...updates, ...next.recommendations.filter((r) => !updates.some((u) => u.id === r.id))],
  };
}

export class FinAgentApiClient {
  static getBaseUrl(): string {
    const environment = (import.meta as ImportMeta & { env?: { VITE_FINAGENT_API_URL?: string } }).env;
    return environment?.VITE_FINAGENT_API_URL || DEFAULT_API_BASE;
  }

  static async syncPIAndReview(
    userId: string,
    snapshot: FinancialSnapshot,
    eventType = 'pi_updated'
  ): Promise<RecommendationRecord | null> {
    const result = await this.syncPIAndReviewState(userId, snapshot, eventType);
    return result?.recommendation ? attachDecisionMeta(result.recommendation, result.decision) : null;
  }

  static async syncPIAndReviewState(
    userId: string, snapshot: FinancialSnapshot, eventType = 'pi_updated'
  ): Promise<FeedbackResult | null> {
    try {
      const res = await fetch(`${this.getBaseUrl()}/pi/${encodeURIComponent(userId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          userId,
          snapshot,
          eventType,
        }),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as FeedbackResult;
      if (!data.recommendation || !data.snapshot || data.snapshot.userId !== userId) return null;
      return { ...data, recommendation: attachDecisionMeta(data.recommendation, data.decision) };
    } catch {
      return null;
    }
  }

  static async triggerReviewCycle(
    userId: string,
    snapshot: FinancialSnapshot
  ): Promise<RecommendationRecord | null> {
    try {
      const res = await fetch(`${this.getBaseUrl()}/review/${encodeURIComponent(userId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          userId,
          snapshot,
          eventType: 'ui_pi_sync',
        }),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as BackendReviewResponse;
      if (!data.recommendation) return null;
      return attachDecisionMeta(data.recommendation, data.decision);
    } catch {
      return null;
    }
  }

  static async getToday(userId: string): Promise<{
    recommendation: RecommendationRecord;
    snapshotVersion: string;
    snapshot?: FinancialSnapshot;
  } | null> {
    try {
      const res = await fetch(`${this.getBaseUrl()}/today/${encodeURIComponent(userId)}`, {
        method: 'GET',
        headers: {
          'x-user-id': userId,
        },
      });
      if (!res.ok) return null;
      const data = (await res.json()) as {
        recommendation?: RecommendationRecord;
        decision?: BackendDecisionShape;
        snapshotVersion?: string;
        snapshot?: FinancialSnapshot;
      };
      if (!data.recommendation) return null;
      return {
        recommendation: attachDecisionMeta(data.recommendation, data.decision),
        snapshotVersion: data.snapshotVersion || 'v1',
        snapshot: data.snapshot,
      };
    } catch {
      return null;
    }
  }

  static async submitFeedback(params: {
    userId: string;
    recommendationId: string;
    action: 'accept' | 'adjust' | 'decline' | 'complete';
    adjustedAmount?: number;
    note?: string;
  }): Promise<FeedbackResult> {
      const res = await fetch(
        `${this.getBaseUrl()}/feedback/${encodeURIComponent(params.userId)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': params.userId,
          },
          body: JSON.stringify({
            recommendationId: params.recommendationId,
            action: params.action,
            adjustedAmount: params.adjustedAmount,
            note: params.note,
          }),
        }
      );
      const data = (await res.json().catch(() => null)) as FeedbackResult | null;
      if (!res.ok || !data || data.accepted === false || ['ADJUSTMENT_REJECTED', 'VERIFICATION_REQUIRED'].includes(data.status)) {
        throw new FeedbackRequestError(data?.rejectionReason || data?.message || `Feedback was not saved (HTTP ${res.status}).`, res.status);
      }
      if (!data.recommendation) throw new Error('Backend did not confirm the recommendation update.');
      if (params.action === 'complete' && !data.snapshot) throw new Error('Completion response is missing the updated financial snapshot. Reload Today to confirm the result.');
      return data;
  }

  static async sendAssistantChat(params: {
    userId: string;
    question: string;
    snapshot: FinancialSnapshot;
  }): Promise<{ reply: string; toolUsed: string } | null> {
    try {
      const res = await fetch(
        `${this.getBaseUrl()}/assistant/${encodeURIComponent(params.userId)}/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': params.userId,
          },
          body: JSON.stringify({
            userId: params.userId,
            question: params.question,
            snapshot: params.snapshot,
          }),
        }
      );
      if (!res.ok) return null;
      const data = (await res.json()) as {
        reply?: string;
        referencedActionIds?: string[];
        referencedSourceIds?: string[];
      };
      if (!data.reply) return null;
      const refs = [
        ...(data.referencedActionIds || []),
        ...(data.referencedSourceIds || []),
      ].join(', ');
      return {
        reply: data.reply,
        toolUsed: refs ? `FinAgent AS + Trace (${refs})` : 'FinAgent AI Assistant',
      };
    } catch {
      return null;
    }
  }
}
