import { z } from 'zod';

export const InterpretationSchema = z.object({
  findings: z.array(z.object({
    evidenceIds: z.array(z.string()).min(1),
    text: z.string(),
    certainty: z.enum(['OBSERVATION', 'HYPOTHESIS']),
  })),
  limitations: z.array(z.string()),
  questions: z.array(z.object({ evidenceIds: z.array(z.string()).min(1), text: z.string() })),
  summaryText: z.string(),
});
export type Interpretation = z.infer<typeof InterpretationSchema>;

export const ModelProvenanceSchema = z.object({
  provider: z.string(),
  modelUsed: z.string(),
  liveCallUsed: z.boolean(),
  fallbackReason: z.string().optional(),
});

export const AnalysisArtifactSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.string(),
  userId: z.string(),
  runId: z.string(),
  stage: z.string(),
  snapshotId: z.string(),
  snapshotVersion: z.string(),
  inputHash: z.string(),
  dependencies: z.record(z.string()),
  referenceDate: z.string(),
  executedAt: z.string(),
  policyVersion: z.string(),
  promptVersion: z.string().optional(),
  status: z.enum(['COMPLETED', 'CACHED', 'PARTIAL', 'FAILED', 'SKIPPED']),
  missingInputs: z.array(z.string()),
  evidenceIds: z.array(z.string()),
  upstreamIds: z.array(z.string()),
  models: z.array(ModelProvenanceSchema),
  summaryText: z.string().optional(),
  output: z.unknown(),
});
export type AnalysisArtifact = z.infer<typeof AnalysisArtifactSchema>;

export const ChatMemorySchema = z.object({
  inputHash: z.string(),
  promptVersion: z.string(),
  status: z.enum(['CURRENT', 'STALE', 'UNAVAILABLE']),
  updatedAt: z.string(),
  entries: z.array(z.object({
    messageIds: z.array(z.string()).min(1),
    kind: z.enum(['STATEMENT', 'PREFERENCE', 'TENTATIVE_PLAN', 'QUESTION']),
    text: z.string(),
  })),
  summaryText: z.string(),
  model: ModelProvenanceSchema.optional(),
});
export type ChatMemory = z.infer<typeof ChatMemorySchema>;
