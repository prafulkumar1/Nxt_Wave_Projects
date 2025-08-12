import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./StackNavigator";
import DrawerNavigator from "./DrawerNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false, // hides default top bar
        tabBarActiveTintColor:"#049" , // active tab color
        tabBarInactiveTintColor: "#000", // inactive tab color
        tabBarStyle: { backgroundColor: "#f9f9f9" }, // tab bar style
      }}
    >
      <Tab.Screen name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon : ({color,size}) => {
            return(
              <Image resizeMode="contain" style={{width:20,height:20}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"}}/>
            )
          }
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon : ({color,size}) => {
            return(
              <Image resizeMode="contain" style={{width:20,height:20}} source={{uri:"https://cdn-icons-png.flaticon.com/512/126/126472.png"}}/>
            )
          }
        }}  
      />
      <Tab.Screen 
        name="Drawer" 
        component={DrawerNavigator}
        options={{
          tabBarIcon : ({color,size}) => {
            return(
              <Image resizeMode="contain" style={{width:20,height:20}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Q7P39Qv79ESwmmiPq0XhyxMXLAKhouli-Q&s"}}/>
            )
          },
          headerShown:false,
          
        }}
      />
    </Tab.Navigator>
  );
}
