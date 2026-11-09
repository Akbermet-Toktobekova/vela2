import policy from '../../config/prototype-policy.json';
import { SharedFinancialCalculator } from '@shared/calculator';
import type { ConfirmedSubscription, PIDatabaseSeed } from '@shared/profile/seed';

export function refreshDetectedSubscriptions(state: PIDatabaseSeed): void {
  if (state.preferences.statementReviewMode !== 'automatic') return;
  const previous = state.subscriptions || [];
  const retained = previous.filter(row => !row.detected);
  const labels = new Map(state.classifications.map(row => [row.transactionId, row]));
  const byService = new Map<string, typeof state.transactions>();
  for (const row of state.transactions) {
    const label = labels.get(row.id);
    if (row.excluded || row.amount >= 0 || label?.economicType !== 'expense' ||
        label.category !== 'subscriptions' || !label.isRecurringCandidate) continue;
    const key = JSON.stringify([row.accountId, row.currency, label.merchantKey || label.displayName || row.description]);
    const service = byService.get(key);
    if (service) service.push(row);
    else byService.set(key, [row]);
  }
  const detected: ConfirmedSubscription[] = [];
  const today = new Date().toISOString().slice(0, 10);
  for (const [key, rows] of byService) {
    rows.sort((a, b) => a.date.localeCompare(b.date));
    const last = rows.at(-1)!;
    const label = labels.get(last.id)!;
    const name = label.displayName || last.counterparty || last.description;
    const rowIds = new Set(rows.map(row => row.id));
    if (retained.some(sub => sub.merchantKey === key || sub.transactionIds.some(id => rowIds.has(id)) ||
      sub.currency === last.currency && sub.originAccountId === last.accountId && sub.name.toLowerCase() === name.toLowerCase())) continue;
    const dates = [...new Set(rows.map(row => row.date))];
    let frequency: ConfirmedSubscription['frequency'];
    if (dates.length >= policy.findingDetectionPolicy.minimumDistinctChargeDates &&
      dates.length === rows.length && rows.every(row => row.amount === last.amount)) {
      const gaps = dates.slice(1).map((date, index) => (Date.parse(date) - Date.parse(dates[index])) / 86400000);
      const cadence = policy.findingDetectionPolicy.cadenceDays;
      for (const value of ['weekly', 'monthly', 'yearly'] as const) {
        const [min, max] = cadence[value === 'yearly' ? 'annual' : value];
        if (gaps.every(gap => gap >= min && gap <= max)) {
          frequency = value;
          break;
        }
      }
    }
    const next = frequency && SharedFinancialCalculator.getScheduledOccurrenceDates(
      last.date, frequency, last.date, policy.findingDetectionPolicy.cadenceDays[frequency === 'yearly' ? 'annual' : frequency][1],
    )[1];
    detected.push({
      id: previous.find(sub => sub.merchantKey === key)?.id || 'detected:' + rows[0].id,
      name, merchantKey: key, detected: true, amount: Math.abs(last.amount), currency: last.currency,
      frequency, nextDueDate: next && next >= today ? next : undefined,
      status: 'active', includedInEssentials: false, originAccountId: last.accountId,
      transactionIds: rows.map(row => row.id),
    });
  }
  state.subscriptions = [...retained, ...detected];
}
