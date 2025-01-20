import { rewards } from "@/constants/RewardsData";
import axios from "axios";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

const url = `https://sanquin-api.onrender.com/users/`;


export const rewardPairs = () => {
    const pairs = [];
    for (let i = 0; i < rewards.length; i += 2) {
        pairs.push(rewards.slice(i, i + 2));
    }
    return pairs;
};

export async function getPoints(userId: number): Promise<{ currentPoints: number; totalPoints: number }> {
    const endpoint = `https://sanquin-api.onrender.com/users/id/${userId}`;

    try {
        const response = await axios.get(endpoint);

        if (response.status === 200 && response.data?.data) {
            const data = Object.fromEntries(response.data.data);
            return {
                currentPoints: data.current_points,
                totalPoints: data.total_points,
            };
        }
        throw new Error("Failed to fetch points");
    } catch (error) {
        console.error("Error fetching reward points:", error);
        throw error;
    }
}



export const updateUserPoints = async (
    userId: number,
    points: number,
    subtract: boolean
): Promise<{ currentPoints: number; totalPoints: number }> => {
    try {
        const response = await axios.put(
            `https://sanquin-api.onrender.com/users/update/${userId}/points/${points}?subtract=${subtract}`
        );
        if (response.status === 200 && response.data?.data) {
            const data = Object.fromEntries(response.data.data);
            return {
                currentPoints: data.current_points,
                totalPoints: data.total_points,
            };
        }
        throw new Error("Failed to update points");
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(
                `Error updating points: ${error.response.status} - ${JSON.stringify(error.response.data)}`
            );
        } else {
            console.error("Error updating points:", error);
        }
        throw error;
    }
};

export async function redeem(userId: number, points: number): Promise<boolean> {
    try {
        const response = await axios.put(
            `https://sanquin-api.onrender.com/users/update/${userId}/points/${points}?subtract=true`
        );
        if (response.status === 200 && response.data?.data) {
            return true;
        }
        return false;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(
                `Error redeeming points: ${error.response.status} - ${JSON.stringify(error.response.data)}`
            );
        } else {
            console.error("Error redeeming points:", error);
        }
        return false;
    }
}
