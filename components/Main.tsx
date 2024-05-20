import React, { useState, useEffect } from 'react';
import { Linking, View, Text, StyleSheet, TouchableOpacity, Dimensions, BackHandler, Alert, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

interface BottomNavigationTabProps {
  label: string;
  onPress: () => void;
  isActive: boolean;
}

const BottomNavigationTab: React.FC<BottomNavigationTabProps> = ({ label, onPress, isActive }) => {
  const styles = StyleSheet.create({
    tab: {
      width: Width / 2,
      alignItems: 'center',
      justifyContent: 'center',
      height: 64,
      // backgroundColor: isActive ? 'lightgray' : 'white', // Change color based on active state
      borderTopLeftRadius: 10
    },
    tabsecond: {
      width: Width / 2,
      alignItems: 'center',
      justifyContent: 'center',
      height: 64,
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

const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fcmToken, setFcmToken] = useState('');

  const screens = [
    { label: '홈', onPress: () => console.log('Home pressed') },
    { label: '일지', onPress: () => console.log('Settings pressed') },
  ];

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

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions_first()
    }

  }, []);

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    if (token) {
      setFcmToken(token);
      console.log(token)
    } else {
    }
  };

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  const backAction = () => {
    Alert.alert(
      '알림',
      '앱을 종료하시겠습니까?',
      [
        { text: '취소', onPress: () => { }, style: 'cancel' },
        {
          text: '확인',
          onPress: () => {
            BackHandler.exitApp();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => { },
      },
    );
    return true;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      {activeTab === 0 ?
        <View style={styles.fullbox}>
          <Text style={{ color: "black" }}>{fcmToken}</Text>
        </View>
        : activeTab === 1 ?
          <View style={styles.fullbox}>
            <Text style={{ color: "black" }}>일지</Text>
          </View>
          :
          <View style={styles.fullbox}>
            <Text style={{ color: "black" }}>메인</Text>
          </View>
      }

      <View style={styles.navigationBar}>
        {screens.map((screen, index) => (
          <BottomNavigationTab
            key={index}
            label={screen.label}
            onPress={() => handleTabPress(index)}
            isActive={index === activeTab}
          />
        ))}
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
  fullbox: {
    width: Width,
    height: Height,
  }
});

export default BottomNavigationBar;