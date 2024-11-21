import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Href} from 'expo-router';
import CommonBackground from "@/components/Common/CommonBackground";
import CommonButton from "@/components/Common/CommonButton";
import InputField from '@/components/InputField';

export default function RegisterScreen() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
    <View style={styles.container}>
        <CommonBackground style={styles.backgroundImage} titleText={"Register"} logoVisible={true}>
            <InputField
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                secureTextEntry={false}
                placeholderTextColor="#5a5959"
            />
            <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                secureTextEntry={true}
                placeholderTextColor="#5a5959"
            />
            <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={false}
                placeholderTextColor="#5a5959"
            />
            <InputField
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={false}
                placeholderTextColor="#5a5959"
            />

            <CommonButton
                href={"/login" as Href<string | object>}>
                Register
            </CommonButton>
        </CommonBackground>
    </View>
  )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonContainer: {
        padding: 30,
        width: '80%',
        alignItems: 'center',
    },
    label: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 8,
    }
});