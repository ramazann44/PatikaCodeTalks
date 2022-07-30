import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'

import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconIO from 'react-native-vector-icons/Ionicons'

import database from '@react-native-firebase/database'

import { AuthContext } from '../../../navigation/AuthProvider'

const MessageInfo = ({ item }) => {

  const { user } = useContext(AuthContext);

  const [month, setMonth] = useState(((new Date()).getMonth() + 1))

  useEffect(() => {



  }, [])


  if (item.messageOwner == user.uid) {
    return (
      <View style={{
        width: '100%',
        alignItems: 'flex-end',
        padding: '2%'
      }}>

        <View style={{
          width: '75%',
          marginLeft: '20%',
          backgroundColor: '#FF6F00',
          padding: '2%',
          borderRadius: 10
        }}>
          <Text style={{
            color: Colors.white,
            fontWeight: 'bold'
          }}>Siz</Text>

          <Text style={{
            color: Colors.white,
          }}>{item.message}</Text>

          <Text style={{
            color: Colors.light,
            textAlign: 'right'
          }}>
            {
              item.messageMonth != month ?
                item.messageDate
                :
                moment(item.messageFullDate, "YYYYMMDD, h:mm:ss").fromNow()
            }
          </Text>
        </View>

      </View>
    )
  } else {
    return (
      <View style={{
        width: '100%',
        alignItems: 'flex-start',
        padding: '2%'
      }}>

        <View style={{
          width: '75%',
          marginRight: '20%',
          backgroundColor: Colors.light,
          padding: '2%',
          borderRadius: 10
        }}>
          <Text style={{
            color: Colors.black,
            fontWeight: 'bold'
          }}>{item.messageOwnerNickName}</Text>

          <Text style={{
            color: Colors.black,
          }}>{item.message}</Text>

          <Text style={{
            color: Colors.dark,
            textAlign: 'right'
          }}>
            {
              item.messageMonth != month ?
                item.messageDate
                :
                moment(item.messageFullDate, "YYYYMMDD, h:mm:ss").fromNow()
            }
          </Text>
        </View>

      </View>
    )
  }

}

export default MessageInfo