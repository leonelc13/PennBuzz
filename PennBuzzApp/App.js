
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function App() {

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='LoginScreen'
          screenOptions={{
            headerShown:false,
          }} 
          >
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );

}