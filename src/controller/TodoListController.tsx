import { View, Text, Alert } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../context/ContextApi';

export default function TodoListController() {
    
  const {
    text,
    setText,
    editId,
    addTodo,
    updateTodo,
  } = useContext(UserContext);

  const handleSave = () => {
    if (!text) {
      Alert.alert('Please enter task');
    } else {
      if (editId) {
        updateTodo();
      } else {
        addTodo();
      }
    }
  };

  const setTaskTxt = (text: string) => {
    const textValue = text.trim();
    setText(textValue);
  };
  
  return { handleSave, setTaskTxt };
}
