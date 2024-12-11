import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { useRouter } from "expo-router";
import registerStyles from './styles/RegisterStyle';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }

        router.push('/next');
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
                secureTextEntry={true}
            />
            <TextInput
                style={registerStyles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}
