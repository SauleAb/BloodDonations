import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, TextStyle, ViewStyle, View } from 'react-native';
import { Link, Href } from 'expo-router';
import CommonText from "@/components/common/CommonText";

type AnimatedButtonProps = {
    href?: Href<string | object>;
    onPress?: () => void;
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    size?: 'small' | 'big';
};

const CommonButton: React.FC<AnimatedButtonProps> = ({ href, onPress, children, style, textStyle, size = 'big' }) => {
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

    const buttonWidth = size === 'big' ? 270 : '24%';
    const buttonFontSize = size === 'big' ? 28 : 10;
    const buttonHeight = size === 'big' ? 50 : 35;

    const ButtonContent = (
        <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
        >
            <Animated.View style={[styles.button, style, { width: buttonWidth, height: buttonHeight, transform: [{ scale: scaleValue }] }]}>
                <CommonText style={[styles.buttonText, textStyle, { fontSize: buttonFontSize, lineHeight: buttonFontSize * 1.3 }]}>
                    {children}
                </CommonText>
            </Animated.View>
        </TouchableWithoutFeedback>
    );

    return href ? <Link href={href} asChild>{ButtonContent}</Link> : ButtonContent;
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#e3e3e3",
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row',
    } as ViewStyle,
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
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

export default CommonButton;