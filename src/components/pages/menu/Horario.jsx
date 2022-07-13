import { View, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import React from "react";
import tw from "twrnc";
const Horario = ({ route }) => {
  const { usuario, email } = route.params;
  const turnoString = usuario.turno.toString();
  const arrayTurno = turnoString.split(" ");
  return (
    <View
      style={[
        { marginTop: Constants.statusBarHeight },
        tw`flex h-full justify-center items-center bg-slate-100`,
      ]}
    >
      <View
        style={tw`flex p-4 w-90 mt-12 items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
      >
        <Text
          style={tw`uppercase  text-xl font-bold tracking-tight text-gray-500 dark:text-white`}
        >
          Mi horario
        </Text>
      </View>
      <ScrollView>
        {usuario.Horario.map((item, index) =>
          index != 0 ? (
            <View
              key={item}
              style={tw`flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            >
              <View
                style={tw`flex flex-row items-center w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600`}
              >
                <View style={tw`px-4`}>
                  <Text style={tw`font-normal text-sm`}>{arrayTurno[1]}</Text>
                  <Text style={tw`font-normal text-sm text-gray-700`}>
                    {arrayTurno[3]}
                  </Text>
                </View>
                <View style={tw`border-r-2  border-gray-400 py-4`} />
                <View style={tw`px-2`}>
                  <Text style={tw`font-normal text-lg`}>{item}</Text>
                  <Text
                    style={tw`font-normal text-base text-gray-700 dark:text-gray-400`}
                  >
                    {" "}
                    {arrayTurno[0]}
                  </Text>
                </View>
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
};
export default Horario;
