import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import nextStyles from './styles/NextStyle';

export default function NextScreen() {
    const { email, password } = useLocalSearchParams(); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();

    const saveUser = async () => {
        try {
            const usersJSON = await AsyncStorage.getItem('users');
            const users = usersJSON ? JSON.parse(usersJSON) : [];

            const newUser = {
                firstName,
                lastName,
                email,
                password,
            };

            const updatedUsers = [...users, newUser];
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

            Alert.alert('Success', 'Account created successfully!');
            router.replace('/'); 
        } catch (error) {
            console.error('Error saving user:', error);
            Alert.alert('Error', 'Could not save account. Please try again.');
        }
    };

    const handleFinish = () => {
        if (!firstName || !lastName) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }
        saveUser();
    };

    return (
        <View style={nextStyles.container}>
            <Text style={nextStyles.title}>Complete Your Profile</Text>
            <TextInput
                style={nextStyles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={nextStyles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <Button title="Finish" onPress={handleFinish} />
        </View>
    );
}
