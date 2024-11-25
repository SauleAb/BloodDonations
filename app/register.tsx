import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import InputField from '@/components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter(); // Initialize router for navigation

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match!");
            return;
        }

        const requestBody = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch('https://sanquin-api.onrender.com/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const responseText = await response.text();

            if (response.ok) {
                const data = JSON.parse(responseText);

                await AsyncStorage.setItem('userId', data.id.toString());

                router.push('/registerdonorinfo');
            } else {
                Alert.alert("Error", "Registration failed!");
                console.error(responseText);
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong!");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <CommonBackground style={styles.backgroundImage} titleText={"Register"} titleSubText={"Fill in the fields to create your account"} logoVisible={true}>
                <InputField
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    secureTextEntry={false}
                    placeholderTextColor="#5a5959"
                />
                <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    secureTextEntry={false}
                    placeholderTextColor="#5a5959"
                />
                <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholderTextColor="#5a5959"
                />
                <InputField
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                    placeholderTextColor="#5a5959"
                />

                <CommonButton onPress={handleRegister}>
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
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonContainer: {
        padding: 30,
        width: '80%',
        alignItems: 'center',
    },
    label: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 8,
    }
});
