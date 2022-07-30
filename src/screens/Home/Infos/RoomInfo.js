import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

const RoomInfo = ({ item, index, navigation, listCount }) => {

    const [isLastRoom, setIsLastRoom] = useState(false)

    useEffect(() => {

        if ((index == listCount - 1) && (listCount % 2) != 0) {
            setIsLastRoom(true);
        } else {
            setIsLastRoom(false)
        }

    }, [index])


    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("ChatScreen", {
                roomId: item.roomId
            });
        }} style={{
            margin: '2%',
            width: isLastRoom ? '96%' : '46%',
            minHeight: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#FF6F00',
            borderRadius: 20
        }}>
            <Text style={{
                fontSize: 24,
                color: '#FF6F00',
            }}>{item.roomName}</Text>
        </TouchableOpacity>
    )
}

export default RoomInfo