import React from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Dimensions, Alert, BackHandler } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { login } from '@react-native-seoul/kakao-login';
import BottomNavigationBar from '../Main';
import axios from 'axios';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


export default function Home() {

  const [login_yn, setLogin_yn] = useState(false);

  /* 웹뷰 통신을 위해 설정 */
  const webviewRef = useRef(null);

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


  /* StackNavigation animation 적용을 위해 변수 셋팅 */
  const targetUrl = 'http://prod.pelvicbio.com/';

  /* 웹에서 받기 */
  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    /* 카카오 로그인일경우 */
    if (nativeEvent?.feature === 'request-kakao-login') {
      signInWithKakao()
    }

  };

  /* 카카오 로그인 */
  const signInWithKakao = async () => {
    try {
      const result = await login();
      const accessToken = result.accessToken;

      if (accessToken) {
        const userId = await getKakaoUserId(accessToken);

        const message = JSON.stringify({
          feature: 'response-kakao-login',
          data: { kakaoId: userId },
        });
        if (webviewRef.current) {
          (webviewRef.current as any).postMessage(message);
          if((webviewRef.current as any).postMessage(message) === "undefined"){
            setLogin_yn(false);  
          }
          else{
            setLogin_yn(true);  
          }
          
        }

      } else {
      }
    } catch (error) {
    }
  };

  /* 토큰을 이용하여 정보를 추출 */
  const getKakaoUserId = async (accessToken: string) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // 사용자 정보에서 ID 추출
      const userId = response.data.id;
      return userId;
    } catch (error) {
      console.error('Failed to fetch Kakao user info:', error);
      throw error;
    }
  };

  return (
    <>
      <WebView
        originWhitelist={['*']}
        ref={webviewRef}
        source={{ uri: targetUrl }}
        style={{ width: Width, height: Height }}
        onMessage={requestOnMessage}
      />
      {login_yn?
        <BottomNavigationBar/>
        :
        <></>
      }

    </>

  );
};
