import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import Svg, { Line, Polyline, Circle, Text as SvgText } from "react-native-svg";
import type { FinancialSnapshot } from "../../../shared/pi/types";
import {
  buildMoneyHistory,
  buildSampleMoneyHistory,
  type MoneySeriesKey,
} from "../screens/moneyHistory";
import { GlassCard } from "./SoftGlass";
import { colors, themedStyles } from "../theme";
const series = {
  cash: { label: "General cash balance", color: colors.green },
  emergency: { label: "Emergency fund", color: colors.emergency },
  savings: { label: "Other savings", color: colors.savings },
};
export function MoneyHistoryChart({
  snapshot,
}: {
  snapshot: FinancialSnapshot;
}) {
  const [sample, setSample] = useState(true);
  const [visible, setVisible] = useState<MoneySeriesKey[]>([
    "cash",
    "emergency",
    "savings",
  ]);
  const data = sample ? buildSampleMoneyHistory() : buildMoneyHistory(snapshot);
  const maximum =
    Math.max(1, ...data.flatMap((p) => visible.map((k) => p[k] || 0))) * 1.05;
  const x = (i: number) => 44 + (i / Math.max(1, data.length - 1)) * 252;
  const y = (v: number) => 214 - (v / maximum) * 186;
  return (
    <GlassCard>
      <Text style={s.eyebrow}>MONEY OVER TIME</Text>
      <Text style={s.heading}>Balances & savings</Text>
      <View style={s.row}>
        {[true, false].map((value) => (
          <Pressable
            key={String(value)}
            accessibilityRole="button"
            accessibilityState={{ selected: sample === value }}
            onPress={() => setSample(value)}
            style={[
              s.pill,
              sample === value && { backgroundColor: colors.secondary },
            ]}
          >
            <Text style={s.body}>{value ? "Sample data" : "My records"}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[s.row, { flexWrap: "wrap" }]}>
        {(Object.keys(series) as MoneySeriesKey[]).map((key) => (
          <Pressable
            key={key}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: visible.includes(key) }}
            onPress={() =>
              setVisible((old) =>
                old.includes(key)
                  ? old.filter((k) => k !== key)
                  : [...old, key],
              )
            }
            style={s.row}
          >
            <Text style={{ color: series[key].color }}>
              {" "}
              {visible.includes(key) ? "✓" : "○"} ━
            </Text>
            <Text style={s.note}>{series[key].label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={s.note}>
        Amount ({sample ? "EUR" : snapshot.baseCurrency})
      </Text>
      {data.length ? (
        <Svg width="100%" height={250} viewBox="0 0 310 250">
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <Line
              key={t}
              x1={44}
              x2={300}
              y1={y(maximum * t)}
              y2={y(maximum * t)}
              stroke={colors.line}
              strokeDasharray="2 4"
            />
          ))}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <SvgText
              key={t}
              x={36}
              y={y(maximum * t) + 4}
              fontSize={10}
              fill={colors.muted}
              textAnchor="end"
            >
              {Math.round(maximum * t).toLocaleString()}
            </SvgText>
          ))}
          {visible.map((key) => (
            <Polyline
              key={key}
              points={
                data.every((p) => p[key] !== null)
                  ? data.map((p, i) => `${x(i)},${y(p[key]!)}`).join(" ")
                  : ""
              }
              fill="none"
              stroke={series[key].color}
              strokeWidth={2}
              strokeDasharray={key === "savings" ? "5 3" : undefined}
            />
          ))}
          {visible.flatMap((key) =>
            data.map((p, i) =>
              p[key] === null ? null : (
                <Circle
                  key={`${key}${i}`}
                  cx={x(i)}
                  cy={y(p[key]!)}
                  r={2.5}
                  fill={series[key].color}
                />
              ),
            ),
          )}
          {data
            .filter(
              (_, i) =>
                i === 0 ||
                i === data.length - 1 ||
                i === Math.floor(data.length / 2),
            )
            .map((p) => (
              <SvgText
                key={p.date}
                x={x(data.indexOf(p))}
                y={239}
                fontSize={10}
                fill={colors.muted}
                textAnchor="middle"
              >
                {new Date(p.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </SvgText>
            ))}
        </Svg>
      ) : (
        <Text style={s.note}>No dated balance records yet.</Text>
      )}
      <Text style={s.note}>
        {sample
          ? "Synthetic sample amounts in EUR · March–November 2026. Not your financial records."
          : `Recorded balances in ${snapshot.baseCurrency}; missing balances remain unknown.`}{" "}
        Emergency fund and other savings are earmarked within cash, not
        additional money.
      </Text>
    </GlassCard>
  );
}

const s = themedStyles({
  eyebrow: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    color: colors.green,
  },
  heading: { fontSize: 16, fontWeight: "700", color: colors.ink },
  body: { fontSize: 12, color: colors.ink },
  note: { fontSize: 10, lineHeight: 16, color: colors.muted },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  pill: { paddingVertical: 9, paddingHorizontal: 13, borderRadius: 20 },
});
