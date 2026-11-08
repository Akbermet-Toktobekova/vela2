import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";

export const colors = {
  background: "#e3e5df",
  ink: "#272e23",
  muted: "#74766d",
  green: "#386641",
  sage: "#67856a",
  secondary: "#dce1d6",
  card: "rgba(255,255,255,0.58)",
  line: "rgba(39,46,35,0.12)",
  white: "#ffffff",
  destructive: "#b5483e",
  emergency: "#457b9d",
  savings: "#b07b36",
};
export const fonts = {
  regular: "Manrope_400Regular",
  medium: "Manrope_500Medium",
  semibold: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
};
export const cardStyle: ViewStyle = {
  backgroundColor: colors.card,
  borderColor: colors.line,
  borderWidth: 1,
  borderRadius: 24,
  shadowColor: colors.ink,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.08,
  shadowRadius: 24,
  elevation: 1,
};
/** Attach the bundled font weight to text styles without changing layout styles. */
export function themedStyles<
  T extends Record<string, ViewStyle | TextStyle | ImageStyle>,
>(styles: T): T {
  for (const key of Object.keys(styles)) {
    const style = styles[key] as TextStyle;
    if (
      style.fontSize !== undefined ||
      style.lineHeight !== undefined ||
      style.fontWeight !== undefined
    ) {
      const weight = Number(style.fontWeight || 400);
      Object.assign(style, {
        fontFamily:
          weight >= 700
            ? fonts.bold
            : weight >= 600
              ? fonts.semibold
              : weight >= 500
                ? fonts.medium
                : fonts.regular,
        fontWeight: "normal",
      });
    }
  }
  return StyleSheet.create(styles);
}
