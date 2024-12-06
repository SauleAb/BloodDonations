import React from 'react';
import { Text, TextProps, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

type CustomTextProps = TextProps & {
    children: React.ReactNode;
    bold?: boolean; // Add bold as an optional prop
};

const CommonText: React.FC<CustomTextProps> = ({ children, style, bold = false, ...props }) => {
    const [fontsLoaded] = useFonts({
        'Instrument-Sans': require('../../assets/fonts/InstrumentSans.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }

    return (
        <Text
            {...props}
            style={[
                styles.customFont,
                bold && styles.boldFont,
                style,
            ]}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    customFont: {
        fontFamily: 'Instrument-Sans',
        fontSize: 17,
        lineHeight: 22,
    },
    boldFont: {
        fontFamily: 'Instrument-Sans',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 30,
    },
});

export default CommonText;
