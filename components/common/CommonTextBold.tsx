import React from 'react';
import { Text, TextProps, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

type CustomTextProps = TextProps & {
    children: React.ReactNode;
};

const CommonTextBold: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
    const [fontsLoaded] = useFonts({
        'InstrumentSans': require('../../assets/fonts/InstrumentSans.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }

    return (
        <Text {...props} style={[styles.customFont, style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    customFont: {
        fontFamily: 'InstrumentSans',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 30,
    },
});

export default CommonTextBold;