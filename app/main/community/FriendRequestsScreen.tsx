import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { useUser } from "@/components/UserContext";
import { useRouter } from "expo-router";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonButton from "@/components/common/CommonButton";
import CommonBackground from "@/components/common/CommonBackground";
import FriendContent from "@/components/FriendContent";
import commonStyles from "@/app/styles/CommonStyles";
import { useFriendRequests } from "@/components/FriendRequestsContext";

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

  const {
    removeReceivedFriendRequest,
  } = useFriendRequests();

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
      const resp = await fetch(url);
      const result = await resp.json();

      if (resp.ok) {
        const rawData = result?.data;
        if (!Array.isArray(rawData)) {
          setRequests([]);
          setLoading(false);
          return;
        }
        const baseRequests: FriendRequestItem[] = rawData.map((req: any, index: number) => ({
          id: `${req.sender_id}-${req.created_at}-${index}`,
          ...req,
        }));

        const withUserInfo = await Promise.all(
          baseRequests.map(async (reqItem) => {
            const senderNum = parseInt(reqItem.sender_id, 10);
            if (!senderNum) {
              return reqItem;
            }
            const userResp = await fetch(
              `https://sanquin-api.onrender.com/users/id/${senderNum}`
            );
            if (!userResp.ok) {
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
      } else if (resp.status === 500 && result.message === "No friend requests found") {
        setRequests([]);
      } else {
        setRequests([]);
      }
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(senderId: string) {
    if (!loggedInUserId) return;
    const url = `https://sanquin-api.onrender.com/users/${senderId}/friends/${loggedInUserId}?status=accepted`;
    try {
      const resp = await fetch(url, { method: "PUT" });
      if (!resp.ok) {
        setError("Error accepting friend request.");
        return;
      }
      removeReceivedFriendRequest(Number(senderId));
      setRequests((prev) => prev.filter((r) => r.sender_id !== senderId));
    } catch {
      setError("Error accepting friend request.");
    }
  }

  async function handleDecline(senderId: string) {
    if (!loggedInUserId) return;
    try {
      removeReceivedFriendRequest(Number(senderId));
      setRequests((prev) => prev.filter((r) => r.sender_id !== senderId));
    } catch {
      setError("Error declining friend request.");
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
        <CommonScrollElement>
          <Text style={styles.title}>Friend Requests</Text>

          {loading && <ActivityIndicator size="large" />}
          {!loading && requests.length === 0 && !error && (
            <Text style={styles.noDataText}>No friend requests found.</Text>
          )}

          {requests.map((req) => {
            const senderNum = parseInt(req.sender_id, 10);
            const displayName = req.senderUser
              ? `${req.senderUser.first_name ?? ""} ${req.senderUser.last_name ?? ""}`
              : `User #${senderNum}`;

            return (
              <SafeAreaView style={styles.safeArea}  >
              <View style={styles.requestContainer} key={req.id} >
                <FriendContent
                  id={String(req.sender_id)}
                  name={`${displayName}`.trim() || `User #${senderNum}`}
                  status="request_received"
                  onPress={(id) =>
                    console.log('the user is not supposed to go there from here for now, bcs then it says you are friends, because i cheated with that in community page, oops')
                  }
                />
                <View style={styles.actionButtonsContainer}>
                  <CommonButton
                    style={styles.acceptButton}
                    onPress={() => handleAccept(req.sender_id)}
                  >
                    <Text style={{ color: "#fff" }}>Accept</Text>
                  </CommonButton>
                  <CommonButton
                    style={styles.declineButton}
                    onPress={() => handleDecline(req.sender_id)}
                  >
                    <Text style={{ color: "#fff" }}>Decline</Text>
                  </CommonButton>
                </View>
              </View>
              </SafeAreaView>
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
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  noDataText: {
    color: "gray",
    marginBottom: 10,
  },
  requestContainer: {
    justifyContent: "space-between",
    alignItems: 'flex-end',
  },
  
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  acceptButton: {
    width: 1,
    height: 1,
    backgroundColor: "#4CAF50", 
    borderRadius: 15, 
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  declineButton: {
    width: 1,
    height: 1,
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
  safeArea: {
    paddingHorizontal: 20,
    flex: 1,
  }
});
