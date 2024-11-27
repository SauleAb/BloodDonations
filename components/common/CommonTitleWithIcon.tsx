import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { iconMap, IconNames } from './CommonContent';
import { useFonts } from 'expo-font';

export type CommonTitleWithIconProps = {
    titleText: string;
    icon?: IconNames;
};

const CommonTitleWithIcon: React.FC<CommonTitleWithIconProps> = ({ titleText, icon }) => {
    const iconSource = icon ? iconMap[icon] : null;

    return (
        <View style={styles.container}>
                <Text style={styles.label}>{titleText}</Text>
                {iconSource && <Image source={iconSource} style={styles.icon} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(223,223,223,0.5)',
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 4,
        width: '90%'
    },

    label: {
        fontSize: 16,
        color: '#404040',
        fontFamily: 'Instrument-Sans',
    },

    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#404040',
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 5,
        width: 20,
        height: 20,
    },
});

export default CommonTitleWithIcon;
