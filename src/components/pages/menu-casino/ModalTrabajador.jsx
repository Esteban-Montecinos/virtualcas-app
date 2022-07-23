import { View, Text, Modal } from "react-native";
import React from "react";
import tw from "twrnc";
import ButtonGradient from "../../styleButton/ButtonGradient";
const ModalTrabajador = ({
  isModalOpen,
  setIsModalOpen,
  trabajador,
  emailCasino,
  emailTrabajador,
}) => {
  return (
    <>
      <Modal visible={isModalOpen} transparent={true} animationType={"slide"}>
        <View style={tw`flex h-full justify-end `}>
          <View
            style={tw`flex items-center shadow-xl bg-slate-500 m-20px rounded-xl py-16px px-16px`}
          >
            <View
            style={tw`bg-purple-500 w-80 p-12px items-center shadow-xl rounded-tl-lg rounded-tr-lg`}
            >
              <Text style={tw`text-white uppercase text-2xl font-bold`}>
                {trabajador.Estado}
              </Text>
            </View>
            <View
              style={tw`flex items-center shadow-xl bg-white mb-8px rounded-br-lg rounded-bl-lg py-16px px-16px w-80`}
            >
              <Text style={tw`uppercase text-2xl font-bold`}>
                RUT {trabajador.Rut}
              </Text>
              <Text style={tw`uppercase text-xl`}>
                {trabajador.NombreC}
              </Text>
              <Text style={tw`uppercase text-xl`}>
                Horario: {trabajador.TipoH}
              </Text>
            </View>
            <ButtonGradient
              text={"Aceptar"}
              onPress={() => setIsModalOpen(!isModalOpen)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalTrabajador;
