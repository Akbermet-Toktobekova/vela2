import { describe,expect,it } from 'vitest';
import { buildFinancialSnapshot } from '../../../shared/processing/snapshotBuilder';
import { AIEvaluationService } from '../../src/ai/evaluationCall';
import { LLMClient,parseEnvFile } from '../../src/ai/llmClient';
import { BehaviorAgent } from '../../src/analyzer/behaviorAgent';
import { ActionChecker } from '../../src/checker/actionChecker';
import { loadPrototypePolicy } from '../../src/config/policyLoader';
import { DecisionEngine } from '../../src/decision/decisionEngine';
import { SuggestionGenerator } from '../../src/suggestion/suggestionGenerator';
import { createDemoSeedData } from '../fixtures/profile';

describe('FinAgent Separated Live Gemini AI Integration Suite (mockMode: false)', () => {
  const envVars = parseEnvFile();
  const hasGeminiKey = Boolean(
    process.env.GEMINI_API_KEY || envVars.GEMINI_API_KEY
  );

  it.skipIf(!hasGeminiKey)(
    'Executes real live Gemini API calls (gemini-3.1-flash-lite / gemini-3.5-flash-lite) for BehaviorAgent, SuggestionGenerator, and single batch AIEvaluationService while keeping R/F/G 100% deterministic',
    async () => {
      const policy = loadPrototypePolicy();
      const liveLlm = new LLMClient({ mockMode: false });
      expect(liveLlm.isMockMode()).toBe(false);

      const seed = createDemoSeedData();
      const snapshot = buildFinancialSnapshot(seed);

      // 1. Live BehaviorAgent call
      const behaviorResult = await BehaviorAgent.analyzeTransactions({
        snapshot,
        llmClient: liveLlm,
      });
      expect(behaviorResult.categorizedCount).toBeGreaterThan(0);
      expect(BehaviorAgent.lastCallTelemetry).toBeTruthy();
      expect(BehaviorAgent.lastCallTelemetry?.liveCallUsed).toBe(true);
      expect(BehaviorAgent.lastCallTelemetry?.provider).toBe('gemini');

      // 2. Live SuggestionGenerator call
      const candidates = await SuggestionGenerator.generateCandidates({
        snapshot,
        policy,
        calculatorExtras: { referenceDateIso: '2026-11-03T12:00:00Z' },
        llmClient: liveLlm,
      });
      expect(candidates.length).toBeGreaterThan(0);
      expect(candidates.length).toBeLessThanOrEqual(3);
      expect(SuggestionGenerator.lastCallTelemetry).toBeTruthy();
      expect(SuggestionGenerator.lastCallTelemetry?.liveCallUsed).toBe(true);
      expect(SuggestionGenerator.lastCallTelemetry?.provider).toBe('gemini');

      // 3. Deterministic Checker
      const checkerOutput = ActionChecker.runCheckerPipeline(candidates, {
        snapshot,
        policy,
        calculatorExtras: { referenceDateIso: '2026-11-03T12:00:00Z' },
      });
      const validCandidates = [
        ...checkerOutput.validCriticalCandidates,
        ...checkerOutput.validFinancialCandidates,
        ...checkerOutput.validVerificationCandidates,
      ].map((v) => v.candidate);
      expect(validCandidates.length).toBeGreaterThan(0);

      // 4. Single Batch Live AI Evaluation Call (T, S, D, O + rationales)
      const complexityMap = await AIEvaluationService.evaluateCandidateComplexities({
        snapshot,
        validCandidates,
        policy,
        llmClient: liveLlm,
      });
      expect(AIEvaluationService.lastCallTelemetry).toBeTruthy();
      expect(AIEvaluationService.lastCallTelemetry?.liveCallUsed).toBe(true);
      expect(AIEvaluationService.lastCallTelemetry?.provider).toBe('gemini');
      expect(AIEvaluationService.lastCallTelemetry?.candidateCount).toBe(
        validCandidates.length
      );

      for (const cand of validCandidates) {
        const factors = complexityMap[cand.candidateId];
        expect(factors).toBeTruthy();
        for (const comp of ['T', 'S', 'D', 'O'] as const) {
          expect(factors[comp]).toBeTruthy();
          expect(typeof factors[comp]!.rationale).toBe('string');
          expect(factors[comp]!.rationale.length).toBeGreaterThan(5);
          if (factors[comp]!.status === 'EVALUATED') {
            expect(factors[comp]!.score).toBeGreaterThanOrEqual(0);
            expect(factors[comp]!.score).toBeLessThanOrEqual(1);
          }
        }
      }

      // 5. Verify R, F, G are computed strictly by deterministic DecisionEngine / ImpactCalculator
      const decision1 = DecisionEngine.runDecisionEngine({
        evaluationId: 'eval_live_det_1',
        snapshot,
        checkerOutput,
        aiComplexityByCandidateId: complexityMap,
        policy,
        calculatorExtras: { referenceDateIso: '2026-11-03T12:00:00Z' },
      });
      const decision2 = DecisionEngine.runDecisionEngine({
        evaluationId: 'eval_live_det_2',
        snapshot,
        checkerOutput,
        aiComplexityByCandidateId: {}, // even with fallback complexity, R/F/G must be identical
        policy,
        calculatorExtras: { referenceDateIso: '2026-11-03T12:00:00Z' },
      });

      expect(
        decision1.trace.scoredCandidates.map((sc) => ({
          id: sc.candidate.candidateId,
          impact: sc.impact,
        }))
      ).toEqual(
        decision2.trace.scoredCandidates.map((sc) => ({
          id: sc.candidate.candidateId,
          impact: sc.impact,
        }))
      );
      const quotaStatus = liveLlm.getQuotaAndModelStatus();
      const totalLiveSuccesses = Object.values(quotaStatus.modelStates).reduce(
        (sum, st) => sum + st.successCount,
        0
      );
      expect(totalLiveSuccesses).toBeGreaterThanOrEqual(3);
    },
    60000
  );
});
