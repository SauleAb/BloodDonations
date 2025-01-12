import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import CommonText from "@/components/common/CommonText";
import { iconMap, IconNames } from './common/CommonIcons';

type FriendContentProps = {
    id: string;
    name: string;
    onPress: (id: string) => void;
    icon?: IconNames;
    rightButton?: React.ReactNode;
};

const FriendContent: React.FC<FriendContentProps> = ({ id, name, onPress, icon, rightButton }) => {
    const iconSource = icon ? iconMap[icon] : null;

    return (
        <TouchableOpacity onPress={() => onPress(id)} style={styles.container}>
            <View style={styles.greyBar}>
                <CommonText style={styles.label}>{name}</CommonText>
                {iconSource && <Image source={iconSource} style={styles.icon} />}
            </View>
            {rightButton && <View style={styles.rightButton}>{rightButton}</View>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: 20,
    },
    greyBar: {
        backgroundColor: 'rgba(223,223,223,0.5)',
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        color: '#404040',
    },
    icon: {
        width: 20,
        height: 20,
    },
    rightButton: {
        marginTop: 10,
        alignItems: 'flex-end',
    },
});

export default FriendContent;
