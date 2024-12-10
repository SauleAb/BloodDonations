import React, { useEffect } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";
import indexStyles from './styles/IndexStyle';
import commonStyles from './styles/CommonStyles';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const { height } = Dimensions.get('window');

export default function HomeScreen() {
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log("Push notification token:", token);
            // Optionally send this token to your backend
        });

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log("Notification received:", notification);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
        };
    }, []);

    return (
        <View style={commonStyles.container}>
            <CommonBackground style={indexStyles.backgroundImage} backgroundHeight={1} fullScreen={true}>
                <View style={indexStyles.logoContainer}>
                    <LogoSanquin width={400} height={400} />
                </View>
                <CommonText style={[indexStyles.welcomeText, { marginTop: height * 0.7 }]}>
                    Welcome Aboard! Thank you for starting your donor adventure!
                </CommonText>
                <CommonButton href="/login" style={indexStyles.button}>
                    Begin Your Journey
                </CommonButton>
            </CommonBackground>
        </View>
    );
}

async function registerForPushNotificationsAsync() {
    let token;

    // Set notification channel for Android
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    // Get the push token for this device
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
            alert('Permission to receive notifications was denied.');
            return;
        }
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    return token;
}