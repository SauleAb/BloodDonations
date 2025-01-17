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

export default function FriendsDetailScreen() {
  const { id, isFriend } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUser();
  const loggedInUserId = user?.id;

  const [friend, setFriend] = useState<FriendObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const {
    sentFriendRequests,
    receivedFriendRequests,
    addSentFriendRequest,
    removeSentFriendRequest,
    removeReceivedFriendRequest,
  } = useFriendRequests();

  const isFriendRequestSent = sentFriendRequests.has(Number(id));
  const isFriendRequestReceived = receivedFriendRequests.has(Number(id));

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchFriend = async () => {
      try {
        const response = await fetch(`https://sanquin-api.onrender.com/users/id/${id}`);
        if (!response.ok) {
          if (response.status === 500) {
            setFriend(null);
            setLoading(false);
            return;
          }
          setError("Error fetching friend.");
          setLoading(false);
          return;
        }
        const result = await response.json();
        const arrayPairs = result?.data;

        let friendObj: FriendObject | null = null;
        if (Array.isArray(arrayPairs)) {
          friendObj = Object.fromEntries(arrayPairs) as FriendObject;
        }
        setFriend(friendObj);
      } catch {
        setError("Error fetching friend.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriend();
  }, [id, loggedInUserId]);

  const sendFriendRequest = async () => {
    if (!id || !loggedInUserId) return;
    const targetId = Number(id);
    if (isNaN(targetId)) {
      return;
    }

    setActionLoading(true);
    try {
      const url = `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${targetId}`;
      const resp = await fetch(url, { method: "POST" });

      if (resp.ok) {
        addSentFriendRequest(targetId);
        console.log(error)
      } else {
        setError("Error sending friend request.");
      }
    } catch {
      setError("Error sending friend request.");
    } finally {
      setActionLoading(false);
    }
  };

  const cancelFriendRequest = async () => {
    if (!id || !loggedInUserId) return;
    const targetId = Number(id);
    if (isNaN(targetId)) {
      return;
    }

    setActionLoading(true);
    try {
      const url = `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${targetId}`;
      const resp = await fetch(url, { method: "DELETE" });
      if (resp.ok) {
        removeSentFriendRequest(targetId);
      } else {
      }
    } catch {
      setError("Error canceling friend request.");
    } finally {
      setActionLoading(false);
    }
  };

  const acceptFriendRequest = async () => {
    if (!id || !loggedInUserId) return;
    const senderId = Number(id);
    if (isNaN(senderId)) {
      return;
    }

    setActionLoading(true);
    try {
      const url = `https://sanquin-api.onrender.com/users/${senderId}/friends/${loggedInUserId}?status=accepted`;
      const resp = await fetch(url, { method: "PUT" });
      if (resp.ok) {
        removeReceivedFriendRequest(senderId);
        router.back();
      } else {
        setError("Error accepting friend request.");
      }
    } catch {
      setError("Error accepting friend request.");
    } finally {
      setActionLoading(false);
    }
  };

  const declineFriendRequest = async () => {
    if (!id || !loggedInUserId) return;
    const senderId = Number(id);
    if (isNaN(senderId)) {
      return;
    }

    setActionLoading(true);
    try {
        removeReceivedFriendRequest(senderId);
        router.back();
    } catch {
      setError("Error declining friend request.");
      console.log(error);

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

  if (error) {
    return (
      <CommonBackground logoVisible={true} mainPage={false}>
        <View style={styles.container}>
          <Text style={styles.text}>Error: {error}</Text>
        </View>
      </CommonBackground>
    );
  }

  if (!friend) {
    return (
      <CommonBackground logoVisible={true} mainPage={false}>
        <View style={styles.container}>
          <Text style={styles.text}>Friend not found.</Text>
        </View>
      </CommonBackground>
    );
  }

  const dateWithoutTime = (friend.birthdate).toString().split('T')[0];

  return (
    <CommonBackground logoVisible={true} mainPage={true}>
      <CommonScrollElement>
      <View style={styles.container}>
        <CommonContent titleText={'First Name'} contentText={friend.first_name ?? 'N/A'} />
        <CommonContent titleText={'Last Name'} contentText={friend.last_name ?? 'N/A'} />
        <CommonContent titleText={'Username'} contentText={friend.username ?? 'N/A'} />
        <CommonContent titleText={'Email'} contentText={friend.email ?? 'N/A'} />
        <CommonContent titleText={'Birth Date'} contentText = {dateWithoutTime} />
        <CommonContent titleText={'City'} contentText={friend.city ?? 'N/A'} />

        {isFriend ? (
          <View style={styles.statusContainer}>
            <Image source={FriendIcon} style={styles.statusIcon} />
            <Text style={styles.statusText}>You are friends</Text>
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
    width: "95%",
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f44336",
    borderRadius: 4,
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
