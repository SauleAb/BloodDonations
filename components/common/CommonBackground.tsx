import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CommonTextBold from "@/components/common/CommonTextBold";
import LogoSanquin from "@/assets/svgs/logo_sanquin_black.svg";

const { width, height } = Dimensions.get('window');

type BackgroundImageProps = {
    children: React.ReactNode;
    source?: any;
    style?: ViewStyle;
    backgroundHeight?: number;
    titleText?: string;
    logoVisible?: boolean;
    fullScreen?: boolean;
    mainPage?: boolean;
};

const CommonBackground: React.FC<BackgroundImageProps> = ({ children, source, style, backgroundHeight, titleText, logoVisible, fullScreen, mainPage }) => {
    const calculatedHeight = backgroundHeight ? height * backgroundHeight : height * 0.35;

    return (
        <View style={styles.container}>
            {logoVisible && (
                <View style={styles.logoContainer}>
                    <LogoSanquin style={styles.logo} width={130} />
                    <CommonTextBold style={styles.logoText}>Sanquin</CommonTextBold>
                </View>
            )}
            <ImageBackground
                resizeMode="stretch"
                source={source || require('../../assets/images/sanquin_gradient.png')}
                style={[styles.backgroundImage, { height: calculatedHeight }, style]}
            >
                <CommonTextBold style={styles.titleText}>{titleText}</CommonTextBold>
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
    }
});

export default CommonBackground;
