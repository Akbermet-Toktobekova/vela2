export type AccountPurpose =
  | 'daily_spending'
  | 'receiving_income'
  | 'savings'
  | 'work_business'
  | 'mixed'
  | 'other'
  | 'not_sure';

export type FundsOwnership =
  | 'personal'
  | 'work_business'
  | 'held_for_others'
  | 'mixed'
  | 'unknown';

export type PrimaryConcern =
  | 'save_more'
  | 'debt'
  | 'spending_visibility'
  | 'payday_short'
  | 'specific_goal'
  | 'not_sure';

export interface User {
  id: string;
  email: string;
  authStatus: 'demo_verified' | 'unverified';
  isDemoMode: boolean;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  nickname: string;
  locale: string;
  baseCurrency: string;
  country: string;
  updatedAt: string;
}

export interface UserPreferences {
  userId: string;
  primaryConcern: PrimaryConcern | null;
  concernNotes: string;
  notificationsEnabled: boolean;
  reducedMotion: boolean;
  updatedAt: string;
}

export interface OnboardingSession {
  id: string;
  userId: string;
  currentStep: number;
  completedSteps: number[];
  debtQuestionAnswer: 'no' | 'yes' | 'not_sure' | null;
  status: 'in_progress' | 'completed';
  startedAt: string;
  completedAt: string | null;
}

export interface FinancialAccount {
  id: string;
  userId: string;
  name: string;
  institution: string;
  currency: string;
  purposes: AccountPurpose[];
  fundsOwnership: FundsOwnership;
  personalAvailableAmount: number | null;
  isPrimary: boolean;
  notes: string;
  isDemoData?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BalanceObservation {
  id: string;
  accountId: string;
  amount: number;
  currency: string;
  asOf: string;
  sourceType: 'user_reported' | 'statement_closing' | 'manual_update';
  sourceId?: string;
  createdAt: string;
}

export interface IncomeSource {
  id: string;
  userId: string;
  name: string;
  pattern: 'regular' | 'irregular' | 'mixed';
  estimatedMonthlyAmount: number | null;
  currency: string;
  frequency: 'monthly' | 'biweekly' | 'weekly' | 'irregular';
  sourceType: 'salary' | 'scholarship' | 'freelance' | 'part_time' | 'business' | 'other';
  nextExpectedDate: string | null;
  receivingAccountId: string | null;
  notes: string;
  isDemoData?: boolean;
  createdAt: string;
}

export interface ExpenseCommitment {
  id: string;
  userId: string;
  estimatedMonthlyAmount: number | null;
  currency: string;
  notes: string;
  updatedAt: string;
}

export type ObligationCategory =
  | 'rent'
  | 'energy'
  | 'internet'
  | 'tuition'
  | 'insurance'
  | 'other';

export interface FinancialObligation {
  id: string;
  userId: string;
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  recurrence: 'monthly' | 'weekly' | 'yearly' | 'one_time';
  category: ObligationCategory;
  status: 'unpaid' | 'paid';
  accountId: string | null;
  notes: string;
  isDemoData?: boolean;
  createdAt: string;
}

export type DebtType =
  | 'credit_card'
  | 'student_loan'
  | 'personal_loan'
  | 'overdraft'
  | 'family_loan'
  | 'other';

export interface DebtRecord {
  id: string;
  userId: string;
  debtType: DebtType;
  name: string;
  currency: string;
  remainingBalance: number | null; // null = unknown
  apr: number | null;
  minimumPayment: number | null;
  nextDueDate: string | null;
  paymentFrequency: 'monthly' | 'weekly' | 'irregular' | null;
  isDemoData?: boolean;
  createdAt: string;
}

export interface FinancialGoal {
  id: string;
  userId: string;
  name: string;
  goalType: 'emergency_cushion' | 'specific_purchase' | 'debt_paydown' | 'general_savings';
  targetAmount: number | null;
  currency: string;
  targetDate: string | null;
  priority: 'high' | 'medium' | 'low';
  isDemoData?: boolean;
  createdAt: string;
}

export interface GoalAllocation {
  id: string;
  userId: string;
  goalId: string;
  accountId: string;
  amount: number;
  currency: string;
  allocatedAt: string;
  note: string;
  recommendationId?: string;
}

export type StatementProcessingStatus =
  | 'not_uploaded'
  | 'file_selected'
  | 'validating'
  | 'processing'
  | 'parsed_successfully'
  | 'needs_review'
  | 'unsupported_format'
  | 'failed';

export interface StatementImport {
  id: string;
  userId: string;
  accountId: string;
  fileName: string;
  fileFormat: 'csv' | 'pdf' | 'xlsx' | 'unknown';
  fileHash: string;
  periodStart: string | null;
  periodEnd: string | null;
  currency: string;
  transactionCount: number;
  duplicateCountSkipped: number;
  status: StatementProcessingStatus;
  errorMessage?: string;
  overlapWarning?: string;
  closingBalance: number | null;
  importedAt: string;
  isDemoData?: boolean;
}

export type TransactionEconomicType =
  | 'income'
  | 'expense'
  | 'internal_transfer'
  | 'external_transfer'
  | 'debt_payment'
  | 'interest_fee'
  | 'refund'
  | 'cash_withdrawal'
  | 'savings_allocation'
  | 'work_business_movement'
  | 'unknown';

export type SpendingCategory =
  | 'rent_housing'
  | 'utilities_energy'
  | 'internet_telecom'
  | 'groceries_food'
  | 'dining_coffee'
  | 'transport'
  | 'subscriptions'
  | 'shopping'
  | 'health'
  | 'education'
  | 'work_expense'
  | 'income'
  | 'transfer'
  | 'other';

export interface TransactionRecord {
  id: string;
  userId: string;
  accountId: string;
  statementId: string;
  date: string; // YYYY-MM-DD
  amount: number; // negative = outflow, positive = inflow
  currency: string;
  description: string;
  counterparty: string;
  reference: string;
  rawRow: Record<string, string>;
  isDemoData?: boolean;
  createdAt: string;
}

export interface TransactionClassification {
  id: string;
  transactionId: string;
  economicType: TransactionEconomicType;
  category: SpendingCategory;
  confidence: 'high' | 'medium' | 'low';
  status: 'auto_classified' | 'needs_review' | 'user_confirmed';
  classifierVersion: string;
  isRecurringCandidate: boolean;
  provenanceNote: string;
  updatedAt: string;
}

export interface AccountCoverage {
  id: string;
  accountId: string;
  periodStart: string;
  periodEnd: string;
  daysCovered: number;
  monthsCovered: number;
  completeness: 'full_month' | 'multi_month' | 'partial' | 'none';
}

export interface TransferMatch {
  id: string;
  userId: string;
  outgoingTransactionId: string;
  incomingTransactionId: string | null;
  outgoingAccountId: string;
  incomingAccountId: string | null;
  amount: number;
  currency: string;
  date: string;
  description: string;
  status: 'matched' | 'probable' | 'unresolved' | 'user_confirmed' | 'user_rejected';
}

export interface UserConfirmation {
  id: string;
  userId: string;
  subjectType: 'transaction' | 'transfer' | 'subscription' | 'account_ownership';
  subjectId: string;
  questionText: string;
  impactReason: string;
  amountLabel: string;
  field: string;
  userResponse: 'yes' | 'no' | 'not_sure' | null;
  confirmedValue: string | null;
  confirmedAt: string | null;
}

export type RecommendationStatus =
  | 'proposed'
  | 'accepted'
  | 'adjusted'
  | 'declined'
  | 'completed'
  | 'expired';

export type ReadinessState =
  | 'state_a_action_ready'
  | 'state_b_clarification_needed'
  | 'state_c_limited_data';

export interface FinAgentDecisionMeta {
  catalogActionId: string;
  catalogActionType: 'FINANCIAL_ACTION' | 'VERIFICATION_ACTION' | 'EDUCATIONAL_ACTION';
  priorityClass: 'CRITICAL' | 'NORMAL' | 'VERIFICATION_UNLOCK' | 'NONE';
  weightProfileId: 'liquidity_protection' | 'expensive_debt' | 'goal_advancement' | 'balanced' | null;
  weights: { R: number; F: number; G: number } | null;
  normalizedValues: { v_R: number; v_F: number; v_G: number } | null;
  complexity: number | null;
  score: number | null;
  stability: number | null;
  policyVersion: string;
  dataQualityStatus: 'PROTOTYPE_POLICY' | 'NEEDS_DATA' | 'FX_WARNING';
  sourceIds: string[];
  ruleIds: string[];
  claimIds: string[];
}

export interface RecommendationRecord {
  id: string;
  userId: string;
  snapshotId: string;
  actionType:
    | 'allocate_safety_cushion'
    | 'review_recurring_subscription'
    | 'confirm_upcoming_bill'
    | 'update_stale_balance'
    | 'clarify_internal_transfer'
    | 'set_essential_expenses'
    | 'source_backed_advice';
  sourceAdvice?: {
    id: string;
    title: string;
    description: string;
    rationale: string;
    sources: { claimId: string; sourceId: string; title: string; url: string }[];
  };
  title: string;
  description: string;
  reasoning: string;
  suggestedAmount: number | null;
  adjustedAmount: number | null;
  currency: string;
  targetGoalId: string | null;
  sourceAccountId: string | null;
  priority: 'priority' | 'suggested' | 'clarification';
  status: RecommendationStatus;
  readinessState: ReadinessState;
  isDemoSeeded?: boolean;
  finAgentMeta?: FinAgentDecisionMeta;
  clarification?: { question: string; route?: 'accounts' };
  createdAt: string;
  updatedAt: string;
}

export interface ActionFeedback {
  id: string;
  recommendationId: string;
  action: 'accept' | 'adjust' | 'decline' | 'complete';
  amount: number | null;
  note: string;
  timestamp: string;
}

export interface AssistantMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  toolUsed?: string;
  createdAt: string;
}

export interface AccountSummaryView {
  account: FinancialAccount;
  latestBalance: BalanceObservation | null;
  balanceHistory: BalanceObservation[];
  isStale: boolean;
  personalAccessibleBalance: number | null;
  allocatedToGoals: number;
  coverage: AccountCoverage | null;
  statementCount: number;
  transactionCount: number;
}

export interface CurrencyCashSummary {
  currency: string;
  totalReportedBalance: number;
  personalAccessibleCash: number;
  allocatedToGoals: number;
  upcomingUnpaidObligations: number;
  uncommittedSafeToSpend: number;
  hasWorkOrMixedUncertainty: boolean;
  hasMissingBalances: boolean;
}

export interface FinancialSnapshot {
  id: string;
  userId: string;
  version: string;
  createdAt: string;
  baseCurrency: string;
  isDemoMode: boolean;

  profile: UserProfile;
  preferences: UserPreferences;
  onboarding: OnboardingSession;

  accountSummaries: AccountSummaryView[];
  currencySummaries: CurrencyCashSummary[];
  primaryCurrencySummary: CurrencyCashSummary;

  incomeSources: IncomeSource[];
  declaredMonthlyIncomeByCurrency: Record<string, number>;
  observedInflowsByCurrency: Record<string, number>;

  essentialCommitment: ExpenseCommitment | null;
  obligations: FinancialObligation[];
  upcomingUnpaidObligations: FinancialObligation[];
  overdueObligations: FinancialObligation[];

  debts: DebtRecord[];
  goals: FinancialGoal[];
  goalAllocations: GoalAllocation[];
  safetyCushionGoal: FinancialGoal | null;
  safetyCushionAllocated: number;
  emergencyCoverageMonths: number | null;
  emergencyCoverageDays: number | null;

  statements: StatementImport[];
  transactions: TransactionRecord[];
  classifications: Record<string, TransactionClassification>;
  transferMatches: TransferMatch[];
  confirmations: UserConfirmation[];
  unresolvedConfirmations: UserConfirmation[];

  observedSpendingTotal: number;
  observedIncomeTotal: number;
  observedSubscriptionsTotal: number;
  observedInternalTransfersTotal: number;
  observedDebtPaymentsTotal: number;
  observedWorkMovementsTotal: number;
  spendingByCategory: Record<SpendingCategory, number>;

  dataQuality: {
    totalAccounts: number;
    accountsWithBalance: number;
    accountsWithStatements: number;
    staleBalanceAccountIds: string[];
    missingBalanceAccountIds: string[];
    multiCurrencyDetected: boolean;
    currencies: string[];
    singleMonthWarning: boolean;
    coverageStatus: 'none' | 'partial_single_month' | 'partial_multi_account' | 'complete';
    missingFields: string[];
  };

  readinessState: ReadinessState;
  readinessReason: string;
}

export interface FXRateEntry {
  base: string;
  target: string;
  rate: number;
  rateDate: string;
  fetchedAt: string;
  status: 'OK' | 'STALE' | 'UNAVAILABLE';
  source: string;
}

export interface ScheduledAutomaticTransfer {
  id: string;
  userId: string;
  fromAccountId: string;
  toAccountId: string | null;
  amount: number;
  currency: string;
  scheduledDate: string; // YYYY-MM-DD
  description: string;
  isActive: boolean;
}

export interface ExtendedDebtTerms {
  debtId: string;
  interestAccruing: boolean;
  promoEndDate?: string | null;
  promoBalance?: number | null;
  lateFeeAmount?: number | null;
  issuerContact?: string | null;
}

export interface DailyCashProjectionPoint {
  date: string; // YYYY-MM-DD
  dayOffset: number; // 0..90
  inflows: number;
  outflows: number;
  netCashSigned: number; // F004 — CAN BE NEGATIVE (never masked by max(0, ...))
  belowBufferFloor: boolean;
}

export interface CashflowProjectionSummary {
  /** Missing facts that prevent treating a partial projection as financially complete. */
  missingInputs?: string[];
  horizonDays: number;
  startingLiquidCash: number;
  bufferFloor: number;
  availableCashBeforeActionF003: number; // F003 = max(0, ...) for optional spending
  minProjectedCashSignedF004: number; // Minimum of F004 across [0, H] (negative = deficit!)
  minProjectedCashDate: string | null;
  hasProjectedDeficit: boolean;
  shortfallsByObligation: Array<{
    targetId: string;
    targetType: 'obligation' | 'debt_minimum' | 'auto_transfer';
    name: string;
    dueDate: string;
    amountDue: number;
    liquidAvailableByDue: number;
    shortfallAmountF019: number; // F019
  }>;
  dailyTrajectory: DailyCashProjectionPoint[];
  paymentCoverage?: CashflowProjectionSummary['shortfallsByObligation'];
}
