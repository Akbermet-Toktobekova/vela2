import type { FinancialSnapshot } from '@shared/pi/types';

export function observePatterns(snapshot: FinancialSnapshot, referenceDate = snapshot.createdAt.slice(0, 10)) {
  const transfers = new Set(snapshot.transferMatches.filter(pair => pair.status === 'matched' || pair.status === 'user_confirmed')
    .flatMap(pair => [pair.outgoingTransactionId, pair.incomingTransactionId]));
  const rows = snapshot.transactions.filter(row => row.date.slice(0, 10) <= referenceDate && !transfers.has(row.id) &&
    snapshot.classifications[row.id]?.economicType !== 'internal_transfer');
  const groups = new Map<string, typeof rows>();
  for (const row of rows) {
    const label = (row.counterparty || row.description).trim().toLowerCase();
    if (!label || row.amount === 0) continue;
    const key = JSON.stringify([row.accountId, row.currency, row.amount > 0 ? 'inflow' : 'outflow', label]);
    const group = groups.get(key) || [];
    group.push(row);
    groups.set(key, group);
  }
  const repeated = [...groups].filter(([, group]) => new Set(group.map(row => row.date.slice(0, 10))).size > 1)
    .map(([key, group]) => ({
      group: JSON.parse(key) as [string, string, string, string],
      observations: group.map(({ id, statementId, date, amount }) => ({ id, statementId, date, amount })),
      confirmation: 'observed_repeat_only',
    }));
  const coverage = snapshot.statements.map(({ id, accountId, currency, periodStart, periodEnd, status }) =>
    ({ id, accountId, currency, periodStart, periodEnd, status }));
  const comparableMonths = new Map<string, typeof rows>();
  for (const statement of coverage) {
    if (!statement.periodStart || !statement.periodEnd || statement.status !== 'parsed_successfully') continue;
    const end = new Date(`${statement.periodEnd.slice(0, 10)}T00:00:00Z`);
    const [year, month] = statement.periodStart.split('-').map(Number);
    const boundary = new Date(Date.UTC(year, month - 1, 1));
    if (boundary.toISOString().slice(0, 10) < statement.periodStart.slice(0, 10)) boundary.setUTCMonth(boundary.getUTCMonth() + 1);
    while (boundary <= end && boundary.toISOString().slice(0, 10) <= referenceDate) {
      const from = boundary.toISOString().slice(0, 10);
      boundary.setUTCMonth(boundary.getUTCMonth() + 1);
      const until = boundary.toISOString().slice(0, 10);
      const monthEnd = new Date(+boundary - 86_400_000).toISOString().slice(0, 10);
      if (end.toISOString().slice(0, 10) < monthEnd || referenceDate < monthEnd) break;
      const key = JSON.stringify([statement.accountId, statement.currency, from.slice(0, 7)]);
      const scoped = rows.filter(row => row.accountId === statement.accountId && row.currency === statement.currency &&
        row.date >= from && row.date.slice(0, 10) < until && row.amount < 0 &&
        ['expense', 'interest_fee', 'cash_withdrawal'].includes(snapshot.classifications[row.id]?.economicType ?? ''));
      comparableMonths.set(key, scoped);
    }
  }
  const outflows = [...comparableMonths].sort(([left], [right]) => left.localeCompare(right)).map(([key, monthRows]) => ({
    period: JSON.parse(key) as [string, string, string],
    observedOutflow: Number((-monthRows.reduce((sum, row) => sum + row.amount, 0)).toFixed(2)),
    transactionIds: monthRows.map(row => row.id),
    byCategory: monthRows.reduce<Record<string, number>>((totals, row) => {
      const category = snapshot.classifications[row.id]?.category ?? 'other';
      totals[category] = Number(((totals[category] ?? 0) - row.amount).toFixed(2));
      return totals;
    }, {}),
  }));
  const comparisons = outflows.flatMap((earlier, index) => outflows.slice(index + 1)
    .filter(later => earlier.period[0] === later.period[0] && earlier.period[1] === later.period[1])
    .map(later => ({ earlier, later })).sort((a, b) => a.later.period[2].localeCompare(b.later.period[2])));
  const summaryText = rows.length === 0
    ? 'Pattern Recognition found no statement activity to compare.'
    : `Pattern Recognition observed ${repeated.length} groups with movements on multiple dates and ${comparisons.length} comparable full-month outflow pairs. Recurrence, purpose and future timing require separate evidence.`;
  const fees = rows.filter(row => snapshot.classifications[row.id]?.economicType === 'interest_fee')
    .map(({ id, accountId, currency, amount, date }) => ({ id, accountId, currency, amount, date }));
  const largestByScope = new Map<string, typeof rows[number]>();
  for (const row of rows) {
    const key = JSON.stringify([row.accountId, row.currency, snapshot.classifications[row.id]?.category, Math.sign(row.amount)]);
    const largest = largestByScope.get(key);
    if (!largest || Math.abs(row.amount) > Math.abs(largest.amount)) largestByScope.set(key, row);
  }
  const extremes = [...largestByScope.values()].map(({ id, accountId, currency, amount, date }) =>
    ({ id, accountId, currency, amount, date, classification: 'largest_observed_only' }));
  const timing = snapshot.incomeSources.filter(income => income.nextExpectedDate).flatMap(income =>
    snapshot.upcomingUnpaidObligations.filter(bill => bill.currency === income.currency && bill.dueDate)
      .map(bill => ({ incomeId: income.id, obligationId: bill.id, currency: bill.currency,
        incomeDate: income.nextExpectedDate, obligationDate: bill.dueDate, referenceDate,
        billBeforeIncome: bill.dueDate! < income.nextExpectedDate! })));
  return { coverage, repeated, comparisons, fees, extremes, timing, summaryText };
}
