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

export function getPoints(userId: Int32){
    let points;
    const _url = url + userId

    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        points = data.data.points;
        
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    return points;
}

// returns true if user has enough points and false if not user doesnt have enough points
export function redeem(userId: Int32, rewardId: Int32){
    let rewardCost = 5
    const points = getPoints(userId)
    if (points && points >= rewardCost){
        // POST REQUEST TO TAKE POINTS OFF OF USER IN DATABASE
        return true
    } else{
        return false
    }
}