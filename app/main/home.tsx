import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CommonContainer from '@/components/Common/CommonContainer';
import CommonBackground from "@/components/Common/CommonBackground";
import TimeTillNextDonation from "@/components/TimeTillNextDonation";
import { useFonts } from "expo-font";
import CommonText from "@/components/Common/CommonText";
import CommonTextBold from "@/components/Common/CommonTextBold";

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
                    <CommonText style={styles.titleText}>Time Till Next Donation</CommonText>
                        <TimeTillNextDonation targetDate={targetDate} style={styles.contentText} />
                </CommonContainer>

                <CommonContainer style={styles.commonContainer}>
                    <CommonText style={styles.titleText}>Next Reward</CommonText>
                    <CommonTextBold style={styles.contentText}>2 Donations</CommonTextBold>
                </CommonContainer>

                <CommonContainer style={styles.commonContainer}>
                    <CommonText style={styles.titleText}>Blood Donated</CommonText>
                    <CommonTextBold style={styles.contentText}>1.8 Liters!</CommonTextBold>
                </CommonContainer>

                <View style={styles.twoCommonContainersContainer}>
                    <CommonContainer style={[styles.halfCommonContainer, styles.halfCommonContainerLeft]}>
                        <View style={styles.titleTextContainer}>
                            <CommonText style={styles.titleText}>Blood Donated</CommonText>
                        </View>
                        <View style={styles.contentTextContainer}>
                            <CommonTextBold style={styles.contentText}>1.8 Liters!</CommonTextBold>
                        </View>
                    </CommonContainer>

                    <CommonContainer style={[styles.halfCommonContainer, styles.halfCommonContainerRight]}>
                        <View style={styles.titleTextContainer}>
                            <CommonText style={styles.titleText}>Blood Donated</CommonText>
                        </View>
                        <View style={styles.contentTextContainer}>
                            <CommonTextBold style={styles.contentText}>1.8 Liters!</CommonTextBold>
                        </View>
                    </CommonContainer>
                </View>


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
        marginTop: 40,
    },
    twoCommonContainersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:9,
        width: '90%',
    },

    halfCommonContainer: {
        flex: 1,
        marginTop: 20,
        height: '88%',
    },
    halfCommonContainerRight: {
        marginLeft: 9
    },
    halfCommonContainerLeft: {
        marginRight: 9
    },

    titleTextContainer: {
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        backgroundColor: '#d4d4d4',
        paddingVertical: 8,
    },
    contentTextContainer: {
    },
    titleText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    contentText: {
        fontSize: 30,
        alignSelf: 'center',
    },
});