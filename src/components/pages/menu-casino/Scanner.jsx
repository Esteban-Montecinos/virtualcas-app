import React, {useState, useEffect} from "react";
import { View, Text,StyleSheet, Button, Vibration } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from "expo-constants";
import { runOnJS } from 'react-native-reanimated/lib/reanimated2/core';
import {app} from "../../../firebase/firebaseconfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firestore = getFirestore(app);

const Scanner = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { usuario, email } = route.params;
  const nombreDelDiaSegunFecha = dia => [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ][dia.getDay()];

  async function trabajadorScaneado(emailTrabajador) {
    try {
      
      const docuRef = doc(firestore, `Users/${emailTrabajador}`);
      const consulta = await getDoc(docuRef);
      if (consulta.exists()) {
        //si existen datos
        const infoDocu = consulta.data();
        
        if(infoDocu.Estado == "Habilitado"){
          const dia = new Date;
          const nombreDia = nombreDelDiaSegunFecha(dia);
          alert(`Dia de hoy ${nombreDia}`);
          console.log("Nombre : ", infoDocu);
        }else{
          Vibration.vibrate(1500);
          alert('Ticket ya utilizado');
        }
      }
    } catch (error) {
      
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let datoTrabajadorScaneado = data.split(' ');
    trabajadorScaneado(datoTrabajadorScaneado[0]);
    
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Toque para escanear de nuevo'} onPress={() => setScanned(false)} />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  }
});
export default Scanner