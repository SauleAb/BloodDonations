import axios from "axios";

const API_BASE_URL = "https://sanquin-api.onrender.com";

export async function fetchChallenges(userId: number) {
    try {
        const response = await axios.get(`${API_BASE_URL}/challenges/user/${userId}`);
        if (response.status === 200) {
            const challenges = response.data.data;

            return challenges.map((challenge: any) => ({
                titleText: "Challenge",
                challengeTitleText: challenge.title,
                challengeDescriptionText: challenge.description,
                contentText: "Location\nGoal\nCurrent Donations\nYour Participation\nRewards If Completed\nEnd Date",
                icon: "BloodDrop",
                contentTextSize: "small",
                rightText: [
                    challenge.location || "N/A",
                    challenge.goal.toString() || "N/A",
                    challenge.total_contributions || "N/A",
                    "N/A",
                    challenge.reward_points.toString() + " Points" || "N/A",
                    new Date(challenge.end).toLocaleDateString() || "N/A",
                ],
                buttons: [
                    {
                        label: "Accept",
                        onPressOn: () => console.log(`Accepted: ${challenge.title}`),
                        onPressOff: () => console.log(`Declined: ${challenge.title}`),
                    },
                    {
                        label: "Participate",
                        onPressOn: () => console.log(`Started Participation: ${challenge.title}`),
                        onPressOff: () => console.log(`Stopped Participation: ${challenge.title}`),
                    },
                ],
            }));
        } else {
            console.error("Failed to fetch challenges:", response.data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching challenges:", error);
        return [];
    }
}