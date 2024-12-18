import { rewards } from "@/constants/RewardsData";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

const url = `https://sanquin-api.onrender.com/users/`;


export const rewardPairs = () => {
    const pairs = [];
    for (let i = 0; i < rewards.length; i += 2) {
        pairs.push(rewards.slice(i, i + 2));
    }
    return pairs;
};

export async function getPoints(userId: Int32): Promise<number | null> {
    const _url = url + userId;

    try {
        const response = await fetch(_url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data?.points ?? null; // Safely access points
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null; // Return null on failure
    }
    }

export async function redeem(userId: Int32, rewardId: Int32): Promise<boolean> {
    const rewardCost = 5;
    const points = await getPoints(userId);

    if (points !== null && points >= rewardCost) {
        // POST request to deduct points from the user
        // Example placeholder logic:
        try {
            const response = await fetch(`${url}${userId}/redeem`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rewardId }),
            });

            if (!response.ok) {
                throw new Error(`Failed to redeem reward: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error redeeming reward:', error);
            return false;
        }
    } else {
        return false; // Not enough points
    }
}