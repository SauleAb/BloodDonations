import React, { useState, useEffect } from "react";
import { IconNames } from "@/components/common/CommonIcons";
import {
    fetchUserDonations,
} from "@/utils/donationUtils";
import moment from "moment";
import { getPoints } from "@/utils/rewardsUtils";

export const useHomeScreenData = (userId: number, firstName: string) => {
    const [totalBloodDonated, setTotalBloodDonated] = useState(0);
    const [totalRewardsPoints, setTotalRewardsPoints] = useState(0);
    const [nextDonationMessage, setNextDonationMessage] = useState("Loading...");
    const [welcomeMessage, setWelcomeMessage] = useState("");

    useEffect(() => {
        if (!userId) return;

        setWelcomeMessage(`Welcome to Sanquin app, ${firstName}!`)

        const calculateData = async () => {
            const donations = await fetchUserDonations(userId);

            // Blood donated
            const completedDonations = donations.filter((donation) => donation.status === "completed");
            const totalBlood = completedDonations.length * 500;
            setTotalBloodDonated(totalBlood);

            // Rewards points
            const { currentPoints } = await getPoints(userId);
            setTotalRewardsPoints(currentPoints);

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
            titleText: "Welcome",
            contentText: welcomeMessage,
            icon: IconNames.BloodDonated,
        },
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
