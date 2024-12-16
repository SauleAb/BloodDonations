import React, { useState } from 'react';
import { Switch, View, StyleSheet } from 'react-native';

type StatefulSwitchProps = {
    initialValue: boolean;
    onToggle?: (value: boolean) => void;
};

const CommonContentSwitch: React.FC<StatefulSwitchProps> = ({ initialValue, onToggle }) => {
    const [value, setValue] = useState(initialValue);

    const handleToggle = (newValue: boolean) => {
        setValue(newValue);
        if (onToggle) {
            onToggle(newValue);
        }
    };

    return (
        <View style={styles.switchWrapper}>
            <Switch
                value={value}
                onValueChange={handleToggle}
            />
    </View>
    );
};

const styles = StyleSheet.create({
    switchWrapper: {
        marginRight: 0,
        transform: [{ scale: 0.8 }],
        alignSelf: 'center',
        height: 20,
        justifyContent: 'center',
    },
});

export default CommonContentSwitch;