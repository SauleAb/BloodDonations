import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import registerStyles from './styles/RegisterStyle';
import CommonBackground from "@/components/common/CommonBackground";
import InputField from '@/components/common/CommonInputField';
import CommonButton from '@/components/common/CommonButton';
import CommonScrollElement from "@/components/common/CommonScrollElement";

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

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                Alert.alert('Error', 'Invalid email format');
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
        <CommonBackground style={registerStyles.backgroundImage} titleText={"Register"} titleSubText={"Fill in the fields to create your account"} logoVisible={true}>
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
            </CommonScrollElement>
        </CommonBackground>
    );
}
