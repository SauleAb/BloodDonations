import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CommonContainer from '@/components/CommonContainer';
import CommonBackground from "@/components/CommonBackground";
import { useFonts } from "expo-font";
import CommonText from "@/components/CommonText";
import CommonTextBold from "@/components/CommonTextBold";

export default function AuthenticationType() {

    const targetDate = new Date('2024-12-31T23:59:59');

    const [fontsLoaded] = useFonts({
        'Aileron-Regular': require('../../assets/fonts/Aileron-Regular.otf'),
        'Aileron-Bold': require('../../assets/fonts/Aileron-Bold.otf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <CommonBackground>
                <CommonContainer style={styles.commonContainer}>
                    <CommonTextBold style={styles.bigTitleText}>Profile Name</CommonTextBold>
                    <CommonText>John Doe</CommonText>
                </CommonContainer>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commonContainer: {
        padding: 10,
        width: '90%',
    },
    bigTitleText: {
        fontSize: 30,
        fontFamily: 'Aileron-Bold'
    },
});