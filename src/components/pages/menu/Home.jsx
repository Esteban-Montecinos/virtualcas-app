import React from "react";
import { Text, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import bd from "../../../firebase/firebaseconfig";
import ButtonGradient from "../../styleButton/ButtonGradient";

const Home = () => {
  const auth = getAuth(bd);
  const cerrarSesion = () => {
    signOut(auth);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      
      <Text>hola</Text>

      <ButtonGradient text="cerrar" onPress={cerrarSesion} />
    </View>
  );
};

export default Home;
