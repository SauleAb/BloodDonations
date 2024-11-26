import React from 'react';
import { Image } from 'react-native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CommonContainer from '@/components/common/CommonContainer';
import CommonBackground from "@/components/common/CommonBackground";
import { useFonts } from "expo-font";
import CommonText from "@/components/common/CommonText";
import CommonTextBold from "@/components/common/CommonTextBold";
import CommonButton from '@/components/common/CommonButton';
import { iconMap, IconNames } from '@/components/common/CommonContent';
import CommonScrollElement from '@/components/common/CommonScrollElement';
import { Href } from 'expo-router';

export default function AuthenticationType() {
    const [fontsLoaded] = useFonts({
        'Aileron-Regular': require('../../assets/fonts/Aileron-Regular.otf'),
        'Aileron-Bold': require('../../assets/fonts/Aileron-Bold.otf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const menuItems = [
        { title: 'Account Details', icon: IconNames.AccountData, navigateTo: '/profile/accountdetails' },
        { title: 'Blood Test Data', icon: IconNames.BloodData, navigateTo: '/profile/bloodtestdata' },
        { title: 'Donations Data', icon: IconNames.DonationData, navigateTo: '/profile/donationsdata' },
        { title: 'Locations Near Me', icon: IconNames.LocationData, navigateTo: '/profile/locationsdata' },
    ];

    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                    {menuItems.map((item, index) => (
                        <CommonButton
                        key={index}
                        style={styles.commonButton}
                        href={item.navigateTo as Href<string | object>} // Explicit cast
                    >
                            <View style={styles.row}>
                                <Image source={iconMap[item.icon]} style={styles.icon} />
                                <CommonTextBold style={styles.menuText}>{item.title}</CommonTextBold>
                            </View>
                        </CommonButton>
                    ))}
                </CommonScrollElement>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    commonButton: {
        width: '90%',
        paddingVertical: 15,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 10,
    },
    menuText: {
        fontSize: 18,
        fontFamily: 'Aileron-Regular',
    },
});