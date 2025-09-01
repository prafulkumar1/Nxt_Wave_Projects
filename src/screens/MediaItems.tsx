import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Video from "react-native-video";
import Pdf from "react-native-pdf";
import FileViewer from "react-native-file-viewer";

const { width, height } = Dimensions.get("window");

// interface ApiData {page:number,data:{name:string,age:number,isSelected:boolean}[]}
export default function MediaItems() {
  const [activeTab, setActiveTab] = useState("Photos");
  const [photos, setPhotos] = useState<{uri:string}[]>([]);
  const [videos, setVideos] = useState<{ uri: string }[]>([]);
  const [docs, setDocs] = useState<{ uri: string; type: string }[]>([]);
  const [preview, setPreview] = useState<{
    type: string;
    uri: string;
    index?: number;
  } | null>(null);


  // const data = {
  //   page:1,
  //   data:[{
  //     name:"",
  //     age:20,
  //     isSelected:false
  //   }]
  // }
  // const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  // const [name,setName] = useState<string>("")
  // const [age,setAge] = useState<number>(0)
  // const [apiData,setApiData] = useState<ApiData | string>("")

  useEffect(() => {
    requestPermissionsForGallery();
  }, []);

  const loadMedia = async () => {
    try {
      const photoRes = await CameraRoll?.getPhotos({
        first: 100,
        assetType: "Photos",
      });
      // console.log(photoRes, "--->> Photos");
      setPhotos(photoRes.edges.map((e) => e.node.image));

      const videoRes = await CameraRoll.getPhotos({
        first: 30,
        assetType: "Videos",
      });
      // console.log(videoRes, "--->> Videos");
      setVideos(videoRes.edges.map((e) => e.node.image));

      setDocs([
        {
          uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          type: "pdf",
        },
      ]);
    } catch (err) {
      console.log("CameraRoll error:", err);
    }
  };

  const openDoc = async (doc: { uri: string; type: string }) => {
    if (doc.type === "pdf") {
      setPreview({ type: "pdf", uri: doc.uri });
    } else {
      await FileViewer.open(doc.uri);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { uri: string };
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        setPreview({ type: activeTab.toLowerCase(), uri: item.uri, index })
      }
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  const renderPreview = () => {
    if (!preview) return null;

    if (preview.type === "photos") {
      return (
        <View style={styles.fullscreenWrapper}>
          <Image
            source={{ uri: preview.uri }}
            style={styles.fullscreen}
            resizeMode="contain"
          />
        </View>
      );
    }
    if (preview.type === "videos") {
      return (
        <View style={styles.fullscreenWrapper}>
          <Video
            source={{ uri: preview.uri }}
            style={styles.fullscreen}
            controls
            resizeMode="contain"
          />
        </View>
      );
    }
    if (preview.type === "pdf") {
      return <Pdf source={{ uri: preview.uri }} style={styles.fullscreen} />;
    }
    return null;
  };

  async function requestPermissionsForGallery() {
    const hasPermission = await hasAndroidPermission()
    if (Platform.OS === "android" && hasPermission) {
      // return;
      loadMedia();
    }
    
  }

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= "33") {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= "33") {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header Tabs */}
      <View style={styles.tabs}>
        {["Photos", "Videos", "Docs"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabButton}
          >
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Media Grid */}
      {activeTab === "Photos" && (
        <FlatList
          data={photos}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          numColumns={3}
        />
      )}
      {activeTab === "Videos" && (
        <FlatList
          data={videos}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          numColumns={3}
        />
      )}
      {activeTab === "Docs" && (
        <FlatList
          data={docs}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.docItem}
              onPress={() => openDoc(item)}
            >
              <Text style={styles.docText}>{item.uri.split("/").pop()}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal visible={!!preview} transparent={true}>
        <View style={styles.modalContainer}>
          {renderPreview()}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setPreview(null)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: { padding: 6 },
  tab: { fontSize: 16, color: "#777" },
  activeTab: { fontWeight: "bold", color: "#007bff", fontSize: 18 },
  item: { flex: 1 / 3, margin: 2, borderRadius: 10, overflow: "hidden" },
  thumbnail: { width: "100%", height: 120, borderRadius: 10 },
  docItem: {
    padding: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
  },
  docText: { fontSize: 14, color: "#333" },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreen: { width, height: height * 0.8, borderRadius: 12 },
  closeBtn: { position: "absolute", top: 40, right: 20, padding: 10 },
  closeText: { color: "white", fontSize: 28, fontWeight: "bold" },
});
