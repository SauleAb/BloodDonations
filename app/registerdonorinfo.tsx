import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Href} from 'expo-router';
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import TwoQuestions from "@/components/TwoQuestions";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonText from "@/components/common/CommonText";

export default function DonorTest() {
    const [donatedBeforeAnswer, setDonatedBefore] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            <CommonBackground style={styles.backgroundImage} titleText={"Welcome Alex"} titleSubText={"Are you new here?"} logoVisible={true}>
                <CommonScrollElement>
                    <TwoQuestions titleText={"Have you donated before?"} onAnswerChange={(selectedAnswer) => setDonatedBefore(selectedAnswer)}/>

                    {donatedBeforeAnswer === 'yes' && (
                        <View style={styles.content}>
                            <CommonText style={styles.text}>Feel free to go to the home page</CommonText>
                            <CommonButton
                                href={"/main/home" as Href<string | object>}

                            >
                                    Take me home!
                            </CommonButton>
                            <CommonText style={[styles.text, {marginTop: 20}]}>If you would like to see if you are still eligible as a donor, that can be done here</CommonText>
                            <CommonButton href={"/donortesting/donortest" as Href<string | object>}>
                                Take the test
                            </CommonButton>
                        </View>

                    )}
                    {donatedBeforeAnswer === 'no' && (
                        <View style={styles.content}>
                            <CommonText style={styles.text}>We then urge you to take a quick test to see if you are eligible to donate, it won't take more than a minute, promise!</CommonText>
                            <CommonButton href={"/donortesting/donortest" as Href<string | object>}>
                                Take the test
                            </CommonButton>
                        </View>

                    )}
                    {donatedBeforeAnswer === null && (
                        <CommonText>Please select an answer above.</CommonText>
                    )}
                </CommonScrollElement>
            </CommonBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
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
    label: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 8,
    },
    content: {
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        paddingHorizontal: 20
    }
});