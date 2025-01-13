import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, Image,} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@/components/UserContext";
import CommonBackground from "@/components/common/CommonBackground";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import AchievementCard from "@/components/AchievementCard";
import FriendContent from "@/components/FriendContent";
import InputField from "@/components/common/CommonInputField";
import commonStyles from "@/app/styles/CommonStyles";

import FriendRequestsIcon from "@/assets/icons/add-friend.png";
import RefreshIcon from "@/assets/icons/refresh-page-option.png";
import AddFriendIcon from "@/assets/icons/add-user.png";
import RequestSentIcon from "@/assets/icons/add-friend.png";

const achievements = [
  {
    user: { name: "MockUser", profileColor: "#40b6ff" },
    achievementTime: "2 days ago",
    achievementText: "Donated for the third time!",
    celebrates: 5,
  },
];

type FriendUser = {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  city?: string;
  birthdate?: string;
  current_points?: number;
  total_points?: number;
  role?: string;
  created_at?: string;
  username?: string;
};

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

  const [sentFriendRequests, setSentFriendRequests] = useState<Set<number>>(new Set());

  const [activeTab, setActiveTab] = useState<"feed" | "friends">("feed");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (loggedInUserId) {
      fetchFriends(loggedInUserId);
      fetchSuggestions(loggedInUserId);
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
        throw new Error(`Friends fetch failed with status ${resp.status}`);
      }
    } catch (err: any) {
      console.error("Error fetching user friends:", err);
      setFriendError(err.message);
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
          throw new Error(`User ${id} fetch failed. Status: ${r.status}`);
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
        .filter((res) => res.status === "fulfilled")
        .map((res: any) => res.value);

      setSuggestions(successful);
    } catch (err: any) {
      console.error("Error fetching suggestions:", err);
      setSuggestionsError(err.message);
    } finally {
      setLoadingSuggestions(false);
    }
  }

  async function sendFriendRequest(targetId: number) {
    if (!loggedInUserId) return;
    const url = `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${targetId}`;
    console.log("Sending friend request to:", url);

    try {
      const resp = await fetch(url, { method: "POST" });
      const textBody = await resp.text();
      console.log("Send friend request response body:", textBody);

      if (resp.ok) {
        setSentFriendRequests((prev) => new Set(prev).add(targetId));
      } else {
        throw new Error(`Friend request failed, status ${resp.status}`);
      }
    } catch (err: any) {
      console.error("Error sending friend request:", err);
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
    }
  };

  function renderFeed() {
    return (
      <CommonScrollElement>
        {achievements.map((ach, i) => (
          <AchievementCard
            key={i}
            user={ach.user}
            achievementTime={ach.achievementTime}
            achievementText={ach.achievementText}
            celebrates={ach.celebrates}
            onCongratulate={() => console.log("Celebrated!")}
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
            accessibilityLabel="View Friend Requests"
          >
            <Image source={FriendRequestsIcon} style={styles.iconImage} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleRefresh}
            accessibilityLabel="Refresh Friends and Suggestions"
          >
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
                onPress={(id) =>
                  router.push(`/main/community/FriendsDetailScreen?id=${id}`)
                }
              />
            </View>
          ))}

        <Text style={styles.sectionTitle}>Friend Suggestions</Text>
        {loadingSuggestions && <ActivityIndicator size="large" />}
        {suggestionsError && <Text style={styles.errorText}>{suggestionsError}</Text>}
        {finalSuggestions
          .filter((u) => {
            const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
            return fullName.includes(search.toLowerCase());
          })
          .map((sugg) => (
            <View key={`sugg-${sugg.id}`} style={styles.suggestionContainer}>
              <FriendContent
                id={String(sugg.id)}
                name={`${sugg.first_name} ${sugg.last_name}`}
                onPress={(id) =>
                  router.push(`/main/community/FriendsDetailScreen?id=${id}`)
                }
              />
              <TouchableOpacity
                onPress={() => sendFriendRequest(sugg.id)}
                disabled={sentFriendRequests.has(sugg.id)}
                style={[
                  styles.addButton,
                  sentFriendRequests.has(sugg.id) && styles.addButtonDisabled,
                ]}
                accessibilityLabel={
                  sentFriendRequests.has(sugg.id)
                    ? "Friend request sent"
                    : "Add Friend"
                }
              >
                <Image
                  source={
                    sentFriendRequests.has(sugg.id)
                      ? RequestSentIcon
                      : AddFriendIcon
                  }
                  style={styles.addButtonIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
      </CommonScrollElement>
    );
  }

  function renderContent() {
    return activeTab === "feed" ? renderFeed() : renderFriendsTab();
  }

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: "#40b6ff",
    borderRadius: 15, // Make it circular
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#a0a0a0",
  },
  addButtonIcon: {
    width: 18,
    height: 18,
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
    backgroundColor: "#4CAF50", // Green for Friend Requests
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  refreshButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2196F3", // Blue for Refresh
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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
