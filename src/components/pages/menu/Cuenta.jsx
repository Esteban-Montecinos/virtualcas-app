import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Constants from "expo-constants";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import bd from "../../../firebase/firebaseconfig";

const Cuenta = ({ route }) => {
  const navigation = useNavigation();
  const auth = getAuth(bd);
  const cerrarSesion = () => {
    signOut(auth);
    navigation.navigate("Login");
  };
  const { usuario, email } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi cuenta</Text>
      <View style={styles.cardIcon}>
        <Ionicons name="person-circle-outline" size={80} color="#000" />
        <View>
          <Text style={styles.label}>Nombre Apellido</Text>
          <Text styles={styles.text}>{usuario.NombreCompleto}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
          <Text style={styles.cerrar}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View styles={styles.textContainer}>
        <Text style={styles.label}>Nombre Apellido</Text>
        <Text styles={styles.text}>{usuario.NombreCompleto}</Text>
      </View>
      <View styles={styles.textContainer}>
        <Text style={styles.label}>Rut</Text>
        <Text styles={styles.text}>{usuario.Rut}</Text>
      </View>
      <View styles={styles.textContainer}>
        <Text style={styles.label}>Fecha ingreso</Text>
        <Text styles={styles.text}>{usuario.fecha}</Text>
      </View>
      <View styles={styles.textContainer}>
        <Text style={styles.label}>Telefono móvil</Text>
        <Text styles={styles.text}>{usuario.Fono}</Text>
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
