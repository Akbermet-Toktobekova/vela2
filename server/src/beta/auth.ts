import crypto from 'node:crypto';
import type { DatabaseSync } from 'node:sqlite';
import { z } from 'zod';

export class BetaAuthError extends Error {
  constructor(public code: string, message: string, public statusCode = 400) { super(message); }
}
export interface BetaUser { id: string; name: string; email: string }
export interface BetaSession { token: string; user: BetaUser; expiresAt: string }
export interface BetaAuthOptions {
  database: DatabaseSync;
  resetBaseUrl: string;
  sendResetEmail?: (email: string, url: string) => Promise<void>;
  encryptText?: (text: string) => string;
  decryptText?: (text: string) => string;
}
const settings = Object.freeze({ sessionMs: 30 * 86400_000, resetMs: 30 * 60_000, attemptWindowMs: 15 * 60_000, maxAttempts: 10, scryptN: 32768, scryptR: 8, scryptP: 1 });
const emailSchema = z.string().trim().email().max(254).transform(s => s.toLowerCase());
const passwordSchema = z.string().min(12).max(128);
const hash = (text: string) => crypto.createHash('sha256').update(text).digest('hex');
function derive(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => crypto.scrypt(password, salt, 64,
    { N: settings.scryptN, r: settings.scryptR, p: settings.scryptP, maxmem: 64 * 1024 * 1024 },
    (error, value) => error ? reject(error) : resolve(value)));
}
function validate<T>(schema: z.ZodType<T>, value: unknown): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new BetaAuthError('INVALID_INPUT', 'Please check the supplied name, email or password. Passwords require 12–128 characters.');
  return parsed.data;
}

export class BetaAuth {
  private readonly db: DatabaseSync;
  private readonly encrypt: (text: string) => string;
  private readonly decrypt: (text: string) => string;
  private readonly dummySalt = crypto.randomBytes(16);
  constructor(private readonly options: BetaAuthOptions) {
    this.db = options.database;
    const url = new URL(options.resetBaseUrl);
    if (!['https:', 'http:'].includes(url.protocol) || (url.protocol === 'http:' && !['localhost', '127.0.0.1'].includes(url.hostname))) {
      throw new BetaAuthError('INVALID_RESET_URL', 'Password reset URL must use HTTPS.', 500);
    }
    if (!!options.encryptText !== !!options.decryptText) throw new BetaAuthError('MISSING_AUTH_CIPHER', 'Both encryption callbacks are required.', 500);
    if (options.encryptText && options.decryptText) {
      this.encrypt = options.encryptText; this.decrypt = options.decryptText;
    } else {
      const persistent = (this.db.prepare('PRAGMA database_list').all() as unknown as {file:string}[]).some(row => !!row.file);
      if (persistent) throw new BetaAuthError('MISSING_AUTH_CIPHER', 'Persistent authentication requires an encryption provider.', 500);
      const key = crypto.randomBytes(32);
      this.encrypt = text => {
        const iv = crypto.randomBytes(12); const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        return Buffer.concat([iv, cipher.update(text, 'utf8'), cipher.final(), cipher.getAuthTag()]).toString('base64');
      };
      this.decrypt = text => {
        const bytes = Buffer.from(text, 'base64'); const decipher = crypto.createDecipheriv('aes-256-gcm', key, bytes.subarray(0, 12));
        decipher.setAuthTag(bytes.subarray(-16)); return Buffer.concat([decipher.update(bytes.subarray(12, -16)), decipher.final()]).toString('utf8');
      };
    }
    this.db.exec(`CREATE TABLE IF NOT EXISTS auth_users (id TEXT PRIMARY KEY, email_hash TEXT UNIQUE NOT NULL, profile_cipher TEXT NOT NULL, password_hash TEXT NOT NULL, created_at INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS auth_sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS auth_resets (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS auth_attempts (bucket TEXT PRIMARY KEY, attempts INTEGER NOT NULL, started_at INTEGER NOT NULL);`);
  }
  private user(row: any): BetaUser { return { id: row.id, ...JSON.parse(this.decrypt(row.profile_cipher)) }; }
  private attempt(bucket: string): void {
    const now = Date.now();
    const row = this.db.prepare('SELECT attempts, started_at FROM auth_attempts WHERE bucket=?').get(bucket) as {attempts:number;started_at:number}|undefined;
    if (row && now - row.started_at < settings.attemptWindowMs && row.attempts >= settings.maxAttempts) throw new BetaAuthError('RATE_LIMITED', 'Too many attempts. Please try again later.', 429);
    if (!row || now - row.started_at >= settings.attemptWindowMs) this.db.prepare('INSERT OR REPLACE INTO auth_attempts VALUES (?,1,?)').run(bucket, now);
    else this.db.prepare('UPDATE auth_attempts SET attempts=attempts+1 WHERE bucket=?').run(bucket);
  }
  private async passwordHash(password: string): Promise<string> {
    const salt = crypto.randomBytes(16); return `${salt.toString('hex')}:${(await derive(password, salt)).toString('hex')}`;
  }
  private session(user: BetaUser): BetaSession {
    const token = crypto.randomBytes(32).toString('base64url'); const expires = Date.now() + settings.sessionMs;
    this.db.prepare('INSERT INTO auth_sessions VALUES (?,?,?)').run(hash(token), user.id, expires);
    return {token, user, expiresAt: new Date(expires).toISOString()};
  }
  async register(name: string, email: string, password: string): Promise<BetaSession> {
    const normalized = validate(emailSchema, email); const cleanName = validate(z.string().trim().min(1).max(100), name);
    validate(passwordSchema, password); this.attempt(`register:${hash(normalized)}`);
    if (this.db.prepare('SELECT id FROM auth_users WHERE email_hash=?').get(hash(normalized))) throw new BetaAuthError('ACCOUNT_EXISTS', 'An account already exists for that email.', 409);
    const passwordHash = await this.passwordHash(password);
    const user = {id: crypto.randomUUID(), name: cleanName, email: normalized};
    try { this.db.prepare('INSERT INTO auth_users VALUES (?,?,?,?,?)').run(user.id, hash(normalized), this.encrypt(JSON.stringify({name:cleanName,email:normalized})), passwordHash, Date.now()); }
    catch (error) { if ((error as Error).message.includes('UNIQUE')) throw new BetaAuthError('ACCOUNT_EXISTS', 'An account already exists for that email.', 409); throw error; }
    return this.session(user);
  }
  async login(email: string, password: string): Promise<BetaSession> {
    const normalized = validate(emailSchema, email); validate(z.string().max(128), password);
    const bucket = `login:${hash(normalized)}`; this.attempt(bucket);
    const row = this.db.prepare('SELECT * FROM auth_users WHERE email_hash=?').get(hash(normalized)) as any;
    const [salt, expected] = row ? row.password_hash.split(':') : [this.dummySalt.toString('hex'), Buffer.alloc(64).toString('hex')];
    const actual = await derive(password, Buffer.from(salt, 'hex'));
    if (!row || !crypto.timingSafeEqual(actual, Buffer.from(expected, 'hex'))) throw new BetaAuthError('INVALID_CREDENTIALS', 'Email or password is incorrect.', 401);
    this.db.prepare('DELETE FROM auth_attempts WHERE bucket=?').run(bucket);
    return this.session(this.user(row));
  }
  authenticate(token: string): BetaUser {
    if (typeof token !== 'string' || token.length < 32 || token.length > 256) throw new BetaAuthError('UNAUTHENTICATED', 'Please sign in.', 401);
    const row = this.db.prepare('SELECT u.*, s.expires_at FROM auth_sessions s JOIN auth_users u ON u.id=s.user_id WHERE s.token_hash=?').get(hash(token)) as any;
    if (!row || row.expires_at <= Date.now()) throw new BetaAuthError('UNAUTHENTICATED', 'Session expired or invalid.', 401);
    return this.user(row);
  }
  updateName(userId: string, name: string): BetaUser {
    const cleanName = validate(z.string().trim().min(1).max(100), name);
    const row = this.db.prepare('SELECT * FROM auth_users WHERE id=?').get(userId) as any;
    if (!row) throw new BetaAuthError('UNAUTHENTICATED', 'Please sign in.', 401);
    const current = this.user(row);
    this.db.prepare('UPDATE auth_users SET profile_cipher=? WHERE id=?').run(this.encrypt(JSON.stringify({name: cleanName, email: current.email})), userId);
    return {...current, name: cleanName};
  }
  logout(token: string): void { this.db.prepare('DELETE FROM auth_sessions WHERE token_hash=?').run(hash(token)); }
  async forgotPassword(email: string): Promise<{message:string}> {
    const normalized = validate(emailSchema, email); this.attempt(`reset:${hash(normalized)}`);
    if (!this.options.sendResetEmail) throw new BetaAuthError('EMAIL_NOT_CONFIGURED', 'Password recovery email delivery is not configured.', 503);
    const row = this.db.prepare('SELECT * FROM auth_users WHERE email_hash=?').get(hash(normalized)) as any;
    if (row) {
      const token = crypto.randomBytes(32).toString('base64url');
      this.db.prepare('DELETE FROM auth_resets WHERE user_id=?').run(row.id);
      this.db.prepare('INSERT INTO auth_resets VALUES (?,?,?)').run(hash(token), row.id, Date.now()+settings.resetMs);
      const url = new URL(this.options.resetBaseUrl); url.searchParams.set('token', token);
      try { await this.options.sendResetEmail(this.user(row).email, url.toString()); }
      catch { this.db.prepare('DELETE FROM auth_resets WHERE token_hash=?').run(hash(token)); throw new BetaAuthError('EMAIL_DELIVERY_FAILED', 'Password recovery email could not be sent.', 503); }
    }
    return {message:'If an account exists, a password reset link has been sent.'};
  }
  async resetPassword(token: string, password: string): Promise<void> {
    validate(passwordSchema, password);
    const passwordHash = await this.passwordHash(password);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const row = this.db.prepare('SELECT * FROM auth_resets WHERE token_hash=?').get(hash(token)) as any;
      if (!row || row.expires_at <= Date.now()) throw new BetaAuthError('INVALID_RESET_TOKEN', 'Reset link is invalid or expired.', 400);
      this.db.prepare('UPDATE auth_users SET password_hash=? WHERE id=?').run(passwordHash,row.user_id);
      this.db.prepare('DELETE FROM auth_resets WHERE user_id=?').run(row.user_id);
      this.db.prepare('DELETE FROM auth_sessions WHERE user_id=?').run(row.user_id);
      this.db.prepare('DELETE FROM auth_attempts WHERE bucket=?').run(`login:${(this.db.prepare('SELECT email_hash FROM auth_users WHERE id=?').get(row.user_id) as any).email_hash}`);
      this.db.exec('COMMIT');
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  async changePassword(token: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = this.authenticate(token); const check = await this.login(user.email, currentPassword); this.logout(check.token);
    validate(passwordSchema,newPassword); const passwordHash=await this.passwordHash(newPassword);
    this.db.exec('BEGIN IMMEDIATE'); try { this.db.prepare('UPDATE auth_users SET password_hash=? WHERE id=?').run(passwordHash,user.id); this.db.prepare('DELETE FROM auth_sessions WHERE user_id=?').run(user.id); this.db.prepare('DELETE FROM auth_resets WHERE user_id=?').run(user.id); this.db.exec('COMMIT'); } catch(error) {this.db.exec('ROLLBACK');throw error;}
  }
  deleteUser(userId: string): void {
    this.db.exec('BEGIN IMMEDIATE'); try {for (const table of ['auth_sessions','auth_resets']) this.db.prepare(`DELETE FROM ${table} WHERE user_id=?`).run(userId);this.db.prepare('DELETE FROM auth_users WHERE id=?').run(userId);this.db.exec('COMMIT');} catch(error){this.db.exec('ROLLBACK');throw error;}
  }
}

