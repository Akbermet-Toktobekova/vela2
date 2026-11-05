import React, { useState } from 'react';
import { AccountPurpose, FinancialAccount, FundsOwnership } from '../../types/pi';
import { usePI } from '../../context/PIContext';

interface AccountModalProps {
  initialAccount?: FinancialAccount | null;
  initialBalance?: number | null;
  onClose: () => void;
}

const PURPOSE_OPTIONS: { value: AccountPurpose; label: string }[] = [
  { value: 'daily_spending', label: 'Daily spending' },
  { value: 'receiving_income', label: 'Receiving income' },
  { value: 'savings', label: 'Savings' },
  { value: 'work_business', label: 'Work / business' },
  { value: 'mixed', label: 'Mixed purposes' },
  { value: 'other', label: 'Other' },
  { value: 'not_sure', label: 'Not sure' },
];

const OWNERSHIP_OPTIONS: { value: FundsOwnership; label: string; hint: string }[] = [
  {
    value: 'personal',
    label: 'Personal funds',
    hint: '100% belongs to you for personal spending or saving.',
  },
  {
    value: 'mixed',
    label: 'Mixed (Personal + Work/Other)',
    hint: 'Contains both personal money and work/client funds.',
  },
  {
    value: 'work_business',
    label: 'Work / Business only',
    hint: 'Managed for work or business; not personal spending cash.',
  },
  {
    value: 'held_for_others',
    label: 'Held for others',
    hint: 'Shared household pot or funds held on behalf of someone else.',
  },
  {
    value: 'unknown',
    label: 'Not sure yet',
    hint: 'Vela will not assume this balance is safe to spend until clarified.',
  },
];

export const AccountModal: React.FC<AccountModalProps> = ({
  initialAccount,
  initialBalance,
  onClose,
}) => {
  const { saveAccount, deleteAccount } = usePI();

  const [name, setName] = useState(initialAccount?.name || '');
  const [institution, setInstitution] = useState(initialAccount?.institution || '');
  const [currency, setCurrency] = useState(initialAccount?.currency || 'EUR');
  const [balanceStr, setBalanceStr] = useState(
    initialBalance !== undefined && initialBalance !== null ? String(initialBalance) : ''
  );
  const [balanceDate, setBalanceDate] = useState('2026-11-03');
  const [purposes, setPurposes] = useState<AccountPurpose[]>(
    initialAccount?.purposes || ['daily_spending']
  );
  const [fundsOwnership, setFundsOwnership] = useState<FundsOwnership>(
    initialAccount?.fundsOwnership || 'personal'
  );
  const [personalShareStr, setPersonalShareStr] = useState(
    initialAccount?.personalAvailableAmount !== null &&
      initialAccount?.personalAvailableAmount !== undefined
      ? String(initialAccount.personalAvailableAmount)
      : ''
  );
  const [isPrimary, setIsPrimary] = useState(initialAccount?.isPrimary ?? false);
  const [notes, setNotes] = useState(initialAccount?.notes || '');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePurpose = (p: AccountPurpose) => {
    setPurposes((prev) => {
      const next = prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p];
      // Auto-adjust default ownership if work_business or mixed is chosen
      if (p === 'work_business' && !prev.includes(p) && fundsOwnership === 'personal') {
        setFundsOwnership('work_business');
      } else if (p === 'mixed' && !prev.includes(p) && fundsOwnership === 'personal') {
        setFundsOwnership('mixed');
      }
      return next.length > 0 ? next : ['daily_spending'];
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter an account display name (e.g. Revolut Main).');
      return;
    }

    const parsedBal = balanceStr.trim() !== '' ? parseFloat(balanceStr) : null;
    if (balanceStr.trim() !== '' && isNaN(parsedBal!)) {
      setError('Please enter a valid number for the reported balance.');
      return;
    }

    const parsedPersonal =
      fundsOwnership !== 'personal' && personalShareStr.trim() !== ''
        ? parseFloat(personalShareStr)
        : null;

    saveAccount(
      {
        id: initialAccount?.id,
        name: name.trim(),
        institution: institution.trim() || name.trim(),
        currency: currency.toUpperCase(),
        purposes,
        fundsOwnership,
        personalAvailableAmount:
          fundsOwnership === 'personal' ? null : isNaN(parsedPersonal!) ? null : parsedPersonal,
        isPrimary,
        notes: notes.trim(),
      },
      parsedBal,
      balanceDate
    );
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={initialAccount ? 'Edit Account' : 'Add Bank Account'}
      >
        <div className="sheet-handle-bar" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-[#272e23]">
            {initialAccount ? 'Edit Account' : 'Add Bank Account'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#74766d] px-2 py-1"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-2.5 text-xs font-semibold text-red-800">
              {error}
            </div>
          )}

          {/* Quick Presets */}
          {!initialAccount && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#74766d] block mb-1">
                Quick Institution Fill
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Revolut Main', inst: 'Revolut', ccy: 'EUR', role: 'daily_spending' as AccountPurpose },
                  { name: 'Wise Hub', inst: 'Wise', ccy: 'EUR', role: 'receiving_income' as AccountPurpose },
                  { name: 'OTP Account', inst: 'OTP Bank', ccy: 'HUF', role: 'work_business' as AccountPurpose },
                  { name: 'MBANK Card', inst: 'MBANK', ccy: 'KGS', role: 'other' as AccountPurpose },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setName(preset.name);
                      setInstitution(preset.inst);
                      setCurrency(preset.ccy);
                      setPurposes([preset.role]);
                      if (preset.role === 'work_business') setFundsOwnership('mixed');
                    }}
                    className="rounded-lg border border-white/80 bg-white/60 px-2.5 py-1 text-[11px] font-semibold hover:bg-white"
                  >
                    + {preset.inst} ({preset.ccy})
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Account Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Revolut Main"
                className="vela-input"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Institution
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. Revolut, Wise"
                className="vela-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Currency *
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
                <option value="PLN">PLN (zł)</option>
                <option value="CHF">CHF (Fr)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                Balance (optional)
              </label>
              <input
                type="number"
                step="0.01"
                value={balanceStr}
                onChange={(e) => setBalanceStr(e.target.value)}
                placeholder="e.g. 450.00"
                className="vela-input"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
                As of Date
              </label>
              <input
                type="date"
                value={balanceDate}
                onChange={(e) => setBalanceDate(e.target.value)}
                className="vela-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1.5">
              What do you mainly use it for? (Select one or more)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PURPOSE_OPTIONS.map((opt) => {
                const active = purposes.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => togglePurpose(opt.value)}
                    className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold border transition ${
                      active
                        ? 'bg-[#386641] text-white border-[#386641]'
                        : 'bg-white/60 text-[#272e23] border-white/80'
                    }`}
                  >
                    {active ? '✓ ' : ''}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Funds Ownership / Work & Mixed handling */}
          <div className="rounded-xl bg-white/55 border border-white/80 p-3 space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#74766d] block">
              Who does the money in this account belong to?
            </label>
            <select
              value={fundsOwnership}
              onChange={(e) => setFundsOwnership(e.target.value as FundsOwnership)}
              className="vela-input"
            >
              {OWNERSHIP_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#74766d]">
              {OWNERSHIP_OPTIONS.find((o) => o.value === fundsOwnership)?.hint}
            </p>

            {fundsOwnership !== 'personal' && (
              <div className="pt-1">
                <label className="text-[11px] font-bold text-[#272e23] block mb-1">
                  How much of this balance is personally available to you? (optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={personalShareStr}
                  onChange={(e) => setPersonalShareStr(e.target.value)}
                  placeholder={`Leave blank if unknown (in ${currency})`}
                  className="vela-input"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isPrimary}
                onChange={(e) => setIsPrimary(e.target.checked)}
                className="size-4 accent-[#386641]"
              />
              <span>Mark as primary spending account</span>
            </label>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-[#74766d] block mb-1">
              Notes (optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Salary arrives here on the 10th"
              className="vela-input"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button type="submit" className="primary-action h-11 flex-1 rounded-xl text-xs font-bold">
              {initialAccount ? 'Save Changes' : 'Save Account'}
            </button>
            {initialAccount && !confirmDelete && (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="rounded-xl border border-red-400/50 bg-red-500/10 px-3 h-11 text-xs font-bold text-red-800"
              >
                Delete
              </button>
            )}
            {initialAccount && confirmDelete && (
              <button
                type="button"
                onClick={() => {
                  deleteAccount(initialAccount.id);
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
