import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Href} from 'expo-router';
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import TwoQuestions from "@/components/TwoQuestions";
import CommonScrollElement from "@/components/common/CommonScrollElement";

export default function DonorTest() {
    return (
        <View style={styles.container}>
            <CommonBackground style={styles.backgroundImage} titleText={"Welcome Alex"} titleSubText={"Couple of questions before we get started"} logoVisible={true}>
                <CommonScrollElement>
                    <TwoQuestions titleText={"Have you ever donated blood before?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Are you between the ages of 18 and 64?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Do you weigh less than 50kg?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Have you ever had an organ or tissue transplant?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Have you been in the UK for a total of 6 months or more between 1980 and 1996?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Have you ever injected drugs?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Do you have diabetes?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Have you had blood products or a blood transfusion?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Do you have a chronic or serious condition (or have you had one in the past)?"} onAnswerChange={() => {}}/>
                    <TwoQuestions titleText={"Have you received a preventive vaccine in the past 2 weeks to prevent hepatitis B?"} onAnswerChange={() => {}}/>
                    <CommonButton
                        href={"/donortesting/donortestresults" as Href<string | object>}>
                        Check Results
                    </CommonButton>
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
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 8,
    }
});