import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { SvgFromUri } from "react-native-svg";

import waterDropImage from "../assets/waterdrop.png";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { format, isBefore } from "date-fns";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PlantData } from "../types/Plant";
import { savePlant } from "../utils/functions";
import { SafeAreaView } from "react-native-safe-area-context";

interface Params {
  plant: PlantData;
}

const PlantSave: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as Params;

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(
    Platform.OS === "ios"
  );

  const handleTimeChange = (event: Event, dateTime: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDateTimePicker((previousState) => !previousState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());

      return Alert.alert(
        "Você deve escolher um horário que não tenha passado ⏰!"
      );
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  };

  const handleShowDateTimePickerOnAndroid = () => {
    setShowDateTimePicker((previousState) => !previousState);
  };

  const handlePlantSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.",
        buttonTitle: "Muito Obrigado :D",
        icon: "hug",
        nextScreen: "My Plants",
      });
    } catch (error) {
      Alert.alert("Não foi possível salvar seu nome. 😥");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />
          <Text style={styles.plantName}>{plant.name}</Text>

          <Text style={styles.aboutPlant}>{plant.about}</Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterDropImage} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showDateTimePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              onPress={handleShowDateTimePickerOnAndroid}
              style={styles.dateTimePickerButton}
            >
              <Text style={styles.dateTimePickerText}>{`⏰ Alterar ${format(
                selectedDateTime,
                "HH:mm"
              )}`}</Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar Planta" onPress={handlePlantSave} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  aboutPlant: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    padding: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: "justify",
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});

export default PlantSave;
