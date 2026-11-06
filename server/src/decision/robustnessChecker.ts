import {
PrototypePolicyBundle,
RobustnessResult,
RobustnessResultSchema,
ScoredCandidate,
WeightSelectionResult,
} from '@shared/contracts';
import { ScoringEngine } from './scoringEngine';

/**
 * Deterministic Mulberry32 PRNG for reproducible F018 robustness simulations.
 */
function createMulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return function (): number {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Evaluates liquidity/reserve drawdown risk tier for close-decision tie-breaking.
 * Tier 0: preserves or increases emergency reserve (deltaResilienceMonths >= 0)
 * Tier 1: reduces emergency reserve (deltaResilienceMonths < 0)
 */
function getCandidateRiskTier(candidate: ScoredCandidate): number {
  return candidate.impact.rawImpacts.deltaResilienceMonths < 0 ? 1 : 0;
}

export class RobustnessEngine {
  /**
   * F018: Sensitivity winner frequency (Sole Owner per FORMULA_OWNERSHIP_MAP)
   * p_win(i) = count(i is argmax S under sampled parameters) / N
   */
  static computeSensitivityWinnerFrequency(
    winningScenarios: number,
    simulationCount: number
  ): number {
    if (!(simulationCount > 0)) return 0;
    return Number(Math.max(0, Math.min(1, winningScenarios / simulationCount)).toFixed(4));
  }

  /**
   * Step 5E: Evaluates robustness across 200 reproducible weight perturbations (±10%),
   * computes lambda_C sensitivity across [0, 0.05, 0.10, 0.15], applies close-decision
   * tie-breaking (Delta S < 0.03) without double-penalizing complexity, and diagnoses
   * instability causes without equating low stability to NEEDS_DATA.
   */
  static evaluateRobustness(params: {
    scoredCandidates: ScoredCandidate[];
    weightSelection?: WeightSelectionResult;
    weights?: { R: number; F: number; G: number };
    policy: PrototypePolicyBundle;
    hasMissingPiData?: boolean;
    hasUnstableAssumptions?: boolean;
  }): RobustnessResult {
    const {
      scoredCandidates,
      policy,
      hasMissingPiData = false,
      hasUnstableAssumptions = false,
    } = params;
    const robPolicy = policy.robustnessPolicy;
    const baseWeights =
      params.weightSelection?.weights ??
      params.weights ??
      policy.weightPolicy.profiles.balanced;
    const lambda_C = policy.scoringPolicy.lambda_C;

    if (scoredCandidates.length === 0) {
      return RobustnessResultSchema.parse({
        topCandidateId: 'NONE',
        runnerUpCandidateId: null,
        baseScore: 0,
        runnerUpScore: null,
        scoreMargin: 0,
        isCloseDecision: false,
        stability: 0,
        winningScenarios: 0,
        simulationCount: robPolicy.simulationCount,
        simulationSeed: robPolicy.simulationSeed,
        perturbationFraction: robPolicy.weightPerturbationFraction,
        meetsStabilityThreshold: false,
        lambdaSensitivity: [],
        tieBreakerApplied: false,
        tieBreakerReason: null,
        instabilityReason: hasMissingPiData ? 'MISSING_PI_DATA' : 'NONE',
        policyVersion: robPolicy.version,
        formulaRef: 'F018',
      });
    }

    // Sort candidates by base F017 finalScore descending
    const sortedByScore = [...scoredCandidates].sort((a, b) => b.finalScore - a.finalScore);
    const initialTop = sortedByScore[0];
    const initialRunnerUp = sortedByScore.length > 1 ? sortedByScore[1] : null;

    const rawMargin =
      initialRunnerUp !== null
        ? Number(Math.max(0, initialTop.finalScore - initialRunnerUp.finalScore).toFixed(6))
        : Number(Math.abs(initialTop.finalScore).toFixed(6));

    const closeThreshold = robPolicy.closeScoreMarginThreshold;
    const isCloseDecision = initialRunnerUp !== null && rawMargin < closeThreshold;

    // Close-decision tie-breaker (Delta S < 0.03):
    // Prefer lower uncertainty (hasUnknownComponents / uncertaintyScore) and lower risk first,
    // then lower complexity c_C(a) — NEVER subtracting lambda_C * c_C(a) a second time!
    let selectedTop = initialTop;
    let selectedRunnerUp = initialRunnerUp;
    let tieBreakerApplied = false;
    let tieBreakerReason: string | null = null;

    if (isCloseDecision && initialRunnerUp !== null) {
      tieBreakerApplied = true;
      const closeContenders = sortedByScore.filter(
        (c) => initialTop.finalScore - c.finalScore < closeThreshold
      );

      closeContenders.sort((a, b) => {
        // 1. Prefer candidate without unknown complexity components
        if (a.complexity.hasUnknownComponents !== b.complexity.hasUnknownComponents) {
          return a.complexity.hasUnknownComponents ? 1 : -1;
        }
        // 2. Prefer lower uncertaintyScore
        if (Math.abs(a.complexity.uncertaintyScore - b.complexity.uncertaintyScore) > 1e-6) {
          return a.complexity.uncertaintyScore - b.complexity.uncertaintyScore;
        }
        // 3. Prefer lower financial/liquidity risk tier
        const riskA = getCandidateRiskTier(a);
        const riskB = getCandidateRiskTier(b);
        if (riskA !== riskB) {
          return riskA - riskB;
        }
        // 4. Prefer lower complexity c_C(a) directly (without double-subtracting lambda_C*c_C)
        if (Math.abs(a.complexity.computedComplexity - b.complexity.computedComplexity) > 1e-6) {
          return a.complexity.computedComplexity - b.complexity.computedComplexity;
        }
        // 5. Fallback to higher base score, then actionId
        if (Math.abs(b.finalScore - a.finalScore) > 1e-9) {
          return b.finalScore - a.finalScore;
        }
        return a.candidate.actionId.localeCompare(b.candidate.actionId);
      });

      selectedTop = closeContenders[0];
      const remaining = sortedByScore.filter(
        (c) => c.candidate.candidateId !== selectedTop.candidate.candidateId
      );
      selectedRunnerUp = remaining[0] ?? null;

      tieBreakerReason =
        `Close decision (Delta S = ${rawMargin.toFixed(4)} < ${closeThreshold}): selected ${selectedTop.candidate.actionId} (${selectedTop.candidate.candidateId}) ` +
        `by tie-breaker [uncertainty=${selectedTop.complexity.uncertaintyScore.toFixed(2)}, riskTier=${getCandidateRiskTier(selectedTop)}, c_C=${selectedTop.complexity.computedComplexity.toFixed(4)}] without double-penalizing lambda_C.`;
    }

    // 200 reproducible simulations perturbing (w_R, w_F, w_G) within +-10% around Step 5B profile
    const simCount = robPolicy.simulationCount;
    const simSeed = robPolicy.simulationSeed;
    const eps = robPolicy.weightPerturbationFraction;
    const rand = createMulberry32(simSeed);

    const winCounts: Record<string, number> = {};
    for (const c of scoredCandidates) {
      winCounts[c.candidate.candidateId] = 0;
    }

    for (let i = 0; i < simCount; i++) {
      const dR = (2 * rand() - 1) * eps;
      const dF = (2 * rand() - 1) * eps;
      const dG = (2 * rand() - 1) * eps;

      const rawR = Math.max(0, baseWeights.R * (1 + dR));
      const rawF = Math.max(0, baseWeights.F * (1 + dF));
      const rawG = Math.max(0, baseWeights.G * (1 + dG));
      const sumW = rawR + rawF + rawG;

      const wSim =
        sumW > 0
          ? { R: rawR / sumW, F: rawF / sumW, G: rawG / sumW }
          : { R: 1 / 3, F: 1 / 3, G: 1 / 3 };

      let bestCand = scoredCandidates[0];
      let bestSimScore = -Infinity;

      for (const cand of scoredCandidates) {
        const s = ScoringEngine.computeFinAgentScore({
          weights: wSim,
          values: cand.impact.normalizedValues,
          complexity: cand.complexity.computedComplexity,
          lambda_C,
        }).finalScore;

        if (s > bestSimScore + 1e-9) {
          bestSimScore = s;
          bestCand = cand;
        } else if (Math.abs(s - bestSimScore) <= 1e-9) {
          // Deterministic tie-breaking inside simulation matching tie-breaker order
          if (cand.complexity.uncertaintyScore < bestCand.complexity.uncertaintyScore - 1e-6) {
            bestCand = cand;
          } else if (
            Math.abs(cand.complexity.uncertaintyScore - bestCand.complexity.uncertaintyScore) <=
              1e-6 &&
            cand.complexity.computedComplexity < bestCand.complexity.computedComplexity - 1e-6
          ) {
            bestCand = cand;
          }
        }
      }

      winCounts[bestCand.candidate.candidateId] =
        (winCounts[bestCand.candidate.candidateId] || 0) + 1;
    }

    const winningScenarios = winCounts[selectedTop.candidate.candidateId] ?? 0;
    const stability = this.computeSensitivityWinnerFrequency(winningScenarios, simCount);
    const meetsStabilityThreshold = stability >= robPolicy.stabilityThreshold;

    // Lambda sensitivity across policy.scoringPolicy.sensitivityLambdaCValues ([0, 0.05, 0.10, 0.15])
    const lambdaSensitivity = policy.scoringPolicy.sensitivityLambdaCValues.map((lam) => {
      const rescored = ScoringEngine.scoreCandidates({
        candidates: scoredCandidates.map((sc) => ({
          candidate: sc.candidate,
          impact: sc.impact,
          complexity: sc.complexity,
        })),
        weights: baseWeights,
        policy,
        lambdaOverride: lam,
      });
      const topAtLam = rescored[0];
      return {
        lambda_C: lam,
        winnerCandidateId: topAtLam.candidate.candidateId,
        winnerScore: topAtLam.finalScore,
      };
    });

    // Diagnose instability reason when stability < stabilityThreshold
    let instabilityReason:
      | 'NONE'
      | 'MISSING_PI_DATA'
      | 'UNSTABLE_ASSUMPTIONS'
      | 'CLOSE_VALID_ALTERNATIVES' = 'NONE';

    if (!meetsStabilityThreshold) {
      const anyUnknownComplexity = scoredCandidates.some(
        (c) => c.complexity.hasUnknownComponents || c.complexity.usedCatalogFallback
      );
      if (hasMissingPiData) {
        instabilityReason = 'MISSING_PI_DATA';
      } else if (hasUnstableAssumptions || anyUnknownComplexity) {
        instabilityReason = 'UNSTABLE_ASSUMPTIONS';
      } else if (isCloseDecision && tieBreakerApplied) {
        instabilityReason = 'CLOSE_VALID_ALTERNATIVES';
      } else {
        instabilityReason = 'UNSTABLE_ASSUMPTIONS';
      }
    }

    return RobustnessResultSchema.parse({
      topCandidateId: selectedTop.candidate.candidateId,
      runnerUpCandidateId: selectedRunnerUp ? selectedRunnerUp.candidate.candidateId : null,
      baseScore: selectedTop.finalScore,
      runnerUpScore: selectedRunnerUp ? selectedRunnerUp.finalScore : null,
      scoreMargin: rawMargin,
      isCloseDecision,
      stability,
      winningScenarios,
      simulationCount: simCount,
      simulationSeed: simSeed,
      perturbationFraction: eps,
      meetsStabilityThreshold,
      lambdaSensitivity,
      tieBreakerApplied,
      tieBreakerReason,
      instabilityReason,
      policyVersion: robPolicy.version,
      formulaRef: 'F018',
    });
  }
}
