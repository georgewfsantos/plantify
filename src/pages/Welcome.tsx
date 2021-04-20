import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import wateringCanImage from "../assets/watering.png";
import Button from "../components/Button";
import colors from "../styles/colors";

const Welcome: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerencie suas plantas de forma fácil</Text>

      <Image source={wateringCanImage} style={styles.image} />

      <Text style={styles.description}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar sempre
        que precisar
      </Text>

      <Button title=">" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    maxWidth: 200,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },

  image: {
    width: 292,
    height: 284,
  },
});

export default Welcome;
