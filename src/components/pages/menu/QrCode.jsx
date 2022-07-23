import React from "react";
import Constants from "expo-constants";
import { Text, View, StyleSheet } from "react-native";
import tw from "twrnc";
import QRCode from "react-native-qrcode-svg";

const QrCode = ({ route }) => {
  const { usuario, email } = route.params;
  const qrUsuario = email + " " + usuario.Empresa + " Código-QR";
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
            style={tw`mb-4 uppercase  text-2xl font-bold tracking-tight text-gray-700 dark:text-white`}
          >
          ticket código QR
          </Text>
          <QRCode value={qrUsuario} size={200}/>
          <Text
            style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
          >
            Muestra este código QR en el casino para canjear tu ticket
          </Text>
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
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#34434D",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    margin: 5,
  },
});
export default QrCode;
