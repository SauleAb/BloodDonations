import {StyleSheet, View} from "react-native";
import CommonBackground from "@/components/Common/CommonBackground";
import React from "react";
import AchievementCard from "@/components/AchievementCard";

export default function Community() {

    return (
        <View style={styles.container}>
            <CommonBackground>
                <AchievementCard
                    user={{ name: 'Noah', profileColor: '#40b6ff' }}
                    achievementTime="2 days ago"
                    achievementText="Donated for the third time again!"
                    onCongratulate={() => console.log("Celebrated!")}
                    celebrates={5}
                />
                <AchievementCard
                    user={{ name: 'Julius', profileColor: '#ff7940' }}
                    achievementTime="3 days ago"
                    achievementText="Took a friend to their first time donating!"
                    onCongratulate={() => console.log("Celebrated!")}
                    celebrates={3}
                />
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});