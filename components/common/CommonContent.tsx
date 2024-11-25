import React from 'react';
import {StyleSheet, Text, TextStyle, View, Image} from 'react-native';
import CommonText from "@/components/common/CommonText";
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
    Time = 'Time'
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
    [IconNames.Time]: require('@/assets/icons/time.png')
};

type CommonContentProps = {
    titleText: string;
    contentText: string;
    icon?: IconNames;
};

const CommonContent: React.FC<CommonContentProps> = ({ titleText, contentText, icon }) => {
    const iconSource = icon ? iconMap[icon] : null;

    return (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.greyBar}>
                <Text style={styles.label}>{titleText}</Text>
                {iconSource && <Image source={iconSource} style={styles.icon} />}
            </View>

            <View style={styles.content}>
                <CommonTextBold style={styles.contentText}>
                    {contentText}
                </CommonTextBold>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: 20,
        borderRadius: 0,
        overflow: 'hidden',
    },
    shadow: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
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
    },
    content: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center'
    },
    contentText: {
        fontSize: 30,
        lineHeight: 30,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 5,
        width: 20,
        height: 20,
    }
});

export default CommonContent;
