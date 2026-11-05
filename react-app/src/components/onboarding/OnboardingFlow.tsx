import React, { useState } from 'react';
import { usePI } from '../../context/PIContext';
import {
  DebtType,
  FinancialAccount,
  FinancialObligation,
  PrimaryConcern,
} from '../../types/pi';
import { AccountModal } from '../modals/AccountModal';
import {
  ObligationModal,
  StatementUploadModal,
  TransactionReviewModal,
} from '../modals/QuickActionModals';
import { SAMPLE_REVOLUT_CSV, SAMPLE_WISE_CSV } from '../../database/seed';

interface OnboardingFlowProps {
  onFinishToToday: () => void;
}

const TOTAL_STEPS = 7;

const CONCERN_OPTIONS: { id: PrimaryConcern; label: string }[] = [
  { id: 'save_more', label: 'I want to save more' },
  { id: 'debt', label: 'I have debt to deal with' },
  { id: 'spending_visibility', label: "I don't know where my money goes" },
  { id: 'payday_short', label: 'I struggle before payday' },
  { id: 'specific_goal', label: "I'm saving for something specific" },
  { id: 'not_sure', label: "I'm not sure yet" },
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onFinishToToday }) => {
  const {
    piState,
    snapshot,
    registerDemoAccount,
    setOnboardingStep,
    setPrimaryConcern,
    setDebtQuestionAnswer,
    completeOnboarding,
    setPrimaryAccount,
    saveIncomeSource,
    deleteIncomeSource,
    saveEssentialExpenses,
    deleteObligation,
    saveDebt,
    deleteDebt,
    uploadStatementContent,
    deleteStatement,
  } = usePI();

  const step = Math.min(TOTAL_STEPS, piState.onboarding.currentStep || 1);

  // Screen 2 state (Identity & Auth)
  const [nickname, setNickname] = useState(piState.profile.nickname || 'Alex');
  const [email, setEmail] = useState(piState.user.email || 'alex@vela.demo');
  const [code, setCode] = useState('8492');
  const [authError, setAuthError] = useState<string | null>(null);

  // Screen 3 concern state
  const [selectedConcern, setSelectedConcern] = useState<PrimaryConcern>(
    piState.preferences.primaryConcern || 'save_more'
  );
  const [concernNotes, setConcernNotes] = useState(piState.preferences.concernNotes || '');
  const [specGoalName, setSpecGoalName] = useState('');
  const [specGoalAmount, setSpecGoalAmount] = useState('');
  const [specGoalCurrency, setSpecGoalCurrency] = useState(piState.profile.baseCurrency || 'EUR');
  const [specGoalDate, setSpecGoalDate] = useState('');

  // Screen 4 account modal state
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<FinancialAccount | null>(null);
  const [editingAccountBalance, setEditingAccountBalance] = useState<number | null>(null);

  // Screen 5 income form state
  const [incName, setIncName] = useState('');
  const [incPattern, setIncPattern] = useState<'regular' | 'irregular' | 'mixed'>('regular');
  const [incAmount, setIncAmount] = useState('');
  const [incCurrency, setIncCurrency] = useState(piState.profile.baseCurrency || 'EUR');
  const [incFreq, setIncFreq] = useState<'monthly' | 'biweekly' | 'weekly' | 'irregular'>('monthly');
  const [incType, setIncType] = useState<
    'salary' | 'scholarship' | 'freelance' | 'part_time' | 'business' | 'other'
  >('scholarship');
  const [incNextDate, setIncNextDate] = useState('2026-11-10');
  const [incAccountId, setIncAccountId] = useState(piState.accounts[0]?.id || '');
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);

  // Screen 6 commitments state
  const [essentialAmt, setEssentialAmt] = useState(
    piState.expenseCommitment?.estimatedMonthlyAmount !== null &&
      piState.expenseCommitment?.estimatedMonthlyAmount !== undefined
      ? String(piState.expenseCommitment.estimatedMonthlyAmount)
      : ''
  );
  const [essentialCcy, setEssentialCcy] = useState(
    piState.expenseCommitment?.currency || piState.profile.baseCurrency || 'EUR'
  );
  const [essentialNotes, setEssentialNotes] = useState(
    piState.expenseCommitment?.notes || ''
  );
  const [editingObligation, setEditingObligation] = useState<FinancialObligation | null>(null);
  const [obligationModalOpen, setObligationModalOpen] = useState(false);

  // Debt sub-form on Screen 6
  const [showAddDebtForm, setShowAddDebtForm] = useState(false);
  const [debtType, setDebtType] = useState<DebtType>('credit_card');
  const [debtName, setDebtName] = useState('');
  const [debtCurrency, setDebtCurrency] = useState('EUR');
  const [debtBalanceStr, setDebtBalanceStr] = useState('');
  const [debtBalanceUnknown, setDebtBalanceUnknown] = useState(false);
  const [debtAprStr, setDebtAprStr] = useState('');
  const [debtMinPayStr, setDebtMinPayStr] = useState('');
  const [debtDueDate, setDebtDueDate] = useState('');

  // Screen 7 statement upload modal
  const [uploadModalAccountId, setUploadModalAccountId] = useState<string | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setOnboardingStep(step + 1);
    } else {
      completeOnboarding();
      onFinishToToday();
    }
  };

  const goBack = () => {
    if (step > 1) {
      setOnboardingStep(step - 1);
    } else {
      onFinishToToday();
    }
  };

  const handleScreen2Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setAuthError('Please enter your name or nickname.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setAuthError('Please enter a valid email address (e.g. alex@example.com).');
      return;
    }
    if (code.replace(/\s+/g, '') !== '8492') {
      setAuthError('For Demo Verification, please enter code 8492.');
      return;
    }
    setAuthError(null);
    registerDemoAccount(nickname, email);
    setOnboardingStep(3); // Directly to "What matters to you"
  };

  const handleScreen3Continue = () => {
    const parsedTarget =
      specGoalAmount.trim() !== '' ? parseFloat(specGoalAmount) : null;
    setPrimaryConcern(
      selectedConcern,
      concernNotes,
      selectedConcern === 'specific_goal'
        ? {
            name: specGoalName,
            targetAmount: isNaN(parsedTarget!) ? null : parsedTarget,
            currency: specGoalCurrency,
            targetDate: specGoalDate || null,
          }
        : undefined
    );
    goNext();
  };

  const handleAddIncomeInline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incName.trim()) return;
    const parsedAmt = incAmount.trim() !== '' ? parseFloat(incAmount) : null;
    saveIncomeSource({
      name: incName.trim(),
      pattern: incPattern,
      estimatedMonthlyAmount: isNaN(parsedAmt!) ? null : parsedAmt,
      currency: incCurrency,
      frequency: incFreq,
      sourceType: incType,
      nextExpectedDate: incNextDate || null,
      receivingAccountId: incAccountId || null,
      notes: '',
    });
    setIncName('');
    setIncAmount('');
    setShowAddIncomeForm(false);
  };

  const handleAddDebtInline = (e: React.FormEvent) => {
    e.preventDefault();
    const bal =
      debtBalanceUnknown || debtBalanceStr.trim() === ''
        ? null
        : parseFloat(debtBalanceStr);
    const apr = debtAprStr.trim() !== '' ? parseFloat(debtAprStr) : null;
    const minP = debtMinPayStr.trim() !== '' ? parseFloat(debtMinPayStr) : null;

    saveDebt({
      debtType,
      name: debtName.trim() || debtType.replace('_', ' ').toUpperCase(),
      currency: debtCurrency,
      remainingBalance: bal !== null && isNaN(bal) ? null : bal,
      apr: apr !== null && isNaN(apr) ? null : apr,
      minimumPayment: minP !== null && isNaN(minP) ? null : minP,
      nextDueDate: debtDueDate || null,
      paymentFrequency: 'monthly',
    });
    setDebtName('');
    setDebtBalanceStr('');
    setDebtAprStr('');
    setDebtMinPayStr('');
    setShowAddDebtForm(false);
  };

  const handleScreen6Continue = () => {
    const parsedEss = essentialAmt.trim() !== '' ? parseFloat(essentialAmt) : null;
    if (parsedEss !== null && !isNaN(parsedEss)) {
      saveEssentialExpenses(parsedEss, essentialCcy, essentialNotes);
    }
    goNext();
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-2 pb-8">
      {/* Top 7-Step Progress Bar */}
      <div
        className="flex items-center gap-1 mb-2.5"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
      >
        {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
          const sNum = idx + 1;
          return (
            <button
              key={sNum}
              type="button"
              onClick={() => setOnboardingStep(sNum)}
              title={`Jump to Step ${sNum}`}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                sNum === step
                  ? 'bg-[#272e23] scale-y-125'
                  : sNum < step
                  ? 'bg-[#386641]'
                  : 'bg-black/10'
              }`}
            />
          );
        })}
      </div>

      {/* Top Navigation Row */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={goBack}
          className="flex size-8 items-center justify-center rounded-full border border-white/80 bg-white/55 text-xs font-bold shadow-xs"
          aria-label="Previous step"
        >
          ←
        </button>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#74766d]">
          Step {step} of {TOTAL_STEPS}
        </span>
        <button
          type="button"
          onClick={() => {
            completeOnboarding();
            onFinishToToday();
          }}
          className="text-xs font-semibold text-[#74766d] hover:text-[#272e23]"
        >
          Skip to App
        </button>
      </div>

      {/* =================================================================
          SCREEN 1 — WELCOME TO VELA
         ================================================================= */}
      {step === 1 && (
        <div className="flex flex-1 flex-col justify-between animate-fade-in">
          <div className="space-y-4 pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3 py-1">
              <span className="size-2 rounded-full bg-[#386641]" />
              <span className="eyebrow text-[10px]">Vela Personal Intelligence</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#272e23] leading-tight">
                Your money, <br />
                <span className="text-[#386641]">one step at a time.</span>
              </h1>
              <p className="text-secondary text-sm leading-relaxed">
                Connect your accounts, understand your true financial baseline, and get one clear next step without overwhelming charts.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="space-y-2.5 pt-2">
              <div className="glass-card flex items-start gap-3 rounded-2xl p-3.5">
                <span className="text-xl">🎯</span>
                <div>
                  <h3 className="text-xs font-bold text-[#272e23]">One Recommended Next Step</h3>
                  <p className="text-[11px] text-[#74766d]">
                    Never feel lost. We identify the single highest-impact money move today.
                  </p>
                </div>
              </div>

              <div className="glass-card flex items-start gap-3 rounded-2xl p-3.5">
                <span className="text-xl">🛡️</span>
                <div>
                  <h3 className="text-xs font-bold text-[#272e23]">Private & Stored on Your Device</h3>
                  <p className="text-[11px] text-[#74766d]">
                    Your data stays in your browser's IndexedDB. Export or reset anytime.
                  </p>
                </div>
              </div>

              <div className="glass-card flex items-start gap-3 rounded-2xl p-3.5">
                <span className="text-xl">💳</span>
                <div>
                  <h3 className="text-xs font-bold text-[#272e23]">Multi-Bank & Multi-Currency</h3>
                  <p className="text-[11px] text-[#74766d]">
                    Connect Revolut, Wise, OTP, MBANK or finish with just one account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <button
              type="button"
              onClick={goNext}
              className="primary-action h-12 w-full rounded-2xl text-sm font-bold"
            >
              Get started →
            </button>
          </div>
        </div>
      )}

      {/* =================================================================
          SCREEN 2 — CREATE ACCOUNT (DEMO AUTH FLOW)
         ================================================================= */}
      {step === 2 && (
        <form onSubmit={handleScreen2Continue} className="flex flex-1 flex-col justify-between animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Identity · Step 2</span>
              <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                Demo Auth Flow
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Create Account</h1>
            <p className="text-secondary text-xs">
              Let's get you started. This prototype saves your profile locally in your browser's IndexedDB.
            </p>

            {authError && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-2.5 text-xs font-semibold text-red-800">
                {authError}
              </div>
            )}

            <div className="space-y-2.5 pt-1">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                  Name or Nickname *
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. Alex"
                  className="vela-input"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="vela-input"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase text-[#74766d]">
                    Verification Code *
                  </label>
                  <span className="text-[11px] font-bold text-[#386641]">
                    Dev Code: 8492
                  </span>
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 8492"
                  className="vela-input text-center font-bold tracking-[6px]"
                  required
                />
              </div>
            </div>

            <div className="glass-card rounded-xl p-3 text-[11px] text-[#74766d]">
              🔒 <strong>Prototype Notice:</strong> No external verification email is sent. Your session is stored locally and can be exported or reset at any time.
            </div>
          </div>

          <button
            type="submit"
            className="primary-action h-12 w-full rounded-2xl text-sm font-bold mt-4"
          >
            Verify & Continue →
          </button>
        </form>
      )}

      {/* =================================================================
          SCREEN 3 — WHAT MATTERS TO YOU?
         ================================================================= */}
      {step === 3 && (
        <div className="flex flex-1 flex-col justify-between animate-fade-in">
          <div className="space-y-2.5">
            <span className="eyebrow">Your Priority · Step 3</span>
            <h1 className="text-xl font-extrabold tracking-tight">
              Hi {piState.profile.nickname || nickname || 'Alex'}, what's on your mind about money?
            </h1>
            <p className="text-secondary text-xs">
              Choose what feels most important right now.
            </p>

            <div className="space-y-1.5 pt-1">
              {CONCERN_OPTIONS.map((opt) => {
                const selected = selectedConcern === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedConcern(opt.id)}
                    className={`glass-card flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition ${
                      selected
                        ? 'ring-2 ring-[#386641] bg-white/90 text-[#272e23]'
                        : 'hover:bg-white/65'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`flex size-5 items-center justify-center rounded-full text-[11px] ${
                        selected
                          ? 'bg-[#386641] text-white'
                          : 'border border-black/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Conditional Specific Savings Goal Fields */}
            {selectedConcern === 'specific_goal' && (
              <div className="glass-card rounded-xl p-3 space-y-2 border border-[#386641]/40 animate-fade-in">
                <p className="text-[11px] font-bold uppercase text-[#386641]">
                  Specific Savings Goal (Optional Details)
                </p>
                <input
                  type="text"
                  value={specGoalName}
                  onChange={(e) => setSpecGoalName(e.target.value)}
                  placeholder="Goal name (e.g. New Laptop, Summer Deposit)"
                  className="vela-input"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={specGoalAmount}
                    onChange={(e) => setSpecGoalAmount(e.target.value)}
                    placeholder="Target Amt"
                    className="vela-input"
                  />
                  <select
                    value={specGoalCurrency}
                    onChange={(e) => setSpecGoalCurrency(e.target.value)}
                    className="vela-input"
                  >
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="HUF">HUF</option>
                    <option value="KGS">KGS</option>
                  </select>
                  <input
                    type="date"
                    value={specGoalDate}
                    onChange={(e) => setSpecGoalDate(e.target.value)}
                    className="vela-input text-[11px]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-bold uppercase text-[#74766d] block mb-1">
                Anything else on your mind? (optional)
              </label>
              <input
                type="text"
                value={concernNotes}
                onChange={(e) => setConcernNotes(e.target.value)}
                placeholder="Optional note..."
                className="vela-input"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleScreen3Continue}
            className="primary-action h-12 w-full rounded-2xl text-sm font-bold mt-3"
          >
            Got it. Let's see where your money lives →
          </button>
        </div>
      )}

      {/* =================================================================
          SCREEN 4 — YOUR ACCOUNTS (MULTI-BANK & MULTI-CURRENCY)
         ================================================================= */}
      {step === 4 && (
        <div className="flex flex-1 flex-col justify-between animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Your Accounts · Step 4</span>
              <span className="text-[11px] font-bold text-[#386641]">
                {snapshot.accountSummaries.length} saved
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Where do you keep your money?
            </h1>
            <p className="text-secondary text-xs">
              Start with the account you use most. Add Wise, Revolut, OTP, MBANK or others now or later.
            </p>

            {/* Saved Accounts List */}
            {snapshot.accountSummaries.length === 0 ? (
              <div className="glass-card rounded-2xl p-5 text-center space-y-2">
                <p className="text-sm font-bold">No bank accounts added yet</p>
                <p className="text-xs text-[#74766d]">
                  Add your first account below, or skip and add it later.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {snapshot.accountSummaries.map((as) => (
                  <div
                    key={as.account.id}
                    className="glass-card rounded-2xl p-3 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-[#272e23]">
                            {as.account.name}
                          </h3>
                          {as.account.isPrimary && (
                            <span className="rounded bg-[#386641] text-white px-1.5 py-0.5 text-[9px] font-bold uppercase">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#74766d]">
                          {as.account.institution} · {as.account.currency} ·{' '}
                          {as.latestBalance !== null
                            ? `${as.account.currency} ${as.latestBalance.amount.toLocaleString()}`
                            : 'Balance not set'}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        {!as.account.isPrimary && (
                          <button
                            type="button"
                            onClick={() => setPrimaryAccount(as.account.id)}
                            className="rounded-lg bg-white/60 px-2 py-1 text-[10px] font-semibold hover:bg-white"
                          >
                            Set Primary
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAccount(as.account);
                            setEditingAccountBalance(as.latestBalance?.amount ?? null);
                            setAccountModalOpen(true);
                          }}
                          className="rounded-lg bg-white/80 px-2.5 py-1 text-[11px] font-bold text-[#272e23]"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      {as.account.purposes.map((p) => (
                        <span
                          key={p}
                          className="rounded-md bg-white/70 border border-white px-2 py-0.5 text-[10px] font-semibold text-[#272e23]"
                        >
                          {p.replace('_', ' ')}
                        </span>
                      ))}
                      {as.account.fundsOwnership !== 'personal' && (
                        <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                          {as.account.fundsOwnership.replace('_', ' ')} funds
                          {as.personalAccessibleBalance !== null
                            ? ` (Personal: ${as.account.currency} ${as.personalAccessibleBalance.toLocaleString()})`
                            : ' (Personal share unconfirmed)'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setEditingAccount(null);
                setEditingAccountBalance(null);
                setAccountModalOpen(true);
              }}
              className="secondary-action h-11 w-full rounded-xl border-dashed text-xs font-bold"
            >
              + {snapshot.accountSummaries.length > 0 ? 'Add another account' : 'Add your first account'}
            </button>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="primary-action h-12 w-full rounded-2xl text-sm font-bold mt-4"
          >
            That's all for now → Understand Income
          </button>
        </div>
      )}

      {/* =================================================================
          SCREEN 5 — YOUR INCOME (MULTIPLE INCOME SOURCES)
         ================================================================= */}
      {step === 5 && (
        <div className="flex flex-1 flex-col justify-between animate-fade-in">
          <div className="space-y-3">
            <span className="eyebrow">Your Income · Step 5</span>
            <h1 className="text-xl font-extrabold tracking-tight">
              What money comes in regularly?
            </h1>
            <p className="text-secondary text-xs">
              Tell Vela about your salaries, stipends, freelance, or transfers.
            </p>

            {/* Income Sources List */}
            {piState.incomes.length === 0 ? (
              <div className="glass-card rounded-2xl p-4 text-center space-y-1">
                <p className="text-xs font-bold">No income sources listed</p>
                <p className="text-[11px] text-[#74766d]">
                  You can finish without declaring income or add it below.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {piState.incomes.map((inc) => (
                  <div
                    key={inc.id}
                    className="glass-card flex items-center justify-between rounded-xl p-3"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#272e23]">{inc.name}</p>
                      <p className="text-[10px] text-[#74766d]">
                        {inc.pattern} · {inc.frequency} · next: {inc.nextExpectedDate || 'unknown'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#386641]">
                        {inc.estimatedMonthlyAmount !== null
                          ? `${inc.currency} ${inc.estimatedMonthlyAmount.toLocaleString()}/mo`
                          : 'Variable'}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteIncomeSource(inc.id)}
                        className="text-red-700 font-bold text-xs"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inline Add Income Drawer */}
            {!showAddIncomeForm ? (
              <button
                type="button"
                onClick={() => setShowAddIncomeForm(true)}
                className="secondary-action h-11 w-full rounded-xl border-dashed text-xs font-bold"
              >
                + Add an Income Source
              </button>
            ) : (
              <form onSubmit={handleAddIncomeInline} className="glass-card rounded-2xl p-3.5 space-y-2.5 animate-fade-in">
                <h3 className="text-xs font-bold uppercase text-[#386641]">New Income Source</h3>
                <div>
                  <input
                    type="text"
                    value={incName}
                    onChange={(e) => setIncName(e.target.value)}
                    placeholder="e.g. University Stipend or Salary"
                    className="vela-input"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={incAmount}
                    onChange={(e) => setIncAmount(e.target.value)}
                    placeholder="Monthly Amount"
                    className="vela-input"
                    required
                  />
                  <select
                    value={incCurrency}
                    onChange={(e) => setIncCurrency(e.target.value)}
                    className="vela-input"
                  >
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="HUF">HUF</option>
                    <option value="KGS">KGS</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={incType}
                    onChange={(e) => setIncType(e.target.value as any)}
                    className="vela-input text-xs"
                  >
                    <option value="salary">Salary</option>
                    <option value="scholarship">Stipend / Grant</option>
                    <option value="freelance">Freelance</option>
                    <option value="part_time">Part-time</option>
                    <option value="business">Business</option>
                    <option value="other">Other</option>
                  </select>
                  <select
                    value={incPattern}
                    onChange={(e) => setIncPattern(e.target.value as any)}
                    className="vela-input text-xs"
                  >
                    <option value="regular">Regular</option>
                    <option value="irregular">Irregular</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="primary-action h-10 flex-1 rounded-xl text-xs font-bold"
                  >
                    Save Income Source
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddIncomeForm(false)}
                    className="secondary-action h-10 px-3 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="primary-action h-12 w-full rounded-2xl text-sm font-bold mt-4"
          >
            Continue → Understand Commitments
          </button>
        </div>
      )}

      {/* =================================================================
          SCREEN 6 — YOUR COMMITMENTS (ESSENTIALS, BILLS & DEBTS)
         ================================================================= */}
      {step === 6 && (
        <div className="flex flex-1 flex-col justify-between animate-fade-in">
          <div className="space-y-3">
            <span className="eyebrow">Your Commitments · Step 6</span>
            <h1 className="text-xl font-extrabold tracking-tight">
              What money is already committed?
            </h1>
            <p className="text-secondary text-xs">
              Knowing what you MUST spend helps Vela compute your safe-to-spend balance.
            </p>

            {/* Section A: Essential Expenses Estimate */}
            <div className="glass-card rounded-2xl p-3.5 space-y-2">
              <label className="text-xs font-bold text-[#272e23] block">
                A. Monthly Essential Living Expenses (Rent, Food, Utilities)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={essentialAmt}
                  onChange={(e) => setEssentialAmt(e.target.value)}
                  placeholder="e.g. 800"
                  className="vela-input col-span-2"
                />
                <select
                  value={essentialCcy}
                  onChange={(e) => setEssentialCcy(e.target.value)}
                  className="vela-input"
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="HUF">HUF</option>
                  <option value="KGS">KGS</option>
                </select>
              </div>
              <input
                type="text"
                value={essentialNotes}
                onChange={(e) => setEssentialNotes(e.target.value)}
                placeholder="What does this include? (e.g. Rent, internet, power)"
                className="vela-input text-xs"
              />
            </div>

            {/* Section B: Upcoming Bills */}
            <div className="glass-card rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#272e23]">
                  B. Specific Upcoming Bills ({piState.obligations.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingObligation(null);
                    setObligationModalOpen(true);
                  }}
                  className="text-xs font-bold text-[#386641] underline"
                >
                  + Add Bill
                </button>
              </div>

              {piState.obligations.length === 0 ? (
                <p className="text-[11px] text-[#74766d]">No bills listed yet.</p>
              ) : (
                <div className="space-y-1.5">
                  {piState.obligations.map((obl) => (
                    <div
                      key={obl.id}
                      className="flex items-center justify-between rounded-xl bg-white/70 px-2.5 py-1.5 text-xs"
                    >
                      <div>
                        <span className="font-bold">{obl.name}</span>
                        <span className="text-[10px] text-[#74766d] ml-1.5">
                          (Due {obl.dueDate})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">
                          {obl.currency} {obl.amount.toFixed(0)}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingObligation(obl);
                            setObligationModalOpen(true);
                          }}
                          className="text-[10px] underline font-semibold text-[#386641]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteObligation(obl.id)}
                          className="text-[10px] text-red-700 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section C: Debts */}
            <div className="glass-card rounded-2xl p-3 space-y-2">
              <p className="text-xs font-bold text-[#272e23]">
                C. Do you currently owe money?
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { val: 'no', label: 'No' },
                    { val: 'yes', label: 'Yes' },
                    { val: 'not_sure', label: 'Add later' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setDebtQuestionAnswer(opt.val)}
                    className={`rounded-lg py-1.5 text-xs font-bold border ${
                      piState.onboarding.debtQuestionAnswer === opt.val
                        ? 'bg-[#386641] text-white border-[#386641]'
                        : 'bg-white/60 text-[#272e23] border-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {piState.onboarding.debtQuestionAnswer === 'yes' && (
                <div className="space-y-2 pt-1">
                  {piState.debts.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-xl bg-white/70 px-2.5 py-1.5 text-xs"
                    >
                      <div>
                        <span className="font-bold">{d.name}</span>
                        <span className="text-[10px] text-[#74766d] ml-1.5">
                          ({d.debtType.replace('_', ' ')})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {d.remainingBalance !== null
                            ? `${d.currency} ${d.remainingBalance.toFixed(0)}`
                            : 'Balance Unknown'}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteDebt(d.id)}
                          className="text-red-700 font-bold text-xs"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}

                  {!showAddDebtForm ? (
                    <button
                      type="button"
                      onClick={() => setShowAddDebtForm(true)}
                      className="secondary-action h-8 w-full rounded-lg border-dashed text-[11px] font-bold"
                    >
                      + Add Debt / Credit Card
                    </button>
                  ) : (
                    <form onSubmit={handleAddDebtInline} className="space-y-2 rounded-xl bg-white/80 p-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={debtType}
                          onChange={(e) => setDebtType(e.target.value as DebtType)}
                          className="vela-input !h-8 text-xs"
                        >
                          <option value="credit_card">Credit card</option>
                          <option value="student_loan">Student loan</option>
                          <option value="personal_loan">Personal loan</option>
                          <option value="overdraft">Overdraft</option>
                          <option value="family_loan">Family loan</option>
                        </select>
                        <input
                          type="text"
                          value={debtName}
                          onChange={(e) => setDebtName(e.target.value)}
                          placeholder="Name (optional)"
                          className="vela-input !h-8 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="number"
                          disabled={debtBalanceUnknown}
                          value={debtBalanceStr}
                          onChange={(e) => setDebtBalanceStr(e.target.value)}
                          placeholder="Balance"
                          className="vela-input !h-8 text-xs"
                        />
                        <input
                          type="number"
                          step="0.1"
                          value={debtAprStr}
                          onChange={(e) => setDebtAprStr(e.target.value)}
                          placeholder="APR % (opt)"
                          className="vela-input !h-8 text-xs"
                        />
                        <input
                          type="number"
                          value={debtMinPayStr}
                          onChange={(e) => setDebtMinPayStr(e.target.value)}
                          placeholder="Min pay (opt)"
                          className="vela-input !h-8 text-xs"
                        />
                      </div>
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold">
                        <input
                          type="checkbox"
                          checked={debtBalanceUnknown}
                          onChange={(e) => setDebtBalanceUnknown(e.target.checked)}
                        />
                        <span>Remaining balance is unknown right now (store as null)</span>
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="primary-action h-8 flex-1 rounded-lg text-xs font-bold"
                        >
                          Save Debt
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddDebtForm(false)}
                          className="secondary-action h-8 px-3 rounded-lg text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleScreen6Continue}
            className="primary-action h-12 w-full rounded-2xl text-sm font-bold mt-4"
          >
            Almost there → Connect Statements
          </button>
        </div>
      )}

      {/* =================================================================
          SCREEN 7 — LET VELA CONNECT THE DOTS (STATEMENTS CSV)
         ================================================================= */}
      {step === 7 && (
        <div className="flex flex-1 flex-col justify-between animate-fade-in">
          <div className="space-y-3">
            <span className="eyebrow">Connect Statements · Step 7</span>
            <h1 className="text-xl font-extrabold tracking-tight">
              Let Vela connect the dots
            </h1>
            <p className="text-secondary text-xs">
              Upload bank statement files (CSV) so Vela can uncover subscriptions, internal transfers, and real spending patterns.
            </p>

            {/* Per-Account Statement Upload Cards */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {snapshot.accountSummaries.map((as) => {
                const acctStmts = snapshot.statements.filter(
                  (s) => s.accountId === as.account.id
                );

                return (
                  <div
                    key={as.account.id}
                    className="glass-card rounded-2xl p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-[#272e23]">
                          {as.account.name} ({as.account.currency})
                        </h3>
                        <p className="text-[10px] text-[#74766d]">
                          {as.account.institution} · {acctStmts.length} statement(s)
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setUploadModalAccountId(as.account.id)}
                        className="rounded-xl bg-[#386641] text-white px-3 py-1.5 text-xs font-bold shadow-2xs hover:opacity-90"
                      >
                        + Upload CSV
                      </button>
                    </div>

                    {acctStmts.length === 0 ? (
                      <div className="rounded-xl bg-white/40 border border-white/60 p-2 text-center text-[11px] text-[#74766d]">
                        <span>No statements uploaded yet. </span>
                        {as.account.name.toLowerCase().includes('wise') && (
                          <button
                            type="button"
                            onClick={() =>
                              uploadStatementContent(
                                as.account.id,
                                'wise_october_sample.csv',
                                SAMPLE_WISE_CSV
                              )
                            }
                            className="font-bold text-[#386641] underline"
                          >
                            + Load Wise Oct Sample
                          </button>
                        )}
                        {as.account.name.toLowerCase().includes('revolut') && (
                          <button
                            type="button"
                            onClick={() =>
                              uploadStatementContent(
                                as.account.id,
                                'revolut_october_sample.csv',
                                SAMPLE_REVOLUT_CSV
                              )
                            }
                            className="font-bold text-[#386641] underline"
                          >
                            + Load Revolut Oct Sample
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {acctStmts.map((st) => (
                          <div
                            key={st.id}
                            className="rounded-xl bg-white/75 border border-white p-2 text-xs"
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span className="truncate max-w-[180px]">{st.fileName}</span>
                              <button
                                type="button"
                                onClick={() => deleteStatement(st.id)}
                                className="text-[10px] text-red-700 font-bold"
                              >
                                Remove
                              </button>
                            </div>
                            <p className="text-[10px] text-[#74766d] mt-0.5">
                              Status: <strong>{st.status.replace(/_/g, ' ')}</strong> ·{' '}
                              {st.transactionCount} txns ·{' '}
                              {st.periodStart
                                ? `${st.periodStart} to ${st.periodEnd}`
                                : 'No period'}
                            </p>
                            {st.errorMessage && (
                              <p className="text-[10px] text-red-800 mt-0.5">{st.errorMessage}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="glass-card rounded-xl p-2.5 text-[11px] text-[#74766d]">
              🛡️ <strong>You stay in control:</strong> Statements are parsed locally in your browser. Vela cannot move your money by importing a statement.
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="primary-action h-12 w-full rounded-2xl text-sm font-bold mt-3"
          >
            {snapshot.transactions.length > 0
              ? `See What Vela Found in Today (${snapshot.transactions.length} txns) →`
              : 'Finish & Open Today Dashboard →'}
          </button>
        </div>
      )}

      {/* Modals */}
      {accountModalOpen && (
        <AccountModal
          initialAccount={editingAccount}
          initialBalance={editingAccountBalance}
          onClose={() => setAccountModalOpen(false)}
        />
      )}
      {obligationModalOpen && (
        <ObligationModal
          initialObligation={editingObligation}
          onClose={() => setObligationModalOpen(false)}
        />
      )}
      {uploadModalAccountId && (
        <StatementUploadModal
          initialAccountId={uploadModalAccountId}
          onClose={() => setUploadModalAccountId(null)}
          onOpenReview={() => setReviewModalOpen(true)}
        />
      )}
      {reviewModalOpen && (
        <TransactionReviewModal onClose={() => setReviewModalOpen(false)} />
      )}
    </div>
  );
};
