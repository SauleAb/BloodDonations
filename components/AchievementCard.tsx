import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AnimatedButton from "@/components/AnimatedButton";
import CommonText from "@/components/CommonText";
import CommonTextBold from "@/components/CommonTextBold";

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

    const handleCelebratePress = () => {
        setIsCelebrated(!isCelebrated);
        setCelebrateCount(prevCount => prevCount + (isCelebrated ? -1 : 1));
    };

    return (
        <View style={styles.card}>
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
                <AnimatedButton
                    onPress={handleCelebratePress}
                    style={[
                        styles.congratulateButton,
                        isCelebrated ? styles.congratulateButtonPressed : {},
                    ]}
                >
                    {isCelebrated ? "Celebrated!" : "Celebrate"}
                </AnimatedButton>

                <View style={styles.celebrateCount}>
                    <View style={styles.celebrateImageContainer}>
                        <Image source={require('../assets/images/celebrate_emoji.png')} style={styles.celebrateImage} />
                    </View>
                    <CommonTextBold style={styles.celebrateCountText}>{celebrateCount}</CommonTextBold>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        width: '90%',
        marginTop: 40,
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
    },
    congratulateButtonPressed: {
        backgroundColor: 'grey',
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
