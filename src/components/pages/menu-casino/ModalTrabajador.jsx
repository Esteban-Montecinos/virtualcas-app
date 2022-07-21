import { View, Text, Modal } from "react-native";
import React from "react";
import tw from "twrnc";
import ButtonGradient from "../../styleButton/ButtonGradient";
const ModalTrabajador = ({
  isModalOpen,
  setIsModalOpen,
  trabajador,
  emailCasino,
}) => {
  return (
    <>
      <Modal visible={isModalOpen} transparent={true}
      animationType={"slide"}>
        <View style={tw`flex-end justify-center`}>
          <View style={tw`shadow-xl bg-slate-500`}>
            <Text>modal</Text>
            <ButtonGradient
            text={"aceptar"}
            onPress={() => setIsModalOpen(!isModalOpen)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalTrabajador;
