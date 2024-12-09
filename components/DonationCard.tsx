import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CommonText from '@/components/common/CommonText';
import { IconNames, iconMap } from '@/components/common/CommonContent';

interface DonationDataCardProps {
    title: string;
    value: string;
    icon: IconNames;
}

export default function DonationDataCard({ title, value, icon }: DonationDataCardProps) {
    const iconSource = iconMap[icon];

    return (
        <View style={styles.container}>
            <Image source={iconSource} style={styles.icon} />
            <View style={styles.textContainer}>
                <CommonText bold style={styles.title}>{title}</CommonText>
                <CommonText style={styles.value}>{value}</CommonText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '90%',
        height: 100
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 15, 
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
        color: '#000000'
    },
    value: {
        fontSize: 14,
        color: '#888',
    },
});
