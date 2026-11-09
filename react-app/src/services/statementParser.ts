import {
  StatementImport,
  TransactionRecord,
  TransactionClassification,
  FinancialAccount,
  SpendingCategory,
  TransactionEconomicType,
} from '../types/pi';

export interface ParsedStatementOutcome {
  statement: StatementImport;
  transactions: TransactionRecord[];
  classifications: TransactionClassification[];
  /** Invalid records are retained for review, never converted into financial transactions. */
  rejectedRows?: Array<{ rowNumber: number; rawLine: string; rawRow: string[]; reason: string }>;
}

export function computeSimpleHash(content: string): string {
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = (hash * 33) ^ content.charCodeAt(i);
  }
  return 'hash_' + (hash >>> 0).toString(16) + '_' + content.length;
}

function parseCSVLines(text: string): {
  rows: string[][];
  malformedRows: Set<number>;
  sourceLines: Array<{ rowNumber: number; rawLine: string }>;
} {
  const rows: string[][] = [];
  const malformedRows = new Set<number>();
  const sourceLines: Array<{ rowNumber: number; rawLine: string }> = [];
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  // Detect delimiter (comma vs semicolon)
  const firstNonEmpty = lines.find((l) => l.trim().length > 0) || '';
  const commaCount = (firstNonEmpty.match(/,/g) || []).length;
  const semiCount = (firstNonEmpty.match(/;/g) || []).length;
  const delimiter = semiCount > commaCount ? ';' : ',';

  // This parser does not import multiline fields. Keep quote state across physical
  // lines so their contents can never be mistaken for independent bank records.
  let inQuotes = false;
  for (const [lineIndex, line] of lines.entries()) {
    if (!line.trim() && !inQuotes) continue;
    const continuedQuotedField = inQuotes;
    const row: string[] = [];
    let current = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === delimiter && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    row.push(current.trim());
    if (inQuotes || continuedQuotedField) malformedRows.add(rows.length);
    rows.push(row);
    sourceLines.push({ rowNumber: lineIndex + 1, rawLine: line });
  }
  return { rows, malformedRows, sourceLines };
}

function normalizeDate(raw: string): string | null {
  const cleaned = raw.trim().replace(/^["']|["']$/g, '');
  if (!cleaned) return null;

  // Keep the statement's calendar day, including when an ISO timestamp has an offset.
  const suffix = '(?:[ T](?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?(?:Z|[+-](?:[01]\\d|2[0-3]):?[0-5]\\d)?)?';
  const isoMatch = cleaned.match(new RegExp(`^(\\d{4})-(\\d{2})-(\\d{2})${suffix}$`));
  const dmyMatch = cleaned.match(new RegExp(`^(\\d{1,2})([./-])(\\d{1,2})\\2(\\d{4})${suffix}$`));
  if (!isoMatch && !dmyMatch) return null;
  const year = Number(isoMatch ? isoMatch[1] : dmyMatch![4]);
  const month = Number(isoMatch ? isoMatch[2] : dmyMatch![3]);
  const day = Number(isoMatch ? isoMatch[3] : dmyMatch![1]);
  if (year < 1 || month < 1 || month > 12 || day < 1) return null;
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const monthDays = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > monthDays[month - 1]) return null;
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function normalizeAmount(raw: string): number | null {
  if (!raw) return null;
  let s = raw.trim().replace(/\u2212/g, '-').replace(/[€$£¥₴₽]/g, '').trim();
  if (!s) return null;

  let isNegative = false;
  if (s.startsWith('(') && s.endsWith(')')) {
    isNegative = true;
    s = s.slice(1, -1).trim();
  }
  if (s.endsWith('-')) {
    if (isNegative || /^[+-]/.test(s)) return null;
    isNegative = true;
    s = s.slice(0, -1).trim();
  }
  if (isNegative && /^[+-]/.test(s)) return null;
  const sign = /^[+-]/.test(s) ? s[0] : '';
  if (sign) s = s.slice(1).trim();

  // Spaces (including NBSP/narrow NBSP) are valid only as three-digit grouping.
  if (/\s/.test(s)) {
    if (!/^\d{1,3}(?:\s\d{3})+(?:[.,]\d+)?$/.test(s)) return null;
    s = s.replace(/\s/g, '');
  }
  const comma = s.lastIndexOf(',');
  const dot = s.lastIndexOf('.');
  if (comma !== -1 && dot !== -1) {
    const decimal = comma > dot ? ',' : '.';
    const grouping = decimal === ',' ? '.' : ',';
    const [whole, fraction, extra] = s.split(decimal);
    if (extra !== undefined || !/^\d+$/.test(fraction || '')) return null;
    const groups = whole.split(grouping);
    if (!/^\d{1,3}$/.test(groups[0]) || groups.slice(1).some((g) => !/^\d{3}$/.test(g))) return null;
    s = groups.join('') + '.' + fraction;
  } else if (comma !== -1 || dot !== -1) {
    const separator = comma !== -1 ? ',' : '.';
    const parts = s.split(separator);
    if (parts.length > 2) {
      if (!/^\d{1,3}$/.test(parts[0]) || parts.slice(1).some((g) => !/^\d{3}$/.test(g))) return null;
      s = parts.join('');
    } else {
      // A lone separator before three digits is ambiguous without a bank/locale setting.
      if (/^\d{1,3}$/.test(parts[0]) && /^\d{3}$/.test(parts[1])) return null;
      s = parts.join('.');
    }
  }
  if (!/^\d+(?:\.\d+)?$/.test(s)) return null;
  const num = Number(sign + s);
  if (!Number.isFinite(num)) return null;
  return isNegative ? -Math.abs(num) : num;
}

export function autoClassifyTransaction(
  txn: TransactionRecord,
  allUserAccounts: FinancialAccount[]
): TransactionClassification {
  const desc = (txn.description + ' ' + txn.counterparty).toLowerCase();
  const now = new Date().toISOString();

  let economicType: TransactionEconomicType = txn.amount >= 0 ? 'income' : 'expense';
  let category: SpendingCategory = txn.amount >= 0 ? 'income' : 'other';
  let confidence: 'high' | 'medium' | 'low' = 'medium';
  let status: 'auto_classified' | 'needs_review' | 'user_confirmed' = 'auto_classified';
  let isRecurringCandidate = false;
  let provenanceNote = 'Classified by local deterministic rules';

  // Check if transfer between owned accounts
  const otherAccounts = allUserAccounts.filter((a) => a.id !== txn.accountId);
  const mentionsOwnedInstitution = otherAccounts.some(
    (a) =>
      desc.includes(a.name.toLowerCase()) ||
      desc.includes(a.institution.toLowerCase()) ||
      desc.includes('wise') ||
      desc.includes('revolut') ||
      desc.includes('internal transfer') ||
      desc.includes('own account')
  );

  if (mentionsOwnedInstitution || desc.includes('transfer to ') || desc.includes('transfer from ')) {
    economicType = 'internal_transfer';
    category = 'transfer';
    confidence = 'medium';
    status = 'needs_review';
    provenanceNote = 'Detected transfer keyword matching user accounts';
  } else if (txn.amount > 0) {
    if (
      desc.includes('payroll') ||
      desc.includes('salary') ||
      desc.includes('stipend') ||
      desc.includes('scholarship') ||
      desc.includes('grant') ||
      desc.includes('wage')
    ) {
      economicType = 'income';
      category = 'income';
      confidence = 'high';
      isRecurringCandidate = true;
      provenanceNote = 'Matched earned income / scholarship inflow';
    } else if (desc.includes('refund') || desc.includes('reversal')) {
      economicType = 'refund';
      category = 'shopping';
      confidence = 'high';
      provenanceNote = 'Merchant refund detected';
    } else {
      economicType = 'income';
      category = 'income';
      confidence = 'low';
      status = Math.abs(txn.amount) >= 200 ? 'needs_review' : 'auto_classified';
      provenanceNote = 'Unclassified positive inflow';
    }
  } else {
    // Outflows (amount < 0)
    if (desc.includes('rent') || desc.includes('landlord') || desc.includes('property') || desc.includes('housing')) {
      category = 'rent_housing';
      confidence = 'high';
      isRecurringCandidate = true;
      provenanceNote = 'Housing / rent payment';
    } else if (desc.includes('energy') || desc.includes('electric') || desc.includes('water') || desc.includes('gas') || desc.includes('utility')) {
      category = 'utilities_energy';
      confidence = 'high';
      isRecurringCandidate = true;
      provenanceNote = 'Utility bill payment';
    } else if (desc.includes('fiber') || desc.includes('internet') || desc.includes('telecom') || desc.includes('wifi') || desc.includes('mobile')) {
      category = 'internet_telecom';
      confidence = 'high';
      isRecurringCandidate = true;
      provenanceNote = 'Telecom / internet recurring payment';
    } else if (
      desc.includes('sub') ||
      desc.includes('monthly plan') ||
      desc.includes('stream') ||
      desc.includes('cloud') ||
      desc.includes('spotify') ||
      desc.includes('netflix') ||
      desc.includes('icloud')
    ) {
      category = 'subscriptions';
      confidence = 'high';
      isRecurringCandidate = true;
      status = 'needs_review';
      provenanceNote = 'Recurring subscription candidate';
    } else if (desc.includes('grocer') || desc.includes('mart') || desc.includes('market') || desc.includes('supermarket') || desc.includes('lidl') || desc.includes('aldi') || desc.includes('tesco')) {
      category = 'groceries_food';
      confidence = 'high';
      provenanceNote = 'Grocery merchant';
    } else if (desc.includes('bistro') || desc.includes('cafe') || desc.includes('coffee') || desc.includes('dining') || desc.includes('restaurant')) {
      category = 'dining_coffee';
      confidence = 'medium';
      provenanceNote = 'Dining & coffee';
    } else if (desc.includes('transit') || desc.includes('metro') || desc.includes('train') || desc.includes('rail') || desc.includes('uber') || desc.includes('bolt')) {
      category = 'transport';
      confidence = 'high';
      provenanceNote = 'Transport & mobility';
    } else if (desc.includes('credit') || desc.includes('loan') || desc.includes('visa card') || desc.includes('minimum payment')) {
      economicType = 'debt_payment';
      category = 'other';
      confidence = 'high';
      isRecurringCandidate = true;
      provenanceNote = 'Debt / credit card servicing payment';
    } else if (desc.includes('fee') || desc.includes('interest') || desc.includes('commission')) {
      economicType = 'interest_fee';
      category = 'other';
      confidence = 'high';
      provenanceNote = 'Bank fee or interest charge';
    } else if (desc.includes('atm') || desc.includes('cash withdrawal')) {
      economicType = 'cash_withdrawal';
      category = 'other';
      confidence = 'high';
      provenanceNote = 'Cash withdrawal';
    } else if (desc.includes('work') || desc.includes('client') || desc.includes('reimburse')) {
      economicType = 'work_business_movement';
      category = 'work_expense';
      confidence = 'medium';
      status = 'needs_review';
      provenanceNote = 'Work-related disbursement';
    } else if (desc.includes('book') || desc.includes('tuition') || desc.includes('university') || desc.includes('academic')) {
      category = 'education';
      confidence = 'high';
      provenanceNote = 'Education & academic expense';
    }
  }

  return {
    id: `cls_${txn.id}`,
    transactionId: txn.id,
    economicType,
    category,
    confidence,
    status,
    classifierVersion: '1.0',
    isRecurringCandidate,
    provenanceNote,
    updatedAt: now,
  };
}

export function parseStatementCSVContent(params: {
  userId: string;
  account: FinancialAccount;
  allAccounts: FinancialAccount[];
  fileName: string;
  content: string;
  existingStatements: StatementImport[];
  existingTransactions: TransactionRecord[];
  preserveRepeatedRows?: boolean;
}): ParsedStatementOutcome {
  const {
    userId,
    account,
    allAccounts,
    fileName,
    content,
    existingStatements,
    existingTransactions,
    preserveRepeatedRows = false,
  } = params;

  const now = new Date().toISOString();
  const stmtId = `stmt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  const fileHash = computeSimpleHash(content);

  // Check duplicate file upload on same account
  const duplicateFile = existingStatements.find(
    (s) => s.accountId === account.id && s.fileHash === fileHash && s.status === 'parsed_successfully'
  );
  if (duplicateFile) {
    return {
      statement: {
        id: stmtId,
        userId,
        accountId: account.id,
        fileName,
        fileFormat: 'csv',
        fileHash,
        periodStart: duplicateFile.periodStart,
        periodEnd: duplicateFile.periodEnd,
        currency: account.currency,
        transactionCount: 0,
        duplicateCountSkipped: duplicateFile.transactionCount,
        status: 'failed',
        errorMessage: `Duplicate file detected: "${duplicateFile.fileName}" was already imported for ${account.name}.`,
        closingBalance: null,
        importedAt: now,
      },
      transactions: [],
      classifications: [],
    };
  }

  // Handle non-CSV formats transparently
  if (ext !== 'csv' && ext !== 'txt') {
    const fileFormat = ext === 'pdf' ? 'pdf' : ext === 'xlsx' || ext === 'xls' ? 'xlsx' : 'unknown';
    return {
      statement: {
        id: stmtId,
        userId,
        accountId: account.id,
        fileName,
        fileFormat,
        fileHash,
        periodStart: null,
        periodEnd: null,
        currency: account.currency,
        transactionCount: 0,
        duplicateCountSkipped: 0,
        status: 'unsupported_format',
        errorMessage: `Unsupported format (.${ext || 'unknown'}). This browser prototype parses real CSV bank statements locally and never fabricates transactions from unverified binary/PDF files. Please export your statement as CSV.`,
        closingBalance: null,
        importedAt: now,
      },
      transactions: [],
      classifications: [],
    };
  }

  const { rows, malformedRows, sourceLines } = parseCSVLines(content);
  if (rows.length < 2) {
    return {
      statement: {
        id: stmtId,
        userId,
        accountId: account.id,
        fileName,
        fileFormat: 'csv',
        fileHash,
        periodStart: null,
        periodEnd: null,
        currency: account.currency,
        transactionCount: 0,
        duplicateCountSkipped: 0,
        status: 'failed',
        errorMessage: 'The CSV file is empty or contains no transaction rows.',
        closingBalance: null,
        importedAt: now,
      },
      transactions: [],
      classifications: [],
    };
  }

  const headers = rows[0].map((h) => h.toLowerCase().trim());
  const dateIdx = headers.findIndex((h) =>
    ['date', 'transaction date', 'completed date', 'booking date', 'started date', 'time'].includes(h)
  );
  const descIdx = headers.findIndex((h) =>
    ['description', 'details', 'narrative', 'name', 'merchant', 'title', 'memo'].includes(h)
  );
  const counterpartyIdx = headers.findIndex((h) =>
    ['counterparty', 'payee', 'beneficiary', 'sender', 'partner'].includes(h)
  );
  const amountIdx = headers.findIndex((h) =>
    ['amount', 'value', 'total', 'signed amount', 'net amount'].includes(h)
  );
  const debitIdx = headers.findIndex((h) => ['debit', 'outflow', 'paid out', 'withdrawal'].includes(h));
  const creditIdx = headers.findIndex((h) => ['credit', 'inflow', 'paid in', 'deposit'].includes(h));
  const currencyIdx = headers.findIndex((h) => ['currency', 'ccy', 'curr'].includes(h));
  const refIdx = headers.findIndex((h) => ['reference', 'ref', 'id', 'transaction id'].includes(h));
  const balanceIdx = headers.findIndex((h) => ['balance', 'closing balance', 'running balance'].includes(h));

  if (dateIdx === -1 || (amountIdx === -1 && debitIdx === -1 && creditIdx === -1)) {
    return {
      statement: {
        id: stmtId,
        userId,
        accountId: account.id,
        fileName,
        fileFormat: 'csv',
        fileHash,
        periodStart: null,
        periodEnd: null,
        currency: account.currency,
        transactionCount: 0,
        duplicateCountSkipped: 0,
        status: 'failed',
        errorMessage:
          'Missing required CSV columns. Expected at least a Date column and an Amount (or Debit/Credit) column.',
        closingBalance: null,
        importedAt: now,
      },
      transactions: [],
      classifications: [],
    };
  }

  const existingAcctTxns = existingTransactions.filter((t) => t.accountId === account.id && t.userId === userId);
  const parsedTransactions: TransactionRecord[] = [];
  const parsedClassifications: TransactionClassification[] = [];
  let duplicateCountSkipped = 0;
  let latestClosingBalance: number | null = null;
  let latestBalanceDate = '';
  const rejectedRows: NonNullable<ParsedStatementOutcome['rejectedRows']> = [];
  const rowWarnings: string[] = [];
  const rejectRow = (index: number, row: string[], reason: string) => {
    rejectedRows.push({ ...sourceLines[index], rawRow: [...row], reason });
    rowWarnings.push(`Row ${sourceLines[index].rowNumber}: ${reason}`);
  };

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (malformedRows.has(i)) {
      rejectRow(i, row, 'Unclosed CSV quote or continuation of an unsupported multiline field; review the original record.');
      continue;
    }
    if (row.length === 0 || row.every((c) => !c.trim())) continue;
    if (row.length !== headers.length) {
      rejectRow(i, row, 'Column count does not match the header.');
      continue;
    }

    const dateVal = normalizeDate(row[dateIdx] || '');
    if (!dateVal) {
      rejectRow(i, row, 'Invalid or unsupported calendar date.');
      continue;
    }

    let amountVal: number | null = null;
    if (amountIdx !== -1) {
      amountVal = normalizeAmount(row[amountIdx] || '');
    } else {
      const deb = debitIdx !== -1 ? normalizeAmount(row[debitIdx] || '') : null;
      const cred = creditIdx !== -1 ? normalizeAmount(row[creditIdx] || '') : null;
      const invalidDebit = debitIdx !== -1 && Boolean(row[debitIdx]?.trim()) && deb === null;
      const invalidCredit = creditIdx !== -1 && Boolean(row[creditIdx]?.trim()) && cred === null;
      if (!invalidDebit && !invalidCredit && !(deb && cred)) {
        if (deb !== null && deb !== 0) amountVal = -Math.abs(deb);
        else if (cred !== null && cred !== 0) amountVal = Math.abs(cred);
        else if (deb === 0 || cred === 0) amountVal = 0;
      }
    }

    if (amountVal === null) {
      rejectRow(i, row, 'Invalid or ambiguous amount; confirm number formatting and Debit/Credit fields.');
      continue;
    }

    const description =
      (descIdx !== -1 ? row[descIdx] : '') ||
      (counterpartyIdx !== -1 ? row[counterpartyIdx] : '') ||
      `Transaction #${i}`;
    const counterparty = counterpartyIdx !== -1 ? row[counterpartyIdx] || '' : '';
    const currency = (currencyIdx !== -1 && row[currencyIdx] ? row[currencyIdx].toUpperCase() : account.currency).trim();
    const reference = refIdx !== -1 ? row[refIdx] || '' : '';

    if (balanceIdx !== -1 && row[balanceIdx]) {
      const bal = normalizeAmount(row[balanceIdx]);
      if (bal !== null && dateVal >= latestBalanceDate) {
        latestBalanceDate = dateVal;
        latestClosingBalance = bal;
      } else if (bal === null) {
        rowWarnings.push(`Row ${sourceLines[i].rowNumber}: Invalid or ambiguous running balance; balance was not imported.`);
        if (dateVal >= latestBalanceDate) {
          latestBalanceDate = dateVal;
          latestClosingBalance = null;
        }
      }
    }

    // Check if duplicate transaction already exists on this account
    const duplicateIndex = existingAcctTxns.findIndex(
      (existing) =>
        existing.date === dateVal &&
        existing.currency.toUpperCase() === currency &&
        Math.abs(existing.amount - amountVal!) < 0.005 &&
        existing.description.toLowerCase() === description.toLowerCase() &&
        (reference ? existing.reference === reference : true)
    );

    if (duplicateIndex >= 0) {
      if (preserveRepeatedRows) existingAcctTxns.splice(duplicateIndex, 1);
      duplicateCountSkipped++;
      continue;
    }

    const rawRow: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rawRow[h] = row[idx] || '';
    });
    rawRow.__source_row = String(sourceLines[i].rowNumber);

    const txn: TransactionRecord = {
      id: `txn_${stmtId}_${i}`,
      userId,
      accountId: account.id,
      statementId: stmtId,
      date: dateVal,
      amount: amountVal,
      currency,
      description,
      counterparty,
      reference,
      rawRow,
      createdAt: now,
    };

    const cls = autoClassifyTransaction(txn, allAccounts);
    parsedTransactions.push(txn);
    // Also compare subsequent rows against transactions accepted from this upload.
    if (!preserveRepeatedRows) existingAcctTxns.push(txn);
    parsedClassifications.push(cls);
  }

  if (parsedTransactions.length === 0 && duplicateCountSkipped === 0) {
    return {
      statement: {
        id: stmtId,
        userId,
        accountId: account.id,
        fileName,
        fileFormat: 'csv',
        fileHash,
        periodStart: null,
        periodEnd: null,
        currency: account.currency,
        transactionCount: 0,
        duplicateCountSkipped: 0,
        status: 'failed',
        errorMessage: ['No valid date and amount rows could be parsed from the CSV file.', ...rowWarnings].join(' '),
        closingBalance: null,
        importedAt: now,
      },
      transactions: [],
      classifications: [],
      rejectedRows,
    };
  }

  const dates = parsedTransactions.map((t) => t.date).sort();
  const periodStart = dates[0] || null;
  const periodEnd = dates[dates.length - 1] || null;

  // Check overlapping statement periods on the same account
  let overlapWarning: string | undefined;
  if (periodStart && periodEnd) {
    const overlapping = existingStatements.find(
      (s) =>
        s.accountId === account.id &&
        s.periodStart &&
        s.periodEnd &&
        s.periodStart <= periodEnd &&
        s.periodEnd >= periodStart
    );
    if (overlapping) {
      overlapWarning = `Overlaps with "${overlapping.fileName}" (${overlapping.periodStart} to ${overlapping.periodEnd}). ${duplicateCountSkipped} duplicate transaction(s) were automatically skipped.`;
    }
  }

  const needsReview = rowWarnings.length > 0 || parsedClassifications.some((c) => c.status === 'needs_review');

  return {
    statement: {
      id: stmtId,
      userId,
      accountId: account.id,
      fileName,
      fileFormat: 'csv',
      fileHash,
      periodStart,
      periodEnd,
      currency: account.currency,
      transactionCount: parsedTransactions.length,
      duplicateCountSkipped,
      status: needsReview ? 'needs_review' : 'parsed_successfully',
      errorMessage: rowWarnings.length > 0 ? rowWarnings.join(' ') : undefined,
      overlapWarning,
      closingBalance: latestClosingBalance,
      importedAt: now,
    },
    transactions: parsedTransactions,
    classifications: parsedClassifications,
    rejectedRows,
  };
}
