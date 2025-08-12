import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen(props) {
  const handleNavigate = () => {
    console.log(props?.navigation, "---->>>>");
    props.navigation?.navigate("TabBar");
  };

  const goBack = () => {
    // props.navigation?.goBack();
    props.navigation?.replace("Settings");
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',margin:40 }}>
      <Text style={{fontSize:26}}>Home Screen</Text>
      <TouchableOpacity onPress={handleNavigate} style={{borderWidth:1,width:100,height:50,backgroundColor:"blue",justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"#fff"}}>Navigate</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goBack} style={{borderWidth:1,width:100,height:50,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"#fff"}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
