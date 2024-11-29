import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CommonTextBold from "@/components/common/CommonTextBold";
import { IconNames, iconMap } from "@/components/common/CommonContent";

type CommonRewardBoxProps = {
    titleText: string;
    amountText: string;
    icon: IconNames;
};

const CommonRewardBox: React.FC<CommonRewardBoxProps> = ({ titleText, icon, amountText }) => {
    const iconSource = iconMap[icon];

    return (
        <View style={styles.container}>
            <View style={styles.greyBar}>
                <CommonTextBold style={styles.label}>{titleText}</CommonTextBold>
                <Text style={styles.label}>{amountText}</Text>
            </View>
            <View style={[styles.contentWrapper, styles.shadow]}>
                <View style={styles.content}>
                    <Image source={iconSource} style={styles.contentIcon} />
                </View>
            </View>
        </View>
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
        fontFamily: 'Instrument-Sans',
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