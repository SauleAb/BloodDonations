import { StyleSheet } from 'react-native';

const nextStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        paddingHorizontal: 20,
    },
    formContainer: {
        marginTop: 120,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#555',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
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
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default nextStyles;
