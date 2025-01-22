import React from "react";
import { Stack } from "expo-router";
import {StyleSheet, View} from "react-native";

export default function CommunityLayout() {
  return (
      <Stack
          screenOptions={{
              contentStyle: { backgroundColor: "white" },
          }}>
          <Stack.Screen
              name="index"
              options={{ headerShown: false }}
          />

          <Stack.Screen
              name="FriendsDetailScreen"
              options={{
                  title: "Friend Details",
                  headerShown: false,
              }}
          />
          <Stack.Screen
              name="FriendRequestsScreen"
              options={{
                  title: "Friend Requests",
                  headerShown: false,
              }}
          />
      </Stack>

  );
}