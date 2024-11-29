import React from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, {IconNames} from "@/components/common/CommonContent";
import { getTimeTillNextDonation } from '@/utils/timeUtils';
import HomeScreenBottom from "@/components/home/HomeScreenBottom"
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonRewardBox from '@/components/common/CommonRewardBox';

export default function Rewards() {
    return (
        <View style={styles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <View style={styles.margin}>
                <CommonScrollElement>
                    <CommonContent titleText='Reward Points' icon={IconNames.Notification} contentText='340'></CommonContent>
                    <View style={styles.row}>
                    <CommonRewardBox titleText={"Pin #27"} icon={IconNames.Pin} amountText='100*'/>
                    <CommonRewardBox titleText={"Random Pin"} icon={IconNames.RandomPin} amountText='80*'/>
                    </View>
                    <View style={styles.row}>
                    <CommonRewardBox titleText={"Surprise"} icon={IconNames.Gift} amountText='100*'/>
                    <CommonRewardBox titleText={"5€ Coupon"} icon={IconNames.Uber} amountText='100*'/>
                    </View>
                    <View style={styles.row}>
                    <CommonRewardBox titleText={"2x Tickets"} icon={IconNames.Tickets} amountText='250*'/>
                    <CommonRewardBox titleText={"Medal"} icon={IconNames.Medal} amountText='300*'/>
                    </View>
                </CommonScrollElement>
                </View>
            </CommonBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    margin: {
        marginTop: 20
    }
});