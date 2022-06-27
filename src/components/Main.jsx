import React from 'react'
import {Routes, Route} from 'react-router-native'
import Login from './pages/Login'

const Main = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}  />
    </Routes>
  )
}

export default Main