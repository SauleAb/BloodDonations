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
        return data.data?.current_points ?? null;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

export async function redeem(currentPoints: number, rewardCost: number): Promise<boolean> {
    if (currentPoints >= rewardCost) {
        console.log("Redeeming reward...");
        return true; 
    } else {
        return false;
    }
}