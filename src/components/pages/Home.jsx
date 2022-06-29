import React from 'react'
import { Text } from 'react-native'

const Home = ({usuario}) => {
  return (
    <Text>{usuario.NombreCompleto}</Text>
  )
}

export default Home