import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";

type ScrollProps = {
    children: React.ReactNode;
    scrollEnabled?: boolean;
};

const CommonScrollElement: React.FC<ScrollProps> = ({ children, scrollEnabled = true }) => {
    return (
        <ScrollView
            style={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
        >
            <View style={styles.contentWrapper}>{children}</View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: "100%",
    },
    contentWrapper: {
        alignItems: "center",
        marginBottom: 30,
    },
});

export default CommonScrollElement;