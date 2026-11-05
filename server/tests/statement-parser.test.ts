import { describe, expect, it } from 'vitest';
import { parseStatementCSVContent } from '../../react-app/src/services/statementParser';
import type { FinancialAccount, TransactionRecord } from '../../react-app/src/types/pi';

const account: FinancialAccount = {
  id: 'parser_account', userId: 'parser_user', name: 'Main', institution: 'Bank',
  currency: 'EUR', purposes: ['daily_spending'], fundsOwnership: 'personal',
  personalAvailableAmount: 0, isPrimary: true, notes: '', createdAt: '', updatedAt: '',
};

function parse(content: string, existingTransactions: TransactionRecord[] = []) {
  return parseStatementCSVContent({
    userId: account.userId, account, allAccounts: [account], fileName: 'statement.csv',
    content, existingStatements: [], existingTransactions,
  });
}

describe('Real CSV statement parser regressions', () => {
  it.each([
    ['1.234,56', 1234.56], ['1,234.56', 1234.56], ['1 234,56', 1234.56],
    ['1\u00a0234,56', 1234.56], ['1\u202f234.56', 1234.56], ['12,34', 12.34],
    ['-1.234,56', -1234.56], ['−1 234,56', -1234.56], ['(€1.234,56)', -1234.56],
    ['1.234,56-', -1234.56], ['+1,234.56', 1234.56], ['0', 0],
    ['1,234,567', 1234567], ['1.234.567', 1234567],
  ])('imports locale amount %s without changing its value', (raw, expected) => {
    const result = parse(`Date;Amount;Description\n2026-11-03;${raw};Salary`);
    expect(result.transactions).toHaveLength(1);
    expect(result.transactions[0].amount).toBe(expected);
    expect(result.statement.status).toBe('parsed_successfully');
  });

  it.each(['12oops', '1,23.45', '12.34,56', 'Infinity', '1e3', '--12', '1,234', '1.234', '12 34,56']) (
    'retains invalid or ambiguous amount %s for review instead of accepting a numeric prefix', (raw) => {
      const result = parse(`Date;Amount;Description\n2026-11-03;${raw};Salary\n2026-11-04;12,50;Salary`);
      expect(result.transactions.map((t) => t.amount)).toEqual([12.5]);
      expect(result.statement.status).toBe('needs_review');
      expect(result.statement.errorMessage).toContain('Row 2: Invalid or ambiguous amount');
      expect(result.rejectedRows?.[0].rawRow).toEqual(['2026-11-03', raw, 'Salary']);
      expect(result.rejectedRows?.[0].rawLine).toBe(`2026-11-03;${raw};Salary`);
    },
  );

  it.each(['2026-02-30', '2025-02-29', '2026-13-01', '31.04.2026', '2026-11-03garbage', '00/11/2026']) (
    'rejects invalid calendar date %s with a persisted warning', (date) => {
      const result = parse(`Date;Amount;Description\n${date};1;Salary`);
      expect(result.transactions).toEqual([]);
      expect(result.statement.status).toBe('failed');
      expect(result.statement.errorMessage).toContain('Invalid or unsupported calendar date');
      expect(result.rejectedRows).toHaveLength(1);
    },
  );

  it('accepts leap days and keeps the written date of timestamps', () => {
    const result = parse('Date;Amount;Description\n29.02.2024;1;Salary\n2026-11-03T23:00:00-03:00;2;Salary');
    expect(result.transactions.map((t) => t.date)).toEqual(['2024-02-29', '2026-11-03']);
  });

  it('skips repeated records within one upload while preserving distinct currencies and references', () => {
    const result = parse('Date;Amount;Description;Currency;Reference\n2026-11-03;-10;Groceries;EUR;a\n2026-11-03;-10;Groceries;EUR;a\n2026-11-03;-10;Groceries;USD;a\n2026-11-03;-10;Groceries;EUR;b');
    expect(result.transactions).toHaveLength(3);
    expect(result.statement.duplicateCountSkipped).toBe(1);
    expect(result.classifications).toHaveLength(3);
  });

  it('matches existing transactions only within the same user, account and currency', () => {
    const existing = parse('Date;Amount;Description;Currency;Reference\n2026-11-03;-10;Groceries;EUR;a').transactions[0];
    const foreign = [{ ...existing, accountId: 'other_account' }, { ...existing, userId: 'other_user' }, { ...existing, currency: 'USD' }];
    const csv = 'Date;Amount;Description;Currency;Reference\n2026-11-03;-10;Groceries;EUR;a';
    expect(parse(csv, foreign).transactions).toHaveLength(1);
    const duplicate = parse(csv, [existing]);
    expect(duplicate.transactions).toEqual([]);
    expect(duplicate.statement.duplicateCountSkipped).toBe(1);
  });

  it('handles quoted comma-delimited amounts and escaped descriptions', () => {
    const result = parse('Date,Amount,Description\n2026-11-03,"1,234.56","Salary, ""bonus"""');
    expect(result.transactions[0].amount).toBe(1234.56);
    expect(result.transactions[0].description).toBe('Salary, "bonus"');
  });

  it('flags malformed columns and unclosed quotes while importing valid rows', () => {
    const result = parse('Date;Amount;Description\n2026-11-03;1;"Salary\nend"\n2026-11-04;2;Salary;extra\n2026-11-05;3;Salary');
    expect(result.transactions.map((t) => t.amount)).toEqual([3]);
    expect(result.rejectedRows).toHaveLength(3);
    expect(result.statement.status).toBe('needs_review');
    expect(result.statement.errorMessage).toContain('Unclosed CSV quote');
    expect(result.statement.errorMessage).toContain('Column count');
  });

  it('withholds every multiline continuation, including bank-looking rows, until the closing quote', () => {
    const result = parse('Date;Amount;Description\n2026-11-03;1;"memo\n2026-11-04;999;Salary\n\nmore ""quoted"" text\nend"\n2026-11-05;3;Real');
    expect(result.transactions.map((t) => ({ date: t.date, amount: t.amount, description: t.description })))
      .toEqual([{ date: '2026-11-05', amount: 3, description: 'Real' }]);
    expect(result.rejectedRows?.map((r) => r.rowNumber)).toEqual([2, 3, 4, 5, 6]);
    expect(result.rejectedRows?.[1].rawLine).toBe('2026-11-04;999;Salary');
    expect(result.rejectedRows?.[2].rawLine).toBe('');
    expect(result.statement.status).toBe('needs_review');
    expect(result.classifications).toHaveLength(1);
  });

  it('does not recover bank-looking rows when a quoted record never closes', () => {
    const result = parse('Date;Amount;Description\n2026-11-03;1;"memo\n2026-11-04;999;Salary\n2026-11-05;3;Real');
    expect(result.transactions).toEqual([]);
    expect(result.classifications).toEqual([]);
    expect(result.rejectedRows?.map((r) => r.rowNumber)).toEqual([2, 3, 4]);
    expect(result.statement.status).toBe('failed');
    expect(result.statement.errorMessage).toContain('unsupported multiline field');
  });

  it('parses locale balances and warns when a running balance is malformed', () => {
    const result = parse('Date;Amount;Description;Balance\n2026-11-03;1;Salary;1.234,56\n2026-11-04;2;Salary;bad');
    expect(result.transactions).toHaveLength(2);
    expect(result.statement.closingBalance).toBeNull();
    expect(result.statement.status).toBe('needs_review');
    expect(result.statement.errorMessage).toContain('running balance');
    const valid = parse('Date;Amount;Description;Balance\n2026-11-03;1;Salary;1.234,56');
    expect(valid.statement.closingBalance).toBe(1234.56);
  });

  it('rejects malformed/conflicting debit-credit cells and retains valid signed amounts', () => {
    const result = parse('Date;Debit;Credit;Description\n2026-11-01;1.234,56;;Rent\n2026-11-02;;1,234.56;Salary\n2026-11-03;bad;10;Salary\n2026-11-04;10;20;Salary\n2026-11-05;0;;Salary');
    expect(result.transactions.map((t) => t.amount)).toEqual([-1234.56, 1234.56, 0]);
    expect(result.rejectedRows).toHaveLength(2);
    expect(result.statement.status).toBe('needs_review');
  });
});
