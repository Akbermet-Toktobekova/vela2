import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { DebtRecord } from "../../../shared/pi/types";
import { SharedFinancialCalculator } from "../../../shared/calculator";
import { Field, GlassCard } from "./SoftGlass";
import { colors, themedStyles } from "../theme";

export function DebtSimulator({ debts }: { debts: DebtRecord[] }) {
  const [selected, setSelected] = useState("");
  const [extra, setExtra] = useState("0");
  const debt = debts.find((item) => item.id === selected) || debts[0];
  const amount = extra.trim() ? Number(extra.replace(",", ".")) : NaN;
  const valid =
    !!debt &&
    debt.remainingBalance != null &&
    debt.remainingBalance >= 0 &&
    debt.apr != null &&
    debt.apr >= 0 &&
    debt.minimumPayment != null &&
    debt.minimumPayment > 0 &&
    debt.paymentFrequency === "monthly" &&
    Number.isFinite(amount) &&
    amount >= 0;
  const baseline = valid
    ? SharedFinancialCalculator.computeDebtPayoffHorizon(
        debt.remainingBalance!,
        debt.apr! / 1200,
        debt.minimumPayment!,
      )
    : null;
  const scenario = valid
    ? SharedFinancialCalculator.computeDebtPayoffHorizon(
        debt.remainingBalance!,
        debt.apr! / 1200,
        debt.minimumPayment! + amount,
      )
    : null;
  return (
    <GlassCard>
      <Text style={s.eyebrow}>INTERACTIVE DEBT SIMULATOR</Text>
      <Text accessibilityRole="header" style={s.heading}>
        Explore a faster payoff
      </Text>
      {!debt ? (
        <Text style={s.note}>
          Add a debt below to explore a payment scenario.
        </Text>
      ) : (
        <>
          <View style={s.chips}>
            {debts.map((item) => (
              <TouchableOpacity
                key={item.id}
                accessibilityRole="button"
                accessibilityState={{ selected: item.id === debt.id }}
                onPress={() => setSelected(item.id)}
                style={[
                  s.chip,
                  item.id === debt.id && { borderColor: colors.green },
                ]}
              >
                <Text style={s.body}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Field
            label={`Extra monthly payment (${debt.currency})`}
            value={extra}
            onChange={setExtra}
          />
          {!valid ? (
            <Text style={s.note}>
              Needs data: record a balance, APR, and positive monthly minimum
              payment, then enter a non-negative extra amount. Weekly and
              irregular schedules need a separate calculation.
            </Text>
          ) : (
            <View style={s.result}>
              <Text style={s.resultText}>
                Current payment:{" "}
                {baseline === null
                  ? "Does not pay off at this rate"
                  : `${Math.ceil(baseline)} months`}
              </Text>
              <Text style={s.resultText}>
                With extra payment:{" "}
                {scenario === null
                  ? "Does not pay off at this rate"
                  : `${Math.ceil(scenario)} months`}
              </Text>
            </View>
          )}
          <Text style={s.note}>
            Hypothetical monthly model using recorded APR and fixed payments.
            Excludes fees and rate changes. This does not change your debt or
            confirm that an extra payment is affordable.
          </Text>
        </>
      )}
    </GlassCard>
  );
}
const s = themedStyles({
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.green,
    letterSpacing: 1,
  },
  heading: { fontSize: 18, fontWeight: "700", color: colors.ink },
  body: { fontSize: 13, color: colors.ink },
  note: { fontSize: 12, lineHeight: 18, color: colors.muted },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    padding: 12,
    backgroundColor: colors.secondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  result: {
    padding: 16,
    gap: 8,
    backgroundColor: colors.green,
    borderRadius: 16,
  },
  resultText: { fontSize: 14, fontWeight: "600", color: colors.white },
});
