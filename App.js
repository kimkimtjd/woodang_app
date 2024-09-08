import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/Stack';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity , Dimensions } from 'react-native';
import { getStorage ,setStorage } from './components/Commin/Async';


const App = () => {

    const [loading, setLoading] = useState(true);
    const [login_yn, setLogin_yn] = useState(false);
    const [id, setid] = useState("");
    const [pw, setpw] = useState("");

    useEffect(() => {
        // 예시로 3초 후에 로딩이 완료되도록 설정
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    /* 자동로그인 진행 */
    useEffect(() => {
        getStorage("User").then((value) => {
            setTimeout(() => {
                if (value === null) {
                    setLogin_yn(false)
                }
                else {
                    setLogin_yn(true)
                }
            }, 500)

        }).catch((error) => {
            console.error('Error retrieving data from AsyncStorage', error);
        });

    }, [login_yn]);

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

    if (loading) {
        return (
            <View style={styles.container}>
                <Image source={require('./components/Commin/splish.png')}
                    style={{
                        width: 191,
                        height: 192,
                    }}
                />
            </View>
        );
    }

    return (
        <>
            {login_yn ?
                <NavigationContainer>
                    <StackNavigation />
                </NavigationContainer>
                :
                <View style={styles.containerfirst}>

                    <View style={styles.titlebox} />

                    <View style={styles.logobox}>
                        <Image source={require('./components/Commin/logo.png')}
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
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#05052F',
    },

    containerfirst: {
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



export default App; 