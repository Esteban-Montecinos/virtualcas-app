import React from "react";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./menu/Home";
import QrCode from "./menu/QrCode";
import VerMovimientos from "./menu/VerMovimientos";
import Cuenta from "./menu-casino/Cuenta";
import Colacion from "./menu/Colacion";
import Comida from "./menu/Comida";

const Tab = createBottomTabNavigator();
const Main = () => {
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
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "QrCode":
              iconName = focused ? "qr-code" : "qr-code-outline";
              break;
            case "Comida":
              iconName = focused ? "fast-food" : "fast-food-outline";
              break;
            case "Colacion":
              iconName = focused ? "cafe" : "cafe-outline";
              break;
            case "VerMovimientos":
              iconName = focused ? "document-text" : "document-text-outline";
              break;
            case "Cuenta":
              iconName = focused ? "person-circle" : "person-circle-outline";
              break;
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ tabBarLabel: "Inicio", title: "Inicio" }}
        initialParams={{ usuario, email }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Codigo QR", title: "Codigo QR" }}
        initialParams={{ usuario, email }}
        name="QrCode"
        component={QrCode}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Comida", title: "Comida" }}
        initialParams={{ usuario, email }}
        name="Comida"
        component={Comida}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Colacion", title: "Colacion" }}
        initialParams={{ usuario, email }}
        name="Colacion"
        component={Colacion}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Ver", title: "Ver Movimientos" }}
        initialParams={{ usuario, email }}
        name="VerMovimientos"
        component={VerMovimientos}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Mi Cuenta" }}
        initialParams={{ usuario, email }}
        name="Cuenta"
        component={Cuenta}
        pa
      />
    </Tab.Navigator>
  );
};

export default Main;
