import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import EnvironmentButton from "../components/EnvironmentButton";
import Header from "../components/Header";
import PlantPrimaryCard from "../components/PlantPrimaryCard";
import Load from "../components/Load";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { PlantData } from "../types/Plant";

interface Environment {
  key: string;
  title: string;
}

export const PlantSelection: React.FC = () => {
  const navigation = useNavigation();

  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantData[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const handleEnvironmentSelection = (environment: string) => {
    setSelectedEnvironment(environment);

    if (environment === "all") {
      return setFilteredPlants(plants);
    }

    const filteredPlantsList = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filteredPlantsList);
  };

  const fetchPlants = async () => {
    const response = await api.get(
      `/plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!response.data) {
      return setIsLoading(true);
    }

    if (page > 1) {
      setPlants((previousState) => [...previousState, ...response.data]);
      setFilteredPlants((previousState) => [
        ...previousState,
        ...response.data,
      ]);
    } else {
      setPlants(response.data);
      setFilteredPlants(response.data);
    }

    setIsLoading(false);
    setLoadMore(false);
  };

  const handleFetchMore = (pageNumber: number) => {
    if (pageNumber < 1) {
      return;
    }

    setLoadMore(true);
    setPage((previousState) => previousState + 1);
    fetchPlants();
  };

  const handlePlantSelection = (plant: PlantData) => {
    navigation.navigate("Plant Save", {
      plant,
    });
  };

  useEffect(() => {
    const fetchEnvironments = async () => {
      const response = await api.get(
        "/plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...response.data,
      ]);
    };

    fetchEnvironments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  return isLoading ? (
    <Load />
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta ?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === selectedEnvironment}
              onPress={() => handleEnvironmentSelection(item.key)}
            />
          )}
          keyExtractor={(item) => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantPrimaryCard
              data={item}
              onPress={() => handlePlantSelection(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            handleFetchMore(distanceFromEnd);
          }}
          ListFooterComponent={
            loadMore ? <ActivityIndicator color={colors.green} /> : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
    paddingRight: 30,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});

export default PlantSelection;
