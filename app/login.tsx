import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonButton from '@/components/common/CommonButton';
import InputField from '@/components/InputField';
import CommonBackground from "@/components/common/CommonBackground";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        try {
            const response = await fetch('https://sanquin-api.onrender.com/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const responseText = await response.text();
            if (response.ok) {
                const data = JSON.parse(responseText);
                console.log(data);
                await AsyncStorage.setItem('userId', data.id.toString());
                router.push('/main/home');
            } else {
                Alert.alert("Error", "Login failed!");
                console.error(responseText);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                <CommonButton onPress={handleLogin} style={styles.loginButton}>
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
        backgroundColor: '#ffffff',
    },
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        marginTop: 30,
    },
    registerButton: {},
    registerButtonText: {
        color: 'black',
    },
});