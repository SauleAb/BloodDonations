import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MainLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => {
                let iconName: keyof typeof Ionicons.glyphMap;

                if (route.name === 'home') {
                    iconName = 'home';
                } else if (route.name === 'profile') {
                    iconName = 'person';
                } else if (route.name === 'community') {
                    iconName = 'chatbubbles';
                } else {
                    iconName = 'help-circle';
                }

                return {
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={iconName} size={size} color={color} />
                    ),
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                };
            }}
        >
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="community" options={{ title: 'Community' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    );
}