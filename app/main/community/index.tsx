// app/main/community/index.tsx
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import AchievementCard from "@/components/AchievementCard";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import FriendContent from "@/components/FriendContent";
import InputField from "@/components/common/CommonInputField";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import { achievements } from "@/constants/CommunityData";
import commonStyles from "@/app/styles/CommonStyles";
import { useRouter } from "expo-router";

type FriendUser = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  city?: string;
  birthdate?: string;
  current_points?: number;
  total_points?: number;
  role?: string;
  created_at?: string;
};

export default function Community() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"feed" | "friends">("feed");
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState<FriendUser[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [friendError, setFriendError] = useState<string | null>(null);

  // Instead of a specific array, fetch IDs from 1 to 100:
  const userIds = Array.from({ length: 100 }, (_, i) => i + 1);

  useEffect(() => {
    async function fetchFriendsById() {
      try {
        setLoadingFriends(true);
        setFriendError(null);

        // Promise.allSettled so each fetch can fail independently
        const promises = userIds.map(async (id) => {
          const response = await fetch(
            `https://sanquin-api.onrender.com/users/id/${id}`
          );
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          const result = await response.json();

          // Convert array-of-arrays -> object if needed
          let userData = result?.data;
          if (Array.isArray(userData)) {
            userData = Object.fromEntries(userData);
          }
          return userData as FriendUser;
        });

        // allSettled returns an array of { status: 'fulfilled' | 'rejected', value?, reason? }
        const results = await Promise.allSettled(promises);

        // Filter out any that were rejected (e.g., 500 or user not found)
        const successfulUsers = results
          .filter((res) => res.status === "fulfilled")
          .map((res) => (res as PromiseFulfilledResult<FriendUser>).value);

        // Optional: see how many IDs were skipped
        const rejectedCount = results.filter(
          (res) => res.status === "rejected"
        ).length;
        if (rejectedCount > 0) {
          console.warn(
            `${rejectedCount} user(s) were not found or had errors and were skipped.`
          );
        }

        setFriends(successfulUsers);
      } catch (err: any) {
        console.error("Error fetching all friends:", err);
        setFriendError(err.message);
      } finally {
        setLoadingFriends(false);
      }
    }

    fetchFriendsById();
  }, []);

  // Filter for the search input
  const filteredFriends = friends.filter((friend) => {
    const fullName = `${friend.first_name ?? ""} ${
      friend.last_name ?? ""
    }`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

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
    } else {
      // Friends tab
      return (
        <CommonScrollElement>
          <InputField
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
          />

          {loadingFriends && <Text>Loading friends...</Text>}
          {friendError && <Text style={{ color: "red" }}>{friendError}</Text>}

          {filteredFriends.map((friend, i) => (
            <FriendContent
              key={i}
              id={String(friend.id)}
              // Display both first and last name
              name={`${friend.first_name ?? ""} ${friend.last_name ?? ""}`}
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
