import { BlurView } from "expo-blur";
import React,{ ReactNode } from "react";
import {
Platform,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View,
} from "react-native";
import Svg,{ Circle,Path,Rect } from "react-native-svg";

import { colors, cardStyle, themedStyles } from '../theme';
export { colors } from '../theme';
export type IconName =
  | "profile"
  | "analytics"
  | "compass"
  | "leaf"
  | "sun"
  | "plan"
  | "chat"
  | "settings"
  | "income"
  | "refresh"
  | "statement"
  | "home"
  | "bolt"
  | "wifi"
  | "plus"
  | "arrow";
export function Icon({
  name,
  size = 22,
  color = colors.ink,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const common = { stroke: color, strokeWidth: 1.8, fill: "none" };
  const paths: Record<IconName, ReactNode> = {
    profile: <><Circle cx="12" cy="8" r="4" {...common} /><Path d="M4 22v-3a8 8 0 0 1 16 0v3" {...common} /></>,
    analytics: <Path d="M3 3v18h18M7 16l4-5 4 2 6-8" {...common} />,
    compass: <><Path d="M4 5 12 19 20 5" {...common} /><Circle cx="12" cy="9" r="1.6" fill={color} /></>,
    leaf: (
      <>
        <Path
          d="M12 21C5 20 3 14 3 9c4 0 7 2 9 6M12 21c7-1 9-7 9-12-4 0-7 2-9 6M12 21V9m0-6c-4 4-5 8 0 12 5-4 4-8 0-12Z"
          {...common}
        />
      </>
    ),
    sun: (
      <>
        <Circle cx="12" cy="12" r="4" {...common} />
        <Path
          d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
          {...common}
        />
      </>
    ),
    plan: (
      <>
        <Rect x="4" y="5" width="16" height="16" rx="2" {...common} />
        <Path d="M4 10h16M8 2v5m8-5v5" {...common} />
      </>
    ),
    chat: <Path d="M4 4h16v13H9l-5 4V4Z" {...common} />,
    settings: (
      <>
        <Path
          d="m9 3 .5 3a7 7 0 0 1 5 0l.5-3 3 2-1 3a7 7 0 0 1 2 4l3 1-1 3-3-.2a7 7 0 0 1-3 3l-1 3-3-1-.5-3a7 7 0 0 1-4-2l-3 1-1-3 2-2a7 7 0 0 1 1-4L5 5l4-2Z"
          {...common}
        />
        <Circle cx="12" cy="12" r="3" {...common} />
      </>
    ),
    income: (
      <>
        <Path d="M20 12V5H3v14h10M3 9h17m-3 7v6m-3-3h6" {...common} />
      </>
    ),
    refresh: (
      <>
        <Path
          d="M19 8a8 8 0 0 0-13-3L3 8m0-6v6h6m-4 8a8 8 0 0 0 13 3l3-3m0 6v-6h-6"
          {...common}
        />
      </>
    ),
    statement: (
      <>
        <Path
          d="m5 3 2 1 2-1 3 1 3-1 2 1 2-1v19l-2-1-2 1-3-1-3 1-2-1-2 1V3Z"
          {...common}
        />
        <Path d="M8 8h8m-8 4h8m-8 4h5" {...common} />
      </>
    ),
    home: (
      <>
        <Path d="m3 10 9-7 9 7v11H3V10Zm6 11v-8h6v8" {...common} />
      </>
    ),
    bolt: <Path d="m13 2-9 12h7l-1 8L21 9h-8l1-7Z" {...common} />,
    wifi: (
      <>
        <Path
          d="M2 8a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0m-11 4a5 5 0 0 1 8 0"
          {...common}
        />
        <Circle cx="12" cy="20" r="1" fill={color} />
      </>
    ),
    plus: <Path d="M12 4v16M4 12h16" {...common} />,
    arrow: <Path d="M4 12h16m-6-6 6 6-6 6" {...common} />,
  };
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      accessibilityElementsHidden
    >
      {paths[name]}
    </Svg>
  );
}
export function GlassCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: any;
}) {
  return (
    <View style={[glass.card, style]}>
      <BlurView
        intensity={Platform.OS === "ios" ? 32 : 15}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
      <View style={glass.cardContent}>{children}</View>
    </View>
  );
}
export function GlassButton({
  title,
  onPress,
  secondary = false,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        glass.button,
        secondary && glass.secondary,
        disabled && { opacity: 0.45 },
      ]}
    >
      <Text style={[glass.buttonText, secondary && { color: colors.ink }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
export function Field({
  label,
  value,
  onChange,
  secure = false,
  inputRef,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  secure?: boolean;
  inputRef?: React.Ref<React.ComponentRef<typeof TextInput>>;
}) {
  const email = label.toLowerCase().includes("email");
  return (
    <View style={{ gap: 7 }}>
      <Text style={glass.label}>{label}</Text>
      <TextInput
        ref={inputRef}
        accessibilityLabel={label}
        value={value}
        onChangeText={onChange}
        style={glass.input}
        secureTextEntry={secure}
        returnKeyType="done"
        blurOnSubmit
        autoCorrect={!secure && !email}
        autoCapitalize={secure || email ? "none" : "sentences"}
        keyboardType={
          email
            ? "email-address"
            : /amount|balance|payment|apr|target/i.test(label)
              ? "decimal-pad"
              : "default"
        }
        placeholderTextColor="#969c90"
      />
    </View>
  );
}
export function FloatingNavigation({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  const items: { name: string; icon: IconName }[] = [
    { name: "Today", icon: "sun" },
    { name: "Analytics", icon: "analytics" },
    { name: "Assistant", icon: "chat" },
    { name: "Profile", icon: "profile" },
  ];
  return (
    <View style={glass.navigationWrap}>
      <BlurView intensity={65} tint="light" style={glass.navigation}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.name.toUpperCase()}
            accessibilityRole="tab"
            accessibilityState={{ selected: active === item.name }}
            onPress={() => onChange(item.name)}
            style={[glass.navItem, active === item.name && glass.navActive]}
          >
            <View style={[glass.navIcon, active === item.name && glass.navIconActive]}><Icon name={item.icon} size={19} color={active === item.name ? colors.white : colors.muted} /></View>
            <Text
              style={[
                glass.navText,
                active === item.name && { color: colors.ink },
              ]}
            >
              {item.name.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </BlurView>
    </View>
  );
}
export function AmbientBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={glass.greenOrb} />
      <View style={glass.warmOrb} />
    </View>
  );
}
export const glass = themedStyles({
  card: {...cardStyle, overflow: "hidden"},
  cardContent: { padding: 16, gap: 12 },
  button: {
    minHeight: 49,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: colors.green,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#87917d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  secondary: { backgroundColor: colors.secondary, shadowOpacity: 0 },
  buttonText: { fontSize: 14, fontWeight: "600", color: colors.white },
  label: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.muted,
  },
  input: {
    minHeight: 50,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,.62)",
    color: colors.ink,
    fontSize: 15,
  },
  navigationWrap: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    width: "92%",
    maxWidth: 398,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#818b79",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 8,
  },
  navigation: {
    flexDirection: "row",
    padding: 6,
    backgroundColor: "rgba(245,246,242,.90)",
  },
  navItem: {
    flex: 1,
    minHeight: 56,
    gap: 7,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  navActive: {},
  navIcon: {width: 34, height: 34, borderRadius: 13, alignItems: "center", justifyContent: "center"},
  navIconActive: {backgroundColor: colors.green},
  navText: { fontSize: 9, fontWeight: "600", color: colors.muted },
  greenOrb: {
    width: 470,
    height: 470,
    borderRadius: 235,
    position: "absolute",
    backgroundColor: "rgba(168,185,149,.12)",
    left: -270,
    top: 230,
  },
  warmOrb: {
    width: 480,
    height: 480,
    borderRadius: 240,
    position: "absolute",
    backgroundColor: "rgba(235,218,186,.15)",
    right: -290,
    bottom: -140,
  },
});
