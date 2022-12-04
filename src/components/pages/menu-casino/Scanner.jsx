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
  const [comidaMes, setComidaMes] = useState([]);
  const [trabajadorActual, setTrabajadorActual] = useState(false);
  const [trabajadorPorRUT, setTrabajadorPorRUT] = useState(false);
  const [trabajadorTicket, setTrabajadorTicket] = useState(false);
  const TicketsCollection = collection(firestore, "Ticket");
  const UsersCollection = collection(firestore, "Users");

  async function getComidasMes(rutEmpresa, resultado, dia) {
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
  var currentdate = new Date();
  var oneJan = new Date(currentdate.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
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
    getComidasMes(usuario.Empresa, result, currentdate);
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
    if (tipoT == "Código-QR") {
      try {
        const docuRef = doc(firestore, `Users/${emailTrabajador}`);
        const consulta = await getDoc(docuRef);
        if (consulta.exists()) {
          //si existen datos
          const trabajador = consulta.data();
          setTrabajadorActual(trabajador);
          if (
            trabajador.Estado === "Habilitado" &&
            trabajador.Empresa === usuario.Empresa
          ) {
            const dia = new Date();
            var diaActual = dia.getDate();
            var mesActual = dia.getUTCMonth() + 1;
            var anoActual = dia.getFullYear();
            const nombreDia = nombreDelDiaSegunFecha(dia);
            let fechaActual = diaActual + "-" + mesActual + "-" + anoActual;

            let ticketTrabajadorHoy = trabajadorTicket.filter(
              (objeto) =>
                objeto.Trabajador === emailTrabajador &&
                objeto.Fecha === fechaActual
            );
            if (ticketTrabajadorHoy != "") {
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
                Dia: nombreDia,
                Comida: comidaMes,
              });
              setIsModalOpen(!isModalOpen);
            }
          } else {
            Alert.alert("Error", "Usuario Deshabilitado o de otra empresa");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else if (tipoT == "CEDULA&serial") {
      let trabajador = emailTrabajador.split("&");
      let rutTrabajador = trabajador[0].split("-");
      rutTrabajador[0] = rutTrabajador[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      let rutFormateado = rutTrabajador[0] + "-" + rutTrabajador[1];

      let trabajadorRUT = trabajadorPorRUT.filter(
        (user) => user.Rut === rutFormateado
      );
      if (trabajadorRUT != "") {
        if (
          trabajadorRUT[0]?.Estado === "Habilitado" &&
          trabajadorRUT[0].Empresa === usuario.Empresa
        ) {
          setTrabajadorActual(trabajadorRUT[0]);
          const dia = new Date();
          var diaActual = dia.getDate();
          var mesActual = dia.getUTCMonth() + 1;
          var anoActual = dia.getFullYear();
          const nombreDia = nombreDelDiaSegunFecha(dia);
          let fechaActual = diaActual + "-" + mesActual + "-" + anoActual;

          let ticketTrabajadorHoy = trabajadorTicket.filter(
            (objeto) =>
              objeto.Trabajador === trabajadorRUT[0].id &&
              objeto.Fecha === fechaActual
          );
          if (ticketTrabajadorHoy != "") {
            Alert.alert("Error", "Ticket ya utilizado");
          } else {
            addDoc(collection(firestore, "Ticket"), {
              Casino: email,
              Empresa: usuario.Empresa,
              Fecha: fechaActual,
              Hora: dia.getHours(),
              Minuto: dia.getMinutes(),
              Segundo: dia.getSeconds(),
              TipoTicket: "Cédula",
              Trabajador: trabajadorRUT[0].id,
              Dia: nombreDia,
              Comida: comidaMes,
            });
            setIsModalOpen(!isModalOpen);
          }
        } else {
          Alert.alert("Error", "Usuario deshabilitado");
        }
      } else {
        Alert.alert("Error", "Usuario de otra empresa");
      }
    }else if (tipoT == "Colacion") {
      try {
        const docuRef = doc(firestore, `Users/${emailTrabajador}`);
        const consulta = await getDoc(docuRef);
        if (consulta.exists()) {
          //si existen datos
          const trabajador = consulta.data();
          setTrabajadorActual(trabajador);
          if (
            trabajador.Estado === "Habilitado" &&
            trabajador.Empresa === usuario.Empresa
          ) {
            const dia = new Date();
            var diaActual = dia.getDate();
            var mesActual = dia.getUTCMonth() + 1;
            var anoActual = dia.getFullYear();
            const nombreDia = nombreDelDiaSegunFecha(dia);
            let fechaActual = diaActual + "-" + mesActual + "-" + anoActual;

            let ticketTrabajadorHoy = trabajadorTicket.filter(
              (objeto) =>
                objeto.Trabajador === emailTrabajador &&
                objeto.Fecha === fechaActual && objeto.TipoTicket === "Colacion"
            );
            if (ticketTrabajadorHoy != "") {
              Alert.alert("Error", "Ticket de colacion ya utilizado");
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
                Dia: nombreDia,
              });
              setIsModalOpen(!isModalOpen);
            }
          } else {
            Alert.alert("Error", "Usuario Deshabilitado o de otra empresa");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let datoTrabajadorScaneado = data.split("=");
    trabajadorScaneado(datoTrabajadorScaneado[1], datoTrabajadorScaneado[2]);
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
                }}
              />
            )}
          </View>
        </View>
      </View>
      <ModalTrabajador
        trabajador={trabajadorActual}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
export default Scanner;
