import React from 'react';
import {StyleSheet, View} from 'react-native';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';
import CommonBackground from "@/components/CommonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import CommonText from "@/components/CommonText";

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <CommonBackground style={styles.backgroundImage} backgroundHeight={1}>

                <View style={styles.logoContainer}>
                    <LogoSanquin width={400} height={400} />
                </View>

                <CommonText style={styles.welcomeText}>Welcome Aboard! Thank you for starting your donor adventure!</CommonText>
                <AnimatedButton href="/login" style={styles.button}>
                    Begin Your Journey
                </AnimatedButton>

            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 50,
        left: '50%',
        transform: [{ translateX: -100 }],
        alignItems: 'center',
    },
    welcomeText: {
        marginTop: 350,
        textAlign: 'center',
        width: '80%',
        fontSize: 20
    },
    button: {
        width: 320,
        height: 70,
        alignItems: 'center',
        backgroundColor: 'white'
    }
});