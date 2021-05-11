import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../styles/colors";
import Welcome from "../pages/Welcome";
import UserIdentification from "../pages/UserIdentification";
import Confirmation from "../pages/Confirmation";
import PlantSave from "../pages/PlantSave";
import TabRoutes from "./tab.routes";

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <StackRoutes.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <StackRoutes.Screen name="Welcome" component={Welcome} />
      <StackRoutes.Screen
        name="User Identification"
        component={UserIdentification}
      />
      <StackRoutes.Screen name="Confirmation" component={Confirmation} />
      <StackRoutes.Screen name="Plant Selection" component={TabRoutes} />
      <StackRoutes.Screen name="Plant Save" component={PlantSave} />
      <StackRoutes.Screen name="My Plants" component={TabRoutes} />
    </StackRoutes.Navigator>
  );
};

export default AppRoutes;
