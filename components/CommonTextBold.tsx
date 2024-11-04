import React from 'react';
import { Text, TextProps, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

type CustomTextProps = TextProps & {
    children: React.ReactNode;
};

const CommonTextBold: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
    const [fontsLoaded] = useFonts({
        'Aileron-Regular': require('../assets/fonts/Aileron-Regular.otf'),
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
        fontFamily: 'Aileron-Bold',
        fontSize: 20,
    },
});

export default CommonTextBold;