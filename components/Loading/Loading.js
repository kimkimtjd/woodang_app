import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
// import LottieView   from 'lottie-react-native'; // lottie-react-native 라이브러리를 사용하여 Lottie 애니메이션을 렌더링
import { StyleSheet } from 'react-native';

const LottieImage = () => {
  // const progress = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.timing(progress, {
  //     toValue: 1,
  //     duration: 3000, // 애니메이션 지속 시간
  //     useNativeDriver: true,
  //   }).start();
  // }, []);

  return (
    <View style={styles.container}>
      {/* <Lottie   
        source={require('./1-loading00.json')}
        style={{
          width: '100%',
          height: '100%',
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      width: 88,
      height:88,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: '#eee', 
  },
});


export default LottieImage;


