import type { BetaAnalysis } from "./analysis";
import type { BetaFinancial } from "./financial";
import type { BetaJobs } from "./jobs";
import type { BetaStore } from "./store";

type User = { id: string; name: string; email: string };

/** Runs work at the engine's own freshness deadline rather than a polling interval. */
export class BetaReviewScheduler {
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();
  private closed = false;

  constructor(
    private readonly store: BetaStore,
    private readonly financial: BetaFinancial,
    private readonly analysis: BetaAnalysis,
    private readonly jobs: BetaJobs,
  ) {}

  check(user: User) {
    this.cancel(user.id);
    if (this.closed) return null;
    const stored = this.store.get(user.id, "state") as ReturnType<
      BetaFinancial["get"]
    > | null;
    if (!stored?.aiConsent) return null;
    const freshness = this.analysis.checkFreshness(user);
    if (freshness.needed) {
      return this.jobs.enqueue(
        user.id,
        "review",
        {
          user,
          freshnessKey: freshness.nextCheckAt ??
            freshness.freshnessKey ?? `version:${stored.version}`,
        },
        stored.version,
        { retryFailed: false },
      );
    }
    if (freshness.nextCheckAt) {
      const delay = Math.max(
        1,
        Date.parse(freshness.nextCheckAt) - Date.now() + 1,
      );
      const timer = setTimeout(
        () => {
          this.timers.delete(user.id);
          if (!this.closed && this.store.get(user.id, "state"))
            this.check(user);
        },
        Math.min(delay, 2_147_483_647),
      );
      timer.unref();
      this.timers.set(user.id, timer);
    }
    return null;
  }

  restore() {
    const rows = this.store.database
      .prepare("SELECT user_id FROM beta_documents WHERE doc_key='state'")
      .all() as { user_id: string }[];
    for (const row of rows) {
      const envelope = this.store.get(row.user_id, "state") as ReturnType<
        BetaFinancial["get"]
      > | null;
      if (envelope)
        this.check({
          id: row.user_id,
          name: envelope.state.profile.nickname,
          email: envelope.state.user.email,
        });
    }
  }

  cancel(userId: string) {
    const timer = this.timers.get(userId);
    if (timer) clearTimeout(timer);
    this.timers.delete(userId);
  }

  close() {
    this.closed = true;
    for (const userId of this.timers.keys()) this.cancel(userId);
  }
}
