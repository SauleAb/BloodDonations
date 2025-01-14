import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Alert, } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CommonBackground from "@/components/common/CommonBackground";
import AddFriendIcon from "@/assets/icons/add-user.png";
import RequestSentIcon from "@/assets/icons/add-friend.png"; // Ensure this path is correct
import CheckIcon from "@/assets/icons/check.png"; // Ensure this path is correct
import MultiplyIcon from "@/assets/icons/multiply.png"; // Ensure this path is correct
import FriendIcon from "@/assets/icons/friend.png"; // Ensure this path is correct
import { useUser } from "@/components/UserContext";
import { FriendObject } from "@/types/types";
import { useFriendRequests } from "@/components/FriendRequestsContext";

export default function FriendsDetailScreen() {

  const { id, isFriend } = useLocalSearchParams(); // Destructure isFriend
  const router = useRouter();
  const { user } = useUser();
  const loggedInUserId = user?.id;

  const [friend, setFriend] = useState<FriendObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false); // For action buttons

  const {
    sentFriendRequests,
    receivedFriendRequests,
    addSentFriendRequest,
    addReceivedFriendRequest,
    removeSentFriendRequest,
    removeReceivedFriendRequest,
  } = useFriendRequests();

  const isFriendRequestSent = sentFriendRequests.has(Number(id));
  const isFriendRequestReceived = receivedFriendRequests.has(Number(id));

  useEffect(() => {
    if (!id) {
      console.log("No ID provided in route params.");
      setLoading(false);
      return;
    }

    const fetchFriend = async () => {
      try {
        console.log("Attempting to fetch friend with ID:", id);

        const response = await fetch(`https://sanquin-api.onrender.com/users/id/${id}`);
        console.log("Fetch response status:", response.status);

        if (!response.ok) {
          if (response.status === 404) {
            // Friend not found
            console.log("Friend not found with ID:", id);
            setFriend(null);
            return;
          }
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log("Raw user response:", JSON.stringify(result, null, 2));

        const arrayPairs = result?.data;
        console.log("Extracted data (array of pairs):", arrayPairs);

        let friendObj: FriendObject | null = null;
        if (Array.isArray(arrayPairs)) {
          friendObj = Object.fromEntries(arrayPairs) as FriendObject;
        }

        console.log("Converted friendObj:", friendObj);

        setFriend(friendObj);
      } catch (err: any) {
        console.error("Error fetching friend:", err);
        setError(err.message);
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
      Alert.alert("Invalid User ID");
      return;
    }

    if (sentFriendRequests.has(targetId)) {
      Alert.alert("Request Already Sent", "You have already sent a friend request to this user.");
      return;
    }

    if (receivedFriendRequests.has(targetId)) {
      Alert.alert("Request Received", "This user has already sent you a friend request.");
      // Optionally, navigate to friend requests screen
      router.push("/main/community/FriendRequestsScreen");
      return;
    }

    const url = `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${targetId}`;
    console.log("Sending friend request to:", url);

    try {
      setActionLoading(true);
      const resp = await fetch(url, { method: "POST" });
      const textBody = await resp.text();
      console.log("Send friend request response body:", textBody);

      if (resp.ok) {
        addSentFriendRequest(targetId);
        Alert.alert("Success", "Friend request sent!");
      } else if (resp.status === 405 || resp.status === 409) {
        // Conflict error for duplicates
        Alert.alert(
          "Request Already Exists",
          "You have already sent a friend request to this user."
        );
      } else if (resp.status === 400) {
        const errorData = JSON.parse(textBody);
        Alert.alert("Error", errorData.detail || "Failed to send friend request.");
      } else if (resp.status === 500) {
        Alert.alert(
          "Server Error",
          "An unexpected error occurred while sending the friend request. Please try again later."
        );
      } else {
        throw new Error(`Friend request failed with status ${resp.status}`);
      }
    } catch (err: any) {
      console.error("Error sending friend request:", err);
      Alert.alert("Error", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const cancelFriendRequest = async () => {
    if (!id || !loggedInUserId) return;
    const targetId = Number(id);
    if (isNaN(targetId)) {
      Alert.alert("Invalid User ID");
      return;
    }

    const url = `https://sanquin-api.onrender.com/users/${loggedInUserId}/friends/${targetId}`;
    console.log("Canceling friend request at:", url);

    try {
      setActionLoading(true);
      const resp = await fetch(url, { method: "DELETE" }); // Assuming DELETE cancels the request
      const textBody = await resp.text();
      console.log("Cancel friend request response body:", textBody);

      if (resp.ok) {
        removeSentFriendRequest(targetId);
        Alert.alert("Success", "Friend request canceled.");
      } else if (resp.status === 404) {
        // Not Found
        Alert.alert("Error", "Friend request not found.");
      } else {
        throw new Error(`Cancel request failed with status ${resp.status}`);
      }
    } catch (err: any) {
      console.error("Error canceling friend request:", err);
      Alert.alert("Error", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const acceptFriendRequest = async () => {
    if (!id || !loggedInUserId) return;
    const senderId = Number(id);
    if (isNaN(senderId)) {
      Alert.alert("Invalid User ID");
      return;
    }

    const url = `https://sanquin-api.onrender.com/users/${senderId}/friends/${loggedInUserId}?status=accepted`;
    console.log("Accepting friend request at:", url);

    try {
      setActionLoading(true);
      const resp = await fetch(url, { method: "PUT" });
      const textBody = await resp.text();
      console.log("Accept friend request response body:", textBody);

      if (resp.ok) {
        removeReceivedFriendRequest(senderId);
        Alert.alert("Success", "Friend request accepted!");
        router.back(); // Navigate back to the previous screen
      } else {
        throw new Error(`Accept request failed with status ${resp.status}`);
      }
    } catch (err: any) {
      console.error("Error accepting friend request:", err);
      Alert.alert("Error", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const declineFriendRequest = async () => {
    if (!id || !loggedInUserId) return;
    const senderId = Number(id);
    if (isNaN(senderId)) {
      Alert.alert("Invalid User ID");
      return;
    }

    const url = `https://sanquin-api.onrender.com/users/${senderId}/friends/${loggedInUserId}?status=declined`;
    console.log("Declining friend request at:", url);

    try {
      setActionLoading(true);
      const resp = await fetch(url, { method: "PUT" });
      const textBody = await resp.text();
      console.log("Decline friend request response body:", textBody);

      if (resp.ok) {
        removeReceivedFriendRequest(senderId);
        Alert.alert("Success", "Friend request declined.");
        router.back(); // Navigate back to the previous screen
      } else {
        throw new Error(`Decline request failed with status ${resp.status}`);
      }
    } catch (err: any) {
      console.error("Error declining friend request:", err);
      Alert.alert("Error", err.message);
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

  return (
    <CommonBackground logoVisible={true} mainPage={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Friend Details</Text>
        <Text style={styles.text}>ID: {friend.id ?? "N/A"}</Text>
        <Text style={styles.text}>First Name: {friend.first_name ?? "N/A"}</Text>
        <Text style={styles.text}>Last Name: {friend.last_name ?? "N/A"}</Text>
        <Text style={styles.text}>Username: {friend.username ?? "N/A"}</Text>
        <Text style={styles.text}>Email: {friend.email ?? "N/A"}</Text>
        <Text style={styles.text}>Birthdate: {friend.birthdate ?? "N/A"}</Text>
        <Text style={styles.text}>City: {friend.city ?? "N/A"}</Text>
        <Text style={styles.text}>
          Current Points: {friend.current_points ?? "N/A"}
        </Text>
        <Text style={styles.text}>
          Total Points: {friend.total_points ?? "N/A"}
        </Text>
        <Text style={styles.text}>Role: {friend.role ?? "N/A"}</Text>
        <Text style={styles.text}>
          Created At: {friend.created_at ?? "N/A"}
        </Text>

        {isFriend ? (
          <View style={styles.statusContainer}>
            <Image source={FriendIcon} style={styles.statusIcon} /> 
            <Text style={styles.statusText}>You are friends</Text>
          </View>
        ) : isFriendRequestSent ? (
          <View style={styles.statusContainer}>
            <Image source={RequestSentIcon} style={styles.statusIcon} />
            <Text style={styles.statusText}>Request Sent</Text>
            <TouchableOpacity
              onPress={cancelFriendRequest}
              style={styles.cancelButton}
              accessibilityLabel="Cancel Friend Request"
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
              accessibilityLabel={`Accept friend request from ${friend.first_name} ${friend.last_name}`}
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
              accessibilityLabel={`Decline friend request from ${friend.first_name} ${friend.last_name}`}
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
            accessibilityLabel="Add Friend"
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
    </CommonBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", 
    padding: 20,
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
