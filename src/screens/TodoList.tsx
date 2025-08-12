import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { UserContext } from '../context/ContextApi';
import TodoListController from '../controller/TodoListController';

// interface TodoList { label: string, id: number, isSelected: boolean }
// const todoValues : TodoList[] = [
//   { label: 'todo', id: 29, isSelected: false },
//   { label: 'todo', id: 29, isSelected: false },
//   { label: 'todo', id: 29, isSelected: false },
// ];

// const myList : string[] = ["1","2","3","4","5"]
// const myList2 : number[] = [1,2,3,4,5]

export default function TodoList() {
  const { handleSave, setTaskTxt } = TodoListController();
  const { todos, text, setText, editId, deleteTodo, startEdit } =
    useContext(UserContext);

  const renderTaskList = ({ item }:{item:{text:string,id:string}}) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#FFC107' }]}
          onPress={() => startEdit(item.id)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#F44336' }]}
          onPress={() => deleteTodo(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task..."
          value={text}
          onChangeText={text => setTaskTxt(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{editId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        style={styles.todoListContainer}
        renderItem={renderTaskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2C2D2D',
    paddingTop: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    marginLeft: 8,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: { fontSize: 16, color: '#333', flex: 1 },
  actionButtons: { flexDirection: 'row' },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 6,
  },
  actionText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  todoListContainer: { marginTop: 15 },
});
