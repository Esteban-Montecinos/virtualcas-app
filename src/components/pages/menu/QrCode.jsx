import React from "react";
import Constants from "expo-constants";
import { Text, View, StyleSheet } from "react-native";

import QRCode from "react-native-qrcode-svg";

const QrCode = ({ route }) => {
  const { usuario, email } = route.params;
  const qrUsuario = usuario.Rut + " "+ usuario.Empresa;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Muestra este código QR en el casino para canjear tu ticket</Text>
      <QRCode value={qrUsuario} size={180} />
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
    fontSize: 24,
    color: "#34434D",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    margin: 5
  }
});
export default QrCode;
