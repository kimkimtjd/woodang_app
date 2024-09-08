import React from 'react';
import { Dimensions, Text, Alert, BackHandler, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';


const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


export default function Mypage() {
    const content = ["누적인증일수", "이번주인증일수", "벌금금액"];



    return (
        <View style={styles.container}>
            <View style={styles.case1} >

                <View style={styles.case1first} >

                    <View style={styles.case1firstlogo} >
                        <Image source={require('../Commin/logo.png')} resizeMode='contain'
                            style={{
                                width: 100,
                                height: 100,

                            }}
                        />
                    </View>

                    <View style={styles.case1firstcontent} >
                        <Text style={{ color: "white", marginBottom: 10 }} >김성원</Text>
                        <Text style={{ color: "white" }} >kimeende@naver.com</Text>
                    </View>


                </View>

                <View style={styles.case1second} >
                    <Text style={{ color: 'black', fontWeight: "900", fontSize: 20 }}>오운완 인증하기</Text>
                </View>

                <View style={styles.case1third} >
                    <View style={styles.case1thirdfirst}>
                        <View style={styles.case1thirdcontent}>
                            {content.map((number, index) => (
                                <View key={index} style={{
                                    width: Width * 0.9 / 3, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'column'
                                }}>
                                    {number === "누적인증일수" ?
                                        <>
                                            <Text style={{ color: "white" }}>
                                                {number}
                                            </Text>
                                            <Text style={{ color: "white" }}>
                                                0일
                                            </Text>
                                        </>
                                        :
                                        number === "이번주인증일수" ?
                                            <>
                                                <Text style={{ color: "white" }}>
                                                    {number}
                                                </Text>
                                                <Text style={{ color: "white" }}>
                                                    0일
                                                </Text>
                                            </>
                                            :
                                            <>
                                                <Text style={{ color: "white" }}>
                                                    {number}
                                                </Text>
                                                <Text style={{ color: "white" }}>
                                                    0원
                                                </Text>
                                            </>
                                    }
                                </View>
                            ))}

                        </View>
                    </View>

                </View>

            </View>

            <View style={styles.case2} >
                <Text style={{ color: 'black', fontSize: 30 }}>이미지 없을경우</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    case1: {
        flex: 1,
        backgroundColor: '#05052F',
        display: 'flex',
        flexDirection: 'column',
    },
    case1first: {
        flex: 3,
        backgroundColor: '#05052F',
        display: 'flex',
        flexDirection: 'row'
    },
    case1firstlogo: {
        flex: 1.5,
        backgroundColor: '#05052F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    case1firstcontent: {
        flex: 3,
        backgroundColor: '#05052F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    case1second: {
        flex: 1,
        backgroundColor: '#FFAB70',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    case1third: {
        flex: 2,
        backgroundColor: '#05052F',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    case1thirdfirst: {
        width: Width * 0.9,
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    case1thirdcontent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    case2: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

});
