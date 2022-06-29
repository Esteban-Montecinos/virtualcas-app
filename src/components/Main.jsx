import React, { useState } from "react";
import bd from "../firebase/firebaseconfig";
import { Routes, Route, useNavigate } from "react-router-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const auth = getAuth(bd);
const firestore = getFirestore(bd);
const Main = () => {
  const navigate = useNavigate();
  const [usuarioDeFirebase, setUsuarioDeFirebase] = useState(null);
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //código en caso de que haya sesión inciiada
      if (usuario == null) {
        setUsuarioDeFirebase(usuarioFirebase);
        async function obtenerDatosUsuario(datos) {
          try {
            const docuRef = doc(firestore, `Users/${datos.email}`);
            const consulta = await getDoc(docuRef);
            if (consulta.exists()) {
              //si existen datos
              const infoDocu = consulta.data();
              setUsuario(infoDocu);
              navigate("/home");
            }
          } catch (error) {
            console.log(error);
          }
        }

        obtenerDatosUsuario(usuarioDeFirebase);
      }
    } else {
      //código en caso de que no haya sesión iniciada
      setUsuarioDeFirebase(null);
      setUsuario(null);
    }
  });
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home usuario={usuario} />} />
    </Routes>
  );
};

export default Main;
