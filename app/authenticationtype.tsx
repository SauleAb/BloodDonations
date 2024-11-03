import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import AnimatedButton from '@/components/AnimatedButton';
import InputField from '@/components/InputField';
import CommonContainer from '@/components/CommonContainer';
import CommonBackground from "@/components/CommonBackground";
import {Href} from "expo-router";

export default function AuthenticationType() {

    //Input Field Functionality
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <CommonBackground style={styles.backgroundImage}>
                <CommonContainer style={styles.commonContainer}>
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

                    <AnimatedButton
                        href={"/main/home" as Href<string | object>} style={styles.loginButton}>
                        Log In
                    </AnimatedButton>
                </CommonContainer>

                <AnimatedButton
                    href="/authenticationtype"
                    style={styles.registerButton}
                    textStyle={styles.registerButtonText}
                >
                    Register
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
    commonContainer: {
        padding: 30,
        width: '80%',
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
    }
});