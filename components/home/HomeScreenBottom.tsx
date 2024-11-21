import {StyleSheet, View} from "react-native";
import CommonButton from "@/components/common/CommonButton";
import React from "react";
import CommonTextBold from "@/components/common/CommonTextBold";
import CommonText from "@/components/common/CommonText";

const HomeScreenBottom = () => {
    return (
        <View style={styles.container}>
            <CommonTextBold>
                Nothing more to see
            </CommonTextBold>
            <CommonText style={styles.textAdvice}>
                Customize your home screen or take a test to see if you can donate
            </CommonText>
            <CommonButton href="/main/home" style={styles.button}>
                Customize
            </CommonButton>
            <CommonButton href="/main/home" style={styles.button}>
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
    button: {

    },
    textAdvice: {
        textAlign: "center",
    }
})

export default HomeScreenBottom;