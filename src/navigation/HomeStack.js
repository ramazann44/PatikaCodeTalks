import { useColorScheme, View, Text, AppState } from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'

import database from '@react-native-firebase/database'
import { AuthContext } from './AuthProvider'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/Home/HomeScreen'
import ChatScreen from '../screens/Home/ChatScreen'

const HomeStack = () => {

  const Stack = createNativeStackNavigator();

  const isDarkMode = useColorScheme() === 'dark';

  return (

    <Stack.Navigator initialRouteName="HomeScreen">

      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='ChatScreen'
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  )
}

export default HomeStack