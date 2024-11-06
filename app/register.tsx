import React, {useRef} from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import { Link } from 'expo-router';
import CommonBackground from "@/components/CommonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import CommonContainer from '@/components/CommonContainer';
import InputField from '@/components/InputField'; // Make sure this is correctly imported
import { useState } from 'react';
import {Href} from "expo-router";

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sanquinCode, setSanquinCode] = useState('');

    return (
    <View style={styles.container}>
        <CommonBackground style={styles.backgroundImage}>
            <CommonContainer style={styles.commonContainer}>
            <Text style={styles.label}>Register</Text>
                    <InputField
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        secureTextEntry={false}
                        placeholderTextColor="#5a5959"
                    />
                    <InputField
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholderTextColor="#5a5959"
                    />
                    <InputField
                        placeholder="Sanquin Code"
                        value={sanquinCode}
                        onChangeText={setSanquinCode}
                        secureTextEntry={false}
                        placeholderTextColor="#5a5959"
                    />

                    <AnimatedButton
                        href={"/authenticationtype" as Href<string | object>} style={styles.loginButton}>
                        Register
                    </AnimatedButton>
            </CommonContainer> 
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