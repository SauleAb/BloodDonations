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
import {iconMap, IconNames} from "@/components/common/CommonIcons";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import {getChallengesData} from "@/constants/ChallengesData";
import {fetchOtherChallenges, fetchUserChallenges} from "@/utils/challengesUtils";
import CommonText from "@/components/common/CommonText";

const validateTextSize = (size: any): "small" | "large" | undefined => {
    return size === "small" || size === "large" ? size : undefined;
};

export default function Rewards() {
    const [activeTab, setActiveTab] = useState<'rewards' | 'challenges'>('rewards');
    const { user } = useUser();

    //Rewards
    const rewardPairsList = rewardPairs();

    //Challenges
    const [userChallenges, setUserChallenges] = useState<any[]>([]);
    const [otherChallenges, setOtherChallenges] = useState<any[]>([]);
    useEffect(() => {
        const userId = user.id;

        async function loadChallenges() {
            // Fetch user challenges
            const { raw: rawUserChallenges, transformed: transformedUserChallenges } = await fetchUserChallenges(userId);
            setUserChallenges(transformedUserChallenges);

            // Extract IDs from raw data
            const userChallengeIds = new Set(rawUserChallenges.map(challenge => challenge.id));

            // Fetch other challenges and filter
            const otherChallengesData = await fetchOtherChallenges(userChallengeIds);
            setOtherChallenges(otherChallengesData);
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
                                    onPress={() => {}}
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
                    {userChallenges.length > 0 ? (
                        userChallenges.map((item, index) => (
                            <CommonContent key={index} {...item} />
                        ))
                    ) : (
                        <CommonContent titleText={"You don't have any challenges yet"} contentText={"Join a new challenge!"} />
                    )}
                    <CommonContent titleText={"Challenges"} contentText={"Other Challenges"}></CommonContent>
                    {otherChallenges.length > 0 ? (
                        otherChallenges.map((item, index) => (
                            <CommonContent key={index} {...item} />
                        ))
                    ) : (
                        <CommonText>Loading...</CommonText>
                    )}
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