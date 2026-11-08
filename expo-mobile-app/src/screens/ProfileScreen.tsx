import { useState, type ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GlassCard, Icon } from "../components/SoftGlass";
import { colors, themedStyles } from "../theme";

export function ProfileScreen({
  name,
  email,
  currency,
  sections,
}: {
  name: string;
  email: string;
  currency: string;
  sections: { title: string; content: ReactNode }[];
}) {
  const [expanded, setExpanded] = useState<string | null>("Profile details");
  return (
    <>
      <View style={{ gap: 6 }}>
        <Text style={s.eyebrow}>YOUR VELA</Text>
        <Text accessibilityRole="header" style={s.title}>
          Profile
        </Text>
      </View>
      <View style={s.summary}>
        <View style={s.avatar}>
          <Icon name="profile" size={26} color={colors.white} />
        </View>
        <View style={{ flex: 1, gap: 3 }}>
          <Text style={s.name}>{name || "Your profile"}</Text>
          <Text style={s.email}>{email}</Text>
          <Text style={s.meta}>Personal profile · {currency}</Text>
        </View>
      </View>
      {sections.map((section) => (
        <GlassCard key={section.title}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ expanded: expanded === section.title }}
            onPress={() =>
              setExpanded((value) =>
                value === section.title ? null : section.title,
              )
            }
            style={s.trigger}
          >
            <Text style={s.section}>{section.title}</Text>
            <Text style={s.section}>
              {expanded === section.title ? "−" : "+"}
            </Text>
          </TouchableOpacity>
          {expanded === section.title && (
            <View style={{ gap: 12 }}>{section.content}</View>
          )}
        </GlassCard>
      ))}
    </>
  );
}
const s = themedStyles({
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.green,
    fontWeight: "600",
  },
  title: { fontSize: 26, fontWeight: "600", color: colors.ink },
  summary: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    paddingVertical: 10,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 20, fontWeight: "600", color: colors.ink },
  email: { fontSize: 13, color: colors.muted },
  meta: { fontSize: 11, color: colors.green, fontWeight: "500" },
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 44,
  },
  section: { fontSize: 14, fontWeight: "600", color: colors.ink },
});
