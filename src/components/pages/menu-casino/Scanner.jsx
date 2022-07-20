import React, { useState, useEffect } from "react";
import { View, Text, Button, Vibration, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import ButtonGradient from "../../styleButton/ButtonGradient";
import { app } from "../../../firebase/firebaseconfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import tw from "twrnc";
const firestore = getFirestore(app);

const Scanner = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { usuario, email } = route.params;
  const nombreDelDiaSegunFecha = (dia) =>
    [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ][dia.getDay()];

  async function trabajadorScaneado(emailTrabajador) {
    try {
      const docuRef = doc(firestore, `Users/${emailTrabajador}`);
      const consulta = await getDoc(docuRef);
      if (consulta.exists()) {
        //si existen datos
        const infoDocu = consulta.data();

        if (infoDocu.Estado == "Habilitado") {
          const dia = new Date();
          const nombreDia = nombreDelDiaSegunFecha(dia);
          Alert.alert("Hoy", "Dia actual " + nombreDia);
          console.log("Nombre : ", infoDocu);
        } else {
          Vibration.vibrate(1500);
          Alert.alert("Error", "Usuario deshabilitado");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let datoTrabajadorScaneado = data.split(" ");
    trabajadorScaneado(datoTrabajadorScaneado[0]);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
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
        <Text
          style={tw`mb-2 uppercase  text-2xl font-bold tracking-tight text-gray-500 dark:text-white`}
        >
          VirtualCas
        </Text>
        <View style={tw`items-center justify-center`}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={tw`w-100 h-100`}
          />
          {scanned && (
            <ButtonGradient
              text="Toque para escanear de nuevo"
              onPress={() => setScanned(false)}
            />
          )}
        </View>
      </View>
    </View>
  );
};
export default Scanner;
