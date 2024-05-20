import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WebviewContainer from '../../components/Main';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={WebviewContainer} />     
        </Stack.Navigator>  
    );
};

export default StackNavigation;