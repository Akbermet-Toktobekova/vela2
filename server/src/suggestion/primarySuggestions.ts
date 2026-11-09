import { prompts } from '../ai/prompts';
import type { ChatMemory } from '@shared/contracts/pipeline';
import { z } from 'zod';
import type { CandidateAction, PrimarySuggestionTraceSchema, SourceAdvice } from '@shared/contracts';
import { FinancialSnapshot, RecommendationRecord } from '@shared/pi/types';
import { LLMClient, wrapUntrustedData, type LLMCallResult } from '../ai/llmClient';
import { ASCatalogRepository } from '../catalog/asCatalogRepository';
import { ActionChecker, type CheckerContext } from '../checker/actionChecker';
import { primaryOutputSchema, primaryResponseJsonSchema } from './primaryProposalContract';
import { getEligibleExcerpts, getPrimaryGrounding, type PrimaryFact } from './primaryGrounding';
import { buildPrimaryExecution } from './primaryExecution';

export type PrimaryDraftResult = LLMCallResult<z.infer<typeof primaryOutputSchema>> | null;
const verificationSchema = z.object({
  verdicts: z.array(z.object({
    id: z.string(),
    status: z.enum(['CONSISTENT', 'CONTRADICTS', 'NEEDS_DATA']),
    reason: z.string().trim().min(1).max(600),
    safeWithoutFinancialExecution: z.boolean(),
    contradictionRefs: z.array(z.string()),
    supportingClaimIds: z.array(z.string()),
  })).max(3),
});

type Trace = z.infer<typeof PrimarySuggestionTraceSchema>;
type Entry = Trace['proposals'][number];
type Provider = Pick<LLMClient, 'generateStructured'>;

function financialFacts(snapshot: FinancialSnapshot, history: RecommendationRecord[]) {
  const facts: PrimaryFact[] = [];
  const add = (id: string, value: unknown, targetId?: string) => facts.push({ id, value, targetId });
  add('profile', { currency: snapshot.baseCurrency, country: snapshot.profile.country, concern: snapshot.preferences.primaryConcern });
  snapshot.accountSummaries.forEach(({ account, latestBalance, isStale, personalAccessibleBalance }, i) =>
    add(`account-${i + 1}`, { currency: account.currency, purposes: account.purposes,
      ownership: account.fundsOwnership, balance: latestBalance?.amount ?? null,
      asOf: latestBalance?.asOf ?? null, isStale, personalAccessibleBalance }, account.id));
  snapshot.incomeSources.forEach((income, i) => add(`income-${i + 1}`, {
    amount: income.estimatedMonthlyAmount, currency: income.currency, pattern: income.pattern,
    frequency: income.frequency, nextDate: income.nextExpectedDate, type: income.sourceType,
  }, income.id));
  snapshot.obligations.forEach((bill, i) => add(`obligation-${i + 1}`, {
    amount: bill.amount, currency: bill.currency, dueDate: bill.dueDate, recurrence: bill.recurrence,
    category: bill.category, status: bill.status,
  }, bill.id));
  snapshot.debts.forEach((debt, i) => add(`debt-${i + 1}`, {
    type: debt.debtType, balance: debt.remainingBalance, currency: debt.currency,
    apr: debt.apr, minimum: debt.minimumPayment, nextDueDate: debt.nextDueDate,
  }, debt.id));
  snapshot.goals.forEach((goal, i) => add(`goal-${i + 1}`, {
    type: goal.goalType, target: goal.targetAmount, currency: goal.currency,
    date: goal.targetDate, priority: goal.priority,
    allocations: snapshot.goalAllocations.filter(row => row.goalId === goal.id)
      .map(({ amount, currency }) => ({ amount, currency })),
  }, goal.id));
  snapshot.transactions.filter(tx => snapshot.classifications[tx.id]?.category === 'subscriptions')
    .forEach((tx, i) => add(`subscription-${i + 1}`, {
      date: tx.date, amount: tx.amount, currency: tx.currency, merchant: tx.counterparty,
      recurringCandidate: snapshot.classifications[tx.id]?.isRecurringCandidate,
    }, tx.id));
  add('behavior', { currency: snapshot.baseCurrency, statementCoverage: snapshot.statements.map(({ periodStart, periodEnd, currency, status }) => ({ periodStart, periodEnd, currency, status })), spendingByCategory: snapshot.spendingByCategory,
    observedSubscriptions: snapshot.observedSubscriptionsTotal, observedDebtPayments: snapshot.observedDebtPaymentsTotal,
    observedInternalTransfers: snapshot.observedInternalTransfersTotal, coverage: snapshot.dataQuality.coverageStatus });
  add('data-quality', { missing: snapshot.dataQuality.missingFields,
    essentials: snapshot.essentialCommitment && { amount: snapshot.essentialCommitment.estimatedMonthlyAmount,
      currency: snapshot.essentialCommitment.currency }, emergencyReserveCoverageMonths: snapshot.emergencyCoverageMonths });
  add('feedback', history.filter(item => item.status === 'declined' || item.status === 'completed')
    .map(item => ({ type: item.actionType, status: item.status, date: item.updatedAt,
      claimIds: item.sourceAdvice?.sources.map(source => source.claimId) })));
  return facts;
}

export async function evaluatePrimarySuggestions(params: {
  snapshot: FinancialSnapshot;
  context?: { analysis?: { id: string; value: unknown }[]; memory?: ChatMemory | null };
  history: RecommendationRecord[];
  checker: CheckerContext;
  llm: Provider;
  onDraftsGenerated?: (result: PrimaryDraftResult) => void;
  generationOnly?: boolean;
  replayGeneration?: PrimaryDraftResult;
  captureRawResponse?: boolean;
}) {
  const { snapshot, history, checker, llm } = params;
  const db = ASCatalogRepository.load();
  const sources = new Map(db.sources.map(source => [source.source_id, source]));
  const excerpts = getEligibleExcerpts(db, snapshot.profile.country);
  const availableClaims = new Map(excerpts.map(excerpt => [excerpt.claimId, excerpt]));
  const facts = financialFacts(snapshot, history);
  for (const fact of facts) {
    const plan = fact.id.startsWith('goal-') && fact.targetId && checker.calculatorExtras?.confirmedGoalContributions?.[fact.targetId];
    if (plan) Object.assign(fact.value as object, {
      confirmedContribution: plan.amount, contributionCurrency: plan.currency,
      fundingFactId: facts.find(row => row.id.startsWith('account-') && row.targetId === plan.sourceAccountId)?.id,
    });
  }
  facts.push(...(params.context?.analysis ?? []));
  const publicFacts = facts.map(({ id, value }) => ({ id, value }));
  const factIds = new Set(facts.map(fact => fact.id));
  const { gaps, ...riskContext } = getPrimaryGrounding(snapshot, facts, checker);
  const generation = params.replayGeneration !== undefined ? params.replayGeneration : await llm.generateStructured({
    systemPrompt: prompts.primary.text,
    userPrompt: wrapUntrustedData(JSON.stringify({
      facts: publicFacts, excerpts, riskContext, clarificationGaps: gaps,
      chatContext: params.context?.memory ? {
        status: params.context.memory.status, entries: params.context.memory.entries,
        summary: params.context.memory.summaryText, authority: 'CONTEXT_ONLY',
      } : null,
    }), 'suggestion_context'),
    schema: primaryOutputSchema,
    responseJsonSchema: primaryResponseJsonSchema,
    captureRawResponse: params.captureRawResponse,
    fallback: () => ({ proposals: [], shortfallReason: '' }),
  }).catch(() => null);
  const parsed = primaryOutputSchema.safeParse(generation?.data);
  const rawProposals = generation?.liveCallUsed && parsed.success ? parsed.data.proposals : [];
  const shortfallReason = generation?.data.shortfallReason ||
    (rawProposals.length === 3 ? '' : 'The model did not return a valid three-proposal response.');
  params.onDraftsGenerated?.(generation);

  const entries: (Entry & Pick<z.infer<typeof primaryOutputSchema>['proposals'][number], 'nextStep' | 'operation'>)[] = rawProposals.map((proposal, index) => ({
    ...proposal, id: 'primary-' + (index + 1), origin: 'MODEL', actionId: null,
    status: 'REJECTED', reason: 'Awaiting validation.',
    evidence: excerpts.filter(excerpt => proposal.claimIds.includes(excerpt.claimId)),
  }));
  if (!entries.length) {
    for (const gap of gaps.slice(0, 3)) {
      entries.push({
        id: 'primary-' + (entries.length + 1), origin: 'SYSTEM_CLARIFICATION', intent: 'CLARIFY', actionId: null,
        title: gap.missingInfo, description: gap.question, rationale: 'This information is missing from the supplied records.',
        targetFactId: gap.factIds[0], factIds: gap.factIds, claimIds: [], prerequisites: [], missingInfo: [gap.missingInfo],
        status: 'NEEDS_DATA', reason: 'Missing: ' + gap.missingInfo, evidence: [],
      });
    }
    while (entries.length < 3) {
      entries.push({
        id: 'primary-' + (entries.length + 1), origin: 'SYSTEM_UNAVAILABLE', actionId: null,
        title: 'Proposal slot unavailable', description: '', rationale: '', factIds: [], claimIds: [],
        status: 'NEEDS_DATA', reason: 'No validated model proposal or distinct recorded clarification for this slot.', evidence: [],
      });
    }
  }
  if (params.generationOnly) return { shortfallReason, proposals: entries, advice: [], candidates: [], clarification: undefined, fallbackReason: null };

  const seenTitles = new Set<string>();
  const seenGaps = new Set<string>();
  const datesIn = (text: string) => text.match(/\b\d{4}-\d{2}-\d{2}\b/g) ?? [];
  const pending = entries.filter(entry => {
    if (entry.origin !== 'MODEL') return false;
    if (!entry.targetFactId || !entry.factIds.includes(entry.targetFactId) || entry.factIds.some(id => !factIds.has(id))) {
      entry.reason = 'Unknown PI reference or target is absent from cited facts.';
      return false;
    }
    if (entry.claimIds.some(id => !availableClaims.has(id))) {
      entry.reason = 'AS claim was not supplied as eligible verified evidence.';
      return false;
    }
    const citedFacts = publicFacts.filter(fact => entry.factIds.includes(fact.id));
    const citedDates = new Set(datesIn(JSON.stringify(citedFacts)));
    const ungroundedDate = datesIn(`${entry.title} ${entry.description} ${entry.rationale}`)
      .find(date => !citedDates.has(date));
    if (ungroundedDate) {
      entry.reason = 'Date ' + ungroundedDate + ' does not appear in the cited PI facts.';
      return false;
    }
    const tokenPattern = /\{\{([a-z0-9-]+)\.([a-zA-Z][a-zA-Z0-9]*)\}\}/g;
    const prose = [entry.title, entry.description, entry.rationale];
    const literal = prose.join(' ').replace(tokenPattern, '');
    if (entry.intent !== 'CLARIFY' &&
        (/\p{Sc}|(?<![\p{L}\p{N}-])\d/u.test(literal.replace(/\b\d{4}-\d{2}-\d{2}\b/g, '')) ||
          (entry.nextStep !== undefined && datesIn(literal).length))) {
      entry.status = 'NEEDS_DATA';
      entry.reason = 'Use a reference to the exact PI field for a date, amount or rate.';
      return false;
    }
    let invalidToken = false;
    const rendered = prose.map(text => text.replace(tokenPattern, (_, id: string, field: string) => {
      const value = citedFacts.find(fact => fact.id === id)?.value;
      const fieldValue = value && typeof value === 'object' && Object.hasOwn(value, field)
        ? (value as Record<string, unknown>)[field] : undefined;
      if (typeof fieldValue === 'string' || typeof fieldValue === 'number') return String(fieldValue);
      invalidToken = true;
      return '';
    }));
    if (invalidToken || rendered.some(text => text.includes('{{') || text.includes('}}'))) {
      entry.reason = 'The proposal references an unavailable PI field.';
      return false;
    }
    [entry.title, entry.description, entry.rationale] = rendered;
    const title = entry.title.trim().toLowerCase();
    if (seenTitles.has(title)) {
      entry.reason = 'Duplicate suggestion.';
      return false;
    }
    if (entry.intent === 'CLARIFY') {
      const labels = entry.missingInfo ?? [];
      const matchedGaps = labels.map(label => gaps.find(gap => gap.missingInfo === label &&
        gap.factIds.some(id => entry.factIds.includes(id))));
      if (entry.claimIds.length || entry.prerequisites?.length || !labels.length ||
        matchedGaps.some(gap => !gap) || !matchedGaps.some(gap => gap?.factIds.includes(entry.targetFactId!))) {
        entry.reason = 'Clarification must cite a supplied PI gap, require no prerequisites and use no AS claims.';
        return false;
      }
      if (new Set(labels).size !== labels.length || labels.some(label => seenGaps.has(label))) {
        entry.reason = 'Duplicate clarification gap.';
        return false;
      }
      labels.forEach(label => seenGaps.add(label));
      seenTitles.add(title);
      entry.status = 'NEEDS_DATA';
      entry.reason = 'Missing: ' + labels.join(', ');
      return false;
    }
    if (entry.missingInfo?.length) {
      entry.status = 'NEEDS_DATA';
      entry.reason = 'Missing: ' + entry.missingInfo.join(', ');
      return false;
    }
    seenTitles.add(title);
    return true;
  });
  const reviews: { advice: SourceAdvice; dueDate?: string; highPriorityGoal: boolean }[] = [];
  const candidates: CandidateAction[] = [];
  const usedSteps = new Set<string>();
  if (pending.length) {
    const verification = await llm.generateStructured({
      systemPrompt: prompts.checker.text,
      userPrompt: wrapUntrustedData(JSON.stringify({
        facts: publicFacts, excerpts, riskContext,
        clarificationGaps: gaps,
        suggestions: pending.map(({ id, title, description, rationale, intent, targetFactId, factIds, claimIds, prerequisites, nextStep, operation }) =>
          ({ id, title, description, rationale, intent, targetFactId, factIds, claimIds, prerequisites, nextStep, operation })),
      }), 'checker_context'),
      schema: verificationSchema,
      responseJsonSchema: {
        type: 'object', additionalProperties: false, required: ['verdicts'],
        properties: { verdicts: {
          type: 'array', minItems: pending.length, maxItems: pending.length,
          items: {
            type: 'object', additionalProperties: false,
            required: ['id', 'status', 'reason', 'safeWithoutFinancialExecution', 'contradictionRefs', 'supportingClaimIds'],
            properties: {
              id: { type: 'string', enum: pending.map(entry => entry.id) },
              status: { type: 'string', enum: ['CONSISTENT', 'CONTRADICTS', 'NEEDS_DATA'] },
              reason: { type: 'string' }, safeWithoutFinancialExecution: { type: 'boolean' },
              contradictionRefs: { type: 'array', items: { type: 'string' } },
              supportingClaimIds: { type: 'array', items: { type: 'string' } },
            },
          },
        } },
      },
      fallback: () => ({ verdicts: [] }),
    }).catch(() => null);
    const parsedVerification = verificationSchema.safeParse(verification?.data);
    const verdicts = verification?.liveCallUsed && parsedVerification.success ? parsedVerification.data.verdicts : [];
    for (const entry of pending) {
      const matches = verdicts.filter(row => row.id === entry.id);
      const verdict = matches.length === 1 ? matches[0] : undefined;
      entry.status = 'NEEDS_DATA';
      entry.reason = 'Independent contradiction check unavailable or incomplete.';
      if (!verdict) continue;
      const { contradictionRefs, supportingClaimIds } = verdict;
      if (verdict.status === 'CONTRADICTS') {
        if (contradictionRefs.length && contradictionRefs.every(id => factIds.has(id) || availableClaims.has(id))) {
          entry.status = 'REJECTED';
          entry.reason = verdict.reason;
          entry.contradictionRefs = [...new Set(contradictionRefs)];
        }
        continue;
      }
      if (verdict.status === 'NEEDS_DATA') {
        entry.reason = verdict.reason;
        continue;
      }
      if (contradictionRefs.length || supportingClaimIds.some(id => !availableClaims.has(id))) continue;
      const verifiedEvidence = excerpts.filter(excerpt => supportingClaimIds.includes(excerpt.claimId));
      if (entry.intent === 'EXECUTE') {
        const target = facts.find(fact => fact.id === entry.targetFactId)?.targetId;
        const candidate = buildPrimaryExecution(entry.operation, target, checker, verifiedEvidence);
        if (!candidate) {
          entry.reason = 'The proposal requires a matching execution contract and complete financial inputs.';
          continue;
        }
        const checked = ActionChecker.validateCandidate(candidate, checker);
        entry.status = checked.status;
        entry.reason = checked.status === 'VALID' ? verdict.reason :
          [...checked.missingFields, ...checked.failedChecks.map(failure => failure.detail)].join('; ');
        entry.actionId = candidate.actionId;
        entry.mappedCandidateId = candidate.candidateId;
        if (checked.status === 'VALID' && !candidates.some(row => row.candidateId === candidate.candidateId)) {
          candidates.push(checked.candidate);
          entry.usefulness = 'USEFUL';
          entry.usefulnessReason = 'The checked operation advances its specific financial target.';
        }
        continue;
      }
      const text = `${entry.title} ${entry.description} ${entry.rationale}`;
      const reviewOnly = /^(review|check|read|learn|compare|list|verify|identify)\b/i.test(entry.title);
      if (!reviewOnly || !verdict.safeWithoutFinancialExecution || /https?:|www\./i.test(text)) {
        entry.reason = 'The review requires executable financial checks or contains an unverified link.';
        continue;
      }
      const sourceLinks = verifiedEvidence.flatMap(({ claimId, sourceId }) => {
        const source = sources.get(sourceId)!;
        if (!/^https?:\/\//i.test(source.canonical_url) || !z.string().url().safeParse(source.canonical_url).success) return [];
        return [{ claimId, sourceId, title: source.title, url: source.canonical_url }];
      });
      if (sourceLinks.length !== verifiedEvidence.length) {
        entry.reason = 'Canonical source link is unavailable.';
      } else if (history.some(item => item.sourceAdvice?.title.toLowerCase() === entry.title.toLowerCase() &&
        (item.status === 'declined' || item.status === 'completed'))) {
        entry.status = 'REJECTED';
        entry.reason = 'The same advice was previously declined or completed.';
      } else {
        entry.status = 'VALID';
        entry.reason = verdict.reason;
        entry.evidence = verifiedEvidence;
        const gap = gaps.find(row => row.missingInfo === entry.nextStep && row.factIds.includes(entry.targetFactId!));
        if (!gap || usedSteps.has(gap.missingInfo)) {
          entry.usefulness = 'WEAK';
          entry.usefulnessReason = gap ? 'Duplicates an already validated next step.' : 'No matching open decision or information gap.';
          continue;
        }
        usedSteps.add(gap.missingInfo);
        entry.usefulness = 'USEFUL';
        entry.usefulnessReason = 'Resolves an open question: ' + gap.missingInfo;
        const target = facts.find(row => row.id === entry.targetFactId)?.targetId;
        reviews.push({
          advice: { id: entry.id, title: entry.title, description: entry.description, rationale: entry.rationale, sources: sourceLinks },
          dueDate: gap.dueDate, highPriorityGoal: snapshot.goals.some(goal => goal.id === target && goal.priority === 'high'),
        });
      }
    }
  }
  for (const entry of entries) {
    entry.usefulness ??= entry.status === 'VALID' ? 'WEAK' : 'NOT_ELIGIBLE';
    entry.usefulnessReason ??= entry.status === 'VALID' ? 'Duplicates an already checked operation.' : 'The proposal has not passed the safety and evidence checks.';
  }
  const advice = reviews.sort((a, b) => a.dueDate && b.dueDate ? a.dueDate.localeCompare(b.dueDate)
    : Number(Boolean(b.dueDate)) - Number(Boolean(a.dueDate)) || Number(b.highPriorityGoal) - Number(a.highPriorityGoal)).map(row => row.advice);
  const clarification = gaps.find(gap => gap.route === 'accounts') ?? gaps.find(gap => entries.some(entry =>
    entry.intent === 'CLARIFY' && entry.status === 'NEEDS_DATA' && entry.missingInfo?.includes(gap.missingInfo))) ?? gaps[0];
  const fallbackReason: Trace['fallbackReason'] = advice.length || candidates.length ? null
    : entries.every(entry => entry.status === 'REJECTED') ? 'ALL_PRIMARY_REJECTED' : 'NO_USEFUL_PRIMARY';
  return { proposals: entries, advice, candidates, clarification, shortfallReason, fallbackReason };
}
