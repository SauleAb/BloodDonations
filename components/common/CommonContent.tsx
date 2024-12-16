import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import CommonText from "@/components/common/CommonText";
import CommonContentSwitch from "@/components/common/CommonContentSwitch";

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
    Settings = "Settings",
    Community = "Communtiy",
    Home = "Home",
    Blood = "Blood",
    Pin = "Pin",
    RandomPin = "RandomPin",
    Gift = "Gift",
    Uber = "Uber",
    Tickets = "Tickets",
    Medal = "Medal"
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
    [IconNames.Settings]: require('@/assets/icons/setting.png'),
    [IconNames.Community]: require('@/assets/icons/community.png'),
    [IconNames.Home]: require('@/assets/icons/home.png'),
    [IconNames.Blood]: require('@/assets/icons/blood.png'),
    [IconNames.Pin]: require('@/assets/icons/Droplet.png'),
    [IconNames.RandomPin]: require('@/assets/icons/random-pin.png'),
    [IconNames.Gift]: require('@/assets/icons/Gift.png'),
    [IconNames.Uber]: require('@/assets/icons/uber.png'),
    [IconNames.Tickets]: require('@/assets/icons/tickets.png'),
    [IconNames.Medal]: require('@/assets/icons/medal.png'),
};

export type RightTextItem =
    | string
    | { type: 'switch'; switchValue: boolean; onToggle: () => void }
    | { type: 'expandableContent'; details: { left: string; right: string; }[]; title?: string; };

type CommonContentProps = {
    titleText: string;
    contentText?: string | React.ReactNode;
    icon?: IconNames;
    contentTextSize?: 'small' | 'large';
    rightText?: RightTextItem | RightTextItem[];
    children?: React.ReactNode;
    showContent?: boolean;
};

const CommonContent: React.FC<CommonContentProps> = ({
                                                         titleText,
                                                         contentText,
                                                         icon,
                                                         contentTextSize = 'large',
                                                         rightText,
                                                         showContent = true,
                                                     }) => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
    const iconSource = icon ? iconMap[icon] : null;
    const contentTextStyle =
        contentTextSize === 'small' ? styles.contentTextSmall : styles.contentTextLarge;

    const toggleExpand = (index: number) => {
        if (expandedIndices.includes(index)) {
            setExpandedIndices(expandedIndices.filter(i => i !== index));
        } else {
            setExpandedIndices([...expandedIndices, index]);
        }
    };

    const renderRightItem = (item: RightTextItem | undefined, index: number) => {
        if (!item) return null;
        if (typeof item === 'string') {
            return <CommonText style={styles.rightText}>{item}</CommonText>;
        }

        if (item.type === 'switch') {
            return <CommonContentSwitch initialValue={item.switchValue} onToggle={item.onToggle} />;
        }

        if (item.type === 'expandableContent') {
            const isExpanded = expandedIndices.includes(index);
            return (
                <TouchableOpacity onPress={() => toggleExpand(index)}>
                    <CommonText style={styles.rightText}>{item.title || 'View Details'}</CommonText>
                </TouchableOpacity>
            );
        }

        return null;
    };

    const leftTextLines = typeof contentText === 'string' ? contentText.split('\n') : [];
    const rightTextItems = Array.isArray(rightText) ? rightText : rightText ? [rightText] : [];

    return (
        <View style={styles.container}>
            <View style={styles.greyBar}>
                <CommonText style={styles.label}>{titleText}</CommonText>
                {iconSource && <Image source={iconSource} style={styles.icon} />}
            </View>
            {showContent && (
                <View style={[styles.contentWrapper, styles.shadow]}>
                    {leftTextLines.length > 0 && rightTextItems.length > 0 ? (
                        leftTextLines.map((leftText: string, index: number) => {
                            const rightItem = rightTextItems[index];
                            const isExpandable = rightItem && typeof rightItem === 'object' && rightItem.type === 'expandableContent';
                            const isExpanded = isExpandable && expandedIndices.includes(index);

                            return (
                                <View key={index}>
                                    <View style={styles.row}>
                                        <CommonText style={styles.leftText}>{leftText}</CommonText>
                                        {renderRightItem(rightItem, index)}
                                    </View>
                                    {isExpandable && isExpanded && rightItem && typeof rightItem === 'object' && (
                                        <View style={styles.expandedContent}>
                                            {rightItem.details.map((detail, i) => (
                                                <View key={i} style={styles.detailRow}>
                                                    <CommonText style={styles.detailLeft}>{detail.left}</CommonText>
                                                    <CommonText style={styles.detailRight}>{detail.right}</CommonText>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.singleContent}>
                            {contentText && (
                                <CommonText style={contentTextStyle}>
                                    {contentText}
                                </CommonText>
                            )}
                        </View>
                    )}
                </View>
            )}
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
    contentTextLarge: {
        fontSize: 30,
        lineHeight: 30,
        fontWeight: "bold"
    },
    contentTextSmall: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "bold",
    },
    leftText: {
        fontSize: 16,
        color: '#404040',
        fontWeight: "bold",
        marginLeft: 20,
    },
    rightText: {
        fontSize: 16,
        color: '#404040',
        marginRight: 12,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 5,
        width: 20,
        height: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
        width: '100%'
    },
    singleContent: {
        paddingVertical: 15,
        paddingHorizontal: 18,
    },
    expandedContent: {
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 12,
        borderBottomColor: '#b4b4b4',
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    detailLeft: {
        fontSize: 14,
        color: '#404040',
        fontWeight: "bold",
        marginRight: 10,
    },
    detailRight: {
        fontSize: 14,
        color: '#404040',
    }
});

export default CommonContent;
