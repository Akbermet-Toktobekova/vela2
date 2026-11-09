import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePI } from '../../context/PIContext';
import { FinancialAccount } from '../../types/pi';
import { formatCurrency } from '../../services/snapshotBuilder';
import { AccountModal } from './AccountModal';
import { StatementUploadModal, TransactionReviewModal } from './QuickActionModals';

export const SettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const {
    piState,
    snapshot,
    registerDemoAccount,
    setPrimaryAccount,
    deleteStatement,
    resetToDemo,
    resetToBlankNewUser,
    exportDatabaseJson,
    setOnboardingStep,
  } = usePI();

  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'statements' | 'data'>(
    'overview'
  );
  const [nickname, setNickname] = useState(snapshot.profile.nickname || 'Alex');
  const [email, setEmail] = useState(piState.user.email || 'alex@vela.demo');
  const [baseCurrency, setBaseCurrency] = useState(snapshot.baseCurrency || 'EUR');

  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<FinancialAccount | null>(null);
  const [editingAccountBal, setEditingAccountBal] = useState<number | null>(null);
  const [statementModalOpen, setStatementModalOpen] = useState(false);
  const [txReviewModalOpen, setTxReviewModalOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    registerDemoAccount(nickname.trim() || 'Alex', email.trim() || 'alex@vela.demo', baseCurrency);
  };

  const handleDownloadJson = () => {
    const jsonStr = exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vela_pi_database_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStartBlankUser = async () => {
    await resetToBlankNewUser();
    onClose();
    navigate('/onboarding');
  };

  const handleRestoreDemo = async () => {
    await resetToDemo();
    onClose();
    navigate('/today');
  };

  const handleOpenOnboarding = () => {
    setOnboardingStep(1);
    onClose();
    navigate('/onboarding');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet-container max-h-[86vh] overflow-y-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle-bar" />
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="eyebrow block">Settings & PI Database</span>
            <h2 className="text-[18px] font-bold text-[#272e23]">
              Financial Profile & Controls
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="secondary-action rounded-xl px-3 py-1.5 text-xs font-semibold"
          >
            Done
          </button>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 rounded-2xl bg-white/55 p-1 border border-white/80 text-[11px] font-semibold mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`rounded-xl py-1.5 transition ${
              activeTab === 'overview'
                ? 'bg-white text-[#272e23] shadow-2xs'
                : 'text-[#74766d]'
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('accounts')}
            className={`rounded-xl py-1.5 transition ${
              activeTab === 'accounts'
                ? 'bg-white text-[#272e23] shadow-2xs'
                : 'text-[#74766d]'
            }`}
          >
            Accounts ({snapshot.accountSummaries.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('statements')}
            className={`rounded-xl py-1.5 transition ${
              activeTab === 'statements'
                ? 'bg-white text-[#272e23] shadow-2xs'
                : 'text-[#74766d]'
            }`}
          >
            CSV ({snapshot.statements.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('data')}
            className={`rounded-xl py-1.5 transition ${
              activeTab === 'data'
                ? 'bg-white text-[#272e23] shadow-2xs'
                : 'text-[#74766d]'
            }`}
          >
            Demo / Data
          </button>
        </div>

        {/* TAB 1: PROFILE & ONBOARDING SHORTCUT */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/55 p-3.5 border border-white/80">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#386641]">
                    Onboarding Flow (10 Screens)
                  </span>
                  <p className="text-xs font-semibold text-[#272e23] mt-0.5">
                    Status: {snapshot.onboarding.status === 'completed' ? 'Completed ✓' : `Step ${snapshot.onboarding.currentStep} of 10`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenOnboarding}
                  className="primary-action rounded-xl px-3 py-2 text-xs font-bold"
                >
                  Open Onboarding →
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#74766d] mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="vela-input"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#74766d] mb-1">
                  Email (Local Demo Identity)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="vela-input"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#74766d] mb-1">
                  Primary Planning Currency
                </label>
                <select
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  className="vela-input"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="HUF">HUF (Ft)</option>
                  <option value="KGS">KGS (som)</option>
                </select>
              </div>
              <button
                type="submit"
                className="primary-action w-full rounded-xl py-2.5 text-xs font-bold"
              >
                Save Profile Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: ACCOUNTS MANAGEMENT */}
        {activeTab === 'accounts' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#74766d]">
                Add, edit, or set your primary account.
              </p>
              <button
                type="button"
                onClick={() => {
                  setEditingAccount(null);
                  setEditingAccountBal(null);
                  setAccountModalOpen(true);
                }}
                className="primary-action rounded-xl px-3 py-1.5 text-xs font-bold"
              >
                + Add Account
              </button>
            </div>

            {snapshot.accountSummaries.map((acc) => (
              <div
                key={acc.account.id}
                className="rounded-2xl bg-white/60 p-3.5 border border-white/85 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#272e23]">
                        {acc.account.institution} · {acc.account.name}
                      </span>
                      {acc.account.isPrimary && (
                        <span className="rounded bg-[#386641]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#386641]">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#74766d]">
                      Ownership: {acc.account.fundsOwnership} · Purposes:{' '}
                      {acc.account.purposes.join(', ')}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#272e23]">
                    {acc.latestBalance
                      ? formatCurrency(acc.latestBalance.amount, acc.account.currency)
                      : 'Unknown'}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1 border-t border-black/5">
                  {!acc.account.isPrimary && (
                    <button
                      type="button"
                      onClick={() => setPrimaryAccount(acc.account.id)}
                      className="secondary-action rounded-lg px-2.5 py-1 text-[10px] font-semibold"
                    >
                      Make Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAccount(acc.account);
                      setEditingAccountBal(acc.latestBalance?.amount ?? null);
                      setAccountModalOpen(true);
                    }}
                    className="primary-action rounded-lg px-2.5 py-1 text-[10px] font-semibold"
                  >
                    Edit / Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: STATEMENTS & TRANSACTIONS */}
        {activeTab === 'statements' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setStatementModalOpen(true)}
                className="primary-action flex-1 rounded-xl py-2 text-xs font-bold"
              >
                + Upload Statement CSV
              </button>
              <button
                type="button"
                onClick={() => setTxReviewModalOpen(true)}
                className="secondary-action flex-1 rounded-xl py-2 text-xs font-bold"
              >
                Review {snapshot.transactions.length} Txns
              </button>
            </div>

            {snapshot.statements.length === 0 ? (
              <p className="text-xs text-[#74766d] py-4 text-center">
                No bank statements uploaded yet.
              </p>
            ) : (
              <div className="space-y-2">
                {snapshot.statements.map((st) => {
                  const acc = snapshot.accountSummaries.find(
                    (a) => a.account.id === st.accountId
                  )?.account;
                  return (
                    <div
                      key={st.id}
                      className="flex items-center justify-between rounded-2xl bg-white/60 p-3 border border-white/85"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#272e23]">{st.fileName}</p>
                        <p className="text-[10px] text-[#74766d]">
                          {acc?.name || st.accountId} · {st.transactionCount} txns ·{' '}
                          {st.periodStart} to {st.periodEnd}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteStatement(st.id)}
                        className="rounded-lg bg-red-500/10 px-2.5 py-1 text-[10px] font-bold text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DEMO MODE vs NEW USER BLANK RESET & EXPORT */}
        {activeTab === 'data' && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-white/60 p-3.5 border border-white/85 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#386641]">
                Mode 1 · Pre-Seeded Demo Mode
              </span>
              <p className="text-xs font-bold text-[#272e23]">
                Restore Alex's 4-Account Multi-Currency Profile
              </p>
              <p className="text-[11px] text-[#74766d]">
                Includes Revolut EUR (€820), Wise EUR (€180), OTP Bank HUF (185,000 Ft mixed funds), MBANK KGS (42,500 som), 11 October CSV transactions, and the €40 Safety Cushion recommendation.
              </p>
              <button
                type="button"
                onClick={handleRestoreDemo}
                className="primary-action w-full rounded-xl py-2.5 text-xs font-bold"
              >
                Restore Demo Mode Data
              </button>
            </div>

            <div className="rounded-2xl bg-white/60 p-3.5 border border-white/85 space-y-2">
              <span className="text-[10px] font-bold uppercase text-amber-800">
                Mode 2 · Blank New User Experience
              </span>
              <p className="text-xs font-bold text-[#272e23]">
                Reset to Empty Profile & Launch Onboarding
              </p>
              <p className="text-[11px] text-[#74766d]">
                Clears all demo accounts and transactions so you can test Vela from Step 1 as a brand-new user.
              </p>
              <button
                type="button"
                onClick={handleStartBlankUser}
                className="secondary-action w-full rounded-xl py-2.5 text-xs font-bold text-amber-900"
              >
                Start Fresh Blank Profile →
              </button>
            </div>

            <div className="rounded-2xl bg-white/60 p-3.5 border border-white/85 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#74766d]">
                Local PI Database Inspection
              </span>
              <p className="text-[11px] text-[#74766d]">
                Export the entire IndexedDB Personal Intelligence state (accounts, balances, transactions, classifications, transfer matches, snapshot) as a JSON file.
              </p>
              <button
                type="button"
                onClick={handleDownloadJson}
                className="secondary-action w-full rounded-xl py-2.5 text-xs font-bold"
              >
                ⬇ Export PI Database (.json)
              </button>
            </div>
          </div>
        )}

        {accountModalOpen && (
          <AccountModal
            initialAccount={editingAccount}
            initialBalance={editingAccountBal}
            onClose={() => setAccountModalOpen(false)}
          />
        )}
        {statementModalOpen && (
          <StatementUploadModal onClose={() => setStatementModalOpen(false)} />
        )}
        {txReviewModalOpen && (
          <TransactionReviewModal onClose={() => setTxReviewModalOpen(false)} />
        )}
      </div>
    </div>
  );
};
