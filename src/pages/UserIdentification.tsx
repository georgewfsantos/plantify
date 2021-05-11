import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const UserIdentification: React.FC = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState("");

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!name);
  };

  const handleInputChange = (value: string) => {
    setIsFilled(!!value);
    setName(value);
  };

  const handleSubmit = async () => {
    if (!name) {
      return Alert.alert("Precisamos que nos informe seu nome. 😥");
    }

    try {
      await AsyncStorage.setItem("@plantify:userName", name);

      navigation.navigate("Confirmation", {
        title: "Prontinho",
        subtitle: "Agora vamos começar das suas plantinhas com muito cuidado",
        buttonTitle: "Começar",
        icon: "smile",
        nextScreen: "Plant Selection",
      });
    } catch {
      Alert.alert("Não foi possível salvar seu nome. 😥");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isFilled ? "😄" : "😀"}</Text>
                <Text style={styles.title}>Como podemos chamar você ?</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={() => setIsFocused(true)}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserIdentification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    width: "100%",
    color: colors.heading,
    fontSize: 18,
    padding: 10,
    textAlign: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    maxWidth: 180,
    marginTop: 20,
  },
  footer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
});
