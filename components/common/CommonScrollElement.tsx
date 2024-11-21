import {ScrollView, StyleSheet, View} from "react-native";
import React from "react";

type scrollProps = {
    children: React.ReactNode;
};

const CommonScrollElement: React.FC<scrollProps> = ({ children }) => {
    return (
        <ScrollView
            style={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.contentWrapper}>
                {children}
            </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: '100%',
    },
    contentWrapper: {
        alignItems: 'center',
        marginBottom: 30
    },
})

export default CommonScrollElement;