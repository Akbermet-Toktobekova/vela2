import {
  CandidateAction,
  CandidateComplexityEvaluation,
  CandidateComplexityEvaluationSchema,
  CatalogActionEntry,
  ComplexityComponent,
  ComplexityFactorScore,
  PrototypePolicyBundle,
} from '@shared/contracts';
import { ASCatalogRepository } from '../catalog/asCatalogRepository';

const COMPLEXITY_COMPONENTS: ComplexityComponent[] = ['T', 'S', 'D', 'O'];

export class ComplexityEvaluator {
  /**
   * F016: Effort feature / user burden model (Sole Owner per FORMULA_OWNERSHIP_MAP)
   * c_C(a) = w_T*T + w_S*S + w_D*D + w_O*O (effort_rubric_v1_prototype)
   */
  static computeEffortFeature(
    scores: Record<ComplexityComponent, number>,
    weights: Record<ComplexityComponent, number>
  ): number {
    const raw =
      weights.T * scores.T +
      weights.S * scores.S +
      weights.D * scores.D +
      weights.O * scores.O;
    return Number(Math.max(0, Math.min(1, raw)).toFixed(4));
  }

  /**
   * Step 5C: Computes c_C(a) from AI Evaluation Call factor scores (T, S, D, O)
   * with deterministic catalog fallback when any component is missing, invalid, or UNKNOWN.
   */
  static computeComplexityFromFactors(params: {
    candidate: CandidateAction;
    aiFactors?: Partial<Record<ComplexityComponent, ComplexityFactorScore>> | null;
    policy: PrototypePolicyBundle;
    catalogEntry?: CatalogActionEntry;
  }): CandidateComplexityEvaluation {
    const { candidate, aiFactors, policy } = params;
    const rubricPolicy = policy.effortRubricPolicy;
    const weights = rubricPolicy.componentWeights;

    const catalogEntry =
      params.catalogEntry || ASCatalogRepository.getActionById(candidate.actionId);
    const baseline = policy.effortRubricPolicy.catalogBaselineByActionId[candidate.actionId]
      ?? catalogEntry?.baseline_complexity
      ?? policy.effortRubricPolicy.unknownActionBaseline;

    const resolvedFactors: Record<ComplexityComponent, ComplexityFactorScore> = {
      T: { score: baseline.T, status: 'UNKNOWN', rationale: '', supportingFacts: [], missingInfo: [] },
      S: { score: baseline.S, status: 'UNKNOWN', rationale: '', supportingFacts: [], missingInfo: [] },
      D: { score: baseline.D, status: 'UNKNOWN', rationale: '', supportingFacts: [], missingInfo: [] },
      O: { score: baseline.O, status: 'UNKNOWN', rationale: '', supportingFacts: [], missingInfo: [] },
    };

    const numericScores: Record<ComplexityComponent, number> = {
      T: baseline.T,
      S: baseline.S,
      D: baseline.D,
      O: baseline.O,
    };

    let usedCatalogFallback = false;
    let hasUnknownComponents = false;
    let unknownCount = 0;

    for (const comp of COMPLEXITY_COMPONENTS) {
      const rawFactor = aiFactors?.[comp];
      const isValidEvaluated =
        rawFactor !== undefined &&
        rawFactor !== null &&
        rawFactor.status === 'EVALUATED' &&
        typeof rawFactor.score === 'number' &&
        !Number.isNaN(rawFactor.score) &&
        rawFactor.score >= 0 &&
        rawFactor.score <= 1;

      if (isValidEvaluated && rawFactor && rawFactor.score !== null) {
        const cleanScore = Number(rawFactor.score.toFixed(4));
        numericScores[comp] = cleanScore;
        resolvedFactors[comp] = {
          score: cleanScore,
          status: 'EVALUATED',
          rationale: rawFactor.rationale || `Evaluated ${comp} component from PI and AS context.`,
          supportingFacts: rawFactor.supportingFacts || [],
          missingInfo: rawFactor.missingInfo || [],
        };
      } else {
        usedCatalogFallback = true;
        hasUnknownComponents = true;
        unknownCount += 1;
        const fallbackScore = Number(baseline[comp].toFixed(4));
        numericScores[comp] = fallbackScore;
        resolvedFactors[comp] = {
          score: fallbackScore,
          status: 'UNKNOWN',
          rationale:
            rawFactor?.rationale ||
            `Catalog baseline complexity (${fallbackScore}) applied because component ${comp} was UNKNOWN or missing.`,
          supportingFacts:
            rawFactor?.supportingFacts && rawFactor.supportingFacts.length > 0
              ? rawFactor.supportingFacts
              : [`catalog_baseline_${candidate.actionId}_${comp}=${fallbackScore}`],
          missingInfo:
            rawFactor?.missingInfo && rawFactor.missingInfo.length > 0
              ? rawFactor.missingInfo
              : [`complexity_component_${comp}`],
        };
      }
    }

    const computedComplexity = this.computeEffortFeature(numericScores, weights);
    const uncertaintyScore =
      unknownCount === 0
        ? rubricPolicy.uncertainty.evaluated
        : Number(Math.min(1, rubricPolicy.uncertainty.perUnknownComponent * unknownCount + rubricPolicy.uncertainty.unknownBase).toFixed(4));

    return CandidateComplexityEvaluationSchema.parse({
      candidateId: candidate.candidateId,
      actionId: candidate.actionId,
      T: resolvedFactors.T,
      S: resolvedFactors.S,
      D: resolvedFactors.D,
      O: resolvedFactors.O,
      computedComplexity,
      usedCatalogFallback,
      hasUnknownComponents,
      uncertaintyScore,
      policyVersion: rubricPolicy.version,
      formulaRef: 'F016',
    });
  }
}
