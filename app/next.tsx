import React, { useState } from 'react';
import { TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import nextStyles from './styles/NextStyle';
import CommonBackground from "@/components/common/CommonBackground";
import { useUser } from '@/components/UserContext';
import defaultUser from '@/components/user'; // Import the default user structure

export default function NextScreen() {
    const { email, password } = useLocalSearchParams(); // Get params from the previous screen
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();
    const { login } = useUser(); // Access login function from UserContext

    const saveUser = async () => {
        try {
            // Retrieve existing users
            const usersJSON = await AsyncStorage.getItem('users');
            const users = usersJSON ? JSON.parse(usersJSON) : [];

            // Create a new user object
            const newUser = {
                ...defaultUser, // Use the default structure
                firstName,
                lastName,
                email,
                password,
            };

            // Save to the list of users
            const updatedUsers = [...users, newUser];
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

            // Set the new user as the currently logged-in user
            await login(newUser, true);

            Alert.alert('Success', 'Account created successfully!');
            router.replace('/'); // Redirect to the main page
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
        <CommonBackground logoVisible titleText="Complete Your Profile">
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
        </CommonBackground>
    );
}
