import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CommonBackground from "@/components/common/CommonBackground";
import { useFonts } from "expo-font";
import CommonContent, { IconNames } from '@/components/common/CommonContent';
import CommonScrollElement from '@/components/common/CommonScrollElement';
import CommonTitleWithIcon from '@/components/common/CommonTitleWithIcon';

export default function AuthenticationType() {
    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                    <CommonContent titleText={"Last Donation"} contentText={"26th September, 2024"} icon={IconNames.Time} />
                    <CommonContent titleText={"Times Donated"} contentText={"9"} icon={IconNames.Time} />
                    <CommonContent titleText={"Amount Donated"} contentText={"14 units of plasma"} icon={IconNames.BloodDonated} />
                    <CommonContent titleText={"Iron Levels"} contentText={"41 ng/ml"} icon={IconNames.BloodData} />
                    <CommonContent
                        titleText={"Donation History"}
                        contentText={"26th September, 2024\n16th July, 2024\n3rd June, 2024"}
                        icon={IconNames.Time}
                        contentTextSize="small"
                        rightText={"View Details\nView Details\nView Details"}
                    />
                    <CommonTitleWithIcon titleText={"Settings"} icon={IconNames.Settings}></CommonTitleWithIcon>
                </CommonScrollElement>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});
