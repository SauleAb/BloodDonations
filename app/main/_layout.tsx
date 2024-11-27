import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { IconNames, iconMap } from '@/components/common/CommonContent';

export default function MainLayout() {
    return (
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
                        : iconMap[IconNames.AccountData]; // Default fallback icon

                return {
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={iconSource}
                            style={[
                                styles.icon,
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
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});
