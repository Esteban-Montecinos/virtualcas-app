import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
export default function ListaHorario({
  diaInicio,
  horaInicio,
  diaTermino,
  horaTermino,
}) {
  return (
    <View
      style={tw`flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
    >
      <View
        style={tw`flex flex-row items-center w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600`}
      >
        <View style={tw`px-4`}>
          <Text style={tw`font-normal text-sm`}>
            {horaInicio}
          </Text>
          <Text style={tw`font-normal text-sm text-gray-700`}>
            {horaTermino}
          </Text>
        </View>
        <View style={tw`border-r-2  border-gray-400 py-4`} />
        <View style={tw`px-2`}>
          <Text style={tw`font-normal text-lg`}>{diaInicio}</Text>
          <Text
            style={tw`font-normal text-base text-gray-700 dark:text-gray-400`}
          >
            {diaTermino}
          </Text>
        </View>
      </View>
    </View>
  );
}
