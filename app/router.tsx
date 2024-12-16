import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUser } from '@/components/UserContext';

import Register from './register';
import NextScreen from './next';
import MainLayout from './_layout'; // Tabs for authenticated users

const Stack = createStackNavigator();

export default function Router() {
    const { user, loading } = useUser();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name="Main" component={MainLayout} />
                ) : (
                    <>
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Next" component={NextScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
