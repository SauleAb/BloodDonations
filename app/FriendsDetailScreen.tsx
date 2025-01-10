import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native"; // Import RouteProp

type RouteParams = {
    id: string; // Explicitly declare the id parameter
};

export default function FriendsDetailScreen() {
    const route = useRoute<RouteProp<{ params: RouteParams }, "params">>(); // Define type for route params
    const { id } = route.params; // Extract id

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Friend Details</Text>
            <Text style={styles.text}>ID: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
