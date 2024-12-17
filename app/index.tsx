import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";
import indexStyles from './styles/IndexStyle';
import commonStyles from './styles/CommonStyles';
import {
    registerForPushNotificationsAsync,
    addNotificationReceivedListener,
    removeNotificationListener
} from '@/utils/notificationUtils';
 
const { height } = Dimensions.get('window');
 
export default function HomeScreen() {
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log("Push notification token:", token);
        });
 
        const notificationListener = addNotificationReceivedListener((notification) => {
            console.log("Notification received:", notification);
        });
 
        return () => {
            removeNotificationListener(notificationListener);
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
                {/* New Button to Navigate to User List */}
                <CommonButton href="/userlist" style={indexStyles.button}>
                    View Users
                </CommonButton>
            </CommonBackground>
        </View>
    );
}
 