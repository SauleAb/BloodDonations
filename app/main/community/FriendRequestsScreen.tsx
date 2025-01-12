import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, Image, } from "react-native";
import { useUser } from "@/components/UserContext";
import { useRouter } from "expo-router";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonButton from "@/components/common/CommonButton";
import CommonBackground from "@/components/common/CommonBackground";
import FriendContent from "@/components/FriendContent";

import AcceptIcon from "@/assets/icons/Gift.png";
import DeclineIcon from "@/assets/icons/uber.png";
import commonStyles from "@/app/styles/CommonStyles";

type FriendRequestItem = {
  id: string;
  created_at: string;
  receiver_id: string;
  sender_id: string;
  status: string;
  senderUser?: {
    id?: number;
    first_name?: string;
    last_name?: string;
  };
};

export default function FriendRequestsScreen() {
  const { user } = useUser();
  const loggedInUserId = user?.id;
  const router = useRouter();

  const [requests, setRequests] = useState<FriendRequestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loggedInUserId) {
      router.replace("/login");
      return;
    }
    fetchRequests(loggedInUserId);
  }, [loggedInUserId]);

  async function fetchRequests(userId: number) {
    try {
      setLoading(true);
      setError(null);

      const url = `https://sanquin-api.onrender.com/users/${userId}/friend-requests`;
      console.log("Fetching friend requests from:", url);
      const resp = await fetch(url);

      if (!resp.ok) {
        console.warn(`Friend requests fetch failed with status ${resp.status}`);
        if (resp.status === 500) {
          setRequests([]);
          setLoading(false);
          return;
        }
        throw new Error(`Fetch friend requests failed. Status ${resp.status}`);
      }

      const result = await resp.json();
      console.log("Raw friend-requests response:", result);

      const rawData = result?.data;
      if (!Array.isArray(rawData)) {
        setRequests([]);
        setLoading(false);
        return;
      }

      const baseRequests: FriendRequestItem[] = rawData.map((req: any, index: number) => ({
        id: `${req.sender_id}-${req.created_at}-${index}`, // Unique key
        ...req,
      }));

      const withUserInfo = await Promise.all(
        baseRequests.map(async (reqItem) => {
          const senderNum = parseInt(reqItem.sender_id, 10);
          if (!senderNum) {
            return reqItem;
          }

          const userResp = await fetch(`https://sanquin-api.onrender.com/users/id/${senderNum}`);
          if (!userResp.ok) {
            console.warn(
              `Could not fetch user for sender_id ${senderNum}, status: ${userResp.status}`
            );
            return reqItem;
          }

          const userResult = await userResp.json();
          let userData = userResult?.data;
          if (Array.isArray(userData)) {
            userData = Object.fromEntries(userData);
          }
          return { ...reqItem, senderUser: userData };
        })
      );

      setRequests(withUserInfo);
    } catch (err: any) {
      console.error("Error fetching friend requests:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(senderId: string) {
    if (!loggedInUserId) return;

    const url = `https://sanquin-api.onrender.com/users/${senderId}/friends/${loggedInUserId}?status=accepted`;
    console.log("Accepting friend request at:", url);

    try {
      const resp = await fetch(url, { method: "PUT" });
      const textBody = await resp.text();
      console.log("Accept friend response body:", textBody);

      if (!resp.ok) {
        throw new Error(`Accept request failed with status ${resp.status}`);
      }

      Alert.alert("Success", `Friend request from user #${senderId} accepted!`);
      setRequests((prev) => prev.filter((r) => r.sender_id !== senderId));
    } catch (err: any) {
      Alert.alert("Error", err.message);
      console.error("Error accepting friend request:", err);
    }
  }

  async function handleDecline(senderId: string) {
    if (!loggedInUserId) return;

    // Maybe check if it's "pending"
    const requestItem = requests.find((r) => r.sender_id === senderId);
    if (requestItem && requestItem.status !== "pending") {
      console.warn(`Cannot decline: status is ${requestItem.status}, not "pending".`);
      return;
    }

    const url = `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${senderId}?status=blocked`;
    console.log("Declining friend request at:", url);

    try {
      const resp = await fetch(url, { method: "PUT" });
      if (!resp.ok) {
        let errorText: string | undefined;
        try {
          errorText = await resp.text();
        } catch (e) {}
        throw new Error(
          `Decline request failed with status ${resp.status}, body: ${errorText}`
        );
      }

      Alert.alert("Success", `Friend request from user #${senderId} declined!`);
      setRequests((prev) => prev.filter((r) => r.sender_id !== senderId));
    } catch (err: any) {
      Alert.alert("Error", err.message);
      console.error("Error declining friend request:", err);
    }
  }

  if (!loggedInUserId) {
    return (
      <View style={styles.placeholderContainer}>
        <Text>Redirecting...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <CommonBackground logoVisible={false} mainPage={false}>
        <CommonScrollElement contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Friend Requests</Text>

          {loading && <ActivityIndicator size="large" />}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {(!loading && requests.length === 0 && !error) && (
            <Text style={styles.noDataText}>No friend requests found.</Text>
          )}

          {requests.map((req) => {
            const senderNum = parseInt(req.sender_id, 10);
            const displayName = req.senderUser
              ? `${req.senderUser.first_name ?? ""} ${req.senderUser.last_name ?? ""}`
              : `User #${senderNum}`;

            return (
              <View key={req.id} style={styles.requestContainer}>
                <FriendContent
                  id={String(req.sender_id)}
                  name={`${displayName}`.trim() || `User #${senderNum}`}
                  onPress={(id) =>
                    router.push(`/main/community/FriendsDetailScreen?id=${id}`)
                  }
                />
                <View style={styles.actionButtonsContainer}>
                  {/* Accept Button */}
                  <TouchableOpacity
                    onPress={() => handleAccept(req.sender_id)}
                    style={styles.acceptButton}
                    accessibilityLabel={`Accept friend request from ${displayName}`}
                  >
                    <Image source={AcceptIcon} style={styles.actionIcon} />
                  </TouchableOpacity>

                  {/* Decline Button */}
                  <TouchableOpacity
                    onPress={() => handleDecline(req.sender_id)}
                    style={styles.declineButton}
                    accessibilityLabel={`Decline friend request from ${displayName}`}
                  >
                    <Image source={DeclineIcon} style={styles.actionIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <CommonButton style={styles.backButton} onPress={() => router.back()}>
            <Text>Back</Text>
          </CommonButton>
        </CommonScrollElement>
      </CommonBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  noDataText: {
    color: "gray",
    marginBottom: 10,
  },
  requestContainer: {
    marginVertical: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  acceptButton: {
    width: 30,
    height: 30,
    backgroundColor: "#4CAF50", 
    borderRadius: 15, 
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  declineButton: {
    width: 30,
    height: 30,
    backgroundColor: "#F44336",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  backButton: {
    marginTop: 20,
  },
});
