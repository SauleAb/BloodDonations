import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import CommonText from "@/components/common/CommonText";
import { iconMap, IconNames } from './common/CommonIcons';

type FriendContentProps = {
    id: string;
    name: string;
    onPress: (id: string) => void;
    icon?: IconNames;
};

const FriendContent: React.FC<FriendContentProps> = ({ id, name, onPress, icon }) => {
    const iconSource = icon ? iconMap[icon] : null;

    return (
        <TouchableOpacity onPress={() => onPress(id)} style={styles.container}>
            <View style={styles.greyBar}>
                <CommonText style={styles.label}>Friend</CommonText>
                {iconSource && <Image source={iconSource} style={styles.icon} />}
            </View>
            <View style={styles.contentWrapper}>
                <CommonText style={styles.contentText}>{name}</CommonText>
            </View>
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
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        color: '#404040',
    },
    contentWrapper: {
        backgroundColor: 'white',
        padding: 16,
    },
    contentText: {
        fontSize: 16,
        color: '#404040',
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 5,
        width: 20,
        height: 20,
    },
});

export default FriendContent;
