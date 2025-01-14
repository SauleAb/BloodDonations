import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import CommonText from "@/components/common/CommonText";

export type RelationshipStatus =
  | "friend"
  | "friend_suggestion"
  | "request_sent"
  | "request_received";

interface FriendContentProps {
  id: string;
  name: string;
  status: RelationshipStatus;
  onPress: (id: string) => void;
  onAddFriend?: () => void;
  onCancelRequest?: () => void;
}

const FriendContent: React.FC<FriendContentProps> = ({
  id,
  name,
  status,
  onPress,
  onAddFriend,
  onCancelRequest,
}) => {
  let statusText: string;
  let actionButton: React.ReactNode = null;

  switch (status) {
    case "friend":
      statusText = "Friend";
      break;
    case "friend_suggestion":
      statusText = "Friend Suggestion";
      if (onAddFriend) {
        actionButton = (
          <TouchableOpacity
            onPress={onAddFriend}
            style={styles.actionButton}
          >
            <Image
              source={require("@/assets/icons/add-user.png")}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        );
      }
      break;
    case "request_sent":
      statusText = "Friend Request Sent";
      if (onCancelRequest) {
        actionButton = (
          <TouchableOpacity
            onPress={onCancelRequest}
            style={styles.actionButton}
          >
            <Image
              source={require("@/assets/icons/multiply.png")}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        );
      }
      break;
    case "request_received":
      statusText = "Friend Request Received";
      break;
    default:
      statusText = "";
  }

  return (
    <TouchableOpacity onPress={() => onPress(id)} style={styles.container}>
      <View style={styles.greyBar}>
        <CommonText style={styles.label}>{statusText}</CommonText>
      </View>
      <View style={[styles.contentWrapper, styles.shadow]}>
        <CommonText style={styles.nameText}>{name}</CommonText>
        {actionButton}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  greyBar: {
    backgroundColor: "rgba(223,223,223,0.5)",
    height: 30,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: "#404040",
  },
  contentWrapper: {
    overflow: "hidden",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shadow: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#404040",
  },
  actionButton: {
    padding: 5,
  },
  actionIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
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
});

export default FriendContent;
