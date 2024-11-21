import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Href} from 'expo-router';
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";

export default function DonorTest() {

    return (
        <View style={styles.container}>
            <CommonBackground style={styles.backgroundImage} titleText={"Congratulations"} titleSubText={"You are eligible to donate!"} logoVisible={true}>
                <CommonText style={styles.text}>Feel free to go to the home page</CommonText>
                <CommonButton
                    href={"/main/home" as Href<string | object>}

                >
                    Take me home!
                </CommonButton>
            </CommonBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 8,
    },
    text: {
        textAlign: 'center',
        marginTop: 50
    }
});