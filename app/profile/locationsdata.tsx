import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CommonBackground from "@/components/common/CommonBackground";
import LocationItem from '@/components/LocationItem';

const locations = [
    { id: '1', name: 'Utrecht Hospital', distance: '9.9km away' },
    { id: '2', name: 'Eindhoven Hospital', distance: '36km away' },
];

export default function LocationsData() {
    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <LocationItem name={item.name} distance={item.distance} />
                    )}
                    contentContainerStyle={styles.list}
                />
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    list: {
        paddingVertical: 20,
    },
});
