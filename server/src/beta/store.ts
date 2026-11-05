import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';

const PREFIX = 'beta:v1:';
const KEY_CHECK = 'vela-beta-storage-key-check-v1';

/** Keys travel over stdin, never process arguments or diagnostics. */
function dpapi(input: Buffer, protect: boolean): Buffer {
  if (process.platform !== 'win32') {
    throw new Error('BETA_KEY_REQUIRED: Persistent storage requires an explicit 32-byte key outside Windows.');
  }
  const script = `
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Security
$raw = [Convert]::FromBase64String([Console]::In.ReadToEnd())
$scope = [System.Security.Cryptography.DataProtectionScope]::CurrentUser
$result = [System.Security.Cryptography.ProtectedData]::${protect ? 'Protect' : 'Unprotect'}($raw, $null, $scope)
[Console]::Out.Write([Convert]::ToBase64String($result))
`;
  try {
    const result = execFileSync('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-EncodedCommand', Buffer.from(script, 'utf16le').toString('base64'),
    ], { input: input.toString('base64'), encoding: 'utf8', windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    const decoded = Buffer.from(result.trim(), 'base64');
    if (!decoded.length) throw new Error('Empty DPAPI output');
    return decoded;
  } catch {
    throw new Error('BETA_KEY_UNAVAILABLE: Windows could not protect or unlock the storage key for this account.');
  }
}

export class BetaStore {
  readonly database: DatabaseSync;
  private readonly key: Buffer;
  private readonly keyFile: string | null;
  private closed = false;

  constructor(options: { filename?: string; key?: Buffer } = {}) {
    const filename = options.filename ?? path.resolve(process.cwd(), 'data/beta.sqlite');
    const inMemory = filename === ':memory:';
    if (options.key && (!Buffer.isBuffer(options.key) || options.key.length !== 32)) {
      throw new Error('BETA_INVALID_KEY: Expected a 32-byte encryption key.');
    }
    if (!inMemory) fs.mkdirSync(path.dirname(path.resolve(filename)), { recursive: true });
    const existed = !inMemory && fs.existsSync(filename);
    this.keyFile = !inMemory && !options.key ? `${filename}.key.dpapi` : null;
    if (options.key) {
      this.key = Buffer.from(options.key);
    } else if (inMemory) {
      this.key = crypto.randomBytes(32);
    } else if (this.keyFile && fs.existsSync(this.keyFile)) {
      this.key = dpapi(fs.readFileSync(this.keyFile), false);
    } else {
      if (existed) throw new Error('BETA_KEY_MISSING: Existing database has no protected key; refusing to reset it.');
      this.key = crypto.randomBytes(32);
      const protectedKey = dpapi(this.key, true);
      fs.writeFileSync(this.keyFile!, protectedKey, { flag: 'wx', mode: 0o600 });
    }
    if (this.key.length !== 32) throw new Error('BETA_INVALID_KEY: Protected key has an invalid length.');
    this.database = new DatabaseSync(filename);
    try {
      this.database.exec('PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
      if (existed) {
        const check = this.database.prepare('SELECT value FROM beta_metadata WHERE key = ?').get('key_check') as { value: string } | undefined;
        if (!check || this.decrypt(check.value, 'metadata:key_check') !== KEY_CHECK) {
          throw new Error('Key verification failed');
        }
      } else {
        this.database.exec(`
          CREATE TABLE beta_metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
          CREATE TABLE beta_documents (
            user_id TEXT NOT NULL, doc_key TEXT NOT NULL, payload TEXT NOT NULL,
            PRIMARY KEY (user_id, doc_key)
          );
        `);
        this.database.prepare('INSERT INTO beta_metadata (key,value) VALUES (?,?)')
          .run('key_check', this.encrypt(KEY_CHECK, 'metadata:key_check'));
      }
    } catch {
      this.database.close();
      this.key.fill(0);
      throw new Error('BETA_STORAGE_UNLOCK_FAILED: Database or key could not be verified; no data was reset.');
    }
  }

  private assertOpen(): void {
    if (this.closed) throw new Error('BETA_STORAGE_CLOSED');
  }

  private encrypt(value: string, context: string): string {
    this.assertOpen();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);
    cipher.setAAD(Buffer.from(context, 'utf8'));
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    return PREFIX + Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64');
  }

  private decrypt(value: string, context: string): string {
    this.assertOpen();
    try {
      if (!value.startsWith(PREFIX)) throw new Error('Unknown ciphertext version');
      const bytes = Buffer.from(value.slice(PREFIX.length), 'base64');
      if (bytes.length < 28) throw new Error('Truncated ciphertext');
      const decipher = crypto.createDecipheriv('aes-256-gcm', this.key, bytes.subarray(0, 12));
      decipher.setAAD(Buffer.from(context, 'utf8'));
      decipher.setAuthTag(bytes.subarray(12, 28));
      return Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString('utf8');
    } catch {
      throw new Error('BETA_DECRYPTION_FAILED: Stored data could not be authenticated.');
    }
  }

  /** For other beta tables; callers should store only ciphertext, never the key. */
  encryptText(value: string): string { return this.encrypt(value, 'beta:external-text:v1'); }
  decryptText(value: string): string { return this.decrypt(value, 'beta:external-text:v1'); }

  private context(userId: string, key: string): string {
    if (typeof userId !== 'string' || !userId.trim() || typeof key !== 'string' || !key.trim()) {
      throw new Error('BETA_INVALID_DOCUMENT_KEY');
    }
    return JSON.stringify(['beta-document-v1', userId, key]);
  }

  get(userId: string, key: string): unknown | null {
    this.assertOpen();
    const context = this.context(userId, key);
    const row = this.database.prepare('SELECT payload FROM beta_documents WHERE user_id=? AND doc_key=?')
      .get(userId, key) as { payload: string } | undefined;
    return row ? JSON.parse(this.decrypt(row.payload, context)) : null;
  }

  put(userId: string, key: string, value: unknown): void {
    const context = this.context(userId, key);
    const serialized = JSON.stringify(value);
    if (serialized === undefined) throw new Error('BETA_INVALID_DOCUMENT: Value is not JSON serializable.');
    const encrypted = this.encrypt(serialized, context);
    this.database.prepare(`INSERT INTO beta_documents(user_id,doc_key,payload) VALUES (?,?,?)
      ON CONFLICT(user_id,doc_key) DO UPDATE SET payload=excluded.payload`).run(userId, key, encrypted);
  }

  remove(userId: string, key: string): void {
    this.assertOpen();
    this.context(userId, key);
    this.database.prepare('DELETE FROM beta_documents WHERE user_id=? AND doc_key=?').run(userId, key);
  }

  /** Deletes document namespace only. Coordinator/auth owns deletion of auth_* records. */
  deleteUser(userId: string): void {
    this.assertOpen();
    this.context(userId, 'validate');
    this.database.prepare('DELETE FROM beta_documents WHERE user_id=?').run(userId);
  }

  backup(destination: string): void {
    this.assertOpen();
    const target = path.resolve(destination);
    if (fs.existsSync(target) || fs.existsSync(`${target}.key.dpapi`)) throw new Error('BETA_BACKUP_EXISTS');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    // SQLite produces a consistent snapshot, including committed auth tables, without copying a live WAL.
    this.database.prepare('VACUUM INTO ?').run(target);
    if (this.keyFile) fs.copyFileSync(this.keyFile, `${target}.key.dpapi`, fs.constants.COPYFILE_EXCL);
  }

  close(): void {
    if (this.closed) return;
    this.database.close();
    this.key.fill(0);
    this.closed = true;
  }
}
