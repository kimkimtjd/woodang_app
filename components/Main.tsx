import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, BackHandler, Alert, PermissionsAndroid, Platform } from 'react-native';
import Calender from './Navigation/Calender';
import Mypage from './Navigation/Mypage';
import Notify from './Navigation/Notify';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


interface BottomNavigationTabProps {
  label: string;
  onPress: () => void;
  isActive: boolean;
}


/* navbar */
const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const screens = [
    { label: '홈', onPress: () => console.log('Home pressed') },
    { label: '마이페이지', onPress: () => console.log('Settings pressed') },
    { label: '공지사항', onPress: () => console.log('Settings pressed') },
  ];

  /* navbar */
  const BottomNavigationTab: React.FC<BottomNavigationTabProps> = ({ label, onPress, isActive }) => {
    const styles = StyleSheet.create({
      tab: {
        width: Width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        backgroundColor: "#05052F",
      },
      tabLabel: {
        fontSize: 16,
        color: "rgba(187, 191, 205, 1)"
      },
      tabLabelactive: {
        fontSize: 16,
        color: "rgb(255, 36, 0)"
      },
    });

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {label === "홈" ?
          <View style={styles.tab}>
            {activeTab === 0 ?
              <Text style={styles.tabLabelactive}>홈</Text>
              :
              <Text style={styles.tabLabel}>홈</Text>
            }
          </View>
          :
          label === "마이페이지" ?
            <View style={styles.tab}>
              {activeTab === 1 ?
                <Text style={styles.tabLabelactive}>마이페이지</Text>
                :
                <Text style={styles.tabLabel}>마이페이지</Text>
              }
            </View>
            :
            <View style={styles.tab}>
              {activeTab === 2 ?
                <Text style={styles.tabLabelactive}>공지사항</Text>
                :
                <Text style={styles.tabLabel}>공지사항</Text>
              }
            </View>
        }
      </TouchableOpacity>
    );

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
        <View style= {{ display:"flex" , justifyContent:"center" , alignItems:"center" , backgroundColor:"#FFFFFF" , width:Width , height:Height}}>
          <Calender />
        </View>
        : activeTab === 1 ?
          <View style={{ flex:1 }}>
            <Mypage/>
          </View>
          :
          <View style={{ flex:1 }}>
            <Notify/>
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
    backgroundColor: "#05052F",
  },
});

export default BottomNavigationBar;