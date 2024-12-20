import { StyleSheet } from "react-native";

const donateStyles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20
    },
    locationItem: {
        padding: 10,
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    toggle: {
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 1
    },
    calendarWrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    },
    listContainer: {
        flexGrow: 1, // Allows content to grow within the FlatList
        alignItems: "center", // Centers content horizontally
    },
    timeButton: {
        margin: 1,
    },
    rowStart: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 5,
        marginTop: 5,
        flexWrap: "wrap",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5,
        marginTop: 5,
    },
    center: {
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 20,
    },
    friend: {
        width: "70%",
        textAlign: "left",
    },
    selectedTime: {
        backgroundColor: "#00BFFF",
        color: "#fff",
    },
    calendarContainer: {
        marginTop: 20,
        width: "90%",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    greyBar: {
        backgroundColor: "rgb(223,223,223)",
        padding: 10,
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    greyBarText: {
        fontSize: 16,
        color: "#404040",
    },
    whiteBackground: {
        backgroundColor: "#ffffff",
        padding: 15,
    },
    selectedDateText: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: "#333",
        textAlign: "left",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
});

export default donateStyles;