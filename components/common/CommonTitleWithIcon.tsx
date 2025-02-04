import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { iconMap, IconNames } from './CommonIcons';
import CommonText from "@/components/common/CommonText";

export type CommonTitleWithIconProps = {
    titleText: string;
    icon?: IconNames;
};

const CommonTitleWithIcon: React.FC<CommonTitleWithIconProps> = ({ titleText, icon }) => {
    const iconSource = icon ? iconMap[icon] : null;

    return (
        <View style={styles.container}>
                <CommonText style={styles.label}>{titleText}</CommonText>
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
