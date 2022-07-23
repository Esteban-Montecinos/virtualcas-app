import { View, Text, TextInput } from "react-native";
import React,{useState} from "react";
import { Formik, useField } from "formik";
import { sendPasswordResetEmail } from "firebase/auth";
import Constants from "expo-constants";
import tw from "twrnc";

import { resetPasswordValidationSchema } from "../validationSchemas/resetPassword";
import ButtonGradient from "../styleButton/ButtonGradient";
import { app, auth } from "../../firebase/firebaseconfig";

const initialValues = {
  emailReset: "",
};
const FormikImputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <TextInput
        style={tw`p-10px pl-15px w-80 h-45px mt-20px border border-solid border-gray-300 rounded-[14px] bg-white`}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <Text style={tw`text-red-500`}> {meta.error}</Text>}
    </>
  );
};

const RecoverPassword = ({ navigation, route }) => {
  const [error, setError] = useState("");
  const { volver, usuario, email } = route.params;
  return (
    <View
      style={[
        { marginTop: Constants.statusBarHeight },
        tw`flex h-full justify-center items-center bg-slate-100`,
      ]}
    >
      <View
        style={tw`p-6 max-w-90 min-w-85 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`}
      >
        <Text
          style={tw`mb-2 uppercase  text-xl font-bold tracking-tight text-gray-700 dark:text-white`}
        >
          Cambiar contraseña
        </Text>
        <Formik
          validationSchema={resetPasswordValidationSchema}
          initialValues={initialValues}
          onSubmit={(datos, { resetForm }) => {
            async function recuperarPassword(datos) {
              try {
                await sendPasswordResetEmail(auth, datos.emailReset);
                setError("");
                navigation.navigate("Login");
              } catch (error) {
                resetForm();
                console.log("-"+error+"-");
                if (
                  error ==
                  "FirebaseError: Firebase: Error (auth/user-not-found)."
                ) {
                  setError("El correo ingresado no existe.");
                }
              }
            }

            recuperarPassword(datos);
          }}
        >
          {({ handleSubmit }) => {
            return (
              <>
                <FormikImputValue
                  placeholder="Escribe tu correo electrónico"
                  name="emailReset"
                  keyboardType="email-address"
                />
                {error? <Text style={tw`text-red-500`}>{" "}{error}</Text>:null}
                <ButtonGradient text={"Enviar"} onPress={handleSubmit} />
                <ButtonGradient
                  text={"Volver"}
                  onPress={() => {
                    navigation.navigate(`${volver}`, {
                      usuario: usuario,
                      email: email,
                    });
                  }}
                />
              </>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

export default RecoverPassword;
