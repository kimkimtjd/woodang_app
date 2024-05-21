import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WebviewContainer from '../../components/Main';
import Home from '../../components/User/Kakao';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}> 
            <Stack.Screen name='Home' component={Home} /> 
            <Stack.Screen name='Main' component={WebviewContainer} />  
        </Stack.Navigator>  
    );
};

export default StackNavigation;