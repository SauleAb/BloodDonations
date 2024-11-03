import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/sanquin_gradient.png')}
                style={styles.image}
                resizeMode="stretch"
            >

                <View style={styles.logoContainer}>
                    <LogoSanquin width={400} height={400} />
                </View>

                <TouchableWithoutFeedback>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Get Started!</Text>
                    </View>
                </TouchableWithoutFeedback>

            </ImageBackground>
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
        backgroundColor: 'black',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        transform: [{ translateY: 200 }]
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});