import React, { useState } from 'react';
import { TextInput, Button, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import registerStyles from './styles/RegisterStyle';
import CommonBackground from "@/components/common/CommonBackground";
import InputField from '@/components/InputField';
import CommonButton from '@/components/common/CommonButton';

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

            const emailExists = false; // api request to check if email exists (waiting for nina)
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
        <CommonBackground style={registerStyles.backgroundImage} titleText={"Register"} logoVisible={true}>
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
            <InputField
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <CommonButton
            style={registerStyles.registerButton} 
            onPress={handleRegister} >
            <Text> Register </Text>
            </CommonButton>
        </CommonBackground>
    );
}
