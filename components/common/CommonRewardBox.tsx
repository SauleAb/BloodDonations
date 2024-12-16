import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { IconNames, iconMap } from "@/components/common/CommonContent";
import CommonText from "@/components/common/CommonText";

type CommonRewardBoxProps = {
    titleText: string;
    amountText: string;
    icon: IconNames;
    onPress: () => void; // ask for confirmation here
};

const CommonRewardBox: React.FC<CommonRewardBoxProps> = ({ titleText, icon, amountText, onPress }) => {
    const iconSource = iconMap[icon];

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.greyBar}>
                <CommonText bold style={styles.label}>{titleText}</CommonText>
                <CommonText style={styles.label}>{amountText}</CommonText>
            </View>
            <View style={[styles.contentWrapper, styles.shadow]}>
                <View style={styles.content}>
                    <Image source={iconSource} style={styles.contentIcon} />
                </View>
            </View>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '40%',
        marginHorizontal: 15,
    },
    greyBar: {
        backgroundColor: 'rgba(223,223,223,0.5)',
        height: 60,
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        paddingHorizontal: 20,
        paddingVertical: 4,
        flexDirection: 'column',
    },
    label: {
        fontSize: 16,
        color: '#404040',
        textAlign: 'center', // Ensure the text itself is centered
    },
    contentWrapper: {
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    shadow: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    content: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center', // Center the icon
    },
    contentIcon: {
        width: 80,
        height: 80,
    },
});

export default CommonRewardBox;