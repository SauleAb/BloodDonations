import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CommonTextBold from "@/components/common/CommonTextBold";

export enum IconNames {
    BloodDrop = 'BloodDrop',
    BloodDonated = 'BloodDonated',
    BloodSample = 'BloodSample',
    Notification = 'Notification',
    Reward = 'Reward',
    AccountData = 'AccountData',
    BloodData = 'BloodData',
    DonationData = 'DonationData',
    LocationData = 'LocationData',
    Heart = 'Heart',
    Time = 'Time',
    Delete = 'Delete',
    Settings = "Settings"
}

export const iconMap: Record<IconNames, any> = {
    [IconNames.BloodDrop]: require('@/assets/icons/blood-drop-icon.png'),
    [IconNames.BloodDonated]: require('@/assets/icons/blood-donated-icon.png'),
    [IconNames.BloodSample]: require('@/assets/icons/blood-sample-icon.png'),
    [IconNames.Notification]: require('@/assets/icons/notification-icon.png'),
    [IconNames.Reward]: require('@/assets/icons/reward-icon.png'),
    [IconNames.AccountData]: require('@/assets/icons/account-data.png'),
    [IconNames.BloodData]: require('@/assets/icons/BloodData.png'),
    [IconNames.DonationData]: require('@/assets/icons/BloodDonationsData.png'),
    [IconNames.LocationData]: require('@/assets/icons/DonationsLocationsData.png'),
    [IconNames.Heart]: require('@/assets/icons/heart.png'),
    [IconNames.Time]: require('@/assets/icons/time.png'),
    [IconNames.Delete]: require('@/assets/icons/trash.png'),
    [IconNames.Settings]: require('@/assets/icons/setting.png')
};

type CommonContentProps = {
    titleText: string;
    contentText: string;
    icon?: IconNames;
    contentTextSize?: 'small' | 'large';
    leftText?: string; // New prop for left-side text
    rightText?: string; // New prop for right-side text
};

const CommonContent: React.FC<CommonContentProps> = ({
    titleText,
    contentText,
    icon,
    contentTextSize = 'large',
    leftText,
    rightText
}) => {
    const iconSource = icon ? iconMap[icon] : null;
    const contentTextStyle = contentTextSize === 'small' ? styles.contentTextSmall : styles.contentTextLarge;

    return (
        <View style={styles.container}>
            <View style={styles.greyBar}>
                <Text style={styles.label}>{titleText}</Text>
                {iconSource && <Image source={iconSource} style={styles.icon} />}
            </View>
            <View style={[styles.contentWrapper, styles.shadow]}>
                <View style={styles.content}>
                    {leftText && <Text style={styles.leftText}>{leftText}</Text>}
                    <CommonTextBold style={contentTextStyle}>
                        {contentText}
                    </CommonTextBold>
                    {rightText && <Text style={styles.rightText}>{rightText}</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: 20,
    },
    greyBar: {
        backgroundColor: 'rgba(223,223,223,0.5)',
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 4,
    },
    label: {
        fontSize: 16,
        color: '#404040',
        fontFamily: 'Instrument-Sans'
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentTextLarge: {
        fontSize: 30,
        lineHeight: 30,
        fontFamily: 'Instrument-Sans',
        fontWeight: "bold"
    },
    contentTextSmall: {
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'Instrument-Sans',
        fontWeight: "bold",
    },
    leftText: {
        fontSize: 16,
        color: '#404040',
        marginRight: 10,
        fontFamily: 'Instrument-Sans',
        fontWeight: "bold"
    },
    rightText: {
        fontSize: 16,
        color: '#404040',
        marginLeft: 10,
        fontFamily: 'Instrument-Sans'
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 5,
        width: 20,
        height: 20,
    },
});

export default CommonContent;