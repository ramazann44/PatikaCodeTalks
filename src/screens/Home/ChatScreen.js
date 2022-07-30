import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'

import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconIO from 'react-native-vector-icons/Ionicons'

import database from '@react-native-firebase/database'

import MessageInfo from './Infos/MessageInfo'

import { AuthContext } from '../../navigation/AuthProvider'

const ChatScreen = ({ navigation, route }) => {

  const { user } = useContext(AuthContext);

  const { roomId } = route.params;

  const [roomInfo, setRoomInfo] = useState({});
  const [messageText, setMessageText] = useState('');
  const [roomMessagesList, setRoomMessagesList] = useState({});

  function getRoom() {

    const reference = database().ref("CodeTalks/codeChatRooms/" + roomId);
    reference
      .once('value')
      .then(snapshot => {
        setRoomInfo(snapshot.val());
      });

  }

  function getRoomMessages() {

    const reference = database().ref("CodeTalks/codeChatRoomMessages/" + roomId);
    reference.on('value', snapshot => {
      setRoomMessagesList({});
      const list = [];
      const listt = [];
      if (snapshot.val() != null) {

        snapshot.forEach(c => {

          const i = c.val();
          list.push(i);

        });

        setRoomMessagesList(list);
      } else {
        setRoomMessagesList({});
      }

    });

  }

  function sendMessage() {

    let today = new Date();

    let todayy = today.getFullYear() + '' +
      ((today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1))
        : (today.getMonth() + 1)) + '' + today.getDate() + ", " +
      today.getHours() + ":" +
      ((today.getMinutes()) < 10 ? ("0" + (today.getMinutes()))
        : (today.getMinutes())) + ":" +
      today.getSeconds();

    if (messageText != '') {

      const reference = database().ref("CodeTalks/codeChatRoomMessages/" + roomId).push();
      reference.set({
        message: messageText,
        messageOwner: user.uid,
        messageOwnerNickName: user.displayName,
        messageFullDate: todayy,
        messageDate: moment().format('lll'),
        messageMonth: (today.getMonth() + 1),
        messageId: reference.key
      });

      setMessageText('');

    } else {
      setMessageText('');
    }

  }

  function renderItem({ item, index }) {

    return (
      <MessageInfo
        item={item}
      />
    )

  }

  useEffect(() => {

    getRoom();
    getRoomMessages();

  }, [roomId])


  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: Colors.white
    }}>

      <TouchableOpacity onPress={() => {
        navigation.navigate("HomeScreen")
      }} style={{
        position: 'absolute',
        top: '2%',
        left: '2%',
        right: '2%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <IconIO style={{
          marginRight: '5%'
        }}
          name='arrow-back'
          size={30}
          color='#FF6F00'
        />

        <Text style={{
          fontSize: 24,
          color: '#FF6F00'
        }}>
          {roomInfo.roomName}
        </Text>

      </TouchableOpacity>

      <View style={{
        width: '100%',
        marginTop: '15%',
        height: '85%',
      }}>

        <FlatList
          style={{ width: '100%' }}
          data={roomMessagesList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

      </View>

      <View style={{
        position: 'absolute',
        bottom: '2%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
      }}>

        <TextInput style={{
          width: '80%',
          padding: '2%',
          paddingLeft: '5%',
          paddingRight: '5%',
          backgroundColor: '#ddd',
          borderRadius: 100,
          marginRight: '5%'
        }}
          placeholder="Mesajınız"
          placeholderTextColor={Colors.dark}
          color={Colors.black}
          onChangeText={text => setMessageText(text)}
          value={messageText}
        />

        <TouchableOpacity onPress={() => {
          sendMessage();
          setMessageText('');
        }}>
          <IconIO
            name='send'
            size={36}
            color='#FF6F00'
          />
        </TouchableOpacity>


      </View>

    </SafeAreaView>
  )
}

export default ChatScreen