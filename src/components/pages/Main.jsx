import React from "react";
import { useRoute } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./menu/Home";
import QrCode from "./menu/QrCode";
import VerMovimientos from "./menu/VerMovimientos";
import Cuenta from "./menu/Cuenta";

const Tab = createBottomTabNavigator();
const Main = () => {
  const route = useRoute();
  const {usuario} = route.params
  return (
    
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: (color, size)=>{
            let iconName = '';
            switch(route.name){
              case "Home":
                iconName = "home";
                break;
              case "QrCode":
                iconName = "qr-code";
                break;
              case "VerMovimientos":
                iconName = "article";
                break;
              case "Cuenta":
                iconName = "account-circle";
                break;

            }
            return <MaterialIcons name={iconName} size={30} color={color} />

          }
        })
      
      }
      >
        <Tab.Screen options={{tabBarLabel: 'Inicio',title: 'Inicio'}} name="Home" component={Home} />
        <Tab.Screen options={{tabBarLabel: 'Codigo QR', title: 'Codigo QR'}} name="QrCode" component={QrCode} />
        <Tab.Screen options={{tabBarLabel: 'Ver Movimientos', title:'Ver Movimientos'}} name="VerMovimientos" component={VerMovimientos} />
        <Tab.Screen options={{tabBarLabel: 'Cuenta'}} initialParams={{usuario}} name="Cuenta" component={Cuenta} pa/>
      </Tab.Navigator>
  
  );
};
const styele = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default Main;
