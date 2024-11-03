import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import AnimatedButton from '@/components/AnimatedButton';
import InputField from '@/components/InputField';
import CommonContainer from '@/components/CommonContainer';
import CommonBackground from "@/components/CommonBackground";

export default function AuthenticationType() {

    return (
        <View style={styles.container}>
            <CommonBackground>
                <CommonContainer>
                    <Text>Hello Noob</Text>

                </CommonContainer>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});