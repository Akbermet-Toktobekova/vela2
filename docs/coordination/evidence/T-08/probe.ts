// Documentation-only reproduction against an isolated in-memory synthetic database.
import { createAppBundle } from '../../../../server/src/routes/api';
import { SQLiteStore } from '../../../../server/src/db/sqliteStore';
import { LLMClient } from '../../../../server/src/ai/llmClient';
import { createBaselineSolventFixture } from '../../../../server/tests/helpers/testFixtures';

async function main() {
  const store = new SQLiteStore(':memory:');
  const { snapshot, extras } = createBaselineSolventFixture();
  const uid = snapshot.userId;
  const bundle = createAppBundle({ store, llmClient: new LLMClient({ mockMode: true }) });
  store.savePIState(uid, uid, { snapshot, calculatorExtras: extras });
  const server = bundle.app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  const port = (server.address() as { port: number }).port;
  const base = `http://127.0.0.1:${port}/api`;
  const headers = { 'x-user-id': uid, 'Content-Type': 'application/json' };
  try {
    const noAuth = await fetch(`${base}/pi/${uid}`);
    const forged = await fetch(`${base}/pi/${uid}`, { headers });
    const bearer = await fetch(`${base}/pi/${uid}`, { headers: { Authorization: `Bearer ${uid}` } });
    console.log(JSON.stringify({ probe: 'authentication', missingHeader: noAuth.status, selfAssertedVictimHeader: forged.status, unsignedBearerUserId: bearer.status }));
    const review = await bundle.orchestrator.runReviewCycle({ authenticatedUserId: uid, targetUserId: uid, forceRefresh: true });
    const before = store.getPIState(uid, uid, false)!;
    const r1 = await fetch(`${base}/feedback/${uid}`, { method:'POST',headers,body:JSON.stringify({ recommendationId:review.recommendation.id,action:'complete',adjustedAmount:50 }) });
    const j1 = await r1.json() as any;
    const r2 = await fetch(`${base}/feedback/${uid}`, { method:'POST',headers,body:JSON.stringify({ recommendationId:review.recommendation.id,action:'complete',adjustedAmount:50 }) });
    const j2 = await r2.json() as any;
    console.log(JSON.stringify({ probe:'repeated-complete', actionId:review.decision.selectedActionId, amount:50, firstHttpStatus:r1.status, firstStatus:j1.status, secondHttpStatus:r2.status, secondStatus:j2.status, beforeAllocations:before.snapshot.goalAllocations.length, afterFirstAllocations:j1.snapshot?.goalAllocations.length, afterSecondAllocations:j2.snapshot?.goalAllocations.length, beforeDebt:before.snapshot.debts[0]?.remainingBalance, afterFirstDebt:j1.snapshot?.debts[0]?.remainingBalance, afterSecondDebt:j2.snapshot?.debts[0]?.remainingBalance }));
    const today = await fetch(`${base}/today/${uid}`,{headers});
    const t = await today.json() as any;
    console.log(JSON.stringify({ probe:'today-after-complete',httpStatus:today.status,currentPIVersion:t.snapshotVersion,traceSnapshotVersion:t.trace?.snapshotVersion,recommendationStatus:t.recommendation?.status }));
  } finally {
    await new Promise<void>(resolve => server.close(() => resolve()));
    store.close();
  }
}
main().catch(e => { console.error(e); process.exitCode=1; });
