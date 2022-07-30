import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'

import LoginScreen from '../screens/Auth/LoginScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen'

const Stack = createNativeStackNavigator();

const BottomTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='SignUpScreen'
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='ResetPasswordScreen'
        component={ResetPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}



const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabStack">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack