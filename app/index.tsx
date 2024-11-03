import React, {useRef} from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';
import { Link } from 'expo-router';
import CommonBackground from "@/components/CommonBackground";
import AnimatedButton from "@/components/AnimatedButton";

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {

    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,  // Shrink the button to 95% of its size
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,  // Return to original size
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <CommonBackground>

                <View style={styles.logoContainer}>
                    <LogoSanquin width={400} height={400} />
                </View>

                <AnimatedButton href="/authenticationtype" style={styles.button}>
                    Get Started!
                </AnimatedButton>

            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 50,
        left: '50%',
        transform: [{ translateX: -100 }], // (svg width / 4)
        alignItems: 'center',
    },
    button: {
        width: 200,
        marginTop: 400,
    }
});