import React from 'react';
import { Text, TextProps, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

type CustomTextProps = TextProps & {
    children: React.ReactNode;
};

const CommonText: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
    const [fontsLoaded] = useFonts({
        'Aileron-Regular': require('../assets/fonts/Aileron-Regular.otf'), // Adjust the path as needed
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="small" color="#0000ff" />; // Loading spinner while font is loading
    }

    return (
        <Text {...props} style={[styles.customFont, style]}>
        {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    customFont: {
        fontFamily: 'Aileron-Regular',
        fontSize: 17,
    },
});

export default CommonText;