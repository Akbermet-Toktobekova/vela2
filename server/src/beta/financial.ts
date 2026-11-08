import { randomUUID } from "node:crypto";
import { BetaStateUpdateSchema } from "../../../shared/contracts/beta";
import { buildFinancialSnapshot } from "../../../shared/processing/snapshotBuilder";
import {
createBlankUserSeedData,
PIDatabaseSeed,
} from "../../../shared/profile/seed";
import type { BetaStore } from "./store";
export class BetaError extends Error {
  constructor(
    public code: string,
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export interface BetaState {
  version: number;
  state: PIDatabaseSeed;
  aiConsent: boolean;
  experimentalRecommendations?: boolean;
}
export class BetaFinancial {
  constructor(private store: BetaStore) {}
  get(user: { id: string; name: string; email: string }): BetaState {
    const existing = this.store.get(user.id, "state") as BetaState | null;
    if (existing) {
      const engine = this.store.get(user.id, 'engine') as { feedback?: PIDatabaseSeed['actionFeedback'] } | null;
      return {
        ...existing,
        state: { ...existing.state, actionFeedback: engine?.feedback ?? existing.state.actionFeedback },
        experimentalRecommendations:
          existing.experimentalRecommendations === true,
      };
    }
    const seed = createBlankUserSeedData();
    seed.user.id = user.id;
    seed.user.email = user.email;
    seed.profile.userId = user.id;
    seed.profile.nickname = user.name;
    seed.preferences.userId = user.id;
    seed.onboarding.userId = user.id;
    seed.onboarding.id = randomUUID();
    seed.assistantMessages = [];
    const result = {
      version: 0,
      state: seed,
      aiConsent: false,
      experimentalRecommendations: false,
    };
    this.persist(user.id, result);
    return result;
  }
  persist(userId: string, envelope: BetaState): void {
    const engine = this.store.get(userId, 'engine') as { feedback?: PIDatabaseSeed['actionFeedback'] } | null;
    this.store.put(userId, 'state', engine?.feedback
      ? { ...envelope, state: { ...envelope.state, actionFeedback: [] } }
      : envelope);
  }
  save(
    user: { id: string; name: string; email: string },
    input: unknown,
  ): BetaState {
    const parsed = BetaStateUpdateSchema.parse(input);
    const current = this.get(user);
    if (current.version !== parsed.expectedVersion)
      throw new BetaError(
        "VERSION_CONFLICT",
        "Profile changed on another device. Reload before saving.",
        409,
      );
    const state = parsed.state as unknown as PIDatabaseSeed;
    if (
      state.user.id !== user.id ||
      state.profile.userId !== user.id ||
      state.preferences.userId !== user.id ||
      state.onboarding.userId !== user.id
    )
      throw new BetaError("FORBIDDEN", "Profile ownership mismatch", 403);
    for (const list of [
      state.accounts,
      state.incomes,
      state.obligations,
      state.debts,
      state.goals,
      state.goalAllocations,
      ...(state.expenseCommitment ? [[state.expenseCommitment]] : []),
    ]) {
      const seen = new Set<string>();
      for (const row of list) {
        if (row.userId !== user.id)
          throw new BetaError("FORBIDDEN", "Record ownership mismatch", 403);
        if (seen.has(row.id))
          throw new BetaError("DUPLICATE_ID", "Duplicate record identifier");
        seen.add(row.id);
      }
    }
    const importedAccounts = new Set(
      current.state.statements.map((statement) => statement.accountId),
    );
    for (const accountId of importedAccounts)
      if (!state.accounts.some((a) => a.id === accountId))
        throw new BetaError(
          "ACCOUNT_HAS_IMPORTS",
          "Delete the account statements before removing this account.",
        );
    const serverBalances = current.state.balances.filter(
      (balance) => balance.sourceType === "statement_closing",
    );
    state.balances = [
      ...state.balances.filter(
        (balance) => balance.sourceType !== "statement_closing",
      ),
      ...serverBalances,
    ];
    const balanceIds = new Set<string>();
    for (const balance of state.balances) {
      if (balanceIds.has(balance.id))
        throw new BetaError("DUPLICATE_ID", "Duplicate balance identifier");
      balanceIds.add(balance.id);
    }
    const accounts = new Map(state.accounts.map((a) => [a.id, a]));
    for (const row of state.balances)
      if (
        !accounts.has(row.accountId) ||
        accounts.get(row.accountId)!.currency !== row.currency
      )
        throw new BetaError(
          "INVALID_ACCOUNT",
          "Balance account or currency mismatch",
        );
    for (const row of [
      ...state.incomes.map((x) => ({ accountId: x.receivingAccountId })),
      ...state.obligations,
    ])
      if (row.accountId && !accounts.has(row.accountId))
        throw new BetaError("INVALID_ACCOUNT", "Unknown linked account");
    // Imported records, assistant history and allocations are server controlled.
    for (const key of [
      "statements",
      "transactions",
      "classifications",
      "transferMatches",
      "confirmations",
      "recommendations",
      "assistantMessages",
      "goalAllocations",
      "actionFeedback",
    ] as const)
      (state as any)[key] = current.state[key];
    state.user = { ...current.state.user, email: user.email };
    state.profile.nickname = user.name;
    const result = {
      version: current.version + 1,
      state,
      aiConsent: parsed.aiConsent,
      experimentalRecommendations:
        parsed.experimentalRecommendations ??
        current.experimentalRecommendations ??
        false,
    };
    this.persist(user.id, result);
    this.store.remove(user.id, "analysis");
    this.store.remove(user.id, "analysis-private");
    return result;
  }
  snapshot(user: { id: string; name: string; email: string }) {
    return buildFinancialSnapshot(this.get(user).state);
  }
}
