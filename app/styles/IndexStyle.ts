import { StyleSheet } from "react-native";

const indexStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 50,
        left: '50%',
        transform: [{ translateX: -100 }],
        alignItems: 'center',
    },
    welcomeText: {
        textAlign: 'center',
        width: '80%',
        fontSize: 20
    },
    button: {
        width: 320,
        height: 70,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20
    },
});

export default indexStyles;