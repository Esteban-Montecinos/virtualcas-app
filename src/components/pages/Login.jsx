import React from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { Formik, useField } from "formik";
import ButtonGradient from "../styleButton/ButtonGradient";
import { loginValidationSchema } from "../validationSchemas/login";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import bd from "../../firebase/firebaseconfig";

const auth = getAuth(bd);
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
          onSubmit={(datos) => {
            async function login(datos) {
              try {
                const user = await signInWithEmailAndPassword(
                  auth,
                  datos.email,
                  datos.password
                );
              } catch (error) {
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
                  placeholder="Password"
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
