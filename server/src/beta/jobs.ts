import { randomUUID, createHash } from "node:crypto";
import type { BetaStore } from "./store";
export type Job = {
  id: string;
  userId: string;
  kind: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  version: number;
  args: any;
  result?: any;
  error?: string;
};
export class BetaJobs {
  private handlers = new Map<string, (job: Job) => Promise<unknown>>();
  private busy = false;
  constructor(private store: BetaStore) {
    store.database.exec(
      "CREATE TABLE IF NOT EXISTS beta_jobs(id TEXT PRIMARY KEY,user_id TEXT NOT NULL,status TEXT NOT NULL)",
    );
    store.database
      .prepare("UPDATE beta_jobs SET status='queued' WHERE status='running'")
      .run();
  }
  register(kind: string, handler: (job: Job) => Promise<unknown>) {
    this.handlers.set(kind, handler);
  }
  get(userId: string, id: string): Job | null {
    const row = this.store.database
      .prepare("SELECT status FROM beta_jobs WHERE id=? AND user_id=?")
      .get(id, userId) as any;
    if (!row) return null;
    const job = this.store.get(userId, "job:" + id) as Job | null;
    return job ? { ...job, status: row.status } : null;
  }
  enqueue(
    userId: string,
    kind: string,
    args: any,
    version: number,
    options: { retryFailed?: boolean } = {},
  ) {
    const requestKey =
      "job-request:" +
      createHash("sha256")
        .update(JSON.stringify({ kind, args, version }))
        .digest("hex");
    const oldId = this.store.get(userId, requestKey) as string | null;
    const old = oldId ? this.get(userId, oldId) : null;
    if (old && ["queued", "running", "completed"].includes(old.status))
      return old;
    if (old?.status === "failed" && options.retryFailed === false) return old;
    const id = randomUUID();
    const job: Job = { id, userId, kind, status: "queued", version, args };
    this.store.database.exec("BEGIN IMMEDIATE");
    try {
      this.store.put(userId, "job:" + id, job);
      this.store.put(userId, requestKey, id);
      this.store.database
        .prepare("INSERT INTO beta_jobs VALUES(?,?,?)")
        .run(id, userId, "queued");
      this.store.database.exec("COMMIT");
    } catch (e) {
      this.store.database.exec("ROLLBACK");
      throw e;
    }
    void this.drain();
    return job;
  }
  purgeUser(userId: string) {
    this.cancelUser(userId);
    const rows = this.store.database
      .prepare("SELECT doc_key FROM beta_documents WHERE user_id=?")
      .all(userId) as { doc_key: string }[];
    for (const row of rows)
      if (
        row.doc_key.startsWith("job:") ||
        row.doc_key.startsWith("job-request:")
      )
        this.store.remove(userId, row.doc_key);
    this.store.database
      .prepare("DELETE FROM beta_jobs WHERE user_id=?")
      .run(userId);
  }
  cancelUser(userId: string) {
    this.store.database
      .prepare("UPDATE beta_jobs SET status='cancelled' WHERE user_id=?")
      .run(userId);
  }
  async drain() {
    if (this.busy) return;
    this.busy = true;
    try {
      for (;;) {
        const rows = this.store.database
          .prepare("SELECT id,user_id FROM beta_jobs WHERE status='queued'")
          .all() as any[];
        const job = rows
          .map((row) => this.get(row.user_id, row.id))
          .find((job) => job && this.handlers.has(job.kind));
        if (!job) break;
        this.store.database
          .prepare("UPDATE beta_jobs SET status='running' WHERE id=?")
          .run(job.id);
        try {
          const result = await this.handlers.get(job.kind)!(job);
          if (
            !this.get(job.userId, job.id) ||
            this.get(job.userId, job.id)?.status === "cancelled"
          )
            continue;
          this.store.database.exec("BEGIN IMMEDIATE");
          try {
            this.store.put(job.userId, "job:" + job.id, {
              ...job,
              result,
              status: "completed",
            });
            this.store.database
              .prepare("UPDATE beta_jobs SET status='completed' WHERE id=?")
              .run(job.id);
            this.store.database.exec("COMMIT");
          } catch (e) {
            this.store.database.exec("ROLLBACK");
            throw e;
          }
        } catch {
          if (
            !this.get(job.userId, job.id) ||
            this.get(job.userId, job.id)?.status === "cancelled"
          )
            continue;
          this.store.put(job.userId, "job:" + job.id, {
            ...job,
            status: "failed",
            error: "Processing failed. Check input and retry.",
          });
          this.store.database
            .prepare("UPDATE beta_jobs SET status='failed' WHERE id=?")
            .run(job.id);
        }
      }
    } finally {
      this.busy = false;
    }
  }
}
