import React, { useState, useEffect } from "react";
import { usePreventScreenCapture } from "expo-screen-capture";
import Constants from "expo-constants";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import tw from "twrnc";
import QRCode from "react-native-qrcode-svg";
import { app } from "../../../firebase/firebaseconfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
const firestore = getFirestore(app);

const QrCode = ({ route }) => {
  const { usuario, email } = route.params;
  const [comidaMes, setComidaMes] = useState([]);
  const [comidaDia, setComidaDia] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  async function getComidasMes(rutEmpresa) {
    const docuRef = doc(firestore, `FoodSemanal/${rutEmpresa}`);
    const consulta = await getDoc(docuRef);
    if (consulta.exists()) {
      //si existen datos
      setComidaMes(consulta.data());
    }
  }
  var count = 0;
  useEffect(() => {
    getComidasMes(usuario.Empresa);
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getComidasMes(usuario.Empresa);
    setRefreshing(false);
  };
  function getComida(comida) {
    comida.map((Comida, index) => {
      if (index >= 0 && index % 2 == 0) {
        let i = index + 1;
        return (
          <Text key={count++} style={tw`font-normal text-lg`}>
            {Comida} con: {comida[i]} calorias.
          </Text>
        );
      } else {
        <Text style={tw`font-normal text-lg`}>Hoy no hay comida</Text>;
      }
    });
  }
  const qrUsuario = email + " " + usuario.Empresa + " Código-QR ";
  /*usePreventScreenCapture();*/

  const nombreDelDiaSegunFecha = (dia) =>
    ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"][
      dia.getDay()
    ];
  const dia = new Date();
  const nombreDia = nombreDelDiaSegunFecha(dia);

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
          <QRCode value={qrUsuario} size={200} />
          <Text
            style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
          >
            Muestra este código QR en el casino para canjear tu ticket.
          </Text>
          <View style={tw`h-30`}>
            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {nombreDia == "Lunes" ? (
                <Text
                  style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
                >
                  La comida de hoy es{" "}
                  {comidaMes?.ComidaMes?.sem1?.Lunes?.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <Text key={count++} style={tw`font-normal text-lg`}>
                          {Comida} con: {comidaMes?.ComidaMes?.sem1?.Lunes[i]}{" "}
                          calorias.
                        </Text>
                      );
                    } else {
                      <Text style={tw`font-normal text-lg`}>
                        Hoy no hay comida
                      </Text>;
                    }
                  })}
                </Text>
              ) : nombreDia == "Martes" ? (
                <Text
                  style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
                >
                  La comida de hoy es{" "}
                  {comidaMes?.ComidaMes?.sem1?.Martes?.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>
                            {Comida} con:{" "}
                            {comidaMes?.ComidaMes?.sem1?.Martes[i]} calorias.
                          </Text>
                        </View>
                      );
                    } else {
                      <View style={tw`flex-row justify-between`}>
                        <Text style={tw`font-normal text-lg`}>
                          Hoy no hay comida
                        </Text>
                      </View>;
                    }
                  })}
                </Text>
              ) : nombreDia == "Miercoles" ? (
                <Text
                  style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
                >
                  La comida de hoy es{" "}
                  {comidaMes?.ComidaMes?.sem1?.Miercoles?.map(
                    (Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View
                            key={count++}
                            style={tw`flex-row justify-between`}
                          >
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} con:{" "}
                              {comidaMes?.ComidaMes?.sem1?.Miercoles[i]}{" "}
                              calorias.
                            </Text>
                          </View>
                        );
                      } else {
                        <View style={tw`flex-row justify-between`}>
                          <Text style={tw`font-normal text-lg`}>
                            Hoy no hay comida
                          </Text>
                        </View>;
                      }
                    }
                  )}
                </Text>
              ) : nombreDia == "Jueves" ? (
                <Text
                  style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
                >
                  La comida de hoy es{" "}
                  {comidaMes?.ComidaMes?.sem1?.Jueves?.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>
                            {Comida} con:{" "}
                            {comidaMes?.ComidaMes?.sem1?.Jueves[i]} calorias.
                          </Text>
                        </View>
                      );
                    } else {
                      <View style={tw`flex-row justify-between`}>
                        <Text style={tw`font-normal text-lg`}>
                          Hoy no hay comida
                        </Text>
                      </View>;
                    }
                  })}
                </Text>
              ) : nombreDia == "Viernes" ? (
                <Text
                  style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
                >
                  La comida de hoy es{" "}
                  {comidaMes?.ComidaMes?.sem1?.Viernes?.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <Text key={count++} style={tw`font-normal text-lg`}>
                          {Comida} con: {comidaMes?.ComidaMes?.sem1?.Viernes[i]}{" "}
                          calorias{" "}
                        </Text>
                      );
                    } else {
                      <Text style={tw`font-normal text-lg`}>
                        Hoy no hay comida
                      </Text>;
                    }
                  })}
                </Text>
              ) : nombreDia == "Sabado" ? (
                <Text
                  style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
                >
                  La comida de hoy es{" "}
                  {comidaMes?.ComidaMes?.sem1?.Sabado?.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <Text key={count++} style={tw`font-normal text-lg`}>
                          {Comida} con: {comidaMes?.ComidaMes?.sem1?.Sabado[i]}{" "}
                          calorias.
                        </Text>
                      );
                    } else {
                      <Text style={tw`font-normal text-lg`}>
                        Hoy no hay comida
                      </Text>;
                    }
                  })}
                </Text>
              ) : nombreDia == "Domingo" ? (
                <Text
                  style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
                >
                  La comida de hoy es{" "}
                  {comidaMes?.ComidaMes?.sem1?.Domingo?.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <Text key={count++} style={tw`font-normal text-lg`}>
                          {Comida} con: {comidaMes?.ComidaMes?.sem1?.Domingo[i]}{" "}
                          calorias.
                        </Text>
                      );
                    } else {
                      <Text style={tw`font-normal text-lg`}>
                        Hoy no hay comida
                      </Text>;
                    }
                  })}
                </Text>
              ) : (
                <></>
              )}
            </ScrollView>
          </View>
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
