import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import CommonText from "@/components/common/CommonText";
import CommonContentSwitch from "@/components/common/CommonContentSwitch";
import { iconMap, IconNames } from './common/CommonIcons';


type CalendarContentProps = {
    titleText: string;
    contentText?: string; 
    icon?: IconNames;
    contentTextSize?: 'small' | 'large';
    leftText?: string;
    rightText?: string;
    children?: React.ReactNode;
    showContent?: boolean;
};



const CalendarContent: React.FC<CalendarContentProps> = ({
    titleText,
    contentText,
    icon,
    contentTextSize = 'large',
    leftText,
    rightText,
    children,
    showContent = true
}) => {
    const iconSource = icon ? iconMap[icon] : null;
    const contentTextStyle = contentTextSize === 'small' ? styles.contentTextSmall : styles.contentTextLarge;

    return (
        <View style={styles.container}>
            <View style={styles.greyBar}>
                <CommonText style={styles.label}>{titleText}</CommonText>
                {iconSource && <Image source={iconSource} style={styles.icon} />}
            </View>
            {showContent && (
            <View style={[styles.contentWrapper, styles.shadow]}>
                <View style={styles.content}>
                    {leftText && <CommonText style={styles.leftText}>{leftText}</CommonText>}
                    {contentText ? (
                        <CommonText bold style={contentTextStyle}>
                            {contentText}
                        </CommonText>
                    ) : (
                        children
                    )}
                    {rightText && <CommonText style={styles.rightText}>{rightText}</CommonText>}
                </View>
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
        marginRight: 10,
        fontWeight: "bold"
    },
    rightText: {
        fontSize: 16,
        color: '#404040',
        marginLeft: 10,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 5,
        width: 20,
        height: 20,
    },
});

export default CalendarContent;