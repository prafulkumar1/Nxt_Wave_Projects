import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { UserContext, UserContextProvider } from '../context/ContextApi'

export default function SplashScreen() {
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}