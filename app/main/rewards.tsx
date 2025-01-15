import React, {useEffect, useState} from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonRewardBox from "@/components/common/CommonRewardBox";
import { rewardsStyles } from "../styles/RewardsStyle";
import commonStyles from "../styles/CommonStyles";
import { rewardPairs } from "@/utils/rewardsUtils";
import { useUser } from '@/components/UserContext';
import { IconNames } from "@/components/common/CommonIcons";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import {getChallengesData} from "@/constants/ChallengesData";
import {fetchChallenges} from "@/utils/challengesUtils";

const validateTextSize = (size: any): "small" | "large" | undefined => {
    return size === "small" || size === "large" ? size : undefined;
};

export default function Rewards() {
    const [activeTab, setActiveTab] = useState<'rewards' | 'challenges'>('rewards');

    //Rewards
    const rewardPairsList = rewardPairs();
    const { user } = useUser();

    //Challenges
    const [challengesData, setChallengesData] = useState<any[]>([]);
    useEffect(() => {
        // Replace with the actual user ID
        const userId = 19;

        async function loadChallenges() {
            const data = await fetchChallenges(userId);
            setChallengesData(data);
        }

        loadChallenges();
    }, []);

    const renderContent = () => {
        if (activeTab === "rewards") {
            return (
                <View style={rewardsStyles.margin}>
                    <CommonScrollElement>
                        <CommonContent
                            titleText="Reward Points"
                            icon={IconNames.Notification}
                            contentText={user.rewardPoints.toString() ?? '0'}
                        />
                        {rewardPairsList.map((pair, index) => (
                            <View style={rewardsStyles.row} key={index}>
                                <CommonRewardBox
                                    titleText={pair[0].titleText}
                                    icon={pair[0].icon}
                                    amountText={pair[0].amountText}
                                    onPress={() => {}} // Optional callback
                                />
                                {pair[1] && (
                                    <CommonRewardBox
                                        titleText={pair[1].titleText}
                                        icon={pair[1].icon}
                                        amountText={pair[1].amountText}
                                        onPress={() => {}}
                                    />
                                )}
                            </View>
                        ))}
                    </CommonScrollElement>
                </View>
            )
        } else if (activeTab === "challenges") {
            const challengesContent = getChallengesData();
            return (
                <CommonScrollElement>
                    <CommonContent titleText={"Challenges"} contentText={"Your Challenges"}></CommonContent>
                    {challengesData.map((item, index) => (
                        <CommonContent
                            key={index}
                            titleText={item.titleText}
                            challengeTitleText={item.challengeTitleText}
                            challengeDescriptionText={item.challengeDescriptionText}
                            contentText={item.contentText}
                            icon={item.icon}
                            contentTextSize={validateTextSize(item.contentTextSize)}
                            rightText={item.rightText}
                            buttons={item.buttons}
                        />
                    ))}
                    <CommonContent titleText={"Challenges"} contentText={"Other Challenges"}></CommonContent>
                </CommonScrollElement>
            )
        }
    }



    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                {renderContent()}
            </CommonBackground>
            <SecondaryNavBar
                tabs={[
                    { key: "rewards", label: "Rewards" },
                    { key: "challenges", label: "Challenges" },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </View>
    );
}