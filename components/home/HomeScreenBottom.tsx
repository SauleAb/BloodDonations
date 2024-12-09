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
                Customize your home screen or take a test to see if you can donate
            </CommonText>
            <CommonButton style={styles.margin} href="/main/home">
                Customize
            </CommonButton>
            <CommonButton href="/main/home">
                Take Test
            </CommonButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 200
    },
    margin: {
        margin: 15
    },
    textAdvice: {
        textAlign: "center",
    }
})

export default HomeScreenBottom;