import React from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent, { IconNames } from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonRewardBox from "@/components/common/CommonRewardBox";
import { rewardPoints } from "@/constants/RewardsData";
import { rewardsStyles } from "../styles/RewardsStyle";
import commonStyles from "../styles/CommonStyles";
import { rewardPairs } from "@/utils/rewardsUtils";

export default function Rewards() {
    const rewardPairsList = rewardPairs(); 

    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <View style={rewardsStyles.margin}>
                    <CommonScrollElement>
                        <CommonContent
                            titleText="Reward Points"
                            icon={IconNames.Notification}
                            contentText={rewardPoints}
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
