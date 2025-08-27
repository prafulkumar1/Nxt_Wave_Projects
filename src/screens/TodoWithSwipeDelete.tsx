import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import { RootState } from "../redux/store";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function TodoScreen() {
  const [todos, setTodos] = useState([
    { id: "1", task: "Learn React Native" },
    { id: "2", task: "Build a ToDo App" },
    { id: "3", task: "Practice FlatList" },
  ]);
  const [input, setInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Add Todo
  const addTodo = () => {
    if (input.trim().length === 0) return;
    setTodos([...todos, { id: Date.now().toString(), task: input }]);
    setInput("");
  };

  // Delete Todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  // Pull to Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setTodos([
        { id: "1", task: "Learn React Native" },
        { id: "2", task: "Build a ToDo App" },
        { id: "3", task: "Practice FlatList" },
      ]);
      setRefreshing(false);
    }, 1500);
  }, []);

  // Render Item with Swipe Delete
  const renderItem = ({ item }: any) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() =>
          Alert.alert("Delete Task", "Are you sure?", [
            { text: "Cancel" },
            { text: "Delete", onPress: () => deleteTodo(item.id) },
          ])
        }
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.todoItem}>
          <Text style={styles.todoText}>{item.task}</Text>
        </View>
      </Swipeable>
    );
  };


  const requestPermissions = async () => {
    const grant = await PermissionsAndroid.requestMultiple(
      [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ]
    )
  }

  return (
    <View style={styles.container}>
      {/* Header Input */}
      <Text style={styles.title}>📋 ToDo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          buttonLabel={"Save"}
          style={{ backgroundColor: "red" }}
          onPress={() => console.log("Save")}
        />
        <CustomButton
          buttonLabel={"Cancel"}
          style={{ backgroundColor: "blue" }}
          onPress={() => console.log("Cancel")}
        />
        <CustomButton
          buttonLabel={"Edit"}
          style={{ backgroundColor: "green" }}
          onPress={() => console.log("Edit")}
        />
      </View>
      <EvilIcons name="search" size={30} color="#900" />
      {/* <AntDesign name="search" size={30} color="#900" /> */}

      {/* FlatList */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => (
          <Text style={styles.listHeader}>Your Tasks</Text>
        )}
        ListFooterComponent={() => (
          <Text style={styles.listFooter}>--- End of List ---</Text>
          // <ActivityIndicator size={'small'} color={'red'}/>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F6FA",
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3A47",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    elevation: 2,
  },
  input: { flex: 1, paddingHorizontal: 10 },
  addBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "bold" },
  todoItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  todoText: { fontSize: 16, color: "#333" },
  separator: { height: 6, backgroundColor: "#000" },
  listHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#2C3A47",
  },
  listFooter: {
    textAlign: "center",
    marginVertical: 15,
    fontStyle: "italic",
    color: "#636e72",
  },
  deleteBtn: {
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 8,
    marginVertical: 5,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});
