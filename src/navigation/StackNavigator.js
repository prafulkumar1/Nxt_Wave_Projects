import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TabNavigator from "./TabNavigator";
import { MyTabs } from "./TopBarNavigation";
import LoginScreen from "../screens/LoginScreen";
// import { MyTabs } from "./TopBarNavigation";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="LoginScreen"
      screenOptions={{
        // headerStyle: { backgroundColor: "#2196f3" },
        // headerTintColor: "white",
        // headerTitleAlign: "center",
        // headerTitleStyle: { fontWeight: "bold",fontSize:20 },
        // title:"Stack Navigation",
        // headerShown:false
      }}
    >
      
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home Page" , headerShown:true}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "My Profile",headerShown:true }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings",headerShown:true }}
      />
       <Stack.Screen
        name="TabBar"
        component={TabNavigator}
      />
       <Stack.Screen
        name="MyTabs"
        component={MyTabs}
      />
       <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}
