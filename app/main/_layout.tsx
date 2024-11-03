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
                } else {
                    iconName = 'help-circle'; // Default icon if route name doesn't match
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
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    );
}