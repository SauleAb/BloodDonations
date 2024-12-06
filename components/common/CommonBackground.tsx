import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LogoSanquin from "@/assets/svgs/logo_sanquin_black.svg";
import CommonText from "@/components/common/CommonText";

const { width, height } = Dimensions.get('window');

type BackgroundImageProps = {
    children: React.ReactNode;
    source?: any;
    style?: ViewStyle;
    backgroundHeight?: number;
    titleText?: string;
    titleSubText?: string;
    logoVisible?: boolean;
    fullScreen?: boolean;
    mainPage?: boolean;
};

const CommonBackground: React.FC<BackgroundImageProps> = ({ children, source, style, backgroundHeight, titleText, titleSubText, logoVisible, fullScreen, mainPage }) => {
    const calculatedHeight = backgroundHeight ? height * backgroundHeight : height * 0.35;

    return (
        <View style={styles.container}>
            {logoVisible && (
                <View style={styles.logoContainer}>
                    <LogoSanquin style={styles.logo} width={130} />
                    <CommonText bold style={styles.logoText}>Sanquin</CommonText>
                </View>
            )}
            <ImageBackground
                resizeMode="stretch"
                source={source || require('../../assets/images/sanquin_gradient.png')}
                style={[styles.backgroundImage, { height: calculatedHeight }, style]}
            >
                <CommonText bold style={styles.titleText}>{titleText}</CommonText>
                {titleSubText && (<CommonText style={styles.titleSubText}>{titleSubText}</CommonText>)}
            </ImageBackground>

            <LinearGradient
                colors={['rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 0.3 }}
                style={[styles.gradientShadow, { top: calculatedHeight }]}
            />

            {fullScreen ? (
                <View style={styles.contentWrapper}>
                    {children}
                </View>
            ) : (
                <View
                    style={[
                        styles.contentWrapper,
                        {marginTop: mainPage ? calculatedHeight*0.4 : calculatedHeight-30} //30 = height of grey bar
                    ]}>
                    {children}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    logoContainer: {
        position: 'absolute',
        top: 30,
        left: 30,
        zIndex: -1
    },
    logo: {

    },
    logoText: {
        fontSize: 15,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        zIndex: -2,
    },
    gradientShadow: {
        position: 'absolute',
        left: 0,
        width: width,
        height: 30,
        zIndex: -1,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        lineHeight: 36
    },
    titleSubText: {
        marginTop: 8,
    }
});

export default CommonBackground;
