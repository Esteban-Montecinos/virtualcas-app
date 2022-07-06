import { View, Text, StyleSheet } from 'react-native'
import  Constants  from 'expo-constants'
import React from 'react'

const Horario = ({route}) => {
  const { usuario, email } = route.params;
  return (
    <View style={styles.container}>
      <Text>Horario: {usuario.Horario}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
});
export default Horario