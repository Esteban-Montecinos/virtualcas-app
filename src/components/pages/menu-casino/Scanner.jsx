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
  const [emailTrabajadorActual, setEmailTrabajadorActual] = useState(false);
  const TicketCollection = collection(firestore, "Ticket");

  const getTickets = async () => {
    const data = await getDocs(TicketCollection);

    var variable = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setTrabajadorTicket(
      variable.filter((objeto) => objeto.Empresa == usuario.Empresa)
    );
  };
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    getTickets();
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
          switch (nombreDia) {
            case "Lunes":
              //en caso de que sea horario nocturno que termina de un dia anterior
              if (
                trabajador.Horario.Domingo &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Domingo[3] == "Lunes"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Domingo[4],
                  trabajador.Horario.Domingo[5],
                  0
                );
                let horainicioTrabajador = new Date().setHours(0, 0, 0);
                if (
                  horaActual > horainicioTrabajador &&
                  horaActual < horaTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horainicioTrabajador &&
                    horaTrabajadorRegistrado < horaTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario diurno que termina el mismo dia
              if (
                trabajador.Horario.Lunes &&
                trabajador.TipoH == "Diurno" &&
                trabajador.Horario.Lunes[0] == "Lunes" &&
                trabajador.Horario.Lunes[3] == "Lunes"
              ) {
                let horaInicioTrabajador = new Date().setHours(
                  trabajador.Horario.Lunes[1],
                  trabajador.Horario.Lunes[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(
                  trabajador.Horario.Lunes[4],
                  trabajador.Horario.Lunes[5],
                  0
                );
                if (
                  horaActual > horaInicioTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
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
                      Dia:nombreDia
                    });
                    setIsModalOpen(!isModalOpen);
                  }
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario nocturno que termina el mismo dia
              if (
                trabajador.Horario.Lunes &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Lunes[0] == "Lunes"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Lunes[1],
                  trabajador.Horario.Lunes[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(23, 59, 59);

                if (
                  horaActual > horaTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horaTrabajador &&
                    horaTrabajadorRegistrado < horaFinTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              if (noAplica) {
                Vibration.vibrate(1500);
                Alert.alert("No aplica", "Usuario no aplica colasion aún");
                noAplica = false;
              }
              break;
            case "Martes":
              //en caso de que sea horario nocturno que termina de un dia anterior
              if (
                trabajador.Horario.Lunes &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Lunes[3] == "Martes"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Lunes[4],
                  trabajador.Horario.Lunes[5],
                  0
                );
                let horainicioTrabajador = new Date().setHours(0, 0, 0);
                if (
                  horaActual > horainicioTrabajador &&
                  horaActual < horaTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horainicioTrabajador &&
                    horaTrabajadorRegistrado < horaTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario diurno que termina el mismo dia
              if (
                trabajador.Horario.Martes &&
                trabajador.TipoH == "Diurno" &&
                trabajador.Horario.Martes[0] == "Martes" &&
                trabajador.Horario.Martes[3] == "Martes"
              ) {
                let horaInicioTrabajador = new Date().setHours(
                  trabajador.Horario.Martes[1],
                  trabajador.Horario.Martes[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(
                  trabajador.Horario.Martes[4],
                  trabajador.Horario.Martes[5],
                  0
                );
                if (
                  horaActual > horaInicioTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
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
                      Dia:nombreDia
                    });
                    setIsModalOpen(!isModalOpen);
                  }
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario nocturno que termina el mismo dia
              if (
                trabajador.Horario.Martes &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Martes[0] == "Martes"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Martes[1],
                  trabajador.Horario.Martes[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(23, 59, 59);

                if (
                  horaActual > horaTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horaTrabajador &&
                    horaTrabajadorRegistrado < horaFinTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              if (noAplica) {
                Vibration.vibrate(1500);
                Alert.alert("No aplica", "Usuario no aplica colasion aún");
                noAplica = false;
              }
              break;
            case "Miercoles":
              //en caso de que sea horario nocturno que termina de un dia anterior
              if (
                trabajador.Horario.Martes &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Martes[3] == "Miercoles"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Martes[4],
                  trabajador.Horario.Martes[5],
                  0
                );
                let horainicioTrabajador = new Date().setHours(0, 0, 0);
                if (
                  horaActual > horainicioTrabajador &&
                  horaActual < horaTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horainicioTrabajador &&
                    horaTrabajadorRegistrado < horaTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario diurno que termina el mismo dia
              if (
                trabajador.Horario.Miercoles &&
                trabajador.TipoH == "Diurno" &&
                trabajador.Horario.Miercoles[0] == "Miercoles" &&
                trabajador.Horario.Miercoles[3] == "Miercoles"
              ) {
                let horaInicioTrabajador = new Date().setHours(
                  trabajador.Horario.Miercoles[1],
                  trabajador.Horario.Miercoles[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(
                  trabajador.Horario.Miercoles[4],
                  trabajador.Horario.Miercoles[5],
                  0
                );
                if (
                  horaActual > horaInicioTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
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
                      Dia:nombreDia
                    });
                    setIsModalOpen(!isModalOpen);
                  }
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario nocturno que termina el mismo dia
              if (
                trabajador.Horario.Miercoles &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Miercoles[0] == "Miercoles"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Miercoles[1],
                  trabajador.Horario.Miercoles[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(23, 59, 59);

                if (
                  horaActual > horaTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horaTrabajador &&
                    horaTrabajadorRegistrado < horaFinTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              if (noAplica) {
                Vibration.vibrate(1500);
                Alert.alert("No aplica", "Usuario no aplica colasion aún");
                noAplica = false;
              }
              break;
            case "Jueves":
              //en caso de que sea horario nocturno que termina de un dia anterior
              if (
                trabajador.Horario.Miercoles &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Miercoles[3] == "Jueves"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Miercoles[4],
                  trabajador.Horario.Miercoles[5],
                  0
                );
                let horainicioTrabajador = new Date().setHours(0, 0, 0);
                if (
                  horaActual > horainicioTrabajador &&
                  horaActual < horaTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horainicioTrabajador &&
                    horaTrabajadorRegistrado < horaTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario diurno que termina el mismo dia
              if (
                trabajador.Horario.Jueves &&
                trabajador.TipoH == "Diurno" &&
                trabajador.Horario.Jueves[0] == "Jueves" &&
                trabajador.Horario.Jueves[3] == "Jueves"
              ) {
                let horaInicioTrabajador = new Date().setHours(
                  trabajador.Horario.Jueves[1],
                  trabajador.Horario.Jueves[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(
                  trabajador.Horario.Jueves[4],
                  trabajador.Horario.Jueves[5],
                  0
                );
                if (
                  horaActual > horaInicioTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
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
                      Dia:nombreDia
                    });
                    setIsModalOpen(!isModalOpen);
                  }
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario nocturno que termina el mismo dia
              if (
                trabajador.Horario.Jueves &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Jueves[0] == "Jueves"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Jueves[1],
                  trabajador.Horario.Jueves[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(23, 59, 59);

                if (
                  horaActual > horaTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horaTrabajador &&
                    horaTrabajadorRegistrado < horaFinTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              if (noAplica) {
                Vibration.vibrate(1500);
                Alert.alert("No aplica", "Usuario no aplica colasion aún");
                noAplica = false;
              }
              break;
            case "Viernes":
              //en caso de que sea horario nocturno que termina de un dia anterior
              if (
                trabajador.Horario.Jueves &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Jueves[3] == "Viernes"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Jueves[4],
                  trabajador.Horario.Jueves[5],
                  0
                );
                let horainicioTrabajador = new Date().setHours(0, 0, 0);
                if (
                  horaActual > horainicioTrabajador &&
                  horaActual < horaTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horainicioTrabajador &&
                    horaTrabajadorRegistrado < horaTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario diurno que termina el mismo dia
              if (
                trabajador.Horario.Viernes &&
                trabajador.TipoH == "Diurno" &&
                trabajador.Horario.Viernes[0] == "Viernes" &&
                trabajador.Horario.Viernes[3] == "Viernes"
              ) {
                let horaInicioTrabajador = new Date().setHours(
                  trabajador.Horario.Viernes[1],
                  trabajador.Horario.Viernes[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(
                  trabajador.Horario.Viernes[4],
                  trabajador.Horario.Viernes[5],
                  0
                );
                if (
                  horaActual > horaInicioTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
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
                      Dia:nombreDia
                    });
                    setIsModalOpen(!isModalOpen);
                  }
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario nocturno que termina el mismo dia
              if (
                trabajador.Horario.Viernes &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Viernes[0] == "Viernes"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Viernes[1],
                  trabajador.Horario.Viernes[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(23, 59, 59);

                if (
                  horaActual > horaTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horaTrabajador &&
                    horaTrabajadorRegistrado < horaFinTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              if (noAplica) {
                Vibration.vibrate(1500);
                Alert.alert("No aplica", "Usuario no aplica colasion aún");
                noAplica = false;
              }
              break;
            case "Sabado":
              //en caso de que sea horario nocturno que termina de un dia anterior
              if (
                trabajador.Horario.Viernes &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Viernes[3] == "Sabado"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Viernes[4],
                  trabajador.Horario.Viernes[5],
                  0
                );
                let horainicioTrabajador = new Date().setHours(0, 0, 0);
                if (
                  horaActual > horainicioTrabajador &&
                  horaActual < horaTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horainicioTrabajador &&
                    horaTrabajadorRegistrado < horaTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario diurno que termina el mismo dia
              if (
                trabajador.Horario.Sabado &&
                trabajador.TipoH == "Diurno" &&
                trabajador.Horario.Sabado[0] == "Sabado" &&
                trabajador.Horario.Sabado[3] == "Sabado"
              ) {
                let horaInicioTrabajador = new Date().setHours(
                  trabajador.Horario.Sabado[1],
                  trabajador.Horario.Sabado[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(
                  trabajador.Horario.Sabado[4],
                  trabajador.Horario.Sabado[5],
                  0
                );
                if (
                  horaActual > horaInicioTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
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
                      Dia:nombreDia
                    });
                    setIsModalOpen(!isModalOpen);
                  }
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario nocturno que termina el mismo dia
              if (
                trabajador.Horario.Sabado &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Sabado[0] == "Sabado"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Sabado[1],
                  trabajador.Horario.Sabado[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(23, 59, 59);

                if (
                  horaActual > horaTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horaTrabajador &&
                    horaTrabajadorRegistrado < horaFinTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              if (noAplica) {
                Vibration.vibrate(1500);
                Alert.alert("No aplica", "Usuario no aplica colasion aún");
                noAplica = false;
              }
              break;
            case "Domingo":
              //en caso de que sea horario nocturno que termina de un dia anterior
              if (
                trabajador.Horario.Sabado &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Sabado[3] == "Domingo"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Sabado[4],
                  trabajador.Horario.Sabado[5],
                  0
                );
                let horainicioTrabajador = new Date().setHours(0, 0, 0);
                if (
                  horaActual > horainicioTrabajador &&
                  horaActual < horaTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horainicioTrabajador &&
                    horaTrabajadorRegistrado < horaTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario diurno que termina el mismo dia
              if (
                trabajador.Horario.Domingo &&
                trabajador.TipoH == "Diurno" &&
                trabajador.Horario.Domingo[0] == "Domingo" &&
                trabajador.Horario.Domingo[3] == "Domingo"
              ) {
                let horaInicioTrabajador = new Date().setHours(
                  trabajador.Horario.Domingo[1],
                  trabajador.Horario.Domingo[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(
                  trabajador.Horario.Domingo[4],
                  trabajador.Horario.Domingo[5],
                  0
                );
                if (
                  horaActual > horaInicioTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
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
                      Dia:nombreDia
                    });
                    setIsModalOpen(!isModalOpen);
                  }
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              //en caso de que sea horario nocturno que termina el mismo dia
              if (
                trabajador.Horario.Domingo &&
                trabajador.TipoH == "Nocturno" &&
                trabajador.Horario.Domingo[0] == "Domingo"
              ) {
                let horaTrabajador = new Date().setHours(
                  trabajador.Horario.Domingo[1],
                  trabajador.Horario.Domingo[2],
                  0
                );
                let horaFinTrabajador = new Date().setHours(23, 59, 59);

                if (
                  horaActual > horaTrabajador &&
                  horaActual < horaFinTrabajador
                ) {
                  let fechaActual =
                    diaActual + "-" + mesActual + "-" + anoActual;
                  let ticketTrabajadorHoy = trabajadorTicket.filter(
                    (objeto) =>
                      objeto.Trabajador === emailTrabajador &&
                      objeto.Fecha === fechaActual
                  );
                  let horaTrabajadorRegistrado = new Date().setHours(
                    ticketTrabajadorHoy?.Hora,
                    ticketTrabajadorHoy?.Minuto,
                    ticketTrabajadorHoy?.Segundo
                  );

                  if (
                    ticketTrabajadorHoy != "" &&
                    horaTrabajadorRegistrado > horaTrabajador &&
                    horaTrabajadorRegistrado < horaFinTrabajador
                  ) {
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
                } else {
                  noAplica = true;
                }
              }else {
                noAplica = true;
              }
              if (noAplica) {
                Vibration.vibrate(1500);
                Alert.alert("No aplica", "Usuario no aplica colasion aún");
                noAplica = false;
              }
              break;
          }
        } else {
          Vibration.vibrate(1500);
          Alert.alert(
            "Error",
            "Usuario deshabilitado o Empresa no corresponde"
          );
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
