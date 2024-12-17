import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import nextStyles from './styles/NextStyle';
import CommonBackground from "@/components/common/CommonBackground";
import { useUser } from '@/components/UserContext';
import InputField from '@/components/InputField';
import CommonButton from '@/components/common/CommonButton';
import defaultUser from '@/components/user';
 
const API_BASE_URL = 'https://sanquin-api.onrender.com';
 
export default function NextScreen() {
    const { email, password } = useLocalSearchParams() as { email: string; password: string };
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();
    const { login } = useUser();
 
    const saveUser = async () => {
        try {
            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                Alert.alert('Error', 'Invalid email format');
                return;
            }
 
            // Merge defaultUser with new user data so that defaults (like rewardPoints=200) are applied
            const newUserData = {
                ...defaultUser,
                username: email,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                donations: [],
                can_donate: true,
                birthdate: "1990-01-01",
                city: "Amsterdam"
            };
 
            const response = await fetch(`${API_BASE_URL}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserData),
            });
 
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Server error while creating user:', errorMessage);
                Alert.alert('Error', 'Could not create account. Email may be in use.');
                return;
            }
 
            const createdUser = await response.json();
            console.log('Created user:', createdUser);
 
            // Log the user in using the newly created user data response
            await login(createdUser, true);
 
            Alert.alert('Success', 'Account created successfully!');
            router.replace('/');
        } catch (error: unknown) {
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
        <CommonBackground style={nextStyles.backgroundImage} titleText={"Complete Your Profile"} logoVisible={true}>
            <InputField
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <InputField
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <CommonButton onPress={handleFinish} style={nextStyles.registerButton}>
                <Text>Register</Text>
            </CommonButton>
        </CommonBackground>
    );
}
 
 