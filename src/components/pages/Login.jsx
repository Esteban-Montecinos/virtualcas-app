import React, { useState } from "react";
import { Text, View, TextInput, Alert, Image } from "react-native";
import { Formik, useField } from "formik";
import { loginValidationSchema } from "../validationSchemas/login";
import { signInWithEmailAndPassword } from "firebase/auth";
import ButtonGradient from "../styleButton/ButtonGradient";
import { app, auth } from "../../firebase/firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import tw from "twrnc";

const firestore = getFirestore(app);
const initialValues = {
  email: "",
  password: "",
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
const Login = () => {
  const [error, setError] = useState("");
  const navigation = useNavigation();
  return (
    <View style={tw`flex h-full justify-center bg-slate-100`}>
      <View style={tw`flex items-center justify-center`}>
        <Image
          style={tw`w-25 h-25 mb-2`}
          source={require("../../images/vcas-logo-cuadrado.jpg")}
        />
        <Text
          style={tw`mb-2  text-base tracking-tight text-gray-500 dark:text-white`}
        >
          Inicia sesión con tu correo electrónico
        </Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={initialValues}
          onSubmit={(datos, { resetForm }) => {
            async function login(datos) { // Inicio de sesion con datos del usuario movil
              try {
                await signInWithEmailAndPassword( auth, datos.email, datos.password); // Inicia sesion en firebase
                const docuRef = doc(firestore, `Users/${datos.email}`); // Referencia del documento
                const consulta = await getDoc(docuRef); // Obtencion del documento del usuario
                if (consulta.exists()) { // Existe el documento
                  
                  const infoDocu = consulta.data(); // Si existen datos, se guarda la informacion
                  resetForm();
                  if (infoDocu.Estado === "Habilitado") { // Usuario habilitado
                    if (infoDocu.Tipo === "Trabajador") { // Tipo de usuario Trabajador
                      setError("");
                      navigation.navigate("Main", { usuario: infoDocu, email: datos.email }); // Redireccion a vista trabajador
                    } else if (infoDocu.Tipo === "Casino") {
                      setError("");
                      navigation.navigate("MainCasino", { usuario: infoDocu, email: datos.email }); // Redireccion a vista casino
                    } else {
                      setError("Intenta con otra cuenta."); // Error tipo usuario
                    }
                  } else {
                    setError("Tu cuenta se encuentra deshabilitada."); // Error estado cuenta
                  }
                }
              } catch (error) { // Error firebase
                if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") { // Error contraseña
                  setError("Contraseña incorrecta.");
                } else if ( error == "FirebaseError: Firebase: Error (auth/user-not-found).") { // Error usuario no existe
                  setError("El correo ingresado no existe.");
                }
              }
            }

            login(datos);
          }}
        >
          {({ handleSubmit }) => {
            return (
              <>
                <FormikImputValue
                  placeholder="Correo electrónico"
                  name="email"
                  keyboardType="email-address"
                />
                <FormikImputValue
                  placeholder="Contraseña"
                  name="password"
                  secureTextEntry={true}
                />
                {error ? <Text style={tw`text-red-500`}>{error}</Text> : null}
                <ButtonGradient
                  text={"Iniciar sesión"}
                  onPress={handleSubmit}
                />
                <Text
                  style={tw`text-gray-500 mt-6`}
                  onPress={() =>
                    navigation.navigate("Recover", {
                      volver: "Login",
                      email: null,
                      usuario: null,
                    })
                  }
                >
                  ¿Problemas con tu contraseña?{" "}
                  <Text style={tw`text-blue-600 font-bold`}>Recupérala.</Text>
                </Text>
              </>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
