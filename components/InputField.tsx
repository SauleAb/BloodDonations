import React from 'react';
import { Text, TextInput, StyleSheet, TextStyle, View } from 'react-native';

type CustomInputProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: TextStyle;
    secureTextEntry?: boolean;
    placeholderTextColor?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
                                                     placeholder,
                                                     value,
                                                     onChangeText,
                                                     style,
                                                     secureTextEntry = false,
                                                     placeholderTextColor = '#888',
                                                 }) => {
    return (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.greyBar}>
                <Text style={styles.label}>{placeholder}</Text>
            </View>

            <TextInput
                style={[styles.input, style]}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderTextColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '87%',
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    shadow: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    greyBar: {
        backgroundColor: 'rgb(223,223,223)',
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    label: {
        fontSize: 14,
        color: '#404040',
    },
    input: {
        height: 60,
        width: '100%',
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});

export default CustomInput;
