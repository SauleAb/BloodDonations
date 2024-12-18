import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonRewardBox from "@/components/common/CommonRewardBox";
import { rewardsStyles } from "../styles/RewardsStyle";
import commonStyles from "../styles/CommonStyles";
import { rewardPairs } from "@/utils/rewardsUtils";
import { useUser } from '@/components/UserContext';
import user from "../../components/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTransitionProgress } from "react-native-screens";
import { IconNames } from "@/components/common/CommonIcons";

export default function Rewards() {
    const { user } = useUser();
    const rewardPairsList = rewardPairs();

    const [userPoints, setUserPoints] = useState(user.rewardPoints); // Local state to store the points

    useEffect(() => {
        setUserPoints(user.rewardPoints);
    }, [user.rewardPoints]);

    const redeem = () => {
        setUserPoints(user.rewardPoints)
    };


    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <View style={rewardsStyles.margin}>
                    <CommonScrollElement>
                        <CommonContent
                            titleText="Reward Points"
                            icon={IconNames.Notification}
                            contentText={user.rewardPoints.toString() ?? '0'} // Safely display reward points
                        />
                        {rewardPairsList.map((pair, index) => (
                            <View style={rewardsStyles.row} key={index}>
                                <CommonRewardBox
                                    titleText={pair[0].titleText}
                                    icon={pair[0].icon}
                                    amountText={pair[0].amountText}
                                    onPress={redeem}
                                />
                                {pair[1] && (
                                    <CommonRewardBox
                                        titleText={pair[1].titleText}
                                        icon={pair[1].icon}
                                        amountText={pair[1].amountText}
                                        onPress={redeem}
                                    />
                                )}
                            </View>
                        ))}
                    </CommonScrollElement>
                </View>
            </CommonBackground>
        </View>
    );
}