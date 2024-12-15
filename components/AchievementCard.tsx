import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";
import CommonContainer from "@/components/common/CommonContainer";
import * as Notifications from 'expo-notifications';

type AchievementCardProps = {
    user: {
        name: string;
        profileColor: string;
    };
    achievementText: string;
    achievementTime: string;
    imageSource?: string;
    onCongratulate: () => void;
    celebrates: number;
};

const AchievementCard: React.FC<AchievementCardProps> = ({ user, achievementText, imageSource, celebrates, achievementTime }) => {
    const [celebrateCount, setCelebrateCount] = useState(celebrates);
    const [isCelebrated, setIsCelebrated] = useState(false);

    const handleCelebratePress = async () => {
        setIsCelebrated(!isCelebrated);
        setCelebrateCount(prevCount => prevCount + (isCelebrated ? -1 : 1));

        await Notifications.scheduleNotificationAsync({
            content: {
                title: isCelebrated ? "Uncelebrated!" : "Celebrated!",
                body: `${user.name} has ${isCelebrated ? "removed their celebration" : "celebrated this achievement!"}`,
            },
            trigger: null,
        });
    };

    return (
        <CommonContainer style={styles.card}>
            <View style={styles.userInfo}>
                <View style={[styles.profileCircle, { backgroundColor: user.profileColor }]}>
                    <CommonText style={styles.profileInitial}>{user.name[0]}</CommonText>
                </View>
                <View>
                    <CommonText style={styles.userName}>{user.name}</CommonText>
                    <CommonText style={styles.timeText}>{achievementTime}</CommonText>
                </View>
            </View>

            <View style={styles.achievement}>
                <View style={styles.achievementTextContainer}>
                    <CommonText style={styles.achievementText}>{achievementText}</CommonText>
                </View>
                <View style={styles.achievementImageContainer}>
                    <Image source={imageSource || require('../assets/images/celebrate_emoji.png')} style={styles.achievementImage} />
                </View>
            </View>

            <View style={styles.congratulateSection}>
                <CommonButton
                    onPress={handleCelebratePress}
                    style={[
                        styles.congratulateButton,
                        isCelebrated ? styles.congratulateButtonPressed : {},
                    ]}
                    size='small'
                    textStyle={ isCelebrated ? styles.congratulateButtonPressedText : styles.congratulateButtonText}
                >
                    {isCelebrated ? "Celebrated!" : "Celebrate"}
                </CommonButton>

                <View style={styles.celebrateCount}>
                    <View style={styles.celebrateImageContainer}>
                        <Image source={require('../assets/images/celebrate_emoji.png')} style={styles.celebrateImage} />
                    </View>
                    <CommonText bold style={styles.celebrateCountText}>{celebrateCount}</CommonText>
                </View>
            </View>
        </CommonContainer>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        width: '90%'
    },
    userInfo: {
        flexDirection: 'row',
    },
    achievement: {
        flexDirection: 'row',
    },
    profileCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    profileInitial: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    userName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    timeText: {
        color: 'gray',
        fontSize: 12,
    },
    achievementTextContainer: {
        width: '50%',
        justifyContent: 'center',
    },
    achievementText: {
        color: 'black',
        fontSize: 16,
    },
    achievementImageContainer: {
        width: '50%',
        alignItems: 'center',
    },
    achievementImage: {
        height: 120,
        width: 120,
    },
    congratulateSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    congratulateButton: {
        width: '40%',
        marginTop: 0,
        borderRadius: 8,
    },
    congratulateButtonText: {
        fontSize: 20,
    },
    congratulateButtonPressed: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    congratulateButtonPressedText: {
        color: 'black',
        fontSize: 20,
    },
    celebrateCount: {
        marginLeft: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#b1b1b1',
        padding: 5,
    },
    celebrateImageContainer: {},
    celebrateImage: {
        height: 20,
        width: 20,
    },
    celebrateCountText: {
        color: 'black',
        marginLeft: 4,
        fontSize: 16
    },
});

export default AchievementCard;