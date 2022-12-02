import React, { useState, useEffect } from "react";
import { View, Text, Vibration, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import ButtonGradient from "../../styleButton/ButtonGradient";
import { app } from "../../../firebase/firebaseconfig";
import {
  doc,
  getDoc,
  addDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import tw from "twrnc";
import ModalTrabajador from "./ModalTrabajador";
const firestore = getFirestore(app);

const Scanner = ({ route }) => {
  const { usuario, email } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trabajadorActual, setTrabajadorActual] = useState(false);
  const [horaActual, setHoraActual] = useState(new Date().getTime());
  const [trabajadorTicket, setTrabajadorTicket] = useState(false);
  const [trabajadorPorRUT, setTrabajadorPorRUT] = useState(false);
  const [emailTrabajadorActual, setEmailTrabajadorActual] = useState(false);
  const TicketsCollection = collection(firestore, "Ticket");
  const UsersCollection = collection(firestore, "Users");
  
  const getUsers = async () => {
    const data = await getDocs(UsersCollection);

    var variable = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setTrabajadorPorRUT(
      variable.filter((objeto) => objeto.Empresa == usuario.Empresa)
    );
  };
  const getTickets = async () => {
    const data = await getDocs(TicketsCollection);

    var variable = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setTrabajadorTicket(
      variable.filter((objeto) => objeto.Empresa == usuario.Empresa)
    );
  };
  useEffect(() => {
    getUsers();
    getTickets();
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [scanned]);
  const nombreDelDiaSegunFecha = (dia) =>
    ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"][
      dia.getDay()
    ];

  async function trabajadorScaneado(emailTrabajador, tipoT) {
    try {
      const docuRef = doc(firestore, `Users/${emailTrabajador}`);
      const consulta = await getDoc(docuRef);
      if (consulta.exists()) {
        //si existen datos
        const trabajador = consulta.data();
        setTrabajadorActual(trabajador);
        setEmailTrabajadorActual(emailTrabajador);
        if (
          trabajador.Estado === "Habilitado" &&
          trabajador.Empresa === usuario.Empresa
        ) {
          const dia = new Date();
          var diaActual = dia.getDate();
          var mesActual = dia.getUTCMonth() + 1;
          var anoActual = dia.getFullYear();
          const nombreDia = nombreDelDiaSegunFecha(dia);
          setHoraActual(new Date().getTime());
          var noAplica = false;
          let fechaActual =
          diaActual + "-" + mesActual + "-" + anoActual;

          let ticketTrabajadorHoy = trabajadorTicket.filter(
            (objeto) =>
              objeto.Trabajador === emailTrabajador &&
              objeto.Fecha === fechaActual
          );
          if (ticketTrabajadorHoy != "" ) {
            Alert.alert("Error", "Ticket ya utilizado");
          } else {
            addDoc(collection(firestore, "Ticket"), {
              Casino: email,
              Empresa: usuario.Empresa,
              Fecha: fechaActual,
              Hora: dia.getHours(),
              Minuto: dia.getMinutes(),
              Segundo: dia.getSeconds(),
              TipoTicket: tipoT,
              Trabajador: emailTrabajador,
              Dia:nombreDia
            });
            setIsModalOpen(!isModalOpen);
          }

        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let datoTrabajadorScaneado = data.split(" ");
    trabajadorScaneado(datoTrabajadorScaneado[0], datoTrabajadorScaneado[2]);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <>
      <View
        style={[
          { marginTop: Constants.statusBarHeight },
          tw`flex h-full justify-center items-center bg-slate-100`,
        ]}
      >
        <View
          style={tw`items-center max-w-90 min-w-80 rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6`}
        >
          <Text
            style={tw`mb-2 uppercase  text-2xl font-bold tracking-tight text-gray-500 dark:text-white`}
          >
            Escáner VirtualCas
          </Text>
          <Text
            style={tw`mb-2 uppercase  text-base font-bold tracking-tight text-gray-500 dark:text-white`}
          >
            {usuario.Nempresa}
          </Text>
          <View style={tw`items-center justify-center`}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={tw`w-100 h-100`}
            />
            {scanned && (
              <ButtonGradient
                text="Toque para escanear de nuevo"
                onPress={() => {
                  setScanned(false);
                  setHoraActual(new Date().getTime());
                }}
              />
            )}
          </View>
        </View>
      </View>
      <ModalTrabajador
        trabajador={trabajadorActual}
        emailTrabajador={emailTrabajadorActual}
        emailCasino={email}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
export default Scanner;
