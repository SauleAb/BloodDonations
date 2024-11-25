import React from 'react';
import { StyleSheet, View } from 'react-native';
import CommonBackground from '@/components/common/CommonBackground';
import CommonContainer from '@/components/common/CommonContainer';
import CommonText from '@/components/common/CommonText';
import CommonTextBold from '@/components/common/CommonTextBold';
import CommonScrollElement from '@/components/common/CommonScrollElement';

export default function AccountDetails() {
    const accountDetails = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        bloodGroup: 'O+',
        nextEligibleDonation: '2024-01-15',
    };

    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                <View style={styles.content}>
                    <CommonContainer style={styles.detailContainer}>
                        <CommonTextBold style={styles.label}>Full Name</CommonTextBold>
                        <CommonText>{accountDetails.name}</CommonText>
                    </CommonContainer>
                    <CommonContainer style={styles.detailContainer}>
                        <CommonTextBold style={styles.label}>Email</CommonTextBold>
                        <CommonText>{accountDetails.email}</CommonText>
                    </CommonContainer>
                    <CommonContainer style={styles.detailContainer}>
                        <CommonTextBold style={styles.label}>Phone</CommonTextBold>
                        <CommonText>{accountDetails.phone}</CommonText>
                    </CommonContainer>
                    <CommonContainer style={styles.detailContainer}>
                        <CommonTextBold style={styles.label}>Blood Group</CommonTextBold>
                        <CommonText>{accountDetails.bloodGroup}</CommonText>
                    </CommonContainer>
                    <CommonContainer style={styles.detailContainer}>
                        <CommonTextBold style={styles.label}>Next Eligible Donation</CommonTextBold>
                        <CommonText>{accountDetails.nextEligibleDonation}</CommonText>
                    </CommonContainer>
                </View>
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
    content: {
        padding: 20,
    },
    detailContainer: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 5,
    },
});
