import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import * as Notifications from "expo-notifications";

import { PlantData, StoredPlantData } from "../types/Plant";

export async function savePlant(plant: PlantData): Promise<void> {
  try {
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;
    if (repeat_every === "week") {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    } else {
      nextTime.setDate(nextTime.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heeeey, 🌱",
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      },
    });

    const data = await AsyncStorage.getItem("@plantify:plants");
    const previousPlantList = data ? (JSON.parse(data) as StoredPlantData) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId,
      },
    };

    await AsyncStorage.setItem(
      "@plantify:plants",
      JSON.stringify({
        ...newPlant,
        ...previousPlantList,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlants(): Promise<PlantData[]> {
  try {
    const data = await AsyncStorage.getItem("@plantify:plants");
    const plants = data ? (JSON.parse(data) as StoredPlantData) : {};

    const sortedPlants = Object.keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          time: format(
            new Date(plants[plant].data.dateTimeNotification),
            "HH:mm"
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    console.log(data);

    return sortedPlants;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlant(id: number): Promise<void> {
  const data = await AsyncStorage.getItem("@plantify:plants");
  const plants = data ? (JSON.parse(data) as StoredPlantData) : {};

  await Notifications.cancelScheduledNotificationAsync(
    plants[id].notificationId
  );

  delete plants[id];

  await AsyncStorage.setItem("@plantify:plants", JSON.stringify(plants));
}
