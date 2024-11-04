import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type CommonContainerProps = {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
};

const CommonContainer: React.FC<CommonContainerProps> = ({ children, style }) => {
    return <View style={[styles.container, style]}>{children}</View>;
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
    },
});

export default CommonContainer;