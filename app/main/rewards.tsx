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
    const { user, login } = useUser(); // Access user and login function from UserContext
    const rewardPairsList = rewardPairs();

    const handleDecrementPoints = async () => {
        if (user.rewardPoints >= 10) {
            const updatedUser = { ...user, rewardPoints: user.rewardPoints - 10 };

            try {
                // Retrieve existing users
                const usersJSON = await AsyncStorage.getItem('users');
                const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

                // Update the specific user in the users list
                const updatedUsers = users.map((u: User) =>
                    u.email === user.email ? updatedUser : u
                );

                // Save the updated users list and current user
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

                // Update the UserContext state
                login(updatedUser); // Update UserContext with the updated user
            } catch (error) {
                console.error('Error updating user reward points:', error);
                Alert.alert('Error', 'Failed to update reward points.');
            }
        } else {
            Alert.alert('Not enough points', 'You do not have enough reward points to perform this action.');
        }
    };

    const handleIncrementPoints = async () => {
        const updatedUser = { ...user, rewardPoints: user.rewardPoints + 10 };

        try {
            // Retrieve existing users
            const usersJSON = await AsyncStorage.getItem('users');
            const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

            // Update the specific user in the users list
            const updatedUsers = users.map((u: User) =>
                u.email === user.email ? updatedUser : u
            );

            // Save the updated users list and current user
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

            // Update the UserContext state
            login(updatedUser); // Update UserContext with the updated user
        } catch (error) {
            console.error('Error updating user reward points:', error);
            Alert.alert('Error', 'Failed to update reward points.');
        }
    };

    return (
        <View style={commonStyles.container}>
            <CommonBackground logoVisible={true} mainPage={true}>
                <View style={rewardsStyles.margin}>
                    <TouchableOpacity onPress={handleDecrementPoints} style={rewardsStyles.button}>
                        <Text style={rewardsStyles.buttonText}>-10</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleIncrementPoints} style={rewardsStyles.button}>
                        <Text style={rewardsStyles.buttonText}>+10</Text>
                    </TouchableOpacity>
                    <CommonScrollElement>
                        <CommonContent
                            titleText="Reward Points"
                            icon={IconNames.Notification}
                            contentText={user?.rewardPoints?.toString() ?? '0'} // Safely display reward points
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
