import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CommonButton from '@/components/common/CommonButton';
import InputField from '@/components/InputField';
import CommonBackground from "@/components/common/CommonBackground";
import {Href} from "expo-router";
import commonStyles from './styles/CommonStyles';
import loginStyles from './styles/LoginStyle';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={commonStyles.container}>
            <CommonBackground style={loginStyles.backgroundImage} titleText={"Welcome to Sanquin!"} logoVisible={true}>
                <InputField
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />

                <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}

                />

                <CommonButton
                    href={"/main/home" as Href<string | object>} style={loginStyles.loginButton}>
                    Log In
                </CommonButton>

                <CommonButton
                    href="/register"
                    style={loginStyles.registerButton}
                    textStyle={loginStyles.registerButtonText}
                >
                    Register
                </CommonButton>

            </CommonBackground>
        </View>
    );
}

