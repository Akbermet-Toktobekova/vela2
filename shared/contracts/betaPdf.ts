export type BetaPdfCorrection = {date: string; description: string; amount: number};
export type BetaPdfMapping = {
  expectedVersion: number;
  accounts: Record<string, string>;
  excludedRows: string[];
  corrections: Record<string, BetaPdfCorrection>;
};
export type BetaPdfSourceRow = {page: number; line: number; text: string};
export type BetaPdfOperation = BetaPdfSourceRow & {
  date: string; description: string; amount: number; currency: string; balance: number | null;
};
export type BetaPdfIssue = BetaPdfSourceRow & {id: string; currency: string; reason: string};
export type BetaPdfReview = {
  groups: {currency: string; accountId?: string; operations: BetaPdfOperation[]; duplicates: number}[];
  issues: BetaPdfIssue[];
  excluded: Record<string, {pending: number; summary: number}>;
  excludedRows?: string[];
  corrections?: BetaPdfMapping['corrections'];
};
