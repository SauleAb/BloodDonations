import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface CancelButtonProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onConfirm, onCancel }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleToggleExpand}>
                <Text style={styles.buttonText}>Cancel Appointment</Text>
                <Text style={styles.icon}>-</Text>
            </TouchableOpacity>
            {isExpanded && (
                <View style={styles.expandedSection}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.confirmButton]}
                        onPress={onConfirm}
                    >
                        <Text style={styles.actionText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={onCancel}
                    >
                        <Text style={styles.actionText}>No</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        marginVertical: 10,
    },
    button: {
        width: screenWidth * 0.9,
        height: 50,
        backgroundColor: "#f9cec6",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        borderBottomColor: "#f9cec6",
        borderBottomWidth: 1,
    },
    buttonText: {
        color: "black",
        fontSize: 15,
    },
    icon: {
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
    },
    expandedSection: {
        width: screenWidth * 0.9,
        height: 80,
        flexDirection: "row",
    },
    actionButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    confirmButton: {
        backgroundColor: "#fae5e1",
        borderRightColor: "#f9cec6",
        borderRightWidth: 2,
    },
    cancelButton: {
        backgroundColor: "#fae5e1",
    },
    actionText: {
        color: "black",
        fontSize: 22,
        fontWeight: "semibold",
    },
});

export default CancelButton;
