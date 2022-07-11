import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";



const Home = ({ route }) => {
  const navigation = useNavigation();
  const { usuario, email } = route.params;
  const handleToQRCode = ()=>{
    navigation.navigate("QrCode");
  }
  const handleToMovimiento = ()=>{
    navigation.navigate("VerMovimientos");
  }
  return (
    <View
      style={[
        { marginTop: Constants.statusBarHeight },
        tw`flex h-full justify-center items-center bg-slate-100`,
      ]}
    >
      <View
        style={tw`p-6 max-w-90 min-w-85 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`}
      >
        <Text
          style={tw`mb-2 uppercase  text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}
        >
          Nombre : {usuario.NombreC}
        </Text>
        <Text style={tw`font-normal text-lg text-gray-700 dark:text-gray-400`}>
          Empresa: {usuario.Nempresa}
        </Text>
        {usuario.Estado == "Habilitado" ? (
          <Text
            style={tw`font-normal text-lg text-green-700 dark:text-green-400`}
          >
            Estado: {usuario.Estado}
          </Text>
        ) : (
          <Text style={tw`font-normal text-lg text-red-700 dark:text-red-400`}>
            Estado: {usuario.Estado}
          </Text>
        )}
      </View>
      <View style={tw`flex-row`}>
        <TouchableOpacity style={tw`mx-5 rounded-br-lg rounded-bl-lg bg-violet-500 p-2`} onPress={handleToMovimiento}>
          <Text style={tw`text-base text-white`}
          ><Ionicons name="document-text-outline" size={16} color="white" />
           Ver movimientos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`mx-5 rounded-br-lg rounded-bl-lg bg-violet-500 p-2`} onPress={handleToQRCode}>
          <Text style={tw`text-base text-white`}
          ><Ionicons name="qr-code-outline" size={16} color="white" />
           Codigo QR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
