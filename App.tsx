import { StatusBar } from "expo-status-bar";
import React from "react";
import Welcome from "./src/pages/Welcome";
import colors from "./src/styles/colors";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar backgroundColor={colors.green_light} />
      <Welcome />
    </>
  );
}
