import { View, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import React from "react";
import ListaHorario from "../../listaPersonalizada/ListaHorario";
import tw from "twrnc";
const Horario = ({ route }) => {
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
          Mi horario
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {usuario.Horario.Lunes ? (
          <ListaHorario
            diaInicio={usuario.Horario.Lunes[0]}
            horaInicio={
              usuario.Horario.Lunes[1] + ":" + usuario.Horario.Lunes[2]
            }
            diaTermino={usuario.Horario.Lunes[3]}
            horaTermino={
              usuario.Horario.Lunes[4] + ":" + usuario.Horario.Lunes[5]
            }
          />
        ) : null}
        {usuario.Horario.Martes ? (
          <ListaHorario
            diaInicio={usuario.Horario.Martes[0]}
            horaInicio={
              usuario.Horario.Martes[1] + ":" + usuario.Horario.Martes[2]
            }
            diaTermino={usuario.Horario.Martes[3]}
            horaTermino={
              usuario.Horario.Martes[4] + ":" + usuario.Horario.Martes[5]
            }
          />
        ) : null}
        {usuario.Horario.Miercoles ? (
          <ListaHorario
            diaInicio={usuario.Horario.Miercoles[0]}
            horaInicio={
              usuario.Horario.Miercoles[1] + ":" + usuario.Horario.Miercoles[2]
            }
            diaTermino={usuario.Horario.Miercoles[3]}
            horaTermino={
              usuario.Horario.Miercoles[4] + ":" + usuario.Horario.Miercoles[5]
            }
          />
        ) : null}
        {usuario.Horario.Jueves ? (
          <ListaHorario
            diaInicio={usuario.Horario.Jueves[0]}
            horaInicio={
              usuario.Horario.Jueves[1] + ":" + usuario.Horario.Jueves[2]
            }
            diaTermino={usuario.Horario.Jueves[3]}
            horaTermino={
              usuario.Horario.Jueves[4] + ":" + usuario.Horario.Jueves[5]
            }
          />
        ) : null}
        {usuario.Horario.Viernes ? (
          <ListaHorario
            diaInicio={usuario.Horario.Viernes[0]}
            horaInicio={
              usuario.Horario.Viernes[1] + ":" + usuario.Horario.Viernes[2]
            }
            diaTermino={usuario.Horario.Viernes[3]}
            horaTermino={
              usuario.Horario.Viernes[4] + ":" + usuario.Horario.Viernes[5]
            }
          />
        ) : null}
        {usuario.Horario.Sabado ? (
          <ListaHorario
            diaInicio={usuario.Horario.Sabado[0]}
            horaInicio={
              usuario.Horario.Sabado[1] + ":" + usuario.Horario.Sabado[2]
            }
            diaTermino={usuario.Horario.Sabado[3]}
            horaTermino={
              usuario.Horario.Sabado[4] + ":" + usuario.Horario.Sabado[5]
            }
          />
        ) : null}
        {usuario.Horario.Domingo ? (
          <ListaHorario
            diaInicio={usuario.Horario.Domingo[0]}
            horaInicio={
              usuario.Horario.Domingo[1] + ":" + usuario.Horario.Domingo[2]
            }
            diaTermino={usuario.Horario.Domingo[3]}
            horaTermino={
              usuario.Horario.Domingo[4] + ":" + usuario.Horario.Domingo[5]
            }
          />
        ) : null}
      </ScrollView>
    </View>
  );
};
export default Horario;
