import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import TabNavigator from "./TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import { Screen } from "react-native-screens";


const Stack = createNativeStackNavigator()
export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* {
        global.token ? <TabNavigator /> : <LoginScreem/>
      } */}
      {/* <TabNavigator /> */}
      <TabNavigator />
    </NavigationContainer>
  );
}
