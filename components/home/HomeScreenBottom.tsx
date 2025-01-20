import {StyleSheet, View} from "react-native";
import CommonButton from "@/components/common/CommonButton";
import React from "react";
import CommonText from "@/components/common/CommonText";

const HomeScreenBottom = () => {
    return (
        <View style={styles.container}>
            <CommonText bold>
                Nothing more to see
            </CommonText>
            <CommonText style={styles.textAdvice}>
                Customize your home screen or register for a donation!
            </CommonText>
            <CommonButton style={styles.margin} href="/main/profile">
                Customize
            </CommonButton>
            <CommonButton href="/main/donate">
                Donate
            </CommonButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 200,
        marginBottom: '60%',
    },
    margin: {
        margin: 15
    },
    textAdvice: {
        textAlign: "center",
    }
})

export default HomeScreenBottom;