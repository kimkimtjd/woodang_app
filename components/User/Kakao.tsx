import React from 'react';
import WebView from 'react-native-webview';
import { Dimensions, Alert, BackHandler } from 'react-native';
import { useEffect } from 'react';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const Home = () => {

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
            <WebView
                originWhitelist={['*']}
                source={{ uri: 'http://prod.pelvicbio.com/' }} // 웹뷰가 로드할 URL 설정
                style={{ width: Width, height: Height }} // 웹뷰의 스타일 설정
            />
        </>

    );
};

export default Home;