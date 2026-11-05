import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import {
  PIDatabaseSeed,
  createDemoSeedData,
} from '../database/seed';
import {
  loadPIState,
  savePIState,
  resetToDemoState,
  resetToBlankNewUserState,
  exportPIStateJson,
} from '../database/db';
import {
  FinancialAccount,
  IncomeSource,
  FinancialObligation,
  DebtRecord,
  FinancialGoal,
  FinancialSnapshot,
  RecommendationRecord,
  TransactionEconomicType,
  SpendingCategory,
  PrimaryConcern,
  StatementImport,
} from '../types/pi';
import { buildFinancialSnapshot } from '../services/snapshotBuilder';
import { RecommendationService } from '../services/recommendationService';
import { parseStatementCSVContent } from '../services/statementParser';
import { reconcileTransfersAndConfirmations } from '../services/reconciliationService';
import { LocalAssistantService } from '../services/assistantService';
import { FinAgentApiClient, financialStateKey, mergeFeedbackResult, FeedbackAction, FeedbackRequestError } from '../api/client';

interface PIContextValue {
  piState: PIDatabaseSeed;
  snapshot: FinancialSnapshot;
  currentRecommendation: RecommendationRecord | null;
  isLoading: boolean;
  feedbackPending: FeedbackAction | null;
  recommendationSource: 'backend' | 'local';
  backendStatus: 'checking' | 'online' | 'offline';
  toastMessage: string | null;
  islandAlert: string | null;
  showToast: (msg: string, islandText?: string) => void;

  // Onboarding & Identity
  registerDemoAccount: (nickname: string, email: string, baseCurrency?: string) => void;
  setOnboardingStep: (step: number) => void;
  setPrimaryConcern: (
    concern: PrimaryConcern,
    notes: string,
    specificGoal?: { name: string; targetAmount: number | null; currency: string; targetDate: string | null }
  ) => void;
  setDebtQuestionAnswer: (ans: 'no' | 'yes' | 'not_sure') => void;
  completeOnboarding: () => void;

  // Accounts & Balances
  saveAccount: (
    accountData: Omit<FinancialAccount, 'id' | 'userId' | 'createdAt' | 'updatedAt'> & { id?: string },
    reportedBalance?: number | null,
    balanceAsOf?: string
  ) => void;
  deleteAccount: (accountId: string) => void;
  setPrimaryAccount: (accountId: string) => void;
  addBalanceObservation: (accountId: string, amount: number, asOf: string) => void;

  // Incomes
  saveIncomeSource: (
    incomeData: Omit<IncomeSource, 'id' | 'userId' | 'createdAt'> & { id?: string }
  ) => void;
  deleteIncomeSource: (incomeId: string) => void;

  // Commitments: Essentials, Bills, Debts
  saveEssentialExpenses: (amount: number | null, currency: string, notes: string) => void;
  saveObligation: (
    oblData: Omit<FinancialObligation, 'id' | 'userId' | 'createdAt'> & { id?: string }
  ) => void;
  toggleObligationPaid: (obligationId: string) => void;
  deleteObligation: (obligationId: string) => void;
  saveDebt: (debtData: Omit<DebtRecord, 'id' | 'userId' | 'createdAt'> & { id?: string }) => void;
  deleteDebt: (debtId: string) => void;

  // Goals & Allocations
  saveGoal: (goalData: Omit<FinancialGoal, 'id' | 'userId' | 'createdAt'> & { id?: string }) => void;
  deleteGoal: (goalId: string) => void;
  allocateFundsToGoal: (goalId: string, accountId: string, amount: number, note: string) => void;

  // Statements, Transactions & Confirmations
  uploadStatementContent: (
    accountId: string,
    fileName: string,
    content: string
  ) => StatementImport;
  deleteStatement: (statementId: string) => void;
  updateTransactionClassification: (
    transactionId: string,
    economicType: TransactionEconomicType,
    category: SpendingCategory
  ) => void;
  answerUserConfirmation: (
    confirmationId: string,
    response: 'yes' | 'no' | 'not_sure'
  ) => void;
  deleteConfirmation: (confirmationId: string) => void;

  // Recommendations
  acceptCurrentRecommendation: () => Promise<boolean>;
  completeRecommendationAllocation: (amount: number, accountId: string) => Promise<boolean>;
  adjustRecommendationAmount: (newAmount: number) => Promise<boolean>;
  declineCurrentRecommendation: () => Promise<boolean>;

  // Assistant
  sendAssistantMessage: (text: string) => void;
  clearAssistantMessages: () => void;

  // Database Management
  resetToDemo: () => Promise<void>;
  resetToBlankNewUser: () => Promise<void>;
  exportDatabaseJson: () => string;
}

const PIContext = createContext<PIContextValue | null>(null);

export const PIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [piState, setPiState] = useState<PIDatabaseSeed>(() => createDemoSeedData());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [islandAlert, setIslandAlert] = useState<string | null>(null);

  const [feedbackPending, setFeedbackPending] = useState<FeedbackAction | null>(null);
  const feedbackLock = useRef(false);
  const lastSyncedFinancialKey = useRef<string | null>(null);
  const [serverSnapshot, setServerSnapshot] = useState<{ key: string; snapshot: FinancialSnapshot } | null>(null);
  const [recommendationSource, setRecommendationSource] = useState<'backend' | 'local'>('local');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  const showToast = useCallback((msg: string, islandText?: string) => {
    setToastMessage(msg);
    if (islandText) {
      setIslandAlert(islandText);
      setTimeout(() => setIslandAlert(null), 3200);
    }
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Load initial state from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    loadPIState()
      .then((loaded) => {
        if (mounted) {
          setPiState(loaded);
          if (loaded.recommendations.some((r) => r.finAgentMeta)) setRecommendationSource('backend');
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Helper to update state and persist to IndexedDB
  const updateAndPersist = useCallback((updater: (prev: PIDatabaseSeed) => PIDatabaseSeed) => {
    setPiState((prev) => {
      const next = updater(prev);
      savePIState(next);
      return next;
    });
  }, []);

  // Recommendation/chat/feedback persistence does not create a new financial version.
  const financialKey = financialStateKey(piState);
  const localSnapshot = useMemo(() => buildFinancialSnapshot(piState), [financialKey]);
  const snapshot = serverSnapshot?.key === financialKey ? serverSnapshot.snapshot : localSnapshot;

  // Evaluate current recommendation
  const currentRecommendation = useMemo(
    () => recommendationSource === 'backend'
      ? RecommendationService.currentServerRecommendation(piState.recommendations, backendStatus === 'online' && financialKey === lastSyncedFinancialKey.current)
      : RecommendationService.evaluateCurrentRecommendation(snapshot, piState.recommendations),
    [snapshot, piState.recommendations, recommendationSource, backendStatus, financialKey]
  );

  // Sync PI snapshot with FinAgent Backend Orchestrator (PUT /api/pi/:userId) when online
  useEffect(() => {
    if (isLoading || feedbackPending || financialKey === lastSyncedFinancialKey.current) return;
    let cancelled = false;
    setBackendStatus('checking');
    // If an earlier response was lost, read authoritative Today before sending
    // browser PI again; otherwise reload could overwrite a committed completion.
    const recoveryKey = `vela_feedback_recovery_${piState.user.id}`;
    if (localStorage.getItem(recoveryKey)) {
      FinAgentApiClient.getToday(piState.user.id).then((remote) => {
        if (cancelled) return;
        if (!remote?.snapshot) { setBackendStatus('offline'); return; }
        updateAndPersist((prev) => {
          const next = mergeFeedbackResult(prev, { status: 'RECOVERED', ...remote });
          lastSyncedFinancialKey.current = financialStateKey(next);
          if (remote.snapshot) setServerSnapshot({ key: lastSyncedFinancialKey.current, snapshot: remote.snapshot });
          return next;
        });
        localStorage.removeItem(recoveryKey);
        setRecommendationSource('backend');
        setBackendStatus('online');
      });
      return () => { cancelled = true; };
    }
    FinAgentApiClient.syncPIAndReviewState(piState.user.id, localSnapshot, 'pi_updated')
      .then((result) => {
        if (cancelled) return;
        if (!result?.recommendation || !result.snapshot) { setBackendStatus('offline'); return; }
        const remoteSnapshot = result.snapshot;
        updateAndPersist((prev) => {
          const next = mergeFeedbackResult(prev, result);
          const key = financialStateKey(next);
          lastSyncedFinancialKey.current = key;
          setServerSnapshot({ key, snapshot: remoteSnapshot });
          return next;
        });
        setBackendStatus('online');
        setRecommendationSource('backend');
      })
      .catch(() => {
        if (!cancelled) setBackendStatus('offline');
      });
    return () => {
      cancelled = true;
    };
  }, [isLoading, piState.user.id, snapshot.id, financialKey, feedbackPending]);

  // ========================================================================
  // Actions
  // ========================================================================

  const registerDemoAccount = useCallback(
    (nickname: string, email: string, baseCurrency = 'EUR') => {
      const now = new Date().toISOString();
      updateAndPersist((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          email: email.trim(),
          authStatus: 'demo_verified',
        },
        profile: {
          ...prev.profile,
          nickname: nickname.trim() || 'User',
          baseCurrency,
          updatedAt: now,
        },
        onboarding: {
          ...prev.onboarding,
          currentStep: 3,
          completedSteps: Array.from(new Set([...prev.onboarding.completedSteps, 1, 2])),
        },
      }));
      showToast(`Welcome, ${nickname.trim() || 'friend'}! Profile saved locally.`, 'Account Verified');
    },
    [updateAndPersist, showToast]
  );

  const setOnboardingStep = useCallback(
    (step: number) => {
      updateAndPersist((prev) => ({
        ...prev,
        onboarding: {
          ...prev.onboarding,
          currentStep: Math.max(1, Math.min(10, step)),
          completedSteps: Array.from(
            new Set([...prev.onboarding.completedSteps, prev.onboarding.currentStep])
          ),
        },
      }));
    },
    [updateAndPersist]
  );

  const setPrimaryConcern = useCallback(
    (
      concern: PrimaryConcern,
      notes: string,
      specificGoal?: {
        name: string;
        targetAmount: number | null;
        currency: string;
        targetDate: string | null;
      }
    ) => {
      const now = new Date().toISOString();
      updateAndPersist((prev) => {
        let updatedGoals = [...prev.goals];
        if (concern === 'specific_goal' && specificGoal && specificGoal.name.trim()) {
          const existingIdx = updatedGoals.findIndex((g) => g.goalType === 'specific_purchase');
          const goalObj: FinancialGoal = {
            id: existingIdx >= 0 ? updatedGoals[existingIdx].id : `goal_${Date.now()}`,
            userId: prev.user.id,
            name: specificGoal.name.trim(),
            goalType: 'specific_purchase',
            targetAmount: specificGoal.targetAmount,
            currency: specificGoal.currency || prev.profile.baseCurrency,
            targetDate: specificGoal.targetDate,
            priority: 'high',
            createdAt: now,
          };
          if (existingIdx >= 0) updatedGoals[existingIdx] = goalObj;
          else updatedGoals.push(goalObj);
        } else if (concern === 'save_more' && updatedGoals.length === 0) {
          updatedGoals.push({
            id: `goal_cushion_${Date.now()}`,
            userId: prev.user.id,
            name: 'Safety Cushion',
            goalType: 'emergency_cushion',
            targetAmount: null,
            currency: prev.profile.baseCurrency,
            targetDate: null,
            priority: 'high',
            createdAt: now,
          });
        }

        return {
          ...prev,
          preferences: {
            ...prev.preferences,
            primaryConcern: concern,
            concernNotes: notes,
            updatedAt: now,
          },
          goals: updatedGoals,
        };
      });
    },
    [updateAndPersist]
  );

  const setDebtQuestionAnswer = useCallback(
    (ans: 'no' | 'yes' | 'not_sure') => {
      updateAndPersist((prev) => ({
        ...prev,
        onboarding: {
          ...prev.onboarding,
          debtQuestionAnswer: ans,
        },
      }));
    },
    [updateAndPersist]
  );

  const completeOnboarding = useCallback(() => {
    const now = new Date().toISOString();
    updateAndPersist((prev) => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        currentStep: 10,
        completedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        status: 'completed',
        completedAt: now,
      },
    }));
    showToast('Onboarding complete! Your Financial Snapshot is active.', 'Vela • Snapshot Ready');
  }, [updateAndPersist, showToast]);

  const saveAccount = useCallback(
    (
      accountData: Omit<FinancialAccount, 'id' | 'userId' | 'createdAt' | 'updatedAt'> & {
        id?: string;
      },
      reportedBalance?: number | null,
      balanceAsOf?: string
    ) => {
      const now = new Date().toISOString();
      const acctId = accountData.id || `acc_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;

      updateAndPersist((prev) => {
        const exists = prev.accounts.some((a) => a.id === acctId);
        let nextAccounts = prev.accounts.map((a) =>
          accountData.isPrimary ? { ...a, isPrimary: false } : a
        );

        const newAcct: FinancialAccount = {
          id: acctId,
          userId: prev.user.id,
          name: accountData.name.trim(),
          institution: accountData.institution.trim() || accountData.name.trim(),
          currency: accountData.currency.toUpperCase().trim() || 'EUR',
          purposes: accountData.purposes.length > 0 ? accountData.purposes : ['daily_spending'],
          fundsOwnership: accountData.fundsOwnership || 'personal',
          personalAvailableAmount: accountData.personalAvailableAmount,
          isPrimary: nextAccounts.length === 0 ? true : accountData.isPrimary,
          notes: accountData.notes || '',
          createdAt: exists
            ? prev.accounts.find((a) => a.id === acctId)!.createdAt
            : now,
          updatedAt: now,
        };

        if (exists) {
          nextAccounts = nextAccounts.map((a) => (a.id === acctId ? newAcct : a));
        } else {
          nextAccounts.push(newAcct);
        }

        const nextBalances = [...prev.balances];
        if (reportedBalance !== undefined && reportedBalance !== null && !isNaN(reportedBalance)) {
          nextBalances.push({
            id: `bal_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
            accountId: acctId,
            amount: reportedBalance,
            currency: newAcct.currency,
            asOf: balanceAsOf ? new Date(balanceAsOf).toISOString() : now,
            sourceType: exists ? 'manual_update' : 'user_reported',
            createdAt: now,
          });
        }

        return {
          ...prev,
          accounts: nextAccounts,
          balances: nextBalances,
          recommendations: [], // trigger fresh recommendation calculation
        };
      });

      showToast(
        accountData.id ? `Updated ${accountData.name}` : `Added account ${accountData.name}`,
        `${accountData.name} Saved`
      );
    },
    [updateAndPersist, showToast]
  );

  const deleteAccount = useCallback(
    (accountId: string) => {
      updateAndPersist((prev) => {
        const remainingAccounts = prev.accounts.filter((a) => a.id !== accountId);
        if (remainingAccounts.length > 0 && !remainingAccounts.some((a) => a.isPrimary)) {
          remainingAccounts[0] = { ...remainingAccounts[0], isPrimary: true };
        }
        const removedTxnIds = new Set(
          prev.transactions.filter((t) => t.accountId === accountId).map((t) => t.id)
        );

        return {
          ...prev,
          accounts: remainingAccounts,
          balances: prev.balances.filter((b) => b.accountId !== accountId),
          statements: prev.statements.filter((s) => s.accountId !== accountId),
          transactions: prev.transactions.filter((t) => t.accountId !== accountId),
          classifications: prev.classifications.filter((c) => !removedTxnIds.has(c.transactionId)),
          transferMatches: prev.transferMatches.filter(
            (m) => m.outgoingAccountId !== accountId && m.incomingAccountId !== accountId
          ),
          goalAllocations: prev.goalAllocations.filter((ga) => ga.accountId !== accountId),
          incomes: prev.incomes.map((inc) =>
            inc.receivingAccountId === accountId ? { ...inc, receivingAccountId: null } : inc
          ),
          obligations: prev.obligations.map((obl) =>
            obl.accountId === accountId ? { ...obl, accountId: null } : obl
          ),
          recommendations: [],
        };
      });
      showToast('Account and dependent statement records removed.', 'Account Deleted');
    },
    [updateAndPersist, showToast]
  );

  const setPrimaryAccount = useCallback(
    (accountId: string) => {
      updateAndPersist((prev) => ({
        ...prev,
        accounts: prev.accounts.map((a) => ({
          ...a,
          isPrimary: a.id === accountId,
        })),
      }));
      showToast('Primary account updated.');
    },
    [updateAndPersist, showToast]
  );

  const addBalanceObservation = useCallback(
    (accountId: string, amount: number, asOf: string) => {
      const now = new Date().toISOString();
      updateAndPersist((prev) => {
        const acct = prev.accounts.find((a) => a.id === accountId);
        if (!acct) return prev;
        return {
          ...prev,
          balances: [
            ...prev.balances,
            {
              id: `bal_${Date.now()}`,
              accountId,
              amount,
              currency: acct.currency,
              asOf: asOf ? new Date(asOf).toISOString() : now,
              sourceType: 'manual_update',
              createdAt: now,
            },
          ],
          recommendations: [],
        };
      });
      showToast('New balance observation recorded in PI.', 'Balance Updated');
    },
    [updateAndPersist, showToast]
  );

  const saveIncomeSource = useCallback(
    (incomeData: Omit<IncomeSource, 'id' | 'userId' | 'createdAt'> & { id?: string }) => {
      const now = new Date().toISOString();
      const incId = incomeData.id || `inc_${Date.now()}`;
      updateAndPersist((prev) => {
        const exists = prev.incomes.some((i) => i.id === incId);
        const newInc: IncomeSource = {
          ...incomeData,
          id: incId,
          userId: prev.user.id,
          createdAt: exists ? prev.incomes.find((i) => i.id === incId)!.createdAt : now,
        };
        return {
          ...prev,
          incomes: exists
            ? prev.incomes.map((i) => (i.id === incId ? newInc : i))
            : [...prev.incomes, newInc],
          recommendations: [],
        };
      });
      showToast(`Saved income source: ${incomeData.name}`, 'Income Saved');
    },
    [updateAndPersist, showToast]
  );

  const deleteIncomeSource = useCallback(
    (incomeId: string) => {
      updateAndPersist((prev) => ({
        ...prev,
        incomes: prev.incomes.filter((i) => i.id !== incomeId),
        recommendations: [],
      }));
      showToast('Income source removed.');
    },
    [updateAndPersist, showToast]
  );

  const saveEssentialExpenses = useCallback(
    (amount: number | null, currency: string, notes: string) => {
      const now = new Date().toISOString();
      updateAndPersist((prev) => ({
        ...prev,
        expenseCommitment: {
          id: prev.expenseCommitment?.id || 'exp_comm_1',
          userId: prev.user.id,
          estimatedMonthlyAmount: amount,
          currency: currency || prev.profile.baseCurrency,
          notes,
          updatedAt: now,
        },
        recommendations: [],
      }));
      showToast('Essential monthly commitment updated.');
    },
    [updateAndPersist, showToast]
  );

  const saveObligation = useCallback(
    (oblData: Omit<FinancialObligation, 'id' | 'userId' | 'createdAt'> & { id?: string }) => {
      const now = new Date().toISOString();
      const oblId = oblData.id || `obl_${Date.now()}`;
      updateAndPersist((prev) => {
        const exists = prev.obligations.some((o) => o.id === oblId);
        const newObl: FinancialObligation = {
          ...oblData,
          id: oblId,
          userId: prev.user.id,
          createdAt: exists ? prev.obligations.find((o) => o.id === oblId)!.createdAt : now,
        };
        return {
          ...prev,
          obligations: exists
            ? prev.obligations.map((o) => (o.id === oblId ? newObl : o))
            : [...prev.obligations, newObl],
          recommendations: [],
        };
      });
      showToast(`Saved obligation: ${oblData.name}`, 'Bill Updated');
    },
    [updateAndPersist, showToast]
  );

  const toggleObligationPaid = useCallback(
    (obligationId: string) => {
      updateAndPersist((prev) => ({
        ...prev,
        obligations: prev.obligations.map((o) =>
          o.id === obligationId
            ? { ...o, status: o.status === 'paid' ? 'unpaid' : 'paid' }
            : o
        ),
        recommendations: [],
      }));
      showToast('Obligation payment status updated.', 'Status Updated');
    },
    [updateAndPersist, showToast]
  );

  const deleteObligation = useCallback(
    (obligationId: string) => {
      updateAndPersist((prev) => ({
        ...prev,
        obligations: prev.obligations.filter((o) => o.id !== obligationId),
        recommendations: [],
      }));
      showToast('Obligation deleted.');
    },
    [updateAndPersist, showToast]
  );

  const saveDebt = useCallback(
    (debtData: Omit<DebtRecord, 'id' | 'userId' | 'createdAt'> & { id?: string }) => {
      const now = new Date().toISOString();
      const debtId = debtData.id || `debt_${Date.now()}`;
      updateAndPersist((prev) => {
        const exists = prev.debts.some((d) => d.id === debtId);
        const newDebt: DebtRecord = {
          ...debtData,
          id: debtId,
          userId: prev.user.id,
          createdAt: exists ? prev.debts.find((d) => d.id === debtId)!.createdAt : now,
        };
        return {
          ...prev,
          debts: exists
            ? prev.debts.map((d) => (d.id === debtId ? newDebt : d))
            : [...prev.debts, newDebt],
        };
      });
      showToast(`Saved debt record: ${debtData.name}`);
    },
    [updateAndPersist, showToast]
  );

  const deleteDebt = useCallback(
    (debtId: string) => {
      updateAndPersist((prev) => ({
        ...prev,
        debts: prev.debts.filter((d) => d.id !== debtId),
      }));
      showToast('Debt record removed.');
    },
    [updateAndPersist, showToast]
  );

  const saveGoal = useCallback(
    (goalData: Omit<FinancialGoal, 'id' | 'userId' | 'createdAt'> & { id?: string }) => {
      const now = new Date().toISOString();
      const goalId = goalData.id || `goal_${Date.now()}`;
      updateAndPersist((prev) => {
        const exists = prev.goals.some((g) => g.id === goalId);
        const newGoal: FinancialGoal = {
          ...goalData,
          id: goalId,
          userId: prev.user.id,
          createdAt: exists ? prev.goals.find((g) => g.id === goalId)!.createdAt : now,
        };
        return {
          ...prev,
          goals: exists
            ? prev.goals.map((g) => (g.id === goalId ? newGoal : g))
            : [...prev.goals, newGoal],
          recommendations: [],
        };
      });
      showToast(`Saved financial goal: ${goalData.name}`, 'Goal Updated');
    },
    [updateAndPersist, showToast]
  );

  const deleteGoal = useCallback(
    (goalId: string) => {
      updateAndPersist((prev) => ({
        ...prev,
        goals: prev.goals.filter((g) => g.id !== goalId),
        goalAllocations: prev.goalAllocations.filter((ga) => ga.goalId !== goalId),
        recommendations: [],
      }));
      showToast('Financial goal removed.');
    },
    [updateAndPersist, showToast]
  );

  const allocateFundsToGoal = useCallback(
    (goalId: string, accountId: string, amount: number, note: string) => {
      const now = new Date().toISOString();
      updateAndPersist((prev) => {
        const acct = prev.accounts.find((a) => a.id === accountId) || prev.accounts[0];
        return {
          ...prev,
          goalAllocations: [
            ...prev.goalAllocations,
            {
              id: `alloc_${Date.now()}`,
              userId: prev.user.id,
              goalId,
              accountId: acct?.id || accountId,
              amount,
              currency: acct?.currency || prev.profile.baseCurrency,
              allocatedAt: now,
              note: note || 'Earmarked inside Vela planning.',
            },
          ],
          recommendations: [],
        };
      });
      showToast(`Earmarked €${amount.toFixed(2)} to goal inside Vela!`, `€${amount.toFixed(0)} Earmarked`);
    },
    [updateAndPersist, showToast]
  );

  const uploadStatementContent = useCallback(
    (accountId: string, fileName: string, content: string): StatementImport => {
      const account = piState.accounts.find((a) => a.id === accountId);
      if (!account) {
        throw new Error('Selected account not found.');
      }

      const outcome = parseStatementCSVContent({
        userId: piState.user.id,
        account,
        allAccounts: piState.accounts,
        fileName,
        content,
        existingStatements: piState.statements,
        existingTransactions: piState.transactions,
      });

      updateAndPersist((prev) => {
        const nextStatements = [outcome.statement, ...prev.statements];
        if (
          outcome.statement.status !== 'parsed_successfully' &&
          outcome.statement.status !== 'needs_review'
        ) {
          return {
            ...prev,
            statements: nextStatements,
          };
        }

        const combinedTransactions = [...prev.transactions, ...outcome.transactions];
        const combinedClassifications = [...prev.classifications, ...outcome.classifications];

        const reconciled = reconcileTransfersAndConfirmations({
          userId: prev.user.id,
          accounts: prev.accounts,
          transactions: combinedTransactions,
          classifications: combinedClassifications,
          existingMatches: prev.transferMatches,
          existingConfirmations: prev.confirmations,
        });

        const nextBalances = [...prev.balances];
        if (outcome.statement.closingBalance !== null && outcome.statement.periodEnd) {
          nextBalances.push({
            id: `bal_stmt_${outcome.statement.id}`,
            accountId: account.id,
            amount: outcome.statement.closingBalance,
            currency: account.currency,
            asOf: `${outcome.statement.periodEnd}T23:59:00Z`,
            sourceType: 'statement_closing',
            sourceId: outcome.statement.id,
            createdAt: new Date().toISOString(),
          });
        }

        return {
          ...prev,
          statements: nextStatements,
          transactions: combinedTransactions,
          classifications: reconciled.updatedClassifications,
          transferMatches: reconciled.transferMatches,
          confirmations: reconciled.confirmations,
          balances: nextBalances,
          recommendations: [],
        };
      });

      if (
        outcome.statement.status === 'parsed_successfully' ||
        outcome.statement.status === 'needs_review'
      ) {
        showToast(
          `Parsed ${outcome.statement.transactionCount} transactions from ${fileName}`,
          `${outcome.statement.transactionCount} Txns Imported`
        );
      } else {
        showToast(outcome.statement.errorMessage || 'Import failed', 'Import Issue');
      }

      return outcome.statement;
    },
    [piState, updateAndPersist, showToast]
  );

  const deleteStatement = useCallback(
    (statementId: string) => {
      updateAndPersist((prev) => {
        const removedTxnIds = new Set(
          prev.transactions.filter((t) => t.statementId === statementId).map((t) => t.id)
        );
        return {
          ...prev,
          statements: prev.statements.filter((s) => s.id !== statementId),
          transactions: prev.transactions.filter((t) => t.statementId !== statementId),
          classifications: prev.classifications.filter((c) => !removedTxnIds.has(c.transactionId)),
          confirmations: prev.confirmations.filter((cf) => !removedTxnIds.has(cf.subjectId)),
          balances: prev.balances.filter((b) => b.sourceId !== statementId),
          recommendations: [],
        };
      });
      showToast('Statement and its transactions removed.');
    },
    [updateAndPersist, showToast]
  );

  const updateTransactionClassification = useCallback(
    (
      transactionId: string,
      economicType: TransactionEconomicType,
      category: SpendingCategory
    ) => {
      const now = new Date().toISOString();
      updateAndPersist((prev) => ({
        ...prev,
        classifications: prev.classifications.map((c) =>
          c.transactionId === transactionId
            ? {
                ...c,
                economicType,
                category,
                status: 'user_confirmed',
                provenanceNote: `User manually classified on ${now.slice(0, 10)}`,
                updatedAt: now,
              }
            : c
        ),
        recommendations: [],
      }));
      showToast('Transaction classification confirmed & saved.');
    },
    [updateAndPersist, showToast]
  );

  const answerUserConfirmation = useCallback(
    (confirmationId: string, response: 'yes' | 'no' | 'not_sure') => {
      const now = new Date().toISOString();
      updateAndPersist((prev) => {
        const targetConf = prev.confirmations.find((c) => c.id === confirmationId);
        if (!targetConf) return prev;

        const nextConfirmations = prev.confirmations.map((c) =>
          c.id === confirmationId
            ? {
                ...c,
                userResponse: response,
                confirmedValue:
                  c.subjectType === 'transfer'
                    ? response === 'yes'
                      ? 'internal_transfer'
                      : response === 'no'
                      ? 'income_or_external'
                      : 'unresolved'
                    : response === 'yes'
                    ? 'active_essential'
                    : response === 'no'
                    ? 'cancel_candidate'
                    : 'unknown',
                confirmedAt: now,
              }
            : c
        );

        let nextClassifications = [...prev.classifications];
        let nextMatches = [...prev.transferMatches];

        if (targetConf.subjectType === 'transfer') {
          nextClassifications = nextClassifications.map((cls) => {
            if (cls.transactionId !== targetConf.subjectId) return cls;
            if (response === 'yes') {
              return {
                ...cls,
                economicType: 'internal_transfer',
                category: 'transfer',
                status: 'user_confirmed',
                provenanceNote: 'User confirmed internal transfer between owned accounts',
                updatedAt: now,
              };
            } else if (response === 'no') {
              const txn = prev.transactions.find((t) => t.id === targetConf.subjectId);
              const isPos = txn ? txn.amount >= 0 : true;
              return {
                ...cls,
                economicType: isPos ? 'income' : 'expense',
                category: isPos ? 'income' : 'other',
                status: 'user_confirmed',
                provenanceNote: 'User confirmed external transaction (not internal transfer)',
                updatedAt: now,
              };
            }
            return cls;
          });

          nextMatches = nextMatches.map((m) =>
            m.incomingTransactionId === targetConf.subjectId ||
            m.outgoingTransactionId === targetConf.subjectId
              ? {
                  ...m,
                  status:
                    response === 'yes'
                      ? 'user_confirmed'
                      : response === 'no'
                      ? 'user_rejected'
                      : 'unresolved',
                }
              : m
          );
        } else if (targetConf.subjectType === 'subscription') {
          nextClassifications = nextClassifications.map((cls) =>
            cls.transactionId === targetConf.subjectId
              ? {
                  ...cls,
                  status: 'user_confirmed',
                  provenanceNote:
                    response === 'no'
                      ? 'User marked subscription as unused cancellation candidate'
                      : 'User confirmed active subscription',
                  updatedAt: now,
                }
              : cls
          );
        }

        return {
          ...prev,
          confirmations: nextConfirmations,
          classifications: nextClassifications,
          transferMatches: nextMatches,
          recommendations: [],
        };
      });

      showToast('Confirmation saved to PI Database.', 'Insight Confirmed');
    },
    [updateAndPersist, showToast]
  );

  const deleteConfirmation = useCallback(
    (confirmationId: string) => {
      updateAndPersist((prev) => ({
        ...prev,
        confirmations: prev.confirmations.filter((c) => c.id !== confirmationId),
        recommendations: [],
      }));
      showToast('Confirmation item removed.', 'Item Deleted');
    },
    [updateAndPersist, showToast]
  );

  const performFeedback = useCallback(async (
    action: FeedbackAction,
    amount?: number,
    accountId?: string
  ): Promise<boolean> => {
    if (!currentRecommendation || feedbackLock.current || (recommendationSource === 'backend' && (backendStatus !== 'online' || financialKey !== lastSyncedFinancialKey.current))) return false;
    feedbackLock.current = true;
    setFeedbackPending(action);
    try {
      if (recommendationSource === 'backend') {
        localStorage.setItem(`vela_feedback_recovery_${piState.user.id}`, 'pending');
        const result = await FinAgentApiClient.submitFeedback({
          userId: piState.user.id,
          recommendationId: currentRecommendation.id,
          action,
          // Completion uses the amount and account already validated and stored by the server.
          adjustedAmount: action === 'adjust' ? amount : undefined,
          note: 'Confirmed in Today view',
        });
        updateAndPersist((prev) => {
          const next = mergeFeedbackResult(prev, result);
          lastSyncedFinancialKey.current = financialStateKey(next);
          if (result.snapshot) setServerSnapshot({ key: lastSyncedFinancialKey.current, snapshot: result.snapshot });
          return next;
        });
        localStorage.removeItem(`vela_feedback_recovery_${piState.user.id}`);
        setBackendStatus('online');
        if (result.reviewPending) {
          showToast(result.reviewMessage || 'Completion saved; reload Today to retry the next review.');
          return true;
        }
      } else {
        if (action === 'complete' && !['accepted', 'adjusted'].includes(currentRecommendation.status)) {
          throw new Error('Accept or adjust this local planning suggestion before completing it.');
        }
        if (action === 'adjust') {
          const check = RecommendationService.validateAdjustedAmount(snapshot, amount ?? NaN);
          if (!check.valid) throw new Error(check.reason);
        }
        let localRec: RecommendationRecord = {
          ...currentRecommendation,
          status: action === 'accept' ? 'accepted' : action === 'adjust' ? 'adjusted' : action === 'decline' ? 'declined' : 'completed',
          adjustedAmount: action === 'adjust' ? amount! : currentRecommendation.adjustedAmount,
          updatedAt: new Date().toISOString(),
        };
        let allocation: ReturnType<typeof RecommendationService.executeReserveAllocation>['newAllocation'] | undefined;
        if (action === 'complete') {
          if (currentRecommendation.actionType !== 'allocate_safety_cushion') {
            throw new Error('This action needs the backend to record completion.');
          }
          const effectiveAmount = currentRecommendation.adjustedAmount ?? currentRecommendation.suggestedAmount;
          if (!effectiveAmount || !accountId) throw new Error('Select the account for this local earmark.');
          const check = RecommendationService.validateAdjustedAmount(snapshot, effectiveAmount);
          if (!check.valid) throw new Error(check.reason);
          const result = RecommendationService.executeReserveAllocation({
            recommendation: currentRecommendation, snapshot, amount: effectiveAmount, accountId,
          });
          localRec = result.updatedRecommendation;
          allocation = result.newAllocation;
        }
        updateAndPersist((prev) => ({
          ...prev,
          goalAllocations: allocation ? [...prev.goalAllocations, allocation] : prev.goalAllocations,
          recommendations: [localRec, ...prev.recommendations.filter((r) => r.id !== localRec.id)],
          actionFeedback: [...(prev.actionFeedback || []), {
            id: `fb_local_${Date.now()}`, recommendationId: localRec.id, action,
            amount: amount ?? localRec.adjustedAmount ?? localRec.suggestedAmount,
            note: 'Local prototype planning only; not saved to backend.', timestamp: new Date().toISOString(),
          }],
        }));
      }
      showToast(recommendationSource === 'backend'
        ? 'Feedback saved by backend.'
        : 'Saved locally in prototype mode.');
      return true;
    } catch (error) {
      if (recommendationSource === 'backend') {
        const remote = await FinAgentApiClient.getToday(piState.user.id);
        if (remote?.snapshot) {
          updateAndPersist((prev) => {
            const next = mergeFeedbackResult(prev, { status: 'RECOVERED', ...remote });
            lastSyncedFinancialKey.current = financialStateKey(next);
            if (remote.snapshot) setServerSnapshot({ key: lastSyncedFinancialKey.current, snapshot: remote.snapshot });
            return next;
          });
          localStorage.removeItem(`vela_feedback_recovery_${piState.user.id}`);
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
          // A known client rejection cannot have committed money effects.
          if (error instanceof FeedbackRequestError && error.httpStatus < 500) {
            localStorage.removeItem(`vela_feedback_recovery_${piState.user.id}`);
          }
        }
      }
      showToast(error instanceof Error ? error.message : 'Feedback was not saved.', 'Action not saved');
      return false;
    } finally {
      feedbackLock.current = false;
      setFeedbackPending(null);
    }
  }, [currentRecommendation, recommendationSource, backendStatus, financialKey, piState.user.id, snapshot, updateAndPersist, showToast]);

  const acceptCurrentRecommendation = useCallback(() => performFeedback('accept'), [performFeedback]);
  const completeRecommendationAllocation = useCallback((amount: number, accountId: string) =>
    performFeedback('complete', amount, accountId), [performFeedback]);
  const adjustRecommendationAmount = useCallback((amount: number) => performFeedback('adjust', amount), [performFeedback]);
  const declineCurrentRecommendation = useCallback(() => performFeedback('decline'), [performFeedback]);

  const sendAssistantMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const now = new Date().toISOString();

      const userMsg = {
        id: `msg_u_${Date.now()}`,
        userId: piState.user.id,
        role: 'user' as const,
        content: trimmed,
        createdAt: now,
      };

      const { reply, toolUsed } = LocalAssistantService.generateReply(
        trimmed,
        snapshot,
        currentRecommendation
      );

      const botMsg = {
        id: `msg_b_${Date.now() + 1}`,
        userId: piState.user.id,
        role: 'assistant' as const,
        content: reply,
        toolUsed,
        createdAt: new Date(Date.now() + 200).toISOString(),
      };

      updateAndPersist((prev) => ({
        ...prev,
        assistantMessages: [...prev.assistantMessages, userMsg, botMsg],
      }));

      // Asynchronously enrich via FinAgent Backend AI Assistant if server is online
      FinAgentApiClient.sendAssistantChat({
        userId: piState.user.id,
        question: trimmed,
        snapshot,
      }).then((remote) => {
        if (remote) {
          updateAndPersist((prev) => ({
            ...prev,
            assistantMessages: prev.assistantMessages.map((m) =>
              m.id === botMsg.id
                ? { ...m, content: remote.reply, toolUsed: remote.toolUsed }
                : m
            ),
          }));
        }
      });
    },
    [piState.user.id, snapshot, currentRecommendation, updateAndPersist]
  );

  const clearAssistantMessages = useCallback(() => {
    updateAndPersist((prev) => ({
      ...prev,
      assistantMessages: prev.assistantMessages.slice(0, 1),
    }));
    showToast('Chat history cleared.');
  }, [updateAndPersist, showToast]);

  const resetToDemo = useCallback(async () => {
    const freshDemo = await resetToDemoState();
    setRecommendationSource('local');
    setServerSnapshot(null);
    lastSyncedFinancialKey.current = null;
    setPiState(freshDemo);
    showToast('Demo Mode data restored (Alex · 4 accounts).', 'Demo Mode Restored');
  }, [showToast]);

  const resetToBlankNewUser = useCallback(async () => {
    const blank = await resetToBlankNewUserState();
    setRecommendationSource('local');
    setServerSnapshot(null);
    lastSyncedFinancialKey.current = null;
    setPiState(blank);
    showToast('Started fresh blank profile! Ready for new user onboarding.', 'New User Session');
  }, [showToast]);

  const exportDatabaseJson = useCallback(() => {
    return exportPIStateJson(piState);
  }, [piState]);

  const value: PIContextValue = {
    piState,
    snapshot,
    currentRecommendation,
    isLoading,
    feedbackPending,
    recommendationSource,
    backendStatus,
    toastMessage,
    islandAlert,
    showToast,
    registerDemoAccount,
    setOnboardingStep,
    setPrimaryConcern,
    setDebtQuestionAnswer,
    completeOnboarding,
    saveAccount,
    deleteAccount,
    setPrimaryAccount,
    addBalanceObservation,
    saveIncomeSource,
    deleteIncomeSource,
    saveEssentialExpenses,
    saveObligation,
    toggleObligationPaid,
    deleteObligation,
    saveDebt,
    deleteDebt,
    saveGoal,
    deleteGoal,
    allocateFundsToGoal,
    uploadStatementContent,
    deleteStatement,
    updateTransactionClassification,
    answerUserConfirmation,
    deleteConfirmation,
    acceptCurrentRecommendation,
    completeRecommendationAllocation,
    adjustRecommendationAmount,
    declineCurrentRecommendation,
    sendAssistantMessage,
    clearAssistantMessages,
    resetToDemo,
    resetToBlankNewUser,
    exportDatabaseJson,
  };

  return <PIContext.Provider value={value}>{children}</PIContext.Provider>;
};

export function usePI(): PIContextValue {
  const ctx = useContext(PIContext);
  if (!ctx) throw new Error('usePI must be used within a PIProvider');
  return ctx;
}
