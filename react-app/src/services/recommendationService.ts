import {
  FinancialSnapshot,
  RecommendationRecord,
  ActionFeedback,
  GoalAllocation,
} from '../types/pi';

// ============================================================================
// Typed Interfaces for Production AI Pipeline Integration
// ============================================================================
export interface IFinancialAnalyzer {
  analyzeSnapshot(snapshot: FinancialSnapshot): {
    eligibleActions: string[];
    constraints: Record<string, number | boolean>;
  };
}

export interface IAISuggestionGenerator {
  generateCandidates(snapshot: FinancialSnapshot): Promise<Partial<RecommendationRecord>[]>;
}

export interface IActionChecker {
  verifySafetyAndFeasibility(
    candidate: Partial<RecommendationRecord>,
    snapshot: FinancialSnapshot
  ): { approved: boolean; rejectionReason?: string };
}

export interface IWeightedDecisionEngine {
  rankAndSelectOne(candidates: Partial<RecommendationRecord>[]): Partial<RecommendationRecord> | null;
}

export interface IExplanationGenerator {
  formatUserExplanation(
    selected: Partial<RecommendationRecord>,
    snapshot: FinancialSnapshot
  ): { title: string; description: string; reasoning: string };
}

// Browser-only suggestions are local planning hints, not server DecisionTrace results.
export class RecommendationService {
  static currentServerRecommendation(records: RecommendationRecord[], freshlyValidated: boolean): RecommendationRecord | null {
    if (!freshlyValidated) return null;
    return records[0] || null;
  }

  /** Controls describe the real action; amounts are editable only for supported allocations/extra debt. */
  static controls(recommendation: RecommendationRecord | null): {
    allocation: boolean; adjustable: boolean; completionLabel: string;
  } {
    const id = recommendation?.finAgentMeta?.catalogActionId;
    const allocation = id ? ['A007', 'A008', 'A012'].includes(id) : recommendation?.actionType === 'allocate_safety_cushion';
    return {
      allocation,
      adjustable: allocation || id === 'A002',
      completionLabel: allocation ? 'Complete earmark' : id === 'A001' || id === 'A002'
        ? 'Confirm payment made' : id === 'A011' ? 'Confirm transfer paused'
          : id === 'A015' ? 'Verify cancellation' : 'Verify completion',
    };
  }

  /** An adjusted amount has not had its original effects or ranking recalculated. */
  static presentation(recommendation: RecommendationRecord): {
    title: string; description: string; reasoning: string | null; showEvaluatedEffects: boolean;
  } {
    if (recommendation.status === 'adjusted') {
      const amount = recommendation.adjustedAmount;
      const amountLabel = amount === null ? 'Amount not confirmed' : `${recommendation.currency} ${amount.toFixed(2)}`;
      return {
        title: `Adjusted action · ${amountLabel}`,
        description: `The saved action amount is ${amountLabel}. Its original financial effects and ranking have not been recalculated; those claims are hidden until a new review.`,
        reasoning: null,
        showEvaluatedEffects: false,
      };
    }
    return {
      title: recommendation.title, description: recommendation.description,
      reasoning: recommendation.reasoning, showEvaluatedEffects: true,
    };
  }

  static validateAdjustedAmount(
    snapshot: FinancialSnapshot,
    adjustedAmount: number
  ): { valid: boolean; reason?: string } {
    if (!Number.isFinite(adjustedAmount) || !(adjustedAmount > 0)) {
      return { valid: false, reason: 'Adjusted amount must be greater than zero.' };
    }
    const maxSafe = snapshot.primaryCurrencySummary.uncommittedSafeToSpend;
    if (!Number.isFinite(maxSafe)) return { valid: false, reason: 'Recorded available funds are unknown.' };
    if (adjustedAmount > maxSafe) {
      return {
        valid: false,
        reason: `Local planning check rejected ${adjustedAmount.toFixed(2)}: exceeds recorded uncommitted cash (${maxSafe.toFixed(2)}). Backend safety checks are unavailable offline.`,
      };
    }
    return { valid: true };
  }

  static evaluateCurrentRecommendation(
    snapshot: FinancialSnapshot,
    existingRecommendations: RecommendationRecord[]
  ): RecommendationRecord | null {
    const result = this.evaluateLocalRecommendation(snapshot, existingRecommendations);
    if (!result) return null;
    const { finAgentMeta: _serverMetrics, ...local } = result;
    return local;
  }

  private static evaluateLocalRecommendation(
    snapshot: FinancialSnapshot,
    existingRecommendations: RecommendationRecord[]
  ): RecommendationRecord | null {
    const now = new Date().toISOString();
    const active = existingRecommendations.filter((r) => !r.finAgentMeta).find(
      (r) => r.status === 'proposed' || r.status === 'adjusted' || r.status === 'accepted'
    );

    const primaryCash = snapshot.primaryCurrencySummary;
    const uncommitted = primaryCash.uncommittedSafeToSpend;
    const cushionGoal = snapshot.safetyCushionGoal;
    const goalRemaining =
      cushionGoal && cushionGoal.targetAmount !== null
        ? Math.max(0, cushionGoal.targetAmount - snapshot.safetyCushionAllocated)
        : null;

    // Check if an existing active recommendation is still valid
    if (active) {
      if (active.actionType === 'allocate_safety_cushion') {
        const reqAmt = active.adjustedAmount ?? active.suggestedAmount ?? 0;
        if (uncommitted >= reqAmt && (goalRemaining === null || goalRemaining > 0)) {
          const remainingAfter = Math.max(0, uncommitted - reqAmt);

          return {
            ...active,
            title:
              active.status === 'adjusted'
                ? `Put ${active.currency === 'EUR' ? '€' : active.currency + ' '}${reqAmt.toFixed(0)} into safety cushion`
                : active.title,
            description: `Local planning earmark. Leaves ${active.currency} ${remainingAfter.toFixed(2)} uncommitted according to recorded balances and bills.`,
            updatedAt: now,
          };
        }
      } else if (active.snapshotId === snapshot.id) {
        return active;
      }
    }

    // If user already completed or declined the active one, check if we have a completed record to show or generate a next step
    const recentlyHandled = existingRecommendations.find((r) => !r.finAgentMeta);
    if (
      recentlyHandled &&
      (recentlyHandled.status === 'completed' || recentlyHandled.status === 'declined')
    ) {
      return recentlyHandled;
    }

    // A monetary amount is never invented in offline mode. The seeded demo can
    // retain its explicit suggestion, but fresh financial actions require the backend.
    // Rule 2: Unresolved High-Impact Confirmation (State B — Verification Action A014 / A016)
    if (snapshot.unresolvedConfirmations.length > 0) {
      const firstConf = snapshot.unresolvedConfirmations[0];
      const isSub = firstConf.subjectType === 'subscription';
      return {
        id: `rec_conf_${firstConf.id}`,
        userId: snapshot.userId,
        snapshotId: snapshot.id,
        actionType: isSub ? 'review_recurring_subscription' : 'clarify_internal_transfer',
        title: isSub
          ? `Review recurring payment (${firstConf.amountLabel})`
          : `Confirm transfer (${firstConf.amountLabel})`,
        description: firstConf.questionText,
        reasoning: firstConf.impactReason,
        suggestedAmount: null,
        adjustedAmount: null,
        currency: snapshot.baseCurrency,
        targetGoalId: null,
        sourceAccountId: null,
        priority: 'clarification',
        status: 'proposed',
        readinessState: 'state_b_clarification_needed',
        createdAt: now,
        updatedAt: now,
      };
    }

    // Rule 3: Stale Balance Warning (State B — Verification Action A006)
    if (snapshot.dataQuality.staleBalanceAccountIds.length > 0) {
      const staleId = snapshot.dataQuality.staleBalanceAccountIds[0];
      const staleAcct = snapshot.accountSummaries.find((a) => a.account.id === staleId);
      return {
        id: `rec_stale_${staleId}`,
        userId: snapshot.userId,
        snapshotId: snapshot.id,
        actionType: 'update_stale_balance',
        title: `Update ${staleAcct?.account.name || 'account'} balance`,
        description:
          'One small detail before your next monetary step: your reported balance is older than 14 days.',
        reasoning:
          'Vela never recommends earmarking cash based on outdated balance observations.',
        suggestedAmount: null,
        adjustedAmount: null,
        currency: staleAcct?.account.currency || snapshot.baseCurrency,
        targetGoalId: null,
        sourceAccountId: staleId,
        priority: 'clarification',
        status: 'proposed',
        readinessState: 'state_b_clarification_needed',
        createdAt: now,
        updatedAt: now,
      };
    }

    // Rule 4: Limited Data (State C — Verification Action A009)
    return {
      id: `rec_limited_${Date.now()}`,
      userId: snapshot.userId,
      snapshotId: snapshot.id,
      actionType: 'set_essential_expenses',
      title: 'Complete your financial picture',
      description: snapshot.readinessReason,
      reasoning:
        'Vela only proposes specific money allocations when your accessible balances and upcoming commitments are verified.',
      suggestedAmount: null,
      adjustedAmount: null,
      currency: snapshot.baseCurrency,
      targetGoalId: null,
      sourceAccountId: null,
      priority: 'suggested',
      status: 'proposed',
      readinessState: 'state_c_limited_data',
      createdAt: now,
      updatedAt: now,
    };
  }

  static executeReserveAllocation(params: {
    recommendation: RecommendationRecord;
    snapshot: FinancialSnapshot;
    amount: number;
    accountId: string;
  }): {
    updatedRecommendation: RecommendationRecord;
    newAllocation: GoalAllocation;
    feedback: ActionFeedback;
  } {
    const { recommendation, snapshot, amount, accountId } = params;
    if (!['accepted', 'adjusted'].includes(recommendation.status)) throw new Error('Accept or adjust before completion.');
    const now = new Date().toISOString();
    const goalId =
      recommendation.targetGoalId ||
      snapshot.safetyCushionGoal?.id ||
      null;
    if (!goalId || !snapshot.goals.some((goal) => goal.id === goalId)) throw new Error('An existing goal is required.');
    const account = snapshot.accountSummaries.find((entry) => entry.account.id === accountId);
    if (!account || account.account.currency !== recommendation.currency || account.account.fundsOwnership !== 'personal') throw new Error('Select a personal account in the recommendation currency.');
    if (!Number.isFinite(amount) || amount <= 0 || amount > (account.personalAccessibleBalance ?? 0) - account.allocatedToGoals || amount > snapshot.primaryCurrencySummary.uncommittedSafeToSpend) throw new Error('The earmark exceeds recorded available funds.');

    const newAllocation: GoalAllocation = {
      id: `alloc_${Date.now()}`,
      userId: snapshot.userId,
      goalId,
      accountId,
      amount,
      currency: recommendation.currency,
      allocatedAt: now,
      note: `Earmarked inside Vela via Today recommendation (${recommendation.title}). Not moved at bank.`,
      recommendationId: recommendation.id,
    };

    const updatedRecommendation: RecommendationRecord = {
      ...recommendation,
      adjustedAmount: amount !== recommendation.suggestedAmount ? amount : recommendation.adjustedAmount,
      status: 'completed',
      updatedAt: now,
    };

    const feedback: ActionFeedback = {
      id: `fb_${Date.now()}`,
      recommendationId: recommendation.id,
      action: 'complete',
      amount,
      note: 'User confirmed internal planning allocation.',
      timestamp: now,
    };

    return { updatedRecommendation, newAllocation, feedback };
  }
}
