import { FinancialSnapshot,TransactionRecord } from '@shared/pi/types';
import crypto from 'node:crypto';

export class SecurityError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode = 403, code = 'FORBIDDEN_CROSS_USER_ACCESS') {
    super(message);
    this.name = 'SecurityError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

const ENCRYPTION_PREFIX = 'enc:v1:';
const DEFAULT_PROTOTYPE_SECRET = 'vela-finagent-prototype-aes-256-gcm-key-v1.1';

function deriveKey(customSecret?: string): Buffer {
  const explicitSecret =
    customSecret ||
    process.env.FINAGENT_ENCRYPTION_KEY ||
    process.env.VELA_ENCRYPTION_KEY;

  if (!explicitSecret && process.env.FINAGENT_RUNTIME_MODE === 'PRODUCTION_MODE') {
    throw new SecurityError(
      'FINAGENT_ENCRYPTION_KEY environment variable is mandatory in PRODUCTION_MODE.',
      500,
      'MISSING_ENCRYPTION_KEY'
    );
  }

  const rawSecret = explicitSecret || DEFAULT_PROTOTYPE_SECRET;
  return crypto.createHash('sha256').update(rawSecret, 'utf8').digest();
}

function scrubPiiText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
    .replace(/\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b/g, '[REDACTED_IBAN]')
    .replace(/\b(?:\d[ -]*?){13,19}\b/g, '[REDACTED_ACCOUNT_NUMBER]');
}

function canonicalizeForHash(value: unknown): unknown {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(canonicalizeForHash);
  }
  const obj = value as Record<string, unknown>;
  const sortedKeys = Object.keys(obj).sort();
  const result: Record<string, unknown> = {};
  for (const k of sortedKeys) {
    // Ignore ephemeral timestamps/ids when hashing semantic state if needed
    result[k] = canonicalizeForHash(obj[k]);
  }
  return result;
}

export class SecurityService {
  /**
   * Enforces strict user-level isolation (D-010).
   * Throws SecurityError with statusCode = 403 and code = 'FORBIDDEN_CROSS_USER_ACCESS'
   * if authenticatedUserId or requestedUserId is missing or mismatched.
   */
  static verifyUserAccess(
    authenticatedUserId: string | undefined | null,
    requestedUserId: string | undefined | null
  ): void {
    const authId = (authenticatedUserId || '').trim();
    const reqId = (requestedUserId || '').trim();
    if (!authId || !reqId || authId !== reqId) {
      throw new SecurityError(
        `Cross-user access denied: authenticated user '${authId || 'anonymous'}' cannot access resources of '${reqId || 'unknown'}'.`,
        403,
        'FORBIDDEN_CROSS_USER_ACCESS'
      );
    }
  }

  /**
   * AES-256-GCM authenticated encryption at rest.
   */
  static encryptText(plain: string, customSecret?: string): string {
    const key = deriveKey(customSecret);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `${ENCRYPTION_PREFIX}${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
  }

  /**
   * AES-256-GCM authenticated decryption at rest.
   */
  static decryptText(cipherText: string, customSecret?: string): string {
    if (!cipherText.startsWith(ENCRYPTION_PREFIX)) {
      throw new SecurityError(
        'Invalid encrypted payload format or missing encryption prefix.',
        400,
        'INVALID_CIPHERTEXT'
      );
    }
    const payload = cipherText.slice(ENCRYPTION_PREFIX.length);
    const parts = payload.split(':');
    if (parts.length !== 3) {
      throw new SecurityError(
        'Malformed AES-256-GCM payload segments.',
        400,
        'INVALID_CIPHERTEXT'
      );
    }
    const [ivHex, authTagHex, encryptedHex] = parts;
    const key = deriveKey(customSecret);
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  }

  /**
   * Strips direct PII, institution names, raw CSV rows (rawRow), nicknames, emails,
   * and free-text notes before sending FinancialSnapshot to any LLM prompt (R015, S019).
   */
  static minimizePIForLLM(snapshot: FinancialSnapshot): FinancialSnapshot {
    const cloned: FinancialSnapshot = JSON.parse(JSON.stringify(snapshot));

    if (cloned.profile) {
      cloned.profile.nickname = '';
    }

    if (cloned.preferences) {
      cloned.preferences.concernNotes = '';
    }

    if (Array.isArray(cloned.accountSummaries)) {
      cloned.accountSummaries = cloned.accountSummaries.map((summary, idx) => ({
        ...summary,
        account: {
          ...summary.account,
          name: `Account_${idx + 1}_${summary.account.currency}`,
          institution: '',
          notes: '',
        },
      }));
    }

    if (Array.isArray(cloned.incomeSources)) {
      cloned.incomeSources = cloned.incomeSources.map((inc) => ({
        ...inc,
        name: scrubPiiText(inc.name),
        notes: '',
      }));
    }

    if (cloned.essentialCommitment) {
      cloned.essentialCommitment = {
        ...cloned.essentialCommitment,
        notes: '',
      };
    }

    const scrubObligation = <T extends { name: string; notes: string }>(obl: T): T => ({
      ...obl,
      name: scrubPiiText(obl.name),
      notes: '',
    });

    if (Array.isArray(cloned.obligations)) {
      cloned.obligations = cloned.obligations.map(scrubObligation);
    }
    if (Array.isArray(cloned.upcomingUnpaidObligations)) {
      cloned.upcomingUnpaidObligations = cloned.upcomingUnpaidObligations.map(scrubObligation);
    }
    if (Array.isArray(cloned.overdueObligations)) {
      cloned.overdueObligations = cloned.overdueObligations.map(scrubObligation);
    }

    if (Array.isArray(cloned.debts)) {
      cloned.debts = cloned.debts.map((debt) => ({
        ...debt,
        name: scrubPiiText(debt.name),
      }));
    }

    if (Array.isArray(cloned.goals)) {
      cloned.goals = cloned.goals.map((goal) => ({
        ...goal,
        name: scrubPiiText(goal.name),
      }));
    }

    if (cloned.safetyCushionGoal) {
      cloned.safetyCushionGoal = {
        ...cloned.safetyCushionGoal,
        name: scrubPiiText(cloned.safetyCushionGoal.name),
      };
    }

    if (Array.isArray(cloned.goalAllocations)) {
      cloned.goalAllocations = cloned.goalAllocations.map((ga) => ({
        ...ga,
        note: '',
      }));
    }

    if (Array.isArray(cloned.statements)) {
      cloned.statements = cloned.statements.map((stmt, idx) => ({
        ...stmt,
        fileName: `statement_${idx + 1}.${stmt.fileFormat}`,
      }));
    }

    if (Array.isArray(cloned.transactions)) {
      cloned.transactions = cloned.transactions.map((txn) => ({
        ...txn,
        description: scrubPiiText(txn.description),
        counterparty: scrubPiiText(txn.counterparty),
        reference: scrubPiiText(txn.reference),
        rawRow: {},
      }));
    }

    return cloned;
  }

  /**
   * Computes a deterministic SHA-256 fingerprint for transaction deduplication.
   */
  static computeTransactionFingerprint(
    txn: Pick<TransactionRecord, 'accountId' | 'date' | 'amount' | 'currency' | 'description'> & {
      reference?: string;
      counterparty?: string;
    }
  ): string {
    const normalized = [
      (txn.accountId || '').trim(),
      (txn.date || '').slice(0, 10),
      Number(txn.amount || 0).toFixed(2),
      (txn.currency || 'EUR').trim().toUpperCase(),
      (txn.description || '').trim().toLowerCase().replace(/\s+/g, ' '),
      (txn.counterparty || '').trim().toLowerCase().replace(/\s+/g, ' '),
      (txn.reference || '').trim().toLowerCase(),
    ].join('|');

    return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
  }

  /**
   * Deduplicates incoming transactions against existing transactions using deterministic fingerprints.
   */
  static deduplicateTransactions(
    existing: TransactionRecord[],
    incoming: TransactionRecord[]
  ): { uniqueIncoming: TransactionRecord[]; duplicateCount: number } {
    const seen = new Set<string>(existing.map((t) => this.computeTransactionFingerprint(t)));
    const uniqueIncoming: TransactionRecord[] = [];
    let duplicateCount = 0;

    for (const txn of incoming) {
      const fp = this.computeTransactionFingerprint(txn);
      if (seen.has(fp)) {
        duplicateCount++;
      } else {
        seen.add(fp);
        uniqueIncoming.push(txn);
      }
    }

    return { uniqueIncoming, duplicateCount };
  }

  /**
   * Computes a deterministic SHA-256 hash of any structured input for Step 1 staleness tracking.
   */
  static computeCanonicalHash(value: unknown): string {
    const canonical = JSON.stringify(canonicalizeForHash(value));
    return crypto.createHash('sha256').update(canonical, 'utf8').digest('hex');
  }
}
