import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CommonTextBold from '@/components/common/CommonTextBold';
import CommonText from './common/CommonText';

interface LocationItemProps {
    name: string;
    distance: string;
}

export default function LocationItem({ name, distance }: LocationItemProps) {
    return (
        <View style={styles.container}>
            <CommonTextBold style={styles.name}>{name}</CommonTextBold>
            <CommonText style={styles.distance}>{distance}</CommonText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        paddingHorizontal: '15%'
    },
    name: {
        fontSize: 16,
    },
    distance: {
        fontSize: 14,
        color: '#888',
    },
});
