import { themedStyles } from '../theme';
import { useState } from "react";
import { Text,TouchableOpacity,View } from "react-native";
import type { Finding,FindingResponse,FindingsPacket } from "../../../shared/contracts/findingsTypes";
import type {
FinancialSnapshot,
RecommendationRecord
} from "../../../shared/pi/types";
import { FindingsReview } from "../components/FindingsReview";
import {
Field,
GlassButton,
GlassCard,
Icon,
IconName,
colors,
} from "../components/SoftGlass";
import { deriveObservedPlan } from "./planMath";

export function formatMoney(
  value: number | null | undefined,
  currency = "EUR",
) {
  if (value == null || !Number.isFinite(value)) return "Needs confirmation";
  return new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(
    value,
  );
}
type Props = {
  manualReviewMessage?: string;
  findings?: FindingsPacket;
  onFindingResponse: (finding: Finding, body: Omit<FindingResponse,"expectedVersion"|"evidenceVersion">) => Promise<void>;
  snapshot?: FinancialSnapshot;
  recommendation?: RecommendationRecord | null;
  analysis?: any;
  job?: any;
  busy: boolean;
  experimental: boolean;
  onReview: () => void;
  onFeedback: (action: string, amount?: number) => void;
  onExplain: () => void;
  onOpen: (collection: string, record?: any) => void;
  onUpload: () => void;
  onManage: () => void;
  onReviewTransactions: () => void;
};
export function TodayScreen(props: Props) {
  const { snapshot, recommendation, busy } = props;
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [adjustment, setAdjustment] = useState("");
  const [showReason, setShowReason] = useState(false);
  const summary = snapshot?.primaryCurrencySummary;
  const currency = snapshot?.baseCurrency || "EUR";
  const observed = snapshot ? deriveObservedPlan(snapshot, currency) : null;
  const active =
    recommendation &&
    props.experimental &&
    props.analysis?.decisionStatus === "RECOMMENDATION_READY" &&
    !["declined", "expired", "completed"].includes(recommendation.status);
  const processing = ["queued", "running"].includes(props.job?.status);
  const hasError =
    props.job?.status === "failed" ||
    (!!props.job && props.analysis?.status === "PROVIDER_UNAVAILABLE");
  const title = active
    ? recommendation.title
    : processing
      ? "Updating your financial picture"
      : hasError
        ? "Your review needs another try"
        : props.analysis?.decisionStatus === "NEEDS_DATA"
          ? "A little more clarity first"
          : "Your next step starts here";
  const description = active
    ? recommendation.description
    : processing
      ? "Vela is checking your latest information. Your saved records remain available."
      : hasError
        ? "The review could not finish. You can retry when the connection is ready."
        : snapshot?.readinessReason ||
          "Add your accounts and upcoming bills, then let Vela review your financial picture.";
  const quickActions: { title: string; icon: IconName; action: () => void }[] =
    [
      {
        title: "Add income",
        icon: "income",
        action: () => props.onOpen("incomes"),
      },
      {
        title: "Update balance",
        icon: "refresh",
        action: () =>
          snapshot?.accountSummaries[0]
            ? props.onOpen(
                "accounts",
                (
                  snapshot.accountSummaries.find(
                    (summary) => summary.account.isPrimary,
                  ) || snapshot.accountSummaries[0]
                ).account,
              )
            : props.onOpen("accounts"),
      },
      { title: "Upload statement", icon: "statement", action: props.onUpload },
    ];
  return (
    <>
      <View style={styles.topRow}>
        <Text style={styles.note}>Your financial picture</Text>
        <TouchableOpacity accessibilityRole="button" onPress={props.onReviewTransactions}>
          <Text style={styles.link}>{snapshot?.readinessState === "state_a_action_ready" ? "Ready" : "Needs review"} · {snapshot?.unresolvedConfirmations.length || 0} checks</Text>
        </TouchableOpacity>
      </View>
      <GlassCard style={{backgroundColor: "rgba(56,102,65,.08)", borderColor: "rgba(56,102,65,.25)"}}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>✧ RECOMMENDED NEXT STEP</Text>
          <Text style={styles.badge}>
            {processing
              ? "Reviewing"
              : active
                ? recommendation.priority === "priority"
                  ? "Priority"
                  : "Suggested"
                : "Your picture"}
          </Text>
        </View>
        <Text accessibilityRole="header" style={styles.actionTitle}>
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
        {props.experimental && (
          <Text style={styles.beta}>
            EXPERIMENTAL BETA · PRELIMINARY POLICY
          </Text>
        )}
        {active ? (
          <>
            {recommendation.status === "accepted" ||
            recommendation.status === "adjusted" ? (
              <>
                <Text style={styles.note}>
                  Accepted and saved to your plan. Confirm completion only after
                  you have carried out the action.
                </Text>
                <GlassButton
                  title="Mark as completed"
                  disabled={busy}
                  onPress={() => props.onFeedback("complete")}
                />
              </>
            ) : (
              <GlassButton
                title={
                  recommendation.suggestedAmount == null
                    ? "Accept this step"
                    : `Accept ${formatMoney(recommendation.adjustedAmount ?? recommendation.suggestedAmount, recommendation.currency)}`
                }
                disabled={busy}
                onPress={() => props.onFeedback("accept")}
              />
            )}
            <View style={styles.actions}>
              {recommendation.suggestedAmount != null && (
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => setShowAdjustment((value) => !value)}
                  style={styles.outlineAction}
                >
                  <Text style={styles.actionText}>Adjust</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                accessibilityRole="button"
                disabled={busy}
                onPress={() => props.onFeedback("decline")}
                style={styles.textAction}
              >
                <Text style={styles.muted}>Not now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Ask why this step was recommended"
                onPress={props.onExplain}
                style={styles.iconAction}
              >
                <Icon name="chat" />
              </TouchableOpacity>
            </View>
            {showAdjustment && (
              <>
                <Field
                  label={`Your amount (${recommendation.currency})`}
                  value={adjustment}
                  onChange={setAdjustment}
                />
                <GlassButton
                  title="Check adjusted amount"
                  disabled={
                    busy ||
                    !adjustment.trim() ||
                    !Number.isFinite(Number(adjustment.replace(",", ".")))
                  }
                  onPress={() =>
                    props.onFeedback(
                      "adjust",
                      Number(adjustment.replace(",", ".")),
                    )
                  }
                />
              </>
            )}
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setShowReason((value) => !value)}
            >
              <Text style={styles.link}>
                {showReason ? "Hide explanation" : "Why this step?"}
              </Text>
            </TouchableOpacity>
            {showReason && (
              <Text style={styles.note}>
                {recommendation.reasoning ||
                  "Vela selected this step after checking the available information."}
              </Text>
            )}
          </>
        ) : (
          <><GlassButton
            title={processing ? "Review in progress…" : "Review my finances"}
            disabled={busy || processing}
            onPress={props.onReview}
          />
          </>
        )}
        {active&&<GlassButton secondary title={processing?"Review in progress…":"Review my finances"} disabled={busy||processing} onPress={props.onReview}/>}
        {!!props.manualReviewMessage&&<Text accessibilityLiveRegion="polite" style={styles.note}>{props.manualReviewMessage}</Text>}
        {props.job?.error && (
          <Text style={styles.error}>
            {typeof props.job.error === "string"
              ? props.job.error
              : props.job.error.message}
          </Text>
        )}
      </GlassCard>

      <View style={styles.quickActions}>
        {quickActions.map((action) => (
          <TouchableOpacity
            accessibilityRole="button"
            disabled={busy}
            key={action.title}
            onPress={action.action}
            style={styles.quickAction}
          >
            <View style={styles.quickIcon}>
              <Icon name={action.icon} size={24} />
            </View>
            <Text style={styles.quickText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassCard>
        <Text style={styles.eyebrow}>YOUR FINANCIAL PICTURE</Text>
        <Text style={styles.actionTitle}>Here's what Vela found</Text>
        <ValueRow label={`Observed spending · ${currency}`} value={formatMoney(observed?.grossSpending, currency)} />
        <ValueRow label="Subscriptions" value={formatMoney(observed?.categories.subscriptions ?? (observed ? 0 : null), currency)} />
        <ValueRow label="Transfer movements (excluded)" value={formatMoney(observed?.transfers, currency)} />
        {snapshot?.dataQuality.multiCurrencyDetected && <Text style={styles.note}>Showing {currency} only. Other currencies remain separate in Analytics; no currency conversion is assumed.</Text>}
        {!!observed?.unknownCount && <Text style={styles.note}>{observed.unknownCount} transactions in this currency still need review and are excluded from classified totals.</Text>}
        <Text style={styles.note}>Coverage: {snapshot?.dataQuality.accountsWithStatements || 0} of {snapshot?.dataQuality.totalAccounts || 0} accounts have statements. These are observed history figures, not guaranteed monthly averages.</Text>
        <View style={styles.line} />
        <GlassButton secondary title={`Inspect all ${snapshot?.transactions.length || 0} transactions`} disabled={busy} onPress={props.onReviewTransactions} />
      </GlassCard>

      <FindingsReview packet={props.findings} busy={busy} transactions={snapshot?.transactions || []} respond={props.onFindingResponse} />

      <GlassCard>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>PERSONAL BALANCE · {currency}</Text>
          <Icon name="leaf" size={20} />
        </View>
        <Text style={styles.balance}>
          {summary?.hasMissingBalances
            ? "Needs balance data"
            : formatMoney(summary?.personalAccessibleCash, currency)}
        </Text>
        <Text style={styles.note}>
          Accessible personal funds across your reported accounts.
        </Text>
        <View style={styles.line} />
        <ValueRow
          label="Protected for goals"
          value={formatMoney(summary?.allocatedToGoals, currency)}
        />
        <ValueRow
          label="Upcoming bills"
          value={formatMoney(summary?.upcomingUnpaidObligations, currency)}
        />
        <View style={styles.spendRow}>
          <Text style={styles.eyebrow}>AVAILABLE TO SPEND</Text>
          <Text style={styles.spendAmount}>
            {summary?.hasMissingBalances
              ? "Unknown"
              : formatMoney(summary?.uncommittedSafeToSpend, currency)}
          </Text>
        </View>
        {(summary?.hasWorkOrMixedUncertainty ||
          snapshot?.dataQuality.multiCurrencyDetected) && (
          <Text style={styles.note}>
            Some balances need confirmation. Currencies and mixed funds stay
            separate.
          </Text>
        )}
        <View style={styles.line} />
        <Text style={styles.eyebrow}>YOUR ACCOUNTS</Text>
        {snapshot?.accountSummaries.map(account => (
          <TouchableOpacity key={account.account.id} accessibilityRole="button" disabled={busy} onPress={() => props.onOpen("accounts", account.account)} style={{paddingVertical: 10, gap: 4}}>
            <Text style={styles.link}>{account.account.institution} · {account.account.name}{account.account.isPrimary ? " · Primary" : ""}</Text>
            <Text style={styles.spendAmount}>{formatMoney(account.latestBalance?.amount, account.account.currency)}</Text>
            <Text style={styles.note}>{account.account.fundsOwnership.replaceAll("_", " ")} · {account.isStale ? "Balance needs updating" : account.latestBalance ? `As of ${account.latestBalance.asOf.slice(0,10)}` : "No balance date"}</Text>
            <Text style={styles.note}>{account.transactionCount} transactions · {account.statementCount} statements{account.account.fundsOwnership !== "personal" ? ` · Personal share ${formatMoney(account.personalAccessibleBalance, account.account.currency)}` : ""}</Text>
          </TouchableOpacity>
        ))}
        {snapshot?.currencySummaries.filter(c => c.currency !== currency).map(c => <Text key={c.currency} style={styles.note}>Kept separate · {c.currency}: {c.hasMissingBalances ? "Needs balance data" : formatMoney(c.personalAccessibleCash, c.currency)} personal funds</Text>)}
        <TouchableOpacity accessibilityRole="button" onPress={props.onManage}>
          <Text style={styles.link}>View your accounts →</Text>
        </TouchableOpacity>
      </GlassCard>

      <View style={styles.topRow}>
        <Text style={styles.eyebrow}>UPCOMING OBLIGATIONS</Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => props.onOpen("obligations")}
        >
          <Text style={styles.link}>+ Add bill</Text>
        </TouchableOpacity>
      </View>
      {snapshot?.upcomingUnpaidObligations?.length ? (
        snapshot.upcomingUnpaidObligations.map((bill) => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Edit ${bill.name}`}
            key={bill.id}
            onPress={() => props.onOpen("obligations", bill)}
          >
            <GlassCard style={{ borderRadius: 22 }}>
              <View style={styles.obligation}>
                <View style={styles.obligationIcon}>
                  <Icon
                    name={
                      bill.category === "rent"
                        ? "home"
                        : bill.category === "energy"
                          ? "bolt"
                          : bill.category === "internet"
                            ? "wifi"
                            : "plan"
                    }
                    size={24}
                  />
                </View>
                <View style={{ flex: 1, gap: 5 }}>
                  <Text style={styles.billTitle}>{bill.name}</Text>
                  <Text style={styles.muted}>Due {bill.dueDate}</Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 5 }}>
                  <Text style={styles.billAmount}>
                    {formatMoney(bill.amount, bill.currency)}
                  </Text>
                  <Text style={styles.muted}>
                    {bill.recurrence.replace("_", " ")}
                  </Text>
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        ))
      ) : (
        <GlassCard>
          <Text style={styles.note}>
            Your upcoming bills will appear here. Add the commitments you
            already know.
          </Text>
        </GlassCard>
      )}
    </>
  );
}
function ValueRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.valueRow}>
      <Text style={styles.muted}>● {label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
const styles = themedStyles({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 9,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: colors.muted,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    color: colors.ink,
    fontSize: 11,
    backgroundColor: "rgba(255,255,255,.45)",
  },
  actionTitle: {
    color: colors.ink,
    fontWeight: "600",
    fontSize: 23,
    lineHeight: 29,
    letterSpacing: -0.7,
  },
  description: { color: colors.muted, fontSize: 13, lineHeight: 21 },
  beta: { color: "#747b68", letterSpacing: 0.6, fontSize: 8, lineHeight: 14 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center" },
  outlineAction: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 17,
    minHeight: 46,
  },
  textAction: { flex: 1, alignItems: "center", padding: 12 },
  actionText: { color: colors.ink, fontSize: 14 },
  iconAction: {
    padding: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 17,
  },
  muted: { fontSize: 12, color: colors.muted, lineHeight: 18 },
  note: { fontSize: 12, color: colors.muted, lineHeight: 20 },
  link: {
    fontSize: 12,
    fontWeight: "600",
    color: "#58654d",
    paddingVertical: 4,
  },
  balance: {
    fontSize: 32,
    letterSpacing: -1.4,
    fontWeight: "600",
    color: colors.ink,
  },
  line: {
    height: 1,
    backgroundColor: "rgba(142,151,132,.25)",
    marginVertical: 3,
  },
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    paddingVertical: 4,
  },
  value: { color: colors.ink, fontSize: 14, fontWeight: "500" },
  spendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.45)",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },
  spendAmount: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.ink,
    letterSpacing: -0.6,
  },
  quickActions: { flexDirection: "row", gap: 10 },
  quickAction: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,.36)",
    borderWidth: 1.2,
    borderColor: "white",
    borderRadius: 22,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 20,
    gap: 12,
    minHeight: 110,
  },
  quickIcon: { height: 30, justifyContent: "center" },
  quickText: {
    color: colors.ink,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 17,
  },
  obligation: { flexDirection: "row", alignItems: "center", gap: 12 },
  obligationIcon: {
    backgroundColor: "rgba(255,255,255,.62)",
    borderRadius: 13,
    padding: 12,
  },
  billTitle: { color: colors.ink, fontSize: 14, fontWeight: "500" },
  billAmount: { color: colors.ink, fontSize: 16, fontWeight: "600" },
  error: { fontSize: 12, color: "#9c4439", lineHeight: 18 },
});
