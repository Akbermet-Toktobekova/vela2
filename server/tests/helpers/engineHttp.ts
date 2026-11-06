import { PrototypePolicyBundle } from '@shared/contracts';
import express,{ Express,NextFunction,Request,Response } from 'express';
import { AssistantAgent } from '../../src/ai/assistantAgent';
import { LLMClient } from '../../src/ai/llmClient';
import { ASCatalogRepository } from '../../src/catalog/asCatalogRepository';
import { loadPrototypePolicy } from '../../src/config/policyLoader';
import { FrankfurterFXService } from '../../src/fx/frankfurterService';
import { ReviewOrchestrator } from '../../src/orchestrator/reviewWorkflow';
import { SecurityError,SecurityService } from '../../src/security/securityService';
import { SQLiteStore } from './engineStore';
import { createLocalAccessMiddleware } from './localAccess';

export interface CreateAppOptions {
  store?: SQLiteStore;
  fxService?: FrankfurterFXService;
  llmClient?: LLMClient;
  orchestrator?: ReviewOrchestrator;
  policy?: PrototypePolicyBundle;
  dbPath?: string;
}

export interface FinAgentAppBundle {
  app: Express;
  store: SQLiteStore;
  fxService: FrankfurterFXService;
  llmClient: LLMClient;
  orchestrator: ReviewOrchestrator;
}

function resolveAuthenticatedUser(req: Request): string {
  const headerVal = req.headers['x-user-id'];
  if (typeof headerVal === 'string' && headerVal.trim().length > 0) {
    return headerVal.trim();
  }
  if (Array.isArray(headerVal) && headerVal[0]?.trim()) {
    return headerVal[0].trim();
  }
  const authHeader = req.headers['authorization'];
  if (typeof authHeader === 'string' && authHeader.toLowerCase().startsWith('bearer ')) {
    const tokenUser = authHeader.slice(7).trim();
    if (tokenUser.length > 0) {
      return tokenUser;
    }
  }
  throw new SecurityError(
    'Authentication required: provide x-user-id or Authorization Bearer header.',
    401,
    'UNAUTHENTICATED'
  );
}

export function createApiRouter(bundle: {
  store: SQLiteStore;
  fxService: FrankfurterFXService;
  llmClient: LLMClient;
  orchestrator: ReviewOrchestrator;
}): express.Router {
  const router = express.Router();
  const { store, fxService, llmClient, orchestrator } = bundle;

  // 1. GET /api/health
  router.get('/health', (_req: Request, res: Response) => {
    const policy = orchestrator.getPolicy();
    res.json({
      status: 'ok',
      service: 'vela-finagent-server',
      version: '1.1.0',
      runtimeMode: policy.runtimeMode.mode,
      policyBundleVersion: policy.policyMeta.policyBundleVersion,
      llmStatus: llmClient.getQuotaAndModelStatus(),
      canonicalTableCounts: store.getCanonicalTableCounts(),
    });
  });

  // 2. GET /api/catalog
  router.get('/catalog', (_req: Request, res: Response) => {
    const policy = orchestrator.getPolicy();
    const kb = ASCatalogRepository.load();
    const pendingReopenClaims = kb.allClaims.filter(
      (c) => c.verification_status === 'PENDING_ORIGINAL_REOPEN'
    );

    res.json({
      metadata: kb.metadata,
      policy,
      counts: {
        sources: kb.sources.length,
        allClaims: kb.allClaims.length,
        verifiedClaims: kb.verifiedClaims.length,
        pendingOriginalReopenClaims: pendingReopenClaims.length,
        rules: kb.rules.length,
        formulas: kb.formulas.length,
        catalogActions: kb.catalogActions.length,
        agentKnowledgeMappings: kb.agentKnowledgeMappings.length,
        evidenceGaps: kb.evidenceGaps.length,
        verificationAudits: kb.verificationAudits.length,
      },
      sources: kb.sources,
      verifiedClaims: kb.verifiedClaims,
      allClaims: kb.allClaims,
      rules: kb.rules,
      formulas: kb.formulas,
      catalogActions: kb.catalogActions,
      agentKnowledgeMappings: kb.agentKnowledgeMappings,
      evidenceGaps: kb.evidenceGaps,
      sqliteTableCounts: store.getCanonicalTableCounts(),
    });
  });

  // 3. GET /api/pi/:userId
  router.get('/pi/:userId', (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUserId = resolveAuthenticatedUser(req);
      const targetUserId = String(req.params.userId || '');
      SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

      const piState = store.getPIState(authenticatedUserId, targetUserId, true);
      if (!piState) {
        res.status(404).json({
          error: 'PI_STATE_NOT_FOUND',
          message: `No PI state found for user '${targetUserId}'.`,
        });
        return;
      }

      res.json({
        userId: piState.userId,
        version: piState.version,
        versionNumber: piState.versionNumber,
        inputHash: piState.inputHash,
        snapshot: piState.snapshot,
        seed: piState.seed ?? null,
        calculatorExtras: piState.calculatorExtras ?? null,
        updatedAt: piState.updatedAt,
      });
    } catch (err) {
      next(err);
    }
  });

  // 4. PUT /api/pi/:userId
  router.put('/pi/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUserId = resolveAuthenticatedUser(req);
      const targetUserId = String(req.params.userId || '');
      SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

      if (req.body?.userId && req.body.userId !== targetUserId) {
        SecurityService.verifyUserAccess(authenticatedUserId, String(req.body.userId));
      }

      const reviewResult = await orchestrator.runReviewCycle({
        authenticatedUserId,
        targetUserId,
        eventType: req.body?.eventType || 'pi_updated',
        piUpdate: req.body,
        forceRefresh: Boolean(req.body?.forceRefresh ?? true),
      });

      const piState = store.getPIState(authenticatedUserId, targetUserId, false);

      res.json({
        status: 'ok',
        userId: targetUserId,
        version: reviewResult.snapshotVersion,
        piState,
        reviewResult,
        snapshot: reviewResult.snapshot,
        decision: reviewResult.decision,
        recommendation: reviewResult.recommendation,
        trace: reviewResult.trace,
      });
    } catch (err) {
      next(err);
    }
  });

  // 5. POST /api/review/:userId
  router.post('/review/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUserId = resolveAuthenticatedUser(req);
      const targetUserId = String(req.params.userId || '');
      SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

      if (req.body?.userId && req.body.userId !== targetUserId) {
        SecurityService.verifyUserAccess(authenticatedUserId, String(req.body.userId));
      }

      const hasPiPayload =
        req.body &&
        (req.body.snapshot ||
          req.body.seed ||
          req.body.accounts ||
          req.body.accountSummaries);

      const result = await orchestrator.runReviewCycle({
        authenticatedUserId,
        targetUserId,
        eventType: req.body?.eventType || 'manual_review',
        piUpdate: hasPiPayload ? req.body : req.body?.piUpdate,
        forceRefresh: Boolean(req.body?.forceRefresh),
      });

      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  // 6. GET /api/today/:userId
  router.get('/today/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUserId = resolveAuthenticatedUser(req);
      const targetUserId = String(req.params.userId || '');
      SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

      let piState = store.getPIState(authenticatedUserId, targetUserId, true);
      if (!piState) {
        res.status(404).json({
          error: 'USER_NOT_FOUND',
          message: `No financial snapshot found for user '${targetUserId}'.`,
        });
        return;
      }

      let latestBundle = store.getLatestRecommendationBundle(authenticatedUserId, targetUserId);
      const isCurrent = () => latestBundle &&
        latestBundle.snapshotVersion === piState!.version &&
        latestBundle.trace.snapshotVersion === piState!.version &&
        latestBundle.trace.snapshotId === piState!.snapshot.id &&
        latestBundle.recommendation.snapshotId === piState!.snapshot.id;
      if (!isCurrent()) {
        await orchestrator.runReviewCycle({
          authenticatedUserId, targetUserId, eventType: 'refresh_today', forceRefresh: true,
        });
        piState = store.getPIState(authenticatedUserId, targetUserId, false) || piState;
        latestBundle = store.getLatestRecommendationBundle(authenticatedUserId, targetUserId);
      }
      if (!isCurrent() || !latestBundle) {
        res.status(409).json({ code: 'SNAPSHOT_CHANGED_DURING_READ', message: 'Financial information changed during review. Reload Today.' });
        return;
      }

      const feedbackHistory = store.listActionFeedbackForUser(authenticatedUserId, targetUserId);

      res.json({
        userId: targetUserId,
        snapshotVersion: piState.version,
        snapshot: piState.snapshot,
        recommendation: latestBundle.recommendation,
        decision: latestBundle.decision,
        trace: latestBundle.trace,
        feedbackHistory,
      });
    } catch (err) {
      next(err);
    }
  });

  // 7. POST /api/feedback/:userId
  router.post('/feedback/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUserId = resolveAuthenticatedUser(req);
      const targetUserId = String(req.params.userId || '');
      SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

      if (req.body?.userId && req.body.userId !== targetUserId) {
        SecurityService.verifyUserAccess(authenticatedUserId, String(req.body.userId));
      }

      const action = req.body?.action as 'accept' | 'adjust' | 'decline' | 'complete';
      if (!['accept', 'adjust', 'decline', 'complete'].includes(action)) {
        res.status(400).json({
          error: 'INVALID_FEEDBACK_ACTION',
          message: `Feedback action must be one of: accept, adjust, decline, complete.`,
        });
        return;
      }

      const recommendationId = typeof req.body?.recommendationId === 'string'
        ? req.body.recommendationId : '';

      const result = await orchestrator.submitFeedback({
        authenticatedUserId,
        targetUserId,
        recommendationId,
        action,
        adjustedAmount:
          req.body?.adjustedAmount !== undefined ? req.body.adjustedAmount : req.body?.amount,
        note: req.body?.note || '',
      });

      if (result.status === 'ADJUSTMENT_REJECTED') {
        res.status(400).json({
          error: 'ADJUSTMENT_REJECTED',
          ...result,
        });
        return;
      }

      const updatedPi = store.getPIState(authenticatedUserId, targetUserId, false);
      res.json({
        ...result,
        snapshot: updatedPi?.snapshot ?? null,
        snapshotVersion: updatedPi?.version ?? null,
      });
    } catch (err) {
      next(err);
    }
  });

  // 8. GET /api/decisions/:userId/:evaluationId/trace
  router.get(
    '/decisions/:userId/:evaluationId/trace',
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const authenticatedUserId = resolveAuthenticatedUser(req);
        const targetUserId = String(req.params.userId || '');
        const evaluationId = String(req.params.evaluationId || '');
        SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

        const found = store.getDecisionTrace(authenticatedUserId, targetUserId, evaluationId);
        if (!found) {
          res.status(404).json({
            error: 'DECISION_TRACE_NOT_FOUND',
            message: `No decision trace '${evaluationId}' found for user '${targetUserId}'.`,
          });
          return;
        }

        res.json({
          evaluationId,
          userId: targetUserId,
          trace: found.trace,
          decision: found.decision,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // 9. POST /api/assistant/:userId/chat
  router.post(
    '/assistant/:userId/chat',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authenticatedUserId = resolveAuthenticatedUser(req);
        const targetUserId = String(req.params.userId || '');
        SecurityService.verifyUserAccess(authenticatedUserId, targetUserId);

        const question = String(req.body?.question || req.body?.message || '').trim();
        if (!question) {
          res.status(400).json({
            error: 'EMPTY_QUESTION',
            message: 'A question or message string is required.',
          });
          return;
        }

        const piState = store.getPIState(authenticatedUserId, targetUserId, true);
        if (!piState) {
          res.status(404).json({
            error: 'USER_NOT_FOUND',
            message: `No snapshot found for user '${targetUserId}'.`,
          });
          return;
        }

        const latestBundle = store.getLatestRecommendationBundle(
          authenticatedUserId,
          targetUserId
        );
        const minimizedSnapshot = SecurityService.minimizePIForLLM(piState.snapshot);
        const nowIso = new Date().toISOString();

        store.saveAssistantMessage(authenticatedUserId, targetUserId, {
          id: `msg_user_${Date.now()}`,
          userId: targetUserId,
          role: 'user',
          content: question,
          createdAt: nowIso,
        });

        const answer = await AssistantAgent.answerUserQuestion({
          question,
          snapshot: minimizedSnapshot,
          latestDecision: latestBundle?.decision ?? null,
          llmClient,
        });

        const assistantMsg = {
          id: `msg_assistant_${Date.now() + 1}`,
          userId: targetUserId,
          role: 'assistant' as const,
          content: answer.reply,
          toolUsed: answer.referencedActionIds.join(','),
          createdAt: new Date().toISOString(),
        };
        store.saveAssistantMessage(authenticatedUserId, targetUserId, assistantMsg);

        res.json({
          userId: targetUserId,
          reply: answer.reply,
          referencedSourceIds: answer.referencedSourceIds,
          referencedActionIds: answer.referencedActionIds,
          message: assistantMsg,
          history: store.listAssistantMessages(authenticatedUserId, targetUserId),
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // 10. GET /api/fx/rates
  router.get('/fx/rates', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const base = String(req.query.base || 'EUR')
        .trim()
        .toUpperCase();
      const rawSymbols = String(req.query.symbols || 'USD,GBP,HUF').trim();
      const symbols = rawSymbols
        .split(',')
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean);
      const dateParam = req.query.date ? String(req.query.date).trim() : undefined;

      const rates = dateParam
        ? await fxService.getHistoricalRates(dateParam, base, symbols)
        : await fxService.getLatestRates(base, symbols);

      res.json({
        base,
        date: dateParam || 'latest',
        rates,
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

export function createAppBundle(options?: CreateAppOptions): FinAgentAppBundle {
  const policy = options?.policy || loadPrototypePolicy();
  const store = options?.store || new SQLiteStore(options?.dbPath);
  const fxService =
    options?.fxService ||
    new FrankfurterFXService({
      policy,
      cacheStore: store,
    });
  const llmClient = options?.llmClient || new LLMClient();
  const orchestrator =
    options?.orchestrator ||
    new ReviewOrchestrator({
      store,
      fxService,
      llmClient,
      policy,
    });

  const app = express();
  app.use(createLocalAccessMiddleware());
  app.use(express.json({ limit: '5mb' }));

  app.use('/api', createApiRouter({ store, fxService, llmClient, orchestrator }));

  // Error handler preserving SecurityError statusCode = 403 and code = 'FORBIDDEN_CROSS_USER_ACCESS'
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof SecurityError) {
      res.status(err.statusCode).json({
        error: err.code,
        code: err.code,
        message: err.message,
      });
      return;
    }

    const statusObj = err as { statusCode?: number; code?: string; message?: string };
    const statusCode =
      typeof statusObj?.statusCode === 'number' && statusObj.statusCode >= 400
        ? statusObj.statusCode
        : 500;
    const code = statusObj?.code || 'INTERNAL_SERVER_ERROR';
    const message = err instanceof Error ? err.message : String(err);

    res.status(statusCode).json({
      error: code,
      code,
      message,
    });
  });

  return {
    app,
    store,
    fxService,
    llmClient,
    orchestrator,
  };
}
