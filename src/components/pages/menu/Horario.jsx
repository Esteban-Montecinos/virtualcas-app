import { View, Text, StyleSheet } from 'react-native'
import  Constants  from 'expo-constants'
import React from 'react'

const Horario = () => {
  return (
    <View style={styles.container}>
      <Text>Horario</Text>
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