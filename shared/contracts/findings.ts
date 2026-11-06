import { z } from 'zod';
export const FindingAnswerSchema = z.enum(['dismiss','still_used','no_longer_used','unsure','internal_transfer','external_transfer','confirm_classification']);
export const FindingCategorySchema = z.enum(['rent_housing','utilities_energy','internet_telecom','groceries_food','dining_coffee','transport','subscriptions','shopping','health','education','work_expense','income','transfer','other']);
export const FindingEconomicTypeSchema = z.enum(['income','expense','internal_transfer','external_transfer','debt_payment','interest_fee','refund','cash_withdrawal','savings_allocation','work_business_movement','unknown']);
export const FindingSchema = z.object({
 id:z.string().min(1),kind:z.enum(['data_blocker','duplicate','recurrence','fee','transfer','classification']),
 title:z.string(),observation:z.string(),whyItMatters:z.string(),question:z.string(),currency:z.string(),accountId:z.string(),
 evidenceIds:z.array(z.string()),dateRange:z.object({start:z.string(),end:z.string()}),totalAmount:z.number().finite(),
 confidence:z.enum(['high','medium','low']),state:z.enum(['unresolved','answered','dismissed','deferred']),evidenceVersion:z.string(),
 reviewStatus:z.enum(['Approved','Corrected','Dismissed','Deferred']).optional(),reopened:z.boolean().optional(),merchant:z.string().optional(),cadence:z.enum(['weekly','monthly','annual']).optional(),recurrenceState:z.enum(['candidate','observed','user_confirmed']).optional(),responses:z.array(FindingAnswerSchema),
});
export const FindingResponseSchema = z.object({expectedVersion:z.number().int().nonnegative(),evidenceVersion:z.string().min(1),response:FindingAnswerSchema,category:FindingCategorySchema.optional(),economicType:FindingEconomicTypeSchema.optional(),applyMerchantPreference:z.boolean().optional()}).strict();
export const FindingsPacketSchema=z.object({version:z.number().int().nonnegative(),policyVersion:z.string(),findings:z.array(FindingSchema).max(5),unresolvedCount:z.number().int().nonnegative(), informational:z.array(FindingSchema).default([]),reviewed:z.array(FindingSchema).default([]),progress:z.object({batchId:z.string(),total:z.number().int(),resolved:z.number().int(),deferred:z.number().int(),remaining:z.number().int()}).nullable().default(null)});
export type Finding=z.infer<typeof FindingSchema>;
export type FindingResponse=z.infer<typeof FindingResponseSchema>;
export type FindingsPacket=z.infer<typeof FindingsPacketSchema>;
