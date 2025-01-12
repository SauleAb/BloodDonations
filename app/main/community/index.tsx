import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import CommonBackground from "@/components/common/CommonBackground";
import AchievementCard from "@/components/AchievementCard";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import FriendContent from "@/components/FriendContent";
import InputField from "@/components/common/CommonInputField";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import { friendsList, achievements } from "@/constants/CommunityData";
import commonStyles from "@/app/styles/CommonStyles";

export default function Community() {
  const [activeTab, setActiveTab] = useState<"feed" | "friends">("feed");
  const [search, setSearch] = useState("");
  const router = useRouter();

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
        <CommonScrollElement>
          <InputField
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
          />
          {filteredFriends.map((friend) => (
            <FriendContent
              key={friend.id}
              id={friend.id.toString()}
              name={friend.name}
              onPress={(id) =>
                router.push(`/main/community/FriendsDetailScreen?id=${id}`)
              }
            />
          ))}
        </CommonScrollElement>
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
