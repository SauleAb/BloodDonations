import { StyleSheet } from 'react-native';

const nextStyles = StyleSheet.create({
    margin: {
        marginTop: 20
    },
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonContainer: {
        padding: 30,
        width: '80%',
        alignItems: 'center',
    },
    fullWidthContainer: {
        flexGrow: 1,
        width: "100%",
    },
    fullWidthContent: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    //Button
    loginButton: {
        marginTop: 30,
    },
    registerButtonText: {
        color: 'black',
    },

    //Input Field
    label: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 8,
    }
});

export default nextStyles;
