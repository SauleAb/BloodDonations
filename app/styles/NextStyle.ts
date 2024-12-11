import { StyleSheet } from 'react-native';

const NextStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 5,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        gap: 10,
    },
    buttonContainer: {
        marginTop: 20,
    }
});

export default NextStyle;