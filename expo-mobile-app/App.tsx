import { ActivityIndicator, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Manrope_400Regular } from "@expo-google-fonts/manrope/400Regular";
import { Manrope_500Medium } from "@expo-google-fonts/manrope/500Medium";
import { Manrope_600SemiBold } from "@expo-google-fonts/manrope/600SemiBold";
import { Manrope_700Bold } from "@expo-google-fonts/manrope/700Bold";
import { StatusBar } from "expo-status-bar";
import BetaApp from "./src/BetaApp";
import { colors } from "./src/theme";

export default function App() {
  const [loaded, error] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  if (!loaded && !error)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={colors.green} />
        <Text>Loading Vela…</Text>
      </View>
    );
  return (
    <>
      <StatusBar style="dark" />
      <BetaApp />
    </>
  );
}
