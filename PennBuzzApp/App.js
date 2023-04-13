
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'
import MainFeedScreen from './screens/MainFeed/MainFeedScreen'
import SearchScreen from './screens/SearchScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomNav from './screens/BottomNavigator';

export default function App() {

  const [user, setUser] = useState(null);

  if (!user) {
    return (

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='LoginScreen'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='LoginScreen' >
            {(props) => <LoginScreen {...props} setUser={setUser} />}

          </Stack.Screen>
          <Stack.Screen name='RegisterScreen' >
            {props => <RegisterScreen {...props} setUser={setUser} />}

          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer >)
  }

  return (
    <NavigationContainer>
      <BottomNav user={user} />
    </NavigationContainer>
  );

}