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
import FriendContent from "@/components/FriendContent";
import InputField from "@/components/common/CommonInputField";
import RefreshIcon from "@/assets/icons/refresh-page-option.png";
import { FriendUser, FriendRequest } from "@/types/types";
import { useFriendRequests } from "@/components/FriendRequestsContext";

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
  const [loadingAll, setLoadingAll] = useState(false);

  const [friends, setFriends] = useState<Set<number>>(new Set());
  const [pendingTo, setPendingTo] = useState<Set<number>>(new Set());
  const [pendingFrom, setPendingFrom] = useState<Set<number>>(new Set());

  const [activeTab, setActiveTab] = useState<"feed" | "friends">("feed");
  const [search, setSearch] = useState("");

  const {
    sentFriendRequests,
    receivedFriendRequests,
    addSentFriendRequest,
    addReceivedFriendRequest,
    removeSentFriendRequest,
    removeReceivedFriendRequest,
  } = useFriendRequests();

  useEffect(() => {
    if (loggedInUserId) {
      handleRefresh();
    }
  }, [loggedInUserId]);

  async function handleRefresh() {
    if (!loggedInUserId) return;
    await fetchAllUsers();
    await fetchMyFriends();
    await fetchSentRequests();
    await fetchReceivedRequests();
  }

  async function fetchAllUsers() {
    try {
      setLoadingAll(true);
      const ids = Array.from({ length: 100 }, (_, i) => i + 1).filter((x) => x !== loggedInUserId);
      const calls = ids.map(async (id) => {
        const r = await fetch(`https://sanquin-api.onrender.com/users/id/${id}`);
        if (!r.ok) return null;
        const j = await r.json();
        let d = j.data;
        if (Array.isArray(d)) d = Object.fromEntries(d);
        const numericId = Number(d.id);
        if (Number.isNaN(numericId)) return null;
        return { ...d, id: numericId } as FriendUser;
      });
      const results = await Promise.all(calls);
      const filtered = results.filter(Boolean) as FriendUser[];
      setAllUsers(filtered);
    } finally {
      setLoadingAll(false);
    }
  }

  async function fetchMyFriends() {
    if (!loggedInUserId) return;
    try {
      const r = await fetch(`https://sanquin-api.onrender.com/users/${loggedInUserId}/friends`);
      if (!r.ok) {
        setFriends(new Set());
        return;
      }
      const j = await r.json();
      const arr = Array.isArray(j.data) ? j.data : [];
      // parse ID
      const friendIDs = arr
    .map((f: any) => Number(f.id))
    .filter((n: number) => !Number.isNaN(n));
      setFriends(new Set(friendIDs));
    } catch {
      setFriends(new Set());
    }
  }

  async function fetchSentRequests() {
    if (!loggedInUserId) return;
    try {
      const r = await fetch(`https://sanquin-api.onrender.com/users/${loggedInUserId}/sent-requests`);
      if (!r.ok) {
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
      const newSet = new Set<number>(pendingIDs);
      setPendingTo(newSet);
      clearSentContextSet();
      newSet.forEach((id) => addSentFriendRequest(id));
    } catch {
      setPendingTo(new Set());
      clearSentContextSet();
    }
  }

  function clearSentContextSet() {
    sentFriendRequests.forEach((id) => removeSentFriendRequest(id));
  }

  async function fetchReceivedRequests() {
    if (!loggedInUserId) return;
    try {
      const r = await fetch(`https://sanquin-api.onrender.com/users/${loggedInUserId}/friend-requests`);
      if (!r.ok) {
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
      const newSet = new Set<number>(pendingIDs);
      setPendingFrom(newSet);
      clearReceivedContextSet();
      newSet.forEach((id) => addReceivedFriendRequest(id));
    } catch {
      setPendingFrom(new Set());
      clearReceivedContextSet();
    }
  }

  function clearReceivedContextSet() {
    receivedFriendRequests.forEach((id) => removeReceivedFriendRequest(id));
  }

  function classifyUser(u: FriendUser) {
    if (friends.has(u.id)) return "friend";
    if (pendingTo.has(u.id)) return "request_sent";
    if (pendingFrom.has(u.id)) return "request_received";
    return "friend_suggestion";
  }

  function renderFeed() {
    return (
      <CommonScrollElement>
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

    return (
      <CommonScrollElement>
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleRefresh}>
            <Image source={RefreshIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
        <InputField placeholder="Search..." value={search} onChangeText={setSearch} style={styles.searchField} />

        <Text style={styles.sectionTitle}>My Friends</Text>
        {loadingAll && <ActivityIndicator size="large" />}
        {!loadingAll && myFriends.length === 0 && (
          <Text style={styles.noDataText}>No friends found.</Text>
        )}
        {myFriends.map((u) => (
          <View key={`fr-${u.id}`} style={styles.friendContainer}>
            <FriendContent
              id={String(u.id)}
              name={`${u.first_name} ${u.last_name}`}
              status="friend"
              onPress={() => router.push(`/main/community/FriendsDetailScreen?id=${u.id}&isFriend=true`)}
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Received Friend Requests</Text>
        {!loadingAll && myReceived.length === 0 && (
          <Text style={styles.noDataText}>No pending requests.</Text>
        )}
        {myReceived.map((u) => (
          <View key={`recv-${u.id}`} style={styles.friendContainer}>
            <FriendContent
              id={String(u.id)}
              name={`${u.first_name} ${u.last_name}`}
              status="request_received"
              onPress={() => router.push(`/main/community/FriendsDetailScreen?id=${u.id}`)}
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Sent Friend Requests</Text>
        {!loadingAll && mySent.length === 0 && (
          <Text style={styles.noDataText}>No pending requests.</Text>
        )}
        {mySent.map((u) => (
          <View key={`sent-${u.id}`} style={styles.friendContainer}>
            <FriendContent
              id={String(u.id)}
              name={`${u.first_name} ${u.last_name}`}
              status="request_sent"
              onPress={() => router.push(`/main/community/FriendsDetailScreen?id=${u.id}`)}
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Friend Suggestions</Text>
        {!loadingAll && mySuggestions.length === 0 && (
          <Text style={styles.noDataText}>No suggestions available.</Text>
        )}
        {mySuggestions.map((u) => (
          <View key={`sugg-${u.id}`} style={styles.friendContainer}>
            <FriendContent
              id={String(u.id)}
              name={`${u.first_name} ${u.last_name}`}
              status="friend_suggestion"
              onPress={() => router.push(`/main/community/FriendsDetailScreen?id=${u.id}`)}
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
      <View>
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
  noDataText: {
    color: "gray",
    marginBottom: 10,
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
  searchField: {},
});
