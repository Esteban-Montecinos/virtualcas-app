import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { app } from "../../../firebase/firebaseconfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import ButtonGradient from "../../styleButton/ButtonGradient";
import { Formik, useField } from "formik";
import { fechaValidationSchema } from "../../validationSchemas/fecha";
const firestore = getFirestore(app);

const currentDay = new Date();
const initialValues = {
  fechaInicio:
    currentDay.getDate() +
    "-" +
    (currentDay.getMonth() == 0
      ? currentDay.getMonth() + 1
      : currentDay.getMonth()) +
    "-" +
    currentDay.getFullYear(),
  fechaFin:
    currentDay.getDate() +
    "-" +
    (currentDay.getMonth() + 1) +
    "-" +
    currentDay.getFullYear(),
};

const FormikImputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <TextInput
        style={tw`flex-auto p-10px pl-15px mx-2 w-40 h-45px mt-2 border border-solid border-gray-300 rounded-[14px] bg-white`}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <Text style={tw`text-white`}> {meta.error}</Text>}
    </>
  );
};

const VerMovimientos = ({ route }) => {
  const [trabajadorMovimiento, setTrabajadorMovimiento] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltro, setIsFiltro] = useState(false);

  const { usuario, email } = route.params;
  const TicketCollection = collection(firestore, "Ticket");

  const getMovimiento = async (TicketC) => {
    const data = await getDocs(TicketC);

    var variable = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setTrabajadorMovimiento(
      variable.filter((objeto) => objeto.Trabajador === email)
    );
  };

  const filtroFecha = (inicio, fin) => {
    var fechaFintroInicio = new Date(
      inicio.split("-")[2],
      inicio.split("-")[1] - 1,
      inicio.split("-")[0]
    );
    var fechaFiltroFin = new Date(
      fin.split("-")[2],
      fin.split("-")[1] - 1,
      fin.split("-")[0]
    );
    if (trabajadorMovimiento) {
      let filtro = trabajadorMovimiento.filter(
        (filtro) =>
          new Date(
            filtro.Fecha.split("-")[2],
            filtro.Fecha.split("-")[1] - 1,
            filtro.Fecha.split("-")[0]
          ) >= fechaFintroInicio &&
          new Date(
            filtro.Fecha.split("-")[2],
            filtro.Fecha.split("-")[1] - 1,
            filtro.Fecha.split("-")[0]
          ) <= fechaFiltroFin
      );

      setIsFiltro(!isFiltro);
      setTrabajadorMovimiento(filtro);
    }
  };

  useEffect(() => {
    getMovimiento(TicketCollection);
  }, []);
  const onRefresh = () => {
    setIsFiltro(false)
    const TicketCollectionActualizado = collection(firestore, "Ticket");
    setRefreshing(true);
    getMovimiento(TicketCollectionActualizado);
    setRefreshing(false);
  };
  return (
    <>
      <View
        style={[
          { marginTop: Constants.statusBarHeight },
          tw`flex h-full justify-center items-center bg-slate-100`,
        ]}
      >
        <View
          style={tw`flex p-4 mb-2 w-90 mt-12 justify-center items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
        >
          <Text
            style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
          >
            Ver Movimientos
          </Text>
        </View>
        {trabajadorMovimiento != "" ? (
          <TouchableOpacity
            onPress={() => setIsModalOpen(!isModalOpen)}
            style={tw`flex-row p-2 mb-2 w-90 justify-center items-center text-sm text-gray-100 bg-violet-400 border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          >
            <Text
              style={tw`uppercase mr-2 text-base font-bold tracking-tight text-gray-100 dark:text-white`}
            >
              Filtro por fecha
            </Text>
            <Ionicons
              style={tw`text-gray-100`}
              name="filter"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {isFiltro? (
          <View style={tw`flex  mb-2 justify-center items-center text-gray-100 bg-gray-400 border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}>
          <Text style={tw`text-gray-100`}>
            Se encontraron {trabajadorMovimiento.length} movimientos que satisfacen el filtro.
          </Text>
          <TouchableOpacity
            onPress={() => {onRefresh(); setIsFiltro(!isFiltro)}}
            style={tw`flex-row  w-90 justify-center items-center text-sm font-medium `}
          >
            <Text
              style={tw`uppercase p-2 mr-2 text-sm font-bold tracking-tight text-gray-100 dark:text-white`}
            >
              Quitar filtro
            </Text>
            <Ionicons
              style={tw`text-gray-100`}
              name="close-circle"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        <ScrollView
          style={tw`flex mb-5`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {trabajadorMovimiento != "" ? (
            trabajadorMovimiento.map((ticket, index) => (
              <View
                key={index}
                style={tw`flex mx-2 mb-2 w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <View
                  style={tw`flex flex-row items-center w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600`}
                >
                  <View style={tw`px-4`}>
                    <Text style={tw`font-normal text-sm`}>{ticket.Fecha}</Text>
                    <Text style={tw`font-normal text-sm text-gray-700`}>
                      {ticket.Hora + ":" + ticket.Minuto + ":" + ticket.Segundo}
                    </Text>
                  </View>
                  <View style={tw`border-r-2  border-gray-400 py-4`} />
                  <View style={tw`px-2`}>
                    <Text style={tw`font-normal text-lg`}>{ticket.Dia}</Text>
                    <Text
                      style={tw`font-normal text-base text-gray-700 dark:text-gray-400`}
                    >
                      {ticket.TipoTicket}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View
              style={tw`flex w-90 text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            >
              <View
                style={tw`flex items-center w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600`}
              >
                <Ionicons name="qr-code-outline" size={150} color="black" />
                <Text style={tw`text-xl font-bold mb-2`}>
                  Aún no usas tu ticket
                </Text>
                <Text style={tw`font-normal mb-2`}>
                  Cuando utilices tu ticket se mostraran aqui.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <Modal visible={isModalOpen} transparent={true} animationType={"slide"}>
        <View style={tw`flex h-full justify-end `}>
          <View
            style={tw`flex items-center shadow-xl bg-slate-500 m-20px rounded-xl py-16px px-16px`}
          >
            <Formik
              validationSchema={fechaValidationSchema}
              initialValues={initialValues}
              onSubmit={(datos, { resetForm }) => {
                filtroFecha(datos.fechaInicio, datos.fechaFin);
                setIsModalOpen(!isModalOpen);
              }}
            >
              {({ handleSubmit }) => {
                return (
                  <>
                    <View style={tw`flex-row `}>
                      <Text style={tw`flex-auto mx-2 text-white`}>
                        Fecha Inicio
                      </Text>
                      <Text style={tw`flex-auto mx-2 text-white`}>
                        Fecha Fin
                      </Text>
                    </View>
                    <View style={tw`flex-row `}>
                      <FormikImputValue
                        placeholder="Fecha inicio"
                        name="fechaInicio"
                      />
                      <FormikImputValue
                        placeholder="Fecha final"
                        name="fechaFin"
                      />
                    </View>
                    <ButtonGradient text={"Filtrar"} onPress={handleSubmit} />
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default VerMovimientos;
