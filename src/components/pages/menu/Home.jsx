import React from "react";
import { Text, View,StyleSheet } from "react-native";
import Constants  from 'expo-constants'


const Home = ({route}) => {
  const { usuario, email } = route.params;
  return (
    <View style={styles.container}>
      <View>
        <Text>Nombre Apellido: {usuario.NombreCompleto}</Text>
        <Text>Empresa: </Text>
        <Text>Puesto: {usuario.Puesto}</Text>
        <Text>Horario: {usuario.TipoH}</Text>
        <Text>Estado: {usuario.Estado}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text:{
    fontSize: 20,
    padding:5,
    marginBottom:5,
    textAlign: "center"
  }
});
export default Home;
