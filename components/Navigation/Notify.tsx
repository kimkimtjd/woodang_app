import React from 'react';
import { Dimensions, Text, Alert, BackHandler, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';


const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


export default function Notify() {

    const contentday = ["오운완 챌린지 규칙", "1주차 벌금 현황", "2주차 벌금 현황"];

    function Locate(number:any){
        Alert.alert(number +'디자인 대기중', '', [
            { text: '확인', onPress: () => console.log('OK Pressed') },
          ]);
    }

    return (
        <View style={styles.container}>
            <View style={styles.first}>
                <View style={styles.inner}>
                    <Text style={{ color: 'black', fontSize: 20 }}>공지사항</Text>
                </View>
            </View>
            <View style={styles.second}>
                {contentday.map((number, index) => (
                    <TouchableOpacity style={styles.innerlist} activeOpacity={0.9}
                    onPress={() => Locate(number)}>
                        <Text style={{ color: 'black' }}>{number}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    first: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        width: Width * 0.9,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    second: {
        flex: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    innerlist: {
        width: Width * 0.85,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor:'#F4F4F4',
        marginBottom:5
        // backgroundColor: 'red'
    },

});
