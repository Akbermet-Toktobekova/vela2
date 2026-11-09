import { InterpretationSchema, type Interpretation } from '@shared/contracts/pipeline';
import type { FinancialSnapshot } from '@shared/pi/types';
import { LLMClient, wrapUntrustedData } from '../ai/llmClient';
import { prompts } from '../ai/prompts';
import { observePatterns } from './patternObservations';

export async function interpretEvidence(params: {
  role: 'pattern' | 'behavior';
  evidence: { id: string; value: unknown }[];
  summary: string;
  llm: Pick<LLMClient, 'generateStructured'>;
}) {
  const fallback = (): Interpretation => ({ findings: [], questions: [], limitations: [params.summary], summaryText: params.summary });
  if (!params.evidence.length) return { ...fallback(), models: [] };
  const ids = new Set(params.evidence.map(item => item.id));
  const model = await params.llm.generateStructured({
    systemPrompt: prompts[params.role].text,
    userPrompt: wrapUntrustedData(JSON.stringify(params.evidence), params.role),
    schema: InterpretationSchema,
    fallback,
  }).catch(() => null);
  const parsed = InterpretationSchema.safeParse(model?.data);
  if (!parsed.success || !model?.liveCallUsed) {
    return { ...fallback(), models: [{
      provider: model?.provider ?? 'deterministic_fallback', modelUsed: model?.modelUsed ?? 'none',
      liveCallUsed: false, fallbackReason: model?.fallbackReason ?? 'INTERPRETATION_UNAVAILABLE',
    }] };
  }
  const findings = parsed.data.findings.filter(item => item.evidenceIds.every(id => ids.has(id)));
  const questions = parsed.data.questions.filter(item => item.evidenceIds.every(id => ids.has(id)));
  const rejected = findings.length !== parsed.data.findings.length || questions.length !== parsed.data.questions.length;
  return {
    findings, questions,
    limitations: [...parsed.data.limitations, ...(rejected ? ['Unsupported references were removed.'] : [])],
    summaryText: rejected || !findings.length ? params.summary : findings.map(item =>
      (item.certainty === 'HYPOTHESIS' ? 'Unconfirmed: ' : '') + item.text).join(' '),
    models: [{ provider: model.provider, modelUsed: model.modelUsed, liveCallUsed: true }],
  };
}

export async function analyzePatterns(snapshot: FinancialSnapshot, referenceDate: string, llm: Pick<LLMClient, 'generateStructured'>) {
  const observed = observePatterns(snapshot, referenceDate);
  const groups = { repeat: observed.repeated, comparison: observed.comparisons, fee: observed.fees, extreme: observed.extremes, timing: observed.timing };
  const evidence = Object.entries(groups).flatMap(([kind, values]) =>
    (values as unknown[]).map((value, index) => ({ id: kind + '-' + (index + 1), value })));
  const interpretation = await interpretEvidence({ role: 'pattern', evidence, summary: observed.summaryText, llm });
  return { ...interpretation, observed, evidence };
}

export async function interpretBehavior(snapshot: FinancialSnapshot, pattern: Awaited<ReturnType<typeof analyzePatterns>>, llm: Pick<LLMClient, 'generateStructured'>) {
  return interpretEvidence({
    role: 'behavior',
    evidence: [
      ...pattern.evidence,
      ...pattern.findings.map((value, index) => ({ id: 'pattern-finding-' + (index + 1), value })),
      ...snapshot.goals.map(({ id, goalType, targetAmount, currency, targetDate }) =>
        ({ id, value: { goalType, targetAmount, currency, targetDate } })),
    ],
    summary: pattern.observed.summaryText,
    llm,
  });
}
