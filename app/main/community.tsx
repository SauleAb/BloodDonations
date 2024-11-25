import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import React, { useState } from "react";
import AchievementCard from "@/components/AchievementCard";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonContent, {IconNames} from "@/components/common/CommonContent";
import InputField from "@/components/InputField";

export default function Community() {
    const [activeTab, setActiveTab] = useState<'feed' | 'friends'>('feed');
    const [search, setSearch] = useState('');

    const renderContent = () => {
        if (activeTab === 'feed') {
            return (
                <CommonScrollElement>
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
                </CommonScrollElement>
            );
        } else if (activeTab === 'friends') {
            return (
                <CommonScrollElement>
                    <InputField
                        placeholder="Search..."
                        value={search}
                        onChangeText={setSearch}
                        secureTextEntry={true}

                    />
                    <CommonContent titleText={"Friend"} contentText={"Henk de Boom"} icon={IconNames.Notification} />
                    <CommonContent titleText={"Friend"} contentText={"Ava van Kerkrade"} icon={IconNames.Notification} />
                    <CommonContent titleText={"Friend"} contentText={"Pieter Pietersen"} icon={IconNames.Notification} />
                    <CommonContent titleText={"Friend"} contentText={"Jacque Smit"} icon={IconNames.Notification} />
                </CommonScrollElement>
            );
        }
    };

    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                {renderContent()}
            </CommonBackground>
            <View style={styles.secondaryNavBar}>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        activeTab === 'feed' ? styles.activeTab : null,
                    ]}
                    onPress={() => setActiveTab('feed')}
                >
                    <Text style={styles.navText}>Feed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        activeTab === 'friends' ? styles.activeTab : null,
                    ]}
                    onPress={() => setActiveTab('friends')}
                >
                    <Text style={styles.navText}>Friends</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        margin: 10,
        color: "gray",
    },
    secondaryNavBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    navButton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: "#ddd",
    },
    navText: {
        fontSize: 16,
        fontWeight: "600",
        color: "black",
    },
});