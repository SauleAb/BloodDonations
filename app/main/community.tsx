import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import React, { useState } from "react";
import AchievementCard from "@/components/AchievementCard";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonTextBold from "@/components/common/CommonTextBold";
import CommonText from "@/components/common/CommonText";

export default function Community() {
    const [activeTab, setActiveTab] = useState<'feed' | 'friends'>('feed');
    const [search, setSearch] = useState('');

    const friendsList = [
        { name: "Henk de Boom" },
        { name: "Ava van Kerkrade" },
        { name: "Pieter Pietersen" },
        { name: "Jacque Smit" },
    ];

    const filteredFriends = friendsList.filter((friend) =>
        friend.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddFriend = () => {
        console.log("Add Friend button pressed!");
        // Add logic for adding friends here
    };

    const renderContent = () => {
        if (activeTab === "feed") {
            return (
                <CommonScrollElement>
                    <AchievementCard
                        user={{ name: "Noah", profileColor: "#40b6ff" }}
                        achievementTime="2 days ago"
                        achievementText="Donated for the third time again!"
                        onCongratulate={() => console.log("Celebrated!")}
                        celebrates={5}
                    />
                    <AchievementCard
                        user={{ name: "Julius", profileColor: "#ff7940" }}
                        achievementTime="3 days ago"
                        achievementText="Took a friend to their first time donating!"
                        onCongratulate={() => console.log("Celebrated!")}
                        celebrates={3}
                    />
                </CommonScrollElement>
            );
        } else if (activeTab === "friends") {
            return (
                <>
                    <CommonScrollElement>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search.."
                            value={search}
                            onChangeText={setSearch}
                        />
                        {filteredFriends.length > 0 ? (
                            filteredFriends.map((friend, index) => (
                                <CommonContent
                                    key={index}
                                    titleText={"Friend"}
                                    contentText={friend.name}
                                    icon={IconNames.Delete}
                                />
                            ))
                        ) : (
                            <CommonText style={styles.noResultsText}>
                                No friends found.
                            </CommonText>
                        )}
                    </CommonScrollElement>
                    <TouchableOpacity
                        style={styles.addFriendButton}
                        onPress={handleAddFriend}
                    >
                        <CommonText>Add Friend</CommonText>
                        <CommonTextBold>+</CommonTextBold>
                    </TouchableOpacity>
                </>
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
                        activeTab === "feed" ? styles.activeTab : null,
                    ]}
                    onPress={() => setActiveTab("feed")}
                >
                    <CommonText style={styles.navText}>Feed</CommonText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        activeTab === "friends" ? styles.activeTab : null,
                    ]}
                    onPress={() => setActiveTab("friends")}
                >
                    <CommonText style={styles.navText}>Friends</CommonText>
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
    searchBar: {
        height: 40,
        width: '90%',
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "#f9f9f9",
        alignSelf: 'center',
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
    noResultsText: {
        textAlign: "center",
        marginVertical: 20,
        color: "gray",
        fontSize: 16,
    },
    addFriendButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1, // Ensure the border is visible
        borderColor: "#ccc",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
