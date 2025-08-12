import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function CustomButton(props) {
  return (
    <TouchableOpacity onPress={() => props?.onPress}>
        <Text>{props?.buttonLabel}</Text>
    </TouchableOpacity>
  )
}

const style=StyleSheet.create({
    button:{
        borderWidth:1,
    }
})