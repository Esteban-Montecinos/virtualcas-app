import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import tw from "twrnc";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { app } from "../../../firebase/firebaseconfig";
import {
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
const firestore = getFirestore(app);

const Comida = ({ route }) => {
  const { usuario, email } = route.params;
  const [comidaMes, setComidaMes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  async function getComidasMes(rutEmpresa) {
    const docuRef = doc(firestore, `FoodSemanal/${rutEmpresa}`);
    const consulta = await getDoc(docuRef);
    if (consulta.exists()) {
      //si existen datos
      setComidaMes(consulta.data());
    }
  }
  useEffect(() => {
    getComidasMes(usuario.Empresa);
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getComidasMes(usuario.Empresa);
    setRefreshing(false);
  };
  var count = 0
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
              
              {comidaMes.ComidaMes.sem1 ? (
                <>
                  <View
                    style={tw`flex px-4 py-2 mt-1 mb-2 mx-2 w-90 items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  >
                    <Text
                      style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
                    >
                      Primera semana
                    </Text>
                  </View>
                </>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem1.Lunes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Lunes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem1.Lunes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem1.Lunes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem1.Martes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Martes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem1.Martes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem1.Martes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem1.Miercoles ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Miercoles</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem1.Miercoles.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem1.Miercoles[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem1.Jueves ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Jueves</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem1.Jueves.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem1.Jueves[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem1.Viernes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Viernes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem1.Viernes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem1.Viernes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem1.Sabado ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Sabado</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem1.Sabado.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem1.Sabado[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem1.Domingo ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Domingo</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem1.Domingo.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem1.Domingo[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem2 ? (
                <>
                  <View
                    style={tw`flex px-4 py-2 mt-1 mb-2 mx-2 w-90 items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  >
                    <Text
                      style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
                    >
                      Segunda semana
                    </Text>
                  </View>
                </>
              ) : (
                <Text></Text>
              )}
              {comidaMes.ComidaMes.sem2.Lunes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Lunes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem2.Lunes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem2.Lunes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem2.Martes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Martes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem2.Martes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem2.Martes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem2.Miercoles ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Miercoles</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem2.Miercoles.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem2.Miercoles[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem2.Jueves ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Jueves</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem2.Jueves.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem2.Jueves[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem2.Viernes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Viernes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem2.Viernes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem2.Viernes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem2.Sabado ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Sabado</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem2.Sabado.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem2.Sabado[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem2.Domingo ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Domingo</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem2.Domingo.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem2.Domingo[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem2 ? (
                <>
                  <View
                    style={tw`flex px-4 py-2 mt-1 mb-2 mx-2 w-90 items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  >
                    <Text
                      style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
                    >
                      Tercera semana
                    </Text>
                  </View>
                </>
              ) : (
                <Text></Text>
              )}
              {comidaMes.ComidaMes.sem3.Lunes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Lunes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem3.Lunes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem3.Lunes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem3.Martes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Martes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem3.Martes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem3.Martes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem3.Miercoles ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Miercoles</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem3.Miercoles.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem3.Miercoles[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem3.Jueves ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Jueves</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem3.Jueves.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem3.Jueves[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem3.Viernes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Viernes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem3.Viernes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem3.Viernes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem3.Sabado ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Sabado</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem3.Sabado.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem3.Sabado[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem3.Domingo ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Domingo</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem3.Domingo.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem3.Domingo[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem4 ? (
                <>
                  <View
                    style={tw`flex px-4 py-2 mt-1 mb-2 mx-2 w-90 items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  >
                    <Text
                      style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
                    >
                      Cuarta semana
                    </Text>
                  </View>
                </>
              ) : (
                <Text></Text>
              )}
              {comidaMes.ComidaMes.sem4.Lunes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Lunes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem4.Lunes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem4.Lunes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem4.Martes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Martes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem4.Martes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem4.Martes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem4.Miercoles ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Miercoles</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem4.Miercoles.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem4.Miercoles[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem4.Jueves ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Jueves</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem4.Jueves.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem4.Jueves[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem4.Viernes ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Viernes</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem4.Viernes.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem4.Viernes[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem4.Sabado ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Sabado</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem4.Sabado.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem4.Sabado[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {comidaMes.ComidaMes.sem4.Domingo ? (
                <View
                  style={tw`px-4 py-1 mb-1 mx-2 flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <View style={tw`items-center`}>
                    <Text style={tw`font-normal text-xl`}>Domingo</Text>
                  </View>
                  <View style={tw`flex`}>
                    {comidaMes.ComidaMes.sem4.Domingo.map((Comida, index) => {
                      if (index >= 0 && index % 2 == 0) {
                        let i = index + 1;
                        return (
                          <View key={count++} style={tw`flex-row justify-between`}>                         
                            <Text style={tw`font-normal text-lg`}>
                              {Comida} 
                            </Text>
                            <Text style={tw`font-normal text-lg`}>
                              Calorias: {comidaMes.ComidaMes.sem4.Domingo[i]}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <></>
              )}
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
