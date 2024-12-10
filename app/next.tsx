import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, ImageBackground } from 'react-native';
import LogoSanquin from '../assets/svgs/logo_sanquin_black.svg';

export default function NextScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isPlasmaDonor, setIsPlasmaDonor] = useState(false);
    const [hasDonatedBefore, setHasDonatedBefore] = useState(false);

    return (
        <View style={styles.container}>
            {/* Top Section with Background Image */}
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

            {/* Rest of the Content */}
            <View style={styles.content}>
                <Text style={styles.header}>We need more information from you...</Text>

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
                        onValueChange={(value) => setIsPlasmaDonor(value)}
                    />
                    <Text>Blood Donor</Text>
                    <Switch
                        value={!isPlasmaDonor}
                        onValueChange={(value) => setIsPlasmaDonor(!value)}
                    />
                </View>

                <View style={styles.switchContainer}>
                    <Text>Have Donated Before</Text>
                    <Switch
                        value={hasDonatedBefore}
                        onValueChange={(value) => setHasDonatedBefore(value)}
                    />
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
        justifyContent: 'center', // Align children vertically in the middle of the background
        alignItems: 'center',    // Center children horizontally
    },
    topContent: {
        alignItems: 'center', // Center content (logo and title) horizontally
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000', // Black text for "Sanquin"
        marginTop: 5,  // Space between the logo and title
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
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
});
