import axios from "axios";
import {useUser} from "@/components/UserContext";

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

export async function fetchUserChallenges(userId: number): Promise<{ raw: Challenge[]; transformed: any[] }> {
    try {
        const response = await axios.get(`${API_BASE_URL}/challenges/user/${userId}`);
        if (response.status === 200) {
            const userChallenges: Challenge[] = response.data.data;
            return {
                raw: userChallenges,
                transformed: transformChallenges(userChallenges),
            };
        } else {
            console.error("Failed to fetch user challenges:", response.data.message);
            return { raw: [], transformed: [] };
        }
    } catch (error) {
        console.log("Error fetching user challenges:", error); //Api response is 500 automatically throws error if no challenges of the user is found.
        console.log("Error most likely cause by the user not having any challenges");
        return { raw: [], transformed: [] };
    }
}

export async function fetchOtherChallenges(userChallengeIds: Set<number>): Promise<any[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/challenges/`);
        if (response.status === 200) {
            const allChallenges: Challenge[] = response.data.data;
            const filteredChallenges = allChallenges.filter(
                (challenge: Challenge) => !userChallengeIds.has(challenge.id)
            );
            return transformChallenges(filteredChallenges);
        } else {
            console.error("Failed to fetch all challenges:", response.data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching other challenges:", error);
        return [];
    }
}

function transformChallenges(challenges: Challenge[]): any[] {
    return challenges.map((challenge) => ({
        titleText: "Challenge",
        challengeTitleText: challenge.title,
        challengeDescriptionText: challenge.description,
        contentText: "Location\nGoal\nCurrent Donations\nRewards If Completed\nEnd Date",
        icon: "BloodDrop",
        contentTextSize: "small",
        rightText: [
            challenge.location || "N/A",
            challenge.goal?.toString() || "N/A",
            challenge.total_contributions?.toString() || "N/A",
            `${challenge.reward_points} Points` || "N/A",
            new Date(challenge.end).toLocaleDateString() || "N/A",
        ],
        buttons: [
            {
                label: "Join",
                onPressOn: () => console.log(`Joined: ${challenge.title}`),
                onPressOff: () => console.log(`Left: ${challenge.title}`),
            },
        ],
    }));
}
