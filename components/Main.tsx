import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, BackHandler, Alert, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Home from './User/Kakao';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

interface BottomNavigationTabProps {
  label: string;
  onPress: () => void;
  isActive: boolean;
}

/* navbar */
const BottomNavigationTab: React.FC<BottomNavigationTabProps> = ({ label, onPress, isActive }) => {
  const styles = StyleSheet.create({
    tab: {
      width: Width / 2,
      alignItems: 'center',
      justifyContent: 'center',
      height: 64,
      backgroundColor: "rgba(238, 240, 246, 1)",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      elevation: 5,
      shadowColor: '#E21B5814',
      // backgroundColor: isActive ? 'lightgray' : 'white', // Change color based on active state
      borderTopLeftRadius: 10
    },
    tabsecond: {
      width: Width / 2,
      alignItems: 'center',
      justifyContent: 'center',
      height: 64,
      backgroundColor: "rgba(238, 240, 246, 1)",
      // backgroundColor: isActive ? 'lightgray' : 'white', // Change color based on active state
      borderTopRightRadius: 10
    },
    tabLabel: {
      fontSize: 16,
      color: "rgba(187, 191, 205, 1)"
    },
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      {label === "홈" ?
        <View style={styles.tab}>
          <Text style={styles.tabLabel}>{label}</Text>
        </View>
        :
        <View style={styles.tabsecond}>
          <Text style={styles.tabLabel}>{label}</Text>
        </View>
      }
    </TouchableOpacity>
  );

};

/* navbar */
const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fcmToken, setFcmToken] = useState('');

  const screens = [
    { label: '홈', onPress: () => console.log('Home pressed') },
    { label: '일지', onPress: () => console.log('Settings pressed') },
  ];

  /* 알림권한부여 */
  const requestPermissions_first = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: "알림 권한 요청",
            message: "앱에서 알림을 보내기 위해 권한이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "취소",
            buttonPositive: "허용"
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getFcmToken();
        } else {
          console.log("알림 권한이 거부되었습니다.");
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /* 안드로이드확인후 알림권한을 실행 */
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions_first()
    }

  }, []);

  /* FCM 토큰 생성 */
  const getFcmToken = async () => {
    const token = await messaging().getToken();
    if (token) {
      setFcmToken(token);
      // console.log(token)
    } else {
    }
  };

  /* navbar 탭전환 */
  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

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

  return (
    <>
      {/* 하단탭 */}
      {activeTab === 0 ?
        <View>

        </View>
        : activeTab === 1 ?
          <View>

          </View>
          :
          <View>

          </View>
      }

      {/* navbar */}
      <View style={styles.navigationBar}>
        {screens.map((screen, index) => (
          <BottomNavigationTab
            key={index}
            label={screen.label}
            onPress={() => handleTabPress(index)}
            isActive={index === activeTab}
          />
        ))}
        {/* navbar 가운데 */}
        <TouchableOpacity style={styles.main} activeOpacity={0.9}
          onPress={() => setActiveTab(2)}
        ></TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: Width,
    height: 64,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  main: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(255, 48, 111, 1)",
    position: "absolute",
    top: -32,
    borderRadius: 50,
    right: (Width / 2) - (64 / 2)
  },
});

export default BottomNavigationBar;