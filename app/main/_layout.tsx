import React from 'react';
import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { IconNames, iconMap } from '@/components/common/CommonContent';
import mainLayoutStyles from '../styles/MainLayoutStyle';
import { useUser } from '@/components/UserContext';

export default function MainLayout() {
    return (
        <View style={mainLayoutStyles.container}>
            <Tabs
                screenOptions={({ route }) => {
                    const iconSource =
                        route.name === 'home'
                            ? iconMap[IconNames.Home]
                            : route.name === 'rewards'
                            ? iconMap[IconNames.Reward]
                            : route.name === 'donate'
                            ? iconMap[IconNames.Blood]
                            : route.name === 'community'
                            ? iconMap[IconNames.Community]
                            : route.name === 'profile'
                            ? iconMap[IconNames.AccountData]
                            : iconMap[IconNames.AccountData];

                    return {
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={iconSource}
                                style={[
                                    mainLayoutStyles.icon,
                                    { tintColor: focused ? 'black' : 'gray' },
                                ]}
                            />
                        ),
                        tabBarActiveTintColor: 'black',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                    };
                }}
            >
                <Tabs.Screen name="home" options={{ title: 'Home' }} />
                <Tabs.Screen name="rewards" options={{ title: 'Rewards' }} />
                <Tabs.Screen name="donate" options={{ title: 'Donate' }} />
                <Tabs.Screen name="community" options={{ title: 'Community' }} />
                <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
            </Tabs>
        </View>
    );
}

