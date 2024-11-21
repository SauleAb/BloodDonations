import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CommonBackground from "@/components/Common/CommonBackground";
import {useFonts} from "expo-font";
import CommonContent, {IconNames} from "@/components/Common/CommonContent";


export default function AuthenticationType() {

    const targetDate = new Date('2024-12-31T23:59:59');

    const [fontsLoaded] = useFonts({
        'Aileron-Regular': require('../../assets/fonts/Aileron-Regular.otf'),
        'Aileron-Bold': require('../../assets/fonts/Aileron-Bold.otf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <CommonBackground>
                <CommonContent titleText={"awesome title"} contentText={"awesome content"} icon={IconNames.BloodDonated}/>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commonContainer: {
        padding: 10,
        width: '90%',
        marginTop: 40,
    },
    twoCommonContainersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:9,
        width: '90%',
    },

    halfCommonContainer: {
        flex: 1,
        marginTop: 20,
        height: '88%',
    },
    halfCommonContainerRight: {
        marginLeft: 9
    },
    halfCommonContainerLeft: {
        marginRight: 9
    },

    titleTextContainer: {
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        backgroundColor: '#d4d4d4',
        paddingVertical: 8,
    },
    contentTextContainer: {
    },
    titleText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    contentText: {
        fontSize: 30,
        alignSelf: 'center',
    },
});