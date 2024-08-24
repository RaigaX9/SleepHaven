import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddSleepScreen from '../screens/AddSleepScreen';
import { colors, fonts } from '../customTheme';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: fonts.bold },
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'SleepHaven' }} />
            <Stack.Screen name="Add Sleep" component={AddSleepScreen} options={{ title: 'Add Sleep Entry' }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
