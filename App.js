import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/Stack';
import LottieImage from './components/Loading/Loading';
import { StyleSheet } from 'react-native';
import { useState,useEffect } from 'react';
import { View } from 'react-native';

const App = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 예시로 3초 후에 로딩이 완료되도록 설정
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <LottieImage
                    style={styles.container}
                />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(45, 53, 65, 0.2)', 
    },
});



export default App; 