import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CommonBackground from "@/components/common/CommonBackground";
import DonationDataCard from "@/components/DonationCard";
import { IconNames } from "@/components/common/CommonContent";
import CommonButton from '@/components/common/CommonButton';

export default function DonationsData() {
    return (
        <View>
            <CommonBackground logoVisible={true} mainPage={true}>
            <DonationDataCard 
                title="Blood Donated" 
                value="3 liters" 
                icon={IconNames.BloodDonated} 
            />
            <DonationDataCard 
                title="Plasma Donated" 
                value="2 liters" 
                icon={IconNames.BloodDrop} 
            />
            <DonationDataCard 
                title="Last Time Donated" 
                value="3 weeks ago" 
                icon={IconNames.Time} 
            />
            <DonationDataCard 
                title="People Helped" 
                value="5" 
                icon={IconNames.Heart} 
            />
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '90%',
        height: '30%'
    },
});
