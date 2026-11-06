import { afterEach,describe,expect,it,vi } from "vitest";
import { BetaFinancial } from "../src/beta/financial";
import { BetaReviewScheduler } from "../src/beta/reviewScheduler";
import { BetaStore } from "../src/beta/store";

const user = {
  id: "scheduler-user",
  name: "Scheduler",
  email: "scheduler@example.com",
};
const stores: BetaStore[] = [];
const schedulers: BetaReviewScheduler[] = [];
afterEach(() => {
  schedulers.splice(0).forEach((s) => s.close());
  stores.splice(0).forEach((s) => s.close());
  vi.useRealTimers();
});
function setup(consent = true) {
  const store = new BetaStore({ filename: ":memory:" });
  stores.push(store);
  const financial = new BetaFinancial(store);
  const initial = financial.get(user);
  store.put(user.id, "state", { ...initial, aiConsent: consent });
  const analysis = {
    checkFreshness: vi.fn(
      () =>
        ({ needed: true, freshnessKey: "version:0" }) as {
          needed: boolean;
          freshnessKey?: string;
          nextCheckAt?: string;
        },
    ),
  };
  const jobs = { enqueue: vi.fn(() => ({ id: "review-job" })) };
  const scheduler = new BetaReviewScheduler(
    store,
    analysis as any,
    jobs as any,
  );
  schedulers.push(scheduler);
  return { store, financial, analysis, jobs, scheduler };
}
describe("Beta automatic review scheduling", () => {
  it("checks changed state using its version and stable freshness key", () => {
    const { scheduler, jobs } = setup();
    scheduler.check(user);
    expect(jobs.enqueue).toHaveBeenCalledWith(
      user.id,
      "review",
      { user, freshnessKey: "version:0" },
      0,
      { retryFailed: false },
    );
  });
  it("does not call AI freshness logic when consent is absent", () => {
    const { scheduler, analysis, jobs } = setup(false);
    scheduler.check(user);
    expect(analysis.checkFreshness).not.toHaveBeenCalled();
    expect(jobs.enqueue).not.toHaveBeenCalled();
  });
  it("restores existing users from encrypted state after startup", () => {
    const { scheduler, jobs } = setup();
    scheduler.restore();
    expect(jobs.enqueue).toHaveBeenCalledTimes(1);
  });
  it("waits until the declared deadline and cancels timers on user deletion", () => {
    vi.useFakeTimers();
    const { scheduler, analysis, jobs, store } = setup();
    const deadline = new Date(Date.now() + 10000).toISOString();
    analysis.checkFreshness.mockReturnValueOnce({
      needed: false,
      nextCheckAt: deadline,
    });
    scheduler.check(user);
    expect(jobs.enqueue).not.toHaveBeenCalled();
    vi.advanceTimersByTime(9999);
    expect(jobs.enqueue).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2);
    expect(jobs.enqueue).toHaveBeenCalledTimes(1);
    analysis.checkFreshness.mockReturnValueOnce({
      needed: false,
      nextCheckAt: new Date(Date.now() + 10000).toISOString(),
    });
    scheduler.check(user);
    scheduler.cancel(user.id);
    store.deleteUser(user.id);
    vi.advanceTimersByTime(10001);
    expect(jobs.enqueue).toHaveBeenCalledTimes(1);
  });
});
