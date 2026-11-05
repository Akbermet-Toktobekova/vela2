import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { BetaStore } from '../src/beta/store';
import { BetaJobs } from '../src/beta/jobs';

const stores: BetaStore[] = [];
const directories: string[] = [];
function open(filename = ':memory:', key?: Buffer) {
  const store = new BetaStore({ filename, key }); stores.push(store); return store;
}
afterEach(() => {
  stores.splice(0).forEach(store => store.close());
  directories.splice(0).forEach(directory => fs.rmSync(directory, { recursive: true }));
});
async function settled(jobs: BetaJobs, userId: string, id: string) {
  await expect.poll(() => jobs.get(userId, id)?.status).toMatch(/completed|failed|cancelled/);
  return jobs.get(userId, id)!;
}

describe('Persistent beta queue', () => {
  it('does not recreate a purged job or its result when a running handler finishes late',async()=>{
    const store=open();const jobs=new BetaJobs(store);let finish!:(value:unknown)=>void;
    jobs.register('parse',()=>new Promise(resolve=>{finish=resolve;}));const job=jobs.enqueue('alice','parse',{private:'source'},1);
    jobs.purgeUser('alice');finish({private:'result'});await new Promise(resolve=>setImmediate(resolve));
    expect(jobs.get('alice',job.id)).toBeNull();expect(store.get('alice','job:'+job.id)).toBeNull();
  });
  it('deduplicates equivalent work by user, kind, args and version while preserving distinct work', async () => {
    const jobs = new BetaJobs(open()); let calls=0;
    const first=jobs.enqueue('alice','parse',{file:'one.csv'},1);
    expect(jobs.enqueue('alice','parse',{file:'one.csv'},1).id).toBe(first.id);
    const nextVersion=jobs.enqueue('alice','parse',{file:'one.csv'},2);
    const otherUser=jobs.enqueue('bob','parse',{file:'one.csv'},1);
    expect(nextVersion.id).not.toBe(first.id);expect(otherUser.id).not.toBe(first.id);
    jobs.register('parse',async()=>{calls++;return {done:true};});await jobs.drain();
    expect(jobs.enqueue('alice','parse',{file:'one.csv'},1).id).toBe(first.id);
    await jobs.drain();expect(calls).toBe(3);
  });

  it('does not block runnable work behind an unregistered job kind', async () => {
    const jobs=new BetaJobs(open());const unknown=jobs.enqueue('alice','not-installed',{},1);
    jobs.register('parse',async()=>({done:true}));const known=jobs.enqueue('bob','parse',{},1);
    expect((await settled(jobs,'bob',known.id)).status).toBe('completed');
    expect(jobs.get('alice',unknown.id)?.status).toBe('queued');
  });
  it('persists args/results and isolates job lookup by owner', async () => {
    const store = open(); const jobs = new BetaJobs(store);
    jobs.register('parse', async job => ({ count: job.args.count, version: job.version }));
    const job = jobs.enqueue('alice', 'parse', { count: 8 }, 3);
    expect(jobs.get('bob', job.id)).toBeNull();
    const result = await settled(jobs, 'alice', job.id);
    expect(result.status).toBe('completed'); expect(result.result).toEqual({ count: 8, version: 3 });
    const row = store.database.prepare('SELECT payload FROM beta_documents').get() as {payload:string};
    expect(row.payload).not.toContain('parse');
  });

  it('recovers interrupted running jobs after reopening the persistent database', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vela-beta-jobs-test-')); directories.push(directory);
    const filename = path.join(directory, 'jobs.sqlite'); const key = crypto.randomBytes(32);
    const first = open(filename, key); const initial = new BetaJobs(first);
    // No handler is registered: the persisted work has not begun.
    const pending = initial.enqueue('alice', 'parse', { filename: 'private.csv' }, 4);
    first.database.prepare("UPDATE beta_jobs SET status='running' WHERE id=?").run(pending.id);
    first.close();
    const reopened = open(filename, key); const recovered = new BetaJobs(reopened);
    expect(recovered.get('alice', pending.id)?.status).toBe('queued');
    let calls = 0;
    recovered.register('parse', async job => { calls++; return { filename: job.args.filename }; });
    await recovered.drain();
    expect((await settled(recovered, 'alice', pending.id)).result).toEqual({ filename: 'private.csv' });
    await recovered.drain(); expect(calls).toBe(1);
  });

  it('cancels running work without publishing its result', async () => {
    const jobs = new BetaJobs(open());
    let finish!: (value: unknown) => void;
    jobs.register('parse', () => new Promise(resolve => { finish = resolve; }));
    const job = jobs.enqueue('alice', 'parse', {}, 1);
    expect(jobs.get('alice', job.id)?.status).toBe('running');
    jobs.cancelUser('alice'); finish({ shouldNotPublish: true });
    await new Promise(resolve => setImmediate(resolve));
    const result = jobs.get('alice', job.id)!;
    expect(result.status).toBe('cancelled'); expect(result.result).toBeUndefined();
  });

  it('keeps processing after errors and does not persist sensitive exception text', async () => {
    const jobs = new BetaJobs(open());
    jobs.register('fail', async () => { throw new Error('private-api-key-and-statement'); });
    jobs.register('ok', async () => ({ done: true }));
    const bad = jobs.enqueue('alice', 'fail', {}, 1);
    const good = jobs.enqueue('bob', 'ok', {}, 2);
    const failed = await settled(jobs, 'alice', bad.id);
    expect(failed.status).toBe('failed'); expect(failed.error).not.toContain('private-api-key');
    expect((await settled(jobs, 'bob', good.id)).result).toEqual({ done: true });
  });

  it('cancels queued jobs only for the specified user', async () => {
    const jobs = new BetaJobs(open());
    const alice = jobs.enqueue('alice', 'parse', {}, 1);
    const bob = jobs.enqueue('bob', 'parse', {}, 1);
    jobs.cancelUser('alice');
    expect(jobs.get('alice', alice.id)?.status).toBe('cancelled');
    jobs.register('parse', async () => ({ count: 1 })); await jobs.drain();
    expect((await settled(jobs, 'bob', bob.id)).status).toBe('completed');
  });
});
