import directory from '../../data/merchants-v1.json';
import type { SpendingCategory, TransactionClassification, TransactionRecord } from '@shared/pi/types';

export const statementModels = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemma-4-31b-it'] as const;

function normalized(text: string): string {
  return text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function bankType(row: TransactionRecord): string {
  return normalized(row.rawRow?.__bank_type || '');
}

export function bankOperationHint(row: TransactionRecord, owner: string) {
  const type = bankType(row);
  if (row.amount < 0 && /^(?:fee|bank fee|service fee|accrual charge)$/.test(type)) return 'bank_fee';
  if (/^(?:conversion|currency conversion|currency exchange|fx conversion)$/.test(type)) return 'currency_conversion';
  if (row.amount > 0 && type === 'deposit' && normalized(owner) && normalized(row.counterparty) === normalized(owner)) return 'possible_own_transfer';
  if (type === 'transfer') {
    const transfer = transferEvidence(row, owner, false);
    return transfer === 'own' ? 'possible_own_transfer' : transfer === 'external' ? 'external_transfer' : 'bank_transfer';
  }
}

export type BankOperationHint = ReturnType<typeof bankOperationHint>;

function isTransfer(row: TransactionRecord): boolean {
  const text = row.description + ' ' + (row.rawRow?.__bank_type || '');
  return /\b(?:transfer|sent to|received from|top[ -]?up|money sent|money received)\b/i.test(text) ||
    /(?:перевод|перечисление|пополнение)/iu.test(text);
}

function descriptor(text: string): string {
  return normalized(text.replace(/^\s*(?:POS|CARD PURCHASE|CARD PAYMENT)\s+(?:\d+\s+)?/i, ''));
}

export function merchantEvidence(row: TransactionRecord) {
  const names = [row.counterparty, row.description].map(descriptor).filter(Boolean);
  const entry = directory.entries.find(item => item.aliases.some(alias => names.includes(normalized(alias))))
    ?? directory.entries.find(item => !['processor', 'marketplace'].includes(item.kind) &&
      item.aliases.some(alias => names.some(name => name.startsWith(normalized(alias) + ' '))));
  if (!entry) return;
  return {
    merchantKey: entry.id,
    displayName: entry.canonicalName,
    category: (entry.possibleCategories.length === 1 ? entry.possibleCategories[0] : 'other') as SpendingCategory,
    subscription: entry.kind === 'subscription_service',
  };
}

export function transferEvidence(row: TransactionRecord, owner: string, paired: boolean): 'own' | 'external' | undefined {
  if (!isTransfer(row)) return paired ? 'own' : undefined;
  const namedParty = row.description.match(/^(?:(?:transfer|sent|received)\s+)?(?:to|from)\s+([^:;|]+)/i)?.[1];
  const party = namedParty || row.counterparty;
  if (!party || !owner || !normalized(owner)) return paired ? 'own' : undefined;
  if (normalized(party) === normalized(owner)) return 'own';
  const words = normalized(party).split(' ');
  if (words.length >= 2 && words.every(word => /^\p{L}+$/u.test(word)) && !/\b(?:bank|account|revolut|wise)\b/i.test(party)) return 'external';
  return paired ? 'own' : undefined;
}

export function localStatementLabel(row: TransactionRecord, owner: string, paired = false, hint = bankOperationHint(row, owner)): Pick<TransactionClassification,
  'displayName' | 'merchantKey' | 'category' | 'economicType' | 'confidence' | 'isRecurringCandidate' | 'isInternalTransferCandidate'> {
  const merchant = merchantEvidence(row);
  const transfer = hint === 'possible_own_transfer' ? 'own' : hint === 'external_transfer' ? 'external' : transferEvidence(row, owner, paired);
  const text = row.description + ' ' + (row.rawRow?.__bank_type || '');
  const transferLike = hint === 'bank_transfer' || isTransfer(row);
  const kind = hint === 'currency_conversion' ? 'internal_transfer' : hint === 'bank_fee' ? 'interest_fee'
    : transfer === 'own' ? 'unknown' : transfer === 'external' ? 'external_transfer'
    : /\b(?:refund|reversal)\b/i.test(text) && row.amount > 0 ? 'refund'
    : /\b(?:salary|payroll|stipend|wages|interest)\b/i.test(text) && row.amount > 0 ? 'income'
    : /\b(?:bank fee|service fee|interest charge)\b/i.test(text) && row.amount < 0 ? 'interest_fee'
    : transferLike ? 'unknown'
    : row.amount < 0 ? 'expense' : 'unknown';
  return {
    displayName: merchant?.displayName || row.counterparty || row.description,
    merchantKey: merchant?.merchantKey,
    category: kind === 'interest_fee' ? 'fees' : kind === 'internal_transfer' || transfer || transferLike ? 'transfer' : kind === 'income' ? 'income' : merchant?.category || 'other',
    economicType: kind,
    confidence: hint === 'bank_fee' || hint === 'currency_conversion' ? 'high' : transfer || merchant?.category !== undefined && merchant.category !== 'other' ? 'medium' : 'low',
    isRecurringCandidate: kind === 'expense' && merchant?.subscription === true,
    isInternalTransferCandidate: kind === 'unknown' && transfer === 'own',
  };
}

export function modelMerchantKey(name: string | undefined): string | undefined {
  const value = name && normalized(name);
  return value ? 'name:' + value : undefined;
}
