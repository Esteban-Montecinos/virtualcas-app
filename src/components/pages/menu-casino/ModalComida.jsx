import { View, Text, Modal } from "react-native";
import React from "react";
import tw from "twrnc";
import ButtonGradient from "../../styleButton/ButtonGradient";
import { app } from "../../../firebase/firebaseconfig";
import { addDoc, getFirestore, collection } from "firebase/firestore";
const firestore = getFirestore(app);

const ModalComida = ({
  isModalComidaOpen,
  setIsModalComidaOpen,
  comidaMes,
  datosModal,
}) => {
  return (
    <Modal
      visible={isModalComidaOpen}
      transparent={true}
      animationType={"slide"}
    >
      <View style={tw`flex h-full justify-end `}>
        <View
          style={tw`flex items-center shadow-xl bg-slate-500 m-20px rounded-xl py-16px px-16px`}
        >
          <View
            style={tw`bg-purple-500 w-80 p-12px items-center shadow-xl rounded-tl-lg rounded-tr-lg`}
          >
            <Text style={tw`text-white uppercase text-2xl font-bold`}>
              Seleccione la comida
            </Text>
          </View>
          <View
            style={tw`flex items-center shadow-xl bg-white mb-8px rounded-br-lg rounded-bl-lg p-4 w-80`}
          >
            <Text style={tw`uppercase text-2xl font-bold`}>
                RUT {datosModal.Rut}
              </Text>
              <Text style={tw`uppercase text-xl`}>
                {datosModal.Trabajador}
              </Text>
            {comidaMes.map((Comida, index) => {
              if (index >= 0 && index % 3 == 0) {
                let i = index + 1;
                return (
                  <ButtonGradient
                    key={index}
                    text={Comida + " " + comidaMes[i]}
                    onPress={() => {
                      addDoc(collection(firestore, "Ticket"), {
                        Casino: datosModal.Casino,
                        Empresa: datosModal.Empresa,
                        Fecha: datosModal.Fecha,
                        Hora: datosModal.Hora,
                        Minuto: datosModal.Minuto,
                        Segundo: datosModal.Segundo,
                        TipoTicket: datosModal.TipoTicket,
                        Trabajador: datosModal.Trabajador,
                        Dia: datosModal.Dia,
                        Comida: [Comida,comidaMes[i]],
                      });
                      setIsModalComidaOpen(!isModalComidaOpen)
                    }}
                  />
                );
              }
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComida;
