import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

type FriendObject = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  birthdate?: string;
  city?: string;
  current_points?: number;
  total_points?: number;
  role?: string;
  created_at?: string;
};

export default function FriendsDetailScreen() {
  const { id } = useLocalSearchParams();
  const [friend, setFriend] = useState<FriendObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log("Raw user response (entire object):", result);

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
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error: {error}</Text>
      </View>
    );
  }

  if (!friend) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Friend not found.</Text>
      </View>
    );
  }

  return (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});
