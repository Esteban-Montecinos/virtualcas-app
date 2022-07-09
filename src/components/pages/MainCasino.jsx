import React from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cuenta from "./menu-casino/Cuenta";
import Scanner from "./menu-casino/Scanner";

const Tab = createBottomTabNavigator();
const MainCasino = () => {
  const route = useRoute();
  const { usuario, email } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        size: 30,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          switch (route.name) {
            case "ScannerQrCode":
              iconName = focused ? "qr-code" : "qr-code-outline";
              break;
            case "CuentaCasino":
              iconName = focused ? "person-circle" : "person-circle-outline";
              break;
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ tabBarLabel: "Lector QR", title: "Lector QR" }}
        initialParams={{ usuario, email }}
        name="ScannerQrCode"
        component={Scanner}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Mi Cuenta" }}
        initialParams={{ usuario, email }}
        name="CuentaCasino"
        component={Cuenta}
        pa
      />
    </Tab.Navigator>
  );
};

export default MainCasino;
