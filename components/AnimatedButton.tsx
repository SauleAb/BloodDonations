import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Link, Href } from 'expo-router';

type AnimatedButtonProps = {
    href: Href<string | object>;
    onPress?: () => void;
    children: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ href, onPress, children, style, textStyle }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Link href={href} asChild>
            <TouchableWithoutFeedback
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={onPress}
            >
                <Animated.View style={[styles.button, style, { transform: [{ scale: scaleValue }] }]}>
                    <Text style={[styles.buttonText, textStyle]}>{children}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Link>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        width: 270,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
    } as ViewStyle,
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    } as TextStyle,
});

export default AnimatedButton;