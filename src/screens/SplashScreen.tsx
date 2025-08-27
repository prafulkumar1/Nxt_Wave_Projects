import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { UserContext, UserContextProvider } from '../context/ContextApi'
import TodoListController from '../controller/TodoListController'

export default function SplashScreen() {
  const {handleSave, setTaskTxt} = TodoListController()
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}