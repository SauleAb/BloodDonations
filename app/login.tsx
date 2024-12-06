import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import CommonButton from '@/components/common/CommonButton';
import InputField from '@/components/InputField';
import CommonContainer from '@/components/common/CommonContainer';
import CommonBackground from "@/components/common/CommonBackground";
import {Href} from "expo-router";

export default function Login() {

    //Input Field Functionality
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <CommonBackground style={styles.backgroundImage} titleText={"Welcome to Sanquin!"} logoVisible={true}>
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

                <CommonButton
                    href={"/main/home" as Href<string | object>} style={styles.loginButton}>
                    Log In
                </CommonButton>

                <CommonButton
                    href="/register"
                    style={styles.registerButton}
                    textStyle={styles.registerButtonText}
                >
                    Register
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
    margin: {
        marginTop: 20
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
        marginTop: 30,
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