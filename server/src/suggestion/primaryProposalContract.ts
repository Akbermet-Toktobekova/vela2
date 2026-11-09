import { z } from 'zod';

const nonblank = z.string().trim().min(1);
const list = z.array(nonblank);
export const primaryProposalSchema = z.object({
  title: nonblank.max(180),
  description: nonblank.max(900),
  rationale: nonblank.max(600),
  intent: z.enum(['EXECUTE', 'REVIEW', 'CLARIFY']),
  targetFactId: nonblank,
  factIds: list.min(1),
  claimIds: list,
  prerequisites: list,
  missingInfo: list,
  nextStep: z.string().trim().max(180).optional(),
  operation: z.enum(['ALLOCATE_TO_GOAL', 'PAY_EXTRA_DEBT']).optional(),
}).strict();

export const primaryOutputSchema = z.object({
  proposals: z.array(primaryProposalSchema).length(3),
  shortfallReason: z.string(),
}).strict();

// The provider supports a subset of JSON Schema. Runtime Zod validation also checks text bounds.
const proposalFields = Object.entries(primaryProposalSchema.shape);
const proposalProperties = Object.fromEntries(proposalFields.map(([key, field]) => [
  key,
  field instanceof z.ZodArray ? { type: 'array', items: { type: 'string' } }
    : field instanceof z.ZodOptional && field.unwrap() instanceof z.ZodEnum
      ? { type: 'string', enum: (field.unwrap() as z.ZodEnum<[string, ...string[]]>).options }
      : { type: 'string' },
]));
export const primaryResponseJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: Object.keys(primaryOutputSchema.shape),
  properties: {
    proposals: {
      type: 'array', minItems: 3, maxItems: 3,
      items: {
        type: 'object', additionalProperties: false,
        required: proposalFields.filter(([, field]) => !field.isOptional()).map(([key]) => key), properties: proposalProperties,
      },
    },
    shortfallReason: { type: 'string' },
  },
};
