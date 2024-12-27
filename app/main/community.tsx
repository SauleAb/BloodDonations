import React, { useState } from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import AchievementCard from "@/components/AchievementCard";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonContent from "@/components/common/CommonContent";
import CommonText from "@/components/common/CommonText";
import InputField from "@/components/common/CommonInputField";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import { friendsList, achievements } from "@/constants/CommunityData";
import commonStyles from "@/app/styles/CommonStyles";
import communityStyles from "../styles/CommunityStyle";

export default function Community() {
    const [activeTab, setActiveTab] = useState<'feed' | 'friends'>('feed');
    const [search, setSearch] = useState('');

    const filteredFriends = friendsList.filter((friend) =>
        friend.name.toLowerCase().includes(search.toLowerCase())
    );


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
                                />
                            ))
                        ) : (
                            <CommonText style={communityStyles.noResultsText}>
                                No friends found.
                            </CommonText>
                        )}
                    </CommonScrollElement>
                </>
            );
        }
    };

    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                {renderContent()}
            </CommonBackground>
            <SecondaryNavBar
                tabs={[
                    { key: "feed", label: "Feed" },
                    { key: "friends", label: "Friends" },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </View>
    );
}