import React from "react";
import { Stack } from "expo-router";

export default function CommunityLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="FriendsDetailScreen"
        options={{
          title: "Friend Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
