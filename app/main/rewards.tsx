import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonRewardBox from "@/components/common/CommonRewardBox";
import { rewardsStyles } from "../styles/RewardsStyle";
import commonStyles from "../styles/CommonStyles";
import { rewardPairs } from "@/utils/rewardsUtils";
import { useUser } from '@/components/UserContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import user from "../../components/user";

type User = typeof user;

export default function Rewards() {
    const { user } = useUser(); // Access user and login function from UserContext
    const rewardPairsList = rewardPairs();
    try{
        console.log(user)
        console.log(user.current_points)
        let userData = JSON.parse(user);
        console.log("1")
        let username = userData.username;
        console.log("2")
        console.log(username)
        console.log("3")
    }
    catch{
        console.log("couldnt log that")
    }
    //console.log(user?.points?.toString())


    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <View style={rewardsStyles.margin}>
                    <CommonScrollElement>
                        <CommonContent
                            titleText="Reward Points"
                            icon={IconNames.Notification}
                            contentText={user?.current_points?.toString() ?? '0'} // Safely display reward points
                        />
                        {rewardPairsList.map((pair, index) => (
                            <View style={rewardsStyles.row} key={index}>
                                <CommonRewardBox
                                    titleText={pair[0].titleText}
                                    icon={pair[0].icon}
                                    amountText={pair[0].amountText}
                                />
                                {pair[1] && (
                                    <CommonRewardBox
                                        titleText={pair[1].titleText}
                                        icon={pair[1].icon}
                                        amountText={pair[1].amountText}
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
