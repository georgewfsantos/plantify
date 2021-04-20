import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Welcome from "./src/pages/Welcome";
import colors from "./src/styles/colors";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={colors.green_light} />
      <Welcome />
    </>
  );
}
