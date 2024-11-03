import React from 'react';
import { TextInput, StyleSheet, TextStyle } from 'react-native';

type CustomInputProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: TextStyle;      // Optional custom styles for the TextInput
    secureTextEntry?: boolean;  // Optional for password fields
};

const CustomInput: React.FC<CustomInputProps> = ({
    placeholder,
    value,
    onChangeText,
    style,
    secureTextEntry = false,
}) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        width: '100%',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 20,
        fontSize: 16,
        backgroundColor: '#d5d5d5',
    },
});

export default CustomInput;