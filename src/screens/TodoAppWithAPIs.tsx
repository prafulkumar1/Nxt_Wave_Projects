import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
  PermissionsAndroid,
  Modal,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { baseURL } from "../config/config";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-crop-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "../styles/TodoAppWithAPIsStyles";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function TodoAppWithAPIs() {
  const swipeableRef: any = useRef(null);

  const [todos, setTodos] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // 👈 for modal
  const [selectedImage, setSelectedImage] = useState<string>(""); // 👈 store picked image
  const [paused, setPaused] = useState(false);

  const headers = {
    "x-api-key": "reqres-free-v1",
    "Content-Type": "application/json",
  };

  const jsonData = [
    {
      "id": 1,
      "title": "Nature Video",
      "url": "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      "id": 2,
      "title": "City Life",
      "url": "https://www.w3schools.com/html/movie.mp4"
    },
    {
      "id": 3,
      "title": "Ocean Waves",
      "url": "https://sample-videos.com/video123/mp4/480/asdasdas.mp4"
    }
  ]
  

  const fetchTodos = async () => {
    setLoading(true);
    try {

      const res = await fetch(baseURL, {
        headers,
      });
      const responseData = await res.json();
      console.log(responseData,"---->>>shhshshs")
      const mapped = responseData?.data?.map((profileDetails: any) => ({
        ...profileDetails,
        task: profileDetails.first_name + " " + profileDetails.last_name,
      }));
      console.log(mapped, "ppps");
      setTodos(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (input.trim().length === 0) return;
    setLoading(true);
    try {
      const res = await fetch(baseURL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: input,
          job: "Task",
        }),
      });
      const data = await res.json();
      console.log(data,"--->>>hhshshhss")
      setTodos([
        ...todos,
        {
          id: data.id || Date.now().toString(),
          task: data.name,
          avatar: selectedImage || null,
        },
      ]);
      setInput("");
      setSelectedImage("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async () => {
    if (!editingId || input.trim().length === 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/${editingId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          name: input,
          job: "Updated Task",
          avatar: selectedImage || null,
        }),
      });
      const data = await res.json();

      setTodos(
        todos.map((t) =>
          t.id === editingId
            ? {
                ...t,
                task: data.name,
                avatar: data.avatar || selectedImage || t.avatar,
              }
            : t
        )
      );

      setEditingId(null);
      setInput("");
      setSelectedImage("");
      swipeableRef.current?.close();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
        headers: { "x-api-key": "reqres-free-v1" },
      });
      if (res.status === 204) {
        setTodos(todos.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTodos().then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }: any) => {
    const renderRightActions = () => (
      <View style={styles.rightContainer}>
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

        <TouchableOpacity
          style={[styles.deleteBtn, { backgroundColor: "gray" }]}
          onPress={() => {
            setEditingId(item.id);
            setInput(item.task);
            setSelectedImage(item.avatar);
          }}
        >
          <Text style={styles.deleteText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
        <View style={styles.todoItem}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <FontAwesome
              name="user-circle-o"
              color={"#000"}
              size={40}
              style={styles.avatar}
            />
          )}
          <Text style={styles.todoText}>{item.task}</Text>
        </View>
      </Swipeable>
    );
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }
    try {
      const image = await ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
        mediaType: "photo",
        padding: 20,
      });
      setSelectedImage(image.path);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera to take pictures",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    console.log(Platform.Version,"--->>>ssjsjjs")
    if (Platform.OS === "android") {
      if (Platform.Version >= 33) {
        // Android 13+
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: "Gallery Permission",
            message: "This app needs access to your photos",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // Android 12 and below
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage to pick images",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  const openGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Gallery access is required.");
      return;
    }
    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        mediaType: "photo",
        multiple: false, // 👈 force legacy mode
        smartAlbums: ["UserLibrary"],
      });
      setSelectedImage(image.path); // 👈 save image
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  // const postUserWithFormData = async () => {
  //   const formData = new FormData();
  //   formData.append("name", "praful");
  //   formData.append("job", "task");
  //   formData.append("help_images[]", {
  //     uri: "imageurl",
  //     type: "image/jpeg",
  //     name: "photo.jpg",
  //   });

  //   const postedData = await fetch("url", {
  //     method:"POST",
  //     headers: {
  //       // "Content-Type": "multipart/form-data",
  //       token: "token",
  //     },
  //     body: formData,
  //   });
  //   const userInfo = await postedData.json();
  //   console.log(userInfo, "--->djjd");
  // };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 ToDo App (API CRUD)</Text>

      {/* {loading && (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={{ margin: 10 }}
        />
      )} */}
      {loading ? (
        <View style={{}}>
          {[1, 2, 3, 4, 5].map((items) => {
            return (
              <ShimmerPlaceholder
                key={items}
                style={{ height: 150, marginBottom: 10, width: "100%" }}
              />
            );
          })}
        </View>
      ) : (
        <>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.avatar} />
            ) : (
              <FontAwesome
                name="user-circle-o"
                color={"#000"}
                size={40}
                style={{ marginTop: 5, marginRight: 10 }}
              />
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Add Profile..."
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity
                style={[
                  styles.addBtn,
                  { backgroundColor: editingId ? "#FFA500" : "#4CAF50" },
                ]}
                onPress={editingId ? updateTodo : addTodo}
              >
                <Text style={styles.addBtnText}>
                  {editingId ? "Update" : "Add"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addBtn,
                  { backgroundColor: "gray", marginLeft: 10 },
                ]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.addBtnText}>Photo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={() => (
              <Text style={styles.listHeader}>Your Tasks</Text>
            )}
            ListFooterComponent={() => (
              <Text style={styles.listFooter}>--- End of List ---</Text>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Option</Text>
            <TouchableOpacity style={styles.option} onPress={openCamera}>
              <MaterialIcons name="photo-camera" size={24} color="#333" />
              <Text style={styles.optionText}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={openGallery}>
              <MaterialIcons name="photo-library" size={24} color="#333" />
              <Text style={styles.optionText}>Open Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
