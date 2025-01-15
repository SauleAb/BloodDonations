// Rewards.tsx
import React, {useEffect, useState, useCallback} from "react";
import { View } from "react-native";
import CommonBackground from "@/components/common/CommonBackground";
import CommonContent from "@/components/common/CommonContent";
import CommonScrollElement from "@/components/common/CommonScrollElement";
import CommonRewardBox from "@/components/common/CommonRewardBox";
import { rewardsStyles } from "../styles/RewardsStyle";
import commonStyles from "../styles/CommonStyles";
import { rewardPairs } from "@/utils/rewardsUtils";
import { useUser } from '@/components/UserContext';
import {IconNames} from "@/components/common/CommonIcons";
import SecondaryNavBar from "@/components/common/CommonSecondaryNavBar";
import {
    fetchOtherChallenges,
    fetchUserChallenges,
    joinChallenge,
    leaveChallenge,
} from "@/utils/challengesUtils";

export default function Rewards() {
    const [activeTab, setActiveTab] = useState<'rewards' | 'challenges'>('rewards');
    const { user } = useUser();

    const rewardPairsList = rewardPairs();

    const [userChallenges, setUserChallenges] = useState<any[]>([]);
    const [otherChallenges, setOtherChallenges] = useState<any[]>([]);

    const loadChallenges = useCallback(async () => {
        const { raw: rawUserChallenges, transformed: transformedUserChallenges } = await fetchUserChallenges(user.id);
        setUserChallenges(transformedUserChallenges);

        const userChallengeIds = new Set(rawUserChallenges.map((challenge) => challenge.id));
        const otherChallengesData = await fetchOtherChallenges(userChallengeIds, user.id);
        setOtherChallenges(otherChallengesData);
    }, [user.id]);

    useEffect(() => {
        loadChallenges();
    }, [loadChallenges]);

    const handleJoin = async (challengeId: number) => {
        await joinChallenge(challengeId, user.id);
        await loadChallenges();
    };

    const handleLeave = async (challengeId: number) => {
        await leaveChallenge(challengeId, user.id);
        await loadChallenges();
    };

    const getTransformedButtons = (challenge: any) => {
        const isOn = challenge.buttons?.[0]?.label === "Leave";
        return [
            {
                label: isOn ? "Leave" : "Join",
                isOn: isOn,
                onPressOn: async () => {
                    // If currently "OFF", pressing it means "Join"
                    await handleJoin(challenge.id);
                },
                onPressOff: async () => {
                    // If currently "ON", pressing it means "Leave"
                    await handleLeave(challenge.id);
                },
            },
        ];
    };

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
            );
        } else if (activeTab === "challenges") {
            return (
                <CommonScrollElement>
                    <CommonContent titleText={"Challenges"} contentText={"Your Challenges"} />
                    {userChallenges.length > 0 ? (
                        userChallenges.map((challenge, index) => (
                            <CommonContent
                                key={index}
                                {...challenge}
                                buttons={getTransformedButtons(challenge)}
                            />
                        ))
                    ) : (
                        <CommonContent
                            titleText={"You don't have any challenges yet"}
                            contentText={"Join a new challenge!"}
                        />
                    )}
                    <CommonContent titleText={"Challenges"} contentText={"Other Challenges"} />
                    {otherChallenges.length > 0 ? (
                        otherChallenges.map((challenge, index) => (
                            <CommonContent
                                key={index}
                                {...challenge}
                                buttons={getTransformedButtons(challenge)}
                            />
                        ))
                    ) : (
                        <CommonContent
                            titleText={"No challenges"}
                            contentText={"Check in for new challenges soon!"}
                        />
                    )}
                </CommonScrollElement>
            );
        }
    };

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