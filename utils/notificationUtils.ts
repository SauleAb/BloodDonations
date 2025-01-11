import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

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

    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
        console.error("Missing projectId. Configure your app with EAS.");
        return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    return token;
}

export function addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void
) {
    return Notifications.addNotificationReceivedListener(callback);
}

export function removeNotificationListener(listener: Notifications.Subscription) {
    Notifications.removeNotificationSubscription(listener);
}

interface APINotification {
    title: string;
    content: string;
    user_id: number;
    id: number;
    created_at: string;
    retrieved: boolean;
}

export const fetchNewNotifications = async (userId: number): Promise<APINotification[]> => {
    try {
        const response = await axios.get(`https://sanquin-api.onrender.com/users/${userId}/new-notifications`);
        if (response.status === 200 && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            return [];
        }
        console.error("Unexpected error fetching new notifications:", error);
        return [];
    }
};


let pollingInterval: NodeJS.Timeout | null = null;

export const startNotificationPolling = (userId: number) => {
    if (pollingInterval) return;

    pollingInterval = setInterval(async () => {
        const newNotifications = await fetchNewNotifications(userId);
        newNotifications.forEach(async (notification) => {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: notification.title,
                    body: notification.content,
                },
                trigger: null, 
            });
        });
    }, 5000); 
};

export const stopNotificationPolling = () => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
};
