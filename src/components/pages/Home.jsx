import React from "react";
import { Text, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import bd from "../../firebase/firebaseconfig";
import ButtonGradient from "../styleButton/ButtonGradient";
import { useNavigate } from "react-router-native";

const Home = ({ usuario }) => {
  const auth = getAuth(bd);
  const navigate = useNavigate();
  const cerrarSesion = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>{usuario.Empresa}</Text>

      <ButtonGradient text="cerrar" onPress={cerrarSesion} />
    </View>
  );
};

export default Home;
