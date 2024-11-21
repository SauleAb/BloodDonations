import React from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, {IconNames} from "@/components/common/CommonContent";
import { getTimeTillNextDonation } from '@/utils/timeUtils';
import HomeScreenBottom from "@/components/home/HomeScreenBottom"
import CommonScrollElement from "@/components/common/CommonScrollElement";

export default function Home() {

    const targetDate = new Date('2024-12-31T23:59:59');
    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <CommonScrollElement>
                    <CommonContent titleText={"Notification"} contentText={"awesome content"} icon={IconNames.Notification} />
                    <CommonContent titleText={"Next Blood Donation"} contentText={getTimeTillNextDonation(targetDate)} icon={IconNames.BloodDonated}/>
                    <CommonContent titleText={"Blood Donated"} contentText={"1.8L"} icon={IconNames.BloodDrop}/>
                    <CommonContent titleText={"Next Reward"} contentText={"2 Donations Left"} icon={IconNames.Reward}/>
                    <CommonContent titleText={"Reward Points"} contentText={"2450"} icon={IconNames.Reward}/>
                    <CommonContent titleText={"Next Plasma Donation"} contentText={"awesome content"} icon={IconNames.BloodSample}/>

                    <HomeScreenBottom/>
                </CommonScrollElement>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});