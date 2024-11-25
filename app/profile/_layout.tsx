import { Stack } from "expo-router";
import React from "react";

export default function profileLayout() {

    return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="accountdetails" />
        <Stack.Screen name="bloodtestdata" />
        <Stack.Screen name="donationsdata" />
        <Stack.Screen name="locationsdata" />
    </Stack>
  );
}
