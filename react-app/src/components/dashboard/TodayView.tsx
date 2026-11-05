import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePI } from '../../context/PIContext';
import {
  FinancialAccount,
  FinancialObligation,
  SpendingCategory,
  TransactionEconomicType,
  UserConfirmation,
} from '../../types/pi';
import { formatCurrency } from '../../services/snapshotBuilder';
import { RecommendationService } from '../../services/recommendationService';
import { AccountModal } from '../modals/AccountModal';
import {
  AddIncomeModal,
  UpdateBalanceModal,
  StatementUploadModal,
  ObligationModal,
  TransactionReviewModal,
} from '../modals/QuickActionModals';

export const TodayView: React.FC = () => {
  const navigate = useNavigate();
  const {
    snapshot,
    currentRecommendation,
    feedbackPending,
    recommendationSource,
    backendStatus,
    acceptCurrentRecommendation,
    completeRecommendationAllocation,
    adjustRecommendationAmount,
    declineCurrentRecommendation,
    answerUserConfirmation,
    deleteConfirmation,
    updateTransactionClassification,
    sendAssistantMessage,
  } = usePI();

  // Modal states
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedReserveAccountId, setSelectedReserveAccountId] = useState<string>(
    snapshot.accountSummaries.find((a) => a.account.isPrimary)?.account.id ||
      snapshot.accountSummaries[0]?.account.id ||
      ''
  );
  const [adjustValue, setAdjustValue] = useState<number>(
    currentRecommendation?.adjustedAmount ?? currentRecommendation?.suggestedAmount ?? 0
  );

  // Quick action & detail modals
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<FinancialAccount | null>(null);
  const [editingAccountBalance, setEditingAccountBalance] = useState<number | null>(null);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [statementModalOpen, setStatementModalOpen] = useState(false);
  const [obligationModalOpen, setObligationModalOpen] = useState(false);
  const [editingObligation, setEditingObligation] = useState<FinancialObligation | null>(null);
  const [txReviewModalOpen, setTxReviewModalOpen] = useState(false);

  // Edit confirmation / transaction modal
  const [editingConf, setEditingConf] = useState<UserConfirmation | null>(null);
  const [confEconomicType, setConfEconomicType] = useState<TransactionEconomicType>('internal_transfer');
  const [confCategory, setConfCategory] = useState<SpendingCategory>('transfer');

  const primaryCash = snapshot.primaryCurrencySummary;
  const secondaryCurrencies = snapshot.currencySummaries.filter(
    (c) => c.currency !== primaryCash.currency
  );

  const activeAmount =
    currentRecommendation?.adjustedAmount ??
    currentRecommendation?.suggestedAmount ??
    0;

  const isCushionAction = recommendationSource === 'backend'
    ? currentRecommendation?.finAgentMeta?.catalogActionId === 'A007'
    : currentRecommendation?.actionType === 'allocate_safety_cushion';
  const isFinancialAction = recommendationSource === 'backend'
    ? currentRecommendation?.finAgentMeta?.catalogActionType === 'FINANCIAL_ACTION'
    : isCushionAction;
  const controls = RecommendationService.controls(currentRecommendation);
  const actionCurrency = currentRecommendation?.currency || snapshot.baseCurrency;
  const allocationGoal = snapshot.goals.find((goal) => goal.id === currentRecommendation?.targetGoalId);
  const verificationId = currentRecommendation?.finAgentMeta?.catalogActionId;
  const verificationLabel = verificationId === 'A014' ? 'Review transactions' : verificationId === 'A004' || verificationId === 'A016' ? 'Upload statement' : verificationId === 'A009' ? 'Update financial details' : 'Review financial details';
  const openVerification = () => {
    if (verificationId === 'A014') setTxReviewModalOpen(true);
    else if (verificationId === 'A004' || verificationId === 'A016') setStatementModalOpen(true);
    else navigate('/my-plan');
  };
  const canComplete = currentRecommendation?.status === 'accepted' || currentRecommendation?.status === 'adjusted';
  const feedbackDisabled = feedbackPending !== null || (recommendationSource === 'backend' && backendStatus !== 'online') || backendStatus === 'checking';
  const presentation = currentRecommendation ? RecommendationService.presentation(currentRecommendation) : null;

  const safetyGoal = snapshot.safetyCushionGoal;
  const currentCushion = snapshot.safetyCushionAllocated;

  const handleOpenReserveSheet = () => {
    const defaultAcc =
      snapshot.accountSummaries.find(
        (a) =>
          a.account.currency === (actionCurrency) &&
          a.account.isPrimary
      ) ||
      snapshot.accountSummaries.find(
        (a) => a.account.currency === (actionCurrency)
      ) ||
      snapshot.accountSummaries[0];
    if (defaultAcc) {
      setSelectedReserveAccountId(recommendationSource === 'backend' ? currentRecommendation?.sourceAccountId || defaultAcc.account.id : defaultAcc.account.id);
    }
    setShowReserveModal(true);
  };

  const handleConfirmReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReserveAccountId) return;
    if (await completeRecommendationAllocation(activeAmount, selectedReserveAccountId)) setShowReserveModal(false);
  };

  const handleConfirmAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adjustValue > 0) {
      if (await adjustRecommendationAmount(adjustValue)) setShowAdjustModal(false);
    }
  };

  const handleAskAssistantAboutRec = () => {
    sendAssistantMessage('Why are you recommending this next step right now?');
    navigate('/assistant');
  };

  const handleOpenEditConfirmation = (conf: UserConfirmation) => {
    const cls = snapshot.classifications[conf.subjectId];
    setEditingConf(conf);
    setConfEconomicType(cls?.economicType || (conf.subjectType === 'transfer' ? 'internal_transfer' : 'expense'));
    setConfCategory(cls?.category || (conf.subjectType === 'transfer' ? 'transfer' : 'subscriptions'));
  };

  const handleSaveEditConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConf) return;
    updateTransactionClassification(editingConf.subjectId, confEconomicType, confCategory);
    answerUserConfirmation(editingConf.id, 'yes');
    setEditingConf(null);
  };

  const getObligationIcon = (category: FinancialObligation['category']) => {
    if (category === 'rent') return './assets/19d64.svg';
    if (category === 'energy') return './assets/9e815.svg';
    if (category === 'internet') return './assets/f5533.svg';
    return './assets/19d64.svg';
  };

  const readinessShortLabel =
    snapshot.readinessState === 'state_a_action_ready'
      ? 'State A · Action Ready'
      : snapshot.readinessState === 'state_b_clarification_needed'
      ? 'State B · Needs Check'
      : 'State C · Limited Data';

  return (
    <div className="space-y-4 pb-6">
      <p role="status" className="mb-3 text-[11px] text-[#74766d]">
        {recommendationSource === 'backend'
          ? `Backend recommendation · ${backendStatus === 'online' ? 'connected' : backendStatus === 'checking' ? 'refreshing' : 'currently unavailable; feedback requires connection'}`
          : `Local prototype suggestion · ${backendStatus === 'checking' ? 'checking backend' : 'offline; no server scoring or robustness evaluation'}`}
      </p>
      {/* Greeting & Readiness Pill */}
      <div className="flex items-center justify-between px-0.5">
        <div>
          <p className="text-[12px] font-medium text-[#74766d]">
            Hello, {snapshot.profile.nickname || 'Alex'} ·{' '}
            {snapshot.accountSummaries.length}{' '}
            {snapshot.accountSummaries.length === 1 ? 'account' : 'accounts'} tracked
          </p>
        </div>
        <button
          type="button"
          onClick={() => setTxReviewModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-2.5 py-1 text-[10px] font-semibold text-[#272e23] border border-white/80 shadow-xs"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              snapshot.readinessState === 'state_a_action_ready'
                ? 'bg-[#386641]'
                : snapshot.readinessState === 'state_b_clarification_needed'
                ? 'bg-amber-600'
                : 'bg-stone-500'
            }`}
          />
          {readinessShortLabel} · {snapshot.transactions.length} txns
        </button>
      </div>

      {/* SECTION 1: ONE NEXT STEP RECOMMENDATION CARD */}
      <section
        aria-labelledby="recommended-step-title"
        className="glass-card recommendation-card rounded-[24px] p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <img
              src="./assets/550e0.svg"
              alt=""
              aria-hidden="true"
              className="glass-icon h-3.5 w-3.5"
            />
            <span className="eyebrow">Recommended Step</span>
          </div>

          <div className="flex items-center gap-1.5">
            {currentRecommendation && (
              <span className="priority-badge rounded-[14px] px-2.5 py-1 text-[10px] leading-[15px] font-semibold text-[#386641]">
                {currentRecommendation.priority === 'priority'
                  ? 'Priority'
                  : currentRecommendation.priority === 'suggested'
                  ? 'Suggested'
                  : 'Clarification'}
              </span>
            )}
            <button
              type="button"
              onClick={handleAskAssistantAboutRec}
              title="Ask Vela Assistant why this is recommended"
              className="icon-button flex h-7 w-7 items-center justify-center rounded-full bg-white/55 border border-white/80"
            >
              <img
                src="./assets/aed26.svg"
                alt="Ask Assistant"
                className="glass-icon h-3.5 w-3.5"
              />
            </button>
          </div>
        </div>

        {/* Recommendation Content based on Status */}
        {!currentRecommendation || currentRecommendation.status === 'declined' ? (
          <div className="mt-3">
            <h1
              id="recommended-step-title"
              className="text-[18px] leading-[24px] font-bold tracking-[-0.35px] text-[#272e23]"
            >
              {snapshot.accountSummaries.length === 0
                ? 'Add your first bank account to unlock your next step'
                : !currentRecommendation ? 'A current recommendation needs a fresh server review' : 'You dismissed the current step for now'}
            </h1>
            <p className="mt-1.5 text-[13px] leading-[19px] text-[#74766d]">
              {snapshot.accountSummaries.length === 0
                ? 'Tell Vela where you keep your money so we can calculate your safe-to-spend balance.'
                : !currentRecommendation ? 'Refresh Today when the server is connected. Previous actions are hidden until the current financial data is validated.' : 'Your finances are tracked. Review your financial details in My Plan.'}
            </p>
            <div className="mt-4 flex gap-2">
              {snapshot.accountSummaries.length === 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAccount(null);
                    setEditingAccountBalance(null);
                    setAccountModalOpen(true);
                  }}
                  className="primary-action rounded-[16px] px-4 py-2.5 text-[12px] font-semibold"
                >
                  + Add First Account
                </button>

              ) : null}
              <button
                type="button"
                onClick={() => navigate('/my-plan')}
                className="secondary-action rounded-[16px] px-4 py-2.5 text-[12px] font-semibold"
              >
                Open My Plan
              </button>
            </div>
          </div>
        ) : currentRecommendation.status === 'completed' ? (
          <div className="mt-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#386641]/12 px-2.5 py-0.5 text-[11px] font-bold text-[#386641]">
              ✓ Completed Today
            </div>
            <h1
              id="recommended-step-title"
              className="mt-2 text-[19px] leading-[25px] font-bold tracking-[-0.4px] text-[#272e23]"
            >
              {isCushionAction ? `${formatCurrency(activeAmount, currentRecommendation.currency)} earmarked for your Safety Cushion` : currentRecommendation.title}
            </h1>
            {isCushionAction ? <p className="mt-1.5 text-[13px] leading-[19px] text-[#74766d]">
              Your Safety Cushion is now{' '}
              <strong className="font-semibold text-[#272e23]">
                {formatCurrency(currentCushion, primaryCash.currency)}
              </strong>
              . Because this is an internal Vela planning allocation, your total reported bank cash remains{' '}
              <strong className="font-semibold text-[#272e23]">
                {formatCurrency(primaryCash.totalReportedBalance, primaryCash.currency)}
              </strong>{' '}
              and your uncommitted safe-to-spend is{' '}
              <strong className="font-semibold text-[#386641]">
                {formatCurrency(primaryCash.uncommittedSafeToSpend, primaryCash.currency)}
              </strong>
              .
            </p> : <p className="mt-1.5 text-[13px] text-[#74766d]">Completion recorded. Review updated balances and commitments in My Plan.</p>}
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/my-plan')}
                className="primary-action flex-1 rounded-[16px] py-2.5 text-[12px] font-semibold"
              >
                View My Plan →
              </button>
              <button
                type="button"
                onClick={handleAskAssistantAboutRec}
                className="secondary-action rounded-[16px] px-3.5 py-2.5 text-[12px] font-semibold"
              >
                Ask Assistant
              </button>
            </div>
          </div>
        ) : (
          <>
            {currentRecommendation.status === 'accepted' && (
              <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-500/30">
                ⏳ Accepted · Pending Execution (Balances unchanged until completed)
              </div>
            )}

            <h1
              id="recommended-step-title"
              className="mt-3 max-w-[19rem] text-[20px] leading-[25px] font-bold tracking-[-0.45px] text-[#272e23]"
            >
              {presentation?.title}
            </h1>

            <p className="mt-2 max-w-[20rem] text-[13px] leading-[19.5px] font-normal text-[#74766d]">
              {presentation?.description}
            </p>

            {/* Impact Preview Pill */}
            {recommendationSource === 'local' && presentation?.showEvaluatedEffects && isCushionAction && safetyGoal && (
              <div className="mt-3 flex items-center justify-between rounded-[14px] bg-white/55 px-3.5 py-2 border border-white/80 text-[11px]">
                <span className="font-medium text-[#74766d]">Safety Cushion impact</span>
                <span className="font-bold text-[#386641]">
                  {formatCurrency(currentCushion, actionCurrency)} → {formatCurrency(currentCushion + activeAmount, actionCurrency)}
                  {safetyGoal.targetAmount ? ` / ${formatCurrency(safetyGoal.targetAmount, safetyGoal.currency)}` : ''}
                </span>
              </div>
            )}

            {/* Reasoning note */}
            {presentation?.reasoning && (
              <p className="mt-2 rounded-xl bg-white/45 px-3 py-1.5 text-[11px] leading-[16px] text-[#74766d] border border-white/60">
                <strong className="font-semibold text-[#272e23]">Why now: </strong>
                {presentation.reasoning}
              </p>
            )}

            {/* FinAgent Decision Engine & AS Provenance Pill (Review Points 6 & 9) */}
            {recommendationSource === 'backend' && currentRecommendation.finAgentMeta && (
              <div className="mt-2 rounded-xl bg-white/55 px-3 py-2 text-[10px] leading-[15px] text-[#4a4235] border border-white/75 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-[#272e23]">
                    Catalog {currentRecommendation.finAgentMeta.catalogActionId} ·{' '}
                    {currentRecommendation.finAgentMeta.catalogActionType}
                  </span>
                  <span className="rounded-md bg-[#386641]/10 px-1.5 py-0.5 font-semibold text-[#386641]">
                    {currentRecommendation.finAgentMeta.dataQualityStatus} ·{' '}
                    {currentRecommendation.finAgentMeta.policyVersion}
                  </span>
                </div>
                {currentRecommendation.status !== 'adjusted' && currentRecommendation.finAgentMeta.score !== null && (
                  <p className="text-[#74766d]">
                    Profile:{' '}
                    <strong className="text-[#272e23]">
                      {currentRecommendation.finAgentMeta.weightProfileId}
                    </strong>{' '}
                    · Score F017:{' '}
                    <strong className="text-[#272e23]">
                      {currentRecommendation.finAgentMeta.score.toFixed(3)}
                    </strong>{' '}
                    · Complexity F016:{' '}
                    <strong className="text-[#272e23]">
                      {currentRecommendation.finAgentMeta.complexity?.toFixed(2)}
                    </strong>{' '}
                    · Stability F018:{' '}
                    <strong className="text-[#386641]">
                      {currentRecommendation.finAgentMeta.stability === null ? 'Not evaluated' : `${Math.round(currentRecommendation.finAgentMeta.stability * 100)}%`}
                    </strong>
                  </p>
                )}
                {currentRecommendation.status === 'adjusted' && (
                  <p>Amount adjusted; original evaluation scores are hidden until a new review.</p>
                )}
                <p className="text-[#74766d]">
                  AS Sources: {currentRecommendation.finAgentMeta.sourceIds.join(', ')} · Rules:{' '}
                  {currentRecommendation.finAgentMeta.ruleIds.join(', ')}
                </p>
              </div>
            )}

            <fieldset disabled={feedbackDisabled} className="mt-4 flex flex-wrap items-center justify-between gap-2 disabled:opacity-60">
              {isFinancialAction ? (
                <>
                  {!canComplete && (
                    <button type="button" onClick={acceptCurrentRecommendation} className="secondary-action min-h-[42px] rounded-[18px] px-3 py-2.5 text-[12px] font-semibold">Accept</button>
                  )}
                  {canComplete && (
                    <button type="button" onClick={() => controls.allocation ? handleOpenReserveSheet() : completeRecommendationAllocation(activeAmount, '')} className="primary-action min-h-[42px] flex-1 rounded-[18px] px-4 py-2.5 text-[12px] font-semibold">
                      {controls.completionLabel}
                    </button>
                  )}
                  {controls.adjustable && currentRecommendation.suggestedAmount !== null && currentRecommendation.suggestedAmount > 0 && (
                    <button type="button" onClick={() => { setAdjustValue(activeAmount); setShowAdjustModal(true); }} className="secondary-action min-h-[42px] rounded-[18px] px-3 py-2.5 text-[12px] font-semibold">Adjust</button>
                  )}
                  <button type="button" onClick={declineCurrentRecommendation} className="quiet-action min-h-[42px] rounded-[18px] px-2.5 py-2.5 text-[12px]">Not now</button>
                </>
              ) : (
                <>
                  <button type="button" onClick={openVerification} className="primary-action min-h-[42px] flex-1 rounded-[18px] px-4 py-2.5 text-[12px] font-semibold">{verificationLabel}</button>
                  <button type="button" onClick={() => setStatementModalOpen(true)} className="secondary-action min-h-[42px] rounded-[18px] px-3.5 py-2.5 text-[12px] font-semibold">Upload CSV</button>
                  <button type="button" onClick={declineCurrentRecommendation} className="quiet-action min-h-[42px] rounded-[18px] px-2.5 py-2.5 text-[12px]">Not now</button>
                </>
              )}
              {feedbackPending && <span role="status" className="text-xs">Saving {feedbackPending}…</span>}
            </fieldset>
          </>
        )}
      </section>

      {/* SECTION 2: YOUR FINANCIAL PICTURE — HERE'S WHAT VELA FOUND */}
      <section aria-labelledby="financial-picture-title" className="glass-card rounded-[24px] p-5 space-y-3">
        <div>
          <span className="eyebrow block">Your Financial Picture</span>
          <h2 id="financial-picture-title" className="text-xl font-extrabold tracking-tight text-[#272e23] mt-0.5">
            Here's what Vela found
          </h2>
        </div>

        {/* 3 Overview Stat Tiles */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white/60 p-3 text-center border border-white/80 shadow-2xs">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#74766d]">Observed Spend</p>
            <p className="text-lg font-extrabold text-[#272e23] mt-0.5">
              {formatCurrency(snapshot.observedSpendingTotal, snapshot.baseCurrency)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/60 p-3 text-center border border-white/80 shadow-2xs">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#74766d]">Subscriptions</p>
            <p className="text-lg font-extrabold text-amber-800 mt-0.5">
              {formatCurrency(snapshot.observedSubscriptionsTotal, snapshot.baseCurrency)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/60 p-3 text-center border border-white/80 shadow-2xs">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#74766d]">Transfers Excl.</p>
            <p className="text-lg font-extrabold text-[#386641] mt-0.5">
              {formatCurrency(snapshot.observedInternalTransfersTotal, snapshot.baseCurrency)}
            </p>
          </div>
        </div>

        {/* Coverage Note Banner */}
        <div className="rounded-xl bg-[#ddcdb3]/25 border border-[#ddcdb3]/60 px-3.5 py-2.5 text-[11px] leading-[16px] text-[#4a4235]">
          📌 <strong>Coverage note:</strong> 1 month of history is imported ({snapshot.dataQuality.accountsWithStatements} of {snapshot.dataQuality.totalAccounts} accounts). Vela treats these as observed period figures rather than permanent monthly averages.
        </div>

        {/* Impact-Based Confirmations Header */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#74766d]">
              Impact-Based Confirmations ({snapshot.confirmations.length})
            </span>
            <button
              type="button"
              onClick={() => setTxReviewModalOpen(true)}
              className="text-[11px] font-bold text-[#386641] hover:underline"
            >
              Inspect all {snapshot.transactions.length} txns
            </button>
          </div>

          {snapshot.confirmations.length === 0 ? (
            <div className="rounded-2xl bg-white/50 p-4 text-center border border-white/80">
              <p className="text-xs font-semibold text-[#386641]">
                ✓ All findings have been confirmed or verified!
              </p>
              <p className="text-[11px] text-[#74766d] mt-0.5">
                Upload new statements or add bills to discover more opportunities.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {snapshot.confirmations.map((conf) => {
                const isApproved = conf.userResponse === 'yes';
                return (
                  <div
                    key={conf.id}
                    className="rounded-2xl bg-white/70 border border-white/90 p-3.5 space-y-2 shadow-2xs transition"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#74766d]">
                      <span className="uppercase tracking-wider rounded bg-black/5 px-1.5 py-0.5">
                        {conf.subjectType}
                      </span>
                      <span className="font-semibold text-[#272e23]">{conf.amountLabel}</span>
                    </div>

                    <h4 className="text-[13px] font-bold text-[#272e23] leading-snug">
                      {conf.questionText}
                    </h4>

                    <p className="text-[11px] text-[#74766d] leading-relaxed">
                      {conf.impactReason}
                    </p>

                    {/* Action Buttons: Edit / Approve / Delete */}
                    <div className="flex items-center gap-2 pt-1 border-t border-black/5">
                      <button
                        type="button"
                        onClick={() => answerUserConfirmation(conf.id, 'yes')}
                        className={`h-9 flex-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                          isApproved
                            ? 'bg-[#386641]/20 text-[#386641] border border-[#386641]/30 font-extrabold'
                            : 'bg-[#386641] text-white hover:opacity-90 shadow-2xs'
                        }`}
                      >
                        {isApproved ? '✓ Approved' : 'Approve'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEditConfirmation(conf)}
                        className="secondary-action h-9 flex-1 rounded-xl text-xs font-bold"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteConfirmation(conf.id)}
                        className="h-9 px-3 rounded-xl border border-red-300 bg-red-500/10 text-xs font-bold text-red-800 hover:bg-red-500/20 transition"
                        title="Delete / dismiss this confirmation"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: MULTI-CURRENCY AVAILABLE BALANCE & SAFE-TO-SPEND CARD */}
      <section aria-labelledby="available-balance-title" className="glass-card rounded-[24px] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span id="available-balance-title" className="eyebrow block">
              Available Personal Cash ({primaryCash.currency})
            </span>
            <p className="mt-1 text-[28px] leading-[34px] font-bold tracking-[-0.7px] text-[#272e23]">
              {formatCurrency(primaryCash.personalAccessibleCash, primaryCash.currency, true)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingAccount(null);
              setEditingAccountBalance(null);
              setAccountModalOpen(true);
            }}
            className="secondary-action rounded-xl px-2.5 py-1.5 text-[11px] font-semibold"
          >
            + Account
          </button>
        </div>

        {/* Breakdown of Primary Currency */}
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-[16px] bg-white/45 p-2.5 border border-white/75 text-center">
          <div>
            <span className="block text-[10px] text-[#74766d]">Upcoming Bills</span>
            <span className="mt-0.5 block text-[12px] font-bold text-[#272e23]">
              {formatCurrency(primaryCash.upcomingUnpaidObligations, primaryCash.currency)}
            </span>
          </div>
          <div className="border-x border-black/8">
            <span className="block text-[10px] text-[#74766d]">Earmarked Goals</span>
            <span className="mt-0.5 block text-[12px] font-bold text-[#386641]">
              {formatCurrency(primaryCash.allocatedToGoals, primaryCash.currency)}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-[#74766d]">Safe to Spend</span>
            <span className="mt-0.5 block text-[12px] font-bold text-[#386641]">
              {formatCurrency(primaryCash.uncommittedSafeToSpend, primaryCash.currency)}
            </span>
          </div>
        </div>

        {/* Per-Account List */}
        <div className="mt-3.5 space-y-2 border-t border-black/6 pt-3">
          <div className="flex items-center justify-between text-[11px] text-[#74766d]">
            <span>Your Accounts (tap to edit)</span>
            <span>Reported Balance</span>
          </div>

          {snapshot.accountSummaries.map((accView) => {
            const isMixed = accView.account.fundsOwnership !== 'personal';
            return (
              <button
                key={accView.account.id}
                type="button"
                onClick={() => {
                  setEditingAccount(accView.account);
                  setEditingAccountBalance(accView.latestBalance?.amount ?? null);
                  setAccountModalOpen(true);
                }}
                className="available-row flex w-full items-center justify-between rounded-[14px] px-3 py-2.5 text-left transition hover:bg-white/75"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-semibold text-[#272e23]">
                      {accView.account.institution} · {accView.account.name}
                    </span>
                    {accView.account.isPrimary && (
                      <span className="rounded-md bg-[#386641]/12 px-1.5 py-0.5 text-[9px] font-bold text-[#386641]">
                        Primary
                      </span>
                    )}
                    {isMixed && (
                      <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-amber-800">
                        Mixed/Work
                      </span>
                    )}
                  </div>
                  <span className="block text-[10px] text-[#74766d]">
                    {accView.statementCount > 0
                      ? `Verified CSV (${accView.transactionCount} txns) · as of ${
                          accView.latestBalance?.asOf || 'recent'
                        }`
                      : accView.latestBalance
                      ? `Balance as of ${accView.latestBalance.asOf}${
                          accView.isStale ? ' (Stale)' : ''
                        }`
                      : 'No balance date yet'}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="block text-[13px] font-bold text-[#272e23]">
                    {accView.latestBalance !== null
                      ? formatCurrency(accView.latestBalance.amount, accView.account.currency)
                      : 'Unknown'}
                  </span>
                  {isMixed && accView.personalAccessibleBalance !== null && (
                    <span className="block text-[10px] font-medium text-[#386641]">
                      Personal:{' '}
                      {formatCurrency(accView.personalAccessibleBalance, accView.account.currency)}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Secondary Currencies Summary Notice */}
        {secondaryCurrencies.length > 0 && (
          <div className="mt-3 rounded-[12px] bg-white/40 px-3 py-2 text-[11px] text-[#74766d] border border-white/65">
            <span className="font-semibold text-[#272e23]">Other currencies (kept separate): </span>
            {secondaryCurrencies.map((sc, i) => {
              const workPart = Math.max(0, sc.totalReportedBalance - sc.personalAccessibleCash);
              return (
                <span key={sc.currency}>
                  {i > 0 ? ' · ' : ''}
                  {formatCurrency(sc.personalAccessibleCash, sc.currency)} personal
                  {workPart > 0 ? ` (+${formatCurrency(workPart, sc.currency)} work buffer)` : ''}
                </span>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 4: 4 FUNCTIONAL QUICK ACTIONS */}
      <section aria-label="Quick actions" className="grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setIncomeModalOpen(true)}
          className="glass-card action-card flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[16px] px-2 py-3 text-center"
        >
          <span className="icon-tile flex h-8 w-8 items-center justify-center rounded-full">
            <img src="./assets/acd5f.svg" alt="" aria-hidden="true" className="glass-icon h-4 w-4" />
          </span>
          <span className="text-[11px] leading-[13.5px] font-medium text-[#272e23]">
            Add income
          </span>
        </button>

        <button
          type="button"
          onClick={() => setBalanceModalOpen(true)}
          className="glass-card action-card flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[16px] px-2 py-3 text-center"
        >
          <span className="icon-tile flex h-8 w-8 items-center justify-center rounded-full">
            <img src="./assets/b2246.svg" alt="" aria-hidden="true" className="glass-icon h-4 w-4" />
          </span>
          <span className="text-[11px] leading-[13.5px] font-medium text-[#272e23]">
            Update balance
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatementModalOpen(true)}
          className="glass-card action-card flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[16px] px-2 py-3 text-center"
        >
          <span className="icon-tile flex h-8 w-8 items-center justify-center rounded-full">
            <img src="./assets/9c3d3.svg" alt="" aria-hidden="true" className="glass-icon h-4 w-4" />
          </span>
          <span className="text-[11px] leading-[13.5px] font-medium text-[#272e23]">
            Upload Statement
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTxReviewModalOpen(true)}
          className="glass-card action-card flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[16px] px-2 py-3 text-center"
        >
          <span className="icon-tile flex h-8 w-8 items-center justify-center rounded-full">
            <img src="./assets/550e0.svg" alt="" aria-hidden="true" className="glass-icon h-4 w-4" />
          </span>
          <span className="text-[11px] leading-[13.5px] font-medium text-[#272e23]">
            Review ({snapshot.transactions.length})
          </span>
        </button>
      </section>

      {/* SECTION 5: UPCOMING OBLIGATIONS */}
      <section aria-labelledby="upcoming-obligations-title" className="pt-1">
        <div className="flex items-center justify-between px-1">
          <h2 id="upcoming-obligations-title" className="eyebrow">
            Upcoming Obligations
          </h2>
          <button
            type="button"
            onClick={() => {
              setEditingObligation(null);
              setObligationModalOpen(true);
            }}
            className="text-[11px] font-semibold text-[#386641] hover:underline"
          >
            + Add bill
          </button>
        </div>

        {snapshot.obligations.length === 0 ? (
          <div className="glass-card mt-2.5 rounded-[16px] p-4 text-center">
            <p className="text-[12px] text-[#74766d]">
              No recurring bills or obligations added yet.
            </p>
            <button
              type="button"
              onClick={() => {
                setEditingObligation(null);
                setObligationModalOpen(true);
              }}
              className="secondary-action mt-2 rounded-xl px-3 py-1.5 text-[11px] font-semibold"
            >
              + Add Your First Bill
            </button>
          </div>
        ) : (
          <div className="mt-2.5 space-y-2">
            {snapshot.obligations.map((item) => {
              const isPaid = item.status === 'paid';
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setEditingObligation(item);
                    setObligationModalOpen(true);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setEditingObligation(item);
                      setObligationModalOpen(true);
                    }
                  }}
                  className="glass-card flex items-center justify-between gap-3 rounded-[16px] px-3.5 py-3 transition hover:bg-white/65 cursor-pointer"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="icon-tile flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                      <img
                        src={getObligationIcon(item.category)}
                        alt=""
                        aria-hidden="true"
                        className="glass-icon h-3.5 w-3.5"
                      />
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p
                          className={`truncate text-[13px] leading-[17px] font-semibold ${
                            isPaid ? 'line-through text-[#74766d]' : 'text-[#272e23]'
                          }`}
                        >
                          {item.name}
                        </p>
                        <span className="rounded bg-black/5 px-1.5 py-0.5 text-[9px] font-medium text-[#74766d] capitalize">
                          {item.recurrence}
                        </span>
                      </div>
                      <p className="text-[11px] leading-[14px] font-normal text-[#74766d]">
                        {isPaid ? 'Paid this cycle ✓' : `Due ${item.dueDate}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <p
                      className={`text-[13px] leading-[17px] font-semibold ${
                        isPaid ? 'text-[#74766d]' : 'text-[#272e23]'
                      }`}
                    >
                      {formatCurrency(item.amount, item.currency, true)}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        isPaid
                          ? 'bg-[#386641]/15 text-[#386641]'
                          : 'bg-white/70 text-[#74766d]'
                      }`}
                    >
                      {isPaid ? 'Paid' : 'Edit'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* MODAL 1: RESERVE / EARMARK CONFIRMATION SHEET */}
      {showReserveModal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowReserveModal(false);
          }}
        >
          <div className="modal-sheet-container p-5">
            <div className="sheet-handle-bar" />
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">Confirm Internal Allocation</span>
              <button
                type="button"
                onClick={() => setShowReserveModal(false)}
                className="text-xs font-semibold text-[#74766d]"
              >
                Cancel
              </button>
            </div>

            <h3 className="text-[18px] font-bold text-[#272e23]">
              Earmark {formatCurrency(activeAmount, actionCurrency)} for {allocationGoal?.name || 'the selected goal'}
            </h3>
            <p className="mt-1.5 text-[12px] leading-[18px] text-[#74766d]">
              This sets aside{' '}
              <strong className="text-[#272e23]">{formatCurrency(activeAmount, actionCurrency)}</strong> of your existing
              uncommitted cash inside Vela so you know not to spend it.
            </p>

            <div className="mt-3 rounded-[14px] bg-[#386641]/10 p-3 border border-[#386641]/25 text-[11px] text-[#272e23]">
              <strong className="font-bold text-[#386641] block mb-0.5">
                Important · No real bank wire is initiated
              </strong>
              The server records this allocation against the selected goal and account after validating available funds. Your bank balance does not change for an internal earmark.
            </div>

            <form onSubmit={handleConfirmReserve} className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  {recommendationSource === 'backend' ? 'Account validated by backend' : 'Select account to earmark from'}
                </label>
                <select
                  disabled={recommendationSource === 'backend' || feedbackDisabled}
                  value={selectedReserveAccountId}
                  onChange={(e) => setSelectedReserveAccountId(e.target.value)}
                  className="vela-input"
                >
                  {snapshot.accountSummaries
                    .filter((a) => a.account.currency === (actionCurrency))
                    .map((acc) => (
                      <option key={acc.account.id} value={acc.account.id}>
                        {acc.account.institution} — {acc.account.name} (Available:{' '}
                        {formatCurrency(acc.personalAccessibleBalance ?? 0, acc.account.currency)})
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={feedbackDisabled}
                  className="primary-action flex-1 rounded-[16px] py-3 text-[13px] font-semibold"
                >
                  Confirm {formatCurrency(activeAmount, actionCurrency)} Earmark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADJUST RECOMMENDATION AMOUNT SHEET */}
      {showAdjustModal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAdjustModal(false);
          }}
        >
          <div className="modal-sheet-container p-5">
            <div className="sheet-handle-bar" />
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">Adjust Next Step</span>
              <button
                type="button"
                onClick={() => setShowAdjustModal(false)}
                className="text-xs font-semibold text-[#74766d]"
              >
                Close
              </button>
            </div>

            <h3 className="text-[18px] font-bold text-[#272e23]">
              Choose an amount that feels comfortable
            </h3>
            <p className="mt-1 text-[12px] text-[#74766d]">
              You currently have{' '}
              <strong className="text-[#272e23]">
                {formatCurrency(primaryCash.uncommittedSafeToSpend, primaryCash.currency)}
              </strong>{' '}
              in uncommitted {primaryCash.currency} cash after recorded bills. The backend validates the adjusted action before saving.
            </p>

            <form onSubmit={handleConfirmAdjust} className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[#74766d]">Adjusted action amount</span>
                  <span className="text-[20px] font-bold text-[#386641]">{formatCurrency(adjustValue, currentRecommendation?.currency || primaryCash.currency)}</span>
                </div>
                <input
                  type="number"
                  step="any"
                  required
                  value={adjustValue}
                  onChange={(e) => setAdjustValue(Number(e.target.value))}
                  className="mt-2 w-full accent-[#386641]"
                />

              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={feedbackDisabled}
                  className="primary-action flex-1 rounded-[16px] py-3 text-[13px] font-semibold"
                >
                  Save {formatCurrency(adjustValue, actionCurrency)} Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT CONFIRMATION / TRANSACTION SHEET */}
      {editingConf && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingConf(null);
          }}
        >
          <div className="modal-sheet-container p-5">
            <div className="sheet-handle-bar" />
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">Edit Confirmation / Transaction</span>
              <button
                type="button"
                onClick={() => setEditingConf(null)}
                className="text-xs font-semibold text-[#74766d]"
              >
                Close
              </button>
            </div>

            <h3 className="text-[17px] font-bold text-[#272e23]">
              {editingConf.questionText}
            </h3>
            <p className="mt-1 text-[11px] text-[#74766d]">
              Amount: <strong className="text-[#272e23]">{editingConf.amountLabel}</strong>
            </p>

            <form onSubmit={handleSaveEditConfirmation} className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Economic Classification
                </label>
                <select
                  value={confEconomicType}
                  onChange={(e) => setConfEconomicType(e.target.value as TransactionEconomicType)}
                  className="vela-input"
                >
                  <option value="internal_transfer">Internal Transfer (Excluded from spend)</option>
                  <option value="expense">Personal Expense</option>
                  <option value="income">Earned Income</option>
                  <option value="work_business_movement">Work / Client Outlay</option>
                  <option value="debt_payment">Debt Servicing</option>
                  <option value="savings_allocation">Savings Allocation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#272e23] mb-1">
                  Category
                </label>
                <select
                  value={confCategory}
                  onChange={(e) => setConfCategory(e.target.value as SpendingCategory)}
                  className="vela-input"
                >
                  <option value="transfer">Transfers</option>
                  <option value="subscriptions">Subscriptions</option>
                  <option value="rent_housing">Rent & Housing</option>
                  <option value="utilities_energy">Utilities & Energy</option>
                  <option value="internet_telecom">Internet & Telecom</option>
                  <option value="groceries_food">Groceries & Food</option>
                  <option value="dining_coffee">Dining & Coffee</option>
                  <option value="work_expense">Work Expense</option>
                  <option value="income">Income</option>
                  <option value="other">Other Spending</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    deleteConfirmation(editingConf.id);
                    setEditingConf(null);
                  }}
                  className="h-11 px-4 rounded-xl border border-red-300 bg-red-500/10 text-xs font-bold text-red-800"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="primary-action flex-1 h-11 rounded-xl text-xs font-bold"
                >
                  Save Changes & Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHARED ACTION MODALS */}
      {accountModalOpen && (
        <AccountModal
          initialAccount={editingAccount}
          initialBalance={editingAccountBalance}
          onClose={() => setAccountModalOpen(false)}
        />
      )}
      {incomeModalOpen && <AddIncomeModal onClose={() => setIncomeModalOpen(false)} />}
      {balanceModalOpen && <UpdateBalanceModal onClose={() => setBalanceModalOpen(false)} />}
      {statementModalOpen && (
        <StatementUploadModal
          onClose={() => setStatementModalOpen(false)}
          onOpenReview={() => setTxReviewModalOpen(true)}
        />
      )}
      {obligationModalOpen && (
        <ObligationModal
          initialObligation={editingObligation}
          onClose={() => setObligationModalOpen(false)}
        />
      )}
      {txReviewModalOpen && (
        <TransactionReviewModal onClose={() => setTxReviewModalOpen(false)} />
      )}
    </div>
  );
};
