import {
CandidateAction,
CandidateComplexityEvaluation,
ImpactSimulationResult,
PrototypePolicyBundle,
ScoredCandidate,
ScoredCandidateSchema,
WeightSelectionResult,
} from '@shared/contracts';

export interface CandidateScoringInputItem {
  candidate: CandidateAction;
  impact: ImpactSimulationResult;
  complexity: CandidateComplexityEvaluation;
}

export class ScoringEngine {
  /**
   * F017: FinAgent multi-criteria score (Sole Owner per FORMULA_OWNERSHIP_MAP)
   * S(a) = w_R*v_R(a) + w_F*v_F(a) + w_G*v_G(a) - lambda_C*c_C(a)
   */
  static computeFinAgentScore(params: {
    weights: { R: number; F: number; G: number };
    values: { v_R: number; v_F: number; v_G: number };
    complexity: number;
    lambda_C: number;
  }): {
    weightedBenefit: number;
    complexityPenalty: number;
    finalScore: number;
    scoreBreakdown: {
      wR_vR: number;
      wF_vF: number;
      wG_vG: number;
      lambdaC_cC: number;
    };
  } {
    const { weights, values, complexity, lambda_C } = params;
    const wR_vR = Number((weights.R * values.v_R).toFixed(6));
    const wF_vF = Number((weights.F * values.v_F).toFixed(6));
    const wG_vG = Number((weights.G * values.v_G).toFixed(6));
    const lambdaC_cC = Number((lambda_C * complexity).toFixed(6));

    const weightedBenefit = Number((wR_vR + wF_vF + wG_vG).toFixed(6));
    const complexityPenalty = lambdaC_cC;
    const finalScore = Number((weightedBenefit - complexityPenalty).toFixed(6));

    return {
      weightedBenefit,
      complexityPenalty,
      finalScore,
      scoreBreakdown: {
        wR_vR,
        wF_vF,
        wG_vG,
        lambdaC_cC,
      },
    };
  }

  /**
   * Step 5D: Scores and ranks all computed FINANCIAL_ACTION candidates using F017.
   * Reads lambda_C from PrototypePolicyBundle unless overridden for sensitivity analysis.
   */
  static scoreCandidates(params: {
    candidates: CandidateScoringInputItem[];
    weights?: { R: number; F: number; G: number };
    weightSelection?: WeightSelectionResult;
    policy: PrototypePolicyBundle;
    lambdaOverride?: number;
  }): ScoredCandidate[] {
    const { candidates, policy, lambdaOverride } = params;
    const weights =
      params.weights ??
      params.weightSelection?.weights ??
      policy.weightPolicy.profiles.balanced;
    const lambda_C = lambdaOverride ?? policy.scoringPolicy.lambda_C;

    const preliminary = candidates.filter(item => item.impact.status === 'COMPUTED' && item.candidate.actionType === 'FINANCIAL_ACTION').map((item) => {
      const calc = this.computeFinAgentScore({
        weights,
        values: item.impact.normalizedValues,
        complexity: item.complexity.computedComplexity,
        lambda_C,
      });

      return {
        candidate: item.candidate,
        impact: item.impact,
        complexity: item.complexity,
        weightedBenefit: calc.weightedBenefit,
        complexityPenalty: calc.complexityPenalty,
        finalScore: calc.finalScore,
        scoreBreakdown: calc.scoreBreakdown,
        rank: 1,
      };
    });

    preliminary.sort((a, b) => {
      if (Math.abs(b.finalScore - a.finalScore) > 1e-9) {
        return b.finalScore - a.finalScore;
      }
      if (Math.abs(a.complexity.uncertaintyScore - b.complexity.uncertaintyScore) > 1e-9) {
        return a.complexity.uncertaintyScore - b.complexity.uncertaintyScore;
      }
      if (Math.abs(a.complexity.computedComplexity - b.complexity.computedComplexity) > 1e-9) {
        return a.complexity.computedComplexity - b.complexity.computedComplexity;
      }
      return a.candidate.actionId.localeCompare(b.candidate.actionId);
    });

    return preliminary.map((item, idx) =>
      ScoredCandidateSchema.parse({
        ...item,
        rank: idx + 1,
      })
    );
  }
}
