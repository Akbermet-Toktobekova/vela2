import { prompts } from '../ai/prompts';
import { ModelProvenanceSchema } from '@shared/contracts/pipeline';
import { z } from 'zod';
import {
  FinancialSnapshot,
  SpendingCategory,
  TransactionClassification,
  TransactionEconomicType,
  TransactionRecord,
  UserConfirmation,
} from '@shared/pi/types';
import { LLMClient, wrapUntrustedData } from '../ai/llmClient';

export interface RecurringDetectedItem {
  merchant: string;
  observedAmount: number;
  currency: string;
  transactionId: string;
}

export interface BehaviorAnalysisResult {
  categorizedCount: number;
  recurringDetected: RecurringDetectedItem[];
  proposedConfirmations: UserConfirmation[];
  updatedClassifications: Record<string, TransactionClassification>;
  summaryText: string;
  processedIds: string[];
  unresolvedIds: string[];
  models: z.infer<typeof ModelProvenanceSchema>[];
}

const LLMClassificationBatchSchema = z.object({
  classifications: z.array(
    z.object({
      transactionId: z.string(),
      economicType: z.enum([
        'income',
        'expense',
        'internal_transfer',
        'external_transfer',
        'debt_payment',
        'interest_fee',
        'refund',
        'cash_withdrawal',
        'savings_allocation',
        'work_business_movement',
        'unknown',
      ]),
      category: z.enum([
        'rent_housing',
        'utilities_energy',
        'internet_telecom',
        'groceries_food',
        'dining_coffee',
        'transport',
        'subscriptions',
        'shopping',
        'health',
        'education',
        'work_expense',
        'income',
        'transfer',
        'other',
      ]),
      confidence: z.enum(['high', 'medium', 'low']),
      isRecurringCandidate: z.boolean(),
      rationale: z.string(),
    })
  ),
});

interface DeterministicPassOutput {
  economicType: TransactionEconomicType;
  category: SpendingCategory;
  confidence: 'high' | 'medium' | 'low';
  isRecurringCandidate: boolean;
  provenanceNote: string;
}

const SUBSCRIPTION_KEYWORDS = [
  'netflix',
  'spotify',
  'youtube',
  'apple.com/bill',
  'icloud',
  'adobe',
  'chatgpt',
  'openai',
  'patreon',
  'disney',
  'hbo',
  'prime video',
  'audible',
  'gym',
  'fitness',
  'membership',
  'subscription',
  'cloud storage',
  'dropbox',
  'notion',
  'figma',
  'streaming',
];

function deterministicClassifyTransaction(tx: TransactionRecord): DeterministicPassOutput {
  const combined = `${tx.counterparty || ''} ${tx.description || ''}`.toLowerCase();

  if (tx.amount > 0) {
    if (
      combined.includes('salary') ||
      combined.includes('payroll') ||
      combined.includes('stipend') ||
      combined.includes('scholarship') ||
      combined.includes('wages')
    ) {
      return {
        economicType: 'income',
        category: 'income',
        confidence: 'high',
        isRecurringCandidate: true,
        provenanceNote: 'Deterministic pre-pass: payroll/stipend inflow keyword match',
      };
    }
    if (combined.includes('refund') || combined.includes('reversal')) {
      return {
        economicType: 'refund',
        category: 'other',
        confidence: 'high',
        isRecurringCandidate: false,
        provenanceNote: 'Deterministic pre-pass: refund keyword match',
      };
    }
    if (combined.includes('transfer') || combined.includes('own account')) {
      return {
        economicType: 'internal_transfer',
        category: 'transfer',
        confidence: 'medium',
        isRecurringCandidate: false,
        provenanceNote: 'Deterministic pre-pass: incoming transfer keyword match',
      };
    }
    return {
      economicType: 'unknown',
      category: 'other',
      confidence: 'low',
      isRecurringCandidate: false,
      provenanceNote: 'Deterministic pre-pass: positive inflow',
    };
  }

  // Negative amount (outflow)
  if (SUBSCRIPTION_KEYWORDS.some((kw) => combined.includes(kw))) {
    return {
      economicType: 'expense',
      category: 'subscriptions',
      confidence: 'high',
      isRecurringCandidate: true,
      provenanceNote: 'Deterministic pre-pass: recurring subscription merchant match (R010)',
    };
  }

  if (combined.includes('rent') || combined.includes('landlord') || combined.includes('housing') || combined.includes('dorm')) {
    return {
      economicType: 'expense',
      category: 'rent_housing',
      confidence: 'high',
      isRecurringCandidate: true,
      provenanceNote: 'Deterministic pre-pass: housing/rent keyword match',
    };
  }

  if (combined.includes('electric') || combined.includes('water') || combined.includes('gas') || combined.includes('utility') || combined.includes('energy')) {
    return {
      economicType: 'expense',
      category: 'utilities_energy',
      confidence: 'high',
      isRecurringCandidate: true,
      provenanceNote: 'Deterministic pre-pass: utility keyword match',
    };
  }

  if (combined.includes('internet') || combined.includes('telecom') || combined.includes('vodafone') || combined.includes('telekom') || combined.includes('mobile')) {
    return {
      economicType: 'expense',
      category: 'internet_telecom',
      confidence: 'high',
      isRecurringCandidate: true,
      provenanceNote: 'Deterministic pre-pass: telecom/internet keyword match',
    };
  }

  if (
    combined.includes('supermarket') ||
    combined.includes('grocery') ||
    combined.includes('lidl') ||
    combined.includes('aldi') ||
    combined.includes('tesco') ||
    combined.includes('spar') ||
    combined.includes('carrefour') ||
    combined.includes('rewe')
  ) {
    return {
      economicType: 'expense',
      category: 'groceries_food',
      confidence: 'high',
      isRecurringCandidate: false,
      provenanceNote: 'Deterministic pre-pass: grocery merchant match',
    };
  }

  if (
    combined.includes('cafe') ||
    combined.includes('coffee') ||
    combined.includes('restaurant') ||
    combined.includes('bistro') ||
    combined.includes('wolt') ||
    combined.includes('uber eats')
  ) {
    return {
      economicType: 'expense',
      category: 'dining_coffee',
      confidence: 'high',
      isRecurringCandidate: false,
      provenanceNote: 'Deterministic pre-pass: dining/coffee match',
    };
  }

  if (
    combined.includes('card payment') ||
    combined.includes('credit card') ||
    combined.includes('loan payment') ||
    combined.includes('repayment')
  ) {
    return {
      economicType: 'debt_payment',
      category: 'other',
      confidence: 'high',
      isRecurringCandidate: true,
      provenanceNote: 'Deterministic pre-pass: debt repayment match',
    };
  }

  if ((combined.includes('fee') || combined.includes('service charge')) || combined.includes('interest charge') || combined.includes('overdraft charge')) {
    return {
      economicType: 'interest_fee',
      category: 'other',
      confidence: 'high',
      isRecurringCandidate: false,
      provenanceNote: 'Deterministic pre-pass: bank/card fee or interest charge match',
    };
  }

  if (combined.includes('transfer') || combined.includes('revolut') || combined.includes('wise')) {
    return {
      economicType: 'internal_transfer',
      category: 'transfer',
      confidence: 'low',
      isRecurringCandidate: false,
      provenanceNote: 'Deterministic pre-pass: transfer candidate requiring verification',
    };
  }

  return {
    economicType: 'expense',
    category: 'other',
    confidence: 'low',
    isRecurringCandidate: false,
    provenanceNote: 'Deterministic pre-pass: general outflow (low confidence)',
  };
}

export interface BehaviorCallTelemetry {
  provider: 'gemini' | 'openai' | 'deterministic_fallback';
  modelUsed: string;
  liveCallUsed: boolean;
  fallbackReason?: string;
}

export class TransactionClassifier {
  public static lastCallTelemetry: BehaviorCallTelemetry | null = null;

  /**
   * Analyzes user transactions using a deterministic pre-pass + LLM classification for unconfirmed items.
   * Strictly preserves `user_confirmed` classifications, wraps statement descriptions in <untrusted_data>
   * tags to prevent prompt injection, detects recurring charges, and generates `UserConfirmation` records
   * without ever assuming a subscription is unwanted without user confirmation (Rule R010).
   */
  static async classify(params: {
    snapshot: FinancialSnapshot;
    llmClient: LLMClient;
    patternSummary?: string;
  }): Promise<BehaviorAnalysisResult> {
    const { snapshot, llmClient } = params;
    const updatedClassifications: Record<string, TransactionClassification> = {
      ...snapshot.classifications,
    };

    const unconfirmedTxs: TransactionRecord[] = [];
    const prePassMap = new Map<string, DeterministicPassOutput>();

    for (const tx of snapshot.transactions) {
      const existing = updatedClassifications[tx.id];
      // NEVER overwrite user_confirmed classifications!
      if (existing && existing.status === 'user_confirmed') {
        continue;
      }
      const det = deterministicClassifyTransaction(tx);
      prePassMap.set(tx.id, det);
      unconfirmedTxs.push(tx);
    }

    const processedIds: string[] = [];
    const unresolvedIds: string[] = [];
    const models: BehaviorAnalysisResult['models'] = [];
    const batchSize = 40; // Request size only. Every transaction is processed.
    for (let offset = 0; offset < unconfirmedTxs.length; offset += batchSize) {
      const batch = unconfirmedTxs.slice(offset, offset + batchSize);
      const batchIds = new Set(batch.map(tx => tx.id));
      const promptItems = batch.map((tx) => ({
        transactionId: tx.id,
        date: tx.date,
        amount: tx.amount,
        currency: tx.currency,
        counterparty: wrapUntrustedData(tx.counterparty || '', 'tx_counterparty'),
        description: wrapUntrustedData(tx.description || '', 'tx_description'),
        prePassSuggestion: prePassMap.get(tx.id),
      }));

      const systemPrompt = prompts.classification.text;
      const userPrompt = JSON.stringify({
        baseCurrency: snapshot.baseCurrency,
        transactions: promptItems,
        categories: LLMClassificationBatchSchema.shape.classifications.element.shape.category.options,
        economicTypes: LLMClassificationBatchSchema.shape.classifications.element.shape.economicType.options,
        matchedTransfers: snapshot.transferMatches.filter(pair => pair.status === "matched" || pair.status === "user_confirmed"),
      });

      const llmRes = await llmClient.generateStructured({
        systemPrompt,
        userPrompt,
        schema: LLMClassificationBatchSchema,
        fallback: () => ({
          classifications: batch.map((tx) => {
            const det = prePassMap.get(tx.id)!;
            return {
              transactionId: tx.id,
              economicType: det.economicType,
              category: det.category,
              confidence: det.confidence,
              isRecurringCandidate: det.isRecurringCandidate,
              rationale: det.provenanceNote,
            };
          }),
        }),
      });

      this.lastCallTelemetry = {
        provider: llmRes.provider,
        modelUsed: llmRes.modelUsed,
        liveCallUsed: llmRes.liveCallUsed,
        fallbackReason: llmRes.fallbackReason,
      };

      models.push(this.lastCallTelemetry);
      processedIds.push(...batchIds);
      const valid = LLMClassificationBatchSchema.safeParse(llmRes.data);
      const rows = valid.success ? valid.data.classifications : [];
      const byId = new Map<string, typeof rows>();
      for (const item of rows) {
        if (batchIds.has(item.transactionId)) byId.set(item.transactionId, [...(byId.get(item.transactionId) || []), item]);
      }
      const nowIso = new Date().toISOString();
      for (const tx of batch) {
        const candidates = byId.get(tx.id) || [];
        const matched = snapshot.transferMatches.some(pair =>
          (pair.status === 'matched' || pair.status === 'user_confirmed') &&
          (pair.outgoingTransactionId === tx.id || pair.incomingTransactionId === tx.id));
        const pre = prePassMap.get(tx.id)!;
        const item = candidates.length === 1 ? { ...candidates[0] } : {
          transactionId: tx.id, economicType: 'unknown', category: 'other', confidence: 'low',
          isRecurringCandidate: false, rationale: 'Classification missing or ambiguous.',
        } as const;
        const classification = { ...item };
        if (matched) Object.assign(classification, { economicType: 'internal_transfer', category: 'transfer', isRecurringCandidate: false });
        else if (item.economicType === 'internal_transfer') Object.assign(classification, { economicType: 'unknown', category: 'other', confidence: 'low', isRecurringCandidate: false });
        else if (candidates.length === 1 && (pre.economicType === 'interest_fee' || pre.category === 'internet_telecom')) {
          Object.assign(classification, pre);
        }
        if (classification.confidence === 'low' || classification.economicType === 'unknown') unresolvedIds.push(tx.id);
        const existing = updatedClassifications[item.transactionId];
        if (existing && existing.status === 'user_confirmed') {
          continue; // Double guard: never overwrite user_confirmed
        }
        updatedClassifications[item.transactionId] = {
          id: existing?.id || `cls_${item.transactionId}`,
          transactionId: item.transactionId,
          economicType: classification.economicType,
          category: classification.category,
          confidence: classification.confidence,
          status: classification.confidence === 'low' ? 'needs_review' : 'auto_classified',
          classifierVersion: prompts.classification.version + ':' + llmRes.modelUsed,
          isRecurringCandidate: classification.isRecurringCandidate,
          provenanceNote: classification.rationale,
          updatedAt: nowIso,
        };
      }
    }

    // Collect recurring subscriptions / recurring expense charges
    const recurringByMerchant = new Map<
      string,
      { merchant: string; observedAmount: number; currency: string; transactionId: string }
    >();

    for (const tx of snapshot.transactions) {
      if (tx.amount >= 0) continue;
      const cls = updatedClassifications[tx.id];
      const mName = (tx.counterparty || tx.description || 'Recurring Charge').trim();
      const mKey = JSON.stringify([tx.accountId, tx.currency, mName.toLowerCase()]);
      const isSubscriptionCandidate = cls?.category === 'subscriptions' && cls.economicType === 'expense';
      if (isSubscriptionCandidate && !recurringByMerchant.has(mKey)) {
        recurringByMerchant.set(mKey, {
          merchant: mName,
          observedAmount: Number(Math.abs(tx.amount).toFixed(2)),
          currency: tx.currency || snapshot.baseCurrency,
          transactionId: tx.id,
        });
      }
    }

    const recurringDetected = Array.from(recurringByMerchant.values());

    // Create UserConfirmation records for uncertain recurring subscriptions or transfers (never assuming unwanted!)
    const proposedConfirmations: UserConfirmation[] = [...snapshot.confirmations];
    for (const rec of recurringDetected) {
      const alreadyExists = proposedConfirmations.some(
        (c) =>
          c.subjectType === 'subscription' &&
          (c.subjectId === rec.transactionId ||
            c.questionText.toLowerCase().includes(rec.merchant.toLowerCase()))
      );
      if (!alreadyExists) {
        proposedConfirmations.push({
          id: `conf_sub_${rec.transactionId}`,
          userId: snapshot.userId,
          subjectType: 'subscription',
          subjectId: rec.transactionId,
          questionText: `We observed a possible subscription charge of ${rec.currency} ${rec.observedAmount.toFixed(2)} at ${rec.merchant}. Are you still actively using this subscription, and can it be cancelled without exit fees?`,
          impactReason:
            'Rule R010 requires confirming whether a recurring subscription is still wanted and checking exit terms before suggesting cancellation (A015).',
          amountLabel: `${rec.currency} ${rec.observedAmount.toFixed(2)}`,
          field: 'subscription_active_use',
          userResponse: null,
          confirmedValue: null,
          confirmedAt: null,
        });
      }
    }

    const categorizedCount = snapshot.transactions.filter(tx => updatedClassifications[tx.id]?.economicType !== 'unknown' && updatedClassifications[tx.id]).length;
    const summaryText =
      recurringDetected.length > 0
        ? `Analyzed ${snapshot.transactions.length} transactions (${categorizedCount} classified; user_confirmed preserved). Detected ${recurringDetected.length} recurring subscription candidate(s) (${recurringDetected.map((r) => `${r.merchant}: ${r.currency} ${r.observedAmount}`).join(', ')}) requiring user confirmation before any cancellation proposal (R010).`
        : `Analyzed ${snapshot.transactions.length} transactions (${categorizedCount} classified; user_confirmed preserved). No unconfirmed optional subscriptions detected.`;

    return {
      categorizedCount,
      processedIds,
      unresolvedIds,
      models,
      updatedClassifications,
      recurringDetected,
      proposedConfirmations,
      summaryText: params.patternSummary ? `${summaryText} ${params.patternSummary}` : summaryText,
    };
  }
}
