import { View, TouchableOpacity } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import React, { useState } from "react";
import AchievementCard from "@/components/AchievementCard";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonText from "@/components/common/CommonText";
import InputField from "@/components/InputField";
import { friendsList, achievements } from "@/constants/CommunityData"; 
import commonStyles from "@/app/styles/CommonStyles";
import communityStyles from "../styles/CommunityStyle";

export default function Community() {
    const [activeTab, setActiveTab] = useState<'feed' | 'friends'>('feed');
    const [search, setSearch] = useState('');

    const filteredFriends = friendsList.filter((friend) =>
        friend.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddFriend = () => {
        console.log("Add Friend button pressed!");
    };

    const renderContent = () => {
        if (activeTab === "feed") {
            return (
                <CommonScrollElement>
                    {achievements.map((achievement, index) => (
                        <AchievementCard
                            key={index}
                            user={achievement.user}
                            achievementTime={achievement.achievementTime}
                            achievementText={achievement.achievementText}
                            onCongratulate={() => console.log("Celebrated!")}
                            celebrates={achievement.celebrates}
                        />
                    ))}
                </CommonScrollElement>
            );
        } else if (activeTab === "friends") {
            return (
                <>
                    <CommonScrollElement>
                        <InputField
                            placeholder="Search..."
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
                            <CommonText style={communityStyles.noResultsText}>
                                No friends found.
                            </CommonText>
                        )}
                    </CommonScrollElement>
                    <TouchableOpacity
                        style={communityStyles.addFriendButton}
                        onPress={handleAddFriend}
                    >
                        <CommonText>Add Friend</CommonText>
                        <CommonText bold>+</CommonText>
                    </TouchableOpacity>
                </>
            );
        }
    };

    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                {renderContent()}
            </CommonBackground>
            <View style={communityStyles.secondaryNavBar}>
                <TouchableOpacity
                    style={[
                        communityStyles.navButton,
                        activeTab === "feed" ? communityStyles.activeTab : null,
                    ]}
                    onPress={() => setActiveTab("feed")}
                >
                    <CommonText style={communityStyles.navText}>Feed</CommonText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        communityStyles.navButton,
                        activeTab === "friends" ? communityStyles.activeTab : null,
                    ]}
                    onPress={() => setActiveTab("friends")}
                >
                    <CommonText style={communityStyles.navText}>Friends</CommonText>
                </TouchableOpacity>
            </View>
        </View>
    );
}
