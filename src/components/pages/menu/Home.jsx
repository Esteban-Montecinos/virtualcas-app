import React from "react";
import { Text, View } from "react-native";
import Constants  from 'expo-constants'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import bd from "../../../firebase/firebaseconfig";
import ButtonGradient from "../../styleButton/ButtonGradient";


const Home = () => {
  const navigation = useNavigation();
  const auth = getAuth(bd);
  const cerrarSesion = () => {
    signOut(auth);
    navigation.navigate('Login');
  };
  return (
    <View style={{marginTop: Constants.statusBarHeight}}>
      
      <Text>hola</Text>

      <ButtonGradient text="cerrar" onPress={cerrarSesion} />
    </View>
  );
};

export default Home;
