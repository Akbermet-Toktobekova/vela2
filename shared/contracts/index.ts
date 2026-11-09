import { z } from 'zod';

// ============================================================================
// 1. Data Provenance & Truth Layer Distinction
// ============================================================================
export const TruthLayerEnum = z.enum(['DB_FACT', 'PRODUCT_DECISION', 'PROTOTYPE_ONLY']);
export type TruthLayer = z.infer<typeof TruthLayerEnum>;

export const CriterionEnum = z.enum(['R', 'F', 'G']);
export type Criterion = z.infer<typeof CriterionEnum>;

export const ComplexityComponentEnum = z.enum(['T', 'S', 'D', 'O']);
export type ComplexityComponent = z.infer<typeof ComplexityComponentEnum>;

export const ActionTypeEnum = z.enum([
  'FINANCIAL_ACTION',
  'VERIFICATION_ACTION',
  'EDUCATIONAL_ACTION',
]);
export type ActionType = z.infer<typeof ActionTypeEnum>;

export const WeightProfileIdEnum = z.enum([
  'liquidity_protection',
  'expensive_debt',
  'goal_advancement',
  'balanced',
]);
export type WeightProfileId = z.infer<typeof WeightProfileIdEnum>;

// ============================================================================
// 2. Centralized Prototype Policy Configuration Schema (PROTOTYPE_ONLY)
// ============================================================================
export const PrototypePolicyBundleSchema = z.object({
  policyMeta: z.object({
    policyBundleVersion: z.string(),
    status: z.literal('PROTOTYPE_ONLY'),
    empiricallyValidated: z.literal(false),
    evidenceGapRefs: z.array(z.string()),
    notice: z.string(),
  }),
  runtimeMode: z.object({
    mode: z.enum(['PROTOTYPE_MODE', 'PRODUCTION_MODE']),
    allowPendingReviewActionsInPrototype: z.boolean(),
    requireApprovedForProductionInLive: z.boolean(),
  }),
  horizonAndFreshness: z.object({
    simulationHorizonDays: z.number().int().positive(),
    debtExplanationHorizonMonths: z.number().int().positive(),
    staleBalanceThresholdDays: z.number().positive(),
    statementClosingStaleThresholdDays: z.number().positive(),
    fxRateStaleThresholdHours: z.number().positive(),
    imminentObligationWindowDays: z.number().int().positive(),
    declinedActionCooldownDays: z.number().int().nonnegative(),
  }),
  weightPolicy: z.object({
    version: z.string(),
    status: z.literal('PROTOTYPE_ONLY'),
    hysteresis: z.object({
      liquidityEnterBelowMonths: z.number().positive(),
      liquidityExitAtOrAboveMonths: z.number().positive(),
    }),
    expensiveDebtThresholdApr: z.number().positive(),
    requireActiveInterestAccrualOrImminentPromoExpiry: z.boolean(),
    priorityOrder: z.array(WeightProfileIdEnum),
    profiles: z.object({
      liquidity_protection: z.object({
        R: z.number().min(0).max(1),
        F: z.number().min(0).max(1),
        G: z.number().min(0).max(1),
      }),
      expensive_debt: z.object({
        R: z.number().min(0).max(1),
        F: z.number().min(0).max(1),
        G: z.number().min(0).max(1),
      }),
      goal_advancement: z.object({
        R: z.number().min(0).max(1),
        F: z.number().min(0).max(1),
        G: z.number().min(0).max(1),
      }),
      balanced: z.object({
        R: z.number().min(0).max(1),
        F: z.number().min(0).max(1),
        G: z.number().min(0).max(1),
      }),
    }),
  }),
  normalizationPolicy: z.object({
    version: z.string(),
    status: z.literal('PROTOTYPE_ONLY'),
    K_R_months: z.number().positive(),
    K_F_essentialExpenseFraction: z.number().positive(),
    K_G_goalProgressFraction: z.number().positive(),
    clipMin: z.number(),
    clipMax: z.number(),
    allowArbitraryKFMinFallback: z.literal(false),
  }),
  effortRubricPolicy: z.object({
    version: z.string(),
    status: z.literal('PROTOTYPE_ONLY'),
    formulaRef: z.literal('F016'),
    componentWeights: z.object({
      T: z.number().min(0).max(1),
      S: z.number().min(0).max(1),
      D: z.number().min(0).max(1),
      O: z.number().min(0).max(1),
    }),
    catalogBaselineByActionId: z.record(z.string(), z.object({
      T: z.number().min(0).max(1), S: z.number().min(0).max(1),
      D: z.number().min(0).max(1), O: z.number().min(0).max(1),
    })),
    unknownActionBaseline: z.object({
      T: z.number().min(0).max(1), S: z.number().min(0).max(1),
      D: z.number().min(0).max(1), O: z.number().min(0).max(1),
    }),
    uncertainty: z.object({
      evaluated: z.number().min(0).max(1),
      perUnknownComponent: z.number().min(0).max(1),
      unknownBase: z.number().min(0).max(1),
    }),
  }),
  suggestionPolicy: z.object({
    minimumMonetaryAmount: z.number().positive(),
    amountRoundingIncrement: z.number().positive(),
    optionalOutflowFraction: z.number().min(0).max(1),
    goalMonthDays: z.number().positive(),
  }),
  checkerFallbackPolicy: z.object({
    minimumAvailableCash: z.number().nonnegative(),
    minimumAmount: z.number().positive(),
    availableCashFraction: z.number().min(0).max(1),
    amountRoundingIncrement: z.number().positive(),
  }),
  scoringPolicy: z.object({
    version: z.string(),
    status: z.literal('PROTOTYPE_ONLY'),
    formulaRef: z.literal('F017'),
    lambda_C: z.number().min(0).max(1),
    sensitivityLambdaCValues: z.array(z.number().min(0).max(1)),
  }),
  robustnessPolicy: z.object({
    version: z.string(),
    status: z.literal('PROTOTYPE_ONLY'),
    formulaRef: z.literal('F018'),
    simulationCount: z.number().int().positive(),
    simulationSeed: z.number().int(),
    weightPerturbationFraction: z.number().min(0).max(1),
    stabilityThreshold: z.number().min(0).max(1),
    closeScoreMarginThreshold: z.number().min(0),
  }),
});
export type PrototypePolicyBundle = z.infer<typeof PrototypePolicyBundleSchema>;

// ============================================================================
// 3. Canonical AS Database & Approved Action Catalog Schemas (DB_FACT + Extension)
// ============================================================================
export const ASSourceSchema = z.object({
  source_id: z.string(),
  title: z.string(),
  issuer: z.string(),
  source_type: z.string(),
  jurisdiction: z.string(),
  population: z.string(),
  canonical_url: z.string(),
  exact_sections_reviewed: z.string(),
  retrieval_evidence_status: z.string(),
  publication_or_effective_date: z.string(),
  last_reviewed: z.string(),
  limitations: z.string(),
  provenance: z.string(),
  link: z.string().optional(),
});
export type ASSource = z.infer<typeof ASSourceSchema>;

export const ASClaimSchema = z.object({
  claim_id: z.string(),
  domain: z.string(),
  claim: z.string(),
  claim_type: z.string(),
  verification_status: z.enum(['VERIFIED', 'PENDING_ORIGINAL_REOPEN']),
  jurisdiction: z.string(),
  population: z.string(),
  limitations: z.string(),
  source_primary_id: z.string(),
  last_reviewed: z.string(),
  provenance: z.string(),
});
export type ASClaim = z.infer<typeof ASClaimSchema>;

export const ASRuleSchema = z.object({
  rule_id: z.string(),
  name: z.string(),
  rule_text: z.string(),
  supporting_claim_ids: z.string(),
  supporting_formula_ids: z.string(),
  jurisdiction: z.string(),
  approval_status: z.string(),
  safety_review_required: z.string(),
  provenance: z.string(),
});
export type ASRule = z.infer<typeof ASRuleSchema>;

export const ASFormulaSchema = z.object({
  formula_id: z.string(),
  name: z.string(),
  expression: z.string(),
  output_units: z.string(),
  required_inputs: z.string(),
  formula_status: z.string(),
  source_id: z.string(),
  source_url: z.string(),
  assumptions_limits: z.string(),
  test_example: z.string(),
  approval_status: z.string(),
});
export type ASFormula = z.infer<typeof ASFormulaSchema>;

export const CanonicalActionCandidateSchema = z.object({
  action_id: z.string(),
  name: z.string(),
  category: z.string(),
  action_template: z.string(),
  required_pi_inputs: z.string(),
  optional_pi_inputs: z.string(),
  eligibility_conditions: z.string(),
  rejection_conditions: z.string(),
  safety_requirements: z.string(),
  expected_effects: z.string(),
  possible_harms: z.string(),
  applicable_jurisdiction: z.string(),
  calculation_ids: z.string(),
  supporting_rule_ids: z.string(),
  supporting_claim_ids: z.string(),
  source_name: z.string(),
  source_url: z.string(),
  evidence_status: z.string(),
  evidence_limits: z.string(),
  status: z.enum(['RESEARCH_CANDIDATE', 'PENDING_REVIEW', 'APPROVED', 'REJECTED']),
  approved_for_production: z.enum(['YES', 'NO']),
  missing_dependencies: z.string(),
  template_not_instance: z.string(),
});
export type CanonicalActionCandidate = z.infer<typeof CanonicalActionCandidateSchema>;

export const CatalogActionEntrySchema = CanonicalActionCandidateSchema.extend({
  // Extension fields per D-004 / Review Point 2 & 5 (never mutating canonical status/approved_for_production)
  action_type: ActionTypeEnum,
  today_enabled: z.boolean(),
  prototype_enabled: z.boolean(),
  required_inputs_list: z.array(z.string()),
  supporting_rule_ids_list: z.array(z.string()),
  supporting_claim_ids_list: z.array(z.string()),
  calculation_ids_list: z.array(z.string()),
  verification_status: z.enum(['VERIFIED_BACKGROUND', 'PENDING_ORIGINAL_REOPEN']),
  critical_trigger_conditions: z.string().nullable(),
  is_diagnostic_only_critical: z.boolean(),
  unlocks_financial_action_ids: z.array(z.string()),
  baseline_complexity: z.object({
    T: z.number().min(0).max(1),
    S: z.number().min(0).max(1),
    D: z.number().min(0).max(1),
    O: z.number().min(0).max(1),
  }),
  assistant_mapped: z.boolean(),
});
export type CatalogActionEntry = z.infer<typeof CatalogActionEntrySchema>;

// ============================================================================
// 4. Candidate Actions & Checker Contracts (Steps 3 & 4)
// ============================================================================
export const CandidateActionSchema = z.object({
  candidateId: z.string(),
  actionId: z.string(), // A001..A026
  actionType: ActionTypeEnum,
  title: z.string(),
  description: z.string(),
  rationale: z.string(),
  targetId: z.string().nullable(), // debtId, goalId, subscription/confirmationId, accountId
  sourceAccountId: z.string().nullable(),
  destinationAccountId: z.string().nullable(),
  amount: z.number().nullable(),
  currency: z.string(),
  proposedTiming: z.string().nullable(),
  supportingRuleIds: z.array(z.string()),
  supportingClaimIds: z.array(z.string()),
  supportingSourceIds: z.array(z.string()),
  requiredPiInputs: z.array(z.string()),
  origin: z.enum(['AI_SUGGESTION', 'CRITICAL_COVERAGE', 'CATALOG_FALLBACK']),
});
export type CandidateAction = z.infer<typeof CandidateActionSchema>;

export const CheckFailureSchema = z.object({
  layer: z.enum(['CATALOG_ELIGIBILITY', 'DATA_SUFFICIENCY', 'AFFORDABILITY', 'SAFETY_POLICY']),
  code: z.string(),
  detail: z.string(),
  ruleId: z.string().optional(),
});
export type CheckFailure = z.infer<typeof CheckFailureSchema>;

export const ValidationResultSchema = z.object({
  candidate: CandidateActionSchema,
  status: z.enum(['VALID', 'REJECTED', 'NEEDS_DATA']),
  isCritical: z.boolean(),
  criticalPriorityRank: z.number().int().nullable(), // 1 = highest urgency critical mitigation
  resolvesCriticalProblemDirectly: z.boolean(),
  failedChecks: z.array(CheckFailureSchema),
  missingFields: z.array(z.string()),
  inputEvidence: z.array(z.object({
    field: z.string(), status: z.enum(['MISSING', 'STALE', 'INVALID', 'VERIFIED']),
  })).optional(),
  projectedMinCashAfterAction: z.number().nullable(),
  unlocksActionIds: z.array(z.string()),
});
export type ValidationResult = z.infer<typeof ValidationResultSchema>;

// ============================================================================
// 5. Step 5C: AI Evaluation Call (T, S, D, O Complexity) & Impact Simulator
// ============================================================================
export const ComplexityFactorScoreSchema = z.object({
  score: z.number().min(0).max(1).nullable(),
  status: z.enum(['EVALUATED', 'UNKNOWN']),
  rationale: z.string(),
  supportingFacts: z.array(z.string()),
  missingInfo: z.array(z.string()),
});
export type ComplexityFactorScore = z.infer<typeof ComplexityFactorScoreSchema>;

export const CandidateComplexityEvaluationSchema = z.object({
  candidateId: z.string(),
  actionId: z.string(),
  T: ComplexityFactorScoreSchema,
  S: ComplexityFactorScoreSchema,
  D: ComplexityFactorScoreSchema,
  O: ComplexityFactorScoreSchema,
  computedComplexity: z.number().min(0).max(1), // 0.25*T + 0.25*S + 0.25*D + 0.25*O
  usedCatalogFallback: z.boolean(),
  hasUnknownComponents: z.boolean(),
  uncertaintyScore: z.number().min(0).max(1),
  policyVersion: z.string(),
  formulaRef: z.literal('F016'),
});
export type CandidateComplexityEvaluation = z.infer<typeof CandidateComplexityEvaluationSchema>;

export const ImpactSimulationResultSchema = z.object({
  scenarioMetadata: z.object({
    referenceDate: z.string(), actionDate: z.string(), currency: z.string(),
    policyVersion: z.string(), inputSnapshotId: z.string(),
    terminalDate: z.string(), cashUnit: z.literal('currency'), resilienceUnit: z.literal('months'),
    goalUnit: z.literal('fraction'), assumptions: z.array(z.string()),
  }).optional(),
  candidateId: z.string(),
  actionId: z.string(),
  horizonDays: z.number().int().positive(),
  status: z.enum(['COMPUTED', 'NEEDS_DATA', 'NOT_APPLICABLE_NON_FINANCIAL']),
  missingInputs: z.array(z.string()),
  rawImpacts: z.object({
    beforeTerminalLiquidCash: z.number().optional(),
    afterTerminalLiquidCash: z.number().optional(),
    beforeTerminalDate: z.string().optional(),
    afterTerminalDate: z.string().optional(),
    deltaResilienceMonths: z.number(), // F014
    deltaFinancialBenefitCurrency: z.number(), // F008 / F010 / F011(90d) / F020
    deltaGoalProgressFraction: z.number(), // F015
    beforeResilienceMonths: z.number(),
    afterResilienceMonths: z.number(),
    beforeCost90d: z.number(),
    afterCost90d: z.number(),
    beforeGoalProgress: z.number(),
    afterGoalProgress: z.number(),
    annualizedRecurringSaving12m: z.number().nullable(), // F011 12-month explanation metric
    debt12mCounterfactualInterestAvoided: z.number().nullable(), // 12-month explanation metric
  }),
  referenceScales: z.object({
    K_R: z.number(),
    K_F: z.number().nullable(),
    K_G: z.number(),
  }),
  normalizedValues: z.object({
    v_R: z.number().min(-1).max(1),
    v_F: z.number().min(-1).max(1),
    v_G: z.number().min(-1).max(1),
  }),
  saturationFlags: z.object({
    R_clipped: z.boolean(),
    F_clipped: z.boolean(),
    G_clipped: z.boolean(),
  }),
  doubleCountingCheckPassed: z.boolean(),
  normalizationPolicyVersion: z.string(),
});
export type ImpactSimulationResult = z.infer<typeof ImpactSimulationResultSchema>;

// ============================================================================
// 6. Step 5B, 5D, 5E: Weights, Scoring (F017), Robustness (F018) & Decision
// ============================================================================
export const WeightSelectionResultSchema = z.object({
  profileId: WeightProfileIdEnum,
  previousProfileId: WeightProfileIdEnum.nullable(),
  hysteresisApplied: z.boolean(),
  weights: z.object({
    R: z.number().min(0).max(1),
    F: z.number().min(0).max(1),
    G: z.number().min(0).max(1),
  }),
  triggerReason: z.string(),
  policyVersion: z.string(),
});
export type WeightSelectionResult = z.infer<typeof WeightSelectionResultSchema>;

export const ScoredCandidateSchema = z.object({
  candidate: CandidateActionSchema,
  impact: ImpactSimulationResultSchema,
  complexity: CandidateComplexityEvaluationSchema,
  weightedBenefit: z.number(),
  complexityPenalty: z.number(),
  finalScore: z.number(), // F017
  scoreBreakdown: z.object({
    wR_vR: z.number(),
    wF_vF: z.number(),
    wG_vG: z.number(),
    lambdaC_cC: z.number(),
  }),
  rank: z.number().int().positive(),
});
export type ScoredCandidate = z.infer<typeof ScoredCandidateSchema>;

export const RobustnessResultSchema = z.object({
  topCandidateId: z.string(),
  runnerUpCandidateId: z.string().nullable(),
  baseScore: z.number(),
  runnerUpScore: z.number().nullable(),
  scoreMargin: z.number(), // Delta S
  isCloseDecision: z.boolean(), // Delta S < 0.03
  stability: z.number().min(0).max(1), // F018
  winningScenarios: z.number().int().nonnegative(),
  simulationCount: z.number().int().positive(),
  simulationSeed: z.number().int(),
  perturbationFraction: z.number(),
  meetsStabilityThreshold: z.boolean(),
  lambdaSensitivity: z.array(
    z.object({
      lambda_C: z.number(),
      winnerCandidateId: z.string(),
      winnerScore: z.number(),
    })
  ),
  tieBreakerApplied: z.boolean(),
  tieBreakerReason: z.string().nullable(),
  instabilityReason: z
    .enum(['NONE', 'MISSING_PI_DATA', 'UNSTABLE_ASSUMPTIONS', 'CLOSE_VALID_ALTERNATIVES'])
    .nullable(),
  policyVersion: z.string(),
  formulaRef: z.literal('F018'),
});
export type RobustnessResult = z.infer<typeof RobustnessResultSchema>;

export const DecisionStatusEnum = z.enum([
  'RECOMMENDATION_READY',
  'NEEDS_DATA',
  'NO_RECOMMENDATION',
]);
export type DecisionStatus = z.infer<typeof DecisionStatusEnum>;

export const SourceAdviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  rationale: z.string(),
  sources: z.array(z.object({
    claimId: z.string(),
    sourceId: z.string(),
    title: z.string(),
    url: z.string().url(),
  })),
});
export type SourceAdvice = z.infer<typeof SourceAdviceSchema>;

export const PrimarySuggestionTraceSchema = z.object({
  proposals: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    rationale: z.string(),
    actionId: z.string().nullable(),
    intent: z.enum(['EXECUTE', 'REVIEW', 'CLARIFY']).optional(),
    origin: z.enum(['MODEL', 'SYSTEM_CLARIFICATION', 'SYSTEM_UNAVAILABLE']).optional(),
    targetFactId: z.string().optional(),
    mappedCandidateId: z.string().optional(),
    contradictionRefs: z.array(z.string()).optional(),
    usefulness: z.enum(['USEFUL', 'WEAK', 'NOT_ELIGIBLE']).optional(),
    usefulnessReason: z.string().optional(),
    prerequisites: z.array(z.string()).optional(),
    missingInfo: z.array(z.string()).optional(),
    factIds: z.array(z.string()),
    claimIds: z.array(z.string()),
    status: z.enum(['VALID', 'REJECTED', 'NEEDS_DATA']),
    reason: z.string(),
    evidence: z.array(z.object({
      claimId: z.string(),
      sourceId: z.string(),
      text: z.string(),
      jurisdiction: z.string(),
      population: z.string(),
      limitations: z.string(),
    })),
  })),
  shortfallReason: z.string().optional(),
  fallbackReason: z.enum(['GENERATION_UNAVAILABLE', 'NO_PROPOSALS', 'NO_VALID_PRIMARY', 'ALL_PRIMARY_REJECTED', 'NO_USEFUL_PRIMARY']).nullable(),
  criticalCoverageAddedIds: z.array(z.string()),
});

export const DecisionTraceSchema = z.object({
  evaluationId: z.string(),
  userId: z.string(),
  snapshotId: z.string(),
  snapshotVersion: z.string(),
  createdAt: z.string(),
  runtimeMode: z.enum(['PROTOTYPE_MODE', 'PRODUCTION_MODE']),
  policyBundleVersion: z.string(),
  priorityClass: z.enum(['CRITICAL', 'NORMAL', 'VERIFICATION_UNLOCK', 'NONE']),
  weightSelection: WeightSelectionResultSchema.nullable(),
  validatedCandidates: z.array(ValidationResultSchema),
  scoredCandidates: z.array(ScoredCandidateSchema),
  robustness: RobustnessResultSchema.nullable(),
  selectedCandidate: CandidateActionSchema.nullable(),
  sourceAdvice: SourceAdviceSchema.optional(),
  stageArtifactIds: z.array(z.string()).optional(),
  primarySuggestions: PrimarySuggestionTraceSchema.optional(),
  selectedActionType: ActionTypeEnum.nullable(),
  decisionStatus: DecisionStatusEnum,
  decisionReason: z.string(),
  supportingSourceIds: z.array(z.string()),
  supportingRuleIds: z.array(z.string()),
  supportingClaimIds: z.array(z.string()),
  missingDataFields: z.array(z.string()),
  clarificationQuestion: z.string().nullable(),
});
export type DecisionTrace = z.infer<typeof DecisionTraceSchema>;

export const RecommendationDecisionSchema = z.object({
  evaluationId: z.string(),
  snapshotId: z.string(),
  snapshotVersion: z.string(),
  decisionStatus: DecisionStatusEnum,
  priorityClass: z.enum(['CRITICAL', 'NORMAL', 'VERIFICATION_UNLOCK', 'NONE']),
  selectedActionId: z.string().nullable(),
  selectedActionType: ActionTypeEnum.nullable(),
  candidate: CandidateActionSchema.nullable(),
  sourceAdvice: SourceAdviceSchema.optional(),
  title: z.string(),
  description: z.string(),
  reasoning: z.string(),
  expectedEffectSummary: z.string(),
  weightProfileId: WeightProfileIdEnum.nullable(),
  weights: z
    .object({
      resilience: z.number(),
      financial_benefit: z.number(),
      goal_progress: z.number(),
    })
    .nullable(),
  values: z
    .object({
      resilience: z.number(),
      financial_benefit: z.number(),
      goal_progress: z.number(),
    })
    .nullable(),
  rawImpacts: z
    .object({
      resilienceMonths: z.number(),
      financialBenefitCurrency: z.number(),
      goalProgressPctPoints: z.number(),
      annualizedSaving12m: z.number().nullable(),
      debt12mInterestAvoided: z.number().nullable(),
    })
    .nullable(),
  complexity: z.number().nullable(),
  score: z.number().nullable(),
  stability: z.number().nullable(),
  policyVersion: z.string(),
  sourceIds: z.array(z.string()),
  ruleIds: z.array(z.string()),
  claimIds: z.array(z.string()),
  dataQualityStatus: z.enum(['PROTOTYPE_POLICY', 'NEEDS_DATA', 'FX_WARNING']),
  clarificationQuestion: z.string().nullable(),
  missingFields: z.array(z.string()),
  clarificationRoute: z.literal('accounts').optional(),
  trace: DecisionTraceSchema,
});
export type RecommendationDecision = z.infer<typeof RecommendationDecisionSchema>;
