import { StyleSheet } from 'react-native';

const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        paddingHorizontal: 20,
    },
    formContainer: {
        marginTop: 150,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#444',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    placeholderColor: {
        color: '#aaa',
    },
    button: {
        width: '100%',
        padding: 12,
        backgroundColor: '#28a745',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButton: {
        marginTop: 10,
    },
    secondaryButtonText: {
        color: '#28a745',
        fontSize: 16,
    },
});

export default registerStyles;
