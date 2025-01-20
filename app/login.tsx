import React, { useState } from 'react';
import {Alert, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useUser } from '@/components/UserContext';
import loginStyles from './styles/LoginStyle';
import CommonBackground from "@/components/common/CommonBackground";
import commonStyles from "@/app/styles/CommonStyles";
import InputField from '@/components/common/CommonInputField';
import CommonButton from '@/components/common/CommonButton';
import defaultUser from '@/components/user';
import CommonScrollElement from "@/components/common/CommonScrollElement";

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
        if (!email || email === "" || !password || password === "") {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }
    
        const _email = email.replace(/@/g, "%40");
        const url = `https://sanquin-api.onrender.com/users/email/${_email}?password=${password}`;
    
        try {
            const response = await fetch(url, { method: 'GET' });
    
            if (response.status === 404) {
                Alert.alert('Login Error', 'Incorrect credentials, please try again.');
                return;
            } else if (!response.ok) {
                Alert.alert('Login Error', 'Something went wrong, please try again later.');
                return;
            }
    
            const data = await response.json();
            const userObject = Object.fromEntries(data.data);
    
            if (!userObject.id) {
                Alert.alert('Login Error', 'User ID is missing in the response.');
                return;
            }
    
            const userData = {
                ...defaultUser,
                ...userObject,
            };

            await AsyncStorage.setItem('user', JSON.stringify(userData));
            login(userData);
            router.replace('/main/home');
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Login Error', 'An unexpected error occurred.');
        }
    };
    
    return (
        <View style={commonStyles.container}>
            <CommonBackground style={loginStyles.backgroundImage} titleText={"Welcome to Sanquin!"} logoVisible={true}>
                <CommonScrollElement>
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
                </CommonScrollElement>
            </CommonBackground>
        </View>
    );
}
