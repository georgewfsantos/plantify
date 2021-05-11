import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Text,
  Image,
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../styles/colors";

import userImage from "../assets/me.jpg";
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const getUserName = async () => {
      const name = await AsyncStorage.getItem("@plantify:userName");
      setUserName(name || "");
    };

    getUserName();
  }, [userName]);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image source={userImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop:
      Platform.OS === "ios" ? getStatusBarHeight() : StatusBar.currentHeight,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default Header;
