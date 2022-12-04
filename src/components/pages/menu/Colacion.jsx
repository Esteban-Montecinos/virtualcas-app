import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { usePreventScreenCapture } from "expo-screen-capture";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import QRCode from "react-native-qrcode-svg";
import { app } from "../../../firebase/firebaseconfig";
import { doc, getDocs, collection, getFirestore } from "firebase/firestore";
const firestore = getFirestore(app);

const Colacion = ({ route }) => {
  const { usuario, email } = route.params;
  const [trabajadorColacion, setTrabajadorColacion] = useState(false);
  const ColacionCollection = collection(firestore, "Colacion");

  const getColacion = async () => {
    const data = await getDocs(ColacionCollection);

    var variable = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    var trabajador = variable.filter(
      (objeto) => objeto.Empresa == usuario.Empresa
    );

    const dia = new Date();
    var diaActual = dia.getDate();
    var mesActual = dia.getUTCMonth() + 1;
    var anoActual = dia.getFullYear();
    let fechaActual = diaActual + "-" + mesActual + "-" + anoActual;
    let colacionTrabajadorHoy = "";
    colacionTrabajadorHoy = trabajador.filter(
      (objeto) => objeto.Trabajador === email && objeto.Fecha === fechaActual
    );

    if (
      colacionTrabajadorHoy[0] &&
      colacionTrabajadorHoy[0].Hora >= dia.getHours()
    ) {
      setTrabajadorColacion(colacionTrabajadorHoy[0]);
    }
  };
  useEffect(() => {
    getColacion();
  }, []);

  const qrUsuario = usuario.Empresa + "=" + email + "=Colacion";
  return (
    <View
      style={[
        { marginTop: Constants.statusBarHeight },
        tw`flex h-full justify-center items-center bg-slate-100`,
      ]}
    >
      {trabajadorColacion ? (
        <View
          style={tw`max-w-90 min-w-80 rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6`}
        >
          <View style={tw`items-center justify-center`}>
            <Text
              style={tw`mb-4 uppercase  text-2xl font-bold tracking-tight text-gray-700 dark:text-white`}
            >
              Ticket de colacion
            </Text>
            <QRCode value={qrUsuario} size={200} />
            <Text
              style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
            >
              Muestra este código QR en el casino para canjear tu ticket de
              colacion.
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={tw`max-w-90 min-w-80 rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6`}
        >
          <View style={tw`items-center justify-center`}>
            <Text
              style={tw`mb-4 uppercase  text-2xl font-bold tracking-tight text-gray-700 dark:text-white`}
            >
              Sin ticket de colacion
            </Text>
            <Ionicons name="sad-outline" size={150} color="black" />
            <Text
              style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
            >
              Si necesitas un ticket de colacion, comunicate con el
              administrador de tu empresa.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Colacion;
