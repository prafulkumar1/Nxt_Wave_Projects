import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F5F6FA", marginTop: 40 },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#2C3A47" },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 15,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 5,
      elevation: 2,
      width:"90%"
    },
    input: { flex: 1, paddingHorizontal: 10 },
    addBtn: {
      paddingHorizontal: 15,
      justifyContent: "center",
      borderRadius: 8,
    },
    addBtnText: { color: "#fff", fontWeight: "bold" },
    todoItem: { padding: 15, backgroundColor: "#fff", borderRadius: 8, elevation: 2,flexDirection:"row",alignItems:"center",marginTop:10 },
    todoText: { fontSize: 16, color: "#333" },
    separator: { height: 1, backgroundColor: "#000" },
    listHeader: { fontSize: 18, fontWeight: "600", marginVertical: 10, color: "#2C3A47" },
    listFooter: { textAlign: "center", marginVertical: 15, fontStyle: "italic", color: "#636e72" },
    deleteBtn: {
      backgroundColor: "#ff3b30",
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      height: 45,
      borderRadius: 8,
      marginVertical: 5,
      marginLeft: 10,
    },
    deleteText: { color: "#fff", fontWeight: "bold" },
    avatar:{height:50,width:50,borderRadius:25,marginRight:10},
  
    openBtn: {
      backgroundColor: "#6200EE",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    btnText: {
      color: "#fff",
      fontSize: 16,
    },
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
      backgroundColor: "#fff",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      minHeight: height * 0.25,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 20,
      textAlign: "center",
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
    },
    optionText: {
      fontSize: 16,
      marginLeft: 10,
      color: "#333",
    },
    cancelBtn: {
      marginTop: 20,
      alignItems: "center",
      paddingVertical: 12,
      backgroundColor: "#f2f2f2",
      borderRadius: 8,
    },
    cancelText: {
      fontSize: 16,
      color: "#333",
    },
    rightContainer:{ flexDirection: "row", alignItems: "center", height: 50,marginTop:25 },
    videoContainer: {
      marginBottom: 20,
    },
    video: {
      width: "100%",
      height: 200,
      backgroundColor: "black",
    },
  });