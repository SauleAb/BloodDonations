import React, { useState, useEffect } from "react";
import { IconNames } from "@/components/common/CommonIcons";
import {
    fetchUserDonations,
} from "@/utils/donationUtils";
import moment from "moment";

export const useHomeScreenData = (userId: number) => {
    const [totalBloodDonated, setTotalBloodDonated] = useState(0);
    const [totalRewardsPoints, setTotalRewardsPoints] = useState(0);
    const [nextDonationMessage, setNextDonationMessage] = useState("Loading...");

    useEffect(() => {
        if (!userId) return;

        const calculateData = async () => {
            const donations = await fetchUserDonations(userId);

            // Blood donated
            const completedDonations = donations.filter((donation) => donation.status === "completed");
            const totalBlood = completedDonations.length * 500;
            setTotalBloodDonated(totalBlood);

            // Rewards points
            const totalRewards = completedDonations.length * 200;
            setTotalRewardsPoints(totalRewards);

            // Next donation message
            const pendingDonations = donations.filter((donation) => donation.status === "pending");
            if (pendingDonations.length > 0) {
                const nextDonation = pendingDonations[0];
                const timeRemaining = moment(`${nextDonation.date}T${nextDonation.time}`).fromNow();
                setNextDonationMessage(`Next donation ${timeRemaining}`);
            } else if (completedDonations.length > 0) {
                const lastCompletedDonation = completedDonations.sort(
                    (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
                )[0];

                if (lastCompletedDonation) {
                    const oneMonthLater = moment(lastCompletedDonation.date).add(1, "month");
                    if (oneMonthLater.isBefore(moment())) {
                        setNextDonationMessage("Register to donate!");
                    } else {
                        const timeUntilEligible = oneMonthLater.fromNow();
                        setNextDonationMessage(`Can sign up for a new donation ${timeUntilEligible}`);
                    }
                } else {
                    setNextDonationMessage("Register to donate!");
                }
            } else {
                setNextDonationMessage("Register to donate!");
            }
        };

        calculateData();
        const intervalId = setInterval(calculateData, 5000);

        return () => clearInterval(intervalId);
    }, [userId]);

    return [
        {
            titleText: "Next Blood Donation",
            contentText: nextDonationMessage,
            icon: IconNames.BloodDonated,
        },
        {
            titleText: "Blood Donated",
            contentText: `${totalBloodDonated} ml`,
            icon: IconNames.BloodDrop,
        },
        {
            titleText: "Reward Points",
            contentText: `${totalRewardsPoints}`,
            icon: IconNames.Reward,
        },
    ];
};
