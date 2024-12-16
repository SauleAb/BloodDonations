import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useUser } from '@/components/UserContext';
import loginStyles from './styles/LoginStyle';
import CommonBackground from "@/components/common/CommonBackground";
import commonStyles from "@/app/styles/CommonStyles";

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
        try {
            const usersJSON = await AsyncStorage.getItem('users');
            const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
            const matchingUser = users.find(
                (user) => user.email === email && user.password === password
            );

            if (matchingUser) {
                login(matchingUser);
                Alert.alert('Success', `Welcome back, ${matchingUser.firstName}!`);
                router.replace('/main/home'); // Redirect to home screen
            } else {
                Alert.alert('Error', 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'An error occurred during login. Please try again.');
        }
    };

    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible titleText="Log In">
            <TextInput
                style={loginStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={loginStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
                <Text style={loginStyles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={loginStyles.button}
                onPress={() => router.push('/register')}
            >
                <Text style={loginStyles.buttonText}>Register</Text>
            </TouchableOpacity>
        </CommonBackground>
        </View>

    );
}
