import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Button, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';

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
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/sanquin_gradient.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.topContent}>
                    <LogoSanquin width={100} height={50} />
                    <Text style={styles.title}>Sanquin</Text>
                </View>
            </ImageBackground>

            <View style={styles.content}>
                <Text style={styles.header}>We need some more information from you...</Text>

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <View style={styles.switchContainer}>
                    <Text>Plasma Donor</Text>
                    <Switch
                        value={isPlasmaDonor}
                        onValueChange={() => setIsPlasmaDonor(!isPlasmaDonor)}
                    />
                    <Text>Blood Donor</Text>
                </View>

                <View style={styles.switchContainer}>
                    <Text>I Have Donated Before</Text>
                    <Switch
                        value={hasDonatedBefore}
                        onValueChange={(value) => setHasDonatedBefore(value)}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Proceed to Home" onPress={handleProceed} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 5,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        gap: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
});
