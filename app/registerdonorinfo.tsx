import React, {useState} from 'react';
import {View} from 'react-native';
import {Href} from 'expo-router';
import CommonBackground from "@/components/common/CommonBackground";
import CommonButton from "@/components/common/CommonButton";
import TwoQuestions from "@/components/TwoQuestions";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonText from "@/components/common/CommonText";
import commonStyles from './styles/CommonStyles';
import registerDonorStyles from './styles/RegisterDonorStyle';

export default function DonorTest() {
    const [donatedBeforeAnswer, setDonatedBefore] = useState<string | boolean | null>(null);

    return (
        <View style={commonStyles.container}>
            <CommonBackground style={registerDonorStyles.backgroundImage} titleText={"Welcome Alex"} titleSubText={"Are you new here?"} logoVisible={true}>
                <CommonScrollElement>
                    <TwoQuestions titleText={"Have you donated before?"} onAnswerChange={(selectedAnswer) => setDonatedBefore(selectedAnswer)}/>

                    {donatedBeforeAnswer && (
                        <View style={registerDonorStyles.content}>
                            <CommonText style={registerDonorStyles.text}>Feel free to go to the home page</CommonText>
                            <CommonButton href={"/main/home" as Href<string | object>}>
                                    Take me home!
                            </CommonButton>
                            <CommonText style={[registerDonorStyles.text]}>If you would like to see if you are still eligible as a donor, that can be done here</CommonText>
                            <CommonButton href={"/donortesting/donortest" as Href<string | object>}>
                                Take the test
                            </CommonButton>
                        </View>

                    )}
                    {donatedBeforeAnswer && (
                        <View style={registerDonorStyles.content}>
                            <CommonText style={registerDonorStyles.text}>We then urge you to take a quick test to see if you are eligible to donate, it won't take more than a minute, promise!</CommonText>
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

