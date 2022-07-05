import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { Formik, useField } from "formik";
import { loginValidationSchema } from "../validationSchemas/login";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ButtonGradient from "../styleButton/ButtonGradient";
import bd from "../../firebase/firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const auth = getAuth(bd);
const firestore = getFirestore(bd);
const initialValues = {
  email: "",
  password: "",
};

const FormikImputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <TextInput
      style={styles.textInput}
      value={field.value}
      onChangeText={(value) => helpers.setValue(value)}
      {...props}
    />
  );
};
const Login = () => {
  const [usuario, setUsuario] = useState(null);
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.titulo}>VirtualCas</Text>
        <Text style={styles.subTitle}>
          Inicia sesion con tu correo corporativo
        </Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={initialValues}
          onSubmit={(datos, { resetForm }) => {
            async function login(datos) {
              try {
                const user = await signInWithEmailAndPassword(
                  auth,
                  datos.email,
                  datos.password
                );
                const docuRef = doc(firestore, `Users/${datos.email}`);
                const consulta = await getDoc(docuRef);
                if (consulta.exists()) {
                  //si existen datos
                  const infoDocu = consulta.data();
                  setUsuario(infoDocu);
                  console.log("aqui-----" + usuario);
                  resetForm();
                  navigation.navigate("Main", { usuario: infoDocu });
                }
              } catch (error) {
                resetForm();
                console.log(error);
              }
            }

            login(datos);
          }}
        >
          {({ handleSubmit }) => {
            return (
              <>
                <FormikImputValue placeholder="Correo" name="email" />
                <FormikImputValue
                  placeholder="Contraseña"
                  name="password"
                  secureTextEntry={true}
                />
                <ButtonGradient
                  text={"Iniciar sesion"}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 80,
    color: "#34434D",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: "gray",
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  button: {},
});

export default Login;
