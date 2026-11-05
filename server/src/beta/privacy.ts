import { BetaError } from "./financial";
export const realDataReleaseGate = {
  financialActionsEnabled: false,
  reason:
    "Financial recommendation policies are pending release approval for real-data accounts.",
} as const;
export function requireFinancialRelease() {
  throw new BetaError("RELEASE_GATE", realDataReleaseGate.reason, 403);
}
