import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import tw from "twrnc";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { app } from "../../../firebase/firebaseconfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
const firestore = getFirestore(app);

const Comida = ({ route }) => {
  const { usuario, email } = route.params;
  const [comidaMes, setComidaMes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  async function getComidasMes(rutEmpresa, resultado, dia) {
    const docuRef = doc(firestore, `FoodSemanal/${rutEmpresa}`);
    const consulta = await getDoc(docuRef);
    
    if (consulta.exists()) {
      //si existen datos
      if (resultado % 4 == 1) {
        setComidaMes(consulta.data()?.ComidaMes?.sem1);
      } else if (resultado % 4 == 2) {
        setComidaMes(consulta.data()?.ComidaMes?.sem2);
      } else if (resultado % 4 == 3) {
        setComidaMes(consulta.data()?.ComidaMes?.sem3);
      } else if (resultado % 4 == 0) {
        setComidaMes(consulta.data()?.ComidaMes?.sem4);
      }
    }
  }
  var currentdate = new Date();
  var oneJan = new Date(currentdate.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
  useEffect(() => {
    getComidasMes(usuario.Empresa, (result
      + 1), currentdate);
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getComidasMes(usuario.Empresa, (result
      + 1), currentdate);
    setRefreshing(false);
  };
  var count = 0;
  return (
    <View
      style={[
        { marginTop: Constants.statusBarHeight },
        tw`flex h-full justify-center items-center bg-slate-100`,
      ]}
    >
      <View
        style={tw`flex p-4 mb-2 w-90 items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
      >
        <Text
          style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
        >
          Minuta comida
        </Text>
      </View>
      <View style={tw`h-100`}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {comidaMes != "" ? (
            <>
              <View
                style={tw`flex px-4 py-2 mt-1 mb-2 mx-2 w-90 items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <Text
                  style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
                >
                  Comida de la semana
                </Text>
              </View>
              {comidaMes.Lunes ? (
              <View
                style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <View style={tw`items-center`}>
                  <Text style={tw`font-normal text-xl`}>Lunes</Text>
                </View>
                <View style={tw`flex`}>
                  {comidaMes.Lunes.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>{Comida}</Text>
                          <Text style={tw`font-normal text-lg`}>
                            Calorias: {comidaMes.Lunes[i]}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </View>): <></>}
              {comidaMes.Martes ? (
              <View
                style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <View style={tw`items-center`}>
                  <Text style={tw`font-normal text-xl`}>Martes</Text>
                </View>
                <View style={tw`flex`}>
                  {comidaMes.Martes.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>{Comida}</Text>
                          <Text style={tw`font-normal text-lg`}>
                            Calorias: {comidaMes.Martes[i]}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </View>): <></>}
              {comidaMes.Miercoles ? (
              <View
                style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <View style={tw`items-center`}>
                  <Text style={tw`font-normal text-xl`}>Miercoles</Text>
                </View>
                <View style={tw`flex`}>
                  {comidaMes.Miercoles.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>{Comida}</Text>
                          <Text style={tw`font-normal text-lg`}>
                            Calorias: {comidaMes.Miercoles[i]}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </View>): <></>}
              {comidaMes.Jueves ? (
              <View
                style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <View style={tw`items-center`}>
                  <Text style={tw`font-normal text-xl`}>Jueves</Text>
                </View>
                <View style={tw`flex`}>
                  {comidaMes.Jueves.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>{Comida}</Text>
                          <Text style={tw`font-normal text-lg`}>
                            Calorias: {comidaMes.Jueves[i]}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </View>): <></>}
              {comidaMes.Viernes ? (
              <View
                style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <View style={tw`items-center`}>
                  <Text style={tw`font-normal text-xl`}>Viernes</Text>
                </View>
                <View style={tw`flex`}>
                  {comidaMes.Viernes.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>{Comida}</Text>
                          <Text style={tw`font-normal text-lg`}>
                            Calorias: {comidaMes.Viernes[i]}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </View>): <></>}
              {comidaMes.Sabado ? (
              <View
                style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <View style={tw`items-center`}>
                  <Text style={tw`font-normal text-xl`}>Sabado</Text>
                </View>
                <View style={tw`flex`}>
                  {comidaMes.Sabado.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>{Comida}</Text>
                          <Text style={tw`font-normal text-lg`}>
                            Calorias: {comidaMes.Sabado[i]}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </View>): <></>}
              {comidaMes.Domingo ? (
              <View
                style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <View style={tw`items-center`}>
                  <Text style={tw`font-normal text-xl`}>Domingo</Text>
                </View>
                <View style={tw`flex`}>
                  {comidaMes.Domingo.map((Comida, index) => {
                    if (index >= 0 && index % 2 == 0) {
                      let i = index + 1;
                      return (
                        <View
                          key={count++}
                          style={tw`flex-row justify-between`}
                        >
                          <Text style={tw`font-normal text-lg`}>{Comida}</Text>
                          <Text style={tw`font-normal text-lg`}>
                            Calorias: {comidaMes.Domingo[i]}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              </View>): <></>}
            </>
          ) : (
            <View
              style={tw`flex w-90 text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            >
              <View
                style={tw`flex items-center w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600`}
              >
                <Ionicons name="fast-food-outline" size={150} color="black" />
                <Text style={tw`text-xl font-bold mb-2`}>
                  Aun no hay minuta del mes
                </Text>
                <Text style={tw`font-normal mb-2`}>
                  aqui podras ver la minuta del mes.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Comida;
