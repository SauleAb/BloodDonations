import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonRewardBox from "@/components/common/CommonRewardBox";
import { rewardsStyles } from "../styles/RewardsStyle";
import commonStyles from "../styles/CommonStyles";
import { getPoints, rewardPairs, updateUserPoints } from "@/utils/rewardsUtils";
import { useUser } from "@/components/UserContext";
import { IconNames } from "@/components/common/CommonIcons";

export default function Rewards() {
    const rewardPairsList = rewardPairs();
    const { user } = useUser();

    const [rewardPoints, setRewardPoints] = useState(0);

    const fetchRewardPoints = async () => {
        if (!user?.id) return;
        try {
            const response = await getPoints(user.id);
            setRewardPoints(response.currentPoints);
        } catch (error) {
            console.error("Error fetching reward points:", error);
        }
    };

    useEffect(() => {
        fetchRewardPoints();
        const intervalId = setInterval(fetchRewardPoints, 5000); 
        return () => clearInterval(intervalId);
    }, [user]);

    const handleRedeem = async (rewardCost: number) => {
        if (rewardPoints < rewardCost) {
            Alert.alert("Insufficient Points", "You do not have enough points to redeem this reward.");
            return;
        }

        try {
            const { currentPoints } = await updateUserPoints(user.id, rewardCost, true);
            setRewardPoints(currentPoints);
            Alert.alert("Redemption Successful", `You redeemed ${rewardCost} points!`);
        } catch (error) {
            console.error("Error redeeming reward points:", error);
            Alert.alert("Error", "An error occurred while redeeming points. Please try again.");
        }
    };

    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <View style={rewardsStyles.margin}>
                    <CommonScrollElement>
                        {/* Display Current Points */}
                        <CommonContent
                            titleText="Reward Points"
                            icon={IconNames.Notification}
                            contentText={rewardPoints.toString()}
                        />

                        {/* Display Rewards List */}
                        {rewardPairsList.map((pair, index) => (
                            <View style={rewardsStyles.row} key={index}>
                                <CommonRewardBox
                                    titleText={pair[0].titleText}
                                    icon={pair[0].icon}
                                    amountText={pair[0].amountText}
                                    onPress={() => handleRedeem(Number(pair[0].amountText))}
                                />
                                {pair[1] && (
                                    <CommonRewardBox
                                        titleText={pair[1].titleText}
                                        icon={pair[1].icon}
                                        amountText={pair[1].amountText}
                                        onPress={() => handleRedeem(Number(pair[1].amountText))}
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
