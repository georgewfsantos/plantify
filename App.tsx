import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import colors from "./src/styles/colors";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";

import Routes from "./src/routes";
import { PlantData } from "./src/types/Plant";

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const data = notification.request.content.data.plant as PlantData;
      }
    );

    return () => subscription.remove();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar backgroundColor={colors.green_light} />
      <Routes />
    </>
  );
}
