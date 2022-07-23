import { View, Text, TouchableOpacity } from "react-native";
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
  var ruta = "";
  if(usuario.Tipo === "Casino"){
    ruta = "MainCasino";
  }else{
    ruta = "Main";
  }
  return (
    <View
      style={[
        { marginTop: Constants.statusBarHeight },
        tw`flex h-full justify-center items-center bg-slate-100`,
      ]}
    >
      <View
        style={tw`max-w-90 min-w-80 rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6`}
      >
        <View style={tw`items-center justify-center`}>
        <Text
          style={tw`mb-2 uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
        >
          Mi cuenta
        </Text>
          <Ionicons name="person-circle-outline" size={80} color="#000" />
          <View>
            <Text style={tw`text-gray-800 uppercase dark:text-white font-bold`}>
              {usuario.NombreC}
            </Text>
            <Text style={tw`text-gray-500 uppercase font-bold`}>{email}</Text>
          </View>
        </View>
        <View style={tw`border-b border-gray-400 pt-2`} />
        <Text style={tw`text-gray-500 font-bold`}>Turno</Text>
        <Text styles={tw`font-normal text-lg text-gray-700 dark:text-gray-400`}>
          {usuario.TipoH}
        </Text>
        <View style={tw`border-b border-gray-400 pt-2`} />
        <Text style={tw`text-gray-500 font-bold`}>Rut</Text>
        <Text styles={tw`font-normal text-lg text-gray-700 dark:text-gray-400`}>
          {usuario.Rut}
        </Text>
        <View style={tw`border-b border-gray-400 pt-2`} />
        <Text style={tw`text-gray-500 font-bold`}>Fecha ingreso</Text>
        <Text styles={tw`font-normal text-lg text-gray-700 dark:text-gray-400`}>
          {usuario.fecha}
        </Text>
        <View style={tw`border-b border-gray-400 pt-2`} />
        <Text style={tw`text-gray-500 font-bold`}>Telefono móvil</Text>
        <Text styles={tw`font-normal text-lg text-gray-700 dark:text-gray-400`}>
          {usuario.Fono}
        </Text>
        <View style={tw`border-b border-gray-400 pt-2`} />
        <View style={tw`flex justify-center items-center`}>
          <TouchableOpacity style={tw`bg-slate-500 w-80 py-2 px-4 rounded mt-5`} onPress={() => navigation.navigate("Recover", {volver: ruta,email: email,usuario: usuario})}>
            <Text style={tw`text-white font-bold text-center`}>Cambiar contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-red-500 w-80 py-2 px-4 rounded mt-5`} onPress={cerrarSesion}>
            <Text style={tw`text-white font-bold text-center`}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cuenta