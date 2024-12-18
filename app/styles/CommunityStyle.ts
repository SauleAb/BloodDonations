import { StyleSheet } from "react-native";

const communityStyles = StyleSheet.create({
    searchBar: {
        height: 40,
        width: "90%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "#f9f9f9",
        alignSelf: "center",
    },
    secondaryNavBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingVertical: 10,
    },
    friendInfoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    leftText: {
        fontWeight: "bold",
        color: "#333",
    },
    rightText: {
        color: "#555",
    },
    toggleButton: {
        marginTop: 10,
        alignSelf: "flex-start",
    },
    seeMoreButton: {
        marginTop: 10,
        backgroundColor: "#007BFF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: "flex-start",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    navButton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: "#ddd",
    },
    navText: {
        fontSize: 16,
        fontWeight: "600",
        color: "black",
    },
    noResultsText: {
        textAlign: "center",
        marginVertical: 20,
        color: "gray",
        fontSize: 16,
    },
    addFriendButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default communityStyles;
