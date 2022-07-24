import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { app } from "../../../firebase/firebaseconfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
const firestore = getFirestore(app);

const VerMovimientos = ({ route }) => {
  const [trabajadorMovimiento, setTrabajadorMovimiento] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { usuario, email } = route.params;
  const TicketCollection = collection(firestore, "Ticket");
  const getMovimiento = async (TicketC) => {
    const data = await getDocs(TicketC);

    var variable = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setTrabajadorMovimiento(variable.filter((objeto) => objeto.Trabajador === email));
  };
  useEffect(() => {
    getMovimiento(TicketCollection);
  }, []);
  const onRefresh = ()=>{
    const TicketCollectionActualizado = collection(firestore, "Ticket");
    setRefreshing(true);
    getMovimiento(TicketCollectionActualizado);
    setRefreshing(false);
  }
  return (
    <View
      style={[
        { marginTop: Constants.statusBarHeight },
        tw`flex h-full justify-center items-center bg-slate-100`,
      ]}
    >
      <View
        style={tw`flex p-4 mb-2 w-90 mt-12 items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-xl rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
      >
        <Text
          style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
        >
          Ver Movimientos
        </Text>
      </View>
      <ScrollView 
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        {trabajadorMovimiento != "" ?(trabajadorMovimiento.map((ticket, index) => 
          (<View
              key={index}
              style={tw`flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
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
          ):((<View
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
          ))
        }
      </ScrollView>
    </View>
  );
};

export default VerMovimientos;
