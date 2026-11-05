import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { AddressInfo } from 'node:net';
import { describe, it, expect } from 'vitest';
import { createAppBundle } from '../../src/routes/api';
import { SQLiteStore } from '../../src/db/sqliteStore';
import { SecurityService } from '../../src/security/securityService';
import { LLMClient } from '../../src/ai/llmClient';
import { loadPrototypePolicy } from '../../src/config/policyLoader';
import { FrankfurterFXService } from '../../src/fx/frankfurterService';
import { ReviewOrchestrator } from '../../src/orchestrator/reviewWorkflow';
import { createDemoSeedData } from '../../../react-app/src/database/seed';
import { buildFinancialSnapshot } from '../../../react-app/src/services/snapshotBuilder';
import { FinancialSnapshot } from '../../../shared/pi/types';

function makeTestSnapshot(userId: string): FinancialSnapshot {
  const seed = createDemoSeedData();
  const base = buildFinancialSnapshot(seed);
  const nowIso = '2026-11-03T12:00:00.000Z';

  return {
    ...base,
    id: `snap_${userId}_v1`,
    userId,
    version: 'v1',
    createdAt: nowIso,
    baseCurrency: 'EUR',
    isDemoMode: false,
    profile: {
      ...base.profile,
      userId,
      nickname: 'Alex Mercer',
      baseCurrency: 'EUR',
    },
    accountSummaries: [
      {
        account: {
          id: 'acc_eur_main',
          userId,
          name: 'Erste Student Account',
          institution: 'Erste Bank',
          currency: 'EUR',
          purposes: ['daily_spending', 'savings'],
          fundsOwnership: 'personal',
          personalAvailableAmount: 1800,
          isPrimary: true,
          notes: 'IBAN AT611904300234573201',
          createdAt: nowIso,
          updatedAt: nowIso,
        },
        latestBalance: {
          id: 'bal_eur_main',
          accountId: 'acc_eur_main',
          amount: 1800,
          currency: 'EUR',
          asOf: '2026-11-03T10:00:00Z',
          sourceType: 'manual_update',
          createdAt: nowIso,
        },
        balanceHistory: [],
        isStale: false,
        personalAccessibleBalance: 1800,
        allocatedToGoals: 300,
        coverage: null,
        statementCount: 1,
        transactionCount: 2,
      },
    ],
    currencySummaries: [
      {
        currency: 'EUR',
        totalReportedBalance: 1800,
        personalAccessibleCash: 1800,
        allocatedToGoals: 300,
        upcomingUnpaidObligations: 600,
        uncommittedSafeToSpend: 900,
        hasWorkOrMixedUncertainty: false,
        hasMissingBalances: false,
      },
    ],
    primaryCurrencySummary: {
      currency: 'EUR',
      totalReportedBalance: 1800,
      personalAccessibleCash: 1800,
      allocatedToGoals: 300,
      upcomingUnpaidObligations: 600,
      uncommittedSafeToSpend: 900,
      hasWorkOrMixedUncertainty: false,
      hasMissingBalances: false,
    },
    essentialCommitment: {
      id: 'exp_essential',
      userId,
      estimatedMonthlyAmount: 1000,
      currency: 'EUR',
      notes: 'Rent + utilities + groceries',
      updatedAt: nowIso,
    },
    obligations: [
      {
        id: 'obl_rent',
        userId,
        name: 'Dorm Rent alex@uni.edu',
        category: 'rent',
        amount: 600,
        currency: 'EUR',
        dueDate: '2026-11-15',
        recurrence: 'monthly',
        accountId: 'acc_eur_main',
        status: 'unpaid',
        notes: 'Landlord IBAN DE89370400440532013000',
        createdAt: nowIso,
      },
    ],
    upcomingUnpaidObligations: [
      {
        id: 'obl_rent',
        userId,
        name: 'Dorm Rent alex@uni.edu',
        category: 'rent',
        amount: 600,
        currency: 'EUR',
        dueDate: '2026-11-15',
        recurrence: 'monthly',
        accountId: 'acc_eur_main',
        status: 'unpaid',
        notes: 'Landlord IBAN DE89370400440532013000',
        createdAt: nowIso,
      },
    ],
    overdueObligations: [],
    debts: [
      {
        id: 'debt_visa',
        userId,
        name: 'Visa Card 4532-1111-2222-3333',
        debtType: 'credit_card',
        currency: 'EUR',
        remainingBalance: 500,
        apr: 22.9,
        minimumPayment: 30,
        nextDueDate: '2026-11-20',
        paymentFrequency: 'monthly',
        createdAt: nowIso,
      },
    ],
    goals: [
      {
        id: 'goal_cushion',
        userId,
        name: 'Safety Cushion for alex@uni.edu',
        goalType: 'emergency_cushion',
        targetAmount: 1000,
        currency: 'EUR',
        targetDate: '2027-03-01',
        priority: 'high',
        createdAt: nowIso,
      },
    ],
    goalAllocations: [
      {
        id: 'alloc_cushion',
        userId,
        goalId: 'goal_cushion',
        accountId: 'acc_eur_main',
        amount: 300,
        currency: 'EUR',
        allocatedAt: nowIso,
        note: 'Initial cushion',
      },
    ],
    safetyCushionGoal: {
      id: 'goal_cushion',
      userId,
      name: 'Safety Cushion for alex@uni.edu',
      goalType: 'emergency_cushion',
      targetAmount: 1000,
      currency: 'EUR',
      targetDate: '2027-03-01',
      priority: 'high',
      createdAt: nowIso,
    },
    safetyCushionAllocated: 300,
    emergencyCoverageMonths: 0.3,
    emergencyCoverageDays: 9,
  };
}

describe('FinAgent HTTP Full-Stack Workflow, Persistence & Security Audit Suite', () => {
  it('1. Enforces 401 UNAUTHENTICATED when x-user-id is missing and 403 FORBIDDEN on cross-user access', async () => {
    const policy = loadPrototypePolicy();
    const store = new SQLiteStore({ filename: ':memory:' });
    const fxService = new FrankfurterFXService({ policy, cacheStore: store });
    const llmClient = new LLMClient({ mockMode: true });
    const orchestrator = new ReviewOrchestrator({ store, fxService, llmClient, policy });
    const bundle = createAppBundle({ store, fxService, llmClient, orchestrator, policy });

    const server = bundle.app.listen(0);
    const port = (server.address() as AddressInfo).port;
    const baseUrl = `http://127.0.0.1:${port}/api`;

    try {
      // 1. Missing x-user-id header -> 401 UNAUTHENTICATED
      const unauthRes = await fetch(`${baseUrl}/today/user_alice`);
      expect(unauthRes.status).toBe(401);
      const unauthJson = (await unauthRes.json()) as { code: string };
      expect(unauthJson.code).toBe('UNAUTHENTICATED');

      // 2. Cross-user access (authenticated as user_alice, requesting user_bob) -> 403 FORBIDDEN_CROSS_USER_ACCESS
      const crossRes = await fetch(`${baseUrl}/today/user_bob`, {
        headers: { 'x-user-id': 'user_alice' },
      });
      expect(crossRes.status).toBe(403);
      const crossJson = (await crossRes.json()) as { code: string };
      expect(crossJson.code).toBe('FORBIDDEN_CROSS_USER_ACCESS');
    } finally {
      server.close();
      store.close();
    }
  });

  it('2. Executes full HTTP workflow: PUT /api/pi -> GET /api/today -> GET /api/decisions/trace -> POST /api/feedback (accept, adjust, decline, complete) -> SQLite restart persistence', async () => {
    const tmpDbPath = path.join(os.tmpdir(), `vela_http_audit_${Date.now()}.sqlite`);
    const policy = loadPrototypePolicy();
    const store1 = new SQLiteStore(tmpDbPath);
    const fxService1 = new FrankfurterFXService({ policy, cacheStore: store1 });
    const llmClient1 = new LLMClient({ mockMode: true });
    const orchestrator1 = new ReviewOrchestrator({
      store: store1,
      fxService: fxService1,
      llmClient: llmClient1,
      policy,
    });
    const bundle1 = createAppBundle({
      store: store1,
      fxService: fxService1,
      llmClient: llmClient1,
      orchestrator: orchestrator1,
      policy,
    });

    const server1 = bundle1.app.listen(0);
    const port1 = (server1.address() as AddressInfo).port;
    const baseUrl1 = `http://127.0.0.1:${port1}/api`;
    const userId = 'user_e2e_audit';

    try {
      // Step A: PUT /api/pi/:userId
      const snap = makeTestSnapshot(userId);
      // Explicit dated essentials substantiate the declared monthly total.
      const essentials = {...snap.obligations[0],id:'obl_other_essentials',name:'Utilities and groceries',amount:400,dueDate:'2026-11-16',category:'other' as const};
      snap.obligations.push(essentials);
      snap.upcomingUnpaidObligations.push(essentials);
      snap.incomeSources = snap.incomeSources.map(i=>({...i,receivingAccountId:'acc_eur_main'}));
      const putRes = await fetch(`${baseUrl1}/pi/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          userId,
          snapshot: snap,
          calculatorExtras: {debtTerms:{debt_visa:{debtId:'debt_visa',interestAccruing:true}}},
          eventType: 'pi_updated',
        }),
      });
      expect(putRes.status).toBe(200);
      const putData = (await putRes.json()) as {
        version: string;
        reviewResult: {
          evaluationId: string;
          snapshotId: string;
          snapshotVersion: string;
        };
        decision: { selectedActionId: string };
        recommendation: { id: string; status: string };
      };
      expect(putData.version).toBeTruthy();
      expect(putData.decision.selectedActionId).toBe('A007');
      expect(putData.recommendation.status).toBe('proposed');

      // Step B: GET /api/today/:userId
      const todayRes = await fetch(`${baseUrl1}/today/${userId}`, {
        headers: { 'x-user-id': userId },
      });
      expect(todayRes.status).toBe(200);
      const todayData = (await todayRes.json()) as {
        snapshotVersion: string;
        recommendation: { id: string; snapshotId: string; status: string };
        trace: { snapshotId: string; snapshotVersion: string };
      };
      expect(todayData.snapshotVersion).toBe(putData.version);
      expect(todayData.recommendation.snapshotId).toBe(todayData.trace.snapshotId);

      // Step C: GET /api/decisions/:userId/:evaluationId/trace
      const evalId = putData.reviewResult.evaluationId;
      const traceRes = await fetch(`${baseUrl1}/decisions/${userId}/${evalId}/trace`, {
        headers: { 'x-user-id': userId },
      });
      expect(traceRes.status).toBe(200);
      const traceData = (await traceRes.json()) as {
        trace: {
          evaluationId: string;
          snapshotId: string;
          snapshotVersion: string;
          scoredCandidates: unknown[];
        };
      };
      expect(traceData.trace.evaluationId).toBe(evalId);
      expect(traceData.trace.scoredCandidates.length).toBeGreaterThan(0);

      // Step D1: POST /api/feedback/:userId (accept -> status='accepted', balances unchanged)
      const acceptRes = await fetch(`${baseUrl1}/feedback/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          recommendationId: putData.recommendation.id,
          action: 'accept',
        }),
      });
      expect(acceptRes.status).toBe(200);
      const acceptData = (await acceptRes.json()) as {
        status: string;
        recommendation: { status: string };
        snapshot: FinancialSnapshot;
      };
      expect(acceptData.status).toBe('ACCEPTED');
      expect(acceptData.recommendation.status).toBe('accepted');
      expect(acceptData.snapshot.safetyCushionAllocated).toBe(300);

      // Step D2: POST /api/feedback/:userId (adjust unsafe €5000 -> 400 ADJUSTMENT_REJECTED)
      const badAdjRes = await fetch(`${baseUrl1}/feedback/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          recommendationId: putData.recommendation.id,
          action: 'adjust',
          adjustedAmount: 5000,
        }),
      });
      expect(badAdjRes.status).toBe(400);
      const badAdjData = (await badAdjRes.json()) as { status: string };
      expect(badAdjData.status).toBe('ADJUSTMENT_REJECTED');

      // Step D3: POST /api/feedback/:userId (adjust safe €75 -> 200 ADJUSTED)
      const okAdjRes = await fetch(`${baseUrl1}/feedback/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          recommendationId: putData.recommendation.id,
          action: 'adjust',
          adjustedAmount: 75,
        }),
      });
      expect(okAdjRes.status).toBe(200);
      const okAdjData = (await okAdjRes.json()) as {
        status: string;
        recommendation: { status: string; adjustedAmount: number };
      };
      expect(okAdjData.status).toBe('ADJUSTED');
      expect(okAdjData.recommendation.status).toBe('adjusted');
      expect(okAdjData.recommendation.adjustedAmount).toBe(75);

      // Step D4: POST /api/feedback/:userId (decline -> excludes A007 and selects A002)
      const declineRes = await fetch(`${baseUrl1}/feedback/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          recommendationId: putData.recommendation.id,
          action: 'decline',
        }),
      });
      expect(declineRes.status).toBe(200);
      const declineData = (await declineRes.json()) as {
        status: string;
        decision: { selectedActionId: string };
        recommendation: { id: string };
      };
      expect(declineData.status).toBe('DECLINED_AND_RERUN');
      expect(declineData.decision.selectedActionId).toBe('A002');

      const acceptedAlternative = await fetch(`${baseUrl1}/feedback/${userId}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({ recommendationId: declineData.recommendation.id, action: 'accept' }),
      });
      expect(acceptedAlternative.status).toBe(200);
      const balanceBeforeCompletion = store1.getPIState(userId, userId, false)!.snapshot.accountSummaries[0].latestBalance!.amount;
      const validatedPayment = store1.getRecommendationById(userId, userId, declineData.recommendation.id)!.recommendation.suggestedAmount!;

      // Step D5: POST /api/feedback/:userId (complete A002 -> reduces debt balance)
      const completeRes = await fetch(`${baseUrl1}/feedback/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          recommendationId: declineData.recommendation.id,
          action: 'complete',
        }),
      });
      expect(completeRes.status).toBe(200);
      const completeData = (await completeRes.json()) as {
        status: string;
        recommendation: { status: string };
        snapshot: FinancialSnapshot;
      };
      expect(completeData.status).toBe('COMPLETED');
      expect(completeData.recommendation.status).toBe('completed');
      expect(completeData.snapshot.debts[0].remainingBalance).toBeLessThan(500);
      expect(completeData.snapshot.accountSummaries[0].latestBalance!.amount).toBe(balanceBeforeCompletion - validatedPayment);
      expect(completeData.snapshot.primaryCurrencySummary.personalAccessibleCash).toBe(balanceBeforeCompletion - validatedPayment);
    } finally {
      server1.close();
      store1.close();
    }

    // Step E: Reopen SQLite database from disk to verify persistence across app restart
    const store2 = new SQLiteStore(tmpDbPath);
    try {
      const rawCipher = store2.getRawEncryptedPIPayloadForTesting(userId);
      expect(rawCipher).toBeTruthy();
      expect(rawCipher!.startsWith('enc:v1:')).toBe(true);

      const reloadedBundle = store2.getLatestRecommendationBundle(userId, userId);
      expect(reloadedBundle).toBeTruthy();
      expect(reloadedBundle!.snapshotVersion).toBe(store2.getLatestSnapshotVersion(userId, userId));
      expect(store2.listRecommendationsForUser(userId, userId).some((record) => record.status === 'completed')).toBe(true);

      const feedbackRows = store2.listActionFeedbackForUser(userId, userId);
      expect(feedbackRows.map((f) => f.action)).toEqual([
        'complete',
        'accept',
        'decline',
        'adjust',
        'accept',
      ]);
    } finally {
      store2.close();
      if (fs.existsSync(tmpDbPath)) {
        try {
          fs.unlinkSync(tmpDbPath);
        } catch {
          // ignore cleanup lock on Windows
        }
      }
    }
  });

  it('3. Scrubs PII across nickname, concernNotes, account names, obligations, debts, goals, and transactions in minimizePIForLLM', () => {
    const snap = makeTestSnapshot('user_pii_audit');
    const minimized = SecurityService.minimizePIForLLM(snap);

    const serialized = JSON.stringify(minimized);
    expect(minimized.profile.nickname).toBe('');
    expect(serialized).not.toContain('Alex Mercer');
    expect(serialized).not.toContain('alex@uni.edu');
    expect(serialized).not.toContain('AT611904300234573201');
    expect(serialized).not.toContain('DE89370400440532013000');
    expect(serialized).not.toContain('4532-1111-2222-3333');
    expect(minimized.debts[0].name).toContain('[REDACTED_ACCOUNT_NUMBER]');
    expect(minimized.goals[0].name).toContain('[REDACTED_EMAIL]');
  });
});
