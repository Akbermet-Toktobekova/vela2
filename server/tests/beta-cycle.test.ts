import { randomBytes } from "node:crypto";
import { mkdtempSync,rmSync } from "node:fs";
import { createServer,Server } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach,describe,expect,it } from "vitest";
import { LLMClient } from "../src/ai/llmClient";
import { createBetaApp } from "../src/beta/app";
import { BetaStore } from "../src/beta/store";

const cleanups: (() => Promise<void>)[] = [];
afterEach(async () => {
  for (const cleanup of cleanups.splice(0).reverse()) await cleanup();
});
async function serve(store: BetaStore) {
  const bundle = createBetaApp({
    store,
    llmClient: new LLMClient({ mockMode: true }),
    autoReview: false,
  });
  const server: Server = await new Promise((resolve) => {
    const server = createServer(bundle.app);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
  cleanups.push(async () => {
    bundle.dispose();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/beta`;
  return {
    ...bundle,
    call: async (
      route: string,
      token: string | null = null,
      method = "GET",
      body?: unknown,
    ) => {
      const response = await fetch(base + route, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      return { status: response.status, body: await response.json() };
    },
  };
}
async function finished(
  app: Awaited<ReturnType<typeof serve>>,
  token: string,
  id: string,
) {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    const job = await app.call("/jobs/" + id, token);
    if (["completed", "failed"].includes(job.body.status)) return job.body;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error("Review did not finish");
}
describe("Seven-block cycle through authenticated beta HTTP", () => {
  it("publishes an opted-in checked action and preserves trace, feedback and session after restart", async () => {
    const directory = mkdtempSync(path.join(tmpdir(), "vela-cycle-"));
    const key = randomBytes(32);
    const filename = path.join(directory, "cycle.sqlite");
    let store = new BetaStore({ filename, key });
    cleanups.push(async () => {
      store.close();
      rmSync(directory, { recursive: true, force: true });
    });
    const app = await serve(store);
    const registration = await app.call("/auth/register", null, "POST", {
      name: "Cycle Test",
      email: "cycle@example.com",
      password: "Cycle-Test-Password-123!",
    });
    expect(registration.status).toBe(201);
    const { token, user } = registration.body;
    const initial = await app.call("/state", token);
    const state = initial.body.state;
    const now = new Date().toISOString();
    const due = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    state.accounts.push({
      id: "main",
      userId: user.id,
      name: "Main",
      institution: "Synthetic bank",
      currency: "EUR",
      purposes: ["daily_spending"],
      fundsOwnership: "personal",
      personalAvailableAmount: null,
      isPrimary: true,
      notes: "",
      createdAt: now,
      updatedAt: now,
    });
    state.balances.push({
      id: "main-balance",
      accountId: "main",
      amount: 20,
      currency: "EUR",
      asOf: now,
      sourceType: "user_reported",
      createdAt: now,
    });
    state.expenseCommitment = {
      id: "essentials",
      userId: user.id,
      estimatedMonthlyAmount: 1200,
      currency: "EUR",
      notes: "Synthetic monthly estimate",
      updatedAt: now,
    };
    state.obligations.push({
      id: "rent",
      userId: user.id,
      name: "Synthetic rent",
      amount: 800,
      currency: "EUR",
      dueDate: due,
      recurrence: "one_time",
      category: "rent",
      status: "unpaid",
      accountId: "main",
      notes: "",
      createdAt: now,
    });
    state.onboarding.status = "completed";
    state.onboarding.completedAt = now;
    state.onboarding.debtQuestionAnswer = "no";
    expect(
      (
        await app.call("/state", token, "PUT", {
          expectedVersion: 0,
          state,
          aiConsent: true,
          experimentalRecommendations: true,
        })
      ).status,
    ).toBe(200);
    const queued = await app.call("/review", token, "POST", {});
    expect(queued.status).toBe(202);
    const job = await finished(app, token, queued.body.id);
    expect(job.status).toBe("completed");
    const today = await app.call("/state", token);
    expect(today.body.analysis.recommendation).toBeTruthy();
    expect(today.body.analysis.decision.selectedActionId).toBe("A020");
    expect(today.body.analysis.traceId).toBeTruthy();
    const traceId = today.body.analysis.traceId;
    expect((await app.call("/traces/" + traceId, token)).status).toBe(200);
    const feedback = {
      recommendationId: today.body.analysis.recommendation.id,
      action: "accept",
      requestId: "accept-once",
      expectedVersion: today.body.version,
    };
    const accepted = await app.call("/feedback", token, "POST", feedback);
    expect(accepted.status).toBe(200);
    expect(accepted.body.recommendation.status).toBe("accepted");
    expect(accepted.body.state.balances[0].amount).toBe(20);
    const repeated = await app.call("/feedback", token, "POST", feedback);
    expect(repeated.status).toBe(200);
    expect(repeated.body.feedbackRecord.id).toBe(
      accepted.body.feedbackRecord.id,
    );
    app.dispose();
    await new Promise<void>((resolve) => setTimeout(resolve, 10));
    // A second connection simulates a new process without copying transient engine state.
    const reopened = new BetaStore({ filename, key });
    cleanups.push(async () => reopened.close());
    const second = await serve(reopened);
    const restored = await second.call("/state", token);
    expect(restored.status).toBe(200);
    expect(restored.body.analysis.recommendation.status).toBe("accepted");
    expect((await second.call("/traces/" + traceId, token)).status).toBe(200);
  });
});
