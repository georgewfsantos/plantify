import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import wateringCanImage from "../assets/watering.png";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const Welcome: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerencie suas plantas de forma fácil</Text>

      <Image
        source={wateringCanImage}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.description}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar sempre
        que precisar
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>
          {" "}
          <Feather name="chevron-right" size={32} />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    maxWidth: 200,
    lineHeight: 34,
    marginTop: 38,
  },
  description: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 18,
    color: colors.heading,
    paddingHorizontal: 20,
  },

  image: {
    height: Dimensions.get("window").width * 0.7,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    width: 56,
    height: 56,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default Welcome;
