import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from './src/screens/SplashScreen';
import AuthNavigation from './src/navigation/AuthNavigation';
import { UserContextProvider } from './src/context/ContextApi';
import TodoList from './src/screens/TodoList';
import TodoScreen from './src/screens/TodoWithSwipeDelete';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ClassItems from './src/screens/ClassItems';
import SignInScreen from './src/screens/SignInScreen';
// import ClassItems from './src/screens/ClassItems';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SignInScreen'>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ClassItems" component={ClassItems} />
      <Stack.Screen name="TodoScreen" component={TodoScreen} />
      <Stack.Screen name="TodoList" component={TodoList} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Main_Home" component={StackNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigation} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [internetAvailable, setInternetAvailable] = useState<boolean | null>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setInternetAvailable(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <UserContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
        </GestureHandlerRootView>
      </UserContextProvider>
    </Provider>
  );
}
