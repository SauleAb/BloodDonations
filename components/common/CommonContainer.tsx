import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';

type CommonContainerProps = {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    onPress?: () => void;
};

const CommonContainer: React.FC<CommonContainerProps> = ({ children, style, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.container, style]}>{children}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 20,
    },
});

export default CommonContainer;
