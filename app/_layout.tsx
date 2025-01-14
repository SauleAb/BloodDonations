import React from "react";
import { FriendRequestProvider } from "@/components/FriendRequestsContext";
import { UserProvider } from "@/components/UserContext";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <FriendRequestProvider>
      <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                </Stack>
      </UserProvider>
    </FriendRequestProvider>
  );
}