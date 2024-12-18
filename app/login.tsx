import React, { useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useUser } from '@/components/UserContext';
import loginStyles from './styles/LoginStyle';
import CommonBackground from "@/components/common/CommonBackground";
import commonStyles from "@/app/styles/CommonStyles";
import InputField from '@/components/InputField';
import CommonButton from '@/components/common/CommonButton';
import defaultUser from '@/components/user';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || email == "") {
            // Add error popup or handling here if needed
            return;
        }
        if (!password || password == "") {
            // Add error popup or handling here if needed
            return;
        }

        const _email = email.replace(/@/g, "%40");
        let url = `https://sanquin-api.onrender.com/users/email/${_email}?password=${password}`;

        fetch(url, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok' + response);
                }
                return response.json();
            })
            .then(data => {
                // Merge the entire data.data object with defaultUser,
                // ensuring all fields (username, first_name, last_name, etc.) are captured
                const userData = {
                    ...defaultUser,
                    ...data.data
                };

                login(userData);
                AsyncStorage.setItem('user', JSON.stringify(userData));
                router.replace('/main/home');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <View style={commonStyles.container}>
            <CommonBackground style={loginStyles.backgroundImage} titleText={"Welcome to Sanquin!"} logoVisible={true}>
                <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <CommonButton onPress={handleLogin} style={loginStyles.loginButton}>
                    <Text>Log In</Text>
                </CommonButton>
                <CommonButton
                    style={loginStyles.registerButton}
                    onPress={() => router.push('/register')}
                >
                    <Text>Register</Text>
                </CommonButton>
            </CommonBackground>
        </View>
    );
}
