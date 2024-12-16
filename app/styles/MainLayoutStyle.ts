import { StyleSheet } from 'react-native';

const mainLayoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    banner: {
        padding: 10,
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
