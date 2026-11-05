import { FinancialSnapshot, RecommendationRecord } from '../types/pi';

export interface AssistantResponse {
  reply: string;
  toolUsed: string;
}

export class LocalAssistantService {
  static generateReply(
    userMessage: string,
    snapshot: FinancialSnapshot,
    currentRecommendation: RecommendationRecord | null
  ): AssistantResponse {
    const q = userMessage.toLowerCase().trim();
    const sym = snapshot.baseCurrency === 'EUR' ? '€' : snapshot.baseCurrency + ' ';

    // Resolve the intent before broad 'spend'/'save' keyword branches.
    if (/safe.?to.?spend|how much can i spend|available to spend|сколько (?:я )?могу потратить/.test(q)) {
      const cash = snapshot.primaryCurrencySummary;
      return {
        toolUsed: 'query_safe_to_spend',
        reply: `Your local planning snapshot shows ${cash.currency} ${cash.uncommittedSafeToSpend.toFixed(2)} uncommitted after recorded bills and goal allocations. This is a snapshot estimate, not a bank balance guarantee.`,
      };
    }

    // Tool 1: Accounts & Balances
    if (
      q.includes('account') ||
      q.includes('balance') ||
      q.includes('how much do i have') ||
      q.includes('revolut') ||
      q.includes('wise') ||
      q.includes('otp') ||
      q.includes('mbank') ||
      q.includes('счет') ||
      q.includes('баланс') ||
      q.includes('сколько у меня')
    ) {
      if (snapshot.accountSummaries.length === 0) {
        return {
          toolUsed: 'query_accounts_and_balances',
          reply:
            'You do not have any bank accounts saved in your PI profile yet. You can add your accounts in Settings → Accounts or via Quick Actions.',
        };
      }

      const lines = snapshot.accountSummaries.map((as) => {
        const balStr =
          as.latestBalance !== null
            ? `${as.account.currency} ${as.latestBalance.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} (as of ${as.latestBalance.asOf.slice(0, 10)})`
            : 'No balance reported';
        const ownStr =
          as.account.fundsOwnership !== 'personal'
            ? ` [${as.account.fundsOwnership} funds — personal share: ${
                as.personalAccessibleBalance !== null
                  ? `${as.account.currency} ${as.personalAccessibleBalance}`
                  : 'unconfirmed'
              }]`
            : '';
        return `• ${as.account.name} (${as.account.institution}): ${balStr}${ownStr}`;
      });

      const p = snapshot.primaryCurrencySummary;
      return {
        toolUsed: 'query_accounts_and_balances',
        reply:
          `Here are your recorded accounts in the local PI Database:\n` +
          lines.join('\n') +
          `\n\nIn ${p.currency}, your accessible personal cash is ${sym}${p.personalAccessibleCash.toFixed(
            2
          )}, with ${sym}${p.allocatedToGoals.toFixed(
            2
          )} earmarked for goals and ${sym}${p.upcomingUnpaidObligations.toFixed(
            2
          )} reserved for upcoming bills — leaving ${sym}${p.uncommittedSafeToSpend.toFixed(
            2
          )} uncommitted.\n(Note: Multi-currency balances like HUF or KGS are kept separate to avoid unverified exchange conversions.)`,
      };
    }

    // Tool 2: Savings Goal & Safety Cushion
    if (
      q.includes('goal') ||
      q.includes('cushion') ||
      q.includes('save') ||
      q.includes('saving') ||
      q.includes('runway') ||
      q.includes('цель') ||
      q.includes('подушк') ||
      q.includes('резерв')
    ) {
      const goal = snapshot.safetyCushionGoal;
      if (!goal) {
        return {
          toolUsed: 'query_savings_goals',
          reply:
            'You have not set a specific savings goal yet. Open the "My Plan" tab to add a Safety Cushion or custom savings target.',
        };
      }
      const targetStr =
        goal.targetAmount !== null ? `${sym}${goal.targetAmount.toFixed(2)}` : 'No target amount set';
      const pct =
        goal.targetAmount && goal.targetAmount > 0
          ? `${Math.round((snapshot.safetyCushionAllocated / goal.targetAmount) * 100)}%`
          : 'N/A';
      const covStr =
        snapshot.emergencyCoverageDays !== null
          ? `${snapshot.emergencyCoverageDays} days (${snapshot.emergencyCoverageMonths} months) of essential expenses`
          : 'Coverage unavailable until monthly essential expenses are set';

      return {
        toolUsed: 'query_savings_goals',
        reply: `Your main goal is "${goal.name}" (${goal.priority} priority).\n• Currently earmarked inside Vela: ${sym}${snapshot.safetyCushionAllocated.toFixed(
          2
        )} of ${targetStr} (${pct}).\n• Emergency coverage: ${covStr}.`,
      };
    }

    // Tool 3: Upcoming Payments / Bills / Obligations
    if (
      q.includes('payment') ||
      q.includes('bill') ||
      q.includes('obligation') ||
      q.includes('coming up') ||
      q.includes('due') ||
      q.includes('rent') ||
      q.includes('энерг') ||
      q.includes('счета') ||
      q.includes('платеж') ||
      q.includes('выходных')
    ) {
      if (snapshot.upcomingUnpaidObligations.length === 0) {
        return {
          toolUsed: 'query_upcoming_obligations',
          reply:
            'You have no unpaid upcoming bills recorded right now. Your uncommitted cash in ' +
            `${snapshot.primaryCurrencySummary.currency} is ${sym}${snapshot.primaryCurrencySummary.uncommittedSafeToSpend.toFixed(2)}.`,
        };
      }
      const total = snapshot.upcomingUnpaidObligations.reduce((s, o) => s + o.amount, 0);
      const list = snapshot.upcomingUnpaidObligations
        .map((o) => `• ${o.name}: ${o.currency} ${o.amount.toFixed(2)} (Due ${o.dueDate})`)
        .join('\n');

      return {
        toolUsed: 'query_upcoming_obligations',
        reply: `You have ${snapshot.upcomingUnpaidObligations.length} unpaid upcoming obligation(s) totaling ${sym}${total.toFixed(
          2
        )}:\n${list}\n\nAfter setting aside ${sym}${total.toFixed(
          2
        )} for these bills and ${sym}${snapshot.primaryCurrencySummary.allocatedToGoals.toFixed(
          2
        )} for protected goals, you have ${sym}${snapshot.primaryCurrencySummary.uncommittedSafeToSpend.toFixed(
          2
        )} uncommitted.`,
      };
    }

    // Tool 4: Observed Spending & Statement Insights
    if (
      q.includes('spend') ||
      q.includes('spent') ||
      q.includes('statement') ||
      q.includes('import') ||
      q.includes('october') ||
      q.includes('transaction') ||
      q.includes('sub') ||
      q.includes('трат') ||
      q.includes('выписк')
    ) {
      if (snapshot.transactions.length === 0) {
        return {
          toolUsed: 'query_observed_spending',
          reply:
            'No bank statement transactions have been imported yet. Upload a CSV statement in Statements or Quick Actions to see observed spending.',
        };
      }
      return {
        toolUsed: 'query_observed_spending',
        reply:
          `Across your imported statement history (${snapshot.transactions.length} transactions):\n` +
          `• Observed personal spending: ${sym}${snapshot.observedSpendingTotal.toFixed(2)}\n` +
          `• Observed income inflows: ${sym}${snapshot.observedIncomeTotal.toFixed(2)}\n` +
          `• Detected recurring subscriptions: ${sym}${snapshot.observedSubscriptionsTotal.toFixed(2)}\n` +
          `• Internal transfers excluded from spending/income: ${sym}${snapshot.observedInternalTransfersTotal.toFixed(2)}\n` +
          `• Work/business movements excluded: ${sym}${snapshot.observedWorkMovementsTotal.toFixed(2)}\n` +
          (snapshot.dataQuality.singleMonthWarning
            ? `Note: Only 1 month of statement history is covered, so Vela treats this as observed period data rather than a confirmed multi-month average.`
            : ''),
      };
    }

    // Tool 5: Missing Data / Profile Completeness
    if (
      q.includes('missing') ||
      q.includes('incomplete') ||
      q.includes('gap') ||
      q.includes('quality') ||
      q.includes('не хватает')
    ) {
      const gaps = snapshot.dataQuality.missingFields;
      const uninportedCount =
        snapshot.dataQuality.totalAccounts - snapshot.dataQuality.accountsWithStatements;

      return {
        toolUsed: 'query_missing_data_gaps',
        reply:
          `Profile Data Quality Check:\n` +
          `• Accounts with reported balances: ${snapshot.dataQuality.accountsWithBalance}/${snapshot.dataQuality.totalAccounts}\n` +
          `• Accounts with imported statements: ${snapshot.dataQuality.accountsWithStatements}/${snapshot.dataQuality.totalAccounts}` +
          (uninportedCount > 0 ? ` (${uninportedCount} account(s) have no statement history)` : '') +
          `\n• Unresolved transaction confirmations: ${snapshot.unresolvedConfirmations.length}\n` +
          (gaps.length > 0
            ? `• Missing items: ${gaps.join(', ')}`
            : '• Core onboarding fields are present!'),
      };
    }

    // Tool 6: Why was this recommendation shown?
    if (
      q.includes('why') ||
      q.includes('recommend') ||
      q.includes('next step') ||
      q.includes('reason') ||
      q.includes('почему') ||
      q.includes('рекоменд')
    ) {
      if (!currentRecommendation) {
        return {
          toolUsed: 'explain_recommendation',
          reply: `Readiness state: ${snapshot.readinessState}. ${snapshot.readinessReason}`,
        };
      }
      return {
        toolUsed: 'explain_recommendation',
        reply:
          `Current Next Step: "${currentRecommendation.title}" (Status: ${currentRecommendation.status}, State: ${currentRecommendation.readinessState}).\n\n` +
          `Why it was shown:\n${currentRecommendation.reasoning}\n\n` +
          `Important: Accepting a reserve action in Vela earmarks funds in your planning snapshot — it never initiates a real bank wire.`,
      };
    }

    // Default overview response
    const p = snapshot.primaryCurrencySummary;
    return {
      toolUsed: 'general_pi_summary',
      reply:
        `[Demo Local PI Assistant — Deterministic Mode]\n` +
        `I can answer questions directly from your saved PI Database:\n` +
        `• Accessible Cash (${p.currency}): ${sym}${p.personalAccessibleCash.toFixed(2)} (${sym}${p.uncommittedSafeToSpend.toFixed(2)} uncommitted)\n` +
        `• Upcoming Unpaid Bills: ${sym}${p.upcomingUnpaidObligations.toFixed(2)}\n` +
        `• Safety Cushion Earmarked: ${sym}${snapshot.safetyCushionAllocated.toFixed(2)}\n` +
        `• Observed Statement Spending: ${sym}${snapshot.observedSpendingTotal.toFixed(2)}\n\n` +
        `Try asking: "How much do I have in my accounts?", "What payments are coming up?", "Why was this recommendation shown?", or "What information is missing from my profile?"`,
    };
  }
}
