import { View, Text } from 'react-native'
import React from 'react'
import Constants  from 'expo-constants';

const Cuenta = ({route}) => {
  return (
    <View style={{marginTop: Constants.statusBarHeight}}>
      <Text>Cuenta </Text>
      <Text>Hola: {route.params.usuario.NombreCompleto}</Text>
    </View>
  )
}

export default Cuenta