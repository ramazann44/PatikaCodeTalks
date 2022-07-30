import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'

import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconF from 'react-native-vector-icons/Feather'
import IconII from 'react-native-vector-icons/Ionicons'

import { AuthContext } from '../../navigation/AuthProvider'

import database from '@react-native-firebase/database'

import RoomInfo from './Infos/RoomInfo'

const HomeScreen = ({ navigation }) => {

  const { signOut, user } = useContext(AuthContext);

  const [isView, setIsView] = useState(false)
  const [newRoomText, setNewRoomText] = useState('')
  const [wantedRoom, setWantedRoom] = useState('')
  const [roomList, setRoomList] = useState({})

  function roomCreate() {

    const reference = database().ref("CodeTalks/codeChatRooms/").push();
    reference.set({
      roomId: reference.key,
      roomName: newRoomText
    });

    setNewRoomText('');

  }

  function getRoom() {

    const reference = database().ref("CodeTalks/codeChatRooms/");
    reference
      .once('value')
      .then(snapshot => {

        const list = [];
        const listt = [];
        if (wantedRoom == "") {
          if (snapshot.val() != null) {

            snapshot.forEach(c => {
              const i = c.val();
              list.push(i);
            });


            for (let i = list.length; i > 0; i--) {

              listt.push(list[i - 1]);

            }
            setRoomList(listt);
          } else {
            setRoomList({});
          }
        } else {

          if (snapshot.val() != null) {

            snapshot.forEach(c => {

              const i = c.val();
              if (i.roomName.includes(wantedRoom)) {
                list.push(i);
              }

            });


            for (let i = list.length; i > 0; i--) {

              listt.push(list[i - 1]);

            }
            setRoomList(listt);

          } else {
            setRoomList({});
          }

        }

      });

  }

  function renderItem({ item, index }) {

    return (
      <RoomInfo
        item={item}
        index={index}
        navigation={navigation}
        listCount={roomList.length}
      />
    )

  }

  useEffect(() => {

    getRoom();

  }, [wantedRoom])


  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: "white",
    }}>

      <TextInput style={{
        color: Colors.black,
        padding: '2%',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: '#ddd',
        margin: '2%',
        borderRadius: 50
      }}
        placeholder="Oda Ara"
        placeholderTextColor={Colors.dark}
        onChangeText={text => setWantedRoom(text)}
        value={wantedRoom}
      />

      <FlatList
        style={{ width: '100%' }}
        data={roomList}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <IconII onPress={() => {
        signOut();
      }} style={{
        position: 'absolute',
        left: '2%',
        bottom: '2%',
      }}
        name='log-out-outline'
        color='#FF6F00'
        size={48}
      />

      <IconFA5 onPress={() => {
        setIsView(true)
      }} style={{
        position: 'absolute',
        right: '2%',
        bottom: '2%',
      }}
        name="plus-circle"
        color='#FF6F00'
        size={48}
      />

      {
        isView &&
        <View style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#FF6F00',
          padding: '2%'
        }}>

          <View style={{
            width: '100%',
            alignItems: 'flex-end'
          }}>

            <IconF onPress={() => {
              setIsView(false)
            }}
              name='x-circle'
              size={30}
              color={Colors.white}
            />

          </View>


          <TextInput style={{
            borderBottomColor: Colors.white,
            borderBottomWidth: 1
          }}
            placeholder='Oda İsmi'
            color={Colors.white}
            placeholderTextColor={Colors.white}
            onChangeText={text => setNewRoomText(text)}
            value={newRoomText}
          />

          <TouchableOpacity onPress={() => {
            roomCreate();
            setIsView(false);
            getRoom();
          }} style={{
            width: '100%',
            marginTop: '10%',
            marginBottom: '10%',
            alignItems: 'center',
            backgroundColor: Colors.white,
            padding: '2%',
            borderRadius: 10
          }}>
            <Text style={{
              color: '#FF6F00',
              fontSize: 20,
              fontWeight: 'bold'
            }}>Oda Kur</Text>

          </TouchableOpacity>

        </View>
      }


    </SafeAreaView>
  )
}

export default HomeScreen