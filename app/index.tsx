import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import CommonText from "@/components/common/CommonText";

const { height } = Dimensions.get('window');

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <CommonBackground style={styles.backgroundImage} backgroundHeight={1} fullScreen={true}>

                <View style={styles.logoContainer}>
                    <LogoSanquin width={400} height={400} />
                </View>

                <CommonText style={[styles.welcomeText, {marginTop: height*0.7}]}>Welcome Aboard! Thank you for starting your donor adventure!</CommonText>
                <CommonButton href="/login" style={styles.button}>
                    Begin Your Journey
                </CommonButton>

            </CommonBackground>
        </View>
    );
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
    logoContainer: {
        position: 'absolute',
        top: 50,
        left: '50%',
        transform: [{ translateX: -100 }],
        alignItems: 'center',
    },
    welcomeText: {
        textAlign: 'center',
        width: '80%',
        fontSize: 20
    },
    button: {
        width: 320,
        height: 70,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20
    }
});