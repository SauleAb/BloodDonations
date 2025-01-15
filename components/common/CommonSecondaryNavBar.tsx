import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CommonText from "@/components/common/CommonText";

interface SecondaryNavBarProps<T extends string> {
    tabs: Array<{ key: T; label: string }>;
    activeTab: T;
    onTabChange: (tabKey: T) => void;
}

const CommonSecondaryNavBar = <T extends string>({
    tabs,
    activeTab,
    onTabChange,
}: SecondaryNavBarProps<T>) => {
    return (
        <View style={styles.secondaryNavBar}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.key}
                    style={[
                        styles.navButton,
                        activeTab === tab.key ? styles.activeTab : null,
                    ]}
                    onPress={() => onTabChange(tab.key)}
                >
                    <CommonText style={styles.navText}>{tab.label}</CommonText>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CommonSecondaryNavBar;

const styles = StyleSheet.create({
    secondaryNavBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#DDDDDD"
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
});