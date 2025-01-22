import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CommonBackground from "@/components/common/CommonBackground";
import AddFriendIcon from "@/assets/icons/add-user.png";
import RequestSentIcon from "@/assets/icons/add-friend.png";
import CheckIcon from "@/assets/icons/check.png";
import MultiplyIcon from "@/assets/icons/multiply.png";
import FriendIcon from "@/assets/icons/friend.png";
import { useUser } from "@/components/UserContext";
import { FriendObject } from "@/types/types";
import { useFriendRequests } from "@/components/FriendRequestsContext";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import { createNotification } from "@/utils/notificationUtils";

export default function FriendsDetailScreen() {
  const { id: routeId, isFriend } = useLocalSearchParams();
  const friendId = routeId ? parseInt(routeId as string, 10) : NaN;
  const router = useRouter();
  const { user } = useUser();
  const loggedInUserId = user?.id;

  const [friend, setFriend] = useState<FriendObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const {
    sentFriendRequests,
    receivedFriendRequests,
    addSentFriendRequest,
    removeSentFriendRequest,
    removeReceivedFriendRequest,
  } = useFriendRequests();

  const isFriendRequestSent = sentFriendRequests.has(friendId);
  const isFriendRequestReceived = receivedFriendRequests.has(friendId);

  useEffect(() => {
    if (!friendId || Number.isNaN(friendId)) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const resp = await fetch(`https://sanquin-api.onrender.com/users/id/${friendId}`);
        if (!resp.ok) {
          setLoading(false);
          setFriend(null);
          return;
        }
        const data = await resp.json();
        let userData = data?.data;
        if (Array.isArray(userData)) {
          userData = Object.fromEntries(userData);
        }
        setFriend(userData);
      } finally {
        setLoading(false);
      }
    })();
  }, [friendId]);

  const sendFriendRequest = async () => {
    if (!loggedInUserId || Number.isNaN(friendId)) return;
    setActionLoading(true);
    try {
      const url = `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${friendId}`;
      const r = await fetch(url, { method: "POST" });
      if (r.ok) {
        addSentFriendRequest(friendId);
        createNotification(friendId, "New Friend Request", `${user.username} sent you a friend request!`);
        router.back();
      }
    } finally {
      setActionLoading(false);
    }
  };

  const cancelFriendRequest = async () => {
    if (!loggedInUserId || Number.isNaN(friendId)) return;
    setActionLoading(true);
    try {
      await fetch(
        `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${friendId}?status=accepted`,
        { method: "PUT" }
      );
      await fetch(`https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${friendId}`, {
        method: "DELETE",
      });
      removeSentFriendRequest(friendId);
      router.back();
    } finally {
      setActionLoading(false);
    }
  };

  const acceptFriendRequest = async () => {
    if (!loggedInUserId || Number.isNaN(friendId)) return;
    setActionLoading(true);
    try {
      const url = `https://sanquin-api.onrender.com/users/${friendId}/friends/${loggedInUserId}?status=accepted`;
      const r = await fetch(url, { method: "PUT" });
      if (r.ok) {
        removeReceivedFriendRequest(friendId);
        createNotification(friendId, "Friend Request Accepted", `${user.username} accepted your request!`);
        router.back();
      }
    } finally {
      setActionLoading(false);
    }
  };

  const declineFriendRequest = async () => {
    if (!loggedInUserId || Number.isNaN(friendId)) return;
    setActionLoading(true);
    try {
      await fetch(
        `https://sanquin-api.onrender.com/users/${friendId}/friends/${loggedInUserId}?status=accepted`,
        { method: "PUT" }
      );
      await fetch(`https://sanquin-api.onrender.com/users/${friendId}/friends/${loggedInUserId}`, {
        method: "DELETE",
      });
      removeReceivedFriendRequest(friendId);
      router.back();
    } finally {
      setActionLoading(false);
    }
  };

  const removeFriend = async () => {
    if (!loggedInUserId || Number.isNaN(friendId)) return;
    setActionLoading(true);
    try {
      let url = `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${friendId}`;
      let resp = await fetch(url, { method: "DELETE" });
  
      if (!resp.ok) {
        url = `https://sanquin-api.onrender.com/users/${friendId}/friends/${loggedInUserId}`;
        resp = await fetch(url, { method: "DELETE" });
      }
  
      if (resp.ok) {
        removeSentFriendRequest(friendId);
        removeReceivedFriendRequest(friendId);
      }
  
      router.back();
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <CommonBackground logoVisible={true} mainPage={false}>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      </CommonBackground>
    );
  }

  if (!friend) {
    return (
      <CommonBackground logoVisible={true} mainPage={false}>
        <View style={styles.container}>
          <Text style={styles.text}>User not found.</Text>
        </View>
      </CommonBackground>
    );
  }

  const dateWithoutTime = friend.birthdate?.split("T")[0] || "N/A";

  return (
    <CommonBackground logoVisible={true} mainPage={true}>
      <CommonScrollElement>
        <View style={styles.container}>
          <CommonContent titleText="First Name" contentText={friend.first_name || "N/A"} />
          <CommonContent titleText="Last Name" contentText={friend.last_name || "N/A"} />
          <CommonContent titleText="Username" contentText={friend.username || "N/A"} />
          <CommonContent titleText="Email" contentText={friend.email || "N/A"} />
          <CommonContent titleText="Birth Date" contentText={dateWithoutTime} />
          <CommonContent titleText="City" contentText={friend.city || "N/A"} />
          {isFriend ? (
            <View style={styles.statusContainer}>
              <Image source={FriendIcon} style={styles.statusIcon} />
              <Text style={styles.statusText}>You are friends</Text>
              <TouchableOpacity
                onPress={removeFriend}
                style={styles.removeButton}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.removeButtonText}>Remove Friend</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : isFriendRequestSent ? (
            <View style={styles.statusContainer}>
              <Image source={RequestSentIcon} style={styles.statusIcon} />
              <Text style={styles.statusText}>Friend Request Sent</Text>
              <TouchableOpacity
                onPress={cancelFriendRequest}
                style={styles.cancelButton}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : isFriendRequestReceived ? (
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                onPress={acceptFriendRequest}
                style={styles.acceptButton}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Image source={CheckIcon} style={styles.actionIcon} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={declineFriendRequest}
                style={styles.declineButton}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Image source={MultiplyIcon} style={styles.actionIcon} />
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={sendFriendRequest}
              style={styles.addButton}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Image source={AddFriendIcon} style={styles.addButtonIcon} />
                  <Text style={styles.buttonText}>Add Friend</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </CommonScrollElement>
    </CommonBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
    width: "100%",
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#40b6ff",
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 16,
    flex: 1,
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f44336",
    borderRadius: 4,
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f44336",
    borderRadius: 4,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#fff",
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
});
