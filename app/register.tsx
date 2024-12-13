import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import registerStyles from './styles/RegisterStyle';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            if (!email || !password || !confirmPassword) {
                Alert.alert('Error', 'All fields are required!');
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match!');
                return;
            }

            // Retrieve existing users from AsyncStorage
            const usersJSON = await AsyncStorage.getItem('users');
            const users = usersJSON ? JSON.parse(usersJSON) : [];

            // Check if email already exists
            const emailExists = users.some((user: { email: string }) => user.email === email);
            if (emailExists) {
                Alert.alert('Error', 'An account with this email already exists.');
                return;
            }

            router.push({
                pathname: '/next',
                params: { email, password },
            });
        } catch (error) {
            console.error('Error during registration:', error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

    return (
        <View style={registerStyles.container}>
            <TextInput
                style={registerStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={registerStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={registerStyles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}
