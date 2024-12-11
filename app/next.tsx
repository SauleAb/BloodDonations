import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Button, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';
import NextStyle from '../app/styles/NextStyle'

export default function NextScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isPlasmaDonor, setIsPlasmaDonor] = useState(true);
    const [hasDonatedBefore, setHasDonatedBefore] = useState(false);
    const router = useRouter();

    const handleProceed = () => {
        router.push('../main/home'); 
    };

    return (
        <View style={NextStyle.container}>
            <ImageBackground
                source={require('../assets/images/sanquin_gradient.png')}
                style={NextStyle.backgroundImage}
                resizeMode="cover"
            >
                <View style={NextStyle.topContent}>
                    <LogoSanquin width={100} height={50} />
                    <Text style={NextStyle.title}>Sanquin</Text>
                </View>
            </ImageBackground>

            <View style={NextStyle.content}>
                <Text style={NextStyle.header}>We need some more information from you...</Text>

                <TextInput
                    style={NextStyle.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <TextInput
                    style={NextStyle.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <View style={NextStyle.switchContainer}>
                    <Text>Plasma Donor</Text>
                    <Switch
                        value={isPlasmaDonor}
                        onValueChange={() => setIsPlasmaDonor(!isPlasmaDonor)}
                    />
                    <Text>Blood Donor</Text>
                </View>

                <View style={NextStyle.switchContainer}>
                    <Text>I Have Donated Before</Text>
                    <Switch
                        value={hasDonatedBefore}
                        onValueChange={(value) => setHasDonatedBefore(value)}
                    />
                </View>

                <View style={NextStyle.buttonContainer}>
                    <Button title="Proceed to Home" onPress={handleProceed} />
                </View>
            </View>
        </View>
    );
}
