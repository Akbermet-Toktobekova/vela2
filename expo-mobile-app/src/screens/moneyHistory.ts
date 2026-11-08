import type { FinancialSnapshot } from "../../../shared/pi/types";

export type MoneyHistoryPoint = {
  date: number;
  cash: number | null;
  emergency: number;
  savings: number;
};

export type MoneySeriesKey = "cash" | "emergency" | "savings";

export function selectedMoneySeries(
  selection: MoneySeriesKey[],
): MoneySeriesKey[] {
  return (["cash", "emergency", "savings"] as const).filter((key) =>
    selection.includes(key),
  );
}

// Explicit sample-only observations; never merged into a user's financial records.
export function buildSampleMoneyHistory(): MoneyHistoryPoint[] {
  const values = [
    [1450, 100, 50],
    [1210, 140, 80],
    [1620, 200, 110],
    [1380, 240, 160],
    [1780, 320, 210],
    [1550, 380, 260],
    [1920, 450, 300],
    [1690, 520, 340],
    [2100, 650, 430],
  ];
  return values.map(([cash, emergency, savings], index) => ({
    date: Date.UTC(2026, 2 + index, 1),
    cash,
    emergency,
    savings,
  }));
}

// Recorded balances only: do not invent past balances from present-day totals.
export function buildMoneyHistory(
  snapshot: Pick<
    FinancialSnapshot,
    "baseCurrency" | "accountSummaries" | "goals" | "goalAllocations"
  >,
  throughDate = new Date().toISOString(),
): MoneyHistoryPoint[] {
  const day = (value: string) => Date.parse(`${value.slice(0, 10)}T00:00:00Z`);
  const end = day(throughDate);
  const accounts = snapshot.accountSummaries.filter(
    ({ account }) => account.currency === snapshot.baseCurrency,
  );
  const balances = accounts
    .flatMap(({ account, balanceHistory }) =>
      balanceHistory
        .filter(
          (b) =>
            b.currency === snapshot.baseCurrency && Number.isFinite(b.amount),
        )
        .map((b) => ({
          accountId: account.id,
          amount: b.amount,
          date: day(b.asOf),
          createdAt: b.createdAt,
        })),
    )
    .filter((b) => Number.isFinite(b.date) && b.date <= end)
    .sort((a, b) => a.date - b.date || a.createdAt.localeCompare(b.createdAt));
  const goalTypes = new Map(
    snapshot.goals
      .filter((g) => g.currency === snapshot.baseCurrency)
      .map((g) => [g.id, g.goalType]),
  );
  const allocations = snapshot.goalAllocations
    .filter(
      (a) =>
        a.currency === snapshot.baseCurrency &&
        goalTypes.has(a.goalId) &&
        Number.isFinite(a.amount),
    )
    .map((a) => ({ ...a, date: day(a.allocatedAt) }))
    .filter((a) => Number.isFinite(a.date) && a.date <= end);
  const dates = [
    ...new Set([
      ...balances.map((b) => b.date),
      ...allocations.map((a) => a.date),
    ]),
  ].sort((a, b) => a - b);
  if (!dates.length) return [];
  if (dates.at(-1) !== end) dates.push(end);
  return dates.map((date) => {
    const latest = new Map<string, number>();
    balances
      .filter((b) => b.date <= date)
      .forEach((b) => latest.set(b.accountId, b.amount));
    let emergency = 0;
    let savings = 0;
    allocations
      .filter((a) => a.date <= date)
      .forEach((a) => {
        const type = goalTypes.get(a.goalId);
        if (type === "emergency_cushion") emergency += a.amount;
        else if (type !== "debt_paydown") savings += a.amount;
      });
    return {
      date,
      cash:
        accounts.length > 0 && latest.size === accounts.length
          ? [...latest.values()].reduce((sum, value) => sum + value, 0)
          : null,
      emergency,
      savings,
    };
  });
}
