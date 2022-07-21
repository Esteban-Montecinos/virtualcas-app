import React from "react";
import { Text, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import tw from "twrnc";

const VerMovimientos = ({ route }) => {
  const { usuario, email } = route.params;
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
          style={tw`uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
        >
          Ver Movimientos
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={tw`flex w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
        >
          <View
            style={tw`flex items-center w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600`}
          >
            <View style={tw`px-2`}>
              <Text style={tw`font-normal text-lg`}>
                Aun no hay movimientos
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VerMovimientos;
