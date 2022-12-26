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
  const [refreshing, setRefreshing] = useState(false);
  async function getComidasMes(rutEmpresa,resultado,dia) {
    const docuRef = doc(firestore, `FoodSemanal/${rutEmpresa}`);
    const consulta = await getDoc(docuRef);
    if (consulta.exists()) {
      //si existen datos
      if(nombreDelDiaSegunFecha(dia) == "Lunes"){
        if (resultado % 4 == 1) {
          setComidaMes(consulta.data()?.ComidaMes?.sem1?.Lunes);
        } else if (resultado % 4 == 2) {
          setComidaMes(consulta.data()?.ComidaMes?.sem2?.Lunes);
        } else if (resultado % 4 == 3) {
          setComidaMes(consulta.data()?.ComidaMes?.sem3?.Lunes);
        } else if (resultado % 4 == 0) {
          setComidaMes(consulta.data()?.ComidaMes?.sem4?.Lunes);
        }
      }else if(nombreDelDiaSegunFecha(dia) == "Martes"){
        if (resultado % 4 == 1) {
          setComidaMes(consulta.data()?.ComidaMes?.sem1?.Martes);
        } else if (resultado % 4 == 2) {
          setComidaMes(consulta.data()?.ComidaMes?.sem2?.Martes);
        } else if (resultado % 4 == 3) {
          setComidaMes(consulta.data()?.ComidaMes?.sem3?.Martes);
        } else if (resultado % 4 == 0) {
          setComidaMes(consulta.data()?.ComidaMes?.sem4?.Martes);
        }
      }else if(nombreDelDiaSegunFecha(dia) == "Miercoles"){
        if (resultado % 4 == 1) {
          setComidaMes(consulta.data()?.ComidaMes?.sem1?.Miercoles);
        } else if (resultado % 4 == 2) {
          setComidaMes(consulta.data()?.ComidaMes?.sem2?.Miercoles);
        } else if (resultado % 4 == 3) {
          setComidaMes(consulta.data()?.ComidaMes?.sem3?.Miercoles);
        } else if (resultado % 4 == 0) {
          setComidaMes(consulta.data()?.ComidaMes?.sem4?.Miercoles);
        }
      }else if(nombreDelDiaSegunFecha(dia) == "Jueves"){
        if (resultado % 4 == 1) {
          setComidaMes(consulta.data()?.ComidaMes?.sem1?.Jueves);
        } else if (resultado % 4 == 2) {
          setComidaMes(consulta.data()?.ComidaMes?.sem2?.Jueves);
        } else if (resultado % 4 == 3) {
          setComidaMes(consulta.data()?.ComidaMes?.sem3?.Jueves);
        } else if (resultado % 4 == 0) {
          setComidaMes(consulta.data()?.ComidaMes?.sem4?.Jueves);
        }
      }else if(nombreDelDiaSegunFecha(dia) == "Viernes"){
        if (resultado % 4 == 1) {
          setComidaMes(consulta.data()?.ComidaMes?.sem1?.Viernes);
        } else if (resultado % 4 == 2) {
          setComidaMes(consulta.data()?.ComidaMes?.sem2?.Viernes);
        } else if (resultado % 4 == 3) {
          setComidaMes(consulta.data()?.ComidaMes?.sem3?.Viernes);
        } else if (resultado % 4 == 0) {
          setComidaMes(consulta.data()?.ComidaMes?.sem4?.Viernes);
        }
      }else if(nombreDelDiaSegunFecha(dia) == "Sabado"){
        if (resultado % 4 == 1) {
          setComidaMes(consulta.data()?.ComidaMes?.sem1?.Sabado);
        } else if (resultado % 4 == 2) {
          setComidaMes(consulta.data()?.ComidaMes?.sem2?.Sabado);
        } else if (resultado % 4 == 3) {
          setComidaMes(consulta.data()?.ComidaMes?.sem3?.Sabado);
        } else if (resultado % 4 == 0) {
          setComidaMes(consulta.data()?.ComidaMes?.sem4?.Sabado);
        }
      }else if(nombreDelDiaSegunFecha(dia) == "Domingo"){
        if (resultado % 4 == 1) {
          setComidaMes(consulta.data()?.ComidaMes?.sem1?.Domingo);
        } else if (resultado % 4 == 2) {
          setComidaMes(consulta.data()?.ComidaMes?.sem2?.Domingo);
        } else if (resultado % 4 == 3) {
          setComidaMes(consulta.data()?.ComidaMes?.sem3?.Domingo);
        } else if (resultado % 4 == 0) {
          setComidaMes(consulta.data()?.ComidaMes?.sem4?.Domingo);
        }
      }
    }
  }
  var count = 0;
  useEffect(() => {
    getComidasMes(usuario.Empresa,result
      ,dia);
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getComidasMes(usuario.Empresa,result
      ,dia);
    setRefreshing(false);
  };

  const qrUsuario = usuario.Empresa + "=" + email + "=Código-QR";
  /*usePreventScreenCapture();*/

  const nombreDelDiaSegunFecha = (dia) =>
    ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"][
      dia.getDay()
    ];
  const dia = new Date();
  const nombreDia = nombreDelDiaSegunFecha(dia);
  var oneJan = new Date(dia.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((dia - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((dia.getDay() + 1 + numberOfDays) / 7);
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
              {comidaMes ? (
                <><Text
                  style={tw`mt-4 font-normal text-lg text-gray-700 text-center dark:text-gray-400`}
                >
                  La comida de hoy es:
                </Text>
                {comidaMes?.map((Comida, index) => {
                  if (index >= 0 && index % 3 == 0) {
                    let i = index + 1;
                    return (
                      <Text key={count++} style={tw`font-normal text-lg`}>
                        {Comida} con: {comidaMes?.[i]}{" "}
                        calorias.
                      </Text>
                    );
                  } else {
                    <Text style={tw`font-normal text-lg`}>
                      Hoy no hay comida
                    </Text>;
                  }
                })}</>
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
