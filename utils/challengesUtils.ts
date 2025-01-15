import axios from "axios";

const API_BASE_URL = "https://sanquin-api.onrender.com";

export type Challenge = {
    id: number;
    title: string;
    description: string;
    location: string;
    goal: number;
    start: string;
    end: string;
    reward_points: number;
    total_contributions: number;
};

export async function fetchUserChallenges(
    userId: number,
): Promise<{ raw: Challenge[]; transformed: any[] }> {
    try {
        const response = await axios.get(`${API_BASE_URL}/challenges/user/${userId}`);
        if (response.status === 200) {
            const userChallenges: Challenge[] = response.data.data;

            return {
                raw: userChallenges,
                transformed: await transformChallenges(userChallenges, () => true, userId),
            };
        } else {
            console.error("Failed to fetch user challenges:", response.data.message);
            return { raw: [], transformed: [] };
        }
    } catch (error) {
        console.log("Error fetching user challenges:", error);
        console.log("Error most likely occurring from the user not having any challenges, and the API responding with HTTP code 500");
        return { raw: [], transformed: [] };
    }
}

export async function fetchOtherChallenges(
    userChallengeIds: Set<number>,
    userId: number,
): Promise<any[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/challenges/`);
        if (response.status === 200) {

            const allChallenges: Challenge[] = response.data.data;

            const filteredChallenges = allChallenges.filter(
                (challenge: Challenge) => !userChallengeIds.has(challenge.id)
            );
            return transformChallenges(filteredChallenges, (challenge) => false, userId);
        } else {
            console.error("Failed to fetch all challenges:", response.data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching other challenges:", error);
        return [];
    }
}

export async function fetchChallengeFriends(challengeId: number, userId: number) {
    try {
        const response = await axios.get(`${API_BASE_URL}/challenges/${challengeId}/users/${userId}/friends`);
        if (response.status === 200) {
            return response.data.data;
        }
        console.error("Failed to fetch challenge friends:", response.data.message);
        return [];
    } catch (error) {
        console.error("Error fetching challenge friends:", error);
        return [];
    }
}

export async function joinChallenge(challengeId: number, userId: number) {
    try {
        const response = await axios.post(`${API_BASE_URL}/challenges/${challengeId}/user/${userId}`);
        if (response.status === 200) {
            console.log("Successfully joined challenge:", challengeId);
        } else {
            console.error("Error joining challenge:", response.data.message);
        }
    } catch (error) {
        console.error("Error joining challenge:", error);
    }
}

export async function leaveChallenge(challengeId: number, userId: number) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/challenges/${challengeId}/user/${userId}`);
        if (response.status === 200) {
            console.log("Successfully left challenge:", challengeId);
        } else {
            console.error("Error leaving challenge:", response.data.message);
        }
    } catch (error) {
        console.error("Error leaving challenge:", error);
    }
}

export async function transformChallenges(
    challenges: Challenge[],
    isJoinedGetter: (challenge: Challenge) => boolean,
    userId: number
): Promise<any[]> {
    return await Promise.all(
        challenges.map(async (challenge) => {
            const isJoined = isJoinedGetter(challenge);
            const friends = await fetchChallengeFriends(challenge.id, userId);
            const friendDetails = friends.map((friend: any) => ({
                left: `${friend.first_name} ${friend.last_name}`,
                right: ""
            }));

            return {
                id: challenge.id,
                titleText: "Challenge",
                challengeTitleText: challenge.title,
                challengeDescriptionText: challenge.description,
                contentText: "Location\nGoal\nCurrent Donations\nRewards If Completed\nEnd Date\nFriends Participating",
                icon: "BloodDrop",
                contentTextSize: "small",
                rightText: [
                    challenge.location || "N/A",
                    challenge.goal?.toString() || "N/A",
                    challenge.total_contributions?.toString() || "N/A",
                    `${challenge.reward_points} Points` || "N/A",
                    new Date(challenge.end).toLocaleDateString() || "N/A",
                    {
                        type: "expandableContent",
                        title: "View Details",
                        details: friendDetails
                    }
                ],
                buttons: [
                    {
                        label: isJoined ? "Leave" : "Join",
                        isOn: isJoined,
                        action: isJoined
                            ? async () => {
                                await leaveChallenge(challenge.id, userId);
                                console.log("Challenge left:", challenge.id);
                            }
                            : async () => {
                                await joinChallenge(challenge.id, userId);
                                console.log("Challenge joined:", challenge.id);
                            },
                    },
                ],
            };
        })
    );
}