import {
FinancialAccount,
TransactionClassification,
TransactionRecord,
TransferMatch,
UserConfirmation,
} from '../pi/types';

export function reconcileTransfersAndConfirmations(params: {
  userId: string;
  accounts: FinancialAccount[];
  transactions: TransactionRecord[];
  classifications: TransactionClassification[];
  existingMatches: TransferMatch[];
  existingConfirmations: UserConfirmation[];
}): {
  transferMatches: TransferMatch[];
  confirmations: UserConfirmation[];
  updatedClassifications: TransactionClassification[];
} {
  const {
    userId,
    accounts,
    transactions,
    classifications,
    existingMatches,
    existingConfirmations,
  } = params;

  const clsMap = new Map<string, TransactionClassification>();
  classifications.forEach((c) => clsMap.set(c.transactionId, { ...c }));

  const matches: TransferMatch[] = [...existingMatches];
  const confirmations: UserConfirmation[] = [...existingConfirmations];

  const outflows = transactions.filter((t) => t.amount < 0);
  const inflows = transactions.filter((t) => t.amount > 0);

  // 1. Pairwise match between two imported accounts
  for (const out of outflows) {
    for (const inc of inflows) {
      if (out.accountId === inc.accountId) continue;
      if (out.currency !== inc.currency) continue;

      const amountDiff = Math.abs(Math.abs(out.amount) - Math.abs(inc.amount));
      // Allow up to 2% fee difference or exact match
      const isSimilarAmount = amountDiff < 0.05 || amountDiff / Math.abs(out.amount) <= 0.02;
      if (!isSimilarAmount) continue;

      const d1 = new Date(out.date).getTime();
      const d2 = new Date(inc.date).getTime();
      const dayDiff = Math.abs(d1 - d2) / (1000 * 60 * 60 * 24);
      if (dayDiff > 4) continue;

      const alreadyMatched = matches.some(
        (m) => m.outgoingTransactionId === out.id && m.incomingTransactionId === inc.id
      );
      if (!alreadyMatched) {
        const refMatch = Boolean(out.reference && out.reference === inc.reference);
        const matchStatus = refMatch ? 'matched' : 'probable';

        const newMatch: TransferMatch = {
          id: `match_${out.id}_${inc.id}`,
          userId,
          outgoingTransactionId: out.id,
          incomingTransactionId: inc.id,
          outgoingAccountId: out.accountId,
          incomingAccountId: inc.accountId,
          amount: Math.abs(inc.amount),
          currency: inc.currency,
          date: inc.date,
          description: `${out.description} ↔ ${inc.description}`,
          status: matchStatus,
        };
        matches.push(newMatch);

        // Update both classifications to internal_transfer
        const outCls = clsMap.get(out.id);
        if (outCls && outCls.status !== 'user_confirmed') {
          outCls.economicType = 'internal_transfer';
          outCls.category = 'transfer';
          outCls.provenanceNote = `Matched transfer to ${inc.accountId}`;
        }
        const incCls = clsMap.get(inc.id);
        if (incCls && incCls.status !== 'user_confirmed') {
          incCls.economicType = 'internal_transfer';
          incCls.category = 'transfer';
          incCls.provenanceNote = `Matched transfer from ${out.accountId}`;
        }
      }
    }
  }

  // 2. Single-sided transfers (when only one account's statement is imported)
  for (const txn of transactions) {
    const cls = clsMap.get(txn.id);
    if (!cls) continue;

    if (cls.economicType === 'internal_transfer') {
      const hasConfirmation = confirmations.some((c) => c.subjectId === txn.id);
      if (!hasConfirmation && cls.status !== 'user_confirmed') {
        const acct = accounts.find((a) => a.id === txn.accountId);
        confirmations.push({
          id: `conf_trf_${txn.id}`,
          userId,
          subjectType: 'transfer',
          subjectId: txn.id,
          questionText: `Is "${txn.description}" (${txn.currency} ${Math.abs(txn.amount).toFixed(2)}) an internal transfer between your own accounts?`,
          impactReason: `Prevents double-counting ${txn.currency} ${Math.abs(txn.amount).toFixed(2)} as ${txn.amount > 0 ? 'new income' : 'personal spending'}.`,
          amountLabel: `${txn.currency} ${Math.abs(txn.amount).toFixed(2)} · ${txn.date}`,
          field: 'economicType',
          userResponse: null,
          confirmedValue: null,
          confirmedAt: null,
        });
        if (acct) {
          // ensure probable match entry exists if not paired
          const hasMatch = matches.some(
            (m) => m.incomingTransactionId === txn.id || m.outgoingTransactionId === txn.id
          );
          if (!hasMatch) {
            matches.push({
              id: `match_single_${txn.id}`,
              userId,
              outgoingTransactionId: txn.amount < 0 ? txn.id : 'unimported_counterpart',
              incomingTransactionId: txn.amount > 0 ? txn.id : null,
              outgoingAccountId: txn.amount < 0 ? txn.accountId : 'external_or_unimported',
              incomingAccountId: txn.amount > 0 ? txn.accountId : null,
              amount: Math.abs(txn.amount),
              currency: txn.currency,
              date: txn.date,
              description: txn.description,
              status: 'probable',
            });
          }
        }
      }
    }

    // 3. Impact-based subscription confirmation
    if (cls.category === 'subscriptions' && Math.abs(txn.amount) >= 10) {
      const hasSubConf = confirmations.some((c) => c.subjectId === txn.id);
      if (!hasSubConf && cls.status === 'needs_review') {
        confirmations.push({
          id: `conf_sub_${txn.id}`,
          userId,
          subjectType: 'subscription',
          subjectId: txn.id,
          questionText: `Is the recurring "${txn.description}" (${txn.currency} ${Math.abs(txn.amount).toFixed(2)}) still a service you actively use?`,
          impactReason: `Confirms whether ${txn.currency} ${(Math.abs(txn.amount) * 12).toFixed(0)}/yr is an essential subscription or a cancellation candidate.`,
          amountLabel: `${txn.currency} ${Math.abs(txn.amount).toFixed(2)}/mo · ${txn.date}`,
          field: 'subscriptionActive',
          userResponse: null,
          confirmedValue: null,
          confirmedAt: null,
        });
      }
    }
  }

  return {
    transferMatches: matches,
    confirmations,
    updatedClassifications: Array.from(clsMap.values()),
  };
}
