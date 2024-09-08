import React from 'react';
import { Dimensions, Text, Alert, BackHandler, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import BottomNavigationBar from '../Main';
import { setStorage, getStorage, getAllStoredData } from '../Commin/Async';


const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


export default function Login() {

  const [login_yn, setLogin_yn] = useState(false);
  const [id, setid] = useState("");
  const [pw, setpw] = useState("");


  /* 뒤로 가기 앱 종료 */
  const backAction = () => {
    Alert.alert(
      '알림',
      '앱을 종료하시겠습니까?',
      [
        { text: '취소', onPress: () => null, style: 'cancel' },
        { text: '확인', onPress: () => BackHandler.exitApp(), style: 'destructive' },
      ],
      { cancelable: true }
    );
    return true;
  };

  /* 뒤로 가기 버튼 핸들러 등록 및 해제 */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);


  function Login() {
    if (id === "123" && pw === "123") {
      setLogin_yn(true)
      setStorage("User", id)
    }
    else {
      Alert.alert('아이디 또는 비밀번호 확인요망', '', [
        { text: '확인', onPress: () => console.log('OK Pressed') },
      ]);
    }
  }

  return (
    <>
      <View style={styles.container}>

        <View style={styles.titlebox} />

        <View style={styles.logobox}>
          <Image source={require('../Commin/logo.png')}
            style={{
              width: 168,
              height: 122,
            }}
          />
        </View>

        <View style={styles.titlebox}>
          <View style={styles.tabLabel} />
          <Text style={styles.tabLabel}>아이디</Text>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={(text) => { setid(text) }}
          />
          <View style={styles.tabLabel} />
        </View>
        <View style={styles.titlebox}>
          <View style={styles.tabLabel} />
          <Text style={styles.tabLabel}>비밀번호</Text>
          <TextInput
            style={styles.input}
            value={pw}
            onChangeText={(text) => { setpw(text) }}
          />
          <View style={styles.tabLabel} />
        </View>

        <View style={styles.logintotalbox}>
          <TouchableOpacity style={styles.loginbox} activeOpacity={0.9}
            onPress={() => Login()}>
            <Text style={{ fontWeight: "700", color: "black" }}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titlebox} />

      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    display: "flex"
  },
  logobox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  titlebox: {
    flex: 1,
    width: Dimensions.get('window').width * 0.7,
    flexDirection: 'column',
    display: "flex",
  },
  logintotalbox: {
    flex: 1,
    width: Dimensions.get('window').width * 0.7,
    flexDirection: 'column',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    color: "#000000",
    fontWeight: "400",
  },
  input: {
    flex: 0.25,
    width: Dimensions.get('window').width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  loginbox: {
    width: 148,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFAB70',
    borderColor: "#000000",
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 10,
  },
});
