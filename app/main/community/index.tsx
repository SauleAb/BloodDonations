import React, {useState, useEffect, useCallback} from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@/components/UserContext";
import CommonBackground from "@/components/common/CommonBackground";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import AchievementCard from "@/components/AchievementCard";
import FriendContent from "@/components/FriendContent";
import InputField from "@/components/common/CommonInputField";
import { FriendUser, FriendRequest } from "@/types/types";
import { useFriendRequests } from "@/components/FriendRequestsContext";
import { useFocusEffect } from "@react-navigation/native";

interface Achievement {
  user: { name: string; profileColor: string };
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

  const [allUsers, setAllUsers] = useState<FriendUser[]>([]);
  const [loadingAllUsers, setLoadingAllUsers] = useState(false);

  const [friends, setFriends] = useState<Set<number>>(new Set());
  const [pendingTo, setPendingTo] = useState<Set<number>>(new Set());
  const [pendingFrom, setPendingFrom] = useState<Set<number>>(new Set());

  const [loadingFriends, setLoadingFriends] = useState(false);
  const [loadingSentRequests, setLoadingSentRequests] = useState(false);
  const [loadingReceivedRequests, setLoadingReceivedRequests] = useState(false);

  const [activeTab, setActiveTab] = useState<"feed" | "friends">("feed");
  const [search, setSearch] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const {
    sentFriendRequests,
    receivedFriendRequests,
    addSentFriendRequest,
    addReceivedFriendRequest,
    removeSentFriendRequest,
    removeReceivedFriendRequest,
  } = useFriendRequests();

  useFocusEffect(
      useCallback(() => {
        if (loggedInUserId) {
          console.log("useFocusEffect triggered: Calling handleRefresh");
          handleRefresh();
        }
      }, [loggedInUserId])
  );

  async function handleRefresh() {
    if (!loggedInUserId) {
      console.log("handleRefresh: No loggedInUserId, aborting refresh");
      return;
    }
    console.log("handleRefresh: Starting data refresh");
    await Promise.all([
      fetchAllUsers(),
      fetchMyFriends(),
      fetchSentRequests(),
      fetchReceivedRequests(),
    ]);
    console.log("handleRefresh: Data refresh complete");
  }

  async function fetchAllUsers() {
    try {
      setLoadingAllUsers(true);
      console.log("fetchAllUsers: Fetching all users except user ID", loggedInUserId);

      const ids = Array.from({ length: 50 }, (_, i) => i + 1).filter((x) => x !== loggedInUserId);
      console.log(`fetchAllUsers: Total users to fetch: ${ids.length}`);

      const calls = ids.map(async (id) => {
        const r = await fetch(`https://sanquin-api.onrender.com/users/id/${id}`);
        if (!r.ok) {
          console.log(`fetchAllUsers: Failed to fetch user ID ${id}`);
          return null;
        }
        const j = await r.json();
        let d = j.data;
        if (Array.isArray(d)) d = Object.fromEntries(d);
        const numericId = Number(d.id);
        if (Number.isNaN(numericId)) {
          console.log(`fetchAllUsers: Invalid ID for user data`, d);
          return null;
        }
        console.log(`fetchAllUsers: Fetched user ID ${numericId}`);
        return { ...d, id: numericId } as FriendUser;
      });

      const results = await Promise.all(calls);
      const filtered = results.filter(Boolean) as FriendUser[];
      console.log(`fetchAllUsers: Successfully fetched ${filtered.length} users`);
      setAllUsers(filtered);
      console.log("fetchAllUsers: allUsers state updated", filtered);
    } catch (error) {
      console.error("Error fetching all users:", error);
    } finally {
      setLoadingAllUsers(false);
      console.log("fetchAllUsers: Loading state set to false");
    }
  }

  async function fetchMyFriends() {
    if (!loggedInUserId) {
      console.log("fetchMyFriends: No loggedInUserId, aborting fetch");
      return;
    }
    try {
      setLoadingFriends(true);
      console.log(`fetchMyFriends: Fetching friends for user ID ${loggedInUserId}`);

      const r = await fetch(`https://sanquin-api.onrender.com/users/${loggedInUserId}/friends`);
      if (!r.ok) {
        setFriends(new Set());
        return;
      }
      const j = await r.json();
      const arr = Array.isArray(j.data) ? j.data : [];
      const friendIDs = arr
          .map((f: any) => Number(f.id))
          .filter((n: number) => !Number.isNaN(n));
      console.log(`fetchMyFriends: Fetched friend IDs:`, friendIDs);

      setFriends(new Set(friendIDs));
      console.log("fetchMyFriends: friends state updated", friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      // Optionally, handle error state here
    } finally {
      setLoadingFriends(false);
      console.log("fetchMyFriends: Loading state set to false");
    }
  }

  async function fetchSentRequests() {
    if (!loggedInUserId) {
      console.log("fetchSentRequests: No loggedInUserId, aborting fetch");
      return;
    }
    try {
      setLoadingSentRequests(true);
      console.log(`fetchSentRequests: Fetching sent friend requests for user ID ${loggedInUserId}`);

      const r = await fetch(`https://sanquin-api.onrender.com/users/${loggedInUserId}/sent-requests`);
      if (!r.ok) {
        console.log("fetchSentRequests: No sent friend requests found");
        setPendingTo(new Set());
        clearSentContextSet();
        return;
      }
      const j = await r.json();
      const arr = Array.isArray(j.data) ? j.data : [];
      const pendingIDs = arr
          .filter((req: FriendRequest) => req.status === "pending")
          .map((req: FriendRequest) => Number(req.receiver_id))
          .filter((n: number) => !Number.isNaN(n));
      console.log(`fetchSentRequests: Pending sent friend request IDs:`, pendingIDs);

      const newSet = new Set<number>(pendingIDs);
      setPendingTo(newSet);
      console.log("fetchSentRequests: pendingTo state updated", newSet);

      clearSentContextSet();
      newSet.forEach((id) => {
        console.log(`fetchSentRequests: Adding sent friend request ID ${id}`);
        addSentFriendRequest(id);
      });
    } catch (error) {
      console.error("Error fetching sent requests:", error);
      setPendingTo(new Set());
      clearSentContextSet();
    } finally {
      setLoadingSentRequests(false);
      console.log("fetchSentRequests: Loading state set to false");
    }
  }

  function clearSentContextSet() {
    console.log("clearSentContextSet: Clearing sent friend requests context");
    sentFriendRequests.forEach((id) => {
      console.log(`clearSentContextSet: Removing sent friend request ID ${id}`);
      removeSentFriendRequest(id);
    });
  }

  async function fetchReceivedRequests() {
    if (!loggedInUserId) {
      console.log("fetchReceivedRequests: No loggedInUserId, aborting fetch");
      return;
    }
    try {
      setLoadingReceivedRequests(true);
      console.log(`fetchReceivedRequests: Fetching received friend requests for user ID ${loggedInUserId}`);

      const r = await fetch(`https://sanquin-api.onrender.com/users/${loggedInUserId}/friend-requests`);
      if (!r.ok) {
        console.log("fetchReceivedRequests: No received friend requests found");
        setPendingFrom(new Set());
        clearReceivedContextSet();
        return;
      }
      const j = await r.json();
      const arr = Array.isArray(j.data) ? j.data : [];
      const pendingIDs = arr
          .filter((req: FriendRequest) => req.status === "pending")
          .map((req: FriendRequest) => Number(req.sender_id))
          .filter((n: number) => !Number.isNaN(n));
      console.log(`fetchReceivedRequests: Pending received friend request IDs:`, pendingIDs);

      const newSet = new Set<number>(pendingIDs);
      setPendingFrom(newSet);
      console.log("fetchReceivedRequests: pendingFrom state updated", newSet);

      clearReceivedContextSet();
      newSet.forEach((id) => {
        console.log(`fetchReceivedRequests: Adding received friend request ID ${id}`);
        addReceivedFriendRequest(id);
      });
    } catch (error) {
      console.error("Error fetching received requests:", error);
      setPendingFrom(new Set());
      clearReceivedContextSet();
    } finally {
      setLoadingReceivedRequests(false);
      console.log("fetchReceivedRequests: Loading state set to false");
    }
  }

  function clearReceivedContextSet() {
    console.log("clearReceivedContextSet: Clearing received friend requests context");
    receivedFriendRequests.forEach((id) => {
      console.log(`clearReceivedContextSet: Removing received friend request ID ${id}`);
      removeReceivedFriendRequest(id);
    });
  }

  function classifyUser(u: FriendUser) {
    if (friends.has(u.id)) {
      console.log(`classifyUser: User ID ${u.id} is a friend`);
      return "friend";
    }
    if (pendingTo.has(u.id)) {
      console.log(`classifyUser: User ID ${u.id} has a sent friend request`);
      return "request_sent";
    }
    if (pendingFrom.has(u.id)) {
      console.log(`classifyUser: User ID ${u.id} has a received friend request`);
      return "request_received";
    }
    console.log(`classifyUser: User ID ${u.id} is a friend suggestion`);
    return "friend_suggestion";
  }

  const onRefresh = async () => {
    console.log("onRefresh: User initiated pull-to-refresh");
    setRefreshing(true);
    if (loggedInUserId) {
      await handleRefresh();
    }
    setRefreshing(false);
    console.log("onRefresh: Pull-to-refresh complete");
  };

  function renderFeed() {
    console.log("renderFeed: Rendering Feed Tab");
    return (
        <CommonScrollElement
            refreshControl={
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#333333"]}
              />
            }
        >
          {mockAchievements.map((ach, i) => (
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
    console.log("renderFriendsTab: Rendering Friends Tab");
    const lower = search.toLowerCase();
    const filtered = allUsers.filter((u) => {
      const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
      return fullName.includes(lower);
    });

    const myFriends: FriendUser[] = [];
    const myReceived: FriendUser[] = [];
    const mySent: FriendUser[] = [];
    const mySuggestions: FriendUser[] = [];

    filtered.forEach((u) => {
      const st = classifyUser(u);
      if (st === "friend") myFriends.push(u);
      else if (st === "request_received") myReceived.push(u);
      else if (st === "request_sent") mySent.push(u);
      else mySuggestions.push(u);
    });

    console.log(`renderFriendsTab: Classified users - Friends: ${myFriends.length}, Received: ${myReceived.length}, Sent: ${mySent.length}, Suggestions: ${mySuggestions.length}`);

    const isInitialLoad =
        !loadingAllUsers &&
        !loadingFriends &&
        !loadingSentRequests &&
        !loadingReceivedRequests &&
        allUsers.length === 0 &&
        pendingTo.size === 0 &&
        pendingFrom.size === 0;

    if (isInitialLoad) {
      console.log("renderFriendsTab: Initial load detected");
      return (
          <View style={styles.initialLoadingContainer}>
            <ActivityIndicator size="large" color="#333333" />
            <Text style={styles.initialLoadingText}>Loading...</Text>
          </View>
      );
    }

    return (
        <CommonScrollElement
            refreshControl={
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#333333"]}
              />
            }
        >
          <InputField
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchField}
          />

          {/* My Friends Section */}
          <Text style={styles.sectionTitle}>My Friends</Text>
          {loadingFriends && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={styles.loadingText}>Updating...</Text>
              </View>
          )}
          {myFriends.length === 0 && !loadingFriends && (
              <Text style={styles.noDataText}>No friends found.</Text>
          )}
          {myFriends.map((u) => (
              <View key={`fr-${u.id}`} style={styles.friendContainer}>
                <FriendContent
                    id={String(u.id)}
                    name={`${u.first_name} ${u.last_name}`}
                    status="friend"
                    onPress={() =>
                        router.push(`/main/community/FriendsDetailScreen?id=${u.id}`)
                    }
                />
              </View>
          ))}

          {/* Received Friend Requests Section */}
          <Text style={styles.sectionTitle}>Received Friend Requests</Text>
          {loadingReceivedRequests && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={styles.loadingText}>Updating...</Text>
              </View>
          )}
          {myReceived.length === 0 && !loadingReceivedRequests && (
              <Text style={styles.noDataText}>No pending requests.</Text>
          )}
          {myReceived.map((u) => (
              <View key={`recv-${u.id}`} style={styles.friendContainer}>
                <FriendContent
                    id={String(u.id)}
                    name={`${u.first_name} ${u.last_name}`}
                    status="request_received"
                    onPress={() =>
                        router.push(`/main/community/FriendsDetailScreen?id=${u.id}`)
                    }
                />
              </View>
          ))}

          {/* Sent Friend Requests Section */}
          <Text style={styles.sectionTitle}>Sent Friend Requests</Text>
          {loadingSentRequests && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={styles.loadingText}>Updating...</Text>
              </View>
          )}
          {mySent.length === 0 && !loadingSentRequests && (
              <Text style={styles.noDataText}>No pending requests.</Text>
          )}
          {mySent.map((u) => (
              <View key={`sent-${u.id}`} style={styles.friendContainer}>
                <FriendContent
                    id={String(u.id)}
                    name={`${u.first_name} ${u.last_name}`}
                    status="request_sent"
                    onPress={() =>
                        router.push(`/main/community/FriendsDetailScreen?id=${u.id}`)
                    }
                />
              </View>
          ))}

          {/* Friend Suggestions Section */}
          <Text style={styles.sectionTitle}>Friend Suggestions</Text>
          {loadingAllUsers && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={styles.loadingText}>Updating...</Text>
              </View>
          )}
          {mySuggestions.length === 0 && !loadingAllUsers && (
              <Text style={styles.noDataText}>No suggestions available.</Text>
          )}
          {mySuggestions.map((u) => (
              <View key={`sugg-${u.id}`} style={styles.friendContainer}>
                <FriendContent
                    id={String(u.id)}
                    name={`${u.first_name} ${u.last_name}`}
                    status="friend_suggestion"
                    onPress={() =>
                        router.push(`/main/community/FriendsDetailScreen?id=${u.id}`)
                    }
                />
              </View>
          ))}
        </CommonScrollElement>
    );
  }

  function renderContent() {
    return activeTab === "feed" ? renderFeed() : renderFriendsTab();
  }

  return (
      <CommonBackground logoVisible={true} mainPage={true}>
        {renderContent()}
        <SecondaryNavBar
            tabs={[
              { key: "feed", label: "Feed" },
              { key: "friends", label: "Friends" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            style={styles.secondaryNavBar}
        />
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
  noDataText: {
    color: "gray",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  friendContainer: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 20,
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
    // Add any specific styles if needed
  },
  secondaryNavBar: {
    width: "100%",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: "#333333",
    fontSize: 14,
  },
  initialLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  initialLoadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333333",
  },
});
