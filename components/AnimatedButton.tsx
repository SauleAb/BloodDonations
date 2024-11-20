import React, { useRef } from 'react';
import {Animated, TouchableWithoutFeedback, Text, StyleSheet, TextStyle, ViewStyle, View} from 'react-native';
import { Link, Href } from 'expo-router';

type AnimatedButtonProps = {
    href?: Href<string | object>;
    onPress?: () => void;
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
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

    const ButtonContent = (
        <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
        >
            <Animated.View style={[styles.button, style, { transform: [{ scale: scaleValue }] }]}>
                <Text style={[styles.buttonText, textStyle]}>{children}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );

    return href ? <Link href={href} asChild>{ButtonContent}</Link> : ButtonContent;
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(223,223,223)',
        width: 270,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'row',
    } as ViewStyle,
    buttonText: {
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    } as TextStyle,
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
});

export default AnimatedButton;