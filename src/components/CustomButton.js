import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function CustomButton({buttonLabel,style,onPress}) {
  return (
    <TouchableOpacity style={[styles.buttonContainer,style]} onPress={() => onPress()}>
      <Text>{buttonLabel}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer:{
    paddingHorizontal:20,
    paddingVertical:5,
    backgroundColor:"#fff",
    borderRadius:10
  }
})
