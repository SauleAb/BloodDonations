import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Set the notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Function to register for push notifications
export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

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

// Function to listen for incoming notifications
export function addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void
) {
    return Notifications.addNotificationReceivedListener(callback);
}

// Function to remove notification listener
export function removeNotificationListener(listener: Notifications.Subscription) {
    Notifications.removeNotificationSubscription(listener);
}