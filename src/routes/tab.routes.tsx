import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../styles/colors";
import PlantSelection from "../pages/PlantSelection";
import { MaterialIcons } from "@expo/vector-icons";
import MyPlants from "../pages/MyPlants";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
        style: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 88,
        },
      }}
    >
      <Tab.Screen
        name="Nova Planta"
        component={PlantSelection}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
