import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useUser } from '@/components/UserContext';
import loginStyles from './styles/LoginStyle';
import CommonBackground from "@/components/common/CommonBackground";
import commonStyles from "@/app/styles/CommonStyles";
import InputField from '@/components/InputField';
import CommonButton from '@/components/common/CommonButton';


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
        if(!email || email == ""){
            // add error popup here
            return
        }
        if(!password || password == ""){
            // add error popup here
            return
        }
        const _email = email.replace(/@/g, "%40") // format email bc api uses url encoded
        let url = `https://sanquin-api.onrender.com/users/email/${_email}?password=${password}`
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
                const user = {
                    firstName: '-', // user object given by database doesn't store any of these yet
                    lastName: '-',
                    email: data.data.email,
                    password: data.data.password,
                    profilePicture: String,
                    rewardPoints: data.data.points,
                    friendsList: [],
                    posts: [],
                    plasmaDonor: false,
                    nextPlasmaDonation: Date,
                    bloodDonor: false,
                    nextBloodDonation: Date,
                    totalBloodDonated: 0,
                    donationHistory: [],
                    timesDonated: 0,
                    lastDonation: '',
                    ironLevels: 0,
                    darkModeEnabled: false,
                };
                login(user)
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
