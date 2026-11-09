export * from '../../react-app/src/types/pi';

export interface FXRateEntry {
  base: string;
  target: string;
  rate: number;
  rateDate: string;
  fetchedAt: string;
  status: 'OK' | 'STALE' | 'UNAVAILABLE';
  source: string;
}

export interface ScheduledAutomaticTransfer {
  id: string;
  userId: string;
  fromAccountId: string;
  toAccountId: string | null;
  amount: number;
  currency: string;
  scheduledDate: string; // YYYY-MM-DD
  description: string;
  isActive: boolean;
}

export interface ExtendedDebtTerms {
  debtId: string;
  interestAccruing: boolean;
  promoEndDate?: string | null;
  promoBalance?: number | null;
  lateFeeAmount?: number | null;
  issuerContact?: string | null;
}

export interface DailyCashProjectionPoint {
  date: string; // YYYY-MM-DD
  dayOffset: number; // 0..90
  inflows: number;
  outflows: number;
  netCashSigned: number; // F004 — CAN BE NEGATIVE (never masked by max(0, ...))
  belowBufferFloor: boolean;
}

export interface CashflowProjectionSummary {
  /** Missing facts that prevent treating a partial projection as financially complete. */
  missingInputs?: string[];
  horizonDays: number;
  startingLiquidCash: number;
  bufferFloor: number;
  availableCashBeforeActionF003: number; // F003 = max(0, ...) for optional spending
  minProjectedCashSignedF004: number; // Minimum of F004 across [0, H] (negative = deficit!)
  minProjectedCashDate: string | null;
  hasProjectedDeficit: boolean;
  shortfallsByObligation: Array<{
    targetId: string;
    targetType: 'obligation' | 'debt_minimum' | 'auto_transfer';
    name: string;
    dueDate: string;
    amountDue: number;
    liquidAvailableByDue: number;
    shortfallAmountF019: number; // F019
  }>;
  dailyTrajectory: DailyCashProjectionPoint[];
  paymentCoverage?: CashflowProjectionSummary['shortfallsByObligation'];
}
