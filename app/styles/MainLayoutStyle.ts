import { StyleSheet } from 'react-native';

const mainLayoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    banner: {
        paddingVertical: 40,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    bannerText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default mainLayoutStyles;
