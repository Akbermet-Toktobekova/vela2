import React, { useState, useRef } from 'react';
import { usePI } from '../../context/PIContext';
import {
  FinancialObligation,
  ObligationCategory,
  SpendingCategory,
  StatementImport,
  StatementProcessingStatus,
  TransactionEconomicType,
} from '../../types/pi';
import { SAMPLE_REVOLUT_CSV, SAMPLE_WISE_CSV } from '../../database/seed';

// ============================================================================
// 1. Add Income Modal
// ============================================================================
export const AddIncomeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { snapshot, saveIncomeSource, addBalanceObservation } = usePI();
  const [name, setName] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [currency, setCurrency] = useState(snapshot.baseCurrency);
  const [date, setDate] = useState('2026-11-03');
  const [sourceType, setSourceType] = useState<
    'salary' | 'scholarship' | 'freelance' | 'part_time' | 'business' | 'other'
  >('salary');
  const [pattern, setPattern] = useState<'regular' | 'irregular' | 'mixed'>('regular');
  const [accountId, setAccountId] = useState(
    snapshot.accountSummaries[0]?.account.id || ''
  );
  const [alsoAddToBalance, setAlsoAddToBalance] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amountStr);
    if (!name.trim() || isNaN(amt) || amt <= 0) {
      setError('Please enter a valid income title and positive amount.');
      return;
    }

    saveIncomeSource({
      name: name.trim(),
      pattern,
      estimatedMonthlyAmount: amt,
      currency,
      frequency: 'monthly',
      sourceType,
      nextExpectedDate: date,
      receivingAccountId: accountId || null,
      notes: `Added on ${date}`,
    });

    if (alsoAddToBalance && accountId) {
      const targetAcct = snapshot.accountSummaries.find((a) => a.account.id === accountId);
      if (targetAcct && targetAcct.account.currency === currency) {
        const currentBal = targetAcct.latestBalance?.amount || 0;
        addBalanceObservation(accountId, currentBal + amt, date);
      }
    }

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Add Income</h3>
          <button type="button" onClick={onClose} className="text-xs font-semibold text-[#74766d]">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-2 text-xs font-semibold text-red-800">
              {error}
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
              Income Source Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Monthly Salary, University Scholarship"
              className="vela-input"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Amount *
              </label>
              <input
                type="number"
                step="0.01"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="e.g. 500.00"
                className="vela-input"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="vela-input"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="HUF">HUF (Ft)</option>
                <option value="KGS">KGS (сом)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Source Type
              </label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as any)}
                className="vela-input"
              >
                <option value="salary">Salary</option>
                <option value="scholarship">Scholarship / Grant</option>
                <option value="part_time">Part-time work</option>
                <option value="freelance">Freelance</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Pattern
              </label>
              <select
                value={pattern}
                onChange={(e) => setPattern(e.target.value as any)}
                className="vela-input"
              >
                <option value="regular">Regular</option>
                <option value="irregular">Irregular</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Receiving Account
              </label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="vela-input"
              >
                <option value="">None / Unspecified</option>
                {snapshot.accountSummaries.map((as) => (
                  <option key={as.account.id} value={as.account.id}>
                    {as.account.name} ({as.account.currency})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="vela-input text-xs"
              />
            </div>
          </div>

          {accountId && (
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={alsoAddToBalance}
                onChange={(e) => setAlsoAddToBalance(e.target.checked)}
                className="size-4 accent-[#386641]"
              />
              <span>Also add this inflow to the receiving account's current balance</span>
            </label>
          )}

          <button type="submit" className="primary-action h-11 w-full rounded-xl text-xs font-bold mt-2">
            Save Income & Recalculate
          </button>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// 2. Update Balance Modal (Preserves Balance History)
// ============================================================================
export const UpdateBalanceModal: React.FC<{
  initialAccountId?: string;
  onClose: () => void;
}> = ({ initialAccountId, onClose }) => {
  const { snapshot, addBalanceObservation } = usePI();
  const [selectedAccountId, setSelectedAccountId] = useState(
    initialAccountId || snapshot.accountSummaries[0]?.account.id || ''
  );

  const selectedSummary = snapshot.accountSummaries.find(
    (a) => a.account.id === selectedAccountId
  );

  const [newBalanceStr, setNewBalanceStr] = useState(
    selectedSummary?.latestBalance ? String(selectedSummary.latestBalance.amount) : ''
  );
  const [asOfDate, setAsOfDate] = useState('2026-11-03');

  const handleAccountChange = (id: string) => {
    setSelectedAccountId(id);
    const found = snapshot.accountSummaries.find((a) => a.account.id === id);
    setNewBalanceStr(found?.latestBalance ? String(found.latestBalance.amount) : '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newBalanceStr);
    if (!selectedAccountId || isNaN(val)) return;
    addBalanceObservation(selectedAccountId, val, asOfDate);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Update Account Balance</h3>
          <button type="button" onClick={onClose} className="text-xs font-semibold text-[#74766d]">
            Close
          </button>
        </div>

        {snapshot.accountSummaries.length === 0 ? (
          <p className="text-xs text-[#74766d]">Please add a bank account first.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Select Account
              </label>
              <select
                value={selectedAccountId}
                onChange={(e) => handleAccountChange(e.target.value)}
                className="vela-input"
              >
                {snapshot.accountSummaries.map((as) => (
                  <option key={as.account.id} value={as.account.id}>
                    {as.account.name} ({as.account.currency})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                  New Balance ({selectedSummary?.account.currency})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newBalanceStr}
                  onChange={(e) => setNewBalanceStr(e.target.value)}
                  placeholder="e.g. 820.00"
                  className="vela-input"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                  Observation Date
                </label>
                <input
                  type="date"
                  value={asOfDate}
                  onChange={(e) => setAsOfDate(e.target.value)}
                  className="vela-input text-xs"
                />
              </div>
            </div>

            {/* Previous Balance Observations History */}
            {selectedSummary && selectedSummary.balanceHistory.length > 0 && (
              <div className="rounded-xl bg-white/55 border border-white/80 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#74766d] mb-1.5">
                  Previous Balance Observations (Preserved)
                </p>
                <div className="space-y-1 max-h-28 overflow-y-auto">
                  {selectedSummary.balanceHistory.map((b) => (
                    <div key={b.id} className="flex justify-between text-xs">
                      <span className="text-[#74766d]">
                        {b.asOf.slice(0, 10)} ({b.sourceType.replace('_', ' ')})
                      </span>
                      <span className="font-semibold">
                        {b.currency} {b.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="primary-action h-11 w-full rounded-xl text-xs font-bold">
              Save New Balance Observation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 3. Upload Statement Modal (Real File API + Status Machine)
// ============================================================================
export const StatementUploadModal: React.FC<{
  initialAccountId?: string;
  onClose: () => void;
  onOpenReview?: () => void;
}> = ({ initialAccountId, onClose, onOpenReview }) => {
  const { snapshot, uploadStatementContent } = usePI();
  const [selectedAccountId, setSelectedAccountId] = useState(
    initialAccountId || snapshot.accountSummaries[0]?.account.id || ''
  );
  const [status, setStatus] = useState<StatementProcessingStatus>('not_uploaded');
  const [lastResult, setLastResult] = useState<StatementImport | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processRawContent = (fileName: string, content: string) => {
    if (!selectedAccountId) return;
    setStatus('file_selected');
    setTimeout(() => {
      setStatus('validating');
      setTimeout(() => {
        setStatus('processing');
        setTimeout(() => {
          const outcome = uploadStatementContent(selectedAccountId, fileName, content);
          setLastResult(outcome);
          setStatus(outcome.status);
        }, 220);
      }, 180);
    }, 120);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      processRawContent(file.name, text);
    } catch {
      setStatus('failed');
    }
  };

  const downloadSampleCSV = (type: 'revolut' | 'wise') => {
    const csv = type === 'revolut' ? SAMPLE_REVOLUT_CSV : SAMPLE_WISE_CSV;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample_${type}_october_2026.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Upload Bank Statement</h3>
          <button type="button" onClick={onClose} className="text-xs font-semibold text-[#74766d]">
            Close
          </button>
        </div>

        {snapshot.accountSummaries.length === 0 ? (
          <p className="text-xs text-[#74766d]">Please add a bank account before uploading statements.</p>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Target Bank Account
              </label>
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="vela-input"
              >
                {snapshot.accountSummaries.map((as) => (
                  <option key={as.account.id} value={as.account.id}>
                    {as.account.name} ({as.account.institution} · {as.account.currency})
                  </option>
                ))}
              </select>
            </div>

            {/* Real File Picker Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-[#8f9288] bg-white/50 p-5 text-center transition hover:bg-white/75"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt,.pdf,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-sm font-bold text-[#272e23]">
                Click to select a statement file from your device
              </p>
              <p className="text-[11px] text-[#74766d] mt-1">
                Real local CSV parsing supported (`Date, Description, Amount, Currency`). Unparseable PDFs/binaries will show an explicit unsupported status without faking data.
              </p>
            </div>

            {/* Live Processing Status Machine Banner */}
            {status !== 'not_uploaded' && (
              <div
                className={`rounded-xl p-3 text-xs border ${
                  status === 'parsed_successfully'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950'
                    : status === 'needs_review'
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-950'
                    : status === 'unsupported_format' || status === 'failed'
                    ? 'bg-red-500/10 border-red-500/30 text-red-900'
                    : 'bg-white/70 border-white text-[#272e23]'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>Status: {status.replace(/_/g, ' ').toUpperCase()}</span>
                  {lastResult && <span>{lastResult.fileName}</span>}
                </div>
                {lastResult?.transactionCount ? (
                  <p className="mt-1">
                    Parsed <strong>{lastResult.transactionCount}</strong> transaction(s) (
                    {lastResult.periodStart} to {lastResult.periodEnd}).
                    {lastResult.duplicateCountSkipped > 0 &&
                      ` Skipped ${lastResult.duplicateCountSkipped} duplicate(s).`}
                  </p>
                ) : null}
                {lastResult?.overlapWarning && (
                  <p className="mt-1 text-amber-800 font-medium">⚠️ {lastResult.overlapWarning}</p>
                )}
                {lastResult?.errorMessage && (
                  <p className="mt-1 font-medium">{lastResult.errorMessage}</p>
                )}
              </div>
            )}

            {/* Quick Sample Loaders & CSV Downloaders */}
            <div className="rounded-xl bg-white/50 border border-white/80 p-3 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#74766d]">
                Test Helpers: Instant Sample Import or Download CSV File
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    processRawContent('wise_eur_october_2026.csv', SAMPLE_WISE_CSV)
                  }
                  className="secondary-action rounded-xl py-2 px-2.5 text-[11px] font-semibold text-left"
                >
                  ⚡ Import Wise Oct CSV (4 txns + internal match)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    processRawContent('revolut_eur_october_2026.csv', SAMPLE_REVOLUT_CSV)
                  }
                  className="secondary-action rounded-xl py-2 px-2.5 text-[11px] font-semibold text-left"
                >
                  ⚡ Import Revolut Oct CSV (11 txns)
                </button>
              </div>
              <div className="flex gap-3 pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => downloadSampleCSV('wise')}
                  className="underline font-semibold text-[#386641]"
                >
                  ⬇ Download Wise CSV to disk
                </button>
                <button
                  type="button"
                  onClick={() => downloadSampleCSV('revolut')}
                  className="underline font-semibold text-[#386641]"
                >
                  ⬇ Download Revolut CSV to disk
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              {(status === 'parsed_successfully' || status === 'needs_review') && onOpenReview && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenReview();
                  }}
                  className="primary-action h-11 flex-1 rounded-xl text-xs font-bold"
                >
                  Review Imported Transactions →
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="secondary-action h-11 flex-1 rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 4. Obligation Detail / Add / Edit Modal
// ============================================================================
export const ObligationModal: React.FC<{
  initialObligation?: FinancialObligation | null;
  onClose: () => void;
}> = ({ initialObligation, onClose }) => {
  const { snapshot, saveObligation, toggleObligationPaid, deleteObligation } = usePI();
  const [name, setName] = useState(initialObligation?.name || '');
  const [amountStr, setAmountStr] = useState(
    initialObligation ? String(initialObligation.amount) : ''
  );
  const [currency, setCurrency] = useState(
    initialObligation?.currency || snapshot.baseCurrency
  );
  const [dueDate, setDueDate] = useState(initialObligation?.dueDate || '2026-11-10');
  const [recurrence, setRecurrence] = useState<'monthly' | 'weekly' | 'yearly' | 'one_time'>(
    initialObligation?.recurrence || 'monthly'
  );
  const [category, setCategory] = useState<ObligationCategory>(
    initialObligation?.category || 'rent'
  );
  const [status, setStatus] = useState<'unpaid' | 'paid'>(
    initialObligation?.status || 'unpaid'
  );
  const [notes, setNotes] = useState(initialObligation?.notes || '');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amountStr);
    if (!name.trim() || isNaN(amt) || amt <= 0) return;

    saveObligation({
      id: initialObligation?.id,
      name: name.trim(),
      amount: amt,
      currency,
      dueDate,
      recurrence,
      category,
      status,
      accountId: initialObligation?.accountId || snapshot.accountSummaries[0]?.account.id || null,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">
            {initialObligation ? 'Obligation Details' : 'Add Upcoming Bill'}
          </h3>
          <button type="button" onClick={onClose} className="text-xs font-semibold text-[#74766d]">
            Close
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
              Bill / Obligation Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apartment Rent, Clean Energy"
              className="vela-input"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Amount *
              </label>
              <input
                type="number"
                step="0.01"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="650.00"
                className="vela-input"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="vela-input"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="HUF">HUF (Ft)</option>
                <option value="KGS">KGS (сом)</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="vela-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ObligationCategory)}
                className="vela-input"
              >
                <option value="rent">Rent / Housing</option>
                <option value="energy">Energy / Utilities</option>
                <option value="internet">Internet / Phone</option>
                <option value="tuition">Tuition</option>
                <option value="insurance">Insurance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Recurrence
              </label>
              <select
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value as any)}
                className="vela-input"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
                <option value="one_time">One-time</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'unpaid' | 'paid')}
                className="vela-input"
              >
                <option value="unpaid">Unpaid (Upcoming)</option>
                <option value="paid">Paid ✓</option>
              </select>
            </div>
          </div>

          {initialObligation && (
            <div className="flex items-center justify-between rounded-xl bg-white/60 border border-white/80 p-2.5">
              <span className="text-xs font-semibold">Quick Status Toggle:</span>
              <button
                type="button"
                onClick={() => {
                  toggleObligationPaid(initialObligation.id);
                  onClose();
                }}
                className="rounded-lg bg-[#386641] text-white px-3 py-1.5 text-xs font-bold"
              >
                {initialObligation.status === 'paid' ? 'Mark as Unpaid' : 'Mark as Paid ✓'}
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button type="submit" className="primary-action h-11 flex-1 rounded-xl text-xs font-bold">
              {initialObligation ? 'Save Changes' : 'Add Obligation'}
            </button>
            {initialObligation && !confirmDelete && (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="rounded-xl border border-red-400/50 bg-red-500/10 px-3 h-11 text-xs font-bold text-red-800"
              >
                Delete
              </button>
            )}
            {initialObligation && confirmDelete && (
              <button
                type="button"
                onClick={() => {
                  deleteObligation(initialObligation.id);
                  onClose();
                }}
                className="rounded-xl bg-red-700 px-3 h-11 text-xs font-bold text-white"
              >
                Confirm Delete?
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// 5. Transaction Review & Classification Modal
// ============================================================================
export const TransactionReviewModal: React.FC<{
  filterCategory?: SpendingCategory | null;
  onClose: () => void;
}> = ({ filterCategory, onClose }) => {
  const {
    snapshot,
    updateTransactionClassification,
    answerUserConfirmation,
  } = usePI();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>(
    filterCategory || 'all'
  );

  const filteredTxns = snapshot.transactions.filter((t) => {
    if (selectedCategoryFilter === 'all') return true;
    const cls = snapshot.classifications[t.id];
    return cls?.category === selectedCategoryFilter;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet-container" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold">Transaction Review & Provenance</h3>
            <p className="text-[11px] text-[#74766d]">
              Original statement rows are preserved; edits update PI classification.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-xs font-semibold text-[#74766d]">
            Close
          </button>
        </div>

        <div className="space-y-3 max-h-[72vh] overflow-y-auto pr-1">
          {/* Pending High-Impact Confirmations */}
          {snapshot.unresolvedConfirmations.length > 0 && (
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-3 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                Impact-Based Questions ({snapshot.unresolvedConfirmations.length})
              </p>
              {snapshot.unresolvedConfirmations.map((conf) => (
                <div key={conf.id} className="rounded-xl bg-white/80 p-2.5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#74766d]">
                    <span>{conf.subjectType.toUpperCase()}</span>
                    <span>{conf.amountLabel}</span>
                  </div>
                  <p className="text-xs font-bold text-[#272e23]">{conf.questionText}</p>
                  <p className="text-[11px] text-[#74766d]">{conf.impactReason}</p>
                  <div className="flex gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => answerUserConfirmation(conf.id, 'yes')}
                      className="flex-1 rounded-lg bg-[#386641] text-white py-1.5 text-xs font-bold"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => answerUserConfirmation(conf.id, 'no')}
                      className="flex-1 rounded-lg border border-black/15 bg-white py-1.5 text-xs font-bold"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => answerUserConfirmation(conf.id, 'not_sure')}
                      className="flex-1 rounded-lg bg-black/5 py-1.5 text-xs font-semibold text-[#74766d]"
                    >
                      Not sure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Category Filter */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold">Filter by Category:</span>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="vela-input !w-auto !h-8 !text-xs"
            >
              <option value="all">All ({snapshot.transactions.length})</option>
              <option value="rent_housing">Rent & Housing</option>
              <option value="utilities_energy">Utilities & Energy</option>
              <option value="internet_telecom">Internet & Telecom</option>
              <option value="groceries_food">Groceries & Food</option>
              <option value="dining_coffee">Dining & Coffee</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="work_expense">Work Expense</option>
              <option value="transfer">Internal Transfers</option>
              <option value="income">Income Inflows</option>
              <option value="other">Other</option>
            </select>
          </div>

          {filteredTxns.length === 0 ? (
            <p className="text-xs text-[#74766d] py-6 text-center">
              No transactions match this filter.
            </p>
          ) : (
            <div className="space-y-2">
              {filteredTxns.map((txn) => {
                const cls = snapshot.classifications[txn.id];
                const acct = snapshot.accountSummaries.find(
                  (a) => a.account.id === txn.accountId
                )?.account;

                return (
                  <div
                    key={txn.id}
                    className="rounded-xl bg-white/65 border border-white/85 p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-[#272e23]">{txn.description}</p>
                        <p className="text-[10px] text-[#74766d]">
                          {txn.date} · {acct?.name || txn.accountId} · Ref: {txn.reference || 'N/A'}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold whitespace-nowrap ${
                          txn.amount >= 0 ? 'text-emerald-800' : 'text-[#272e23]'
                        }`}
                      >
                        {txn.amount >= 0 ? '+' : ''}
                        {txn.currency} {txn.amount.toFixed(2)}
                      </span>
                    </div>

                    {cls && (
                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-black/5">
                        <div>
                          <label className="text-[9px] font-bold uppercase text-[#74766d] block">
                            Economic Nature
                          </label>
                          <select
                            value={cls.economicType}
                            onChange={(e) =>
                              updateTransactionClassification(
                                txn.id,
                                e.target.value as TransactionEconomicType,
                                cls.category
                              )
                            }
                            className="vela-input !h-7 !text-[11px] !px-2"
                          >
                            <option value="expense">Personal Expense</option>
                            <option value="income">Earned Income</option>
                            <option value="internal_transfer">Internal Transfer (Excluded)</option>
                            <option value="work_business_movement">Work / Client Movement</option>
                            <option value="debt_payment">Debt Servicing</option>
                            <option value="refund">Merchant Refund</option>
                            <option value="savings_allocation">Savings Allocation</option>
                            <option value="interest_fee">Fee / Interest</option>
                            <option value="cash_withdrawal">Cash Withdrawal</option>
                            <option value="unknown">Unknown</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] font-bold uppercase text-[#74766d] block">
                            Category
                          </label>
                          <select
                            value={cls.category}
                            onChange={(e) =>
                              updateTransactionClassification(
                                txn.id,
                                cls.economicType,
                                e.target.value as SpendingCategory
                              )
                            }
                            className="vela-input !h-7 !text-[11px] !px-2"
                          >
                            <option value="rent_housing">Rent & Housing</option>
                            <option value="utilities_energy">Utilities & Energy</option>
                            <option value="internet_telecom">Internet & Telecom</option>
                            <option value="groceries_food">Groceries & Food</option>
                            <option value="dining_coffee">Dining & Coffee</option>
                            <option value="transport">Transport</option>
                            <option value="subscriptions">Subscriptions</option>
                            <option value="education">Education</option>
                            <option value="work_expense">Work Expense</option>
                            <option value="income">Income</option>
                            <option value="transfer">Transfer</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {cls && (
                      <div className="flex items-center justify-between text-[10px] text-[#74766d]">
                        <span>Provenance: {cls.provenanceNote}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 font-semibold ${
                            cls.status === 'user_confirmed'
                              ? 'bg-emerald-500/15 text-emerald-900'
                              : cls.status === 'needs_review'
                              ? 'bg-amber-500/20 text-amber-900'
                              : 'bg-black/5'
                          }`}
                        >
                          {cls.status.replace('_', ' ')}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
