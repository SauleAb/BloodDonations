import React, {useRef, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import InputField from '../components/InputField';

const { width, height } = Dimensions.get('window');

export default function AuthenticationType() {

    //Input Field Functionality
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/sanquin_gradient.png')}
                style={styles.image}
                resizeMode="stretch"
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sign in</Text>
                    <InputField
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <InputField
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    <AnimatedButton href="/authenticationtype" style={styles.loginButton}>
                        Log In
                    </AnimatedButton>
                </View>

                <AnimatedButton
                    href="/authenticationtype"
                    style={styles.registerButton}
                    textStyle={styles.registerButtonText}
                >
                    Register
                </AnimatedButton>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    //Background Image
    image: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //Button
    loginButton: {
        marginTop: 30,
    },
    registerButton: {
        backgroundColor: 'white',
    },
    registerButtonText: {
        color: 'black',
    },

    //Input Field
    label: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 8,
    },
    inputContainer: {
        width: '80%',
        padding: 30,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    }
});