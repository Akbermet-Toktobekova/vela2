import {
ActionFeedback,
AssistantMessage,
BalanceObservation,
DebtRecord,
ExpenseCommitment,
FinancialAccount,
FinancialGoal,
FinancialObligation,
GoalAllocation,
IncomeSource,
OnboardingSession,
RecommendationRecord,
StatementImport,
TransactionClassification,
TransactionRecord,
TransferMatch,
User,
UserConfirmation,
UserPreferences,
UserProfile,
} from '../pi/types';

export interface PIDatabaseSeed {
  subscriptions?: ConfirmedSubscription[];
  user: User;
  profile: UserProfile;
  preferences: UserPreferences;
  onboarding: OnboardingSession;
  accounts: FinancialAccount[];
  balances: BalanceObservation[];
  incomes: IncomeSource[];
  expenseCommitment: ExpenseCommitment | null;
  obligations: FinancialObligation[];
  debts: DebtRecord[];
  goals: FinancialGoal[];
  goalAllocations: GoalAllocation[];
  statements: StatementImport[];
  transactions: TransactionRecord[];
  classifications: TransactionClassification[];
  transferMatches: TransferMatch[];
  confirmations: UserConfirmation[];
  recommendations: RecommendationRecord[];
  actionFeedback?: ActionFeedback[];
  assistantMessages: AssistantMessage[];
}

export interface ConfirmedSubscription {
  id: string;
  name: string;
  amount: number;
  currency: string;
  frequency?: 'monthly' | 'yearly' | 'weekly';
  detected?: boolean;
  merchantKey?: string;
  nextDueDate?: string;
  monthlyAmount?: number;
  includedInEssentials: boolean;
  status: 'active' | 'ended';
  transactionIds: string[];
  detailId?: string;
  linkedObligationId?: string;
  originAccountId?: string;
}

export function createBlankUserSeedData(): PIDatabaseSeed {
  const userId = 'user_local_new';
  const now = new Date().toISOString();

  return {
    user: {
      id: userId,
      email: '',
      authStatus: 'unverified',
      isDemoMode: false,
      createdAt: now,
    },
    profile: {
      userId,
      nickname: '',
      locale: 'en-US',
      baseCurrency: 'EUR',
      country: 'EU',
      updatedAt: now,
    },
    preferences: {
      userId,
      primaryConcern: null,
      concernNotes: '',
      notificationsEnabled: true,
      reducedMotion: false,
      updatedAt: now,
    },
    onboarding: {
      id: 'ob_new_001',
      userId,
      currentStep: 1,
      completedSteps: [],
      debtQuestionAnswer: null,
      status: 'in_progress',
      startedAt: now,
      completedAt: null,
    },
    accounts: [],
    balances: [],
    incomes: [],
    expenseCommitment: null,
    obligations: [],
    debts: [],
    goals: [],
    goalAllocations: [],
    statements: [],
    transactions: [],
    classifications: [],
    transferMatches: [],
    confirmations: [],
    recommendations: [],
    assistantMessages: [
      {
        id: 'msg_blank_1',
        userId,
        role: 'assistant',
        content:
          'Welcome to Vela! Complete your onboarding or add your first bank account so I can help organize your financial picture.',
        toolUsed: 'system_init',
        createdAt: now,
      },
    ],
  };
}
