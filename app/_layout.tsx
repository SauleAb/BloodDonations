import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "@/components/UserContext";

export default function RootLayout() {
    return (
        <UserProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
            </Stack>
        </UserProvider>
    );
}
