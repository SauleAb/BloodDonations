import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, ViewStyle} from 'react-native';
const { width, height } = Dimensions.get('window');

type BackgroundImageProps = {
    children: React.ReactNode;
    source?: any;
    style?: ViewStyle;
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children, source, style}) => {
    return (
        <ImageBackground
            resizeMode="stretch"
            source={source || require('../assets/images/sanquin_gradient.png')}
            style={[styles.backgroundImage, style]}>
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: width,
        height: height,
        alignItems: 'center',
    },
});

export default BackgroundImage;