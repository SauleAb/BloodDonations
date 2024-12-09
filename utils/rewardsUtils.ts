import { rewards } from "@/constants/RewardsData";

export const rewardPairs = () => {
    const pairs = [];
    for (let i = 0; i < rewards.length; i += 2) {
        pairs.push(rewards.slice(i, i + 2));
    }
    return pairs;
};