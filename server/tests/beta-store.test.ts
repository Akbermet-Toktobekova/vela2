import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { BetaStore } from '../src/beta/store';

const directories: string[] = [];
const stores: BetaStore[] = [];
function temp(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vela-beta-store-test-'));
  directories.push(directory);
  return directory;
}
function open(options: ConstructorParameters<typeof BetaStore>[0]) {
  const store = new BetaStore(options); stores.push(store); return store;
}
afterEach(() => {
  stores.splice(0).forEach(store => store.close());
  // Only exact directories created by this test are removed.
  directories.splice(0).forEach(directory => fs.rmSync(directory, { recursive: true }));
});

describe('BetaStore encrypted persistent documents', () => {
  it('isolates namespaces, encrypts payloads and refuses ciphertext moved to a different user/key', () => {
    const store = open({ filename: ':memory:' });
    store.put('alice', 'profile', { name: 'Alice Secret', funds: 23 });
    expect(store.get('bob', 'profile')).toBeNull();
    expect(store.get('alice', 'profile')).toEqual({ name: 'Alice Secret', funds: 23 });
    const row = store.database.prepare('SELECT payload FROM beta_documents').get() as {payload:string};
    expect(row.payload).not.toContain('Alice Secret');
    store.database.prepare('INSERT INTO beta_documents VALUES (?,?,?)').run('bob', 'profile', row.payload);
    expect(() => store.get('bob', 'profile')).toThrow('BETA_DECRYPTION_FAILED');
    store.database.prepare('INSERT INTO beta_documents VALUES (?,?,?)').run('alice', 'other', row.payload);
    expect(() => store.get('alice', 'other')).toThrow('BETA_DECRYPTION_FAILED');
  });

  it('survives restart with an explicit key and fails closed on a wrong key', () => {
    const filename = path.join(temp(), 'beta.sqlite');
    const key = crypto.randomBytes(32);
    const first = open({ filename, key });
    first.put('alice', 'state', { transactions: ['private transaction'] }); first.close();
    expect(() => new BetaStore({ filename, key: crypto.randomBytes(32) })).toThrow('BETA_STORAGE_UNLOCK_FAILED');
    const restarted = open({ filename, key });
    expect(restarted.get('alice', 'state')).toEqual({ transactions: ['private transaction'] });
    expect(fs.readFileSync(filename).includes(Buffer.from('private transaction'))).toBe(false);
  });

  it('backs up a consistent SQLite snapshot including auth-owned tables without overwriting destinations', () => {
    const directory = temp(); const key = crypto.randomBytes(32);
    const store = open({ filename: path.join(directory, 'live.sqlite'), key });
    store.put('alice', 'state', { version: 1 });
    store.database.exec('CREATE TABLE auth_test (id TEXT PRIMARY KEY); INSERT INTO auth_test VALUES (\'alice\');');
    const destination = path.join(directory, 'backup.sqlite'); store.backup(destination);
    store.put('alice', 'state', { version: 2 });
    const restored = open({ filename: destination, key });
    expect(restored.get('alice', 'state')).toEqual({ version: 1 });
    expect(restored.database.prepare('SELECT id FROM auth_test').get()).toEqual({ id: 'alice' });
    expect(() => store.backup(destination)).toThrow('BETA_BACKUP_EXISTS');
  });

  it('deletes only the requested user namespace and supports encrypted text for auth', () => {
    const store = open({ filename: ':memory:' });
    store.put('alice', 'state', { data: 'a' }); store.put('bob', 'state', { data: 'b' });
    const cipher = store.encryptText('hidden@email.example');
    expect(cipher).not.toContain('hidden'); expect(store.decryptText(cipher)).toBe('hidden@email.example');
    store.deleteUser('alice'); expect(store.get('alice', 'state')).toBeNull();
    expect(store.get('bob', 'state')).toEqual({ data: 'b' });
    store.remove('bob', 'state'); expect(store.get('bob', 'state')).toBeNull();
  });

  it('rejects corrupted ciphertext, invalid keys and non-JSON documents', () => {
    expect(() => new BetaStore({ filename: ':memory:', key: Buffer.alloc(4) })).toThrow('BETA_INVALID_KEY');
    const store = open({ filename: ':memory:' });
    expect(() => store.put('alice', 'state', undefined)).toThrow('BETA_INVALID_DOCUMENT');
    expect(() => store.get('', 'state')).toThrow('BETA_INVALID_DOCUMENT_KEY');
    store.put('alice', 'state', {});
    store.database.prepare('UPDATE beta_documents SET payload=?').run('beta:v1:AAAA');
    expect(() => store.get('alice', 'state')).toThrow('BETA_DECRYPTION_FAILED');
  });

  it.runIf(process.platform === 'win32')('protects the persistent key with real Windows DPAPI and restores a protected backup', () => {
    const directory = temp(); const filename = path.join(directory, 'live.sqlite');
    const store = open({ filename }); store.put('alice', 'state', { name: 'DPAPI-private' });
    const protectedKey = fs.readFileSync(`${filename}.key.dpapi`);
    expect(protectedKey.length).toBeGreaterThan(32);
    const destination = path.join(directory, 'backup.sqlite'); store.backup(destination); store.close();
    const reopened = open({ filename }); expect(reopened.get('alice', 'state')).toEqual({ name: 'DPAPI-private' });
    const backup = open({ filename: destination }); expect(backup.get('alice', 'state')).toEqual({ name: 'DPAPI-private' });
  }, 20000);

  it.runIf(process.platform === 'win32')('does not reset existing data when its protected key is missing', () => {
    const directory = temp(); const filename = path.join(directory, 'live.sqlite');
    const store = open({ filename }); store.put('alice', 'state', { preserved: true }); store.close();
    const before = fs.readFileSync(filename);
    // Deliberately remove this test-generated key file to simulate loss.
    fs.unlinkSync(`${filename}.key.dpapi`);
    expect(() => new BetaStore({ filename })).toThrow('BETA_KEY_MISSING');
    expect(fs.readFileSync(filename)).toEqual(before);
    expect(fs.existsSync(`${filename}.key.dpapi`)).toBe(false);
  }, 15000);
});
