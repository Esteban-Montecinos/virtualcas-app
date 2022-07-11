import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Constants from "expo-constants";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {auth} from "../../../firebase/firebaseconfig";
import tw from "twrnc";

const Cuenta = ({ route }) => {
  const navigation = useNavigation();
  const cerrarSesion = () => {
    signOut(auth);
    navigation.navigate("Login");
  };
  const { usuario, email } = route.params;
  return (
    <View style={[
      { marginTop: Constants.statusBarHeight },
      tw`flex h-full justify-center items-center bg-slate-100`,
    ]}>
      <View tyle={tw`w-3/4 h-70 rounded-xl bg-white dark:bg:gray-800 shadow-md p-3 flex`}>
        <View style={tw`flex flex-row items-center`}>

        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  cardIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#34434D",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  titulo: {
    fontSize: 42,
    color: "#34434D",
    fontWeight: "bold",
    alignSelf: "center",
  },
  textContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  cerrar: {
    color: "red",
  },
});
export default Cuenta;
