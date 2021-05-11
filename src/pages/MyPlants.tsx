import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, FlatList, Alert } from "react-native";
import Header from "../components/Header";
import colors from "../styles/colors";
import waterDropImage from "../assets/waterdrop.png";
import { PlantData, StoredPlantData } from "../types/Plant";
import { loadPlants, removePlant } from "../utils/functions";
import { formatDistance } from "date-fns/esm";
import { ptBR } from "date-fns/locale";
import fonts from "../styles/fonts";
import PlantSecondaryCard from "../components/PlantSecondaryCard";
import Load from "../components/Load";

const MyPlants: React.FC = () => {
  const [myPlants, setMyPlants] = useState<PlantData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [nextToBeWatered, setNextToBeWatered] = useState<string>();

  useEffect(() => {
    async function loadMyPlants() {
      const myPlantsList = await loadPlants();

      const nextTime = formatDistance(
        new Date(myPlantsList[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextToBeWatered(
        `Não esqueça de regar a ${myPlantsList[0].name} daqui a ${nextTime}`
      );

      setMyPlants(myPlantsList);
      setIsLoading(false);
    }
    loadMyPlants();
  }, []);

  const handleRemove = (plant: PlantData) => {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏🏻",
        style: "cancel",
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((previousState) =>
              previousState?.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert(`Não foi possível remover 😥 !${error}`);
          }
        },
      },
    ]);
  };

  return isLoading ? (
    <Load />
  ) : (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDropImage} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextToBeWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantSecondaryCard
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});

export default MyPlants;
