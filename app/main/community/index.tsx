// src/components/Community.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@/components/UserContext";
import CommonBackground from "@/components/common/CommonBackground";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import AchievementCard from "@/components/AchievementCard";
import FriendContent, { RelationshipStatus } from "@/components/FriendContent";
import InputField from "@/components/common/CommonInputField";
import commonStyles from "@/app/styles/CommonStyles";

import FriendRequestsIcon from "@/assets/icons/add-friend.png";
import RefreshIcon from "@/assets/icons/refresh-page-option.png";

import { FriendRequest, FriendUser } from "@/types/types";
import { useFriendRequests } from "@/components/FriendRequestsContext";

interface Achievement {
  user: {
    name: string;
    profileColor: string;
  };
  achievementTime: string;
  achievementText: string;
  celebrates: number;
}

const mockAchievements: Achievement[] = [
  {
    user: { name: "MockUser", profileColor: "#40b6ff" },
    achievementTime: "2 days ago",
    achievementText: "Donated for the third time!",
    celebrates: 5,
  },
];

export default function Community() {
  const router = useRouter();
  const { user } = useUser();
  const loggedInUserId = user?.id;

  const [friends, setFriends] = useState<FriendUser[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [friendError, setFriendError] = useState<string | null>(null);

  const [suggestions, setSuggestions] = useState<FriendUser[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);

  const {
    sentFriendRequests,
    receivedFriendRequests,
    addSentFriendRequest,
    addReceivedFriendRequest,
    removeSentFriendRequest,
    removeReceivedFriendRequest,
  } = useFriendRequests();

  const [activeTab, setActiveTab] = useState<"feed" | "friends">("feed");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (loggedInUserId) {
      fetchFriends(loggedInUserId);
      fetchSuggestions(loggedInUserId);
      fetchFriendRequests(loggedInUserId);
    }
  }, [loggedInUserId]);

  async function fetchFriends(userId: number) {
    try {
      setLoadingFriends(true);
      setFriendError(null);

      const url = `https://sanquin-api.onrender.com/users/${userId}/friends`;
      const resp = await fetch(url);
      const result = await resp.json();

      if (resp.ok) {
        const friendList: FriendUser[] = Array.isArray(result.data) ? result.data : [];
        setFriends(friendList);
      } else if (resp.status === 500 && result.message === "No friends found") {
        setFriends([]);
      } else {
        setFriends([]);
      }
    } catch {
      setFriends([]);
    } finally {
      setLoadingFriends(false);
    }
  }

  async function fetchSuggestions(userId: number) {
    try {
      setLoadingSuggestions(true);
      setSuggestionsError(null);

      const userIds = Array.from({ length: 100 }, (_, i) => i + 1).filter((id) => id !== userId);

      const promises = userIds.map(async (id) => {
        const url = `https://sanquin-api.onrender.com/users/id/${id}`;
        const r = await fetch(url);
        if (!r.ok) {
          return null;
        }
        const data = await r.json();
        let userData = data.data;
        if (Array.isArray(userData)) {
          userData = Object.fromEntries(userData);
        }
        return userData as FriendUser;
      });

      const settled = await Promise.allSettled(promises);
      const successful = settled
        .filter((res) => res.status === "fulfilled" && res.value !== null)
        .map((res: any) => res.value);

      setSuggestions(successful);
    } catch {
    } finally {
      setLoadingSuggestions(false);
    }
  }

  async function fetchFriendRequests(userId: number) {
    try {
      const url = `https://sanquin-api.onrender.com/users/${userId}/friend-requests`;
      const resp = await fetch(url);
      const result = await resp.json();

      if (resp.ok) {
        const rawData = result?.data;
        if (!Array.isArray(rawData)) return;
        rawData.forEach((req: FriendRequest) => {
          if (req.sender_id === String(userId)) {
            addSentFriendRequest(Number(req.receiver_id));
          }
          if (req.receiver_id === String(userId) && req.status === "pending") {
            addReceivedFriendRequest(Number(req.sender_id));
          }
        });
      } else if (resp.status === 500 && result.message === "No friend requests found") {
        // Do nothing, no friend requests
      } else {
      }
    } catch {
      // Do nothing
    }
  }

  const friendIds = friends.map((f) => f.id);
  const finalSuggestions = suggestions.filter(
    (u) => u.id && !friendIds.includes(u.id) && u.id !== loggedInUserId
  );

  const handleRefresh = () => {
    if (loggedInUserId) {
      fetchFriends(loggedInUserId);
      fetchSuggestions(loggedInUserId);
      fetchFriendRequests(loggedInUserId);
    }
  };

  function renderFeed() {
    return (
      <CommonScrollElement>
        {mockAchievements.map((ach: Achievement, i: number) => (
          <AchievementCard
            key={i}
            user={ach.user}
            achievementTime={ach.achievementTime}
            achievementText={ach.achievementText}
            celebrates={ach.celebrates}
            onCongratulate={() => {}}
          />
        ))}
      </CommonScrollElement>
    );
  }

  function renderFriendsTab() {
    return (
      <CommonScrollElement>
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/main/community/FriendRequestsScreen")}
          >
            <Image source={FriendRequestsIcon} style={styles.iconImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleRefresh}>
            <Image source={RefreshIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </View>

        <InputField
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchField}
        />

        <Text style={styles.sectionTitle}>My Friends</Text>
        {loadingFriends && <ActivityIndicator size="large" />}
        {friendError && <Text style={styles.errorText}>{friendError}</Text>}
        {friends.length === 0 && !loadingFriends && (
          <Text style={styles.noDataText}>No friends found.</Text>
        )}
        {friends
          .filter((friend) => {
            const fullName = `${friend.first_name} ${friend.last_name}`.toLowerCase();
            return fullName.includes(search.toLowerCase());
          })
          .map((friend) => (
            <View key={`fr-${friend.id}`} style={styles.friendContainer}>
              <FriendContent
                id={String(friend.id)}
                name={`${friend.first_name} ${friend.last_name}`}
                status="friend"
                onPress={(id) =>
                  router.push(`/main/community/FriendsDetailScreen?id=${id}&isFriend=true`)
                }
              />
            </View>
          ))}

        <Text style={styles.sectionTitle}>Friend Suggestions</Text>
        {loadingSuggestions && <ActivityIndicator size="large" />}
        {suggestionsError && <Text style={styles.errorText}>{suggestionsError}</Text>}
        {finalSuggestions.length === 0 && !loadingSuggestions && (
          <Text style={styles.noDataText}>No suggestions available.</Text>
        )}
        {finalSuggestions
          .filter((u) => {
            const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
            return fullName.includes(search.toLowerCase());
          })
          .map((sugg) => {
            const isSent = sentFriendRequests.has(sugg.id);
            const isReceived = receivedFriendRequests.has(sugg.id);
            let status: RelationshipStatus = "friend_suggestion";
            if (isSent) status = "request_sent";
            if (isReceived) status = "request_received";

            return (
              <FriendContent
                key={`sugg-${sugg.id}`}
                id={String(sugg.id)}
                name={`${sugg.first_name} ${sugg.last_name}`}
                status={status}
                onPress={() =>
                  router.push(`/main/community/FriendsDetailScreen?id=${sugg.id}`)
                }
                onAddFriend={
                  isSent
                    ? undefined
                    : () => {
                        addSentFriendRequest(Number(sugg.id));
                      }
                }
                onCancelRequest={
                  isSent
                    ? () => {
                        removeSentFriendRequest(Number(sugg.id));
                      }
                    : undefined
                }
              />
            );
          })}
      </CommonScrollElement>
    );
  }

  function renderContent() {
    return activeTab === "feed" ? renderFeed() : renderFriendsTab();
  }

  return (
    <CommonBackground logoVisible={true} mainPage={true}>
      <View style={commonStyles.container}>
        {renderContent()}
        <SecondaryNavBar
          tabs={[
            { key: "feed", label: "Feed" },
            { key: "friends", label: "Friends" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </View>
    </CommonBackground>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  noDataText: {
    color: "gray",
    marginBottom: 10,
  },
  friendContainer: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  suggestionContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  statusIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5,
  },
  statusText: {
    color: "#555",
    fontSize: 14,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  acceptButton: {
    width: 40,
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  declineButton: {
    width: 40,
    height: 40,
    backgroundColor: "#F44336",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  headerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  searchField: {
    marginBottom: 20,
  },
});
