import { applySourceAdvice } from '../../orchestrator/reviewWorkflow';
import { LLMClient } from '../../ai/llmClient';
import { summarizeConversation } from '../../ai/conversationMemory';
import { TransactionClassifier } from '../../analyzer/transactionClassifier';
import { analyzePatterns, interpretBehavior } from '../../analyzer/patternAgent';
import { DebtAgent, calculateDebtReport } from '../../analyzer/debtAgent';
import { calculateFinancialMetrics } from '../../analyzer/financialMetrics';
import { evaluatePrimarySuggestions } from '../../suggestion/primarySuggestions';
import { SuggestionGenerator } from '../../suggestion/suggestionGenerator';
import { ActionChecker } from '../../checker/actionChecker';
import { AIEvaluationService } from '../../ai/evaluationCall';
import { WeightCalculator } from '../../decision/weightCalculator';
import { ImpactCalculator } from '../../decision/impactCalculator';
import { ScoringEngine } from '../../decision/scoringEngine';
import { RobustnessEngine } from '../../decision/robustnessChecker';
import { DecisionEngine } from '../../decision/decisionEngine';
import { AssistantAgent } from '../../ai/assistantAgent';
import { FrankfurterFXService } from '../../fx/frankfurterService';

export type CapturedCall = {
  attemptedModel?: string;
  usedByRuntime?: boolean;
  method: 'generateStructured' | 'generateText';
  systemPrompt: string;
  userPrompt: string;
  response: { provider: string; modelUsed: string; liveCallUsed: boolean; fallbackReason?: string; data?: unknown; text?: string };
};

export interface StageCapture {
  stage: string;
  status: string;
  input: unknown;
  output: unknown;
  calls: CapturedCall[];
  summary?: string;
}

function inputAs<T>(input: unknown): T {
  if (input === null || typeof input !== 'object') throw new Error('Captured stage input is missing.');
  return input as T;
}

export async function runCapturedStage(capture: StageCapture, mode: 'live' | 'replay', provider: LLMClient) {
  const { stage, input } = capture;
  if (capture.status === 'SKIPPED') return { output: capture.output, calls: [], status: 'SKIPPED' };
  // The first Gemma comparison always continued after a failed 31B attempt.
  const consumedCalls = capture.calls.filter(call => call.usedByRuntime ??
    (call.attemptedModel !== 'gemma-4-31b-it' || call.response.liveCallUsed));
  const calls: CapturedCall[] = [];
  const llm = new Proxy(provider, {
    get(target, key, receiver) {
      if (key !== 'generateStructured' && key !== 'generateText') return Reflect.get(target, key, receiver);
      return async (params: { systemPrompt: string; userPrompt: string; schema?: { parse(value: unknown): unknown } }) => {
        const saved = consumedCalls[calls.length];
        if (!saved || saved.method !== key || params.systemPrompt !== saved.systemPrompt) {
          throw new Error('Missing or incompatible captured AI call for ' + stage + '. Capture this stage with the current prompt first.');
        }
        const request = { ...params, userPrompt: saved.userPrompt };
        const invoke = target[key].bind(target) as (args: unknown) => Promise<CapturedCall['response']>;
        const response = mode === 'live' ? await invoke(request) : saved.response;
        if (key === 'generateStructured') params.schema?.parse(response.data);
        calls.push({ method: key, systemPrompt: request.systemPrompt, userPrompt: request.userPrompt, response });
        return response;
      };
    },
  });

  const primary = async (value: unknown, generationOnly: boolean) => {
    type PrimaryInput = Omit<Parameters<typeof evaluatePrimarySuggestions>[0], 'llm'>;
    if (generationOnly) {
      let draft: unknown;
      await evaluatePrimarySuggestions({
        ...inputAs<PrimaryInput>(value), llm,
        generationOnly: true, onDraftsGenerated: output => { draft = output; },
      });
      return draft ?? null;
    }
    const { primaryInput, drafts, fallback } = inputAs<{
      primaryInput: PrimaryInput;
      drafts: PrimaryInput['replayGeneration']; fallback: Awaited<ReturnType<typeof SuggestionGenerator.generateCandidates>>;
    }>(value);
    const checked = await evaluatePrimarySuggestions({
      ...primaryInput, replayGeneration: drafts, llm,
    });
    return {
      ...ActionChecker.runCheckerPipeline([...checked.candidates, ...(checked.fallbackReason ? fallback : [])], primaryInput.checker, checked.fallbackReason !== null),
      primary: checked.proposals,
    };
  };

  let output: unknown;
  switch (stage.startsWith('impact-') ? 'impact' : stage) {
    case 'classification':
      output = await TransactionClassifier.classify({ ...inputAs<Parameters<typeof TransactionClassifier.classify>[0]>(input), llmClient: llm });
      break;
    case 'pattern-recognition': {
      const value = inputAs<{ snapshot: Parameters<typeof analyzePatterns>[0]; referenceDate: string }>(input);
      output = await analyzePatterns(value.snapshot, value.referenceDate, llm);
      break;
    }
    case 'behavior-agent': {
      const value = inputAs<{ snapshot: Parameters<typeof interpretBehavior>[0]; pattern: Parameters<typeof interpretBehavior>[1]; classification: object }>(input);
      output = { ...await interpretBehavior(value.snapshot, value.pattern, llm), ...value.classification };
      break;
    }
    case 'financial-calculator': {
      const value = inputAs<{ snapshot: Parameters<typeof calculateFinancialMetrics>[0]; extras: Parameters<typeof calculateFinancialMetrics>[1] }>(input);
      output = calculateFinancialMetrics(value.snapshot, value.extras);
      break;
    }
    case 'debt-calculator': {
      const value = inputAs<{ snapshot: Parameters<typeof calculateDebtReport>[0]; extras: Parameters<typeof calculateDebtReport>[1] }>(input);
      output = calculateDebtReport(value.snapshot, value.extras);
      break;
    }
    case 'debt-agent':
      output = await DebtAgent.analyzeDebts({ ...inputAs<Parameters<typeof DebtAgent.analyzeDebts>[0]>(input), llmClient: llm });
      break;
    case 'suggestion-generator':
      output = await primary(input, true);
      break;
    case 'checker':
      output = await primary(input, false);
      break;
    case 'catalog-selector': {
      const value = inputAs<{ catalogInput: Parameters<typeof SuggestionGenerator.generateCandidates>[0] }>(input);
      output = await SuggestionGenerator.generateCandidates({ ...value.catalogInput, llmClient: llm });
      break;
    }
    case 'critical-coverage':
      output = ActionChecker.discoverCriticalActions(inputAs<Parameters<typeof ActionChecker.discoverCriticalActions>[0]>(input));
      break;
    case 'ai-evaluation':
      output = await AIEvaluationService.evaluateCandidateComplexities({ ...inputAs<Parameters<typeof AIEvaluationService.evaluateCandidateComplexities>[0]>(input), llmClient: llm });
      break;
    case 'weights':
      output = WeightCalculator.selectWeightProfile(inputAs<Parameters<typeof WeightCalculator.selectWeightProfile>[0]>(input));
      break;
    case 'impact':
      output = ImpactCalculator.evaluateFinancialImpact(inputAs<Parameters<typeof ImpactCalculator.evaluateFinancialImpact>[0]>(input));
      break;
    case 'scoring':
      output = ScoringEngine.scoreCandidates(inputAs<Parameters<typeof ScoringEngine.scoreCandidates>[0]>(input));
      break;
    case 'robustness':
      output = RobustnessEngine.evaluateRobustness(inputAs<Parameters<typeof RobustnessEngine.evaluateRobustness>[0]>(input));
      break;
    case 'decision-engine': {
      const value = inputAs<Parameters<typeof DecisionEngine.runDecisionEngine>[0] & {
        sourceAdvice: Parameters<typeof applySourceAdvice>[1];
        primaryClarification?: Parameters<typeof applySourceAdvice>[2];
      }>(input);
      output = applySourceAdvice(DecisionEngine.runDecisionEngine(value), value.sourceAdvice ?? [], value.primaryClarification).decision;
      break;
    }
    case 'explanation': {
      const value = inputAs<{ decision: Parameters<typeof AssistantAgent.generateExplanation>[0]; snapshot: Parameters<typeof AssistantAgent.generateExplanation>[1] }>(input);
      output = AssistantAgent.generateExplanation(value.decision, value.snapshot);
      break;
    }
    case 'fx': {
      const value = inputAs<{ baseCurrency: string; foreignSymbols: string[]; date: string }>(input);
      output = mode === 'replay' || !value.foreignSymbols.length ? capture.output :
        await new FrankfurterFXService().getHistoricalRates(value.date, value.baseCurrency, value.foreignSymbols, { referenceNowIso: value.date });
      break;
    }
    case 'conversation-memory': {
      const value = inputAs<{ messages: Parameters<typeof summarizeConversation>[0]; previous: Parameters<typeof summarizeConversation>[1] }>(input);
      output = await summarizeConversation(value.messages, value.previous, llm, text => text);
      break;
    }
    default:
      if (mode === 'replay') {
        return { output: capture.output, calls: capture.calls, status: 'CACHED' };
      }
      throw new Error('This is an authenticated API or storage checkpoint. Use a full synthetic profile run to repeat it.');
  }
  if (calls.length !== consumedCalls.length) throw new Error('The stage did not consume all expected captured calls.');
  return { output, calls, status: 'COMPLETED' };
}
