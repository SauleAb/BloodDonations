// CommonContent.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import CommonText from "@/components/common/CommonText";
import CommonContentSwitch from "@/components/common/CommonContentSwitch";
import { iconMap, IconNames } from './CommonIcons';

export type RightTextItem =
    | string
    | { type: 'switch'; switchValue: boolean; onToggle: () => void }
    | { type: 'expandableContent'; details: { left: string; right: string; }[]; title?: string; };

type ButtonConfig = {
    label: string;
    isOn?: boolean;
    onPressOn?: () => void;
    onPressOff?: () => void;
    action?: () => Promise<void>;
};

type CommonContentProps = {
    titleText: string;
    challengeTitleText?: string;
    challengeDescriptionText?: string;
    contentText?: string | React.ReactNode;
    icon?: IconNames;
    contentTextSize?: 'small' | 'large';
    rightText?: RightTextItem | RightTextItem[];
    children?: React.ReactNode;
    showContent?: boolean;
    buttons?: ButtonConfig[];
};

const CommonContent: React.FC<CommonContentProps> = ({
                                                         titleText,
                                                         challengeTitleText,
                                                         challengeDescriptionText,
                                                         contentText,
                                                         icon,
                                                         contentTextSize = 'large',
                                                         rightText,
                                                         showContent = true,
                                                         buttons = [],
                                                     }) => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
    const [isContentVisibleChallenge, setContentVisibleChallenge] = useState(!challengeTitleText);

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
            {challengeTitleText && (
                <TouchableOpacity
                    style={[styles.challengeTitleContainer, styles.shadow]}
                    onPress={() => setContentVisibleChallenge(!isContentVisibleChallenge)}
                    activeOpacity={1}
                >
                    <CommonText style={styles.contentTextLarge}>{challengeTitleText}</CommonText>
                    <CommonText style={styles.rightText}>{challengeDescriptionText}</CommonText>
                </TouchableOpacity>
            )}
            {showContent && isContentVisibleChallenge && (
                <View style={[styles.contentWrapper, styles.shadow]}>
                    {leftTextLines.length > 0 && rightTextItems.length > 0 ? (
                        leftTextLines.map((leftText: string, index: number) => {
                            const rightItem = rightTextItems[index];
                            const isExpandable =
                                rightItem && typeof rightItem === 'object' && rightItem.type === 'expandableContent';
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

                    {buttons.length > 0 && (
                        <View style={styles.buttonContainer}>
                            {buttons.map((button, index) => {
                                const isOn = button.isOn || false;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.button, isOn ? styles.buttonOn : styles.buttonOff]}
                                        onPress={() => {
                                            if (isOn) {
                                                button.onPressOff?.();
                                            } else {
                                                button.onPressOn?.();
                                            }
                                        }}
                                    >
                                        <CommonText style={[styles.buttonText, isOn ? styles.buttonOnText : styles.buttonOffText]}>
                                            {button.label}
                                        </CommonText>
                                    </TouchableOpacity>
                                );
                            })}
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
    challengeTitleContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    challengeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#404040',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
    },
    button: {
        backgroundColor: "#e3e3e3",
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '40%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonOn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    buttonOff: {},
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonOnText: {
        color: '#000000',
    },
    buttonOffText: {
        color: '#000000',
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
    },
});

export default CommonContent;