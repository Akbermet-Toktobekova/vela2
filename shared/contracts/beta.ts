import { z } from "zod";
import { essentialGroups } from "../pi/types";
const id = z.string().min(1);
const n = z.number().finite();
const money = n.nonnegative();
const ccy = z.string().regex(/^[A-Z]{3}$/);
const date = z
  .string()
  .refine(
    (v) =>
      /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(v) &&
      Number.isFinite(Date.parse(v)) &&
      new Date(v.slice(0, 10) + "T00:00:00Z").toISOString().slice(0, 10) ===
        v.slice(0, 10),
    "Invalid date",
  );
const entity = z.object({ id, userId: id }).passthrough();
export const BetaCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});
export const BetaRegistrationSchema = BetaCredentialsSchema.extend({
  name: z.string().trim().min(1).max(120),
});
export const BetaSeedSchema = z.object({
  user: z.object({
    id,
    email: z.string(),
    authStatus: z.enum(["unverified", "demo_verified"]),
    isDemoMode: z.literal(false),
    createdAt: date,
  }),
  profile: z.object({
    userId: id,
    nickname: z.string(),
    locale: z.string(),
    baseCurrency: ccy,
    country: z.string(),
    updatedAt: date,
  }),
  preferences: z.object({
    userId: id,
    primaryConcern: z
      .enum([
        "save_more",
        "debt",
        "spending_visibility",
        "payday_short",
        "specific_goal",
        "not_sure",
      ])
      .nullable(),
    concernNotes: z.string(),
    statementReviewMode: z.literal('automatic').optional(),
    notificationsEnabled: z.boolean(),
    reducedMotion: z.boolean(),
    updatedAt: date,
  }),
  onboarding: entity.extend({
    currentStep: z.number().int().min(1).max(7),
    completedSteps: z.array(z.number().int().min(1).max(7)),
    debtQuestionAnswer: z.enum(["no", "yes", "not_sure"]).nullable(),
    status: z.enum(["in_progress", "completed"]),
    startedAt: date,
    completedAt: date.nullable(),
  }),
  accounts: z.array(
    entity.extend({
      name: z.string().min(1),
      institution: z.string(),
      currency: ccy,
      purposes: z
        .array(
          z.enum([
            "daily_spending",
            "receiving_income",
            "savings",
            "work_business",
            "mixed",
            "other",
            "not_sure",
          ]),
        )
        .min(1),
      fundsOwnership: z.enum([
        "personal",
        "work_business",
        "held_for_others",
        "mixed",
        "unknown",
      ]),
      personalAvailableAmount: money.nullable(),
      isPrimary: z.boolean(),
      notes: z.string(),
      createdAt: date,
      updatedAt: date,
    }),
  ),
  balances: z.array(
    z.object({
      id,
      accountId: id,
      amount: n,
      currency: ccy,
      asOf: date,
      sourceType: z.enum([
        "user_reported",
        "statement_closing",
        "manual_update",
      ]),
      sourceId: z.string().optional(),
      createdAt: date,
    }),
  ),
  incomes: z.array(
    entity.extend({
      name: z.string().min(1),
      pattern: z.enum(["regular", "irregular", "mixed"]),
      estimatedMonthlyAmount: money.nullable(),
      currency: ccy,
      frequency: z.enum(["monthly", "biweekly", "weekly", "irregular"]),
      sourceType: z.enum([
        "salary",
        "scholarship",
        "freelance",
        "part_time",
        "business",
        "other",
      ]),
      nextExpectedDate: date.nullable(),
      receivingAccountId: id.nullable(),
      notes: z.string(),
      createdAt: date,
    }),
  ),
  expenseCommitment: entity
    .extend({
      estimatedMonthlyAmount: money.nullable(),
      currency: ccy,
      notes: z.string(),
      updatedAt: date,
      details: z.array(z.object({id, name: z.string().trim().min(1), monthlyAmount: money, dueDate: date.optional(), group: z.enum(essentialGroups).optional()})).max(100).optional(),
    })
    .nullable(),
  obligations: z.array(
    entity.extend({
      name: z.string().min(1),
      amount: money,
      currency: ccy,
      dueDate: date,
      recurrence: z.enum(["monthly", "weekly", "yearly", "one_time"]),
      category: z.enum([
        "rent",
        "energy",
        "internet",
        "tuition",
        "insurance",
        "other",
      ]),
      status: z.enum(["unpaid", "paid"]),
      accountId: id.nullable(),
      notes: z.string(),
      createdAt: date,
    }),
  ),
  debts: z.array(
    entity.extend({
      name: z.string().min(1),
      debtType: z.enum([
        "credit_card",
        "student_loan",
        "personal_loan",
        "overdraft",
        "family_loan",
        "other",
      ]),
      currency: ccy,
      remainingBalance: money.nullable(),
      apr: money.nullable(),
      minimumPayment: money.nullable(),
      nextDueDate: date.nullable(),
      paymentFrequency: z.enum(["monthly", "weekly", "irregular"]).nullable(),
      createdAt: date,
    }),
  ),
  goals: z.array(
    entity.extend({
      name: z.string().min(1),
      goalType: z.enum([
        "emergency_cushion",
        "specific_purchase",
        "debt_paydown",
        "general_savings",
      ]),
      targetAmount: money.positive().nullable(),
      currency: ccy,
      targetDate: date.nullable(),
      priority: z.enum(["high", "medium", "low"]),
      createdAt: date,
    }),
  ),
  goalAllocations: z.array(
    entity.extend({
      goalId: id,
      accountId: id,
      amount: money,
      currency: ccy,
      allocatedAt: date,
      note: z.string(),
    }),
  ),
  statements: z.array(z.unknown()),
  subscriptions: z.array(z.unknown()).optional(),
  transactions: z.array(z.unknown()),
  classifications: z.array(z.unknown()),
  transferMatches: z.array(z.unknown()),
  confirmations: z.array(z.unknown()),
  recommendations: z.array(z.unknown()),
  assistantMessages: z.array(z.unknown()),
  actionFeedback: z.array(z.unknown()).optional(),
});
export const BetaStateUpdateSchema = z.object({
  expectedVersion: z.number().int().nonnegative(),
  state: BetaSeedSchema,
  aiConsent: z.boolean(),
  experimentalRecommendations: z.boolean().optional(),
});
export const BetaSpendingRatesSchema = z.object({
  base: ccy,
  rates: z.record(ccy, z.object({
    base: ccy, target: ccy, rate: money, rateDate: z.string().date(), fetchedAt: z.string().datetime(),
    status: z.enum(['OK', 'STALE', 'UNAVAILABLE']), source: z.string(),
  })),
});

export const BetaChatSchema = z.object({
  message: z.string().trim().min(1).max(12000),
  requestId: id,
});
export const BetaImportSchema = z.object({
  accountId: id,
  fileName: z.string().min(1).max(255),
  contentBase64: z.string().min(1),
});
export const BetaPdfMappingSchema = z.object({
  expectedVersion: z.number().int().nonnegative(),
  accounts: z.record(z.string().regex(/^[A-Z]{3}$/), id),
  excludedRows: z.array(id).default([]),
  corrections: z.record(id, z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).date(),
    description: z.string().trim().min(1).max(2000),
    amount: z.number().finite(),
  })).default({}),
});
