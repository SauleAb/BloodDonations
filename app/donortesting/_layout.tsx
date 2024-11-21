import { Stack } from "expo-router";
import React from "react";

export default function donorTestLayout() {

    return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="donortest" />
    </Stack>
  );
}
